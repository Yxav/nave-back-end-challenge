exports.up = function(knex) {
    return knex.schema.createTable('project_navers', (table) => {
        table.increments('id')
        table.integer('id_naver')
            .references('id')
            .inTable('navers')
            .onDelete('CASCADE');

        table.integer('id_project')
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE');
    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('project_navers')
};