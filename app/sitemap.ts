import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { siteUrl } from "@/lib/site"

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
  blog: "2026-11-09",
  legal: "2026-10-28", // privacidad, términos, cookies y eliminación de datos
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: MODIFICADO.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/servicios/autoclinic`,
      lastModified: MODIFICADO.autoclinic,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/ruralprop`,
      lastModified: MODIFICADO.ruralprop,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/diseno-web-a-medida`,
      lastModified: MODIFICADO.disenoWeb,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicios/facturia`,
      lastModified: MODIFICADO.facturia,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sobre-nosotros`,
      lastModified: MODIFICADO.sobreNosotros,
      changeFrequency: "monthly",
      priority: 0.6,
    },
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
