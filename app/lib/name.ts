/** Nombre de pila y primer apellido ("Andre" / "Meléndez") a partir del nombre completo. */
export function splitDisplayName(fullName: string): [string, string] {
  const words = fullName.trim().split(/\s+/);
  if (words.length < 2) return [words[0] ?? "", ""];
  const surname = words.length >= 3 ? words[words.length - 2] : words[1];
  return [words[0], surname];
}

/** Nombre corto para títulos y metadatos: "Andre Meléndez". */
export function shortName(fullName: string): string {
  return splitDisplayName(fullName).filter(Boolean).join(" ");
}
