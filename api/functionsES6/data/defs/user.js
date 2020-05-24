const user = `
type User {
  key: String! # firebase user uuid
  activePanelMember: Boolean
  isReviewer: Boolean
  isOwner: Boolean
  isAdmin: Boolean
  isDemo: Boolean
  isAccountManager: Boolean
  email: String
  isArchived: Boolean

  # from firebase managed user, read only
  disabled: Boolean
  displayName: String
  emailVerified: Boolean
  creationTime: String
  lastSignInTime: String
  photoURL: String
  imageRef: String
  # for some reason its picture or photoURL depending on provider
  picture: String

  # added on the backend
  inviteCode: String
  accountId: String
  darkTheme: Boolean

  # IJES user info
  ijesID: String
  ijesActive: String
  ijesDepartment: String
  ijesPanelMember: String
  ijesDeptText: String
}

input UserCreateInput {
  isReviewer: Boolean
  isAdmin: Boolean
  isOwner: Boolean
  isDemo: Boolean
  email: String!
  displayName: String!
  activePanelMember: Boolean
  isArchived: Boolean
  darkTheme: Boolean

  # IJES user info
  ijesID: String
  ijesActive: String
  ijesDepartment: String
  ijesPanelMember: String
  ijesDeptText: String
}

input UserUpdateInput {
  uid: String!
  email: String
  emailVerified: Boolean
  displayName: String
  disabled: Boolean
  photoURL: String
  imageRef: String
  isArchived: Boolean
  darkTheme: Boolean

  # IJES user info
  ijesID: String
  ijesActive: String
  ijesDepartment: String
  ijesPanelMember: String
  ijesDeptText: String
}`;

export default user;
