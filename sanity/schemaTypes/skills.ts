import { defineType, defineField } from "sanity";

export default defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "frontend",
      title: "Frontend",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: 'React', value: 'React' },
          { title: 'Next.js', value: 'Next.js' },
          { title: 'Vue.js', value: 'Vue' },
          { title: 'Angular', value: 'Angular' },
          { title: 'Svelte', value: 'Svelte' },
          { title: 'Nuxt.js', value: 'Nuxt.js' },

          { title: 'JavaScript', value: 'JavaScript' },
          { title: 'TypeScript', value: 'TypeScript' },
          { title: 'HTML', value: 'HTML' },
          { title: 'CSS', value: 'CSS' },
          { title: 'Tailwind CSS', value: 'Tailwind CSS' },
          { title: 'Bootstrap', value: 'Bootstrap' },
          { title: 'Sass', value: 'Sass' },
          { title: 'Styled Components', value: 'Styled Components' },
        ],
      },
    }),
    defineField({
      name: "backend",
      title: "Backend y DB",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: 'Node.js', value: 'Node.js' },
          { title: 'Express', value: 'Express' },
          { title: 'NestJS', value: 'NestJS' },
          { title: 'Django', value: 'Django' },
          { title: 'FastAPI', value: 'FastAPI' },
          { title: 'Flask', value: 'Flask' },
          { title: 'Spring Boot', value: 'Spring Boot' },
          { title: 'Laravel', value: 'Laravel' },
          { title: 'Ruby on Rails', value: 'Ruby on Rails' },

          { title: 'Python', value: 'Python' },
          { title: 'C++', value: 'C++' },
          { title: 'PHP', value: 'PHP' },
          { title: 'Rust', value: 'Rust' },
          { title: 'Go', value: 'Go' },
          { title: 'Swift', value: 'Swift' },
          { title: 'Kotlin', value: 'Kotlin' },

          { title: 'MongoDB', value: 'MongoDB' },
          { title: 'PostgreSQL', value: 'PostgreSQL' },
          { title: 'MySQL', value: 'MySQL' },
          { title: 'Redis', value: 'Redis' },
          { title: 'SQLite', value: 'SQLite' },
          { title: 'Firebase', value: 'Firebase' },
          { title: 'Supabase', value: 'Supabase' },
          { title: 'Prisma', value: 'Prisma' },

          { title: 'GraphQL', value: 'GraphQL' },
          { title: 'Apollo', value: 'Apollo' },
          { title: 'Socket.io', value: 'Socket.io' },
        ],
      },
    }),
    defineField({
      name: "tools",
      title: "Herramientas y Gestión",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: 'Git', value: 'Git' },
          { title: 'GitHub', value: 'GitHub' },
          { title: 'GitLab', value: 'GitLab' },
          { title: 'Docker', value: 'Docker' },
          { title: 'Kubernetes', value: 'Kubernetes' },
          { title: 'Jenkins', value: 'Jenkins' },
          { title: 'GitHub Actions', value: 'GitHub Actions' },

          { title: 'Webpack', value: 'Webpack' },
          { title: 'Vite', value: 'Vite' },
          { title: 'esbuild', value: 'esbuild' },

          { title: 'Vercel', value: 'Vercel' },
          { title: 'Netlify', value: 'Netlify' },
          { title: 'AWS', value: 'AWS' },
          { title: 'Google Cloud', value: 'Google Cloud' },
          { title: 'Heroku', value: 'Heroku' },
          { title: 'DigitalOcean', value: 'DigitalOcean' },

          { title: 'Jest', value: 'Jest' },
          { title: 'Cypress', value: 'Cypress' },
          { title: 'Vitest', value: 'Vitest' },

          { title: 'Redux', value: 'Redux' },
          { title: 'MobX', value: 'MobX' },

          { title: 'Flutter', value: 'Flutter' },
          { title: 'Ionic', value: 'Ionic' },

          { title: 'npm', value: 'npm' },
          { title: 'Yarn', value: 'Yarn' },
          { title: 'pnpm', value: 'pnpm' },

          { title: 'IntelliJ IDEA', value: 'IntelliJ IDEA' },
          { title: 'WebStorm', value: 'WebStorm' },

          { title: 'macOS', value: 'macOS' },
          { title: 'Linux', value: 'Linux' },
          { title: 'Ubuntu', value: 'Ubuntu' },

          { title: 'Figma', value: 'Figma' },
          { title: 'Postman', value: 'Postman' },
          { title: 'Notion', value: 'Notion' },
          { title: 'Slack', value: 'Slack' },
          { title: 'Discord', value: 'Discord' },
        ],
      },
    }),
  ],
});