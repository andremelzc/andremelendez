import { notFound } from "next/navigation";

/**
 * Cualquier dirección que no coincida con otra ruta de la web acaba aquí y se
 * resuelve como 404 dentro del layout del sitio (con su barra, tema y pie).
 * Next no admite un not-found en la raíz cuando hay dos layouts raíz (la web y
 * el Studio de Sanity), así que se resuelve con esta ruta comodín.
 */
export default function CatchAll() {
  notFound();
}
