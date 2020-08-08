exports.up = (knex) => {
    return knex.schema.createTable('navers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('birthdate').notNullable()
        table.string('admission_date').notNullable()
        table.string('job_role').notNullable()
        table.integer('id_admin')
            .notNullable()
            .references('id')
            .inTable('admins')
    })
};

exports.down = (knex) => {
    return knex.schema.dropTable('navers')
};