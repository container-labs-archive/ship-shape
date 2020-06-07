import { gql } from 'Apollo';

const packagesQuery = gql`
  query packages {
    packages {
      key
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
          city_locality
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

const updatePackageMutation = gql`
  mutation updatePackage($input: PackageUpdateInput) {
    updatePackage(input: $input) {
      status
    }
  }
`;

export {
  packagesQuery,
  trackPackageMutation,
  updatePackageMutation,
};
