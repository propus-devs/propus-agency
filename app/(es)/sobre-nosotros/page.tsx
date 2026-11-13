import type { Metadata } from "next"
import Link from "next/link"
import { Brain, Cpu, Workflow, Zap, Mail, Phone, TrendingUp, Code, Handshake, Users, Rocket } from "lucide-react"
import { contact, rutaReservar } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GlowCard } from "@/components/ui/glow-card"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

const DESCRIPCION =
  "Somos Propus, dos cofundadores que desarrollamos software de gestión para clínicas, webs con reservas y automatizaciones para negocios de toda España."

export const metadata: Metadata = {
  title: "Sobre nosotros · Software de gestión y webs con reservas",
  description: DESCRIPCION,
  keywords: [
    "software de gestión para clínicas",
    "webs con reservas",
    "automatización",
    "integraciones inteligentes",
    "Propus",
  ],
  alternates: {
    canonical: "/sobre-nosotros",
  },
  openGraph: {
    title: "Sobre nosotros · Software de gestión y webs con reservas — Propus",
    description: DESCRIPCION,
    type: "website",
    locale: "es_ES",
  },
}

const differentiators = [
  {
    icon: Brain,
    title: "Especialización en IA",
    description:
      "No somos una consultora generalista. Vivimos y respiramos inteligencia artificial aplicada. Cada solución que diseñamos aprovecha lo último en modelos de lenguaje, visión artificial y automatización inteligente.",
  },
  {
    icon: Handshake,
    title: "Trato directo",
    description:
      "Hablas siempre con las dos personas que construyen tu proyecto, sin intermediarios. Ofrecemos un trato cercano y personalizado que las grandes consultoras no pueden igualar.",
  },
  {
    icon: TrendingUp,
    title: "Resultados medibles",
    description:
      "Cada proyecto se diseña con KPIs claros desde el primer día. Medimos el retorno de inversión, el tiempo ahorrado y el impacto real en tu negocio para asegurar que la IA trabaja para ti.",
  },
]

const teamSquads = [
  {
    icon: Code,
    label: "Desarrollo e IA",
    members: 1,
    skills: ["Python & Django", "JavaScript & React", "Sistemas de IA", "Automatización inteligente", "n8n", "Make"],
    description:
      "Especialista en desarrollo de software e inteligencia artificial aplicada. Convierte cualquier idea en una solución técnica real, desde la arquitectura hasta el despliegue en producción.",
  },
  {
    icon: Handshake,
    label: "Estrategia y Negocio",
    members: 1,
    skills: ["Estrategia de negocio", "Consultoría", "Automatización de procesos", "Gestión de proyectos"],
    description:
      "Responsable de entender tu negocio y diseñar la solución adecuada. Acompaña al cliente desde la primera consulta hasta que los resultados son tangibles.",
  },
]

export default function SobreNosotrosPage() {
  return (
    <>
      <FondoMalla />
      <Navbar />
      <main className="relative z-10">
        {/* Hero */}
        <section className="px-4 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Software, webs y automatización para negocios de{" "}
              <span className="bg-linear-to-r from-brand-sky to-brand-emerald bg-clip-text text-transparent">
                toda España
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Propus es una agencia de desarrollo de software e integraciones
              inteligentes. Creamos software de gestión para clínicas, webs con
              reservas y automatizaciones para que los negocios de toda España
              dejen de perder tiempo en tareas repetitivas y sean más
              eficientes, competitivos y rentables.
            </p>
          </div>
        </section>

        {/* Nuestra misión */}
        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
                Nuestra{" "}
                <span className="bg-linear-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
                  misión
                </span>
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Creemos que la inteligencia artificial no debería ser un
                privilegio de las grandes corporaciones. Nuestra misión es
                acercar los servicios de IA en toda España a
                empresas de cualquier tamaño, democratizando el acceso a
                tecnología que transforma negocios.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Nos especializamos en la automatización de procesos para pymes
                de toda España, diseñando soluciones a medida que
                eliminan tareas repetitivas y liberan a los equipos para que se
                concentren en lo que realmente importa: hacer crecer su negocio.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Como agencia de desarrollo de software e integraciones
                inteligentes, combinamos software de gestión, agentes
                inteligentes y consultoría estratégica para ofrecer un servicio
                completo, desde la idea hasta la implementación en producción.
              </p>
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
              Qué nos{" "}
              <span className="bg-linear-to-r from-brand-teal to-brand-green bg-clip-text text-transparent">
                diferencia
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {differentiators.map((item) => (
                <Card
                  key={item.title}
                  className="group border-border bg-card transition-all duration-300 hover:scale-105 hover:border-brand-teal/60 hover:bg-linear-to-br hover:from-brand-teal/20 hover:to-brand-green/20"
                >
                  <CardContent className="pt-6">
                    <item.icon className="mb-4 size-8 text-brand-teal transition-colors duration-300 group-hover:text-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section id="equipo" className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
                El equipo detrás{" "}
                <span className="bg-linear-to-r from-brand-sky to-brand-teal bg-clip-text text-transparent">
                  de Propus
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                Somos 2 emprendedores unidos por una misma misión: traer el
                poder de la IA a las empresas de nuestro país. Nacimos del hambre
                de ayudar a negocios a escalar, crecer y liberarse de cargas que,
                a día de hoy, son innecesarias.
              </p>
            </div>

            {/* Panel único */}
            <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
              {/* Header del panel */}
              <div className="border-b border-border bg-brand-teal/5 px-6 py-8 text-center md:px-10">
                <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                  <Users className="size-6 text-brand-teal" />
                  <span className="text-2xl font-bold tracking-tight">2 cofundadores</span>
                </div>
                <div className="mx-auto flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Rocket className="size-4 text-brand-teal" />
                  <span>Para toda España — construyendo el futuro de tu negocio</span>
                </div>
              </div>

              {/* Squads */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                {teamSquads.map((squad) => (
                  <div key={squad.label} className="p-6 md:p-10">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-brand-teal/10">
                        <squad.icon className="size-6 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{squad.label}</h3>
                        <p className="text-sm text-brand-teal">{squad.members} cofundadores</p>
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
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dónde estamos */}
        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">
              Trabajamos en remoto, con negocios de toda España
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-muted-foreground">
              Trabajamos en remoto desde España con negocios de todo el país.
              Nos coordinamos por videollamada y mensajería, así que da igual
              dónde estés: el trato es igual de cercano y personalizado.
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
            <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground/80">
              Propus es la marca comercial de Iberium Group LLC, con domicilio en
              1209 Mountain Road PL NE STE R, Albuquerque, New Mexico 87110, EE. UU.
            </p>
            <Button
              size="lg"
              className="bg-brand-emerald text-background font-semibold hover:bg-brand-teal"
              asChild
            >
              <Link href={rutaReservar}>Agendar llamada</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
