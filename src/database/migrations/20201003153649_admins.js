export const up = knex => 
    knex.schema
      .createTable('admins', table =>{
        table.increments('id').primary()
        table.string('email').notNullable()
        table.string('password').notNullable()
      })

export const down = knex => 
      knex.schema.dropTableIfExists('admins')
