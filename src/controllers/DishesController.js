const knex = require('../database/knex')

class DishesController {
  async create(request, response) {
    const { photo, title, description, ingredients, price } = request.body

    const [dish_id] = await knex('dishes').insert({
      title,
      description,
      price
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients')
      .where({ dish_id: id })
      .orderBy('name')

    return response.json({
      ...dish,
      ingredients
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('dishes').where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map(ingredient => ingredient.trim())

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.photo',
          'dishes.title',
          'dishes.description',
          'dishes.price'
        ])
        .whereIn('ingredients.name', filterIngredients)
        .whereLike('dishes.title', `%${title}%`)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
    } else {
      dishes = await knex('dishes')
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const ingredientsItems = await knex('ingredients').select('*')
    const dishWithIngredients = dishes.map(dish => {
      const dishIngredient = ingredientsItems.filter(
        ingredients => ingredients.dish_id === dish.id
      )

      return {
        ...dish,
        ingredients: dishIngredient
      }
    })

    return response.json(dishWithIngredients)
  }
}

module.exports = DishesController
