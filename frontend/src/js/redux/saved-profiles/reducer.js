import { Record } from 'immutable';
import { saveAs } from '../../utils/files';
import {
  DOWNLOAD_START,
  DOWNLOAD_SUCCESS,
  DOWNLOAD_FAILED,
} from './constant';

export const SavedProfiles = new Record({
  isDownloading: false,
  error: null,
});

export default function reducer(state = new SavedProfiles(), { payload, type }) {
  switch (type) {
    case DOWNLOAD_START: {
      return state.set('isDownloading', true);
    }
    case DOWNLOAD_SUCCESS: {
      saveAs(payload);
      return state.set('isDownloading', false);
    }
    case DOWNLOAD_FAILED: {
      state.set('isDownloading', false);
      return state.set('error', payload);
    }
    default:
      return state;
  }
}
