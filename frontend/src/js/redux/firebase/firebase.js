import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import config from '../../config';

const firebaseApp = firebase.initializeApp(config.firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
  firebaseApp,
  firebaseAuth,
  provider,
};
