// @flow

import Config from 'Config';

const scoreBands = [
  {
    band: '1',
    min: 0,
    max: 160,
    index: 0,
  },
  {
    band: '2',
    min: 161,
    max: 215,
    index: 1,
  },
  {
    band: '3',
    min: 216,
    max: 270,
    index: 2,
  },
  {
    band: '4',
    min: 271,
    max: 325,
    index: 3,
  },
  {
    band: '5',
    min: 326,
    max: 395,
    index: 4,
  },
  {
    band: '6',
    min: 396,
    max: 465,
    index: 5,
  },
  {
    band: '7',
    min: 466,
    max: 539,
    index: 6,
  },
  {
    band: '8a',
    min: 540,
    max: 584,
    index: 7,
  },
  {
    band: '8b',
    min: 585,
    max: 629,
    index: 8,
  },
  {
    band: '8c',
    min: 630,
    max: 674,
    index: 9,
  },
  {
    band: '8d',
    min: 675,
    max: 720,
    index: 10,
  },
  {
    band: '9',
    min: 721,
    max: 765,
    index: 11,
  },
];

const scoreBandsByAccount = [
  {
    band: 'A',
    min: 86,
    max: 160,
    index: 0,
  },
  {
    band: 'B',
    min: 161,
    max: 215,
    index: 1,
  },
  {
    band: 'C',
    min: 216,
    max: 270,
    index: 2,
  },
  {
    band: 'D',
    min: 271,
    max: 325,
    index: 3,
  },
  {
    band: 'E',
    min: 326,
    max: 395,
    index: 4,
  },
  {
    band: 'F',
    min: 396,
    max: 465,
    index: 5,
  },
  {
    band: 'G',
    min: 466,
    max: 539,
    index: 6,
  },
  {
    band: 'H',
    min: 540,
    max: 600,
    index: 7,
  },
  {
    band: 'I',
    min: 601,
    max: 660,
    index: 8,
  },
  {
    band: 'J',
    min: 661,
    max: 765,
    index: 9,
  },
];

const invalidBand = {
  band: '0',
  index: -1,
};

const bandFromScore = (score, accountId) => {
  let bandHash = null;
  let theBands = scoreBands;

  if (accountId && accountId === Config.statesAccount) {
    theBands = scoreBandsByAccount;
  }
  theBands.forEach((hash) => {
    if (hash.max >= score && hash.min <= score) {
      bandHash = hash;
    }
  });

  return bandHash || invalidBand;
};

const bandById = (id, accountId) => {
  if (id === undefined) {
    return null;
  }

  let bandHash = null;
  let theBands = scoreBands;

  if (accountId && accountId === Config.statesAccount) {
    theBands = scoreBandsByAccount;
  }
  theBands.forEach((hash) => {
    // NOTE: THIS HAS TO STAY AS A DOUBLE EQUAL SINCE WE HAVE MIXED TYPES FOR BANDS
    if (hash.band == id) {
      bandHash = hash;
    }
  });

  return bandHash || invalidBand;
};

const getBand = (profile, data, accountId) => {
  let payBandMax;
  let payBandMin;

  if (profile) {
    payBandMax = profile.pay_band_max;
    payBandMin = profile.pay_band_min;

    if (accountId && accountId === Config.statesAccount) {
      payBandMax = profile.pay_band_max_states;
      payBandMin = profile.pay_band_min_states;
    }
  }

  if (payBandMin === '' || payBandMin === undefined) {
    payBandMin = payBandMax;
  }
  const profileBandMax = bandById(payBandMax, accountId);
  const profileBandMin = bandById(payBandMin, accountId);
  let profileBandMaxIndex = null;
  let profileBandMinIndex = null;

  const bandFromPanel = bandFromScore(data.meta.total, accountId);
  let bandMatch = false;
  if (profile) {
    bandMatch = bandFromPanel.index >= profileBandMin.index && bandFromPanel.index <= profileBandMax.index;
    profileBandMaxIndex = profileBandMax.index;
    profileBandMinIndex = profileBandMin.index;
  }

  return {
    bandMatch,
    ...bandFromPanel,
    profileBandMin: profileBandMinIndex,
    profileBandMax: profileBandMaxIndex,
    payBandMin,
    payBandMax,
  };
};

export default getBand;
