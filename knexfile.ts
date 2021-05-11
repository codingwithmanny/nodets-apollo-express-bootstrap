// Imports
// ========================================================
import { config } from 'dotenv';

// Config
// ========================================================
config();

// Exports
// ========================================================
module.exports = {
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
    directory: 'database/migrations',
  },
  seeds: {
    directory: 'database/seeds',
  },
  timezone: 'UTC',
};
