"use client";

import { useEffect, useState } from "react";

export type HeroVariant = "field" | "photo";

const fromEnv: HeroVariant =
  process.env.NEXT_PUBLIC_HERO_VARIANT === "photo" ? "photo" : "field";

/**
 * Variante del hero: `field` (campo abstracto) o `photo` (retrato en celdas).
 * Se elige con NEXT_PUBLIC_HERO_VARIANT. Solo en desarrollo, `?hero=photo`
 * o `?hero=field` en la URL permite compararlas sin recompilar.
 */
export function useHeroVariant(): HeroVariant {
  const [variant, setVariant] = useState<HeroVariant>(fromEnv);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const query = new URLSearchParams(window.location.search).get("hero");
    if (query === "photo" || query === "field") setVariant(query);
  }, []);

  return variant;
}
