import { gql } from 'Apollo';

const packagesQuery = gql`
  query packages {
    packages {
      carrier
      tracking_code

      ship_engine {
        status_code
        status_description
        estimated_delivery_date

        events {
          description
          occurred_at
          country_code
          state_province
          postal_code
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
