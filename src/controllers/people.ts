import {
  createPerson,
  findPersonById,
} from '../repositories/PersonRepository.ts'

type PeopleBodyPayload = {
  apelido: string
  nome: string
  nascimento: string
  stack: string[] | null
}

export const createPeople = async (
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
export const getPerson = async (
  id: string,
): Promise<PeopleResponse | undefined> => {
  const person = await findPersonById(id)

  if (!person) return

  return {
    ...person,
    stack: JSON.parse(person.stack),
  }
}

export const getPeople = async () => {}

export const countPeople = async () => {}
