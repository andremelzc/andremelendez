import React from "react";
import { HiOutlineSparkles, HiOutlineClock } from "react-icons/hi2";

export default function ComingSoonCard() {
  return (
    <div className="group relative h-full">
      <div className="relative bg-gradient-to-br from-muted/50 via-background/30 to-muted/50 border border-border/50 rounded-3xl shadow-2xl flex flex-col w-full h-full hover:shadow-3xl transition-all duration-500 hover:border-accent/30 transform-gpu group-hover:scale-[1.02] group-hover:-translate-y-1 backdrop-blur-sm">
        {/* Efectos internos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 rounded-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Efecto de brillo sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Contenido centrado */}
        <div className="flex flex-col items-center justify-center h-full p-8 text-center relative z-10">
          {/* Ícono principal con animación */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-accent/20 to-accent/10 rounded-full p-4 border border-accent/20">
              <HiOutlineSparkles className="text-4xl text-accent animate-pulse" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-foreground/90 mb-3 group-hover:text-accent/90 transition-colors duration-300">
            Próximamente
          </h3>

          <p className="text-foreground/70 text-sm leading-relaxed mb-6 max-w-xs">
            Más proyectos están en desarrollo
          </p>

          {/* Indicadores de estado */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 text-foreground/60">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="font-medium">En desarrollo</span>
            </div>

            <div className="w-px h-3 bg-border" />

            <div className="flex items-center gap-1 text-foreground/60">
              <HiOutlineClock className="text-xs" />
              <span>Próximamente</span>
            </div>
          </div>

          {/* Línea decorativa animada */}
          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent group-hover:w-24 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}
