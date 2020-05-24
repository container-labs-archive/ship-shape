import { Record } from 'immutable';
import {
  SELECT_PROFILE,
  SELECT_ASSIGNED_JOB,
} from './constants';

export const Profiles = new Record({
  selectedAssignedJobId: null,
  selectedProfileId: null,
  isFetching: false,
  error: null,
  selectedNoneFromUI: false,
  data: {},
});

export default function reducer(state = new Profiles(), { payload, type }) {
  switch (type) {
    case SELECT_PROFILE: {
      let newState = state.set('selectedProfileId', payload.profileId);
      if (payload.profileId === '') {
        newState = newState.set('selectedNoneFromUI', true);
      }
      return newState;
    }
    case SELECT_ASSIGNED_JOB: {
      return state.set('selectedAssignedJobId', payload.assignedJobId);
    }
    default:
      return state;
  }
}
