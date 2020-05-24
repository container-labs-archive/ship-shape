import { Record } from 'immutable';
import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from './constants';

export const Notification = new Record({
  message: '',
  visible: false,
});

export default function reducer(state = new Notification(), { payload, type }) {
  switch (type) {
    case SHOW_NOTIFICATION: {
      const newState = state.set('visible', true);
      return newState.set('message', payload);
    }
    case HIDE_NOTIFICATION: {
      const newState = state.set('message', '');
      return newState.set('visible', false);
    }
    default:
      return state;
  }
}
