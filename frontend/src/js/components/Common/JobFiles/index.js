// @flow

import * as React from 'react';
import _includes from 'lodash/includes';
import filesize from 'filesize';
import {
  Avatar,
  IconButton,
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  Image as ImageIcon,
  Folder as FileIcon,
  Visibility as VisibilityIcon,
  CloudDownload as DownloadIcon,
} from '@material-ui/icons';

const styles = (theme: Object) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
});

type Props = {
  jobFiles: Object,
  classes: Object,
}

@withStyles(styles)
class JobFiles extends React.Component<Props> {
  render() {
    const {
      jobFiles,
      classes,
    } = this.props;

    return (
      <Paper className={classes.container}>
        <Typography variant="h6" gutterBottom>
            Job Files
        </Typography>
        <List>
          {
            jobFiles && jobFiles.length > 0 && jobFiles.map(({
              key,
              metadata: {
                name,
                size,
                contentType: type,
              },
              url,
            }) => (
              <ListItem key={key}>
                <ListItemAvatar>
                  <Avatar>
                    {_includes(type, 'image') ? <ImageIcon /> : <FileIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name.replace('job-files/', '')}
                  secondary={filesize(size)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    href={url}
                    target="_blank"
                    aria-label="Preview"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {/* TODO: wire up download behavior */}
                  {/* <IconButton
                    href={url}
                    aria-label="Download"
                  >
                    <DownloadIcon />
                  </IconButton> */}
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
          {(!jobFiles || jobFiles.length === 0) && (
            <ListItem>
              <ListItemText
                primary={(
                  <Typography variant="body1">
                    There are no files for this job.
                  </Typography>
                )}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    );
  }
}

export default JobFiles;
