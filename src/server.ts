// Imports
// ========================================================
import app, { graphQLServer } from './index';
import checkConnectivity from './db';
import { config } from 'dotenv';

// ENV VARS
// ========================================================
config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const VERSION: string = process.env.VERSION || 'unknown';

// Server
// ========================================================
checkConnectivity(() => {
  app.listen(PORT, () => {
    console.group('Server');
    console.log(`Listening on PORT ${PORT}`);
    console.log(`GraphQL listening on PORT ${PORT}${graphQLServer.graphqlPath}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Version: ${VERSION}`);
    console.groupEnd();
  });
});
