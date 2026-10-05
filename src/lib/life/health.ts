/**
 * Health and NHS money: adult BMI, Healthy Start and prescription charges.
 */

/* ── BMI (adults, NHS and NICE thresholds) ─────────────────────── */

export type BmiCategory = "underweight" | "healthy" | "overweight" | "obese1" | "obese2" | "obese3";

const BMI_STANDARD = { under: 18.5, over: 25, obese: 30, obese2: 35, obese3: 40 } as const;
/** Lower thresholds for people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean family background. */
const BMI_LOWER = { under: 18.5, over: 23, obese: 27.5, obese2: 32.5, obese3: 37.5 } as const;

export type BmiResult = {
  bmi: number;
  category: BmiCategory;
  label: string;
  healthyMinKg: number;
  healthyMaxKg: number;
  /** Change in kg to reach the healthy range (negative to lose, 0 if within). */
  toHealthyKg: number;
  thresholds: typeof BMI_STANDARD | typeof BMI_LOWER;
};

const LABELS: Record<BmiCategory, string> = {
  underweight: "Underweight",
  healthy: "Healthy weight",
  overweight: "Overweight",
  obese1: "Obesity",
  obese2: "Obesity (class 2)",
  obese3: "Severe obesity",
};

export function bmiAdult(heightCm: number, weightKg: number, lowerThresholds = false): BmiResult {
  const m = Math.max(0.5, heightCm / 100);
  const w = Math.max(0, weightKg);
  const bmi = w / (m * m);
  const t = lowerThresholds ? BMI_LOWER : BMI_STANDARD;
  const category: BmiCategory =
    bmi < t.under ? "underweight" : bmi < t.over ? "healthy" : bmi < t.obese ? "overweight" : bmi < t.obese2 ? "obese1" : bmi < t.obese3 ? "obese2" : "obese3";
  const healthyMinKg = t.under * m * m;
  // The healthy range runs up to, but not including, the overweight threshold.
  const healthyMaxKg = (t.over - 0.1) * m * m;
  const toHealthyKg = w < healthyMinKg ? healthyMinKg - w : w > healthyMaxKg ? healthyMaxKg - w : 0;
  return { bmi, category, label: LABELS[category], healthyMinKg, healthyMaxKg, toHealthyKg, thresholds: t };
}

export type WaistBand = "low" | "healthy" | "increased" | "high";

/** Waist-to-height ratio (NICE): keep your waist to less than half your height. */
export function waistToHeight(waistCm: number, heightCm: number): { ratio: number; band: WaistBand } {
  const ratio = heightCm > 0 ? Math.max(0, waistCm) / heightCm : 0;
  const band: WaistBand = ratio < 0.4 ? "low" : ratio < 0.5 ? "healthy" : ratio < 0.6 ? "increased" : "high";
  return { ratio, band };
}

export const cmFromFtIn = (ft: number, inches: number) => (Math.max(0, ft) * 12 + Math.max(0, inches)) * 2.54;
export const kgFromStLb = (st: number, lb: number) => (Math.max(0, st) * 14 + Math.max(0, lb)) * 0.45359237;
export function stLbFromKg(kg: number): { st: number; lb: number } {
  const totalLb = Math.max(0, kg) / 0.45359237;
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

