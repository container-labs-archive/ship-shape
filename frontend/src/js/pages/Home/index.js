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
import PackagesTable from 'Components/Packages/DataTable';
import { compose, graphql } from 'Apollo';
import { queryLoader } from 'HOCS';
import { packagesQuery } from './graphql';
import styles from './styles';
import type { Props, State } from './types';
import GoogleButton from './GoogleButton';
import {
  login,
} from '../../redux/auth/actions';

@connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
})
@withStyles(styles)
class Home extends Component<Props, State> {
  // componentDidUpdate(prevProps) {
  //   const {
  //     isAuthenticated,
  //     dispatch,
  //   } = this.props;

  //   if (isAuthenticated) {
  //     dispatch(push('/home'));
  //   }
  // }

  handleGoogleLogin = () => {
    const { dispatch } = this.props;

    dispatch(login());
  }

  render() {
    const {
      classes,
      isAuthenticated,
      dispatch,
    } = this.props;

    if (isAuthenticated) {
      dispatch(push('/home'));
    }

    return (
      <Card className={classes.container}>
        <CardContent>
          <Typography variant="h5">
            Get ready to ship your pants.
          </Typography>
        </CardContent>
        <CardActions>
          <GoogleButton handleLogin={this.handleGoogleLogin} />
        </CardActions>
      </Card>
    );
  }
}

export default Home;
