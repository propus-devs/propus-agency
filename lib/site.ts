/**
 * URL pública del sitio, sin barra final. Fuente única para metadataBase,
 * sitemap, robots y JSON-LD. NEXT_PUBLIC_SITE_URL solo hace falta en un
 * entorno distinto (preview, staging): en producción vale el valor por defecto.
 * Las páginas son estáticas, así que cambiarla exige reconstruir la imagen.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://propus.es"
).replace(/\/+$/, "")

/**
 * Página de reserva de llamadas (propia, con el calendario de Propus). Todos los
 * botones «Agendar llamada» de la web apuntan aquí: no se usan enlaces a
 * herramientas externas de citas.
 */
export const rutaReservar = "/reservar"

/**
 * Datos de contacto públicos de Propus.
 * Fuente única para footer, páginas legales y schema.org — Meta y otras
 * plataformas verifican que el teléfono y el email coincidan en todo el sitio.
 */
export const contact = {
  email: "team@propus.es",
  emailHref: "mailto:team@propus.es",
  /** Formato E.164 para tel: y schema.org */
  phone: "+13203010131",
  phoneHref: "tel:+13203010131",
  /** Formato legible para la UI */
  phoneDisplay: "+1 (320) 301-0131",
} as const
