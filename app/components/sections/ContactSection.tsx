import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import PixelPortrait from "@/app/components/ui/PixelPortrait";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { socialUrls } from "@/app/data/urls";
import { Profile } from "@/app/types/profile";

interface ContactSectionProps {
  profile: Profile;
}

const secondaryLink =
  "inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-base font-medium transition-colors duration-150 hover:border-accent hover:text-accent";

export default function ContactSection({ profile }: ContactSectionProps) {
  const linkedinUrl = profile.linkedin || socialUrls.linkedin;
  const githubUrl = profile.github || socialUrls.github;
  const email = profile.email || socialUrls.email;
  const cvUrl =
    profile.cvSpanish || profile.cvEnglish || "/cv_andre_melendez_español.pdf";

  return (
    <section id="contacto" className="px-4 py-12 sm:px-8 sm:py-20 lg:px-14 lg:py-28">
      <SectionHeader
        title="Contacto"
        description="Escríbeme si quieres trabajar conmigo."
      />

      <div className="mt-10 flex flex-col gap-12 sm:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex min-w-0 flex-col gap-10">
          {/* La acción principal: el correo, en el tamaño del titular */}
          <a
            href={`mailto:${email}`}
            className="break-all font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(1.125rem,3.6vw,3.25rem)] underline decoration-foreground/25 decoration-2 underline-offset-[0.14em] transition-colors duration-150 hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            style={{ fontStretch: "112%" }}
          >
            {email}
          </a>

          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {linkedinUrl && (
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryLink}
                >
                  <BsLinkedin aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            )}
            {githubUrl && (
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryLink}
                >
                  <BsGithub aria-hidden="true" />
                  GitHub
                </a>
              </li>
            )}
            <li>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryLink}
              >
                <HiOutlineDownload aria-hidden="true" />
                Descargar CV
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full max-w-[20rem] shrink-0 lg:w-[min(24vw,22rem)]">
          <PixelPortrait
            src={profile.profileImage || "/profile.jpg"}
            alt={`Retrato de ${profile.fullName}`}
          />
        </div>
      </div>
    </section>
  );
}
