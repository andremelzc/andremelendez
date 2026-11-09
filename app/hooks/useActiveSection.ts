"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sección que cruza el centro de la pantalla. Es null fuera de una página con
 * secciones (por ejemplo, el detalle de un proyecto): ahí no se marca nada.
 */
export function useActiveSection() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    // Al cambiar de página se parte de cero; el observador marca la sección.
    setActiveSection(null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // console.log(`Section ${entry.target.id}: ${entry.isIntersecting ? 'visible' : 'hidden'}, ratio: ${entry.intersectionRatio}`);
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Una "línea" fina en el centro de la pantalla: la sección que la
        // cruza es la activa. Con un umbral por porcentaje, las secciones muy
        // altas (proyectos) nunca llegaban a ser la activa.
        threshold: 0,
        rootMargin: "-45% 0px -54% 0px",
      }
    );

    // Observar todas las secciones
    const sections = document.querySelectorAll("section[id]");
    // console.log('Found sections:', sections.length, Array.from(sections).map(s => s.id));
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMounted, pathname]);

  return activeSection;
}
