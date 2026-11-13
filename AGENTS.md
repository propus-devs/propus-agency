# Propus — Guía para agentes

Web de **Propus**: desarrollo web, software a medida y automatización (propus.es).

---

## Stack

| Capa        | Tecnología           | Versión |
|-------------|----------------------|---------|
| Framework   | Next.js (App Router) | 16.x    |
| UI          | React                | 19.x    |
| Estilos     | TailwindCSS          | 4.x     |
| Componentes | shadcn               | 4.x     |
| Primitivos  | radix-ui (monorepo)  | 1.x     |
| Animaciones | tw-animate-css       | —       |
| Iconos      | lucide-react         | —       |
| Tipografía  | Geist / Geist Mono   | —       |
| Lenguaje    | TypeScript           | 5.x     |

---

## Reglas críticas por tecnología

### TailwindCSS v4

TailwindCSS v4 es radicalmente distinto de v3. **No existe `tailwind.config.js`.**

- La configuración del tema vive en `app/globals.css` dentro del bloque `@theme inline { }`.
- Las utilidades se derivan de las CSS custom properties definidas en `:root` y `.dark`.
- Se importa así: `@import "tailwindcss"` — **no** `@tailwind base/components/utilities`.
- Para agregar tokens (colores, radios, fuentes), defínelos en `:root` y referéncialos en `@theme`.
- El modo oscuro usa `@custom-variant dark (&:is(.dark *))` — ya configurado.
- No crees `tailwind.config.js` — romperá la build.

### shadcn v4

shadcn v4 usa un modelo de paquete npm, **no** el modelo copy-paste de versiones anteriores.

- Paquete: `shadcn` (no `shadcn-ui`).
- Estilos base: `@import "shadcn/tailwind.css"` en `globals.css` — ya configurado.
- Componentes en `components/ui/`, importar como `@/components/ui/<nombre>`.
- Para agregar componentes: `npx shadcn add <componente>`. No copies archivos manualmente.
- Usa `radix-ui` (paquete monorepo unificado), **no** paquetes `@radix-ui/*` individuales.

### radix-ui v1 (monorepo unificado)

- Importa desde el paquete único: `import { Dialog, DialogContent } from "radix-ui"`.
- **No** uses `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, ni ningún sub-paquete.
- Consulta `node_modules/radix-ui/` para verificar exports disponibles.

### Next.js 16 App Router

- Todo el código vive en `app/`.
- Server Components por defecto — añade `"use client"` solo para interactividad real.
- Metadatos: `export const metadata: Metadata = { ... }` desde `layout.tsx` o `page.tsx`.
- API Routes: `app/api/<ruta>/route.ts` con exports `GET`, `POST`, etc.
- Verifica cualquier API de Next.js en `node_modules/next/dist/docs/` antes de usarla.

### Tema claro (portada y páginas de contenido)

Son claras la portada (`/`), Sobre nosotros, el blog (listado, paginación y posts), las páginas
legales, Diseño web a medida y la página offline. Siguen oscuras, cada una con su identidad propia,
AutoClinic, RuralProp y FacturIA. No hay un tema por ruta: cada página clara monta
`<FondoMalla />` (`components/ui/fondo-malla.tsx`) junto a `export const viewport = viewportClaro`
(`lib/tema-claro.ts`, color de la barra del navegador en móvil). El fondo lleva la clase
`.tema-claro` y, mientras exista, `html:has(.tema-claro)` (bloque "Tema claro" de `globals.css`)
sustituye los tokens (`--background`, `--foreground`, `--card`…) y los tonos de marca por una versión
clara. Una página nueva es clara si monta `<FondoMalla />`; si no, queda oscura.

- Los colores de marca neón viven en `--brand-*` (`:root`); `--color-brand-*` solo los referencia.
  En la portada pasan a versiones profundas. No escribas hex del neón en componentes de la portada.
- Usa tokens (`text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`) y `vidrio`
  (tarjeta de cristal) en las páginas claras; nada de `text-white`, `bg-black` ni `slate-*` sueltos.
- Para un bloque que deba seguir oscuro dentro de una página clara (pie, tarjeta del cierre) añade
  `isla-oscura`: repite los tokens oscuros y el neón. La pantalla de carga de la portada ya no lo
  es: usa la paleta clara (anillo de progreso con el logo) y debe seguir sin tramos quietos.
- Las variantes `dark:` están apagadas en las páginas claras (ver `@custom-variant dark`).
- Las páginas oscuras no se ven afectadas: sin `.tema-claro` en el DOM, nada de esto se activa.

### Idiomas (español e inglés)

El español vive en la raíz (grupo `app/(es)`, con las URLs de siempre) y el inglés cuelga de `/en`
(`app/en`). Cada uno tiene su propio layout raíz (así `<html lang>` sale bien en el HTML estático) y los dos
usan `lib/root-shell.tsx`. `/admin` va solo en español, con su layout raíz. Tiene que seguir sin existir
`app/layout.tsx`.

- **Rutas de pareja**: `lib/i18n/idiomas.ts` (`RUTAS`, pura y con pruebas). El inglés tiene sus propios
  nombres (`/en/services/…`, `/en/about-us`, `/en/book-a-call`). Una página con versión en los dos idiomas se
  da de alta ahí, en `app/sitemap.ts` (`conPareja`) y con `alternates.languages: alternas(clave)` en sus dos
  rutas (hreflang). El selector ES | EN del menú usa esa tabla.
- **Páginas compartidas**: el contenido vive en `components/pages/*Page.tsx` con una prop `lang`; las rutas de
  `app/(es)` y `app/en` son finas (metadatos + `<XPage lang="…" />`).
- **Textos**: cada componente lleva su objeto `textos: Record<Lang, …>` (TypeScript obliga a que los dos
  idiomas tengan las mismas claves) y una prop `lang` que por defecto es `"es"`. Cambiar un texto es cambiarlo
  en los dos. Los anclajes (`#proceso`, `#faq`…) son iguales en ambos idiomas.
- **Solo en español**: el blog y las páginas legales. En inglés se enlazan con la etiqueta «(in Spanish)» y
  `/en/blog` y `/en/legal/…` redirigen a la versión española (`next.config.ts`). Al traducir el blog, quitar
  esas redirecciones y darlo de alta en `RUTAS`.
- **Reservas**: la API contesta siempre en español; la web en inglés traduce los mensajes en el navegador con
  `lib/reservas/mensajes-en.ts`. Su prueba lee `route.ts`, `publico.ts` y `validacion.ts` y falla si un
  mensaje nuevo no tiene traducción. Las capturas de producto de AutoClinic y FacturIA están en español.
- **Páginas de error y sin conexión**: el 404 existe en cada idioma (`app/(es)/not-found.tsx` y
  `app/en/not-found.tsx`, con una ruta comodín `[...rest]` que lanza `notFound()`); `/offline` es una sola
  página en los dos idiomas a la vez, porque la sirve el service worker sin saber el idioma.

### React 19

- Hook `use()` para leer promesas y contextos.
- Formularios con `action={...}`, `useActionState`, `useFormStatus`.
- `useTransition` admite funciones async directamente.

### Reservas y admin (`/admin`, `lib/reservas`, `lib/db`, `lib/admin`)

Calendario propio de llamadas de 15 min y su panel, dentro de este mismo repo y contenedor (Easypanel,
DigitalOcean). La web pública sigue siendo estática; solo `/admin` y la futura `/api/reservas` son dinámicas.
**Este repositorio es público**: ningún secreto, contraseña ni dato real va en el código.

- **Variables** (solo en Easypanel, servicio `propus`; en local, `.env.local`): `DATABASE_URL` (URL interna de
  `propus-db`), `ADMIN_PASSWORD_HASH` y `AUTH_SECRET` (ambas con `npm run admin:password`). Sin las dos últimas
  el admin queda cerrado; sin `DATABASE_URL` el panel lo avisa. `DATABASE_POOL_MAX=1` solo en local.
- **Cada página y cada Server Action del admin empieza por `await exigirAdmin()`**
  (`lib/admin/sesion.ts`). El layout no basta: no se vuelve a ejecutar al navegar y las acciones son endpoints
  públicos. Las acciones terminan siempre en `redirect` con `?ok=…`/`?error=…` (textos en
  `lib/admin/mensajes.ts`; nunca se pinta tal cual un texto de la URL).
- **`haySesion()` lee la cookie antes que nada**: es lo que hace dinámicas las páginas del admin. Si se
  comprueba antes una variable de entorno, `next build` (sin variables) prerenderiza una redirección fija al
  login y el admin deja de funcionar en producción. Tras tocar esto, `next build` debe mostrar `ƒ` en `/admin*`.
- **Hora**: todo se guarda en UTC (`timestamptz`) y se muestra y se escribe en `Europe/Madrid`
  (`lib/reservas/huecos.ts`, que además calcula los huecos y no importa nada para poder probarse).
- **Datos personales**: las reservas se borran a los 30 días de la llamada (`purgarCaducadas` en
  `lib/reservas/repo.ts`, hoy colgada del uso del panel; falta un disparo programado). Las IP del límite de
  intentos de login solo viven en memoria.
- **Esquema**: `lib/db/migraciones.ts`; se aplica solo al primer uso. Una migración ya publicada no se edita:
  se añade otra al final.
- **Service worker** (`public/sw.js`): no cachea `/admin` ni `/api` (llevan datos de clientes). Subir `VERSION`
  si cambia la lógica de caché.
- **Correos de reserva**: al reservar, `app/api/reservas/route.ts` envía (dentro de `after()`, sin frenar la
  respuesta) la confirmación al cliente —en el idioma de su web, con el `.ics` adjunto y el enlace de Meet— y un
  aviso al equipo, con Resend (`lib/reservas/enviar.ts`; textos puros en `correo.ts`). Un fallo de correo nunca
  estropea la reserva. Variables: `RESEND_API_KEY`, `EMAIL_REMITENTE`, `EMAIL_AVISOS`, `ENLACE_VIDEOLLAMADA`
  (ver `.env.example`). Resend figura como encargado en la política de privacidad.
- **Una sola fuente de verdad para la agenda**: `calcularAgenda` (`lib/reservas/huecos.ts`, pura) da el estado
  de cada hueco (`libre`, `reservado`, `bloqueado`, `cerrado` a mano, `oculto` por el % de visibilidad, `fuera`)
  y `cargarAgenda` (`lib/reservas/agenda.ts`) la alimenta desde la base. El calendario del admin enseña todos; la
  web pública debe enseñar SOLO los `libre` y leerlos siempre de aquí, sin copias ni cachés: así lo que se cambia
  en el admin se ve al instante fuera. Excepción deliberada: los `simulado` (huecos que el admin marca a mano
  como «ocupados», tabla `huecos_cerrados` con `aparente = true`) también salen a la web, apagados y sin poder
  elegirse, como si ya tuvieran reserva; un día solo se ofrece si tiene algún hueco `libre`. El % se aplica por día sobre todos los huecos teóricos del día y con una
  semilla fija, de modo que lo oculto no se mueve al recargar ni cuando alguien reserva.
- **Ajustes y horario son UN formulario** (`FormularioAgenda`, un solo «Guardar cambios», acción
  `guardarAgendaAccion`). Motivo: tras cada redirect con `?ok=`/`?error=` Next vuelve a montar la página y se
  pierden los cambios sin guardar de cualquier otro formulario de la misma pantalla. Mismo motivo para que el
  botón se desactive con horas mal escritas, en vez de depender del error del servidor.
- Los selectores, el popover y el interruptor de `components/ui` (`select`, `popover`, `switch`) están hechos a
  mano con el patrón de shadcn: la CLI de shadcn intentó instalar un paquete ajeno (`cn`) y se cortó. Revisar
  lo que pida instalar antes de aceptarlo.
- **Pruebas**: `npm test` (`node --test`, archivos `*.test.mjs`; lo que prueban no importa nada de Next).
  Base local sin Docker: `npm run db:dev` (puerto 5433) y `.env.local` con `DATABASE_URL`/`DATABASE_POOL_MAX`.

---

## Estructura de archivos

```
app/
  globals.css                         # TailwindCSS v4 + tema + shadcn base
  (es)/                               # Español, en la raíz (layout raíz propio)
    page.tsx, not-found.tsx           # Portada y 404
    servicios/<nombre>/               # autoclinic, facturia, ruralprop, diseno-web-a-medida
    blog/  sobre-nosotros/  legal/    # Contenido
    reservar/  offline/               # Reserva pública de llamadas y página sin conexión
  en/                                 # Inglés, bajo /en (layout raíz propio)
    page.tsx, not-found.tsx
    services/<nombre>/  about-us/  book-a-call/
  admin/                              # Panel de reservas (dinámico, protegido con exigirAdmin)
  api/                                # reservas (huecos y reserva) y cron/purga

components/
  ui/                 # Primitivos (shadcn y piezas propias)
  pages/              # Una página completa por archivo, compartida por los dos idiomas
  sections/           # Secciones de la portada y de cada servicio (una subcarpeta por servicio)
  layout/ seo/ admin/ reservas/ pwa/

lib/
  utils.ts, site.ts, blog.ts, tema-claro.ts, privacidad-estado.ts, root-shell.tsx
  i18n/ admin/ db/ http/ reservas/    # Idiomas, sesión, Postgres, utilidades HTTP, agenda y reservas

docs/                 # Notas internas (blog, legal)
scripts/              # Utilidades: hash de contraseña, favicons, descarga de la escena Spline
public/               # Assets estáticos y service worker
```

---

## Convenciones de código

- TypeScript estricto — no uses `any`.
- `"use client"` solo cuando sea estrictamente necesario.
- Importaciones absolutas con `@/` (configurado en `tsconfig.json`).
- Clases CSS con `cn()` de `@/lib/utils` (combina `clsx` + `tailwind-merge`).
- Secciones de la landing en `components/sections/`, no en `components/ui/`.
- Sin CSS Modules ni styled-components — todo con TailwindCSS.
- Sin librerías de animación adicionales — usar `tw-animate-css` (ya incluido).

---

## Contexto del proyecto

**Propus** es una agencia especializada en:
- Desarrollo web y diseño web a medida
- Software a medida y automatización de procesos de negocio
- Agentes inteligentes (la IA es una herramienta más, no el reclamo: no se presenta como «agencia de IA»)

Servicios: AutoClinic (agente de WhatsApp y gestión para clínicas), FacturIA (facturas y movimientos
financieros), RuralProp (webs con reservas para turismo rural) y diseño web a medida.

Audiencia objetivo: pymes y clínicas (dentales, de estética, podología) que quieren delegar la web, la
agenda y las tareas repetitivas.
Tono de la web: claro, cercano y fiable, sin jerga técnica innecesaria.

---

## Comandos útiles

```bash
npm run dev                    # Servidor de desarrollo (Turbopack)
npm run build                  # Build de producción
npm run lint                   # ESLint
npm test                       # Pruebas unitarias (huecos, validación, login)
npm run db:dev                 # Postgres embebido para desarrollo (puerto 5433)
npm run admin:password         # Genera ADMIN_PASSWORD_HASH y AUTH_SECRET
npx shadcn add <componente>    # Agregar componente shadcn
```
