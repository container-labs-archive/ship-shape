// @flow

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

const errorStyle = {
  backgroundColor: 'rgba(255, 10, 10, 0.5)',
  padding: '10px',
};

const labelStyle = {
  color: 'rgba(0, 0, 0, 0.54)',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  paddingTop: '13px',
  paddingBottom: '5px',
};

type RemapedComponentProps = {
  input: Object,
  meta: Object,
}

export const remapReduxFormProps = WrappedComponent =>
  class WithRemappedCustomProps extends Component<RemapedComponentProps> {
    render() {
      const { input, meta, ...customField } = this.props;
      const cloneProps = { ...input, ...meta, ...customField };

      return (
        <div>
          {
            customField.label &&
            <div style={labelStyle}>{customField.label}</div>
          }
          <WrappedComponent
            {...cloneProps}
            value={input.value || customField.defaultValue}
            onBlur={() => input.onBlur(input.value)}
          />
          {
            meta.touched && meta.error &&
            <div style={errorStyle}>
              <span>{meta.error}</span>
            </div>
          }
        </div>
      );
    }
  };

type DatePickerFieldProps = {
  input: Object,
  meta: Object,
}

export const DatePickerField = ({ input, meta: { touched, error }, ...custom }: DatePickerFieldProps): ReactComponent => (
  <div>
    {
      touched && error &&
      <div style={errorStyle}>
        <span>{error}</span>
      </div>
    }
    <TextField
      {...{ ...input, ...custom }}
      id="date"
      label="Date of Panel"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
    />
  </div>
);
