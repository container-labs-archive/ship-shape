import "core-js/stable";
// import "core-js/modules/es6.promise";
// import "core-js/modules/es6.array.iterator";
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';
import Config from 'Config';
import AppWrapper from './AppWrapper';

const sentryDSN = Config.ravenFrontendPublicDSN;
const useSentry = process.env.NODE_BUILD_ENV === 'production' || process.env.NODE_BUILD_ENV === 'alpha' || process.env.NODE_BUILD_ENV === 'staging';
const sentryConfig = {
  dsn: sentryDSN,
  release: process.env.RELEASE,
  environment: process.env.NODE_BUILD_ENV,
};

if (useSentry) {
  Sentry.init({
    ...sentryConfig,
  });
}

// if (process.env.NODE_ENV === 'local') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

render(
  <AppWrapper />,
  document.getElementById('app'),
);

// if (module.hot) {
//   module.hot.accept();
// }
