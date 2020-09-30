// @flow

import { flow as compose } from 'lodash';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import {
  gql,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import config from 'Config';
import fetch from 'unfetch';
import { BrowserLogger } from '@containerlabs/shared-nodejs-web';

const envKey = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;

const Logger = new BrowserLogger(envKey);

// Raven.config('https://9755a41dc1c5433ca6ae1ee5f0460923@sentry.io/218185').install();

const apiLink = new HttpLink({
  uri: config.graphqlEndpoint,
  fetch,
  credentials: 'same-origin',
});

const retryLink = new RetryLink({
  delay: {
    initial: 100,
    max: 3,
    jitter: false,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation, args) => {
      Logger.log('retryIf', error, _operation, args);
      return !!error;
    },
  },
});

// TODO: send these to Raven
// TODO: update to catch all errors
const errorLink = onError((args) => {
  const { graphQLErrors, networkError } = args;
  Logger.log(`errorLink ${args}`);
  // TODO: catch unexpected token < error
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (process.env.NODE_ENV === 'staging') {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      } else if (process.env.NODE_ENV === 'production') {
        // Raven.captureException(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      }
    });
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      // removeTokenFromStorage();
      // location.reload();
    }
    if (process.env.NODE_ENV === 'staging') {
      console.error(`[Network error]: ${networkError}`);
    } else if (process.env.NODE_ENV === 'production') {
      // Raven.captureException(networkError);
    }
  }
});

// add the authorization to the headers
// const authMiddleware = new ApolloLink((operation, forward) => {
//   Logger.log('authMiddleware', operation, forward);
//   const token = authTokenFromStorage();

//   if (token !== null) {
//     operation.setContext({
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

//   return forward(operation);
// });

// const loggerMiddleware = new ApolloLink((operation, forward) => {
//   Logger.log('loggerMiddleware', operation, forward);
//   if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
//     // Logger.log(operation.operationName);
//   }
//   return forward(operation).map((result) => {
//     if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
//       // Logger.log(`received result from ${operation.operationName}`);
//     }
//     return result;
//   });
// });

const link = from([
  // loggerMiddleware,
  // authMiddleware,
  errorLink,
  retryLink,
  apiLink,
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: (object) => object.key || null,
  }),
});

export default client;

export {
  compose,
  // graphql,
  gql,
};
