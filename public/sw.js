/* Service Worker de Propus PWA
 * Estrategias:
 *  - Navegación (HTML): network-first con fallback a caché y página offline.
 *  - Assets de build (_next/static): cache-first (son inmutables y versionados).
 *  - Imágenes y fuentes: stale-while-revalidate.
 *  - Resto de GET: network con fallback a caché.
 */

// v3: llega la versión en inglés (/en); al subir la versión, el navegador borra
// las cachés anteriores (ver "activate"). v2: el admin y la API quedan fuera de
// la caché.
const VERSION = "v3"
const PRECACHE = `propus-precache-${VERSION}`
const RUNTIME = `propus-runtime-${VERSION}`

// App shell y assets críticos para funcionar offline.
const PRECACHE_URLS = [
  "/",
  "/en",
  "/offline",
  "/manifest.webmanifest",
  "/favicons/favicon.ico",
  "/favicons/android-chrome-192x192.png",
  "/favicons/android-chrome-512x512.png",
  "/favicons/maskable-icon-512x512.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      // addAll falla en bloque si una URL falla; cacheamos de forma tolerante.
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: "reload" })))
        )
      )
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PRECACHE && key !== RUNTIME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

function isStaticAsset(url) {
  return url.pathname.startsWith("/_next/static/")
}

function isImageOrFont(request, url) {
  return (
    request.destination === "image" ||
    request.destination === "font" ||
    /\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?)$/i.test(url.pathname)
  )
}

self.addEventListener("fetch", (event) => {
  const { request } = event

  // Solo gestionamos GET del mismo origen.
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // El admin y la API llevan datos de clientes (nombres, correos) y cambian en
  // cada petición: no se guardan en la caché del navegador ni se sirven de ella.
  const p = url.pathname
  if (p === "/admin" || p.startsWith("/admin/") || p === "/api" || p.startsWith("/api/")) return

  // 1) Navegación (documentos HTML): network-first.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(RUNTIME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          return cached || (await caches.match("/offline")) || (await caches.match("/"))
        })
    )
    return
  }

  // 2) Assets de build: cache-first.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone()
            caches.open(RUNTIME).then((cache) => cache.put(request, copy))
            return response
          })
      )
    )
    return
  }

  // 3) Imágenes y fuentes: stale-while-revalidate.
  if (isImageOrFont(request, url)) {
    event.respondWith(
      caches.open(RUNTIME).then(async (cache) => {
        const cached = await cache.match(request)
        const network = fetch(request)
          .then((response) => {
            cache.put(request, response.clone())
            return response
          })
          .catch(() => cached)
        return cached || network
      })
    )
    return
  }

  // 4) Resto: network con fallback a caché.
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(RUNTIME).then((cache) => cache.put(request, copy))
        return response
      })
      .catch(() => caches.match(request))
  )
})
