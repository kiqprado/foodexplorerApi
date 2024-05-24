const knex = require('../database/knex')

class CategoryController {
  async create(request, response) {
    const { name } = request.body

    await knex('category').isert({ name })

    return response.json()
  }
}

module.exports = CategoryController
