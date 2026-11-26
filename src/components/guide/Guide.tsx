import type { ReactNode } from "react";

/**
 * Shared long-form guide template and visual library.
 *
 * A guide is a <Guide> with a contents list, numbered <GuideSection>s holding
 * plain HTML prose (p, ul, strong, a), and figures from this file. Every
 * component is a server component; only the contents highlighter (TocSpy)
 * runs in the browser.
 */

/** Categorical chart colours, in fixed order. Validated for colour-blind separation. */
export const SERIES = ["var(--g-c1)", "var(--g-c2)", "var(--g-c3)", "var(--g-c4)"] as const;
/** Neutral fill for "nothing due" bands. */
export const NEUTRAL = "var(--g-track)";

export type TocItem = { id: string; title: string };
export type Source = { label: string; href: string };

/** Pounds for guide charts. */
const money = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

/* ── Frame ─────────────────────────────────────────── */

export function Guide({
  kicker,
  title,
  intro,
  toc,
  sources,
  sourcesNote,
  children,
}: {
  kicker: string;
  title: string;
  intro: ReactNode;
  toc: TocItem[];
  /** Short facts under the intro, e.g. "12 min read" (not shown in the approved design). */
  meta?: string[];
  sources?: Source[];
  sourcesNote?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section id="guide" className="guideintro">
        <p className="eyebrow">{kicker.toUpperCase()}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </section>
      <div className="guide-layout">
        <aside className="guide-nav">
          <details open>
            <summary>In this guide</summary>
            <nav aria-label={`${title}: sections`}>
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`}>
                  {t.title}
                </a>
              ))}
            </nav>
          </details>
        </aside>
        <article className="g-article">
          {children}
          {sources && sources.length > 0 && (
            <aside className="g-sources" aria-labelledby="guide-sources">
              <h2 id="guide-sources">Sources</h2>
              <p>{sourcesNote ?? "Figures are checked against these sources."}</p>
              <ul>
                {sources.map((src) => (
                  <li key={src.href}>
                    <a href={src.href} target="_blank" rel="noopener noreferrer">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </article>
      </div>
    </>
  );
}

export function GuideSection({
  id,
  n,
  kicker,
  title,
  children,
}: {
  id: string;
  n: number;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="g-section" aria-labelledby={`${id}-title`}>
      <div className="g-sectionHead">
        <span className="g-num">{n}</span>
        <span className="g-sectionKicker">{kicker}</span>
      </div>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

/* ── Blocks ────────────────────────────────────────── */

export function Figure({ label, caption, children }: { label?: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="g-figure">
      {label && <div className="g-figLabel">{label}</div>}
      {children}
      {caption && <figcaption className="g-figCaption">{caption}</figcaption>}
    </figure>
  );
}

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn" | "good";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="g-callout" data-tone={tone} role="note">
      <p className="g-calloutTitle">{title}</p>
      <p>{children}</p>
    </div>
  );
}

export function KeyStats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="g-stats">
      {items.map((i) => (
        <div key={i.label} className="g-stat">
          <div className="g-statValue">{i.value}</div>
          <div className="g-statLabel">{i.label}</div>
        </div>
      ))}
    </div>
  );
}

/** A calculation shown line by line, ending in a highlighted total. */
export function WorkedExample({
  title,
  steps,
  total,
}: {
  title: string;
  steps: { label: string; note?: string; value: string }[];
  total: { label: string; value: string };
}) {
  return (
    <div className="g-example">
      <div className="g-exampleHead">{title}</div>
      <ol className="g-steps">
        {steps.map((st) => (
          <li key={st.label}>
            <span className="g-stepLabel">
              {st.label}
              {st.note && <span className="g-stepNote">{st.note}</span>}
            </span>
            <span className="g-stepValue">{st.value}</span>
          </li>
        ))}
      </ol>
      <div className="g-exampleTotal">
        <span>{total.label}</span>
        <span>{total.value}</span>
      </div>
    </div>
  );
}

/** Simple data table. The first column is a row header; `numeric` right-aligns columns by index. */
export function DataTable({
  caption,
  head,
  rows,
  numeric = [],
}: {
  caption?: string;
  head: string[];
  rows: ReactNode[][];
  numeric?: number[];
}) {
  return (
    <div className="g-tableWrap">
      <table className="g-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} scope="col" className={numeric.includes(i) ? "g-numCell" : undefined}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row">
                    {c}
                  </th>
                ) : (
                  <td key={ci} className={numeric.includes(ci) ? "g-numCell" : undefined}>
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Side-by-side comparison of two to four options. */
export function CompareCards({
  columns,
}: {
  columns: { name: string; rows: { label: string; value: string }[] }[];
}) {
  return (
    <div className="g-compare">
      {columns.map((col, i) => (
        <div key={col.name} className="g-compareCol">
          <div className="g-compareHead">
            <span className="g-swatch" style={{ background: SERIES[i % SERIES.length] }} aria-hidden />
            {col.name}
          </div>
          <dl>
            {col.rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function Timeline({ items }: { items: { when: string; what: string; detail?: ReactNode }[] }) {
  return (
    <ol className="g-timeline">
      {items.map((i) => (
        <li key={i.when + i.what}>
          <span className="g-when">{i.when}</span>
          <span className="g-what">{i.what}</span>
          {i.detail && <p>{i.detail}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ── Charts ────────────────────────────────────────── */

/** Horizontal bars for comparing a handful of amounts. Values are printed beside each bar. */
export function Bars({
  items,
  format = money,
}: {
  items: { label: string; value: number; color?: string }[];
  format?: (n: number) => string;
}) {
  const top = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="g-bars">
      {items.map((i) => (
        <div key={i.label} className="g-barRow">
          <span className="g-barName">{i.label}</span>
          <span className="g-barTrack">
            <span className="g-barFill" style={{ width: `${(i.value / top) * 100}%`, background: i.color ?? SERIES[0] }} aria-hidden />
          </span>
          <span className="g-barValue">{format(i.value)}</span>
        </div>
      ))}
    </div>
  );
}
