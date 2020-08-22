import Knex from 'knex'

// criando tabelas
export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => {
    table.increments('id').primary()
    table.string('subject').notNullable()
    table.string('cost').notNullable()

    // relacionamento 
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

// case de algo errado, esse procedimento de rollback
export async function down(knex: Knex) {
  return knex.schema.dropTable('classes')
}