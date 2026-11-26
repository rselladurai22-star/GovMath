export type TopUpRow = { label: string; cost: number; topUp: number; cap: number; capped: boolean };

/**
 * One bar per child, drawn to the same scale: what you pay in and what the
 * government adds stack up to the cost. The top-up block stops growing at the
 * child's limit, marked on the bar; spending beyond it is yours alone,
 * hatched. Text equivalent in each bar's label and the legend.
 */
export default function TopUpBars({ rows, money, share }: { rows: TopUpRow[]; money: (n: number) => string; share: number }) {
  const scale = Math.max(...rows.map((r) => Math.max(r.cost, r.cap / share)), 1) * 1.04;
  const pct = (n: number) => `${(Math.max(0, n) / scale) * 100}%`;
  return (
    <div className="sa-tf-fig">
      {rows.map((r) => {
        const limitAt = r.cap / share;
        const covered = Math.min(r.cost, limitAt);
        const youShare = covered - r.topUp;
        const beyond = Math.max(0, r.cost - limitAt);
        const label =
          `${r.label}: childcare ${money(r.cost)} a year. You pay ${money(r.cost - r.topUp)}, the government adds ${money(r.topUp)}. ` +
          (beyond > 0 ? `${money(beyond)} is above the ${money(limitAt)} that reaches the limit and gets no top-up.` : `The top-up limit of ${money(r.cap)} is reached at ${money(limitAt)}.`);
        return (
          <div key={r.label} className="sa-tf-row">
            <p className="sa-tf-rowhead">
              <span>{r.label}</span>
              <b>{money(r.cost)}</b>
            </p>
            <div className="sa-tf-track" role="img" aria-label={label}>
              <span className="sa-tf-you" style={{ left: 0, width: pct(youShare) }} />
              <span className="sa-tf-gov" style={{ left: pct(youShare), width: pct(r.topUp) }} />
              {beyond > 0 && <span className="sa-tf-beyond" style={{ left: pct(covered), width: pct(beyond) }} />}
              <i className="sa-tf-limit" style={{ left: pct(limitAt) }} />
            </div>
            <p className={`sa-tf-limitlabel${limitAt / scale > 0.6 ? " is-right" : ""}`} aria-hidden="true" style={{ left: pct(limitAt) }}>
              Limit reached at {money(limitAt)}
            </p>
          </div>
        );
      })}
      <p className="sa-tf-legend" aria-hidden="true">
        <span className="is-you">
          <i />
          You pay in
        </span>
        <span className="is-gov">
          <i />
          Government adds
        </span>
        {rows.some((r) => r.cost > r.cap / share) && (
          <span className="is-beyond">
            <i />
            Above the limit, all yours
          </span>
        )}
      </p>
    </div>
  );
}
