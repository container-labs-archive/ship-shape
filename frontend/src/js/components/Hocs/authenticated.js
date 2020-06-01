import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';


// @connect(store => ({
//   isAuthenticated: store.auth.isAuthenticated,
// }))
function authenticated(WrappedComponent) {
  return class HOCLoader extends React.Component {
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
