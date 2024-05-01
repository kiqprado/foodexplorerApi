const { Router } = require('express')

const usersRouter = require('./users.routes.js')
const dishesRoutes = require('./dishes.routes.js')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/dishes', dishesRoutes)

module.exports = routes
