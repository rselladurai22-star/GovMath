/**
 * UK State Pension Age (SPA) calculator.
 *
 * Current legislation (Pensions Act 2014):
 *  - Born on or before 5 Apr 1960: SPA = 66.
 *  - Born 6 Apr 1960 – 5 Mar 1961: SPA rises 66 → 67 by adding 1 month per month of DOB.
 *  - Born 6 Mar 1961 – 5 Apr 1977: SPA = 67.
 *  - Born 6 Apr 1977 – 5 Apr 1978: SPA rises 67 → 68 (legislated change, currently under review).
 *  - Born from 6 Apr 1978 onwards: SPA = 68.
 *
 * The government has flagged a possible move to 68 earlier than legislated.
 * This calculator follows the law as currently enacted (2025).
 */

export type SpaInput = { dob: string /* YYYY-MM-DD */ };

export type SpaResult = {
  dob: string;
  spaYears: number;
  spaMonths: number; // additional months beyond spaYears (for sliding-scale births)
  /** ISO date the user reaches SPA. */
  spaDate: string;
  /** Plain-English summary. */
  notes: string;
};

function parseISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function iso(d: Date): string { return d.toISOString().slice(0, 10); }

function addYearsMonths(d: Date, years: number, months: number): Date {
  const out = new Date(d.getTime());
  out.setUTCFullYear(out.getUTCFullYear() + years);
  out.setUTCMonth(out.getUTCMonth() + months);
  return out;
}

export function statePensionAge(input: SpaInput): SpaResult {
  const dob = parseISO(input.dob);
  const y = dob.getUTCFullYear();
  const m = dob.getUTCMonth(); // 0=Jan

  // Helper: is dob on/after this UTC date?
  const onOrAfter = (yy: number, mm: number, dd: number) =>
    dob.getTime() >= Date.UTC(yy, mm - 1, dd);
  const before = (yy: number, mm: number, dd: number) =>
    dob.getTime() < Date.UTC(yy, mm - 1, dd);

  if (before(1960, 4, 6)) {
    const spaDate = addYearsMonths(dob, 66, 0);
    return { dob: input.dob, spaYears: 66, spaMonths: 0, spaDate: iso(spaDate), notes: "Reach State Pension Age at 66." };
  }
  if (onOrAfter(1960, 4, 6) && before(1961, 3, 6)) {
    // Sliding scale 66 → 67: add 1 calendar month per month after 5 Apr 1960.
    // Approximate by month index difference.
    const startYM = 1960 * 12 + 3; // April (m=3)
    const dobYM = y * 12 + m;
    const monthsAfter = dobYM - startYM; // 0..10
    const extraMonths = Math.max(0, Math.min(11, monthsAfter + 1));
    const spaDate = addYearsMonths(dob, 66, extraMonths);
    return {
      dob: input.dob,
      spaYears: 66,
      spaMonths: extraMonths,
      spaDate: iso(spaDate),
      notes: `Sliding scale: SPA is 66 years + ${extraMonths} months under the 2014 transitional rules.`,
    };
  }
  if (onOrAfter(1961, 3, 6) && before(1977, 4, 6)) {
    const spaDate = addYearsMonths(dob, 67, 0);
    return { dob: input.dob, spaYears: 67, spaMonths: 0, spaDate: iso(spaDate), notes: "Reach State Pension Age at 67." };
  }
  if (onOrAfter(1977, 4, 6) && before(1978, 4, 6)) {
    // Sliding scale 67 → 68 over 12 months (as legislated).
    const startYM = 1977 * 12 + 3;
    const dobYM = y * 12 + m;
    const monthsAfter = dobYM - startYM;
    const extraMonths = Math.max(0, Math.min(11, monthsAfter + 1));
    const spaDate = addYearsMonths(dob, 67, extraMonths);
    return {
      dob: input.dob,
      spaYears: 67,
      spaMonths: extraMonths,
      spaDate: iso(spaDate),
      notes: `Sliding scale: SPA is 67 years + ${extraMonths} months as currently legislated. May change if government brings forward the rise to 68.`,
    };
  }
  // Born 6 Apr 1978 or later
  const spaDate = addYearsMonths(dob, 68, 0);
  return { dob: input.dob, spaYears: 68, spaMonths: 0, spaDate: iso(spaDate), notes: "Reach State Pension Age at 68 (as currently legislated)." };
}
