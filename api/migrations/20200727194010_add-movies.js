
exports.up = function(knex) {
    return knex.schema.createTable('movies_to_watch', table => {
        table.uuid('id').primary();
        table.uuid('user').references('id').inTable('users').notNullable();
        table
            .string('omdb_id')
            .unique()
            .notNullable();
        table.string('title').notNullable();
        table.string('year').notNullable();
        table.string("genre").notNullable();
        table.string("director").notNullable();
        table.string("actors").notNullable();
        table.text("plot").notNullable();
        table.string("poster").notNullable();
        table.json("ratings").notNullable();
        table.integer('sort_order').unique().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();

  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('movies_to_watch');
};
