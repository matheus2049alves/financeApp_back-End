const { default: knex } = require("knex")


exports.up = knex => knex.schema.createTable('Users', table => {
    table.increments('id')
    table.text('username').unique().notNullable()
    table.text('email').unique().notNullable()
    table.text('password').notNullable()
    table.decimal('balance', 10, 2).notNullable().defaultTo(0.00)
  
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
})
  
exports.down = knex => knex.schema.dropTableIfExists('Users')
