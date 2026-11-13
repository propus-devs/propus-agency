import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FAQSchema from "@/components/seo/FAQSchema"
import type { Lang } from "@/lib/i18n/idiomas"

interface Pregunta {
  question: string
  answer: string
}

interface Textos {
  titulo: [string, string]
  subtitulo: string
  faqs: Pregunta[]
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["Preguntas ", "frecuentes"],
    subtitulo: "Todo lo que necesitas saber antes de automatizar con Propus.",
    faqs: [
      {
        question: "¿Necesito saber de tecnología para trabajar con vosotros?",
        answer:
          "Para nada. Tú nos cuentas cómo funciona tu negocio y nosotros nos encargamos de todo lo técnico. No necesitas saber qué es una API ni cómo funciona la IA — solo conocer tu día a día, que es lo que realmente importa.",
      },
      {
        question: "¿Cuánto tiempo tarda en estar funcionando el agente de WhatsApp?",
        answer:
          "En la mayoría de clínicas lo dejamos operativo en 2 a 3 semanas desde la primera reunión. Ese tiempo incluye configurar el agente con la información de tu clínica, conectarlo a tu sistema de citas y hacer pruebas reales antes de que lo vean tus pacientes.",
      },
      {
        question: "¿Podéis diseñar mi web aunque no tenga contenido preparado?",
        answer:
          "Sí, y es lo más habitual. En el diagnóstico inicial te ayudamos a definir qué contar y cómo contarlo. Nosotros nos encargamos de los textos, el diseño y la estructura — tú solo apruebas y nos das el visto bueno.",
      },
      {
        question: "¿Funciona con los sistemas que ya uso (FacturaDirecta, Holded, etc.)?",
        answer:
          "En la mayoría de casos, sí. Trabajamos con las herramientas más habituales en pymes españolas. Si usas algo menos común, lo comprobamos en el diagnóstico gratuito antes de comprometerte a nada.",
      },
      {
        question: "¿Qué pasa si el agente no sabe responder a una pregunta del paciente?",
        answer:
          "El agente está configurado para derivar a tu equipo cuando no tiene una respuesta clara. Nunca deja a un paciente sin atención: avisa a la recepcionista o deja el mensaje pendiente para que lo gestione una persona. Tú decides cómo quieres que actúe en esos casos.",
      },
      {
        question: "¿Cómo sé si esto me va a funcionar a mí?",
        answer:
          "Por eso ofrecemos el diagnóstico gratuito: en 15 minutos analizamos tu caso concreto y te decimos con honestidad si tiene sentido o no. Si no vemos un impacto real para tu negocio, te lo decimos — no te vamos a vender algo que no necesitas.",
      },
    ],
  },
  en: {
    titulo: ["Frequently asked ", "questions"],
    subtitulo: "Everything you need to know before automating with Propus.",
    faqs: [
      {
        question: "Do I need to know about technology to work with you?",
        answer:
          "Not at all. You tell us how your business works and we take care of everything technical. You don't need to know what an API is or how AI works — just know your day to day, which is what really matters.",
      },
      {
        question: "How long does it take for the WhatsApp agent to be up and running?",
        answer:
          "In most clinics we have it operational within 2 to 3 weeks of the first meeting. That time includes setting the agent up with your clinic's information, connecting it to your booking system and running real tests before your patients see it.",
      },
      {
        question: "Can you design my website even if I don't have the content ready?",
        answer:
          "Yes, and that is the most common case. In the initial assessment we help you define what to say and how to say it. We take care of the copy, the design and the structure — you just review it and give us the go-ahead.",
      },
      {
        question: "Does it work with the systems I already use (FacturaDirecta, Holded, etc.)?",
        answer:
          "In most cases, yes. We work with the tools most common among Spanish small businesses. If you use something less common, we check it during the free assessment before you commit to anything.",
      },
      {
        question: "What happens if the agent doesn't know how to answer a patient's question?",
        answer:
          "The agent is set up to hand over to your team when it doesn't have a clear answer. It never leaves a patient without attention: it alerts the receptionist or leaves the message pending for a person to handle. You decide how you want it to act in those cases.",
      },
      {
        question: "How do I know this will work for me?",
        answer:
          "That is why we offer the free assessment: in 15 minutes we look at your specific case and tell you honestly whether it makes sense or not. If we don't see a real impact for your business, we will tell you — we won't sell you something you don't need.",
      },
    ],
  },
}

export default function FAQ({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="faq" className="py-20 md:py-28">
      <FAQSchema faqs={t.faqs} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            {t.titulo[0]}
            <span className="bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.subtitulo}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {t.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="vidrio rounded-xl border backdrop-blur-sm px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-base font-medium py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
