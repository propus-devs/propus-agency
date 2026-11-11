import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FAQSchema from "@/components/seo/FAQSchema"

const faqs = [
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
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <FAQSchema faqs={faqs} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
              frecuentes
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Todo lo que necesitas saber antes de automatizar con Propus.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
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
