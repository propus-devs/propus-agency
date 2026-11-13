import { UploadCloudIcon, ScanLineIcon, ShieldCheckIcon, BarChart3Icon, FileDownIcon } from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [UploadCloudIcon, ScanLineIcon, ShieldCheckIcon, BarChart3Icon, FileDownIcon]

interface Paso {
  title: string
  description: string
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  pasos: [Paso, Paso, Paso, Paso, Paso]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Cómo funciona",
    titulo: ["Un flujo ", "sin fricción"],
    subtitulo:
      "De la subida del documento al informe contable, sin intervención manual cuando no hace falta.",
    pasos: [
      {
        title: "Subes o envías la factura",
        description: "Foto, PDF o ingesta automática vía API desde tus otros sistemas.",
      },
      {
        title: "La IA extrae los datos (OCR)",
        description: "Número, fecha, base, IVA, total y emisor — cada dato con su nivel de confianza.",
      },
      {
        title: "Aprobación automática o revisión",
        description: "Alta confianza se aprueba sola; las dudosas pasan a revisión manual.",
      },
      {
        title: "Consultas tus métricas",
        description: "Ingresos, gastos, beneficio e IVA en el dashboard, en tiempo real.",
      },
      {
        title: "Exportas para tu gestoría",
        description: "Informes en Excel, CSV o PDF listos en segundos.",
      },
    ],
  },
  en: {
    etiqueta: "How it works",
    titulo: ["A ", "frictionless flow"],
    subtitulo:
      "From uploading the document to the accounting report, with no manual intervention when it isn't needed.",
    pasos: [
      {
        title: "You upload or send the invoice",
        description: "Photo, PDF or automatic intake via API from your other systems.",
      },
      {
        title: "AI extracts the data (OCR)",
        description: "Number, date, base, VAT, total and issuer — each data point with its confidence level.",
      },
      {
        title: "Automatic approval or review",
        description: "High confidence approves itself; doubtful ones go to manual review.",
      },
      {
        title: "You check your metrics",
        description: "Income, expenses, profit and VAT on the dashboard, in real time.",
      },
      {
        title: "You export for your accountant",
        description: "Reports in Excel, CSV or PDF ready in seconds.",
      },
    ],
  },
}

export default function FacturiaFlow({ lang = "es" }: { lang?: Lang }) {
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
          <p className="mt-4 text-muted-foreground">{t.subtitulo}</p>
        </div>

        <div className="relative">
          {/* Línea conectora horizontal en desktop */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-linear-to-r from-transparent via-facturia/30 to-transparent lg:block"
            aria-hidden
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {t.pasos.map((step, i) => {
              const Icon = iconos[i]
              const number = String(i + 1).padStart(2, "0")
              return (
                <div key={number} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-4 flex size-14 items-center justify-center rounded-2xl border border-facturia/30 bg-facturia-card shadow-lg shadow-facturia/10">
                    <Icon className="size-6 text-facturia" />
                    <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-linear-to-br from-facturia to-facturia-dark text-[10px] font-bold text-white">
                      {number}
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-facturia-fg">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-400">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
