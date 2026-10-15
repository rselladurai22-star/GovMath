/**
 * hreflang: UK and US pages that answer the same question with each
 * country's own rules (October 2026). Google uses the pairs to show British
 * searchers the UK page and American searchers the US page when either one
 * ranks. Both pages of a pair carry the same two tags (en-GB and en-US), so
 * the tags are reciprocal and each page lists itself, as Google requires.
 *
 * Only pairs with the same intent are listed. Left out on purpose because
 * they ask different questions: VAT vs sales tax, Plan 2 vs US student
 * loans, Junior ISA vs 529, moving costs vs closing costs, State Pension age
 * vs Social Security.
 */

/** [UK page, US page]. */
export const HREFLANG_PAIRS: readonly (readonly [string, string])[] = [
  ["/uk/tax-and-salary/salary-calculator", "/us/taxes/paycheck-calculator"],
  ["/uk/tax-and-salary/tax-bracket-checker", "/us/taxes/tax-bracket-calculator"],
  ["/uk/tax-and-salary/hourly-to-salary", "/us/taxes/salary-to-hourly"],
  ["/uk/tax-and-salary/overtime", "/us/taxes/overtime-calculator"],
  ["/uk/tax-and-salary/bonus-tax", "/us/taxes/bonus-tax-calculator"],
  ["/uk/tax-and-salary/pay-rise", "/us/taxes/raise-calculator"],
  ["/uk/business/sole-trader-tax", "/us/taxes/self-employment-tax"],
  ["/uk/business/employer-ni-costs", "/us/taxes/payroll-tax-calculator"],
  ["/uk/investing/capital-gains-assets", "/us/taxes/capital-gains-tax"],
  ["/uk/life/inheritance-tax", "/us/taxes/estate-tax-calculator"],
  ["/uk/property/mortgage-repayment", "/us/housing/mortgage-calculator"],
  ["/uk/property/mortgage-affordability", "/us/housing/mortgage-affordability"],
  ["/uk/property/mortgage-overpayment", "/us/housing/mortgage-payoff-calculator"],
  ["/uk/property/remortgage", "/us/housing/refinance-calculator"],
  ["/uk/property/rent-vs-buy", "/us/housing/rent-vs-buy-calculator"],
  ["/uk/property/buy-to-let-yield", "/us/housing/rental-property-calculator"],
  ["/uk/vehicles/car-finance", "/us/loans/auto-loan-calculator"],
  ["/uk/investing/compound-interest", "/us/savings/compound-interest-calculator"],
  ["/uk/investing/fire-calculator", "/us/savings/fire-calculator"],
  ["/uk/investing/inflation-impact", "/us/savings/inflation-calculator"],
  ["/uk/investing/annuity", "/us/savings/annuity-calculator"],
  ["/uk/investing/pension-drawdown", "/us/savings/retirement-withdrawal-calculator"],
  ["/uk/investing/workplace-pension", "/us/savings/401k-calculator"],
  ["/uk/investing/savings-interest", "/us/savings/high-yield-savings-calculator"],
];

/** The two country homes; "/" lets each visitor choose theirs, so it is the x-default. */
const HUBS = { "en-GB": "/uk", "en-US": "/us", "x-default": "/" } as const;

export type Alternates = { canonical: string; languages?: Record<string, string> };

/** The page's hreflang tags, or undefined when it has no other-country twin. */
export function hreflangFor(path: string): Record<string, string> | undefined {
  if (path === HUBS["en-GB"] || path === HUBS["en-US"] || path === HUBS["x-default"]) return { ...HUBS };
  const pair = HREFLANG_PAIRS.find(([uk, us]) => uk === path || us === path);
  return pair ? { "en-GB": pair[0], "en-US": pair[1] } : undefined;
}

/** `alternates` for a page's metadata: its canonical plus any hreflang tags. */
export function alternatesFor(path: string): Alternates {
  const languages = hreflangFor(path);
  return languages ? { canonical: path, languages } : { canonical: path };
}
