import type { ReactNode } from "react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FAQSchema from "@/components/seo/FAQSchema"
import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

interface Pregunta {
  question: string
  answer: string
}

interface Textos {
  etiqueta: string
  titulo: ReactNode
  faqs: Pregunta[]
  otraCosa: string
  enlace: string
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Dudas habituales",
    titulo: (
      <>
        Preguntas sobre <em>RuralProp</em>
      </>
    ),
    faqs: [
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
    ],
    otraCosa: "¿Buscas algo distinto a un alojamiento rural?",
    enlace: "Mira el diseño web a medida",
  },
  en: {
    etiqueta: "Common questions",
    titulo: (
      <>
        Questions about <em>RuralProp</em>
      </>
    ),
    faqs: [
      {
        question: "What is RuralProp?",
        answer:
          "It is a website with direct bookings for your rural accommodation: centralized calendar, management panel, payment gateway, guest registration for SES Hospedajes and SEO. You pay a one-time setup fee and a monthly fee.",
      },
      {
        question: "How much does it cost?",
        answer:
          "The setup fee, paid once and not including VAT, costs between €750 and €800 for one accommodation, €850 for 2 to 5 accommodations and between €900 and €950 for more than 5. The monthly fee runs from €10 to €20 a month depending on the services you choose.",
      },
      {
        question: "Does it connect with Booking and Airbnb?",
        answer:
          "Yes, via iCal: your website's calendar syncs with the platforms' calendars. iCal is not instant, because each platform reads it at certain intervals. We also offer Channel Manager integration if you need it.",
      },
      {
        question: "Can I charge online?",
        answer:
          "Yes, with Stripe and your own account. With a payment gateway, the booking is confirmed automatically as soon as the guest pays. If you prefer to decide yourself, the guest sends a request and the booking is confirmed when you approve it.",
      },
      {
        question: "How does guest registration for SES Hospedajes work?",
        answer:
          "Your guest fills in their details through their personal check-in link. You review and approve each record in your panel, and the website generates the validated official file. Today we do not send the data automatically to the Ministry: you upload it to the SES Hospedajes portal yourself.",
      },
      {
        question: "Is the website available in English?",
        answer: "Yes, your website will be in Spanish and English.",
      },
      {
        question: "How is it different from a custom website?",
        answer:
          "RuralProp is a service with a setup fee and a monthly fee, designed for rural accommodations and with everything above included. If what you need is a different website, designed from scratch for your business, that is another service: custom web design.",
      },
    ],
    otraCosa: "Looking for something other than a rural accommodation?",
    enlace: "See custom web design",
  },
}

export default function RuralPropFAQ({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="faq-ruralprop" className="px-4 py-20 md:py-28">
      <FAQSchema faqs={t.faqs} />
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading eyebrow={t.etiqueta}>{t.titulo}</RuralPropHeading>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {t.faqs.map((faq, index) => (
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
          {t.otraCosa}{" "}
          <Link
            href={ruta("disenoWeb", lang)}
            className="font-semibold text-rural-honey underline underline-offset-4 hover:text-rural-fg"
          >
            {t.enlace}
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
