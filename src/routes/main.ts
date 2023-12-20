import { Router } from 'oak/mod.ts'
import { getQuery } from 'oak/helpers.ts'

const router = new Router()

router.post('/pessoas', async (ctx) => {
  const payloadBody = ctx.request.body({ type: 'json' })
  const body = await payloadBody.value
  console.log(body)
})

router.get('/pessoas/:id', (ctx) => {
  console.log(ctx.params.id)
})

router.get('/pessoas', (ctx) => {
  console.log(getQuery(ctx))
})

router.get('/contagem-pessoas', (_ctx) => {
})

export default router
