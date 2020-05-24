import red from '@material-ui/core/colors/red';

const styles = () => ({
  container: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 32,
    paddingRight: 32,
    maxWidth: 420,
    margin: '0 auto',
  },
  textField: {
    display: 'flex',
    marginBottom: 20,
  },
  error: {
    marginBottom: 20,
    color: red[500],
  },
  buttons: {
    marginTop: 40,
    marginBottom: 20,
  },
  links: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;
