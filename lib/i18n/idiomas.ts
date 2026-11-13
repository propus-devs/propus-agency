/**
 * Idiomas de la web y tabla de rutas entre ellos. No importa nada de Next para
 * poder probarse con `node --test`.
 *
 * El español es el idioma de origen y vive en la raíz (`/servicios/…`), con las
 * URLs de siempre. El inglés cuelga de `/en` y tiene sus propios nombres
 * (`/en/services/…`). Solo existen en inglés las páginas de esta tabla: el blog
 * y las páginas legales se quedan en español.
 */

export type Lang = "es" | "en"

export const IDIOMAS: readonly Lang[] = ["es", "en"]

/** Páginas que existen en los dos idiomas. */
export type PaginaClave =
  | "inicio"
  | "autoclinic"
  | "ruralprop"
  | "disenoWeb"
  | "facturia"
  | "sobreNosotros"
  | "reservar"

export const RUTAS: Record<PaginaClave, Record<Lang, string>> = {
  inicio: { es: "/", en: "/en" },
  autoclinic: { es: "/servicios/autoclinic", en: "/en/services/autoclinic" },
  ruralprop: { es: "/servicios/ruralprop", en: "/en/services/ruralprop" },
  disenoWeb: { es: "/servicios/diseno-web-a-medida", en: "/en/services/custom-web-design" },
  facturia: { es: "/servicios/facturia", en: "/en/services/facturia" },
  sobreNosotros: { es: "/sobre-nosotros", en: "/en/about-us" },
  reservar: { es: "/reservar", en: "/en/book-a-call" },
}

/** Ruta de una página en un idioma. */
export function ruta(clave: PaginaClave, lang: Lang): string {
  return RUTAS[clave][lang]
}

/** Idioma de una ruta: todo lo que cuelga de `/en` es inglés; lo demás, español. */
export function idiomaDeRuta(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es"
}

function normalizar(pathname: string): string {
  const sinAncla = pathname.split("#")[0].split("?")[0]
  return sinAncla.length > 1 ? sinAncla.replace(/\/+$/, "") : sinAncla || "/"
}

/** Página (de la tabla) a la que corresponde una ruta, o null si no tiene pareja. */
export function claveDeRuta(pathname: string): PaginaClave | null {
  const limpia = normalizar(pathname)
  for (const clave of Object.keys(RUTAS) as PaginaClave[]) {
    const r = RUTAS[clave]
    if (r.es === limpia || r.en === limpia) return clave
  }
  return null
}

/**
 * Dónde lleva el selector de idioma. A la misma página en el otro idioma; si la
 * página no existe en ese idioma (el blog y las legales, solo en español), a su
 * portada.
 */
export function rutaEnOtroIdioma(pathname: string, destino: Lang): string {
  const clave = claveDeRuta(pathname)
  return clave ? ruta(clave, destino) : ruta("inicio", destino)
}

/** Para `alternates.languages` de los metadatos (hreflang). */
export function alternas(clave: PaginaClave): Record<Lang | "x-default", string> {
  return { es: ruta(clave, "es"), en: ruta(clave, "en"), "x-default": ruta(clave, "es") }
}
