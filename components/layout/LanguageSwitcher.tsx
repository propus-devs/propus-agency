"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { IDIOMAS, rutaEnOtroIdioma, type Lang } from "@/lib/i18n/idiomas"

const ETIQUETAS: Record<Lang, { corta: string; nombre: string }> = {
  es: { corta: "ES", nombre: "Español" },
  en: { corta: "EN", nombre: "English" },
}

/**
 * Selector de idioma del menú. Lleva a la misma página en el otro idioma; si no
 * existe allí (el blog y las legales, solo en español), a su portada. Con
 * tokens del tema, así vale en las páginas claras y en las oscuras.
 */
export default function LanguageSwitcher({
  lang,
  className,
}: {
  lang: Lang
  className?: string
}) {
  const pathname = usePathname()

  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Language" : "Idioma"}
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-foreground/5 p-0.5 text-xs font-semibold",
        className
      )}
    >
      {IDIOMAS.map((l) =>
        l === lang ? (
          <span
            key={l}
            aria-current="true"
            className="rounded-full bg-foreground px-2.5 py-1 text-background"
          >
            {ETIQUETAS[l].corta}
          </span>
        ) : (
          <Link
            key={l}
            href={rutaEnOtroIdioma(pathname ?? "/", l)}
            hrefLang={l}
            lang={l}
            title={ETIQUETAS[l].nombre}
            aria-label={ETIQUETAS[l].nombre}
            className="rounded-full px-2.5 py-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            {ETIQUETAS[l].corta}
          </Link>
        )
      )}
    </div>
  )
}
