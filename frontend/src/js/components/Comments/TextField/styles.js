const styles = theme => ({
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, .25)',
    },
  },
  helperText: {
    marginTop: theme.spacing(4),
  },
});

export default styles;
