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

const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

export type PaletteVariant = "cereza" | "tinta" | "cereza-suave";

/**
 * Cinco pasos desde el fondo de la página hasta el más intenso.
 *
 * - cereza: suelo, cereza claro, cereza, cereza oscuro y negro.
 * - tinta: del suelo a la tinta, solo grises (sin cereza).
 * - cereza-suave: solo tonos de cereza, sin llegar al negro.
 *
 * En tema oscuro el orden se invierte (lo intenso es lo claro) para que el
 * extremo vacío siga siendo el fondo de la página.
 */
export function readPaletteRGB(variant: PaletteVariant = "cereza"): RGB[] {
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
  const cherry100 = get("--color-cherry-100", [249, 225, 225]);
  const cherry700 = get("--color-cherry-700", [146, 44, 44]);

  if (variant === "tinta") {
    const end = dark ? cream : ink;
    return [0, 0.25, 0.5, 0.75, 1].map((t) => mix(ground, end, t));
  }
  if (variant === "cereza-suave") {
    return dark
      ? [ground, cherryDark, cherry700, accent, cherryLight]
      : [ground, cherry100, cherryLight, accent, cherry700];
  }
  return dark
    ? [ground, cherryDark, accent, cherryLight, cream]
    : [ground, cherryLight, accent, cherryDark, ink];
}

/** ABGR en little-endian con alfa opcional (0-255). */
export function pack([r, g, b]: RGB, alpha = 255): number {
  return ((alpha << 24) | (b << 16) | (g << 8) | r) >>> 0;
}

export function readPalette(variant: PaletteVariant = "cereza"): number[] {
  return readPaletteRGB(variant).map((c) => pack(c));
}

export function isDarkTheme(): boolean {
  return document.documentElement.classList.contains("dark");
}
