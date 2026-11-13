import { MdDesignServices } from "react-icons/md"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import ProjectsShowcase, { type ShowcaseProject } from "@/components/sections/ProjectsShowcase"
import type { Lang } from "@/lib/i18n/idiomas"

interface Textos {
  eyebrow: string
  title: string
  highlight: string
  description: string
  proyectos: [
    { description: string; tags: string[] },
    { description: string; tags: string[] },
    { description: string; tags: string[] },
    { description: string; tags: string[] },
    { description: string; tags: string[] },
  ]
}

const textos: Record<Lang, Textos> = {
  es: {
    eyebrow: "Diseño web a medida",
    title: "Landing pages que",
    highlight: "impresionan",
    description:
      "Diseñamos interfaces modernas, rápidas y a medida, pensadas para tu negocio. Una selección de los sitios que hemos creado para nuestros clientes.",
    proyectos: [
      {
        description:
          "Sitio Web para restaurante local con carta dinámica, animación de producto estrella y branding personalizado. Estilo oscuro y cálido, responsive completo y SEO optimizado.",
        tags: ["Astro", "TailwindCSS", "Lucide Icons", "Estilos Custom"],
      },
      {
        description:
          "Web para restaurante tradicional con alma moderna en plena Plaza Mayor. Carta personalizada, secciones diversas (especialidades, novedades, reservas y ubicación) y una estética cálida y elegante con reserva de mesa integrada.",
        tags: ["Next.js", "TailwindCSS", "Carta dinámica", "Reservas"],
      },
      {
        description:
          "App/landing para local de ocio nocturno y copas. Incluye un concurso de fotos con feed social y sistema de likes para votar, pensado en mobile-first para enganchar a su público más joven.",
        tags: ["Astro", "Supabase", "Mobile First", "Feed social", "Concurso de fotos"],
      },
      {
        description:
          "Portal de reservas para seis cabañas rurales en las Lagunas de Ruidera. Incluye panel de administración para autogestionar el blog y una app de calendario desarrollada por nosotros dentro del propio panel, vinculada a la web para controlar fechas, disponibilidad y reservas.",
        tags: ["Astro", "Panel admin", "Calendario propio", "Reservas", "SEO & AEO"],
      },
      {
        description:
          "Web para tienda local de chucherías, snacks y bebidas. Diseño moderno con animaciones y colores vibrantes, chatbot IA integrado, sección especial dedicada a eventos y formulario de encargos para Whatsapp.",
        tags: ["Astro", "Chatbot", "Animaciones", "Responsive"],
      },
    ],
  },
  en: {
    eyebrow: "Custom web design",
    title: "Landing pages that",
    highlight: "impress",
    description:
      "We design modern, fast, custom interfaces built around your business. A selection of the sites we've created for our clients.",
    proyectos: [
      {
        description:
          "Website for a local restaurant with a dynamic menu, a flagship product animation and custom branding. Dark, warm style, fully responsive and SEO-optimized.",
        tags: ["Astro", "TailwindCSS", "Lucide Icons", "Custom styles"],
      },
      {
        description:
          "Website for a traditional restaurant with a modern soul right on the Plaza Mayor. Custom menu, varied sections (specialties, news, bookings and location) and a warm, elegant look with built-in table booking.",
        tags: ["Next.js", "TailwindCSS", "Dynamic menu", "Bookings"],
      },
      {
        description:
          "App/landing page for a nightlife and cocktail venue. It includes a photo contest with a social feed and a like system for voting, designed mobile-first to hook its younger audience.",
        tags: ["Astro", "Supabase", "Mobile First", "Social feed", "Photo contest"],
      },
      {
        description:
          "Booking portal for six rural cabins in the Lagunas de Ruidera. It includes an admin panel to self-manage the blog and a calendar app developed by us inside the panel itself, linked to the website to control dates, availability and bookings.",
        tags: ["Astro", "Admin panel", "Custom calendar", "Bookings", "SEO & AEO"],
      },
      {
        description:
          "Website for a local sweet, snack and drinks shop. Modern design with animations and vibrant colors, a built-in AI chatbot, a special section dedicated to events and an order form for WhatsApp.",
        tags: ["Astro", "Chatbot", "Animations", "Responsive"],
      },
    ],
  },
}

// Lo que no depende del idioma: nombre, ancla, dirección, capturas.
const base: Omit<ShowcaseProject, "description" | "tags">[] = [
  {
    title: "El Rincón de Héctor",
    id: "el-rincon-de-hector",
    url: "https://elrincondehector.com",
    domain: "elrincondehector.com",
    image: "/img/landings/erdh-hero2.png",
  },
  {
    title: "El Casino",
    id: "casino-el-bonillo",
    url: "https://casinoelbonillo.com",
    domain: "casinoelbonillo.com",
    image: "/img/landings/hero-casino.png",
  },
  {
    title: "Lío Music Pub",
    id: "lio-el-bonillo",
    url: "https://liopub.com",
    domain: "liopub.com",
    image: "/img/landings/hero-lio-mobile.png",
    orientation: "mobile",
    extraImages: ["/img/landings/nacion-section.png"],
  },
  {
    title: "Cabañas El Acuífero",
    id: "cabanas-el-acuifero",
    url: "https://elacuifero.es",
    domain: "elacuifero.es",
    image: "/img/landings/acuiferohero.png",
  },
  {
    title: "Golosea",
    id: "golosea",
    url: "https://golosea.com",
    domain: "golosea.com",
    image: "/img/landings/golosea-hero2.png",
  },
]

/** Diseño web a medida, compartida por los dos idiomas. */
export default function DisenoWebPage({ lang }: { lang: Lang }) {
  const t = textos[lang]
  const projects: ShowcaseProject[] = base.map((proyecto, i) => ({
    ...proyecto,
    ...t.proyectos[i],
  }))

  return (
    <>
      <FondoMalla />
      <Navbar lang={lang} />
      <main>
        <ProjectsShowcase
          eyebrow={t.eyebrow}
          icon={<MdDesignServices className="size-3.5" />}
          title={t.title}
          highlight={t.highlight}
          description={t.description}
          projects={projects}
          lang={lang}
        />
      </main>
      <Footer lang={lang} />
    </>
  )
}
