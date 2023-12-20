import { Application } from 'oak/mod.ts'

import Router from './routes/main.ts'

const app = new Application()

app.use(Router.routes())
app.use(Router.allowedMethods())

app.listen({ port: 8080 })
