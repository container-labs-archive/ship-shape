// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { push } from 'connected-react-router';
import styles from './styles';
import type { Props, State } from './types';
import GoogleButton from './GoogleButton';
import {
  login,
} from '../../redux/auth/actions';

@connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
}))
@withStyles(styles)
class Home extends Component<Props, State> {
  // TODO: HOC
  componentDidMount() {
    this.checkAndRedirect();
  }

  componentDidUpdate() {
    this.checkAndRedirect();
  }

  checkAndRedirect = () => {
    const { isAuthenticated, dispatch } = this.props;

    if (isAuthenticated) {
      // redirect();
      dispatch(push('/home'));
    }
  }

  handleGoogleLogin = () => {
    const { dispatch } = this.props;

    dispatch(login());
  }

  render() {
    const {
      classes,
    } = this.props;

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
