/**
 * Loans and debt: fixed-rate payments and schedules, auto loans, credit card
 * payoff, debt-to-income ratios and the snowball and avalanche payoff methods.
 * Interest is charged monthly at APR ÷ 12, as US installment loans and credit
 * cards do (cards actually compound daily; the monthly figure is within a few
 * cents a month).
 */

/** Monthly payment on a fixed-rate loan. */
export function monthlyPayment(principal: number, aprPct: number, months: number): number {
  const p = Math.max(0, principal);
  const n = Math.max(1, Math.round(months));
  const r = Math.max(0, aprPct) / 100 / 12;
  if (r === 0) return p / n;
  return (p * r) / (1 - Math.pow(1 + r, -n));
}

export type ScheduleRow = { month: number; payment: number; interest: number; principal: number; balance: number };

export type Schedule = {
  payment: number;
  rows: ScheduleRow[];
  months: number;
  totalInterest: number;
  totalPaid: number;
};

/**
 * Pays a loan down month by month at the scheduled payment plus any extra.
 * `payment` can be given (credit cards); otherwise it is the fixed-rate payment for `months`.
 */
export function amortize(principal: number, aprPct: number, months: number, extra = 0, payment?: number, maxMonths = 1_200): Schedule {
  const r = Math.max(0, aprPct) / 100 / 12;
  const pay = payment ?? monthlyPayment(principal, aprPct, months);
  let balance = Math.max(0, principal);
  const rows: ScheduleRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  for (let m = 1; balance > 0.005 && m <= maxMonths; m++) {
    const interest = balance * r;
    const due = Math.min(balance + interest, pay + Math.max(0, extra));
    if (due <= interest && m > 1) break; // the payment never clears the interest
    const toPrincipal = due - interest;
    balance = Math.max(0, balance - toPrincipal);
    totalInterest += interest;
    totalPaid += due;
    rows.push({ month: m, payment: due, interest, principal: toPrincipal, balance });
  }
  return { payment: pay, rows, months: balance > 0.005 ? Infinity : rows.length, totalInterest, totalPaid };
}

export type AutoLoanInput = {
  price: number;
  down: number;
  tradeIn: number;
  /** Still owed on the trade-in (negative equity is rolled into the loan). */
  tradeOwed: number;
  /** Cash rebate from the maker, taken off the price after tax in most states. */
  rebate: number;
  salesTaxRate: number;
  /** Sales tax is charged on the price after the trade-in (most states) or on the full price. */
  taxAfterTradeIn: boolean;
  /** Title, registration and dealer fees. */
  fees: number;
  /** Finance the tax and fees instead of paying them upfront. */
  financeTaxAndFees: boolean;
  aprPct: number;
  months: number;
};

export type AutoLoan = {
  salesTax: number;
  amountFinanced: number;
  upfront: number;
  payment: number;
  totalInterest: number;
  /** Everything paid: upfront cash, trade-in value used and all payments. */
  totalCost: number;
  schedule: Schedule;
};

export function autoLoan(i: AutoLoanInput): AutoLoan {
  const price = Math.max(0, i.price);
  const taxBase = i.taxAfterTradeIn ? Math.max(0, price - Math.max(0, i.tradeIn)) : price;
  const salesTax = taxBase * Math.max(0, i.salesTaxRate);
  const equity = Math.max(0, i.tradeIn) - Math.max(0, i.tradeOwed);
  const extras = salesTax + Math.max(0, i.fees);
  const financed = Math.max(0, price - Math.max(0, i.rebate) - equity - Math.max(0, i.down) + (i.financeTaxAndFees ? extras : 0));
  const upfront = Math.max(0, i.down) + (i.financeTaxAndFees ? 0 : extras);
  const schedule = amortize(financed, i.aprPct, i.months);
  return {
    salesTax,
    amountFinanced: financed,
    upfront,
    payment: schedule.payment,
    totalInterest: schedule.totalInterest,
    totalCost: upfront + Math.max(0, i.tradeIn) - Math.max(0, i.tradeOwed) + schedule.totalPaid,
    schedule,
  };
}

/** The usual credit card minimum: the larger of a floor (often $25 to $40) and 1% of the balance plus the month's interest. */
export function cardMinimum(balance: number, aprPct: number, pctOfBalance = 0.01, floor = 25): number {
  const interest = balance * (aprPct / 100 / 12);
  return Math.min(balance + interest, Math.max(floor, balance * pctOfBalance + interest));
}

/** Paying only the minimum each month (it falls as the balance falls). */
export function minimumOnly(balance: number, aprPct: number, pctOfBalance = 0.01, floor = 25, maxMonths = 1_200): Schedule {
  const r = aprPct / 100 / 12;
  let b = Math.max(0, balance);
  const rows: ScheduleRow[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  for (let m = 1; b > 0.005 && m <= maxMonths; m++) {
    const interest = b * r;
    const pay = cardMinimum(b, aprPct, pctOfBalance, floor);
    b = Math.max(0, b + interest - pay);
    totalInterest += interest;
    totalPaid += pay;
    rows.push({ month: m, payment: pay, interest, principal: pay - interest, balance: b });
  }
  return { payment: rows[0]?.payment ?? 0, rows, months: b > 0.005 ? Infinity : rows.length, totalInterest, totalPaid };
}

/** The monthly payment that clears a balance in `months`. */
export function paymentForMonths(balance: number, aprPct: number, months: number): number {
  return monthlyPayment(balance, aprPct, months);
}

export type Dti = { front: number; back: number; grossMonthly: number; housing: number; debts: number };

/** Debt-to-income: housing alone (front-end) and all monthly debts (back-end), against gross monthly income. */
export function debtToIncome(grossMonthly: number, housing: number, otherDebts: number): Dti {
  const g = Math.max(0, grossMonthly);
  const h = Math.max(0, housing);
  const d = Math.max(0, otherDebts);
  return { grossMonthly: g, housing: h, debts: d, front: g > 0 ? h / g : 0, back: g > 0 ? (h + d) / g : 0 };
}

export type Debt = { name: string; balance: number; aprPct: number; minimum: number };

export type PayoffResult = {
  months: number;
  totalInterest: number;
  totalPaid: number;
  /** Month each debt is cleared, in the input order. */
  clearedMonth: number[];
  /** The order debts were targeted. */
  order: number[];
  /** Total balance left at the end of each month. */
  balances: number[];
};

/**
 * Pays every minimum each month and puts the extra budget (plus the minimums
 * of debts already cleared) on one target debt: the smallest balance first
 * (snowball) or the highest rate first (avalanche).
 */
export function payoffPlan(debts: Debt[], extra: number, method: "snowball" | "avalanche", maxMonths = 600): PayoffResult {
  const ds = debts.map((d) => ({ ...d, balance: Math.max(0, d.balance), minimum: Math.max(0, d.minimum) }));
  const order = ds
    .map((d, i) => i)
    .filter((i) => ds[i].balance > 0)
    .sort((a, b) => (method === "snowball" ? ds[a].balance - ds[b].balance || ds[b].aprPct - ds[a].aprPct : ds[b].aprPct - ds[a].aprPct || ds[a].balance - ds[b].balance));
  const budget = ds.reduce((s, d) => s + (d.balance > 0 ? d.minimum : 0), 0) + Math.max(0, extra);
  const cleared = ds.map((d) => (d.balance > 0 ? 0 : 0));
  const balances: number[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  while (ds.some((d) => d.balance > 0.005) && month < maxMonths) {
    month += 1;
    // Interest first.
    ds.forEach((d) => {
      if (d.balance > 0) {
        const i = (d.balance * d.aprPct) / 100 / 12;
        d.balance += i;
        totalInterest += i;
      }
    });
    let left = budget;
    // Minimums on every open debt.
    ds.forEach((d) => {
      if (d.balance > 0) {
        const pay = Math.min(d.balance, d.minimum, left);
        d.balance -= pay;
        left -= pay;
        totalPaid += pay;
      }
    });
    // The rest on the targets in order.
    for (const i of order) {
      if (left <= 0) break;
      const d = ds[i];
      if (d.balance <= 0) continue;
      const pay = Math.min(d.balance, left);
      d.balance -= pay;
      left -= pay;
      totalPaid += pay;
    }
    ds.forEach((d, i) => {
      if (d.balance <= 0.005 && cleared[i] === 0 && debts[i].balance > 0) {
        d.balance = 0;
        cleared[i] = month;
      }
    });
    balances.push(ds.reduce((s, d) => s + d.balance, 0));
  }
  return {
    months: ds.some((d) => d.balance > 0.005) ? Infinity : month,
    totalInterest,
    totalPaid,
    clearedMonth: cleared,
    order,
    balances,
  };
}
