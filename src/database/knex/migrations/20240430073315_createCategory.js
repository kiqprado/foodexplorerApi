exports.up = knex =>
  knex.schema.createTable('category', table => {
    table.increments('id')
    table.text('name')

    table.timestamp('created_at').default(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTable('category')
