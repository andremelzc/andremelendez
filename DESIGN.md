---
name: Andre Meléndez Portfolio (sistema heredado)
description: Portfolio de fondo crema, acento cereza y texto casi negro, con superficies de cristal esmerilado y halos de color.
colors:
  cherry-accent: "#b93737"
  cherry-accent-dark: "#d64545"
  cherry-soft: "#f9e1e1"
  cherry-ink: "#922c2c"
  cherry-glow: "#ec9b9b"
  cream-ground: "#fffcf9"
  cream-muted: "#fdf0e3"
  midnight-ink: "#191919"
  midnight-border: "#999999"
  midnight-ground: "#0b0b0b"
  midnight-muted: "#191919"
  midnight-line: "#1f1f1f"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.25
  headline:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.cream-ground}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-outline:
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  tech-badge:
    backgroundColor: "{colors.cherry-soft}"
    textColor: "{colors.cherry-ink}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  project-card:
    backgroundColor: "{colors.cream-muted}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.3xl}"
    padding: "24px"
---

# Design System: Andre Meléndez Portfolio (sistema heredado)

<!-- LEGACY: registrado como referencia del "antes" de un rediseño. Se conserva solo la paleta cereza, crema y negro como compromiso de marca. El rediseño sobrescribirá este archivo al terminar. -->

## Overview

**Creative North Star: "La Vitrina Esmerilada"**

Todo flota detrás de cristal. La página es un fondo crema (o negro, en oscuro) con halos de color desenfocados y en movimiento detrás, y sobre ellos tarjetas, navbar y bloque de texto de presentación con `backdrop-blur`, bordes translúcidos y brillos que reaccionan al pasar el ratón. Un único acento, el cereza, se reparte por todas partes con luz y degradados.

La composición es una sola columna centrada: etiqueta de disponibilidad, rol, nombre, foto circular, biografía en un bloque de cristal y dos botones. El sistema es suave, brillante y reactivo: casi cada elemento escala, brilla o cambia de degradado en hover. La densidad de efectos es alta; varios compiten en el mismo elemento.

La paleta cereza, crema y negro es lo único que Andre confirmó como vinculante. Cualquier otra cosa de este documento es evidencia del estado anterior, no una regla a conservar.

**Key Characteristics:**
- Cristal esmerilado en navbar, tarjetas y bloque de biografía.
- Nueve halos circulares desenfocados como fondo fijo, cinco de ellos animados.
- Un acento cereza con resplandor y degradados `accent/10` a `accent/30`.
- Hover reactivo en casi todo: `scale-105`, sombra y cambio de degradado.
- Composición centrada, una columna, foto circular.
- Tema claro y oscuro con la misma paleta invertida.

## Colors

Paleta cálida de tres familias: crema como suelo, cereza como acento único y casi negro como tinta.

### Primary
- **Cereza** (#b93737): acento en modo claro. Etiquetas, rol, puntos de estado, bordes en hover y anillos de foco (`--accent`).
- **Cereza vivo** (#d64545): el mismo acento en modo oscuro, aclarado para mantener contraste sobre negro.
- **Cereza velado** (#f9e1e1): fondo de las etiquetas de tecnología.
- **Cereza tinta** (#922c2c): texto e iconos sobre cereza velado.
- **Cereza brillo** (#ec9b9b): tercer paso de los degradados y resplandores.

### Neutral
- **Crema nácar** (#fffcf9): fondo claro y texto en oscuro (`--background` / `--foreground`).
- **Crema cálida** (#fdf0e3): superficies atenuadas en claro (`--muted`).
- **Casi negro** (#191919): texto en claro y superficie atenuada en oscuro.
- **Negro profundo** (#0b0b0b): fondo en oscuro.
- **Gris medio** (#999999): bordes en claro (`--border`).
- **Negro línea** (#1f1f1f): bordes en oscuro.

El sistema define además los demás pasos de `cherry`, `cream` y `midnight` (50 a 900) y una familia `deepred` que no se usa en ningún componente.

### Named Rules
**The Single Accent Rule.** Todo lo que no es neutro es cereza. No hay segundo color de acento; la variedad viene de la opacidad y del degradado, no del tono.

## Typography

**Display Font:** Geist (con Arial)
**Body Font:** Geist (con Arial)
**Label/Mono Font:** Geist Mono, cargada pero sin uso visible.

**Character:** una sola sans geométrica neutra para todo. La jerarquía viene del tamaño y del peso, no de un contraste entre familias.

### Hierarchy
- **Display** (700, 1.5rem a 3rem, 1.25): nombre en el hero (`text-2xl` a `text-5xl`).
- **Headline** (600, 1.125rem a 1.875rem): rol en cereza sobre el nombre.
- **Title** (700, 1.125rem a 1.5rem): título de proyecto en tarjeta.
- **Body** (400, 0.875rem a 1.125rem, 1.625): biografía y descripciones, con opacidad `/80` a `/90`.
- **Label** (500, 0.625rem a 0.875rem, 0.05em, mayúsculas): etiqueta "Disponible para proyectos"; el tracking sube a `tracking-widest` en hover.

### Named Rules
**The Weight-Not-Face Rule.** La jerarquía se construye con tamaño y peso dentro de Geist; no se introduce una segunda familia.

## Layout

Una sola página con cuatro secciones ancladas (`home`, `proyectos`, `habilidades`, `contacto`) más una ruta de detalle por proyecto. Contenedor centrado de hasta `max-w-6xl`, con gutters `px-4 sm:px-6 lg:px-8`. El hero ocupa `min-h-[100dvh]` y centra todo en columna. Las secciones usan `scroll-margin-top: 5rem` para compensar el navbar fijo y `scroll-behavior: smooth` (desactivado con `prefers-reduced-motion`).

El espaciado usa la escala por defecto de Tailwind con saltos por breakpoint (`gap-4 sm:gap-6 lg:gap-4`), a menudo con valores distintos en `lg` y `xl`. En móvil hay un navbar propio con auto-ocultado.

## Elevation & Depth

Híbrido: capas translúcidas más sombras grandes. La profundidad se construye con desenfoque de fondo y luz, no con superficies opacas.

### Shadow Vocabulary
- **Tarjeta** (`shadow-2xl`, sube a `shadow-3xl` en hover): tarjetas de proyecto.
- **Botón** (`shadow-lg shadow-foreground/25` en hover): botón primario y los demás.
- **Navbar** (`shadow-[0_4px_20px_rgba(0,0,0,0.3)]` en el indicador): píldora deslizante del menú.
- **Resplandor** (`blur-sm` / `blur-xl` con `accent/20`): halo detrás del botón primario y de la foto.

### Named Rules
**The Frosted-Layer Rule.** Toda superficie flotante lleva `backdrop-blur` y un borde translúcido; nada flota sobre fondo opaco.

## Shapes

Redondeo generoso y mezclado: `rounded-2xl` y `rounded-3xl` en tarjetas y bloques, `rounded-lg` por defecto en botones, `rounded-xl` en el indicador del navbar, y `rounded-full` en foto, etiquetas y píldoras (la forma más usada). Los fondos son círculos desenfocados. Los bordes son de 1px translúcidos (`border-border/30` a `/50`) con una línea de brillo superior de 1px en degradado.

## Components

### Buttons
- **Shape:** redondeado de 8px por defecto (`rounded-lg`); la prop `rounded` admite desde `none` hasta `full`.
- **Primary:** fondo `foreground` (casi negro en claro, crema en oscuro) con texto `background`, padding 12px 24px.
- **Hover / Focus:** `scale-105`, sombra `shadow-lg` y halo cereza difuminado; anillo de foco en acento.
- **Outline / Secondary / Ghost:** borde `border/50` o fondo `muted` con `backdrop-blur-sm` y degradado suave en hover.

### Chips
- **Style:** etiqueta de tecnología con fondo cereza velado (#f9e1e1), texto cereza tinta (#922c2c), `rounded-full`, icono de 24px.
- **State:** el contador "+N" usa fondo `muted/60` con borde y `backdrop-blur-sm`.

### Cards / Containers
- **Corner Style:** `rounded-2xl` en móvil y `rounded-3xl` desde `md`.
- **Background:** degradado `muted/50` → `background/30` → `muted/50`.
- **Shadow Strategy:** `shadow-2xl` y elevación en hover (`scale-[1.02]`, `-translate-y-1`).
- **Border:** 1px `border/50`, que pasa a `accent/30` en hover.
- **Internal Padding:** 16px en móvil, 24px desde `md`.

### Navigation
- Píldora de cristal fija arriba (`backdrop-blur-2xl`, borde blanco al 20%) con un indicador deslizante blanco que se mueve con curva `cubic-bezier(0.34,1.56,0.64,1)` y se encoge al hacer scroll. En móvil, menú propio con auto-ocultado.

### Etiqueta de disponibilidad (componente propio)
Píldora `accent/10` con borde `accent/30`, punto cereza que pulsa, texto en mayúsculas pequeñas con tracking que se ensancha en hover.

## Do's and Don'ts

### Do:
- **Do** usar cereza (#b93737 en claro, #d64545 en oscuro) como único acento y mantener la inversión crema/negro entre temas.
- **Do** respetar `prefers-reduced-motion`, como ya hace el scroll suave.
- **Do** conservar la paleta cereza, crema y negro en cualquier rediseño: es el compromiso de marca.

### Don't:
- **Don't** apilar cristal, degradado, halo y escala en un mismo elemento: es el exceso que este sistema ya muestra.
- **Don't** usar los halos de fondo animados (`animate-pulse`, `animate-bounce`, `animate-ping`) como decoración; son cinco elementos animados de forma permanente.
- **Don't** tomar la composición centrada con foto circular como estructura a conservar; es el estado anterior.
