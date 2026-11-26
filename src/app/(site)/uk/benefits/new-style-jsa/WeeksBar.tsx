/**
 * The 26 weeks of New Style JSA as a row of week blocks, after the 7 unpaid
 * waiting days. Each block's fill is the share of the full personal rate
 * still paid that week, so pension and part-time pay show as a lower fill.
 * After week 26 only Universal Credit can carry on.
 */
export default function WeeksBar({ weekly, personal, weeks, money }: { weekly: number; personal: number; weeks: number; money: (n: number) => string }) {
  const share = personal > 0 ? Math.min(1, Math.max(0, weekly / personal)) : 0;
  const label =
    weekly > 0
      ? `7 waiting days unpaid, then ${weeks} weeks of New Style JSA at ${money(weekly)} a week${share < 1 ? `, ${Math.round(share * 100)}% of the full ${money(personal)}` : ""}: ${money(weekly * weeks)} in all. After week ${weeks}, only Universal Credit.`
      : `No New Style JSA is paid in any of the ${weeks} weeks on these figures.`;
  return (
    <figure className="sa-jsa-fig" role="img" aria-label={label}>
      <div className="sa-jsa-weeks" aria-hidden="true">
        <span className="sa-jsa-wait" title="Waiting days">
          <i />
        </span>
        {Array.from({ length: weeks }, (_, i) => (
          <span key={i} className={i % 4 === 3 ? "is-mark" : undefined}>
            <i style={{ height: `${share * 100}%` }} />
          </span>
        ))}
        <span className="sa-jsa-after" />
      </div>
      <div className="sa-jsa-axis" aria-hidden="true">
        <span>Waiting days</span>
        <span>Week 1</span>
        <span>Week 13</span>
        <span>Week {weeks}</span>
        <span>Then Universal Credit only</span>
      </div>
    </figure>
  );
}
