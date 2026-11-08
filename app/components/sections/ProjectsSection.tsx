import React from "react";
import ProjectRow from "@/app/components/projects/ProjectRow";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { getAllProjects } from "@/app/lib/sanity";

export default async function ProjectsSection() {
  const projects = await getAllProjects();

  return (
    <section id="proyectos" className="px-4 py-20 sm:px-8 sm:py-28 lg:px-14">
      <SectionHeader title="Proyectos" description="Lo que he construido hasta ahora." />
      <ul className="mt-10 border-b border-foreground/25 sm:mt-14">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
    </section>
  );
}
