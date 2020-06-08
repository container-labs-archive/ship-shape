// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import PackagesForm from 'Components/Packages/Form';
import PackagesList from 'Components/Packages/List';
import { compose, graphql } from 'Apollo';
import { queryLoader } from 'HOCS';
import {
  packagesQuery,
  trackPackageMutation,
  updatePackageMutation,
} from './graphql';
import styles from './styles';
import type { Props, State } from './types';

@connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
}))
@compose(
  graphql(packagesQuery),
  graphql(trackPackageMutation, {
    name: 'trackPackage',
  }),
  graphql(updatePackageMutation, {
    name: 'updatePackage',
  }),
)
@queryLoader
@withStyles(styles)
class Home extends Component<Props, State> {
  state = {
    error: null,
    submitting: false,
  }

  // TODO: HOC
  // https://www.codementor.io/@sahilmittal/using-higher-order-components-for-authenticated-routing-i1hcp6pc6
  componentDidMount() {
    this.checkAndRedirect();
  }

  componentDidUpdate() {
    this.checkAndRedirect();
  }

  checkAndRedirect = () => {
    const { isAuthenticated, dispatch } = this.props;

    if (!isAuthenticated) {
      // redirect();
      dispatch(push('/'));
    }
  }

  trackPackage = (json: any) => {
    const {
      data,
      trackPackage,
    } = this.props;

    this.setState({
      submitting: true,
      error: null,
    });

    trackPackage({
      variables: {
        input: json,
      },
    }).then(() => {
      data.refetch();
    }).catch((error) => {
      // dispatch a toast message or add an error to the form?
      // console.error(error);
      this.setState({
        error,
      });
    }).finally(() => {
      this.setState({
        submitting: false,
      });
    });
  }

  onUpdate = (json: any) => {
    const {
      data,
      updatePackage,
    } = this.props;


    this.setState({
      submitting: true,
      error: null,
    });

    updatePackage({
      variables: {
        input: json,
      },
    }).then(() => {
      data.refetch();
    }).catch((error) => {
      // how to raise these in Raven as well?
      // console.error(error);
      this.setState({
        error,
      });
    }).finally(() => {
      this.setState({
        submitting: false,
      });
    });
  }

  render() {
    const {
      data,
    } = this.props;
    const {
      error,
      submitting,
    } = this.state;

    let errorMessage = null;
    if (error) {
      // TODO: handle ship shape errors
      errorMessage = 'There was a problem with the request';
    }

    return (
      <div>
        <PackagesForm
          requestError={errorMessage}
          isSubmitting={submitting}
          onSubmit={this.trackPackage}
        />
        <PackagesList
          data={data.packages}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}

export default Home;
