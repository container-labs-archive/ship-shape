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
import styles from './styles';
import type { Props, State } from './types';

@connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
})
@withStyles(styles)
class Home extends Component<Props, State> {
  componentDidMount() {
    const {
      isAuthenticated,
      dispatch,
    } = this.props;

    if (isAuthenticated) {
      dispatch(push('/home'));
    }
  }

  onLogin = () => {
    const {
      dispatch,
    } = this.props;

    dispatch(push('/login'));
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.container}>
        <CardHeader>
          Welcome
        </CardHeader>
        <CardContent>
          <Typography variant="h4">
            Welcome to Selenity Job Evaluator
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={this.onLogin}>
            Login
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Home;
