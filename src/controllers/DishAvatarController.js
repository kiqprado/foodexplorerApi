const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

class DishAvatarController {
  async update(request, response) {
    const { dish_id } = request.params.params
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id: dish_id }).first()

    if (dish.avatar) {
      await diskStorage.deleteFile(dish.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    dish.avatar = filename

    await knex('dishes').update(dish).where({ id: dish_id })

    return response.json(dish)
  }
}

module.exports = DishAvatarController
