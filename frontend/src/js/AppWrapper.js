// @flow

import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ConnectedRouter } from 'connected-react-router';
// import { detect } from 'detect-browser';
import App from './pages/App/index.js';
// import UnsupportedBrowser from './pages/UnsupportedBrowser';
import 'Assets/style.css';
import apolloClient from './apollo';
import store, { history } from './store';

setConfig({
  // logLevel: 'debug',
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC
  pureRender: true, // RHL will not change render method
});

class AppWrapper extends React.Component {
  render() {
    // const browser = detect();
    // const {
    //   name,
    //   things,
    // } = browser;

    // TODO: turn unsupportedBackOn
    // let appComponent;
    // if (name === 'chrome' || name === 'firefox') {
    //   appComponent = App;
    // } else {
    //   appComponent = UnsupportedBrowser;
    // }

    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <ConnectedRouter onError={e => console.error(e)} history={history}>
            <Route path="/" component={App} />
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default hot(AppWrapper);
