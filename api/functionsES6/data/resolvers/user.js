// @flow

import {
  singleWrapper,
  listWrapper,
  createWrapper,
  updateWrapper,
  indexQuery,
} from '../firestore';
import {
  admin,
} from '../../firebase/index';
import { sendWelcomeEmail } from '../../mailers/welcomeEmail';
import { guid } from '../../utils/index';
import { USER_SETTINGS_COLLECTION } from './collections';

// for migration
// we need to get a list of all users

export const getAllUsers = (parent, args, currentUser) => {
  console.log('QUERY: getAllUsers');

  // https://firebase.google.com/docs/reference/js/firebase.User
  // TODO: currently this is the MAX allowed users
  // should just get users with the current account id then get those from firebase??
  return admin.auth().listUsers(1000)
    .then((listUsersResult) => {
      const users = {};

      listUsersResult.users.forEach((userRecord) => {
        const userId = userRecord.uid;
        users[userId] = userRecord;
      });

      const { accountId } = currentUser;
      const accountUsersRef = listWrapper({ collection: USER_SETTINGS_COLLECTION });

      console.debug('accountId', accountId);
      console.debug('users', users);

      const mergedUsers = [];
      return accountUsersRef.then((models) => {
        const userClaimsPromises = [];

        models.forEach((userSettingsModel) => {
          const firebaseUser = users[userSettingsModel.key];
          if (firebaseUser === undefined) {
            console.error('userSettings', userSettingsModel);
            return;
          }

          const mergedUser = {
            ...userSettingsModel,
            disabled: firebaseUser.disabled,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
            creationTime: firebaseUser.metadata.creationTime,
            lastSignInTime: firebaseUser.metadata.lastSignInTime,
            // picture: firebaseUser.photoURL,
          };

          mergedUsers.push(mergedUser);

          userClaimsPromises.push(
            admin.auth().setCustomUserClaims(userSettingsModel.key, { accountId: userSettingsModel.accountId })
          );
        });

        return Promise.all(userClaimsPromises);
      }).then(() => {
        return mergedUsers;
      });
    });
};

/**
 * Queries
 */
const getUsers = (parent, args, currentUser) => {
  console.log('QUERY: getUsers');

  // https://firebase.google.com/docs/reference/js/firebase.User
  // TODO: currently this is the MAX allowed users
  // should just get users with the current account id then get those from firebase??
  return admin.auth().listUsers(1000)
    .then((listUsersResult) => {
      const users = {};

      listUsersResult.users.forEach((userRecord) => {
        const userId = userRecord.uid;
        users[userId] = userRecord;
      });

      const { accountId } = currentUser;
      const accountUsers = indexQuery({
        collection: USER_SETTINGS_COLLECTION,
        index: 'accountId',
      }, accountId);

      console.log('accountId', accountId);
      const mergedUsers = [];
      return accountUsers.then((models) => {
        const userClaimsPromises = [];

        models.forEach((userSettingsModel) => {
          const firebaseUser = users[userSettingsModel.key];
          // skip archieved accounts
          if (userSettingsModel.isArchieved) {
            return;
          }
          // skip deleted accounts
          if (firebaseUser === undefined) {
            console.error('userSettings', userSettingsModel);
            return;
          }
          // console.log('firebaseUser', firebaseUser);

          const mergedUser = {
            ...userSettingsModel,
            disabled: firebaseUser.disabled,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
            creationTime: firebaseUser.metadata.creationTime,
            lastSignInTime: firebaseUser.metadata.lastSignInTime,
            // picture: firebaseUser.photoURL,
          };
          console.log(mergedUser);

          mergedUsers.push(mergedUser);

          userClaimsPromises.push(
            admin.auth().setCustomUserClaims(userSettingsModel.key, { accountId: userSettingsModel.accountId })
          );
        });

        return Promise.all(userClaimsPromises);
      }).then(() => {
        return mergedUsers;
      });
    });
};

const getUser = (parent, { key }, currentUser) => {
  // TODO: multiIndexQuery, isArchieved: false, or a filter?

  return singleWrapper({
    collection: USER_SETTINGS_COLLECTION,
    id: key,
  }).then(model => ({
    ...model,
    ...currentUser,
  }));
};

const getPanelMembers = (parent, args, currentUser) => {
  console.log('QUERY: getPanelMembers');
  const { accountId } = currentUser;

  const query = indexQuery({
    collection: USER_SETTINGS_COLLECTION,
    index: 'accountId',
  }, accountId);

  return query.then((models) => {
    const actives = [];

    models.forEach((model) => {
      if (model.isArchieved) {
        return;
      }

      if (model.activePanelMember) {
        actives.push(model);
      }
    });

    return actives.map(({
      key,
      email,
      displayName,
    }) => ({
      key,
      email,
      displayName,
    }));
  });
};

/**
 * Mutations
 */

const createUser = (parent, { input: { email, displayName } }, { accountId }) => {
  console.log('MUTATION: createUser');
  const password = 'autogen';
  const newUser = {
    email,
    password,
    displayName,
    emailVerified: false,
    disabled: false,
  };
  let createdUser = null;
  const inviteCode = guid();

  return admin.auth().createUser(newUser)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      newUser.key = userRecord.uid;

      /**
       * This is how we make sure current users
       * only create users for the same account
       */
      createdUser = {
        email,
        accountId,
        displayName,
        key: userRecord.uid,
        activePanelMember: true,
        isReviewer: true,
        isAdmin: false,
        isDemo: false,
        inviteCode,
      };
      console.log('created', createdUser);

      return createWrapper({
        collection: USER_SETTINGS_COLLECTION,
        id: userRecord.uid,
      }, createdUser);
    })
    .then(() => {
      // send the welcome email
      const user = {
        email,
        displayName,
        inviteCode,
      };
      return sendWelcomeEmail(user);
    })
    .then(() => {
      return {
        key: createdUser.key,
      };
    });
};

const sendWelcome = (parent, { input: { email, displayName } }) => {
  const inviteCode = guid();
  const user = {
    email,
    displayName,
    inviteCode,
  };
  return sendWelcomeEmail(user);
};

const deleteUser = async (parent, { key }) => {
  await updateWrapper({
    collection: USER_SETTINGS_COLLECTION,
    id: key,
  }, {
    isArchieved: true,
  });

  return {
    key,
    status: 200,
    message: 'successfully deleted',
  };
};

// ignoring "key" passed in, used to avoid a frontend error w/ the mutation
const confirmAccount = async (parent, { email, inviteCode, password }) => {
  console.log('confirming account');
  // grab the user, check the inviteCode

  let userSettings = await indexQuery({
    collection: USER_SETTINGS_COLLECTION,
    index: 'email',
  }, email);

  if (userSettings.length === 0) {
    return {
      statues: 500,
      message: 'Could not find a user with that account',
    };
  }
  userSettings = userSettings[0];
  console.log('userSettings', userSettings);
  console.log('inviteCode', inviteCode);

  if (userSettings.inviteCode !== inviteCode) {
    console.error('invite code does not match');
    return {
      status: 500,
      message: `Failed to confirm account ${email}, wrong invite code`,
    };
  }

  if (userSettings.emailVerified) {
    console.error('email already verified');
    return {
      status: 500,
      message: `${email} already verified`,
    };
  }

  const { key } = userSettings;

  // mark that it's verified
  await updateWrapper({
    collection: USER_SETTINGS_COLLECTION,
    id: key,
  }, {
    emailVerified: true,
  });

  await admin.auth().updateUser(key, {
    emailVerified: true,
    password,
  });
  return {
    key,
    status: 200,
    message: `confirmed account ${key}`,
  };
};

const updateUserSetting = (parent, { input }) => {
  return updateWrapper({
    collection: USER_SETTINGS_COLLECTION,
    id: input.key,
  }, input);
};

const updateUser = (parent, { input: { uid, ...properties } }) => admin.auth().updateUser(uid, properties)
  .then(() => ({
    key: uid,
    status: 200,
    message: `updated user ${uid}`,
  }))
  .catch(error => ({
    status: 500,
    message: `fail to update user ${uid}`,
    error,
  }));

/**
 * Nested Object
 */

// need to deprecate reviewMember, they are just panelMembers
const userIsReviewer = user => user.activePanelMember;

const userNestedObject = {
  isReviewer: userIsReviewer,
};

export {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  confirmAccount,
  updateUserSetting,
  getPanelMembers,

  //  misc
  sendWelcome,
  // nested
  userNestedObject,
};
