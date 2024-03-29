import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import auth from './redux/auth/reducer';
import notification from './redux/notifications/reducer';

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  notification,
  form: formReducer.plugin({
    account: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch (action.type) {
        case 'CLEAR_FORM_AFTER_CREATE_SUCCESS':
          return undefined; // <--- blow away form data
        default:
          return state;
      }
    },
  }),
});
