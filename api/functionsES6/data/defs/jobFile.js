const jobFilesDefs = `
type FirebaseFileMetaData {
  kind: String
  id: String
  selfLink: String
  name: String,
  bucket: String
  generation: String
  metageneration: String
  contentType: String
  timeCreated: String
  updated: String
  storageClass: String
  timeStorageClassUpdated: String
  size: String
  md5Hash: String
  mediaLink: String
  contentDisposition: String
  crc32c: String
  etag: String
  #metadata: Object
}

type JobFile {
  key: String!
  url: String
  jobId: String
  storageRefPath: String
  metadata: FirebaseFileMetaData
  isArchived: Boolean
}

input JobFileCreateInput {
  url: String
  jobId: String
  storageRefPath: String
  isArchived: Boolean
}

input JobFileUpdateInput {
  # not mandatory because we use this right now for create and update
  key: String
  url: String
  jobId: String
  storageRefPath: String
  isArchived: Boolean
}
`;

export default jobFilesDefs;
