# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Reclutadores o empresas que evalúan a un desarrollador junior, y clientes freelance que buscan quien les construya un proyecto. Ambos pesan por igual. Llegan para decidir si contactar a Andre, y la acción final es escribirle o descargar el CV. El sitio incluye hoy la señal "Disponible para proyectos".

## Product Purpose

Portfolio personal de Andre Iván Meléndez Cava, estudiante de Ingeniería de Software en la UNMSM y desarrollador full-stack. Muestra sus proyectos y habilidades técnicas, y convierte la visita en un contacto o una descarga de CV. Éxito: que un visitante entienda en una sola visita qué ha construido Andre y le escriba.

## Positioning

Proyectos reales y completos: trabajos de punta a punta que el visitante puede ver y abrir, no una lista de tecnologías. El portfolio mismo es una prueba: Next.js con Sanity como CMS, desplegado en Vercel.

## Operating Context

- El contenido (perfil, proyectos, habilidades) se gestiona en Sanity Studio, montado en `/studio`, y se revalida por etiquetas mediante `app/api/revalidate`.
- Despliegue en Vercel: andremelendez.vercel.app.
- Hay páginas de detalle por proyecto en `/projects/[slug]`.
- El CV se sirve desde Sanity (campos `cvSpanish` y `cvEnglish`) con respaldo local en `public/`.

## Capabilities and Constraints

- Stack existente: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, next-themes, Sanity v4, keen-slider, styled-components. Se mantiene.
- El contenido sigue gestionándose desde Sanity; el rediseño cambia la capa visual, no el modelo de contenido, salvo lo que exija el soporte de dos idiomas.
- Tema claro y oscuro: se mantiene.
- Idiomas: hoy solo español. Decidido: i18n por rutas `/es` y `/en` en todo el sitio (home y detalle de proyecto), con campos por idioma en el esquema de Sanity. Andre migra los textos.
- Estructura de secciones (inicio, proyectos, habilidades, contacto en una página, más el detalle de proyecto): abierta a cambio. Andre pidió proponer una estructura mejor.
- Decisión abierta: estructura final de secciones y mundo visual, pendientes de las imágenes de inspiración. El inicio lidera con la presentación personal y los proyectos van justo debajo.

## Brand Commitments

Nombre: Andre Meléndez. Paleta vinculante, confirmada por Andre: rojo cereza, crema y negro. Todo lo demás del look actual (composición, tipografía, efectos de cristal, cabecera centrada con foto redonda) es libre de replantear. Andre aportará imágenes de inspiración más adelante y se tomará de ellas lo necesario.

## Evidence on Hand

- Proyectos reales cargados en Sanity (esquema `sanity/schemaTypes/project.ts`) con tecnologías asociadas; hay una tarjeta "próximamente" para proyectos futuros.
- Habilidades en Sanity, con iconos por tecnología (Java, C#, IA/ML, web).
- CV en español en `public/`; el CV en inglés es un campo opcional en Sanity.
- Enlaces: GitHub (andremelzc), LinkedIn y correo en `app/data/urls.ts`.
- No hay testimonios, clientes ni métricas confirmados: el rediseño no debe inventarlos.

## Product Principles

1. Los proyectos son la prueba: ocupan el centro y se pueden abrir y evaluar rápido.
2. Un solo camino claro hacia el contacto o el CV, tanto para quien recluta como para quien contrata.
3. El contenido vive en Sanity; la interfaz nunca depende de textos fijos en el código.
4. Bilingüe de verdad: español e inglés tienen el mismo peso, no uno traducido a medias.
5. El sitio demuestra el oficio de quien lo construyó: rendimiento y detalle visibles, sin adornos ni afirmaciones sin respaldo.

## Accessibility & Inclusion

Sin requisito específico establecido. Se asume una línea base razonable (contraste en ambos temas, navegación por teclado, `prefers-reduced-motion`).
