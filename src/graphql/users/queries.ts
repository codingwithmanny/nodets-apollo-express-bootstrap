// Imports
// ========================================================
import { db } from '../../db';
import { Filters, User } from './types';

// Query
// ========================================================
/**
 *
 */
export const SORT_FIELDS = ['first_name', 'last_name', 'email'];

/**
 *
 * @param filters
 */
export const USER_QUERY = (filters: Filters, first?: boolean) => {
  // Default Query
  const query = db.select('*').from('users');

  // Single Id
  if (filters?.id) {
    query.where('id', filters.id);
  }

  // Search
  if (filters?.query) {
    query
      .where('first_name', 'ilike', `%${filters.query}%`)
      .orWhere('last_name', 'ilike', `%${filters.query}%`)
      .orWhere('email', 'ilike', `%${filters.query}%`);
  }

  // Limit
  query.limit(filters?.take || 10);

  // Offset
  query.offset(filters?.from || 0);

  // Order / Sort
  query.orderBy(
    (SORT_FIELDS.includes(filters?.order || '') && filters?.order) || SORT_FIELDS[0],
    filters?.sort || 'asc',
  );

  // Return Query
  return first ? query.first() : query;
};

/**
 *
 * @param payload
 * @returns
 */
export const USER_CREATE = (payload: User) => {
  // Create
  const query = db('users').insert(payload);

  // Return Query
  return query.returning('*');
};

/**
 *
 * @param filters
 * @param payload
 * @returns
 */
export const USER_UPDATE = (filters: Filters, payload: Partial<User>) => {
  // Update
  const query = db('users').where('id', filters?.id);

  if (payload?.first_name && typeof payload?.first_name !== undefined) {
    query.update('first_name', payload.first_name);
  }

  if (payload?.last_name && typeof payload?.last_name !== undefined) {
    query.update('last_name', payload.last_name);
  }

  if (payload?.email && typeof payload?.email !== undefined) {
    query.update('email', payload.email);
  }

  // Return Query
  return query.returning('*');
};

/**
 *
 * @param filters
 */
export const USER_DELETE = async (filters: Filters) => {
  // Default Query
  const query = await USER_QUERY(filters, true);

  // Delete
  await db('users').where('id', filters?.id).delete();

  // Return Query
  return query;
};
