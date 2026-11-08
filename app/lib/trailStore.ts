import type { PixelPalette } from "@/app/lib/pixelSettings";

/**
 * Estela del cursor en toda la página: celdas que aparecen bajo el puntero y
 * se apagan solas. Solo con puntero fino (ratón) y sin movimiento reducido.
 */
export interface TrailSettings {
  enabled: boolean;
  /** Lado de la celda en px. */
  cell: number;
  /** Radio de la mancha, en celdas. */
  size: number;
  /** Cuánto dura la estela (0,8 = se apaga muy rápido, 0,99 = muy lenta). */
  fade: number;
  /** Opacidad máxima de las celdas (0-1): menos opacidad = texto más legible. */
  alpha: number;
  palette: PixelPalette;
}

export const TRAIL_DEFAULTS: TrailSettings = {
  enabled: true,
  cell: 14,
  size: 1.6,
  fade: 0.94,
  alpha: 0.55,
  palette: "cereza",
};

/**
 * Almacén mínimo de los ajustes de la estela. La estela vive en el layout y el
 * laboratorio (/lab) la modifica en vivo: ambos comparten este estado sin
 * pasar por React.
 */
let current: TrailSettings = TRAIL_DEFAULTS;
const listeners = new Set<() => void>();

export const getTrailSettings = () => current;

export const setTrailSettings = (patch: Partial<TrailSettings>) => {
  current = { ...current, ...patch };
  listeners.forEach((listener) => listener());
};

export const subscribeTrail = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
