/**
 * The yearly bill as one bar, with the reduction English councils' schemes
 * could give marked on it as a band (from a strict scheme to a generous one)
 * and the reader's own council settings as a pin. Text equivalent in the
 * figure's label and the three lines under it.
 */
export default function SchemeRange({ bill, low, high, yours, money }: { bill: number; low: number; high: number; yours: number; money: (n: number) => string }) {
  const scale = Math.max(bill, 1);
  const pct = (n: number) => `${(Math.min(Math.max(0, n), scale) / scale) * 100}%`;
  const label = `Council tax ${money(bill)} a year. Depending on the council's scheme, the reduction could be from ${money(low)} to ${money(high)}. With the settings entered it is ${money(yours)}, leaving ${money(Math.max(0, bill - yours))} to pay.`;
  return (
    <figure className="sa-ct-fig" role="img" aria-label={label}>
      <div className="sa-ct-track" aria-hidden="true">
        <span className="sa-ct-sure" style={{ width: pct(low) }} />
        <span className="sa-ct-band" style={{ left: pct(low), width: `calc(${pct(high)} - ${pct(low)})` }} />
        <i className="sa-ct-pin" style={{ left: pct(yours) }} />
      </div>
      <div className="sa-ct-scale" aria-hidden="true">
        <span>£0</span>
        <span>Bill {money(bill)}</span>
      </div>
      <figcaption aria-hidden="true">
        <span className="is-sure">
          <i />
          Stricter scheme <b>{money(low)}</b>
        </span>
        <span className="is-band">
          <i />
          Most generous <b>{money(high)}</b>
        </span>
        <span className="is-pin">
          <i />
          Your settings <b>{money(yours)}</b>
        </span>
      </figcaption>
    </figure>
  );
}
