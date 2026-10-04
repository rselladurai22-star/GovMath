/**
 * Driving licence renewal at 70 and MOT dates.
 *
 * Licence: drivers must renew at 70 and every 3 years after; renewal is free
 * and can be done up to 90 days before. Photocards under 70 last 10 years.
 * MOT: first test on the 3rd anniversary of registration in Great Britain (4th
 * in Northern Ireland), then yearly. You can test up to a month minus a day
 * before expiry and keep the same renewal date. Cars over 40 years old are
 * usually exempt. Maximum fee £54.85 for a car.
 */

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
};
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const DAY = 86_400_000;

function addYears(iso: string, years: number): string {
  const d = parse(iso);
  const y = d.getUTCFullYear() + years;
  const last = new Date(Date.UTC(y, d.getUTCMonth() + 1, 0)).getUTCDate();
  return fmt(new Date(Date.UTC(y, d.getUTCMonth(), Math.min(d.getUTCDate(), last))));
}
export const addDaysIso = (iso: string, n: number) => fmt(new Date(parse(iso).getTime() + n * DAY));
export const daysBetween = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / DAY);

function ageOn(dob: string, on: string): number {
  const a = parse(dob);
  const b = parse(on);
  let age = b.getUTCFullYear() - a.getUTCFullYear();
  if (b.getUTCMonth() < a.getUTCMonth() || (b.getUTCMonth() === a.getUTCMonth() && b.getUTCDate() < a.getUTCDate())) age -= 1;
  return age;
}

/* ── Licence at 70 ──────────────────────────────────────────────── */

export type LicenceResult = {
  age: number;
  /** Next date the licence must be renewed. */
  next: string;
  nextAge: number;
  /** Earliest date you can apply. */
  applyFrom: string;
  daysToNext: number;
  /** Renewal dates from 70 to 100. */
  schedule: { age: number; date: string }[];
  over70: boolean;
};

export function licenceRenewal(dob: string, today: string, photocardExpiry?: string): LicenceResult {
  const age = ageOn(dob, today);
  const schedule: { age: number; date: string }[] = [];
  for (let a = 70; a <= 100; a += 3) schedule.push({ age: a, date: addYears(dob, a) });
  let next = schedule.find((x) => x.date >= today) ?? schedule[schedule.length - 1];
  // Under 70, a photocard that expires before the 70th birthday must be renewed first.
  if (age < 70 && photocardExpiry && photocardExpiry >= today && photocardExpiry < schedule[0].date) next = { age: ageOn(dob, photocardExpiry), date: photocardExpiry };
  return {
    age,
    next: next.date,
    nextAge: next.age,
    applyFrom: addDaysIso(next.date, -90),
    daysToNext: daysBetween(today, next.date),
    schedule,
    over70: age >= 70,
  };
}

/* ── MOT ────────────────────────────────────────────────────────── */

export const MOT = { carFee: 54.85, motorcycleFee: 29.65, fine: 1_000, dangerousFine: 2_500, historicYears: 40 } as const;

export type MotInput = {
  /** Date of first registration. */
  firstReg: string;
  /** Expiry of the current MOT, if it has had one. */
  expiry?: string;
  northernIreland: boolean;
  today: string;
};

export type MotResult = {
  firstDue: string;
  /** Date the current or next MOT runs out. */
  due: string;
  /** Earliest date to test and keep the renewal date. */
  earliest: string;
  daysToDue: number;
  overdue: boolean;
  needsFirst: boolean;
  historic: boolean;
  ageYears: number;
};

export function motDates(i: MotInput): MotResult {
  const firstDue = addYears(i.firstReg, i.northernIreland ? 4 : 3);
  const ageYears = ageOn(i.firstReg, i.today);
  const needsFirst = i.today < firstDue && !i.expiry;
  const due = i.expiry && i.expiry > "" ? i.expiry : firstDue;
  // Up to a month minus a day before expiry: e.g. expiry 15 May, earliest 16 April.
  const d = parse(due);
  const earliest = fmt(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, d.getUTCDate() + 1)));
  return {
    firstDue,
    due,
    earliest,
    daysToDue: daysBetween(i.today, due),
    overdue: due < i.today,
    needsFirst,
    historic: ageYears >= MOT.historicYears,
    ageYears,
  };
}

/** UK number plate, current and older formats. */
export const normaliseReg = (raw: string) => raw.replace(/\s+/g, "").toUpperCase();
export const validReg = (raw: string) => /^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,3}$|^[A-Z]{2}[0-9]{2}[A-Z]{3}$|^[0-9]{1,4}[A-Z]{1,3}$/.test(normaliseReg(raw));
export const motCheckUrl = (raw: string) => `https://www.check-mot.service.gov.uk/results?registration=${encodeURIComponent(normaliseReg(raw))}`;
