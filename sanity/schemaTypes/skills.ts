import { defineType, defineField } from "sanity";
import { getAvailableTechs } from "../../app/data/techIcons";

export default defineType({
  name: "skills",
  title: "Skills Config",
  type: "document",
  fields: [
    defineField({
      name: "skillsList",
      title: "Skills List",
      type: "array",
      of: [
        {
          type: "object",
          name: "skillItem",
          title: "Skill Item",
          fields: [
            defineField({
              name: "name",
              title: "Technology Name",
              type: "string",
              options: {
                list: getAvailableTechs(),
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Frontend", value: "Frontend" },
                  { title: "Backend & Databases", value: "Backend y DB" },
                  { title: "Cloud & DevOps", value: "Cloud & DevOps" },
                  { title: "Mobile Development", value: "Mobile Development" },
                  { title: "Tools & Management", value: "Herramientas y Gestión" },
                  { title: "UI/UX & Design", value: "Diseño & UI/UX" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isFeatured",
              title: "Is Featured / Core?",
              type: "boolean",
              initialValue: false,
              description: "Featured skills will be displayed first and highlighted.",
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "category",
            },
          },
        },
      ],
    }),
  ],
});