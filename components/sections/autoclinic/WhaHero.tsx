import Link from "next/link"
import { ArrowRightIcon, MessageCircleIcon, CalendarCheckIcon, BellRingIcon, ZapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"

const liveActivity = [
  { icon: CalendarCheckIcon, text: "Cita confirmada · Marta R.", time: "hace 2 min", color: "text-wha-teal" },
  { icon: BellRingIcon, text: "Recordatorio enviado · 3h antes", time: "hace 5 min", color: "text-wha-alt" },
  { icon: ZapIcon, text: "Hueco de 11h rellenado", time: "hace 9 min", color: "text-wha" },
]

export default function WhaHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Columna texto */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
              <MessageCircleIcon className="size-3.5" />
              Agente recepcionista · WhatsApp
            </span>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-wha-fg md:text-5xl lg:text-6xl">
              Tu consulta nunca{" "}
              <span className="bg-linear-to-r from-wha via-wha-alt to-wha-teal bg-clip-text text-transparent">
                pierde una cita.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-wha-muted">
              Un agente de IA en WhatsApp que responde, agenda, recuerda y rellena huecos —las 24 horas,
              en el idioma de tu paciente— sin que tu equipo mueva un dedo.
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
                  Solicita una demo
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
              <Button
                variant="outline"
                size="lg"
                className="h-11 border-wha-fg/20 px-7 text-wha-fg hover:bg-wha-card"
                asChild
              >
                <Link href="#funcionalidades">Ver funcionalidades</Link>
              </Button>
            </div>
          </div>

          {/* Columna visual */}
          <div className="flex justify-center lg:justify-end">
            <AgentCard />
          </div>
        </div>
      </div>
    </section>
  )
}

function AgentCard() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative rounded-3xl border border-white/10 bg-wha-card p-8 shadow-2xl shadow-black/60">

        {/* Dot online */}
        <div className="absolute right-6 top-6 flex items-center gap-1.5">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wha-teal opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-wha-teal" />
          </span>
          <span className="text-[10px] font-medium text-wha-teal">En línea</span>
        </div>

        {/* Avatar */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-wha via-wha-alt to-wha-teal shadow-lg shadow-wha/30">
          <MessageCircleIcon className="size-10 text-white" />
        </div>
        <h3 className="text-center text-lg font-semibold text-wha-fg">Asistente IA</h3>
        <p className="mt-1 text-center text-xs text-wha-muted">Responde en menos de 5 segundos</p>

        {/* Actividad reciente */}
        <div className="mt-6 flex flex-col gap-2.5">
          {liveActivity.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.text} className="flex items-center gap-3 rounded-xl bg-white/5 px-3.5 py-2.5">
                <Icon className={`size-4 shrink-0 ${item.color}`} />
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
