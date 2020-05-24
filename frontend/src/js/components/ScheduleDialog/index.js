// // @flow

// import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import Slide from '@material-ui/core/Slide';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import DateTimePicker from 'material-ui-pickers/DateTimePicker';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import type { Props, State } from './types';
// import styles from './styles';

// const Transition = (props) => <Slide direction="up" {...props} />;

// @withStyles(styles)
// class ScheduleDialog extends Component<Props, State> {
//   state = {
//     emailToMember: false,
//     moreInfo: '',
//     scheduleDate: new Date(),
//   };

//   handleDateChange = (date) => {
//     this.setState({ scheduleDate: date });
//   };

//   handleMoreInfoChange = (event) => {
//     this.setState({ moreInfo: event.target.value });
//   };

//   handleChangeSwitch = (event) => {
//     this.setState({ emailToMember: event.target.checked });
//   };

//   handleClose = () => {
//     this.props.onClose();
//   };

//   submit = () => {
//     const { scheduleDate, emailToMember, moreInfo } = this.state;

//     this.props.onSubmit(scheduleDate, emailToMember, moreInfo);
//   };

//   render() {
//     const { title, open, classes } = this.props;
//     const { scheduleDate } = this.state;

//     return (
//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         classes={{ paper: classes.paper }}
//       >
//         <DialogTitle>{title}</DialogTitle>
//         <DialogContent style={{ overflowY: 'visible' }}>
//           <div className={classes.field}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <DateTimePicker
//                 value={scheduleDate}
//                 onChange={this.handleDateChange}
//               />
//             </MuiPickersUtilsProvider>
//           </div>
//           <div className={classes.field}>
//             <TextField
//               className={classes.fullWidth}
//               name="moreInfo"
//               label="More Information"
//               placeholder="Meeting location, etc..."
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               onChange={this.handleMoreInfoChange}
//             />
//           </div>
//           <div className={classes.field}>
//             <FormControl>
//               <FormLabel>Email Panel Members</FormLabel>
//               <FormGroup>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       name="emailToMember"
//                       checked={this.state.emailToMember}
//                       onChange={this.handleChangeSwitch}
//                       value="check"
//                     />
//                   }
//                   label="Email member"
//                 />
//               </FormGroup>
//             </FormControl>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button color="secondary" variant="contained" onClick={this.handleClose}>
//             Cancel
//           </Button>
//           <Button color="primary" variant="contained" onClick={this.submit}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   }
// }

// export default ScheduleDialog;
