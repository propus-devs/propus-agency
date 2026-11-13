import { CalendarX2Icon, CalendarOffIcon, HelpCircleIcon, TrendingDownIcon } from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [CalendarX2Icon, CalendarOffIcon, HelpCircleIcon, TrendingDownIcon]

interface Problema {
  title: string
  body: string
}

interface Textos {
  titulo: [string, string]
  subtitulo: string
  problemas: [Problema, Problema, Problema, Problema]
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["Citas que se pierden antes de ", "llegar al calendario"],
    subtitulo: "La disponibilidad de tu clínica tiene horario. La de tus pacientes potenciales, no.",
    problemas: [
      {
        title: "Escriben a las 21h y no hay nadie",
        body: "El paciente quiere reservar fuera de horario. Como no recibe respuesta, busca otra clínica. La cita se pierde antes de entrar en la agenda.",
      },
      {
        title: "Huecos vacíos que nadie rellena",
        body: "Sin recordatorio, los pacientes olvidan su cita o cancelan en el último momento. El hueco se queda vacío y no hay forma de cubrirlo a tiempo.",
      },
      {
        title: "Las mismas preguntas, una y otra vez",
        body: "¿Cuánto cuesta una limpieza? ¿Quién lleva ortodoncia? Tu equipo dedica minutos a responder dudas básicas que deberían resolverse solas.",
      },
      {
        title: "Respuestas lentas que generan desconfianza",
        body: "Un nuevo paciente que espera horas para recibir información básica ya no es un nuevo paciente. La velocidad de respuesta es la primera impresión.",
      },
    ],
  },
  en: {
    titulo: ["Appointments that get lost before ", "reaching the calendar"],
    subtitulo: "Your clinic's availability has opening hours. Your potential patients' doesn't.",
    problemas: [
      {
        title: "They write at 9 pm and nobody is there",
        body: "The patient wants to book outside opening hours. With no reply, they look for another clinic. The appointment is lost before it ever reaches the schedule.",
      },
      {
        title: "Empty slots that nobody fills",
        body: "Without a reminder, patients forget their appointment or cancel at the last minute. The slot stays empty and there is no way to cover it in time.",
      },
      {
        title: "The same questions, over and over",
        body: "How much does a cleaning cost? Who handles orthodontics? Your team spends minutes answering basic questions that should answer themselves.",
      },
      {
        title: "Slow replies that breed distrust",
        body: "A new patient who waits hours for basic information is no longer a new patient. Response speed is the first impression.",
      },
    ],
  },
}

export default function WhaProblem({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">{t.subtitulo}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {t.problemas.map((p, i) => {
            const Icon = iconos[i]
            return (
              <div
                key={i}
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
