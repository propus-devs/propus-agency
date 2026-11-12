/**
 * Archivo .ics (iCalendar) de una reserva, para que el cliente la añada a su
 * calendario con un clic. Módulo puro: la web lo genera en el navegador y no
 * sale ningún dato del dispositivo.
 */

function formatoUtc(fecha: Date): string {
  return fecha.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
}

/** Escapa lo que el formato iCalendar trata como especial. */
function escapar(texto: string): string {
  return texto
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n")
}

/** Líneas de más de 75 octetos se parten, como pide el estándar (RFC 5545 §3.1). */
function plegar(linea: string): string {
  if (linea.length <= 73) return linea
  const trozos: string[] = []
  let resto = linea
  trozos.push(resto.slice(0, 73))
  resto = resto.slice(73)
  while (resto.length > 0) {
    trozos.push(` ${resto.slice(0, 72)}`)
    resto = resto.slice(72)
  }
  return trozos.join("\r\n")
}

export function crearIcs(args: {
  inicio: Date
  fin: Date
  resumen: string
  descripcion: string
  uid: string
  ahora: Date
}): string {
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Propus//Reservas//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapar(args.uid)}`,
    `DTSTAMP:${formatoUtc(args.ahora)}`,
    `DTSTART:${formatoUtc(args.inicio)}`,
    `DTEND:${formatoUtc(args.fin)}`,
    `SUMMARY:${escapar(args.resumen)}`,
    `DESCRIPTION:${escapar(args.descripcion)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return lineas.map(plegar).join("\r\n") + "\r\n"
}
