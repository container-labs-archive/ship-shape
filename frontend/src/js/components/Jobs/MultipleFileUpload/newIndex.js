import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import doneImage from 'Assets/done.png';
import errorImage from 'Assets/error.png';
import uuid from 'uuid/v1';

const generateUniqFileName = (file) => {
  const extension = file.type ? file.name.split('.').pop() : null;
  const uniqueName = uuid();
  return extension ? `${uniqueName}.${extension}` : uniqueName;
};

// async function onDrop(acceptedFiles) {
//   debugger;

//   const {
//     storageChildRefName,
//     onStartRequest,
//     onCompleteRequest,
//     onCompleteUploading,
//   } = this.props;

//   const addedFileRefPaths = acceptedFiles.map(file => `${storageChildRefName}/${file.name.split('.')[0]}-${generateUniqFileName(file)}`);

//   const nextFiles = acceptedFiles.reduce((res, file, index) => ({
//     ...res,
//     [addedFileRefPaths[index]]: {
//       key: addedFileRefPaths[index],
//       completed: false,
//       originalFile: file,
//       solfDelete: false,
//       errorMessage: '',
//       success: false,
//       progress: 0,
//     },
//   }), this.state.files);

//   // start uploading files
//   this.setState({ files: nextFiles, disableClick: true });
//   onStartRequest();

//   // wait to complete uploading files
//   const uploadedFiles = await Promise.all(addedFileRefPaths.map(refPath =>
//     this.uploadToFirebase(nextFiles[refPath].originalFile, refPath)));

//   // complete uploading files
//   this.setState({ disableClick: false });
//   onCompleteUploading(uploadedFiles.filter(file => file !== null));
//   onCompleteRequest();
// }

function renderMessage(files) {
  // const { files, initialFilesLoading } = this.state;

  if (files.length > 0) {
    return null;
  }

  const initialFilesLoading = false;

  return (
    <div className="dz-message">
      { initialFilesLoading
          ? <CircularProgress />
          : 'Drop files here or click to upload' }
    </div>
  );
}

function renderPreview(files) {
  // const { files } = this.state;

  return (
    <div>
      { renderMessage(files) }
      { files.map(file => renderPreviewItem(file)) }
    </div>
  );
}

function renderPreviewItem(file) {
  // const { disableClick } = this.state;

  const previewableFileTypes = ['image/gif', 'image/png', 'image/jpeg'];

  const {
    originalFile,
    completed,
    errorMessage,
    success,
    progress,
    key,
  } = file;

  const previewable = previewableFileTypes().indexOf(originalFile.type) !== -1;
  const processStyleClass = completed ? 'dz-complete' : '';
  const previewStyleClass = previewable ? 'dz-image-preview' : 'dz-file-preview';
  const statusStyleClass = completed ? `dz-${success ? 'success' : 'error'}` : '';

  return (
    <div
      key={key}
      onClick={e => e.stopPropagation()}
      className={`dz-preview ${previewStyleClass} ${statusStyleClass} ${processStyleClass}`}
    >
      <div className="dz-image">
        { previewableFileTypes().indexOf(originalFile.type) !== -1 &&
          <img src={originalFile.preview} alt={originalFile.name} /> }
      </div>
      <div className="dz-details">
        <div className="dz-size">
          <span>{filesize(originalFile.size)}</span>
        </div>
        <div className="dz-filename">
          <span>{originalFile.name}</span>
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
          onClick={e => this.deleteFile(e, key)}
          color="primary"
          variant="fab"
          className="dz-action-icon"
          id="deleteFile"
        >
          <DeleteIcon />
        </Button>

        <Button
          href={originalFile.preview}
          disabled={disableClick}
          color="primary"
          variant="fab"
          className="dz-action-icon"
          download
          id="downloadFile"
        >
          <DownloadIcon />
        </Button>
      </div>
    </div>
  );
}

function uploadToFirebase(file, refPath, storageRootRef) {
  return new Promise((resolve) => {
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
      // this.setState({ files });
      resolve(null);
    }, () => {
      const { files } = this.state;
      files[refPath] = {
        ...files[refPath],
        completed: true,
        success: true,
      };
      // this.setState({ files });

      fileStorageRef.getDownloadURL().then((url) => {
        resolve({
          url,
          storageRefPath: fileStorageRef.fullPath,
        });
      });
    });
})


function FileUpload({
  onStartRequest,
  onCompleteRequest,
  onCompleteDeleting,
  storageChildRefName,
  storageRootRef,
}) {
  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   debugger;
  // }, [])

  const [files, setFiles] = useState([]);


  const onDrop = useCallback((acceptedFiles) => {


      const addedFileRefPaths = acceptedFiles.map(file => `${storageChildRefName}/${file.name.split('.')[0]}-${generateUniqFileName(file)}`);

      // const nextFiles = acceptedFiles.reduce((res, file, index) => ({
      //   ...res,
      //   [addedFileRefPaths[index]]: {
      //     key: addedFileRefPaths[index],
      //     completed: false,
      //     originalFile: file,
      //     solfDelete: false,
      //     errorMessage: '',
      //     success: false,
      //     progress: 0,
      //   },
      // }), this.state.files);

      // // start uploading files
      // this.setState({ files: nextFiles, disableClick: true });
      onStartRequest();

      // // wait to complete uploading files
      const uploadedFiles = await Promise.all(addedFileRefPaths.map(refPath =>
        uploadToFirebase(nextFiles[refPath].originalFile, refPath)));

      // // complete uploading files
      // this.setState({ disableClick: false });
      // onCompleteUploading(uploadedFiles.filter(file => file !== null));
      // onCompleteRequest();

  }, [])




  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          renderPreview(files)

      }
    </div>
  );
}

export default FileUpload;
