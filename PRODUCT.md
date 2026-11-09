# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Reclutadores o empresas que evalúan a un desarrollador junior, y clientes freelance que buscan quien les construya un proyecto. Ambos pesan por igual. Llegan para decidir si contactar a Andre, y la acción final es escribirle o descargar el CV. El sitio incluye la señal "Disponible para proyectos".

## Product Purpose

Portfolio personal de Andre Iván Meléndez Cava, estudiante de Ingeniería de Software en la UNMSM y desarrollador full-stack. Muestra sus proyectos y habilidades técnicas, y convierte la visita en un contacto o una descarga de CV. Éxito: que un visitante entienda en una sola visita qué ha construido Andre y le escriba.

## Positioning

Proyectos reales y completos: trabajos de punta a punta que el visitante puede ver y abrir, no una lista de tecnologías. El portfolio mismo es una prueba: Next.js con Sanity como CMS, desplegado en Vercel.

## Operating Context

- Todo el contenido (perfil, proyectos, habilidades) se gestiona en Sanity Studio, montado en `/studio`, y se revalida por etiquetas mediante `app/api/revalidate` (webhook de Sanity).
- Los datos de contacto viven en el documento `profile` de Sanity: `email`, `github`, `linkedin` y los archivos `cvSpanish` y `cvEnglish`. `app/data/urls.ts` y `/public` guardan copias de respaldo que solo se usan si falta el campo.
- Despliegue en Vercel: andremelendez.vercel.app.
- Hay páginas de detalle por proyecto en `/projects/[slug]`; no todos los proyectos tienen (`hasDetails`).
- Los metadatos (título, descripción, Open Graph, Twitter, enlace canónico) salen del perfil de Sanity y de `app/lib/metadata.ts`; la imagen para compartir se genera en `app/(frontend)/opengraph-image.tsx`. La dirección pública se toma de `NEXT_PUBLIC_SITE_URL` o, en Vercel, del dominio de producción. Hay `robots.txt` y `sitemap.xml`, y datos estructurados `Person` en la portada.
- Existe una ruta `/lab`, solo en desarrollo (404 en producción), para ajustar en vivo los efectos de píxeles.

## Capabilities and Constraints

- Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, next-themes y Sanity v4. El cliente de Sanity se importa desde `@sanity/client`, no desde la raíz de `next-sanity`, para no enviarlo al navegador. `styled-components` se mantiene porque el Studio lo exige.
- Una sola página con cuatro secciones ancladas (Inicio, Proyectos, Habilidades, Contacto) más el detalle de proyecto. Tema claro y oscuro.
- Idioma: el sitio está solo en español. No hay i18n; si se quiere, será una rama aparte (rutas `/es` y `/en`, textos de interfaz y campos por idioma en Sanity). Lo único disponible en inglés es el CV.
- El filtro de proyectos por categoría (Desarrollo Web, Desarrollo Móvil, Otros) se deriva de los datos: no aparece mientras todos sean de una categoría.
- Efectos de píxeles (campo del hero y del pie, retrato, estela del cursor): decorativos, se apagan con `prefers-reduced-motion` y no se activan con puntero táctil.

## Brand Commitments

Nombre: Andre Meléndez. Paleta vinculante, confirmada por Andre: rojo cereza, crema y negro. Lenguaje visual: geometría de celdas cuadradas, superficies planas y un campo de píxeles como único gesto de movimiento. Tipografía elegida: Archivo (titulares, pesada y extendida) y Geist (texto).

## Evidence on Hand

- 7 proyectos reales en Sanity, 4 destacados y 5 con página de detalle (`sanity/schemaTypes/project.ts`). Todos son de la categoría Desarrollo Web.
- 21 habilidades en 5 categorías, con iconos por tecnología (algunas sin icono: AWS Bedrock, Cognito, S3).
- CV en español y en inglés, en Sanity y con copia local en `/public`.
- Enlaces: GitHub (andremelzc), LinkedIn y correo, en el perfil de Sanity.
- Pendiente de contenido en Sanity: el nombre figura sin tilde ("Melendez") y la categoría de algunas habilidades está mal asignada (Node.js y Zod en Frontend, JavaScript en Backend).
- No hay testimonios, clientes ni métricas confirmados: el diseño no debe inventarlos.

## Product Principles

1. Los proyectos son la prueba: ocupan el centro y se pueden abrir y evaluar rápido.
2. Un solo camino claro hacia el contacto o el CV, tanto para quien recluta como para quien contrata. El correo es la acción principal.
3. El contenido vive en Sanity; la interfaz no depende de textos fijos en el código.
4. Español primero y, donde ya existe, también en inglés (el CV). La traducción completa es una decisión aparte.
5. El sitio demuestra el oficio de quien lo construyó: rendimiento y detalle visibles, sin adornos ni afirmaciones sin respaldo.

## Accessibility & Inclusion

Objetivo WCAG 2.2 AA. Hecho: contraste de texto ≥ 4,5:1 en ambos temas (acento propio `--accent-ink` para texto pequeño), foco visible en todo lo interactivo, enlace "Saltar al contenido", objetivos táctiles de al menos 24 px, un solo `h1` por página, `prefers-reduced-motion` respetado y puntuación Lighthouse de accesibilidad 100.
