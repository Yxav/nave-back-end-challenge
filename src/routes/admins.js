import Router from 'koa-router'
import AdminController from 'controllers/admins'

const router = new Router()


router.post('/admins', AdminController.create)
router.post('/admins/login', AdminController.login)

export default router.routes()