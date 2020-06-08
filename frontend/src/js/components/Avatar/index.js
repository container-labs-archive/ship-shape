// @flow

import * as React from 'react';
import {
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';
import {
  Avatar,
  Chip,
  withStyles,
} from '@material-ui/core';

type Props = {
  photoURL: string,
  email: string,
}

const styles = theme => ({
  chip: {
    display: 'inline',
    marginRight: theme.spacing(2),
  },
  noPhotoIcon: {
    width: 40,
    height: 40,
  },
});

@withStyles(styles)
class SelenityAvatar extends React.Component<Props> {
  render() {
    const {
      photoURL,
      email,
      classes,
      asChip,
    } = this.props;

    let avatar = (<AccountCircleIcon className={classes.noPhotoIcon} />);
    if (photoURL) {
      avatar = (<Avatar alt={email} src={photoURL} />);
    }

    return (
      <React.Fragment>
        {!asChip && avatar}
        {asChip && (
          <div className={classes.chip}>
            <Chip
              avatar={avatar}
              label={email}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SelenityAvatar;
