import { Application, Router } from 'oak/mod.ts'

const router = new Router()

router.get('/', (_ctx, _next) => {
  // handle the GET endpoint here
  console.log('get')
})

router.all('/item/:item', (ctx, _next) => {
  // called for all HTTP verbs/requests
  // contains the value of `:item` from the parsed URL
  console.log(ctx.params.item)
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: 8080 })
