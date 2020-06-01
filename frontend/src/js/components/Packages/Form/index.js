// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from 'Components/redux-form-material-ui';
import { Field, reduxForm, getFormValues, change } from 'redux-form';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  InputLabel,
} from '@material-ui/core';
import styles from './styles';
import type { Props, State } from './types';

const carriers = [
  // {
  //   name: 'Access Worldwide',
  //   code: 'access_worldwide'
  // },
  // {
  //   name: 'APC',
  //   code: 'apc',
  // },
  // {
  //   name: 'Asendia',
  //   code: 'asendia',
  // },
  // {
  //   name: 'Australia Post',
  //   code: 'australia_post',
  // },
  // {
  //   name: 'Canada Post',
  //   code: 'canada_post',
  // },
  {
    name: 'DHL Express',
    code: 'dhl_express',
  },
  {
    name: 'FedEx',
    code: 'fedex',
  },
  // {
  //   name: 'First Mile',
  //   code: 'firstmile',
  // },
  // {
  //   name: 'Globegistics',
  //   code: 'globegistics',
  // },
  // {
  //   name: 'IMEX',
  //   code: 'imex',
  // },
  // {
  //   name: 'Newgistics',
  //   code: 'newgistics',
  // },
  {
    name: 'OnTrac',
    code: 'ontrac',
  },
  // {
  //   name: 'Purolator Canada',
  //   code: 'purolator_ca',
  // },
  // {
  //   name: 'RR Donnelley',
  //   code: 'rr_donnelley',
  // },
  // {
  //   name: 'Sendle',
  //   code: 'sendle',
  // },
  // {
  //   name: 'Stamps.com',
  //   code: 'stamps_com',
  // },
  {
    name: 'U.S. Postal Service',
    code: 'usps',
  },
  {
    name: 'UPS',
    code: 'ups',
  },
]

// const renderSelectField = ({
//   input,
//   label,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <SelectField
//     label={label}
//     errorText={touched && error}
//     {...input}
//     onChange={(event, index, value) => input.onChange(value)}
//     children={children}
//     {...custom}
//   />
// )

const mapStateToProps = state => ({
  values: getFormValues('packages')(state),
});

const mapDispatchToProps = dispatch => ({
  changeFieldValue: (field, value) => {
    dispatch(change('packages', field, value));
  },
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withStyles(styles)
class Form extends Component<Props, State> {
  state = {
    requesting: false,
    carrier: '',
    trackingCode: '',
  }

  handleStartRequest = () => {
    this.setState({ requesting: true });
  }

  handleComleteRequest = () => {
    this.setState({ requesting: false });
  }

  handleChange = (ev) => {
    this.setState({
      carrier: ev.target.value,
    });
  }

  handleCodeChange = (ev) => {
    this.setState({
      trackingCode: ev.target.value,
    });
  }

  // hack w/ carrier state to make the select dropdown easier to work with
  // ideally this is integrated into the react redux form
  presubmit = (data) => {
    const {
      onSubmit,
    } = this.props;
    const {
      carrier,
      trackingCode,
    } = this.state;
    const merged = {
      carrier,
      tracking_code: trackingCode,
    };

    onSubmit(merged);
  }

  render() {
    const {
      classes,
      onSubmit,
      submitting,
      handleSubmit,
      dispatch,
    } = this.props;
    const { requesting, carrier, trackingCode } = this.state;

    return (
      <form onSubmit={handleSubmit(this.presubmit)}>
        <div key="f1">
          <Select
            onChange={this.handleChange}
            label="Carrier"
            value={carrier}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select Carrier</em>
            </MenuItem>

            {carriers.map((carrier) => {
              const rowKey = `c-${carrier.code}`
              return (
                <MenuItem value={carrier.code} key={rowKey}>{carrier.name}</MenuItem>
              )
            })}
          </Select>

        </div>
        <br />
        <div key="f2">
          <TextField
            id="outlined-password-input"
            label="Tracking Code"
            autoComplete="current-password"
            variant="outlined"
            value={trackingCode}
            onChange={this.handleCodeChange}
          />
        </div>
        <div className={classes.buttons} key="f3">
          <Button
            color="primary"
            variant="contained"
            disabled={requesting || submitting}
            onClick={this.presubmit}
            id="submitJob"
          >
            Track Package
          </Button>
        </div>
      </form>
    );
  }
}

const form = 'packages';
const fields = ['carrier', 'tracking_code',];
const initialValues = {
  carrier: '', tracking_code: '',
};
const validate = (values) => {
  const errors = {};

  if (!values.carrier) {
    errors.carrier = 'Carrier is required';
  }

  if (!values.tracking_code) {
    errors.tracking_code = 'Tracking code is required';
  }

  return errors;
};

export default reduxForm({
  form: 'packages',
  fields,
  validate,
  initialValues,
})(Form);
