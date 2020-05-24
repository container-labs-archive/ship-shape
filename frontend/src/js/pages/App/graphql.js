import { gql } from 'Apollo';

export const userSettingsQuery = gql`
  query user($key: String!) {
    user(key: $key) {
      key
      isDemo
      isAdmin
      isAccountManager
      photoURL
      imageRef
      accountId
      activePanelMember
      isReviewer
      darkTheme
      email
    }

    account {
      key
      name
    }
  }
`;
