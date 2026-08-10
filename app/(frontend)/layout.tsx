import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`}
    >
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl">{children}</main>
          <Divisor />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
