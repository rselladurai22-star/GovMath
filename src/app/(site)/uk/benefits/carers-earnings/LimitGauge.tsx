export type GaugePart = { key: string; label: string; amount: number };

/**
 * The weekly earnings limit as a hard line across a track. The fill is the
 * pay that counts: green while it stays under the line, red beyond it. The
 * deductions taken off gross pay (tax, NI, half the pension, care costs)
 * follow as lighter hatched blocks, so entering one visibly pulls the fill
 * back. Text equivalent in the aria-label and the legend.
 */
export default function LimitGauge({ counted, limit, deductions, money }: { counted: number; limit: number; deductions: GaugePart[]; money: (n: number) => string }) {
  const off = deductions.filter((d) => d.amount > 0.005);
  const gross = counted + off.reduce((a, d) => a + d.amount, 0);
  const scale = Math.max(limit * 1.5, gross * 1.04, 1);
  const pct = (n: number) => `${(Math.max(0, n) / scale) * 100}%`;
  const under = Math.min(counted, limit);
  const over = Math.max(0, counted - limit);
  const label =
    `Earnings that count: ${money(counted)} a week against a limit of ${money(limit)}. ` +
    (over > 0.005 ? `That is ${money(over)} over the limit.` : `That is ${money(limit - counted)} under the limit.`) +
    (off.length ? ` Taken off gross pay of ${money(gross)}: ${off.map((d) => `${d.label} ${money(d.amount)}`).join(", ")}.` : "");
  return (
    <figure className="sa-ca-fig" role="img" aria-label={label}>
      <div className="sa-ca-track" aria-hidden="true">
        <span className="sa-ca-under" style={{ width: pct(under) }} />
        {over > 0.005 && <span className="sa-ca-over" style={{ left: pct(limit), width: pct(over) }} />}
        {off.map((d, i) => (
          <span key={d.key} className={`sa-ca-off sa-ca-off--${d.key}`} style={{ left: pct(counted + off.slice(0, i).reduce((a, x) => a + x.amount, 0)), width: pct(d.amount) }} />
        ))}
        <i className="sa-ca-line" style={{ left: pct(limit) }} />
      </div>
      <div className="sa-ca-marks" aria-hidden="true">
        <span style={{ left: pct(limit) }}>Limit {money(limit)}</span>
      </div>
      <figcaption aria-hidden="true">
        <span className={over > 0.005 ? "is-over" : "is-under"}>
          <i />
          Earnings that count <b>{money(counted)}</b>
        </span>
        {off.map((d) => (
          <span key={d.key} className={`is-off is-off--${d.key}`}>
            <i />
            {d.label} <b>−{money(d.amount)}</b>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
