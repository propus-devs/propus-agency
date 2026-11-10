import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"

// Precios dados por el usuario el 2026-11-10. El alta va sin IVA; en la cuota
// mensual NO se menciona el IVA (indicación expresa del usuario). La cuota
// depende de los servicios contratados. No inventar condiciones nuevas aquí.
const tiers = [
  {
    name: "1 alojamiento",
    detail: "Una casa, apartamento o cabaña",
    price: "750–800 €",
  },
  {
    name: "De 2 a 5 alojamientos",
    detail: "Varias casas o cabañas en la misma web",
    price: "850 €",
  },
  {
    name: "Más de 5 alojamientos",
    detail: "Complejos y conjuntos grandes",
    price: "900–950 €",
  },
]

export default function RuralPropPricing() {
  return (
    <section id="precios" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading
          eyebrow="Precios"
          description="El alta se paga una sola vez y depende del número de alojamientos. Después, una cuota mensual baja."
        >
          Un pago de alta y <em>una cuota mensual</em>
        </RuralPropHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
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
                Alta, pago único
              </p>
              <p className="text-xs text-rural-muted/80">IVA no incluido</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-dashed border-rural-honey/40 bg-rural-honey/5 p-7 text-center">
          <p className="font-display-serif text-2xl font-normal text-rural-fg">
            Cuota mensual: <em className="italic text-rural-honey">de 10 a 20 € al mes</em>
          </p>
          <p className="mt-2 text-sm text-rural-muted">
            El importe depende de los servicios que contrates.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-rural-muted">
          El importe exacto dentro de cada rango lo cerramos contigo en una llamada, según tu caso.
        </p>
      </div>
    </section>
  )
}
