// @flow

import { computeFactors } from '../src/js/utils/matcher/factors';
import {
  MATCH_EMPTY,
  IS_VARIANT,
  EXACT_MATCH,
  NOT_A_MATCH,
  BAND_MATCH,
  VERDICT_NON_MATCH,
  NON_MATCH_NON_MATCHES,
  VERDICT_PROFILE_MATCH,
  VERDICT_LEVEL_MATCH,
} from '../src/js/utils/matcher/constants';

const assert = require('assert');

const accountId = undefined;
const isHybrid = true;

describe('computeFactors with evaluation match', () => {
  it('test verdict in evaluation mode', () => {
    const profile = {
      pay_band_max: '4',
    };
    const formData = {};

    const data = [
      ['4', '4'],
      ['3', '3'],
      ['3', '3'],
      ['1 2', '1'],
      ['3', '3'],
      ['4 5', '5'],
      ['1', '1'],
      ['2', '2'],
      ['1', '1'],
      ['1', '1'],
      ['1', '1'],
      ['2', '2'],
      ['4 5', '4'],
      ['2 3', '3'],
      ['4', '4'],
      ['5', '2'], // this is more than 2 away, this is not allowed
    ];

    data.forEach((element, index) => {
      profile[`factor_${index + 1}_level`] = `${element[0]}`;
      formData[`factor${index + 1}`] = {
        value: element[1],
      };
    });

    const result = computeFactors(profile, formData, accountId, isHybrid);

    const {
      factors: { factor16 },
      meta: {
        verdict: { verdict },
        totalVariants,
        nonMatches,
      },
    } = result;
  });
});
