import React from "react";
import Link from "next/link";
import PixelField from "@/app/components/ui/PixelField";
import { getCvLinks } from "@/app/lib/cv";
import { socialUrls } from "@/app/data/urls";
import { getProfile } from "@/app/lib/sanity";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#contacto", label: "Contacto" },
];

const linkClass =
  "text-sm text-foreground/80 underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline";

export default async function Footer() {
  const profile = await getProfile();
  const email = profile.email || socialUrls.email;
  const linkedinUrl = profile.linkedin || socialUrls.linkedin;
  const githubUrl = profile.github || socialUrls.github;
  const cv = getCvLinks(profile);

  return (
    <footer className="border-t border-foreground/25">
      <div className="grid gap-8 px-4 py-10 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-10 sm:px-8 sm:py-12 lg:px-14">
        <div className="flex flex-col gap-2">
          <p
            className="font-display text-2xl font-extrabold tracking-[-0.02em]"
            style={{ fontStretch: "112%" }}
          >
            {profile.fullName}
          </p>
          <p className="max-w-[32ch] text-sm text-foreground/70">{profile.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:contents">
        <nav aria-label="Pie de página">
          <h2 className="mb-3 text-sm font-semibold">Navegación</h2>
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold">Enlaces</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={`mailto:${email}`} className={linkClass}>
                Correo
              </a>
            </li>
            {linkedinUrl && (
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
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
                  className={linkClass}
                >
                  GitHub
                </a>
              </li>
            )}
            <li>
              <a
                href={cv.es}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                CV (español)
              </a>
            </li>
            <li>
              <a
                href={cv.en}
                target="_blank"
                rel="noopener noreferrer"
                lang="en"
                className={linkClass}
              >
                CV (English)
              </a>
            </li>
          </ul>
        </div>
        </div>
      </div>

      {/* Eco estático del campo del hero: cierra la página */}
      <div className="relative h-24">
        <PixelField still />
      </div>

      <div className="border-t border-foreground/25 px-4 py-4 text-sm text-foreground/70 sm:px-8 lg:px-14">
        © {new Date().getFullYear()} {profile.fullName}
      </div>
    </footer>
  );
}
