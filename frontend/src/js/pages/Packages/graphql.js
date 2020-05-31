import { gql } from 'Apollo';

const packagesQuery = gql`
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

const trackPackageMutation = gql`
  mutation trackPackage($input: PackageCreateInput) {
    trackPackage(input: $input) {
      status
    }
  }
`;

export {
  packagesQuery,
  trackPackageMutation,
};
