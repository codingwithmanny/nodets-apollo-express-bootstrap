// Imports
// ========================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import knex from 'knex';
import faker from 'faker';

// Types
import { Book } from '../../src/graphql/books/types';

// Config
// ========================================================
const TABLE_NAME = 'books';

// Seed
// ========================================================
export async function seed(knex: knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // Generate
  const USERS = await knex.select('*').from('users');
  const DATA: Partial<Book>[] = [];
  for (let i = 0; i < USERS.length; i++) {
    DATA.push({
      name: faker.lorem.word(),
      user_id: USERS[i].id,
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(DATA);
}
