// @flow

import React from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';

import styles from './styles';

type Props = {
  classes: Object,
  isMatch: boolean,
  isHybridMatch: boolean,
  isEvaluation: boolean,
  onTypeChange: Function,
  disabled: Boolean,
}

type State = {
  disabled: boolean,
}
@withStyles(styles)
class EvalTypeButton extends React.PureComponent<Props, State> {
  onClick = (type) => {
    const { onTypeChange } = this.props;
    const newState = {
      isMatch: false,
      isHybridMatch: false,
      isEvaluation: false,
    };
    newState[type] = true;

    onTypeChange(newState);
  }

  render() {
    const {
      classes,
      isMatch,
      isHybridMatch,
      isEvaluation,
      disabled,
    } = this.props;

    return (
      <div classesName={classes.container}>
        <Button
          variant={isMatch ? 'contained' : 'outlined'}
          onClick={() => this.onClick('isMatch')}
          className={classes.typeButton}
          disabled={disabled}
          id="match"
        >
          Match
        </Button>
        <Button
          variant={isHybridMatch ? 'contained' : 'outlined'}
          onClick={() => this.onClick('isHybridMatch')}
          className={classes.typeButton}
          disabled={disabled}
          id="hybridMatch"
        >
            Hybrid Match
        </Button>
        <Button
          variant={isEvaluation ? 'contained' : 'outlined'}
          onClick={() => this.onClick('isEvaluation')}
          className={classes.typeButton}
          disabled={disabled}
          id="evaluation"
        >
          Evaluation
        </Button>
      </div>
    );
  }
}

export default EvalTypeButton;
