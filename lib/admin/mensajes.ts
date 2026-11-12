import { DIAS_SEMANA } from "@/lib/reservas/validacion"

/**
 * Avisos del admin. Las acciones redirigen con un código corto (?ok=… o
 * ?error=…) y la pantalla lo traduce aquí. Solo se muestran códigos conocidos:
 * nunca se pinta tal cual un texto que venga en la URL.
 */

const OK: Record<string, string> = {
  agenda: "Cambios guardados.",
  "bloqueo-creado": "Bloqueo añadido.",
  "bloqueo-borrado": "Bloqueo eliminado.",
  "reserva-cancelada": "Reserva cancelada.",
  barajado: "Listo: se esconden otros huecos (el mismo porcentaje).",
}

const ERROR: Record<string, string> = {
  incorrecta: "Contraseña incorrecta.",
  "no-configurado":
    "El acceso no está configurado: faltan ADMIN_PASSWORD_HASH y AUTH_SECRET en las variables de entorno.",
  servidor: "No se ha podido guardar. Inténtalo de nuevo en unos segundos.",
  "ajustes-invalidos":
    "Revisa los ajustes: la duración va de 5 a 240 min, el descanso de 0 a 120, el aviso mínimo de 0 a 720 h y los días por delante de 1 a 120.",
  "bloqueo-fecha": "La fecha del bloqueo no es válida.",
  "bloqueo-hora": "La hora del bloqueo no es válida (o esa hora no existe por el cambio de hora).",
  "bloqueo-orden": "El bloqueo tiene que terminar después de empezar.",
  "reserva-no-encontrada": "No se ha encontrado la reserva (puede que ya estuviera cancelada).",
  "hueco-no-valido": "Ese hueco ya no existe en el horario o está reservado o bloqueado.",
}

const ERROR_HORARIO: Record<string, string> = {
  "horario-incompleto": "falta la hora de inicio o la de fin de un tramo",
  "horario-invalido": "hay una hora que no es válida",
  "horario-orden": "un tramo termina antes de empezar",
  "horario-solape": "dos tramos se pisan",
}

export function textoOk(codigo: string | undefined): string | null {
  return (codigo && OK[codigo]) || null
}

export function textoError(
  codigo: string | undefined,
  extra: { dia?: string; espera?: string } = {}
): string | null {
  if (!codigo) return null
  if (codigo === "bloqueado") {
    const minutos = Number(extra.espera)
    const cuanto = Number.isInteger(minutos) && minutos > 0 && minutos <= 60 ? `${minutos} min` : "un rato"
    return `Demasiados intentos. Vuelve a probar en ${cuanto}.`
  }
  const horario = ERROR_HORARIO[codigo]
  if (horario) {
    const dia = Number(extra.dia)
    const nombre = Number.isInteger(dia) && dia >= 1 && dia <= 7 ? DIAS_SEMANA[dia - 1] : null
    return `Horario sin guardar: ${nombre ? `el ${nombre.toLowerCase()}, ` : ""}${horario}.`
  }
  return ERROR[codigo] ?? null
}
