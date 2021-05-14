import jwtDecode from 'jwt-decode';
/**
 *
 * @param token
 * @returns
 */
export const parseJwt = (token: string) => jwtDecode(token);
