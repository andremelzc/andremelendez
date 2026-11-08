import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

/**
 * Cabecera común de las secciones: una regla de 1 px, el título en Archivo
 * pesado alineado a la izquierda y, si hace falta, una línea de texto. Sustituye
 * al bloque que cada sección repetía (título centrado, halo, línea degradada y
 * subtítulo en cristal).
 */
export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-t border-foreground pt-6 sm:pt-8">
      <h2
        className="font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-[clamp(2.25rem,6vw,4.5rem)]"
        style={{ fontStretch: "112%" }}
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-[52ch] text-base text-foreground/70 sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
