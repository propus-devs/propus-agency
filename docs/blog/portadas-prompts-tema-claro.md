# Portadas en tema claro (desde 2026-11-14)

La web pasó a tema claro y las portadas de `portadas-estilo.md` (fondo casi negro,
neón) ya no encajan en las tarjetas blancas del blog. Las entradas nuevas usan
**dos variantes claras**; el resto de reglas no cambia (16:9, JPEG de 1600 px de
ancho, menos de 400 KB, sin texto ni logos, sujeto en el tercio central-superior,
cuarto inferior sacrificable). La parte baja funde hacia blanco porque la tarjeta
le superpone un degradado hacia el color de la card.

Los másteres (2752 × 1536) se guardan aquí, en `docs/blog/` (ignorados por git);
al repositorio sólo va la versión optimizada de `public/img/blog/<slug>.jpg`.

---

## Variante fría (clínicas, AutoClinic)

```
STYLE: Bright, airy, minimal 3D render with a soft editorial feel. Background is
a pale cool off-white (#EDF3F5) with a faint mint-to-sand gradient mesh; the
bottom quarter fades gently into near-white (#FFFFFF) so the image melts into a
white card. Soft diffused daylight from the upper left, long soft shadows, matte
clay and frosted-glass surfaces, no harsh speculars. Palette used sparingly on
the focal elements: deep teal (#087069), sky blue (#0B62A0), emerald (#067550),
ink navy (#0F2230) for fine details. Shallow depth of field, generous negative
space; the main subject sits in the upper-middle third of the frame. Calm,
trustworthy, friendly, premium. 16:9.

NEGATIVE: no text, no lettering, no numbers, no watermarks, no logos, no brand
marks, no WhatsApp or Meta iconography, no recognisable faces, no people, no
close-up skin, no medical gore, no red or orange heatmap colours, no neon, no
purple or magenta, no black or dark backgrounds, no heavy vignetting, no flat
vector clipart.
```

## Variante cálida (turismo rural, RuralProp)

Sale de la paleta `--color-rural-*` de `app/globals.css`.

```
STYLE: Warm, airy, minimal 3D render with a soft editorial, hand-crafted feel.
Background is a pale cream paper tone (#F1E9D4) that fades gently into near-white
(#FFFFFF) at the bottom quarter, so the image melts into a white card. Soft
diffused morning light from the upper left, matte clay-like and frosted surfaces,
no harsh speculars. Palette used sparingly: forest green (#2C3A27), moss green
(#93B95C), honey gold (#E6AB4A), clay (#CF7A52) as a rare accent. Shallow depth
of field, generous negative space; the main subject sits in the upper-middle third
of the frame and the bottom quarter fades to light mist. Calm, trustworthy,
premium. 16:9.

NEGATIVE: no text, no lettering, no numbers, no watermarks, no logos, no brand
marks, no recognisable faces, no people, no neon, no purple or magenta, no black or
dark backgrounds, no heavy vignetting, no flat vector clipart.
```

Para cada escena se añaden a `NEGATIVE` las exclusiones propias (ver abajo).

---

## 1 · SEO para casas rurales del Pirineo

- **Slug:** `seo-local-casa-rural-pirineo-aragones`
- **Fichero:** `public/img/blog/seo-local-casa-rural-pirineo-aragones.jpg`
- **Variante:** cálida. **Extra en NEGATIVE:** no map-app interface or recognisable map icons.
- **Concepto:** valle pirenaico al amanecer con un refugio de piedra y madera y un marcador de mapa dorado flotando encima.

```
A stylised Pyrenean valley at dawn, seen from slightly above. Layered ridgelines
in soft moss green and misty blue recede toward snow-dusted peaks. In the
left foreground sits a small stone-and-timber mountain lodge with a single warm
honey-coloured lit window and a thin curl of chimney smoke. Floating above the
valley is a simple glowing honey-gold map pin, generic and unbranded. Very fine
topographic contour lines are subtly etched across the hillsides like an old
survey map. Calm morning mist in the valley floor.

[+ bloque STYLE / NEGATIVE cálido]
```

## 2 · Software de gestión para clínica de podología

- **Slug:** `software-gestion-clinica-podologia`
- **Fichero:** `public/img/blog/software-gestion-clinica-podologia.jpg`
- **Variante:** fría.
- **Concepto:** huellas descalzas en arcilla suave con un mapa de presión en tonos verde azulado, junto a una agenda de cristal con un hueco iluminado.

```
Two abstract bare footprints pressed into a smooth pale clay-like surface, each
with a soft plantar pressure map glowing inside it as a monochrome gradient from
light mint to deep teal. Beside them floats a minimalist appointment calendar
made of frosted-glass tiles in a loose grid, with no numerals, where a single
tile glows deep teal to suggest the next visit. A few thin sky-blue lines connect
the footprints to that tile like a gentle path. Calm, clinical but friendly, no
medical detail.

[+ bloque STYLE / NEGATIVE frío]
```

## 3 · Registro de viajeros en tu casa rural (SES Hospedajes)

- **Slug:** `registro-viajeros-ses-hospedajes-casa-rural`
- **Fichero:** `public/img/blog/registro-viajeros-ses-hospedajes-casa-rural.jpg`
- **Variante:** cálida. **Extra en NEGATIVE:** no flags, no coats of arms, no government or police emblems, no passport or ID document details.
- **Concepto:** una llave antigua con etiqueta de madera sobre fichas de check-in, y una tableta de cristal con campos en blanco y un sello de verificación.

```
An old brass key with a small wooden tag resting on a short stack of cream
check-in cards, placed on a smooth light surface. Next to it, a thin frosted-glass
tablet standing at a slight angle shows an abstract form made only of blank
rounded bars and empty fields, with a soft moss-green check seal glowing at its
corner. Softly blurred in the background, the silhouette of a small stone country
cottage with one warm lit window. Quiet, orderly, reassuring.

[+ bloque STYLE / NEGATIVE cálido]
```
