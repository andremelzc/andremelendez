import { defineType, defineField } from "sanity";

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
            list: [
              // Frontend Frameworks
              "React",
              "Next.js",
              "Vue.js",
              "Vue",
              "Angular",
              "Svelte",
              "Nuxt.js",
              // Languages
              "JavaScript",
              "TypeScript",
              "Python",
              "C++",
              "PHP",
              "Rust",
              "Go",
              "Swift",
              "Kotlin",
              // Backend Frameworks
              "Node.js",
              "Express",
              "Express.js",
              "NestJS",
              "Django",
              "FastAPI",
              "Flask",
              "Spring Boot",
              "Laravel",
              "Ruby on Rails",
              // Databases
              "MongoDB",
              "PostgreSQL",
              "MySQL",
              "Redis",
              "SQLite",
              "Firebase",
              "Supabase",
              "Prisma",
              // CSS & Styling
              "Tailwind CSS",
              "TailwindCSS",
              "Bootstrap",
              "Sass",
              "SCSS",
              "Styled Components",
              "CSS",
              "CSS3",
              "HTML",
              "HTML5",
              // Build Tools
              "Webpack",
              "Vite",
              "esbuild",
              // Cloud & Deployment
              "Vercel",
              "Netlify",
              "AWS",
              "Google Cloud",
              "GCP",
              "Heroku",
              "DigitalOcean",
              // Developer Tools
              "Git",
              "GitHub",
              "GitLab",
              "Docker",
              "Kubernetes",
              "Jenkins",
              "GitHub Actions",
              // Testing
              "Jest",
              "Cypress",
              "Vitest",
              // State Management
              "Redux",
              "MobX",
              // Mobile Development
              "Flutter",
              "Ionic",
              // APIs & Communication
              "GraphQL",
              "Apollo",
              "Socket.io",
              // Package Managers
              "npm",
              "Yarn",
              "pnpm",
              // IDEs & Editors
              "IntelliJ IDEA",
              "WebStorm",
              // OS
              "macOS",
              "Linux",
              "Ubuntu",
              // Other Tools
              "Figma",
              "Postman",
              "Notion",
              "Slack",
              "Discord",
            ],
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).max(8).error("Please select 1-8 technologies"),
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
