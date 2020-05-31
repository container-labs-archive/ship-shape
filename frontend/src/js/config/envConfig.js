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
      apiKey: 'AIzaSyDH7zNIogyj8G81Ew5GlGrkZvnIxbB-kcs',
      authDomain: 'gpt-staging.firebaseapp.com',
      databaseURL: 'https://gpt-staging.firebaseio.com',
      projectId: 'gpt-staging',
      storageBucket: 'gpt-staging.appspot.com',
      messagingSenderId: '736177410254',
      appId: '1:736177410254:web:c1b1085d3a878c1064c09f',
      measurementId: 'G-H4DP540LH0',
    },
  },
};

const env = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;
const config = {
  ...baseConfig[env],
  ...extendedConfig[env],
};

export default config;
