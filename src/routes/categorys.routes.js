const { Router } = require('express')

const CategoryController = require('../controllers/CategoryController')

const categorysRoutes = Router()
const categoryController =  new CategoryController()

categorysRoutes.post('/', categoryController.create)
categorysRoutes.delete('/:id', categoryController.delete)

module.exports = categorysRoutes