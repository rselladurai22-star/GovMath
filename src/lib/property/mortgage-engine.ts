/**
 * Mortgage Decision Engine.
 *
 * Extends the pure amortisation maths in `@/lib/mortgage` with the levers a
 * real borrower actually pulls: overpayments, interest-only, and rate shocks.
 * Everything is a month-by-month simulation so overpayment savings, the payoff
 * date and the interest/capital crossover all fall out exactly rather than
 * being approximated. Pure and deterministic — testable and client-safe.
 */

import { affordabilityEstimate } from "../mortgage";

export type MortgageType = "repayment" | "interest-only";

export type MortgageInputs = {
  price: number;
  deposit: number;
  ratePct: number;
  termYears: number;
  type: MortgageType;
  /** Voluntary monthly overpayment on top of the contractual payment. */
  overpayment: number;
};

export type ScheduleYear = {
  year: number;
  interest: number;
  capital: number;
  balance: number;
  /** True while more of the year's payment is interest than capital. */
  interestDominant: boolean;
};

type SimResult = {
  schedule: ScheduleYear[];
  totalInterest: number;
  totalPaid: number;
  principalRepaid: number;
  finalBalance: number;
  payoffMonths: number;
};

export type MortgageSnapshot = {
  inputs: MortgageInputs;
  loan: number;
  ltv: number;
  monthlyRate: number;
  /** Contractual monthly payment, excluding any overpayment. */
  monthlyPayment: number;
  /** Contractual payment + overpayment — what actually leaves your account. */
  monthlyOutgoing: number;
  schedule: ScheduleYear[];
  totalInterest: number;
  totalRepaid: number;
  payoffMonths: number;
  /** For interest-only with no overpayment: capital still owed at term end. */
  balloon: number;
  /** Interest as a share of everything you repay, 0–1. */
  interestShare: number;
  overpayment: {
    active: boolean;
    interestSaved: number;
    monthsSaved: number;
  };
  allocation: { key: "capital" | "interest"; label: string; amount: number; share: number; color: string }[];
};

export const MORTGAGE_COLORS = {
  capital: "#3f7d63",
  interest: "#b0492f",
  interestDominant: "#c98a72",
  capitalDominant: "#7fa892",
};

function clamp(raw: MortgageInputs): MortgageInputs {
  const price = Math.max(0, raw.price || 0);
  const deposit = Math.min(price, Math.max(0, raw.deposit || 0));
  return {
    price,
    deposit,
    ratePct: Math.max(0, raw.ratePct || 0),
    termYears: Math.min(40, Math.max(1, Math.round(raw.termYears || 1))),
    type: raw.type === "interest-only" ? "interest-only" : "repayment",
    overpayment: Math.max(0, raw.overpayment || 0),
  };
}

/** Contractual monthly payment for a loan (repayment PMT, or interest-only). */
export function monthlyPaymentFor(
  loan: number,
  ratePct: number,
  termYears: number,
  type: MortgageType
): number {
  const r = ratePct / 100 / 12;
  const n = Math.max(1, Math.round(termYears * 12));
  if (type === "interest-only") return loan * r;
  if (r === 0) return loan / n;
  const pow = Math.pow(1 + r, n);
  return (loan * r * pow) / (pow - 1);
}

function simulate(
  loan: number,
  ratePct: number,
  termYears: number,
  type: MortgageType,
  overpayment: number
): SimResult {
  const r = ratePct / 100 / 12;
  const n = Math.max(1, Math.round(termYears * 12));
  const contractual = monthlyPaymentFor(loan, ratePct, termYears, type);

  const schedule: ScheduleYear[] = [];
  let balance = loan;
  let totalInterest = 0;
  let totalPaid = 0;
  let payoffMonths = n;
  let yInterest = 0;
  let yCapital = 0;
  let year = 1;
  let paidOff = false;

  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    // On a repayment loan the contractual payment covers interest + capital;
    // interest-only pays just the interest. Overpayment always hits capital.
    const contractualCapital = type === "interest-only" ? 0 : Math.min(balance, contractual - interest);
    const capital = Math.min(balance, contractualCapital + overpayment);
    const paid = interest + capital;

    totalInterest += interest;
    totalPaid += paid;
    yInterest += interest;
    yCapital += capital;
    balance -= capital;

    if (m % 12 === 0 || m === n || balance <= 0.005) {
      schedule.push({
        year,
        interest: yInterest,
        capital: yCapital,
        balance: Math.max(0, balance),
        interestDominant: yInterest >= yCapital,
      });
      year++;
      yInterest = 0;
      yCapital = 0;
    }

    if (balance <= 0.005 && !paidOff) {
      payoffMonths = m;
      paidOff = true;
      break;
    }
  }

  return {
    schedule,
    totalInterest,
    totalPaid,
    principalRepaid: loan - Math.max(0, balance),
    finalBalance: Math.max(0, balance),
    payoffMonths,
  };
}

export function computeMortgage(raw: MortgageInputs): MortgageSnapshot {
  const inputs = clamp(raw);
  const loan = Math.max(0, inputs.price - inputs.deposit);
  const r = inputs.ratePct / 100 / 12;
  const monthlyPayment = monthlyPaymentFor(loan, inputs.ratePct, inputs.termYears, inputs.type);

  const sim = simulate(loan, inputs.ratePct, inputs.termYears, inputs.type, inputs.overpayment);
  const baseline = simulate(loan, inputs.ratePct, inputs.termYears, inputs.type, 0);

  const balloon = inputs.type === "interest-only" ? sim.finalBalance : 0;
  const totalRepaid = sim.totalPaid;
  const interestShare = totalRepaid > 0 ? sim.totalInterest / totalRepaid : 0;

  const capitalPortion = loan - balloon;
  const allocTotal = capitalPortion + sim.totalInterest;
  const allocRaw: { key: "capital" | "interest"; label: string; amount: number; color: string }[] = [
    { key: "capital", label: "Capital (the loan)", amount: capitalPortion, color: MORTGAGE_COLORS.capital },
    { key: "interest", label: "Interest", amount: sim.totalInterest, color: MORTGAGE_COLORS.interest },
  ];
  const allocation: MortgageSnapshot["allocation"] = allocRaw.map((a) => ({
    ...a,
    share: allocTotal > 0 ? a.amount / allocTotal : 0,
  }));

  return {
    inputs,
    loan,
    ltv: inputs.price > 0 ? loan / inputs.price : 0,
    monthlyRate: r,
    monthlyPayment,
    monthlyOutgoing: monthlyPayment + inputs.overpayment,
    schedule: sim.schedule,
    totalInterest: sim.totalInterest,
    totalRepaid,
    payoffMonths: sim.payoffMonths,
    balloon,
    interestShare,
    overpayment: {
      active: inputs.overpayment > 0,
      interestSaved: Math.max(0, baseline.totalInterest - sim.totalInterest),
      monthsSaved: Math.max(0, baseline.payoffMonths - sim.payoffMonths),
    },
    allocation,
  };
}

/** Contractual payment if the rate moved by `deltaPct` percentage points. */
export function paymentAtRateShift(inputs: MortgageInputs, deltaPct: number): number {
  const c = clamp(inputs);
  const loan = Math.max(0, c.price - c.deposit);
  return monthlyPaymentFor(loan, Math.max(0, c.ratePct + deltaPct), c.termYears, c.type);
}

export type LtvBand = { max: number; label: string; note: string };

/** LTV thresholds where lenders typically improve the rate. */
export const LTV_BANDS: LtvBand[] = [
  { max: 0.6, label: "≤60%", note: "The best rates lenders offer" },
  { max: 0.75, label: "≤75%", note: "Strong rates" },
  { max: 0.8, label: "≤80%", note: "Good rates" },
  { max: 0.85, label: "≤85%", note: "Mainstream rates" },
  { max: 0.9, label: "≤90%", note: "Higher rates" },
  { max: 0.95, label: "≤95%", note: "Limited choice, priciest rates" },
];

/** The next LTV threshold you'd reach with a bigger deposit, if any. */
export function nextLtvBand(ltv: number): { band: LtvBand; extraDeposit: number } | null {
  for (const band of LTV_BANDS) {
    if (ltv > band.max) {
      return { band, extraDeposit: 0 };
    }
  }
  return null;
}

export { affordabilityEstimate };

export function formatMonths(months: number): string {
  const y = Math.floor(months / 12);
  const m = Math.round(months % 12);
  if (y <= 0) return `${m} mo`;
  if (m === 0) return `${y} yr`;
  return `${y} yr ${m} mo`;
}
