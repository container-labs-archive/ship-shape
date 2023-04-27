// @flow

const baseConfig = {
  production: {
    graphqlBasicToken: '',
    ravenAPIDSN: '',
    basicAuthUserId: '',
    shipEngineAPIKey: '',
  },
  staging: {
    graphqlBasicToken: '',
    ravenAPIDSN: '',
    basicAuthUserId: '',
    shipEngineAPIKey: '',
  },
  local: {
    firebaseStorageBucket: 'ship-shape-staging-2-17ca.appspot.com',
    firebaseDatabaseURL: 'https://ship-shape-staging-2-17ca.firebaseio.com',
    graphqlBasicToken: '',
    ravenAPIDSN: '',
    basicAuthUserId: '',
    projectId: 'ship-shape-staging-2-17ca',
    shipEngineAPIKey: '',
  },
};

const extendedConfig = {
  production: {
  },
  staging: {
  },
  local: {
  },
};

const env = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;
const config = {
  ...baseConfig[env],
  ...extendedConfig[env],
};

export default config;
