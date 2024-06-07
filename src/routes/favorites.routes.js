const { Router } = require('express')

const FavoritesController = require('../controllers/FavoritesController')

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

module.exports = favoritesRoutes

favoritesRoutes.post('/', favoritesController.create)
favoritesRoutes.get('/:id', favoritesController.index)
/*favoritesRoutes.get('/:id', favoritesController.show)*/
favoritesRoutes.delete('/:id', favoritesController.delete)
