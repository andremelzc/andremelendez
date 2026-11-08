import type { Metadata, Viewport } from "next";
import SiteShell from "@/app/components/layout/SiteShell";
import { defaultDescription, siteUrl } from "@/app/lib/metadata";
import { shortName } from "@/app/lib/name";
import { getProfile } from "@/app/lib/sanity";

export const viewport: Viewport = {
  // La barra del navegador en móvil toma el fondo de cada tema.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  colorScheme: "light dark",
};

/**
 * Metadatos base del sitio. Salen del perfil de Sanity, así que cambiar el
 * nombre, el rol o la presentación allí actualiza también el título y la
 * descripción. Cada página añade el suyo con buildMetadata().
 */
export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const name = shortName(profile.fullName);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${name} | ${profile.title}`, template: `%s | ${name}` },
    description: defaultDescription(profile),
    applicationName: name,
    authors: [{ name: profile.fullName, url: siteUrl }],
    creator: profile.fullName,
  };
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
