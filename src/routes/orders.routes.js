const { Router } = require('express')

const OrdersController = require('../controllers/OrdersController')

const ordersRoutes = Router()

const ordersController = new OrdersController()

module.exports = ordersRoutes