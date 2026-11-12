import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema"
import { rutaReservar, siteUrl } from "@/lib/site"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Artículo no encontrado" }
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "es_ES",
      publishedTime: post.date,
    },
  }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    image: `${siteUrl}/favicons/android-chrome-512x512.png`,
    author: {
      "@type": "Organization",
      name: "Propus",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <FondoMalla />
      <Navbar />
      <main className="relative z-10">
        <article className="mx-auto max-w-3xl px-4 py-20 md:py-28">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-foreground">{post.title}</span>
          </nav>

          {/* Header */}
          <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
            {post.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="mb-10" />

          {/* Content */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-border bg-brand-teal/5 p-8 text-center">
            <h2 className="mb-3 text-xl font-semibold">
              ¿Quieres automatizar tu negocio?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Hablemos sobre cómo la IA puede transformar tu empresa. Sin
              compromiso.
            </p>
            <Button
              size="lg"
              className="bg-brand-emerald text-background font-semibold hover:bg-brand-teal"
              asChild
            >
              <Link href={rutaReservar}>Agendar llamada</Link>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
