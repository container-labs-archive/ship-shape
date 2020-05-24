// @flow

import type {
  ApolloQuery,
  ApolloMutation,
} from 'Types';

type Props = {
  data: ApolloQuery,
  mutate: ApolloMutation,
  classes: Object,
  dispatch: Function,
}

type State = {

}

export type {
  Props,
  State,
};
