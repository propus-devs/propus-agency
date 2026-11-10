import { CalendarX2Icon, CalendarOffIcon, HelpCircleIcon, TrendingDownIcon } from "lucide-react"

const problems = [
  {
    icon: CalendarX2Icon,
    title: "Escriben a las 21h y no hay nadie",
    body: "El paciente quiere reservar fuera de horario. Como no recibe respuesta, busca otra clínica. La cita se pierde antes de entrar en la agenda.",
  },
  {
    icon: CalendarOffIcon,
    title: "Huecos vacíos que nadie rellena",
    body: "Sin recordatorio, los pacientes olvidan su cita o cancelan en el último momento. El hueco se queda vacío y no hay forma de cubrirlo a tiempo.",
  },
  {
    icon: HelpCircleIcon,
    title: "Las mismas preguntas, una y otra vez",
    body: "¿Cuánto cuesta una limpieza? ¿Quién lleva ortodoncia? Tu equipo dedica minutos a responder dudas básicas que deberían resolverse solas.",
  },
  {
    icon: TrendingDownIcon,
    title: "Respuestas lentas que generan desconfianza",
    body: "Un nuevo paciente que espera horas para recibir información básica ya no es un nuevo paciente. La velocidad de respuesta es la primera impresión.",
  },
]

export default function WhaProblem() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            Citas que se pierden antes de{" "}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              llegar al calendario
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">
            La disponibilidad de tu clínica tiene horario. La de tus pacientes potenciales, no.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-wha-card/60 px-6 py-6 backdrop-blur-sm transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:border-wha/25 hover:bg-wha-card hover:shadow-lg hover:shadow-wha/10 motion-reduce:hover:translate-y-0"
              >
                <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 transition-colors duration-200 group-hover:bg-rose-500/25">
                  <Icon className="size-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-wha-fg">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-wha-muted">{p.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
