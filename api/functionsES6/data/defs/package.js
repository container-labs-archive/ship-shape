const packageDefs = `
type Package {
  # auto-gen keys
  # key: String!


  # firebase user uuid
  # probably don't need this in query, just grab it in the middleware
  userId: String!
  carrier: String
  trackingCode: String

  status: String
  # make a query for all "active" packages
  # not updated in the last ~1-2 hours
  # lastUpdated: Timestamp
}

input PackageCreateInput {
  carrier: String!
  trackingCode: String!
}

input PackageUpdateInput {
  carrier: String!
  trackingCode: String!
}`;

export default packageDefs;
