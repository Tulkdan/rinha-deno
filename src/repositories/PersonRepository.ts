import { sql } from 'kysely'
import { db } from '../database/main.ts'
import type { NewPerson } from '../database/types.d.ts'

export async function findPersonById(id: string) {
  return await db.selectFrom('pessoas')
    .where('id', '=', id)
    .select(['apelido', 'id', 'nascimento', 'nome', 'stack'])
    .executeTakeFirst()
}

export async function createPerson(person: NewPerson) {
  return await db.insertInto('pessoas')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function countRegistersPeople() {
  return await db.selectFrom('pessoas')
    .select(({ fn }) => [
      fn.count<number>('id').as('registered_people'),
    ])
    .executeTakeFirst()
}

export async function searchForPerson(query: string) {
  return await db.selectFrom('pessoas')
    .select(['apelido', 'id', 'nascimento', 'nome', 'stack'])
    .where(sql`busca_trgm % ${query}`)
    .execute()
}
