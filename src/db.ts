// Imports
// ========================================================
// import { Sequelize } from 'sequelize';
import knex from 'knex';
import { config } from 'dotenv';

// Config
// ========================================================
config();

/**
 *
 */
const db = knex({
  client: process.env.DB_ENGINE,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT || 5432),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8',
  },
  pool: {
    min: Number(process.env.DB_POOL_MIN || 2),
    max: Number(process.env.DB_POOL_MAX || 10),
  },
  migrations: {
    tableName: 'knex_migrations',
  },
});

// Connection
// ========================================================
const checkConnectivity = async (callback?: () => void) => {
  console.group('Database');
  try {
    console.log('Checking connectivity...');
    await db.raw('select 1');
    console.log('Connection successful!');
    if (callback) {
      callback();
    }
    console.groupEnd();
  } catch (err) {
    console.log('Connection error');
    console.log(err);
    console.groupEnd();
    process.exit(0);
  }
};

// Exports
// ========================================================
export default checkConnectivity;
export { db };
