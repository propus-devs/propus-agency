import { SearchIcon, PenToolIcon, RocketIcon } from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [SearchIcon, PenToolIcon, RocketIcon]

interface Paso {
  title: string
  badge: string
  description: string
}

interface Textos {
  titulo: [string, string]
  subtitulo: string
  pasos: [Paso, Paso, Paso]
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["Cómo ", "trabajamos"],
    subtitulo:
      "Sin reuniones interminables ni lenguaje técnico. Tres pasos claros para pasar de hacerlo todo a mano a tenerlo automatizado en semanas.",
    pasos: [
      {
        title: "Entendemos tu negocio",
        badge: "15 minutos · sin tecnicismos",
        description:
          "Nos cuentas cómo trabajas hoy y dónde pierdes más tiempo. Detectamos juntos qué tareas se pueden automatizar para que notes el impacto desde el primer mes.",
      },
      {
        title: "Diseñamos tu solución",
        badge: "Tú no tocas nada técnico",
        description:
          "Nos encargamos de toda la parte técnica: elegimos las herramientas, montamos los flujos y lo conectamos con lo que ya usas. Tú solo validas que encaja con tu día a día.",
      },
      {
        title: "Lo ponemos en marcha",
        badge: "En producción en 2-4 semanas",
        description:
          "Lanzamos, medimos resultados reales y seguimos afinando. Te acompañamos para que la solución crezca contigo y siga ahorrándote tiempo y dinero.",
      },
    ],
  },
  en: {
    titulo: ["How we ", "work"],
    subtitulo:
      "No endless meetings or technical jargon. Three clear steps to go from doing everything by hand to having it automated within weeks.",
    pasos: [
      {
        title: "We get to know your business",
        badge: "15 minutes · no jargon",
        description:
          "You tell us how you work today and where you lose the most time. Together we spot which tasks can be automated, so you notice the impact from the first month.",
      },
      {
        title: "We design your solution",
        badge: "You don't touch anything technical",
        description:
          "We take care of all the technical side: we choose the tools, build the workflows and connect them to what you already use. You just confirm it fits your day to day.",
      },
      {
        title: "We put it into action",
        badge: "In production in 2-4 weeks",
        description:
          "We launch, measure real results and keep fine-tuning. We stay with you so the solution grows with you and keeps saving you time and money.",
      },
    ],
  },
}

export default function HowItWorks({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="proceso" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.subtitulo}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.pasos.map((step, i) => {
            const Icon = iconos[i]
            const number = String(i + 1).padStart(2, "0")
            return (
              <div key={number} className="relative">
                <div className="vidrio flex flex-col gap-4 rounded-2xl border backdrop-blur-sm px-6 py-6 transition-colors duration-200 hover:border-brand-teal/40 h-full">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-brand-emerald flex items-center justify-center shrink-0 shadow-lg shadow-brand-emerald/30">
                      <Icon className="size-6 text-background" />
                    </div>
                    <span className="text-3xl font-bold text-brand-teal/25 select-none">
                      {number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <span className="inline-flex items-center rounded-full border border-brand-teal/30 bg-brand-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-teal mb-3">
                      {step.badge}
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
