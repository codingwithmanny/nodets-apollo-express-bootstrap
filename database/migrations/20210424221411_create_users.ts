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
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.hasTable('users').then((exists: boolean) => {
      if (!exists) {
        return knex.schema.createTable('users', (table: knex.TableBuilder) => {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('first_name', 255).notNullable();
          table.string('last_name', 255).notNullable();
          table.string('email', 255).notNullable();
          table.timestamps(true, true);
          table.unique(['email']);
        });
      }
    }),
  );
}

/**
 *
 * @param knex
 * @returns
 */
export async function down(knex: knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('users')
    .then(() => knex.raw('drop extension if exists "uuid-ossp"'));
}
