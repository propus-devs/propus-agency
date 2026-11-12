import { timingSafeEqual } from "node:crypto"
import { hayBaseDeDatos } from "@/lib/db"
import { purgarCaducadas } from "@/lib/reservas/repo"

export const dynamic = "force-dynamic"

/**
 * POST /api/cron/purga — borra los datos que ya han cumplido su plazo (reservas
 * 30 días después de la llamada y bloqueos/huecos antiguos). Pensada para que un
 * programador de tareas (cron de Easypanel o similar) la llame una vez al día:
 *
 *   curl -fsS -X POST -H "Authorization: Bearer $CRON_SECRET" https://propus.es/api/cron/purga
 *
 * Exige CRON_SECRET (24 caracteres o más). Sin él, la ruta responde 404: no hay
 * contraseña por defecto. Además, el borrado se dispara solo con el uso normal
 * del admin y de la web (como mucho una vez por hora); esta ruta lo garantiza
 * aunque no entre nadie.
 */
export async function POST(request: Request) {
  const secreto = process.env.CRON_SECRET
  if (!secreto || secreto.length < 24) return new Response(null, { status: 404 })

  const esperado = Buffer.from(`Bearer ${secreto}`)
  const recibido = Buffer.from(request.headers.get("authorization") ?? "")
  if (esperado.length !== recibido.length || !timingSafeEqual(esperado, recibido)) {
    return new Response(null, { status: 401 })
  }
  if (!hayBaseDeDatos()) return Response.json({ error: "sin-base-de-datos" }, { status: 503 })

  try {
    return Response.json({ ok: true, ...(await purgarCaducadas()) }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("[cron] no se pudo purgar:", error)
    return Response.json({ ok: false }, { status: 500 })
  }
}
