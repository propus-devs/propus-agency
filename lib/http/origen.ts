/**
 * Comprobación de origen para los POST de la API pública: la petición tiene que
 * venir de una página de este mismo sitio. Los navegadores mandan siempre la
 * cabecera `Origin` en un POST con JSON, así que una web ajena que intente
 * reservar por su cuenta (o un formulario pegado en otro dominio) queda fuera.
 * No frena a quien monte la petición a mano; para eso están el ticket y los límites.
 */
export function origenValido(
  origin: string | null,
  host: string | null,
  urlDelSitio: string
): boolean {
  if (!origin) return false
  let hostDelOrigen: string
  try {
    hostDelOrigen = new URL(origin).host
  } catch {
    return false
  }
  const permitidos = new Set<string>()
  if (host) permitidos.add(host)
  try {
    permitidos.add(new URL(urlDelSitio).host)
  } catch {
    /* sin URL del sitio válida: solo vale el host de la petición */
  }
  return permitidos.has(hostDelOrigen)
}
