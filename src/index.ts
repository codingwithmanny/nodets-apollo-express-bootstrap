// Imports
// ========================================================
import { config } from 'dotenv';
import express from 'express';
import cors from 'express';
import helmet from 'helmet';
import { ApolloServer, makeExecutableSchema, AuthenticationError } from 'apollo-server-express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { applyMiddleware } from 'graphql-middleware';

// Helpers
import { parseJwt } from './utils/helpers';

// GraphQL
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { ContextProps } from './graphql/types';

// Middlewares
import { middlewareQueries } from './graphql/middlewares/auth';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewares: any = [middlewareQueries];
const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, ...middlewares);

/**
 *
 */
const graphQLServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context,
  engine: {
    rewriteError(err) {
      if (err instanceof AuthenticationError) {
        return null;
      }
      return err;
    },
  },
});

/**
 *
 */
const app = express();

// Middlewares
// ========================================================
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  if (req?.headers?.authorization) {
    const token = req?.headers?.authorization.split(' ');
    try {
      if (token.length < 1 || (token.length > 1 && !parseJwt(token[1]))) {
        return res.status(401).send('Invalid Token');
      }
    } catch {
      return res.status(401).send('Invalid Token');
    }
  }
  next();
});
app.use(
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: `${process.env.AUTH0_AUDIENCE}`,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
    credentialsRequired: false,
  }),
);

// Endpoints / Routes
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

// GraphQL
// ========================================================
/**
 *
 */
graphQLServer.applyMiddleware({
  app,
  cors: false,
});

// Exports
// ========================================================
export default app;
export { graphQLServer };
