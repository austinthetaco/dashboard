
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary();
        table
            .string('email')
            .unique()
            .notNullable();
        table.string('password').notNullable();
        table.string('name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
