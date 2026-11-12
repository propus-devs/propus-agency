import type { Metadata } from "next"
import Link from "next/link"
import { contact } from "@/lib/site"

export const metadata: Metadata = {
  title: "Eliminación de Datos",
  description:
    "Cómo solicitar la eliminación de tus datos personales en Propus, incluidas las conversaciones de WhatsApp con negocios que utilizan nuestro agente de IA.",
  alternates: {
    canonical: "/legal/eliminacion-de-datos",
  },
}

export default function EliminacionDeDatosPage() {
  return (
    <article>
      <h1 className="mb-6 text-3xl font-semibold md:text-4xl">
        Eliminación de Datos
      </h1>

      <p className="mb-4 leading-relaxed text-muted-foreground">
        Puedes pedirnos en cualquier momento que eliminemos tus datos
        personales. Esta página explica cómo solicitarlo, qué datos podemos
        tener sobre ti y en qué plazo te respondemos. Se aplica tanto si has
        contactado directamente con Propus a través de este sitio web como si
        has mantenido una conversación de WhatsApp con un negocio que utiliza
        nuestro agente de inteligencia artificial.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Cómo solicitar la eliminación de tus datos
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Envía un correo electrónico a{" "}
        <a href={contact.emailHref} className="text-foreground underline underline-offset-4">
          {contact.email}
        </a>{" "}
        con el asunto{" "}
        <strong className="text-foreground">
          «Solicitud de eliminación de datos»
        </strong>{" "}
        e indica en el mensaje:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">
            El número de teléfono o la dirección de correo electrónico
          </strong>{" "}
          que utilizaste, para que podamos localizar tus datos.
        </li>
        <li>
          <strong className="text-foreground">
            El negocio con el que conversaste
          </strong>{" "}
          (por ejemplo, el nombre de la clínica), si tu solicitud se refiere a
          una conversación de WhatsApp.
        </li>
      </ul>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        <strong className="text-foreground">
          Te responderemos en un plazo máximo de 30 días naturales
        </strong>{" "}
        desde la recepción de tu solicitud. No necesitas rellenar ningún
        formulario ni crear ninguna cuenta: basta con ese correo electrónico.
      </p>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Para proteger tus datos frente a solicitudes de terceros, podemos
        pedirte que acredites tu identidad antes de ejecutar la eliminación,
        por ejemplo mediante una copia de tu documento de identidad o
        confirmando la solicitud desde el mismo número o dirección de correo
        objeto de la petición.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Qué datos puedes pedir que eliminemos
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Antes de solicitar la eliminación conviene que identifiques en cuál de
        estos dos supuestos te encuentras, porque el procedimiento y quién
        decide sobre tus datos son distintos en cada caso.
      </p>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        1. Has contactado directamente con Propus
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Es el caso si nos has escrito por correo electrónico, nos has llamado
        por teléfono o has reservado una llamada con nosotros. En este supuesto
        Propus es el responsable del tratamiento y podemos tener:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Datos de contacto:</strong>{" "}
          nombre, dirección de correo electrónico, número de teléfono y el
          contenido del mensaje que nos enviaste.
        </li>
        <li>
          <strong className="text-foreground">Datos de la reunión:</strong> si
          reservaste una llamada, la fecha, la hora y los datos que
          proporcionaste al hacer la reserva. Estos datos se conservan como
          máximo 30 días después de la llamada; si prefieres que los
          borremos antes, pídenoslo.
        </li>
        <li>
          <strong className="text-foreground">
            Correspondencia comercial:
          </strong>{" "}
          los correos intercambiados con nuestro equipo y, en su caso, la
          documentación derivada de una relación contractual.
        </li>
      </ul>

      <h3 className="mt-8 mb-3 text-lg font-semibold">
        2. Has conversado por WhatsApp con un negocio cliente de Propus
      </h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Es el caso si escribiste al número de WhatsApp de una clínica, consulta
        o negocio de servicios y te atendió un asistente automatizado. En este
        supuesto{" "}
        <strong className="text-foreground">
          el responsable del tratamiento es ese negocio
        </strong>{" "}
        y Propus actúa únicamente como encargado del tratamiento, es decir,
        tratamos los datos por cuenta del negocio y siguiendo sus
        instrucciones. Los datos que podemos tener son:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Tu número de teléfono</strong> y
          el nombre que muestra tu perfil de WhatsApp.
        </li>
        <li>
          <strong className="text-foreground">
            El contenido de los mensajes
          </strong>{" "}
          intercambiados con el negocio, incluidos los archivos que hayas
          enviado.
        </li>
        <li>
          <strong className="text-foreground">Metadatos técnicos</strong> de la
          conversación, como las marcas de tiempo y el estado de entrega y
          lectura de cada mensaje.
        </li>
        <li>
          <strong className="text-foreground">Datos de gestión de citas</strong>{" "}
          generados a partir de la conversación, como la fecha, el servicio
          solicitado o el profesional asignado.
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Plazo de respuesta
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Responderemos a tu solicitud en un plazo máximo de 30 días naturales
        desde su recepción, conforme al artículo 12.3 del Reglamento General de
        Protección de Datos (RGPD). Si la solicitud resulta especialmente
        compleja o recibimos un número elevado de peticiones, ese mismo
        artículo permite prorrogar el plazo hasta dos meses adicionales; en tal
        caso te informaremos de la prórroga y de sus motivos dentro de los
        primeros 30 días.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Qué ocurre cuando el responsable es un negocio cliente
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Cuando tu solicitud se refiere a una conversación de WhatsApp con un
        negocio cliente, Propus no puede decidir por su cuenta sobre esos datos,
        porque no es el responsable del tratamiento. En ese caso:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          Trasladamos tu solicitud al responsable sin dilación indebida, tal y
          como exige el contrato de encargo del tratamiento suscrito con él.
        </li>
        <li>
          Ejecutamos la eliminación en nuestros sistemas siguiendo sus
          instrucciones.
        </li>
        <li>
          Te informamos de la identidad y los datos de contacto del responsable,
          para que puedas dirigirte directamente a él y ejercer allí este y el
          resto de tus derechos.
        </li>
      </ul>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Límites de la eliminación
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        El derecho de supresión no es absoluto. Determinados datos deben
        conservarse aunque solicites su eliminación, en los supuestos previstos
        por el artículo 17.3 del RGPD:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Obligaciones legales:</strong>{" "}
          datos de facturación y documentación contable y fiscal, que la
          normativa mercantil y tributaria obliga a conservar durante los plazos
          legalmente establecidos.
        </li>
        <li>
          <strong className="text-foreground">
            Defensa frente a reclamaciones:
          </strong>{" "}
          datos necesarios para la formulación, el ejercicio o la defensa de
          reclamaciones, mientras dichas acciones puedan ejercitarse.
        </li>
        <li>
          <strong className="text-foreground">Normativa sectorial:</strong>{" "}
          cuando el responsable es un centro sanitario, la legislación
          aplicable puede obligarle a conservar determinada información
          asistencial durante un plazo mínimo, con independencia de tu
          solicitud.
        </li>
      </ul>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        En estos casos los datos no se borran, sino que se{" "}
        <strong className="text-foreground">bloquean</strong>: quedan
        conservados y debidamente identificados, con acceso impedido para
        cualquier finalidad ordinaria, y solo se ponen a disposición de jueces y
        tribunales, del Ministerio Fiscal o de las administraciones públicas
        competentes para atender las posibles responsabilidades derivadas del
        tratamiento. Transcurrido el plazo de prescripción, se suprimen. Te
        indicaremos siempre qué datos hemos eliminado y cuáles han quedado
        bloqueados, y por qué motivo.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Otros derechos y reclamaciones
      </h2>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Además de la eliminación, puedes ejercer tus derechos de acceso,
        rectificación, oposición, portabilidad y limitación del tratamiento por
        la misma vía. Encontrarás el detalle de cada uno de ellos en nuestra{" "}
        <Link
          href="/legal/privacidad"
          className="text-foreground underline underline-offset-4 transition-colors hover:text-brand-teal"
        >
          Política de Privacidad
        </Link>
        .
      </p>
      <p className="mb-4 leading-relaxed text-muted-foreground">
        Si consideras que no hemos atendido correctamente tu solicitud, tienes
        derecho a presentar una reclamación ante la Agencia Española de
        Protección de Datos (AEPD) en{" "}
        <span className="text-foreground">www.aepd.es</span>.
      </p>

      <h2 className="mt-12 mb-4 text-xl font-semibold md:text-2xl">
        Quién atiende tu solicitud
      </h2>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        <li>
          <strong className="text-foreground">Identidad:</strong> Iberium Group
          LLC (marca comercial: Propus)
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
      </ul>

      <p className="mt-16 text-sm text-muted-foreground">
        Última actualización: 28 de octubre de 2026
      </p>
    </article>
  )
}
