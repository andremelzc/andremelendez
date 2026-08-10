import React from "react";
import SkillsClient from "@/app/components/sections/SkillsClient";
import { getSkills } from "@/app/lib/sanity";

export default async function SkillsSection() {
  const initialSkills = await getSkills();

  return (
    <section id="habilidades" className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-12 xl:gap-10 text-center items-center max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-6">
          {/* Header */}
          <div className="relative flex flex-col gap-3 sm:gap-4 lg:gap-3">
            {/* Resplandor detrás del título */}
            <div className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2 w-60 sm:w-72 md:w-80 lg:w-72 h-12 sm:h-16 md:h-20 lg:h-16 bg-gradient-to-r from-transparent via-accent/15 to-transparent blur-2xl opacity-80" />
            {/* Título */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-semibold">
              Habilidades
            </h1>
            {/* Divisor */}
            <div className="h-px w-16 sm:w-20 md:w-24 lg:w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto" />
            {/* Subtítulo con efecto de cristal de fondo */}
            <div className="relative inline-block mx-auto">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-transparent via-background/20 to-transparent rounded-lg blur-sm" />
              <h2 className="relative text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl text-foreground/85 font-light tracking-wide px-3 sm:px-4 py-1 backdrop-blur-sm bg-background/10 rounded-lg border border-border/5">
                Explora mis habilidades en las siguientes áreas
              </h2>
            </div>
          </div>
          <SkillsClient initialSkills={initialSkills} />
        </div>
      </div>
    </section>
  );
}
