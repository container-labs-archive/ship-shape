import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: grey[200],
    minHeight: 40,
  },
  textField: {
    display: 'flex',
    flex: 1,
  },
  inline: {
    display: 'flex',
  },
  actions: {
    width: 100,
    marginLeft: 10,
  },
});

export default styles;
