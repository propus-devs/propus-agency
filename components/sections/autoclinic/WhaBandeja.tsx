import {
  InboxIcon,
  PenLineIcon,
  PauseIcon,
  PowerIcon,
  FootprintsIcon,
  RulerIcon,
  ClipboardListIcon,
  FileSignatureIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n/idiomas"

/* Todo lo que se afirma aquí sale de planes-auto-clinic/PRODUCTO.md y existe en
   el producto. Dos cosas que NO se pueden decir y por eso no están: que el hilo
   se refresque en tiempo real (pendiente) y que el modelo corra dentro del
   panel (lo genera un motor externo). */

const iconosControl = [PenLineIcon, PauseIcon, PowerIcon]
const iconosNicho = [RulerIcon, FootprintsIcon, TriangleAlertIcon, ClipboardListIcon, FileSignatureIcon]

interface Control {
  title: string
  body: string
}

interface Detalle {
  title: string
  body: string
}

interface Mensaje {
  autor: "paciente" | "ia" | "humano"
  texto: string
  hora: string
}

interface Textos {
  etiqueta: string
  titulo: [string, string]
  entradilla: string
  problema: string
  solucion: string
  caida: string
  controlTitulo: string
  controles: [Control, Control, Control]
  ventana: string
  hilo: { paciente: string; ia: string; humano: string; mensajes: Mensaje[] }
  nichoEtiqueta: string
  nichoTitulo: [string, string]
  nichoSubtitulo: string
  detalles: [Detalle, Detalle, Detalle, Detalle, Detalle]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "La bandeja de chats",
    titulo: ["Tu WhatsApp, ", "dentro del programa"],
    entradilla:
      "Esto es lo que nadie te cuenta antes de conectar tu número, y es la razón por la que la mayoría de los agentes de WhatsApp acaban siendo un problema.",
    problema:
      "Cuando conectas tu número a la API oficial de WhatsApp Business, ese número deja de funcionar en la aplicación normal. No puedes abrir WhatsApp en el móvil de la clínica y leer lo que te escribió un paciente.",
    solucion:
      "La bandeja de AutoClinic es ese WhatsApp. Con la ventaja de estar dentro del programa de gestión, al lado de la ficha del paciente: lista de conversaciones con búsqueda y filtro de no leídos, el hilo completo y un cuadro para escribir a mano.",
    caida:
      "Y lo que escribes a mano va directo a la API de Meta, sin pasar por el motor del agente. Si el agente se cae, tú sigues hablando con tus pacientes.",
    controlTitulo: "Tres niveles de control sobre el agente",
    controles: [
      {
        title: "Escribir lo aparta solo",
        body: "En cuanto una persona escribe en el hilo, el agente se calla ahí. Sin pulsar nada. Lo retoma tras unos segundos de inactividad, y cuando vuelve recibe los últimos mensajes humanos: no continúa sin saber lo que acabas de decir.",
      },
      {
        title: "Modo humano por conversación",
        body: "Una pausa explícita que no caduca, para la conversación delicada. El agente no vuelve a entrar en ese hilo hasta que tú lo decidas.",
      },
      {
        title: "Interruptor general",
        body: "Apaga el agente en todos los chats de la clínica. Puedes empezar con él apagado y usar sólo la gestión, y encenderlo cuando te fíes.",
      },
    ],
    ventana:
      "WhatsApp sólo permite escribir texto libre durante las 24 h siguientes al último mensaje del paciente. El panel no lo disimula: bloquea el cuadro y te explica por qué. Y si Meta rechaza un envío, el mensaje queda marcado como fallido con el motivo, en vez de aparentar que salió.",
    hilo: {
      paciente: "Paciente",
      ia: "Agente",
      humano: "Clínica",
      mensajes: [
        { autor: "paciente", texto: "Buenas, ¿tenéis hueco para quiropodia esta semana?", hora: "21:38" },
        { autor: "ia", texto: "Sí. El jueves a las 10:00 o el viernes a las 17:30, con Marta. ¿Cuál te viene mejor?", hora: "21:38" },
        { autor: "paciente", texto: "El jueves. Llevo una uña encarnada que me duele bastante", hora: "21:41" },
        { autor: "humano", texto: "Te lo dejo reservado y le aviso a Marta para que te reserve más tiempo.", hora: "21:44" },
      ],
    },
    nichoEtiqueta: "Hecho sólo para podología",
    nichoTitulo: ["No es un software de clínicas ", "con podología añadida"],
    nichoSubtitulo:
      "Un programa genérico te deja un campo de texto libre para apuntar lo que haga falta. Aquí la historia clínica está construida sobre cómo trabaja un podólogo.",
    detalles: [
      {
        title: "La lesión es una serie, no un dato",
        body: "Medidas en milímetros y foto en cada visita, con la evolución ordenada y dos momentos comparados lado a lado. Pasas de «tiene una úlcera» a «ha pasado de 14 a 5 mm en seis semanas».",
      },
      {
        title: "Mapa del pie",
        body: "Vistas dorsal, plantar, medial y lateral, de los dos pies. Cada lesión se marca donde está, no se describe con palabras en una nota.",
      },
      {
        title: "Alertas que se derivan solas",
        body: "Diabetes, anticoagulación o alergia a anestésicos locales salen de la anamnesis y aparecen en una banda siempre visible, ordenada por gravedad. Una alerta corregida se desactiva, nunca se borra.",
      },
      {
        title: "Anamnesis versionada",
        body: "Cambiar una pregunta obliga a publicar una versión nueva, y la respuesta guarda copia literal de lo que se mostró y de lo que se contestó. Retocar el cuestionario no reescribe lo que alguien respondió el año pasado.",
      },
      {
        title: "Consentimientos y procedimientos",
        body: "Consentimientos informados versionados, con el texto literal firmado. Y cada procedimiento congela nombre y precio del día en que se hizo: una subida de tarifas no reescribe lo que costó una quiropodia el año pasado.",
      },
    ],
  },
  en: {
    etiqueta: "The chat inbox",
    titulo: ["Your WhatsApp, ", "inside the software"],
    entradilla:
      "This is what nobody tells you before you connect your number, and it's the reason most WhatsApp agents end up being a problem.",
    problema:
      "When you connect your number to the official WhatsApp Business API, that number stops working in the normal app. You can't open WhatsApp on the clinic's phone and read what a patient wrote to you.",
    solucion:
      "AutoClinic's inbox is that WhatsApp. With the advantage of sitting inside the management software, next to the patient's record: a conversation list with search and an unread filter, the full thread and a box to write by hand.",
    caida:
      "And what you write by hand goes straight to Meta's API, without going through the agent engine. If the agent goes down, you keep talking to your patients.",
    controlTitulo: "Three levels of control over the agent",
    controles: [
      {
        title: "Writing steps it aside on its own",
        body: "As soon as a person writes in the thread, the agent goes quiet there. Without pressing anything. It resumes after a few seconds of inactivity, and when it comes back it receives the latest human messages: it doesn't carry on without knowing what you just said.",
      },
      {
        title: "Human mode per conversation",
        body: "An explicit pause that doesn't expire, for the delicate conversation. The agent won't step back into that thread until you decide.",
      },
      {
        title: "Master switch",
        body: "Turns the agent off across every chat in the clinic. You can start with it off and use only the management side, then switch it on when you trust it.",
      },
    ],
    ventana:
      "WhatsApp only allows free text during the 24 h after the patient's last message. The panel doesn't hide it: it blocks the box and explains why. And if Meta rejects a send, the message is marked as failed with the reason, instead of pretending it went out.",
    hilo: {
      paciente: "Patient",
      ia: "Agent",
      humano: "Clinic",
      mensajes: [
        { autor: "paciente", texto: "Hi, do you have a slot for chiropody this week?", hora: "21:38" },
        { autor: "ia", texto: "Yes. Thursday at 10:00 or Friday at 17:30, with Marta. Which suits you better?", hora: "21:38" },
        { autor: "paciente", texto: "Thursday. I have an ingrown nail and it hurts quite a bit", hora: "21:41" },
        { autor: "humano", texto: "I'll book it for you and let Marta know so she sets aside more time.", hora: "21:44" },
      ],
    },
    nichoEtiqueta: "Built for podiatry only",
    nichoTitulo: ["Not clinic software ", "with podiatry bolted on"],
    nichoSubtitulo:
      "A generic program gives you a free-text field to jot down whatever you need. Here the clinical record is built around how a podiatrist actually works.",
    detalles: [
      {
        title: "A lesion is a series, not a field",
        body: "Measurements in millimetres and a photo at every visit, with the progression in order and two moments compared side by side. You go from «there's an ulcer» to «it went from 14 to 5 mm in six weeks».",
      },
      {
        title: "Foot map",
        body: "Dorsal, plantar, medial and lateral views, both feet. Each lesion is marked where it is, not described in words in a note.",
      },
      {
        title: "Alerts that derive themselves",
        body: "Diabetes, anticoagulation or local anaesthetic allergy come out of the anamnesis and appear in an always-visible band, ordered by severity. A corrected alert is deactivated, never deleted.",
      },
      {
        title: "Versioned anamnesis",
        body: "Changing a question forces a new version, and the answer keeps a literal copy of what was shown and what was answered. Tweaking the questionnaire doesn't rewrite what someone answered last year.",
      },
      {
        title: "Consents and procedures",
        body: "Versioned informed consents, keeping the literal signed text. And every procedure freezes the name and price of the day it was done: a price rise doesn't rewrite what a chiropody session cost last year.",
      },
    ],
  },
}

export default function WhaBandeja({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="bandeja" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* Cabecera */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
            <InboxIcon className="size-3.5" />
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">{t.entradilla}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-2">

          {/* Columna texto */}
          <div className="flex flex-col gap-5">
            {/* El problema, en cita: es la frase que más convence */}
            <blockquote className="rounded-2xl border-l-2 border-rose-400/60 bg-rose-500/5 px-6 py-5 text-sm leading-relaxed text-wha-muted">
              {t.problema}
            </blockquote>

            <p className="text-base leading-relaxed text-wha-muted">{t.solucion}</p>

            <p className="rounded-2xl border border-wha-teal/25 bg-wha-teal/5 px-6 py-5 text-sm leading-relaxed text-wha-fg">
              {t.caida}
            </p>

            <h3 className="mt-2 text-sm font-semibold uppercase tracking-widest text-wha">
              {t.controlTitulo}
            </h3>
            <div className="flex flex-col gap-3">
              {t.controles.map((c, i) => {
                const Icon = iconosControl[i]
                return (
                  <div
                    key={c.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/8 bg-wha-card/60 px-5 py-5 backdrop-blur-sm"
                  >
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-wha/12">
                      <Icon className="size-4.5 text-wha" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-wha-fg">{c.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-wha-muted">{c.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Columna visual: el hilo, con el color distinguiendo quién habló */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-wha-card p-6 shadow-2xl shadow-black/50">
              {/* Leyenda: es el detalle que hay que entender de un vistazo */}
              <div className="mb-5 flex flex-wrap items-center gap-4 border-b border-white/8 pb-4">
                <Leyenda color="bg-white/15" texto={t.hilo.paciente} />
                <Leyenda color="bg-wha-teal" texto={t.hilo.ia} />
                <Leyenda color="bg-wha-alt" texto={t.hilo.humano} />
              </div>

              <div className="flex flex-col gap-3">
                {t.hilo.mensajes.map((m, i) => (
                  <Burbuja key={i} mensaje={m} />
                ))}
              </div>
            </div>

            <p className="rounded-2xl border border-dashed border-white/15 bg-wha-card/40 px-6 py-5 text-xs leading-relaxed text-wha-muted">
              {t.ventana}
            </p>
          </div>
        </div>

        {/* El nicho */}
        <div className="mt-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha-teal/30 bg-wha-teal/10 px-4 py-1.5 text-xs font-semibold text-wha-teal">
              <FootprintsIcon className="size-3.5" />
              {t.nichoEtiqueta}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
              {t.nichoTitulo[0]}
              <span className="bg-linear-to-r from-wha-teal to-wha bg-clip-text text-transparent">
                {t.nichoTitulo[1]}
              </span>
            </h2>
            <p className="mt-4 text-wha-muted">{t.nichoSubtitulo}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.detalles.map((d, i) => {
              const Icon = iconosNicho[i]
              return (
                <div
                  key={d.title}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border p-6 backdrop-blur-sm",
                    i === 0
                      ? "border-wha-teal/40 bg-linear-to-br from-wha-teal/10 via-wha-card to-wha/10 lg:col-span-2"
                      : "border-white/8 bg-wha-card/60"
                  )}
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-wha-teal/12">
                    <Icon className="size-5 text-wha-teal" />
                  </div>
                  <h3 className="text-base font-semibold text-wha-fg">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-wha-muted">{d.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Leyenda({ color, texto }: { color: string; texto: string }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-medium text-wha-muted">
      <span className={cn("size-2.5 rounded-full", color)} />
      {texto}
    </span>
  )
}

function Burbuja({ mensaje }: { mensaje: Mensaje }) {
  const esPaciente = mensaje.autor === "paciente"
  return (
    <div className={cn("flex", esPaciente ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5",
          esPaciente && "rounded-bl-sm bg-white/8 text-wha-fg",
          mensaje.autor === "ia" && "rounded-br-sm bg-wha-teal/20 text-wha-fg",
          mensaje.autor === "humano" && "rounded-br-sm bg-wha-alt/20 text-wha-fg"
        )}
      >
        <p className="text-sm leading-snug">{mensaje.texto}</p>
        <span className="mt-1 block text-right text-[10px] text-wha-muted">{mensaje.hora}</span>
      </div>
    </div>
  )
}
