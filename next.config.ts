import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // El optimizador cachea por URL, no por contenido: si reemplazas una
    // captura sin renombrarla, en dev seguirías viendo la vieja durante las
    // 4 h del TTL por defecto. En producción sí queremos ese TTL.
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 14400,
  },
  // Migración a propus.es: el dominio antiguo y el www redirigen (308) al
  // canónico conservando ruta y query string. /api queda fuera para que un
  // webhook o cualquier endpoint no reciba nunca un 3xx. No se filtra por
  // propus.es ni por el dominio interno de EasyPanel: ahí no hay redirección.
  // El destino va fijo y no sale de NEXT_PUBLIC_SITE_URL: si esa variable
  // apuntase a un host redirigido, se crearía un bucle.
  async redirects() {
    const sinApi = "/:path((?!api(?:/|$)).*)";
    return [
      {
        source: sinApi,
        has: [{ type: "host" as const, value: "(www\\.)?propus\\.ink" }],
        destination: "https://propus.es/:path",
        permanent: true,
      },
      {
        source: sinApi,
        has: [{ type: "host" as const, value: "www\\.propus\\.es" }],
        destination: "https://propus.es/:path",
        permanent: true,
      },
      // Reordenación de URLs (una por intención de búsqueda, en español).
      // `permanent: true` responde 308, que Google trata igual que un 301.
      // Las rutas viejas siguen existiendo en buscadores y en enlaces externos:
      // no quitar estas redirecciones.
      { source: "/proyectos/agente-whatsapp", destination: "/servicios/autoclinic", permanent: true },
      { source: "/proyectos/facturia", destination: "/servicios/facturia", permanent: true },
      { source: "/proyectos/web-design", destination: "/servicios/diseno-web-a-medida", permanent: true },
      // La página de clínicas desapareció: lo que ofrecemos a las clínicas es AutoClinic.
      { source: "/soluciones/clinicas", destination: "/servicios/autoclinic", permanent: true },
      { source: "/servicios/diseno-web-clinicas", destination: "/servicios/diseno-web-a-medida", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Escena 3D auto-hospedada: contenido inmutable (si cambia, se renombra)
        source: "/spline/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
