import purple from '@material-ui/core/colors/purple';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarLogoWrapper: {
    flex: 1,
    maxHeight: 64,
  },
  appBarLogoImage: {
    height: 64,
  },
  logoWrapper: {
    height: '46px', // VR46 forever
    marginTop: '2px',
    flex: 1,
  },
  logo: {
    width: 'inherit',
    height: 'inherit',
  },
  navLink: {
    color: 'inherit',
  },
  logoText: {
    flex: 1,
    fontWeight: 'bold',
    // color: theme.palette.primary.contrastText,
    color: '#ff6200',
    fontFamily: "'Nunito', sans-serif",
    fontSize: '2em',
  },
  logoTextWhite: {
    color: 'white',
  },

  oranage: '#ff6200',

  loginButton: {
    color: theme.palette.primary.contrastText,
    marginRight: 12,
  },
  demoChip: {
    color: theme.palette.primary.contrastText,
    backgroundColor: purple['500'],
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 24,
    color: theme.palette.primary.contrastText,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  accountName: {
    display: 'inline',
    marginRight: '15px',
    color: 'white',
    verticalAlign: 'middle',
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90,
    paddingBottom: 90,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  activeDrawerItem: {
    background: theme.palette.primary.light, // grey['200'],
  },
  avatar: {
    margin: '10px',
  },
  rightNav: {
    marginRight: '15px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },


});

export { styles, drawerWidth };
