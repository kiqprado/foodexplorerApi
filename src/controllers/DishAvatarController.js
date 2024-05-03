const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

class DishAvatarController {
  async update(request, response) {
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const dishes = await knex('dishes').first()

    if (dishes.avatar) {
      await diskStorage.deleteFile(dishes.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    dishes.avatar = filename

    await knex('dishes').update(dishes)

    return response.json(dishes)
  }
}

module.exports = DishAvatarController
