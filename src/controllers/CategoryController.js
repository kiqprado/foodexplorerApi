const knex = require('../database/knex')

class CategoryController {
  async create(request, response) {
    const { name } = request.body

    await knex("category").isert({ name })

    return response.json()
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("category").where({ id }).delete()

    return response.json()
  }
}

module.exports = CategoryController