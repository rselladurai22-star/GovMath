/**
 * FIRE (Financial Independence, Retire Early) — 4% rule estimator.
 *
 * The 4% safe withdrawal rate (SWR) implies a target pot = annual spend / 0.04.
 * Time to reach target depends on current pot, monthly savings, and expected
 * real return.
 */

export type FIREInput = {
  annualSpendInRetirement: number;
  currentInvested: number;
  monthlySavings: number;
  expectedRealReturnPct: number;
  swrPct?: number;
};

export type FIREResult = {
  targetPot: number;
  yearsToFI: number;
  ageNote: string;
  monthlyDrawFromPot: number;
};

export function fire(input: FIREInput): FIREResult {
  const swr = (input.swrPct ?? 4) / 100;
  const targetPot = input.annualSpendInRetirement / swr;
  const monthlyRate = (Math.max(-5, input.expectedRealReturnPct) / 100) / 12;
  const m = input.monthlySavings;
  const p0 = input.currentInvested;
  // Solve for n: P0(1+r)^n + m × ((1+r)^n − 1)/r = target
  // closed-form: n = ln((target + m/r) / (P0 + m/r)) / ln(1+r)
  let years = 0;
  if (monthlyRate === 0) {
    years = m > 0 ? (targetPot - p0) / (m * 12) : Infinity;
  } else {
    const denom = p0 + m / monthlyRate;
    const numer = targetPot + m / monthlyRate;
    if (denom <= 0 || numer / denom <= 0) {
      years = Infinity;
    } else {
      const months = Math.log(numer / denom) / Math.log(1 + monthlyRate);
      years = months / 12;
    }
  }
  return {
    targetPot,
    yearsToFI: Math.max(0, years),
    ageNote: years === Infinity ? "Saving rate too low to reach target." : "",
    monthlyDrawFromPot: input.annualSpendInRetirement / 12,
  };
}
