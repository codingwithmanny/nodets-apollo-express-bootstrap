/**
 *
 */
export const typeDefsTypes = `
  type Auth0UserInfo {
    sub: String!
    nickname: String
    name: String
    picture: String
    updated_at: String
  }
`;

/**
 *
 */
export const typeDefsQuery = `
  authMe: Auth0UserInfo
`;

/**
 *
 */
export const typeDefsMutation = `
`;

/**
 *
 */
export default {
  types: [typeDefsTypes].join('\n'),
  queries: [typeDefsQuery].join('\n'),
  mutations: [typeDefsMutation].join('\n'),
};
