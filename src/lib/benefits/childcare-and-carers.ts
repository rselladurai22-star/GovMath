/**
 * Tax-Free Childcare and Carer's Allowance helpers (2025/26).
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

// Carer's Allowance: £83.30/week (2025/26), earnings limit £196/week (after allowed deductions).
export const CA_WEEKLY_2025 = 83.30;
export const CA_EARNINGS_LIMIT_2025 = 196;

export function carersAllowanceCheck(weeklyEarnings: number) {
  const eligible = weeklyEarnings <= CA_EARNINGS_LIMIT_2025;
  return {
    weeklyEarnings,
    earningsLimit: CA_EARNINGS_LIMIT_2025,
    eligible,
    weeklyPay: eligible ? CA_WEEKLY_2025 : 0,
    annualPay: eligible ? CA_WEEKLY_2025 * 52 : 0,
    excess: Math.max(0, weeklyEarnings - CA_EARNINGS_LIMIT_2025),
  };
}
