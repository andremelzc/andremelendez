/**
 * Parámetros del efecto de píxeles. Todo lo que se puede tocar vive aquí:
 * los componentes reciben un `Partial` y rellenan el resto con estos valores.
 * El laboratorio (/lab, solo en desarrollo) los modifica en vivo.
 */

import type { PaletteVariant } from "@/app/lib/pixelPalette";

/** Variantes de color. Todas parten del fondo de la página como paso 0. */
export type PixelPalette = PaletteVariant;

export interface FieldSettings {
  /** Lado de la celda en px. 0 = automático (12 en móvil, 16 en escritorio). */
  cell: number;
  /** Velocidad del flujo del ruido (1 = lento, 3 = rápido). */
  drift: number;
  /** Centelleo: celdas que parpadean entre pasos de color (0-1). */
  shimmer: number;
  /** Barrido diagonal que cruza el campo cada pocos segundos (0-1). */
  scan: number;
  /** Ondas que nacen solas y se expanden: frecuencia (0-1). */
  ripples: number;
  /** Estela que deja el cursor antes de apagarse (0 = sin estela, 1 = larga). */
  trail: number;
  /** Radio de la mancha del cursor, en celdas. */
  pointerRadius: number;
  /** Las celdas aparecen en una ola al cargar. */
  intro: boolean;
  /** Fotogramas por segundo del campo. */
  fps: number;
  palette: PixelPalette;
}

export const FIELD_DEFAULTS: FieldSettings = {
  cell: 0,
  drift: 1.6,
  shimmer: 0.55,
  scan: 0.6,
  ripples: 0.6,
  trail: 0.7,
  pointerRadius: 4,
  intro: true,
  fps: 40,
  palette: "cereza",
};

/**
 * focus  → la foto se ve pixelada y una ventana nítida sigue al cursor.
 * pixel  → todo pixelado, sin zona nítida; el cursor calienta las celdas.
 * photo  → solo la foto, sin efecto.
 */
export type PortraitMode = "focus" | "pixel" | "photo";

export interface PortraitSettings {
  mode: PortraitMode;
  /** Lado de la celda en px. 0 = automático (6 en escritorio, 5 en pantallas pequeñas). */
  cell: number;
  /** Fuerza del tramado (0 = bandas de color planas, 1,2 = mucho grano). */
  dither: number;
  /** Tamaño de la ventana nítida (modo focus) como fracción del lado mayor. */
  focusSize: number;
  /** Velocidad del recorrido en reposo de la ventana nítida (0 = quieta). */
  idle: number;
  /** El tramado "hierve" (modo pixel y, más suave, en focus). 0-1. */
  boil: number;
  palette: PixelPalette;
}

export const PORTRAIT_DEFAULTS: PortraitSettings = {
  // Todo pixelado por defecto; "focus" (ventana nítida) sigue disponible en /lab.
  mode: "pixel",
  cell: 0,
  dither: 0.9,
  focusSize: 0.16,
  idle: 1,
  boil: 0.35,
  palette: "cereza",
};
