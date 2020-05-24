// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'Apollo';
import {
  authenticated,
  queryLoader,
  refetchOnMount,
  withHeader,
} from 'HOCS';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Form from '../../components/Settings/Form';
import styles from './styles';
import {
  appSettingsQuery,
  updateAppSettingsMutation,
} from './graphql';
import { notify } from '../../redux/notifications/actions';
import type { Props, State } from './types';

@authenticated
@connect()
@compose(
  graphql(appSettingsQuery),
  graphql(updateAppSettingsMutation),
)
@queryLoader
@refetchOnMount
@withStyles(styles)
@withHeader('Settings')
class Settings extends Component<Props, State> {
  handleSubmit = (values) => {
    const { dispatch, mutate, data } = this.props;
    const { featureUserManagement, featureUploadFiles } = values;
    const input = { featureUserManagement, featureUploadFiles };

    mutate({ variables: { input } })
      .then(() => {
        dispatch(notify('Settings saved!'));
      })
      .then(() => {
        data.refetch();
      });
  }

  render() {
    const { data: { appSettings }, classes } = this.props;

    return (
      <Paper className={classes.container}>
        <Form
          initialValues={appSettings}
          onSubmit={this.handleSubmit}
        />
      </Paper>
    );
  }
}

export default Settings;
