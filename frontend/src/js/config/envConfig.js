// @flow

const baseConfig = {
  production: {
    ravenFrontendPublicDSN: 'https://cfc623514ecc4bafa09d0cae35c9fe29@o99542.ingest.sentry.io/5259734',
  },
  staging: {
    ravenFrontendPublicDSN: 'https://cfc623514ecc4bafa09d0cae35c9fe29@o99542.ingest.sentry.io/5259734',
  },
  local: {
    graphqlEndpoint: 'http://localhost:5000/graphql',
    ravenFrontendPublicDSN: 'https://cfc623514ecc4bafa09d0cae35c9fe29@o99542.ingest.sentry.io/5259734',
  },
};

const extendedConfig = {
  production: {
    firebaseConfig: {
      apiKey: 'AIzaSyBgQ3QJFu7pDf2GBrT8UTHimo5NCCnVaBM',
      authDomain: 'ship-shape-prod-f272.firebaseapp.com',
      databaseURL: 'https://ship-shape-prod-f272.firebaseio.com',
      projectId: 'ship-shape-prod-f272',
      storageBucket: 'ship-shape-prod-f272.appspot.com',
      messagingSenderId: '802511686274',
      appId: '1:802511686274:web:d3018625bfe9d8df28c29b'
    },
  },
  staging: {
    firebaseConfig: {
      apiKey: 'AIzaSyAIkjMIxfEcGBoFiBJ1XNJhNXGr95OOtlg',
      authDomain: 'ship-shape-staging-2-17ca.firebaseapp.com',
      databaseURL: 'https://ship-shape-staging-2-17ca.firebaseio.com',
      projectId: 'ship-shape-staging-2-17ca',
      storageBucket: 'ship-shape-staging-2-17ca.appspot.com',
      messagingSenderId: '596464260347',
      appId: '1:596464260347:web:5e46e5345917618a5e0c5e'
    },
  },
  local: {
    firebaseConfig: {
      apiKey: 'AIzaSyAIkjMIxfEcGBoFiBJ1XNJhNXGr95OOtlg',
      authDomain: 'ship-shape-staging-2-17ca.firebaseapp.com',
      databaseURL: 'https://ship-shape-staging-2-17ca.firebaseio.com',
      projectId: 'ship-shape-staging-2-17ca',
      storageBucket: 'ship-shape-staging-2-17ca.appspot.com',
      messagingSenderId: '596464260347',
      appId: '1:596464260347:web:5e46e5345917618a5e0c5e'
    },
  },
};

const env = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;
const config = {
  ...baseConfig[env],
  ...extendedConfig[env],
};

export default config;
