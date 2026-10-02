/**
 * Tax-Free Childcare and Carer's Allowance helpers (2026/27).
 */

// Tax-Free Childcare: parent pays £8 → gov adds £2 (top-up = 25% of gross spend),
// up to £2,000/year per child, or £4,000/year for disabled children.
export function taxFreeChildcare(annualSpend: number, disabled = false) {
  const cap = disabled ? 4_000 : 2_000;
  const topUp = Math.min(cap, annualSpend * 0.25);
  return {
    parentPays: annualSpend - topUp,
    govTopUp: topUp,
    cap,
    atCap: topUp >= cap,
  };
}

// Carer's Allowance: £86.45/week (2026/27), earnings limit £204/week (after allowed deductions).
export const CA_WEEKLY_2026 = 86.45;
export const CA_EARNINGS_LIMIT_2026 = 204;

export function carersAllowanceCheck(weeklyEarnings: number) {
  const eligible = weeklyEarnings <= CA_EARNINGS_LIMIT_2026;
  return {
    weeklyEarnings,
    earningsLimit: CA_EARNINGS_LIMIT_2026,
    eligible,
    weeklyPay: eligible ? CA_WEEKLY_2026 : 0,
    annualPay: eligible ? CA_WEEKLY_2026 * 52 : 0,
    excess: Math.max(0, weeklyEarnings - CA_EARNINGS_LIMIT_2026),
  };
}
