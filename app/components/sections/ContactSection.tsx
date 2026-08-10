import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import Button from "@/app/components/ui/Button";
import { socialUrls } from "@/app/data/urls";
import { Profile } from "@/app/types/profile";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const linkedinUrl = profile.linkedin || socialUrls.linkedin;
  const githubUrl = profile.github || socialUrls.github;
  const email = profile.email || socialUrls.email;

  return (
    <section id="contacto" className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-12 xl:gap-10 text-center items-center max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-6">
          {/* Header */}
          <div className="relative flex flex-col gap-3 sm:gap-4 lg:gap-3">
            {/* Resplandor detrás del título */}
            <div className="absolute -top-2 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2 w-60 sm:w-72 md:w-80 lg:w-72 h-12 sm:h-16 md:h-20 lg:h-16 bg-gradient-to-r from-transparent via-accent/15 to-transparent blur-2xl opacity-80" />
            {/* Título */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl font-semibold">
              Contacto
            </h1>
            {/* Divisor */}
            <div className="h-px w-16 sm:w-20 md:w-24 lg:w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto" />
            {/* Subtítulo con efecto de cristal de fondo */}
            <div className="relative inline-block mx-auto">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-transparent via-background/20 to-transparent rounded-lg blur-sm" />
              <h2 className="relative text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl text-foreground/85 font-light tracking-wide px-3 sm:px-4 py-1 backdrop-blur-sm bg-background/10 rounded-lg border border-border/55">
                Escríbeme si quieres trabajar conmigo
              </h2>
            </div>
          </div>
          {/* Botones de contacto - sin contenedor glassmorphism */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-6 justify-center items-center max-w-lg mx-auto">
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  icon={
                    <BsLinkedin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  }
                  iconPosition="top"
                  rounded="full"
                  className="w-full"
                >
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </Button>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  icon={
                    <BsGithub className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  }
                  iconPosition="top"
                  rounded="full"
                  className="w-full"
                >
                  <span className="text-sm sm:text-base">GitHub</span>
                </Button>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="w-full">
                <Button
                  variant="primary"
                  icon={
                    <FiMail className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  }
                  iconPosition="top"
                  rounded="full"
                  className="w-full"
                >
                  <span className="text-xs sm:text-sm md:text-base">
                    {email}
                  </span>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
