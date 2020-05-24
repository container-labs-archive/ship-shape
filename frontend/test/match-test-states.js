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

const accountId = 'FEWBAR';

describe('computeFactors for states', () => {
  it('counts non matches, variations, basics', () => {
    const profile = {
      pay_band_max_states: 'E',
    };
    const formData = {};

    const data = [
      ['4', '4'], // has to be exact
      ['3', '3'],
      ['3', '3'],
      ['1 2', '2'], // check that this is exact match
      ['3', '4'], // 1 variation
      ['4 5', '5'],
      ['1', '1'],
      ['2', '2'],
      ['1', '1'],
      ['1', '1'],
      ['1', '1'],
      ['2', '2'],
      ['4 5', '5'],
      ['2 3', '3'],
      ['4', '4'],
      ['5', '5'],
    ];

    data.forEach((element, index) => {
      profile[`factor_${index + 1}_level`] = `${element[0]}`;
      formData[`factor${index + 1}`] = {
        value: element[1],
      };
    });

    const result = computeFactors(profile, formData, accountId);
    console.log(result);

    const {
      factors: { factor1, factor4, factor5 },
      meta: {
        verdict: { verdict },
        totalVariants,
        nonMatches,
      },
    } = result;

    assert.equal(factor1.match, EXACT_MATCH);
    assert.equal(factor4.match, EXACT_MATCH);
    assert.equal(factor5.match, IS_VARIANT);

    assert.equal(VERDICT_LEVEL_MATCH, verdict);
    assert.equal(1, totalVariants);
    assert.equal(0, nonMatches);
  });
});
