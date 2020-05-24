// @flow

import * as React from 'react';
import Select from 'react-select';
import {
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import styles from './styles';

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function Control(props) {
  const { isDisabled } = props;

  return (
    <TextField
      fullWidth
      disabled={isDisabled}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  const { isDisabled } = props;

  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      disabled={isDisabled}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  const { isDisabled } = props;
  const { classes } = props.selectProps;

  return (
    <Typography className={classNames(classes.singleValue, isDisabled &&classes.disabledType)} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

@withStyles(styles, { withTheme: true })
class ProfileSelect extends React.Component {
  state = {
    value: null,
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log('shouldComponentUpdate', nextProps, nextState);
  //   if (this.state.value === null && nextState.value === null) {
  //     return false;
  //   }
  //   if (this.state.value !== null) {
  //     return nextState.value === this.state.value.value;
  //   }
  //   // console.log('is should update', nextProps, nextState);
  //   return true;
  // }

  constructor(props) {
    super(props);

    const {
      options,
      input: { onChange, value, onBlur, ...inputProps },
    } = props;

    // HACK, get away from storing this as state, and a lot should be cleaned up
    if (value) {
      let option = options.filter((option) => option.value === value);
      if (option) {
        option = option[0];

        this.state = {
          value: {
            value: option.value,
            label: option.label,
          },
        };
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.input.value === '') {
      return {
        value: null,
      }
    }

    return null;
  }

  render() {
    const {
      classes,
      options,
      placeholder,
      input: { onChange, value, onBlur, ...inputProps },
      onChange: onChangeFromField,
      defaultValue,
      disabled,
    } = this.props;

    return (
      <Select
        isDisabled={disabled}
        classes={classes}
        options={options}
        placeholder={placeholder}
        components={components}
        {...inputProps}
        onChange={(event) => {
          this.setState({ value: event });

          onChange(event.value);
          if (onChangeFromField) {
            onChangeFromField(event.target.value);
          }
        }}
        onBlur={() =>{
          const val = this.state.value ? this.state.value.value : undefined;
          onBlur(val)
        }}
        value={this.state.value}
      />
    )
  }
}

export default ProfileSelect;
