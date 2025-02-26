exports.up = knex => 
  knex.schema.alterTable('Transactions', table => {
    table.integer('wallet_id').references('id').inTable('wallets').nullable().onDelete('CASCADE');
    table.index('wallet_id');
  });

exports.down = knex => 
  knex.schema.alterTable('Transactions', table => {
    table.dropColumn('wallet_id');
    
    table.dropIndex('wallet_id');
  });
