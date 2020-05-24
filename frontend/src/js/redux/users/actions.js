// @flow

import { SELECT_USER, SAVE_USER_SETTINGS } from './constants';

export const selectUser = id => (dispatch) => {
  dispatch({
    type: SELECT_USER,
    payload: id,
  });
};

export const saveUserSettings = (settingsObject: Object) => {
  return {
    type: SAVE_USER_SETTINGS,
    payload: settingsObject,
  };
};
