import type { Metadata } from "next"
import { MdDesignServices } from "react-icons/md"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ProjectsShowcase, { type ShowcaseProject } from "@/components/sections/ProjectsShowcase"

export const metadata: Metadata = {
  title: "Portfolio de diseño y desarrollo web a medida",
  description:
    "Selección de landing pages y diseños web creados por Propus: interfaces modernas, rápidas y orientadas a conversión para negocios de toda España.",
  alternates: {
    canonical: "/proyectos/web-design",
  },
  openGraph: {
    title: "Portfolio de diseño y desarrollo web a medida — Propus",
    description:
      "Selección de landing pages y diseños web creados por Propus.",
    type: "website",
    locale: "es_ES",
  },
}

const projects: ShowcaseProject[] = [
  {
    title: "El Rincón de Héctor",
    id: "el-rincon-de-hector",
    url: "https://elrincondehector.com",
    domain: "elrincondehector.com",
    description:
      "Sitio Web para restaurante local con carta dinámica, animación de producto estrella y branding personalizado. Estilo oscuro y cálido, responsive completo y SEO optimizado.",
    tags: ["Astro", "TailwindCSS", "Lucide Icons", "Estilos Custom"],
    image: "/img/landings/erdh-hero2.png",
  },
  {
    title: "El Casino",
    id: "casino-el-bonillo",
    url: "https://casinoelbonillo.com",
    domain: "casinoelbonillo.com",
    description:
      "Web para restaurante tradicional con alma moderna en plena Plaza Mayor. Carta personalizada, secciones diversas (especialidades, novedades, reservas y ubicación) y una estética cálida y elegante con reserva de mesa integrada.",
    tags: ["Next.js", "TailwindCSS", "Carta dinámica", "Reservas"],
    image: "/img/landings/hero-casino.png",
  },
  {
    title: "Lío Music Pub",
    id: "lio-el-bonillo",
    url: "https://liopub.com",
    domain: "liopub.com",
    description:
      "App/landing para local de ocio nocturno y copas. Incluye un concurso de fotos con feed social y sistema de likes para votar, pensado en mobile-first para enganchar a su público más joven.",
    tags: ["Astro", "Supabase", "Mobile First", "Feed social", "Concurso de fotos"],
    image: "/img/landings/hero-lio-mobile.png",
    orientation: "mobile",
    extraImages: ["/img/landings/nacion-section.png"],
  },
  {
    title: "Cabañas El Acuífero",
    id: "cabanas-el-acuifero",
    url: "https://elacuifero.es",
    domain: "elacuifero.es",
    description:
      "Portal de reservas para seis cabañas rurales en las Lagunas de Ruidera. Incluye panel de administración para autogestionar el blog y una app de calendario desarrollada por nosotros dentro del propio panel, vinculada a la web para controlar fechas, disponibilidad y reservas.",
    tags: ["Astro", "Panel admin", "Calendario propio", "Reservas", "SEO & AEO"],
    image: "/img/landings/acuiferohero.png",
  },
  {
    title: "Golosea",
    id: "golosea",
    url: "https://golosea.com",
    domain: "golosea.com",
    description:
      "Web para tienda local de chucherías, snacks y bebidas. Diseño moderno con animaciones y colores vibrantes, chatbot IA integrado, sección especial dedicada a eventos y formulario de encargos para Whatsapp.",
    tags: ["Astro", "Chatbot", "Animaciones", "Responsive"],
    image: "/img/landings/golosea-hero2.png",
  },
]

export default function WebDesignPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectsShowcase
          eyebrow="Web Design"
          icon={<MdDesignServices className="size-3.5" />}
          title="Landing pages que"
          highlight="impresionan"
          description="Diseñamos interfaces modernas, rápidas y a medida. Una selección de los sitios que hemos creado para nuestros clientes."
          projects={projects}
        />
      </main>
      <Footer />
    </>
  )
}
