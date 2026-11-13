import "server-only"
import { claveDiaMadrid } from "./huecos"
import { construirCorreos, type Correo, type IdiomaCorreo } from "./correo"
import { contact, siteUrl } from "@/lib/site"

/**
 * Envío de los correos de una reserva con Resend (https://resend.com).
 *
 * Variables de entorno (solo en Easypanel; ver .env.example):
 *  - RESEND_API_KEY: sin ella no se envía nada (la reserva funciona igual).
 *  - EMAIL_REMITENTE: "Propus <team@propus.es>" por defecto; el dominio tiene que estar verificado en Resend.
 *  - EMAIL_AVISOS: a dónde va el aviso de cada reserva; por defecto, el correo de contacto.
 *  - ENLACE_VIDEOLLAMADA: enlace https de la sala de Meet. Sin él, el correo dice que se contactará a la hora acordada.
 *
 * Nunca lanza: un fallo de correo no puede estropear una reserva ya guardada. Los
 * registros no llevan datos de la persona, solo el resultado.
 */

type Reserva = {
  inicio: Date
  fin: Date
  nombre: string
  email: string
  telefono: string | null
  mensaje: string | null
  idioma: IdiomaCorreo
}

async function enviarUno(
  clave: string,
  remitente: string,
  para: string,
  responderA: string,
  correo: Correo,
  etiqueta: string
): Promise<void> {
  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: remitente,
        to: [para],
        reply_to: responderA,
        subject: correo.asunto,
        html: correo.html,
        text: correo.texto,
        attachments: correo.adjuntos.map((a) => ({
          filename: a.nombre,
          content: Buffer.from(a.contenido, "utf8").toString("base64"),
        })),
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!respuesta.ok) {
      console.error(`[correo] Resend rechazó el correo "${etiqueta}": HTTP ${respuesta.status}`)
    }
  } catch (error) {
    console.error(`[correo] no se pudo enviar el correo "${etiqueta}":`, error instanceof Error ? error.name : "error")
  }
}

/** Confirmación al cliente y aviso al equipo. Pensado para llamarse dentro de `after()`. */
export async function enviarCorreosReserva(reserva: Reserva): Promise<void> {
  const clave = process.env.RESEND_API_KEY
  if (!clave) {
    console.warn("[correo] RESEND_API_KEY no está definida: no se envían correos de reserva")
    return
  }
  const remitente = process.env.EMAIL_REMITENTE || `Propus <${contact.email}>`
  const avisos = process.env.EMAIL_AVISOS || contact.email
  const ahora = new Date()
  const dia = claveDiaMadrid(reserva.inicio)

  const { cliente, aviso } = construirCorreos({
    ...reserva,
    enlaceVideollamada: process.env.ENLACE_VIDEOLLAMADA || null,
    contactoEmail: contact.email,
    urlAdmin: `${siteUrl}/admin/calendario?mes=${dia.slice(0, 7)}&dia=${dia}`,
    ahora,
    uid: `${crypto.randomUUID()}@propus.es`,
  })

  await Promise.all([
    enviarUno(clave, remitente, reserva.email, contact.email, cliente, "confirmación"),
    enviarUno(clave, remitente, avisos, reserva.email, aviso, "aviso"),
  ])
}
