import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import RavenMiddleware from 'redux-raven-middleware';

import { apolloErrorToaster } from 'Middleware';
import reducers from './reducers';
import { Auth } from './redux/auth/reducer';
// import createHistory from 'history/createBrowserHistory';

const history = require('history').createBrowserHistory();

function loadState() {
  return {
    auth: new Auth(),
  };
}

const persistedState = loadState();


const isProduction = process.env.NODE_ENV === 'production';
const sentryDSN = 'https://9755a41dc1c5433ca6ae1ee5f0460923@sentry.io/218185';
// const history = createHistory();
const middleWares = [
  routerMiddleware(history),
  thunk,
  promise,
  apolloErrorToaster,
  !isProduction && createLogger(),
  isProduction && RavenMiddleware(sentryDSN),
].filter(Boolean);

const enhancer = composeWithDevTools(applyMiddleware(...middleWares));
const store = createStore(reducers(history), persistedState, enhancer);

export default store;
export { history };
