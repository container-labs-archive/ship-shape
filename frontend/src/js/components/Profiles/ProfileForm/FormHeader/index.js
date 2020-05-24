// @flow

import * as React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'Components/redux-form-material-ui';
import {
  // MenuItem,
  Typography,
  withStyles,
} from '@material-ui/core';
import Avatar from 'Components/Avatar';
import EvalTypeButtons from './EvalTypeButtons';
import ProfileSelect from './ProfileSelect';
import styles from './styles';

type Props = {
  profileOptions: Object,
  classes: Object,
  profile: Object,
  isMatch: Boolean,
  isHybridMatch: Boolean,
  isEvaluation: Boolean,
  isConsistency: Boolean,
  onEvaluationTypeChange: Function,
}

@withStyles(styles)
class BasicFormFields extends React.PureComponent<Props> {
  render() {
    const {
      profileOptions,
      classes,
      profile,
      isMatch,
      isHybridMatch,
      isEvaluation,
      isConsistency,
      onEvaluationTypeChange,
      panelMembers,
    } = this.props;

    return (
      <div>
        <div>
          <Field
            fullWidth
            name="jobTitle"
            label="Job Title"
            placeholder="Type job title ..."
            disabled
            component={TextField}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <Field
            fullWidth
            name="jobMatchNumber"
            label="Job Number"
            placeholder="Type job number ..."
            disabled
            component={TextField}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <Field
            disabled={isConsistency}
            fullWidth
            multiline
            name="jobSummary"
            label="Job Summary"
            component={TextField}
            placeholder="Type job summary..."
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Field
          classeName={classes.container}
          disabled
          fullWidth
          name="dateOfPanel"
          label="Date Of Panel"
          placeholder="Select date of panel..."
          component={TextField}
          type="date"
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Field
          classeName={classes.container}
          disabled={isConsistency || isEvaluation}
          className="port-font"
          name="profileId"
          label="Profiles"
          placeholder="Select a profile..."
          id="selectProfile"
          options={profileOptions}
          component={ProfileSelect}
        />
        <div className={classes.membersContainer}>
          <Typography variant="subtitle2">
            Panel Members
          </Typography>
          <div className={classes.membersInner}>
            {panelMembers.map((member) => {
              return (
                <Avatar
                  name={member.displayName}
                  email={member.email}
                  photoURL={member.photoURL}
                  asChip
                />
              );
            })}
          </div>
        </div>
        <div className={classes.jobStatementWrapper}>
          <p />
          <Typography variant="caption" gutterBottom>
            Job Statement
          </Typography>
          {
            profile && profile.job_statement && (
            <Typography variant="body2" gutterBottom>
              {profile.job_statement}
            </Typography>
            )
          }
          {
            !isEvaluation && !(profile && profile.job_statement) && (
            <Typography variant="body2" gutterBottom>
              Select a profile.
            </Typography>
            )
          }
        </div>
        <EvalTypeButtons
          onTypeChange={onEvaluationTypeChange}
          isMatch={isMatch}
          isHybridMatch={isHybridMatch}
          isEvaluation={isEvaluation}
          disabled={isConsistency}
        />
      </div>
    );
  }
}

export default BasicFormFields;
