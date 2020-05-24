// @flow
import * as React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AppBarAndDrawer from 'Components/Layout/AppBarAndDrawer';
import type { AppProps, AppState } from 'Types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import { detect } from 'detect-browser';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#6ec5ff',
      main: '#009874',
      dark: '#007d60',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff557c',
      main: '#e10050',
      dark: '#a80029',
      contrastText: '#fff',
    },
  },
});

const style = {
  subheading: {
    padding: '24px 24px 20px 24px',
  },

  icon: {
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
  },
};

@withStyles(style)
class UnsupportedBrowser extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    const browser = detect();
    const {
      name,
      version,
      os,
    } = browser;
    this.state = {
      name,
      version,
      os,
      showBrowserInfo: false,
    };
  }

  handleChrome = () => {
    const win = window.open('https://www.google.com/chrome/', '_blank');
    win.focus();
  }

  handleFirefox = () => {
    const win = window.open('https://www.mozilla.org/en-US/firefox/new/', '_blank');
    win.focus();
  }

  toggleBrowserInfo = () => {
    const { showBrowserInfo } = this.state;
    this.setState({ showBrowserInfo: !showBrowserInfo });
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      version,
      os,
      showBrowserInfo,
    } = this.state;

    return (
      <MuiThemeProvider theme={muiTheme}>
        <AppBarAndDrawer
          disabled
        />
        <Dialog aria-labelledby="simple-dialog-title" open >
          <DialogTitle id="simple-dialog-title"><div onClick={this.toggleBrowserInfo}>Unsupported Browser</div></DialogTitle>
          <Typography variant="subtitle1" className={classes.subheading}>
            We are sorry, but to provide the best experience with Selenity possible, these are the only browsers that we currently support.
          </Typography>
          <div>
            <List>
              <ListItem button onClick={() => this.handleChrome()}>
                <ListItemAvatar>
                  <Avatar>
                    <img src="/assets/chrome.png" alt="chrome icon" className={classes.icon} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Download Chrome" />
              </ListItem>
              <ListItem button onClick={() => this.handleFirefox()}>
                <ListItemAvatar>
                  <Avatar>
                    <img src="/assets/firefox.png" alt="firefox icon" className={classes.icon} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Download Firefox" />
              </ListItem>
            </List>
          </div>
          {showBrowserInfo && <Grow in={showBrowserInfo}>
            <Typography variant="body2" className={classes.subheading}>
              {name} {version} {os}
            </Typography>
          </Grow>
          }
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default UnsupportedBrowser;
