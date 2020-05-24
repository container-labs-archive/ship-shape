// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'Apollo';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';
import { queryLoader } from 'HOCS';
// import Config from 'Config';
import AppBarAndDrawer from 'Components/Layout/AppBarAndDrawer';
import Notifier from 'Components/Layout/Notifier';
import type { AppProps, AppState } from 'Types';
import createRoutes from '../../routes';
import { saveUserSettings } from '../../redux/users/actions';
import { userSettingsQuery } from './graphql';

// const sentryDSN = Config.ravenFrontendPublicDSN;
// const useSentry = process.env.NODE_ENV === 'production';
// const sentryConfig = {
//   release: process.env.RELEASE,
//   environment: process.env.NODE_BUILD_ENV,
// };

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    userEmail: state.auth.userEmail,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    darkTheme: state.users.settings.user.darkTheme,
  };
};

@connect(mapStateToProps)
@compose(graphql(userSettingsQuery, {
  options: ({ userId }) => ({ variables: { key: userId } }),
  skip: ownProps => !ownProps.userId,
}))
@queryLoader
class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    const { data, dispatch } = this.props;
    if (data && data.user) {
      // TODO: make sure we are actually getting this from redux later, AKA are we using it
      dispatch(saveUserSettings({ user: data.user, account: data.account }));
    }
    console.log(process);
  }

  isAdmin = () => {
    const { data } = this.props;
    if (!data || data.loading) {
      return false;
    }
    if (!data.user) {
      return false;
    }

    return !!data.user.isAdmin;
  }

  isDemo = () => {
    const { data } = this.props;
    if (!data || data.loading) {
      return false;
    }
    if (!data.user) {
      return false;
    }
    return !!data.user.isDemo;
  }

  userIsAuthenticated = () => {
    const { data } = this.props;
    if (!data || data.loading) {
      return false;
    }
    if (!data.user) {
      return false;
    }
    return this.props.isAuthenticated;
  }

  render() {
    const {
      userEmail,
      isAuthenticated,
      dispatch,
      data,
      token,
      darkTheme,
    } = this.props;

    const user = data ? data.user : null;
    const account = data ? data.account : null;

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
          main: '#009874',
          dark: '#007d60',
          // contrastText: '#fff',
        },
        secondary: {
          main: '#1e88e5',
        },
      },
    }

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


    return (
      <MuiThemeProvider theme={muiTheme}>
        <AppBarAndDrawer
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          userIsAuthenticated={this.userIsAuthenticated()}
          isAdmin={this.isAdmin()}
          isDemo={this.isDemo()}
          email={userEmail}
          user={user}
          disabled={!isAuthenticated}
          token={token}
          account={account}
        >
          {/* {useSentry && (
            <Raven
              dsn={sentryDSN}
              config={sentryConfig}
            />
          )} */}
          {createRoutes()}
          <Notifier />
        </AppBarAndDrawer>
        <div id="token" jest={token} />
      </MuiThemeProvider>
    );
  }
}

export default App;
