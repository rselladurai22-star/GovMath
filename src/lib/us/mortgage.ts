/**
 * US home loans: the monthly payment with taxes, insurance, HOA and PMI
 * (PITI), amortization with extra payments, how much house you can afford
 * under the 28/36 debt-to-income rules, refinancing break-even and rent
 * affordability.
 */

import { amortize, monthlyPayment, type Schedule } from "./loans";

export type MortgageInput = {
  price: number;
  down: number;
  aprPct: number;
  years: number;
  /** Property tax, a year. */
  propertyTax: number;
  /** Homeowners insurance, a year. */
  insurance: number;
  /** HOA dues, a month. */
  hoa: number;
  /** PMI as a yearly share of the loan (0.005 = 0.5%), charged while the balance is above 80% of the price. */
  pmiRate: number;
  /** Extra principal a month. */
  extra: number;
};

export type Mortgage = {
  loan: number;
  ltv: number;
  principalAndInterest: number;
  taxMonthly: number;
  insuranceMonthly: number;
  hoa: number;
  pmiMonthly: number;
  /** The first month's full payment. */
  total: number;
  /** Months PMI is paid (it ends automatically at 78% of the price, or on request at 80%). */
  pmiMonths: number;
  pmiTotal: number;
  schedule: Schedule;
  /** The schedule with no extra payments, to compare. */
  baseline: Schedule;
  interestSaved: number;
  monthsSaved: number;
};

/** The month the balance first reaches `share` of the price (0 if it starts there). */
function monthAtShare(s: Schedule, loan: number, price: number, share: number): number {
  if (loan <= price * share) return 0;
  const row = s.rows.find((r) => r.balance <= price * share);
  return row ? row.month : s.rows.length;
}

export function mortgage(i: MortgageInput): Mortgage {
  const price = Math.max(0, i.price);
  const loan = Math.max(0, price - Math.max(0, i.down));
  const months = Math.max(1, Math.round(i.years * 12));
  const pi = monthlyPayment(loan, i.aprPct, months);
  const schedule = amortize(loan, i.aprPct, months, Math.max(0, i.extra));
  const baseline = extraFree(loan, i.aprPct, months, schedule, i.extra);
  const pmiMonthly = price > 0 && loan > price * 0.8 ? (loan * Math.max(0, i.pmiRate)) / 12 : 0;
  // PMI is cancelled automatically at 78% of the original value (Homeowners Protection Act).
  const pmiMonths = pmiMonthly > 0 ? monthAtShare(schedule, loan, price, 0.78) : 0;
  const taxMonthly = Math.max(0, i.propertyTax) / 12;
  const insuranceMonthly = Math.max(0, i.insurance) / 12;
  return {
    loan,
    ltv: price > 0 ? loan / price : 0,
    principalAndInterest: pi,
    taxMonthly,
    insuranceMonthly,
    hoa: Math.max(0, i.hoa),
    pmiMonthly,
    total: pi + taxMonthly + insuranceMonthly + Math.max(0, i.hoa) + pmiMonthly,
    pmiMonths,
    pmiTotal: pmiMonthly * pmiMonths,
    schedule,
    baseline,
    interestSaved: baseline.totalInterest - schedule.totalInterest,
    monthsSaved: baseline.months - schedule.months,
  };
}

function extraFree(loan: number, apr: number, months: number, s: Schedule, extra: number): Schedule {
  return extra > 0 ? amortize(loan, apr, months) : s;
}

/** Yearly totals from a schedule, for charts and tables. */
export function yearly(s: Schedule): { year: number; interest: number; principal: number; balance: number }[] {
  const out: { year: number; interest: number; principal: number; balance: number }[] = [];
  s.rows.forEach((r) => {
    const y = Math.ceil(r.month / 12);
    if (!out[y - 1]) out[y - 1] = { year: y, interest: 0, principal: 0, balance: 0 };
    out[y - 1].interest += r.interest;
    out[y - 1].principal += r.principal;
    out[y - 1].balance = r.balance;
  });
  return out;
}

export type AffordInput = {
  /** Gross household income a year. */
  income: number;
  /** Other monthly debt payments (car, student loan, card minimums). */
  debts: number;
  down: number;
  aprPct: number;
  years: number;
  /** Property tax as a yearly share of the price. */
  taxRate: number;
  /** Insurance a year. */
  insurance: number;
  hoa: number;
  pmiRate: number;
  /** Housing cost limit as a share of gross monthly income (28%). */
  frontLimit: number;
  /** All-debts limit (36%; up to 43% to 50% with some loans). */
  backLimit: number;
};

export type Affordability = {
  price: number;
  loan: number;
  payment: Mortgage;
  /** The housing payment allowed by each rule; the lower one sets the price. */
  frontMax: number;
  backMax: number;
  limitedBy: "front" | "back";
  grossMonthly: number;
};

/**
 * The highest price whose full monthly payment (PITI, HOA and PMI) fits both
 * debt-to-income limits. Found by bisection because tax and PMI depend on the price.
 */
export function affordability(i: AffordInput): Affordability {
  const grossMonthly = Math.max(0, i.income) / 12;
  const frontMax = grossMonthly * Math.max(0, i.frontLimit);
  const backMax = grossMonthly * Math.max(0, i.backLimit) - Math.max(0, i.debts);
  const cap = Math.max(0, Math.min(frontMax, backMax));
  const at = (price: number) =>
    mortgage({
      price,
      down: Math.min(price, Math.max(0, i.down)),
      aprPct: i.aprPct,
      years: i.years,
      propertyTax: price * Math.max(0, i.taxRate),
      insurance: i.insurance,
      hoa: i.hoa,
      pmiRate: i.pmiRate,
      extra: 0,
    });
  let lo = 0;
  let hi = 20_000_000;
  if (at(lo).total > cap) hi = 0;
  for (let k = 0; k < 80 && hi - lo > 0.5; k++) {
    const mid = (lo + hi) / 2;
    if (at(mid).total <= cap) lo = mid;
    else hi = mid;
  }
  const payment = at(lo);
  return { price: lo, loan: payment.loan, payment, frontMax, backMax, limitedBy: frontMax <= backMax ? "front" : "back", grossMonthly };
}

export type RefinanceInput = {
  balance: number;
  currentAprPct: number;
  /** Months left on the current loan. */
  monthsLeft: number;
  newAprPct: number;
  newYears: number;
  closingCosts: number;
  /** Roll the closing costs into the new loan. */
  rollIn: boolean;
  /** Cash taken out on top of the balance. */
  cashOut: number;
};

export type Refinance = {
  currentPayment: number;
  newLoan: number;
  newPayment: number;
  monthlySaving: number;
  /** Months for the monthly saving to repay the upfront costs (Infinity if it never does). */
  breakEvenMonths: number;
  /** Interest still to pay on each loan. */
  currentInterest: number;
  newInterest: number;
  /** Lifetime cost difference: new loan payments plus upfront costs minus the current loan's payments. */
  lifetimeDifference: number;
};

export function refinance(i: RefinanceInput): Refinance {
  const balance = Math.max(0, i.balance);
  const n = Math.max(1, Math.round(i.monthsLeft));
  const currentPayment = monthlyPayment(balance, i.currentAprPct, n);
  const newLoan = balance + Math.max(0, i.cashOut) + (i.rollIn ? Math.max(0, i.closingCosts) : 0);
  const newMonths = Math.max(1, Math.round(i.newYears * 12));
  const newPayment = monthlyPayment(newLoan, i.newAprPct, newMonths);
  const upfront = i.rollIn ? 0 : Math.max(0, i.closingCosts);
  const monthlySaving = currentPayment - newPayment;
  // Break-even on the costs: rolled-in costs are repaid through the payment, so compare like for like.
  const costs = Math.max(0, i.closingCosts);
  const breakEvenMonths = monthlySaving > 0 ? Math.ceil(costs / monthlySaving) : Infinity;
  const currentInterest = currentPayment * n - balance;
  const newInterest = newPayment * newMonths - newLoan;
  return {
    currentPayment,
    newLoan,
    newPayment,
    monthlySaving,
    breakEvenMonths,
    currentInterest,
    newInterest,
    lifetimeDifference: newPayment * newMonths + upfront - Math.max(0, i.cashOut) - currentPayment * n,
  };
}

export type RentAfford = {
  grossMonthly: number;
  /** Rent at 30% of gross income (the HUD cost-burden line). */
  thirty: number;
  /** The 40× rule many landlords use: rent no more than gross annual income ÷ 40. */
  fortyTimes: number;
  /** 50/30/20 budget: needs are 50% of take-home pay; rent is what is left after other needs. */
  budget: number;
  /** The lowest of the three, less monthly debts under a 36% all-debts line. */
  comfortable: number;
  /** Income needed for a given rent under each rule. */
  incomeFor: (rent: number) => { thirty: number; fortyTimes: number };
};

export function rentAffordability(income: number, takeHomeMonthly: number, otherNeeds: number, debts: number): RentAfford {
  const g = Math.max(0, income) / 12;
  const thirty = g * 0.3;
  const fortyTimes = Math.max(0, income) / 40;
  const budget = Math.max(0, takeHomeMonthly * 0.5 - Math.max(0, otherNeeds));
  const dtiRoom = Math.max(0, g * 0.36 - Math.max(0, debts));
  return {
    grossMonthly: g,
    thirty,
    fortyTimes,
    budget,
    comfortable: Math.min(thirty, fortyTimes, budget, dtiRoom),
    incomeFor: (rent) => ({ thirty: (rent * 12) / 0.3, fortyTimes: rent * 40 }),
  };
}
