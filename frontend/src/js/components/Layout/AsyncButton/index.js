import React from 'react';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

@withStyles(styles)
class AsyncButton extends React.Component {
  render() {
    const {
      label,
      waiting,
      classes,
      onClick,
      type,
    } = this.props;

    return (
      <React.Fragment>
        {waiting &&
          <Button variant="contained" color="secondary" className={classes.button} type={type} >
            <CircularProgress size={20} />
          </Button>
        }
        {!waiting &&
          <Button variant="contained" color="secondary" className={classes.button} onClick={onClick} type={type} >
            {label}
          </Button>
        }
      </React.Fragment>
    );
  }
}

export default AsyncButton;
