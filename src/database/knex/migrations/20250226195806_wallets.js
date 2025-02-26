exports.up = knex =>
  knex.schema.createTable('wallets', table => {
    table.increments('id'); 
    table.integer('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE');

    table.string('name').notNullable(); 
    table.decimal('balance', 10, 2).defaultTo(0).notNullable(); 
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('wallets');
