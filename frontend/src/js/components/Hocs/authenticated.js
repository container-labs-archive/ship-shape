// @flow

import React from 'react';
import { push } from 'connected-react-router';

type Props = {
  isAuthenticated: boolean,
  dispatch: Function,
}

function authenticated(WrappedComponent: any) {
  return class HOCLoader extends React.Component<Props> {
    componentWillMount() {
      this.redirectIfNotAuthenticated();
    }

    redirectIfNotAuthenticated = () => {
      const {
        isAuthenticated,
        dispatch,
      } = this.props;

      if (!isAuthenticated) {
        dispatch(push('/'));
      }
    }

    render() {
      this.redirectIfNotAuthenticated();

      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}

export default authenticated;
