const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.body

    const getUser = await knex('users').where({ id: user_id }).first()

    if (!getUser) {
      throw new AppError('Usuário não encontrado!')
    }

    const [dish] = await knex('dishes').where({ id: dish_id }).first()

    await knex('favorites').insert({
      dish_id: dish.id,
      user_id
    })

    return response.status(201).json()
  }

  async index(request, response) {
    const user_id = request.user.id

    const favorites = await knex('favorites')
      .innerJoin('dishes', 'favorites.dish.id')
      .where('favorites.user_id', user_id)
      .select('dishes.*')
      .groupBy('dish_id')

      return response.json(favorites)
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('favorites').where({ dish_id: id}).delete()

    return response.json()
  }
}

module.exports = FavoritesController
