/**
 * Pregnancy due dates and menstrual cycle dates. All dates are ISO strings
 * (YYYY-MM-DD) handled in UTC through calendar.ts.
 *
 * Due date (Naegele's rule): 280 days (40 weeks) from the first day of the last
 * period, for a 28-day cycle. A longer or shorter cycle moves ovulation, so the
 * due date moves by (cycle length − 28) days. Pregnancy is counted from the
 * first day of the last period, so conception (ovulation) is about day 14 and
 * the due date is 266 days after conception.
 *
 * IVF: an embryo transferred 3 or 5 days after egg collection was "conceived"
 * that many days before the transfer, so the due date is 266 − 3 = 263 or
 * 266 − 5 = 261 days after the transfer.
 *
 * NHS figures (checked October 2026):
 *  - "Pregnancy normally lasts from 37 weeks to 42 weeks from the first day of
 *    your last period" (nhs.uk/pregnancy/finding-out/due-date-calculator).
 *  - Dating scan "at 11 to 14 weeks"; mid-pregnancy screening scan "between 18
 *    and 21 weeks" (nhs.uk/pregnancy/your-pregnancy-care/ultrasound-scans).
 *  - Trimesters: 2nd weeks 13 to 27, 3rd from week 28 (nhs.uk/pregnancy/week-by-week).
 *  - 24 weeks is when a baby is considered viable (NHS Start for Life, week 24).
 *  - Induction is offered if labour has not started by 41 weeks
 *    (nhs.uk/pregnancy/labour-and-birth/signs-of-labour/inducing-labour).
 *  - Ovulation happens "around 10 to 16 days before the next period"; sperm
 *    can survive "for up to 7 days"; cycles of 21 to 35 days are normal
 *    (nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle).
 */

import { addDays, parse } from "./calendar";

export const PREGNANCY_DAYS = 280;
export const CONCEPTION_TO_DUE = 266;
export const STANDARD_CYCLE = 28;
export const STANDARD_LUTEAL = 14;
/** Days before ovulation counted in the fertile window (the five days plus ovulation day). */
export const FERTILE_DAYS_BEFORE = 5;
export const NORMAL_CYCLE = { min: 21, max: 35 } as const;

export type DatingMethod = "lmp" | "conception" | "ivf3" | "ivf5" | "scan";

export type DatingInput = {
  method: DatingMethod;
  /** The date that goes with the method: last period, conception, transfer or scan date. */
  date: string;
  /** Average cycle length in days (LMP method only). */
  cycle?: number;
  /** Pregnancy length at the scan, in weeks and days (scan method only). */
  scanWeeks?: number;
  scanDays?: number;
};

export type Dating = {
  due: string;
  /** Start of the pregnancy count: the first day of the last period, adjusted for cycle length. */
  start: string;
  /** Estimated conception (ovulation) date. */
  conception: string;
};

const days = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / 86_400_000);

/** Due date, pregnancy start and conception from any of the five methods. */
export function datePregnancy(i: DatingInput): Dating {
  let start: string;
  switch (i.method) {
    case "lmp": {
      const cycle = Math.min(45, Math.max(20, Math.round(i.cycle ?? STANDARD_CYCLE)));
      start = addDays(i.date, cycle - STANDARD_CYCLE);
      break;
    }
    case "conception":
      start = addDays(i.date, -(PREGNANCY_DAYS - CONCEPTION_TO_DUE));
      break;
    case "ivf3":
    case "ivf5": {
      const embryo = i.method === "ivf3" ? 3 : 5;
      start = addDays(i.date, -(PREGNANCY_DAYS - CONCEPTION_TO_DUE) - embryo);
      break;
    }
    case "scan": {
      const w = Math.max(0, Math.min(42, Math.floor(i.scanWeeks ?? 12)));
      const d = Math.max(0, Math.min(6, Math.floor(i.scanDays ?? 0)));
      start = addDays(i.date, -(w * 7 + d));
      break;
    }
  }
  return { due: addDays(start, PREGNANCY_DAYS), start, conception: addDays(start, PREGNANCY_DAYS - CONCEPTION_TO_DUE) };
}

export type Trimester = 1 | 2 | 3;

export type Progress = {
  /** Days since the start of the pregnancy count (negative before it). */
  totalDays: number;
  weeks: number;
  days: number;
  trimester: Trimester;
  /** Days to the due date (negative once it has passed). */
  daysToDue: number;
  /** Share of 40 weeks done, 0 to 1. */
  share: number;
  status: "before" | "pregnant" | "term" | "overdue" | "past42";
};

export function trimesterFor(weeks: number): Trimester {
  return weeks < 13 ? 1 : weeks < 28 ? 2 : 3;
}

/** How far along a pregnancy is on a given day. */
export function progressOn(start: string, on: string): Progress {
  const totalDays = days(start, on);
  const t = Math.max(0, totalDays);
  const weeks = Math.floor(t / 7);
  const status: Progress["status"] =
    totalDays < 0 ? "before" : weeks >= 42 ? "past42" : totalDays > PREGNANCY_DAYS ? "overdue" : weeks >= 37 ? "term" : "pregnant";
  return {
    totalDays,
    weeks,
    days: t % 7,
    trimester: trimesterFor(weeks),
    daysToDue: PREGNANCY_DAYS - totalDays,
    share: Math.min(1, t / PREGNANCY_DAYS),
    status,
  };
}

/** "12 weeks 3 days". */
export function weeksAndDays(totalDays: number): string {
  const t = Math.max(0, Math.round(totalDays));
  const w = Math.floor(t / 7);
  const d = t % 7;
  return `${w} week${w === 1 ? "" : "s"}${d ? ` ${d} day${d === 1 ? "" : "s"}` : ""}`;
}

export type Milestone = { key: string; week: number; day: number; date: string; label: string; detail: string; uk?: boolean };

const MILESTONES: { key: string; week: number; day?: number; label: string; detail: string; uk?: boolean }[] = [
  { key: "conception", week: 2, label: "Conception (about)", detail: "Around ovulation, about two weeks after the first day of the last period." },
  { key: "test", week: 4, label: "Missed period", detail: "Most home tests can detect pregnancy from about now." },
  { key: "healthy-start", week: 10, label: "Healthy Start can start", detail: "From 10 weeks, eligible UK families can claim Healthy Start.", uk: true },
  { key: "dating-start", week: 11, label: "Dating scan window opens", detail: "The NHS dating scan is offered at 11 to 14 weeks." },
  { key: "dating-end", week: 13, day: 6, label: "Dating scan window closes", detail: "Last day of the 11 to 14 week window." },
  { key: "t2", week: 13, label: "Second trimester", detail: "Weeks 13 to 27." },
  { key: "anomaly-start", week: 18, label: "20-week scan window opens", detail: "The mid-pregnancy screening scan is offered between 18 and 21 weeks." },
  { key: "anomaly-end", week: 20, day: 6, label: "20-week scan window closes", detail: "Last day of the 18 to 21 week window." },
  { key: "viable", week: 24, label: "Viability", detail: "From 24 weeks a baby is considered viable: with intensive care, a baby born now could survive." },
  { key: "tell-employer", week: 25, label: "Tell your employer (UK)", detail: "By the end of the 15th week before the due date: that you are pregnant, the due date and when leave starts.", uk: true },
  { key: "t3", week: 28, label: "Third trimester", detail: "Week 28 to birth." },
  { key: "leave", week: 29, label: "Earliest maternity leave (UK)", detail: "Leave and the Sure Start Maternity Grant can start 11 weeks before the due date.", uk: true },
  { key: "term", week: 37, label: "Full term", detail: "Pregnancy normally lasts 37 to 42 weeks." },
  { key: "due", week: 40, label: "Due date", detail: "40 weeks. Only a small share of babies arrive on this exact day." },
  { key: "induction", week: 41, label: "Induction offered", detail: "The NHS offers induction if labour has not started by 41 weeks." },
  { key: "42", week: 42, label: "42 weeks", detail: "The end of the normal range. Extra monitoring is offered if you decline induction." },
];

/** Key dates from the start of the pregnancy count. */
export function milestones(start: string, includeUk = true): Milestone[] {
  return MILESTONES.filter((m) => includeUk || !m.uk).map((m) => {
    const day = m.day ?? 0;
    return { key: m.key, week: m.week, day, date: addDays(start, m.week * 7 + day), label: m.label, detail: m.detail, uk: m.uk };
  }).sort((a, b) => a.week * 7 + a.day - (b.week * 7 + b.day));
}

/** The date a given week and day of pregnancy begins. */
export const dateAtWeek = (start: string, week: number, day = 0) => addDays(start, week * 7 + day);


/* ── Ovulation and cycles ─────────────────────────────────────── */

export type CycleInput = {
  /** First day of the most recent period. */
  lastPeriod: string;
  cycle: number;
  /** Days from ovulation to the next period (usually 14; the NHS gives 10 to 16). */
  luteal?: number;
  /** Days of bleeding. */
  periodLength?: number;
  /** Irregular cycles: the shortest and longest recent cycles. */
  shortest?: number;
  longest?: number;
};

export type Cycle = {
  index: number;
  periodStart: string;
  periodEnd: string;
  ovulation: string;
  fertileStart: string;
  fertileEnd: string;
  /** Wider window for irregular cycles (shortest and longest cycles). */
  wideStart: string;
  wideEnd: string;
  nextPeriod: string;
  /** Due date if conception happens in this cycle. */
  dueIfConceived: string;
};

const clampCycle = (n: number) => Math.min(45, Math.max(20, Math.round(n)));

/** One cycle starting on periodStart. */
export function cycleFrom(periodStart: string, i: CycleInput, index = 0): Cycle {
  const cycle = clampCycle(i.cycle);
  const luteal = Math.min(18, Math.max(9, Math.round(i.luteal ?? STANDARD_LUTEAL)));
  const bleed = Math.min(10, Math.max(1, Math.round(i.periodLength ?? 5)));
  const ovDay = Math.max(1, cycle - luteal);
  const ovulation = addDays(periodStart, ovDay);
  const shortest = clampCycle(Math.min(i.shortest ?? cycle, cycle));
  const longest = clampCycle(Math.max(i.longest ?? cycle, cycle));
  return {
    index,
    periodStart,
    periodEnd: addDays(periodStart, bleed - 1),
    ovulation,
    fertileStart: addDays(ovulation, -FERTILE_DAYS_BEFORE),
    fertileEnd: ovulation,
    wideStart: addDays(periodStart, Math.max(0, shortest - luteal - FERTILE_DAYS_BEFORE)),
    wideEnd: addDays(periodStart, Math.max(1, longest - luteal)),
    nextPeriod: addDays(periodStart, cycle),
    dueIfConceived: datePregnancy({ method: "lmp", date: periodStart, cycle }).due,
  };
}

/**
 * The cycle that contains `today` (rolled forward from the last period if it
 * was several cycles ago), followed by `count − 1` more.
 */
export function cyclesAhead(i: CycleInput, today: string, count = 6): Cycle[] {
  const cycle = clampCycle(i.cycle);
  const since = days(i.lastPeriod, today);
  const skip = since > 0 ? Math.floor(since / cycle) : 0;
  const n = Math.max(1, Math.min(12, Math.round(count)));
  const out: Cycle[] = [];
  for (let k = 0; k < n; k++) out.push(cycleFrom(addDays(i.lastPeriod, (skip + k) * cycle), i, skip + k));
  return out;
}

export type DayPhase = "period" | "fertile" | "ovulation" | "luteal" | "follicular";

/** Which part of the cycle a day falls in. */
export function phaseOn(c: Cycle, on: string): DayPhase {
  if (on >= c.periodStart && on <= c.periodEnd) return "period";
  if (on === c.ovulation) return "ovulation";
  if (on >= c.fertileStart && on < c.ovulation) return "fertile";
  return on > c.ovulation ? "luteal" : "follicular";
}

/** Day of the cycle (day 1 = first day of the period). */
export const cycleDay = (c: Cycle, on: string) => days(c.periodStart, on) + 1;

export const daysBetween = days;
