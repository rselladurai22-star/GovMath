import { gbp, gbpShort } from "@/components/flagship/format";

/**
 * The Plan 2 balance year by year to the write-off date (shaded area), with
 * the running total repaid as a line. A stretched SVG draws the shapes; the
 * labels are HTML so they keep their size on a phone.
 */
export default function BalanceChart({
  balances,
  repaid,
  startYear,
  years,
  clearedIn,
  writtenOff,
}: {
  /** Balance at the start, then at the end of each year. */
  balances: number[];
  /** Running total repaid, same points. */
  repaid: number[];
  /** Calendar year of the first point (April). */
  startYear: number;
  /** Years to the write-off. */
  years: number;
  clearedIn: number | null;
  writtenOff: number;
}) {
  const span = Math.max(1, years);
  const peak = Math.max(1, ...balances, ...repaid);
  const top = peak <= 50_000 ? Math.ceil(peak / 10_000) * 10_000 : Math.ceil(peak / 25_000) * 25_000;
  const X = (i: number) => (i / span) * 100;
  const Y = (v: number) => 100 - (Math.max(0, v) / top) * 100;
  const n = balances.length;
  const line = (vals: number[]) => vals.map((v, i) => `${i === 0 ? "M" : "L"}${X(i)} ${Y(v)}`).join(" ");
  const area = `${line(balances)} L${X(n - 1)} 100 L0 100 Z`;
  const endYear = startYear + span;
  const ticks = Array.from(new Set([0, Math.round(span / 3), Math.round((2 * span) / 3), span]));
  const total = repaid[n - 1] ?? 0;
  const label =
    `Balance from ${gbp(balances[0] ?? 0)} in ${startYear}` +
    (clearedIn !== null ? `, cleared after ${clearedIn} years in ${startYear + clearedIn}` : `, ${gbp(writtenOff)} left and written off in April ${endYear}`) +
    `. Total repaid ${gbp(total)}.`;

  return (
    <figure className="sa-p2-chart" role="img" aria-label={label}>
      <div className="sa-p2-plot" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={area} className="sa-p2-area" />
          <path d={line(balances)} className="sa-p2-bal" />
          <path d={line(repaid)} className="sa-p2-paid" />
          {clearedIn === null && <line x1="100" x2="100" y1="0" y2="100" className="sa-p2-end" />}
        </svg>
        <span className="sa-p2-ytick" style={{ top: "0%" }}>
          {gbpShort(top)}
        </span>
        <span className="sa-p2-ytick" style={{ top: "50%" }}>
          {gbpShort(top / 2)}
        </span>
        {clearedIn === null ? (
          <span className="sa-p2-flag" style={{ top: `${Math.min(80, Y(writtenOff))}%` }}>
            Written off <b>{gbp(writtenOff)}</b>
          </span>
        ) : (
          <span className={`sa-p2-flag is-cleared${X(clearedIn) > 60 ? "" : " is-left"}`} style={{ left: `${X(clearedIn)}%`, top: "84%" }}>
            Cleared <b>{startYear + clearedIn}</b>
          </span>
        )}
      </div>
      <div className="sa-p2-axis" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ left: `${X(t)}%` }}>
            {startYear + t}
          </span>
        ))}
      </div>
      <figcaption>
        <span>
          <i className="is-bal" aria-hidden="true" />
          Balance still owed
        </span>
        <span>
          <i className="is-paid" aria-hidden="true" />
          Repaid so far
        </span>
      </figcaption>
    </figure>
  );
}
