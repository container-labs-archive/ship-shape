// @flow

import React, { Component } from 'react';
import filesize from 'filesize';
import uuid from 'uuid/v1';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import doneImage from 'Assets/done.png';
import errorImage from 'Assets/error.png';
import blue from '@material-ui/core/colors/blue';
import {
  Delete as DeleteIcon,
  CloudDownload as DownloadIcon,
  FileCopy as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from '@material-ui/icons';
import './styles.css';
import { notify } from '../../../redux/notifications/actions';
import type { Props, State } from './types';

import { firebaseAuth, firebaseApp } from 'Redux/firebase/firebase';
import { withStyles } from '@material-ui/core';

const generateUniqFileName = (file) => {
  const extension = file.type ? file.name.split('.').pop() : null;
  const uniqueName = uuid();
  return extension ? `${uniqueName}.${extension}` : uniqueName;
};

const styles = {
  fileImage: {
    color: blue[600],
    width: 'inherit',
    height: 'inherit',
  },
};

@withStyles(styles)
class MultipleFileUpload extends Component<Props, State> {
  static defaultProps = {
    initialFiles: [],
  }

  state = {
    files: {},
    disableClick: false,
  }

  onDrop = async (acceptedFiles) => {
    const {
      storageChildRefName,
      onStartRequest,
      onCompleteRequest,
      onFileUpdate,
    } = this.props;
    const addedFileRefPaths = acceptedFiles.map(file => `${storageChildRefName}/${file.name}`);
    const nextFiles = acceptedFiles.reduce((res, file, index) => ({
      ...res,
      [addedFileRefPaths[index]]: {
        key: addedFileRefPaths[index],
        completed: false,
        originalFile: file,
        solfDelete: false,
        errorMessage: '',
        success: false,
        progress: 0,
      },
    }), this.state.files);

    // start uploading files
    this.setState({ files: nextFiles, disableClick: true });
    onStartRequest();

    // wait to complete uploading files
    const uploadedFiles = await Promise.all(addedFileRefPaths.map(refPath =>
      this.uploadToFirebase(nextFiles[refPath].originalFile, refPath)));

    // complete uploading files
    this.setState({ disableClick: false });

    const merged = uploadedFiles.filter(file => file !== null).concat(this.props.files);

    onFileUpdate(merged)
    onCompleteRequest();
  }

  // remove file from files list and call mutation
  removeFile = (key) => {
    const { files, onFileUpdate } = this.props;

    const remainingFiles = files.filter((singleFile) => singleFile.key != key);

    onFileUpdate(remainingFiles);
  }

  uploadToFirebase = (file, refPath) => new Promise((resolve) => {
    const auth = firebaseAuth;
    const fileStorageRef = this.props.storageRootRef.child(refPath);
    const uploadTask = fileStorageRef.put(file);


    return uploadTask.on('state_changed', (snapshot) => {
      const { files } = this.state;
      files[refPath].progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ files });
    }, (error) => {
      const { files } = this.state;
      files[refPath] = {
        ...files[refPath],
        errorMessage: `Fail to upload to server (Code: ${error.code})`,
        completed: true,
        success: false,
      };
      this.setState({ files });
      resolve(null);
    }, () => {
      const { files } = this.state;
      files[refPath] = {
        ...files[refPath],
        completed: true,
        success: true,
      };
      this.setState({ files });

      resolve({
        storageRefPath: fileStorageRef.fullPath,
      });

      // we don't want to store the download url in the database anymore
      // fileStorageRef.getDownloadURL().then((url) => {
      //   resolve({
      //     url,
      //     storageRefPath: fileStorageRef.fullPath,
      //   });
      // });
    });
  })

  previewableFileTypes = () => ['image/gif', 'image/png', 'image/jpeg']

  renderMessage = () => {
    // const { initialFilesLoading } = this.state;
    const { files } = this.props;

    if (!files || files && Object.keys(files).length == 0) {
      return (
        <div className="dz-message">
          Drop files here or click to upload
        </div>
      );
    }

    return null;
  }

  downloadFile = (file) => {
    const path = file.storageRefPath;
    const fileStorageRef = firebaseApp.storage().ref().child(path);

    // Get the download URL
    fileStorageRef.getDownloadURL().then((url) => {
      window.open(url);
    }).catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  }

  fileIcon = (contentType) => {
    const { classes } = this.props;

    if (contentType === 'image/png') {
      return (
        <ImageIcon className={classes.fileImage} />
      );
    }
    if (contentType === 'file/pdf') {
      return (
        <ImageIcon className={classes.fileImage} />
      );
    }

    return (
      <FileIcon className={classes.fileImage} />
    );
  }

  renderPreviewItem = (file) => {
    const { disableClick } = this.state;
    const {
      errorMessage,
      success,
      progress,
      key,

      // new values
      url,
    } = file;

    let contentType = '';
    let name = '';
    let size = '';
    if (file.metadata) {
      contentType = file.metadata.contentType;
      name = file.metadata.name.split('\/')[2];
      size = file.metadata.size;
    }

    let completed = progress == undefined;

    const processStyleClass = completed ? 'dz-complete' : '';
    // const statusStyleClass = completed ? `dz-${success ? 'success' : 'error'}` : '';
    const statusStyleClass = '';

    return (
      <div
        key={key}
        onClick={e => e.stopPropagation()}
        className={`dz-preview ${statusStyleClass} ${processStyleClass}`}
      >
        <div className="dz-image">
          {this.fileIcon(contentType)}
        </div>
        <div className="dz-details">
          <div className="dz-size">
            <span>{filesize(size)}</span>
          </div>
          <div className="dz-filename">
            <span>{name}</span>
          </div>
        </div>
        <div className="dz-progress">
          <span className="dz-upload" style={{ width: `${progress}%` }} />
        </div>
        <div className="dz-error-message">
          <span>{errorMessage}</span>
        </div>
        <div className="dz-success-mark">
          <img src={doneImage} alt="done" />
        </div>
        <div className="dz-error-mark">
          <img src={errorImage} alt="error" />
        </div>
        <div className="dz-action">
          <Button
            disabled={disableClick}
            onClick={() => this.removeFile(key)}
            color="primary"
            variant="fab"
            className="dz-action-icon"
            id="deleteFile"
          >
            <DeleteIcon />
          </Button>

          <Button
            onClick={() => this.downloadFile(file)}
            disabled={disableClick}
            color="primary"
            variant="fab"
            className="dz-action-icon"
            id="downloadFile"
          >
            <DownloadIcon />
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { disableClick } = this.state
    const {
      files,
    } = this.props;

    return (
      <Dropzone
        className="dropzone"
        onDrop={this.onDrop}
        disableClick={disableClick}
      >
        {this.renderMessage()}
        <div className="dz-preview-wrapper">
          { files && Object.values(files).map(file => this.renderPreviewItem(file)) }
        </div>
      </Dropzone>
    );
  }
}

export default MultipleFileUpload;
