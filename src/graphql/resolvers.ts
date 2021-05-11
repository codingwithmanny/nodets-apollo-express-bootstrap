// Imports
// ========================================================
import userResolvers from './users';

// Resolvers
// ========================================================
const resolvers = {
  Query: {
    ...userResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
  },
};

// EXports
// ========================================================
export default resolvers;
