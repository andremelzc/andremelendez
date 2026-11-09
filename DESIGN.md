---
name: Andre Meléndez Portfolio
description: Portfolio de celdas cuadradas y superficies planas, en cereza, crema y negro, con un campo de píxeles como único gesto de movimiento.
colors:
  cherry-accent: "#b93737"
  cherry-accent-dark: "#d64545"
  cherry-ink-dark: "#e36d6d"
  cherry-light: "#f4c7c7"
  cherry-deep: "#6b1d1d"
  cream-ground: "#fffcf9"
  cream-muted: "#fdf0e3"
  ink: "#191919"
  ink-line: "#999999"
  black-ground: "#0b0b0b"
  black-line: "#1f1f1f"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "7rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "56px"
  section-sm: "48px"
  section-md: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream-ground}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cherry-accent}"
    textColor: "{colors.cream-ground}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  navbar:
    backgroundColor: "{colors.cream-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px"
  skill-cell:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "96px"
    width: "128px"
---

# Design System: Andre Meléndez Portfolio

## Overview

**Creative North Star: "La Retícula Viva"**

Todo el sitio se construye sobre una retícula de celdas cuadradas. El hero la muestra como un campo que se enfría hacia el texto; el resto de la página la lleva a la estructura: reglas de 1 px entre filas, celdas con borde fino para las habilidades, viñetas que son una celda. Lo demás es plano. Los titulares en Archivo pesado y extendido, a la izquierda, hacen el trabajo de una ilustración; el color vive en zonas enteras o en tinta sólida, nunca como tinte.

El movimiento tiene un solo dueño: el campo de píxeles. Fluye, centellea, lo cruza un barrido, nacen ondas y reacciona al cursor; el mismo campo cierra la página en el pie, y una estela de celdas sigue al cursor por todo el sitio. Fuera de eso, las interacciones cambian de color en 150 ms y nada más: sin escalas, sin sombras, sin degradados, sin cristal. La única excepción es la barra de navegación, flotante y centrada, que conserva un fondo translúcido con desenfoque suave para leerse sobre cualquier cosa.

La paleta cereza, crema y negro es el compromiso de marca. La estructura es asimétrica y alineada a la izquierda, con una rejilla de márgenes común a todas las secciones.

**Key Characteristics:**
- Esquinas cuadradas y reglas de 1 px en vez de tarjetas, sombras o fondos.
- Titulares en Archivo 800, ancho 112 %, con tracking negativo.
- Un único acento (cereza) y dos temas que invierten crema y negro.
- Un campo de píxeles animado como firma; el resto, quieto.
- Todo lo interactivo tiene foco visible, área táctil suficiente y respeta `prefers-reduced-motion`.

## Colors

Tres familias, cereza, crema y negro, con una función clara cada una: el negro es tinta y fondo oscuro, la crema es suelo y texto en oscuro, el cereza es el único acento.

### Primary
- **Cereza** (#b93737): el acento del tema claro. Rol bajo el nombre, marcas, anillo de foco, borde en hover y el paso medio del campo.
- **Cereza vivo** (#d64545): el mismo acento en tema oscuro (`--accent`).
- **Cereza de texto** (#b93737 claro, #e36d6d oscuro): `--accent-ink`, el acento para texto pequeño. El cereza vivo rozaba 4,5:1 sobre negro (4,49:1); este token garantiza contraste en ambos temas.
- **Cereza claro** (#f4c7c7) y **cereza profundo** (#6b1d1d): pasos del campo y de la marca de la barra.

### Neutral
- **Crema nácar** (#fffcf9): fondo claro y texto en oscuro (`--background` / `--foreground`).
- **Crema cálida** (#fdf0e3): superficie atenuada en claro (`--muted`).
- **Casi negro** (#191919): texto en claro y superficie atenuada en oscuro.
- **Negro profundo** (#0b0b0b): fondo en oscuro.
- **Gris línea** (#999999 claro, #1f1f1f oscuro): borde (`--border`). Las reglas finas usan el color de texto al 25 %.

Las escalas completas `cherry`, `cream` y `midnight` (50 a 900) están definidas una sola vez en `@theme static`; los colores semánticos son lo único que cambia entre temas.

### Named Rules
**The Single Accent Rule.** Todo lo que no es neutro es cereza. La variedad viene del paso de la paleta y de la opacidad, no de otro tono.

**The Five-Step Rule.** El campo, el retrato y la estela usan los mismos cinco pasos: suelo, cereza claro, cereza, cereza profundo y negro (invertidos en oscuro, de modo que el extremo vacío siempre es el fondo de la página). Existen dos variantes de paleta para experimentar (cereza suave y tinta).

## Typography

**Display Font:** Archivo (variable, eje de ancho `wdth`, peso 800), con Arial de respaldo
**Body Font:** Geist (variable), con Arial de respaldo

**Character:** una grotesca pesada y extendida para el nombre y los títulos, y una sans neutra para todo lo que se lee. La jerarquía sale del tamaño y del peso, no de una tercera familia.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 9vw, 7rem)`, 0,92): el nombre en el hero, en dos líneas ("Andre" / "Meléndez"); el nombre completo queda en un `sr-only`.
- **Headline** (800, `clamp(2.25rem, 6vw, 4.5rem)`, 0,95): título de cada sección.
- **Title** (800, `clamp(1.75rem, 3.2vw, 2.75rem)`, 1): nombre de proyecto en el índice. En el detalle, `clamp(2.5rem, 8vw, 6rem)` para el `h1` y `clamp(1.5rem, 2.4vw, 2rem)` para cada bloque.
- **Contact** (800, `clamp(1.125rem, 3.6vw, 3.25rem)`): el correo, en la voz del titular.
- **Body** (400, 16 a 18 px, 1,625): presentación y descripciones, con medida de 52 a 68 caracteres.
- **Label** (500, 14 px): enlaces, metadatos y botones.

### Named Rules
**The Weight-Not-Face Rule.** No se añade una tercera familia: Archivo para titulares, Geist para el resto.

**The Accent-Clearance Rule.** Los titulares compactos (interlineado 0,92 a 1) dejan margen sobre la "É" de "Meléndez" para que el acento no se recorte.

## Layout

Una página con cuatro secciones ancladas (`#home`, `#proyectos`, `#habilidades`, `#contacto`) más el pie, y una ruta de detalle por proyecto. Todas comparten los márgenes laterales del hero: 16 px en móvil, 32 px desde `sm` y 56 px desde `lg`, sin ancho máximo, de modo que el borde izquierdo de todo cae en la misma línea.

El hero ocupa `100svh`. En móvil y tableta el texto arranca arriba y el campo llena lo que queda debajo; desde `lg` se centra en vertical. Las secciones se separan con relleno vertical de 48 px en móvil, 80 px desde `sm` y 112 px desde `lg`. Cada sección abre con una regla de 1 px y su título.

Los listados son filas separadas por una regla fina: el índice de proyectos (miniatura de 13 rem, nombre y descriptor, metadatos), la lista de habilidades por categoría (etiqueta de 14 rem y celdas) y las columnas del pie. En móvil las miniaturas son una franja a todo el ancho y las habilidades son celdas en línea, para que no queden huecos a los lados. Los objetivos táctiles mínimos son de 24 px; los enlaces pequeños amplían su área con `.hit-area`.

## Elevation & Depth

Plano. No hay sombras, degradados ni superficies elevadas: la profundidad la dan las reglas de 1 px, el contraste de tamaños y el campo de píxeles detrás del texto. El texto nunca se apoya sobre celdas; el campo deja libre el recuadro del texto con un margen de 6 celdas.

La barra de navegación (`bg-background/75`, `backdrop-blur-md`) y el menú móvil son las únicas superficies translúcidas, y la estela del cursor son celdas con opacidad máxima de 0,55 para no tapar el texto.

### Named Rules
**The Hairline Rule.** Un límite se marca con una línea de 1 px, nunca con una caja, una sombra o un fondo.

## Shapes

Cuadrado en todo. El radio es 0 en botones, barra, miniaturas, celdas y viñetas. Los bordes son de 1 px. Las celdas del campo están separadas por 1 px del color del fondo, y las celdas de habilidades se solapan por su borde para formar una rejilla continua. Las viñetas de logros son un cuadrado de 10 px en el acento.

### Named Rules
**The Square Rule.** Ninguna píldora, ningún círculo, ninguna esquina redondeada.

## Components

### Buttons
- **Shape:** rectángulo sin radio, 1 px de borde en la variante contorno.
- **Primary:** fondo tinta (`foreground`) y texto del fondo; relleno 12 px 24 px; hover pasa a cereza con texto crema en 150 ms.
- **Outline:** borde y texto en tinta; hover rellena de tinta.
- **Secondary / Ghost:** fondo atenuado o transparente, mismo cambio de color.
- **Focus:** contorno de 2 px en el acento con desfase; nunca se oculta (el `outline-none` heredado de Tailwind 3 apagaba el foco y se eliminó).
- El botón del CV va acompañado de un segundo botón pegado ("EN") con borde compartido.

### Navigation
- Píldora centrada y flotante (`fixed`, arriba), cuadrada, con borde de 1 px, fondo translúcido y una marca de cuatro celdas a la izquierda.
- El enlace activo lo marca un bloque sólido que se desplaza entre enlaces **por pasos** (`steps(6)`, 280 ms), sin rebote; en oscuro se invierte (bloque crema, texto negro).
- En móvil, un botón cuadrado de 48 px abre un menú plano que queda `inert` mientras está cerrado.
- La sección activa es la que cruza el centro de la pantalla; fuera de la página principal no se marca nada.

### Project Row
Fila con miniatura, nombre en Archivo, descriptor (lo que sigue a los dos puntos del título en Sanity), tecnologías en texto plano separadas por "·", y rol, año y enlaces a la derecha. Solo el título, la miniatura y "Ver detalle" llevan al detalle; el resto de la fila no es clicable. Si hay más de una categoría, aparece encima un filtro de botones cuadrados con contador y cada fila muestra su categoría.

### Skill Cells
Cada habilidad es una celda de 128 por 96 px con icono en el acento y nombre, con borde de 1 px que se solapa con el vecino. En móvil son celdas en línea de 56 px de alto. Todas las categorías se ven a la vez.

### Section Header
Regla de 1 px, título en Archivo 800 alineado a la izquierda y, opcionalmente, una línea de texto en gris.

### Contact and Footer
El correo, en el tamaño del titular, es la acción principal; LinkedIn, GitHub y los dos CV son enlaces subrayados. A la derecha, el retrato. El pie lleva nombre y rol, columnas de navegación y enlaces, la franja del campo animado y el copyright.

### Pixel Field (signature component)
Canvas de baja resolución (una celda por píxel, escalado sin suavizado) con una banda diagonal que se enfría hacia el texto. Capas: flujo de ruido, centelleo, barrido diagonal, ondas espontáneas, mancha y estela bajo el cursor, onda al hacer clic o tocar y entrada en ola al verse por primera vez. Se pausa fuera de pantalla y dibuja un solo fotograma con `prefers-reduced-motion`. Todos los parámetros viven en `lib/pixelSettings` y se ajustan en `/lab`.

### Pixel Portrait
La foto, sin recortar, reducida a los cinco pasos de la paleta con tramado ordenado. Modos: ventana nítida que sigue al cursor (por defecto), todo pixelado, o solo foto. La foto nítida queda oculta hasta que el canvas la cubre.

### Cursor Trail
Canvas fijo y sin eventos que deja celdas translúcidas bajo el ratón en toda la página y las apaga solas. Solo con puntero fino y sin movimiento reducido; en reposo no consume nada.

## Do's and Don'ts

### Do:
- **Do** marcar cada límite con una línea de 1 px (`foreground` al 25 %) y dejar el resto sin caja.
- **Do** usar Archivo 800 con `font-stretch: 112%` y tracking negativo para nombres y títulos, alineados a la izquierda.
- **Do** usar `--accent-ink` para texto pequeño en cereza y comprobar el contraste en ambos temas.
- **Do** dar foco visible (2 px, acento) a todo lo interactivo y ampliar el área de los enlaces pequeños.
- **Do** mantener todo el movimiento decorativo dentro del campo, la estela y el retrato, y apagarlo con `prefers-reduced-motion`.
- **Do** alinear el contenido de cada sección a los márgenes laterales del hero.

### Don't:
- **Don't** usar esquinas redondeadas, píldoras, círculos, sombras, degradados ni cristal fuera de la barra de navegación.
- **Don't** añadir halos desenfocados, puntos pulsantes ni escalas al pasar el cursor.
- **Don't** envolver contenido en tarjetas: filas con regla, no cajas.
- **Don't** poner texto sobre las celdas del campo.
- **Don't** introducir una tercera familia tipográfica ni un segundo color de acento.
- **Don't** importar `groq` o `createClient` desde la raíz de `next-sanity`: arrastra el cliente de Sanity completo al navegador.
