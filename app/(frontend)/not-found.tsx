import type { Metadata } from "next";
import NotFoundContent from "@/app/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: "Página no encontrada | Andre Melendez",
};

/** Se muestra cuando una ruta de la web llama a notFound() (p. ej. un proyecto que no existe). */
export default function NotFound() {
  return <NotFoundContent />;
}
