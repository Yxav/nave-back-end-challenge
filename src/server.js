import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()


router.get('/', (ctx, next) => ctx.body = 'Opaa')

router.get('/navers', (ctx, next) => ctx.body = [
    {
        id: 1,
        name: 'Fulano',
        birthdate: '1999-05-15',
        admission_date: '2020-06-12',
        job_role: 'Desenvolvedor'
    },
    {
        id: 2,
        name: 'Ciclano',
        birthdate: '1992-10-28',
        admission_date: '2018-06-12',
        job_role: 'Desenvolvedor'
    }
])


app.use(router.routes())

export default app