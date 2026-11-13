import type { ReactNode } from "react"
import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"
import type { Lang } from "@/lib/i18n/idiomas"

interface Tramo {
  name: string
  detail: string
  price: string
}

interface Textos {
  etiqueta: string
  descripcion: string
  titulo: ReactNode
  tramos: [Tramo, Tramo, Tramo]
  altaPagoUnico: string
  ivaNoIncluido: string
  cuota: ReactNode
  cuotaDepende: string
  cierre: string
}

// Precios dados por el usuario el 2026-11-10. El alta va sin IVA; en la cuota
// mensual NO se menciona el IVA (indicación expresa del usuario). La cuota
// depende de los servicios contratados. No inventar condiciones nuevas aquí.
const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Precios",
    descripcion:
      "El alta se paga una sola vez y depende del número de alojamientos. Después, una cuota mensual baja.",
    titulo: (
      <>
        Un pago de alta y <em>una cuota mensual</em>
      </>
    ),
    tramos: [
      { name: "1 alojamiento", detail: "Una casa, apartamento o cabaña", price: "750–800 €" },
      {
        name: "De 2 a 5 alojamientos",
        detail: "Varias casas o cabañas en la misma web",
        price: "850 €",
      },
      { name: "Más de 5 alojamientos", detail: "Complejos y conjuntos grandes", price: "900–950 €" },
    ],
    altaPagoUnico: "Alta, pago único",
    ivaNoIncluido: "IVA no incluido",
    cuota: (
      <>
        Cuota mensual: <em className="italic text-rural-honey">de 10 a 20 € al mes</em>
      </>
    ),
    cuotaDepende: "El importe depende de los servicios que contrates.",
    cierre:
      "El importe exacto dentro de cada rango lo cerramos contigo en una llamada, según tu caso.",
  },
  en: {
    etiqueta: "Pricing",
    descripcion:
      "The setup fee is paid once and depends on the number of accommodations. After that, a low monthly fee.",
    titulo: (
      <>
        A setup payment and <em>a monthly fee</em>
      </>
    ),
    tramos: [
      { name: "1 accommodation", detail: "One house, apartment or cabin", price: "€750–800" },
      {
        name: "2 to 5 accommodations",
        detail: "Several houses or cabins on the same website",
        price: "€850",
      },
      {
        name: "More than 5 accommodations",
        detail: "Complexes and large groups",
        price: "€900–950",
      },
    ],
    altaPagoUnico: "Setup fee, one-time payment",
    ivaNoIncluido: "VAT not included",
    cuota: (
      <>
        Monthly fee: <em className="italic text-rural-honey">€10 to €20 a month</em>
      </>
    ),
    cuotaDepende: "The amount depends on the services you choose.",
    cierre:
      "We settle the exact amount within each range with you on a call, based on your case.",
  },
}

export default function RuralPropPricing({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="precios" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading eyebrow={t.etiqueta} description={t.descripcion}>
          {t.titulo}
        </RuralPropHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {t.tramos.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col items-center gap-1 rounded-2xl border border-rural-line bg-rural-card/80 p-7 text-center backdrop-blur-sm"
            >
              <h3 className="font-display-serif text-2xl font-normal text-rural-fg">{tier.name}</h3>
              <p className="text-sm text-rural-muted">{tier.detail}</p>
              <p className="mt-5 font-display-serif text-5xl font-normal tracking-tight text-rural-honey">
                {tier.price}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-rural-muted">
                {t.altaPagoUnico}
              </p>
              <p className="text-xs text-rural-muted/80">{t.ivaNoIncluido}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-dashed border-rural-honey/40 bg-rural-honey/5 p-7 text-center">
          <p className="font-display-serif text-2xl font-normal text-rural-fg">{t.cuota}</p>
          <p className="mt-2 text-sm text-rural-muted">{t.cuotaDepende}</p>
        </div>

        <p className="mt-6 text-center text-sm text-rural-muted">{t.cierre}</p>
      </div>
    </section>
  )
}
