import { after } from "next/server"
import { hayBaseDeDatos } from "@/lib/db"
import { ipDeCabeceras } from "@/lib/http/ip"
import { cargarMes } from "@/lib/reservas/publico"
import { crearLimitador } from "@/lib/reservas/limite"
import { purgarSiToca } from "@/lib/reservas/repo"

// Siempre calculado al momento: lo que se cambia en el admin se ve en la siguiente petición.
export const dynamic = "force-dynamic"

const SIN_CACHE = { "Cache-Control": "no-store" }

// Generoso para una persona que navega de mes en mes; frena a quien machaca la ruta.
const limite = crearLimitador("huecos-ip", 120, 10 * 60_000)

/** GET /api/reservas/huecos?mes=AAAA-MM → huecos libres de ese mes. */
export async function GET(request: Request) {
  const permitido = limite.intentar(ipDeCabeceras(request.headers))
  if (!permitido.permitido) {
    return Response.json(
      { error: "limite", mensaje: "Demasiadas peticiones. Espera un momento." },
      { status: 429, headers: { ...SIN_CACHE, "Retry-After": String(permitido.esperaSeg) } }
    )
  }
  if (!hayBaseDeDatos()) {
    return Response.json({ error: "no-disponible", mensaje: "Reservas no disponibles." }, { status: 503, headers: SIN_CACHE })
  }

  try {
    const mes = new URL(request.url).searchParams.get("mes") ?? undefined
    const datos = await cargarMes(mes)
    // El borrado de datos caducados aprovecha el tráfico normal (como mucho una vez por hora).
    after(() => purgarSiToca())
    return Response.json(datos, { headers: SIN_CACHE })
  } catch (error) {
    console.error("[reservas] no se pudieron cargar los huecos:", error)
    return Response.json({ error: "no-disponible", mensaje: "Reservas no disponibles." }, { status: 503, headers: SIN_CACHE })
  }
}
