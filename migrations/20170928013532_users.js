exports.up = knex => knex
  .schema.createTableIfNotExists('users', table => {
    // table.increments('id')
    table.string('email').primary()
    table.string('password')
    table.timestamps()
  })

exports.down = knex => knex.schema.dropTable('users')
