require('knex')

exports.up = function(knex) {
    return knex.schema
        .createTable('projects_navers', (table) => {
            table.increments('id').primary();

            table.integer('id_naver')
                .notNullable()

            table.integer('id_project')
                .notNullable()
        })

    .createTable('navers', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('birth_date').notNullable()
        table.string('admission_date').notNullable()
        table.string('job_role').notNullable()


        table.integer('id_admin')
            .notNullable()
            .references('id')
            .inTable('admins')


        table.integer('id_project_naver')
            .references('projects_navers.id')
    })


};

exports.down = function(knex) {
    return knex.schema.dropTable('navers')
        .dropTable('projects_navers')
};