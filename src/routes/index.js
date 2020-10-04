import Router from 'koa-router'

import adminRoutes from './admins'


const api = new Router()

api.use('/v1', adminRoutes)

export default api


