"use client";

import { useState, useEffect } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

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
        threshold: 0.3, // Necesita 30% visible
        rootMargin: "-20% 0px -20% 0px", // Detecta cuando está en el centro
      }
    );

    // Observar todas las secciones
    const sections = document.querySelectorAll("section[id]");
    // console.log('Found sections:', sections.length, Array.from(sections).map(s => s.id));
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMounted]);

  return activeSection;
}
