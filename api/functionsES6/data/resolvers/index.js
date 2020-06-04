// @flow

import * as packageResolvers from './packages';

const resolvers = {
  Query: {
    packages: packageResolvers.getPackages,
  },

  Mutation: {
    trackPackage: packageResolvers.trackPackage,
    updatePackage: packageResolvers.updatePackage,
  },
};

export default resolvers;
