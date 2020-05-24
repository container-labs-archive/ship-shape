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

describe('computeFactors', () => {
  it('counts non matches, variations, basics', () => {
    const profile = {};
    const formData = {};

    // 3 variations
    //
    const data = [
      ['4', '4'], // has to be exact
      ['3', '2'], // this needs to be exact
      ['3', '3'],
      ['1 2', '2'], // check that this is exact match
      ['3', '4'],
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

    const result = computeFactors(profile, formData);

    const {
      factors: { factor1, factor2, factor4 },
      meta: {
        verdict: { verdict, reason },
        totalVariants,
        nonMatches,
      },
    } = result;

    assert.equal(factor1.match, EXACT_MATCH);
    assert.equal(factor2.match, NOT_A_MATCH);
    assert.equal(factor4.match, EXACT_MATCH);

    assert.equal(verdict, VERDICT_NON_MATCH);
    assert.equal(reason, NON_MATCH_NON_MATCHES);
    assert.equal(totalVariants, 1);
    assert.equal(nonMatches, 1);
  });

  it('mark just one as not match', () => {
    const profile = {};
    const formData = {};

    const data = [
      ['4', '4'],
      ['3', '3'],
      ['3', '3'],
      ['1 2', '2'],
      ['3', '3'],
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
      ['5', '3'],
    ];

    data.forEach((element, index) => {
      profile[`factor_${index + 1}_level`] = `${element[0]}`;
      formData[`factor${index + 1}`] = {
        value: element[1],
      };
    });

    const result = computeFactors(profile, formData);

    const {
      factors: { factor16 },
      meta: {
        verdict: { verdict, reason },
        totalVariants,
        nonMatches,
      },
    } = result;

    assert.equal(factor16.match, NOT_A_MATCH);

    assert.equal(verdict, VERDICT_NON_MATCH);
    assert.equal(reason, NON_MATCH_NON_MATCHES);
    assert.equal(totalVariants, 0);
    assert.equal(nonMatches, 1);
  });

  it('band match', () => {
    const profile = {
      pay_band_max: '4',
    };
    const formData = {};

    const data = [
      ['4', '4'],
      ['3', '3'],
      ['3', '3'],
      ['1 2', '2'],
      ['3', '3'],
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
      ['5', '4'],
    ];

    data.forEach((element, index) => {
      profile[`factor_${index + 1}_level`] = `${element[0]}`;
      formData[`factor${index + 1}`] = {
        value: element[1],
      };
    });

    const result = computeFactors(profile, formData);

    const {
      factors: { factor16 },
      meta: {
        verdict: { verdict },
        totalVariants,
      },
    } = result;

    assert.equal(factor16.match, IS_VARIANT);

    assert.equal(verdict, VERDICT_LEVEL_MATCH);
    assert.equal(totalVariants, 1);
  });

  it('profile match', () => {
    const profile = {};
    const formData = {};

    const data = [
      ['4', '4'],
      ['3', '3'],
      ['3', '3'],
      ['1 2', '2'],
      ['3', '3'],
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
    profile.pay_band_max = '4';

    const result = computeFactors(profile, formData);

    const {
      meta: {
        verdict: { verdict },
        totalVariants,
      },
    } = result;

    assert.equal(verdict, VERDICT_PROFILE_MATCH);
    assert.equal(totalVariants, 0);
  });

  it('factor 2 and 12 dont vary', () => {
    const profile = {};
    const formData = {};

    const data = [
      ['4', '4'],
      ['3', '4'], // should not be allowed
      ['3', '3'],
      ['1 2', '2'],
      ['3', '3'],
      ['4 5', '5'],
      ['1', '1'],
      ['2', '2'],
      ['1', '1'],
      ['1', '1'],
      ['1', '1'],
      ['2', '3'], // should not be allowed
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
    profile.pay_band_max = '4';

    const result = computeFactors(profile, formData);

    const {
      factors: { factor2, factor12 },
    } = result;

    assert.equal(factor2.match, NOT_A_MATCH);
    assert.equal(factor12.match, NOT_A_MATCH);
  });
});
