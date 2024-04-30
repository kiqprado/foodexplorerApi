exports.up = knex.schema.createTable('dish', table => {
  table.increments('id')
  table.text('photo').default(null)
  table.text('title').notNullable()
  table.text('description')
  table.decimal('price', 8, 2)
  
  table.integer('category_id').references('id').inTable('category')
})

exports.down = knex.schema.dropTable('dish')
