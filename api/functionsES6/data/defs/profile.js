const profileDefs = `
type Profile {
  key: String!
  isArchived: Boolean
  userId: String
  createDate: String
  title: String
  job_statement: String
  total_score_min: String
  total_score_max: String
  pay_band_max: String
  pay_band_min: String
  pay_band_max_states: String
  pay_band_min_states: String


  factor_1_info_1: String
  factor_1_info_2: String
  factor_1_level: String
  factor_1_letter: String
  factor_1_je_score: String
  factor_1_max: String


  factor_2_info_1: String
  factor_2_info_2: String
  factor_2_level: String
  factor_2_letter: String
  factor_2_je_score: String
  factor_2_max: String


  factor_3_info_1: String
  factor_3_info_2: String
  factor_3_level: String
  factor_3_letter: String
  factor_3_je_score: String
  factor_3_max: String


  factor_4_info_1: String
  factor_4_info_2: String
  factor_4_level: String
  factor_4_letter: String
  factor_4_je_score: String
  factor_4_max: String


  factor_5_info_1: String
  factor_5_info_2: String
  factor_5_level: String
  factor_5_letter: String
  factor_5_je_score: String
  factor_5_max: String


  factor_6_info_1: String
  factor_6_info_2: String
  factor_6_level: String
  factor_6_letter: String
  factor_6_je_score: String
  factor_6_max: String


  factor_7_info_1: String
  factor_7_info_2: String
  factor_7_level: String
  factor_7_letter: String
  factor_7_je_score: String
  factor_7_max: String


  factor_8_info_1: String
  factor_8_info_2: String
  factor_8_level: String
  factor_8_letter: String
  factor_8_je_score: String
  factor_8_max: String


  factor_9_info_1: String
  factor_9_info_2: String
  factor_9_level: String
  factor_9_letter: String
  factor_9_je_score: String
  factor_9_max: String


  factor_10_info_1: String
  factor_10_info_2: String
  factor_10_level: String
  factor_10_letter: String
  factor_10_je_score: String
  factor_10_max: String


  factor_11_info_1: String
  factor_11_info_2: String
  factor_11_level: String
  factor_11_letter: String
  factor_11_je_score: String
  factor_11_max: String


  factor_12_info_1: String
  factor_12_info_2: String
  factor_12_level: String
  factor_12_letter: String
  factor_12_je_score: String
  factor_12_max: String


  factor_13_info_1: String
  factor_13_info_2: String
  factor_13_level: String
  factor_13_letter: String
  factor_13_je_score: String
  factor_13_max: String


  factor_14_info_1: String
  factor_14_info_2: String
  factor_14_level: String
  factor_14_letter: String
  factor_14_je_score: String
  factor_14_max: String


  factor_15_info_1: String
  factor_15_info_2: String
  factor_15_level: String
  factor_15_letter: String
  factor_15_je_score: String
  factor_15_max: String


  factor_16_info_1: String
  factor_16_info_2: String
  factor_16_level: String
  factor_16_letter: String
  factor_16_je_score: String
  factor_16_max: String

  factor_1_description: String
  factor_2_description: String
  factor_3_description: String
  factor_4_description: String
  factor_5_description: String
  factor_6_description: String
  factor_7_description: String
  factor_8_description: String
  factor_9_description: String
  factor_10_description: String
  factor_11_description: String
  factor_12_description: String
  factor_13_description: String
  factor_14_description: String
  factor_15_description: String
  factor_16_description: String
}

input ProfileInput {
  isArchived: Boolean
  title: String
  userId: String
  job_statement: String
  total_score_min: String
  total_score_max: String
  pay_band_max: String
  pay_band_min: String
  pay_band_max_states: String
  pay_band_min_states: String

  factor_1_info_1: String
  factor_1_info_2: String
  factor_1_level: String
  factor_1_letter: String
  factor_1_je_score: String
  factor_1_max: String


  factor_2_info_1: String
  factor_2_info_2: String
  factor_2_level: String
  factor_2_letter: String
  factor_2_je_score: String
  factor_2_max: String


  factor_3_info_1: String
  factor_3_info_2: String
  factor_3_level: String
  factor_3_letter: String
  factor_3_je_score: String
  factor_3_max: String


  factor_4_info_1: String
  factor_4_info_2: String
  factor_4_level: String
  factor_4_letter: String
  factor_4_je_score: String
  factor_4_max: String


  factor_5_info_1: String
  factor_5_info_2: String
  factor_5_level: String
  factor_5_letter: String
  factor_5_je_score: String
  factor_5_max: String


  factor_6_info_1: String
  factor_6_info_2: String
  factor_6_level: String
  factor_6_letter: String
  factor_6_je_score: String
  factor_6_max: String


  factor_7_info_1: String
  factor_7_info_2: String
  factor_7_level: String
  factor_7_letter: String
  factor_7_je_score: String
  factor_7_max: String


  factor_8_info_1: String
  factor_8_info_2: String
  factor_8_level: String
  factor_8_letter: String
  factor_8_je_score: String
  factor_8_max: String


  factor_9_info_1: String
  factor_9_info_2: String
  factor_9_level: String
  factor_9_letter: String
  factor_9_je_score: String
  factor_9_max: String


  factor_10_info_1: String
  factor_10_info_2: String
  factor_10_level: String
  factor_10_letter: String
  factor_10_je_score: String
  factor_10_max: String


  factor_11_info_1: String
  factor_11_info_2: String
  factor_11_level: String
  factor_11_letter: String
  factor_11_je_score: String
  factor_11_max: String


  factor_12_info_1: String
  factor_12_info_2: String
  factor_12_level: String
  factor_12_letter: String
  factor_12_je_score: String
  factor_12_max: String


  factor_13_info_1: String
  factor_13_info_2: String
  factor_13_level: String
  factor_13_letter: String
  factor_13_je_score: String
  factor_13_max: String


  factor_14_info_1: String
  factor_14_info_2: String
  factor_14_level: String
  factor_14_letter: String
  factor_14_je_score: String
  factor_14_max: String


  factor_15_info_1: String
  factor_15_info_2: String
  factor_15_level: String
  factor_15_letter: String
  factor_15_je_score: String
  factor_15_max: String


  factor_16_info_1: String
  factor_16_info_2: String
  factor_16_level: String
  factor_16_letter: String
  factor_16_je_score: String
  factor_16_max: String


  factor_1_description: String
  factor_2_description: String
  factor_3_description: String
  factor_4_description: String
  factor_5_description: String
  factor_6_description: String
  factor_7_description: String
  factor_8_description: String
  factor_9_description: String
  factor_10_description: String
  factor_11_description: String
  factor_12_description: String
  factor_13_description: String
  factor_14_description: String
  factor_15_description: String
  factor_16_description: String
}

input ProfileUpdateInput {
  key: String!
  isArchived: Boolean
  title: String
  userId: String
  job_statement: String
  total_score_min: String
  total_score_max: String
  pay_band_max: String
  pay_band_min: String
  pay_band_max_states: String
  pay_band_min_states: String

  factor_1_info_1: String
  factor_1_info_2: String
  factor_1_level: String
  factor_1_letter: String
  factor_1_je_score: String
  factor_1_max: String


  factor_2_info_1: String
  factor_2_info_2: String
  factor_2_level: String
  factor_2_letter: String
  factor_2_je_score: String
  factor_2_max: String


  factor_3_info_1: String
  factor_3_info_2: String
  factor_3_level: String
  factor_3_letter: String
  factor_3_je_score: String
  factor_3_max: String


  factor_4_info_1: String
  factor_4_info_2: String
  factor_4_level: String
  factor_4_letter: String
  factor_4_je_score: String
  factor_4_max: String


  factor_5_info_1: String
  factor_5_info_2: String
  factor_5_level: String
  factor_5_letter: String
  factor_5_je_score: String
  factor_5_max: String


  factor_6_info_1: String
  factor_6_info_2: String
  factor_6_level: String
  factor_6_letter: String
  factor_6_je_score: String
  factor_6_max: String


  factor_7_info_1: String
  factor_7_info_2: String
  factor_7_level: String
  factor_7_letter: String
  factor_7_je_score: String
  factor_7_max: String


  factor_8_info_1: String
  factor_8_info_2: String
  factor_8_level: String
  factor_8_letter: String
  factor_8_je_score: String
  factor_8_max: String


  factor_9_info_1: String
  factor_9_info_2: String
  factor_9_level: String
  factor_9_letter: String
  factor_9_je_score: String
  factor_9_max: String


  factor_10_info_1: String
  factor_10_info_2: String
  factor_10_level: String
  factor_10_letter: String
  factor_10_je_score: String
  factor_10_max: String


  factor_11_info_1: String
  factor_11_info_2: String
  factor_11_level: String
  factor_11_letter: String
  factor_11_je_score: String
  factor_11_max: String


  factor_12_info_1: String
  factor_12_info_2: String
  factor_12_level: String
  factor_12_letter: String
  factor_12_je_score: String
  factor_12_max: String


  factor_13_info_1: String
  factor_13_info_2: String
  factor_13_level: String
  factor_13_letter: String
  factor_13_je_score: String
  factor_13_max: String


  factor_14_info_1: String
  factor_14_info_2: String
  factor_14_level: String
  factor_14_letter: String
  factor_14_je_score: String
  factor_14_max: String


  factor_15_info_1: String
  factor_15_info_2: String
  factor_15_level: String
  factor_15_letter: String
  factor_15_je_score: String
  factor_15_max: String


  factor_16_info_1: String
  factor_16_info_2: String
  factor_16_level: String
  factor_16_letter: String
  factor_16_je_score: String
  factor_16_max: String


  factor_1_description: String
  factor_2_description: String
  factor_3_description: String
  factor_4_description: String
  factor_5_description: String
  factor_6_description: String
  factor_7_description: String
  factor_8_description: String
  factor_9_description: String
  factor_10_description: String
  factor_11_description: String
  factor_12_description: String
  factor_13_description: String
  factor_14_description: String
  factor_15_description: String
  factor_16_description: String
}
`;

export default profileDefs;
