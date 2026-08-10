export type ProjectCategory = "Desarrollo Web" | "Desarrollo Móvil" | "Otros";
export type TeamSize = "Solo" | "Team";
export type ProjectRole =
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "UI/UX Designer"
  | "DevOps Engineer"
  | "Project Lead";

export interface Project {
  id: string;
  title: string;
  description: string;
  primaryImage: string;
  secondaryImage?: string;
  featured: boolean;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  designUrl?: string;
  videoUrl?: string;
  client?: string;
  duration?: string;
  highlights?: string[];
  category: ProjectCategory;
  role?: ProjectRole;
  teamSize?: TeamSize;
  year?: number;
  hasDetails?: boolean;
  slug?: string;
  longDescription?: unknown; // Portable Text (array of blocks)
  gallery?: string[]; // URLs of images
}

export interface ProjectCardProps {
  project: Project;
}

export interface ProjectGridProps {
  projects: Project[];
}
