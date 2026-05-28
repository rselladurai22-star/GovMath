/**
 * Compound interest projection.
 *
 *   FV = P(1+r/n)^(n·t) + C · [((1+r/n)^(n·t) − 1) / (r/n)] · (1 + r/n)
 *
 * Where:
 *   P = starting principal
 *   C = contribution per compounding period (we accept monthly and convert)
 *   r = nominal annual rate (decimal, e.g. 0.05)
 *   n = compounds per year
 *   t = years
 *
 * For r = 0 we fall back to P + C·m where m = total contributions.
 */

export type CompoundInput = {
  principal: number;
  monthlyContribution: number;
  annualRatePct: number;
  years: number;
  /** Compounds per year (12 = monthly, 1 = annual). */
  compoundsPerYear?: number;
};

export type YearPoint = {
  year: number;
  contributions: number;
  interest: number;
  balance: number;
};

export type CompoundResult = {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  schedule: YearPoint[];
};

export function compoundInterest(input: CompoundInput): CompoundResult {
  const n = input.compoundsPerYear ?? 12;
  const t = Math.max(0, input.years);
  const r = input.annualRatePct / 100;
  const P = Math.max(0, input.principal);
  const monthly = Math.max(0, input.monthlyContribution);
  // Convert the monthly contribution to a per-compounding-period amount so
  // total yearly contributions stay constant regardless of compounding cadence.
  const C = (monthly * 12) / n;

  const schedule: YearPoint[] = [];

  // Walk year by year for a clean schedule.
  let balance = P;
  let cumulativeContribs = 0;

  for (let year = 1; year <= Math.ceil(t); year++) {
    const yearFraction = Math.min(1, t - (year - 1));
    const periodsThisYear = n * yearFraction;
    // Apply periodsThisYear periods of growth + contributions to `balance`.
    if (r === 0) {
      balance = balance + C * periodsThisYear;
    } else {
      const ratePerPeriod = r / n;
      // Closed-form for one year of compounding with end-of-period contributions:
      const growth = Math.pow(1 + ratePerPeriod, periodsThisYear);
      balance = balance * growth + C * ((growth - 1) / ratePerPeriod);
    }
    cumulativeContribs += C * periodsThisYear;
    schedule.push({
      year,
      contributions: round2(P + cumulativeContribs),
      interest: round2(balance - P - cumulativeContribs),
      balance: round2(balance),
    });
  }

  return {
    futureValue: round2(balance),
    totalContributions: round2(P + cumulativeContribs),
    totalInterest: round2(balance - P - cumulativeContribs),
    schedule,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
