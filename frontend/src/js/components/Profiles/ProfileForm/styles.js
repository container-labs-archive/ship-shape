import red from '@material-ui/core/colors/red';

const styles = theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  errorContainer: {
    color: 'white',
    marginBottom: 10,
    padding: '0 10px',
    backgroundColor: red['500'],
  },
  indexCell: {
    width: '3%',
    textAlign: 'center',
    padding: '0 10px 0 10px',
  },
  factorCell: {
    width: '25%',
    padding: '0 10px 0 10px',
  },
  evidenceCell: {
    width: '30%',
    textAlign: 'center',
    padding: '0 10px 0 10px',
  },
  profileScoreCell: {
    width: '10%',
    textAlign: 'center',
    padding: '0 10px 0 10px',
  },
  resultCell: {
    width: '10%',
    textAlign: 'center',
    padding: '0 10px 0 10px',
  },
  jeScoreCell: {
    width: '12%',
    textAlign: 'center',
    padding: '0 10px 0 10px',
  },
  button: {
    marginRight: 20,
  },
  evaluationButton: {
    marginLeft: 10,
  },
});

export default styles;
