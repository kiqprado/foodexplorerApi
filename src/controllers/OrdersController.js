const knex = require('../database/knex')

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id
    
  }

  async show(request, response) {}

  async delete(request, response) {}
}

module.exports = OrdersController