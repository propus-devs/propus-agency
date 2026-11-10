import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FAQSchema from "@/components/seo/FAQSchema"
import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"

const faqs = [
  {
    question: "¿Qué es RuralProp?",
    answer:
      "Es una web con reservas directas para tu alojamiento rural: calendario centralizado, panel de gestión, pasarela de pago, registro de viajeros para SES Hospedajes y SEO. Se paga un alta única y una cuota mensual.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El alta, que se paga una sola vez y no incluye IVA, cuesta entre 750 y 800 € para un alojamiento, 850 € de 2 a 5 alojamientos y entre 900 y 950 € para más de 5. La cuota mensual va de 10 a 20 € al mes según los servicios que contrates.",
  },
  {
    question: "¿Se conecta con Booking y Airbnb?",
    answer:
      "Sí, por iCal: el calendario de tu web se sincroniza con el de las plataformas. El iCal no es instantáneo, porque cada plataforma lo lee cada cierto tiempo. También ofrecemos integración con Channel Manager si lo necesitas.",
  },
  {
    question: "¿Puedo cobrar online?",
    answer:
      "Sí, con Stripe y tu propia cuenta. Con pasarela de pago, la reserva se confirma sola en cuanto el huésped paga. Si prefieres decidir tú, el huésped envía una petición y la reserva se confirma cuando la apruebas.",
  },
  {
    question: "¿Cómo funciona el registro de viajeros de SES Hospedajes?",
    answer:
      "Tu huésped rellena sus datos en su enlace personal de check-in. Tú revisas y apruebas cada ficha en tu panel, y la web genera el fichero oficial ya validado. Hoy no enviamos los datos automáticamente al Ministerio: lo subes tú al portal de SES Hospedajes.",
  },
  {
    question: "¿La web está en inglés?",
    answer: "Sí, tu web estará en español e inglés.",
  },
  {
    question: "¿En qué se diferencia de una web a medida?",
    answer:
      "RuralProp es un servicio con alta y cuota mensual, pensado para alojamientos rurales y con todo lo de arriba incluido. Si lo que necesitas es una web distinta, diseñada desde cero para tu negocio, es otro servicio: el diseño web a medida.",
  },
]

export default function RuralPropFAQ() {
  return (
    <section id="faq-ruralprop" className="px-4 py-20 md:py-28">
      <FAQSchema faqs={faqs} />
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading eyebrow="Dudas habituales">
          Preguntas sobre <em>RuralProp</em>
        </RuralPropHeading>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="overflow-hidden rounded-xl border border-rural-line bg-rural-card/70 px-5 backdrop-blur-sm transition-[background-color,border-color] duration-200 ease-out hover:border-rural-honey/40 data-[state=open]:border-rural-honey/40 data-[state=open]:bg-rural-card"
              >
                <AccordionTrigger className="py-4 text-left font-display-serif text-xl font-normal text-rural-fg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 leading-relaxed text-rural-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-rural-muted">
          ¿Buscas algo distinto a un alojamiento rural?{" "}
          <Link
            href="/servicios/diseno-web-a-medida"
            className="font-semibold text-rural-honey underline underline-offset-4 hover:text-rural-fg"
          >
            Mira el diseño web a medida
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
