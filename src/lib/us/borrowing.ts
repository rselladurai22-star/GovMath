/**
 * Borrowing helpers for five US loan pages: personal loans by credit tier,
 * car leases (depreciation + rent charge, sales tax by state method, lease
 * vs buy), how much car you can afford (budget share and the 20/4/10 rule),
 * debt consolidation and balance transfers. Built on the tested engines in
 * loans.ts, loans-extra.ts and housing-loans-extra.ts.
 */

import { amortize, autoLoan, monthlyPayment, type AutoLoan, type Schedule } from "./loans";
import { balanceTransfer, type BalanceTransfer } from "./loans-extra";
import { loanWithFee, type FeeApr } from "./housing-loans-extra";

/* ------------------------------------------------------------------ */
/* Personal loans                                                       */
/* ------------------------------------------------------------------ */

export type CreditTier = "excellent" | "good" | "fair" | "bad";

/**
 * Average personal loan APRs by credit score: NerdWallet, aggregate offers to
 * users who pre-qualified in the 30 days to October 1, 2026 (lenders with
 * maximum APRs of 36% or less).
 * https://www.nerdwallet.com/article/loans/personal-loans/average-personal-loan-rates
 */
export const PERSONAL_LOAN_TIERS: Record<CreditTier, { label: string; scores: string; aprPct: number }> = {
  excellent: { label: "Excellent", scores: "720 to 850", aprPct: 15.17 },
  good: { label: "Good", scores: "690 to 719", aprPct: 19.47 },
  fair: { label: "Fair", scores: "630 to 689", aprPct: 24.21 },
  bad: { label: "Bad", scores: "300 to 629", aprPct: 29.72 },
};
export const CREDIT_TIERS: CreditTier[] = ["excellent", "good", "fair", "bad"];

export type FeeMode = "deducted" | "added";

export type PersonalLoan = FeeApr & {
  fee: number;
  months: number;
  /** Every payment added up. */
  totalPaid: number;
  /** Interest plus the fee: everything paid beyond the cash you receive. */
  totalCost: number;
};

/**
 * A personal loan with an origination fee. `deducted`: the fee comes off the
 * money you receive (with `grossUp`, the loan is raised so you still receive
 * `amount`). `added`: the fee is added to the balance and you receive `amount`.
 */
export function personalLoan(amount: number, aprPct: number, months: number, feePct: number, mode: FeeMode, grossUp = false): PersonalLoan {
  const a = Math.max(0, amount);
  const f = Math.min(Math.max(0, feePct), 50) / 100;
  const n = Math.max(1, Math.round(months));
  const loan = mode === "deducted" && grossUp ? a / (1 - f) : a;
  const fee = loan * f;
  const lf = loanWithFee(loan, aprPct, n, fee, mode === "added");
  const totalPaid = lf.payment * n;
  return { ...lf, fee, months: n, totalPaid, totalCost: totalPaid - lf.received };
}

/* ------------------------------------------------------------------ */
/* Car leases                                                           */
/* ------------------------------------------------------------------ */

/**
 * How the state taxes a lease: on each monthly payment (most states), on the
 * total of the payments at signing (New York, New Jersey and a few others),
 * on the vehicle's price at signing (Texas, Maryland, Virginia and a few
 * others), or not at all (states with no sales tax).
 */
export type LeaseTaxMethod = "payment" | "upfront-payments" | "upfront-price" | "none";

export type LeaseInput = {
  msrp: number;
  /** Negotiated selling price (the capitalized cost before fees). */
  price: number;
  /** Cash down (a capitalized cost reduction). */
  down: number;
  tradeIn: number;
  tradeOwed: number;
  /** Maker's lease cash or rebate, taken off the capitalized cost. */
  rebate: number;
  residualPct: number;
  /** Money factor: the lease's rate; × 2,400 is roughly the APR. */
  moneyFactor: number;
  months: number;
  acquisitionFee: number;
  /** Roll the acquisition fee into the capitalized cost (usual) or pay it at signing. */
  capitalizeAcquisitionFee: boolean;
  /** Paid when you hand the car back, unless you buy it or lease again. */
  dispositionFee: number;
  /** Title, registration and dealer documentation fees paid at signing. */
  signingFees: number;
  taxRate: number;
  taxMethod: LeaseTaxMethod;
  /** Most states that tax payments also tax the cash down. */
  taxDown: boolean;
};

export type Lease = {
  grossCap: number;
  capReduction: number;
  adjustedCap: number;
  residual: number;
  /** Monthly depreciation charge. */
  depreciation: number;
  /** Monthly rent charge (the finance charge). */
  rentCharge: number;
  basePayment: number;
  monthlyTax: number;
  payment: number;
  /** Sales tax paid at signing. */
  upfrontTax: number;
  dueAtSigning: number;
  totalPayments: number;
  totalDepreciation: number;
  totalRent: number;
  /** Everything the lease costs you, including trade-in equity used and the disposition fee. */
  totalCost: number;
  aprEquivalent: number;
  /** Trade-in value minus what is owed on it (negative is rolled into the cap cost). */
  equity: number;
};

export function carLease(i: LeaseInput): Lease {
  const n = Math.max(1, Math.round(i.months));
  const price = Math.max(0, i.price);
  const equity = Math.max(0, i.tradeIn) - Math.max(0, i.tradeOwed);
  const acq = Math.max(0, i.acquisitionFee);
  const down = Math.max(0, i.down);
  const grossCap = price + (i.capitalizeAcquisitionFee ? acq : 0) + Math.max(0, -equity);
  const capReduction = down + Math.max(0, equity) + Math.max(0, i.rebate);
  const adjustedCap = Math.max(0, grossCap - capReduction);
  const residual = (Math.max(0, i.msrp) * Math.max(0, i.residualPct)) / 100;
  const mf = Math.max(0, i.moneyFactor);
  const depreciation = Math.max(0, adjustedCap - residual) / n;
  const rentCharge = (adjustedCap + residual) * mf;
  const basePayment = depreciation + rentCharge;
  const rate = Math.max(0, i.taxRate);
  const taxOnDown = i.taxDown ? down * rate : 0;
  let monthlyTax = 0;
  let upfrontTax = 0;
  if (i.taxMethod === "payment") {
    monthlyTax = basePayment * rate;
    upfrontTax = taxOnDown;
  } else if (i.taxMethod === "upfront-payments") {
    upfrontTax = basePayment * n * rate + taxOnDown;
  } else if (i.taxMethod === "upfront-price") {
    upfrontTax = price * rate;
  }
  const payment = basePayment + monthlyTax;
  const signingFees = Math.max(0, i.signingFees);
  const dueAtSigning = payment + down + (i.capitalizeAcquisitionFee ? 0 : acq) + upfrontTax + signingFees;
  const totalPayments = payment * n;
  const totalCost = totalPayments + down + equity + (i.capitalizeAcquisitionFee ? 0 : acq) + upfrontTax + signingFees + Math.max(0, i.dispositionFee);
  return {
    grossCap,
    capReduction,
    adjustedCap,
    residual,
    depreciation,
    rentCharge,
    basePayment,
    monthlyTax,
    payment,
    upfrontTax,
    dueAtSigning,
    totalPayments,
    totalDepreciation: depreciation * n,
    totalRent: rentCharge * n,
    totalCost,
    aprEquivalent: mf * 2_400,
    equity,
  };
}

/** Money factor from an APR (APR ÷ 2,400) and back. */
export const aprToMoneyFactor = (aprPct: number) => Math.max(0, aprPct) / 2_400;

export type LeaseVsBuy = {
  lease: Lease;
  loan: AutoLoan;
  /** Cash put into the bought car by the end of the lease term: upfront, trade-in equity and payments. */
  buyPaidByLeaseEnd: number;
  /** Loan balance still owed at the end of the lease term. */
  owedAtLeaseEnd: number;
  /** What the car is assumed to be worth then: the lease's residual value. */
  carValue: number;
  /** Net cost of buying over the lease term: cash paid + still owed − car value. */
  buyNetCost: number;
  /** Lease cost minus the net cost of buying (positive: buying is cheaper over the term). */
  leaseExtra: number;
};

/**
 * Compares the lease with buying the same car at the same negotiated price,
 * with the same cash down and trade-in, on an auto loan (`aprPct`, `loanMonths`).
 * Sales tax on the purchase is charged on the price after the trade-in, and
 * tax and the signing fees are financed. Over the lease term, the bought car
 * is assumed to be worth the lease's residual value.
 */
export function leaseVsBuy(i: LeaseInput, aprPct: number, loanMonths: number): LeaseVsBuy {
  const lease = carLease(i);
  const loan = autoLoan({
    price: i.price,
    down: i.down,
    tradeIn: i.tradeIn,
    tradeOwed: i.tradeOwed,
    rebate: i.rebate,
    salesTaxRate: i.taxRate,
    taxAfterTradeIn: true,
    fees: Math.max(0, i.signingFees),
    financeTaxAndFees: true,
    aprPct,
    months: loanMonths,
  });
  const n = Math.max(1, Math.round(i.months));
  const rows = loan.schedule.rows.slice(0, n);
  const paidOnLoan = rows.reduce((s, r) => s + r.payment, 0);
  const owedAtLeaseEnd = loan.schedule.rows.length > n ? rows[rows.length - 1]?.balance ?? loan.amountFinanced : 0;
  const buyPaidByLeaseEnd = loan.upfront + lease.equity + paidOnLoan;
  const carValue = lease.residual;
  const buyNetCost = buyPaidByLeaseEnd + owedAtLeaseEnd - carValue;
  return { lease, loan, buyPaidByLeaseEnd, owedAtLeaseEnd, carValue, buyNetCost, leaseExtra: lease.totalCost - buyNetCost };
}

/* ------------------------------------------------------------------ */
/* Car affordability                                                    */
/* ------------------------------------------------------------------ */

/** Monthly fuel cost from miles a year, miles per gallon and the gas price. */
export function fuelPerMonth(milesPerYear: number, mpg: number, pricePerGallon: number): number {
  if (mpg <= 0) return 0;
  return (Math.max(0, milesPerYear) / mpg) * Math.max(0, pricePerGallon) / 12;
}

/** The loan a monthly payment supports at `aprPct` over `months`. */
export function loanForPayment(payment: number, aprPct: number, months: number): number {
  const p = Math.max(0, payment);
  if (p <= 0) return 0;
  return p / monthlyPayment(1, aprPct, months);
}

export type CarPriceInput = {
  /** The most you want to borrow (the loan the payment supports). */
  loan: number;
  down: number;
  tradeIn: number;
  tradeOwed: number;
  salesTaxRate: number;
  /** Tax the price after the trade-in (most states). */
  taxAfterTradeIn: boolean;
  /** Title, registration and dealer fees, financed with the tax. */
  fees: number;
};

/**
 * The highest sticker price a loan, cash down and trade-in will cover once
 * sales tax and fees are financed: the inverse of `autoLoan` with
 * `financeTaxAndFees` on.
 */
export function maxCarPrice(i: CarPriceInput): number {
  const t = Math.max(0, i.salesTaxRate);
  const trade = Math.max(0, i.tradeIn);
  const equity = trade - Math.max(0, i.tradeOwed);
  const cash = Math.max(0, i.loan) + Math.max(0, i.down) + equity - Math.max(0, i.fees);
  if (cash <= 0) return 0;
  if (i.taxAfterTradeIn) {
    // Tax only on the part of the price above the trade-in.
    if (cash <= trade) return cash;
    return (cash + t * trade) / (1 + t);
  }
  return cash / (1 + t);
}

export type CarBudgetInput = {
  /** Monthly income the share is measured against (gross or take-home). */
  monthlyIncome: number;
  /** The share of that income you will spend on the car, e.g. 10. */
  sharePct: number;
  /** Count insurance and fuel inside the share (the 20/4/10 rule does). */
  includeRunning: boolean;
  insurance: number;
  fuel: number;
  down: number;
  tradeIn: number;
  tradeOwed: number;
  aprPct: number;
  months: number;
  salesTaxRate: number;
  taxAfterTradeIn: boolean;
  fees: number;
};

export type CarBudget = {
  /** The monthly amount the share allows. */
  carBudget: number;
  /** What is left for the loan payment. */
  payment: number;
  maxLoan: number;
  maxPrice: number;
  /** The loan at that price, as a check (its payment matches `payment`). */
  check: AutoLoan;
  /** Payment plus insurance and fuel. */
  monthlyCarCost: number;
};

export function carBudget(i: CarBudgetInput): CarBudget {
  const carBudgetAmt = (Math.max(0, i.monthlyIncome) * Math.max(0, i.sharePct)) / 100;
  const running = Math.max(0, i.insurance) + Math.max(0, i.fuel);
  const payment = Math.max(0, carBudgetAmt - (i.includeRunning ? running : 0));
  const maxLoan = loanForPayment(payment, i.aprPct, i.months);
  const maxPrice = maxCarPrice({ loan: maxLoan, down: i.down, tradeIn: i.tradeIn, tradeOwed: i.tradeOwed, salesTaxRate: i.salesTaxRate, taxAfterTradeIn: i.taxAfterTradeIn, fees: i.fees });
  const check = autoLoan({
    price: maxPrice,
    down: i.down,
    tradeIn: i.tradeIn,
    tradeOwed: i.tradeOwed,
    rebate: 0,
    salesTaxRate: i.salesTaxRate,
    taxAfterTradeIn: i.taxAfterTradeIn,
    fees: i.fees,
    financeTaxAndFees: true,
    aprPct: i.aprPct,
    months: i.months,
  });
  return { carBudget: carBudgetAmt, payment, maxLoan, maxPrice, check, monthlyCarCost: check.payment + running };
}

export type Rule20410 = {
  /** The most the car can cost under the rule. */
  price: number;
  /** 20% of that price, from cash and trade-in equity. */
  downNeeded: number;
  payment: number;
  loan: number;
};

/**
 * The 20/4/10 rule of thumb: at least 20% down, a loan of no more than four
 * years, and the payment plus insurance (and here fuel) under 10% of gross
 * monthly income. Tax and fees are financed on top of the 80% loan.
 */
export function rule20410(grossMonthly: number, aprPct: number, insurance: number, fuel: number, salesTaxRate: number, fees: number): Rule20410 {
  const payment = Math.max(0, grossMonthly * 0.1 - Math.max(0, insurance) - Math.max(0, fuel));
  const loan = loanForPayment(payment, aprPct, 48);
  const t = Math.max(0, salesTaxRate);
  // The loan covers 80% of the price plus sales tax on the full price and the fees.
  const price = Math.max(0, (loan - Math.max(0, fees)) / (0.8 + t));
  return { price, downNeeded: price * 0.2, payment, loan };
}

/* ------------------------------------------------------------------ */
/* Debt consolidation                                                   */
/* ------------------------------------------------------------------ */

export type DebtLine = { name: string; balance: number; aprPct: number; payment: number };

export type Consolidation = {
  total: number;
  currentPayment: number;
  /** Each debt paid at its own payment until cleared. */
  current: { months: number; totalInterest: number; totalPaid: number; perDebt: Schedule[] };
  /** Balance-weighted average APR of the debts. */
  averageAprPct: number;
  loan: PersonalLoan;
  loanSchedule: Schedule;
  /** Paying the old total payment on the new loan (if it is higher than the loan payment). */
  sameBudget: Schedule;
  /** Current interest minus the loan's interest and fee (positive: the loan saves money). */
  saving: number;
};

/**
 * Pays every debt off with one loan. With the fee `deducted`, the loan is
 * raised so the cash received covers the balances; with `added`, the fee is
 * added to the loan.
 */
export function consolidate(debts: DebtLine[], aprPct: number, months: number, feePct: number, mode: FeeMode): Consolidation {
  const ds = debts.filter((d) => d.balance > 0);
  const total = ds.reduce((s, d) => s + d.balance, 0);
  const currentPayment = ds.reduce((s, d) => s + Math.max(0, d.payment), 0);
  const perDebt = ds.map((d) => amortize(d.balance, d.aprPct, 1, 0, Math.max(0, d.payment)));
  const current = {
    months: perDebt.reduce((m, s) => Math.max(m, s.months), 0),
    totalInterest: perDebt.reduce((s, x) => s + x.totalInterest, 0),
    totalPaid: perDebt.reduce((s, x) => s + x.totalPaid, 0),
    perDebt,
  };
  const averageAprPct = total > 0 ? ds.reduce((s, d) => s + d.balance * d.aprPct, 0) / total : 0;
  const loan = personalLoan(total, aprPct, months, feePct, mode, true);
  const loanSchedule = amortize(loan.borrowed, aprPct, loan.months);
  const sameBudget = currentPayment > loan.payment ? amortize(loan.borrowed, aprPct, loan.months, 0, currentPayment) : loanSchedule;
  return {
    total,
    currentPayment,
    current,
    averageAprPct,
    loan,
    loanSchedule,
    sameBudget,
    saving: current.totalInterest - loan.totalCost,
  };
}

/* ------------------------------------------------------------------ */
/* Balance transfers                                                    */
/* ------------------------------------------------------------------ */

export type TransferPlan = {
  transfer: BalanceTransfer;
  /** Keeping the balance on the current card at the same payment. */
  stay: Schedule;
  /** The payment that clears the balance plus fee before the promo ends. */
  payToClear: number;
  /** Stay total minus transfer total, fee included (positive: the transfer saves money). 0 when either plan never ends. */
  saving: number;
  /** Both plans clear the balance, so `saving` means something. */
  comparable: boolean;
  /** Interest the current card would charge over the promo months at this payment. */
  stayInterestDuringPromo: number;
};

export function transferPlan(balance: number, currentAprPct: number, feePct: number, promoMonths: number, promoAprPct: number, afterAprPct: number, payment: number): TransferPlan {
  const transfer = balanceTransfer(balance, feePct, promoMonths, promoAprPct, afterAprPct, payment);
  const stay = amortize(balance, currentAprPct, 1, 0, Math.max(0, payment));
  const promo = Math.max(1, Math.round(promoMonths));
  const payToClear = monthlyPayment(Math.max(0, balance) * (1 + Math.max(0, feePct) / 100), promoAprPct, promo);
  const bothDone = Number.isFinite(transfer.months) && Number.isFinite(stay.months);
  return {
    transfer,
    stay,
    payToClear,
    saving: bothDone ? stay.totalPaid - transfer.totalPaid : 0,
    comparable: bothDone,
    stayInterestDuringPromo: stay.rows.slice(0, promo).reduce((s, r) => s + r.interest, 0),
  };
}
