/**
 * BMI per NHS healthy-weight bands.
 *  Underweight   < 18.5
 *  Healthy       18.5 – 24.9
 *  Overweight    25.0 – 29.9
 *  Obese         ≥ 30
 *
 * For people of Asian, Chinese, Middle Eastern, Black African or African-Caribbean
 * heritage, NHS uses lower thresholds: 23 (overweight), 27.5 (obese).
 */

export type BMICategory = "underweight" | "healthy" | "overweight" | "obese";

export type BMIInput = {
  heightCm: number;
  weightKg: number;
  /** Whether to use the lowered thresholds for higher-risk ethnic groups. */
  higherRiskBackground?: boolean;
};

export type BMIResult = {
  bmi: number;
  category: BMICategory;
  thresholds: { overweight: number; obese: number };
};

export function bmi(input: BMIInput): BMIResult {
  const m = input.heightCm / 100;
  const value = input.weightKg / (m * m);
  const t = input.higherRiskBackground ? { overweight: 23, obese: 27.5 } : { overweight: 25, obese: 30 };
  let category: BMICategory;
  if (value < 18.5) category = "underweight";
  else if (value < t.overweight) category = "healthy";
  else if (value < t.obese) category = "overweight";
  else category = "obese";
  return { bmi: value, category, thresholds: t };
}
