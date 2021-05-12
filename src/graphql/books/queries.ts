// Imports
// ========================================================
import { db } from '../../db';
import { Filters, Book } from './types';

// Query
// ========================================================
/**
 *
 */
export const SORT_FIELDS = ['name', 'user_id'];

/**
 *
 * @param filters
 */
export const BOOK_QUERY = (filters: Filters, first?: boolean) => {
  // Default Query
  const query = db.select('*').from('books');

  // Single Id
  if (filters?.id) {
    query.where('id', filters.id);
  }

  // Search
  if (filters?.query) {
    query.where('name', 'ilike', `%${filters.query}%`);
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
export const BOOK_CREATE = (payload: Book) => {
  // Create
  const query = db('books').insert(payload);

  // Return Query
  return query.returning('*');
};

/**
 *
 * @param filters
 * @param payload
 * @returns
 */
export const BOOK_UPDATE = (filters: Filters, payload: Partial<Book>) => {
  // Update
  const query = db('books').where('id', filters?.id);

  if (payload?.name && typeof payload?.name !== undefined) {
    query.update('name', payload.name);
  }

  if (payload?.user_id && typeof payload?.user_id !== undefined) {
    query.update('user_id', payload.user_id);
  }

  // Return Query
  return query.returning('*');
};

/**
 *
 * @param filters
 */
export const BOOK_DELETE = async (filters: Filters) => {
  // Default Query
  const query = await BOOK_QUERY(filters, true);

  // Delete
  await db('books').where('id', filters?.id).delete();

  // Return Query
  return query;
};
