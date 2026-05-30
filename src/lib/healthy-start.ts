/**
 * Healthy Start Vouchers — eligibility + weekly value.
 *
 * Source: healthystart.nhs.uk
 *
 * Eligibility:
 *  - Pregnant (10+ weeks) OR child under 4
 *  - On Universal Credit with household earnings under £408/month, OR
 *    Income Support, JSA, ESA, Pension Credit (with child element), Child Tax Credit, etc.
 *  - Under 18 and pregnant — qualifies regardless of income.
 *
 * Values (2025/26):
 *  - £4.25/week during pregnancy
 *  - £8.50/week for each child under 1
 *  - £4.25/week for each child aged 1–4
 *  - Plus free vitamins from NHS clinics.
 */

export const RATES = { pregnancy: 4.25, under1: 8.50, age1to4: 4.25 };

export type HealthyStartInput = {
  pregnant: boolean;
  childrenUnder1: number;
  children1To4: number;
};

export type HealthyStartResult = {
  weekly: number;
  monthly: number;
  annual: number;
  breakdown: { label: string; amount: number }[];
};

export function healthyStart(input: HealthyStartInput): HealthyStartResult {
  const breakdown: { label: string; amount: number }[] = [];
  if (input.pregnant) breakdown.push({ label: "Pregnancy", amount: RATES.pregnancy });
  const u1 = Math.max(0, Math.floor(input.childrenUnder1));
  const c14 = Math.max(0, Math.floor(input.children1To4));
  if (u1 > 0) breakdown.push({ label: `${u1} child(ren) under 1`, amount: u1 * RATES.under1 });
  if (c14 > 0) breakdown.push({ label: `${c14} child(ren) aged 1–4`, amount: c14 * RATES.age1to4 });
  const weekly = breakdown.reduce((s, b) => s + b.amount, 0);
  return {
    weekly,
    monthly: (weekly * 52) / 12,
    annual: weekly * 52,
    breakdown,
  };
}
