import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { siteUrl } from "@/lib/site"
import { RUTAS, type PaginaClave } from "@/lib/i18n/idiomas"

const BASE_URL = siteUrl

// Fecha de la última modificación REAL de cada página. Se cambia a mano cuando
// la página cambia de verdad (contenido, no un retoque de estilo). Con
// `new Date()` cada despliegue anunciaba a Google que todas las páginas habían
// cambiado ese día, y Google acaba ignorando un lastmod que no es fiable.
// Si una página nueva no tiene fecha aquí, ponle la del día en que se publica.
const MODIFICADO = {
  home: "2026-11-09",
  autoclinic: "2026-11-10", // /servicios/autoclinic (antes /proyectos/agente-whatsapp; sin calculadora)
  ruralprop: "2026-11-10", // /servicios/ruralprop (nueva)
  disenoWeb: "2026-11-10", // /servicios/diseno-web-a-medida (antes /proyectos/web-design)
  facturia: "2026-07-30", // /servicios/facturia (antes /proyectos/facturia)
  sobreNosotros: "2026-11-09",
  reservar: "2026-11-12", // /reservar (nueva; sustituye a la agenda de Google)
  blog: "2026-11-09",
  legal: "2026-10-28", // privacidad, términos, cookies y eliminación de datos
  // Versión en inglés (/en/…): se publicó el 2026-11-13 con el mismo contenido que el español.
  ingles: "2026-11-13",
} as const

type Entrada = MetadataRoute.Sitemap[number]

/**
 * Las páginas que existen en español e inglés salen dos veces (una por idioma) y
 * cada entrada declara a su pareja en `alternates` (hreflang). El blog y las
 * legales solo existen en español y van sin pareja, más abajo.
 */
function conPareja(
  clave: PaginaClave,
  modificadoEs: string,
  frecuencia: Entrada["changeFrequency"],
  prioridad: number
): Entrada[] {
  const es = `${BASE_URL}${RUTAS[clave].es === "/" ? "" : RUTAS[clave].es}`
  const en = `${BASE_URL}${RUTAS[clave].en}`
  const alternates = { languages: { es, en, "x-default": es } }
  return [
    { url: es, lastModified: modificadoEs, changeFrequency: frecuencia, priority: prioridad, alternates },
    { url: en, lastModified: MODIFICADO.ingles, changeFrequency: frecuencia, priority: prioridad, alternates },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...conPareja("inicio", MODIFICADO.home, "weekly", 1),
    ...conPareja("autoclinic", MODIFICADO.autoclinic, "monthly", 0.9),
    ...conPareja("ruralprop", MODIFICADO.ruralprop, "monthly", 0.9),
    ...conPareja("disenoWeb", MODIFICADO.disenoWeb, "monthly", 0.8),
    ...conPareja("facturia", MODIFICADO.facturia, "monthly", 0.7),
    ...conPareja("reservar", MODIFICADO.reservar, "monthly", 0.8),
    ...conPareja("sobreNosotros", MODIFICADO.sobreNosotros, "monthly", 0.6),
    {
      url: `${BASE_URL}/blog`,
      lastModified: MODIFICADO.blog,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/legal/privacidad`,
      lastModified: MODIFICADO.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/legal/terminos`,
      lastModified: MODIFICADO.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/legal/cookies`,
      lastModified: MODIFICADO.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/legal/eliminacion-de-datos`,
      lastModified: MODIFICADO.legal,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // /blog/pagina/N no entra: son listados de navegación sin contenido propio.
  // Las páginas siguen existiendo y Google llega a ellas desde la paginación de
  // /blog; los artículos, que es lo que importa, van todos arriba.
  return [...staticRoutes, ...postRoutes]
}
