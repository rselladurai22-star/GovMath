import type { ReactNode } from "react";

/*
 * Calculator results in the approved GovMath design's markup (see
 * public/gm/matching-mortgage.css and matching-calculators.css): the
 * .ax-paymentstrip answer, .facts tiles, .resultcard cards, .splitbar with
 * an .allocation list, .rate-row comparisons and tables in a .tablewrap.
 * Parts the package does not include use gm-* classes from
 * public/gm/govmath-site.css.
 */

/**
 * The headline answer: one big figure and a sentence that says what it means.
 * Studio lifts these props into the results panel; rendered on its own it
 * shows the same panel content without the chart.
 */
export function Answer({
  eyebrow,
  value,
  unit,
  sentence,
  badges,
  actions,
}: {
  eyebrow: string;
  value: string;
  unit?: string;
  sentence: ReactNode;
  badges?: ReactNode[];
  actions?: ReactNode;
}) {
  return (
    <div className="gm-answer" aria-live="polite" aria-atomic="true">
      <div className="ax-paymentstrip">
        <div>
          <span>{eyebrow}</span>
          <strong>{value}</strong>
          {unit && <small>{unit}</small>}
        </div>
      </div>
      <p className="loan-summary">{sentence}</p>
      {badges && badges.length > 0 && (
        <div className="badges">
          {badges.map((b, i) => (
            <span key={i}>{b}</span>
          ))}
        </div>
      )}
      {actions}
    </div>
  );
}

export type Fact = { label: string; value: string; note?: ReactNode; tone?: "good" | "warn" | "bad" };

/** A row of key figures that support the answer. */
export function Facts({ items }: { items: Fact[] }) {
  return (
    <div className="facts">
      {items.map((f) => (
        <div key={f.label} data-tone={f.tone}>
          <span>{f.label}</span>
          <b>{f.value}</b>
          {f.note && <small className="gm-factnote">{f.note}</small>}
        </div>
      ))}
    </div>
  );
}

/** Result card with a plain-English title and optional subtitle. */
export function ResultCard({
  title,
  sub,
  action,
  id,
  children,
}: {
  title: string;
  sub?: ReactNode;
  action?: ReactNode;
  id?: string;
  children: ReactNode;
}) {
  const heading = (
    <>
      <h3 id={id ? `${id}-title` : undefined}>{title}</h3>
      {sub && <p>{sub}</p>}
    </>
  );
  return (
    <section className="resultcard" id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      {action ? (
        <div className="sectionheading">
          <div>{heading}</div>
          {action}
        </div>
      ) : (
        heading
      )}
      {children}
    </section>
  );
}

/**
 * Chart colours in the approved design's palette (as on its take-home and
 * mortgage pages): plum for what you keep or borrow, gold for tax or
 * interest, then mauve, sand and slate. Studios pass their own colours; the
 * ring chart, split bars and payslip swatches all map them the same way, so
 * one series keeps one colour.
 */
const DESIGN: Record<string, string> = {
  "#0f9f6e": "#73164c",
  "#16a34a": "#73164c",
  "#10b981": "#73164c",
  "#0a7a52": "#73164c",
  "#f59e0b": "#c79a4b",
  "#5b1e6e": "#ad7198",
  "#2e0a3a": "#ead5af",
  "#4a1659": "#ead5af",
  "#db2777": "#909aab",
  "#e11d48": "#909aab",
  "#8e4ba3": "#d8b4c9",
  "#a855f7": "#d8b4c9",
  "#0ea5e9": "#7ba5df",
  "#f97316": "#e0b27a",
  "#94a3b8": "#c9ced6",
};
export function soften(color: string): string {
  return DESIGN[color.toLowerCase()] ?? color;
}

export type Segment = { label: string; value: number; display: string; color: string };

/** One bar split into its parts, with a list underneath. */
export function SplitBar({ segments, caption }: { segments: Segment[]; caption?: ReactNode }) {
  const total = segments.reduce((a, b) => a + Math.max(0, b.value), 0);
  return (
    <>
      <div className="splitbar" role="img" aria-label={segments.map((g) => `${g.label} ${g.display}`).join(", ")}>
        {segments.map((g) => (
          <span key={g.label} style={{ flex: Math.max(0, g.value), background: soften(g.color) }} title={`${g.label}: ${g.display}`} />
        ))}
      </div>
      <div className="allocation">
        {segments.map((g) => (
          <div key={g.label}>
            <span>
              <i style={{ background: soften(g.color) }} aria-hidden="true" />
              {g.label}
            </span>
            <b>
              {g.display}
              <small className="gm-share">{total > 0 ? Math.round((Math.max(0, g.value) / total) * 100) : 0}%</small>
            </b>
          </div>
        ))}
      </div>
      {caption && <p className="footnote">{caption}</p>}
    </>
  );
}

/**
 * Horizontal bars for one measure across a few items, with the selected item
 * picked out. Uses the chart palette, not the page theme, so it stands apart.
 */
export function BarChart({
  rows,
  caption,
}: {
  rows: { label: ReactNode; note?: string; value: number; display: string; current?: boolean }[];
  caption?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <figure className="gm-barchart">
      <div role="list">
        {rows.map((r, i) => (
          <div key={i} role="listitem" className={r.current ? "gm-bar current" : "gm-bar"} title={`${typeof r.label === "string" ? r.label : ""} ${r.display}`.trim()}>
            <span className="gm-bar-label">
              {r.label}
              {r.note && <small>{r.note}</small>}
            </span>
            <span className="gm-bar-track" aria-hidden="true">
              <span style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }} />
            </span>
            <strong className="gm-bar-value">{r.display}</strong>
          </div>
        ))}
      </div>
      {caption && <figcaption className="footnote">{caption}</figcaption>}
    </figure>
  );
}

export type CompareRow = {
  label: ReactNode;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down";
  /** 0–1 bar length. */
  bar: number;
  current?: boolean;
};

/** Side-by-side scenarios, as the design's rate rows. */
export function Compare({ rows, head }: { rows: CompareRow[]; head: [string, string] }) {
  return (
    <div className="gm-compare" role="table">
      <div className="rate-row gm-rate-head" role="row">
        <span role="columnheader">{head[0]}</span>
        <strong role="columnheader">{head[1]}</strong>
        <small aria-hidden="true" />
      </div>
      {rows.map((r, i) => (
        <div key={i} className={`rate-row${r.current ? " current" : ""}`} role="row">
          <span role="cell">{r.label}</span>
          <strong role="cell">{r.value}</strong>
          <small role="cell" data-tone={r.deltaTone}>
            {r.delta}
          </small>
        </div>
      ))}
    </div>
  );
}

/** Highlighted tip or insight, as the design's grey insight boxes. */
export function Callout({
  tone = "info",
  title,
  children,
  action,
}: {
  tone?: "info" | "good" | "warn";
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="gm-insight" data-tone={tone}>
      <h3>{title}</h3>
      <div>{children}</div>
      {action && <div className="gm-insight-action">{action}</div>}
    </div>
  );
}

/** Collapsible data table for the full detail. */
export function DataTable({
  summary,
  columns,
  rows,
}: {
  summary: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <details className="schedule">
      <summary>{summary}</summary>
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export type StatementRow = {
  label: ReactNode;
  values: string[];
  /** deduction rows read in muted red; total is the bold bottom line. */
  kind?: "deduction" | "total";
  swatch?: string;
};

/** Always-visible statement, e.g. a payslip across pay periods. */
export function Statement({ columns, rows }: { columns: string[]; rows: StatementRow[] }) {
  return (
    <div className="tablewrap gm-statement">
      <table>
        <thead>
          <tr>
            <th scope="col">Item</th>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} data-kind={r.kind}>
              <td>
                {r.swatch && <i className="gm-swatch" style={{ background: soften(r.swatch) }} aria-hidden="true" />}
                {r.label}
              </td>
              {r.values.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The defaults behind the answer, stated plainly so anyone can see whether
 * the result fits them — and where to change it.
 */
export function Assumptions({ items, note }: { items: { label: string; value: string }[]; note?: ReactNode }) {
  return (
    <details className="ax-assumptions" open>
      <summary>What we assumed</summary>
      <dl className="gm-assumed">
        {items.map((i) => (
          <div key={i.label}>
            <dt>{i.label}</dt>
            <dd>{i.value}</dd>
          </div>
        ))}
      </dl>
      <p>{note ?? "Not right for you? Change it under More options."}</p>
    </details>
  );
}
