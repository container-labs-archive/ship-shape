import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  owner: {
    color: blue[800],
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  itemPrimary: {
    position: 'relative',
    paddingRight: theme.spacing(10),
  },
  actions: {
    position: 'absolute',
    top: -5,
    right: -30,
  },
});

export default styles;
