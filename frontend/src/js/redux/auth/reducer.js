import { Record } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS_FULFILLED,
} from './constants';
import {
  isAuthenticated,
  idFromStorage,
  emailFromStorage,
  authTokenFromStorage,
  TOKEN,
} from './tokens';

const Auth = new Record({
  isAuthenticated: isAuthenticated(),
  userId: idFromStorage(),
  userEmail: emailFromStorage(),
  isFetching: false,
  error: '',
  user: '',
  id: '',
  token: authTokenFromStorage(),
});

export default function reducer(state = new Auth(), action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      let newState = state.set('isFetching', true);
      return newState;
    }
    case LOGIN_SUCCESS_FULFILLED: {
      const { payload } = action;
      let newState = state.set('isAuthenticated', true);
      newState = newState.set('isFetching', false);
      newState = newState.set('error', '');
      newState = newState.set('id', payload.uid);
      newState = newState.set('userId', payload.uid);
      newState = newState.set('userEmail', payload.email);
      newState = newState.set('token', payload.token);
      return newState;
    }
    case LOGIN_FAILURE: {
      const newState = state.set('isFetching', false);
      return newState.set('error', action.payload.message);
    }
    case LOGOUT_REQUEST: {
      return state.set('isFetching', true);
    }
    case LOGOUT_SUCCESS: {
      let newState = state.set('isFetching', false);
      newState = newState.set('isAuthenticated', false);
      localStorage.setItem(TOKEN, null);
      return newState;
    }
    default: {
      return state;
    }
  }
}
