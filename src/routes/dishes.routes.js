const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const DishAvatarController = require('../controllers/DishAvatarController')

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishAvatarController = new DishAvatarController()

dishesRoutes.get('/', dishesController.index)
dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)
dishesRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  dishAvatarController.update
)

module.exports = dishesRoutes
