const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

const diskStorage = new DiskStorage()
class DishesController {
  async uploadAvatar(request, response) {
    const { filename: avatar } = request.file
    const filename = await diskStorage.saveFile(avatar)
    return response.json({ filename })
  }

  async create(request, response) {
    const { title, category_name, ingredients, price, description, avatar } =
      request.body

    let category = await knex('category').where({ name: category_name }).first()

    if (!category) {
      const [categoryId] = await knex('category').insert({ name: category_name });
      category = { id: categoryId, name: category_name };
    }

    const [dish_id] = await knex('dishes').insert({
      avatar,
      title,
      category_id: category.id,
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

 /* async index(request, response) {
    const { title, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map(ingredient => ingredient.trim())

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.avatar',
          'dishes.title',
          'dishes.description',
          'dishes.price'
        ])
        .whereIn('ingredients.name', filterIngredients)
        .whereLike('dishes.title', `%${title}%`)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .groupBy('dishes.id')
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
  } */

  async index(request, response) {
    const { title, category_id } = request.query

    let dishes

    if (category_id) {
      dishes = await knex('dishes')
        .where({ category_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
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
