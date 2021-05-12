// Imports
// ========================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import knex from 'knex';

// Migrations
// ========================================================
/**
 *
 * @param knex
 * @returns
 */
export async function up(knex: knex): Promise<void> {
  return knex.schema.hasTable('books').then((exists: boolean) => {
    if (!exists) {
      return knex.schema.createTable('books', (table: knex.TableBuilder) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name', 255).notNullable();
        table.uuid('user_id').notNullable().references('id').inTable('users');
        table.timestamps(true, true);
      });
    }
  });
}

/**
 *
 * @param knex
 * @returns
 */
export async function down(knex: knex): Promise<void> {
  return knex.schema.dropTableIfExists('books');
}
