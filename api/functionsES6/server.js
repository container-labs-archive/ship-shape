// @flow

import express from 'express';
import graphqlHTTP from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { schema } from './data/schema';
import {
  Raven,
  ravenErrorHandler,
  ravenRequestHandler,
  auth as authMiddleware,
  cors as corsMiddleware,
  helmet as helmetMiddleware,
  morgan as morganMiddleware,
  compression as compressionMiddleware,
} from './middleware';

const app = express();

const env = process.env.NODE_ENV;
if (env === 'production' || env === 'alpha' || env === 'staging') {
  app.use(ravenRequestHandler);
  app.use(ravenErrorHandler);
}
app.use(corsMiddleware);
app.use(morganMiddleware);
app.use(helmetMiddleware);
// app.use(authMiddleware);
app.use(compressionMiddleware);

app.use('/graphql', (req, res) => {
  const { currentUser } = req;
  console.log('req', req.body);

  return graphqlHTTP({
    schema,
    graphiql: true, // or whatever you want
    context: currentUser,
    customFormatErrorFn: (error) => {
      if (env === 'production' || env === 'alpha' || env === 'staging') {
        Raven.captureException(error);
      }
      console.error(error);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      };
    },
  })(req, res);
});

app.use(
  '/playground',
  expressPlayground({
    endpoint: '/graphql',
  }),
);

export default app;
