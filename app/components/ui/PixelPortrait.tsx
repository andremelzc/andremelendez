"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  isDarkTheme,
  pack,
  readPaletteRGB,
  smooth,
  clamp01,
} from "@/app/lib/pixelPalette";
import {
  PORTRAIT_DEFAULTS,
  type PortraitSettings,
} from "@/app/lib/pixelSettings";

interface PixelPortraitProps {
  /** URL de la foto (Sanity o local). */
  src: string;
  alt: string;
  /** Ajustes del efecto (ver lib/pixelSettings). Lo que falte usa el valor por defecto. */
  settings?: Partial<PortraitSettings>;
  className?: string;
}

// Dónde está la cara dentro de la foto completa (0-1). El foco en reposo
// gira alrededor de este punto para que la cara se vaya descubriendo sola.
const FACE = { x: 0.52, y: 0.42 };

const BAYER_4X4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** URL del mismo origen para leer los píxeles (el optimizador de Next). */
function sampleUrl(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=384&q=75`;
}

/**
 * Retrato en celdas: la foto se reduce a la paleta de cinco pasos con
 * tramado ordenado. Tiene tres modos:
 *
 *  - focus: pixelada, con una ventana nítida que sigue al cursor (o recorre
 *    la cara sola en reposo);
 *  - pixel: todo pixelado, sin zona nítida; el cursor calienta las celdas y
 *    el tramado "hierve";
 *  - photo: solo la foto, sin efecto.
 *
 * Se usa la foto completa, sin recortar. La foto nítida es la base
 * accesible; el canvas es solo decoración. La foto no se muestra hasta que
 * el canvas la cubre, para evitar un destello sin pixelar.
 */
export default function PixelPortrait({
  src,
  alt,
  settings,
  className = "",
}: PixelPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sample = sampleUrl(src);
  const [ready, setReady] = useState(false);

  const merged: PortraitSettings = { ...PORTRAIT_DEFAULTS, ...settings };
  const settingsRef = useRef<PortraitSettings>(merged);
  const apiRef = useRef<{ relayout: () => void; recolor: () => void } | null>(null);

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
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cell = 6;
    let cols = 0;
    let rows = 0;
    let image: ImageData | null = null;
    let pixels = new Uint32Array(0);
    let luminance = new Float32Array(0); // 0-1, normalizada por percentiles
    let tone = new Float32Array(0); // 0 = suelo … 1 = paso más intenso
    let source: HTMLImageElement | null = null;
    let rgb: number[] = readPaletteRGB(settingsRef.current.palette).map((c) =>
      pack(c, 0),
    );
    let dark = isDarkTheme();

    let visible = true;
    let raf = 0;
    let lastDraw = 0;
    let lastTime = 0;
    const pointer = { tx: 0, ty: 0, x: 0, y: 0, active: false };
    const focus = { x: 0, y: 0, strength: 0.8 };

    /** Reduce la foto a cols×rows con el mismo encuadre que la imagen nítida. */
    const sampleImage = () => {
      if (!source || !cols || !rows) return;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      const iw = source.naturalWidth;
      const ih = source.naturalHeight;
      const scale = Math.max(cols / iw, rows / ih);
      const sw = cols / scale;
      const sh = rows / scale;
      octx.drawImage(source, (iw - sw) * 0.5, (ih - sh) * 0.5, sw, sh, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const raw = new Float32Array(cols * rows);
      const histogram = new Uint32Array(256);
      for (let i = 0; i < raw.length; i++) {
        const l = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2];
        raw[i] = l;
        histogram[Math.min(255, Math.round(l))]++;
      }
      // Autocontraste: recorta el 6 % de extremos para aprovechar los 5 pasos.
      const cut = raw.length * 0.06;
      let acc = 0;
      let lo = 0;
      for (; lo < 255; lo++) {
        acc += histogram[lo];
        if (acc > cut) break;
      }
      acc = 0;
      let hi = 255;
      for (; hi > 0; hi--) {
        acc += histogram[hi];
        if (acc > cut) break;
      }
      const range = Math.max(1, hi - lo);
      luminance = new Float32Array(raw.length);
      for (let i = 0; i < raw.length; i++) {
        luminance[i] = clamp01((raw[i] - lo) / range);
      }
      buildTone();
    };

    /** Tema claro: lo oscuro de la foto es tinta. Tema oscuro: lo claro es luz.
     *  La curva aclara los tonos medios (la piel) para separar cara y ropa. */
    const buildTone = () => {
      tone = new Float32Array(luminance.length);
      for (let i = 0; i < luminance.length; i++) {
        tone[i] = dark
          ? Math.pow(luminance[i], 0.8)
          : Math.pow(1 - luminance[i], 1.5);
      }
    };

    const layout = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (!width || !height) return;
      const wanted = settingsRef.current.cell;
      cell = wanted > 0 ? wanted : width < 340 ? 4 : 5;
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      image = ctx.createImageData(cols, rows);
      pixels = new Uint32Array(image.data.buffer);
      focus.x = cols * FACE.x;
      focus.y = rows * FACE.y;
      sampleImage();
    };

    const draw = (t: number, still: boolean) => {
      const S = settingsRef.current;
      if (S.mode === "photo") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      if (!image || tone.length !== cols * rows) return;
      lastTime = t;

      // El tramado "hierve": la matriz de umbrales se desplaza con el tiempo.
      const phase = still ? 0 : Math.floor(t * S.boil * 8);
      const dither = S.dither;

      // Foco (modo focus): sigue al cursor o recorre la cara en reposo.
      const k = S.idle;
      const idleX = cols * (FACE.x + 0.2 * Math.sin(t * 0.45 * k));
      const idleY = rows * (FACE.y + 0.14 * Math.sin(t * 0.33 * k + 1.2));
      const targetX = still ? cols * FACE.x : pointer.active ? pointer.x : idleX;
      const targetY = still ? rows * FACE.y : pointer.active ? pointer.y : idleY;
      const targetS = still ? 0.9 : pointer.active ? 1 : 0.8;
      focus.x += (targetX - focus.x) * (still ? 1 : 0.18);
      focus.y += (targetY - focus.y) * (still ? 1 : 0.18);
      focus.strength += (targetS - focus.strength) * (still ? 1 : 0.12);

      const focusMode = S.mode === "focus";
      const sigma = Math.max(cols, rows * 0.8) * S.focusSize;
      const inv = 1 / (2 * sigma * sigma);
      // En modo pixel el cursor calienta las celdas cercanas.
      const heatSigma = Math.max(3, cols * 0.07);
      const heatInv = 1 / (2 * heatSigma * heatSigma);
      const heating = !focusMode && !still && pointer.active;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;

          let tt = tone[i];
          if (heating) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            tt += Math.exp(-(dx * dx + dy * dy) * heatInv) * 0.55;
          }
          const threshold =
            BAYER_4X4[((y + phase) & 3) * 4 + ((x + phase * 3) & 3)] / 16 - 0.5;
          const level = Math.max(0, Math.min(4, Math.round(tt * 4 + threshold * dither)));

          let alpha = 255;
          if (focusMode) {
            const dx = x - focus.x;
            const dy = y - focus.y;
            const f = Math.exp(-(dx * dx + dy * dy) * inv) * focus.strength;
            alpha = Math.round(255 * (1 - smooth(clamp01(f * 1.25))));
          }
          pixels[i] = ((alpha << 24) | rgb[level]) >>> 0;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      pointer.x += (pointer.tx - pointer.x) * 0.3;
      pointer.y += (pointer.ty - pointer.y) * 0.3;
      if (now - lastDraw < 33) return;
      lastDraw = now;
      draw(now / 1000, false);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduceMotion.matches) draw(0, true);
      else raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const r = wrap.getBoundingClientRect();
      const margin = 48;
      const inside =
        event.clientX >= r.left - margin &&
        event.clientX <= r.right + margin &&
        event.clientY >= r.top - margin &&
        event.clientY <= r.bottom + margin;
      pointer.active = inside;
      if (inside) {
        pointer.tx = (event.clientX - r.left) / cell;
        pointer.ty = (event.clientY - r.top) / cell;
        if (!pointer.x && !pointer.y) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
      }
    };
    const onLeave = () => {
      pointer.active = false;
    };

    // Carga la foto reducida por el optimizador (mismo origen, legible).
    const photo = new window.Image();
    photo.decoding = "async";
    photo.onload = () => {
      source = photo;
      sampleImage();
      draw(lastTime, reduceMotion.matches);
      // Hasta aquí la foto nítida estaba oculta: ya hay canvas que la cubre.
      setReady(true);
    };
    // Si la foto no carga, se muestra tal cual en vez de quedar oculta.
    photo.onerror = () => setReady(true);
    photo.src = sample;

    const resize = new ResizeObserver(() => {
      layout();
      draw(lastTime, reduceMotion.matches);
    });
    resize.observe(wrap);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(wrap);

    const recolor = () => {
      rgb = readPaletteRGB(settingsRef.current.palette).map((c) => pack(c, 0));
      dark = isDarkTheme();
      if (luminance.length) buildTone();
      draw(lastTime, reduceMotion.matches);
    };
    const theme = new MutationObserver(recolor);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    apiRef.current = {
      relayout: () => {
        layout();
        draw(lastTime, reduceMotion.matches);
      },
      recolor,
    };

    layout();
    start();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    reduceMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      apiRef.current = null;
      photo.onload = null;
      photo.onerror = null;
      resize.disconnect();
      intersection.disconnect();
      theme.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduceMotion.removeEventListener("change", start);
    };
  }, [sample]);

  const showImage = ready || merged.mode === "photo";

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-[3/4] w-full overflow-hidden bg-muted ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 30vw, 90vw"
        className={`pixel-portrait-img object-cover transition-opacity duration-300 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 block"
        style={{ imageRendering: "pixelated" }}
      />
      {/* Sin JavaScript no hay canvas: se muestra la foto tal cual. */}
      <noscript>
        <style>{".pixel-portrait-img{opacity:1!important}"}</style>
      </noscript>
    </div>
  );
}
