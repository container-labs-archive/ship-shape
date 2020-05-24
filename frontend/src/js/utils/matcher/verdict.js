// @flow

import type { ScoreData, Verdict } from 'Types';
import {
  EXACT_MATCH,
  VERDICT_INCOMPLETE,
  VERDICT_NON_MATCH,
  VERDICT_LEVEL_MATCH,
  VERDICT_PROFILE_MATCH,
  NON_MATCH_BAND,
  NON_MATCH_VARIANTS,
  NON_MATCH_NON_MATCHES,
} from './constants';

export const prettyVerdict = (verdict: string): string => {
  switch (verdict) {
    case VERDICT_PROFILE_MATCH: {
      return 'Profile Match';
    }
    case VERDICT_LEVEL_MATCH: {
      return 'Band Match';
    }
    case VERDICT_NON_MATCH: {
      return 'Not A Match';
    }
    case VERDICT_INCOMPLETE: {
      return 'Incomplete';
    }
    default:
      return verdict;
  }
};

export const getVerdict = (scoreData: ScoreData, isEvaluation): Verdict => {
  if (scoreData.meta.complete !== true) {
    return {
      verdict: VERDICT_INCOMPLETE,
    };
  }

  if (isEvaluation) {
    return {
      verdict: VERDICT_INCOMPLETE,
    };
  }

  // give reason
  let reason = null;
  if (scoreData.meta.band.bandMatch !== true) {
    reason = NON_MATCH_BAND;
  }
  if (scoreData.meta.variesBy > 5) {
    reason = NON_MATCH_VARIANTS;
  }
  if (scoreData.meta.nonMatches > 0) {
    reason = NON_MATCH_NON_MATCHES;
  }
  if (reason !== null) {
    return {
      verdict: VERDICT_NON_MATCH,
      reason,
    };
  }

  // if it's a band
  if (scoreData.meta.matches[EXACT_MATCH] === 16) {
    return {
      verdict: VERDICT_PROFILE_MATCH,
    };
  }

  return {
    verdict: VERDICT_LEVEL_MATCH,
  };
};
