/**
 * Small helpers for the US saving and retirement pages: a Roth IRA compared
 * with a taxable brokerage account, doubling time (the rule of 72), and the
 * 2026 rule that higher earners' 401(k) catch-up contributions must be Roth.
 */

import { grow } from "./savings";

/**
 * From 2026, catch-up contributions (age 50 and over) must go in as Roth for
 * anyone whose prior-year FICA wages from the employer were above this figure
 * (SECURE 2.0 section 603; $145,000 indexed, $150,000 for 2025 wages tested in 2026).
 */
export const ROTH_CATCH_UP_WAGES_2026 = 150_000;

/** True when this year's catch-up contributions must be Roth. */
export function catchUpMustBeRoth(age: number, priorYearFicaWages: number): boolean {
  return age >= 50 && priorYearFicaWages > ROTH_CATCH_UP_WAGES_2026;
}

/** Years to double: the rule of 72 and the exact figure at this yearly rate. */
export function doubling(ratePct: number): { rule72: number; exact: number } {
  if (ratePct <= 0) return { rule72: Infinity, exact: Infinity };
  return { rule72: 72 / ratePct, exact: Math.log(2) / Math.log(1 + ratePct / 100) };
}

export type RothVsTaxable = {
  /** Roth IRA balance: all of it tax-free if the rules are met. */
  roth: number;
  /** Taxable account before selling. */
  taxable: number;
  /** Taxable account after paying capital gains tax on selling everything. */
  taxableAfterSale: number;
  /** Tax paid on dividends along the way. */
  dividendTax: number;
  /** Capital gains tax due on selling at the end. */
  gainsTax: number;
  /** How much more the Roth leaves you with. */
  advantage: number;
  deposits: number;
};

/**
 * The same monthly deposits into a Roth IRA and into a taxable account.
 * Both earn `ratePct` a year in total; in the taxable account the dividend
 * part (`yieldPct` of the balance a year) is taxed each December at
 * `dividendTaxRate`, and the tax is paid from the account. On selling, the
 * gain over the cost basis (deposits plus reinvested after-tax dividends) is
 * taxed at `gainsTaxRate`.
 */
export function rothVsTaxable(start: number, monthly: number, ratePct: number, years: number, yieldPct: number, dividendTaxRate: number, gainsTaxRate: number): RothVsTaxable {
  const roth = grow(start, monthly, ratePct, years, "monthly");
  const r = ratePct / 100 / 12;
  const n = Math.max(0, Math.round(years * 12));
  let bal = Math.max(0, start);
  let basis = bal;
  let dividendTax = 0;
  let yearDividends = 0;
  const dep = Math.max(0, monthly);
  for (let m = 1; m <= n; m++) {
    yearDividends += bal * (yieldPct / 100 / 12);
    bal = bal * (1 + r) + dep;
    basis += dep;
    if (m % 12 === 0 || m === n) {
      const tax = Math.max(0, yearDividends) * Math.max(0, dividendTaxRate);
      dividendTax += tax;
      bal -= tax;
      // Dividends were reinvested, so the after-tax amount joins the cost basis.
      basis += Math.max(0, yearDividends) - tax;
      yearDividends = 0;
    }
  }
  const gainsTax = Math.max(0, bal - basis) * Math.max(0, gainsTaxRate);
  const taxableAfterSale = bal - gainsTax;
  return { roth: roth.balance, taxable: bal, taxableAfterSale, dividendTax, gainsTax, advantage: roth.balance - taxableAfterSale, deposits: roth.deposits };
}

export type GoalMonth = { month: number; deposits: number; balance: number };

/**
 * Month-by-month path of a savings goal: `start` plus `monthly` at the end of
 * each month, interest at `ratePct` ÷ 12 a month (the same basis as
 * depositForGoal and monthsToGoal). Month 0 is the starting balance.
 */
export function goalPath(start: number, monthly: number, ratePct: number, months: number): GoalMonth[] {
  const r = ratePct / 100 / 12;
  const n = Math.max(0, Math.min(1_200, Math.round(months)));
  let balance = Math.max(0, start);
  let deposits = balance;
  const dep = Math.max(0, monthly);
  const out: GoalMonth[] = [{ month: 0, deposits, balance }];
  for (let m = 1; m <= n; m++) {
    balance = balance * (1 + r) + dep;
    deposits += dep;
    out.push({ month: m, deposits, balance });
  }
  return out;
}
