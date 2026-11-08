import type { Metadata } from "next";
import NotFoundContent from "@/app/components/layout/NotFoundContent";

// Next añade solo el noindex a las páginas 404.
export const metadata: Metadata = {
  title: "Página no encontrada",
};

/** Se muestra cuando una ruta de la web llama a notFound() (p. ej. un proyecto que no existe). */
export default function NotFound() {
  return <NotFoundContent />;
}
