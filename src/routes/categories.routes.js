const { Router } = require('express')

const CategoryController = require('../controllers/CategoryController')

const categoriesRoutes = Router()
const categoryController = new CategoryController()

categoriesRoutes.post('/', categoryController.create)
categoriesRoutes.get('/', categoryController.index)

module.exports = categoriesRoutes
