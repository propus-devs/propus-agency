/**
 * IP del visitante a partir de las cabeceras de la petición. Detrás del proxy
 * de Easypanel se usa el ÚLTIMO valor de X-Forwarded-For, que es el que añade
 * nuestro proxy; los anteriores los puede escribir el propio visitante.
 *
 * La IP solo sirve para limitar abusos y solo vive en memoria: no se guarda en
 * la base de datos ni en registros (la política de privacidad lo declara así).
 */
export function ipDeCabeceras(cabeceras: { get(nombre: string): string | null }): string {
  const reenviadas = cabeceras.get("x-forwarded-for")
  if (reenviadas) {
    const ultima = reenviadas.split(",").at(-1)?.trim()
    if (ultima) return ultima
  }
  return cabeceras.get("x-real-ip")?.trim() || "desconocida"
}
