"use client";
import React, { useRef } from "react";
import { HiOutlineDownload, HiOutlineMail } from "react-icons/hi";
import Button from "@/app/components/ui/Button";
import PixelField from "@/app/components/ui/PixelField";
import { getCvLinks } from "@/app/lib/cv";
import { Profile } from "@/app/types/profile";

interface HomeSectionProps {
  profile: Profile;
}

/** Nombre de pila y primer apellido para el titular ("Andre" / "Meléndez"). */
function splitDisplayName(fullName: string): [string, string] {
  const words = fullName.trim().split(/\s+/);
  if (words.length < 2) return [words[0] ?? "", ""];
  const surname = words.length >= 3 ? words[words.length - 2] : words[1];
  return [words[0], surname];
}

export default function HomeSection({ profile }: HomeSectionProps) {
  const textRef = useRef<HTMLDivElement>(null);

  const cv = getCvLinks(profile);

  const [firstName, surname] = splitDisplayName(profile.fullName);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden px-4 pb-10 pt-24 sm:px-8 lg:items-center lg:px-14 lg:pb-14 lg:pt-28"
    >
      <PixelField avoidRef={textRef} />

      <div className="relative z-10 flex w-full">
        <div
          ref={textRef}
          className="flex w-full max-w-[64rem] flex-col gap-7 sm:gap-9"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1
              className="font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-[clamp(2.75rem,9vw,7rem)]"
              style={{ fontStretch: "112%" }}
            >
              {/* El nombre completo se conserva para lectores de pantalla */}
              <span className="sr-only">{profile.fullName}</span>
              <span aria-hidden="true" className="block">
                {firstName}
              </span>
              <span aria-hidden="true" className="block">
                {surname}
              </span>
            </h1>
            <p className="text-xl font-semibold text-accent sm:text-3xl">
              {profile.title}
            </p>
          </div>

          <div className="flex max-w-[52ch] flex-col gap-3 text-pretty">
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              {profile.bio}
            </p>
            {profile.subBio && (
              <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                {profile.subBio}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* CV en español, con el de inglés pegado al lado */}
              <div className="flex">
                <Button
                  href={cv.es}
                  newTab
                  variant="primary"
                  size="md"
                  icon={<HiOutlineDownload className="h-5 w-5" />}
                  iconPosition="left"
                  className="flex-1"
                >
                  Descargar CV (ES)
                </Button>
                <Button
                  href={cv.en}
                  newTab
                  variant="outline"
                  size="md"
                  ariaLabel="Descargar CV en inglés"
                  className="-ml-px"
                >
                  EN
                </Button>
              </div>
              <Button
                href="#contacto"
                variant="outline"
                size="md"
                icon={<HiOutlineMail className="h-5 w-5" />}
                iconPosition="left"
              >
                Contactar
              </Button>
            </div>
            <p className="text-sm text-foreground/70">Disponible para proyectos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
