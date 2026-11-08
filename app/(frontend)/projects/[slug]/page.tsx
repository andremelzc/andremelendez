import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/app/lib/sanity";
import { splitProjectTitle } from "@/app/lib/projectTitle";
import { PortableText, PortableTextComponents } from "@portabletext/react";
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
      <p className="mb-4 max-w-[68ch] text-base leading-relaxed text-foreground/80">
        {children}
      </p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 text-lg font-semibold text-foreground md:text-xl">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 flex max-w-[68ch] list-disc flex-col gap-2 pl-5 text-base text-foreground/80">
        {children}
      </ul>
    ),
  },
};

/** Título de bloque dentro de la página: regla de 1 px + Archivo. */
function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="border-t border-foreground pt-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]"
      style={{ fontStretch: "112%" }}
    >
      {children}
    </h2>
  );
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado | Andre Melendez" };
  const { name, descriptor } = splitProjectTitle(project.title);
  return {
    title: `${name} | Andre Melendez`,
    description: [descriptor, project.description].filter(Boolean).join(". ").slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { name, descriptor } = splitProjectTitle(project.title);
  const facts = [
    project.client && { label: "Cliente / Org", value: project.client },
    project.role && { label: "Rol", value: project.role },
    project.duration && { label: "Duración", value: project.duration },
    project.teamSize && {
      label: "Equipo",
      value: project.teamSize === "Solo" ? "Proyecto solo" : "Proyecto en equipo",
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="px-4 pb-24 pt-28 font-sans sm:px-8 lg:px-14">
      <Link
        href="/#proyectos"
        className="hit-area inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-medium transition-colors duration-150 hover:border-accent hover:text-accent-ink"
      >
        <HiArrowLeft aria-hidden="true" />
        Volver a proyectos
      </Link>

      <header className="mt-10 flex flex-col gap-5 border-t border-foreground pt-8 sm:mt-14">
        <p className="text-sm text-foreground/70">
          {[project.category, project.year].filter(Boolean).join(" · ")}
        </p>
        <h1
          className="font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,8vw,6rem)]"
          style={{ fontStretch: "112%" }}
        >
          {name}
        </h1>
        {descriptor && (
          <p className="max-w-[40ch] text-xl text-foreground/80 sm:text-2xl">
            {descriptor}
          </p>
        )}
        <p className="max-w-[60ch] text-base leading-relaxed text-foreground/70 sm:text-lg">
          {project.description}
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Columna principal */}
        <div className="flex flex-col gap-14 lg:col-span-7">
          {project.longDescription ? (
            <section className="flex flex-col gap-6">
              <BlockTitle>Sobre el proyecto</BlockTitle>
              <div>
                <PortableText
                  value={
                    project.longDescription as unknown as Parameters<
                      typeof PortableText
                    >[0]["value"]
                  }
                  components={portableTextComponents}
                />
              </div>
            </section>
          ) : null}

          {project.highlights && project.highlights.length > 0 && (
            <section className="flex flex-col gap-6">
              <BlockTitle>Logros técnicos</BlockTitle>
              <ul className="flex flex-col gap-4">
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex max-w-[68ch] items-start gap-4 text-base leading-relaxed text-foreground/80"
                  >
                    {/* Una celda de la rejilla como viñeta */}
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 shrink-0 bg-accent"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Columna lateral: ficha, enlaces y galería */}
        <div className="flex flex-col gap-14 lg:col-span-5">
          <section className="flex flex-col gap-6">
            <BlockTitle>Ficha técnica</BlockTitle>

            {facts.length > 0 && (
              <dl className="flex flex-col">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-6 border-b border-foreground/25 py-3"
                  >
                    <dt className="text-sm text-foreground/70">{fact.label}</dt>
                    <dd className="text-right text-sm font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.technologies.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground/70">
                  Tecnologías
                </h3>
                <p className="text-base leading-relaxed">
                  {project.technologies.join(" · ")}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  newTab
                  variant="primary"
                  icon={<HiOutlineExternalLink />}
                  className="w-full justify-center"
                >
                  Sitio en producción
                </Button>
              )}
              {project.demoUrl && !project.liveUrl && (
                <Button
                  href={project.demoUrl}
                  newTab
                  variant="outline"
                  icon={<HiOutlineExternalLink />}
                  className="w-full justify-center"
                >
                  Ver demo
                </Button>
              )}
              {project.codeUrl && (
                <Button
                  href={project.codeUrl}
                  newTab
                  variant="outline"
                  icon={<HiOutlineCode />}
                  className="w-full justify-center"
                >
                  Repositorio de código
                </Button>
              )}
              {project.designUrl && (
                <Button
                  href={project.designUrl}
                  newTab
                  variant="outline"
                  icon={<SiFigma />}
                  className="w-full justify-center"
                >
                  Diseño en Figma
                </Button>
              )}
              {project.videoUrl && (
                <Button
                  href={project.videoUrl}
                  newTab
                  variant="outline"
                  icon={<SiLoom />}
                  className="w-full justify-center"
                >
                  Presentación en video
                </Button>
              )}
            </div>
          </section>

          {project.gallery && project.gallery.length > 0 && (
            <section className="flex flex-col gap-6">
              <BlockTitle>Galería</BlockTitle>
              <div className="grid grid-cols-1 gap-4">
                {project.gallery.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video overflow-hidden border border-foreground/25 bg-muted"
                  >
                    <Image
                      src={image}
                      alt={`${project.title}: captura ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
