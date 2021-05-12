// Imports
// ========================================================
import userResolvers from './users';
import bookResolvers from './books';

// Resolvers
// ========================================================
const resolvers = {
  Query: {
    ...userResolvers.queries,
    // ...bookResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
    // ...bookResolvers.mutations,
  },
};

// EXports
// ========================================================
export default resolvers;
