// @flow

type Props = {
  classes: Object,
  data: Object,
  trackPackage: Function,
  updatePackage: Function,
  isAuthenticated: boolean,
  dispatch: Function,
}

type State = {
  error: ?Object,
  submitting: boolean,
}

export type {
  Props,
  State,
};
