// @flow

import * as React from 'react';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import JobsIcon from '@material-ui/icons/FormatListBulleted';
import ResultsIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  AppBar,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Logo from '../../../../assets/logo.svg';
import Avatar from '../../Avatar';
import DashboardDropdown from '../DashboardDropdown';
import type {
  AppBarAndDrawerProps,
  AppBarAndDrawerState,
} from './types';
import { styles } from './styles';
import { logout } from '../../../redux/auth/actions';

@withStyles(styles)
class AppBarAndDrawer extends React.Component<AppBarAndDrawerProps, AppBarAndDrawerState> {
  state = {
    // TODO: defaults to open first, new users might not know where to look
    // eventually could get fancy and show this on the first login with a demo of how the use the app
    open: false,
    anchorEl: null,
  };

  login = () => {
    const { dispatch } = this.props;
    dispatch(push('/login'));
  }

  logout = () => {
    const {
      dispatch,
    } = this.props;
    this.setState({ anchorEl: null });
    dispatch(logout());
  }

  goToProfile = () => {
    const { dispatch } = this.props;
    this.setState({ anchorEl: null });
    dispatch(push('/profile'));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  openProfileDropdown = (event: Object) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  closeProfileDropdown = () => {
    this.setState({ anchorEl: null });
  }

  renderAppBar = () => {
    const {
      classes,
      isAuthenticated,
      email,
      userIsAuthenticated,
      user,
      disabled,
      account,
      disableDrawer,
      photoURL,
    } = this.props;
    const {
      open,
      anchorEl,
    } = this.state;

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            aria-label="Open Drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            {!disableDrawer
              && <MenuIcon />
            }
          </IconButton>
          <div className={classes.logoWrapper}>
            <span className={classNames(classes.logoText, classes.logoTextWhite)}>Ship</span>
            <span className={classes.logoText}>Shape</span>
          </div>
          {isAuthenticated && (
            <div className={classes.rightNav}>
              <IconButton
                onClick={this.openProfileDropdown}
                color="inherit"
              >
                <Avatar
                  photoURL={photoURL}
                  email={email}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeProfileDropdown}
              >
                <MenuItem disabled>
                  <Typography variant="subtitle1">
                    {email}
                  </Typography>
                </MenuItem>
                {/* <MenuItem onClick={this.goToProfile}>
                  Profile
                </MenuItem> */}
                <MenuItem onClick={this.logout}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  renderDrawer = () => {
    const {
      classes,
      isAuthenticated,
      userIsAuthenticated,
      isAdmin,
    } = this.props;
    const {
      open,
    } = this.state;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
          {isAuthenticated && userIsAuthenticated && (
            <ListItem
              to="/home"
              component={NavLink}
              className={classes.navLink}
              activeClassName={classes.activeDrawerItem}
            >
              <ListItemIcon>
                <Tooltip title="Home">
                  <HomeIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Home" />

            </ListItem>
          )}
        </List>
        {isAuthenticated && userIsAuthenticated
          && <Divider />
        }
        <List className={classes.list}>
          {isAuthenticated && isAdmin && userIsAuthenticated && (
            <ListItem
              to="/jobs"
              component={NavLink}
              className={classes.navLink}
              activeClassName={classes.activeDrawerItem}
            >
              <ListItemIcon>
                <Tooltip title="Jobs">
                  <JobsIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>
          )}
          {isAuthenticated && isAdmin && userIsAuthenticated && (
            <ListItem
              to="/users"
              component={NavLink}
              className={classes.navLink}
              activeClassName={classes.activeDrawerItem}
            >
              <ListItemIcon>
                <Tooltip title="Users">
                  <PersonIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          )}
        </List>
      </Drawer>
    );
  }

  render() {
    const {
      classes,
      children,
      disabled,
      disableDrawer,
    } = this.props;

    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        {!disableDrawer
          && this.renderDrawer()
        }
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {children}
        </main>
      </div>
    );
  }
}

export default AppBarAndDrawer;
