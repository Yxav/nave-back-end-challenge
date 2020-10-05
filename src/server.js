import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'

import router from 'routes'

const app = new Koa()

app.use(koaBody({ multipart: true }))

app.use(async (ctx, next) => {
    ctx.body = await next()   
  })


app.use(router.routes())
app.use(router.allowedMethods())

export default app