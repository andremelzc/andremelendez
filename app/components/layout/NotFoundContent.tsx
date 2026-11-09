import React from "react";
import Button from "@/app/components/ui/Button";

/** Contenido del 404, en el idioma y el estilo del sitio. */
export default function NotFoundContent() {
  return (
    <section className="flex min-h-[70svh] flex-col justify-center gap-8 px-4 pb-16 pt-28 sm:px-8 lg:px-14">
      <h1
        className="font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-[clamp(2.75rem,9vw,7rem)]"
        style={{ fontStretch: "112%" }}
      >
        <span className="sr-only">Error 404: </span>
        Página no encontrada
      </h1>
      <p className="max-w-[44ch] text-lg text-foreground/80">
        La dirección que buscas no existe o ya no está disponible.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary">
          Volver al inicio
        </Button>
        <Button href="/#proyectos" variant="outline">
          Ver proyectos
        </Button>
      </div>
    </section>
  );
}
