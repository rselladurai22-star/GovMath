/**
 * EV Salary Sacrifice — net monthly cost calculation.
 *
 * Mechanism:
 *   - Gross monthly lease fee is sacrificed from your gross salary.
 *   - You save Income Tax + employee NI at your marginal rate on the sacrificed amount.
 *   - You pay Benefit-in-Kind (BIK) tax on the car at the appropriate BIK %.
 *   - BIK rate for EVs: 3% in 2025/26, rising 1% per year to 9% by 2029/30.
 *
 * Net monthly cost = gross sacrifice × (1 − marginal rate)
 *                  + (P11D value × BIK % × marginal rate) ÷ 12
 *
 * "Marginal rate" here means Income Tax + employee NI combined.
 */

export const EV_BIK_2025_26 = {
  bikRatePct: 3,
  futureRates: {
    "2025/26": 3,
    "2026/27": 4,
    "2027/28": 5,
    "2028/29": 7,
    "2029/30": 9,
  } as const,
} as const;

export type EVSalSacInput = {
  /** Gross monthly lease fee, including VAT. */
  grossMonthlyLease: number;
  /** P11D value of the car (list price including options + VAT, less first registration fee). */
  p11d: number;
  /** Income Tax rate as a decimal (0.2, 0.4, 0.45). */
  incomeTaxRate: number;
  /** Employee NI rate as a decimal (0.08 main band, 0.02 upper). */
  niRate: number;
  /** BIK percentage to apply, e.g. 3 for 2025/26. */
  bikRatePct?: number;
};

export type EVSalSacResult = {
  grossMonthly: number;
  marginalRate: number;
  taxSaving: number;
  bikAnnual: number;
  bikMonthly: number;
  netMonthly: number;
  netAnnual: number;
  /** Net monthly cost if you bought the lease privately (no sacrifice). */
  privateMonthly: number;
  /** Annual saving vs paying out of net pay. */
  annualSavingVsPrivate: number;
};

export function evSalarySacrifice(input: EVSalSacInput): EVSalSacResult {
  const bikRate = (input.bikRatePct ?? EV_BIK_2025_26.bikRatePct) / 100;
  const marginal = input.incomeTaxRate + input.niRate;

  const grossAnnual = input.grossMonthlyLease * 12;
  const taxSaving = grossAnnual * marginal;
  const bikAnnual = input.p11d * bikRate * input.incomeTaxRate;
  const netAnnual = grossAnnual - taxSaving + bikAnnual;
  const netMonthly = netAnnual / 12;

  // To buy the same lease out of net pay you'd need grossAnnual / (1 - marginal)
  // gross, but more usefully: the lease itself costs grossAnnual from your net pay.
  const privateMonthly = input.grossMonthlyLease;

  return {
    grossMonthly: input.grossMonthlyLease,
    marginalRate: marginal,
    taxSaving,
    bikAnnual,
    bikMonthly: bikAnnual / 12,
    netMonthly,
    netAnnual,
    privateMonthly,
    annualSavingVsPrivate: privateMonthly * 12 - netAnnual,
  };
}
