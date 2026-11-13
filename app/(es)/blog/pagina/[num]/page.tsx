import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DESCRIPCION_BLOG, getPostsByPage, getTotalPages } from "@/lib/blog"
import BlogList from "@/components/sections/blog/BlogList"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

/**
 * Páginas 2..N del listado. La página 1 vive en /blog, así que aquí solo se
 * generan de la 2 en adelante: tener /blog y /blog/pagina/1 con el mismo
 * contenido sería contenido duplicado.
 */
export function generateStaticParams() {
  const total = getTotalPages()
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    num: String(i + 2),
  }))
}

function parsePage(num: string): number | null {
  // Solo dígitos: descarta "01", "2abc" o negativos, que crearían URLs
  // distintas con el mismo contenido.
  if (!/^[1-9][0-9]*$/.test(num)) return null
  const page = Number(num)
  if (page < 2 || page > getTotalPages()) return null
  return page
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ num: string }>
}): Promise<Metadata> {
  const { num } = await params
  const page = parsePage(num)
  if (!page) return { title: "Página no encontrada" }

  return {
    title: `Blog — Página ${page}`,
    description: `${DESCRIPCION_BLOG} Página ${page} de ${getTotalPages()}.`,
    alternates: {
      canonical: `/blog/pagina/${page}`,
    },
    openGraph: {
      title: `Blog — Propus (página ${page})`,
      description: DESCRIPCION_BLOG,
      type: "website",
      locale: "es_ES",
    },
  }
}

export default async function BlogPaginaPage({
  params,
}: {
  params: Promise<{ num: string }>
}) {
  const { num } = await params
  const page = parsePage(num)

  if (!page) notFound()

  const posts = getPostsByPage(page)
  if (posts.length === 0) notFound()

  return (
    <>
      <FondoMalla />
      <Navbar />
      <main className="relative z-10">
        <section className="px-4 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Blog de{" "}
              <span className="bg-gradient-to-r from-brand-teal to-brand-lime bg-clip-text text-transparent">
                Propus
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Ideas, guías y casos prácticos sobre inteligencia artificial,
              automatización y transformación digital para negocios de toda
              España.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Página {page} de {getTotalPages()}
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <BlogList posts={posts} page={page} totalPages={getTotalPages()} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
