import { CALCULATORS, type Calculator } from "./calculators";

/**
 * The calculators featured on the home page (sumatlas.com/), most used first.
 * The UK list leads with the pages Search Console shows people already use.
 */
export const POPULAR_UK = [
  "/uk/tax-and-salary/salary-calculator",
  "/uk/benefits/universal-credit-taper",
  "/uk/benefits/universal-credit",
  "/uk/property/mortgage-repayment",
  "/uk/property/stamp-duty-england",
  "/uk/investing/premium-bonds",
  "/uk/students/student-loan-repayment",
  "/uk/life/pro-rata-rent",
];

export const POPULAR_US = [
  "/us/taxes/paycheck-calculator",
  "/us/taxes/federal-income-tax",
  "/us/housing/mortgage-calculator",
  "/us/housing/mortgage-affordability",
  "/us/loans/auto-loan-calculator",
  "/us/savings/401k-calculator",
  "/us/savings/compound-interest-calculator",
  "/us/savings/social-security-calculator",
];

export const POPULAR_EVERYDAY = [
  "/everyday/percentage-calculator",
  "/everyday/age-calculator",
  "/everyday/date-calculator",
  "/everyday/timesheet-decimal",
  "/everyday/discount-calculator",
  "/everyday/fuel-economy",
  "/everyday/time-calculator",
  "/everyday/average-calculator",
];

/** The calculators behind a list of paths, in order. */
export function pick(hrefs: string[]): Calculator[] {
  return hrefs.map((h) => {
    const c = CALCULATORS.find((x) => x.href === h);
    if (!c) throw new Error(`No calculator at ${h}`);
    return c;
  });
}
