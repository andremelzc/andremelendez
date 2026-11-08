"use client";

import { useEffect, useRef, type RefObject } from "react";
import { clamp01, readPalette, smooth } from "@/app/lib/pixelPalette";

interface PixelFieldProps {
  /** Elemento cuyo recuadro (más un margen) queda libre de celdas. */
  avoidRef?: RefObject<HTMLElement | null>;
  className?: string;
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

/**
 * Campo de celdas cuadradas que se enfría hacia el texto y se calienta bajo
 * el cursor. Es decorativo: no contiene información ni recibe eventos.
 *
 * - Un canvas de una celda por píxel, escalado sin suavizado (barato).
 * - Se pausa fuera de pantalla y con la pestaña oculta.
 * - Con `prefers-reduced-motion` dibuja un único fotograma estático.
 */
export default function PixelField({ avoidRef, className = "" }: PixelFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const grid = gridRef.current;
    if (!wrap || !canvas || !grid) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cell = 16;
    let cols = 0;
    let rows = 0;
    let image: ImageData | null = null;
    let pixels = new Uint32Array(0);
    let mask = new Float32Array(0); // banda diagonal × zona libre de texto
    let free = new Float32Array(0); // 0 sobre el texto, 1 lejos de él
    let jitter = new Float32Array(0); // dispersión fija de los bordes
    let colors = readPalette();

    let visible = true;
    let raf = 0;
    let lastDraw = 0;
    let lastTime = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, active: false };

    const layout = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (!width || !height) return;

      cell = width < 640 ? 12 : 16;
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
      const avoid = avoidRef?.current;
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

    const draw = (t: number) => {
      if (!image) return;
      lastTime = t;
      const tx = t * 0.06;
      const ty = t * 0.035;
      const strength = pointer.strength;
      const sigma2 = 2 * 4 * 4;
      const hot = strength > 0.01;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const w = mask[i];
          let v = 0;
          if (w > 0.001) {
            const sx = x * 0.09 + tx;
            const sy = y * 0.09 - ty;
            const n =
              0.6 * valueNoise(sx, sy) +
              0.3 * valueNoise(sx * 2.1 + 13.7, sy * 2.1 + 4.2) +
              0.1 * valueNoise(sx * 4.3 + 7.1, sy * 4.3 + 1.3);
            v = n * w * 1.0 + jitter[i] * w;
          }
          if (hot) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            v += Math.exp(-(dx * dx + dy * dy) / sigma2) * 0.8 * strength * free[i];
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

      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.12;
      pointer.x += (pointer.tx - pointer.x) * 0.25;
      pointer.y += (pointer.ty - pointer.y) * 0.25;

      const busy = pointer.active || pointer.strength > 0.02;
      if (now - lastDraw < (busy ? 33 : 66)) return;
      lastDraw = now;
      draw(now / 1000);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduceMotion.matches) {
        draw(0);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
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
    const onLeave = () => {
      pointer.active = false;
    };

    const resize = new ResizeObserver(() => {
      layout();
      if (reduceMotion.matches) draw(0);
      else draw(lastTime);
    });
    resize.observe(wrap);
    if (avoidRef?.current) resize.observe(avoidRef.current);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(wrap);

    // Recoloreo al cambiar de tema (next-themes alterna la clase `dark`).
    const theme = new MutationObserver(() => {
      colors = readPalette();
      draw(lastTime);
    });
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    layout();
    start();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    reduceMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      intersection.disconnect();
      theme.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduceMotion.removeEventListener("change", start);
    };
  }, [avoidRef]);

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
