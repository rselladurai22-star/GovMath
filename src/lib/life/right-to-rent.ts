/**
 * Right to Rent (England): landlords must check every adult occupier's right
 * to rent before the tenancy starts, and repeat the check for people with
 * time-limited permission.
 *
 * Civil penalties from 13 February 2024: first breach up to £5,000 per lodger
 * and £10,000 per occupier; repeat breaches (within 3 years) up to £10,000 per
 * lodger and £20,000 per occupier.
 */

export const R2R_PENALTY = {
  first: { lodger: 5_000, occupier: 10_000 },
  repeat: { lodger: 10_000, occupier: 20_000 },
} as const;

/** The check must be made within 28 days before the tenancy starts. */
export const CHECK_WINDOW_DAYS = 28;

export type Status = "british-irish" | "settled" | "time-limited";

export type R2rInput = {
  status: Status;
  /** Tenancy start date, ISO. */
  start: string;
  /** End of permission to stay, ISO (time-limited only). */
  permissionEnds?: string;
};

export type R2rResult = {
  method: "manual" | "online";
  earliestCheck: string;
  latestCheck: string;
  followUp: boolean;
  /** Follow-up check due: the later of permission ending and 12 months after the first check. */
  followUpDue?: string;
};

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
};
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);
const addMonths = (d: Date, n: number) => {
  const r = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1));
  const last = new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth() + 1, 0)).getUTCDate();
  r.setUTCDate(Math.min(d.getUTCDate(), last));
  return r;
};

export function rightToRentPlan(i: R2rInput): R2rResult {
  const start = parse(i.start);
  const earliest = addDays(start, -CHECK_WINDOW_DAYS);
  const method = i.status === "british-irish" ? "manual" : "online";
  if (i.status !== "time-limited") return { method, earliestCheck: fmt(earliest), latestCheck: fmt(start), followUp: false };
  // Assume the first check is made on the tenancy start date (the latest it can be).
  const twelve = addMonths(start, 12);
  const ends = i.permissionEnds ? parse(i.permissionEnds) : twelve;
  const due = ends.getTime() > twelve.getTime() ? ends : twelve;
  return { method, earliestCheck: fmt(earliest), latestCheck: fmt(start), followUp: true, followUpDue: fmt(due) };
}

export type PenaltyInput = { lodgers: number; occupiers: number; repeat: boolean };

export function maxPenalty(p: PenaltyInput): number {
  const r = p.repeat ? R2R_PENALTY.repeat : R2R_PENALTY.first;
  return Math.max(0, Math.floor(p.lodgers)) * r.lodger + Math.max(0, Math.floor(p.occupiers)) * r.occupier;
}
