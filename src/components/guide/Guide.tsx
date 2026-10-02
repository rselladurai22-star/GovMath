import type { ReactNode } from "react";
import s from "./Guide.module.css";

/**
 * Shared long-form guide template and visual library.
 *
 * A guide is a <Guide> with a contents list, numbered <GuideSection>s holding
 * plain HTML prose (p, ul, strong, a), and figures from this file. Every
 * component is a server component: no client JavaScript.
 */

/** Categorical chart colours, in fixed order. Validated for colour-blind separation. */
export const SERIES = ["var(--g-c1)", "var(--g-c2)", "var(--g-c3)", "var(--g-c4)"] as const;
/** Neutral fill for "nothing due" bands. */
export const NEUTRAL = "var(--g-track)";

export type TocItem = { id: string; title: string };
export type Source = { label: string; href: string };

const money = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const moneyShort = (n: number) =>
  n >= 1000 && n % 1000 === 0 ? `£${n / 1000}k` : money(n);

/* ── Frame ─────────────────────────────────────────── */

export function Guide({
  kicker,
  title,
  intro,
  toc,
  meta = [],
  sources,
  sourcesNote,
  children,
}: {
  kicker: string;
  title: string;
  intro: ReactNode;
  toc: TocItem[];
  /** Short facts under the intro, e.g. "12 min read", "Reviewed October 2026". */
  meta?: string[];
  sources?: Source[];
  sourcesNote?: string;
  children: ReactNode;
}) {
  return (
    <div className={s.guide}>
      <header className={s.head}>
        <span className={s.kicker}>{kicker}</span>
        <h2 className={s.title}>{title}</h2>
        <p className={s.intro}>{intro}</p>
        {meta.length > 0 && (
          <div className={s.meta}>
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
      </header>

      <div className={s.layout}>
        <nav aria-label="On this page" className={s.rail}>
          <details className={s.tocMobile}>
            <summary>On this page</summary>
            <TocList toc={toc} />
          </details>
          <div className={s.tocDesktop}>
            <p>On this page</p>
            <TocList toc={toc} />
          </div>
        </nav>

        <article className={s.article}>
          {children}
          {sources && sources.length > 0 && (
            <aside className={s.sources} aria-labelledby="guide-sources">
              <h2 id="guide-sources">Sources</h2>
              <p>{sourcesNote ?? "Figures are checked against these official pages."}</p>
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
    </div>
  );
}

function TocList({ toc }: { toc: TocItem[] }) {
  return (
    <ol className={s.tocList}>
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`}>{t.title}</a>
        </li>
      ))}
    </ol>
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
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.sectionHead}>
        <span className={s.num}>{n}</span>
        <span className={s.sectionKicker}>{kicker}</span>
      </div>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

/* ── Blocks ────────────────────────────────────────── */

export function Figure({ label, caption, children }: { label?: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className={s.figure}>
      {label && <div className={s.figLabel}>{label}</div>}
      {children}
      {caption && <figcaption className={s.figCaption}>{caption}</figcaption>}
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
    <div className={s.callout} data-tone={tone} role="note">
      <p className={s.calloutTitle}>{title}</p>
      <p>{children}</p>
    </div>
  );
}

export function KeyStats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className={s.stats}>
      {items.map((i) => (
        <div key={i.label} className={s.stat}>
          <div className={s.statValue}>{i.value}</div>
          <div className={s.statLabel}>{i.label}</div>
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
    <div className={s.example}>
      <div className={s.exampleHead}>{title}</div>
      <ol className={s.steps}>
        {steps.map((st) => (
          <li key={st.label}>
            <span className={s.stepLabel}>
              {st.label}
              {st.note && <span className={s.stepNote}>{st.note}</span>}
            </span>
            <span className={s.stepValue}>{st.value}</span>
          </li>
        ))}
      </ol>
      <div className={s.exampleTotal}>
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
    <div className={s.tableWrap}>
      <table className={s.table}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} scope="col" className={numeric.includes(i) ? s.numCell : undefined}>
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
                  <td key={ci} className={numeric.includes(ci) ? s.numCell : undefined}>
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
    <div className={s.compare}>
      {columns.map((col, i) => (
        <div key={col.name} className={s.compareCol}>
          <div className={s.compareHead}>
            <span className={s.swatch} style={{ background: SERIES[i % SERIES.length] }} aria-hidden />
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
    <ol className={s.timeline}>
      {items.map((i) => (
        <li key={i.when + i.what}>
          <span className={s.when}>{i.when}</span>
          <span className={s.what}>{i.what}</span>
          {i.detail && <p>{i.detail}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ── Charts ────────────────────────────────────────── */

/**
 * Bands laid along an income line (e.g. tax or NI bands). Width is
 * proportional to the band's span; each band is labelled in place.
 */
export function BandBar({
  bands,
  max,
}: {
  bands: { from: number; to: number; label: string; legend: string; color: string; light?: boolean }[];
  /** Right-hand end of the scale. The last band is drawn up to here. */
  max: number;
}) {
  const ticks = [0, ...bands.map((b) => Math.min(b.to, max))];
  return (
    <div>
      <div className={s.bandBar} role="img" aria-label={bands.map((b) => b.legend).join("; ")}>
        {bands.map((b) => (
          <div
            key={b.from}
            className={s.band}
            data-light={b.light ? "" : undefined}
            style={{ flexGrow: Math.min(b.to, max) - b.from, flexBasis: 0, background: b.color }}
            title={b.legend}
          >
            {b.label}
          </div>
        ))}
      </div>
      <div className={s.ticks} aria-hidden>
        {ticks.map((t, i) => (
          <span key={t} style={{ left: `${(t / max) * 100}%` }}>
            {i === ticks.length - 1 && bands[bands.length - 1].to > max ? `${moneyShort(t)}+` : moneyShort(t)}
          </span>
        ))}
      </div>
      <div className={s.legend}>
        {bands.map((b) => (
          <span key={b.from}>
            <span className={s.swatch} style={{ background: b.color }} aria-hidden />
            {b.legend}
          </span>
        ))}
      </div>
    </div>
  );
}

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
    <div className={s.bars}>
      {items.map((i) => (
        <div key={i.label} className={s.barRow}>
          <span className={s.barName}>{i.label}</span>
          <span className={s.barTrack}>
            <span
              className={s.barFill}
              style={{ width: `${(i.value / top) * 82}%`, background: i.color ?? SERIES[0] }}
              aria-hidden
            />
            <span className={s.barValue}>{format(i.value)}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * A step line, e.g. the marginal rate on each extra pound of income.
 * Each step is labelled with its value; hovering a step shows its range.
 */
export function StepChart({
  steps,
  max,
  yMax,
  yTicks,
  color = SERIES[0],
  unit = "%",
  ariaLabel,
}: {
  steps: { from: number; to: number; value: number }[];
  max: number;
  yMax: number;
  yTicks: number[];
  color?: string;
  unit?: string;
  ariaLabel: string;
}) {
  const W = 640, H = 250, L = 40, R = 12, T = 22, B = 30;
  const x = (v: number) => L + (Math.min(v, max) / max) * (W - L - R);
  const y = (v: number) => T + (1 - v / yMax) * (H - T - B);
  const pts = steps.flatMap((st) => [`${x(st.from)},${y(st.value)}`, `${x(st.to)},${y(st.value)}`]);
  const area = `M${x(steps[0].from)},${y(0)} L${pts.join(" L")} L${x(steps[steps.length - 1].to)},${y(0)} Z`;
  const xTicks = Array.from(new Set(steps.flatMap((st) => [st.from, Math.min(st.to, max)])));
  return (
    <svg className={s.chart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      {yTicks.map((t) => (
        <g key={t}>
          <line className={s.grid} x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
          <text x={L - 8} y={y(t) + 4} textAnchor="end">
            {t}
            {unit}
          </text>
        </g>
      ))}
      <path className={s.area} d={area} fill={color} />
      <polyline className={s.line} points={pts.join(" ")} stroke={color} />
      {steps.map((st) => {
        const mid = (x(st.from) + x(st.to)) / 2;
        const wide = x(st.to) - x(st.from) > 34;
        return (
          <g key={st.from}>
            <rect className={s.hit} x={x(st.from)} y={T} width={x(st.to) - x(st.from)} height={H - T - B}>
              <title>{`${money(st.from)} to ${st.to > max ? "above" : money(st.to)}: ${st.value}${unit}`}</title>
            </rect>
            {wide && (
              <text className={s.chartLabel} x={mid} y={y(st.value) - 8} textAnchor="middle">
                {st.value}
                {unit}
              </text>
            )}
          </g>
        );
      })}
      {xTicks.map((t, i) => (
        <text
          key={t}
          x={x(t)}
          y={H - 8}
          textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
        >
          {moneyShort(t)}
        </text>
      ))}
    </svg>
  );
}
