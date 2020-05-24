// @flow

const baseConfig = {
  production: {
    firebaseServiceAccountFilename: null,
    firebaseStorageBucket: 'libra-production.appspot.com',
    firebaseDatabaseURL: 'https://libra-production.firebaseio.com',
    graphqlEndpoint: 'https://libra.containerlabs.io/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'https://libra.containerlabs.io/reset',
    confirmEmailUrl: 'https://libra.containerlabs.io/confirm',
    ravenAPIDSN: 'https://e3edbfdebdd848d487d6abbe0ec40e67@sentry.io/289590',
    ravenFrontendPublicDSN: 'https://d423befc26174f5f9e511a75a65a11ea@sentry.io/289592',
    sendgridApiKey: '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',
    basicAuthUserId: 'M9N5eHsRJpWrj7LJm2Bg0PTd4oj2',
    projectId: 'libra-production',
  },
  alpha: {
    firebaseServiceAccountFilename: null,
    firebaseStorageBucket: 'libra-production.appspot.com',
    firebaseDatabaseURL: 'https://libra-production.firebaseio.com',
    graphqlEndpoint: 'https://libra-alpha.containerlabs.io/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'https://libra-alpha.containerlabs.io/reset',
    confirmEmailUrl: 'https://libra-alpha.containerlabs.io/confirm',
    ravenAPIDSN: 'https://e3edbfdebdd848d487d6abbe0ec40e67@sentry.io/289590',
    ravenFrontendPublicDSN: 'https://d423befc26174f5f9e511a75a65a11ea@sentry.io/289592',
    sendgridApiKey: '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',
    basicAuthUserId: 'M9N5eHsRJpWrj7LJm2Bg0PTd4oj2',
    projectId: 'libra-production',
  },
  staging: {
    firebaseServiceAccountFilename: null,
    firebaseStorageBucket: 'libra-staging.appspot.com',
    firebaseDatabaseURL: 'https://libra-staging.firebaseio.com',
    graphqlEndpoint: 'https://libra-staging.containerlabs.io/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'https://libra-staging.containerlabs.io/reset',
    confirmEmailUrl: 'https://libra-staging.containerlabs.io/confirm',
    ravenAPIDSN: 'https://e3edbfdebdd848d487d6abbe0ec40e67@sentry.io/289590',
    ravenFrontendPublicDSN: 'https://408cac41cbdb44a6b8f1dc1807212db6@sentry.io/289593',
    sendgridApiKey: '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',
    basicAuthUserId: 'ymwPhGeRLwMD2CwTH6doH5vqizx2',
    projectId: 'libra-staging',
  },
  local: {
    firebaseServiceAccountFilename: 'firebase.config.staging.json',
    firebaseStorageBucket: 'libra-staging.appspot.com',
    firebaseDatabaseURL: 'https://libra-staging.firebaseio.com',
    graphqlEndpoint: 'http://localhost:5000/graphql',
    graphqlBasicToken: 'YWRtaW46X3BoYXNlMV8=',
    passwordResetUrl: 'http://localhost:4000/reset',
    confirmEmailUrl: 'http://localhost:4000/confirm',
    ravenAPIDSN: 'https://2c98782e15924c96b08eada091844fdd:384e16d4f3d24b98b2745a5951ad4faa@sentry.io/289591',
    ravenFrontendPublicDSN: 'https://408cac41cbdb44a6b8f1dc1807212db6@sentry.io/289593',
    sendgridApiKey: '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',
    basicAuthUserId: 'ymwPhGeRLwMD2CwTH6doH5vqizx2',
  },
};

const extendedConfig = {
  production: {
    firebaseConfig: {
      apiKey: 'AIzaSyCGfjp0UCQ375f2UXRPS0LE39Gn1EXaMuI',
      authDomain: 'libra-production.firebaseapp.com',
      databaseURL: 'https://libra-production.firebaseio.com',
      projectId: 'libra-production',
      storageBucket: 'libra-production.appspot.com',
      messagingSenderId: '722480423569',
    },
  },
  alpha: {
    firebaseConfig: {
      apiKey: 'AIzaSyCGfjp0UCQ375f2UXRPS0LE39Gn1EXaMuI',
      authDomain: 'libra-production.firebaseapp.com',
      databaseURL: 'https://libra-production.firebaseio.com',
      projectId: 'libra-production',
      storageBucket: 'libra-production.appspot.com',
      messagingSenderId: '722480423569',
    },
  },
  staging: {
    firebaseConfig: {
      apiKey: 'AIzaSyDVEUcy4P6bbKxMDm-jb946kRf9poINwHs',
      authDomain: 'libra-staging.firebaseapp.com',
      databaseURL: 'https://libra-staging.firebaseio.com',
      projectId: 'libra-staging',
      storageBucket: 'libra-staging.appspot.com',
      messagingSenderId: '588217904415',
    },
  },
  local: {
    firebaseConfig: {
      apiKey: 'AIzaSyDVEUcy4P6bbKxMDm-jb946kRf9poINwHs',
      authDomain: 'libra-staging.firebaseapp.com',
      databaseURL: 'https://libra-staging.firebaseio.com',
      projectId: 'libra-staging',
      storageBucket: 'libra-staging.appspot.com',
      messagingSenderId: '588217904415',
    },
  },
};

const env = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;
const config = {
  ...baseConfig[env],
  ...extendedConfig[env],
};

export default config;
