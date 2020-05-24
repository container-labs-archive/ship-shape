// @flow

import React from 'react';
import { TextField } from 'Components/redux-form-material-ui';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import type { Props } from './types';

const CommentTextField = ({ classes, ...props }: Props): ReactComponent => (
  <TextField
    {...props}
    multiline
    InputProps={{
      disableUnderline: true,
      classes: {
        root: classes.textFieldRoot,
        input: classes.textFieldInput,
      },
    }}
  />
);

export default withStyles(styles)(CommentTextField);
