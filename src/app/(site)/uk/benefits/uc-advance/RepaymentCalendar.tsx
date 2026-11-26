import { gbp } from "@/components/flagship/format";

/**
 * Twenty-four month cells, one for each Universal Credit payment after the
 * advance. In the months you are repaying, the cell fills with what is taken
 * from that payment: other deductions first, then the advance. A dashed guard
 * line marks the 15% cap, and anything above it is hatched red. The months
 * after the last repayment are left clear.
 */
export default function RepaymentCalendar({ months, monthly, other, cap, during, after }: { months: number; monthly: number; other: number; cap: number; during: number; after: number }) {
  const total = monthly + other;
  const top = Math.max(cap * 1.5, total * 1.12, 1);
  const pct = (n: number) => `${Math.min(100, (Math.max(0, n) / top) * 100)}%`;
  const over = Math.max(0, total - cap);
  const otherIn = Math.min(other, cap);
  const advanceIn = Math.max(0, Math.min(total, cap) - otherIn);
  const label =
    `Repayment calendar. For ${months} ${months === 1 ? "month" : "months"}, ${gbp(monthly, true)} is taken from each payment for the advance` +
    (other > 0 ? `, with ${gbp(other, true)} of other deductions` : "") +
    `. The 15% cap is ${gbp(cap, true)} a month${over > 0.005 ? `, so deductions are ${gbp(over, true)} over it` : ""}. ` +
    `You get ${gbp(during, true)} a month while repaying and ${gbp(after, true)} a month afterwards.`;
  return (
    <figure className="sa-adv-cal" role="img" aria-label={label}>
      <div className="sa-adv-calgrid" aria-hidden="true">
        <div className="sa-adv-cells">
          {Array.from({ length: 24 }, (_, i) => {
            const on = i < months && total > 0;
            return (
              <div key={i} className={`sa-adv-cell${on ? " is-on" : ""}${i === months - 1 ? " is-last" : ""}`}>
                {on && (
                  <>
                    {over > 0.005 && <span className="is-over" style={{ height: pct(over) }} />}
                    {advanceIn > 0.005 && <span className="is-advance" style={{ height: pct(advanceIn) }} />}
                    {otherIn > 0.005 && <span className="is-other" style={{ height: pct(otherIn) }} />}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {total > 0 && (
          <div className={`sa-adv-end${months > 13 ? " is-right" : ""}`} style={{ left: `${(months / 24) * 100}%` }}>
            <span>Paid off after month {months}</span>
          </div>
        )}
        <div className="sa-adv-guard" style={{ bottom: pct(cap) }}>
          <span>15% cap · {gbp(cap, true)}</span>
        </div>
      </div>
      <div className="sa-adv-monthrow" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className={i === 0 || (i + 1) % 6 === 0 ? "is-shown" : undefined}>
            {i + 1}
          </span>
        ))}
      </div>
      <p className="sa-adv-caltitle" aria-hidden="true">
        Monthly payments after the advance
      </p>
    </figure>
  );
}
