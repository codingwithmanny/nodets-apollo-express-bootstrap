// Imports
// ========================================================
import { AuthenticationError } from 'apollo-server-express';

// Types
import { TArgs } from '../../utils/base';

// Middleware
// ========================================================
/**
 *
 * @param resolve
 * @param parent
 * @param args
 * @param context
 * @param info
 */
const authMiddleware = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: any,
  parent: TArgs,
  args: TArgs,
  context: TArgs,
  info: TArgs,
) => {
  if (!context.req.user) {
    throw new AuthenticationError('Invalid Token');
  }

  // equivalent to express next()
  return resolve(parent, args, context, info);
};

// Middleware Queries
// ========================================================
const middlewareQueries = {
  // Queries
  Query: {
    users: authMiddleware,
    user: authMiddleware,
  },
  // Mutations
  Mutation: {
    createUser: authMiddleware,
    updateUser: authMiddleware,
    deleteUser: authMiddleware,
  },
  // Models
  Book: {
    user_id: authMiddleware,
    user: authMiddleware,
  },
};

// Exports
// ========================================================
export default authMiddleware;
export { middlewareQueries };
