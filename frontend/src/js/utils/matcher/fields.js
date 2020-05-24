import { formValueSelector } from 'redux-form';

export const selector = formValueSelector('profiles');

export const fieldKeys = [
  'jobTitle',
  'jobMatchNumber',
  'dateOfPanel',
  'factor1',
  'evidence1',
  'factor2',
  'evidence2',
  'factor3',
  'evidence3',
  'factor4',
  'evidence4',
  'factor5',
  'evidence5',
  'factor6',
  'evidence6',
  'factor7',
  'evidence7',
  'factor8',
  'evidence8',
  'factor9',
  'evidence9',
  'factor10',
  'evidence10',
  'factor11',
  'evidence11',
  'factor12',
  'evidence12',
  'factor13',
  'evidence13',
  'factor14',
  'evidence14',
  'factor15',
  'evidence15',
  'factor16',
  'evidence16',
  'totalVariants',
];

export const selectFields = store =>
  fieldKeys.reduce((obj, field) => ({
    ...obj,
    [field]: selector(store, field),
  }), {});

