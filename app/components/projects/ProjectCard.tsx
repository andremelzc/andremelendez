import React from "react";
import Image from "next/image";
import { ProjectCardProps } from "@/app/types/projects";
import {
  HiOutlineExternalLink,
  HiOutlineCode,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi";
import TechTag from "@/app/components/ui/TechTag";
import Button from "@/app/components/ui/Button";
import Tooltip from "@/app/components/ui/Tooltip";

export default function ProjectCard({
  project: {
    title,
    description,
    primaryImage,
    secondaryImage,
    featured,
    technologies,
    demoUrl,
    codeUrl,
    role,
    teamSize,
    year,
    hasDetails = true,
    slug = "hola",
  },
}: ProjectCardProps) {
  // La imagen primaria siempre es la principal que se muestra
  // En featured, la secundaria se muestra como segunda imagen
  const mainImage = primaryImage;
  const overlayImage = featured ? secondaryImage : null;

  return (
    <div className="group relative h-full">
      <div className="relative bg-gradient-to-br from-midnight-800 via-midnight-900 to-midnight-800 border border-midnight-600/50 rounded-2xl md:rounded-3xl shadow-2xl text-background flex flex-col w-full h-full hover:shadow-3xl transition-all duration-500 hover:border-accent/30 transform-gpu group-hover:scale-[1.02] group-hover:-translate-y-1">
        {/* Efectos internos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 rounded-2xl md:rounded-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-midnight-500/40 to-transparent" />
        {/* Efecto de brillo sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/10 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header */}
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 pb-3 md:pb-4 gap-3 sm:gap-0">
          {/* Tecnologías */}
          <div className="flex gap-1.5 md:gap-2 flex-wrap">
            {(featured ? technologies : technologies.slice(0, 2)).map(
              (tech) => (
                <TechTag key={tech} tech={tech} variant="badge" />
              ),
            )}
            {!featured && technologies.length > 2 && (
              <div className="bg-midnight-700/60 backdrop-blur-sm text-midnight-200 text-xs font-medium px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-midnight-600/50">
                +{technologies.length - 2}
              </div>
            )}
          </div>
          {/* Teamsize Badge */}
          <div className="bg-midnight-700/60 backdrop-blur-sm border border-midnight-600/50 text-midnight-200 text-xs font-medium px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg self-end sm:self-auto">
            <Tooltip content={teamSize}>
              <span className="inline-flex">
                {teamSize === "Solo" ? (
                  <HiOutlineUser size={14} className="md:w-4 md:h-4" />
                ) : (
                  <HiOutlineUserGroup size={14} className="md:w-4 md:h-4" />
                )}
              </span>
            </Tooltip>
          </div>
        </div>

        {/* Texto siempre en la misma posición */}
        <div className="px-4 md:px-6 text-left flex-shrink-0 min-h-[100px] md:min-h-[120px] flex flex-col justify-center">
          <h3 className="text-lg md:text-2xl font-bold text-foreground line-clamp-2">
            {title}
          </h3>
          <p
            className={`${
              featured
                ? "text-base md:text-lg line-clamp-3 md:line-clamp-4"
                : "text-sm md:text-base opacity-80 line-clamp-2 md:line-clamp-3"
            } leading-relaxed text-foreground/80 mt-1 md:mt-2`}
          >
            {description}
          </p>
        </div>

        {/* Contenedor de imágenes - con altura controlada */}
        <div
          className={`flex justify-center items-center ${
            featured
              ? "min-h-[140px] max-h-[180px] md:min-h-[200px] md:max-h-[240px]"
              : "min-h-[120px] max-h-[160px] md:min-h-[160px] md:max-h-[200px]"
          } ${featured ? "p-4 pb-3 md:p-8 md:pb-6" : "p-3 pb-2 md:p-4 md:pb-4"}`}
        >
          <div
            className={`relative ${
              featured
                ? "w-48 h-24 md:w-72 md:h-40"
                : "w-48 h-24 md:w-64 md:h-32"
            }`}
          >
            {/* Imagen secundaria - solo en featured y solo en pantallas md+ - Se renderiza PRIMERO para estar atrás */}
            {featured && overlayImage && (
              <div className="absolute top-0 transform translate-x-1/4 translate-y-1/4 w-full h-full hover:scale-105 transition-transform duration-300 hidden md:block z-10">
                <Image
                  src={overlayImage}
                  alt={title + " secundaria"}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 600px"
                  placeholder="empty"
                />
                {/* Overlay para imagen secundaria */}
                <div className="absolute inset-0 bg-background opacity-70 rounded-lg pointer-events-none"></div>
              </div>
            )}

            {/* Placeholder para imagen secundaria si no existe pero el proyecto es featured */}
            {featured && !overlayImage && (
              <div className="absolute top-0 transform translate-x-1/4 translate-y-1/4 w-full h-full hover:scale-105 transition-transform duration-300 hidden md:block z-10">
                <div className="flex items-center justify-center w-full h-full bg-midnight-700/60 rounded-lg border-2 border-dashed border-midnight-600">
                  <svg
                    className="w-8 h-8 md:w-16 md:h-16"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="8"
                      y="16"
                      width="48"
                      height="32"
                      rx="6"
                      fill="#23283a"
                      stroke="#3b4252"
                      strokeWidth="2"
                    />
                    <circle cx="20" cy="28" r="4" fill="#3b4252" />
                    <path
                      d="M12 44L24 32L36 44L44 36L52 44"
                      stroke="#4f5668"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Imagen primaria - siempre presente como imagen principal - Se renderiza DESPUÉS para estar al frente */}
            <div
              className={`absolute top-0 w-full h-full hover:scale-105 transition-transform duration-300 ${
                featured ? "transform md:-translate-x-1/4 z-20" : ""
              }`}
            >
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 600px"
                  priority={featured}
                  placeholder="empty"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-midnight-700/60 rounded-lg border-2 border-dashed border-midnight-600">
                  <svg
                    className="w-8 h-8 md:w-16 md:h-16"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="8"
                      y="16"
                      width="48"
                      height="32"
                      rx="6"
                      fill="#23283a"
                      stroke="#3b4252"
                      strokeWidth="2"
                    />
                    <circle cx="20" cy="28" r="4" fill="#3b4252" />
                    <path
                      d="M12 44L24 32L36 44L44 36L52 44"
                      stroke="#4f5668"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              {/* Sin overlay en la imagen primaria - ahora está limpia al frente */}
            </div>
          </div>
        </div>

        {/* Spacer flexible CONDICIONAL - solo en featured para mejor distribución */}
        {featured && (
          <div className="flex-grow min-h-[10px] md:min-h-[20px]"></div>
        )}

        {/* Footer */}
        <div
          className={`relative px-4 md:px-6 pb-4 md:pb-6 flex-shrink-0 ${!featured ? "mt-2 md:mt-4" : "mt-4 md:mt-8"}`}
        >
          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-midnight-600/40 to-transparent mb-4 md:mb-6" />
          {/* Botones e Indicador */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            {/* Botones a la izquierda */}
            <div className="flex gap-2 md:gap-3 flex-wrap">
              {hasDetails && slug && (
                <a href={`/projects/${slug}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    iconPosition="left"
                    className="text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2"
                  >
                    <span>Ver detalle</span>
                  </Button>
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<HiOutlineExternalLink />}
                    iconPosition="left"
                    className="text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2"
                  >
                    <span className="hidden xs:inline">Ver Demo</span>
                    <span className="xs:hidden">Demo</span>
                  </Button>
                </a>
              )}
              {codeUrl && (
                <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<HiOutlineCode />}
                    iconPosition="left"
                    className="text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2"
                  >
                    <span className="hidden xs:inline">Ver Código</span>
                    <span className="xs:hidden">Código</span>
                  </Button>
                </a>
              )}
            </div>

            {/* Indicador de role a la derecha */}
            {role ? (
              <div className="flex items-center gap-2 text-xs text-midnight-400 self-end sm:self-auto">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="font-medium">{role}</span>
                {year && (
                  <span>
                    ·{""} {year}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
