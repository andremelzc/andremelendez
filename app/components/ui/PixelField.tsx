"use client";

import { useEffect, useRef, type RefObject } from "react";
import { clamp01, readPalette, smooth } from "@/app/lib/pixelPalette";
import { FIELD_DEFAULTS, type FieldSettings } from "@/app/lib/pixelSettings";

interface PixelFieldProps {
  /** Elemento cuyo recuadro (más un margen) queda libre de celdas. */
  avoidRef?: RefObject<HTMLElement | null>;
  /** Lo mismo, pero por id: permite usar el campo desde un componente de servidor. */
  avoidId?: string;
  /** Dibuja un único fotograma: sin animación ni reacción al cursor. */
  still?: boolean;
  /** Ajustes del efecto (ver lib/pixelSettings). Lo que falte usa el valor por defecto. */
  settings?: Partial<FieldSettings>;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  t0: number;
  amp: number;
}

/** Hash entero 2D → [0, 1]. Determinista: no usa Math.random. */
function hash2(x: number, y: number): number {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Ruido de valor suave en 2D → [0, 1]. */
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  const top = a + (b - a) * xf;
  const bottom = c + (d - c) * xf;
  return top + (bottom - top) * yf;
}

const RIPPLE_SPEED = 13; // celdas por segundo
const RIPPLE_LIFE = 2.4; // segundos

/**
 * Campo de celdas cuadradas que se enfría hacia el texto. Es decorativo: no
 * contiene información ni recibe eventos.
 *
 * Capas de movimiento (todas se pueden ajustar o apagar):
 *  - flujo de ruido de fondo;
 *  - centelleo de celdas que cambian de paso;
 *  - un barrido diagonal periódico;
 *  - ondas que nacen solas y se expanden;
 *  - mancha y estela bajo el cursor, y onda al hacer clic o tocar;
 *  - entrada en ola al cargar.
 *
 * Se pausa fuera de pantalla y con la pestaña oculta. Con
 * `prefers-reduced-motion` (o `still`) dibuja un único fotograma estático.
 */
export default function PixelField({
  avoidRef,
  avoidId,
  still = false,
  settings,
  className = "",
}: PixelFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const merged: FieldSettings = { ...FIELD_DEFAULTS, ...settings };
  const settingsRef = useRef<FieldSettings>(merged);
  const apiRef = useRef<{ relayout: () => void; recolor: () => void } | null>(null);

  // Los ajustes se leen en cada fotograma desde la ref: cambiarlos no
  // reinicia el efecto, salvo el tamaño de celda y la paleta.
  useEffect(() => {
    settingsRef.current = merged;
  });
  useEffect(() => {
    apiRef.current?.relayout();
  }, [merged.cell]);
  useEffect(() => {
    apiRef.current?.recolor();
  }, [merged.palette]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const grid = gridRef.current;
    if (!wrap || !canvas || !grid) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isStatic = () => still || reduceMotion.matches;
    const getAvoid = () =>
      avoidRef?.current ?? (avoidId ? document.getElementById(avoidId) : null);

    let cell = 16;
    let cols = 0;
    let rows = 0;
    let image: ImageData | null = null;
    let pixels = new Uint32Array(0);
    let mask = new Float32Array(0); // banda diagonal × zona libre de texto
    let free = new Float32Array(0); // 0 sobre el texto, 1 lejos de él
    let jitter = new Float32Array(0); // dispersión fija de los bordes
    let heat = new Float32Array(0); // calor acumulado por el cursor (estela)
    let colors = readPalette(settingsRef.current.palette);

    let visible = true;
    let raf = 0;
    let lastDraw = 0;
    let lastTime = 0;
    let introStart: number | null = null;
    let introArmed = true; // la entrada en ola se dispara al verse por primera vez
    let nextRipple = 0.8;
    const ripples: Ripple[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, active: false };

    const layout = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (!width || !height) return;

      const wanted = settingsRef.current.cell;
      cell = wanted > 0 ? wanted : width < 640 ? 12 : 16;
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);

      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      grid.style.backgroundSize = `${cell}px ${cell}px`;

      image = ctx.createImageData(cols, rows);
      pixels = new Uint32Array(image.data.buffer);

      // Recuadro del texto, en unidades de celda.
      let box: { x0: number; y0: number; x1: number; y1: number } | null = null;
      const avoid = getAvoid();
      if (avoid) {
        const a = avoid.getBoundingClientRect();
        const w = wrap.getBoundingClientRect();
        box = {
          x0: (a.left - w.left) / cell,
          y0: (a.top - w.top) / cell,
          x1: (a.right - w.left) / cell,
          y1: (a.bottom - w.top) / cell,
        };
      }

      mask = new Float32Array(cols * rows);
      free = new Float32Array(cols * rows);
      jitter = new Float32Array(cols * rows);
      heat = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const nx = (x + 0.5) / cols;
          const ny = (y + 0.5) / rows;
          // Banda diagonal: vacía arriba a la izquierda, llena abajo a la derecha.
          const band = clamp01((nx * 0.55 + ny * 0.95 - 0.5) / 0.55);
          let f = 1;
          if (box) {
            const dx = Math.max(box.x0 - x, 0, x - box.x1);
            const dy = Math.max(box.y0 - y, 0, y - box.y1);
            f = smooth(clamp01(Math.hypot(dx, dy) / 6));
          }
          free[i] = f;
          mask[i] = Math.pow(band, 0.8) * f;
          jitter[i] = (hash2(x * 7 + 3, y * 13 + 5) - 0.5) * 0.16;
        }
      }
    };

    const spawnRipple = (x: number, y: number, t: number, amp: number) => {
      ripples.push({ x, y, t0: t, amp });
      if (ripples.length > 6) ripples.shift();
    };

    const draw = (t: number, motion: boolean) => {
      if (!image) return;
      lastTime = t;
      const S = settingsRef.current;
      if (introStart === null) introStart = t;

      // Todo el movimiento depende de `motion`: apagado = fotograma estático.
      const m = motion ? 1 : 0;
      const tx = t * 0.06 * S.drift * m;
      const ty = t * 0.035 * S.drift * m;
      const shimmer = S.shimmer * m;
      const scan = S.scan * m;
      const shStep = Math.floor(t * 7) * m;
      const introT = S.intro && motion ? (t - introStart) / 1.7 : 99;

      // Barrido: una cresta diagonal que cruza el campo cada ~20 s.
      const front = ((t * 0.09) % 1.8) - 0.25;

      // Ondas espontáneas dentro de la zona visible.
      if (motion && S.ripples > 0 && t >= nextRipple) {
        for (let tries = 0; tries < 14; tries++) {
          const rx = Math.floor(Math.random() * cols);
          const ry = Math.floor(Math.random() * rows);
          if (mask[ry * cols + rx] > 0.35) {
            spawnRipple(rx, ry, t, 0.5);
            break;
          }
        }
        nextRipple = t + (1.4 + Math.random() * 2.4) / S.ripples;
      }
      while (ripples.length && t - ripples[0].t0 > RIPPLE_LIFE) ripples.shift();

      // Estela: el calor del cursor se acumula y se apaga por fotograma.
      const decay = 0.74 + 0.22 * S.trail;
      const splat = motion && pointer.strength > 0.02;
      const sigma = Math.max(1, S.pointerRadius);
      const inv = 1 / (2 * sigma * sigma);
      const reach = Math.ceil(sigma * 3);
      if (splat) {
        const px = Math.round(pointer.x);
        const py = Math.round(pointer.y);
        for (let y = Math.max(0, py - reach); y < Math.min(rows, py + reach + 1); y++) {
          for (let x = Math.max(0, px - reach); x < Math.min(cols, px + reach + 1); x++) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const i = y * cols + x;
            heat[i] = Math.min(
              1.2,
              heat[i] + Math.exp(-(dx * dx + dy * dy) * inv) * 0.55 * pointer.strength * free[i],
            );
          }
        }
      }

      for (let y = 0; y < rows; y++) {
        const ny = y / rows;
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const w = mask[i];
          const nx = x / cols;
          let v = 0;

          if (w > 0.001) {
            const sx = x * 0.09 + tx;
            const sy = y * 0.09 - ty;
            const n =
              0.6 * valueNoise(sx, sy) +
              0.3 * valueNoise(sx * 2.1 + 13.7, sy * 2.1 + 4.2) +
              0.1 * valueNoise(sx * 4.3 + 7.1, sy * 4.3 + 1.3);
            v = n * w + jitter[i] * w;

            if (shimmer > 0) {
              const s = hash2(x * 3 + shStep * 17, y * 5 + shStep * 31) - 0.5;
              v += s * 0.28 * shimmer * Math.sqrt(w);
            }
            if (scan > 0) {
              const d = nx * 0.65 + ny * 0.75 - front;
              v += Math.exp(-(d * d) / (2 * 0.05 * 0.05)) * 0.34 * scan * w;
            }
          }

          for (let r = 0; r < ripples.length; r++) {
            const rp = ripples[r];
            const age = t - rp.t0;
            const dx = x - rp.x;
            const dy = y - rp.y;
            const d = Math.sqrt(dx * dx + dy * dy) - age * RIPPLE_SPEED;
            v += Math.exp(-(d * d) / 5.8) * (1 - age / RIPPLE_LIFE) * rp.amp * free[i];
          }

          const h = heat[i];
          if (h > 0.003) {
            v += h;
            heat[i] = h * decay;
          } else if (h !== 0) {
            heat[i] = 0;
          }

          if (introT < 2.2) {
            const phase = (nx + ny) * 0.5;
            const rev = clamp01((introT * 1.5 - (1 - phase)) / 0.3);
            v *= rev;
          }

          const level = v < 0.22 ? 0 : v < 0.42 ? 1 : v < 0.62 ? 2 : v < 0.8 ? 3 : 4;
          pixels[i] = colors[level];
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;

      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.14;
      pointer.x += (pointer.tx - pointer.x) * 0.3;
      pointer.y += (pointer.ty - pointer.y) * 0.3;

      if (now - lastDraw < 1000 / Math.max(10, settingsRef.current.fps)) return;
      lastDraw = now;
      draw(now / 1000, true);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (isStatic()) {
        draw(0, false);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (isStatic()) return;
      const r = wrap.getBoundingClientRect();
      const inside =
        event.clientX >= r.left &&
        event.clientX <= r.right &&
        event.clientY >= r.top &&
        event.clientY <= r.bottom;
      pointer.active = inside;
      if (inside) {
        pointer.tx = (event.clientX - r.left) / cell;
        pointer.ty = (event.clientY - r.top) / cell;
        if (pointer.strength < 0.02) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
      }
    };
    const onDown = (event: PointerEvent) => {
      if (isStatic()) return;
      const r = wrap.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      ) {
        return;
      }
      // Un toque o un clic lanza una onda fuerte desde ese punto.
      spawnRipple(
        (event.clientX - r.left) / cell,
        (event.clientY - r.top) / cell,
        lastTime || performance.now() / 1000,
        0.95,
      );
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const resize = new ResizeObserver(() => {
      layout();
      draw(lastTime, !isStatic());
    });
    resize.observe(wrap);
    const avoidEl = getAvoid();
    if (avoidEl) resize.observe(avoidEl);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      // La entrada en ola empieza cuando el campo se ve por primera vez: así
      // también se nota en el pie, que al cargar la página está fuera de pantalla.
      if (visible && introArmed) {
        introArmed = false;
        introStart = null;
      }
    });
    intersection.observe(wrap);

    const recolor = () => {
      colors = readPalette(settingsRef.current.palette);
      draw(lastTime, !isStatic());
    };
    // Recoloreo al cambiar de tema (next-themes alterna la clase `dark`).
    const theme = new MutationObserver(recolor);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    apiRef.current = {
      relayout: () => {
        layout();
        draw(lastTime, !isStatic());
      },
      recolor,
    };

    layout();
    start();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    reduceMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      apiRef.current = null;
      resize.disconnect();
      intersection.disconnect();
      theme.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduceMotion.removeEventListener("change", start);
    };
  }, [avoidRef, avoidId, still]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ imageRendering: "pixelated" }}
      />
      {/* Separación de 1px entre celdas: líneas del color del fondo */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--background) 1px, transparent 1px), linear-gradient(to bottom, var(--background) 1px, transparent 1px)",
        }}
      />
    </div>
  );
}
