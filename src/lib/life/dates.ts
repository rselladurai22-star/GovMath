/**
 * Everyday date and time maths: exact age, adding to dates (calendar or
 * working days), countdowns and hours between times. Dates are ISO strings
 * (YYYY-MM-DD) handled in UTC, as in calendar.ts, whose bank holiday rules
 * this file reuses.
 */

import { addDays, bankHolidays, easterSunday, parse, type Holiday, type Nation } from "./calendar";

const DAY = 86_400_000;
const fmt = (d: Date) => d.toISOString().slice(0, 10);

export const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** True for a real calendar date written YYYY-MM-DD (rejects 2026-02-30). */
export function isIsoDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const y = Number(s.slice(0, 4));
  if (y < 1 || y > 9999) return false;
  return fmt(parse(s)) === s;
}

/** Whole days from a to b (negative if b is earlier). */
export const daysFrom = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / DAY);

export const weekday = (iso: string) => parse(iso).getUTCDay();
export const weekdayName = (iso: string) => WEEKDAY_NAMES[weekday(iso)];
export const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** Add calendar months, keeping the day but clamping to the month's end (31 Jan + 1 month = 28 or 29 Feb). */
export function addMonths(iso: string, n: number): string {
  const d = parse(iso);
  const first = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + Math.round(n), 1));
  const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return fmt(new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(d.getUTCDate(), last))));
}

/** Day of the year, 1 to 366. */
export function dayOfYear(iso: string): number {
  return daysFrom(`${iso.slice(0, 4)}-01-01`, iso) + 1;
}

/** ISO 8601 week number (weeks start on Monday; week 1 holds the year's first Thursday). */
export function isoWeek(iso: string): number {
  const d = parse(iso);
  const thursday = new Date(d.getTime() + (3 - ((d.getUTCDay() + 6) % 7)) * DAY);
  const jan1 = Date.UTC(thursday.getUTCFullYear(), 0, 1);
  return Math.floor((thursday.getTime() - jan1) / DAY / 7) + 1;
}

/* ── Age ───────────────────────────────────────────── */

/** Where a 29 February birthday falls in a year without 29 February. */
export type LeapRule = "feb28" | "mar1";

/** The birthday in a given year. */
export function birthdayIn(dob: string, year: number, rule: LeapRule = "mar1"): string {
  const md = dob.slice(5);
  const y = String(year).padStart(4, "0");
  if (md === "02-29" && !isLeapYear(year)) return rule === "feb28" ? `${y}-02-28` : `${y}-03-01`;
  return `${y}-${md}`;
}

export type Age = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  weekDays: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  lastBirthday: string;
  nextBirthday: string;
  daysToNext: number;
  turning: number;
  nextHalfBirthday: string;
  bornOn: string;
};

/** Exact age on a date, or null if the date is before the birth date. */
export function ageOn(dob: string, on: string, rule: LeapRule = "mar1"): Age | null {
  if (on < dob) return null;
  const by = parse(dob).getUTCFullYear();
  let year = parse(on).getUTCFullYear();
  if (birthdayIn(dob, year, rule) > on) year--;
  const years = Math.max(0, year - by);
  const lastBirthday = years === 0 ? dob : birthdayIn(dob, year, rule);
  let months = 0;
  while (months < 11 && addMonths(lastBirthday, months + 1) <= on) months++;
  const days = daysFrom(addMonths(lastBirthday, months), on);
  const totalDays = daysFrom(dob, on);
  const nextBirthday = birthdayIn(dob, by + years + 1, rule);
  const halfA = addMonths(lastBirthday, 6);
  return {
    years,
    months,
    days,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    weekDays: totalDays % 7,
    totalDays,
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    lastBirthday,
    nextBirthday,
    daysToNext: daysFrom(on, nextBirthday),
    turning: years + 1,
    nextHalfBirthday: halfA > on ? halfA : addMonths(nextBirthday, 6),
    bornOn: weekdayName(dob),
  };
}

export type Milestone = { label: string; date: string };

/** Round-number ages in days, weeks, months, hours and seconds, in date order. */
export function ageMilestones(dob: string): Milestone[] {
  const list: Milestone[] = [];
  for (const n of [1_000, 5_000, 10_000, 15_000, 20_000, 25_000, 30_000]) list.push({ label: `${n.toLocaleString("en-GB")} days old`, date: addDays(dob, n) });
  for (const n of [500, 1_000, 2_000, 3_000, 4_000]) list.push({ label: `${n.toLocaleString("en-GB")} weeks old`, date: addDays(dob, n * 7) });
  for (const n of [100, 250, 500, 750, 1_000]) list.push({ label: `${n.toLocaleString("en-GB")} months old`, date: addMonths(dob, n) });
  for (const n of [100_000, 250_000, 500_000]) list.push({ label: `${n.toLocaleString("en-GB")} hours old`, date: addDays(dob, Math.floor(n / 24)) });
  for (const n of [1, 2]) list.push({ label: `${n} billion seconds old`, date: addDays(dob, Math.floor((n * 1e9) / 86_400)) });
  return list.sort((a, b) => a.date.localeCompare(b.date) || a.label.localeCompare(b.label));
}

/* ── Adding to dates ───────────────────────────────── */

export type Period = { years: number; months: number; weeks: number; days: number };

/** Add (sign 1) or take away (sign −1) a period: years and months first, then weeks and days. */
export function shiftDate(start: string, p: Period, sign: 1 | -1): string {
  const months = Math.round(p.years) * 12 + Math.round(p.months);
  const moved = months ? addMonths(start, sign * months) : start;
  return addDays(moved, sign * (Math.round(p.weeks) * 7 + Math.round(p.days)));
}

/** Which days count: every day, Monday to Friday, or Monday to Friday less a UK nation's bank holidays. */
export type DayRule = { kind: "calendar" } | { kind: "weekdays" } | { kind: "uk"; nation: Nation };

function holidayLookup(rule: DayRule) {
  const cache = new Map<number, Map<string, string>>();
  return (iso: string): string | undefined => {
    if (rule.kind !== "uk") return undefined;
    const y = Number(iso.slice(0, 4));
    if (!cache.has(y)) cache.set(y, new Map(bankHolidays(y, rule.nation).map((h) => [h.date, h.name])));
    return cache.get(y)!.get(iso);
  };
}
const isWeekendIso = (iso: string) => {
  const w = weekday(iso);
  return w === 0 || w === 6;
};

export type WorkingShift = { date: string; weekendDays: number; holidays: Holiday[]; calendarDays: number };

/**
 * The date n working days after (or before, for negative n) a start date.
 * The start date itself is day 0, so 1 working day after a Friday is the Monday.
 */
export function shiftWorkingDays(start: string, n: number, rule: DayRule): WorkingShift {
  const step = n < 0 ? -1 : 1;
  let left = Math.abs(Math.round(n));
  if (rule.kind === "calendar") {
    const date = addDays(start, step * left);
    return { date, weekendDays: 0, holidays: [], calendarDays: left };
  }
  const holidayName = holidayLookup(rule);
  let d = start;
  let weekendDays = 0;
  const holidays: Holiday[] = [];
  while (left > 0) {
    d = addDays(d, step);
    if (isWeekendIso(d)) weekendDays++;
    else {
      const name = holidayName(d);
      if (name) holidays.push({ date: d, name });
      else left--;
    }
  }
  return { date: d, weekendDays, holidays: step < 0 ? holidays.reverse() : holidays, calendarDays: Math.abs(daysFrom(start, d)) };
}

/** Working days strictly between two dates (neither end counted). */
export function workingDaysBetween(a: string, b: string, rule: DayRule): { working: number; weekendDays: number; holidays: Holiday[] } {
  const holidayName = holidayLookup(rule);
  let working = 0;
  let weekendDays = 0;
  const holidays: Holiday[] = [];
  for (let d = addDays(a, 1); d < b; d = addDays(d, 1)) {
    if (rule.kind === "calendar") working++;
    else if (isWeekendIso(d)) weekendDays++;
    else {
      const name = holidayName(d);
      if (name) holidays.push({ date: d, name });
      else working++;
    }
  }
  return { working, weekendDays, holidays };
}

/* ── Countdowns ────────────────────────────────────── */

export type Preset = "christmas" | "newyear" | "easter" | "bankholiday" | "custom";

/** The next date (today or later) for a preset event. */
export function presetDate(preset: Exclude<Preset, "custom">, today: string, nation: Nation): Holiday {
  const y = Number(today.slice(0, 4));
  const firstOnOrAfter = (make: (year: number) => string) => (make(y) >= today ? make(y) : make(y + 1));
  if (preset === "christmas") return { date: firstOnOrAfter((yr) => `${yr}-12-25`), name: "Christmas Day" };
  if (preset === "newyear") return { date: firstOnOrAfter((yr) => `${yr}-01-01`), name: "New Year's Day" };
  if (preset === "easter") return { date: firstOnOrAfter(easterSunday), name: "Easter Sunday" };
  const next = [...bankHolidays(y, nation), ...bankHolidays(y + 1, nation)].find((h) => h.date >= today);
  return next ?? { date: `${y + 1}-01-01`, name: "New Year's Day" };
}

export type Countdown = {
  past: boolean;
  days: number;
  weeks: number;
  weekDays: number;
  months: number;
  monthDays: number;
  hours: number;
  saturdays: number;
  working: number;
  holidays: Holiday[];
};

/**
 * From today to a target date. Days and hours count from midnight today to
 * midnight at the start of the target day. Weekends count the Saturdays after
 * today up to the target; working days are those strictly between.
 */
export function countdown(today: string, target: string, rule: DayRule): Countdown {
  const past = target < today;
  const [a, b] = past ? [target, today] : [today, target];
  const days = daysFrom(a, b);
  let totalMonths = 0;
  while (addMonths(a, totalMonths + 1) <= b) totalMonths++;
  const monthDays = daysFrom(addMonths(a, totalMonths), b);
  let saturdays = 0;
  for (let d = addDays(a, 1); d <= b; d = addDays(d, 1)) if (weekday(d) === 6) saturdays++;
  const between = workingDaysBetween(a, b, rule);
  return {
    past,
    days,
    weeks: Math.floor(days / 7),
    weekDays: days % 7,
    months: totalMonths,
    monthDays,
    hours: days * 24,
    saturdays,
    working: between.working,
    holidays: between.holidays,
  };
}

/** Days, hours, minutes and seconds in a number of seconds (negative treated as zero). */
export function splitSeconds(total: number): { d: number; h: number; m: number; s: number } {
  const t = Math.max(0, Math.floor(total));
  return { d: Math.floor(t / 86_400), h: Math.floor((t % 86_400) / 3_600), m: Math.floor((t % 3_600) / 60), s: t % 60 };
}

/* ── Times and durations ───────────────────────────── */

/**
 * A clock time in minutes after midnight: "9", "09:30", "9.30", "930", "1730",
 * "9:30pm", "12am". NaN if it is not a valid time.
 */
export function parseClock(raw: string): number {
  const s = raw.trim().toLowerCase().replace(/\s+/g, "");
  const m = /^(\d{1,2})(?:[:.]?(\d{2}))?(am|pm)?$/.exec(s);
  if (!m) return NaN;
  let h = Number(m[1]);
  const min = m[2] === undefined ? 0 : Number(m[2]);
  if (min > 59) return NaN;
  if (m[3]) {
    if (h < 1 || h > 12) return NaN;
    if (h === 12) h = 0;
    if (m[3] === "pm") h += 12;
  } else if (h > 24 || (h === 24 && min > 0)) return NaN;
  return h * 60 + min;
}

/**
 * A length of time in minutes: "7:30", "7h 30m", "7h", "45m", "90 min" or
 * decimal hours such as "7.5". NaN if it cannot be read.
 */
export function parseDuration(raw: string): number {
  const s = raw.trim().toLowerCase();
  if (!s) return NaN;
  let m = /^(\d{1,4}):(\d{1,2})$/.exec(s);
  if (m) return Number(m[2]) > 59 ? NaN : Number(m[1]) * 60 + Number(m[2]);
  m = /^(?:(\d{1,4}(?:\.\d+)?)\s*h(?:ours?|rs?)?)?\s*(?:(\d{1,5})\s*m(?:in(?:ute)?s?)?)?$/.exec(s);
  if (m && (m[1] || m[2])) return Math.round(Number(m[1] ?? 0) * 60) + Number(m[2] ?? 0);
  m = /^(\d{1,4}(?:\.\d+)?)$/.exec(s);
  if (m) return Math.round(Number(m[1]) * 60);
  return NaN;
}

export type Span = { gross: number; net: number; overnight: boolean; breakTooLong: boolean };

/** Minutes from start to end (crossing midnight if end is not after start), less a break. */
export function timeBetween(start: number, end: number, breakMins = 0): Span {
  if (!Number.isFinite(start) || !Number.isFinite(end)) return { gross: 0, net: 0, overnight: false, breakTooLong: false };
  const overnight = end <= start;
  const gross = overnight ? end + 1_440 - start : end - start;
  const b = Math.max(0, breakMins);
  return { gross, net: Math.max(0, gross - b), overnight, breakTooLong: b > gross };
}

export type DurationItem = { text: string; sign: 1 | -1 };

/** The sum of a list of durations; blank lines are skipped and unreadable ones reported by index. */
export function sumDurations(items: DurationItem[]): { total: number; used: number; invalid: number[] } {
  let total = 0;
  let used = 0;
  const invalid: number[] = [];
  items.forEach((it, i) => {
    if (!it.text.trim()) return;
    const mins = parseDuration(it.text);
    if (!Number.isFinite(mins)) invalid.push(i);
    else {
      total += it.sign * mins;
      used++;
    }
  });
  return { total, used, invalid };
}

/** 450 → "7:30"; −75 → "−1:15". */
export function hhmm(minutes: number): string {
  const m = Math.round(Number.isFinite(minutes) ? minutes : 0);
  const a = Math.abs(m);
  return `${m < 0 ? "−" : ""}${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}`;
}

/** 450 → "7 hours 30 minutes". */
export function hoursMinutes(minutes: number): string {
  const m = Math.round(Number.isFinite(minutes) ? minutes : 0);
  const a = Math.abs(m);
  const h = Math.floor(a / 60);
  const r = a % 60;
  const parts = [];
  if (h) parts.push(`${h.toLocaleString("en-GB")} hour${h === 1 ? "" : "s"}`);
  if (r || !h) parts.push(`${r} minute${r === 1 ? "" : "s"}`);
  return `${m < 0 ? "minus " : ""}${parts.join(" ")}`;
}

/** Minutes as decimal hours, rounded to 2 places (7:45 → 7.75). */
export const decimalHours = (minutes: number) => Math.round((Number.isFinite(minutes) ? minutes : 0) / 60 * 100) / 100;

/** A clock time in minutes as "09:30" (24-hour) or "9:30am". */
export function clockLabel(minutes: number, style: "24h" | "12h" = "24h"): string {
  const t = ((Math.round(minutes) % 1_440) + 1_440) % 1_440;
  const h = Math.floor(t / 60);
  const m = String(t % 60).padStart(2, "0");
  if (style === "24h") return `${String(h).padStart(2, "0")}:${m}`;
  return `${h % 12 === 0 ? 12 : h % 12}:${m}${h < 12 ? "am" : "pm"}`;
}

/** The finishing time after working a number of minutes from a start, plus a break. */
export const finishTime = (start: number, worked: number, breakMins = 0) => start + Math.max(0, worked) + Math.max(0, breakMins);
