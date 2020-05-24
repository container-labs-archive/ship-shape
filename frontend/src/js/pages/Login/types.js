import { isAuthenticated } from "../../redux/auth/tokens";

// @flow

type Props = {
  error: string,
  classes: Object,
  submitting: boolean,
  handleSubmit: Function,
  dispatch: Function,
  isAuthenticated: boolean,
}

type State = {

}

export type {
  Props,
  State,
};
