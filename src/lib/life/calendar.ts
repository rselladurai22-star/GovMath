/**
 * Dates: UK bank holidays by rule, working days, date differences and an
 * annual leave planner. All dates are ISO strings (YYYY-MM-DD) handled in UTC.
 *
 * Bank holiday rules (gov.uk/bank-holidays):
 *  England and Wales: New Year's Day, Good Friday, Easter Monday, early May
 *  (first Monday), spring (last Monday of May), summer (last Monday of August),
 *  Christmas Day, Boxing Day.
 *  Scotland: New Year's Day, 2 January, Good Friday, early May, spring, summer
 *  (first Monday of August), St Andrew's Day (30 November), Christmas, Boxing Day.
 *  Northern Ireland: England and Wales plus St Patrick's Day (17 March) and the
 *  Battle of the Boyne (12 July).
 *  A holiday on a weekend moves to the next working day.
 * One-off changes (for example coronations) are listed in SPECIAL.
 */

export type Nation = "england-and-wales" | "scotland" | "northern-ireland";
export type Holiday = { date: string; name: string };

export const NATION_LABEL: Record<Nation, string> = {
  "england-and-wales": "England and Wales",
  scotland: "Scotland",
  "northern-ireland": "Northern Ireland",
};

const DAY = 86_400_000;
export const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
};
export const fmt = (d: Date) => d.toISOString().slice(0, 10);
export const addDays = (iso: string, n: number) => fmt(new Date(parse(iso).getTime() + n * DAY));
const dow = (d: Date) => d.getUTCDay();
const ymd = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));

/** Gregorian Easter Sunday (anonymous Gregorian algorithm). */
export function easterSunday(year: number): string {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return fmt(ymd(year, month, day));
}

const firstMonday = (y: number, m: number) => {
  const d = ymd(y, m, 1);
  return new Date(d.getTime() + ((8 - dow(d)) % 7) * DAY);
};
const lastMonday = (y: number, m: number) => {
  const d = ymd(y, m + 1, 0);
  return new Date(d.getTime() - ((dow(d) + 6) % 7) * DAY);
};

/** One-off moves and extra days. */
const SPECIAL: Record<number, { remove?: string[]; add?: Holiday[] }> = {
  1999: { add: [{ date: "1999-12-31", name: "Millennium Eve" }] },
  2002: {
    remove: ["2002-05-27"],
    add: [
      { date: "2002-06-03", name: "Golden Jubilee bank holiday" },
      { date: "2002-06-04", name: "Spring bank holiday" },
    ],
  },
  2011: { add: [{ date: "2011-04-29", name: "Royal wedding" }] },
  2012: {
    remove: ["2012-05-28"],
    add: [
      { date: "2012-06-04", name: "Spring bank holiday" },
      { date: "2012-06-05", name: "Diamond Jubilee bank holiday" },
    ],
  },
  2020: { remove: ["2020-05-04"], add: [{ date: "2020-05-08", name: "Early May bank holiday (VE day)" }] },
  2022: {
    remove: ["2022-05-30"],
    add: [
      { date: "2022-06-02", name: "Spring bank holiday" },
      { date: "2022-06-03", name: "Platinum Jubilee bank holiday" },
      { date: "2022-09-19", name: "Bank holiday for the State Funeral of Queen Elizabeth II" },
    ],
  },
  2023: { add: [{ date: "2023-05-08", name: "Bank holiday for the coronation of King Charles III" }] },
};

export function bankHolidays(year: number, nation: Nation): Holiday[] {
  const list: Holiday[] = [];
  const easter = parse(easterSunday(year));
  const push = (d: Date, name: string) => list.push({ date: fmt(d), name });

  push(new Date(easter.getTime() - 2 * DAY), "Good Friday");
  if (nation !== "scotland") push(new Date(easter.getTime() + DAY), "Easter Monday");
  push(firstMonday(year, 5), "Early May bank holiday");
  push(lastMonday(year, 5), "Spring bank holiday");
  push(nation === "scotland" ? firstMonday(year, 8) : lastMonday(year, 8), "Summer bank holiday");

  const taken = new Set(list.map((h) => h.date));
  const place = (d0: Date, name: string) => {
    let d = d0;
    let substitute = false;
    while (dow(d) === 0 || dow(d) === 6 || taken.has(fmt(d))) {
      d = new Date(d.getTime() + DAY);
      substitute = true;
    }
    taken.add(fmt(d));
    list.push({ date: fmt(d), name: substitute ? `${name} (substitute day)` : name });
  };
  // New Year: in Scotland, 1 and 2 January move together in date order.
  place(ymd(year, 1, 1), "New Year's Day");
  if (nation === "scotland") place(ymd(year, 1, 2), "2nd January");
  if (nation === "northern-ireland") place(ymd(year, 3, 17), "St Patrick's Day");
  if (nation === "northern-ireland") place(ymd(year, 7, 12), "Battle of the Boyne (Orangemen's Day)");
  if (nation === "scotland") place(ymd(year, 11, 30), "St Andrew's Day");
  // Christmas: a holiday that falls on a weekday keeps its day; the other is substituted.
  const xmas = [
    { d: ymd(year, 12, 25), name: "Christmas Day" },
    { d: ymd(year, 12, 26), name: "Boxing Day" },
  ].sort((a, b) => Number(dow(a.d) === 0 || dow(a.d) === 6) - Number(dow(b.d) === 0 || dow(b.d) === 6));
  for (const x of xmas) place(x.d, x.name);

  const sp = SPECIAL[year];
  let out = list;
  if (sp?.remove) out = out.filter((h) => !sp.remove!.includes(h.date));
  if (sp?.add) out = out.concat(sp.add);
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

export function holidaySet(fromYear: number, toYear: number, nation: Nation): Set<string> {
  const s = new Set<string>();
  for (let y = fromYear; y <= toYear; y++) for (const h of bankHolidays(y, nation)) s.add(h.date);
  return s;
}

export const isWeekend = (iso: string) => {
  const w = dow(parse(iso));
  return w === 0 || w === 6;
};

export type WorkingDayCount = { total: number; weekends: number; holidays: Holiday[]; working: number };

/** Count days from start to end inclusive (or exclusive of the start date). */
export function countDays(start: string, end: string, nation: Nation, includeStart = true): WorkingDayCount {
  const a = parse(start);
  const b = parse(end);
  if (b < a) return { total: 0, weekends: 0, holidays: [], working: 0 };
  const hol = new Map<string, string>();
  for (let y = a.getUTCFullYear(); y <= b.getUTCFullYear(); y++) for (const h of bankHolidays(y, nation)) hol.set(h.date, h.name);
  let total = 0;
  let weekends = 0;
  let working = 0;
  const holidays: Holiday[] = [];
  for (let t = a.getTime() + (includeStart ? 0 : DAY); t <= b.getTime(); t += DAY) {
    const iso = fmt(new Date(t));
    total++;
    const we = isWeekend(iso);
    if (we) weekends++;
    const name = hol.get(iso);
    if (name && !we) holidays.push({ date: iso, name });
    if (!we && !name) working++;
  }
  return { total, weekends, holidays, working };
}

/** The date n working days after (or before, for negative n) a date. */
export function addWorkingDays(start: string, n: number, nation: Nation): string {
  const y = parse(start).getUTCFullYear();
  const hol = holidaySet(y - 2, y + 3, nation);
  let d = start;
  let left = Math.abs(Math.round(n));
  const step = n < 0 ? -1 : 1;
  while (left > 0) {
    d = addDays(d, step);
    if (!isWeekend(d) && !hol.has(d)) left--;
  }
  return d;
}

export type Diff = {
  days: number;
  weeks: number;
  weekDays: number;
  years: number;
  months: number;
  monthDays: number;
  totalMonths: number;
  hours: number;
};

/** Calendar difference from a to b (b after a), optionally counting the end date. */
export function dateDiff(a: string, b: string, includeEnd = false): Diff {
  let from = parse(a);
  let to = parse(b);
  if (to < from) [from, to] = [to, from];
  if (includeEnd) to = new Date(to.getTime() + DAY);
  const days = Math.round((to.getTime() - from.getTime()) / DAY);
  // Whole months: the most months that can be added to the start (clamping to
  // month ends, so 31 January plus one month is 28 February) without passing the end.
  const addMonthsClamped = (d: Date, n: number) => {
    const first = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
    const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
    return new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(d.getUTCDate(), last)));
  };
  let totalMonths = (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());
  while (totalMonths > 0 && addMonthsClamped(from, totalMonths) > to) totalMonths--;
  const monthDays = Math.round((to.getTime() - addMonthsClamped(from, totalMonths).getTime()) / DAY);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { days, weeks: Math.floor(days / 7), weekDays: days % 7, years, months, monthDays, totalMonths, hours: days * 24 };
}

export type LeavePlan = { from: string; to: string; leaveDays: number; daysOff: number; holidays: string[] };

/**
 * Ways to turn bank holidays into long breaks: for each holiday, the longest
 * run of consecutive days off that needs at most `maxLeave` days of annual
 * leave. Returns the best plan per holiday group, most efficient first.
 */
export function leavePlans(year: number, nation: Nation, maxLeave = 5): LeavePlan[] {
  const hol = holidaySet(year - 1, year + 1, nation);
  const names = new Map(bankHolidays(year, nation).map((h) => [h.date, h.name]));
  const isOff = (iso: string) => isWeekend(iso) || hol.has(iso);
  const plans: LeavePlan[] = [];
  for (const h of bankHolidays(year, nation)) {
    let best: LeavePlan | null = null;
    for (let s = -12; s <= 0; s++) {
      for (let e = 0; e <= 12; e++) {
        const from = addDays(h.date, s);
        const to = addDays(h.date, e);
        // A run must be bounded by working days so it is not already part of a longer off period.
        let leave = 0;
        for (let k = s; k <= e; k++) if (!isOff(addDays(h.date, k))) leave++;
        if (leave === 0 || leave > maxLeave) continue;
        if (!isOff(from) || !isOff(to)) continue;
        const days = e - s + 1;
        const ratio = days / leave;
        if (!best || ratio > best.daysOff / best.leaveDays + 1e-9 || (Math.abs(ratio - best.daysOff / best.leaveDays) < 1e-9 && days > best.daysOff)) {
          const inRun: string[] = [];
          for (let k = s; k <= e; k++) {
            const d = addDays(h.date, k);
            if (names.has(d)) inRun.push(names.get(d)!);
          }
          best = { from, to, leaveDays: leave, daysOff: days, holidays: inRun };
        }
      }
    }
    if (best && !plans.some((p) => p.from === best!.from && p.to === best!.to)) plans.push(best);
  }
  return plans.sort((a, b) => b.daysOff / b.leaveDays - a.daysOff / a.leaveDays || a.from.localeCompare(b.from));
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Date labels built by hand rather than with Intl, so the server and the
 * browser always produce identical text (avoids hydration mismatches).
 */
export function formatDate(iso: string, style: "long" | "medium" | "short" = "long"): string {
  const d = parse(iso);
  const day = d.getUTCDate();
  const month = MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const wd = WEEKDAYS[d.getUTCDay()];
  if (style === "short") return `${wd.slice(0, 3)} ${day} ${month.slice(0, 3)}`;
  if (style === "medium") return `${day} ${month} ${year}`;
  return `${wd} ${day} ${month} ${year}`;
}
