import { barajarAccion, guardarAgendaAccion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import type { Tramo } from "@/components/admin/EditorHorario"
import FormularioAgenda from "@/components/admin/FormularioAgenda"
import Pagina from "@/components/admin/Pagina"
import SinBaseDeDatos from "@/components/admin/SinBaseDeDatos"
import { exigirAdmin } from "@/lib/admin/sesion"
import { hayBaseDeDatos } from "@/lib/db"
import { minutosAHora } from "@/lib/reservas/huecos"
import { listarFranjas, obtenerAjustes } from "@/lib/reservas/repo"

/** `<input>` de hora en 24 h: un tramo que acaba a medianoche se enseña como 23:59. */
function valorHora(minutos: number): string {
  return minutosAHora(Math.min(minutos, 1439))
}

export default async function PaginaHorarios({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; dia?: string }>
}) {
  await exigirAdmin()
  const { ok, error, dia: diaConError } = await searchParams

  if (!hayBaseDeDatos()) {
    return (
      <Pagina actual="horarios" titulo="Horario y ajustes">
        <SinBaseDeDatos />
      </Pagina>
    )
  }

  const [ajustes, franjas] = await Promise.all([obtenerAjustes(), listarFranjas()])

  // Siete listas (lunes a domingo) con los tramos guardados, ya en texto "HH:MM".
  const inicial: Tramo[][] = Array.from({ length: 7 }, (_, i) =>
    franjas
      .filter((f) => f.diaSemana === i + 1)
      .map((f) => ({ ini: valorHora(f.inicioMin), fin: valorHora(f.finMin) }))
  )

  return (
    <Pagina
      actual="horarios"
      titulo="Horario y ajustes"
      descripcion="Cuándo se puede reservar y cómo. Todas las horas son de Madrid."
    >
      <Aviso ok={ok} error={error} dia={diaConError} />

      <FormularioAgenda
        ajustes={{
          duracionMin: ajustes.duracionMin,
          margenMin: ajustes.margenMin,
          antelacionHoras: ajustes.antelacionHoras,
          ventanaDias: ajustes.ventanaDias,
          visibilidadPct: ajustes.visibilidadPct,
          activo: ajustes.activo,
        }}
        inicial={inicial}
        guardar={guardarAgendaAccion}
        barajar={barajarAccion}
      />
    </Pagina>
  )
}
