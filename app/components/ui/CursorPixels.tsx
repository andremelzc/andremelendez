"use client";

import { useEffect, useRef } from "react";
import { clamp01, readPaletteRGB } from "@/app/lib/pixelPalette";
import { getTrailSettings, subscribeTrail } from "@/app/lib/trailStore";

/**
 * Estela de celdas bajo el cursor, sobre toda la página. Es temporal: cada
 * celda se apaga sola. Es decorativa y no recibe eventos.
 *
 * - Solo con puntero fino (ratón) y sin `prefers-reduced-motion`.
 * - No consume nada en reposo: el bucle de animación solo corre mientras
 *   queda alguna celda encendida.
 */
export default function CursorPixels() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let S = getTrailSettings();
    let cell = S.cell;
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let heat = new Float32Array(0);
    let levels: string[] = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;
    let last: { x: number; y: number } | null = null;

    const recolor = () => {
      // Pasos 1-4 de la paleta (el 0 es el fondo, que no se pinta).
      levels = readPaletteRGB(S.palette)
        .slice(1)
        .map(([r, g, b]) => `${r},${g},${b}`);
    };

    const layout = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      cell = Math.max(4, S.cell);
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      heat = new Float32Array(cols * rows);
    };

    const splat = (px: number, py: number) => {
      const sigma = Math.max(0.5, S.size) * 0.7;
      const inv = 1 / (2 * sigma * sigma);
      const reach = Math.ceil(sigma * 2.5);
      const cx = Math.floor(px);
      const cy = Math.floor(py);
      for (let y = Math.max(0, cy - reach); y <= Math.min(rows - 1, cy + reach); y++) {
        for (let x = Math.max(0, cx - reach); x <= Math.min(cols - 1, cx + reach); x++) {
          const dx = x + 0.5 - px;
          const dy = y + 0.5 - py;
          const i = y * cols + x;
          heat[i] = Math.min(1, heat[i] + Math.exp(-(dx * dx + dy * dy) * inv) * 0.9);
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.1, (now - lastFrame) / 1000 || 0.016);
      lastFrame = now;
      // La caída se mide en tiempo, no en fotogramas: igual a 60 y a 144 Hz.
      const decay = Math.pow(clamp01(S.fade), dt * 60);

      ctx.clearRect(0, 0, width, height);
      let any = false;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const h = heat[i];
          if (h < 0.04) {
            heat[i] = 0;
            continue;
          }
          any = true;
          const level = Math.min(3, Math.floor(h * 4));
          ctx.fillStyle = `rgba(${levels[level]},${(S.alpha * Math.min(1, h * 1.3)).toFixed(3)})`;
          // 1 px de separación entre celdas, como en el campo del hero.
          ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
          heat[i] = h * decay;
        }
      }
      if (any) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (!S.enabled || event.pointerType === "touch") return;
      const x = event.clientX / cell;
      const y = event.clientY / cell;
      // Si el cursor salta varias celdas, se rellenan las intermedias.
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const steps = Math.min(40, Math.ceil(dist / 0.6));
        for (let s = 1; s < steps; s++) {
          splat(last.x + ((x - last.x) * s) / steps, last.y + ((y - last.y) * s) / steps);
        }
      }
      splat(x, y);
      last = { x, y };
      kick();
    };
    const onLeave = () => {
      last = null;
    };

    layout();
    recolor();

    const unsubscribe = subscribeTrail(() => {
      const before = S;
      S = getTrailSettings();
      if (S.cell !== before.cell) layout();
      if (S.palette !== before.palette) recolor();
      if (!S.enabled) {
        heat.fill(0);
        ctx.clearRect(0, 0, width, height);
      }
    });

    const theme = new MutationObserver(recolor);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("resize", layout);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
      theme.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45]"
    />
  );
}
