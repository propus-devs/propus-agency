import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"

const steps = [
  {
    title: "Elige sus fechas",
    description: "Ve en el calendario qué noches están libres, sin llamar ni escribir.",
  },
  {
    title: "Reserva",
    description:
      "Envía su petición de reserva o la paga online, según cómo configures tu alojamiento. A ti te llega el aviso al momento.",
  },
  {
    title: "Recibe su confirmación",
    description:
      "En cuanto paga, o cuando tú la apruebas, le llega un correo automático con la confirmación y su enlace personal de check-in.",
  },
  {
    title: "Rellena sus datos",
    description:
      "Completa en el check-in la ficha de cada viajero. Tú la revisas y la subes al portal de SES Hospedajes.",
  },
]

/**
 * Los cuatro pasos van unidos por una senda de puntos, como un recorrido en un
 * mapa. En pantallas anchas la senda corre en horizontal entre los hitos; en
 * estrechas, en vertical por la izquierda.
 */
export default function RuralPropFlow() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading
          eyebrow="El recorrido"
          description="Del primer clic al registro de viajeros, sin que tengas que perseguir a nadie."
        >
          Así reserva <em>tu huésped</em>
        </RuralPropHeading>

        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative pl-16 lg:pt-16 lg:pl-0 lg:text-center"
            >
              {/* Senda hacia el siguiente hito */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-12 bottom-[-2.5rem] left-[1.4rem] border-l-2 border-dashed border-rural-moss/35 lg:top-[1.4rem] lg:right-auto lg:bottom-auto lg:left-1/2 lg:w-[calc(100%+2rem)] lg:border-t-2 lg:border-l-0"
                />
              )}
              <span className="absolute top-0 left-0 flex size-11 items-center justify-center rounded-full border border-rural-honey/40 bg-rural-bg font-display-serif text-xl italic text-rural-honey shadow-[0_0_0_6px_rgba(16,23,16,1)] lg:left-1/2 lg:-translate-x-1/2">
                {index + 1}
              </span>
              <h3 className="mb-2 font-display-serif text-2xl font-normal leading-tight text-rural-fg">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-rural-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
