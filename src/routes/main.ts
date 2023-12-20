import { Router } from 'oak/mod.ts'
import { getQuery } from 'oak/helpers.ts'
import { z } from 'zod/mod.ts'
import { createPeople, getPerson } from '../controllers/people.ts'

const router = new Router()

const peopleCreationPayload = z.object({
  apelido: z.string().max(32),
  nome: z.string().max(100),
  nascimento: z.string().regex(/\d{4}-\d{2}-\d{2}/),
  stack: z.array(z.string()).nullable(),
})

router.post('/pessoas', async (ctx) => {
  const payloadBody = ctx.request.body({ type: 'json' })
  const body = await payloadBody.value

  const { success, data } = peopleCreationPayload.safeParse(body)

  if (!success) {
    ctx.throw(422, 'Invalid payload')
    return
  }

  const id = await createPeople(data)

  ctx.response.status = 201
  ctx.response.headers.append('Location', `/pessoas/${id}`)
})

router.get('/pessoas/:id', async (ctx) => {
  console.log(ctx.params.id)

  const person = await getPerson(ctx.params.id)

  if (!person) {
    ctx.throw(404, 'User not found')
    return
  }

  ctx.response.status = 200
  ctx.response.body = person
})

router.get('/pessoas', (ctx) => {
  console.log(getQuery(ctx))
})

router.get('/contagem-pessoas', (_ctx) => {
})

export default router
