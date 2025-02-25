exports.up = function (knex) {
  return knex.schema.table('Users', (table) => {
    table.dropUnique('username');
    table.renameColumn('username', 'name');
  });
};

exports.down = function (knex) {
  return knex.schema.table('Users', (table) => {
    table.renameColumn('name', 'username');
    table.unique('username');
  });
};