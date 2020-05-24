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

describe('computeFactors with hybrid match', () => {
  it('test hybrid out of range', () => {
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
    console.log(result);

    const {
      factors: { factor16 },
      meta: {
        verdict: { verdict },
        totalVariants,
        nonMatches,
      },
    } = result;
    console.log('result', result);

    assert.equal(NOT_A_MATCH, factor16.match);
    assert.equal(VERDICT_NON_MATCH, verdict);
    assert.equal(0, totalVariants);
    assert.equal(1, nonMatches);
  });

  it('4 variants, varies by 5', () => {
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
      ['4 5', '3'], // just 1 low end
      ['2 3', '4'], // just 1 high end
      ['4', '5'], // 1 variation point
      ['5', '3'], // 2 variation points
    ];

    data.forEach((element, index) => {
      profile[`factor_${index + 1}_level`] = `${element[0]}`;
      formData[`factor${index + 1}`] = {
        value: element[1],
      };
    });

    const result = computeFactors(profile, formData, accountId, isHybrid);
    console.log(result);

    const {
      factors: { factor16 },
      meta: {
        verdict: { verdict },
        totalVariants,
        variesBy,
        nonMatches,
      },
    } = result;

    assert.equal(factor16.match, IS_VARIANT);
    assert.equal(VERDICT_LEVEL_MATCH, verdict);
    assert.equal(4, totalVariants);
    assert.equal(5, variesBy);
    assert.equal(0, nonMatches);
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
    profile.pay_band_max = '4';

    const result = computeFactors(profile, formData, accountId, isHybrid);

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

    const result = computeFactors(profile, formData, accountId, isHybrid);

    const {
      meta: {
        verdict: { verdict },
        totalVariants,
      },
    } = result;

    assert.equal(verdict, VERDICT_PROFILE_MATCH);
    assert.equal(totalVariants, 0);
  });

  // is this still true for hybrid?
  it('factor 2 and 12 dont vary', () => {
    console.log('is this still true for hybrid?');
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

    const result = computeFactors(profile, formData, accountId, isHybrid);

    const {
      factors: { factor2, factor12 },
    } = result;

    assert.equal(factor2.match, NOT_A_MATCH);
    assert.equal(factor12.match, NOT_A_MATCH);
  });
});
