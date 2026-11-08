import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import ProjectIndex from "@/app/components/projects/ProjectIndex";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { getAllProjects } from "@/app/lib/sanity";

export const metadata: Metadata = {
  title: "Catálogo de proyectos | Andre Melendez",
  description: "El catálogo completo de mis proyectos de desarrollo de software.",
};

export const revalidate = 60;

/**
 * Catálogo completo. Hoy la portada ya lista todos los proyectos; esta ruta
 * queda para cuando la portada muestre solo una selección y enlace aquí.
 */
export default async function ProyectosPage() {
  const projects = await getAllProjects();

  return (
    <article className="px-4 pb-24 pt-28 font-sans sm:px-8 lg:px-14">
      <Link
        href="/#proyectos"
        className="hit-area inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-medium transition-colors duration-150 hover:border-accent hover:text-accent-ink"
      >
        <HiArrowLeft aria-hidden="true" />
        Volver al inicio
      </Link>

      <div className="mt-10 sm:mt-14">
        <SectionHeader
          as="h1"
          title="Catálogo completo"
          description="Todos los proyectos que he construido."
        />
        <ProjectIndex projects={projects} />
      </div>
    </article>
  );
}
