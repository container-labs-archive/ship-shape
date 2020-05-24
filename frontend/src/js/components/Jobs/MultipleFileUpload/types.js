// @flow

type Props = {
  storageRootRef: Object,
  storageChildRefName: string,
  onCompleteUploading: Function,
  onCompleteDeleting: Function,
  onCompleteRequest: Function,
  onStartRequest: Function,
  files: Array<Object>,
}

type State = {
  files: Object,
  disableClick: boolean,
}

export type {
  Props,
  State,
};
