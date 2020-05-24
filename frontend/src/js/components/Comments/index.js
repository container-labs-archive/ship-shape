// @flow

import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  withStyles,
} from '@material-ui/core';
import Form from './Form';
import Item from './Item';
import styles from './styles';
import type { Props } from './types';

@withStyles(styles)
class Comments extends Component<Props> {
  render() {
    const {
      comments,
      canAdd,
      canEdit,
      onAdd,
      onUpdate,
      onRemove,
      classes,
    } = this.props;

    return (
      <Paper className={classes.container}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <List dense>
          {comments && comments.length > 0 && comments.map(comment => (
            <Item
              key={comment.key}
              canEdit={canEdit}
              commentId={comment.key}
              content={comment.content}
              createdAt={comment.createdAt}
              displayName={comment.displayName}
              haveActions={canEdit}
              onUpdate={onUpdate}
              onRemove={onRemove}
              photoURL={comment.photoURL}
            />
          ))}
          {(!canAdd && (!comments || comments.length === 0)) && (
            <ListItem>
              <ListItemText
                primary={(
                  <Typography variant="body1">
                    There are no comments for this job.
                  </Typography>
                )}
              />
            </ListItem>
          )}
        </List>
        {canAdd && <Form onSubmit={onAdd} />}
      </Paper>
    );
  }
}

export default Comments;
