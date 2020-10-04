import Router from 'koa-router'
import AdminController from 'controllers/admins'

const router = new Router()

router.get('/admins', AdminController.index)

router.post('/admins', AdminController.create)

export default router.routes()