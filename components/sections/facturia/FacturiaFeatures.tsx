import {
  ScanLineIcon,
  BadgeCheckIcon,
  HistoryIcon,
  WalletIcon,
  BarChart3Icon,
  Building2Icon,
  FileDownIcon,
  PlugIcon,
} from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [
  ScanLineIcon,
  BadgeCheckIcon,
  HistoryIcon,
  WalletIcon,
  BarChart3Icon,
  Building2Icon,
  FileDownIcon,
  PlugIcon,
]

interface Funcion {
  title: string
  points: string[]
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  funciones: Funcion[]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Funcionalidades",
    titulo: ["Todo lo que necesitas para ", "reducir trabajo manual"],
    subtitulo:
      "Desde la captura hasta el informe final, FacturIA cubre el ciclo completo de tus documentos contables.",
    funciones: [
      {
        title: "Captura inteligente de documentos",
        points: [
          "Ingesta de facturas, albaranes, facturas rectificativas y abonos.",
          "Lectura automática con OCR + IA: número, fecha, base imponible, IVA, total y emisor.",
          "Cada dato extraído incluye un nivel de confianza, para saber qué revisar.",
        ],
      },
      {
        title: "Revisión y aprobación automática",
        points: [
          "Niveles de revisión: automático, manual, recomendado u obligatorio.",
          "Las facturas con alta confianza se aprueban solas; las dudosas se marcan.",
          "Estados claros y trazabilidad total: quién aprobó, rechazó o editó y cuándo.",
        ],
      },
      {
        title: "Rectificaciones con histórico",
        points: [
          "Crea versiones rectificativas manteniendo el documento original.",
          "Solo la versión vigente queda activa, conservando todo el historial.",
        ],
      },
      {
        title: "Movimientos financieros",
        points: [
          "Ingresos y gastos más allá de las facturas: efectivo, transferencia, tarjeta, Bizum, cheque…",
          "Categorías personalizables con iconos y colores.",
          "Adjunta recibos y marca movimientos como recurrentes o conciliados.",
        ],
      },
      {
        title: "Dashboard de métricas",
        points: [
          "Ingresos, gastos, beneficio y margen en tiempo real.",
          "Control de IVA repercutido, soportado y saldo.",
          "Tasa de aprobación, aprobación automática y confianza media del OCR.",
        ],
      },
      {
        title: "Proveedores y clientes",
        points: [
          "Alta automática de empresas a partir de las facturas ingeridas.",
          "Detección automática de proveedor (gasto) o cliente (ingreso).",
          "Identificación por CIF/NIF con normalización automática.",
        ],
      },
      {
        title: "Exportaciones profesionales",
        points: [
          "Exporta en Excel, CSV y PDF.",
          "Vista previa antes de exportar con resúmenes y subtotales.",
          "Informes PDF con diseño cuidado, listos para la gestoría.",
        ],
      },
      {
        title: "Integración vía API",
        points: [
          "API REST para ingesta automatizada desde otros sistemas.",
          "Claves API seguras con entornos live y test.",
        ],
      },
    ],
  },
  en: {
    etiqueta: "Features",
    titulo: ["Everything you need to ", "cut manual work"],
    subtitulo:
      "From capture to the final report, FacturIA covers the whole cycle of your accounting documents.",
    funciones: [
      {
        title: "Smart document capture",
        points: [
          "Intake of invoices, delivery notes, corrective invoices and credit notes.",
          "Automatic reading with OCR + AI: number, date, taxable base, VAT, total and issuer.",
          "Every extracted data point comes with a confidence level, so you know what to review.",
        ],
      },
      {
        title: "Automatic review and approval",
        points: [
          "Review levels: automatic, manual, recommended or mandatory.",
          "High-confidence invoices approve themselves; doubtful ones are flagged.",
          "Clear statuses and full traceability: who approved, rejected or edited, and when.",
        ],
      },
      {
        title: "Corrections with history",
        points: [
          "Create corrective versions while keeping the original document.",
          "Only the current version stays active, preserving the whole history.",
        ],
      },
      {
        title: "Financial transactions",
        points: [
          "Income and expenses beyond invoices: cash, bank transfer, card, Bizum, check…",
          "Customizable categories with icons and colors.",
          "Attach receipts and mark transactions as recurring or reconciled.",
        ],
      },
      {
        title: "Metrics dashboard",
        points: [
          "Income, expenses, profit and margin in real time.",
          "Control of VAT charged, VAT paid and balance.",
          "Approval rate, automatic approval and average OCR confidence.",
        ],
      },
      {
        title: "Suppliers and customers",
        points: [
          "Companies are created automatically from the ingested invoices.",
          "Automatic detection of supplier (expense) or customer (income).",
          "Identification by CIF/NIF with automatic normalization.",
        ],
      },
      {
        title: "Professional exports",
        points: [
          "Export to Excel, CSV and PDF.",
          "Preview before exporting, with summaries and subtotals.",
          "Carefully designed PDF reports, ready for your accountant.",
        ],
      },
      {
        title: "API integration",
        points: [
          "REST API for automated intake from other systems.",
          "Secure API keys with live and test environments.",
        ],
      },
    ],
  },
}

export default function FacturiaFeatures({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="funcionalidades" className="py-20 md:py-28">
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
          <p className="mt-4 text-muted-foreground">{t.subtitulo}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.funciones.map((f, i) => {
            const Icon = iconos[i]
            return (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-facturia-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-facturia/40 hover:shadow-xl hover:shadow-facturia/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-facturia/12">
                  <Icon className="size-5 text-facturia" />
                </div>
                <h3 className="text-base font-semibold leading-tight text-facturia-fg">
                  {f.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm leading-snug text-slate-400">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-facturia" />
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
