import React from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { getTechIcon } from "@/app/data/techIcons";
import { getSkills } from "@/app/lib/sanity";
import { SkillItem } from "@/app/types/skills";

const CATEGORY_ORDER = [
  "Frontend",
  "Backend y DB",
  "Cloud & DevOps",
  "Mobile Development",
  "Herramientas y Gestión",
  "Diseño & UI/UX",
];

function groupByCategory(skills: SkillItem[]): [string, SkillItem[]][] {
  const groups = new Map<string, SkillItem[]>();
  for (const skill of skills) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }
  const rank = (category: string) => {
    const i = CATEGORY_ORDER.indexOf(category);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  return [...groups.entries()].sort((a, b) => rank(a[0]) - rank(b[0]));
}

export default async function SkillsSection() {
  const { skillsList } = await getSkills();
  const groups = groupByCategory(skillsList);

  return (
    <section id="habilidades" className="px-4 py-20 sm:px-8 sm:py-28 lg:px-14">
      <SectionHeader
        title="Habilidades"
        description="Las herramientas con las que trabajo."
      />
      <div className="mt-10 border-b border-foreground/25 sm:mt-14">
        {groups.map(([category, skills]) => (
          <div
            key={category}
            className="grid gap-4 border-t border-foreground/25 py-6 sm:py-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10"
          >
            <h3 className="text-lg font-semibold">{category}</h3>
            {/* Celdas con borde de 1 px que se solapan: una rejilla de píxeles */}
            <ul className="grid grid-cols-2 pl-px pt-px sm:flex sm:flex-wrap">
              {skills.map((skill) => {
                const Icon = getTechIcon(skill.name);
                return (
                  <li
                    key={skill.name}
                    className="-ml-px -mt-px flex h-24 flex-col sm:w-32 items-center justify-center gap-2 border border-foreground/25 px-2 text-center"
                  >
                    {Icon && (
                      <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                    )}
                    <span className="text-sm font-medium leading-tight">
                      {skill.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
