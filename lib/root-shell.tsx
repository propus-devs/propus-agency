import type { Metadata, Viewport } from "next"
import { Instrument_Serif } from "next/font/google"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "next-themes"
import AuroraBackground from "@/components/ui/aurora-background"
import ServiceWorkerRegister from "@/components/pwa/service-worker-register"
import OrganizationSchema from "@/components/seo/OrganizationSchema"
import { siteUrl } from "@/lib/site"
import type { Lang } from "@/lib/i18n/idiomas"

/**
 * Armazón común de la web: fuentes, proveedores, fondo y metadatos globales.
 * Cada idioma tiene su propio layout raíz (app/(es)/layout.tsx y
 * app/en/layout.tsx) para que <html lang> salga bien en el HTML estático, y los
 * dos usan este módulo para no divergir.
 */

// Cuerpo de texto — Satoshi (Fontshare, auto-hospedada)
const satoshi = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
})

// Logo y títulos — Clash Display (Fontshare, auto-hospedada)
const clashDisplay = localFont({
  variable: "--font-heading",
  display: "swap",
  src: [
    { path: "../public/fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
})

// Display serif para mockups cinematográficos (sección de diseño web)
const instrumentSerif = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
})

// Posicionamiento: primero el software de gestión para clínicas (AutoClinic es
// la prioridad) y después las webs con reservas y la automatización documental.
// Sin sede ni ciudad: se trabaja en remoto para toda España y la base puede
// cambiar. Se definen una vez y se reutilizan en title, openGraph y twitter
// para que no diverjan.
const TEXTOS = {
  es: {
    titulo: "Propus · Software de gestión para clínicas y webs con reservas",
    descripcion:
      "Software de gestión para clínicas de podología, webs con pasarela de reservas y SEO, y automatización documental. Para negocios de toda España.",
    canonical: "/",
    locale: "es_ES",
  },
  en: {
    titulo: "Propus · Clinic management software and websites with booking",
    descripcion:
      "Management software for podiatry clinics, websites with a booking system and SEO, and document automation. For businesses across Spain.",
    canonical: "/en",
    locale: "en_US",
  },
} as const satisfies Record<Lang, { titulo: string; descripcion: string; canonical: string; locale: string }>

export function metadataRaiz(lang: Lang): Metadata {
  const t = TEXTOS[lang]
  return {
    metadataBase: new URL(siteUrl),
    title: {
      // La portada no define título propio, así que usa este default tal cual:
      // la plantilla de abajo solo se aplica a las páginas hijas.
      default: t.titulo,
      template: "%s — Propus",
    },
    description: t.descripcion,
    applicationName: "Propus",
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Propus",
    },
    formatDetection: { telephone: false },
    icons: {
      icon: "/favicons/favicon.ico",
      apple: "/favicons/apple-touch-icon.png",
      other: [
        { rel: "icon", url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { rel: "icon", url: "/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      ],
    },
    alternates: {
      canonical: t.canonical,
    },
    openGraph: {
      siteName: "Propus",
      type: "website",
      locale: t.locale,
      title: t.titulo,
      description: t.descripcion,
      // Imagen de la vista previa al compartir el enlace (WhatsApp, Telegram,
      // Slack, LinkedIn...). Sin esto, WhatsApp cae a un icono del sitio con
      // fondo transparente, que se ve mal contra su propio fondo blanco.
      images: [
        {
          url: "/img/og/propus-preview.jpg",
          width: 1200,
          height: 1200,
          alt: t.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.titulo,
      description: t.descripcion,
      images: ["/img/og/propus-preview.jpg"],
    },
  }
}

export const viewportRaiz: Viewport = {
  themeColor: "#0a0b0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export function RootShell({
  lang,
  children,
}: Readonly<{
  lang: Lang
  children: React.ReactNode
}>) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", satoshi.variable, clashDisplay.variable, instrumentSerif.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <OrganizationSchema lang={lang} />
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <AuroraBackground />
          {children}
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  )
}
