import { gql } from 'Apollo';

export const confirmAccountMutation = gql`
  mutation confirmAccount($email: String!, $inviteCode: String!, $password: String!) {
    confirmAccount(email: $email, inviteCode: $inviteCode, password: $password, key: $email) {
      key,
      error,
      status,
      message,
    }
  }
`;
