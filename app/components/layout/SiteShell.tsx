import React from "react";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import CursorPixels from "@/app/components/ui/CursorPixels";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Voz de display del nombre: extendida y pesada. Eje de ancho (wdth) activo.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

/**
 * Marco común del sitio: documento, fuentes, tema, barra, estela del cursor y
 * pie. Lo usan el layout de la web y el 404 global, que no pasa por ese layout.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} overflow-x-hidden`}
    >
      <body className="antialiased">
        <Providers>
          {/* Primer elemento al tabular: salta la barra y va al contenido */}
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <CursorPixels />
          <main id="contenido" tabIndex={-1} className="w-full outline-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
