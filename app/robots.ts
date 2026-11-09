import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El Studio, el laboratorio y las rutas de API no son contenido del sitio.
      disallow: ["/studio", "/lab", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
