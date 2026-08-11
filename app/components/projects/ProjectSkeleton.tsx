
import React from "react";

interface ProjectSkeletonProps {
  featured?: boolean;
}

export default function ProjectSkeleton({ featured = false }: ProjectSkeletonProps) {
  return (
    <div className="group relative h-full">
      <div className="relative bg-gradient-to-br from-muted/50 via-background/30 to-muted/50 border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col w-full h-full animate-pulse backdrop-blur-sm">
        {/* Efectos internos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 rounded-2xl md:rounded-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Header skeleton */}
        <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 pb-3 md:pb-4 gap-3 sm:gap-0">
          {/* Skeleton para tecnologías */}
          <div className="flex gap-1.5 md:gap-2 flex-wrap">
            {Array.from({ length: featured ? 5 : 2 }).map((_, i) => (
              <div 
                key={i} 
                className="h-6 md:h-7 bg-foreground/10 rounded-full"
                style={{ width: `${50 + Math.random() * 30}px` }}
              />
            ))}
          </div>
          {/* Skeleton para teamsize */}
          <div className="w-6 h-6 md:w-8 md:h-7 bg-foreground/10 rounded-full self-end sm:self-auto" />
        </div>

        {/* Skeleton para texto */}
        <div className="px-4 md:px-6 text-left flex-shrink-0 min-h-[100px] md:min-h-[120px] flex flex-col justify-center">
          {/* Título skeleton */}
          <div className="h-6 md:h-8 bg-foreground/10 rounded-lg mb-2 md:mb-3" style={{ width: '70%' }} />
          {/* Descripción skeleton */}
          <div className="space-y-1.5 md:space-y-2">
            {Array.from({ length: featured ? 3 : 2 }).map((_, i) => (
              <div 
                key={i} 
                className="h-3 md:h-4 bg-foreground/10 rounded"
                style={{ 
                  width: i === (featured ? 2 : 1) ? '60%' : '100%' 
                }}
              />
            ))}
          </div>
        </div>

        {/* Skeleton para imágenes */}
        <div
          className={`flex justify-center items-center ${
            featured
              ? "min-h-[140px] max-h-[180px] md:min-h-[200px] md:max-h-[240px]"
              : "min-h-[120px] max-h-[160px] md:min-h-[160px] md:max-h-[200px]"
          } ${featured ? "p-4 pb-3 md:p-8 md:pb-6" : "p-3 pb-2 md:p-4 md:pb-4"}`}
        >
          <div className={`relative ${
            featured 
              ? "w-48 h-24 md:w-72 md:h-40" 
              : "w-48 h-24 md:w-64 md:h-32"
          }`}>
            {/* Imagen principal skeleton */}
            <div
              className={`absolute top-0 w-full h-full bg-foreground/10 rounded-lg ${
                featured ? "transform md:-translate-x-1/4" : ""
              }`}
            />
            
            {/* Imagen secundaria skeleton (solo featured y solo en desktop) */}
            {featured && (
              <div className="absolute top-0 transform translate-x-1/4 translate-y-1/4 w-full h-full bg-foreground/10 rounded-lg hidden md:block" />
            )}
          </div>
        </div>
        
        {/* Spacer flexible CONDICIONAL */}
        {featured && <div className="flex-grow min-h-[10px] md:min-h-[20px]"></div>}
        
        {/* Footer skeleton */}
        <div className={`relative px-4 md:px-6 pb-4 md:pb-6 flex-shrink-0 ${!featured ? "mt-2 md:mt-4" : "mt-4 md:mt-8"}`}>
          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent mb-4 md:mb-6" />
          
          {/* Botones e indicador skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            {/* Botones skeleton */}
            <div className="flex gap-2 md:gap-3">
              <div className="w-16 h-6 md:w-20 md:h-8 bg-foreground/10 rounded-lg" />
              <div className="w-18 h-6 md:w-24 md:h-8 bg-foreground/10 rounded-lg" />
            </div>
            
            {/* Role indicator skeleton */}
            <div className="w-12 h-3 md:w-16 md:h-4 bg-foreground/10 rounded self-end sm:self-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}