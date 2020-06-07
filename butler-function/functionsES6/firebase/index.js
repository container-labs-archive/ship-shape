// @flow

import admin from 'firebase-admin';
import FireClass from '@containerlabs/react-apollo-shared';
import Firestore from '@google-cloud/firestore';

import Config from '../config';

const functions = require('firebase-functions');

const env = process.env.NODE_BUILD_ENV || process.env.NODE_ENV;
const firestore = new Firestore({
  projectId: Config.projectId,
});

if (env === 'staging' || env === 'alpha' || env === 'production') {
  admin.initializeApp(functions.config().firebase);
} else {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: Config.firebaseDatabaseURL,
    storageBucket: Config.firebaseStorageBucket,
    projectId: Config.projectId,
  });
}

FireClass.instance(admin);

const settings = {/* your settings... */ };
firestore.settings(settings);

const {
  ref,
  bucket,
  getValue,
  getEntity,
  getEntities,
  mapSnapshotToEntities,
} = FireClass.instance();

export {
  admin,
  ref,
  bucket,
  getValue,
  getEntity,
  getEntities,
  mapSnapshotToEntities,
  firestore,
};
