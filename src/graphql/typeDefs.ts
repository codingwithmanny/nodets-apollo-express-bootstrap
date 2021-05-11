// Imports
// ========================================================
import { gql } from 'apollo-server-express';
import userTypeDefs from './users/typeDefs';

// GraphQL
// ========================================================
/**
 *
 */
const graphqlTypes = [userTypeDefs.types].join('\n');

/**
 *
 */
const graphqlQueries = [userTypeDefs.queries].join('\n');

/**
 *
 */
const graphqlMutations = [userTypeDefs.mutations].join('\n');

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
