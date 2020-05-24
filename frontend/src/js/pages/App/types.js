// @flow

import type { ApolloQuery } from 'Types';

type Props = {
  data: ApolloQuery,
  dispatch: Function,
  userEmail: string,
  isAuthenticated: boolean,
}

type State = {

}

export type {
  Props,
  State,
};
