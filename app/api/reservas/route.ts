import { after } from "next/server"
import { hayBaseDeDatos } from "@/lib/db"
import { ipDeCabeceras } from "@/lib/http/ip"
import { origenValido } from "@/lib/http/origen"
import { crearLimitador } from "@/lib/reservas/limite"
import type { RespuestaReserva } from "@/lib/reservas/publico-tipos"
import { reservar, secretoDeFormularios } from "@/lib/reservas/publico"
import { enviarCorreosReserva } from "@/lib/reservas/enviar"
import { purgarSiToca } from "@/lib/reservas/repo"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-dynamic"

const SIN_CACHE = { "Cache-Control": "no-store" }
const MAX_BYTES = 4_000

// Una persona real reserva una o dos veces; 6 por hora y por IP deja margen de sobra.
const porIp = crearLimitador("reservar-ip", 6, 3_600_000)
// Tope general: ni en un buen día llegan 40 reservas por hora a una agencia pequeña. Frena
// a quien reparta un ataque entre muchas IP.
const general = crearLimitador("reservar-general", 40, 3_600_000)

function responder(cuerpo: RespuestaReserva, estado: number, extra: Record<string, string> = {}) {
  return Response.json(cuerpo, { status: estado, headers: { ...SIN_CACHE, ...extra } })
}

/** POST /api/reservas → crea una reserva. Cuerpo JSON: ver `leerReservaPublica`. */
export async function POST(request: Request) {
  // 1. Tiene que venir de una página de este sitio y ser JSON (un formulario ajeno no puede serlo).
  if (!origenValido(request.headers.get("origin"), request.headers.get("host"), siteUrl)) {
    return responder({ ok: false, error: "origen", mensaje: "Petición no permitida." }, 403)
  }
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return responder({ ok: false, error: "formato", mensaje: "Formato no válido." }, 415)
  }

  // 2. Límites (cada petición cuenta, también las inválidas).
  const ip = ipDeCabeceras(request.headers)
  const limiteIp = porIp.intentar(ip)
  const limiteGeneral = general.intentar("todas")
  if (!limiteIp.permitido || !limiteGeneral.permitido) {
    const espera = Math.max(limiteIp.esperaSeg, limiteGeneral.esperaSeg)
    return responder(
      { ok: false, error: "limite", mensaje: "Hay demasiadas reservas en poco tiempo. Escríbenos por correo y te buscamos hueco." },
      429,
      { "Retry-After": String(espera) }
    )
  }

  if (!hayBaseDeDatos()) {
    return responder({ ok: false, error: "no-disponible", mensaje: "Reservas no disponibles. Escríbenos por correo." }, 503)
  }

  // 3. Cuerpo pequeño y JSON válido.
  const texto = await request.text()
  if (texto.length > MAX_BYTES) {
    return responder({ ok: false, error: "datos", mensaje: "Los datos enviados son demasiado grandes." }, 413)
  }
  let cuerpo: unknown
  try {
    cuerpo = JSON.parse(texto)
  } catch {
    return responder({ ok: false, error: "datos", mensaje: "Los datos no son válidos." }, 400)
  }

  try {
    // Idioma de la web en la que se reservó: decide el idioma del correo al cliente.
    const idioma = (cuerpo as { idioma?: unknown } | null)?.idioma === "en" ? "en" : "es"
    const { estado, cuerpo: respuesta } = await reservar(cuerpo, {
      ahora: new Date(),
      secreto: secretoDeFormularios(),
      alCrear: (reserva) => after(() => enviarCorreosReserva({ ...reserva, idioma })),
    })
    after(() => purgarSiToca())
    return responder(respuesta, estado)
  } catch (error) {
    // Sin datos de la persona en el registro: solo el error.
    console.error("[reservas] error al crear una reserva:", error)
    return responder({ ok: false, error: "no-disponible", mensaje: "No hemos podido guardar la reserva. Inténtalo de nuevo en unos minutos o escríbenos." }, 500)
  }
}
