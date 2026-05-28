/**
 * Mortgage overpayment savings.
 *
 * Given an existing repayment mortgage and a regular monthly overpayment (or
 * a one-off lump sum), recompute the amortisation and report:
 *   - new payoff term
 *   - interest saved vs the original schedule
 *
 * Most UK lenders allow 10%/year overpayment on a fixed-rate without ERC.
 */

export type OverpaymentInput = {
  balance: number;
  annualRatePct: number;
  remainingYears: number;
  monthlyOverpayment?: number;
  lumpSumNow?: number;
};

export type OverpaymentResult = {
  originalMonthlyPayment: number;
  originalTotalInterest: number;
  newPayoffMonths: number;
  newTotalInterest: number;
  interestSaved: number;
  monthsSaved: number;
};

function pmt(principal: number, monthlyRate: number, months: number) {
  if (monthlyRate === 0) return principal / months;
  const pow = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * pow) / (pow - 1);
}

function simulate(initialBalance: number, monthlyRate: number, monthlyPayment: number, monthlyOver: number, maxMonths: number) {
  let balance = initialBalance;
  let totalInterest = 0;
  let months = 0;
  const payment = monthlyPayment + monthlyOver;
  while (balance > 0.01 && months < maxMonths) {
    const interest = balance * monthlyRate;
    let principalPaid = payment - interest;
    if (principalPaid > balance) principalPaid = balance;
    balance -= principalPaid;
    totalInterest += interest;
    months++;
  }
  return { months, totalInterest };
}

export function mortgageOverpayment(input: OverpaymentInput): OverpaymentResult {
  const r = Math.max(0, input.annualRatePct) / 100 / 12;
  const origMonths = Math.max(1, Math.round(input.remainingYears * 12));
  const startBalance = Math.max(0, input.balance - (input.lumpSumNow ?? 0));
  const originalMonthlyPayment = pmt(input.balance, r, origMonths);
  const originalTotalInterest = originalMonthlyPayment * origMonths - input.balance;

  const sim = simulate(startBalance, r, originalMonthlyPayment, input.monthlyOverpayment ?? 0, origMonths * 2);

  // Add back interest "saved" on the lump sum portion (none — it's principal now).
  // Lump sum effectively removed from balance instantly.
  return {
    originalMonthlyPayment,
    originalTotalInterest,
    newPayoffMonths: sim.months,
    newTotalInterest: sim.totalInterest,
    interestSaved: Math.max(0, originalTotalInterest - sim.totalInterest),
    monthsSaved: Math.max(0, origMonths - sim.months),
  };
}
