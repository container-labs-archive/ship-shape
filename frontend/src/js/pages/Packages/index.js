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
import PackagesList from 'Components/Packages/List';
import { compose, graphql } from 'Apollo';
import { queryLoader } from 'HOCS';
import { packagesQuery } from './graphql';
import styles from './styles';
import type { Props, State } from './types';

@connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
})
@compose(graphql(packagesQuery, {
  // options: ({ userId }) => ({ variables: { key: userId } }),
  // skip: ownProps => !ownProps.userId,
}))
@queryLoader
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
    const {
      classes,
      data,
    } = this.props;

    // return (
    //   <Card className={classes.container}>
    //     <CardHeader>
    //       Welcome
    //     </CardHeader>
    //     <CardContent>
    //       <Typography variant="h4">
    //         Ship Shape
    //       </Typography>
    //       <PackagesTable
    //         data={data.packages}
    //       />
    //     </CardContent>
    //   </Card>
    // );

    return (
      <div>
        <PackagesList
          data={data.packages}
        />
      </div>
    )
  }
}

export default Home;
