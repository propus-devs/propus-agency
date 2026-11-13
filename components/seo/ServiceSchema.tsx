import { siteUrl } from "@/lib/site"
import type { Lang } from "@/lib/i18n/idiomas"

interface ServiceSchemaProps {
  name: string
  description: string
  serviceType: string
  lang?: Lang
}

const PAIS: Record<Lang, string> = { es: "España", en: "Spain" }

export default function ServiceSchema({ name, description, serviceType, lang = "es" }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: "Propus",
      url: siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: PAIS[lang],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
