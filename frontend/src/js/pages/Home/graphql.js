import { gql } from 'Apollo';

export const packagesQuery = gql`
  query packages {
    packages {
      carrier
      tracking_code

      ship_engine {
        status_code
        status_description

        events {
          description
        }
      }
    }
  }
`;
