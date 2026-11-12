/** Aviso cuando la web no tiene configurada la base de datos (DATABASE_URL). */
export default function SinBaseDeDatos() {
  return (
    <p
      role="alert"
      className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      Falta la variable de entorno <strong>DATABASE_URL</strong>: sin ella no hay dónde guardar
      reservas ni horarios. Añádela en Easypanel (servicio propus → Entorno) y vuelve a desplegar.
    </p>
  )
}
