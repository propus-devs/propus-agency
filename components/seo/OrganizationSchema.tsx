import { contact, siteUrl } from "@/lib/site"
import type { Lang } from "@/lib/i18n/idiomas"

const DESCRIPCION: Record<Lang, string> = {
  es: "Software de gestión para clínicas de podología, webs con pasarela de reservas y SEO, y automatización documental para negocios de toda España.",
  en: "Management software for podiatry clinics, websites with a booking system and SEO, and document automation for businesses across Spain.",
}

const AREA: Record<Lang, string> = { es: "España", en: "Spain" }

/**
 * Organization y no LocalBusiness ni ProfessionalService: esos dos esperan una
 * dirección física, y Propus no tiene local abierto al público. Por eso aquí
 * no va `address` ni `geo` — solo el ámbito en el que trabaja.
 */
export default function OrganizationSchema({ lang = "es" }: { lang?: Lang }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Propus",
    url: siteUrl,
    logo: `${siteUrl}/favicons/android-chrome-512x512.png`,
    description: DESCRIPCION[lang],
    // Solo el país: Propus no declara sede ni base geográfica (puede cambiar
    // y no se quiere reforzar un vínculo local). Los clientes de Albacete son
    // prueba social, no el ámbito de actuación.
    areaServed: { "@type": "Country", name: AREA[lang] },
    email: contact.email,
    telephone: contact.phone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: contact.phone,
        email: contact.email,
        availableLanguage: ["es", "en"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/propus_nation",
      "https://www.facebook.com/propusnation",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
