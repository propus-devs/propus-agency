import {
  InfoIcon,
  CalendarPlusIcon,
  CalendarMinusIcon,
  ZapIcon,
  BellRingIcon,
  LanguagesIcon,
} from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [InfoIcon, CalendarPlusIcon, CalendarMinusIcon, ZapIcon, BellRingIcon, LanguagesIcon]

interface Funcion {
  title: string
  points: [string, string, string]
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  funciones: [Funcion, Funcion, Funcion, Funcion, Funcion, Funcion]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Funcionalidades",
    titulo: ["Todo lo que hace el agente ", "sin descanso"],
    subtitulo:
      "Desde la primera pregunta hasta el recordatorio final, el agente gestiona el ciclo completo.",
    funciones: [
      {
        title: "Información completa de la clínica",
        points: [
          "Responde preguntas sobre servicios, tratamientos y precios.",
          "Presenta a cada profesional con su especialidad y disponibilidad.",
          "Facilita horarios, ubicación y cualquier FAQ definida por la clínica.",
        ],
      },
      {
        title: "Agenda citas las 24 horas",
        points: [
          "El paciente elige servicio, profesional y franja horaria.",
          "Confirmación instantánea por WhatsApp con todos los detalles.",
          "Disponible fuera de horario, fines de semana y festivos.",
        ],
      },
      {
        title: "Gestión de cancelaciones",
        points: [
          "El paciente cancela sin necesidad de llamar ni esperar.",
          "El hueco queda libre en el sistema de forma inmediata.",
          "La clínica recibe aviso para poder reaccionar a tiempo.",
        ],
      },
      {
        title: "Rellena huecos de última hora",
        points: [
          "Cuando se cancela una cita, el agente contacta a pacientes en espera.",
          "Propone el hueco disponible y lo cubre sin intervención humana.",
          "Elimina el tiempo muerto imprevisto en la agenda.",
        ],
      },
      {
        title: "Recordatorios automáticos",
        points: [
          "Aviso 24 horas antes para que el paciente no olvide su cita.",
          "Segundo recordatorio 3 horas antes como confirmación final.",
          "Reduce drásticamente las ausencias y los huecos vacíos.",
        ],
      },
      {
        title: "Multilingüístico",
        points: [
          "Detecta automáticamente el idioma del mensaje entrante.",
          "Responde íntegramente en ese idioma sin configuración.",
          "Ideal para clínicas con pacientes internacionales o turistas.",
        ],
      },
    ],
  },
  en: {
    etiqueta: "Features",
    titulo: ["Everything the agent does ", "non-stop"],
    subtitulo:
      "From the first question to the final reminder, the agent handles the whole cycle.",
    funciones: [
      {
        title: "Complete clinic information",
        points: [
          "Answers questions about services, treatments and prices.",
          "Introduces each professional with their specialty and availability.",
          "Provides opening hours, location and any FAQ defined by the clinic.",
        ],
      },
      {
        title: "Books appointments 24 hours a day",
        points: [
          "The patient chooses the service, the professional and the time slot.",
          "Instant confirmation on WhatsApp with all the details.",
          "Available outside opening hours, on weekends and on public holidays.",
        ],
      },
      {
        title: "Cancellation management",
        points: [
          "The patient cancels without having to call or wait.",
          "The slot is freed in the system immediately.",
          "The clinic is notified so it can react in time.",
        ],
      },
      {
        title: "Fills last-minute gaps",
        points: [
          "When an appointment is cancelled, the agent contacts patients on the waiting list.",
          "It offers the available slot and fills it with no human involvement.",
          "Eliminates unexpected downtime in the schedule.",
        ],
      },
      {
        title: "Automatic reminders",
        points: [
          "A notice 24 hours before so the patient doesn't forget their appointment.",
          "A second reminder 3 hours before as a final confirmation.",
          "Drastically reduces no-shows and empty slots.",
        ],
      },
      {
        title: "Multilingual",
        points: [
          "Automatically detects the language of the incoming message.",
          "Replies entirely in that language with no configuration.",
          "Ideal for clinics with international patients or tourists.",
        ],
      },
    ],
  },
}

export default function WhaFeatures({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="funcionalidades" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-wha via-wha-alt to-wha-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">{t.subtitulo}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.funciones.map((f, i) => {
            const Icon = iconos[i]
            return (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-wha-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-wha/30 hover:shadow-xl hover:shadow-wha/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-wha/12">
                  <Icon className="size-5 text-wha" />
                </div>
                <h3 className="text-base font-semibold leading-tight text-wha-fg">{f.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm leading-snug text-wha-muted">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-wha-teal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
