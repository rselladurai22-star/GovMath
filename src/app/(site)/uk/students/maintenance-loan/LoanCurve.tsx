import { gbp, gbpShort } from "@/components/flagship/format";

/**
 * The Maintenance Loan against household income for one living situation:
 * flat at the maximum to £25,000, falling in a straight line to the
 * minimum, flat again after. The shaded band between the maximum and the
 * curve is what Student Finance England expects the household to make up;
 * the reader's own income is marked, with their gap drawn as a bracket.
 * A stretched SVG draws the shapes; labels are HTML so text keeps its size.
 */
export default function LoanCurve({
  income,
  loan,
  max,
  min,
  minAt,
  knee,
  kneeLoan,
}: {
  income: number;
  loan: number;
  max: number;
  min: number;
  minAt: number;
  /** Where the taper changes slope (students who can claim benefits), if it does. */
  knee?: number;
  kneeLoan?: number;
}) {
  const top = Math.ceil(max / 1000) * 1000 + 1000;
  const right = Math.max(80_000, Math.ceil((minAt + 15_000) / 10_000) * 10_000);
  const lo = Math.max(0, Math.floor((min - 2_000) / 1000) * 1000);
  const X = (v: number) => (Math.min(right, Math.max(0, v)) / right) * 100;
  const Y = (v: number) => 100 - ((Math.max(lo, v) - lo) / (top - lo)) * 100;
  const pts: [number, number][] = [
    [0, max],
    [25_000, max],
    ...(knee !== undefined && kneeLoan !== undefined && knee < minAt ? ([[knee, kneeLoan]] as [number, number][]) : []),
    [minAt, min],
    [right, min],
  ];
  const curve = pts.map(([x, y]) => `${X(x)} ${Y(y)}`).join(" L");
  const gap = `M${curve} L100 ${Y(max)} L0 ${Y(max)} Z`;
  const here = Math.min(right, income);
  const ticks = [0, 25_000, 50_000, right >= 100_000 ? 100_000 : 75_000].filter((t) => t <= right);
  const yTicks = [min, max];
  const gapNow = max - loan;
  const label =
    `Maintenance Loan by household income: ${gbp(max)} up to ${gbp(25_000)}, falling to ${gbp(min)} at ${gbp(minAt)} and above. ` +
    `At ${gbp(income)} the loan is ${gbp(loan)}` +
    (gapNow > 0 ? `, ${gbp(gapNow)} below the maximum.` : ", the maximum.");

  return (
    <figure className="sa-ml-curve" role="img" aria-label={label}>
      <div className="sa-ml-plot" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d={gap} className="sa-ml-gap" />
          <path d={`M${curve}`} className="sa-ml-line" />
          <line x1="0" x2="100" y1={Y(max)} y2={Y(max)} className="sa-ml-max" />
          {gapNow > 0 && <line x1={X(here)} x2={X(here)} y1={Y(max)} y2={Y(loan)} className="sa-ml-bracket" />}
        </svg>
        {yTicks.map((t) => (
          <span key={t} className="sa-ml-ytick" style={{ top: `${Y(t)}%` }}>
            {gbp(t)}
          </span>
        ))}
        {income < minAt && (
          <span className="sa-ml-gaplabel" style={{ top: `${(Y(max) + Y(min)) / 2}%` }}>
            Expected from your household
          </span>
        )}
        <span className={`sa-ml-dot${X(here) > 70 ? " is-right" : ""}`} style={{ left: `${X(here)}%`, top: `${Y(loan)}%` }}>
          <b>{gbp(loan)}</b>
          <small>at {gbpShort(income)}</small>
        </span>
      </div>
      <div className="sa-ml-axis" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ left: `${X(t)}%` }}>
            {gbpShort(t)}
          </span>
        ))}
      </div>
      <figcaption>Household income a year</figcaption>
    </figure>
  );
}
