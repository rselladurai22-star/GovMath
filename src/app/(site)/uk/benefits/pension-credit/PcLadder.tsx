export type LadderPart = { key: string; label: string; amount: number; color: string };

/**
 * The income ladder: a vertical bar of the weekly income Pension Credit
 * counts, stacked from the ground up, with the guarantee drawn as a line
 * above it. The gap between the top of the income and the line is the
 * Guarantee Credit top-up; any Savings Credit sits on top as its own block.
 */
export default function PcLadder({
  parts,
  guarantee,
  guaranteeCredit,
  savingsCredit,
  money,
}: {
  parts: LadderPart[];
  guarantee: number;
  guaranteeCredit: number;
  savingsCredit: number;
  money: (n: number) => string;
}) {
  const shown = parts.filter((p) => p.amount > 0.005);
  const income = shown.reduce((a, p) => a + p.amount, 0);
  const top = Math.max(guarantee, income) + savingsCredit;
  const scale = Math.max(top * 1.12, 1);
  const pct = (n: number) => `${(Math.max(0, n) / scale) * 100}%`;
  const label =
    `Weekly income counted: ${shown.length ? shown.map((p) => `${p.label} ${money(p.amount)}`).join(", ") : "none"}, ${money(income)} in all. ` +
    `The guarantee is ${money(guarantee)}. ` +
    (guaranteeCredit > 0.005 ? `Pension Credit fills the gap of ${money(guaranteeCredit)}. ` : `Your income is ${money(income - guarantee)} above it. `) +
    (savingsCredit > 0.005 ? `Savings Credit adds ${money(savingsCredit)}.` : "");
  // Where each block starts: the sum of the blocks below it.
  const starts = shown.map((_, i) => shown.slice(0, i).reduce((a, p) => a + p.amount, 0));
  return (
    <figure className="sa-pc-fig" role="img" aria-label={label}>
      <div className="sa-pc-col" aria-hidden="true">
        {shown.map((p, i) => (
          <span key={p.key} className="sa-pc-block" style={{ bottom: pct(starts[i]), height: pct(p.amount), background: p.color }} />
        ))}
        {guaranteeCredit > 0.005 && (
          <span className="sa-pc-gap" style={{ bottom: pct(income), height: pct(guaranteeCredit) }}>
            <b>{money(guaranteeCredit)}</b>
          </span>
        )}
        {savingsCredit > 0.005 && <span className="sa-pc-sc" style={{ bottom: pct(Math.max(income, guarantee)), height: pct(savingsCredit) }} />}
        <i className="sa-pc-line" style={{ bottom: pct(guarantee) }} />
      </div>
      <div className="sa-pc-labels" aria-hidden="true">
        <span className="sa-pc-glabel" style={{ bottom: pct(guarantee) }}>
          Guarantee <b>{money(guarantee)}</b>
        </span>
        {Math.abs(income - guarantee) / scale > 0.09 && (
          <span className="sa-pc-ilabel" style={{ bottom: pct(income) }}>
            Your income <b>{money(income)}</b>
          </span>
        )}
      </div>
      <figcaption aria-hidden="true">
        {shown.map((p) => (
          <span key={p.key}>
            <i style={{ background: p.color }} />
            {p.label} <b>{money(p.amount)}</b>
          </span>
        ))}
        {guaranteeCredit > 0.005 && (
          <span className="is-gc">
            <i />
            Guarantee Credit <b>{money(guaranteeCredit)}</b>
          </span>
        )}
        {savingsCredit > 0.005 && (
          <span className="is-sc">
            <i />
            Savings Credit <b>{money(savingsCredit)}</b>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
