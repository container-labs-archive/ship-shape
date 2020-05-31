// @flow

import * as packageResolvers from './packages';
import * as userResolvers from './user';

const resolvers = {
  Query: {
    user: userResolvers.getUser,
  },

  Mutation: {
    createUser: userResolvers.createUser,
    updateUser: userResolvers.updateUser,
    deleteUser: userResolvers.deleteUser,
    sendWelcome: userResolvers.sendWelcome,
    confirmAccount: userResolvers.confirmAccount,


    trackPackage: packageResolvers.trackPackage,
  },

  User: {
  },

};

export default resolvers;
