"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import SkillGrid from "../skills/SkillGrid";
import SkillGridSkeleton from "../skills/SkillGridSkeleton";
import { Skills } from "@/app/types/skills";

interface SkillsClientProps {
  initialSkills: Skills;
}

export default function SkillsClient({ initialSkills }: SkillsClientProps) {
  // Obtener categorías únicas presentes en la lista de habilidades
  const availableCategories = Array.from(
    new Set((initialSkills.skillsList || []).map((skill) => skill.category))
  );

  const preferredCategoryOrder = [
    "Frontend",
    "Backend y DB",
    "Cloud & DevOps",
    "Mobile Development",
    "Herramientas y Gestión",
    "Diseño & UI/UX"
  ];

  // Ordenar categorías disponibles según el orden preferido
  const categories = availableCategories.sort((a, b) => {
    const indexA = preferredCategoryOrder.indexOf(a);
    const indexB = preferredCategoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const defaultCategory = categories.includes("Frontend") ? "Frontend" : (categories[0] || "");

  const [skills, setSkills] = useState(() =>
    (initialSkills.skillsList || []).filter((s) => s.category === defaultCategory)
  );
  const [activeFilter, setActiveFilter] = useState<string>(defaultCategory);
  const [loading, setLoading] = useState(false);

  const handleFilter = (category: string) => {
    setLoading(true);
    setActiveFilter(category);

    try {
      const filtered = (initialSkills.skillsList || []).filter(
        (s) => s.category === category
      );
      setSkills(filtered);
    } catch (error) {
      console.error("Error filtering skills:", error);
      setSkills([]);
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
        <div className="relative backdrop-blur-md bg-background/15 border border-border/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:bg-background/20 transition-all duration-300 group">
          {/* Borde superior brillante */}
          <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Efecto hover sutil */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "primary" : "outline"}
                onClick={() => handleFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="group w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-gradient-to-br from-muted/50 via-background/30 to-muted/50 border border-border/50 rounded-2xl sm:rounded-3xl p-2 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-accent/30 transform-gpu hover:scale-[1.02] hover:-translate-y-1 relative">
        {/* Efectos internos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 rounded-2xl sm:rounded-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        {/* Efecto de brillo sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          {loading ? <SkillGridSkeleton /> : <SkillGrid skills={skills} />}
        </div>
      </div>
    </>
  );
}
