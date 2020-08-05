exports.up = function(knex) {
    return knex.schema.createTable('projects', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();

        table.integer('id_admin')
            .notNullable()
            .references('id')
            .inTable('admins');


        table.integer('id_project_naver')
            .references('projects_navers.id')

    });
}

exports.down = function(knex) {
    return knex.schema.dropTable('projects')
};