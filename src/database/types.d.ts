import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  pessoas: PersonTable
}

export interface PersonTable {
  id: string
  apelido: string
  nome: string
  nascimento: string
  stack: string
  busca_trgm: Generated<string>
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>
