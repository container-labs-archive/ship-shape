// @flow
import { SubmissionError } from 'redux-form';
import {
  formIncompleteMessage,
} from '../../config/strings';

function validateBeforeSubmit(values: Object, props, state) {
  const { fieldKeys, isEvaluation } = props;

  if (!isEvaluation && !values.profileId) {
    return {
      profileId: 'Please Choose A Profile',
      _error: 'Please Choose A Profile',
    };
  }

  const errors = fieldKeys.reduce((errObj, field) => {
    if (!values[field] && field !== 'totalVariants') {
      errObj[field] = field.includes('evidence') ? 'Please complete' : 'Not empty'; // eslint-disable-line
      errObj[field] = field.includes('factor') ? 'Please complete' : 'Not empty'; // eslint-disable-line
    }
    return errObj;
  }, {});

  if (Object.keys(errors).length) {
    errors._error = formIncompleteMessage; // eslint-disable-line
  }
  return errors;
}


// need to get other fields
// only validate when not a draft
// move on

function gatherProps(props, values) {
  const {
    scores,
  } = props;


  const {
    total,
    totalVariants,
    band,
    verdict,
    variesBy,
  } = scores.meta;
  const theBand = band ? band.band : undefined;
  const theVerdict = verdict ? verdict.verdict : undefined;
  const { profile, __typename, ...otherValues } = values;

  return {
    ...otherValues,
    ...{
      total,
      totalVariants,
      variesBy,
      band: `${theBand}`,
      verdict: theVerdict,
    },
  };
}

function handleBeforeSubmit(values: Object, props, state) {
  const {
    onSave,
  } = props;

  const errors = validateBeforeSubmit(values, props, state);
  const data = gatherProps(props, values);

  return Object.keys(errors).length
    ? Promise.reject(new SubmissionError(errors))
    : onSave({
      ...data,
      isDraft: false,
    });
}

function handleSaveDraft(values, props) {
  const {
    onSave,
  } = props;

  const data = gatherProps(props, values);

  return onSave({
    ...data,
    isDraft: true,
  });
}

export {
  handleBeforeSubmit,
  handleSaveDraft,
};
