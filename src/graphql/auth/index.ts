// Imports
// ========================================================
import { BaseContext } from 'apollo-server-types';
import axios from 'axios';
import { TArgs } from '../../utils/base';

// Functions
// ========================================================
/**
 *
 * @param _
 * @param param1
 * @param context
 * @returns
 */
const Me = async (_: TArgs, {}: TArgs, context: BaseContext): Promise<string> => {
  const { req } = context;
  try {
    const { data } = await axios({
      url: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `${req?.headers?.authorization ?? 'Unknown'}`,
      },
    });

    return data;
  } catch (errors) {
    return errors.message;
  }
};

// Exports
// ========================================================
export default {
  queries: {
    authMe: Me,
  },
  mutations: {},
  models: {},
};
