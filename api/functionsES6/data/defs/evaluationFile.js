const evaluationFileDefs = `
type EvaluataionFile {
  key: String!
  url: String
  evaluataionId: String
  storageRefPath: String
}

input EvaluataionFileCreateInput {
  url: String
  evaluataionId: String
  storageRefPath: String
}

input EvaluataionFileUpdateInput {
  key: String!
  url: String
  evaluataionId: String
  storageRefPath: String
}`;

export default evaluationFileDefs;
