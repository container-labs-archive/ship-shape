// @flow

import React, { Component } from 'react';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Delete';
import grey from '@material-ui/core/colors/grey';
import {
  ListItem,
  ListItemText,
  IconButton,
  withStyles,
} from '@material-ui/core';
import Avatar from 'Components/Avatar';
import EditForm from '../EditForm';
import styles from './styles';
import type { Props, State } from './types';

@withStyles(styles)
class Item extends Component<Props, State> {
  state = {
    isHovering: false,
    isEditing: false,
    content: '',
  }

  static getDerivedStateFromProps(props, state) {
    return {
      content: props.content,
    };
  }

  onClickEdit = () => {
    this.setState({ isEditing: true });
  }

  onClickRemove = () => {
    const { commentId, onRemove } = this.props;
    onRemove(commentId);
  }

  handleSubmitUpdate = ({ content }) => {
    const { onUpdate, commentId } = this.props;

    this.setState({
      isEditing: false,
      content,
    });
    onUpdate({
      content,
      commentId,
    });
  }

  handleCloseUpdate = () => {
    this.setState({ isEditing: false });
  }

  activeHover = () => {
    this.setState({
      isHovering: true,
    });
  }

  inactiveHover = () => {
    this.setState({
      isHovering: false,
    });
  }

  render() {
    const {
      commentId,
      classes,
      createdAt,
      displayName,
      haveActions,

      email,
      photoURL,
    } = this.props;

    const { isHovering, isEditing, content } = this.state;
    const itemStyle = {
      background: isHovering ? grey[200] : 'none',
    };

    const editForInitialValues = {
      content,
    };

    if (isEditing) {
      return (
        <EditForm
          initialValues={editForInitialValues}
          onSubmit={this.handleSubmitUpdate}
          onClose={this.handleCloseUpdate}
        />
      );
    }

    return (
      <ListItem
        key={commentId}
        style={itemStyle}
        onMouseEnter={this.activeHover}
        onMouseLeave={this.inactiveHover}
      >
        <Avatar
          name={displayName}
          email={email}
          photoURL={photoURL}
        />
        <ListItemText
          primary={(
            <div className={classes.itemPrimary}>
              <span className={classes.owner}>
                {displayName}
              </span>
              <span>
                {content}
              </span>
              {
                haveActions && isHovering && (
                <span className={classes.actions}>
                  <IconButton onClick={this.onClickEdit}>
                    <EditIcon className={classes.icon} />
                  </IconButton>
                  <IconButton onClick={this.onClickRemove}>
                    <RemoveIcon className={classes.icon} />
                  </IconButton>
                </span>
                )}
            </div>
          )}
          secondary={moment(Number(createdAt)).fromNow()}
        />
      </ListItem>
    );
  }
}

export default Item;
