"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useIndicatorPosition } from "@/app/hooks/useIndicatorPosition";
import { useMobileNavAutoHide } from "@/app/hooks/useMobileNavAutoHide";
import ThemeToggle from "../ThemeToggle";

const LINKS = [
  { id: "home", href: "/", label: "Inicio" },
  { id: "proyectos", href: "/#proyectos", label: "Proyectos" },
  { id: "habilidades", href: "/#habilidades", label: "Habilidades" },
  { id: "contacto", href: "/#contacto", label: "Contacto" },
] as const;

/** Cuatro celdas con los pasos de la paleta: eco del campo de píxeles. */
function PixelMark() {
  return (
    <span
      aria-hidden="true"
      className="mx-2 grid h-5 w-5 shrink-0 grid-cols-2 gap-px"
    >
      <span className="bg-cherry-200" />
      <span className="bg-accent" />
      <span className="bg-cherry-800" />
      <span className="bg-foreground" />
    </span>
  );
}

export default function Navbar() {
  const activeSection = useActiveSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-hide functionality for mobile navbar
  const { isVisible: isMobileNavVisible, showAndStartTimer } = useMobileNavAutoHide({
    hideDelay: 10000, // 10 seconds
    scrollThreshold: 10, // Lower threshold for better responsiveness
  });

  const { navRef, indicatorStyle, setLinkRef } = useIndicatorPosition(activeSection);

  const linkClass = (id: string) =>
    `relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200 delay-100 ${
      activeSection === id
        ? "text-background"
        : "text-foreground/80 hover:text-accent"
    }`;

  const mobileLinkClass = (id: string) =>
    `block w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ${
      activeSection === id
        ? "bg-foreground text-background"
        : "text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
    }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Show navbar when menu is toggled
    showAndStartTimer();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop: píldora centrada y flotante */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center md:flex">
        <nav
          aria-label="Principal"
          ref={navRef}
          className="pointer-events-auto relative flex items-center border border-foreground/25 bg-background/75 p-1 backdrop-blur-md"
        >
          {/* Indicador: bloque sólido que salta de enlace en enlace por pasos */}
          <span
            aria-hidden="true"
            className="absolute bottom-1 top-1 z-0 bg-foreground"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              transitionProperty: indicatorStyle.instant ? "none" : "left, width",
              transitionDuration: "280ms",
              transitionTimingFunction: "steps(6, end)",
            }}
          />

          <PixelMark />

          <ul className="flex items-center">
            {LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={linkClass(link.id)}
                  aria-current={activeSection === link.id ? "location" : undefined}
                  ref={setLinkRef(link.id)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span aria-hidden="true" className="mx-1 h-5 w-px bg-foreground/25" />
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile */}
      <div
        className={`fixed right-4 top-4 z-50 transition-opacity duration-200 md:hidden ${
          isMobileNavVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          className="relative flex h-12 w-12 items-center justify-center border border-foreground/25 bg-background/75 backdrop-blur-md transition-colors duration-150 hover:border-accent"
        >
          <div className="flex flex-col space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-opacity duration-200 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>

        <div
          id="mobile-menu"
          inert={!isMobileMenuOpen}
          className={`absolute right-0 top-14 w-52 border border-foreground/25 bg-background/90 backdrop-blur-md transition-opacity duration-150 ${
            isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <nav aria-label="Principal (móvil)" className="flex flex-col p-1">
            {LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={mobileLinkClass(link.id)}
                aria-current={activeSection === link.id ? "location" : undefined}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 flex items-center justify-between border-t border-foreground/25 px-4 pt-2">
              <span className="text-sm font-medium text-foreground/80">Tema</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Cierra el menú móvil al tocar fuera */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/10 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
