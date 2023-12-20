import {
  countRegistersPeople,
  createPerson,
  findPersonById,
  searchForPerson,
} from '../repositories/PersonRepository.ts'

type PeopleBodyPayload = {
  apelido: string
  nome: string
  nascimento: string
  stack: string[] | null
}

export const createPeopleController = async (
  payload: PeopleBodyPayload,
): Promise<string> => {
  const response = await createPerson({
    ...payload,
    id: crypto.randomUUID(),
    stack: JSON.stringify(payload.stack),
  })

  return response.id
}

type PeopleResponse = {
  id: string
  apelido: string
  nome: string
  nascimento: string
  stack: string[] | null
}
export const getPersonController = async (
  id: string,
): Promise<PeopleResponse | undefined> => {
  const person = await findPersonById(id)

  if (!person) return

  return {
    ...person,
    stack: JSON.parse(person.stack),
  }
}

export const getPeopleController = async (querySearch: string) => {
  const result = await searchForPerson(querySearch)
  return result
}

export const countPeopleController = async () => {
  const registers = await countRegistersPeople()

  if (!registers) return

  return registers.registered_people
}
