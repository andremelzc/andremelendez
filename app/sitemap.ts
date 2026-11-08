import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/metadata";
import { getAllProjects } from "@/app/lib/sanity";

/** Portada, catálogo y una entrada por proyecto con página de detalle. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/proyectos`, changeFrequency: "monthly", priority: 0.7 },
    ...projects
      .filter((project) => project.hasDetails && project.slug)
      .map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
