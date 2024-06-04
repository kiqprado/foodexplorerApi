const knex = require('../database/knex')

class CategoryController {
  async create(request, response) {
    const { name } = request.body

    await knex('category').insert({ name })

    return response.json()
  }

  async index(request, response) {
    const categoryOrder = [
      'Refeições',
      'Sobremesas',
      'Bebidas',
      'Acompanhamentos'
    ]
    const categories = await knex('category').select('*')

    const sortedCategories = categories.sort((a, b) => {
      return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name)
    })

    return response.json(sortedCategories)
  }
}

module.exports = CategoryController
