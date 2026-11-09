/**
 * Los títulos de Sanity siguen el patrón "Nombre: descriptor". Para el índice
 * se muestran por separado; el dato en Sanity no cambia. Si el título no tiene
 * dos puntos (o el nombre sería largo), se devuelve entero como nombre.
 */
export function splitProjectTitle(title: string): {
  name: string;
  descriptor: string;
} {
  const i = title.indexOf(":");
  if (i === -1) return { name: title.trim(), descriptor: "" };
  const name = title.slice(0, i).trim();
  const descriptor = title.slice(i + 1).trim();
  if (!name || !descriptor || name.length > 28) {
    return { name: title.trim(), descriptor: "" };
  }
  return { name, descriptor };
}
