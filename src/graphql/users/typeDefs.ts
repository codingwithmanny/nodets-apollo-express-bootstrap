/**
 *
 */
export const typeDefsTypes = `
  input UserPayloadCreate {
    first_name: String!
    last_name: String!
    email: String!
  }

  input UserPayloadUpdate {
    first_name: String
    last_name: String
    email: String
  }

  type User {
    id: String!
    first_name: String!
    last_name: String!
    email: String!
    created_at: String!
    updated_at: String!
  }
`;

/**
 *
 */
export const typeDefsQuery = `
  users(filters: Filters): [User]
  user(id: String!): User
`;

/**
 *
 */
export const typeDefsMutation = `
  createUser(payload: UserPayloadCreate!): User
  updateUser(id: String!, payload: UserPayloadUpdate): User
  deleteUser(id: String!): User
`;

/**
 *
 */
export default {
  types: [typeDefsTypes].join('\n'),
  queries: [typeDefsQuery].join('\n'),
  mutations: [typeDefsMutation].join('\n'),
};
