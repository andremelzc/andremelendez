---
version: 1
slug: "app-frontend-page-tsx"
primary_target: "app/(frontend)/page.tsx"
related_targets: []
---

# Surface brief: portfolio home

Scope and mode: whole home page (`/`), visitor mode Experience. First build step: the hero with the abstract pixel field. Projects index, skills, contact band and detail page follow in later steps.

Audience and job: recruiters and freelance clients, equal weight. They decide in one visit whether to write to Andre; the action is writing or downloading the CV. Proof: seven real projects (four featured, five with a detail page). Constraints: no i18n in this redesign, content stays in Sanity, light and dark themes, cherry/cream/black palette is binding.

Chosen direction: Direction A, pixel field, pinned by the user (no direction round was run). Memorable moment: the hero field that cools toward the text and heats under the cursor.

## Direction contract

THESIS: The name is the headline and a field of square cells that cools toward the text is the only motion on the page. It refuses the centered hero with a round photo, frosted glass and blurred halos.

OWN-WORLD: Cream ground (#fffcf9) or black ground (#0b0b0b) by theme, ink text, cherry as the single accent. The field uses five steps from the palette: ground, light cherry, cherry, dark cherry, black (reversed luminance in dark). Square cells with a 1px ground gap, square corners everywhere, flat controls with a colour change only on hover. Archivo, heavy and extended, for the name; Geist for text.

STORY: In one viewport the visitor learns who Andre is (name, role, what he builds), believes it because the page itself is crafted and alive, and acts: download the CV or go to contact.

FIRST VIEWPORT: Left-aligned, stacked name ("Andre" over "Meléndez") at about 11rem on desktop, scaling fluidly down to about 3.25rem on phones. The role sits above it in cherry, the bio below at a 52ch measure, then two flat buttons (CV primary, contact outline) and a plain line "Disponible para proyectos". The field fills the lower right as a diagonal band that bleeds off the right and bottom edges and dissolves up and to the left, so text never sits on cells. The fixed navbar stays at the top. Hero height is 100svh.

FORM: Pixel mosaic with dissolve edge and cursor heat, drawn on a low-resolution canvas scaled with pixelated rendering. Pinned by the user from the options considered (position 1 of 2 directions shown). seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Photo variant of the hero (pixelated portrait behind a flag) is built after the abstract one, for side-by-side comparison.
- If the abstract variant stays, whether a small sharp portrait goes in the contact band.
- Display face final choice (Archivo vs Bricolage Grotesque) is confirmed on screen.
