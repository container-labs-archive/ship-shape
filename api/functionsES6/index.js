// only add when they actually load...
// require('@google-cloud/trace-agent').start();
// require('@google-cloud/profiler').start();
/**
 * This file is to use the graphql api as a firebase function
 * NOTE: subscriptions do not work this way
 * THIS HAS TO BE A REQUIRE AT LEAST AT V0.8.1
 */
import app from './server';

const functions = require('firebase-functions');

const newApp = functions.https.onRequest((request, response) => {
  if (!request.path) {
    // prepend '/' to keep query params if any
    request.url = `/${request.url}`;
  }
  return app(request, response);
});

exports.graphql = newApp;
exports.graphqlAlpha = newApp;
