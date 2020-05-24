// @flow

import { Record } from 'immutable';
import { SELECT_USER, SAVE_USER_SETTINGS } from './constants';
import * as Sentry from '@sentry/browser';

const useSentry = process.env.NODE_BUILD_ENV === 'production' || process.env.NODE_BUILD_ENV === 'alpha' || process.env.NODE_BUILD_ENV === 'staging';

export const Users = new Record({
  selectedUserId: null,
  settings: {
    user: {},
    account: {},
  },
  account: null,
});

export default function reducer(state = new Users(), { payload, type }) {
  switch (type) {
    case SELECT_USER: {
      return state.set('selectedUserId', payload.user);
    }
    case SAVE_USER_SETTINGS: {
      if (useSentry) {
        Sentry.configureScope((scope) => {
          scope.setUser({ email: payload.user.email });
        });
      }
      const newState = state.set('settings', payload);
      return newState.set('account', payload.account);
    }
    default:
      return state;
  }
}
