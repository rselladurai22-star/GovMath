export type MeansStep = { label: string; note?: string; cut: number };

/**
 * The legacy means test as a statement that narrows step by step: it starts
 * from the full amount (the rent, or the council tax bill) and each line takes
 * something off, with a bar under it showing what is left against the
 * starting amount. The last line is the award. Shared by the Housing Benefit
 * and Council Tax Reduction calculators; styles in the "Means statement"
 * block of public/gm/sumatlas-ds.css (`sa-ms-`).
 */
export default function MeansStatement({ start, startLabel, steps, resultLabel, money, caption, note }: { start: number; startLabel: string; steps: MeansStep[]; resultLabel: string; money: (n: number) => string; caption: string; note?: string }) {
  const scale = Math.max(start, 0.01);
  const pct = (n: number) => `${(Math.max(0, Math.min(n, scale)) / scale) * 100}%`;
  const rows = steps
    .filter((s) => s.cut > 0.005)
    .reduce<(MeansStep & { cut: number; after: number })[]>((acc, s) => {
      const before = acc.length ? acc[acc.length - 1].after : start;
      return [...acc, { ...s, cut: Math.min(s.cut, before), after: Math.max(0, before - s.cut) }];
    }, []);
  const left = rows.length ? rows[rows.length - 1].after : start;
  return (
    <figure className="sa-ms" aria-label={caption}>
      <ol className="sa-ms-rows">
        <li className="sa-ms-start">
          <p>
            <span>{startLabel}</span>
            <b>{money(start)}</b>
          </p>
          <div className="sa-ms-bar" aria-hidden="true">
            <span className="sa-ms-left" style={{ width: pct(start) }} />
          </div>
        </li>
        {rows.map((r) => (
          <li key={r.label}>
            <p>
              <span>
                {r.label}
                {r.note && <small>{r.note}</small>}
              </span>
              <b className="sa-ms-cut">−{money(r.cut)}</b>
            </p>
            <div className="sa-ms-bar" aria-hidden="true">
              <span className="sa-ms-left" style={{ width: pct(r.after) }} />
              <span className="sa-ms-gone" style={{ left: pct(r.after), width: pct(r.cut) }} />
            </div>
          </li>
        ))}
        {note && <li className="sa-ms-note">{note}</li>}
        <li className="sa-ms-total">
          <p>
            <span>{resultLabel}</span>
            <b>{money(left)}</b>
          </p>
        </li>
      </ol>
    </figure>
  );
}
