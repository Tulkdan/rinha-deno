import { Database } from './types.d.ts'
import { Kysely, PostgresDialect } from 'kysely'
import Pool from 'pg-pool'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: Deno.env.get('POSTGRES_DB') ?? 'test',
    host: Deno.env.get('POSTGRES_ADDRESS') ?? 'localhost',
    user: Deno.env.get('POSTGRES_USER') ?? 'admin',
    password: Deno.env.get('POSTGRES_PASSWORD') ?? 'admin',
    port: 5432,
    max: 10,
  }),
})

export const db = new Kysely<Database>({
  dialect,
})
