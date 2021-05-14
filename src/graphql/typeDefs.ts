// Imports
// ========================================================
import { gql } from 'apollo-server-express';
import userTypeDefs from './users/typeDefs';
import bookTypeDefs from './books/typeDefs';
import authTypeDefs from './auth/typeDefs';

// GraphQL
// ========================================================
/**
 *
 */
const graphqlTypes = [userTypeDefs.types, bookTypeDefs.types, authTypeDefs.types].join('\n');

/**
 *
 */
const graphqlQueries = [userTypeDefs.queries, bookTypeDefs.queries, authTypeDefs.queries].join(
  '\n',
);

/**
 *
 */
const graphqlMutations = [
  userTypeDefs.mutations,
  bookTypeDefs.mutations,
  authTypeDefs.mutations,
].join('\n');

// Type Definitions
// ========================================================
const typeDefs = gql`
  enum SortOption {
    asc
    desc
  }

  input Filters {
    query: String
    from: Int
    take: Int
    order: String
    sort: SortOption
  }

  ${graphqlTypes}

  type Query {
    ${graphqlQueries}
  }

  type Mutation {
    ${graphqlMutations}
  }
`;

// EXports
// ========================================================
export default typeDefs;
