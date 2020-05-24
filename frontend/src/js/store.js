import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import RavenMiddleware from 'redux-raven-middleware';
// import createHistory from 'history/createBrowserHistory';

const history = require("history").createBrowserHistory();

import { apolloErrorToaster } from 'Middleware';
import reducers from './reducers';



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
const store = createStore(reducers(history), enhancer);

export default store;
export { history };
