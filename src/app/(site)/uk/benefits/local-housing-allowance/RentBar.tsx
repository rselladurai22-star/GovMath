/**
 * One bar for the rent. The part Local Housing Allowance covers is filled
 * green and the shortfall is hatched red. When the rent is under the limit,
 * the unused allowance is shown as an empty outline after it.
 */
export default function RentBar({ rent, limit, money, per }: { rent: number; limit: number; money: (n: number) => string; per: string }) {
  const covered = Math.min(rent, limit);
  const shortfall = Math.max(0, rent - limit);
  const spare = Math.max(0, limit - rent);
  const scale = Math.max(rent, limit, 1);
  const pct = (n: number) => `${(n / scale) * 100}%`;
  const label =
    shortfall > 0.005
      ? `Rent ${money(rent)} ${per}: ${money(covered)} is within the Local Housing Allowance and ${money(shortfall)} is not covered.`
      : `Rent ${money(rent)} ${per} is within the Local Housing Allowance of ${money(limit)}, with ${money(spare)} to spare.`;
  return (
    <figure className="sa-lha-rentbar" role="img" aria-label={label}>
      <div className="sa-lha-bar" aria-hidden="true">
        {covered > 0 && <span className="is-covered" style={{ width: pct(covered) }} />}
        {shortfall > 0.005 && <span className="is-short" style={{ width: pct(shortfall) }} />}
        {spare > 0.005 && <span className="is-spare" style={{ width: pct(spare) }} />}
        <i style={{ left: pct(limit) }} />
      </div>
      <div className="sa-lha-limit" aria-hidden="true">
        <span style={{ left: pct(limit) }} className={limit / scale > 0.7 ? "is-right" : limit / scale < 0.3 ? "is-left" : undefined}>
          LHA limit {money(limit)}
        </span>
      </div>
      <figcaption>
        <span className="is-covered">
          <i aria-hidden="true" />
          Can be covered <b>{money(covered)}</b>
        </span>
        {shortfall > 0.005 ? (
          <span className="is-short">
            <i aria-hidden="true" />
            You pay <b>{money(shortfall)}</b>
          </span>
        ) : (
          <span className="is-spare">
            <i aria-hidden="true" />
            Room under the limit <b>{money(spare)}</b>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
