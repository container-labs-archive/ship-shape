// @flow

import * as React from 'react';
import {
  CircularProgress,
  withStyles,
} from '@material-ui/core';

const styles = {
  wrapper: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

type Props = {
  classes: Object,
}

type PrevProps = {
  error: ?Object,
}

@withStyles(styles)
class Loader extends React.PureComponent<Props> {
  getSnapshotBeforeUpdate(prevProps: PrevProps) {
    const { error } = prevProps;

    if (error) {
      // reload the page w/o cache
      location.reload(true);
    }

    return null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    );
  }
}

export default Loader;
