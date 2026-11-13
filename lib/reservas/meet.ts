/**
 * Enlace de Google Meet único para cada reserva, creando un evento en el Google
 * Calendar de Propus con videollamada (Google Workspace). No añade dependencias:
 * firma el JWT de la cuenta de servicio con `node:crypto` y habla con la API por
 * `fetch`. Recibe `fetch` para poder probarse sin red.
 *
 * Configuración (variables de entorno, solo en Easypanel):
 *  - GOOGLE_CUENTA_SERVICIO: el JSON de la clave de una cuenta de servicio con
 *    delegación en todo el dominio (en crudo o en base64).
 *  - GOOGLE_CALENDAR_USUARIO: el usuario de Workspace en cuyo calendario se
 *    crean los eventos (p. ej. team@propus.es).
 *
 * Nunca lanza: si algo falla devuelve null y quien llama usa el enlace fijo.
 * El evento solo lleva el nombre de quien reserva, en el calendario de Propus;
 * no se invita a nadie ni se manda ningún correo desde Google.
 */
import { createSign, randomUUID } from "node:crypto"

type Fetch = typeof fetch

type CuentaServicio = { client_email: string; private_key: string }

const ALCANCE = "https://www.googleapis.com/auth/calendar.events"
const URL_TOKEN = "https://oauth2.googleapis.com/token"
const ESPERA_MS = 8_000

function base64url(dato: string | Buffer): string {
  return Buffer.from(dato).toString("base64url")
}

/** Lee la clave de la cuenta de servicio: JSON en crudo o en base64. null si no es válida. */
export function leerCuentaServicio(valor: string | undefined): CuentaServicio | null {
  if (!valor) return null
  const texto = valor.trim()
  const candidatos = [texto, (() => { try { return Buffer.from(texto, "base64").toString("utf8") } catch { return "" } })()]
  for (const c of candidatos) {
    try {
      const j = JSON.parse(c) as Partial<CuentaServicio>
      if (typeof j.client_email === "string" && typeof j.private_key === "string" && j.private_key.includes("PRIVATE KEY")) {
        return { client_email: j.client_email, private_key: j.private_key }
      }
    } catch {
      // probar el siguiente formato
    }
  }
  return null
}

/** JWT (RS256) con el que la cuenta de servicio pide un token haciéndose pasar por `usuario`. */
export function firmarJwt(cuenta: CuentaServicio, usuario: string, ahoraS: number): string {
  const cabecera = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const cuerpo = base64url(
    JSON.stringify({
      iss: cuenta.client_email,
      sub: usuario,
      scope: ALCANCE,
      aud: URL_TOKEN,
      iat: ahoraS,
      exp: ahoraS + 3600,
    })
  )
  const firma = createSign("RSA-SHA256").update(`${cabecera}.${cuerpo}`).sign(cuenta.private_key)
  return `${cabecera}.${cuerpo}.${base64url(firma)}`
}

/**
 * El motivo que da Google cuando rechaza algo (p. ej. «unauthorized_client» o
 * «accessNotConfigured»), para saber qué arreglar. Son códigos y frases de Google,
 * sin datos de nadie.
 */
async function motivoDeGoogle(respuesta: Response): Promise<string> {
  try {
    const j = (await respuesta.json()) as {
      error?: string | { message?: string; errors?: { reason?: string }[] }
      error_description?: string
    }
    if (typeof j.error === "string") return `${j.error}${j.error_description ? ` — ${j.error_description}` : ""}`
    const razon = j.error?.errors?.[0]?.reason
    return [razon, j.error?.message].filter(Boolean).join(" — ")
  } catch {
    return ""
  }
}

type Reunion = { inicio: Date; fin: Date; nombre: string; descripcion: string }

/**
 * Crea el evento con Meet y devuelve su enlace (https), o null si no está
 * configurado o algo falla.
 */
export async function crearMeet(
  reunion: Reunion,
  entorno: { cuenta?: string; usuario?: string; calendario?: string } = {
    cuenta: process.env.GOOGLE_CUENTA_SERVICIO,
    usuario: process.env.GOOGLE_CALENDAR_USUARIO,
    calendario: process.env.GOOGLE_CALENDAR_ID,
  },
  peticion: Fetch = fetch,
  ahora: Date = new Date()
): Promise<string | null> {
  const cuenta = leerCuentaServicio(entorno.cuenta)
  const usuario = entorno.usuario?.trim()
  if (!cuenta || !usuario) {
    const motivo = !entorno.cuenta
      ? "falta GOOGLE_CUENTA_SERVICIO"
      : !cuenta
        ? "GOOGLE_CUENTA_SERVICIO no es un JSON válido (ni en crudo ni en base64)"
        : "falta GOOGLE_CALENDAR_USUARIO"
    console.warn(`[meet] sin configurar, se usa el enlace fijo: ${motivo}`)
    return null
  }

  try {
    // 1) Token de acceso, haciéndose pasar por el usuario de Workspace.
    const jwt = firmarJwt(cuenta, usuario, Math.floor(ahora.getTime() / 1000))
    const rToken = await peticion(URL_TOKEN, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
      signal: AbortSignal.timeout(ESPERA_MS),
    })
    if (!rToken.ok) {
      console.error(`[meet] Google rechazó el token: HTTP ${rToken.status} ${await motivoDeGoogle(rToken)}`)
      return null
    }
    const { access_token: token } = (await rToken.json()) as { access_token?: string }
    if (!token) return null

    // 2) Evento con videollamada. sendUpdates=none: Google no manda ningún correo.
    const calendario = encodeURIComponent(entorno.calendario?.trim() || "primary")
    const rEvento = await peticion(
      `https://www.googleapis.com/calendar/v3/calendars/${calendario}/events?conferenceDataVersion=1&sendUpdates=none`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: `Llamada Propus · ${reunion.nombre}`,
          description: reunion.descripcion,
          start: { dateTime: reunion.inicio.toISOString(), timeZone: "Europe/Madrid" },
          end: { dateTime: reunion.fin.toISOString(), timeZone: "Europe/Madrid" },
          conferenceData: {
            createRequest: { requestId: randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } },
          },
        }),
        signal: AbortSignal.timeout(ESPERA_MS),
      }
    )
    if (!rEvento.ok) {
      console.error(`[meet] Google Calendar rechazó el evento: HTTP ${rEvento.status} ${await motivoDeGoogle(rEvento)}`)
      return null
    }
    const evento = (await rEvento.json()) as {
      hangoutLink?: string
      conferenceData?: { entryPoints?: { entryPointType?: string; uri?: string }[] }
    }
    const enlace =
      evento.hangoutLink ?? evento.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri
    return enlace && enlace.startsWith("https://") ? enlace : null
  } catch (error) {
    console.error("[meet] no se pudo crear la videollamada:", error instanceof Error ? error.name : "error")
    return null
  }
}
