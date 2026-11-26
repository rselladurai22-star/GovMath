export type CapPart = { key: string; label: string; amount: number; color: string };

/**
 * One bar: the benefits that count towards the cap, laid end to end, with the
 * cap drawn as a line across it. Whatever lies beyond the line is hatched
 * red: that is the amount taken off.
 */
export default function CapBar({ parts, cap, money, per }: { parts: CapPart[]; cap: number; money: (n: number) => string; per: string }) {
  const shown = parts.filter((p) => p.amount > 0.005);
  const counted = shown.reduce((a, p) => a + p.amount, 0);
  const excess = Math.max(0, counted - cap);
  const scale = Math.max(counted, cap, 1) * 1.04;
  const pct = (n: number) => `${(n / scale) * 100}%`;
  const label =
    `Benefits counted towards the cap: ${shown.map((p) => `${p.label} ${money(p.amount)}`).join(", ")}, ${money(counted)} ${per} in all. The cap is ${money(cap)}. ` +
    (excess > 0.005 ? `${money(excess)} is over the cap.` : `That is ${money(cap - counted)} under the cap.`);
  const capAt = cap / scale;
  return (
    <figure className="sa-cap-fig" role="img" aria-label={label}>
      <div className="sa-cap-bar" aria-hidden="true">
        <div className="sa-cap-parts">
          {shown.map((p) => (
            <span key={p.key} style={{ width: pct(p.amount), background: p.color }} />
          ))}
        </div>
        {excess > 0.005 && <span className="sa-cap-excess" style={{ left: pct(cap), width: pct(excess) }} />}
        <i className="sa-cap-line" style={{ left: pct(cap) }} />
      </div>
      <div className="sa-cap-marks" aria-hidden="true">
        <span style={{ left: pct(cap) }} className={capAt > 0.75 ? "is-right" : capAt < 0.25 ? "is-left" : undefined}>
          Cap {money(cap)}
        </span>
      </div>
      <figcaption>
        {shown.map((p) => (
          <span key={p.key}>
            <i style={{ background: p.color }} aria-hidden="true" />
            {p.label} <b>{money(p.amount)}</b>
          </span>
        ))}
        {excess > 0.005 && (
          <span className="is-excess">
            <i aria-hidden="true" />
            Over the cap <b>{money(excess)}</b>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
