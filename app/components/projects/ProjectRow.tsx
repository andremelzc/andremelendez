import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineCode,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { splitProjectTitle } from "@/app/lib/projectTitle";
import { Project } from "@/app/types/projects";

interface ProjectRowProps {
  project: Project;
}

/**
 * Una fila del índice de proyectos: miniatura, nombre grande, descriptor,
 * tecnologías en texto plano y enlaces. Si el proyecto tiene detalle, toda la
 * fila es clicable (el título lleva el enlace); si no, solo sus enlaces
 * externos (sitio, demo, código).
 */
export default function ProjectRow({ project }: ProjectRowProps) {
  const { name, descriptor } = splitProjectTitle(project.title);
  const detailHref =
    project.hasDetails && project.slug ? `/projects/${project.slug}` : null;

  const external = [
    project.liveUrl && {
      href: project.liveUrl,
      label: "Sitio",
      icon: <HiOutlineExternalLink aria-hidden="true" />,
    },
    !project.liveUrl &&
      project.demoUrl && {
        href: project.demoUrl,
        label: "Demo",
        icon: <HiOutlineExternalLink aria-hidden="true" />,
      },
    project.codeUrl && {
      href: project.codeUrl,
      label: "Código",
      icon: <HiOutlineCode aria-hidden="true" />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  const meta = [project.role, project.year].filter(Boolean).join(" · ");

  // Solo el título, la miniatura y "Ver detalle" llevan al detalle. Los dos
  // últimos repiten el destino del título, así que se ocultan al teclado y a los
  // lectores de pantalla para no duplicar el enlace.
  const duplicate = { tabIndex: -1, "aria-hidden": true } as const;

  return (
    <li className="grid gap-5 border-t border-foreground/25 py-5 sm:py-8 lg:grid-cols-[13rem_minmax(0,1fr)_14rem] lg:gap-10">
      {detailHref ? (
        <Link
          href={detailHref}
          {...duplicate}
          className="group/thumb block h-36 w-full sm:h-48 lg:h-auto lg:w-52"
        >
          <div className="relative h-full w-full overflow-hidden border border-foreground/25 bg-muted transition-colors duration-150 group-hover/thumb:border-accent lg:aspect-[16/10]">
            <Image
              src={project.primaryImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 13rem, 100vw"
              className="object-cover"
            />
          </div>
        </Link>
      ) : (
        <div className="relative h-36 w-full overflow-hidden border border-foreground/25 bg-muted sm:h-48 lg:aspect-[16/10] lg:h-auto lg:w-52">
          <Image
            src={project.primaryImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 13rem, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-col gap-3">
        <h3
          className="font-display font-extrabold leading-none tracking-[-0.02em] text-[clamp(1.75rem,3.2vw,2.75rem)]"
          style={{ fontStretch: "112%" }}
        >
          {detailHref ? (
            <Link
              href={detailHref}
              className="transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        <p className="max-w-[60ch] text-base text-foreground/80 sm:text-lg">
          {descriptor || project.description}
        </p>
        {project.technologies.length > 0 && (
          <p className="text-sm text-foreground/70">
            {project.technologies.join(" · ")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 lg:items-end lg:text-right">
        {meta && <p className="text-sm text-foreground/70">{meta}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
          {external.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 transition-colors duration-150 hover:text-accent"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
        {detailHref && (
          <Link
            href={detailHref}
            {...duplicate}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Ver detalle
            <HiOutlineArrowRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </li>
  );
}
