/**
 *
 */
export const typeDefsTypes = `
  input BookPayloadCreate {
    name: String!
    user_id: String!
  }

  input BookPayloadUpdate {
    name: String
    user_id: String
  }

  type Book {
    id: String!
    name: String!
    user_id: String!
    created_at: String!
    updated_at: String!
  }
`;

/**
 *
 */
export const typeDefsQuery = `
  books(filters: Filters): [Book]
  book(id: String!): Book
`;

/**
 *
 */
export const typeDefsMutation = `
  createBook(payload: BookPayloadCreate!): Book
  updateBook(id: String!, payload: BookPayloadUpdate): Book
  deleteBook(id: String!): Book
`;

/**
 *
 */
export default {
  types: [typeDefsTypes].join('\n'),
  queries: [typeDefsQuery].join('\n'),
  mutations: [typeDefsMutation].join('\n'),
};
