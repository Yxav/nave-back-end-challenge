require('knex')

exports.up = function(knex) {
    return knex.schema.createTable('navers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('birth_date').notNullable()
        table.string('admission_date').notNullable()
        table.string('job_role').notNullable()
        table.specificType('projects', 'INT[]').notNullable()
        table.integer('id_admin')
            .notNullable()
            .references('id')
            .inTable('admins')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('navers')
};