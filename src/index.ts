// Imports
// ========================================================
import { config } from 'dotenv';
import express from 'express';
import cors from 'express';
import helmet from 'helmet';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';

// GraphQL
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { ContextProps } from './graphql/types';

// ENV VARS
// ========================================================
config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const VERSION: string = process.env.VERSION || 'unknown';
const REPO: string = process.env.REPO || 'unknown';
const COMMIT: string = process.env.COMMIT || 'unknown';
const USER: string = process.env.USER || 'unknown';
const context = ({ req, res }: ContextProps) => ({ req, res });

// Init
// ========================================================
/**
 *
 */
const graphQLServer = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context,
});

/**
 *
 */
const app = express();

// Middlewares
// ========================================================
app.use(cors());
app.use(helmet());

// Endpoints / Routess
// ========================================================
/*NOTE: Remove this and its folder as needed*/
app.use('/', express.static('public'));

/**
 * NOTE: adjust this as just / (remove api) if public static folder isn't needed
 */
app.get('/api', (_req, res) =>
  res.send({
    version: VERSION,
    environment: NODE_ENV,
    repository: REPO,
    commit: COMMIT,
    user: USER,
  }),
);

/**
 *
 */
graphQLServer.applyMiddleware({
  app,
  cors: false,
});

// Exprots
// ========================================================
export default app;
export { graphQLServer };
