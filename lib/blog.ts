export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  /**
   * Imagen de fondo de la card en el listado. Ruta dentro de /public.
   * Si falta, la card se pinta con el degradado de siempre, así que un post
   * nuevo sin imagen no rompe nada.
   */
  image?: string
  content: string
}

/** Cards por página en /blog. */
export const POSTS_PER_PAGE = 6

/** Description del listado del blog, compartida por /blog y /blog/pagina/N. */
export const DESCRIPCION_BLOG =
  "Guías y casos reales sobre desarrollo web, software a medida y automatización para negocios, con foco en clínicas y empresas de Albacete."

export const blogPosts: BlogPost[] = [
  {
    slug: "automatizacion-ia-empresas-albacete",
    title: "Cómo la automatización con IA puede transformar tu empresa en Albacete",
    description:
      "Descubre cómo las pymes y empresas de Albacete pueden aprovechar la inteligencia artificial para automatizar procesos, reducir costes y escalar operaciones.",
    date: "2026-03-29",
    readingTime: "6 min de lectura",
    tags: ["IA", "Automatización", "Albacete", "Pymes"],
    image: "/img/blog/automatizacion-ia-empresas-albacete.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        La inteligencia artificial ha dejado de ser una tecnología exclusiva de las grandes corporaciones. Hoy, las pymes y empresas de Albacete y Castilla-La Mancha tienen a su alcance herramientas de automatización con IA que pueden transformar por completo la manera en que operan, compiten y crecen. En este artículo, exploramos cómo tu negocio puede beneficiarse de esta revolución tecnológica sin necesidad de grandes inversiones ni equipos técnicos internos.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">¿Qué es la automatización con IA?</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La automatización con inteligencia artificial consiste en utilizar sistemas inteligentes para ejecutar tareas que tradicionalmente requieren intervención humana. A diferencia de la automatización clásica, que sigue reglas fijas y predefinidas, la IA es capaz de aprender, adaptarse y tomar decisiones basadas en datos. Esto significa que puede gestionar procesos complejos como responder a clientes, analizar tendencias de ventas, clasificar documentos o generar informes sin que nadie tenga que supervisarlo constantemente.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Herramientas como los agentes inteligentes, los chatbots avanzados o los flujos de automatización con plataformas como n8n y Make permiten que cualquier empresa, independientemente de su tamaño, pueda integrar IA en su día a día de forma práctica y asequible.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Beneficios para empresas en Albacete</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Las empresas de Albacete y su entorno operan en un mercado donde la eficiencia marca la diferencia. Estos son los principales beneficios que la automatización con IA puede aportar a tu negocio:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Reducción de costes operativos:</strong> al eliminar tareas manuales repetitivas, tu equipo puede centrarse en actividades de mayor valor. Menos errores humanos, menos tiempo perdido y menos recursos dedicados a procesos rutinarios.</li>
        <li><strong class="text-foreground font-medium">Mayor eficiencia:</strong> los procesos automatizados se ejecutan en segundos, las 24 horas del día, los 7 días de la semana. Lo que antes llevaba horas ahora se resuelve de forma instantánea.</li>
        <li><strong class="text-foreground font-medium">Escalabilidad sin fricciones:</strong> a medida que tu negocio crece, los sistemas de IA escalan contigo. No necesitas contratar más personal para gestionar más volumen: la automatización absorbe la carga.</li>
        <li><strong class="text-foreground font-medium">Ventaja competitiva:</strong> adoptar IA antes que tu competencia te posiciona como una empresa innovadora. En un mercado local como el de Albacete, esto puede ser un diferenciador decisivo.</li>
        <li><strong class="text-foreground font-medium">Mejor atención al cliente:</strong> chatbots inteligentes y sistemas de respuesta automatizada permiten atender a tus clientes de forma inmediata, personalizada y sin tiempos de espera.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Casos de uso reales</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Para que la teoría cobre sentido, veamos tres ejemplos concretos de cómo la automatización con IA se aplica en empresas similares a las de nuestra región:
      </p>

      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">1. Atención al cliente con chatbot inteligente.</strong> Una tienda online de Albacete recibe decenas de consultas diarias sobre disponibilidad de productos, plazos de envío y devoluciones. Un chatbot basado en IA puede responder automáticamente al 80% de estas preguntas, derivando solo los casos complejos a un agente humano. El resultado: clientes satisfechos las 24 horas y un equipo de soporte que se enfoca en lo que realmente importa.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">2. Automatización de facturación y administración.</strong> Una gestoría o despacho profesional dedica horas semanales a generar facturas, enviar recordatorios de pago y clasificar documentos. Con un flujo de automatización conectado a su software de gestión, todo esto ocurre automáticamente: la factura se genera, se envía al cliente y se registra en contabilidad sin intervención manual.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">3. Análisis de datos de ventas.</strong> Un comercio local quiere entender qué productos se venden más en cada temporada, cuáles tienen mejor margen y dónde se pierden ventas. Un sistema de IA analiza los datos históricos, genera informes visuales y sugiere acciones concretas como ajustar stock o lanzar promociones en el momento óptimo.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">¿Por qué elegir Propus?</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        En Propus no somos una consultora genérica que aplica plantillas iguales a todos los clientes. Somos un equipo de emprendedores con raíces en Albacete que entiende las particularidades del tejido empresarial de Castilla-La Mancha. Conocemos los retos de las pymes locales porque los hemos vivido de cerca: la competencia con grandes plataformas, la necesidad de optimizar cada euro invertido y las ganas de crecer sin perder la cercanía con los clientes.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Nuestro enfoque combina expertise técnico en inteligencia artificial con un trato cercano y personalizado. Diseñamos soluciones a medida, acompañamos la implementación y nos aseguramos de que la IA genere resultados reales y medibles para tu negocio.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si estás pensando en dar el salto y automatizar tu empresa con inteligencia artificial, nos encantaría escucharte. Agenda una llamada con nuestro equipo y descubre cómo podemos ayudarte a transformar tu negocio.
      </p>
    `,
  },
  {
    slug: "recepcionista-virtual-clinica-dental",
    title: "Recepcionista virtual para clínicas dentales: guía completa (WhatsApp + IA)",
    description:
      "Qué es un agente recepcionista virtual, cómo funciona paso a paso y qué debe incluir el CRM que hay detrás para gestionar la agenda de una clínica dental sin fricciones.",
    date: "2026-05-04",
    readingTime: "9 min de lectura",
    tags: ["Clínicas dentales", "WhatsApp", "IA", "CRM"],
    image: "/img/blog/recepcionista-virtual-clinica-dental.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Cada vez más clínicas dentales están sustituyendo el teléfono como único canal de reserva por un agente de inteligencia artificial que atiende por WhatsApp las 24 horas del día. Esta guía explica qué es exactamente un recepcionista virtual para clínica dental, cómo funciona por dentro y qué debe tener el sistema que lo sostiene para que la promesa de "agenda que se gestiona sola" sea real y no solo marketing.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">¿Qué es un recepcionista virtual para clínica dental?</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Un recepcionista virtual es un agente de inteligencia artificial conectado a WhatsApp que conversa con tus pacientes en lenguaje natural para resolver dudas, agendar citas, gestionar cancelaciones y enviar recordatorios, sin que una persona de tu equipo tenga que intervenir en cada mensaje. No es un simple chatbot de respuestas fijas: entiende la intención del paciente, consulta la agenda real de la clínica y actúa en consecuencia.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La diferencia frente a un contestador automático o un formulario web es que el paciente escribe como lo haría a un amigo — "necesito una limpieza para la semana que viene" — y el agente entiende, pregunta lo necesario y confirma la cita, todo dentro de la misma conversación de WhatsApp.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Por qué una clínica dental lo necesita</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La recepción de una clínica dental compagina varias tareas a la vez: atender al paciente que está en la silla, coger el teléfono, gestionar la agenda de varios profesionales y responder mensajes. Cuando el volumen crece, algo se resiente casi siempre primero: la disponibilidad para nuevos pacientes que contactan fuera de horario o en momentos de máxima ocupación.
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Disponibilidad 24/7:</strong> un paciente que escribe a las 21h con dolor o buscando la primera cita disponible no tiene que esperar a la mañana siguiente para tener respuesta.</li>
        <li><strong class="text-foreground font-medium">Menos huecos vacíos:</strong> al automatizar recordatorios y ofrecer el hueco a otros pacientes cuando alguien cancela, se reduce el tiempo muerto en la agenda.</li>
        <li><strong class="text-foreground font-medium">Recepción liberada para tareas de valor:</strong> tu equipo deja de responder las mismas preguntas repetidas sobre precios, ubicación o tratamientos.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cómo funciona paso a paso</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Aunque cada implementación se ajusta a la clínica, el flujo habitual de un agente recepcionista dental sigue esta secuencia:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">1. Recepción del mensaje:</strong> el paciente escribe por WhatsApp con una pregunta, una petición de cita o una cancelación.</li>
        <li><strong class="text-foreground font-medium">2. Identificación de la intención:</strong> el agente distingue si se trata de una consulta informativa, una nueva reserva, un cambio o una urgencia.</li>
        <li><strong class="text-foreground font-medium">3. Consulta a la agenda real:</strong> revisa la disponibilidad de cada profesional según el tipo de tratamiento (limpieza, ortodoncia, endodoncia, revisión).</li>
        <li><strong class="text-foreground font-medium">4. Confirmación y registro:</strong> propone hueco, confirma con el paciente y actualiza el CRM sin que nadie tenga que anotarlo manualmente.</li>
        <li><strong class="text-foreground font-medium">5. Seguimiento posterior:</strong> envía recordatorios previos a la cita y, si se libera un hueco por cancelación, contacta a pacientes en espera para cubrirlo.</li>
      </ul>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Puedes ver el detalle técnico completo de cada una de estas fases en nuestra
        <a href="/blog/chatbot-whatsapp-citas-clinica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía específica sobre cómo funciona un chatbot de WhatsApp para citas médicas</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué debe incluir el CRM que hay detrás</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El agente de WhatsApp es la parte visible, pero su fiabilidad depende del sistema que gestiona la información de la clínica. Un CRM dental completo para sostener esta automatización necesita, como mínimo:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li>Agenda por profesional con franjas horarias y duración real de cada tratamiento.</li>
        <li>Ficha de paciente con historial de tratamientos y datos de contacto centralizados.</li>
        <li>Base de conocimiento propia de la clínica: precios, políticas de cancelación, ubicación y preguntas frecuentes.</li>
        <li>Panel de control con las citas del día, pendientes de confirmar y cancelaciones recientes.</li>
      </ul>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Repasamos con más detalle qué debe tener este tipo de software en nuestra
        <a href="/blog/software-gestion-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía sobre software de gestión para clínica dental</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">El impacto real: menos ausencias, más ingresos</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Uno de los beneficios más medibles de automatizar la recepción es la reducción de ausencias no avisadas ("no-shows"). Cada hueco perdido tiene un coste directo en ingresos y un coste indirecto en la planificación del equipo clínico. Analizamos ese impacto con datos concretos en nuestro artículo sobre
        <a href="/blog/reducir-no-shows-clinica-recordatorios" class="text-foreground underline underline-offset-4 hover:text-brand-teal">cómo reducir las ausencias en las citas de tu clínica con recordatorios automáticos</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">¿Sirve también para clínicas de estética?</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Aunque nuestro caso de uso principal son las clínicas de podología, el mismo enfoque se adapta a otros negocios que trabajan por cita, como las clínicas dentales o los centros de estética, con particularidades propias en la gestión de bonos y sesiones múltiples. Contamos un caso real en
        <a href="/blog/automatizar-recepcion-clinica-estetica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">cómo automatizamos la recepción de un centro de estética</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cómo elegir el proveedor adecuado</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Antes de contratar un agente recepcionista virtual para tu clínica dental, conviene comprobar cuatro cosas: que se configure con la información real de tu clínica (no con respuestas genéricas), que puedas revisar y aprobar su funcionamiento antes de que hable con pacientes reales, que tenga un plan claro de derivación a una persona cuando no sepa responder, y que el CRM que lo sostiene sea tan sólido como el propio agente conversacional.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si además quieres renovar la puerta de entrada digital de tu clínica, una web bien diseñada y conectada al agente multiplica el efecto: hablamos de ello en
        <a href="/blog/diseno-web-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">cómo el diseño web de tu clínica dental influye en la conversión a primera cita</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Siguiente paso</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        En Propus hemos desarrollado AutoClinic, el agente recepcionista de WhatsApp y CRM pensado para clínicas que trabajan por cita, con la podología como nicho principal y la odontología como segundo. Puedes conocer todos los detalles en
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o agendar una llamada de 30 minutos para revisar tu caso concreto sin compromiso.
      </p>
    `,
  },
  {
    slug: "chatbot-whatsapp-citas-clinica",
    title: "Chatbot de WhatsApp para citas médicas: cómo funciona técnicamente",
    description:
      "Desglosamos el funcionamiento técnico de un chatbot de WhatsApp para citas médicas: identificación de intención, consulta de agenda, confirmación y gestión de huecos de última hora.",
    date: "2026-05-18",
    readingTime: "6 min de lectura",
    tags: ["WhatsApp", "IA", "Automatización"],
    image: "/img/blog/chatbot-whatsapp-citas-clinica.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        "Chatbot de WhatsApp" suena a menú de opciones rígido con botones numerados. Un agente de citas médicas basado en IA funciona de forma muy distinta: entiende lenguaje natural, consulta datos en tiempo real y toma decisiones dentro de reglas que tú defines. Este artículo desglosa, paso a paso, qué ocurre técnicamente desde que un paciente escribe hasta que su cita queda confirmada.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">1. Recepción del mensaje y comprensión del lenguaje</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El mensaje del paciente llega a través de la API de WhatsApp Business y pasa a un modelo de lenguaje que interpreta la intención: ¿quiere agendar, cancelar, cambiar de fecha o simplemente preguntar algo? A diferencia de un árbol de decisiones con botones, el paciente puede escribir con sus propias palabras — "¿tenéis hueco esta semana para una revisión?" — y el agente entiende la petición sin necesidad de un formato concreto.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">2. Consulta a la agenda en tiempo real</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una vez identificada la intención, el agente consulta el sistema de agenda de la clínica: qué profesionales atienden ese tipo de tratamiento, qué huecos hay disponibles y cuánto dura la cita. Esta consulta ocurre en el momento, por lo que el paciente nunca recibe un hueco que en realidad ya está ocupado.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">3. Confirmación y actualización automática</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Cuando el paciente elige un hueco, el agente lo confirma dentro de la misma conversación y actualiza automáticamente el CRM de la clínica. No hay doble anotación ni riesgo de que la cita quede solo en el móvil de alguien del equipo: el sistema central queda actualizado al instante.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">4. Gestión de cancelaciones y huecos de última hora</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si un paciente cancela, el agente libera el hueco de inmediato en el sistema. Cuando la clínica lo permite, el propio agente puede contactar automáticamente a pacientes en lista de espera para ofrecerles ese hueco recién liberado, algo que manualmente casi nunca llega a hacerse a tiempo.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">5. Reglas de derivación a una persona</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Un buen agente no intenta responder a todo. Se configura con reglas claras de cuándo derivar la conversación a una persona del equipo: urgencias complejas, quejas o cualquier situación fuera del guion definido. El objetivo no es sustituir a tu equipo, sino descargarlo de la parte repetitiva y previsible.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Dónde encaja esto en el día a día de una clínica</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Este funcionamiento técnico es la base sobre la que construimos AutoClinic, nuestro agente recepcionista para el sector salud. Si quieres ver cómo se aplica específicamente al caso de las clínicas dentales, con ejemplos de agenda por tipo de tratamiento, puedes leer nuestra
        <a href="/blog/recepcionista-virtual-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía completa de recepcionista virtual para clínica dental</a>
        o conocer directamente
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>.
      </p>
    `,
  },
  {
    slug: "reducir-no-shows-clinica-recordatorios",
    title: "Cómo reducir las ausencias (no-shows) en tu clínica con recordatorios automáticos",
    description:
      "Qué le cuesta a una clínica cada cita a la que el paciente no se presenta y cómo los recordatorios automáticos por WhatsApp reducen drásticamente esas ausencias.",
    date: "2026-06-01",
    readingTime: "6 min de lectura",
    tags: ["Clínicas dentales", "WhatsApp", "Automatización"],
    image: "/img/blog/reducir-no-shows-clinica-recordatorios.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una cita a la que el paciente no se presenta —lo que en el sector se conoce como "no-show"— no es solo una molestia de agenda: es un coste económico directo y un hueco de tiempo clínico que ya no se puede recuperar ese día. Este artículo explica por qué ocurre, cuánto cuesta realmente y cómo un sistema de recordatorios automáticos por WhatsApp reduce ese impacto de forma medible.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Por qué se producen las ausencias</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La mayoría de ausencias no se deben a mala fe, sino a un motivo mucho más simple: el paciente olvida la cita. Entre que se reserva y el día señalado pueden pasar semanas, y sin un recordatorio cercano en el tiempo, la cita se diluye entre el resto de compromisos del día a día.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">El coste real de un hueco vacío</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Cuando un paciente no se presenta, la clínica pierde el ingreso de esa cita, pero también el coste de oportunidad: ese hueco podría haberse ofrecido a otro paciente en lista de espera si se hubiera sabido con antelación suficiente que quedaría libre. Multiplicado por varias ausencias a la semana, el impacto en la facturación mensual de una clínica puede ser considerable.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cómo funcionan los recordatorios automáticos</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Un sistema de recordatorios bien configurado no se limita a un único aviso. El patrón que mejores resultados da combina dos momentos:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Recordatorio 24 horas antes:</strong> da margen suficiente para que el paciente reorganice su agenda o cancele con tiempo si realmente no puede asistir.</li>
        <li><strong class="text-foreground font-medium">Recordatorio 3 horas antes:</strong> actúa como confirmación final y reduce el olvido de última hora, especialmente en primeras citas.</li>
      </ul>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Al enviarse por WhatsApp en lugar de por SMS o llamada, la tasa de apertura es mucho más alta, y el paciente puede responder directamente para confirmar o pedir cambiar la hora sin tener que llamar a la clínica.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué hacer cuando sí se cancela</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Los recordatorios no eliminan por completo las cancelaciones, pero adelantan el aviso lo suficiente como para poder reaccionar. Si el hueco queda libre con antelación, un agente automatizado puede contactar a otros pacientes en espera y cubrirlo, en lugar de que se quede vacío sin que nadie se entere a tiempo.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Recordatorios como parte de un sistema mayor</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Los recordatorios automáticos dan mejor resultado cuando forman parte de un sistema completo de agenda y CRM, no como una herramienta aislada. Explicamos cómo encaja esta pieza dentro del funcionamiento general de un agente recepcionista en nuestra
        <a href="/blog/recepcionista-virtual-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía completa de recepcionista virtual para clínica dental</a>,
        y qué debe tener el software que sostiene todo esto en nuestro artículo sobre
        <a href="/blog/software-gestion-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">software de gestión para clínica dental</a>.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si quieres calcular el impacto real de las ausencias en tu clínica y ver cómo AutoClinic las reduce, puedes conocer
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o agendar una llamada sin compromiso.
      </p>
    `,
  },
  {
    slug: "software-gestion-clinica-dental",
    title: "Qué debe tener un software de gestión para clínica dental (checklist)",
    description:
      "Checklist de las funcionalidades imprescindibles que debe tener un software de gestión para clínica dental: agenda, ficha de paciente, base de conocimiento y panel de control.",
    date: "2026-06-15",
    readingTime: "7 min de lectura",
    tags: ["CRM", "Clínicas dentales", "Gestión"],
    image: "/img/blog/software-gestion-clinica-dental.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Elegir un software de gestión para una clínica dental no debería reducirse a comparar precios. El sistema que sostiene tu día a día tiene que resolver problemas muy concretos: agenda por profesional, historial de cada paciente, información propia de la clínica y visibilidad clara de lo que ocurre cada día. Este artículo funciona como checklist para evaluar cualquier CRM dental antes de contratarlo.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">1. Agenda por profesional y tipo de tratamiento</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        No todas las citas duran lo mismo ni las puede atender cualquier profesional. Un buen software dental debe permitir configurar horarios individuales por dentista o higienista, y asociar cada tratamiento a su duración real, para que la agenda no se descuadre por citas mal calculadas.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">2. Ficha de paciente centralizada</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El historial de tratamientos, alergias, próximas citas y datos de contacto de cada paciente debe vivir en un único lugar accesible para todo el equipo, no repartido entre agendas de papel, notas sueltas y la memoria de quien atendió esa visita.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">3. Base de conocimiento propia de la clínica</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Precios, políticas de cancelación, ubicación y preguntas frecuentes específicas de tu clínica deben poder configurarse dentro del propio sistema. Esto es especialmente importante si el software también alimenta a un agente de atención automatizada: sin esta base de conocimiento, el agente respondería con información genérica en lugar de la tuya.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">4. Panel de control con visión del día</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Un buen panel debe mostrar de un vistazo las citas de hoy, las solicitudes pendientes de confirmar y las cancelaciones recientes, sin tener que bucear entre pantallas para saber qué está pasando en la clínica en ese momento.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">5. Gestión de profesionales y servicios editable</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Los servicios de una clínica cambian: se incorporan tratamientos nuevos, se ajustan precios o se suma un profesional al equipo. El software debe permitir actualizar esta información fácilmente, sin depender de soporte técnico externo para cada cambio.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">6. Capacidad de conectarse a un agente de atención por WhatsApp</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Cada vez es más habitual que este software no funcione solo como herramienta interna, sino como la base de datos que alimenta a un agente conversacional que atiende a los pacientes directamente. Si te interesa este enfoque, en nuestra
        <a href="/blog/recepcionista-virtual-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía completa de recepcionista virtual para clínica dental</a>
        explicamos cómo se conecta todo el sistema, y en
        <a href="/blog/chatbot-whatsapp-citas-clinica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestro artículo técnico sobre chatbots de WhatsApp para citas médicas</a>
        entramos en el detalle de funcionamiento.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cómo lo hemos resuelto en AutoClinic</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El CRM de AutoClinic cubre los seis puntos de este checklist y está diseñado para clínicas que trabajan por cita, incluidas las dentales. Puedes ver el detalle en
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o agendar una llamada para revisar tu caso concreto.
      </p>
    `,
  },
  {
    slug: "automatizar-recepcion-clinica-estetica",
    title: "Cómo automatizamos la recepción de un centro de estética con IA",
    description:
      "Caso real: cómo adaptamos nuestro agente recepcionista de WhatsApp a un centro de estética, con control de bonos de sesiones e información de tratamientos.",
    date: "2026-06-29",
    readingTime: "6 min de lectura",
    tags: ["Clínicas de estética", "WhatsApp", "IA"],
    image: "/img/blog/automatizar-recepcion-clinica-estetica.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Aunque nuestro caso de uso principal son las clínicas de podología, el mismo agente recepcionista de WhatsApp se adapta a otros negocios que trabajan por cita. Uno de nuestros primeros beta testers fue un centro de estética real, y este artículo cuenta cómo adaptamos la tecnología a sus particularidades: bonos de sesiones, tratamientos recurrentes y picos de demanda por campañas.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">El reto: no es lo mismo que una clínica dental</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        En una clínica dental, la mayoría de citas son puntuales: una limpieza, una revisión, una sesión de ortodoncia programada. En un centro de estética, en cambio, es habitual que las clientas contraten bonos de varias sesiones del mismo tratamiento, y que existan campañas puntuales que disparan el volumen de consultas en pocos días. El agente tenía que adaptarse a ambas realidades sin perder fiabilidad.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Control de bonos y sesiones consumidas</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Añadimos al CRM la capacidad de registrar cuántas sesiones incluye el bono contratado por cada clienta y cuántas ha consumido ya. Cuando la clienta escribe para agendar la siguiente sesión, el agente consulta ese dato automáticamente antes de confirmar, evitando errores de conteo que antes se gestionaban a mano en una hoja aparte.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Información de tratamientos en la base de conocimiento</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Configuramos la base de conocimiento del centro con la duración, preparación previa y cuidados posteriores de cada tratamiento, para que el agente pudiera responder preguntas informativas habituales — "¿cuánto dura la sesión?", "¿puedo maquillarme después?" — sin necesidad de que una persona del equipo interviniera en cada conversación.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Absorbiendo picos de campaña</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Cuando el centro lanza una promoción en redes sociales, el volumen de mensajes por WhatsApp se dispara en cuestión de horas. Al no depender de que una persona responda una a una, el agente mantuvo el mismo tiempo de respuesta (menos de 5 segundos) durante los picos de demanda, algo que hubiera sido imposible de sostener manualmente sin ampliar el equipo de recepción.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Resultado</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El centro mantiene hoy el mismo agente en producción, gestionando la agenda de varias cabinas y profesionales en paralelo, con el control de bonos integrado en el propio flujo de conversación. La base técnica es la misma que describimos en nuestra
        <a href="/blog/recepcionista-virtual-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía completa de recepcionista virtual para clínica dental</a>
        y en
        <a href="/blog/chatbot-whatsapp-citas-clinica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestro artículo sobre cómo funciona un chatbot de WhatsApp para citas médicas</a>,
        adaptada a las particularidades de un negocio de estética.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si diriges un centro de estética y quieres ver cómo encajaría en tu caso, puedes conocer
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o agendar una llamada sin compromiso.
      </p>
    `,
  },
  {
    slug: "diseno-web-clinica-dental",
    title: "Diseño web para clínica dental: qué convierte una visita en primera cita",
    description:
      "Qué elementos de diseño y contenido hacen que la web de una clínica dental convierta visitas en primeras citas, y cómo conectarla con un agente de WhatsApp.",
    date: "2026-07-06",
    readingTime: "6 min de lectura",
    tags: ["Diseño web", "Clínicas dentales", "Conversión"],
    image: "/img/blog/diseno-web-clinica-dental.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Muchas clínicas dentales invierten en atraer visitas a su web —a través de Google o redes sociales— y pierden gran parte de ese esfuerzo porque la propia web no hace fácil el siguiente paso: reservar una cita. Este artículo repasa qué elementos concretos de diseño y contenido marcan la diferencia entre una web que solo informa y una que realmente convierte.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">La primera impresión se juega en el móvil</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La mayoría de búsquedas de "clínica dental" se hacen desde el móvil, muchas veces con dolor o una necesidad concreta en mente. Si la web tarda en cargar o el texto no se lee bien sin hacer zoom, el paciente potencial abandona antes de llegar a ver un solo tratamiento. La velocidad de carga y el diseño responsive no son un detalle técnico: son la puerta de entrada.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Un camino claro hacia la reserva</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Muchas webs de clínicas listan servicios pero no dejan claro cómo dar el siguiente paso. Un botón de reserva visible en cada sección, y no solo en el pie de página, reduce la fricción entre "me interesa" y "he reservado". Esa fricción es exactamente lo que se elimina cuando la web conecta directamente con un agente de WhatsApp: el paciente pulsa un botón y empieza a agendar sin salir de la página ni tener que buscar un teléfono.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Contenido que genera confianza</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una ficha clara de cada tratamiento, con su duración y el profesional que lo realiza, aporta la información que un paciente nuevo necesita antes de decidirse. La confianza también se construye con detalles que muchas webs de clínicas olvidan actualizar: horarios reales, ubicación exacta y profesionales activos en el equipo.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">SEO local: aparecer cuando te buscan cerca</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Buena parte de las búsquedas relevantes para una clínica dental incluyen una referencia geográfica: "clínica dental" más el nombre de la ciudad o barrio. Sin una estructura técnica pensada para SEO local, la web puede quedar invisible precisamente en las búsquedas con mayor intención de reserva.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Web y agente, mejor juntos</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Cuando la web y el agente recepcionista de WhatsApp funcionan como un mismo sistema, el resultado supera a cualquiera de los dos por separado: la web capta y genera confianza, el agente agenda y resuelve dudas al instante. Puedes ver el funcionamiento completo del agente en nuestra
        <a href="/blog/recepcionista-virtual-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía de recepcionista virtual para clínica dental</a>.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si quieres ver ejemplos reales de webs que hemos diseñado, visita nuestro
        <a href="/servicios/diseno-web-a-medida" class="text-foreground underline underline-offset-4 hover:text-brand-teal">portfolio de diseño web</a>,
        o descubre cómo lo aplicamos específicamente al sector salud en
        <a href="/servicios/diseno-web-a-medida" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestro servicio de diseño web para clínicas</a>.
      </p>
    `,
  },
  {
    slug: "recepcionista-virtual-clinica-podologia",
    title: "AutoClinic para clínicas de podología: recepcionista virtual por WhatsApp",
    description:
      "Cómo AutoClinic se adapta a las clínicas de podología —quiropodias, estudios biomecánicos y tratamientos recurrentes— para gestionar la agenda por WhatsApp. Ya en pruebas con una clínica de Albacete.",
    date: "2026-07-13",
    readingTime: "7 min de lectura",
    tags: ["Clínicas de podología", "WhatsApp", "IA", "AutoClinic"],
    image: "/img/blog/recepcionista-virtual-clinica-podologia.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Las clínicas de podología comparten un problema con el resto del sector salud: la mayor parte de las citas se pierden o se retrasan por teléfono, fuera de horario o cuando la recepción está ocupada atendiendo en gabinete. Por eso hemos convertido a la podología en el nicho principal de AutoClinic, nuestro agente recepcionista de WhatsApp, y lo estamos configurando a medida junto a una clínica de podología en Albacete que ya lo está probando en su día a día.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Por qué la podología encaja tan bien</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La podología trabaja íntegramente por cita y con una fuerte componente de tratamientos recurrentes: una quiropodia se repite cada pocas semanas, un tratamiento de una onicomicosis o de una verruga plantar requiere varias sesiones de seguimiento, y un estudio biomecánico deriva en revisiones posteriores de las plantillas. Ese patrón de "citas que vuelven" es justo donde un agente automatizado aporta más, porque puede recordar al paciente cuándo toca la siguiente visita sin que nadie tenga que revisarlo a mano.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué gestiona el agente en una clínica de podología</h2>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Agenda por tipo de tratamiento:</strong> distingue la duración real de una quiropodia, un estudio biomecánico o una primera valoración, y ofrece solo huecos coherentes con cada servicio.</li>
        <li><strong class="text-foreground font-medium">Citas recurrentes:</strong> propone la siguiente sesión al paciente que sigue un tratamiento por fases, sin que la recepción tenga que perseguirlo.</li>
        <li><strong class="text-foreground font-medium">Recordatorios que reducen ausencias:</strong> avisos previos por WhatsApp que mantienen alta la asistencia, especialmente en tratamientos de varias sesiones.</li>
        <li><strong class="text-foreground font-medium">Preguntas frecuentes propias del sector:</strong> precios de la quiropodia, cuidados posteriores, si hace falta acudir con las uñas sin pintar, tiempos de entrega de plantillas a medida…</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Configurado a medida, no una plantilla genérica</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La adaptación al sector no consiste en cambiar cuatro palabras. Estamos alimentando la base de conocimiento del agente con los tratamientos reales de la clínica, sus duraciones, sus precios y sus políticas, exactamente igual que hicimos al llevar la tecnología del ámbito dental al de estética. Contamos ese proceso de adaptación entre sectores en nuestro artículo sobre
        <a href="/blog/automatizar-recepcion-clinica-estetica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">cómo automatizamos la recepción de un centro de estética</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">La misma base técnica probada en dental</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Por dentro, el agente de podología funciona sobre la misma arquitectura que describimos en nuestra
        <a href="/blog/recepcionista-virtual-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía completa de recepcionista virtual para clínica dental</a>:
        comprensión del lenguaje natural, consulta a la agenda en tiempo real, confirmación automática y reglas claras de derivación a una persona. Puedes ver el detalle de cada fase en nuestro
        <a href="/blog/chatbot-whatsapp-citas-clinica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">artículo técnico sobre chatbots de WhatsApp para citas médicas</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Siguiente paso</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si diriges una clínica de podología y quieres ver cómo encajaría AutoClinic en tu agenda, puedes conocer
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o agendar una llamada de 30 minutos para revisar tu caso concreto sin compromiso.
      </p>
    `,
  },
  {
    slug: "automatizar-agenda-podologo-ia-albacete",
    title: "Cómo automatizamos la agenda de un podólogo con IA (caso Albacete)",
    description:
      "Caso real en curso: cómo estamos configurando AutoClinic para una clínica de podología en Albacete, con agenda por tratamiento, seguimiento de sesiones y recordatorios por WhatsApp.",
    date: "2026-07-20",
    readingTime: "6 min de lectura",
    tags: ["Clínicas de podología", "Automatización", "Caso real", "Albacete"],
    image: "/img/blog/automatizar-agenda-podologo-ia-albacete.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Este artículo cuenta un caso real que tenemos en marcha: la puesta a punto de AutoClinic para una clínica de podología en Albacete. No es un caso cerrado con métricas finales, sino un proyecto en fase de pruebas y ajuste fino, y precisamente por eso resulta útil para entender cómo se adapta un agente recepcionista a un sector nuevo paso a paso.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">El punto de partida</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La clínica gestionaba las citas por teléfono y mensajes sueltos, con el problema habitual: llamadas perdidas fuera de horario, pacientes que olvidaban la revisión de seguimiento y una recepción que interrumpía la atención en gabinete cada vez que sonaba el móvil. El objetivo no era sustituir a nadie, sino quitar de encima la parte repetitiva de gestionar la agenda.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Mapear los tratamientos y sus tiempos</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El primer paso fue traducir los servicios de la clínica a la agenda del agente: cuánto dura realmente una quiropodia, una primera valoración, un estudio biomecánico o la revisión de unas plantillas. Sin este mapa, un agente ofrecería huecos irreales; con él, cada tipo de cita reserva el tiempo que de verdad ocupa.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Seguimiento de tratamientos por fases</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        La particularidad de la podología frente al caso dental está en el peso de los tratamientos que se prolongan varias sesiones. Configuramos el sistema para que, al cerrar una visita de seguimiento, el agente pueda proponer la siguiente cita dentro del intervalo recomendado, de forma parecida al control de sesiones que implementamos para un centro de estética y que explicamos en
        <a href="/blog/automatizar-recepcion-clinica-estetica" class="text-foreground underline underline-offset-4 hover:text-brand-teal">este caso</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Recordatorios para no perder la revisión</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Igual que en el resto de clínicas, los recordatorios automáticos por WhatsApp son la pieza que más impacto tiene sobre las ausencias. Explicamos el patrón de doble recordatorio —24 horas y 3 horas antes— y por qué funciona mejor por WhatsApp que por SMS en nuestro artículo sobre
        <a href="/blog/reducir-no-shows-clinica-recordatorios" class="text-foreground underline underline-offset-4 hover:text-brand-teal">cómo reducir las ausencias en tu clínica con recordatorios automáticos</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué viene ahora</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Estamos en la fase de revisar las conversaciones reales del agente y afinar su base de conocimiento con las preguntas concretas que hacen los pacientes de podología. Es el mismo método de validación previa que aplicamos siempre: el agente se prueba y se aprueba antes de gestionar la agenda con total autonomía. Si quieres seguir el enfoque completo, empieza por nuestra
        <a href="/blog/recepcionista-virtual-clinica-podologia" class="text-foreground underline underline-offset-4 hover:text-brand-teal">guía de AutoClinic para clínicas de podología</a>
        y conoce
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>.
      </p>
    `,
  },
  {
    slug: "portal-reservas-turismo-rural-astro",
    title: "Portal de reservas autogestionable para turismo rural: cómo funciona por dentro",
    description:
      "Cómo montar una web de casa rural con reservas propias, calendario autogestionable y recordatorios automáticos, sin comisiones de portales ni dependencia de terceros.",
    date: "2026-08-10",
    readingTime: "7 min de lectura",
    tags: ["Turismo rural", "Reservas", "Astro", "Automatización"],
    image: "/img/blog/portal-reservas-turismo-rural-astro.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        La mayoría de casas rurales gestionan sus reservas de una de estas tres formas: por teléfono, por WhatsApp con clientes que ya conocen, o cediendo entre un 15% y un 20% de cada reserva a un portal externo. Las tres funcionan hasta que dejan de hacerlo: la primera depende de que alguien coja el teléfono, la segunda no escala más allá del boca a boca, y la tercera convierte al portal en el dueño de la relación con tu cliente. Este artículo explica cómo se construye la alternativa: un portal de reservas propio y autogestionable.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué significa "autogestionable"</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Autogestionable quiere decir que el propietario no depende de nadie para operar su negocio en el día a día. En concreto, que puede hacer estas cuatro cosas sin llamar a su desarrollador:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Abrir y cerrar fechas</strong> de cada alojamiento desde un calendario visual, incluyendo bloqueos por mantenimiento o por reservas que hayan entrado por otro canal.</li>
        <li><strong class="text-foreground font-medium">Cambiar precios por temporada</strong>, fines de semana, puentes o estancias mínimas, sin tocar código.</li>
        <li><strong class="text-foreground font-medium">Publicar contenido</strong> en el blog de la web para trabajar el posicionamiento local por su cuenta.</li>
        <li><strong class="text-foreground font-medium">Ver y gestionar las reservas entrantes</strong> en un panel, con el estado de cada una y los datos del huésped.</li>
      </ul>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si falta cualquiera de las cuatro, no es un portal autogestionable: es una web con formulario que sigue dependiendo de un tercero para cada cambio.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Por qué Astro para este tipo de proyecto</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una web de turismo rural tiene un perfil de tráfico muy concreto: mucha visita desde el móvil, a menudo con cobertura mala, que llega buscando fotos del entorno y disponibilidad. La velocidad de carga no es un capricho técnico, es directamente conversión.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Astro genera páginas estáticas y envía al navegador solo el JavaScript imprescindible, en lugar de cargar un framework entero para mostrar un texto y unas fotos. El resultado son páginas que pintan casi instantáneamente incluso en conexiones lentas, lo que además ayuda al posicionamiento porque Google mide la experiencia de carga real de los usuarios. La parte interactiva —el calendario, el formulario de reserva— se carga solo donde hace falta.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Las tres piezas del sistema</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">1. La web pública.</strong> Es el escaparate: fotos de los alojamientos y del entorno, descripción de cada cabaña o casa, precios, normas y el formulario de reserva. Aquí es donde se juega el SEO local, que en turismo rural es casi todo el juego: la gente busca "casa rural en" seguido del nombre de la zona, y quien no aparece en esa búsqueda no existe.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">2. El panel de administración.</strong> Es la parte privada donde el propietario gestiona su negocio: calendario, precios, reservas y blog. Debe estar pensado para alguien que no es técnico, con la lógica de un calendario de pared antes que la de un sistema de gestión.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">3. El calendario vinculado.</strong> Es la pieza crítica y la que más falla en las soluciones improvisadas. El calendario del panel y la disponibilidad que ve el visitante en la web tienen que ser el mismo dato. Si son dos sistemas que se sincronizan cada cierto tiempo, antes o después aparece la doble reserva.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué se puede automatizar</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una vez las reservas entran por un sistema propio, se abre la puerta a automatizar la comunicación con el huésped, que es donde más tiempo se pierde:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Confirmación inmediata</strong> de la reserva, con los datos de la estancia y las instrucciones de llegada.</li>
        <li><strong class="text-foreground font-medium">Recordatorio previo</strong> unos días antes, con la dirección exacta, el horario de entrada y cómo recoger las llaves. Reduce drásticamente las llamadas del tipo "¿dónde está exactamente?".</li>
        <li><strong class="text-foreground font-medium">Mensaje posterior a la salida</strong> pidiendo una reseña, que es el activo que más mueve las reservas futuras en este sector.</li>
        <li><strong class="text-foreground font-medium">Aviso interno al propietario</strong> cada vez que entra una reserva, para que no dependa de mirar el panel.</li>
      </ul>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El mismo enfoque de recordatorios automáticos que aplicamos en el sector salud funciona aquí: lo explicamos en detalle en nuestro artículo sobre
        <a href="/blog/reducir-no-shows-clinica-recordatorios" class="text-foreground underline underline-offset-4 hover:text-brand-teal">cómo reducir las ausencias con recordatorios automáticos</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Lo que se gana frente a los portales</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Un portal externo aporta visibilidad inicial, y por eso tiene sentido no abandonarlo de golpe. Pero cada reserva que entra por tu propia web es una reserva sin comisión, con los datos del huésped en tu poder y con la posibilidad de que repita contactando directamente contigo. La estrategia razonable no es renunciar a los portales, sino dejar de depender exclusivamente de ellos.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Hay un cambio menos evidente y más importante: cuando la disponibilidad está en tu sistema, dejas de decir "te confirmo esta tarde" y pasas a confirmar en el momento. En un sector donde el cliente está mirando tres alojamientos a la vez, responder al instante decide la reserva.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Un caso real</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Hemos construido exactamente este sistema para Cabañas El Acuífero, seis cabañas rurales en las Lagunas de Ruidera. El propietario gestionaba las reservas por teléfono y boca a boca, sin web ni calendario. Hoy tiene su portal de reservas, un panel desde el que administra el blog y una aplicación de calendario que desarrollamos dentro del propio panel, vinculada a la web para controlar fechas y disponibilidad. Puedes ver el proyecto en
        <a href="/servicios/diseno-web-a-medida" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestro portfolio de diseño web</a>.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Si gestionas un alojamiento rural y estás en el punto de "las reservas me las lleva el teléfono", es probable que el sistema que necesitas sea más sencillo de lo que imaginas. Cuéntanos tu caso y lo vemos.
      </p>
    `,
  },
  {
    slug: "autoclinic-agente-crm-clinicas",
    title: "Qué es AutoClinic: el agente de WhatsApp y CRM para clínicas, explicado",
    description:
      "AutoClinic combina un agente de IA que atiende WhatsApp con un CRM que centraliza agenda, pacientes y servicios. Explicamos qué hace cada parte y cómo se implanta.",
    date: "2026-08-24",
    readingTime: "7 min de lectura",
    tags: ["AutoClinic", "WhatsApp", "CRM", "Clínicas"],
    image: "/img/blog/autoclinic-agente-crm-clinicas.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        AutoClinic es el producto que hemos desarrollado en Propus para que una clínica deje de perder citas por no poder atender el teléfono. Son dos piezas que funcionan juntas: un agente de inteligencia artificial que atiende WhatsApp las 24 horas y un CRM que centraliza la agenda, los pacientes y los servicios. Este artículo explica qué hace cada parte, por qué no sirve una sin la otra y cómo es el proceso de implantación real.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">El problema que resuelve</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        En una clínica que trabaja por cita, la recepción hace varias cosas a la vez: atiende al paciente que está delante, coge el teléfono, cuadra la agenda de varios profesionales y responde mensajes. Cuando coinciden, algo cae. Y lo que cae casi siempre es la llamada del paciente nuevo que estaba decidiendo entre tu clínica y otra.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        A eso se suma el horario. Buena parte de las peticiones de cita llegan por la tarde-noche o el fin de semana, cuando la clínica está cerrada. Un paciente que no recibe respuesta no espera: busca otra opción.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">La primera pieza: el agente de WhatsApp</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El agente atiende el número de WhatsApp de la clínica y mantiene una conversación normal, escrita con las palabras del paciente. No es un menú de botones ni un árbol de opciones: alguien puede escribir "¿tenéis hueco esta semana por la tarde?" y el agente entiende la intención, consulta la disponibilidad real y propone huecos concretos.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Lo que hace en la práctica:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Agenda citas</strong> según el tipo de tratamiento y el profesional que lo realiza, respetando la duración real de cada servicio.</li>
        <li><strong class="text-foreground font-medium">Cancela y reprograma</strong> sin que nadie tenga que intervenir, liberando el hueco al instante.</li>
        <li><strong class="text-foreground font-medium">Envía recordatorios</strong> antes de la cita, que es la medida que más reduce las ausencias.</li>
        <li><strong class="text-foreground font-medium">Responde dudas frecuentes</strong> sobre horarios, ubicación, precios orientativos o preparación previa a un tratamiento, a partir de la información real de la clínica.</li>
        <li><strong class="text-foreground font-medium">Deriva a una persona</strong> cuando la consulta se sale de lo que sabe responder, en lugar de improvisar.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">La segunda pieza: el CRM</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El agente es la parte visible, pero su fiabilidad depende por completo del sistema que hay detrás. Un agente conversacional sin un CRM sólido es un chatbot que promete citas que luego no cuadran.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El CRM de AutoClinic centraliza la agenda por profesional y por servicio, la ficha de cada paciente con su historial de citas, el catálogo de tratamientos con sus duraciones, y una base de conocimiento con la información propia de la clínica que el agente consulta para responder. Todo lo que el agente dice sale de ahí, no de un modelo inventando.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Desarrollamos el checklist completo de lo que debe cubrir un sistema de gestión de este tipo en nuestro artículo sobre
        <a href="/blog/software-gestion-clinica-dental" class="text-foreground underline underline-offset-4 hover:text-brand-teal">qué debe tener un software de gestión para clínica</a>.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cómo es la implantación</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El proceso habitual dura entre dos y tres semanas y tiene cuatro fases:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Diagnóstico.</strong> Recogemos los servicios reales, los profesionales, sus horarios y las preguntas que más repiten los pacientes.</li>
        <li><strong class="text-foreground font-medium">Configuración.</strong> Cargamos esa información en el CRM y ajustamos el agente al tono y a las normas de la clínica.</li>
        <li><strong class="text-foreground font-medium">Pruebas internas.</strong> El equipo de la clínica conversa con el agente antes de que lo haga ningún paciente, y corregimos lo que haga falta. Esta fase no se salta.</li>
        <li><strong class="text-foreground font-medium">Puesta en marcha y ajuste.</strong> Se abre a pacientes reales y revisamos las conversaciones de las primeras semanas para afinar la base de conocimiento.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Para qué clínicas está pensado</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Nuestro nicho principal son las clínicas de podología, donde ya estamos en fase beta con una clínica real en Albacete, y el segundo son las clínicas dentales. El sistema se adapta a cualquier consulta que trabaje por cita y con varios profesionales: centros de estética, fisioterapia o consultas médicas privadas.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Hay una cosa que conviene dejar clara: el agente no diagnostica ni sustituye el criterio de un profesional sanitario. Su función es informar y gestionar la agenda, y siempre existe la posibilidad de hablar con una persona.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Puedes ver el detalle del producto en
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o leer cómo lo estamos aplicando en
        <a href="/blog/recepcionista-virtual-clinica-podologia" class="text-foreground underline underline-offset-4 hover:text-brand-teal">clínicas de podología</a>.
      </p>
    `,
  },
  {
    slug: "autoclinic-integracion-api-crm",
    title: "Integrar AutoClinic con tu CRM actual: qué hace falta y qué límites tiene",
    description:
      "AutoClinic puede conectarse con el software de gestión que ya usa tu clínica siempre que exista una API con acceso. Explicamos qué se necesita y cuándo no es viable.",
    date: "2026-09-05",
    readingTime: "6 min de lectura",
    tags: ["AutoClinic", "Integraciones", "API", "CRM"],
    image: "/img/blog/autoclinic-integracion-api-crm.jpg",
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
        Es la pregunta que más nos hacen las clínicas que ya llevan años funcionando: "yo ya tengo un programa de gestión, ¿tengo que cambiarlo?". La respuesta corta es no, siempre que ese programa permita conectarse desde fuera. Este artículo explica qué significa eso exactamente, qué necesitamos para hacerlo y en qué casos la integración no es viable, que también los hay.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Las dos formas de trabajar</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        AutoClinic puede funcionar de dos maneras distintas, y la elección depende de dónde quieras que viva la agenda:
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">1. Con nuestro CRM.</strong> La clínica usa el sistema de gestión que hemos desarrollado, y agenda, pacientes y servicios viven ahí. Es la opción más rápida de poner en marcha y la que menos depende de terceros.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        <strong class="text-foreground font-medium">2. Conectado a tu software actual.</strong> La agenda sigue estando en el programa que ya usas, y el agente de WhatsApp consulta y escribe en él. Tu equipo no cambia de herramienta; simplemente empiezan a entrar citas solas.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué es una API y por qué lo cambia todo</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una API es la puerta que un programa deja abierta para que otros programas hablen con él de forma controlada. Sin API, la única manera de que dos sistemas compartan información es que una persona la copie de uno a otro.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Para que AutoClinic pueda trabajar sobre tu software de gestión, ese software tiene que ofrecer una API y tú tienes que autorizarnos el acceso. Esto último es importante: <strong class="text-foreground font-medium">el acceso lo concede siempre la clínica, no nosotros</strong>. Nadie puede conectarse a tu sistema sin que tú lo autorices expresamente.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué necesitamos exactamente</h2>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">Documentación de la API</strong> del proveedor, o el contacto de su equipo técnico.</li>
        <li><strong class="text-foreground font-medium">Credenciales de acceso</strong> emitidas a nombre de la clínica, idealmente con permisos limitados a lo estrictamente necesario.</li>
        <li><strong class="text-foreground font-medium">Cuatro operaciones mínimas</strong>: consultar disponibilidad, crear una cita, modificarla o cancelarla, y leer el catálogo de servicios y profesionales. Si falta la de consultar disponibilidad en tiempo real, la integración no se sostiene.</li>
        <li><strong class="text-foreground font-medium">Un entorno de pruebas</strong>, si el proveedor lo ofrece, para no experimentar sobre la agenda real.</li>
      </ul>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cuándo no es viable</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Preferimos decirlo antes que descubrirlo a mitad del proyecto. Hay tres situaciones en las que la integración no sale adelante:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
        <li><strong class="text-foreground font-medium">El software no tiene API.</strong> Ocurre con programas antiguos instalados en un ordenador de la clínica. No hay forma de conectarse sin recurrir a métodos frágiles que acaban rompiéndose.</li>
        <li><strong class="text-foreground font-medium">La API es de solo lectura.</strong> Podemos consultar la agenda pero no crear citas, así que el agente informa pero no reserva, que es justo lo que aporta valor.</li>
        <li><strong class="text-foreground font-medium">El proveedor no autoriza el acceso</strong> o lo condiciona a un plan superior. Es una decisión comercial suya y no depende de nosotros.</li>
      </ul>
      <p class="text-muted-foreground leading-relaxed mb-4">
        En esos casos la salida suele ser migrar la agenda a nuestro CRM, o convivir un tiempo con los dos sistemas mientras se decide.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Qué pasa con los datos de los pacientes</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Una integración implica que datos de pacientes viajan entre sistemas, y en el sector sanitario eso tiene consecuencias legales concretas. La clínica sigue siendo la responsable del tratamiento y Propus actúa como encargado, bajo un contrato de encargo conforme al artículo 28 del RGPD. Los datos de las conversaciones se alojan en centros de datos situados en la Unión Europea.
      </p>
      <p class="text-muted-foreground leading-relaxed mb-4">
        Todo el detalle está en
        <a href="/legal/privacidad" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra política de privacidad</a>,
        que incluye los proveedores concretos que intervienen y dónde se procesa cada cosa.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground">Cómo empezar</h2>
      <p class="text-muted-foreground leading-relaxed mb-4">
        El primer paso es sencillo: dinos qué software de gestión usa tu clínica. Con ese dato podemos comprobar si tiene API pública y qué permite hacer, normalmente en un par de días. A partir de ahí sabremos si la vía es integrar o migrar. Puedes ver el producto completo en
        <a href="/servicios/autoclinic" class="text-foreground underline underline-offset-4 hover:text-brand-teal">nuestra solución de agente y CRM para clínicas</a>
        o leer primero
        <a href="/blog/autoclinic-agente-crm-clinicas" class="text-foreground underline underline-offset-4 hover:text-brand-teal">qué es AutoClinic y cómo funciona</a>.
      </p>
    `,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/** Número total de páginas del listado. Nunca devuelve menos de 1. */
export function getTotalPages(): number {
  return Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE))
}

/**
 * Devuelve los posts de una página (1-indexada). Una página fuera de rango
 * devuelve un array vacío, que la ruta traduce en un 404.
 */
export function getPostsByPage(page: number): BlogPost[] {
  const start = (page - 1) * POSTS_PER_PAGE
  return getAllPosts().slice(start, start + POSTS_PER_PAGE)
}
