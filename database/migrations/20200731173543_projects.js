require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary();
        table.string('name').notNullable();

        table.specificType('navers', 'INT[]')
            .notNullable()

        table.integer('id_admin')
            .notNullable()
            .references('id')
            .inTable('admins');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects')
};