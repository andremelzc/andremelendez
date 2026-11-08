/**
 * Paleta de cinco pasos compartida por el campo de píxeles y el retrato.
 * Solo se usa en el navegador (lee estilos calculados del documento).
 */

export type RGB = readonly [number, number, number];

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smooth = (t: number) => t * t * (3 - 2 * t);

function parseColor(raw: string, fallback: RGB): RGB {
  const v = raw.trim();
  if (v.startsWith("#")) {
    let hex = v.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const n = parseInt(hex.slice(0, 6), 16);
    if (!Number.isNaN(n)) return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = v.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
  return fallback;
}

/**
 * Cinco pasos: suelo, cereza claro, cereza, cereza oscuro y negro. En tema
 * oscuro el orden se invierte para que las celdas "calientes" sean las más
 * claras y el extremo vacío siga siendo el fondo de la página.
 *
 * Devuelve colores RGB sueltos; `pack` los convierte a ABGR para escribirlos
 * en un Uint32Array.
 */
export function readPaletteRGB(): RGB[] {
  const root = document.documentElement;
  const dark = root.classList.contains("dark");
  const cs = getComputedStyle(root);
  const get = (name: string, fallback: RGB) =>
    parseColor(cs.getPropertyValue(name), fallback);

  const ground = get("--background", dark ? [11, 11, 11] : [255, 252, 249]);
  const cream = get("--color-cream-50", [255, 252, 249]);
  const ink = get("--color-midnight-900", [11, 11, 11]);
  const cherryLight = get("--color-cherry-200", [244, 199, 199]);
  const accent = get("--accent", dark ? [214, 69, 69] : [185, 55, 55]);
  const cherryDark = get("--color-cherry-800", [107, 29, 29]);

  return dark
    ? [ground, cherryDark, accent, cherryLight, cream]
    : [ground, cherryLight, accent, cherryDark, ink];
}

/** ABGR en little-endian con alfa opcional (0-255). */
export function pack([r, g, b]: RGB, alpha = 255): number {
  return ((alpha << 24) | (b << 16) | (g << 8) | r) >>> 0;
}

export function readPalette(): number[] {
  return readPaletteRGB().map((c) => pack(c));
}

export function isDarkTheme(): boolean {
  return document.documentElement.classList.contains("dark");
}
