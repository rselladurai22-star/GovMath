/**
 * State Pension age and amounts, and workplace pension projections.
 *
 * State Pension age (Pensions Acts 1995, 2007, 2011 and 2014):
 *  - Born 6 April 1960 to 5 March 1961: 66 plus 1 to 11 months, in periods
 *    running from the 6th of one month to the 5th of the next.
 *  - Born 6 March 1961 to 5 April 1977: 67.
 *  - Born 6 April 1977 to 5 April 1978: a fixed date between 6 May 2044 and
 *    6 March 2046.
 *  - Born on or after 6 April 1978: 68.
 * People born before 6 April 1960 reached State Pension age (66 or earlier)
 * by 5 April 2026.
 */

export const STATE_PENSION = { newWeekly: 241.3, basicWeekly: 184.9, qualifyingYears: 35, minimumYears: 10, deferralPerWeek: 1 / 9 / 100 } as const;

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
};
const fmt = (d: Date) => d.toISOString().slice(0, 10);

/** Add whole years and months, keeping the day of the month where it exists. */
function addYM(d: Date, years: number, months: number): Date {
  const total = d.getUTCMonth() + months;
  const y = d.getUTCFullYear() + years + Math.floor(total / 12);
  const m = ((total % 12) + 12) % 12;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), last)));
}

export type SpaResult = { date: string; years: number; months: number; already: boolean; band: "before-1960" | "66-67" | "67" | "67-68" | "68"; ageText: string };

export function statePensionAge2026(dob: string, today = "2026-10-04"): SpaResult {
  const d = parse(dob);
  const t = d.getTime();
  const on = (y: number, m: number, day: number) => Date.UTC(y, m - 1, day);
  let date: Date;
  let band: SpaResult["band"];
  if (t < on(1960, 4, 6)) {
    date = addYM(d, 66, 0);
    band = "before-1960";
  } else if (t < on(1961, 3, 6)) {
    // Periods from the 6th to the 5th: 6 Apr to 5 May 1960 adds 1 month, and so on.
    const monthsSinceApril = (d.getUTCFullYear() - 1960) * 12 + d.getUTCMonth() - 3 - (d.getUTCDate() <= 5 ? 1 : 0);
    const extra = Math.min(11, Math.max(1, monthsSinceApril + 1));
    date = addYM(d, 66, extra);
    band = "66-67";
  } else if (t < on(1977, 4, 6)) {
    date = addYM(d, 67, 0);
    band = "67";
  } else if (t < on(1978, 4, 6)) {
    // Fixed dates two months apart, from 6 May 2044 to 6 March 2046.
    const idx = (d.getUTCFullYear() - 1977) * 12 + d.getUTCMonth() - 3 - (d.getUTCDate() <= 5 ? 1 : 0);
    date = addYM(new Date(Date.UTC(2044, 4, 6)), 0, 2 * Math.min(11, Math.max(0, idx)));
    band = "67-68";
  } else {
    date = addYM(d, 68, 0);
    band = "68";
  }
  // Age at State Pension age, in years and months.
  let months = (date.getUTCFullYear() - d.getUTCFullYear()) * 12 + date.getUTCMonth() - d.getUTCMonth();
  if (date.getUTCDate() < d.getUTCDate()) months -= 1;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return {
    date: fmt(date),
    years,
    months: rem,
    already: fmt(date) <= today,
    band,
    ageText: rem ? `${years} years and ${rem} ${rem === 1 ? "month" : "months"}` : `${years}`,
  };
}

/** New State Pension for a number of qualifying years (no contracted-out deduction). */
export function newStatePension(qualifyingYears: number): { weekly: number; annual: number; eligible: boolean } {
  const y = Math.max(0, Math.floor(qualifyingYears));
  if (y < STATE_PENSION.minimumYears) return { weekly: 0, annual: 0, eligible: false };
  const weekly = (STATE_PENSION.newWeekly * Math.min(y, STATE_PENSION.qualifyingYears)) / STATE_PENSION.qualifyingYears;
  return { weekly, annual: weekly * 52, eligible: true };
}

/**
 * Deferring the new State Pension adds the equivalent of 1% for every 9 weeks
 * (just under 5.8% for 52 weeks). You must defer for at least 9 weeks.
 */
export function deferral(weekly: number, weeksDeferred: number): { weekly: number; extra: number; breakEvenYears: number } {
  const whole = Math.max(0, Math.floor(weeksDeferred));
  const w = whole >= 9 ? whole : 0;
  const extra = weekly * (w / 9) * 0.01;
  const forgone = weekly * w;
  return { weekly: weekly + extra, extra, breakEvenYears: extra > 0 ? forgone / extra / 52 : 0 };
}

/* ── Workplace pension ──────────────────────────────────────────── */

export const AUTO_ENROL = { trigger: 10_000, lower: 6_240, upper: 50_270, minTotal: 0.08, minEmployer: 0.03 } as const;

export type WorkplaceInput = {
  salary: number;
  employeePct: number;
  employerPct: number;
  basis: "qualifying" | "full";
  age: number;
  retireAge: number;
  pot: number;
  /** Real salary growth a year (decimal). */
  salaryGrowth: number;
  /** Real investment return a year after charges (decimal). */
  realReturn: number;
};

export type WorkplaceYear = { age: number; pot: number; contributions: number };

export type WorkplaceResult = {
  pensionable: number;
  employee: number;
  employer: number;
  total: number;
  /** Employee contribution after basic-rate relief. */
  employeeNet: number;
  meetsMinimum: boolean;
  enrolled: boolean;
  path: WorkplaceYear[];
  pot: number;
  taxFree: number;
  /** Sustainable yearly income at 4% from the pot, in today's money. */
  income: number;
};

export function pensionableEarnings(salary: number, basis: "qualifying" | "full"): number {
  const s = Math.max(0, salary);
  return basis === "qualifying" ? Math.max(0, Math.min(s, AUTO_ENROL.upper) - AUTO_ENROL.lower) : s;
}

export function workplacePension(i: WorkplaceInput): WorkplaceResult {
  const pensionable = pensionableEarnings(i.salary, i.basis);
  const employee = pensionable * Math.max(0, i.employeePct) / 100;
  const employer = pensionable * Math.max(0, i.employerPct) / 100;
  const qe = pensionableEarnings(i.salary, "qualifying");
  const meetsMinimum = employee + employer >= qe * AUTO_ENROL.minTotal - 0.005 && employer >= qe * AUTO_ENROL.minEmployer - 0.005;
  const years = Math.max(0, Math.round(i.retireAge - i.age));
  let pot = Math.max(0, i.pot);
  let salary = Math.max(0, i.salary);
  const path: WorkplaceYear[] = [{ age: i.age, pot, contributions: 0 }];
  const monthlyRate = Math.pow(1 + i.realReturn, 1 / 12) - 1;
  for (let y = 1; y <= years; y++) {
    const pe = pensionableEarnings(salary, i.basis);
    const yearly = pe * (Math.max(0, i.employeePct) + Math.max(0, i.employerPct)) / 100;
    for (let m = 0; m < 12; m++) pot = pot * (1 + monthlyRate) + yearly / 12;
    path.push({ age: i.age + y, pot, contributions: yearly });
    salary *= 1 + i.salaryGrowth;
  }
  return {
    pensionable,
    employee,
    employer,
    total: employee + employer,
    employeeNet: employee * 0.8,
    meetsMinimum,
    enrolled: i.salary >= AUTO_ENROL.trigger,
    path,
    pot,
    taxFree: Math.min(pot * 0.25, 268_275),
    income: pot * 0.04,
  };
}
