/**
 * Traducción al inglés de los mensajes que devuelve la API de reservas.
 *
 * El servidor (route.ts, publico.ts y validacion.ts) responde siempre en
 * español; la web en inglés traduce en el navegador con este diccionario, que
 * va por el texto exacto en español. Si llega un mensaje que no está aquí (por
 * ejemplo, uno nuevo que se añadió en el servidor sin traducir) se enseña tal
 * cual, en español: nunca queda vacío. La prueba mensajes-en.test.mjs lee esos
 * tres archivos y falla si hay algún mensaje sin traducción.
 *
 * Módulo puro, sin imports.
 */

export const MENSAJES_EN: Record<string, string> = {
  // route.ts
  "Petición no permitida.": "Request not allowed.",
  "Formato no válido.": "Invalid format.",
  "Hay demasiadas reservas en poco tiempo. Escríbenos por correo y te buscamos hueco.":
    "There have been too many bookings in a short time. Email us and we'll find you a slot.",
  "Reservas no disponibles. Escríbenos por correo.":
    "Bookings are not available. Please email us.",
  "Los datos enviados son demasiado grandes.": "The data sent is too large.",
  "Los datos no son válidos.": "The data is not valid.",
  "No hemos podido guardar la reserva. Inténtalo de nuevo en unos minutos o escríbenos.":
    "We couldn't save your booking. Try again in a few minutes or email us.",

  // publico.ts
  "Ahora mismo no podemos aceptar reservas. Escríbenos por correo.":
    "We can't accept bookings right now. Please email us.",
  "La página lleva mucho tiempo abierta. Recárgala e inténtalo de nuevo.":
    "The page has been open for a long time. Reload it and try again.",
  "Vas muy rápido. Espera unos segundos e inténtalo de nuevo.":
    "You're going too fast. Wait a few seconds and try again.",
  "No hemos podido comprobar el formulario. Recarga la página e inténtalo de nuevo.":
    "We couldn't verify the form. Reload the page and try again.",
  "Ahora mismo no se aceptan reservas. Escríbenos por correo y te buscamos hueco.":
    "We're not accepting bookings right now. Email us and we'll find you a slot.",
  "Ese hueco ya no está disponible. Elige otra hora.":
    "That slot is no longer available. Pick another time.",
  "Ya tienes reservas pendientes con este correo. Si necesitas cambiarlas, escríbenos.":
    "You already have pending bookings with this email. If you need to change them, email us.",
  "Ese hueco se acaba de ocupar. Elige otra hora.":
    "That slot has just been taken. Pick another time.",

  // validacion.ts
  "Los datos no son válidos. Recarga la página e inténtalo de nuevo.":
    "The data is not valid. Reload the page and try again.",
  "Escribe tu nombre (entre 2 y 80 caracteres).":
    "Enter your name (between 2 and 80 characters).",
  "Escribe un correo electrónico válido.": "Enter a valid email address.",
  "El teléfono no parece válido. Puedes dejarlo en blanco.":
    "The phone number doesn't look valid. You can leave it blank.",
  "El mensaje es demasiado largo (máximo 500 caracteres).":
    "The message is too long (maximum 500 characters).",
  "Elige un día y una hora.": "Choose a day and a time.",
  "Para reservar tienes que aceptar la política de privacidad.":
    "To book, you need to accept the privacy policy.",
}

/** Mensaje de la API en el idioma pedido. En español, o si falta la traducción, el original. */
export function traducirMensaje(mensaje: string, idioma: "es" | "en"): string {
  return idioma === "en" ? (MENSAJES_EN[mensaje] ?? mensaje) : mensaje
}
