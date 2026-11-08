import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/app/components/layout/Navbar";
import Divisor from "@/app/components/ui/Divisor";
import Footer from "@/app/components/layout/Footer";
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

export const metadata: Metadata = {
  title: "Andre Melendez | Desarrollador Full-Stack",
  description: "Portafolio de Andre Ivan Melendez Cava, estudiante de Ingeniería de Software en la UNMSM, especializado en desarrollo web moderno con React, Next.js, TypeScript y tecnologías full-stack.",
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} overflow-x-hidden`}
    >
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main className="w-full">{children}</main>
          <Divisor />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
