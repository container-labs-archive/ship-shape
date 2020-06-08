// @flow

import * as React from 'react';
import {
  Select,
} from '@material-ui/core';

const renderSelectField = ({
  children,
  input: {
    onChange, value, onBlur, ...inputProps
  },
  onChange: onChangeFromField,
  defaultValue,
}) => (
  <Select
    displayEmpty
    {...inputProps}
    value={value}
    onChange={(event) => {
      onChange(event.target.value);
      if (onChangeFromField) {
        onChangeFromField(event.target.value);
      }
    }}
    onBlur={() => onBlur(value)}
    children={children}
  />
);

export {
  renderSelectField,
};
