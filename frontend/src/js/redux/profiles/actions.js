import { reset } from 'redux-form';
import {
  SELECT_ASSIGNED_JOB,
  SELECT_PROFILE,
} from './constants';

export const selectProfile = profileId => (dispatch) => {
  dispatch({
    type: SELECT_PROFILE,
    payload: { profileId },
  });
};

export const clearForm = formName => (dispatch) => {
  dispatch(reset(formName));
};

export const selectAssignedJob = assignedJobId => ({
  type: SELECT_ASSIGNED_JOB,
  payload: {
    assignedJobId,
  },
});
