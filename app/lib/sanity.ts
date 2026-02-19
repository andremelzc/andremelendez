import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import {
  Project,
  ProjectCategory,
  ProjectRole,
  TeamSize,
} from "@/app/types/projects";

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
  frontend,
  backend,
  tools
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
    return projects.map(transformSanityProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(featuredProjectsQuery);
    return projects.map(transformSanityProject);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
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
    return projects.map(transformSanityProject);
  } catch (error) {
    console.error("Error fetching projects by category:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await client.fetch(projectByIdQuery, { id });
    return project ? transformSanityProject(project) : null;
  } catch (error) {
    console.error("Error fetching project by id:", error);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug });
    return project ? transformSanityProject(project) : null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
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

export async function getSkills() {
  try {
    return await client.fetch(skillsQuery);
  } catch (error) {
    console.error("Error fetching skills from Sanity:", error);
    return { frontend: [], backend: [], tools: [] };
  }
}
