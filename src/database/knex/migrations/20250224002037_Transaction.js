exports.up = knex => 
  knex.schema.createTable('Transactions', table => {
    table.increments('id'); 
    table.integer('user_id').references('id').inTable('Users').notNullable().onDelete('CASCADE');
    
    table.text('description');
    table.enum('type', ['income', 'expense']).notNullable(); 
    table.enum('category', [
      'food', 'transport', 'health', 'education', 'entertainment', 'shopping', 'others', 
      'salary', 'freelance', 'investments', 'business', 'other_income' 
    ]).notNullable();

    table.decimal('value', 10, 2).notNullable();
   
    
    table.date('transaction_date').notNullable(); 

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('Transactions');
