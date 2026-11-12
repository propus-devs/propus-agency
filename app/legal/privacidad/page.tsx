import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { contact } from "@/lib/site"
import {
  paisContabo,
  privacidadEstado as estado,
  textoCopiasSeguridad,
  ultimaActualizacion,
} from "@/lib/privacidad-estado"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Propus: qué datos tratamos, para qué, con qué proveedores y cómo ejercer tus derechos, también si eres paciente de una clínica que usa nuestros servicios.",
  alternates: {
    canonical: "/legal/privacidad",
  },
}

/*
  AVISO PARA QUIEN EDITE ESTA PÁGINA
  Aquí solo se afirma lo que se puede respaldar. Las prácticas que el
  repositorio no puede demostrar (copias de seguridad, purgas, aviso de IA,
  caducidad de la memoria del agente, país del servidor, recursos de terceros
  en el panel) dependen de los interruptores de lib/privacidad-estado.ts: no se
  publican hasta que el interruptor esté en true. No añadir aquí ninguna medida
  de seguridad que no esté en la lista: declarar una medida inexistente en una
  política de privacidad es una infracción en sí misma, y este servicio trata
  datos de salud.

  TODO — Representante en la Unión Europea (art. 27 RGPD)
  Iberium Group LLC es una entidad estadounidense que ofrece servicios a
  interesados en España, por lo que salvo que resulte aplicable alguna de las
  excepciones del art. 27.2 debe designar por escrito un representante en la
  Unión y publicar sus datos de contacto en esta política.

  Está PENDIENTE de designar. No escribir aquí ningún nombre ni dirección hasta
  que la designación esté formalizada: publicar un representante inexistente es
  peor que no declarar ninguno. Cuando se designe, añadir sus datos al apartado
  «Responsable del tratamiento», junto a los de la entidad.
*/

const enlace =
  "text-foreground underline underline-offset-4 transition-colors hover:text-brand-teal"

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-12 mb-4 scroll-mt-24 text-xl font-semibold md:text-2xl"
    >
      {children}
    </h2>
  )
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-3 text-lg font-semibold">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
      {children}
    </ul>
  )
}

function B({ children }: { children: ReactNode }) {
  return <strong className="text-foreground">{children}</strong>
}

const finalidades = [
  {
    finalidad: "Responder a tus consultas",
    datos: "Nombre, correo electrónico, teléfono y el contenido de tu mensaje",
    base: "Interés legítimo en atender a quien nos escribe (art. 6.1.f RGPD) o, si pides información antes de contratar, medidas precontractuales a petición tuya (art. 6.1.b)",
  },
  {
    finalidad: "Reservar una llamada con nosotros",
    datos:
      "Nombre, correo electrónico, teléfono (opcional), mensaje (opcional) y el día y la hora que eliges",
    base: "Medidas precontractuales a petición tuya (art. 6.1.b RGPD): reservas la llamada para que hablemos de un posible servicio",
  },
  {
    finalidad: "Ejecutar los contratos con clientes",
    datos:
      "Datos de contacto y los necesarios para prestar el servicio contratado",
    base: "Ejecución del contrato (art. 6.1.b)",
  },
  {
    finalidad: "Facturación",
    datos: "Datos de facturación del cliente",
    base: "Obligación legal (art. 6.1.c)",
  },
  {
    finalidad: "Comunicaciones a clientes sobre nuestros servicios",
    datos: "Datos de contacto del cliente",
    base: "Interés legítimo (art. 6.1.f). Puedes oponerte y darte de baja en cualquier momento",
  },
] as const

export default function PrivacidadPage() {
  const ubicacionContabo =
    estado.paisContaboConfirmado && paisContabo
      ? `${paisContabo} (Unión Europea)`
      : "la Unión Europea"

  return (
    <article>
      <h1 className="mb-6 text-3xl font-semibold md:text-4xl">
        Política de Privacidad
      </h1>

      <P>
        Esta política explica qué datos personales trata Propus, para qué, en
        qué se basa para hacerlo, quién más interviene y cómo puedes ejercer
        tus derechos, conforme al Reglamento General de Protección de Datos
        (RGPD) y a la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de
        Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </P>
      <P>
        <B>¿Eres paciente de una clínica que usa nuestros servicios?</B> Ve
        directamente a{" "}
        <a href="#pacientes" className={enlace}>
          Si eres paciente de una clínica
        </a>
        .
      </P>

      <nav aria-label="Índice de la política" className="mb-4">
        <ol className="list-decimal space-y-1 pl-8 text-muted-foreground">
          <li>
            <a href="#responsable" className={enlace}>
              Responsable del tratamiento
            </a>
          </li>
          <li>
            <a href="#alcance" className={enlace}>
              Alcance y roles de Propus
            </a>
          </li>
          <li>
            <a href="#datos-finalidades" className={enlace}>
              Datos y finalidades
            </a>
          </li>
          <li>
            <a href="#cookies" className={enlace}>
              Cookies y almacenamiento local
            </a>
          </li>
          <li>
            <a href="#servicios-clinicas" className={enlace}>
              Servicios para clínicas: AutoClinic y agente de IA en WhatsApp
            </a>
          </li>
          <li>
            <a href="#pacientes" className={enlace}>
              Si eres paciente de una clínica
            </a>
          </li>
          <li>
            <a href="#destinatarios" className={enlace}>
              Destinatarios y proveedores
            </a>
          </li>
          <li>
            <a href="#transferencias" className={enlace}>
              Transferencias internacionales
            </a>
          </li>
          <li>
            <a href="#conservacion" className={enlace}>
              Conservación de los datos
            </a>
          </li>
          <li>
            <a href="#derechos" className={enlace}>
              Derechos y reclamaciones
            </a>
          </li>
          <li>
            <a href="#cambios" className={enlace}>
              Cambios en esta política
            </a>
          </li>
        </ol>
      </nav>

      <H2 id="responsable">Responsable del tratamiento</H2>
      <UL>
        <li>
          <B>Identidad:</B> Iberium Group LLC (marca comercial: Propus)
        </li>
        <li>
          <B>Domicilio:</B> 1209 Mountain Road PL NE STE R, Albuquerque, New
          Mexico 87110, EE. UU.
        </li>
        <li>
          <B>Correo electrónico:</B>{" "}
          <a href={contact.emailHref} className={enlace}>
            {contact.email}
          </a>
        </li>
        <li>
          <B>Teléfono:</B>{" "}
          <a href={contact.phoneHref} className={enlace}>
            {contact.phoneDisplay}
          </a>
        </li>
      </UL>

      <H2 id="alcance">Alcance y roles de Propus</H2>
      <P>
        Propus trata datos personales en dos posiciones distintas. Conviene que
        sepas en cuál estás tú:
      </P>
      <UL>
        <li>
          <B>Como responsable del tratamiento,</B> Propus decide para qué y
          cómo se usan los datos de quienes visitan esta web o contactan con
          nosotros, de nuestros clientes y de las personas que podrían serlo.
          Las secciones «Datos y finalidades», «Cookies y almacenamiento local»
          y «Conservación de los datos» se refieren a estos datos.
        </li>
        <li>
          <B>Como encargado del tratamiento,</B> Propus trata los datos de los
          pacientes de las clínicas que usan AutoClinic y el agente de IA en
          WhatsApp. La responsable de esos datos es la clínica, y Propus los
          trata únicamente siguiendo sus instrucciones, con un contrato de
          encargo del tratamiento conforme al artículo 28 del RGPD. Se explica
          en «Servicios para clínicas».
        </li>
      </UL>

      <H2 id="datos-finalidades">Datos y finalidades</H2>
      <P>Estos son los tratamientos en los que Propus es responsable:</P>
      {/* Tabla desde 640 px; por debajo, tarjetas, porque tres columnas no caben
          en un móvil y la última (la base jurídica) quedaría fuera de vista. */}
      <div className="mb-4 hidden sm:block">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead>
            <tr className="border-b border-border text-foreground">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Finalidad
              </th>
              <th scope="col" className="py-2 pr-4 font-semibold">
                Datos
              </th>
              <th scope="col" className="py-2 font-semibold">
                Base jurídica
              </th>
            </tr>
          </thead>
          <tbody>
            {finalidades.map((f) => (
              <tr
                key={f.finalidad}
                className="border-b border-border/60 align-top last:border-b-0"
              >
                <td className="py-3 pr-4">{f.finalidad}</td>
                <td className="py-3 pr-4">{f.datos}</td>
                <td className="py-3">{f.base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mb-4 space-y-3 sm:hidden">
        {finalidades.map((f) => (
          <li
            key={f.finalidad}
            className="rounded-lg border border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground"
          >
            <p className="font-semibold text-foreground">{f.finalidad}</p>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-foreground uppercase">
                  Datos
                </dt>
                <dd className="mt-1">{f.datos}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-foreground uppercase">
                  Base jurídica
                </dt>
                <dd className="mt-1">{f.base}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <UL>
        <li>
          <B>Cómo contactar con nosotros:</B> por correo electrónico, por
          teléfono o reservando una llamada en esta web. El formulario de
          reserva de llamadas es el único formulario del sitio.
        </li>
        <li>
          <B>Reserva de llamadas:</B> el botón «Agendar llamada» te lleva a una
          página de esta misma web, donde eliges día y hora e indicas tu nombre
          y tu correo (el teléfono y un mensaje son opcionales). Esos datos se
          guardan en nuestra base de datos, los ve únicamente el equipo de
          Propus y se usan para atender tu reserva y nada más. Se eliminan 30
          días después de la fecha de la llamada. Para evitar reservas
          automáticas o abusivas, el formulario lleva un campo oculto y el
          servidor limita el número de reservas por hora.
        </li>
        <li>
          <B>Llamadas telefónicas:</B> las llamadas al número de teléfono de
          Propus pasan por Twilio Inc., que registra el número que llama, la
          fecha y la duración. Propus no graba las llamadas.
        </li>
        <li>
          <B>Datos técnicos:</B> para servirte la web, el servidor procesa de
          forma transitoria tu dirección IP y datos técnicos de tu navegador.
          Propus no almacena tu dirección IP en registros de acceso ni en
          ningún otro sitio. Al reservar una llamada, el servidor usa tu
          dirección IP unos instantes, sólo en memoria, para limitar el número
          de reservas por hora; no se guarda. No usamos herramientas de
          analítica, de perfilado ni de publicidad.
        </li>
      </UL>

      <H2 id="cookies">Cookies y almacenamiento local</H2>
      <P>
        Este sitio web no instala cookies. Para recordar tus preferencias de
        visualización (el tema claro u oscuro y los avisos que cierras) usa el
        almacenamiento local de tu navegador. Además registra un service worker
        que guarda en la caché de tu navegador copias de las páginas que visitas
        y de sus recursos, para que el sitio cargue más rápido y pueda mostrarse
        sin conexión. Encontrarás el detalle en la{" "}
        <Link href="/legal/cookies" className={enlace}>
          Política de Cookies
        </Link>
        .
      </P>

      <H2 id="servicios-clinicas">
        Servicios para clínicas: AutoClinic y agente de IA en WhatsApp
      </H2>
      <P>
        Esta sección explica, sin tecnicismos, qué ocurre con los datos cuando
        una clínica usa AutoClinic (software de gestión clínica) o el agente de
        IA en WhatsApp de Propus.
      </P>

      <H3>Quién es quién</H3>
      <P>
        En estos servicios <B>la clínica es la responsable del tratamiento:</B>{" "}
        decide qué datos se recogen y para qué.{" "}
        <B>Propus es su encargado:</B> trata los datos únicamente siguiendo las
        instrucciones de la clínica, en virtud de un contrato de encargo del
        tratamiento (artículo 28 del RGPD).
      </P>

      <H3>Qué datos se tratan</H3>
      <P>En estos servicios se tratan estas categorías de datos:</P>
      <UL>
        <li>
          <B>Identificación y contacto.</B>
        </li>
        <li>
          <B>Citas.</B>
        </li>
        <li>
          <B>Datos de salud:</B> historia clínica, consentimientos y fotos
          clínicas.
        </li>
        <li>
          <B>Mensajes de WhatsApp:</B> texto, audio e imagen.
        </li>
        <li>
          <B>Registros de actividad:</B> dirección IP, navegador y acciones
          realizadas.
        </li>
      </UL>
      <P>
        Los datos de salud son una categoría especial de datos (artículo 9 del
        RGPD) y están bajo la responsabilidad de la clínica.
      </P>

      <H3>Cómo funciona el agente de IA</H3>
      <P>
        El agente es un <B>sistema de inteligencia artificial</B> que gestiona
        citas y consultas por WhatsApp. Esto es lo que hace con tus datos:
      </P>
      <UL>
        <li>
          <B>Qué recibe:</B> el mensaje, el teléfono, el nombre de tu perfil de
          WhatsApp, el nombre y las citas del paciente y datos básicos de la
          clínica.
        </li>
        <li>
          <B>A qué no accede:</B> no tiene acceso a la historia clínica
          (anamnesis, notas clínicas, lesiones, consentimientos ni facturas), y
          las fotos no se envían al modelo.
        </li>
        <li>
          <B>Ten en cuenta:</B> lo que escribas en un mensaje sí le llega,
          aunque incluya información de salud. Por eso te recomendamos no dar
          por WhatsApp más información clínica de la necesaria para gestionar
          tu cita.
        </li>
        <li>
          <B>Audios:</B> se transcriben automáticamente, con el mismo proveedor
          de IA (Microsoft, Azure OpenAI), para que el agente pueda leerlos.
        </li>
        <li>
          <B>Atención humana:</B> hay un modo de atención humana, en el que la
          conversación la atiende una persona en lugar del agente.
        </li>
        <li>
          <B>Decisiones:</B> el agente no toma decisiones clínicas ni
          decisiones con efectos jurídicos sobre ti.
        </li>
        {estado.avisoIAenBienvenida && (
          <li>
            <B>Aviso:</B> el agente se identifica como IA al inicio de la
            conversación y enlaza a esta política.
          </li>
        )}
      </UL>

      <H3>Supervisión de abusos del proveedor de IA</H3>
      <P>
        Azure OpenAI, el servicio de Microsoft que usa el agente, aplica un
        sistema de supervisión de abusos. Por eso Microsoft puede conservar las
        peticiones y las respuestas hasta 30 días para detectar usos que
        incumplan sus condiciones, y una persona puede revisar el contenido que
        sus filtros automáticos marquen. En este servicio no hay retención cero.
      </P>

      <H3>Dónde se tratan los datos</H3>
      <P>Los datos de estos servicios se tratan en la Unión Europea:</P>
      <UL>
        <li>
          <B>Servidor:</B> los servicios funcionan en un servidor de Contabo
          GmbH situado en {ubicacionContabo}.
        </li>
        <li>
          <B>Archivos:</B> se guardan en Cloudflare R2, en la jurisdicción de
          la Unión Europea. El almacenamiento es privado, sin acceso público, y
          los archivos se descargan mediante enlaces firmados de corta
          duración.
        </li>
        <li>
          <B>Inteligencia artificial:</B> Azure OpenAI, de Microsoft Ireland
          Operations Limited, en una zona de datos de la Unión Europea.
        </li>
        <li>
          <B>Transcripción de audios:</B> se realiza en Suecia (Unión
          Europea), con el mismo proveedor de IA (Microsoft, Azure OpenAI), no
          con un tercero distinto.
        </li>
        <li>
          <B>Mensajería:</B> WhatsApp Ireland Limited presta la plataforma por
          la que viajan los mensajes.
        </li>
      </UL>
      <P>
        Iberium Group LLC es una entidad estadounidense, por lo que el acceso
        a los datos desde EE. UU. es una transferencia internacional. Lo
        explicamos en{" "}
        <a href="#transferencias" className={enlace}>
          Transferencias internacionales
        </a>
        .
      </P>

      <H3>Seguridad</H3>
      <P>Estas son las medidas de seguridad que se aplican en estos servicios:</P>
      <UL>
        <li>Conexiones por HTTPS, con HSTS.</li>
        <li>
          Contraseñas almacenadas con hash (no en claro), con un mínimo de 10
          caracteres.
        </li>
        <li>Acceso controlado por roles.</li>
        <li>Aislamiento de los datos de cada clínica.</li>
        <li>
          Registro de accesos y cambios en registros de solo inserción (solo
          se pueden añadir entradas).
        </li>
        <li>
          Historia clínica con borrado lógico y notas clínicas firmadas
          inmutables.
        </li>
        <li>Almacenamiento de archivos privado, sin acceso público.</li>
        {estado.copiasSeguridad && <li>{textoCopiasSeguridad}</li>}
      </UL>

      <H3>Derechos de los pacientes</H3>
      <P>
        Los derechos sobre tus datos de paciente (acceso, rectificación,
        supresión y el resto) se ejercen ante la clínica, que es la
        responsable. Propus la ayuda a atenderlos sin dilación indebida. Si
        prefieres escribir a Propus, hazlo a{" "}
        <a href={contact.emailHref} className={enlace}>
          {contact.email}
        </a>
        : trasladaremos tu solicitud a la clínica.
      </P>

      <H3>Incidentes de seguridad</H3>
      <P>
        Si ocurre una violación de la seguridad que afecte a datos de
        pacientes, Propus lo notificará a la clínica sin dilación indebida
        (artículo 33.2 del RGPD), para que ella cumpla sus obligaciones.
      </P>

      <H3>Conservación</H3>
      <P>
        La clínica decide cuánto tiempo se conservan los datos de sus
        pacientes, conforme a la normativa sanitaria aplicable. Cuando termina
        el encargo, Propus devuelve o suprime los datos según indique la
        clínica (artículo 28.3.g del RGPD). Aparte, el proveedor de IA puede
        conservar peticiones y respuestas hasta 30 días, como se explica en
        «Supervisión de abusos del proveedor de IA».
      </P>
      {(estado.purgaChats24m ||
        estado.memoriaAgente24h ||
        estado.purgaEjecucionesN8n72h) && (
        <UL>
          {estado.purgaChats24m && (
            <li>
              Las conversaciones se suprimen a los 24 meses desde el último
              mensaje.
            </li>
          )}
          {estado.memoriaAgente24h && (
            <li>
              La memoria de contexto del agente (lo que recuerda de la
              conversación en curso) caduca a las 24 horas.
            </li>
          )}
          {estado.purgaEjecucionesN8n72h && (
            <li>
              Las ejecuciones del sistema de automatización (n8n) se purgan a
              las 72 horas.
            </li>
          )}
        </UL>
      )}

      <H3>Menores</H3>
      <P>
        Los datos de menores los trata la clínica con la autorización de su
        representante legal, conforme a la normativa aplicable. Propus los
        trata únicamente siguiendo las instrucciones de la clínica.
      </P>

      <H2 id="pacientes">Si eres paciente de una clínica</H2>
      <P>
        Si has escrito por WhatsApp a una clínica o la clínica usa AutoClinic
        para tus citas y tu historial, esto es lo esencial:
      </P>
      <UL>
        <li>
          <B>Qué datos:</B> tu identificación y contacto, tus citas, tus datos
          de salud y tus mensajes de WhatsApp. El detalle está en{" "}
          <a href="#servicios-clinicas" className={enlace}>
            Servicios para clínicas
          </a>
          .
        </li>
        <li>
          <B>Quién es el responsable:</B> la clínica. Propus es su encargado y
          solo trata los datos siguiendo sus instrucciones.
        </li>
        <li>
          <B>Cómo ejercer tus derechos:</B> ante la clínica. Si prefieres
          escribirnos, trasladaremos tu solicitud a la clínica. Para pedir que
          se eliminen tus datos, sigue el procedimiento de la página de{" "}
          <Link href="/legal/eliminacion-de-datos" className={enlace}>
            eliminación de datos
          </Link>
          .
        </li>
        <li>
          <B>Cómo contactar con Propus:</B>{" "}
          <a href={contact.emailHref} className={enlace}>
            {contact.email}
          </a>
          .
        </li>
      </UL>

      <H2 id="destinatarios">Destinatarios y proveedores</H2>
      <P>
        Estos son los proveedores que intervienen en nuestros servicios y para
        qué:
      </P>
      <UL>
        <li>
          <B>DigitalOcean:</B> aloja esta web y la base de datos donde se
          guardan las reservas de llamadas, en su región LON1 (Londres, Reino
          Unido).
        </li>
        <li>
          <B>Google Ireland Limited</B> (Irlanda): correo corporativo.
        </li>
        <li>
          <B>Contabo GmbH:</B> servidor donde funcionan AutoClinic y el agente
          de IA, en {ubicacionContabo}.
        </li>
        <li>
          <B>Cloudflare, Inc.:</B> almacenamiento de archivos (R2), en la
          jurisdicción de la Unión Europea.
        </li>
        <li>
          <B>Microsoft Ireland Operations Limited:</B> inteligencia artificial
          del agente y transcripción de sus audios (Azure OpenAI), en una zona
          de datos de la Unión Europea. La transcripción se realiza en Suecia.
        </li>
        <li>
          <B>WhatsApp Ireland Limited</B> (Irlanda): plataforma de mensajería
          de WhatsApp.
        </li>
        <li>
          <B>Twilio Inc.</B> (EE. UU.): telefonía; gestiona las llamadas al
          teléfono público de Propus y registra datos de las llamadas (número,
          fecha y duración).
        </li>
      </UL>
      {estado.recursosTercerosPanel && (
        <P>
          <B>Panel de las clínicas.</B> Al usar el panel de gestión se cargan
          recursos de terceros (fuentes y librerías). El proveedor de esos
          recursos puede ver la dirección IP y el navegador del personal de la
          clínica que lo usa.
        </P>
      )}

      <H2 id="transferencias">Transferencias internacionales</H2>
      <H3>Acceso desde EE. UU.</H3>
      <P>
        Iberium Group LLC está constituida en EE. UU., por lo que acceder a los
        datos desde allí es una transferencia internacional, aunque los
        servidores estén en la Unión Europea. Además, algunos de nuestros
        proveedores son de EE. UU. Estas transferencias se realizan con las
        garantías previstas en el RGPD (decisión de adecuación o cláusulas
        contractuales tipo).
      </P>
      <H3>Web alojada en el Reino Unido</H3>
      <P>
        Esta web se sirve desde Londres. El Reino Unido está fuera de la Unión
        Europea, pero cuenta con una decisión de adecuación de la Comisión
        Europea.
      </P>

      <H2 id="conservacion">Conservación de los datos</H2>
      <P>
        Para los datos de los que Propus es responsable, estos son los
        criterios de conservación:
      </P>
      <UL>
        <li>
          <B>Consultas:</B> mientras sean necesarios para atender tu consulta.
        </li>
        <li>
          <B>Reservas de llamadas:</B> como máximo 30 días naturales después de
          la fecha de la llamada (o de su cancelación); pasado ese plazo se
          eliminan.
          {estado.purgaReservasProgramada &&
            " El borrado se ejecuta cada día de forma automática."}
        </li>
        <li>
          <B>Clientes:</B> mientras dure la relación contractual y, después,
          durante los plazos legales aplicables.
        </li>
        <li>
          <B>Facturación:</B> durante los plazos que exige la normativa
          mercantil y tributaria aplicable.
        </li>
        <li>
          <B>Comunicaciones a clientes:</B> hasta que te des de baja o termine
          la relación.
        </li>
        <li>
          <B>Almacenamiento local de tu navegador:</B> hasta que lo borres tú.
        </li>
      </UL>
      <P>
        Los datos de pacientes siguen lo explicado en «Servicios para
        clínicas».
      </P>

      <H2 id="derechos">Derechos y reclamaciones</H2>
      <P>Puedes ejercer en cualquier momento estos derechos:</P>
      <UL>
        <li>
          <B>Acceso:</B> saber qué datos tuyos tratamos.
        </li>
        <li>
          <B>Rectificación:</B> corregir datos inexactos o incompletos.
        </li>
        <li>
          <B>Supresión:</B> pedir que eliminemos tus datos cuando proceda.
        </li>
        <li>
          <B>Oposición:</B> oponerte al tratamiento en determinadas
          circunstancias, por ejemplo a recibir comunicaciones sobre nuestros
          servicios.
        </li>
        <li>
          <B>Limitación:</B> pedir que limitemos el tratamiento en los
          supuestos previstos por la ley.
        </li>
        <li>
          <B>Portabilidad:</B> recibir tus datos en un formato estructurado y
          de uso común.
        </li>
      </UL>
      <P>
        Para ejercerlos, escribe a{" "}
        <a href={contact.emailHref} className={enlace}>
          {contact.email}
        </a>{" "}
        indicando qué derecho quieres ejercer. Podemos pedirte que acredites tu
        identidad. Si tus datos son de paciente, el derecho se ejerce ante la
        clínica, como se explica en{" "}
        <a href="#pacientes" className={enlace}>
          Si eres paciente de una clínica
        </a>
        .
      </P>
      <P>
        Si quieres que eliminemos tus datos, sigue el procedimiento de la
        página de{" "}
        <Link href="/legal/eliminacion-de-datos" className={enlace}>
          eliminación de datos
        </Link>
        .
      </P>
      <P>
        También puedes presentar una reclamación ante la Agencia Española de
        Protección de Datos (AEPD) en{" "}
        <span className="text-foreground">www.aepd.es</span> si consideras que
        el tratamiento de tus datos no se ajusta a la normativa.
      </P>

      <H2 id="cambios">Cambios en esta política</H2>
      <P>
        Si cambiamos esta política, publicaremos aquí la nueva versión con su
        fecha de actualización.
      </P>

      <p className="mt-16 text-sm text-muted-foreground">
        Última actualización: {ultimaActualizacion}
      </p>
    </article>
  )
}
