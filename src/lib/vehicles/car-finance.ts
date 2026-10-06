/**
 * Car finance: hire purchase (HP) and personal contract purchase (PCP).
 *
 * Both are loans with fixed monthly payments. HP repays the whole amount
 * borrowed; PCP leaves a final "balloon" payment, the guaranteed future value
 * (GFV), which you pay to keep the car or avoid by handing it back. The APR
 * includes compulsory fees, so the monthly rate is (1 + APR)^(1/12) − 1.
 */

export type FinanceType = "hp" | "pcp";

export type CarFinanceInput = {
  price: number;
  deposit: number;
  /** APR, %. */
  apr: number;
  months: number;
  type: FinanceType;
  /** PCP: guaranteed future value (the balloon). */
  balloon: number;
  /** Option to purchase fee, paid with the last payment. */
  optionFee: number;
};

export type CarFinanceResult = {
  borrowed: number;
  monthly: number;
  /** Monthly payments in total. */
  payments: number;
  /** PCP: final payment to keep the car (balloon + option fee). HP: option fee. */
  finalPayment: number;
  /** Everything paid to own the car: deposit, payments and final payment. */
  totalToOwn: number;
  /** Cost of borrowing to own the car. */
  interest: number;
  /** PCP: what you paid if you hand the car back instead. */
  totalIfReturned: number;
  monthlyRate: number;
};

export function carFinance(i: CarFinanceInput): CarFinanceResult {
  const price = Math.max(0, i.price);
  const deposit = Math.min(price, Math.max(0, i.deposit));
  const borrowed = price - deposit;
  const n = Math.max(1, Math.round(i.months));
  const r = Math.pow(1 + Math.max(0, i.apr) / 100, 1 / 12) - 1;
  const balloon = i.type === "pcp" ? Math.min(borrowed, Math.max(0, i.balloon)) : 0;
  const pv = borrowed - balloon / Math.pow(1 + r, n);
  const monthly = r === 0 ? pv / n : (pv * r) / (1 - Math.pow(1 + r, -n));
  const payments = monthly * n;
  const optionFee = Math.max(0, i.optionFee);
  const finalPayment = balloon + optionFee;
  const totalToOwn = deposit + payments + finalPayment;
  return {
    borrowed,
    monthly,
    payments,
    finalPayment,
    totalToOwn,
    interest: totalToOwn - price,
    totalIfReturned: deposit + payments,
    monthlyRate: r,
  };
}
