import type { Metadata } from "next";
import { shortName } from "@/app/lib/name";
import type { Profile } from "@/app/types/profile";

/**
 * Dirección pública del sitio. Se puede fijar con NEXT_PUBLIC_SITE_URL; en
 * Vercel se toma el dominio de producción del proyecto, y si no hay ninguno se
 * usa el dominio conocido. Las vistas previas apuntan a producción en sus
 * enlaces canónicos, que es lo correcto.
 */
export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://andremelendez.vercel.app";
})();

/** Recorta un texto largo a una descripción de buscador (~155 caracteres) sin partir palabras. */
export function summarize(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[.,;:]$/, "") + "…";
}

export const defaultDescription = (profile: Profile) =>
  summarize([profile.bio, profile.subBio].filter(Boolean).join(" "));

interface PageMetadata {
  /** Título de la página; sin él se usa el de la portada ("Nombre | Rol"). */
  title?: string;
  description: string;
  /** Ruta de la página (p. ej. "/proyectos"), para el enlace canónico. */
  path: string;
  /** Imágenes para compartir; sin ellas se usa la imagen generada del sitio. */
  images?: string[];
  noindex?: boolean;
}

/**
 * Metadatos completos de una página. Next sustituye `openGraph` y `twitter`
 * enteros al definirlos en una página, así que se construyen aquí para que
 * ninguna se quede sin el tipo, el idioma o el nombre del sitio.
 */
export function buildMetadata(profile: Profile, page: PageMetadata): Metadata {
  const name = shortName(profile.fullName);
  const fullTitle = page.title ? `${page.title} | ${name}` : `${name} | ${profile.title}`;
  const images = page.images?.map((url) => ({ url }));

  return {
    title: page.title ?? { absolute: fullTitle },
    description: page.description,
    alternates: { canonical: page.path },
    robots: page.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: name,
      title: fullTitle,
      description: page.description,
      url: page.path,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      ...(page.images ? { images: page.images } : {}),
    },
  };
}
