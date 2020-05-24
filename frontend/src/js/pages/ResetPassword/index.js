// @flow

import * as React from 'react';
import { withHeader } from 'HOCS';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'Utils/queryString';
import styles from './styles';
import EmailComponent from './EmailComponent';
import ResetComponent from './ResetComponent';
import type { Props, State } from './types';

@withHeader('Password Reset', 'center')
@withStyles(styles)
class ResetPassword extends React.PureComponent<Props, State> {
  render() {
    const {
      classes,
      location: {
        search,
      },
    } = this.props;
    const queryValues = queryString(search);
    let mode;
    let oobCode;
    let apiKey;
    if (queryValues) {
      mode  = queryValues.mode;
      oobCode = queryValues.oobCode;
      apiKey = queryValues.apiKey;
    }

    return (
      <div>
        {mode === undefined && <EmailComponent
          classes={classes}
        />}
        {mode && mode === 'resetPassword' &&
          <ResetComponent
            classes={classes}
            oobCode={oobCode}
            apiKey={apiKey}
          />
        }
      </div>
    );
  }
}

export default ResetPassword;

