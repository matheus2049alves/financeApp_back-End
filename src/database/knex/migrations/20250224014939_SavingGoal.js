exports.up = knex =>
  knex.schema.createTable('Saving_Goals', table => {
    table.increments('id'); 
    table.integer('user_id').references('id').inTable('Users').notNullable().onDelete('CASCADE');
    
    table.string('name').notNullable(); 
    table.decimal('target_amount', 10, 2).notNullable(); 
    table.decimal('current_amount', 10, 2).defaultTo(0).notNullable(); 
    table.date('start_date').notNullable(); 
    table.date('end_date').nullable(); 
    
    table.enum('status', ['in_progress', 'completed', 'cancelled']).defaultTo('in_progress');
    table.enum('priority', ['high', 'medium', 'low']).defaultTo('medium');
    
    table.text('description').nullable(); 

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('Saving_Goals');
