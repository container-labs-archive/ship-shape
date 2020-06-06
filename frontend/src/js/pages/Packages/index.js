// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from '@material-ui/core';
import { push } from 'connected-react-router';
import PackagesForm from 'Components/Packages/Form'
import PackagesList from 'Components/Packages/List';
import { compose, graphql } from 'Apollo';
import { authenticated, queryLoader } from 'HOCS';
import {
  packagesQuery,
  trackPackageMutation,
  updatePackageMutation,
} from './graphql';
import styles from './styles';
import type { Props, State } from './types';

@connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
})
@compose(
  graphql(packagesQuery, {
    // options: ({ userId }) => ({ variables: { key: userId } }),
    // skip: ownProps => !ownProps.userId,
  }),
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
  // TODO: HOC
  // https://www.codementor.io/@sahilmittal/using-higher-order-components-for-authenticated-routing-i1hcp6pc6
  componentDidMount() {
    this._checkAndRedirect();
  }

  componentDidUpdate() {
    this._checkAndRedirect();
  }

  _checkAndRedirect() {
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

    trackPackage({
      variables: {
        input: json,
      },
    }).then(() => {
      data.refetch();
    }).catch((error) => {
      // dispatch a toast message or add an error to the form?
      console.error(error);
    });
  }

  onUpdate = (json: any) => {
    const {
      data,
      updatePackage,
    } = this.props;

    updatePackage({
      variables: {
        input: json,
      },
    }).then(() => {
      data.refetch();
    }).catch((error) => {
      // how to raise these in Raven as well?
      console.error(error);
    });
  }

  render() {
    const {
      classes,
      data,
    } = this.props;

    return (
      <div>
        <PackagesForm
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
