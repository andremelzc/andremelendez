import { useCallback, useEffect, useRef, useState } from "react";

interface IndicatorStyle {
  left: number;
  width: number;
  opacity: number;
  /** true en la primera medición: se coloca sin animar el desplazamiento. */
  instant: boolean;
}

/**
 * Mide la posición del enlace activo dentro de la barra para colocar el
 * indicador. Se vuelve a medir al cambiar el tamaño y al cargar las fuentes.
 */
export const useIndicatorPosition = (activeSection: string | null) => {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({});
  const measured = useRef(false);
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
    instant: true,
  });

  const measure = useCallback(() => {
    const link = activeSection ? linksRef.current[activeSection] : null;
    if (!link) {
      setIndicatorStyle((prev) =>
        prev.opacity === 0 ? prev : { left: 0, width: 0, opacity: 0, instant: true },
      );
      return;
    }
    const instant = !measured.current;
    measured.current = true;
    setIndicatorStyle({
      left: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1,
      instant,
    });
  }, [activeSection]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Función helper para asignar refs
  const setLinkRef = (sectionId: string) => (el: HTMLAnchorElement | null) => {
    linksRef.current[sectionId] = el;
  };

  return {
    navRef,
    indicatorStyle,
    setLinkRef,
  };
};
