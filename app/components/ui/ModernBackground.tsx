"use client";
import React from "react";

export default function ModernBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Círculo degradado principal - superior derecha */}
      <div className="absolute -top-20 -right-20 w-48 h-48 sm:-top-32 sm:-right-32 sm:w-72 sm:h-72 lg:-top-40 lg:-right-40 lg:w-96 lg:h-96 bg-gradient-to-br from-accent/10 via-cherry-300/10 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse" />
      
      {/* Círculo degradado secundario - inferior izquierda */}
      <div className="absolute -bottom-16 -left-16 w-40 h-40 sm:-bottom-24 sm:-left-24 sm:w-64 sm:h-64 lg:-bottom-32 lg:-left-32 lg:w-80 lg:h-80 bg-gradient-to-tr from-cherry-400/5 via-accent/10 to-transparent rounded-full blur-xl sm:blur-2xl" 
           style={{ animationDelay: '2s' }} />
      
      {/* Círculo pequeño - centro derecha - Oculto en móvil */}
      <div className="hidden sm:block absolute top-1/3 -right-10 w-32 h-32 sm:-right-16 sm:w-48 sm:h-48 lg:-right-20 lg:w-64 lg:h-64 bg-gradient-to-bl from-accent/6 to-cherry-200/5 rounded-full blur-lg sm:blur-xl opacity-40 animate-bounce" 
           style={{ animationDelay: '1s', animationDuration: '6s' }} />
      
      {/* Círculo mediano - superior izquierda */}
      <div className="absolute top-10 -left-10 w-36 h-36 sm:top-16 sm:-left-16 sm:w-56 sm:h-56 lg:top-20 lg:-left-20 lg:w-72 lg:h-72 bg-gradient-to-br from-cherry-300/4 via-accent/5 to-transparent rounded-full blur-xl sm:blur-2xl opacity-50" />
      
      {/* Forma geométrica - centro */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-transparent via-accent/4 to-transparent rounded-full blur-2xl sm:blur-3xl opacity-30" />
      
      {/* Círculo flotante - inferior centro - Reducido en móvil */}
      <div className="absolute bottom-10 left-1/4 w-28 h-28 sm:bottom-16 sm:left-1/3 sm:w-40 sm:h-40 lg:bottom-20 lg:w-52 lg:h-52 bg-gradient-to-tl from-cherry-400/5 to-accent/5 rounded-full blur-lg sm:blur-xl opacity-35 animate-pulse" 
           style={{ animationDelay: '3s' }} />

      {/* Gradiente sutil de overlay */}
      
      
      {/* Efectos de luz ambiental - Simplificados en móvil */}
      <div className="hidden sm:block absolute top-1/4 right-1/4 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-accent/3 rounded-full blur-xl sm:blur-2xl opacity-30 animate-ping" 
           style={{ animationDelay: '4s', animationDuration: '8s' }} />
      
      <div className="hidden lg:block absolute bottom-1/3 left-1/4 w-16 h-16 lg:w-24 lg:h-24 bg-cherry-300/4 rounded-full blur-lg lg:blur-xl opacity-25 animate-ping" 
           style={{ animationDelay: '6s', animationDuration: '10s' }} />
    </div>
  );
}
