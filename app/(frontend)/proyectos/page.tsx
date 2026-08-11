import React from "react";
import Link from "next/link";
import { getAllProjects } from "@/app/lib/sanity";
import ProjectGrid from "@/app/components/projects/ProjectGrid";
import ModernBackground from "@/app/components/ui/ModernBackground";
import Button from "@/app/components/ui/Button";
import { HiArrowLeft } from "react-icons/hi";

export const metadata = {
  title: "Catálogo de Proyectos | André Meléndez",
  description: "Explora el catálogo completo de mis proyectos de desarrollo de software.",
};

export const revalidate = 60;

export default async function ProyectosPage() {
  const projects = await getAllProjects();

  return (
    <div className="relative font-sans min-h-screen px-6 sm:px-12 md:px-16 lg:px-20 pt-28 sm:pt-32 md:pt-36 pb-32">
      <ModernBackground />

      {/* Botón de retroceso */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 relative z-10">
        <Link href="/#proyectos" className="inline-block">
          <Button
            variant="outline"
            size="sm"
            icon={<HiArrowLeft />}
            iconPosition="left"
            className="backdrop-blur-md"
          >
            Volver al inicio
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-12 xl:gap-10 text-center items-center">
        {/* Header - Misma estética que ProjectsSection */}
        <div className="relative flex flex-col gap-3 sm:gap-4 lg:gap-3">
          <div className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2 w-60 sm:w-72 md:w-80 lg:w-72 h-12 sm:h-16 md:h-20 lg:h-16 bg-gradient-to-r from-transparent via-accent/15 to-transparent blur-2xl opacity-80" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-semibold">
            Catálogo Completo
          </h1>
          <div className="h-px w-16 sm:w-20 md:w-24 lg:w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto" />
          <div className="relative inline-block mx-auto">
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-transparent via-background/20 to-transparent rounded-lg blur-sm" />
            <h2 className="relative text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl text-foreground/85 font-light tracking-wide px-3 sm:px-4 py-1 backdrop-blur-sm bg-background/10 rounded-lg border border-border/5">
              Todos los proyectos que he construido
            </h2>
          </div>
        </div>

        <div className="w-full">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </div>
  );
}
