// @flow

/* eslint-disable import/extensions */

import * as React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBarAndDrawer from 'Components/Layout/AppBarAndDrawer';
import Notifier from 'Components/Layout/Notifier';
import type { AppProps, AppState } from 'Types';
import createRoutes from '../../routes';

const mapStateToProps = state => ({
  userId: state.auth.userId,
  userEmail: state.auth.userEmail,
  photoURL: state.auth.photoURL,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
});

// TODO: add authenticated HOC

@connect(mapStateToProps)
class App extends React.Component<AppProps, AppState> {
  render() {
    const {
      userEmail,
      photoURL,
      isAuthenticated,
      dispatch,
      token,
    } = this.props;

    const theme = {
      typography: {
        useNextVariants: true,
        // fontFamily: [
        //   '-apple-system',
        //   'BlinkMacSystemFont',
        //   '"Segoe UI"',
        //   'Roboto',
        //   '"Helvetica Neue"',
        //   'Arial',
        //   'sans-serif',
        //   '"Apple Color Emoji"',
        //   '"Segoe UI Emoji"',
        //   '"Segoe UI Symbol"',
        // ].join(','),
      },

      palette: {
        primary: {
          // light: '#6ec5ff',
          main: '#4d148c',
          dark: '#ff6200',
          // contrastText: '#fff',
        },
        secondary: {
          main: '#1e88e5',
        },
      },
    };

    const darkTheme = false;

    if (darkTheme) {
      theme.palette.type = 'dark';
      theme.palette.primary = {
        // light: '#6ec5ff',
        main: '#009874',
        dark: '#007d60',
        contrastText: '#fff',
      };
      theme.palette.secondary = {
        main: '#1e88e5',
      };
    }

    const muiTheme = createMuiTheme(theme);

    muiTheme.typography.h3 = {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '2.4rem',
      },
    };

    muiTheme.typography.h6 = {
      fontSize: '1.0rem',
      '@media (min-width:600px)': {
        fontSize: '1.1rem',
      },
      [muiTheme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
      },
    };

    return (
      <MuiThemeProvider theme={muiTheme}>
        <AppBarAndDrawer
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          email={userEmail}
          disabled={!isAuthenticated}
          token={token}
          photoURL={photoURL}
          disableDrawer
        >
          {createRoutes()}
          <Notifier />
        </AppBarAndDrawer>
        <div id="token" jest={token} />
      </MuiThemeProvider>
    );
  }
}

export default App;
