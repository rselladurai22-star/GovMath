import type { ReactNode } from "react";
import s from "./Flagship.module.css";

/**
 * The headline answer: one big figure and a sentence that says what it means.
 * Every flagship calculator leads with this.
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
    <section className={s.answer} aria-live="polite" aria-atomic="true">
      <div className={s.answerTop}>
        <span className={s.answerEyebrow}>{eyebrow}</span>
        {actions}
      </div>
      <p className={s.answerValue}>
        <strong>{value}</strong>
        {unit && <span>{unit}</span>}
      </p>
      <p className={s.answerSentence}>{sentence}</p>
      {badges && badges.length > 0 && (
        <ul className={s.answerBadges}>
          {badges.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export type Fact = { label: string; value: string; note?: ReactNode; tone?: "good" | "warn" | "bad" };

/** A row of key figures that support the answer. */
export function Facts({ items }: { items: Fact[] }) {
  return (
    <dl className={s.facts}>
      {items.map((f) => (
        <div key={f.label} data-tone={f.tone}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
          {f.note && <span className={s.factNote}>{f.note}</span>}
        </div>
      ))}
    </dl>
  );
}

/** White result card with a plain-English title and optional subtitle. */
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
  return (
    <section className={s.card} id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <header className={s.cardHead}>
        <div>
          <h2 id={id ? `${id}-title` : undefined}>{title}</h2>
          {sub && <p>{sub}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export type Segment = { label: string; value: number; display: string; color: string };

/** One bar split into labelled parts, with a legend that carries the numbers. */
export function SplitBar({ segments, caption }: { segments: Segment[]; caption?: ReactNode }) {
  const total = segments.reduce((a, b) => a + Math.max(0, b.value), 0);
  return (
    <div className={s.split}>
      <div className={s.splitBar} role="img" aria-label={segments.map((g) => `${g.label} ${g.display}`).join(", ")}>
        {segments.map((g) => (
          <span key={g.label} style={{ flexGrow: Math.max(0, g.value), background: g.color }} />
        ))}
      </div>
      <ul className={s.legend}>
        {segments.map((g) => (
          <li key={g.label}>
            <i style={{ background: g.color }} aria-hidden="true" />
            <span>{g.label}</span>
            <strong>{g.display}</strong>
            <em>{total > 0 ? Math.round((Math.max(0, g.value) / total) * 100) : 0}%</em>
          </li>
        ))}
      </ul>
      {caption && <p className={s.splitCaption}>{caption}</p>}
    </div>
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

/** Side-by-side scenarios: label, horizontal bar, value and change. */
export function Compare({ rows, head }: { rows: CompareRow[]; head: [string, string] }) {
  return (
    <div className={s.compare} role="table">
      <div className={s.compareHead} role="row">
        <span role="columnheader">{head[0]}</span>
        <span role="columnheader">{head[1]}</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={s.compareRow} role="row" data-current={r.current || undefined}>
          <span className={s.compareLabel} role="cell">
            {r.label}
          </span>
          <span className={s.compareBar} aria-hidden="true">
            <i style={{ width: `${Math.max(2, Math.min(1, r.bar) * 100)}%` }} />
          </span>
          <span className={s.compareValue} role="cell">
            <strong>{r.value}</strong>
            {r.delta && <em data-tone={r.deltaTone}>{r.delta}</em>}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Highlighted tip or insight, optionally with a button. */
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
    <div className={s.callout} data-tone={tone}>
      <span className={s.calloutIcon} aria-hidden="true">
        {tone === "warn" ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
        ) : tone === "good" ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
          </svg>
        )}
      </span>
      <div>
        <strong>{title}</strong>
        <div className={s.calloutBody}>{children}</div>
        {action && <div className={s.calloutAction}>{action}</div>}
      </div>
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
    <details className={s.table}>
      <summary>
        {summary}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className={s.tableScroll}>
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
                {r.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {c}
                    </th>
                  ) : (
                    <td key={j}>{c}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
