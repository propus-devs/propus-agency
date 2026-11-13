import { BriefcaseIcon, BuildingIcon, CalculatorIcon, FileTextIcon } from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [BriefcaseIcon, CalculatorIcon, BuildingIcon]

interface Caso {
  title: string
  description: string
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  casos: [Caso, Caso, Caso]
  tiposTitulo: string
  tipos: [string, string, string, string]
  clasificacion: string
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Para quién es",
    titulo: ["Pensado para tu ", "caso de uso"],
    casos: [
      {
        title: "Pymes y autónomos",
        description: "Que quieren dejar de teclear facturas y ganar control de su tesorería sin esfuerzo.",
      },
      {
        title: "Gestorías y asesorías",
        description: "Que procesan documentos de varios clientes y necesitan orden multiempresa.",
      },
      {
        title: "Departamentos financieros",
        description: "Que requieren control de IVA, flujo de caja y trazabilidad de cada aprobación.",
      },
    ],
    tiposTitulo: "Tipos de documentos soportados",
    tipos: ["Facturas", "Albaranes", "Facturas rectificativas", "Abonos de albarán"],
    clasificacion: "Con clasificación automática en ingresos (ventas) o gastos (compras).",
  },
  en: {
    etiqueta: "Who it's for",
    titulo: ["Designed for your ", "use case"],
    casos: [
      {
        title: "Small businesses and freelancers",
        description: "Who want to stop typing invoices and gain control of their cash flow effortlessly.",
      },
      {
        title: "Accounting firms and advisors",
        description: "Who process documents for several clients and need multi-company order.",
      },
      {
        title: "Finance departments",
        description: "Who need control of VAT, cash flow and traceability of every approval.",
      },
    ],
    tiposTitulo: "Supported document types",
    tipos: ["Invoices", "Delivery notes", "Corrective invoices", "Delivery note credits"],
    clasificacion: "With automatic classification into income (sales) or expenses (purchases).",
  },
}

export default function FacturiaUseCases({ lang = "es" }: { lang?: Lang }) {
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

        <div className="grid gap-6 md:grid-cols-3">
          {t.casos.map((u, i) => {
            const Icon = iconos[i]
            return (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-facturia-card/60 p-7 backdrop-blur-sm transition-colors hover:border-facturia/40"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-facturia to-facturia-dark">
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-facturia-fg">{u.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{u.description}</p>
              </div>
            )
          })}
        </div>

        {/* Tipos de documentos soportados */}
        <div className="mt-12 rounded-2xl border border-white/8 bg-facturia-card/40 px-6 py-8 text-center backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold text-facturia-fg">
            <FileTextIcon className="size-4 text-facturia" />
            {t.tiposTitulo}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {t.tipos.map((d) => (
              <span
                key={d}
                className="rounded-full border border-facturia/20 bg-facturia/8 px-4 py-1.5 text-sm text-facturia"
              >
                {d}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-facturia-muted">{t.clasificacion}</p>
        </div>
      </div>
    </section>
  )
}
