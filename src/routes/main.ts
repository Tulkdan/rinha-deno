import { Router } from 'oak/mod.ts'
import { getQuery } from 'oak/helpers.ts'
import { z } from 'zod/mod.ts'
import {
  countPeopleController,
  createPeopleController,
  getPeopleController,
  getPersonController,
} from '../controllers/people.ts'

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

  const id = await createPeopleController(data)

  ctx.response.status = 201
  ctx.response.headers.append('Location', `/pessoas/${id}`)
})

router.get('/pessoas/:id', async (ctx) => {
  const person = await getPersonController(ctx.params.id)

  if (!person) {
    ctx.throw(404, 'User not found')
    return
  }

  ctx.response.status = 200
  ctx.response.body = person
})

router.get('/pessoas', async (ctx) => {
  const queryParams = getQuery(ctx)

  if (!queryParams.t) {
    ctx.throw(400, 'Query param "t" is needed')
    return
  }

  const result = await getPeopleController(queryParams.t)

  ctx.response.status = 200
  ctx.response.body = result
})

router.get('/contagem-pessoas', async (ctx) => {
  const count = await countPeopleController()

  ctx.response.status = 200
  ctx.response.body = count ?? 0
})

export default router
