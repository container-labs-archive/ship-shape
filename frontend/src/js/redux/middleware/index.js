import { notify } from '../notifications/actions';

const apolloErrorToaster = store => next => (action) => {
  if (action.type === 'APOLLO_QUERY_ERROR') {
    return store.dispatch(notify('There was an error making your request'));
  }
  return next(action);
};

export { apolloErrorToaster };
