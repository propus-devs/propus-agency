import Link from "next/link"
import { Brain, Cpu, Workflow, Zap, Mail, Phone, TrendingUp, Code, Handshake, Users, Rocket } from "lucide-react"
import { contact } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

interface Diferencial {
  title: string
  description: string
}

interface Equipo {
  label: string
  /** Texto bajo el nombre: «1 cofundador» */
  miembros: string
  skills: string[]
  description: string
}

interface Textos {
  hero: [string, string]
  heroTexto: string
  mision: [string, string]
  misionParrafos: [string, string, string]
  diferenciaTitulo: [string, string]
  diferenciales: [Diferencial, Diferencial, Diferencial]
  equipoTitulo: [string, string]
  equipoTexto: string
  cofundadores: string
  paraEspana: string
  equipos: [Equipo, Equipo]
  remotoTitulo: string
  remotoTexto: string
  marca: string
  agendar: string
}

const textos: Record<Lang, Textos> = {
  es: {
    hero: ["Software, webs y automatización para negocios de ", "toda España"],
    heroTexto:
      "Propus es una agencia de desarrollo de software e integraciones inteligentes. Creamos software de gestión para clínicas, webs con reservas y automatizaciones para que los negocios de toda España dejen de perder tiempo en tareas repetitivas y sean más eficientes, competitivos y rentables.",
    mision: ["Nuestra ", "misión"],
    misionParrafos: [
      "Creemos que la inteligencia artificial no debería ser un privilegio de las grandes corporaciones. Nuestra misión es acercar los servicios de IA en toda España a empresas de cualquier tamaño, democratizando el acceso a tecnología que transforma negocios.",
      "Nos especializamos en la automatización de procesos para pymes de toda España, diseñando soluciones a medida que eliminan tareas repetitivas y liberan a los equipos para que se concentren en lo que realmente importa: hacer crecer su negocio.",
      "Como agencia de desarrollo de software e integraciones inteligentes, combinamos software de gestión, agentes inteligentes y consultoría estratégica para ofrecer un servicio completo, desde la idea hasta la implementación en producción.",
    ],
    diferenciaTitulo: ["Qué nos ", "diferencia"],
    diferenciales: [
      {
        title: "Especialización en IA",
        description:
          "No somos una consultora generalista. Vivimos y respiramos inteligencia artificial aplicada. Cada solución que diseñamos aprovecha lo último en modelos de lenguaje, visión artificial y automatización inteligente.",
      },
      {
        title: "Trato directo",
        description:
          "Hablas siempre con las dos personas que construyen tu proyecto, sin intermediarios. Ofrecemos un trato cercano y personalizado que las grandes consultoras no pueden igualar.",
      },
      {
        title: "Resultados medibles",
        description:
          "Cada proyecto se diseña con KPIs claros desde el primer día. Medimos el retorno de inversión, el tiempo ahorrado y el impacto real en tu negocio para asegurar que la IA trabaja para ti.",
      },
    ],
    equipoTitulo: ["El equipo detrás ", "de Propus"],
    equipoTexto:
      "Somos 2 emprendedores unidos por una misma misión: traer el poder de la IA a las empresas de nuestro país. Nacimos del hambre de ayudar a negocios a escalar, crecer y liberarse de cargas que, a día de hoy, son innecesarias.",
    cofundadores: "2 cofundadores",
    paraEspana: "Para toda España — construyendo el futuro de tu negocio",
    equipos: [
      {
        label: "Desarrollo e IA",
        miembros: "1 cofundador",
        skills: ["Python & Django", "JavaScript & React", "Sistemas de IA", "Automatización inteligente", "n8n", "Make"],
        description:
          "Especialista en desarrollo de software e inteligencia artificial aplicada. Convierte cualquier idea en una solución técnica real, desde la arquitectura hasta el despliegue en producción.",
      },
      {
        label: "Estrategia y Negocio",
        miembros: "1 cofundador",
        skills: ["Estrategia de negocio", "Consultoría", "Automatización de procesos", "Gestión de proyectos"],
        description:
          "Responsable de entender tu negocio y diseñar la solución adecuada. Acompaña al cliente desde la primera consulta hasta que los resultados son tangibles.",
      },
    ],
    remotoTitulo: "Trabajamos en remoto, con negocios de toda España",
    remotoTexto:
      "Trabajamos en remoto desde España con negocios de todo el país. Nos coordinamos por videollamada y mensajería, así que da igual dónde estés: el trato es igual de cercano y personalizado.",
    marca:
      "Propus es la marca comercial de Iberium Group LLC, con domicilio en 1209 Mountain Road PL NE STE R, Albuquerque, New Mexico 87110, EE. UU.",
    agendar: "Agendar llamada",
  },
  en: {
    hero: ["Software, websites and automation for businesses across ", "Spain"],
    heroTexto:
      "Propus is a software development and smart integration agency. We build management software for clinics, websites with booking and automations so that businesses across Spain stop losing time on repetitive tasks and become more efficient, competitive and profitable.",
    mision: ["Our ", "mission"],
    misionParrafos: [
      "We believe artificial intelligence should not be a privilege of large corporations. Our mission is to bring AI services across Spain to businesses of any size, democratizing access to technology that transforms businesses.",
      "We specialize in process automation for small and medium-sized businesses across Spain, designing custom solutions that eliminate repetitive tasks and free teams to concentrate on what really matters: growing their business.",
      "As a software development and smart integration agency, we combine management software, intelligent agents and strategic consulting to offer a complete service, from the idea to implementation in production.",
    ],
    diferenciaTitulo: ["What ", "sets us apart"],
    diferenciales: [
      {
        title: "AI specialization",
        description:
          "We are not a generalist consultancy. We live and breathe applied artificial intelligence. Every solution we design takes advantage of the latest in language models, computer vision and intelligent automation.",
      },
      {
        title: "Direct contact",
        description:
          "You always talk to the two people who build your project, with no intermediaries. We offer a close, personalized service that large consultancies cannot match.",
      },
      {
        title: "Measurable results",
        description:
          "Every project is designed with clear KPIs from day one. We measure return on investment, time saved and the real impact on your business to make sure AI works for you.",
      },
    ],
    equipoTitulo: ["The team behind ", "Propus"],
    equipoTexto:
      "We are 2 entrepreneurs united by a single mission: to bring the power of AI to the businesses of our country. We were born from a hunger to help businesses scale, grow and free themselves from burdens that, today, are unnecessary.",
    cofundadores: "2 co-founders",
    paraEspana: "For all of Spain — building the future of your business",
    equipos: [
      {
        label: "Development and AI",
        miembros: "1 co-founder",
        skills: ["Python & Django", "JavaScript & React", "AI systems", "Intelligent automation", "n8n", "Make"],
        description:
          "A specialist in software development and applied artificial intelligence. Turns any idea into a real technical solution, from architecture to deployment in production.",
      },
      {
        label: "Strategy and Business",
        miembros: "1 co-founder",
        skills: ["Business strategy", "Consulting", "Process automation", "Project management"],
        description:
          "Responsible for understanding your business and designing the right solution. Accompanies the client from the first consultation until the results are tangible.",
      },
    ],
    remotoTitulo: "We work remotely, with businesses across Spain",
    remotoTexto:
      "We work remotely from Spain with businesses throughout the country. We coordinate by video call and messaging, so it doesn't matter where you are: the service is just as close and personal.",
    marca:
      "Propus is the trade name of Iberium Group LLC, domiciled at 1209 Mountain Road PL NE STE R, Albuquerque, New Mexico 87110, USA.",
    agendar: "Book a call",
  },
}

const iconosDiferenciales = [Brain, Handshake, TrendingUp]
const iconosEquipos = [Code, Handshake]

/** Sobre nosotros, compartida por los dos idiomas. */
export default function AboutPage({ lang }: { lang: Lang }) {
  const t = textos[lang]

  return (
    <>
      <FondoMalla />
      <Navbar lang={lang} />
      <main className="relative z-10">
        {/* Hero */}
        <section className="px-4 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {t.hero[0]}
              <span className="bg-linear-to-r from-brand-sky to-brand-emerald bg-clip-text text-transparent">
                {t.hero[1]}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t.heroTexto}
            </p>
          </div>
        </section>

        {/* Nuestra misión */}
        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
                {t.mision[0]}
                <span className="bg-linear-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
                  {t.mision[1]}
                </span>
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">{t.misionParrafos[0]}</p>
              <p className="mb-4 leading-relaxed text-muted-foreground">{t.misionParrafos[1]}</p>
              <p className="leading-relaxed text-muted-foreground">{t.misionParrafos[2]}</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6">
                {[Brain, Cpu, Workflow, Zap].map((Icon, i) => (
                  <GlowCard key={i} className="size-24">
                    <div className="flex h-full items-center justify-center">
                      <Icon className="size-10 text-brand-teal" />
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Qué nos diferencia */}
        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight md:text-4xl">
              {t.diferenciaTitulo[0]}
              <span className="bg-linear-to-r from-brand-teal to-brand-green bg-clip-text text-transparent">
                {t.diferenciaTitulo[1]}
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {t.diferenciales.map((item, i) => {
                const Icon = iconosDiferenciales[i]
                return (
                  <Card
                    key={i}
                    className="group border-border bg-card transition-all duration-300 hover:scale-105 hover:border-brand-teal/60 hover:bg-linear-to-br hover:from-brand-teal/20 hover:to-brand-green/20"
                  >
                    <CardContent className="pt-6">
                      <Icon className="mb-4 size-8 text-brand-teal transition-colors duration-300 group-hover:text-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section id="equipo" className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
                {t.equipoTitulo[0]}
                <span className="bg-linear-to-r from-brand-sky to-brand-teal bg-clip-text text-transparent">
                  {t.equipoTitulo[1]}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                {t.equipoTexto}
              </p>
            </div>

            {/* Panel único */}
            <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
              {/* Header del panel */}
              <div className="border-b border-border bg-brand-teal/5 px-6 py-8 text-center md:px-10">
                <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                  <Users className="size-6 text-brand-teal" />
                  <span className="text-2xl font-bold tracking-tight">{t.cofundadores}</span>
                </div>
                <div className="mx-auto flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Rocket className="size-4 text-brand-teal" />
                  <span>{t.paraEspana}</span>
                </div>
              </div>

              {/* Squads */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                {t.equipos.map((squad, i) => {
                  const Icon = iconosEquipos[i]
                  return (
                    <div key={i} className="p-6 md:p-10">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-brand-teal/10">
                          <Icon className="size-6 text-brand-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{squad.label}</h3>
                          <p className="text-sm text-brand-teal">{squad.miembros}</p>
                        </div>
                      </div>

                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                        {squad.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {squad.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-brand-teal/20 bg-brand-teal/5 px-3 py-1 text-xs text-brand-teal/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Dónde estamos */}
        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
              {t.remotoTitulo}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              {t.remotoTexto}
            </p>
            <address className="mb-8 flex not-italic flex-col items-center justify-center gap-3 text-muted-foreground sm:flex-row sm:gap-8">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-5 text-brand-teal" />
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-5 text-brand-teal" />
                {contact.email}
              </a>
            </address>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground/80">{t.marca}</p>
            <Button
              size="lg"
              className="bg-brand-emerald text-background font-semibold hover:bg-brand-teal"
              asChild
            >
              <Link href={ruta("reservar", lang)}>{t.agendar}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}
