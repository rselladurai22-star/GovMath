import { gbp, percent } from "@/components/flagship/format";

/**
 * One bar: the Child Benefit kept (green) and the part paid back through the
 * High Income Child Benefit Charge (red), labelled in HTML underneath.
 */
export default function KeptBar({ keep, charge, share, partYear }: { keep: number; charge: number; share: number; partYear: boolean }) {
  const total = keep + charge;
  const keptShare = total > 0 ? keep / total : 1;
  const period = partYear ? "for those weeks" : "a year";
  return (
    <figure
      className="sa-cb-kept"
      role="img"
      aria-label={`Of ${gbp(total, true)} Child Benefit ${period}, you keep ${gbp(keep, true)} and pay back ${gbp(charge, true)} (${percent(share, 0)}) through the High Income Child Benefit Charge.`}
    >
      <div className="sa-cb-keptbar" aria-hidden="true">
        {keep > 0.005 && <span className="is-kept" style={{ flex: keptShare }} />}
        {charge > 0.005 && <span className="is-charge" style={{ flex: 1 - keptShare }} />}
      </div>
      <figcaption>
        <span className="is-kept">
          You keep <b>{gbp(keep, true)}</b> {period}
        </span>
        <span className="is-charge">
          Paid back <b>{gbp(charge, true)}</b>
        </span>
      </figcaption>
    </figure>
  );
}
