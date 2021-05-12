// Imports
// ========================================================
import { BaseContext } from 'apollo-server-types';
import { BOOK_QUERY, BOOK_CREATE, BOOK_UPDATE, BOOK_DELETE } from './queries';
import { NotFound } from '../../utils/errorHandlers';

// Types
import { Book } from './types';
import { TArgs } from '../../utils/base';

// Imports
// ========================================================
/**
 *
 * @param _
 * @param param1
 * @param context
 * @returns
 */
const QueryListBooks = async (
  _: TArgs,
  { filters }: TArgs,
  _context: BaseContext,
): Promise<Book[]> => {
  return await BOOK_QUERY(filters);
};

/**
 *
 * @param _
 * @param param1
 * @param _context
 * @returns
 */
const QueryReadBook = async (_: TArgs, { id }: TArgs, _context: BaseContext): Promise<Book> => {
  const data = await BOOK_QUERY({ id }, true);

  if (!data) {
    throw new NotFound();
  }

  return data;
};

/**
 *
 * @param _
 * @param param1
 * @param _context
 * @returns
 */
const MutationCreateBook = async (
  _: TArgs,
  { payload }: TArgs,
  _context: BaseContext,
): Promise<Book> => {
  const [data] = await BOOK_CREATE(payload);

  if (!data) {
    throw new NotFound();
  }

  return data;
};

/**
 *
 * @param _
 * @param param1
 * @param _context
 * @returns
 */
const MutationUpdateBook = async (
  _: TArgs,
  { id, payload }: TArgs,
  _context: BaseContext,
): Promise<Book> => {
  const [data] = await BOOK_UPDATE({ id }, payload);

  if (!data) {
    throw new NotFound();
  }

  return data;
};

/**
 *
 * @param _
 * @param param1
 * @param _context
 * @returns
 */
const MutationDeleteBook = async (
  _: TArgs,
  { id }: TArgs,
  _context: BaseContext,
): Promise<Book> => {
  const data = await BOOK_DELETE({ id });

  if (!data) {
    throw new NotFound();
  }

  return data;
};

// Exports
// ========================================================
export default {
  queries: {
    users: QueryListBooks,
    user: QueryReadBook,
  },
  mutations: {
    createBook: MutationCreateBook,
    updateBook: MutationUpdateBook,
    deleteBook: MutationDeleteBook,
  },
  models: {},
};
