/**
 * Esquema de la base de datos, por versiones. Se aplican solas, en orden, la
 * primera vez que la web abre la base (ver `index.ts`). Una migración ya
 * aplicada NO se edita: los cambios van en una nueva, al final de la lista.
 */
export type Migracion = { id: string; sql: string }

export const migraciones: Migracion[] = [
  {
    id: "001-reservas",
    sql: `
      -- Ajustes de la agenda: una sola fila (id = 1).
      create table ajustes (
        id               smallint primary key default 1 check (id = 1),
        duracion_min     smallint not null default 15  check (duracion_min between 5 and 240),
        margen_min       smallint not null default 0   check (margen_min between 0 and 120),
        antelacion_horas smallint not null default 12  check (antelacion_horas between 0 and 720),
        ventana_dias     smallint not null default 21  check (ventana_dias between 1 and 120),
        -- Nace cerrada: no se aceptan reservas hasta que alguien la abra en el admin.
        activo           boolean  not null default false
      );
      insert into ajustes default values;

      -- Horario semanal: tramos en los que se aceptan llamadas (hora de Madrid, en minutos desde las 00:00).
      create table franjas (
        id         serial primary key,
        dia_semana smallint not null check (dia_semana between 1 and 7),
        inicio_min smallint not null check (inicio_min between 0 and 1439),
        fin_min    smallint not null check (fin_min between 1 and 1440),
        check (fin_min > inicio_min)
      );

      -- Días u horas en los que no se puede reservar (vacaciones, imprevistos...).
      create table bloqueos (
        id     serial primary key,
        desde  timestamptz not null,
        hasta  timestamptz not null,
        motivo text not null default '',
        check (hasta > desde)
      );

      -- Reservas. Datos personales: se borran a los 30 días de la llamada (ver purgarCaducadas).
      create table reservas (
        id          uuid primary key default gen_random_uuid(),
        inicio      timestamptz not null,
        fin         timestamptz not null,
        nombre      text not null,
        email       text not null,
        telefono    text,
        mensaje     text,
        estado      text not null default 'confirmada' check (estado in ('confirmada', 'cancelada')),
        -- Secreto del enlace para que el cliente cancele o cambie su cita.
        token       text not null default (replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '')),
        creada_en   timestamptz not null default now(),
        cancelada_en timestamptz,
        check (fin > inicio),
        -- La base impide por sí sola dos reservas confirmadas a la misma hora,
        -- aunque dos personas pulsen "reservar" a la vez.
        exclude using gist (tstzrange(inicio, fin) with &&) where (estado = 'confirmada')
      );
      create index reservas_inicio_idx on reservas (inicio);
    `,
  },
  {
    id: "002-visibilidad-y-huecos-cerrados",
    sql: `
      -- Porcentaje de huecos de cada día que se enseñan al cliente (100 = todos) y
      -- semilla del reparto: con otra semilla se esconden otros huecos.
      alter table ajustes
        add column visibilidad_pct     smallint not null default 100 check (visibilidad_pct between 10 and 100),
        add column visibilidad_semilla integer  not null default 1;

      -- Huecos cerrados a mano desde el calendario del admin. No llevan datos personales.
      create table huecos_cerrados (
        inicio timestamptz primary key
      );
    `,
  },
]
