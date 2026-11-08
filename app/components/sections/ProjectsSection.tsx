import React from "react";
import ProjectIndex from "@/app/components/projects/ProjectIndex";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { getAllProjects } from "@/app/lib/sanity";

export default async function ProjectsSection() {
  const projects = await getAllProjects();

  return (
    <section id="proyectos" className="px-4 py-12 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
      <SectionHeader title="Proyectos" description="Lo que he construido hasta ahora." />
      <ProjectIndex projects={projects} />
    </section>
  );
}
