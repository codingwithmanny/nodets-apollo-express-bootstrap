// Imports
// ========================================================
import { BaseContext } from 'apollo-server-types';
import { BOOK_QUERY, BOOK_CREATE, BOOK_UPDATE, BOOK_DELETE } from './queries';
import { USER_QUERY } from '../users/queries';
import { NotFound } from '../../utils/errorHandlers';

// Types
import { Book } from './types';
import { User } from '../users/types';
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

/**
 *
 * @param user
 * @returns
 */
const BookUserId = (book: Book): string => {
  return book.user_id;
};

/**
 *
 * @param user
 * @returns
 */
const BookUser = async (book: Book): Promise<User> => {
  const user: User = await USER_QUERY({ id: book.user_id }, true);
  return user;
};

// Exports
// ========================================================
export default {
  queries: {
    books: QueryListBooks,
    book: QueryReadBook,
  },
  mutations: {
    createBook: MutationCreateBook,
    updateBook: MutationUpdateBook,
    deleteBook: MutationDeleteBook,
  },
  models: {
    Book: {
      user_id: BookUserId,
      user: BookUser,
    },
  },
};
