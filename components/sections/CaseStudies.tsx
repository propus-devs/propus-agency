"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import LanyardRail, { type LanyardItem } from "@/components/ui/lanyard-rail"
import { useInView } from "@/lib/use-in-view"
import { cn } from "@/lib/utils"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

type Caso = {
  id: string
  /** Texto de la etiqueta del panel de detalle. */
  sector: string
  /** Tarjeta colgante: nombre, rubro y línea en versalitas. */
  nombre: string
  rubro: string
  etiqueta: string
  /** Reverso de la tarjeta: una frase corta (máx. ~75 caracteres) y hasta 3 chips. */
  resumen: string
  tags: string[]
  imagen: string
  url: string
  /** Ancla dentro de la página de diseño web a medida */
  ancla: string
  problema: string
  solucion: string
  resultado: string
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  railLabel: string
  railCaption: string
  railLabels: { flip: string; back: string; show: string }
  verCaso: string
  problema: string
  solucion: string
  resultado: string
  casos: Caso[]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Resultados",
    titulo: ["Clientes que ya ", "confían en nosotros"],
    subtitulo:
      "Empresas que ya trabajan con Propus y han transformado su presencia digital en semanas.",
    railLabel: "Casos de clientes de Propus",
    railCaption: "Elige una tarjeta para ver el caso completo.",
    railLabels: {
      flip: "Pulsa la tarjeta para girarla",
      back: "Pulsa de nuevo (o Esc) para volver",
      show: "Ver",
    },
    verCaso: "Ver caso",
    problema: "Problema",
    solucion: "Solución",
    resultado: "Resultado",
    casos: [
      {
        id: "el-rincon-de-hector",
        sector: "Restaurante · El Rincón de Héctor",
        nombre: "El Rincón de Héctor",
        rubro: "Restaurante",
        etiqueta: "Web a medida",
        resumen: "Imagen de alto standing y visitantes extranjeros que llegan desde Google.",
        tags: ["A medida", "SEO", "Carta"],
        imagen: "/img/landings/erdh-hero2.png",
        url: "elrincondehector.com",
        ancla: "el-rincon-de-hector",
        problema:
          "Contaba con una web obsoleta construida en Wix que únicamente mostraba la carta, sin actualizar y con una imagen que no hacía justicia al nivel real del restaurante.",
        solucion:
          "Página web diseñada completamente a medida, con una estética elegante y diferenciadora, carta renovada y arquitectura preparada para escalar a una web app de pedidos.",
        resultado:
          "Los clientes perciben el restaurante como un local de alto standing. Gracias al SEO integrado, los visitantes extranjeros encuentran la web en las primeras posiciones del buscador.",
      },
      {
        id: "casino-el-bonillo",
        sector: "Restaurante · Casino El Bonillo",
        nombre: "Casino El Bonillo",
        rubro: "Bar-restaurante",
        etiqueta: "Web + reservas",
        resumen: "Reservas desde el primer día y un flujo constante de reseñas positivas.",
        tags: ["Reservas", "SEO", "Reseñas"],
        imagen: "/img/landings/hero-casino.png",
        url: "casinoelbonillo.com",
        ancla: "casino-el-bonillo",
        problema:
          "El bar-restaurante más céntrico del pueblo no tenía web propia, perdiendo visibilidad y reservas online.",
        solucion:
          "Web profesional con carta cuidada, SEO básico, formulario de reservas y un pop-up que dirige a Google Maps para captar reseñas.",
        resultado:
          "Reservas entrando desde el primer día y un flujo constante de nuevas valoraciones positivas que refuerzan su reputación.",
      },
      {
        id: "lio-el-bonillo",
        sector: "Ocio nocturno · Lío El Bonillo",
        nombre: "Lío El Bonillo",
        rubro: "Ocio nocturno",
        etiqueta: "Web + web app",
        resumen: "Web de fiestas con app de fotos y premios; el tráfico crece cada semana.",
        tags: ["Web app", "Eventos", "Google Maps"],
        imagen: "/img/landings/hero-lio-mobile.png",
        url: "liopub.com",
        ancla: "lio-el-bonillo",
        problema:
          "El disco pub referente de la zona no aparecía ni en Google Maps y carecía de canal para promocionar sus fiestas.",
        solucion:
          "Web vistosa para sus eventos + web app donde los asistentes suben fotos cada finde, votan y ganan premios semanales. Creamos también su ficha de Google.",
        resultado:
          "Tráfico creciendo de forma exponencial cada semana y una comunidad activa que llena las fiestas.",
      },
      {
        id: "cabanas-el-acuifero",
        sector: "Turismo rural · Cabañas El Acuífero",
        nombre: "Cabañas El Acuífero",
        rubro: "Turismo rural",
        etiqueta: "Portal reservas",
        resumen: "De la agenda telefónica a su propia pasarela de reservas online.",
        tags: ["Reservas", "Panel admin", "SEO y AEO"],
        imagen: "/img/landings/acuiferohero.png",
        url: "elacuifero.es",
        ancla: "cabanas-el-acuifero",
        problema:
          "José gestionaba las reservas de sus seis cabañas en la carretera de Ruidera únicamente por teléfono y boca a boca, sin web ni calendario: dependía de conocidos y anotaba las fechas a mano.",
        solucion:
          "Portal de reservas propio con panel de administración para autogestionar el blog y una app de calendario que le construimos dentro del panel, vinculada a la web para controlar disponibilidad y fechas. Todo con SEO y AEO trabajados.",
        resultado:
          "Pasa de la agenda telefónica a su propia pasarela de reservas abierta a cualquier viajero, y empieza a aparecer como recomendación de alojamiento en Ruidera cuando se pregunta a los asistentes de IA.",
      },
      {
        id: "golosea",
        sector: "Golosinas y snacks · Golosea",
        nombre: "Golosea",
        rubro: "Golosinas y snacks",
        etiqueta: "Landing + IA",
        resumen: "Landing con agente de IA que capta clientes en los días clave.",
        tags: ["Agente IA", "Reservas", "Festivos"],
        imagen: "/img/landings/golosea-hero2.png",
        url: "golosea.com",
        ancla: "golosea",
        problema:
          "Arrastraba una web del Kit Digital pobre, mal estructurada, con exceso de texto y reseñas falsas.",
        solucion:
          "La convertimos en una landing potente con agente de IA, formulario de reserva de cucuruchos para cumpleaños, sección de festivos y contador de visitas público.",
        resultado:
          "Capta clientes en los días clave del calendario y luce como la mejor web de golosinas de la comarca.",
      },
    ],
  },
  en: {
    etiqueta: "Results",
    titulo: ["Clients who already ", "trust us"],
    subtitulo:
      "Companies that already work with Propus and have transformed their digital presence in weeks.",
    railLabel: "Propus client cases",
    railCaption: "Pick a card to see the full case.",
    railLabels: {
      flip: "Tap the card to flip it",
      back: "Tap again (or Esc) to go back",
      show: "Show",
    },
    verCaso: "View case",
    problema: "Problem",
    solucion: "Solution",
    resultado: "Result",
    casos: [
      {
        id: "el-rincon-de-hector",
        sector: "Restaurant · El Rincón de Héctor",
        nombre: "El Rincón de Héctor",
        rubro: "Restaurant",
        etiqueta: "Custom website",
        resumen: "A high-end image and foreign visitors who arrive from Google.",
        tags: ["Custom", "SEO", "Menu"],
        imagen: "/img/landings/erdh-hero2.png",
        url: "elrincondehector.com",
        ancla: "el-rincon-de-hector",
        problema:
          "It had an outdated website built on Wix that only showed the menu, was never updated and had an image that didn't do justice to the restaurant's real standard.",
        solucion:
          "A fully custom-designed website with an elegant, distinctive look, a renewed menu and an architecture ready to scale up to an ordering web app.",
        resultado:
          "Customers see the restaurant as a high-end venue. Thanks to the built-in SEO, foreign visitors find the website among the top search results.",
      },
      {
        id: "casino-el-bonillo",
        sector: "Restaurant · Casino El Bonillo",
        nombre: "Casino El Bonillo",
        rubro: "Bar-restaurant",
        etiqueta: "Website + bookings",
        resumen: "Bookings from day one and a steady flow of positive reviews.",
        tags: ["Bookings", "SEO", "Reviews"],
        imagen: "/img/landings/hero-casino.png",
        url: "casinoelbonillo.com",
        ancla: "casino-el-bonillo",
        problema:
          "The most central bar-restaurant in town had no website of its own, losing visibility and online bookings.",
        solucion:
          "A professional website with a carefully designed menu, basic SEO, a booking form and a pop-up that sends visitors to Google Maps to collect reviews.",
        resultado:
          "Bookings coming in from day one and a steady flow of new positive ratings that strengthen its reputation.",
      },
      {
        id: "lio-el-bonillo",
        sector: "Nightlife · Lío El Bonillo",
        nombre: "Lío El Bonillo",
        rubro: "Nightlife",
        etiqueta: "Website + web app",
        resumen: "A party website with a photo and prizes app; traffic grows every week.",
        tags: ["Web app", "Events", "Google Maps"],
        imagen: "/img/landings/hero-lio-mobile.png",
        url: "liopub.com",
        ancla: "lio-el-bonillo",
        problema:
          "The area's leading nightclub didn't even appear on Google Maps and had no channel to promote its parties.",
        solucion:
          "A striking website for its events plus a web app where guests upload photos every weekend, vote and win weekly prizes. We also created its Google listing.",
        resultado:
          "Traffic growing exponentially every week and an active community that fills the parties.",
      },
      {
        id: "cabanas-el-acuifero",
        sector: "Rural tourism · Cabañas El Acuífero",
        nombre: "Cabañas El Acuífero",
        rubro: "Rural tourism",
        etiqueta: "Booking portal",
        resumen: "From the phone diary to its own online booking system.",
        tags: ["Bookings", "Admin panel", "SEO & AEO"],
        imagen: "/img/landings/acuiferohero.png",
        url: "elacuifero.es",
        ancla: "cabanas-el-acuifero",
        problema:
          "José managed the bookings for his six cabins on the road to Ruidera only by phone and word of mouth, with no website or calendar: he relied on acquaintances and wrote the dates down by hand.",
        solucion:
          "Its own booking portal with an admin panel to self-manage the blog, plus a calendar app we built inside the panel and linked to the website to control availability and dates. All with SEO and AEO done properly.",
        resultado:
          "It goes from the phone diary to its own booking system open to any traveler, and is starting to appear as an accommodation recommendation in Ruidera when AI assistants are asked.",
      },
      {
        id: "golosea",
        sector: "Sweets and snacks · Golosea",
        nombre: "Golosea",
        rubro: "Sweets and snacks",
        etiqueta: "Landing + AI",
        resumen: "A landing page with an AI agent that wins customers on key dates.",
        tags: ["AI agent", "Bookings", "Holidays"],
        imagen: "/img/landings/golosea-hero2.png",
        url: "golosea.com",
        ancla: "golosea",
        problema:
          "It was stuck with a poor, badly structured website from the Kit Digital programme, with too much text and fake reviews.",
        solucion:
          "We turned it into a powerful landing page with an AI agent, a candy-cone booking form for birthdays, a holidays section and a public visit counter.",
        resultado:
          "It wins customers on the key dates of the calendar and looks like the best sweet-shop website in the area.",
      },
    ],
  },
}

// Fuera del componente para que la referencia sea estable (el carril recalcula
// su geometría cuando cambia `items`).
function crearItems(lang: Lang): LanyardItem[] {
  const t = textos[lang]
  return t.casos.map((c, i) => ({
    id: c.id,
    name: c.nombre,
    role: c.rubro,
    team: c.etiqueta,
    tone: ((i % 5) + 1) as LanyardItem["tone"],
    image: c.imagen,
    bio: c.resumen,
    tags: c.tags,
    links: [{ label: t.verCaso, href: `${ruta("disenoWeb", lang)}#${c.ancla}` }],
  }))
}

const itemsPorIdioma: Record<Lang, LanyardItem[]> = {
  es: crearItems("es"),
  en: crearItems("en"),
}

export default function CaseStudies({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]
  const cases = t.casos
  const items = itemsPorIdioma[lang]

  const [active, setActive] = useState<number | null>(null)
  const [flipped, setFlipped] = useState<number | null>(null)
  // Caso cuyo detalle se muestra: el último que se ha tocado/pasado por encima.
  const [shown, setShown] = useState(0)
  // La animación automática arranca la primera vez que la sección se ve y no se
  // reinicia después (en cuanto el visitante interactúa, el carril la detiene).
  const [started, setStarted] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>("-15% 0px")
  if (inView && !started) setStarted(true)

  function alCambiarActiva(index: number | null) {
    setActive(index)
    if (index !== null) setShown(index)
  }

  function alCambiarGirada(index: number | null) {
    setFlipped(index)
    if (index !== null) setShown(index)
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Glow decorativo de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 -z-0 h-[500px] w-[900px] max-w-full -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(168 80% 45% / 0.10), transparent 65%)",
        }}
      />

      {/* El ancla va en la cabecera y no en la sección: así, al venir de
          «Resultados» en el menú, el navegador deja la cabecera justo bajo la
          barra (80 px de scroll-padding global + 12 px) en vez de dejarla
          ~190 px más abajo por culpa del padding de la sección, y el carril
          entra entero en pantalla. */}
      <div
        id="resultados"
        className="relative mx-auto max-w-5xl scroll-mt-3 px-4"
      >
        {/* Cabecera */}
        <div className="mb-2 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-brand-sky to-brand-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-balance text-muted-foreground">{t.subtitulo}</p>
        </div>
      </div>

      <div ref={ref} className="relative">
        {/* Carril de tarjetas: en escritorio caben todas; en móvil, una al centro y las vecinas a los lados */}
        <LanyardRail
          items={items}
          label={t.railLabel}
          caption={t.railCaption}
          labels={t.railLabels}
          showName={false}
          autoplay={started}
          interval={3600}
          active={active}
          onActiveChange={alCambiarActiva}
          flipped={flipped}
          onFlippedChange={alCambiarGirada}
        />

        {/* Detalle legible del caso elegido. Todos comparten celda para que la
            altura sea la del más largo y no haya saltos al cambiar de caso. */}
        <div className="relative mx-auto grid max-w-5xl px-4">
          {cases.map((c, i) => (
            <article
              key={c.id}
              aria-hidden={i !== shown}
              inert={i !== shown}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none",
                i === shown ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Detalle c={c} t={t} lang={lang} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Detalle({ c, t, lang }: { c: Caso; t: Textos; lang: Lang }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-6 rounded-2xl p-6 md:p-8",
        "vidrio border"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="inline-flex w-fit items-center rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1 text-xs font-medium text-brand-teal">
            {c.sector}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{c.url}</span>
        </div>
        <Link
          href={`${ruta("disenoWeb", lang)}#${c.ancla}`}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal"
        >
          {t.verCaso}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        <Paso
          label={t.problema}
          color="text-red-700"
          barra="border-red-600/40"
          text={c.problema}
        />
        <Paso
          label={t.solucion}
          color="text-brand-sky"
          barra="border-brand-sky/40"
          text={c.solucion}
        />
        <Paso
          label={t.resultado}
          color="text-brand-teal"
          barra="border-brand-teal/60"
          text={c.resultado}
          highlight
        />
      </div>
    </div>
  )
}

function Paso({
  label,
  color,
  barra,
  text,
  highlight,
}: {
  label: string
  color: string
  barra: string
  text: string
  highlight?: boolean
}) {
  return (
    <div className={cn("flex flex-col gap-2 border-t-2 pt-3", barra)}>
      <span
        className={cn("text-xs font-semibold uppercase tracking-wide", color)}
      >
        {label}
      </span>
      <p
        className={cn(
          "text-sm leading-relaxed md:text-[0.9375rem]",
          highlight ? "font-semibold text-foreground" : "text-muted-foreground"
        )}
      >
        {text}
      </p>
    </div>
  )
}
