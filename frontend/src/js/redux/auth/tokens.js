// @flow

import { firebaseAuth } from '../firebase/firebase';

const TOKEN = `ship_it_token_${process.env.NODE_BUILD_ENV}`;

/**
 * grab the token
 * try to parse it
 * see how old it is
 * if it's old, refresh
 */
const getTokenObject = (user: Object) =>
  user.getIdToken(true).then(token =>
    JSON.stringify({
      uid: user.uid,
      email: user.email,
      timestamp: new Date().getTime(),
      token,
    }));

const tokenFromAuth = (user: Object) => {
  return user.getIdToken(true).then(token => {
    return {
      uid: user.uid,
      email: user.email,
      timestamp: new Date().getTime(),
      token,
    };
  });
};

const refreshToken = () => {
  const user = firebaseAuth.currentUser;
  if (user != null) {
    getTokenObject(user).then((tokenObj) => {
      localStorage.setItem(TOKEN, tokenObj);
    });
  }
};

const storageToken = () => {
  const tokenObject = localStorage.getItem(TOKEN);
  if (tokenObject === null || tokenObject === 'null') {
    return null;
  }

  let token = null;
  try {
    token = JSON.parse(tokenObject);
    refreshToken();
  } catch (e) {
    const tokenObject = localStorage.getItem(TOKEN);
  }
  return token;
};

const isAuthenticated = () => {
  const token = storageToken();
  if (token === null) {
    return false;
  }

  const tokenTimestamp = token.timestamp;
  const nowTimestamp = new Date().getTime();
  const diffStampInSeconds = (nowTimestamp - tokenTimestamp) / 1000;

  if (diffStampInSeconds >= 36000) { // 10 hours
    return false;
  }

  return true;
};


const idFromStorage = () => {
  const token = storageToken();
  if (token === null) {
    return null;
  }
  return token.uid;
};

const authTokenFromStorage = () => {
  const token = storageToken();

  if (token === null) {
    return null;
  }

  const tokenTimestamp = token.timestamp;
  const nowTimestamp = new Date().getTime();
  const diffStampInSeconds = (nowTimestamp - tokenTimestamp) / 1000;

  if (diffStampInSeconds >= 1800) { // every half hour
    // this might not be needed
    refreshToken();
  }

  return token.token;
};

const removeTokenFromStorage = () => {
  localStorage.setItem(TOKEN, null);
}

const emailFromStorage = () => {
  const token = storageToken();
  if (token === null) {
    return null;
  }

  return token.email;
};

export {
  isAuthenticated,
  idFromStorage,
  emailFromStorage,
  authTokenFromStorage,
  TOKEN,
  removeTokenFromStorage,
  getTokenObject,
  tokenFromAuth,
};
