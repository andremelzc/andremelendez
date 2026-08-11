import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/app/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import ModernBackground from "@/app/components/ui/ModernBackground";
import TechTag from "@/app/components/ui/TechTag";
import Button from "@/app/components/ui/Button";
import {
  HiOutlineExternalLink,
  HiOutlineCode,
  HiArrowLeft,
} from "react-icons/hi";
import { SiFigma, SiLoom } from "react-icons/si";

// Serializadores personalizados para PortableText
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 leading-relaxed mb-4 text-sm md:text-base">
        {children}
      </p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg md:text-xl font-bold text-foreground mt-6 mb-3">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5 mb-4 text-foreground/80 flex flex-col gap-2 text-sm md:text-base">
        {children}
      </ul>
    ),
  },
};

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative font-sans min-h-screen p-6 sm:p-12 md:p-16 lg:p-20 pb-32">
      <ModernBackground />

      {/* Botón de retroceso */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12 relative z-10">
        <Link href="/#proyectos" className="inline-block">
          <Button
            variant="outline"
            size="sm"
            icon={<HiArrowLeft />}
            iconPosition="left"
            className="backdrop-blur-md"
          >
            Volver a proyectos
          </Button>
        </Link>
      </div>

      <article className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-border/40 pb-8 sm:pb-12">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider font-semibold text-accent bg-accent/15 px-3 py-1 rounded-full border border-accent/25">
                {project.category}
              </span>
              {project.year && (
                <span className="text-xs uppercase tracking-wider font-semibold text-foreground/60 bg-muted/40 px-3 py-1 rounded-full border border-border/20">
                  Año {project.year}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Dos columnas de contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Información técnica */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Descripción detallada */}
            {project.longDescription ? (
              <div className="bg-gradient-to-br from-muted/30 via-background/25 to-muted/30 border border-border/40 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Sobre el proyecto
                </h2>
                <PortableText
                  value={project.longDescription as unknown as Parameters<typeof PortableText>[0]["value"]}
                  components={portableTextComponents}
                />
              </div>
            ) : null}

            {/* Logros Clave / Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="bg-gradient-to-br from-muted/30 via-background/25 to-muted/30 border border-border/40 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Logros Técnicos Destacados
                </h2>
                <ul className="flex flex-col gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-foreground/80 leading-relaxed text-sm md:text-base"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mt-0.5 font-bold text-xs">
                        ✓
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Columna Derecha: Sidebar de Metadatos y Galería */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Ficha Técnica Card */}
            <div className="bg-gradient-to-br from-muted/40 via-background/30 to-muted/40 border border-border/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-6">
                Ficha Técnica
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {project.client && (
                  <div className="flex justify-between items-center border-b border-border/30 pb-3">
                    <span className="text-sm text-foreground/50">Cliente / Org</span>
                    <span className="text-sm font-semibold text-foreground">
                      {project.client}
                    </span>
                  </div>
                )}
                {project.role && (
                  <div className="flex justify-between items-center border-b border-border/30 pb-3">
                    <span className="text-sm text-foreground/50">Rol</span>
                    <span className="text-sm font-semibold text-accent">
                      {project.role}
                    </span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex justify-between items-center border-b border-border/30 pb-3">
                    <span className="text-sm text-foreground/50">Duración</span>
                    <span className="text-sm font-semibold text-foreground">
                      {project.duration}
                    </span>
                  </div>
                )}
                {project.teamSize && (
                  <div className="flex justify-between items-center border-b border-border/30 pb-3">
                    <span className="text-sm text-foreground/50">Equipo</span>
                    <span className="text-sm font-semibold text-foreground">
                      {project.teamSize === "Solo" ? "Proyecto Solo" : "Proyecto en Equipo"}
                    </span>
                  </div>
                )}
              </div>

              {/* Tecnologías */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground/60 mb-3">
                  Tecnologías Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <TechTag key={tech} tech={tech} variant="badge" size="sm" />
                  ))}
                </div>
              </div>

              {/* Enlaces de Acción */}
              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="primary"
                      icon={<HiOutlineExternalLink />}
                      className="w-full justify-center"
                    >
                      Sitio en Producción
                    </Button>
                  </a>
                )}
                {project.demoUrl && !project.liveUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      icon={<HiOutlineExternalLink />}
                      className="w-full justify-center"
                    >
                      Ver Demo
                    </Button>
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      icon={<HiOutlineCode />}
                      className="w-full justify-center"
                    >
                      Repositorio de Código
                    </Button>
                  </a>
                )}
                {project.designUrl && (
                  <a
                    href={project.designUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      icon={<SiFigma />}
                      className="w-full justify-center"
                    >
                      Diseño en Figma
                    </Button>
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      icon={<SiLoom />}
                      className="w-full justify-center"
                    >
                      Presentación en Video
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Galería de Capturas */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-foreground">
                  Galería de Capturas
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {project.gallery.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative group/gallery overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-video hover:border-accent/40 transition-all duration-500 shadow-lg"
                    >
                      <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 group-hover/gallery:opacity-0" />
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/gallery:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
