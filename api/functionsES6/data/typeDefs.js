// @flow

import packageDefs from './defs/package';
import userDefs from './defs/user';

const typeDefs = `

${packageDefs}

${userDefs}

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
  # users: [User]
  user(key: String!): User
}

# this schema allows the following mutation:
type Mutation {
  # users
  createUser (
    input: UserCreateInput
  ): User
  updateUser (
    input: UserUpdateInput
  ): Response
  deleteUser (
    key: String!
  ): Response
  confirmAccount (
    email: String!
    inviteCode: String!
    password: String!
    key: String!
  ): Response
  sendWelcome (
    input: UserCreateInput
  ): User

  trackPackage (
    input: PackageCreateInput
  ): Response
}`;

export default typeDefs;
