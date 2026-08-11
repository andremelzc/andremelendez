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
        <div className="relative bg-gradient-to-br from-midnight-800 via-midnight-900 to-midnight-800 border border-midnight-600/50 rounded-3xl shadow-2xl text-background flex flex-col w-full h-full hover:shadow-3xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 rounded-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-midnight-500/40 to-transparent" />
          <div className="text-center py-12 px-8">
            <h3 className="text-xl text-foreground/70 font-medium">
              No hay proyectos en esta categoría
            </h3>
            <p className="text-foreground/50 mt-2">
              Selecciona otra categoría para ver más proyectos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
