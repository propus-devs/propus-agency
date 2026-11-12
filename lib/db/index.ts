import "server-only"
import { Pool, type PoolClient, type QueryResultRow } from "pg"
import { migraciones } from "./migraciones"

/**
 * Acceso a Postgres (DATABASE_URL). La conexión y el esquema se preparan la
 * primera vez que se usa, no al importar: así `next build` no necesita base de
 * datos y una caída de la base no tumba las páginas que no la usan.
 */

type Global = typeof globalThis & {
  __propusPool?: Pool
  __propusEsquema?: Promise<void>
}
const g = globalThis as Global

/** Ejecuta una consulta con parámetros ($1, $2…) dentro de una transacción. */
export type Consulta = <T extends QueryResultRow>(texto: string, valores?: unknown[]) => Promise<T[]>

export function hayBaseDeDatos(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

/**
 * Conexiones simultáneas a la base: 5 por defecto. DATABASE_POOL_MAX=1 solo
 * hace falta con la base embebida de desarrollo (`npm run db:dev`), que no
 * aguanta varias conexiones a la vez; con Postgres de verdad no se toca.
 */
function conexionesMaximas(): number {
  const n = Number(process.env.DATABASE_POOL_MAX)
  return Number.isInteger(n) && n >= 1 && n <= 20 ? n : 5
}

function crearPool(): Pool {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("Falta la variable DATABASE_URL")
  const pool = new Pool({
    connectionString: url,
    max: conexionesMaximas(),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  })
  // Sin este manejador, una conexión inactiva que se cae tumbaría el proceso.
  pool.on("error", (error) => console.error("[db] conexión inactiva caída:", error.message))
  return pool
}

const CLAVE_BLOQUEO_MIGRACIONES = 727_274

async function aplicarMigraciones(pool: Pool): Promise<void> {
  const cliente = await pool.connect()
  try {
    // Si dos arranques coinciden, el segundo espera a que el primero termine.
    await cliente.query("select pg_advisory_lock($1)", [CLAVE_BLOQUEO_MIGRACIONES])
    try {
      await cliente.query(
        "create table if not exists migraciones (id text primary key, aplicada_en timestamptz not null default now())"
      )
      const hechas = await cliente.query<{ id: string }>("select id from migraciones")
      const aplicadas = new Set(hechas.rows.map((fila) => fila.id))
      for (const migracion of migraciones) {
        if (aplicadas.has(migracion.id)) continue
        await cliente.query("begin")
        try {
          await cliente.query(migracion.sql)
          await cliente.query("insert into migraciones (id) values ($1)", [migracion.id])
          await cliente.query("commit")
        } catch (error) {
          await cliente.query("rollback")
          throw error
        }
      }
    } finally {
      await cliente.query("select pg_advisory_unlock($1)", [CLAVE_BLOQUEO_MIGRACIONES])
    }
  } finally {
    cliente.release()
  }
}

async function listo(): Promise<Pool> {
  const pool = (g.__propusPool ??= crearPool())
  g.__propusEsquema ??= aplicarMigraciones(pool).catch((error) => {
    // Si falla, la próxima petición lo reintenta en vez de quedarse rota para siempre.
    g.__propusEsquema = undefined
    throw error
  })
  await g.__propusEsquema
  return pool
}

export async function consulta<T extends QueryResultRow>(
  texto: string,
  valores: unknown[] = []
): Promise<T[]> {
  const pool = await listo()
  const resultado = await pool.query<T>(texto, valores)
  return resultado.rows
}

function consultaDe(cliente: PoolClient): Consulta {
  return async <T extends QueryResultRow>(texto: string, valores: unknown[] = []) => {
    const resultado = await cliente.query<T>(texto, valores)
    return resultado.rows
  }
}

/** Varias consultas como una sola: si alguna falla, no se aplica ninguna. */
export async function transaccion<T>(trabajo: (consulta: Consulta) => Promise<T>): Promise<T> {
  const pool = await listo()
  const cliente = await pool.connect()
  try {
    await cliente.query("begin")
    const resultado = await trabajo(consultaDe(cliente))
    await cliente.query("commit")
    return resultado
  } catch (error) {
    await cliente.query("rollback").catch(() => undefined)
    throw error
  } finally {
    cliente.release()
  }
}

/** Código de error de Postgres "exclusion_violation": dos reservas confirmadas a la vez. */
export function esHuecoOcupado(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23P01"
}
