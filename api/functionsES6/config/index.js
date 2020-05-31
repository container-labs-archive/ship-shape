// @flow

const baseConfig = {
  production: {
    firebaseServiceAccountFilename: null,
    firebaseStorageBucket: 'gpt-production.appspot.com',
    firebaseDatabaseURL: 'https://gpt-production.firebaseio.com',
    graphqlEndpoint: 'https://libra.containerlabs.io/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'https://libra.containerlabs.io/reset',
    confirmEmailUrl: 'https://libra.containerlabs.io/confirm',
    ravenAPIDSN: 'https://e3edbfdebdd848d487d6abbe0ec40e67@sentry.io/289590',
    ravenFrontendPublicDSN: 'https://d423befc26174f5f9e511a75a65a11ea@sentry.io/289592',
    sendgridApiKey: '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',
    basicAuthUserId: 'M9N5eHsRJpWrj7LJm2Bg0PTd4oj2',
    projectId: 'gpt-production',
    shipEngineAPIKey: 'f6AuNHas6Pc0FXowghud+BjMfZWtcQW7WhnS9Foynzo',
  },
  staging: {
  },
  local: {
    firebaseServiceAccountFilename: 'firebase.config.staging.json',
    firebaseStorageBucket: 'gpt-staging.appspot.com',
    firebaseDatabaseURL: 'https://gpt-staging.firebaseio.com',
    graphqlEndpoint: 'http://localhost:5000/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'http://localhost:4000/reset',
    confirmEmailUrl: 'http://localhost:4000/confirm',
    ravenAPIDSN: 'https://2c98782e15924c96b08eada091844fdd:384e16d4f3d24b98b2745a5951ad4faa@sentry.io/289591',
    ravenFrontendPublicDSN: 'https://408cac41cbdb44a6b8f1dc1807212db6@sentry.io/289593',
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
