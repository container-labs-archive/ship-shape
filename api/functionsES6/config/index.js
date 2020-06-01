// @flow

const baseConfig = {
  production: {
    firebaseStorageBucket: 'gpt-production.appspot.com',
    firebaseDatabaseURL: 'https://gpt-production.firebaseio.com',
    graphqlEndpoint: 'https://ss.containerlabs.io/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    // passwordResetUrl: 'https://libra.containerlabs.io/reset',
    // confirmEmailUrl: 'https://libra.containerlabs.io/confirm',
    ravenAPIDSN: 'https://70a164aa5d4b477d97b67fbe28d2eda4@o99542.ingest.sentry.io/5259751',
    sendgridApiKey: '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',
    basicAuthUserId: 'M9N5eHsRJpWrj7LJm2Bg0PTd4oj2',
    projectId: 'gpt-production',
    shipEngineAPIKey: 'f6AuNHas6Pc0FXowghud+BjMfZWtcQW7WhnS9Foynzo',
  },
  staging: {
    firebaseStorageBucket: 'gpt-staging.appspot.com',
    firebaseDatabaseURL: 'https://gpt-staging.firebaseio.com',
    graphqlEndpoint: 'http://ss-staging.containerlabs.io/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'http://localhost:4000/reset',
    confirmEmailUrl: 'http://localhost:4000/confirm',
    ravenAPIDSN: 'https://70a164aa5d4b477d97b67fbe28d2eda4@o99542.ingest.sentry.io/5259751',
    sendgridApiKey: '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',
    basicAuthUserId: 'ymwPhGeRLwMD2CwTH6doH5vqizx2',
    projectId: 'gpt-staging',
    shipEngineAPIKey: 'TEST_UdhlCCzLEA6sjggCleIDCnOWB6Sy+eVDx58QKKAspq8',
  },
  local: {
    firebaseStorageBucket: 'gpt-staging.appspot.com',
    firebaseDatabaseURL: 'https://gpt-staging.firebaseio.com',
    graphqlEndpoint: 'http://localhost:5000/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'http://localhost:4000/reset',
    confirmEmailUrl: 'http://localhost:4000/confirm',
    ravenAPIDSN: 'https://70a164aa5d4b477d97b67fbe28d2eda4@o99542.ingest.sentry.io/5259751',
    sendgridApiKey: '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',
    basicAuthUserId: 'ymwPhGeRLwMD2CwTH6doH5vqizx2',
    projectId: 'gpt-staging',
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
