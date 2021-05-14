// Imports
// ========================================================
import userResolvers from './users';
import bookResolvers from './books';
import authResolvers from './auth';

// Resolvers
// ========================================================
const resolvers = {
  Query: {
    ...userResolvers.queries,
    ...bookResolvers.queries,
    ...authResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
    ...bookResolvers.mutations,
    ...authResolvers.mutations,
  },
  ...bookResolvers.models,
};

// EXports
// ========================================================
export default resolvers;
