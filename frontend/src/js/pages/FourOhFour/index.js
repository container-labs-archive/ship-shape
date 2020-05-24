// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import type { Props } from './types';

const FourOhFour = ({ classes }: Props): ReactComponent => (
  <div className={classes.container}>
    <Typography variant="h4" className={classes.typography}>
      404
      <br />
      Page not found
      <br />
      We are sorry, we were unable to find that page
    </Typography>
  </div>
);

export default withStyles(styles)(FourOhFour);
