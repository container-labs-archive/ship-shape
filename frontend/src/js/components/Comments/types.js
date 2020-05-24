// @flow

type Props = {
  onAdd: Function,
  onUpdate: Function,
  onRemove: Function,
  canAdd: boolean,
  canEdit: boolean,
  classes: Object,
  comments: Array<Object>,
  currentUserId: string,
}

export type { Props };
