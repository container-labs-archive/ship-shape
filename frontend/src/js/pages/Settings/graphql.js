import { gql } from 'Apollo';

export const appSettingsQuery = gql`
  query appSettings {
    appSettings {
      featureUserManagement
      featureUploadFiles
    }
  }
`;

export const updateAppSettingsMutation = gql`
  mutation updateAppSettings($input: AppSettingsUpdateInput) {
    updateAppSettings(input: $input) {
      key
      status
      error
    }
  }
`;
