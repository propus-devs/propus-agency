import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { HeartPulseIcon, FootprintsIcon, ActivityIcon, BabyIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n/idiomas"

interface Sector {
  title: string
  description: string
  /** Etiqueta de la esquina. Sin ella no se pinta el distintivo. */
  badge?: string
}

interface Textos {
  metricas: [
    { value: string; label: string },
    { value: string; label: string },
    { value: string; label: string },
    { value: string; label: string },
  ]
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  sectores: [Sector, Sector, Sector, Sector]
  /** Enlace discreto a la guía del blog (que solo existe en español). */
  guia: { texto: string; enlace: string }
}

/** La guía del blog que más posiciona; el blog solo existe en español. */
const RUTA_GUIA = "/blog/recepcionista-virtual-clinica-podologia"

// Los iconos y si es destacado van aparte: no dependen del idioma.
const sectorBase: { icon: LucideIcon; featured: boolean }[] = [
  { icon: FootprintsIcon, featured: true },
  { icon: HeartPulseIcon, featured: true },
  { icon: ActivityIcon, featured: false },
  { icon: BabyIcon, featured: false },
]

// Las cuatro métricas son comprobables en el producto. Nada de porcentajes de
// mejora que nadie ha medido: si una cifra no se puede enseñar en el panel, no
// entra.
const textos: Record<Lang, Textos> = {
  es: {
    metricas: [
      { value: "24/7", label: "Disponibilidad del agente" },
      {
        value: "24 h",
        label: "Recordatorio automático por WhatsApp antes de cada cita",
      },
      {
        value: "6 estados",
        label: "Cada cita registra quién la cambió y cuándo",
      },
      {
        value: "3 orígenes",
        label: "Sabes si cada cita la trajo el agente, el panel o la web",
      },
    ],
    etiqueta: "Para quién es",
    titulo: ["Para clínicas de ", "podología. Y punto"],
    subtitulo:
      "No intentamos servir a cualquier consulta con agenda: el producto está construido sobre los tratamientos, los tiempos y la historia clínica de un podólogo.",
    guia: {
      texto: "¿Quieres ver cómo funciona por dentro?",
      enlace: "Lee la guía completa del recepcionista virtual para clínicas de podología",
    },
    sectores: [
      {
        title: "Quiropodia y uña encarnada",
        description:
          "El día a día de la consulta: tratamientos recurrentes, pacientes que vuelven cada pocas semanas y recordatorios que mantienen alta la asistencia. El agente conoce la duración real de cada tratamiento, así que no encaja una quiropodia en el hueco de una revisión.",
        badge: "El volumen del día a día",
      },
      {
        title: "Pie diabético y pacientes de riesgo",
        description:
          "La anamnesis genera sola las alertas de diabetes, anticoagulación o alergia a anestésicos, y la lesión se sigue en milímetros con foto en cada visita. Es donde la historia clínica deja de ser papeleo y pasa a ser la herramienta.",
        badge: "Donde más se nota",
      },
      {
        title: "Biomecánica y plantillas a medida",
        description:
          "Estudios de la pisada y soportes plantares: citas largas, con tiempos distintos y entregas posteriores. La duración del servicio puede ser variable y la agenda reserva el máximo, que es lo único que evita que dos citas se pisen.",
      },
      {
        title: "Podología infantil y deportiva",
        description:
          "Agendas con más movimiento, familias que escriben a cualquier hora y temporada deportiva con picos. El agente atiende de noche y en fin de semana, cuando es justo cuando escriben.",
      },
    ],
  },
  en: {
    metricas: [
      { value: "24/7", label: "Agent availability" },
      {
        value: "24 h",
        label: "Automatic WhatsApp reminder before every appointment",
      },
      {
        value: "6 statuses",
        label: "Every appointment records who changed it and when",
      },
      {
        value: "3 sources",
        label: "You know whether each appointment came from the agent, the panel or the website",
      },
    ],
    etiqueta: "Who it's for",
    titulo: ["For podiatry clinics. ", "Full stop"],
    subtitulo:
      "We don't try to serve every practice with a schedule: the product is built around a podiatrist's treatments, timings and clinical records.",
    guia: {
      texto: "Want to see how it works under the hood?",
      enlace: "Read the full virtual receptionist guide for podiatry clinics (in Spanish)",
    },
    sectores: [
      {
        title: "Chiropody and ingrown nails",
        description:
          "The day-to-day of the practice: recurring treatments, patients who come back every few weeks and reminders that keep attendance high. The agent knows how long each treatment really takes, so it won't fit a chiropody session into a check-up's slot.",
        badge: "The daily volume",
      },
      {
        title: "Diabetic foot and at-risk patients",
        description:
          "The anamnesis generates alerts for diabetes, anticoagulation or anaesthetic allergy on its own, and the lesion is tracked in millimetres with a photo at every visit. This is where the clinical record stops being paperwork and becomes the tool.",
        badge: "Where it shows most",
      },
      {
        title: "Biomechanics and custom insoles",
        description:
          "Gait studies and plantar supports: long appointments, with different timings and later deliveries. A service's duration can be variable and the schedule books the maximum, which is the only thing that stops two appointments overlapping.",
      },
      {
        title: "Paediatric and sports podiatry",
        description:
          "Busier schedules, families writing at any hour and a sports season with peaks. The agent answers at night and at the weekend, which is exactly when they write.",
      },
    ],
  },
}

export default function WhaUseCases({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* Métricas */}
        <div className="mb-20 grid grid-cols-2 gap-6 rounded-2xl border border-wha-teal/20 bg-wha-teal/5 px-6 py-10 sm:grid-cols-4">
          {t.metricas.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5 text-center">
              {/* Las cifras no parten: "24 h" o "6 estados" tienen que leerse de una pieza */}
              <span className="text-2xl font-bold whitespace-nowrap text-wha-teal md:text-3xl">{m.value}</span>
              <span className="max-w-[180px] text-xs leading-snug text-balance text-wha-muted">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Cabecera */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">{t.subtitulo}</p>
        </div>

        {/* Grid de sectores */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.sectores.map((s, i) => {
            const { icon: Icon, featured } = sectorBase[i]
            return (
              <div
                key={i}
                className={cn(
                  "group relative flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur-sm",
                  "transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out",
                  "hover:-translate-y-px motion-reduce:hover:translate-y-0",
                  featured
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
                    featured
                      ? "shadow-md shadow-wha/30 group-hover:shadow-lg group-hover:shadow-wha/50"
                      : "group-hover:shadow-md group-hover:shadow-wha/30"
                  )}
                >
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className={`font-semibold ${featured ? "text-wha-fg text-lg" : "text-wha-fg"}`}>{s.title}</h3>
                <p className="text-sm leading-relaxed text-wha-muted">{s.description}</p>
              </div>
            )
          })}
        </div>

        {/* Enlace discreto a la guía: refuerza el enlazado interno hacia el artículo que más posiciona */}
        <p className="mt-10 text-center text-sm text-wha-muted">
          {t.guia.texto}{" "}
          <Link
            href={RUTA_GUIA}
            className="font-medium text-wha-teal underline underline-offset-4 transition-colors hover:text-wha"
          >
            {t.guia.enlace}
          </Link>
        </p>
      </div>
    </section>
  )
}
