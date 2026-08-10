import { defineType, defineField } from "sanity";
import { getAvailableTechs } from "../../app/data/techIcons";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "primaryImage",
      title: "Primary Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hasDetails",
      title: "Has Details Page",
      type: "boolean",
      description: "Mark true if this project should have its own detail page",
      initialValue: false,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      hidden: ({ document }) => !document?.hasDetails,
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: getAvailableTechs(),
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).max(8).error("Please select 1-8 technologies"),
    }),
    defineField({
      name: "client",
      title: "Client / Organization",
      type: "string",
      description: "e.g. UNMSM, Personal, Freelance",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. 2 months, 3 weeks",
    }),
    defineField({
      name: "highlights",
      title: "Highlights / Key Achievements",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points of key accomplishments (e.g. Optimized load times by 40%)",
    }),
    defineField({
      name: "designUrl",
      title: "Design URL (Figma)",
      type: "url",
    }),
    defineField({
      name: "videoUrl",
      title: "Video Demo URL",
      type: "url",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Optional detailed portable text for the project detail page",
      hidden: ({ document }) => !document?.hasDetails,
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Optional additional images for the detail page",
      hidden: ({ document }) => !document?.hasDetails,
    }),
    defineField({
      name: "demoUrl",
      title: "Demo URL",
      type: "url",
    }),
    defineField({
      name: "codeUrl",
      title: "Code Repository URL",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Desarrollo Web", value: "Desarrollo Web" },
          { title: "Desarrollo Móvil", value: "Desarrollo Móvil" },
          { title: "Otros", value: "Otros" },
        ],
      },
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Frontend Developer", value: "Frontend Developer" },
          { title: "Backend Developer", value: "Backend Developer" },
          { title: "Full Stack Developer", value: "Full Stack Developer" },
          { title: "UI/UX Designer", value: "UI/UX Designer" },
          { title: "DevOps Engineer", value: "DevOps Engineer" },
          { title: "Project Lead", value: "Project Lead" },
        ],
      },
    }),
    defineField({
      name: "teamSize",
      title: "Team Size",
      type: "string",
      options: {
        list: [
          { title: "Solo Project", value: "Solo" },
          { title: "Team Project", value: "Team" },
        ],
      },
      initialValue: "Solo",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
});
