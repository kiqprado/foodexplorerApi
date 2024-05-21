const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()

dishesRoutes.get('/', dishesController.index)
dishesRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  dishesController.uploadAvatar
)
dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)

module.exports = dishesRoutes
