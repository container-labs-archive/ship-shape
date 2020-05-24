// @flow

import type { FactorData } from 'Types';

type Props = {
  name: string,
  evidenceString: string,
  score: number,
  factor: string,
  panelScore: number,
  profileScore: number,
  factorDescription: string,
  classes: Object,
  index: number,
  singleFactorData: FactorData,

  // job state
  isEvaluation: boolean,

  // status
  isReject: boolean,
  isConsistency: boolean,
  isAppeal: boolean,
}

type State = {
  openDescription: boolean,
}

export type {
  Props,
  State,
};
