import Image from "next/image"
import type { Lang } from "@/lib/i18n/idiomas"

interface Captura {
  title: string
  description: string
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  /** Fila 1 (tres capturas) */
  fila1: [Captura, Captura, Captura]
  detalle: Captura & { alt: string }
  /** Fila 3 (exportación y gráficos) */
  fila3: [Captura, Captura]
  /** Fila 4 (finanzas) */
  fila4: [Captura, Captura]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "La plataforma por dentro",
    titulo: ["Así se ve ", "FacturIA"],
    subtitulo:
      "Capturas reales de la plataforma: del documento al informe contable, todo en un mismo entorno.",
    fila1: [
      {
        title: "Panel de inicio",
        description: "Documentos por revisar, resumen financiero del mes y últimos movimientos de un vistazo.",
      },
      {
        title: "Métricas e IVA",
        description: "Ingresos, gastos, beneficio y control de IVA repercutido y soportado por periodo.",
      },
      {
        title: "Listado de documentos",
        description: "Todas tus facturas y albaranes con estado, nivel de revisión y confianza del OCR.",
      },
    ],
    detalle: {
      title: "Detalle de factura",
      alt: "Detalle de factura con datos extraídos por OCR",
      description:
        "Cada documento con sus datos extraídos por el OCR —base, IVA, total y emisor— y su nivel de confianza, listo para aprobar o rectificar.",
    },
    fila3: [
      {
        title: "Exportación de documentos",
        description:
          "Descarga tus facturas y datos contables en el formato que necesites, listos para tu gestoría o tu software.",
      },
      {
        title: "Gráficos y automatización",
        description:
          "Evolución de gastos, ingresos y beneficio junto a las estadísticas de automatización del procesado.",
      },
    ],
    fila4: [
      {
        title: "Gastos por categoría",
        description:
          "Amplia variedad de categorías por defecto para separar todos tus movimientos de forma ordenada.",
      },
      {
        title: "Movimientos financieros",
        description:
          "Historial completo de movimientos con su importe, método de pago, fecha y categoría, conciliado con tu recibo.",
      },
    ],
  },
  en: {
    etiqueta: "The platform inside",
    titulo: ["This is what ", "FacturIA"],
    subtitulo:
      "Real screenshots of the platform: from document to accounting report, all in one environment.",
    fila1: [
      {
        title: "Home panel",
        description: "Documents to review, the month's financial summary and the latest transactions at a glance.",
      },
      {
        title: "Metrics and VAT",
        description: "Income, expenses, profit and control of VAT charged and paid, by period.",
      },
      {
        title: "Document list",
        description: "All your invoices and delivery notes with status, review level and OCR confidence.",
      },
    ],
    detalle: {
      title: "Invoice detail",
      alt: "Invoice detail with data extracted by OCR",
      description:
        "Each document with its OCR-extracted data —base, VAT, total and issuer— and its confidence level, ready to approve or correct.",
    },
    fila3: [
      {
        title: "Document export",
        description:
          "Download your invoices and accounting data in the format you need, ready for your accountant or your software.",
      },
      {
        title: "Charts and automation",
        description:
          "Evolution of expenses, income and profit alongside the processing automation statistics.",
      },
    ],
    fila4: [
      {
        title: "Expenses by category",
        description:
          "A wide range of default categories to keep all your transactions neatly separated.",
      },
      {
        title: "Financial transactions",
        description:
          "Full history of transactions with their amount, payment method, date and category, reconciled with your receipt.",
      },
    ],
  },
}

// Las imágenes no dependen del idioma, solo su texto.
const SRC_FILA1 = ["/img/facturia/dashboard.png", "/img/facturia/metrics.png", "/img/facturia/documents.png"]
const SRC_FILA3 = ["/img/facturia/export.png", "/img/facturia/graphics.png"]
const SRC_FILA4 = ["/img/facturia/finance-categories.png", "/img/facturia/finance-movements.png"]

function BarraNavegador() {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/8 bg-facturia-bg px-4 py-3">
      <span className="size-3 rounded-full bg-[#ff5f57]" />
      <span className="size-3 rounded-full bg-[#febc2e]" />
      <span className="size-3 rounded-full bg-[#28c840]" />
    </div>
  )
}

function Figura({ src, title, description }: { src: string } & Captura) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-white/8 bg-facturia-card/60 backdrop-blur-sm transition-all duration-500 ease-out hover:border-facturia/40 hover:shadow-xl hover:shadow-facturia/5 lg:flex-1 lg:hover:flex-[3]">
      {/* Barra del navegador */}
      <BarraNavegador />

      {/* Captura */}
      <div className="relative aspect-4/3 overflow-hidden bg-facturia-bg">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-top transition-all duration-500 group-hover:object-contain group-hover:object-center"
        />
      </div>

      {/* Pie */}
      <figcaption className="flex flex-col gap-1.5 px-6 py-5">
        <h3 className="text-base font-semibold text-facturia-fg">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </figcaption>
    </figure>
  )
}

export default function FacturiaGallery({ lang = "es" }: { lang?: Lang }) {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:flex lg:items-start lg:gap-8">
          {t.fila1.map((shot, i) => (
            <Figura key={SRC_FILA1[i]} src={SRC_FILA1[i]} {...shot} />
          ))}
        </div>

        {/* Segunda fila — detalle de factura */}
        <figure className="group mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-white/8 bg-facturia-card/60 backdrop-blur-sm transition-all duration-300 hover:border-facturia/40 hover:shadow-xl hover:shadow-facturia/5 lg:mt-8">
          {/* Barra del navegador */}
          <BarraNavegador />

          {/* Captura */}
          <div className="relative aspect-4/3 overflow-hidden bg-facturia-bg">
            <Image
              src="/img/facturia/detalle-factura.png"
              alt={t.detalle.alt}
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Pie */}
          <figcaption className="flex flex-col gap-1.5 px-6 py-5">
            <h3 className="text-base font-semibold text-facturia-fg">{t.detalle.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{t.detalle.description}</p>
          </figcaption>
        </figure>

        {/* Tercera fila — exportación y gráficos */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-8 lg:flex lg:items-start lg:gap-8">
          {t.fila3.map((shot, i) => (
            <Figura key={SRC_FILA3[i]} src={SRC_FILA3[i]} {...shot} />
          ))}
        </div>

        {/* Cuarta fila — finanzas */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-8 lg:flex lg:items-start lg:gap-8">
          {t.fila4.map((shot, i) => (
            <Figura key={SRC_FILA4[i]} src={SRC_FILA4[i]} {...shot} />
          ))}
        </div>
      </div>
    </section>
  )
}
