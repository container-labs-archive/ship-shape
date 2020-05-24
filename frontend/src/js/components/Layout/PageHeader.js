// @flow

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  headerText: string,
  classes: Object,
  style: Object,
}

const styles = {
  container: {
    marginBottom: '20px',
  },
};

const PageHeader = ({ headerText, classes, style = {} }: Props): ReactComponent => (
  <div className={classes.container}>
    <Typography variant="h4" style={style}>
      {headerText}
    </Typography>
  </div>
);

export default withStyles(styles)(PageHeader);
