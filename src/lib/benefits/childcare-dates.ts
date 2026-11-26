/**
 * Funded childcare in England: when each offer starts for a child, from the
 * date of birth.
 *
 * Every offer starts at the beginning of the term after the child reaches the
 * age, and terms start on 1 January, 1 April and 1 September (GOV.UK, "Free
 * Childcare for Working Parents: when to apply", "15 hours free childcare for
 * 2 year olds" and "for 3 and 4-year-olds"):
 *
 * - reaches the age between 1 September and 31 December: from 1 January
 * - between 1 January and 31 March: from 1 April
 * - between 1 April and 31 August: from 1 September
 *
 * Working parents can apply from 23 weeks old, and must apply by the day
 * before the term starts (31 December, 31 March or 31 August). Funding stops
 * when the child starts reception, which is the September after the fourth
 * birthday (or at compulsory school age, if the child starts later).
 */

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;
const parts = (s: string) => s.split("-").map(Number) as [number, number, number];
const utc = (s: string) => {
  const [y, m, d] = parts(s);
  return Date.UTC(y, m - 1, d);
};
const fromUtc = (t: number) => {
  const d = new Date(t);
  return iso(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
};

export const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(utc(s));

/** Months later, with the day held at the month's last day when it does not exist (31 May + 9 months = 29 February in a leap year). */
export function addMonths(s: string, months: number): string {
  const [y, m, d] = parts(s);
  const total = y * 12 + (m - 1) + months;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  const last = new Date(Date.UTC(ny, nm, 0)).getUTCDate();
  return iso(ny, nm, Math.min(d, last));
}

export const addDays = (s: string, days: number) => fromUtc(utc(s) + days * 86_400_000);
export const daysBetween = (a: string, b: string) => Math.round((utc(b) - utc(a)) / 86_400_000);

/** The first day of the term after a child reaches an age on this date. */
export function termAfter(reached: string): string {
  const [y, m] = parts(reached);
  if (m >= 9) return iso(y + 1, 1, 1);
  if (m <= 3) return iso(y, 4, 1);
  return iso(y, 9, 1);
}

/** The first 1 September after a date (strictly after: a fourth birthday on 1 September waits a year). */
export function septemberAfter(s: string): string {
  const [y, m] = parts(s);
  return m >= 9 ? iso(y + 1, 9, 1) : iso(y, 9, 1);
}

export type ChildcareOffer = {
  /** The date the child reaches the age. */
  reached: string;
  /** When the funded hours start. */
  starts: string;
  /** Apply by this date (the day before the term starts). */
  applyBy: string;
};

export type ChildcareTimeline = {
  dob: string;
  /** Free Childcare for Working Parents: 30 hours from 9 months. */
  working: ChildcareOffer & { applyFrom: string };
  /** Early Learning for 2 year olds (families on certain benefits): 15 hours. */
  twos: ChildcareOffer & { applyFrom: string };
  /** The universal 15 hours for every 3 and 4-year-old. */
  universal: ChildcareOffer;
  /** Funded hours end when the child starts reception. */
  school: string;
};

/** When each offer can start for a child born on this date. */
export function childcareTimeline(dob: string): ChildcareTimeline {
  const nine = addMonths(dob, 9);
  const two = addMonths(dob, 24);
  const three = addMonths(dob, 36);
  const four = addMonths(dob, 48);
  const offer = (reached: string): ChildcareOffer => {
    const starts = termAfter(reached);
    return { reached, starts, applyBy: addDays(starts, -1) };
  };
  const twoOffer = offer(two);
  // Two-year-old places: apply from the start of the term in which the child turns 2.
  const [ty, tm] = parts(two);
  const twosFrom = tm >= 9 ? iso(ty, 9, 1) : tm <= 3 ? iso(ty, 1, 1) : iso(ty, 4, 1);
  return {
    dob,
    working: { ...offer(nine), applyFrom: addDays(dob, 23 * 7) },
    twos: { ...twoOffer, applyFrom: twosFrom },
    universal: offer(three),
    school: septemberAfter(four),
  };
}

export type FundedFamily = {
  /** Every parent in the household meets the working parent test. */
  working: boolean;
  /** The family gets a benefit that qualifies a 2-year-old (or the child does). */
  twosEligible: boolean;
};

/** Funded hours a week on a given date. */
export function fundedHoursOn(t: ChildcareTimeline, on: string, f: FundedFamily): number {
  if (on < t.dob || on >= t.school) return 0;
  if (f.working && on >= t.working.starts) return 30;
  // A 2-year-old can have 15 hours through Early Learning for 2 year olds plus 15 through the working parent offer.
  if (f.twosEligible && on >= t.twos.starts && on < t.universal.starts) return 15;
  if (on >= t.universal.starts) return 15;
  return 0;
}

export type FundedStep = { from: string; hours: number; route: "none" | "working" | "twos" | "universal" };

/** The funded hours from birth to school, as steps that start on each change. */
export function fundedSteps(t: ChildcareTimeline, f: FundedFamily): FundedStep[] {
  const dates = [t.dob, t.working.starts, t.twos.starts, t.universal.starts, t.school].filter((d, i, a) => a.indexOf(d) === i).sort();
  const steps: FundedStep[] = [];
  for (const from of dates) {
    const hours = fundedHoursOn(t, from, f);
    const route: FundedStep["route"] =
      hours === 0 ? "none" : f.working && from >= t.working.starts ? "working" : from >= t.universal.starts ? "universal" : "twos";
    const last = steps[steps.length - 1];
    if (last && last.hours === hours && last.route === route) continue;
    steps.push({ from, hours, route });
  }
  return steps;
}
