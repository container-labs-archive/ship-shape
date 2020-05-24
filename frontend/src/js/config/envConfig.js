// @flow

const baseConfig = {
  production: {
  },
  staging: {
  },
  local: {
    firebaseServiceAccountFilename: 'firebase.config.staging.json',
    firebaseStorageBucket: 'gpt-staging.appspot.com',
    firebaseDatabaseURL: 'https://gpt-staging.firebaseio.com',
    graphqlEndpoint: 'http://localhost:5000/graphql',
    passwordResetUrl: 'https://localhost:4000/#/reset',
    confirmEmailUrl: 'https://localhost:4000/#/confirm',
    ravenAPIDSN: '',
    ravenFrontendPublicDSN: '',
    frontendPath: 'http://localhost:4000',
    adminPath: 'http://localhost:4002',
  },
  test: {
    statesAccount: 'FEWBAR',
  },
};

const extendedConfig = {
  production: {
    firebaseConfig: {
    },
  },
  staging: {
    firebaseConfig: {
    },
  },
  local: {
    firebaseConfig: {
      apiKey: 'AIzaSyDVEUcy4P6bbKxMDm-jb946kRf9poINwHs',
      authDomain: 'gpt-staging.firebaseapp.com',
      databaseURL: 'https://gpt-staging.firebaseio.com',
      projectId: 'gpt-staging',
      storageBucket: 'gpt-staging.appspot.com',
      // messagingSenderId: '588217904415',
    },
  },
};

const env = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;
const config = {
  ...baseConfig[env],
  ...extendedConfig[env],
};

export default config;
