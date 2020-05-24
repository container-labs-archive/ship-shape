import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from './constants';

export function notify(message) {
  return (dispatch) => {
    const dispatchRef = dispatch;

    dispatch({
      type: SHOW_NOTIFICATION,
      payload: message,
    });
    setTimeout(() => {
      dispatchRef({ type: HIDE_NOTIFICATION });
    }, 5000);
  };
}
