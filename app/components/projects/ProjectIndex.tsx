"use client";

import React, { useState } from "react";
import ProjectRow from "@/app/components/projects/ProjectRow";
import Button from "@/app/components/ui/Button";
import { Project } from "@/app/types/projects";

const ALL = "Todos";

// Orden en que se ofrecen las categorías; las que no estén aquí van después,
// en el orden en que aparecen.
const CATEGORY_ORDER = ["Desarrollo Web", "Desarrollo Móvil", "Otros"];

interface ProjectIndexProps {
  projects: Project[];
}

/**
 * Lista de proyectos con filtro por categoría. El filtro sale solo de los
 * datos: si todos los proyectos son de una misma categoría (hoy, Desarrollo
 * Web) no se muestra; en cuanto Sanity tenga una segunda categoría aparece
 * con "Todos" y una opción por categoría.
 */
export default function ProjectIndex({ projects }: ProjectIndexProps) {
  const [active, setActive] = useState(ALL);

  const present = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean)),
  ) as string[];
  const categories = [
    ...CATEGORY_ORDER.filter((c) => present.includes(c)),
    ...present.filter((c) => !CATEGORY_ORDER.includes(c)),
  ];
  const filterable = categories.length > 1;

  // Si la categoría activa desaparece (p. ej. tras una revalidación), se vuelve a "Todos".
  const current = categories.includes(active) ? active : ALL;
  const visible =
    current === ALL ? projects : projects.filter((p) => p.category === current);

  const count = (category: string) =>
    category === ALL
      ? projects.length
      : projects.filter((p) => p.category === category).length;

  return (
    <>
      {filterable && (
        <div
          role="group"
          aria-label="Filtrar proyectos por categoría"
          className="mt-8 flex flex-wrap gap-2 sm:mt-10"
        >
          {[ALL, ...categories].map((category) => (
            <Button
              key={category}
              size="sm"
              variant={current === category ? "primary" : "outline"}
              pressed={current === category}
              onClick={() => setActive(category)}
            >
              {category} ({count(category)})
            </Button>
          ))}
        </div>
      )}

      <ul
        className={`${filterable ? "mt-8 sm:mt-10" : "mt-10 sm:mt-14"} border-b border-foreground/25`}
      >
        {visible.map((project) => (
          <ProjectRow key={project.id} project={project} showCategory={filterable} />
        ))}
      </ul>
    </>
  );
}
