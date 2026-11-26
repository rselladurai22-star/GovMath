/**
 * Pro-rata rent: rent for part of a month.
 */

import { parse } from "./calendar";

export type ProRataMethod = "annual" | "month";

const DAY = 86_400_000;
const daysInclusive = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / DAY) + 1;
const daysInMonth = (iso: string) => {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
};

/** One calendar month's share of a part period. */
export type ProRataPart = { from: string; to: string; days: number; periodDays: number; dailyRate: number; amount: number };

export type ProRataResult = {
  days: number;
  /** Daily rate of the first month in the period (later months can differ: see `parts`). */
  dailyRate: number;
  amount: number;
  method: ProRataMethod;
  /** Days the first month's daily rate is based on: 365 or 366, or the days in that month. */
  periodDays: number;
  /** The period split by calendar month, each at its own daily rate. */
  parts: ProRataPart[];
};

const iso = (d: Date) => d.toISOString().slice(0, 10);
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/**
 * Rent for the days from `from` to `to` inclusive.
 * "annual": daily rate = monthly rent × 12 ÷ 365 (366 in a leap year), the usual
 * method in tenancy agreements. "month": daily rate = monthly rent ÷ days in
 * that calendar month. A period that runs into another month is charged month
 * by month, so a whole calendar month inside it costs exactly one month's rent
 * under the "month" method, and days either side of 31 December use each
 * year's own length under the "annual" method.
 */
export function proRataRent(monthlyRent: number, from: string, to: string, method: ProRataMethod): ProRataResult {
  const rent = Math.max(0, monthlyRent);
  const days = Math.max(0, daysInclusive(from, to));
  const rate = (day: string) => {
    const periodDays = method === "annual" ? (isLeap(parse(day).getUTCFullYear()) ? 366 : 365) : daysInMonth(day);
    return { periodDays, dailyRate: method === "annual" ? (rent * 12) / periodDays : rent / periodDays };
  };
  const parts: ProRataPart[] = [];
  let start = from;
  while (days > 0 && start <= to) {
    const end = monthEnd(start) < to ? monthEnd(start) : to;
    const n = daysInclusive(start, end);
    const r = rate(start);
    parts.push({ from: start, to: end, days: n, ...r, amount: r.dailyRate * n });
    start = iso(new Date(parse(end).getTime() + DAY));
  }
  const first = rate(from);
  return { days, dailyRate: first.dailyRate, amount: parts.reduce((a, p) => a + p.amount, 0), method, periodDays: first.periodDays, parts };
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
