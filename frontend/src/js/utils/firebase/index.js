// @flow

import { firebaseApp } from '../../redux/firebase/firebase';

const getFileInfo = async (file: Object) => {
  const fileRef = firebaseApp.storage().ref().child(file.storageRefPath);

  const { name, size, contentType: type } = await fileRef.getMetadata();
  return {
    ...file, name, size, type,
  };
};

export {
  getFileInfo,
};
