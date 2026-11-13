import Link from "next/link"
import { ArrowRightIcon, MessageCircleIcon, CalendarCheckIcon, BellRingIcon, ZapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import type { Lang } from "@/lib/i18n/idiomas"

interface Actividad {
  text: string
  time: string
}

interface Textos {
  pastilla: string
  titulo: [string, string]
  descripcion: string
  demo: string
  funcionalidades: string
  enLinea: string
  asistente: string
  respuesta: string
  actividad: [Actividad, Actividad, Actividad]
}

const textos: Record<Lang, Textos> = {
  es: {
    pastilla: "Agente recepcionista · WhatsApp",
    titulo: ["Tu consulta nunca ", "pierde una cita."],
    descripcion:
      "Un agente de IA en WhatsApp que responde, agenda, recuerda y rellena huecos —las 24 horas, en el idioma de tu paciente— sin que tu equipo mueva un dedo.",
    demo: "Solicita una demo",
    funcionalidades: "Ver funcionalidades",
    enLinea: "En línea",
    asistente: "Asistente IA",
    respuesta: "Responde en menos de 5 segundos",
    actividad: [
      { text: "Cita confirmada · Marta R.", time: "hace 2 min" },
      { text: "Recordatorio enviado · 3h antes", time: "hace 5 min" },
      { text: "Hueco de 11h rellenado", time: "hace 9 min" },
    ],
  },
  en: {
    pastilla: "Receptionist agent · WhatsApp",
    titulo: ["Your clinic never ", "loses an appointment."],
    descripcion:
      "An AI agent on WhatsApp that answers, books, reminds and fills gaps — 24 hours a day, in your patient's language — without your team lifting a finger.",
    demo: "Request a demo",
    funcionalidades: "See features",
    enLinea: "Online",
    asistente: "AI assistant",
    respuesta: "Replies in under 5 seconds",
    actividad: [
      { text: "Appointment confirmed · Marta R.", time: "2 min ago" },
      { text: "Reminder sent · 3h before", time: "5 min ago" },
      { text: "11:00 slot filled", time: "9 min ago" },
    ],
  },
}

const iconosActividad = [
  { icon: CalendarCheckIcon, color: "text-wha-teal" },
  { icon: BellRingIcon, color: "text-wha-alt" },
  { icon: ZapIcon, color: "text-wha" },
]

export default function WhaHero({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Columna texto */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
              <MessageCircleIcon className="size-3.5" />
              {t.pastilla}
            </span>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-wha-fg md:text-5xl lg:text-6xl">
              {t.titulo[0]}
              <span className="bg-linear-to-r from-wha via-wha-alt to-wha-teal bg-clip-text text-transparent">
                {t.titulo[1]}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-wha-muted">
              {t.descripcion}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {/* `flat` = modo seguro, como el resto de CTA con fondo en degradado. */}
              <TiltCtaButton
                tone="wha"
                flat
                size="lg"
                className="h-11 gap-2 bg-linear-to-r from-wha via-wha-alt to-wha-teal px-7 font-semibold text-white hover:opacity-90 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
                asChild
              >
                <Link href="#demo">
                  {t.demo}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
              <Button
                variant="outline"
                size="lg"
                className="h-11 border-wha-fg/20 px-7 text-wha-fg hover:bg-wha-card"
                asChild
              >
                <Link href="#funcionalidades">{t.funcionalidades}</Link>
              </Button>
            </div>
          </div>

          {/* Columna visual */}
          <div className="flex justify-center lg:justify-end">
            <AgentCard t={t} />
          </div>
        </div>
      </div>
    </section>
  )
}

function AgentCard({ t }: { t: Textos }) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative rounded-3xl border border-white/10 bg-wha-card p-8 shadow-2xl shadow-black/60">

        {/* Dot online */}
        <div className="absolute right-6 top-6 flex items-center gap-1.5">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wha-teal opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-wha-teal" />
          </span>
          <span className="text-[10px] font-medium text-wha-teal">{t.enLinea}</span>
        </div>

        {/* Avatar */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-wha via-wha-alt to-wha-teal shadow-lg shadow-wha/30">
          <MessageCircleIcon className="size-10 text-white" />
        </div>
        <h3 className="text-center text-lg font-semibold text-wha-fg">{t.asistente}</h3>
        <p className="mt-1 text-center text-xs text-wha-muted">{t.respuesta}</p>

        {/* Actividad reciente */}
        <div className="mt-6 flex flex-col gap-2.5">
          {t.actividad.map((item, i) => {
            const Icon = iconosActividad[i].icon
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 px-3.5 py-2.5">
                <Icon className={`size-4 shrink-0 ${iconosActividad[i].color}`} />
                <span className="flex-1 text-xs text-wha-fg">{item.text}</span>
                <span className="text-[10px] text-wha-muted">{item.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
