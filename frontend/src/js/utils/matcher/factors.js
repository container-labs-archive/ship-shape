// @flow

import type { ScoreData } from 'Types';
import Config from 'Config';
import scores from './scores';
import {
  MATCH_EMPTY, EXACT_MATCH, NOT_A_MATCH, IS_VARIANT, NO_MATCH_EVAL,
  VARIES_BY,
} from './constants';
import getBand from './bands';
import { getVerdict } from './verdict';

export const factorCount = 16;

export const factorNumbers = Array.from(
  {
    length: factorCount,
  },
  (v, k) => k + 1,
);

export const factors = [
  'Communication & relationship skills',
  'Knowledge, training & experience',
  'Analytical & judgemental skills',
  'Planning & organisational skills',
  'Physical skills',
  'Responsibility for patients / client care',
  'Responsibility for policy / service development',
  'Responsibility for financial & physical resources',
  'Responsibility for human resources',
  'Responsibility for information resources',
  'Responsibility for research & development',
  'Freedom to act',
  'Physical effort',
  'Mental effort',
  'Emotional effort',
  'Working conditions',
];

export const computeFactor = (factor, profileData, formData, accountId, isHybrid: boolean = false) => {
  if (formData === undefined || profileData === undefined) {
    return {
      match: MATCH_EMPTY,
    };
  }

  let score = 0;

  if (profileData === null) {
    if (formData !== undefined) {
      score = scores[`factor${factor}`][formData];
    }

    return {
      match: NO_MATCH_EVAL,
      score,
    };
  }


  let variesBy = 0;
  // let variationMatched = false;
  let match = MATCH_EMPTY;

  // get the range, a profile could have a range like 1 2
  const parts = profileData.split(' ');
  const rangeLow = parseInt(parts[0], 10);
  let rangeHigh = rangeLow;

  if (parts.length > 1) {
    rangeHigh = parseInt(parts[parts.length - 1], 10);
  }

  if (formData !== undefined) {
    score = scores[`factor${factor}`][formData];
    match = NOT_A_MATCH;

    if (formData < rangeLow) {
      variesBy = rangeLow - formData;
    } else if (formData > rangeHigh) {
      variesBy = formData - rangeHigh;
    }

    if (formData <= rangeHigh && formData >= rangeLow) {
      match = EXACT_MATCH;
      // variesBy = 0
    } else if (isHybrid && (formData <= rangeHigh + 2 && formData >= rangeLow - 2) || formData <= rangeHigh + 1 && formData >= rangeLow - 1) {
      match = IS_VARIANT;
    }

    // STATES is just factor 2, others trusts are BOTH factor 2 and 2
    // factor 2 needs to be exact
    // except for the states account
    if (match === IS_VARIANT && (factor === 2 || factor === 12)) {
      if (accountId && accountId === Config.statesAccount && factor === 12) {
        // match = IS_VARIANT;
      } else {
        match = NOT_A_MATCH;
      }
    }
  }

  return {
    match,
    score,
    variesBy,
  };
};

export const computeFactors = (profile, factorData, accountId: string, { isHybrid, isEvaluation }): ScoreData => {
  const result = {
    factors: {},
    meta: {
      matches: {},
      complete: false,
      total: null,
      band: null,
    },
  };
  // console.log('computeFactors');

  let totalFilledOut = 0;
  // not ideal double-loop. should cleanup later
  factorNumbers.forEach((n) => {
    const data = factorData[`factor${n}`] ? factorData[`factor${n}`] : undefined;
    if (data) {
      totalFilledOut += 1;
    }
  });


  // TODO: compute score if eval, just without profile

  if (isEvaluation && totalFilledOut === 16) {
    result.meta = {
      matches: {},
      band: {},
      complete: true,
      isEvaluation,
    }

    // return result;
  }

  // if (profile === undefined) {
  //   return result;
  // }

  // TODO: can they submit the form if there is a NON_MATCH => yes
  //       can they submit if the verdict is a NON_MATCH => yes
  if (profile) {
    result.meta.matches[VARIES_BY] = 0;
  }

  result.meta.total = 0;

  factorNumbers.forEach((n) => {
    const data = factorData[`factor${n}`] ? factorData[`factor${n}`] : undefined;
    let profileData = null;
    if (profile) {
      profileData = profile[`factor_${n}_level`];
    }
    const singleFactor = computeFactor(n, profileData, data, accountId, isHybrid);

    if (profile) {
      if (result.meta.matches[singleFactor.match] === undefined) {
        result.meta.matches[singleFactor.match] = 0;
      }

      result.meta.matches[singleFactor.match] += 1;
      if (singleFactor.match === IS_VARIANT) {
        result.meta.matches[VARIES_BY] += singleFactor.variesBy;
      }
    } else {
      if (result.meta.matches[EXACT_MATCH] === undefined) {
        result.meta.matches[EXACT_MATCH] = 0;
      }
      result.meta.matches[EXACT_MATCH] += 1;
    }

    if (singleFactor.score) {
      result.meta.total += singleFactor.score;
    }

    result.factors[`factor${n}`] = singleFactor;
  });

  const variesBy = result.meta.matches[VARIES_BY] || 0;
  const totalVariants = result.meta.matches[IS_VARIANT] || 0;
  const nonMatches = result.meta.matches[NOT_A_MATCH] || 0;
  const empty = result.meta.matches[MATCH_EMPTY] || 0;
  const totalExact = result.meta.matches[EXACT_MATCH] || 0;
  const complete = totalExact + totalVariants + nonMatches === 16;

  result.meta = {
    ...result.meta,
    complete,
    totalVariants,
    nonMatches,
    empty,
    variesBy,
  };

  if (!complete) {
    return result;
  }

  result.meta.band = getBand(profile, result, accountId);

  // add the verdict
  result.meta = {
    ...result.meta,
    verdict: getVerdict(result, isEvaluation),
  };

  // console.log('result', result);

  return result;
};

export const matchResultStyle = (factorData, classes, isEvaluation) => {
  if (isEvaluation) {
    return '';
  }
  switch (factorData.match) {
    case MATCH_EMPTY:
      return '';
    case IS_VARIANT:
      return classes.variant;
    case EXACT_MATCH:
      return classes.match;
    case NOT_A_MATCH:
      return classes.nonMatch;
    default:
      return '';
  }
};

export const matchResultText = (factorData, isEvaluation) => {
  if (isEvaluation) {
    return '';
  }
  switch (factorData.match) {
    case MATCH_EMPTY:
      return '';
    case IS_VARIANT:
      return 'Variation';
    case EXACT_MATCH:
      return 'Match';
    case NOT_A_MATCH:
      return 'Not a Match';
    default:
      return '';
  }
};
