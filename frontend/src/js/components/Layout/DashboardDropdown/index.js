// @flow

import React, { Component } from 'react';
import config from 'Config';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import styles from './styles';
import type { Props, State } from './types';

@withStyles(styles)
class AppBarAndDrawer extends Component<Props, State> {
  state = {
    dashAnchorEl: null,
  };

  openDashboardDropdown = (event: Object) => {
    this.setState({ dashAnchorEl: event.currentTarget });
  }

  closeDashboardDropdown = () => {
    this.setState({ dashAnchorEl: null });
  }

  render() {
    const {
      isAdmin,
    } = this.props;
    const {
      dashAnchorEl,
    } = this.state;

    return (
      <React.Fragment>
        <IconButton
          onClick={this.openDashboardDropdown}
          color="inherit"
          key="drop1"
        >
          <DashboardIcon />
        </IconButton>
        <Menu
          anchorEl={dashAnchorEl}
          open={Boolean(dashAnchorEl)}
          onClose={this.closeDashboardDropdown}
          key="drop2"
        >
          <MenuItem
            disabled={isAdmin}
            onClick={() => { window.location = config.adminPath; }}
          >
            <Typography variant="subtitle1">
              Admin
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => { window.location = config.frontendPath; }}
            disabled={!isAdmin}
          >
            Selenity
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default AppBarAndDrawer;
