import {
  LockIcon,
  ShieldIcon,
  KeyRoundIcon,
  PaletteIcon,
  ScrollTextIcon,
  ServerIcon,
} from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [LockIcon, ShieldIcon, KeyRoundIcon, PaletteIcon, ScrollTextIcon, ServerIcon]

interface Razon {
  title: string
  description: string
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  razones: [Razon, Razon, Razon, Razon, Razon, Razon]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Por qué confiar en nosotros",
    titulo: ["Hecho para empresas que ", "no pueden fallar"],
    razones: [
      {
        title: "Tus datos siempre aislados y privados",
        description: "Arquitectura multiempresa: cada empresa tiene sus datos totalmente separados y seguros.",
      },
      {
        title: "Seguridad de datos",
        description: "Acceso restringido a usuarios autenticados y claves API cifradas.",
      },
      {
        title: "Roles y permisos",
        description: "Control de quién puede ver y hacer qué dentro de la empresa.",
      },
      {
        title: "Personalización de marca",
        description: "Logo y color corporativo propios en la plataforma e informes.",
      },
      {
        title: "Auditoría completa",
        description: "Registro de cada acción con su autor y fecha.",
      },
      {
        title: "Tecnología robusta",
        description: "Construido sobre Django, el mismo framework que usan Instagram o Spotify.",
      },
    ],
  },
  en: {
    etiqueta: "Why trust us",
    titulo: ["Built for companies that ", "can't afford to fail"],
    razones: [
      {
        title: "Your data, always isolated and private",
        description: "Multi-company architecture: each company has its data completely separate and secure.",
      },
      {
        title: "Data security",
        description: "Access restricted to authenticated users and encrypted API keys.",
      },
      {
        title: "Roles and permissions",
        description: "Control over who can see and do what within the company.",
      },
      {
        title: "Brand customization",
        description: "Your own logo and corporate color on the platform and the reports.",
      },
      {
        title: "Full audit trail",
        description: "A record of every action with its author and date.",
      },
      {
        title: "Robust technology",
        description: "Built on Django, the same framework used by Instagram or Spotify.",
      },
    ],
  },
}

export default function FacturiaTrust({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-facturia/30 bg-facturia/10 px-4 py-1.5 text-xs font-semibold text-facturia">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-facturia to-facturia-dark bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.razones.map((r, i) => {
            const Icon = iconos[i]
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/8 bg-facturia-card/60 p-6 backdrop-blur-sm transition-colors hover:border-facturia/40"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-facturia/12">
                  <Icon className="size-5 text-facturia" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-facturia-fg">{r.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{r.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
