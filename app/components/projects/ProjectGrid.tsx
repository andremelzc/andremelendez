import React from "react";
import { ProjectGridProps } from "@/app/types/projects";
import ProjectCard from "@/app/components/projects/ProjectCard";
import ComingSoonCard from "@/app/components/projects/ComingSoonCard";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

export default function ProjectGrid({ projects, limit }: ProjectGridProps) {
  // Lógica de balanceo dinámico
  const featuredAll = projects.filter((project) => project.featured);
  const regularAll = projects.filter((project) => !project.featured);

  let featuredProjects = featuredAll;
  let regularProjects = regularAll;

  if (limit) {
    const maxFeatured = 3;
    featuredProjects = featuredAll.slice(0, maxFeatured);
    const remainingSlots = limit - featuredProjects.length;
    regularProjects = regularAll.slice(0, remainingSlots);
  }
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-8 w-full">
      {projects.length > 0 ? (
        <>
          {/* Proyectos destacados */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {regularProjects.length === 0 && <ComingSoonCard />}
          </div>

          {/* Proyectos regulares en grid responsive + botón */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-8">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {/* Por si la cantidad de proyectos regulares es impar */}
              {regularProjects.length % 2 === 1 && <ComingSoonCard />}
            </div>
            {/* Botón "Ver más proyectos" si hay más de los que muestra el límite */}
            {limit && projects.length > limit && (
              <div className="flex justify-center mt-16">
                <Link href="/proyectos">
                  <Button variant="outline">Ver más proyectos</Button>
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="relative bg-gradient-to-br from-muted/50 via-background/30 to-muted/50 border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col w-full h-full p-8 md:p-16 transition-all duration-300 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 rounded-2xl md:rounded-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
          <div className="text-center py-12 px-8 relative z-10 flex flex-col items-center justify-center min-h-[200px]">
            <svg className="w-16 h-16 text-foreground/20 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl md:text-2xl text-foreground font-medium mb-2">
              No hay proyectos en esta categoría
            </h3>
            <p className="text-foreground/60 text-sm md:text-base">
              Selecciona otra categoría para ver más proyectos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
