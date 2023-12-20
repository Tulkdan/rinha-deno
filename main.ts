import { Application } from 'oak/mod.ts'

import Router from './src/routes/main.ts'

const app = new Application()

app.use(Router.routes())
app.use(Router.allowedMethods())

if (import.meta.main) {
  app.listen({ port: 8080 })
}
