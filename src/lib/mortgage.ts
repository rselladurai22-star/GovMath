/**
 * UK mortgage calculations.
 *
 * Pure functions — no tax-year coupling. Uses the standard amortisation
 * formula (PMT) for repayment mortgages and a simple multiplier-based
 * estimator for lender affordability.
 */

export type MortgageResult = {
  /** Monthly repayment (interest + capital). */
  monthlyPayment: number;
  /** Total amount repaid over the full term. */
  totalRepaid: number;
  /** Total interest paid over the full term. */
  totalInterest: number;
  /** LTV (loan / property price). 0 if price ≤ 0. */
  ltv: number;
};

/**
 * Standard repayment mortgage calculation.
 *
 *   M = P · r(1+r)^n / ((1+r)^n − 1)
 *
 * where r = monthly rate (annualRate / 12), n = months (years * 12).
 * Interest-only is a special case (rate>0, n→handled separately if needed).
 */
export function mortgageRepayment(
  loan: number,
  annualRatePct: number,
  termYears: number,
  propertyPrice = 0
): MortgageResult {
  const principal = Math.max(0, loan || 0);
  const r = Math.max(0, annualRatePct || 0) / 100 / 12;
  const n = Math.max(1, Math.round((termYears || 0) * 12));

  let monthlyPayment: number;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    const pow = Math.pow(1 + r, n);
    monthlyPayment = (principal * r * pow) / (pow - 1);
  }

  const totalRepaid = monthlyPayment * n;
  const totalInterest = totalRepaid - principal;
  const ltv = propertyPrice > 0 ? principal / propertyPrice : 0;

  return {
    monthlyPayment,
    totalRepaid,
    totalInterest,
    ltv,
  };
}

/** Yearly amortisation schedule — one row per year of the term. */
export type AmortisationRow = {
  year: number;
  interestPaid: number;
  capitalPaid: number;
  balance: number;
};

export function amortisationSchedule(
  loan: number,
  annualRatePct: number,
  termYears: number
): AmortisationRow[] {
  const principal = Math.max(0, loan || 0);
  const r = Math.max(0, annualRatePct || 0) / 100 / 12;
  const n = Math.max(1, Math.round((termYears || 0) * 12));
  const monthly =
    r === 0
      ? principal / n
      : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const rows: AmortisationRow[] = [];
  let balance = principal;
  let interestYear = 0;
  let capitalYear = 0;
  let year = 1;

  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const capital = Math.min(balance, monthly - interest);
    interestYear += interest;
    capitalYear += capital;
    balance -= capital;

    if (m % 12 === 0 || m === n) {
      rows.push({
        year,
        interestPaid: interestYear,
        capitalPaid: capitalYear,
        balance: Math.max(0, balance),
      });
      year++;
      interestYear = 0;
      capitalYear = 0;
    }
  }
  return rows;
}

/**
 * Affordability estimate. UK lenders typically cap loans at ~4.5× single
 * salary (or joint salaries combined). Returns a low/mid/high range.
 */
export function affordabilityEstimate(
  salary1: number,
  salary2 = 0
): { low: number; mid: number; high: number; combined: number } {
  const combined = Math.max(0, salary1 || 0) + Math.max(0, salary2 || 0);
  return {
    combined,
    low: combined * 4,
    mid: combined * 4.5,
    high: combined * 5,
  };
}
