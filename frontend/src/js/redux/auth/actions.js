// @flow
import { push } from 'connected-react-router';
import { firebaseAuth } from '../firebase/firebase';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_SUCCESS_FULFILLED,
} from './constants';
import {
  getTokenObject,
  removeTokenFromStorage,
  TOKEN,
  tokenFromAuth,
} from './tokens';
import { provider } from '../firebase/firebase';

const requestLogin = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (tokenObject: Object) =>
  {
    return {
      type: LOGIN_SUCCESS_FULFILLED,
      payload: tokenObject,
    };
  };

export const loginError = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = creds => (dispatch) => {
  dispatch(requestLogin());
  return firebaseAuth.signInWithPopup(provider)
    .then((result) => {
      let tokenObject = {};
      return tokenFromAuth(result.user)
        .then((token) => {
          tokenObject = token;
          return localStorage.setItem(TOKEN, JSON.stringify(token));
        })
        .then(() => {
          dispatch(loginSuccess(tokenObject));
        });
    })
    .catch(error => dispatch(loginError(error)));
};

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false,
});

const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  isFetching: false,
  payload: error,
});

export const logout = () => (dispatch: Function) => {
  dispatch(requestLogout());
  // TODO: update this to the right token, call method from token library
  removeTokenFromStorage();
  firebaseAuth.signOut()
    .then(() => dispatch(logoutSuccess()))
    .catch(error => dispatch(logoutFailure(error)));
};

