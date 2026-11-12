import type { Metadata } from "next"
import { contact } from "@/lib/site"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies de Propus. Información sobre las cookies que utilizamos y cómo gestionarlas.",
  alternates: {
    canonical: "/legal/cookies",
  },
}

export default function CookiesPage() {
  return (
    <article>
      <h1 className="mb-6 text-3xl font-semibold md:text-4xl">
        Política de Cookies
      </h1>

      <p className="mb-4 leading-relaxed text-muted-foreground">
        Esta política explica qué son las cookies y qué tecnologías de
        almacenamiento utiliza este sitio web. Queremos ser precisos:{" "}
        <strong className="text-foreground">
          propus.es no instala cookies propias ni de terceros
        </strong>{" "}
        y no utiliza herramientas de analítica, de perfilado ni de publicidad.
        Únicamente empleamos el almacenamiento local de tu navegador para
        recordar dos preferencias de visualización y una caché técnica para que
        el sitio cargue más rápido y pueda mostrarse sin conexión, tal y como se
        detalla más abajo.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        ¿Qué son las cookies?
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Las cookies son pequeños archivos de texto que los sitios web almacenan
        en tu dispositivo (ordenador, tableta o teléfono móvil) cuando los
        visitas. Permiten que el sitio web recuerde tus acciones y preferencias
        durante un periodo de tiempo, de manera que no tengas que
        reintroducirlos cada vez que vuelvas a visitarlo.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Qué utiliza este sitio web
      </h2>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        Almacenamiento local (técnico)
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        En lugar de cookies, utilizamos el almacenamiento local
        (<span className="text-foreground">localStorage</span>) de tu navegador,
        que guarda la información en tu propio dispositivo y no se envía a
        nuestros servidores en cada petición. Solo almacenamos dos valores:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Preferencia de tema:</strong>{" "}
          almacena tu selección de modo claro u oscuro para respetarla en tus
          siguientes visitas.
        </li>
        <li>
          <strong className="text-foreground">Avisos cerrados:</strong> recuerda
          que has cerrado un aviso informativo, para no volver a mostrártelo.
        </li>
      </ul>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Ninguno de estos valores te identifica ni permite hacer seguimiento de
        tu navegación dentro o fuera de este sitio web.
      </p>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        Service worker y caché del navegador (técnico)
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Este sitio web registra un <em>service worker</em> (el archivo{" "}
        <span className="text-foreground">/sw.js</span>), un pequeño programa
        que tu navegador ejecuta en segundo plano. Guarda en la caché de tu
        navegador copias de las páginas que visitas y de sus imágenes, fuentes
        y archivos, para que el sitio cargue más rápido y para poder mostrarte
        una página sin conexión si no hay red. Solo guarda recursos de este
        sitio y esa caché permanece en tu dispositivo.
      </p>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Puedes borrarla en cualquier momento desde los ajustes de tu navegador,
        en los datos del sitio.
      </p>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        Analítica y publicidad
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Este sitio web no utiliza cookies analíticas, ni herramientas de
        medición de audiencia, ni píxeles publicitarios, ni cookies de
        seguimiento de redes sociales. No medimos las páginas que visitas, el
        tiempo que pasas en ellas ni el origen de tu visita.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Recursos y enlaces de terceros
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Este sitio web no carga recursos de terceros (fuentes, scripts, mapas ni
        vídeos) y no te lleva a herramientas externas para reservar una llamada:
        el botón «Agendar llamada» abre el calendario de reservas de Propus, que
        funciona en esta misma web y no usa cookies. Si en el futuro
        incorporamos algún recurso o enlace de un tercero con el que tu
        navegador llegue a comunicarse, lo indicaremos aquí.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Base jurídica
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        De conformidad con el artículo 22.2 de la Ley 34/2002, de 11 de julio,
        de servicios de la sociedad de la información y de comercio electrónico
        (LSSI-CE), el consentimiento solo resulta exigible para el
        almacenamiento y la recuperación de datos que no sean estrictamente
        necesarios para prestar el servicio solicitado. El almacenamiento local
        de tus preferencias, descrito más arriba, responde exclusivamente a
        elecciones que tú mismo has hecho y está exento de dicha obligación,
        razón por la cual este sitio web no muestra un banner de consentimiento.
      </p>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Si en el futuro incorporamos herramientas de analítica, píxeles
        publicitarios o cualquier otra tecnología no exenta, actualizaremos esta
        política e implantaremos un mecanismo de consentimiento previo antes de
        activarlas.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Cómo gestionar las cookies y el almacenamiento local
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Puedes bloquear o eliminar en cualquier momento las cookies y los datos
        que los sitios web almacenan en tu dispositivo, incluidos el
        almacenamiento local y la caché que utilizamos. A continuación te indicamos dónde
        hacerlo en los navegadores más comunes:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Google Chrome:</strong>{" "}
          Configuración → Privacidad y seguridad → Cookies y otros datos de
          sitios.
        </li>
        <li>
          <strong className="text-foreground">Mozilla Firefox:</strong> Ajustes
          → Privacidad y seguridad → Cookies y datos del sitio.
        </li>
        <li>
          <strong className="text-foreground">Safari:</strong> Preferencias →
          Privacidad → Gestionar datos de sitios web.
        </li>
        <li>
          <strong className="text-foreground">Microsoft Edge:</strong>{" "}
          Configuración → Cookies y permisos del sitio → Administrar y eliminar
          cookies.
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Consecuencias de bloquear el almacenamiento
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        El sitio web seguirá funcionando con normalidad, pero tus preferencias
        de visualización no se guardarán entre visitas: el tema volverá a su
        valor por defecto y los avisos que hubieras cerrado podrían mostrarse de
        nuevo. Tampoco podrá mostrarse una página sin conexión.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Actualización de esta política
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Nos reservamos el derecho de actualizar esta política de cookies en
        cualquier momento para adaptarla a novedades legislativas o cambios en
        nuestro sitio web. Te recomendamos revisarla periódicamente.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Contacto
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Si tienes alguna pregunta sobre nuestra política de cookies, puedes
        contactarnos en{" "}
        <strong className="text-foreground">{contact.email}</strong> o en el
        teléfono{" "}
        <strong className="text-foreground">{contact.phoneDisplay}</strong>.
      </p>

      <p className="mt-16 text-sm text-muted-foreground">
        Última actualización: 28 de octubre de 2026
      </p>
    </article>
  )
}
