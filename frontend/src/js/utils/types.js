// @flow

import type { ApolloCurrentResult, ApolloError } from '../../../flow-typed/npm/react-apollo_v2.x.x';

type ApolloQuery = ApolloCurrentResult;

type BandMeta = {
  bandMatch: boolean,
  band: number,
  min: number,
  max: number,
  index: number,
}

type VerdictMeta = {
  verdict: string,
  reason: string,
}

type ScoreMeta = {
  matches: Object,
  complete: boolean,
  total: number,
  totalVariants: number,
  nonMatches: number,
  band: string,
  verdict: VerdictMeta,
  band: BandMeta,
}

type FactorData = {
  match: string,
  score: number,
}

type FactorObject = {
  factor1: FactorData,
  factor2: FactorData,
}

type ScoreData = {
  factors: FactorObject,
  meta: ScoreMeta,
  total: number,
}

type ApolloMutation = {
  variables: Object,
}

type Verdict = {
  verdict: string,
  reason: string,
}

export type {
  Verdict,
  ScoreMeta,
  ScoreData,
  ApolloQuery,
  ApolloMutation,
  ApolloError,
};
