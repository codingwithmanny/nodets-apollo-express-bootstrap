// Imports
// ========================================================
import { BaseContext } from 'apollo-server-types';
import { USER_QUERY, USER_CREATE, USER_UPDATE, USER_DELETE } from './queries';
import { NotFound } from '../../utils/errorHandlers';

// Types
import { User } from './types';
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
const QueryListUsers = async (
  _: TArgs,
  { filters }: TArgs,
  _context: BaseContext,
): Promise<User[]> => {
  return await USER_QUERY(filters);
};

/**
 *
 * @param _
 * @param param1
 * @param _context
 * @returns
 */
const QueryReadUser = async (_: TArgs, { id }: TArgs, _context: BaseContext): Promise<User> => {
  const data = await USER_QUERY({ id }, true);

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
const MutationCreateUser = async (
  _: TArgs,
  { payload }: TArgs,
  _context: BaseContext,
): Promise<User> => {
  const [data] = await USER_CREATE(payload);

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
const MutationUpdateUser = async (
  _: TArgs,
  { id, payload }: TArgs,
  _context: BaseContext,
): Promise<User> => {
  const [data] = await USER_UPDATE({ id }, payload);

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
const MutationDeleteUser = async (
  _: TArgs,
  { id }: TArgs,
  _context: BaseContext,
): Promise<User> => {
  const data = await USER_DELETE({ id });

  if (!data) {
    throw new NotFound();
  }

  return data;
};

// Exports
// ========================================================
export default {
  queries: {
    users: QueryListUsers,
    user: QueryReadUser,
  },
  mutations: {
    createUser: MutationCreateUser,
    updateUser: MutationUpdateUser,
    deleteUser: MutationDeleteUser,
  },
  models: {},
};
