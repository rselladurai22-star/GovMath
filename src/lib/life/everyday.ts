/**
 * Everyday maths: percentages, pro-rata rent and timesheets.
 */

import { parse } from "./calendar";

/* ── Percentages ──────────────────────────────────────────────── */

export const percentOf = (pct: number, of: number) => (pct / 100) * of;
export const whatPercent = (part: number, whole: number) => (whole === 0 ? 0 : (part / whole) * 100);
export const percentChange = (from: number, to: number) => (from === 0 ? 0 : ((to - from) / Math.abs(from)) * 100);
export const addPercent = (value: number, pct: number) => value * (1 + pct / 100);
export const subtractPercent = (value: number, pct: number) => value * (1 - pct / 100);
/** The original value before a percentage increase (or decrease, if negative). */
export const reversePercent = (final: number, pct: number) => (pct === -100 ? 0 : final / (1 + pct / 100));
/** Percentage-point change between two rates. */
export const percentagePoints = (fromPct: number, toPct: number) => toPct - fromPct;
/** Overall change from applying several percentage changes in turn. */
export const compoundChange = (changes: number[]) => (changes.reduce((acc, c) => acc * (1 + c / 100), 1) - 1) * 100;
/** Split an amount in a ratio, rounding each share to pence so the shares add up exactly. */
export function splitByRatio(amount: number, parts: number[]): number[] {
  const total = parts.reduce((a, b) => a + Math.max(0, b), 0);
  if (total <= 0) return parts.map(() => 0);
  const pence = Math.round(amount * 100);
  const raw = parts.map((p) => (Math.max(0, p) / total) * pence);
  const floor = raw.map(Math.floor);
  let left = pence - floor.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => ({ i, frac: r - Math.floor(r) })).sort((a, b) => b.frac - a.frac);
  for (const o of order) {
    if (left <= 0) break;
    floor[o.i]++;
    left--;
  }
  return floor.map((p) => p / 100);
}

/* ── Pro-rata rent ────────────────────────────────────────────── */

export type ProRataMethod = "annual" | "month";

const DAY = 86_400_000;
const daysInclusive = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / DAY) + 1;
const daysInMonth = (iso: string) => {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
};

export type ProRataResult = { days: number; dailyRate: number; amount: number; method: ProRataMethod; periodDays: number };

/**
 * Rent for the days from `from` to `to` inclusive.
 * "annual": daily rate = monthly rent × 12 ÷ 365 (366 in a leap year), the usual
 * method in tenancy agreements. "month": daily rate = monthly rent ÷ days in the
 * month of `from`.
 */
export function proRataRent(monthlyRent: number, from: string, to: string, method: ProRataMethod): ProRataResult {
  const days = Math.max(0, daysInclusive(from, to));
  const y = parse(from).getUTCFullYear();
  const yearDays = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
  const periodDays = method === "annual" ? yearDays : daysInMonth(from);
  const dailyRate = method === "annual" ? (Math.max(0, monthlyRent) * 12) / yearDays : Math.max(0, monthlyRent) / periodDays;
  return { days, dailyRate, amount: dailyRate * days, method, periodDays };
}

/** Last day of the month containing a date. */
export function monthEnd(iso: string): string {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
}
export function monthStart(iso: string): string {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString().slice(0, 10);
}

export const weeklyToMonthlyRent = (weekly: number) => (weekly * 52) / 12;
export const monthlyToWeeklyRent = (monthly: number) => (monthly * 12) / 52;

/* ── Timesheets ───────────────────────────────────────────────── */

/** "09:30" → minutes after midnight. */
export function toMinutes(hhmm: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return NaN;
  return Number(m[1]) * 60 + Number(m[2]);
}
export const minutesToDecimal = (minutes: number) => minutes / 60;
/** 7.75 → "7:45". */
export function decimalToHhmm(hours: number): string {
  const total = Math.round(Math.max(0, hours) * 60);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export type Shift = { start: string; end: string; breakMins: number };

/** Hours worked in a shift, allowing for an overnight finish. */
export function shiftHours(s: Shift): number {
  const a = toMinutes(s.start);
  let b = toMinutes(s.end);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  if (b <= a) b += 24 * 60;
  return Math.max(0, b - a - Math.max(0, s.breakMins)) / 60;
}

export type TimesheetResult = {
  hours: number[];
  total: number;
  regular: number;
  overtime: number;
  pay: number;
};

/** Weekly total, with hours above `overtimeAfter` paid at `overtimeRate` × the hourly rate. */
export function timesheet(shifts: Shift[], hourly: number, overtimeAfter: number, overtimeRate: number): TimesheetResult {
  const hours = shifts.map(shiftHours);
  const total = hours.reduce((a, b) => a + b, 0);
  const regular = overtimeAfter > 0 ? Math.min(total, overtimeAfter) : total;
  const overtime = Math.max(0, total - regular);
  const pay = regular * Math.max(0, hourly) + overtime * Math.max(0, hourly) * Math.max(1, overtimeRate);
  return { hours, total, regular, overtime, pay };
}
