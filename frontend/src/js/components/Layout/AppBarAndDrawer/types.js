// @flow

type AppBarAndDrawerProps = {
  dispatch: Function,
  classes: Object,
  isAuthenticated: boolean,
  isDemo: boolean,
  email: string,
  userIsAuthenticated: boolean,
  isAdmin: boolean,
  children: Object,
  disabled: boolean,
  user: Object,
}

type AppBarAndDrawerState = {
  open: boolean,
  anchorEl: ?Object,
}

export type {
  AppBarAndDrawerProps,
  AppBarAndDrawerState,
};
