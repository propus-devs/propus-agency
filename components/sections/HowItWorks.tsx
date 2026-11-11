import { SearchIcon, PenToolIcon, RocketIcon } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: SearchIcon,
    title: "Entendemos tu negocio",
    badge: "15 minutos · sin tecnicismos",
    description:
      "Nos cuentas cómo trabajas hoy y dónde pierdes más tiempo. Detectamos juntos qué tareas se pueden automatizar para que notes el impacto desde el primer mes.",
  },
  {
    number: "02",
    icon: PenToolIcon,
    title: "Diseñamos tu solución",
    badge: "Tú no tocas nada técnico",
    description:
      "Nos encargamos de toda la parte técnica: elegimos las herramientas, montamos los flujos y lo conectamos con lo que ya usas. Tú solo validas que encaja con tu día a día.",
  },
  {
    number: "03",
    icon: RocketIcon,
    title: "Lo ponemos en marcha",
    badge: "En producción en 2-4 semanas",
    description:
      "Lanzamos, medimos resultados reales y seguimos afinando. Te acompañamos para que la solución crezca contigo y siga ahorrándote tiempo y dinero.",
  },
]

export default function HowItWorks() {
  return (
    <section id="proceso" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Cómo{" "}
            <span className="bg-linear-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
              trabajamos
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Sin reuniones interminables ni lenguaje técnico. Tres pasos claros para pasar de hacerlo todo a mano a tenerlo automatizado en semanas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div className="flex flex-col gap-4 rounded-2xl border border-brand-teal/20 bg-brand-teal/5 backdrop-blur-sm px-6 py-6 transition-colors duration-200 hover:bg-brand-teal/10 hover:border-brand-teal/40 h-full">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-brand-emerald flex items-center justify-center shrink-0 shadow-lg shadow-brand-emerald/30">
                      <Icon className="size-6 text-background" />
                    </div>
                    <span className="text-3xl font-bold text-brand-teal/25 select-none">
                      {step.number}
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
