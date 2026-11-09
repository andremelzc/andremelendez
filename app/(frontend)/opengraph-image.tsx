import { ImageResponse } from "next/og";
import { splitDisplayName } from "@/app/lib/name";
import { siteUrl } from "@/app/lib/metadata";
import { getProfile } from "@/app/lib/sanity";

export const alt = "Portfolio de Andre Meléndez";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PALETTE = ["#fffcf9", "#f4c7c7", "#b93737", "#6b1d1d", "#191919"];
const COLS = 15;
const ROWS = 9;
const CELL = 36;
const GAP = 4;

/** Ruido determinista en [0, 1): la imagen sale igual en cada build. */
const noise = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

/** Mosaico de celdas que se disuelve hacia arriba y a la izquierda, como el campo del hero. */
function cellLevels(): number[][] {
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return Array.from({ length: ROWS }, (_, y) =>
    Array.from({ length: COLS }, (_, x) => {
      const nx = (x + 0.5) / COLS;
      const ny = (y + 0.5) / ROWS;
      const band = Math.pow(clamp((nx * 0.55 + ny * 0.95 - 0.3) / 0.6), 0.8);
      const base = 0.55 + 0.25 * Math.sin(x * 0.55 + 1.3) + 0.2 * Math.cos(y * 0.7 + x * 0.2);
      const v = base * band + (noise(x, y) - 0.5) * 0.22 * band;
      return v < 0.22 ? 0 : v < 0.42 ? 1 : v < 0.62 ? 2 : v < 0.8 ? 3 : 4;
    }),
  );
}

/** Archivo 800 desde Google Fonts; si no se puede descargar, se usa la tipografía por defecto. */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Archivo:wght@800")
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const profile = await getProfile();
  const [first, surname] = splitDisplayName(profile.fullName);
  const font = await loadDisplayFont();
  const levels = cellLevels();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: PALETTE[0],
          color: PALETTE[4],
          fontFamily: font ? "Archivo" : "sans-serif",
        }}
      >
        {/* Mosaico, pegado a la esquina inferior derecha */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: GAP,
          }}
        >
          {levels.map((row, y) => (
            <div key={y} style={{ display: "flex", gap: GAP }}>
              {row.map((level, x) => (
                <div
                  key={x}
                  style={{
                    width: CELL,
                    height: CELL,
                    background: level === 0 ? "transparent" : PALETTE[level],
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 150,
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: -5,
              }}
            >
              <span>{first}</span>
              <span>{surname}</span>
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 44,
                fontWeight: 800,
                color: PALETTE[2],
              }}
            >
              {profile.title}
            </div>
          </div>
          <div style={{ fontSize: 28, color: "#555555" }}>
            {new URL(siteUrl).host}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(font
        ? { fonts: [{ name: "Archivo", data: font, weight: 800 as const, style: "normal" as const }] }
        : {}),
    },
  );
}
