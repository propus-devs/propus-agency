/**
 * Correos de una reserva: la confirmación al cliente (en el idioma de la web en
 * la que reservó, con el evento para su calendario adjunto) y el aviso al
 * equipo (siempre en español). Módulo puro: solo construye los textos; el envío
 * está en enviar.ts. Importa con extensión `.ts` para poder probarse con
 * `node --test`.
 */
import { nombreDiaLargo } from "./calendario.ts"
import { claveDiaMadrid, formatearHora } from "./huecos.ts"
import { crearIcs } from "./ics.ts"

export type IdiomaCorreo = "es" | "en"

export type DatosCorreo = {
  inicio: Date
  fin: Date
  nombre: string
  email: string
  telefono: string | null
  mensaje: string | null
  /** Idioma de la web en la que se reservó. */
  idioma: IdiomaCorreo
  /** Enlace de la videollamada (solo https). Sin él, se dice que se contactará a la hora acordada. */
  enlaceVideollamada: string | null
  /** Correo de contacto de Propus, al que responde el cliente. */
  contactoEmail: string
  /** URL del calendario del admin con el día de la reserva. */
  urlAdmin: string
  ahora: Date
  /** Identificador estable del evento (uid del .ics). */
  uid: string
}

export type Correo = {
  asunto: string
  html: string
  texto: string
  adjuntos: { nombre: string; contenido: string }[]
}

/** Escapa lo que se mete en el HTML: nombre y mensaje los escribe el visitante. */
export function esc(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Solo se enlazan URLs https bien formadas. */
export function enlaceSeguro(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const u = new URL(url.trim())
    return u.protocol === "https:" ? u.toString() : null
  } catch {
    return null
  }
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

const TEXTOS = {
  es: {
    asunto: (dia: string, hora: string) => `Llamada confirmada · ${dia}, ${hora}`,
    saludo: (nombre: string) => `Hola ${nombre},`,
    confirmada: (min: number) => `Tu llamada de ${min} minutos con Propus está confirmada.`,
    horaMadrid: "hora de Madrid",
    unirme: "Unirme a la videollamada",
    enlaceTexto: "Enlace de la videollamada:",
    sinEnlace: (telefono: string | null) =>
      telefono
        ? `Nos pondremos en contacto contigo a la hora acordada, en el ${telefono}.`
        : "Nos pondremos en contacto contigo a la hora acordada con los datos que nos dejaste.",
    cambiar: (correo: string) =>
      `¿Necesitas cambiar la hora o cancelar? Responde a este correo o escríbenos a ${correo}.`,
    adjunto: "Te adjuntamos el evento para que lo añadas a tu calendario.",
    pie: "Tus datos sólo se usan para gestionar esta llamada y se borran 30 días después. Propus, una marca de Iberium Group LLC.",
    resumenIcs: "Llamada con Propus",
    descripcionIcs: (min: number, correo: string) =>
      `Llamada de ${min} minutos con Propus (propus.es). Si necesitas cambiarla, escríbenos a ${correo}.`,
  },
  en: {
    asunto: (dia: string, hora: string) => `Call confirmed · ${dia}, ${hora}`,
    saludo: (nombre: string) => `Hi ${nombre},`,
    confirmada: (min: number) => `Your ${min}-minute call with Propus is confirmed.`,
    horaMadrid: "Madrid time",
    unirme: "Join the video call",
    enlaceTexto: "Video call link:",
    sinEnlace: (telefono: string | null) =>
      telefono
        ? `We will get in touch with you at the agreed time, on ${telefono}.`
        : "We will get in touch with you at the agreed time using the details you left us.",
    cambiar: (correo: string) =>
      `Need to change the time or cancel? Reply to this email or write to us at ${correo}.`,
    adjunto: "We have attached the event so you can add it to your calendar.",
    pie: "Your details are only used to manage this call and are deleted 30 days later. Propus, a brand of Iberium Group LLC.",
    resumenIcs: "Call with Propus",
    descripcionIcs: (min: number, correo: string) =>
      `${min}-minute call with Propus (propus.es). If you need to change it, email us at ${correo}.`,
  },
} as const

/** Marco común del HTML: estilos en línea y ancho estrecho, que es lo que aguantan los clientes de correo. */
function marco(contenido: string, pie: string): string {
  return `<!doctype html>
<html><body style="margin:0;padding:24px 12px;background:#edf3f5;font-family:Arial,Helvetica,sans-serif;color:#0f2230;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;padding:28px;">
<tr><td>
<p style="margin:0 0 20px;font-size:18px;font-weight:700;letter-spacing:1px;color:#0f766e;">PROPUS</p>
${contenido}
</td></tr></table>
<p style="max-width:520px;margin:16px 0 0;font-size:12px;line-height:1.5;color:#5b6b78;">${esc(pie)}</p>
</td></tr></table>
</body></html>`
}

function boton(url: string, texto: string): string {
  return `<p style="margin:20px 0;"><a href="${esc(url)}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px;">${esc(texto)}</a></p>`
}

function tarjeta(lineaDia: string, lineaHora: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:#f3f8f8;border:1px solid #cfe3e3;border-radius:12px;"><tr><td style="padding:16px;">
<p style="margin:0;font-size:16px;font-weight:700;">${esc(lineaDia)}</p>
<p style="margin:4px 0 0;font-size:15px;">${esc(lineaHora)}</p>
</td></tr></table>`
}

/** Correo de confirmación para el cliente y aviso para el equipo. */
export function construirCorreos(d: DatosCorreo): { cliente: Correo; aviso: Correo } {
  const t = TEXTOS[d.idioma]
  const minutos = Math.round((d.fin.getTime() - d.inicio.getTime()) / 60_000)
  const horaIni = formatearHora(d.inicio)
  const horaFin = formatearHora(d.fin)
  const rango = `${horaIni} – ${horaFin} (${t.horaMadrid})`
  const diaClave = claveDiaMadrid(d.inicio)
  const dia = capitalizar(nombreDiaLargo(diaClave, d.idioma))
  const enlace = enlaceSeguro(d.enlaceVideollamada)

  const ics = crearIcs({
    inicio: d.inicio,
    fin: d.fin,
    resumen: t.resumenIcs,
    descripcion: enlace
      ? `${t.descripcionIcs(minutos, d.contactoEmail)} ${t.enlaceTexto} ${enlace}`
      : t.descripcionIcs(minutos, d.contactoEmail),
    lugar: enlace ?? undefined,
    uid: d.uid,
    ahora: d.ahora,
  })

  const cuerpoCliente = [
    `<p style="margin:0 0 12px;font-size:16px;">${esc(t.saludo(d.nombre))}</p>`,
    `<p style="margin:0;font-size:16px;line-height:1.5;">${esc(t.confirmada(minutos))}</p>`,
    tarjeta(dia, rango),
    enlace
      ? boton(enlace, t.unirme) +
        `<p style="margin:0 0 12px;font-size:13px;color:#5b6b78;word-break:break-all;">${esc(t.enlaceTexto)} ${esc(enlace)}</p>`
      : `<p style="margin:0 0 12px;font-size:15px;line-height:1.5;">${esc(t.sinEnlace(d.telefono))}</p>`,
    `<p style="margin:0 0 12px;font-size:14px;line-height:1.5;">${esc(t.adjunto)}</p>`,
    `<p style="margin:0;font-size:14px;line-height:1.5;">${esc(t.cambiar(d.contactoEmail))}</p>`,
  ].join("\n")

  const textoCliente = [
    t.saludo(d.nombre),
    "",
    t.confirmada(minutos),
    `${dia}`,
    rango,
    "",
    enlace ? `${t.enlaceTexto} ${enlace}` : t.sinEnlace(d.telefono),
    "",
    t.adjunto,
    t.cambiar(d.contactoEmail),
    "",
    t.pie,
  ].join("\n")

  const cliente: Correo = {
    asunto: t.asunto(dia, horaIni),
    html: marco(cuerpoCliente, t.pie),
    texto: textoCliente,
    adjuntos: [{ nombre: d.idioma === "en" ? "propus-call.ics" : "llamada-propus.ics", contenido: ics }],
  }

  // Aviso interno: siempre en español.
  const diaEs = capitalizar(nombreDiaLargo(diaClave, "es"))
  const filas: [string, string][] = [
    ["Nombre", d.nombre],
    ["Correo", d.email],
    ["Teléfono", d.telefono ?? "—"],
    ["Mensaje", d.mensaje ?? "—"],
    ["Web en", d.idioma === "en" ? "inglés" : "español"],
  ]
  const tabla = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0;font-size:14px;">${filas
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5b6b78;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap;">${esc(v)}</td></tr>`
    )
    .join("")}</table>`
  const rangoEs = `${horaIni} – ${horaFin} (hora de Madrid)`
  const aviso: Correo = {
    asunto: `Nueva reserva · ${d.nombre} · ${diaEs}, ${horaIni}`,
    html: marco(
      `<p style="margin:0;font-size:16px;font-weight:700;">Nueva reserva de llamada</p>${tarjeta(diaEs, rangoEs)}${tabla}${boton(d.urlAdmin, "Abrir en el calendario del admin")}`,
      "Aviso interno de Propus."
    ),
    texto: [
      "Nueva reserva de llamada",
      `${diaEs}, ${rangoEs}`,
      ...filas.map(([k, v]) => `${k}: ${v}`),
      "",
      `Calendario del admin: ${d.urlAdmin}`,
    ].join("\n"),
    adjuntos: [],
  }

  return { cliente, aviso }
}
