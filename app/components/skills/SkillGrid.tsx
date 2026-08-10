"use client";

import TechTag from "@/app/components/ui/TechTag";
import { SkillGridProps } from "@/app/types/skills";

export default function SkillGrid({ skills }: SkillGridProps) {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`flex items-center justify-center transition-all duration-300 rounded-xl p-3 hover:scale-110 sm:hover:scale-120 ${
              skill.isFeatured
                ? "relative group/skill border border-accent/30 bg-accent/5 shadow-lg shadow-accent/5"
                : "border border-transparent"
            }`}
          >
            {skill.isFeatured && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-cherry-300/20 rounded-xl blur-sm opacity-50 group-hover/skill:opacity-85 transition-opacity duration-300 pointer-events-none" />
            )}
            <div className="relative z-10 flex items-center justify-center">
              <TechTag tech={skill.name} variant="icon" size="lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
