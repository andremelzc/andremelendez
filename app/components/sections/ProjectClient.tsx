"use client";

import React, { useState } from "react";
import Button from "@/app/components/ui/Button";
import ProjectGrid from "@/app/components/projects/ProjectGrid";
import ProjectGridSkeleton from "@/app/components/projects/ProjectGridSkeleton";
import { Project, ProjectCategory } from "@/app/types/projects";
import { getProjectsByCategory } from "@/app/lib/sanity";

interface ProjectClientProps {
  initialProjects: Project[];
}

export default function ProjectClient({ initialProjects }: ProjectClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activeFilter, setActiveFilter] = useState<string>("Todos");
  const [loading, setLoading] = useState(false);

  const handleFilter = async (category: string) => {
    setLoading(true);
    setActiveFilter(category);

    try {
      if (category === "Todos") {
        setProjects(initialProjects);
      } else {
        const filteredProjects = await getProjectsByCategory(
          category as ProjectCategory
        );
        setProjects(filteredProjects);
      }
    } catch (error) {
      console.error("Error filtering projects:", error);
      setProjects(initialProjects);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Filtros con glassmorphism sutil */}
      <div className="relative group">
        {/* Resplandor de fondo para los filtros */}
        <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-accent/8 via-cherry-300/8 to-accent/8 rounded-xl sm:rounded-2xl blur-xl opacity-80 group-hover:opacity-100 transition-all duration-500" />

        {/* Contenedor glassmorphism principal */}
        <div className="relative backdrop-blur-md bg-background/15 border border-border/40 rounded-xl sm:rounded-2xl p-4 shadow-lg hover:shadow-xl hover:bg-background/20 transition-all duration-300">
          {/* Borde superior brillante */}
          <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Efecto hover sutil */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4 lg:gap-4 justify-center">
            <Button
              variant={activeFilter === "Todos" ? "primary" : "outline"}
              onClick={() => handleFilter("Todos")}
              disabled={loading}
            >
              Todos
            </Button>
            <Button
              variant={
                activeFilter === "Desarrollo Web" ? "primary" : "outline"
              }
              onClick={() => handleFilter("Desarrollo Web")}
              disabled={loading}
            >
              Desarrollo web
            </Button>
            <Button
              variant={
                activeFilter === "Desarrollo Móvil" ? "primary" : "outline"
              }
              onClick={() => handleFilter("Desarrollo Móvil")}
              disabled={loading}
            >
              Desarrollo móvil
            </Button>
            <Button
              variant={activeFilter === "Otros" ? "primary" : "outline"}
              onClick={() => handleFilter("Otros")}
              disabled={loading}
            >
              Otros
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="transition-all duration-300">
        {loading ? (
          <ProjectGridSkeleton count={4} featuredCount={2} />
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </>
  );
}
