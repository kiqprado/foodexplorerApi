const { Router } = require('express')

const usersRouter = require('./users.routes.js')
const sessionsRouter = require('./sessions.routes.js')
const categoriesRoutes = require('./categories.routes.js')
const dishesRouter = require('./dishes.routes.js')


const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/category', categoriesRoutes)
routes.use('/dishes', dishesRouter)


module.exports = routes
