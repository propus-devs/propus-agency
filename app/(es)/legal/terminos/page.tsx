import type { Metadata } from "next"
import { contact } from "@/lib/site"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web y los servicios de Propus.",
  alternates: {
    canonical: "/legal/terminos",
  },
}

export default function TerminosPage() {
  return (
    <article>
      <h1 className="mb-6 text-3xl font-semibold md:text-4xl">
        Términos y Condiciones
      </h1>

      <p className="mb-4 leading-relaxed text-muted-foreground">
        Los presentes términos y condiciones regulan el acceso y uso del sitio
        web de Propus, así como la contratación de los servicios
        ofrecidos a través del mismo. Al acceder a este sitio web, aceptas
        cumplir con estos términos en su totalidad.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Identificación del titular
      </h2>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Denominación:</strong> Iberium
          Group LLC (marca comercial: Propus)
        </li>
        <li>
          <strong className="text-foreground">Domicilio:</strong> 1209 Mountain
          Road PL NE STE R, Albuquerque, New Mexico 87110, EE. UU.
        </li>
        <li>
          <strong className="text-foreground">Correo electrónico:</strong>{" "}
          <a href={contact.emailHref} className="text-foreground underline underline-offset-4">
            {contact.email}
          </a>
        </li>
        <li>
          <strong className="text-foreground">Teléfono:</strong>{" "}
          <a href={contact.phoneHref} className="text-foreground underline underline-offset-4">
            {contact.phoneDisplay}
          </a>
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Objeto de los servicios
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Propus es una agencia especializada en el desarrollo de
        aplicaciones con inteligencia artificial, automatización de procesos de
        negocio e integración de agentes inteligentes. A través de este sitio
        web, proporcionamos información sobre nuestros servicios y facilitamos el
        contacto con potenciales clientes.
      </p>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Dentro de este catálogo se incluye el servicio de{" "}
        <strong className="text-foreground">
          agente de inteligencia artificial sobre WhatsApp
        </strong>
        : la implantación y el mantenimiento de un asistente automatizado que
        atiende las conversaciones del número de WhatsApp del cliente y gestiona
        la información, las citas, los recordatorios y las cancelaciones de sus
        usuarios finales, junto con el panel de control asociado. Las
        condiciones específicas de este servicio se recogen en el apartado
        correspondiente de estos términos.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Condiciones de uso
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        El usuario se compromete a hacer un uso adecuado del sitio web, de
        conformidad con la ley, los presentes términos y las buenas costumbres.
        En particular, el usuario se obliga a:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          No utilizar el sitio web con fines ilícitos, fraudulentos o que
          atenten contra los derechos de terceros.
        </li>
        <li>
          No introducir virus, malware o cualquier otro elemento que pueda dañar
          o alterar el funcionamiento del sitio web.
        </li>
        <li>
          No intentar acceder a áreas restringidas del sitio web sin
          autorización.
        </li>
        <li>
          Proporcionar información veraz y actualizada al contactar con
          nosotros por correo electrónico, por teléfono o al reservar una
          llamada.
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Propiedad intelectual
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Todos los contenidos del sitio web, incluyendo textos, imágenes,
        logotipos, diseños, código fuente, marcas y demás elementos, son
        propiedad de Propus o de sus legítimos titulares y están
        protegidos por las leyes de propiedad intelectual e industrial.
      </p>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Queda prohibida la reproducción, distribución, comunicación pública,
        transformación o cualquier otra forma de explotación de los contenidos
        sin la autorización expresa y por escrito de Propus.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Contratación de servicios
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        La contratación de los servicios de Propus se formaliza
        mediante acuerdo específico entre las partes, previa solicitud del
        cliente a través de los canales habilitados. Los precios mostrados en el
        sitio web tienen carácter orientativo y no constituyen una oferta
        vinculante. El presupuesto definitivo se proporcionará de forma
        personalizada en función de las necesidades del proyecto.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Agente de inteligencia artificial sobre WhatsApp
      </h2>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        Dependencia de plataformas de terceros
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Este servicio se presta sobre la WhatsApp Business Platform, titularidad
        del grupo Meta y prestada en el Espacio Económico Europeo por WhatsApp
        Ireland Limited. Se trata de una plataforma ajena a Propus, por lo que
        el cliente reconoce y acepta que:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          Su disponibilidad, su funcionamiento y sus condiciones técnicas no
          están bajo el control de Propus y pueden verse interrumpidos o
          modificados en cualquier momento.
        </li>
        <li>
          Sus políticas de uso, sus requisitos de verificación y sus tarifas los
          fija Meta de forma unilateral y pueden cambiar sin previo aviso, con
          impacto directo en el coste y en el alcance del servicio.
        </li>
        <li>
          El cliente queda sujeto a las políticas de WhatsApp Business y demás
          condiciones de la plataforma, cuya lectura y cumplimiento son de su
          exclusiva responsabilidad.
        </li>
      </ul>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        Obligaciones del cliente
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Como titular del número de WhatsApp y responsable del tratamiento de los
        datos de sus usuarios, el cliente se obliga a:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          Obtener y conservar la prueba del consentimiento previo y expreso
          (opt-in) de cada persona antes de que esta reciba mensajes iniciados
          por el negocio, informándole con claridad de qué comunicaciones va a
          recibir y de cómo puede darse de baja.
        </li>
        <li>
          No utilizar el canal para envíos masivos no solicitados, comunicaciones
          comerciales sin consentimiento ni ninguna práctica que pueda calificarse
          de spam.
        </li>
        <li>
          Atender sin demora las solicitudes de baja y los derechos que ejerzan
          las personas que conversen con el negocio.
        </li>
        <li>
          No emplear el asistente para finalidades contrarias a la ley, a las
          políticas de la plataforma o a estos términos.
        </li>
      </ul>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        Naturaleza del asistente
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        El asistente es una herramienta de información y de gestión de citas.
        No sustituye el criterio de un profesional ni constituye asesoramiento
        médico, legal, fiscal ni financiero, y no emite diagnósticos ni
        recomendaciones clínicas. Sus respuestas se generan mediante modelos de
        lenguaje y pueden contener errores o imprecisiones, por lo que el
        cliente se compromete a supervisar el servicio y a mantener disponible
        una vía de atención humana. La responsabilidad sobre las decisiones
        profesionales y sobre la información que el asistente traslada en nombre
        del negocio corresponde en todo caso al cliente.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Limitación de responsabilidad
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Propus no será responsable de los daños y perjuicios de
        cualquier naturaleza que pudieran derivarse del uso del sitio web,
        incluyendo, sin limitación:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          Errores u omisiones en los contenidos publicados en el sitio web.
        </li>
        <li>
          La falta de disponibilidad o accesibilidad del sitio web por causas
          ajenas a nuestro control.
        </li>
        <li>
          Daños causados por terceros mediante intrusiones no autorizadas.
        </li>
        <li>
          Daños indirectos, incidentales o consecuentes derivados del uso de
          nuestros servicios.
        </li>
        <li>
          Las interrupciones, restricciones, suspensiones, bajas de la
          calificación de calidad del número, reducciones de límite de mensajería
          o cancelaciones de la cuenta impuestas por Meta o por WhatsApp, cuando
          deriven de un uso del canal por parte del cliente contrario a las
          políticas de la plataforma, a la normativa aplicable o a estos
          términos.
        </li>
        <li>
          Los cambios de precios, funcionalidades o condiciones de acceso que
          Meta introduzca en la WhatsApp Business Platform.
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Enlaces a terceros
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Este sitio web puede contener enlaces a sitios web de terceros. Propus
        no se hace responsable del contenido, las políticas de
        privacidad ni las prácticas de dichos sitios web. El acceso a estos
        enlaces se realiza bajo la exclusiva responsabilidad del usuario.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Modificaciones
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Propus se reserva el derecho de modificar estos términos y
        condiciones en cualquier momento. Las modificaciones entrarán en vigor
        desde su publicación en el sitio web. El uso continuado del sitio web
        tras la publicación de los cambios implica la aceptación de los mismos.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Legislación aplicable y jurisdicción
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Los presentes términos y condiciones se rigen por la legislación
        española. Para la resolución de cualquier controversia derivada del uso
        de este sitio web o de la contratación de nuestros servicios, las partes
        se someten a los Juzgados y Tribunales de Albacete, con renuncia expresa
        a cualquier otro fuero que pudiera corresponderles.
      </p>

      <p className="mt-16 text-sm text-muted-foreground">
        Última actualización: 28 de octubre de 2026
      </p>
    </article>
  )
}
