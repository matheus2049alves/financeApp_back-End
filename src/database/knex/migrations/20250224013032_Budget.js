const { default: knex } = require("knex");


exports.up = knex => knex.schema.createTable('Budget', table => {
  table.increments('id');
  table.integer('user_id').references('id').inTable('Users').notNullable().onDelete('CASCADE');
  
  table.decimal('value', 10, 2).notNullable();
  table.date('start_date').notNullable();
  table.date('end_date').notNullable();

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});
  


exports.down = knex => knex.schema.dropTableIfExists('Budgets');

