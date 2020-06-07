// @flow

const baseConfig = {
  production: {
    ravenAPIDSN: 'https://70a164aa5d4b477d97b67fbe28d2eda4@o99542.ingest.sentry.io/5259751',
    shipEngineAPIKey: 'f6AuNHas6Pc0FXowghud+BjMfZWtcQW7WhnS9Foynzo',
  },
  staging: {
    ravenAPIDSN: 'https://70a164aa5d4b477d97b67fbe28d2eda4@o99542.ingest.sentry.io/5259751',
    shipEngineAPIKey: 'TEST_UdhlCCzLEA6sjggCleIDCnOWB6Sy+eVDx58QKKAspq8',
  },
  local: {
    firebaseStorageBucket: 'ship-shape-staging-2-17ca.appspot.com',
    firebaseDatabaseURL: 'https://ship-shape-staging-2-17ca.firebaseio.com',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    ravenAPIDSN: 'https://70a164aa5d4b477d97b67fbe28d2eda4@o99542.ingest.sentry.io/5259751',
    basicAuthUserId: 'ymwPhGeRLwMD2CwTH6doH5vqizx2',
    projectId: 'ship-shape-staging-2-17ca',
    shipEngineAPIKey: 'TEST_UdhlCCzLEA6sjggCleIDCnOWB6Sy+eVDx58QKKAspq8',
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
