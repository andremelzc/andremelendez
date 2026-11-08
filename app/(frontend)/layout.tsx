import type { Metadata } from "next";
import SiteShell from "@/app/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Andre Melendez | Desarrollador Full-Stack",
  description: "Portafolio de Andre Ivan Melendez Cava, estudiante de Ingeniería de Software en la UNMSM, especializado en desarrollo web moderno con React, Next.js, TypeScript y tecnologías full-stack.",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
