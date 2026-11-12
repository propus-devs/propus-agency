# Trazabilidad de /legal/privacidad

Cada afirmación pública de [app/legal/privacidad/page.tsx](../../app/legal/privacidad/page.tsx) con su fuente, para revisión legal. Fecha de la versión: 12 de noviembre de 2026 (reservas de llamadas propias; antes, 28 de octubre de 2026).

**Leyenda de fuentes**

- **Encargo §n**: lo dio el titular en el encargo de reescritura de la política (apartado n del paso 3). Es lo marcado como AFIRMABLE.
- **Ronda 3**: indicaciones del titular en la ronda final de revisión (supervisión de abusos de Azure OpenAI, proveedor de la transcripción, ubicaciones de Google, WhatsApp y Twilio, datos que registra Twilio).
- **Declarado por el titular**: afirmación hecha por el titular, sin respaldo en el repo; se indica la fecha y, si la hay, la comprobación.
- **Repo**: se comprueba en el código. Se cita el archivo.
- **Conmutada**: solo se publica si el interruptor de [lib/privacidad-estado.ts](../../lib/privacidad-estado.ts) está en `true`.
- **Sin fuente**: no hay respaldo en el repo ni en el encargo. Es una redacción genérica que debe validar el abogado o el titular.

## 1. Texto fijo

| # | Afirmación pública | Sección | Fuente | Nota |
|---|---|---|---|---|
| 1 | Responsable: Iberium Group LLC, marca comercial Propus | Responsable | Encargo (contexto, §1) | |
| 2 | Domicilio: 1209 Mountain Road PL NE STE R, Albuquerque, New Mexico 87110, EE. UU. | Responsable | Repo: `app/legal/terminos/page.tsx` y `eliminacion-de-datos/page.tsx` | No está en `lib/site.ts`; se repite literal en tres páginas |
| 3 | Correo: team@propus.es | Responsable y otras | Repo: `lib/site.ts` (commit 9dced7d); Encargo (contexto) | |
| 4 | Propus es responsable de la web, el contacto, los clientes y los prospectos | Alcance | Encargo (contexto, §2) | |
| 5 | Propus es encargado de los datos de pacientes, con contrato de encargo (art. 28 RGPD) | Alcance, Servicios para clínicas | Encargo (contexto, §2, §5) | |
| 6 | Responder consultas: interés legítimo (art. 6.1.f) o medidas precontractuales (art. 6.1.b) | Datos y finalidades | Encargo §3 | |
| 7 | Ejecutar contratos: ejecución del contrato (art. 6.1.b) | Datos y finalidades | Encargo §3 | La base no la dio el encargo; es la que corresponde a la finalidad |
| 8 | Facturación: obligación legal (art. 6.1.c) | Datos y finalidades | Encargo §3 | |
| 9 | Comunicaciones a clientes: interés legítimo (art. 6.1.f), con baja | Datos y finalidades | Encargo §3 | |
| 10 | Datos de la fila «consultas»: nombre, correo, teléfono y contenido del mensaje | Datos y finalidades | Política anterior (apartado «Datos que recopilamos») | Los datos llegan por correo o por el formulario de reserva de llamadas (fila 59) |
| 11 | Datos de las filas «contratos», «facturación» y «comunicaciones»: datos de contacto, de prestación del servicio y de facturación | Datos y finalidades | Sin fuente | Redacción genérica; sin NIF ni medios de pago a propósito |
| 12 | Contacto por correo, por teléfono o reservando una llamada en la web; el formulario de reserva es el único formulario del sitio | Datos y finalidades | Repo: `app/reservar/page.tsx`, `components/reservas/Reservador.tsx` (único `<form>` público); sustituye al Encargo §3 («sin formulario») | Actualizado el 12/11/2026 |
| 13 | El botón «Agendar llamada» lleva a una página propia donde se eligen día y hora y se dejan nombre y correo (teléfono y mensaje opcionales); los datos se guardan en la base de datos, los ve solo el equipo y se eliminan 30 días después de la llamada; el formulario lleva campo oculto y límite de reservas por hora | Datos y finalidades | Repo: `lib/site.ts` (`rutaReservar`) y todos los CTA; `lib/reservas/validacion.ts` (campos), `lib/reservas/repo.ts` (`purgarCaducadas`, 30 días), `app/api/reservas/route.ts` (límites); plazo de 30 días: declarado por el titular el 12/11/2026 | Sustituye a la agenda de Google. El borrado se dispara con el uso de la web y del admin; la frase «cada día, automático» está conmutada (`purgaReservasProgramada`) |
| 14 | Para servir la web, el servidor procesa de forma transitoria la IP del visitante y datos técnicos del navegador; Propus no almacena la IP en registros de acceso ni en ningún otro sitio | Datos y finalidades | Declarado por el titular el 28/10/2026 (el tratamiento transitorio es un hecho técnico de cualquier petición HTTP) | La aplicación y la imagen de Docker no registran IP (comprobado ejecutando `server.js`). Lo que haya en la infraestructura de alojamiento no se ha podido comprobar desde el repo. Desde el 12/11/2026 la API de reservas usa la IP un instante y solo en memoria para limitar reservas por hora (Repo: `lib/reservas/limite.ts`, `lib/http/ip.ts`); no se guarda ni se escribe en registros |
| 15 | No se usan analítica, perfilado ni publicidad | Datos y finalidades | Repo: no hay analítica ni scripts de seguimiento; `app/legal/cookies/page.tsx` | |
| 16 | La web no instala cookies; guarda tema y avisos cerrados en el almacenamiento local; registra un service worker que guarda en la caché del navegador copias de las páginas visitadas y sus recursos, para cargar más rápido y funcionar sin conexión | Cookies | Encargo §3; Repo: `app/layout.tsx` (`next-themes`), `components/ui/banner.tsx` (`localStorage`), `public/sw.js`, `components/pwa/service-worker-register.tsx` (solo en producción), `app/legal/cookies/page.tsx` | El razonamiento de exención del art. 22.2 LSSI en `/legal/cookies` cubre el almacenamiento local de preferencias, no la caché del service worker: lo decide el abogado |
| 17 | AutoClinic es un software de gestión clínica; el agente es de IA en WhatsApp | Servicios para clínicas | Encargo §5 | Grafía «AutoClinic» como en el resto del sitio |
| 18 | La clínica es responsable; Propus encargado, solo según instrucciones | Servicios para clínicas, Pacientes | Encargo §5 | No se nombra ninguna clínica |
| 19 | Categorías: identificación y contacto; citas; datos de salud (historia clínica, consentimientos, fotos clínicas); mensajes de WhatsApp (texto, audio, imagen); registros de actividad (IP, navegador, acciones) | Servicios para clínicas | Encargo §5 | |
| 20 | Datos de salud = categoría especial (art. 9), bajo responsabilidad de la clínica | Servicios para clínicas | Encargo §5 | |
| 21 | El agente es un sistema de IA que gestiona citas y consultas por WhatsApp | Servicios para clínicas | Encargo §5 | |
| 22 | Se envía al modelo: mensaje, teléfono, nombre del perfil de WhatsApp, nombre y citas del paciente, datos básicos de la clínica | Servicios para clínicas | Encargo §5 | |
| 23 | No accede a historia clínica (anamnesis, notas clínicas, lesiones, consentimientos, facturas); las fotos no se envían al modelo | Servicios para clínicas | Encargo §5 | No se afirma que no acceda a datos sensibles en general |
| 24 | Lo que el paciente escribe en un mensaje sí llega al modelo, aunque incluya salud; se recomienda no dar más información clínica de la necesaria | Servicios para clínicas | Derivada de Encargo §5 («se le envía el mensaje»); recomendación ya presente en la política anterior | Frase añadida por coherencia; validar |
| 25 | Los audios se transcriben automáticamente, con el mismo proveedor de IA (Microsoft, Azure OpenAI) | Servicios para clínicas | Encargo §5; Ronda 3 (proveedor) | |
| 26 | Hay un modo de atención humana | Servicios para clínicas | Encargo §5; Repo: `app/legal/terminos/page.tsx` («vía de atención humana») | |
| 27 | No toma decisiones clínicas ni con efectos jurídicos | Servicios para clínicas | Encargo §5; coherente con `terminos` («no emite diagnósticos») | |
| 28 | Servidor de Contabo GmbH en la Unión Europea | Servicios para clínicas, Destinatarios | Encargo §5, §6 | Sin país (ver `paisContaboConfirmado`) |
| 29 | Archivos en Cloudflare R2, jurisdicción UE, almacenamiento privado, enlaces firmados de corta duración | Servicios para clínicas, Destinatarios | Encargo §5, §6 | Sin cifras de duración |
| 30 | IA: Azure OpenAI (Microsoft Ireland Operations Limited), zona de datos de la UE | Servicios para clínicas, Destinatarios | Encargo §5, §6 | |
| 31 | Transcripción en Suecia (UE), del mismo proveedor de IA (Microsoft, Azure OpenAI), no de un tercero distinto | Servicios para clínicas, Destinatarios | Encargo §5; Ronda 3 | |
| 32 | Mensajería vía WhatsApp Ireland Limited | Servicios para clínicas, Destinatarios | Encargo §5, §6 | |
| 33 | Seguridad: HTTPS con HSTS | Servicios para clínicas | Encargo §5 | |
| 34 | Seguridad: contraseñas con hash y mínimo de 10 caracteres | Servicios para clínicas | Encargo §5 | Se dice «hash», no «cifrado» |
| 35 | Seguridad: roles | Servicios para clínicas | Encargo §5 | |
| 36 | Seguridad: aislamiento por clínica | Servicios para clínicas | Encargo §5 | |
| 37 | Seguridad: registro de accesos y cambios en registros de solo inserción | Servicios para clínicas | Encargo §5 | |
| 38 | Seguridad: historia clínica con borrado lógico y notas firmadas inmutables | Servicios para clínicas | Encargo §5 | Tensión posible con la supresión definitiva al terminar el encargo |
| 39 | Seguridad: almacenamiento privado, sin acceso público | Servicios para clínicas | Encargo §5 | |
| 40 | Derechos del paciente: ante la clínica; Propus ayuda sin dilación indebida; escribir a team@propus.es y se traslada | Servicios para clínicas, Pacientes | Encargo §5 | |
| 41 | Incidentes: Propus notifica a la clínica sin dilación indebida (art. 33.2 RGPD) | Servicios para clínicas | Encargo §5 | Sin plazo en horas, a propósito |
| 42 | Conservación: la fija la clínica según normativa sanitaria; Propus devuelve o suprime al terminar (art. 28.3.g) | Servicios para clínicas | Encargo §5 | Sin cifras, a propósito |
| 43 | Menores: los trata la clínica con autorización del representante legal | Servicios para clínicas | Encargo §5 | Sin edad, a propósito |
| 44 | Sección «Si eres paciente de una clínica»: datos, responsable, derechos, contacto | Pacientes | Encargo §5 | Resume los puntos 19, 18, 40 |
| 45 | DigitalOcean aloja la web y la base de datos de las reservas de llamadas, región LON1, Londres | Destinatarios, Transferencias | Encargo §6, §7 | El repo solo lo respalda de forma indirecta (`LogoBar.tsx` lista DigitalOcean). La base de datos es un servicio del mismo servidor (Easypanel): confirmar que comparte región |
| 46 | Google Ireland Limited (Irlanda): correo corporativo | Destinatarios | Encargo §6; Ronda 3 (ubicación) | Desde el 12/11/2026 ya no se cita la agenda: las reservas son propias |
| 47 | WhatsApp Ireland Limited (Irlanda): plataforma de mensajería | Destinatarios | Encargo §6; Ronda 3 (ubicación) | |
| 48 | Acceso desde EE. UU. por ser Iberium estadounidense; algunos proveedores son de EE. UU.; garantías previstas en el RGPD (adecuación o cláusulas tipo) | Transferencias | Encargo §7 | No se atribuye ningún mecanismo a ningún proveedor |
| 49 | La web se sirve desde Londres; Reino Unido con decisión de adecuación de la Comisión | Transferencias | Encargo §7 | Sin fechas de vigencia |
| 50 | Conservación (web y clientes): consultas mientras sean necesarias; clientes mientras dure la relación y plazos legales; facturación según normativa mercantil y tributaria; comunicaciones hasta la baja; almacenamiento local hasta que el usuario lo borre; reservas de llamadas, como máximo 30 días naturales desde la llamada (o su cancelación) | Conservación | Sin fuente (criterios genéricos); el último punto es un hecho técnico; las reservas: declarado por el titular el 12/11/2026 | Se quitaron los «2 años» y «12 meses» de la política anterior por no tener respaldo |
| 51 | Derechos: acceso, rectificación, supresión, oposición, limitación, portabilidad | Derechos | RGPD arts. 15 a 21 | |
| 52 | Se puede pedir acreditación de identidad | Derechos | `eliminacion-de-datos/page.tsx` («podemos pedirte que acredites tu identidad») | |
| 53 | Reclamación ante la AEPD, www.aepd.es; enlace a /legal/eliminacion-de-datos | Derechos | Encargo §9 | |
| 54 | Última actualización: 12 de noviembre de 2026 | Pie | Encargo §10 («hoy») | Actualizar al día de publicación |
| 55 | Teléfono de Propus: +1 (320) 301-0131 | Responsable | Repo: `lib/site.ts` (commit 567b1c1, 2026-08-20); Encargo (contexto, §5) | El número ya estaba publicado en el sitio; el reenvío aún no funciona; pendiente de decidir si se oculta mientras tanto |
| 56 | Twilio Inc. (EE. UU.): telefonía; gestiona las llamadas al teléfono público de Propus. Registra el número que llama, la fecha y la duración. Propus no graba las llamadas | Destinatarios, Datos y finalidades | Encargo §6 y Ronda 3 (ubicación); declarado por el titular (comprobado en el panel de Twilio el 28/10/2026) (datos registrados y no grabación) | No se indica plazo de retención de Twilio, a propósito |
| 57 | Azure OpenAI: Microsoft puede conservar peticiones y respuestas hasta 30 días para detectar abusos; una persona puede revisar el contenido marcado; no hay retención cero | Servicios para clínicas | Ronda 3 | Ya figuraba en la política anterior; retirada en la primera reescritura y repuesta ahora |
| 58 | Aparte de lo que decida la clínica, el proveedor de IA puede conservar peticiones y respuestas hasta 30 días (remite a la sección anterior) | Servicios para clínicas (Conservación) | Ronda 3 | Evita que «la clínica decide cuánto se conserva» se lea como absoluto |
| 59 | Fila «Reservar una llamada con nosotros»: datos (nombre, correo, teléfono opcional, mensaje opcional, día y hora); base: medidas precontractuales a petición del interesado (art. 6.1.b) | Datos y finalidades | Repo: `lib/reservas/validacion.ts` (`leerReservaPublica`); base elegida por el desarrollador (a validar por el abogado) | Añadida el 12/11/2026. No se pide consentimiento como base; el formulario incluye un aviso con casilla de lectura de la política |

## 2. Frases conmutadas

Con el interruptor en `false` la frase no aparece. El estado inicial es el de la tabla.

| Interruptor | Estado inicial | Frase que publica en `true` | Fuente de la frase |
|---|---|---|---|
| `copiasSeguridad` | false | `textoCopiasSeguridad` (provisional): «Se hacen copias de seguridad cifradas, que se guardan en la Unión Europea.» | Encargo §5: el texto exacto lo dará el titular |
| `purgaChats24m` | false | «Las conversaciones se suprimen a los 24 meses desde el último mensaje.» | Encargo §5 |
| `avisoIAenBienvenida` | false | «El agente se identifica como IA al inicio de la conversación y enlaza a esta política.» | Encargo §5 |
| `memoriaAgente24h` | false | «La memoria de contexto del agente (lo que recuerda de la conversación en curso) caduca a las 24 horas.» | Encargo §5 (la aclaración entre paréntesis es nuestra) |
| `purgaEjecucionesN8n72h` | false | «Las ejecuciones del sistema de automatización (n8n) se purgan a las 72 horas.» | Encargo §5 |
| `paisContaboConfirmado` | false | Sustituye «la Unión Europea» por «`paisContabo` (Unión Europea)» en dos frases | Encargo §5: el país lo indicará el titular |
| `purgaReservasProgramada` | false | «El borrado se ejecuta cada día de forma automática.» (se añade a la frase de conservación de las reservas) | Para ponerlo en true: `CRON_SECRET` definido, tarea diaria programada en Easypanel contra `POST /api/cron/purga` y comprobada en producción |
| `recursosTercerosPanel` | true | «Al usar el panel de gestión se cargan recursos de terceros (fuentes y librerías). El proveedor de esos recursos puede ver la dirección IP y el navegador del personal de la clínica que lo usa.» | Encargo §6 |

## 3. Lo que la política anterior decía y esta no

Retirado por no tener respaldo en el repo ni en el encargo: formularios de contacto y consentimiento como base de un formulario; finalidad de «mejorar la experiencia de navegación»; direcciones y países de Contabo (Alemania, Francia); «autenticación de doble factor» en los paneles; «TLS en el intercambio entre sistemas»; las tres garantías de transferencia con cláusulas tipo concretas (Decisión 2021/914) y «ninguna transferencia fuera de la Unión»; la cita de Microsoft sobre no entrenar modelos; los plazos de 2 años y 12 meses; la invitación a ejercer derechos llamando por teléfono (ahora solo por correo); el bloqueo de datos tras los plazos (sigue explicado en la página de eliminación de datos).
