exports.up = (knex) => {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.specificType('navers', 'INT[]')
        table.integer('id_admin')
            .notNullable()
            .references('id')
            .inTable('admins');
    })
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('projects')
};