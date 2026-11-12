/**
 * Interruptores de /legal/privacidad.
 *
 * Cada uno gobierna una frase de la política que describe una práctica
 * técnica u organizativa que el repositorio no puede demostrar. Regla única:
 * ponerlo en `true` SOLO cuando la práctica esté implantada y comprobada en
 * producción. Con `false` la política no dice nada de eso y se queda con el
 * texto genérico seguro. Publicar una medida que no existe es peor que no
 * declararla: esta política afecta a datos de salud.
 *
 * Al cambiar un interruptor, actualiza también `ultimaActualizacion`.
 */
export interface PrivacidadEstado {
  /**
   * Copias de seguridad.
   * Para ponerlo en true: tener copias automáticas, cifradas y guardadas en la
   * Unión Europea, con una restauración probada, y sustituir
   * `textoCopiasSeguridad` (abajo) por el texto exacto acordado.
   */
  copiasSeguridad: boolean

  /**
   * Purga de conversaciones de WhatsApp a los 24 meses del último mensaje.
   * Para ponerlo en true: tener una tarea programada que borre esas
   * conversaciones de la base de datos y haber comprobado en producción que se
   * ejecuta.
   */
  purgaChats24m: boolean

  /**
   * El agente se identifica como IA al empezar la conversación.
   * Para ponerlo en true: comprobar en una conversación real que el primer
   * mensaje del agente lo identifica como IA y enlaza a /legal/privacidad.
   */
  avisoIAenBienvenida: boolean

  /**
   * La memoria de contexto del agente caduca a las 24 horas.
   * Para ponerlo en true: tener configurada y comprobada la caducidad de 24 h
   * en el almacén de memoria del agente.
   */
  memoriaAgente24h: boolean

  /**
   * Purga de las ejecuciones de n8n a las 72 horas.
   * Para ponerlo en true: activar la poda de ejecuciones en n8n
   * (EXECUTIONS_DATA_PRUNE=true y EXECUTIONS_DATA_MAX_AGE=72) y comprobar que
   * las ejecuciones antiguas desaparecen.
   */
  purgaEjecucionesN8n72h: boolean

  /**
   * País del centro de datos de Contabo confirmado.
   * Para ponerlo en true: comprobar en el panel de Contabo en qué país está el
   * servidor contratado y rellenar `paisContabo` (abajo). Con false, o con
   * `paisContabo` vacío, la política dice solo «Unión Europea».
   */
  paisContaboConfirmado: boolean

  /**
   * El panel de las clínicas carga recursos de terceros (fuentes y librerías).
   * Mantenerlo en true mientras sea así. Para ponerlo en false: comprobar en la
   * pestaña Red del navegador, con el panel abierto, que no hay peticiones a
   * dominios ajenos (todo autohospedado).
   */
  recursosTercerosPanel: boolean

  /**
   * Borrado diario programado de las reservas de llamadas (30 días tras la llamada).
   * El borrado ya se dispara solo con el uso normal de la web y del admin (como
   * mucho una vez por hora), pero eso no garantiza que se ejecute si nadie entra.
   * Para ponerlo en true: definir CRON_SECRET en Easypanel, programar una tarea
   * diaria que llame a POST /api/cron/purga con `Authorization: Bearer <CRON_SECRET>`
   * y comprobar en producción que responde 200 y que borra lo caducado.
   */
  purgaReservasProgramada: boolean
}

export const privacidadEstado: PrivacidadEstado = {
  copiasSeguridad: false,
  purgaChats24m: false,
  avisoIAenBienvenida: false,
  memoriaAgente24h: false,
  purgaEjecucionesN8n72h: false,
  paisContaboConfirmado: false,
  recursosTercerosPanel: true,
  purgaReservasProgramada: false,
}

/**
 * País del centro de datos de Contabo, tal y como debe leerse en la política
 * («servidor en <país>»). Solo se usa con `paisContaboConfirmado` en true.
 */
export const paisContabo = ""

/**
 * Frase sobre copias de seguridad. TEXTO PROVISIONAL: sustituir por el texto
 * exacto antes de poner `copiasSeguridad` en true.
 */
export const textoCopiasSeguridad =
  "Se hacen copias de seguridad cifradas, que se guardan en la Unión Europea."

/** Fecha que se muestra al pie de la política. Poner el día real de publicación. */
export const ultimaActualizacion = "12 de noviembre de 2026"
