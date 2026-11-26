import type { PayWeek } from "@/lib/benefits/family";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "14 Feb 2027" (fixed, so the server and the browser print the same). `short` drops the year. */
export const fmtDate = (iso: string, short = false) => {
  const [y, m, d] = iso.split("-").map(Number);
  return short ? `${d} ${MONTHS[m - 1]}` : `${d} ${MONTHS[m - 1]} ${y}`;
};

export type PayGroup = { from: number; to: number; starts?: string; weekly: number; total: number; kind: "employer" | "first" | "flat" | "unpaid"; label: string };

/** Consecutive weeks at the same pay become one block of the ribbon. */
export function groupWeeks(weeks: PayWeek[], awe: number): PayGroup[] {
  const groups: PayGroup[] = [];
  for (const w of weeks) {
    const kind: PayGroup["kind"] = w.total <= 0 ? "unpaid" : w.employer > 0.005 ? "employer" : w.kind === "first" ? "first" : "flat";
    const last = groups[groups.length - 1];
    const statutoryOnly = (k: PayGroup["kind"]) => k === "first" || k === "flat";
    // 90% of low earnings is the same in week 6 and week 7: one block.
    if (last && (last.kind === kind || (statutoryOnly(last.kind) && statutoryOnly(kind))) && Math.abs(last.weekly - w.total) < 0.005) {
      last.to = w.week;
      last.total += w.total;
      continue;
    }
    const label = kind === "unpaid" ? "Unpaid" : kind === "employer" ? "With employer pay" : kind === "first" || Math.abs(w.total - 0.9 * awe) < 0.005 ? "90% of your pay" : "Flat rate";
    groups.push({ from: w.week, to: w.week, starts: w.starts, weekly: w.total, total: w.total, kind, label });
  }
  return groups;
}

/**
 * The year of leave drawn to scale: one block per stretch of weeks at the
 * same pay (90% of earnings, the flat rate, any employer pay, unpaid), with
 * the weekly amount inside wide blocks and the dates under each. The list
 * underneath is the text equivalent, and carries every figure.
 */
export default function LeaveRibbon({ groups, leave, money }: { groups: PayGroup[]; leave: number; money: (n: number) => string }) {
  const pct = (weeks: number) => `${(weeks / Math.max(1, leave)) * 100}%`;
  const label = `Your ${leave} weeks of leave: ` + groups.map((g) => `weeks ${g.from} to ${g.to}, ${g.kind === "unpaid" ? "unpaid" : `${money(g.weekly)} a week`}`).join("; ") + ".";
  return (
    <figure className="sa-mp-fig">
      <div className="sa-mp-bar" role="img" aria-label={label}>
        {groups.map((g) => {
          const weeks = g.to - g.from + 1;
          return (
            <span key={g.from} className={`sa-mp-block is-${g.kind}`} style={{ width: pct(weeks) }}>
              {weeks / leave >= 0.1 && <em>{g.kind === "unpaid" ? "£0" : money(g.weekly)}</em>}
            </span>
          );
        })}
      </div>
      <div className="sa-mp-scale" aria-hidden="true">
        <span>Week 1</span>
        <span>Week {leave}</span>
      </div>
      <figcaption>
        <ol className="sa-mp-groups">
          {groups.map((g) => (
            <li key={g.from} className={`is-${g.kind}`}>
              <i aria-hidden="true" />
              <span className="sa-mp-gweeks">
                {g.from === g.to ? `Week ${g.from}` : `Weeks ${g.from} to ${g.to}`}
                {g.starts && <small>from {fmtDate(g.starts)}</small>}
              </span>
              <span className="sa-mp-glabel">{g.label}</span>
              <b>{g.kind === "unpaid" ? "£0" : `${money(g.weekly)} a week`}</b>
              <span className="sa-mp-gtotal">{money(g.total)}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
