// @flow

import * as React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import styles from '../../styles';

type Props = {
  classes: Object,
  name: string,
  disabled: boolean,
  factorDescription: string,
}
@withStyles(styles)
class FactorDescription extends React.PureComponent<Props> {
  render() {
    const {
      classes,
      name,
      disabled,
      factorDescription,
    } = this.props;

    return (
      <ExpansionPanel
        className={classNames(classes.expansionPanel, disabled && classes.expansionPanelDisabled)}
        disabled={disabled}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.expansionPanelSummaryRoot,
          }}
        >
          <Typography variant="body2" className={classNames(disabled && classes.disabledType)}>
            {name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          classes={{
            root: classes.expansionPanelDetailsRoot,
          }}
        >
          <Typography>
            {factorDescription || 'Please select a profile'}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default FactorDescription;
