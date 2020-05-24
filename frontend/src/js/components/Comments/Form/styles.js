const styles = theme => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  textField: {
    display: 'flex',
    flex: 1,
  },
  inline: {
    display: 'flex',
  },
  button: {
    width: 32,
    height: 32,
    marginTop: 4.5,
    marginLeft: theme.spacing(2),
    borderRadius: '100%',
    background: theme.palette.primary.main,
  },
  icon: {
    marginTop: -6,
    marginLeft: 2,
    width: 20,
    height: 20,
    color: theme.palette.primary.contrastText,
  },
});

export default styles;
