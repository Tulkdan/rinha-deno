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
