import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import {
  Project,
  ProjectCategory,
  ProjectRole,
  TeamSize,
} from "@/app/types/projects";
import { sampleProjects } from "@/app/data/projects";
import { SkillItem, Skills } from "@/app/types/skills";
import { Profile } from "@/app/types/profile";
import { socialUrls } from "@/app/data/urls";

const fallbackSkillsList: SkillItem[] = [
  // Frontend
  { name: "HTML", category: "Frontend", isFeatured: true },
  { name: "CSS", category: "Frontend", isFeatured: true },
  { name: "JavaScript", category: "Frontend", isFeatured: true },
  { name: "TypeScript", category: "Frontend", isFeatured: true },
  { name: "React", category: "Frontend", isFeatured: true },
  { name: "Next.js", category: "Frontend", isFeatured: true },
  { name: "Tailwind CSS", category: "Frontend", isFeatured: true },
  { name: "Bootstrap", category: "Frontend", isFeatured: false },
  { name: "Sass", category: "Frontend", isFeatured: false },
  
  // Backend & DB
  { name: "Node.js", category: "Backend y DB", isFeatured: true },
  { name: "Express", category: "Backend y DB", isFeatured: true },
  { name: "NestJS", category: "Backend y DB", isFeatured: false },
  { name: "Python", category: "Backend y DB", isFeatured: true },
  { name: "PostgreSQL", category: "Backend y DB", isFeatured: true },
  { name: "MongoDB", category: "Backend y DB", isFeatured: true },
  { name: "Prisma", category: "Backend y DB", isFeatured: true },
  { name: "GraphQL", category: "Backend y DB", isFeatured: false },
  
  // Tools
  { name: "Git", category: "Herramientas y Gestión", isFeatured: true },
  { name: "GitHub", category: "Herramientas y Gestión", isFeatured: true },
  { name: "Docker", category: "Herramientas y Gestión", isFeatured: true },
  { name: "Vercel", category: "Herramientas y Gestión", isFeatured: true },
  { name: "npm", category: "Herramientas y Gestión", isFeatured: false },
  { name: "pnpm", category: "Herramientas y Gestión", isFeatured: false },
  { name: "Figma", category: "Herramientas y Gestión", isFeatured: true },
  { name: "Postman", category: "Herramientas y Gestión", isFeatured: false }
];

const fallbackProfile: Profile = {
  fullName: "Andre Ivan Melendez Cava",
  title: "Desarrollador Full-Stack",
  bio: "Estudiante de Ingeniería de Software en la Universidad Nacional Mayor de San Marcos, especializado en el desarrollo de aplicaciones web modernas.",
  subBio: "Enfocado en crear impacto a través de la tecnología y participar en proyectos innovadores.",
  profileImage: "/profile.jpg",
  cvEnglish: "/cv_andre_melendez_english.pdf",
  cvSpanish: "/cv_andre_melendez_español.pdf",
  github: socialUrls.github,
  linkedin: socialUrls.linkedin,
  email: socialUrls.email,
};

// Query para obtener todos los proyectos
const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    description,
    "primaryImage": primaryImage.asset->url,
    "secondaryImage": secondaryImage.asset->url,
    "slug": slug.current,
    featured,
    technologies,
    demoUrl,
    codeUrl,
    designUrl,
    videoUrl,
    client,
    duration,
    highlights,
    category,
    role,
    teamSize,
    hasDetails,
    year,
    publishedAt
  }
`;

// Query para obtener proyectos destacados
const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    description,
    "primaryImage": primaryImage.asset->url,
    "secondaryImage": secondaryImage.asset->url,
    "slug": slug.current,
    featured,
    technologies,
    demoUrl,
    codeUrl,
    designUrl,
    videoUrl,
    client,
    duration,
    highlights,
    category,
    role,
    teamSize,
    hasDetails,
    year,
    publishedAt
  }
`;

// Query para obtener proyectos por categoría
const projectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    description,
    "primaryImage": primaryImage.asset->url,
    "secondaryImage": secondaryImage.asset->url,
    "slug": slug.current,
    featured,
    technologies,
    demoUrl,
    codeUrl,
    designUrl,
    videoUrl,
    client,
    duration,
    highlights,
    category,
    role,
    teamSize,
    hasDetails,
    year,
    publishedAt
  }
`;

// Query para obtener un proyecto específico
const projectByIdQuery = groq`
  *[_type == "project" && _id == $id][0] {
    _id,
    title,
    description,
    "primaryImage": primaryImage.asset->url,
    "secondaryImage": secondaryImage.asset->url,
    "slug": slug.current,
    featured,
    technologies,
    demoUrl,
    codeUrl,
    designUrl,
    videoUrl,
    client,
    duration,
    highlights,
    category,
    role,
    teamSize,
    hasDetails,
    "gallery": gallery[].asset->url,
    longDescription,
    year,
    publishedAt
  }
`;

// Query para obtener un proyecto por slug
const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "primaryImage": primaryImage.asset->url,
    "secondaryImage": secondaryImage.asset->url,
    "slug": slug.current,
    featured,
    technologies,
    demoUrl,
    codeUrl,
    designUrl,
    videoUrl,
    client,
    duration,
    highlights,
    category,
    role,
    teamSize,
    hasDetails,
    "gallery": gallery[].asset->url,
    longDescription,
    year,
    publishedAt
  }
`;

// Query para obtener las skills (único documento)
const skillsQuery = `*[_type == "skills"][0]{
  skillsList
}`;

// Query para obtener información del perfil
const profileQuery = `*[_type == "profile"][0]{
  fullName,
  title,
  bio,
  subBio,
  "profileImage": profileImage.asset->url,
  "cvEnglish": cvEnglish.asset->url,
  "cvSpanish": cvSpanish.asset->url,
  github,
  linkedin,
  email
}`;

// Función para transformar datos de Sanity al formato esperado
function transformSanityProject(
  sanityProject: Record<string, unknown>,
): Project {
  return {
    id: sanityProject._id as string,
    title: sanityProject.title as string,
    description: sanityProject.description as string,
    primaryImage: (sanityProject.primaryImage as string) || "/test.png",
    secondaryImage: (sanityProject.secondaryImage as string) || "/test.png",
    featured: (sanityProject.featured as boolean) || false,
    technologies: (sanityProject.technologies as string[]) || [],
    demoUrl: sanityProject.demoUrl as string,
    codeUrl: sanityProject.codeUrl as string,
    designUrl: sanityProject.designUrl as string,
    videoUrl: sanityProject.videoUrl as string,
    client: sanityProject.client as string,
    duration: sanityProject.duration as string,
    highlights: (sanityProject.highlights as string[]) || [],
    category: sanityProject.category as ProjectCategory,
    role: sanityProject.role as ProjectRole | undefined,
    teamSize: sanityProject.teamSize as TeamSize | undefined,
    year: sanityProject.year as number | undefined,
    hasDetails: sanityProject.hasDetails as boolean | undefined,
    slug: sanityProject.slug as string | undefined,
    longDescription: sanityProject.longDescription as unknown,
    gallery: (sanityProject.gallery as string[]) || [],
  };
}

// Funciones principales para obtener datos
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery);
    if (!projects || projects.length === 0) {
      console.warn("No projects found in Sanity. Falling back to local sample projects.");
      return sampleProjects;
    }
    return projects.map(transformSanityProject);
  } catch (error) {
    console.error("Error fetching projects from Sanity, falling back to local sample projects:", error);
    return sampleProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(featuredProjectsQuery);
    if (!projects || projects.length === 0) {
      return sampleProjects.filter((project) => project.featured);
    }
    return projects.map(transformSanityProject);
  } catch (error) {
    console.error("Error fetching featured projects, falling back to local sample projects:", error);
    return sampleProjects.filter((project) => project.featured);
  }
}

export async function getRegularProjects(): Promise<Project[]> {
  try {
    const allProjects = await getAllProjects();
    return allProjects.filter((project) => !project.featured);
  } catch (error) {
    console.error("Error fetching regular projects:", error);
    return [];
  }
}

export async function getProjectsByCategory(
  category: string,
): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsByCategoryQuery, { category });
    if (!projects || projects.length === 0) {
      return sampleProjects.filter((project) => project.category === category);
    }
    return projects.map(transformSanityProject);
  } catch (error) {
    console.error("Error fetching projects by category, falling back to local sample projects:", error);
    return sampleProjects.filter((project) => project.category === category);
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await client.fetch(projectByIdQuery, { id });
    if (!project) {
      return sampleProjects.find((p) => p.id === id) || null;
    }
    return transformSanityProject(project);
  } catch (error) {
    console.error("Error fetching project by id, falling back to local sample projects:", error);
    return sampleProjects.find((p) => p.id === id) || null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (!project) {
      return sampleProjects.find((p) => p.slug === slug) || null;
    }
    return transformSanityProject(project);
  } catch (error) {
    console.error("Error fetching project by slug, falling back to local sample projects:", error);
    return sampleProjects.find((p) => p.slug === slug) || null;
  }
}

// Función para obtener todas las categorías disponibles
export async function getAvailableCategories(): Promise<string[]> {
  try {
    const categoriesQuery = groq`
      *[_type == "project"] | order(category asc) {
        category
      }
    `;
    const result = await client.fetch(categoriesQuery);
    const categories = [
      ...new Set(
        result
          .map((item: { category: string }) => item.category)
          .filter(Boolean),
      ),
    ];
    return categories as string[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getSkills(): Promise<Skills> {
  try {
    const skills = await client.fetch(skillsQuery);
    if (!skills || !skills.skillsList || skills.skillsList.length === 0) {
      console.warn("No skills found in Sanity. Falling back to local skills.");
      return { skillsList: fallbackSkillsList };
    }
    // Ordenar de modo que isFeatured: true aparezcan primero
    const sortedSkillsList = [...skills.skillsList].sort((a: SkillItem, b: SkillItem) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
    return { skillsList: sortedSkillsList };
  } catch (error) {
    console.error("Error fetching skills from Sanity, falling back to local skills:", error);
    return { skillsList: fallbackSkillsList };
  }
}

export async function getProfile(): Promise<Profile> {
  try {
    const profile = await client.fetch(profileQuery);
    if (!profile) {
      console.warn("No profile found in Sanity. Falling back to local profile.");
      return fallbackProfile;
    }
    return profile;
  } catch (error) {
    console.error("Error fetching profile from Sanity, falling back to local profile:", error);
    return fallbackProfile;
  }
}
