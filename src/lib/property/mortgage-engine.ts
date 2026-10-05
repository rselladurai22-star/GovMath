/**
 * Mortgage payment maths shared by the affordability and shared ownership
 * calculators.
 */

export type MortgageType = "repayment" | "interest-only";

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
