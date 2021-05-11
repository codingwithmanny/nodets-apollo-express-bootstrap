// Imports
// ========================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import knex from 'knex';
import faker from 'faker';

// Types
import { User } from '../../src/graphql/users/types';

// Config
// ========================================================
const TABLE_NAME = 'users';

// Seed
// ========================================================
export async function seed(knex: knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // Generate
  const COUNT = 10;
  const DATA: Partial<User>[] = [];
  for (let i = 0; i < COUNT; i++) {
    DATA.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }

  // Inserts seed entries
  await knex(TABLE_NAME).insert(DATA);
}
