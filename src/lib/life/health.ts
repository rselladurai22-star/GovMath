/**
 * Health and NHS money: adult BMI, Healthy Start and prescription charges.
 */

/* ── BMI (adults, NHS and NICE thresholds) ─────────────────────── */

export type BmiCategory = "underweight" | "healthy" | "overweight" | "obese1" | "obese2" | "obese3";

/**
 * Each range starts at its threshold and runs up to, but not including, the next one (WHO and CDC: a healthy
 * weight is 18.5 to less than 25), which the NHS writes as "18.5 to 24.9".
 */
const BMI_STANDARD = { under: 18.5, over: 25, obese: 30, obese2: 35, obese3: 40 } as const;
/** Lower thresholds for people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean family background. */
const BMI_LOWER = { under: 18.5, over: 23, obese: 27.5, obese2: 32.5, obese3: 37.5 } as const;

export type BmiThresholds = typeof BMI_STANDARD | typeof BMI_LOWER;

/** One pound in kg (exact). Pass it as the step when weights are shown in pounds or in stones and pounds. */
export const KG_PER_LB = 0.45359237;

export type BmiResult = {
  /** BMI, unrounded. */
  bmi: number;
  /** BMI to one decimal place as it should be shown: see bmiShown(). */
  bmiShown: number;
  category: BmiCategory;
  label: string;
  /** Lowest weight with a healthy BMI, in whole steps (0.1 kg or a pound), rounded up so it is itself healthy. */
  healthyMinKg: number;
  /** Highest weight with a healthy BMI, in whole steps, rounded down so it is itself healthy; one step more is not. */
  healthyMaxKg: number;
  /**
   * Change in kg to reach the healthy range shown (positive to gain, negative to lose), in whole steps rounded
   * away from zero. 0 only when the BMI is in the healthy range, and at least one step otherwise.
   */
  toHealthyKg: number;
  thresholds: BmiThresholds;
};

const LABELS: Record<BmiCategory, string> = {
  underweight: "Underweight",
  healthy: "Healthy weight",
  overweight: "Overweight",
  obese1: "Obesity",
  obese2: "Obesity (class 2)",
  obese3: "Severe obesity",
};

/** Drops floating-point noise, so a weight exactly on a boundary lands on it (64 kg at 160 cm is a BMI of 25, not 24.999999999999996). */
const clean = (x: number) => Math.round(x * 1e9) / 1e9;
const metres = (heightCm: number) => Math.max(0.5, heightCm / 100);
const bmiAt = (kg: number, m: number) => clean(Math.max(0, kg) / (m * m));
const stepWeight = (steps: number, stepKg: number) => clean(steps * stepKg);

function categoryOf(bmi: number, t: BmiThresholds): BmiCategory {
  return bmi < t.under ? "underweight" : bmi < t.over ? "healthy" : bmi < t.obese ? "overweight" : bmi < t.obese2 ? "obese1" : bmi < t.obese3 ? "obese2" : "obese3";
}

/** The fewest whole steps of `stepKg` whose weight has a BMI of `bmi` or more, checked with the same test that sets the category. */
function firstStepAtOrAbove(m: number, bmi: number, stepKg: number): number {
  let k = Math.max(0, Math.ceil(clean((bmi * m * m) / stepKg)));
  while (k > 0 && bmiAt(stepWeight(k - 1, stepKg), m) >= bmi) k--;
  while (bmiAt(stepWeight(k, stepKg), m) < bmi) k++;
  return k;
}

/**
 * The weights for a BMI range at this height, in whole steps of `stepKg` (0.1 kg, or KG_PER_LB when weights are
 * shown in pounds or stones): `minKg` is the lowest with a BMI of `fromBmi` or more (rounded up), `maxKg` the
 * highest with a BMI below `toBmi` (rounded down). Both are inside the range; one step outside either is not.
 * `fromBmi` 0 gives a minimum of 0, and `toBmi` Infinity a maximum of Infinity.
 */
export function bmiWeightRange(heightCm: number, fromBmi: number, toBmi: number, stepKg = 0.1): { minKg: number; maxKg: number } {
  const m = metres(heightCm);
  const minKg = fromBmi > 0 ? stepWeight(firstStepAtOrAbove(m, fromBmi, stepKg), stepKg) : 0;
  const maxKg = Number.isFinite(toBmi) ? stepWeight(firstStepAtOrAbove(m, toBmi, stepKg) - 1, stepKg) : Infinity;
  return { minKg, maxKg };
}

/**
 * BMI to one decimal place, as shown: rounded as usual, but never up into the next range. The ranges are
 * written "18.5 to 24.9", "25 to 29.9" and so on, so a BMI of 24.96 (below 25, a healthy weight) shows as 24.9
 * rather than 25.0, and 18.47 (underweight) as 18.4 rather than 18.5.
 */
export function bmiShown(bmi: number, t: BmiThresholds = BMI_STANDARD): number {
  const rounded = Number(bmi.toFixed(1));
  const next = Math.min(...Object.values(t).filter((x) => x > bmi));
  return rounded >= next ? Math.floor(clean(bmi * 10)) / 10 : rounded;
}

/**
 * Adult BMI. `stepKg` is the precision the healthy weights are shown to: 0.1 kg (the default), or KG_PER_LB
 * for pounds and for stones and pounds. The limits are rounded inwards, so each one shown is itself a healthy
 * weight.
 */
export function bmiAdult(heightCm: number, weightKg: number, lowerThresholds = false, stepKg = 0.1): BmiResult {
  const m = metres(heightCm);
  const w = Math.max(0, weightKg);
  const bmi = bmiAt(w, m);
  const t = lowerThresholds ? BMI_LOWER : BMI_STANDARD;
  const category = categoryOf(bmi, t);
  const { minKg: healthyMinKg, maxKg: healthyMaxKg } = bmiWeightRange(heightCm, t.under, t.over, stepKg);
  // At least one step whenever the BMI is outside the healthy range, so the change is never shown as 0.
  const steps = (kg: number) => Math.max(1, Math.ceil(clean(kg / stepKg)));
  const toHealthyKg =
    category === "underweight" ? stepWeight(steps(healthyMinKg - w), stepKg) : category === "healthy" ? 0 : -stepWeight(steps(w - healthyMaxKg), stepKg);
  return { bmi, bmiShown: bmiShown(bmi, t), category, label: LABELS[category], healthyMinKg, healthyMaxKg, toHealthyKg, thresholds: t };
}

export type WaistBand = "low" | "healthy" | "increased" | "high";

/** Waist-to-height ratio (NICE): keep your waist to less than half your height. */
export function waistToHeight(waistCm: number, heightCm: number): { ratio: number; band: WaistBand } {
  const ratio = heightCm > 0 ? Math.max(0, waistCm) / heightCm : 0;
  const band: WaistBand = ratio < 0.4 ? "low" : ratio < 0.5 ? "healthy" : ratio < 0.6 ? "increased" : "high";
  return { ratio, band };
}

export const cmFromFtIn = (ft: number, inches: number) => (Math.max(0, ft) * 12 + Math.max(0, inches)) * 2.54;
export const kgFromStLb = (st: number, lb: number) => (Math.max(0, st) * 14 + Math.max(0, lb)) * KG_PER_LB;
export function stLbFromKg(kg: number): { st: number; lb: number } {
  const totalLb = Math.max(0, kg) / KG_PER_LB;
  let st = Math.floor(totalLb / 14);
  let lb = Math.round(totalLb - st * 14);
  if (lb === 14) {
    st += 1;
    lb = 0;
  }
  return { st, lb };
}

/* ── Healthy Start (from April 2026) ───────────────────────────── */

export const HEALTHY_START = { pregnancy: 4.65, under1: 9.3, age1to4: 4.65, ucEarningsLimit: 408, pregnancyFromWeek: 10 } as const;

export type HsQualify = {
  /** On Universal Credit with family take-home pay of £408 a month or less. */
  ucLowEarnings: boolean;
  /** Income Support, income-based JSA, or Pension Credit with a child addition. */
  otherBenefit: boolean;
  /** Income-related ESA (pregnancy only). */
  esa: boolean;
  under18: boolean;
  pregnant: boolean;
  hasChildUnder4: boolean;
};

export function healthyStartEligible(q: HsQualify): boolean {
  if (q.pregnant && q.under18) return true;
  if (!q.pregnant && !q.hasChildUnder4) return false;
  if (q.ucLowEarnings || q.otherBenefit) return true;
  return q.esa && q.pregnant;
}

/**
 * Healthy Start money over the next `weeks` weeks.
 * childAgesMonths: each child's age now, in whole months.
 * pregnancyWeeks: weeks pregnant now (0 if not pregnant).
 */
export function healthyStartOver(weeks: number, childAgesMonths: number[], pregnancyWeeks: number): { total: number; weekly: number[] } {
  const weekly: number[] = [];
  const WEEKS_PER_MONTH = 52 / 12;
  for (let w = 0; w < weeks; w++) {
    let amt = 0;
    for (const a of childAgesMonths) {
      const months = a + w / WEEKS_PER_MONTH;
      if (months < 12) amt += HEALTHY_START.under1;
      else if (months < 48) amt += HEALTHY_START.age1to4;
    }
    if (pregnancyWeeks > 0) {
      const pw = pregnancyWeeks + w;
      // Pregnancy payments from week 10 until birth (taken as week 40), then the baby's under-1 rate.
      if (pw >= HEALTHY_START.pregnancyFromWeek && pw < 40) amt += HEALTHY_START.pregnancy;
      else if (pw >= 40) {
        const babyMonths = (pw - 40) / WEEKS_PER_MONTH;
        if (babyMonths < 12) amt += HEALTHY_START.under1;
        else if (babyMonths < 48) amt += HEALTHY_START.age1to4;
      }
    }
    weekly.push(amt);
  }
  return { total: weekly.reduce((a, b) => a + b, 0), weekly };
}

/* ── NHS prescription charges, England 2026/27 ─────────────────── */

export const PRESCRIPTION = { item: 9.9, ppc3: 32.05, ppc12: 114.5, ppc12Instalment: 11.45, hrtPpc: 19.8 } as const;

export type PrescriptionPlan = { key: "payg" | "ppc3" | "ppc12" | "hrt-mix"; label: string; annual: number };

/**
 * Yearly cost of each way to pay, for items a month (non-HRT) and HRT items a
 * month (covered by the HRT PPC when bought for those).
 */
export function prescriptionPlans(itemsPerMonth: number, hrtItemsPerMonth = 0): PrescriptionPlan[] {
  const other = Math.max(0, itemsPerMonth) * 12;
  const hrt = Math.max(0, hrtItemsPerMonth) * 12;
  const all = other + hrt;
  const plans: PrescriptionPlan[] = [
    { key: "payg", label: "Pay per item", annual: all * PRESCRIPTION.item },
    { key: "ppc3", label: "3-month PPC × 4", annual: all > 0 ? PRESCRIPTION.ppc3 * 4 : 0 },
    { key: "ppc12", label: "12-month PPC", annual: all > 0 ? PRESCRIPTION.ppc12 : 0 },
  ];
  if (hrt > 0) plans.push({ key: "hrt-mix", label: "HRT PPC, other items paid", annual: PRESCRIPTION.hrtPpc + other * PRESCRIPTION.item });
  return plans;
}

export function bestPrescriptionPlan(itemsPerMonth: number, hrtItemsPerMonth = 0): PrescriptionPlan {
  return prescriptionPlans(itemsPerMonth, hrtItemsPerMonth).reduce((a, b) => (b.annual < a.annual - 0.001 ? b : a));
}

