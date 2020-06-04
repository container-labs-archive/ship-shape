// @flow

import packageDefs from './defs/package';

const typeDefs = `

${packageDefs}

# responses
type Response {
  status: Int
  message: String
  key: ID
  error: String
}

input FilterBy {
  filterKey: String
  value: String
}

# the schema allows the following query:
type Query {
  packages: [Package]
}

# this schema allows the following mutation:
type Mutation {
  trackPackage (
    input: PackageCreateInput
  ): Response
  updatePackage (
    input: PackageUpdateInput
  ): Response
}`;

export default typeDefs;
