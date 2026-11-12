# Prompt de ejecución SEO — Propus

> Prompt autónomo para Sonnet 5 / Opus 4.8. Derivado de la auditoría en [auditoria-seo.md](./auditoria-seo.md).
> Copiar todo el bloque de abajo y pegarlo tal cual al agente ejecutor.

---

# MISIÓN
Implementa las mejoras SEO de esta auditoría en la web de Propus (agencia de IA). SOLO AÑADE y ENRIQUECE: está prohibido borrar, renombrar o rediseñar rutas, secciones o contenido existente.

# CONTEXTO FIJO
- Marca pública: **Propus**. Dominio canónico: **https://propus.ink**. Idioma: es-ES.
- Posicionamiento: nacional con base local en Albacete (la única página con ángulo local es /sobre-nosotros; no propagues "Albacete" al resto).
- Negocio: (1) agentes recepcionistas autónomos en WhatsApp + CRM de control interno para clínicas — nicho principal dental, secundario estética (producto: AutoClinic, en /proyectos/agente-whatsapp); (2) diseño web experto — portfolio real en /proyectos/web-design con 4 clientes (elrincondehector.com, casinoelbonillo.com, liopub.com, golosea.com).
- Stack: Next.js 16 App Router, React 19, TS estricto (sin any), Tailwind v4 (NO crear tailwind.config.js; tema en app/globals.css con @theme), shadcn v4, radix-ui monorepo, imports `@/`. Server Components por defecto. Secciones en components/sections/. Blog hardcodeado en lib/blog.ts (interface BlogPost, content en HTML con clases Tailwind — imita exactamente el formato del post existente).
- CTA estándar de toda la web: botón "Agendar llamada" → `/reservar` (calendario propio; usa `rutaReservar` de `lib/site.ts`, enlace interno, sin target _blank). Úsalo en las landings nuevas. Desde el 12/11/2026 ya no se usa la agenda de Google.
- Estilo visual: replica los patrones existentes (gradientes bg-linear-to-r con tokens brand-teal/brand-green/brand-sky/brand-emerald/brand-lime, Cards de shadcn, secciones py-20 md:py-28, max-w-6xl). Lee 2-3 secciones existentes antes de escribir las nuevas.

# RESTRICCIONES DURAS
1. NO tocar el copy, JSX ni diseño de páginas/secciones existentes, con UNA excepción quirúrgica: en components/sections/ServiceWeb.tsx línea ~193 hay un `<h1>` decorativo dentro de un mockup — cámbialo a `<p>` conservando exactamente las mismas className (cero cambio visual).
2. Cero canibalización: cada página/post tiene UNA keyword primaria única (tabla abajo). Prohibido repetir párrafos o bloques de copy entre páginas.
3. No añadir librerías. No usar `any`. Todo en español.

# KEYWORD MAP (respétalo)
- /soluciones/clinicas → "agente y CRM para clínicas" (landing unificada: dental + estética + fisioterapia)
- /servicios/diseno-web-clinicas → "diseño web para clínicas"
- /proyectos/web-design (solo metadata) → "diseño de páginas web a medida"
- Blog pillar recepcionista-virtual-clinica-dental → "recepcionista virtual clínica dental" (informacional)
- Posts: chatbot-whatsapp-citas-clinica / reducir-no-shows-clinica-recordatorios / software-gestion-clinica-dental / automatizar-recepcion-clinica-estetica / diseno-web-clinica-dental

# FASES (ejecuta en orden, verifica cada una antes de seguir)

## FASE 1 — SEO técnico base
1. `app/robots.ts`: allow all; disallow /offline; sitemap https://propus.ink/sitemap.xml.
2. `app/sitemap.ts`: todas las rutas estáticas + posts desde getAllPosts() de lib/blog.ts (importa, no dupliques slugs a mano), con lastModified, changeFrequency y priority coherentes. Debe incluir las rutas nuevas de la Fase 3.
3. `app/layout.tsx` (solo AÑADIR claves al objeto metadata existente): `metadataBase: new URL("https://propus.ink")`, `title: { default: <título actual>, template: "%s — Propus" }`, `alternates: { canonical: "/" }`, openGraph global (siteName Propus, locale es_ES, type website) y twitter card summary_large_image.
4. `robots: { index: false, follow: false }` en app/offline/page.tsx.
Aceptación: npm run build sin errores; /sitemap.xml y /robots.txt responden.

## FASE 2 — Canonicals + JSON-LD
1. Añade `alternates: { canonical: "<ruta>" }` a la metadata de CADA página existente (sobre-nosotros, blog, blog/[slug] vía generateMetadata, proyectos/*, legal/*).
2. `components/seo/OrganizationSchema.tsx` (Organization: name Propus, url, logo /favicons/android-chrome-512x512.png, sameAs Instagram/Facebook — cópialos de LocalBusinessSchema.tsx). Móntalo en app/layout.tsx.
3. `components/seo/FAQSchema.tsx` (FAQPage genérico que recibe {question, answer}[]). En components/sections/FAQ.tsx SOLO añade el schema importándolo con el array faqs existente (no toques el JSX visible).
4. `components/seo/ServiceSchema.tsx` genérico (Service: name, description, provider→Propus, areaServed España). Móntalo en /proyectos/agente-whatsapp, /proyectos/facturia y en las 3 landings nuevas.
5. `components/seo/BreadcrumbSchema.tsx` (BreadcrumbList) montado en app/blog/[slug]/page.tsx junto al BlogPosting existente; añade también mainEntityOfPage y image al articleSchema existente.
6. En components/seo/LocalBusinessSchema.tsx: añade `{ "@type": "Country", name: "España" }` a areaServed (no borres lo local).
Aceptación: validar cada schema contra schema.org; sin claves undefined.

## FASE 3 — Landings nuevas (3)
Crea con secciones propias en components/sections/soluciones/ (dental, estética) y components/sections/servicios/ (diseño web). Cada landing: H1 único con su keyword, hero + problema/beneficios + cómo funciona + FAQ propia (4-5 preguntas distintas de las de la home, con FAQSchema) + CTA "Agendar llamada". 600-900 palabras de copy único por landing.
1. `app/soluciones/clinicas/page.tsx`: landing unificada para clínicas (dental como nicho principal + estética + fisioterapia). Dolor = teléfono saturado, no-shows, recepción fuera de horario; solución = agente WhatsApp 24/7 + CRM (agenda, pacientes, bonos, base de conocimiento). Sección de sectores mostrando el mix. Enlaza a /proyectos/agente-whatsapp ("conoce AutoClinic") y al pillar del blog.
3. `app/servicios/diseno-web-clinicas/page.tsx`: diseño web orientado a captar primeras visitas para clínicas; enlaza a /proyectos/web-design como prueba (4 webs reales en producción).
Metadata completa por landing (title ≤60 chars con keyword, description 140-160, canonical, openGraph).
Aceptación: cada landing con exactamente un H1; keyword primaria en title, H1 y primer párrafo; estilo visual indistinguible del resto de la web.

## FASE 4 — Portfolio y navegación
1. En /proyectos/web-design SOLO enriquece metadata: title "Diseño de páginas web a medida — Portfolio | Propus", description con keyword, canonical. Los enlaces salientes a los 4 clientes se quedan como están (dofollow correcto: son trabajos propios).
2. Navbar (components/layout/Navbar.tsx): añade un dropdown "Soluciones" con las 3 landings nuevas, siguiendo el patrón exacto de los dropdowns existentes (desktop + mobile sheet). No reordenes lo demás.
3. Footer (components/layout/Footer.tsx): añade columna o entradas "Soluciones" con las 3 landings.
Aceptación: navegación desktop y móvil funcionan; ningún enlace existente eliminado.

## FASE 5 — Cluster de blog (6 posts en lib/blog.ts)
Añade 6 objetos BlogPost imitando EXACTAMENTE el formato HTML del post existente (mismas clases: text-muted-foreground leading-relaxed mb-4, h2 text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground, listas list-disc pl-6...). 1200-1800 palabras el pillar, 800-1200 los demás. Fechas escalonadas (usa fechas entre 2026-05 y 2026-07). Tags coherentes (Clínicas, WhatsApp, IA, Diseño web...).
- Pillar `recepcionista-virtual-clinica-dental`: guía completa; enlaza (con <a href> internos) a /soluciones/clinicas y a los otros posts.
- Los 5 posts satélite del keyword map, cada uno con su ángulo (técnico / ROI no-shows / checklist CRM / caso estética / conversión web dental) y enlace al pillar + su landing.
Aceptación: cero párrafos duplicados entre posts; cada post enlaza al pillar; el pillar enlaza a todos.

## FASE 6 — Enlazado interno
Verifica que exista esta malla (añade enlaces contextuales donde falten, solo en contenido NUEVO): landings ↔ sus posts, pillar ↔ satélites, landings de clínicas ↔ /proyectos/agente-whatsapp, landing diseño web ↔ /proyectos/web-design, sitemap incluye todo.

# CHECKLIST FINAL (ejecuta y reporta)
- [ ] `npm run build` sin errores ni warnings de tipos.
- [ ] /robots.txt y /sitemap.xml generados; sitemap contiene las 3 landings y los 7 posts.
- [ ] Cada página tiene title, description y canonical ÚNICOS (grep para verificar que no hay duplicados).
- [ ] Un solo <h1> por página (incluida la home tras el fix de ServiceWeb).
- [ ] JSON-LD presente: Organization (global), LocalBusiness (sobre-nosotros), Service (5 páginas), FAQPage (home + 3 landings), BlogPosting+Breadcrumb (posts).
- [ ] Ninguna keyword primaria repetida entre dos páginas.
- [ ] Ninguna ruta/sección/copy preexistente eliminada o alterada (salvo el h1→p de ServiceWeb y las adiciones de metadata/navegación).
