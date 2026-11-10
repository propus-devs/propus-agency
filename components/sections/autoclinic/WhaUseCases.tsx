import type { LucideIcon } from "lucide-react"
import { HeartPulseIcon, FootprintsIcon, ActivityIcon, StethoscopeIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface Sector {
  icon: LucideIcon
  title: string
  description: string
  featured: boolean
  /** Etiqueta de la esquina. Sin ella no se pinta el distintivo. */
  badge?: string
}

// Las cuatro son comprobables en el producto. Nada de porcentajes de mejora
// que nadie ha medido: si una cifra no se puede enseñar en el panel, no entra.
const metrics = [
  { value: "24/7", label: "Disponibilidad del agente" },
  {
    value: "24 h + 3 h",
    label: "Dos recordatorios, y el segundo solo a quien no ha confirmado",
  },
  {
    value: "6 estados",
    label: "Cada cita registra quién la cambió y cuándo",
  },
  {
    value: "3 orígenes",
    label: "Sabes si cada cita la trajo el agente, el panel o la web",
  },
]

const sectors: Sector[] = [
  {
    icon: FootprintsIcon,
    title: "Clínicas de podología",
    description:
      "Nuestro caso de uso principal, ya en fase beta con una clínica de podología en Albacete y configurado a medida: quiropodias, estudios biomecánicos y tratamientos recurrentes con recordatorios que mantienen alta la asistencia.",
    featured: true,
    badge: "Nicho principal",
  },
  {
    icon: HeartPulseIcon,
    title: "Clínicas dentales",
    description:
      "Nuestro segundo nicho. Agenda de higienistas, ortodoncistas y cirujanos bajo un solo agente, con información detallada de cada profesional y tratamiento.",
    featured: true,
    badge: "Segundo nicho",
  },
  {
    icon: ActivityIcon,
    title: "Fisioterapia y rehabilitación",
    description:
      "Control de sesiones, seguimiento de tratamientos y recordatorios que garantizan una alta tasa de asistencia.",
    featured: false,
  },
  {
    icon: StethoscopeIcon,
    title: "Medicina y especialidades",
    description:
      "Triaje básico, información de especialistas y gestión de agenda para consultas privadas de cualquier disciplina.",
    featured: false,
  },
]

export default function WhaUseCases() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* Métricas */}
        <div className="mb-20 grid grid-cols-2 gap-6 rounded-2xl border border-wha-teal/20 bg-wha-teal/5 px-6 py-10 sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5 text-center">
              {/* Las cifras no parten: "24 h + 3 h" tiene que leerse de una pieza */}
              <span className="text-2xl font-bold whitespace-nowrap text-wha-teal md:text-3xl">{m.value}</span>
              <span className="max-w-[180px] text-xs leading-snug text-balance text-wha-muted">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Cabecera */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
            Para quién es
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            Cualquier consulta que{" "}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              trabaje por cita
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">
            Si tu negocio gestiona agenda, el agente puede encargarse de ella.
          </p>
        </div>

        {/* Grid de sectores */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className={cn(
                  "group relative flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur-sm",
                  "transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out",
                  "hover:-translate-y-px motion-reduce:hover:translate-y-0",
                  s.featured
                    ? // Ya parte con relieve: en hover lo intensifica en vez de estrenarlo.
                      "border-wha/40 bg-linear-to-br from-wha/10 via-wha-card to-wha-teal/10 shadow-lg shadow-wha/10 hover:border-wha/60 hover:shadow-xl hover:shadow-wha/20"
                    : "border-white/8 bg-wha-card/60 hover:border-wha/25 hover:bg-wha-card hover:shadow-lg hover:shadow-wha/10"
                )}
              >
                {s.badge && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-wha/15 px-2.5 py-1 text-[10px] font-semibold text-wha">
                    <StarIcon className="size-2.5 fill-wha" />
                    {s.badge}
                  </span>
                )}
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-wha to-wha-teal transition-shadow duration-200",
                    s.featured
                      ? "shadow-md shadow-wha/30 group-hover:shadow-lg group-hover:shadow-wha/50"
                      : "group-hover:shadow-md group-hover:shadow-wha/30"
                  )}
                >
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className={`font-semibold ${s.featured ? "text-wha-fg text-lg" : "text-wha-fg"}`}>{s.title}</h3>
                <p className="text-sm leading-relaxed text-wha-muted">{s.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
