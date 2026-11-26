/**
 * Healthy Start: who qualifies and the weekly card payments.
 */

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
 * A claim that covers the pregnancy only, with nothing for children: a
 * pregnant under-18 with no qualifying benefit, or someone on income-related
 * ESA alone. NHS Healthy Start: under-18s "qualify until your baby is born",
 * and an ESA claim made while pregnant "will end when your baby is born".
 */
export function healthyStartPregnancyOnly(q: HsQualify): boolean {
  return q.pregnant && !q.ucLowEarnings && !q.otherBenefit && (q.esa || q.under18);
}

/**
 * Healthy Start money over the next `weeks` weeks.
 * childAgesMonths: each child's age now, in whole months.
 * pregnancyWeeks: weeks pregnant now (0 if not pregnant).
 * pregnancyOnly: the claim covers the pregnancy alone (see healthyStartPregnancyOnly).
 */
export function healthyStartOver(weeks: number, childAgesMonths: number[], pregnancyWeeks: number, pregnancyOnly = false): { total: number; weekly: number[] } {
  const weekly: number[] = [];
  const WEEKS_PER_MONTH = 52 / 12;
  for (let w = 0; w < weeks; w++) {
    let amt = 0;
    for (const a of pregnancyOnly ? [] : childAgesMonths) {
      const months = a + w / WEEKS_PER_MONTH;
      if (months < 12) amt += HEALTHY_START.under1;
      else if (months < 48) amt += HEALTHY_START.age1to4;
    }
    if (pregnancyWeeks > 0) {
      const pw = pregnancyWeeks + w;
      // Pregnancy payments from week 10 until birth (taken as week 40), then the baby's under-1 rate.
      if (pw >= HEALTHY_START.pregnancyFromWeek && pw < 40) amt += HEALTHY_START.pregnancy;
      else if (pw >= 40 && !pregnancyOnly) {
        const babyMonths = (pw - 40) / WEEKS_PER_MONTH;
        if (babyMonths < 12) amt += HEALTHY_START.under1;
        else if (babyMonths < 48) amt += HEALTHY_START.age1to4;
      }
    }
    weekly.push(amt);
  }
  return { total: weekly.reduce((a, b) => a + b, 0), weekly };
}
