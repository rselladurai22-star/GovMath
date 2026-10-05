"use client";

import { Children, Fragment, isValidElement, useEffect, useRef, type ReactElement, type ReactNode } from "react";
import { gbp } from "./format";
import { Answer, SplitBar, soften, type Segment } from "./results";
import s from "./Flagship.module.css";

/** Every element in a tree of results, fragments and cards opened up. */
function flatten(node: ReactNode): ReactElement[] {
  const out: ReactElement[] = [];
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;
    out.push(child);
    const kids = (child.props as { children?: ReactNode }).children;
    if (kids) out.push(...flatten(kids));
  });
  return out;
}

/** Top-level results, with fragments unwrapped so each block can be placed. */
function topLevel(node: ReactNode): ReactElement[] {
  const out: ReactElement[] = [];
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Fragment) out.push(...topLevel((child.props as { children?: ReactNode }).children));
    else out.push(child);
  });
  return out;
}

/** Ring chart of the first split in the results, with the total in the middle. */
function Donut({ segments }: { segments: Segment[] }) {
  const parts = segments.filter((g) => g.value > 0);
  const total = parts.reduce((a, g) => a + g.value, 0);
  if (total <= 0) return null;
  const r = 80;
  const c = 2 * Math.PI * r;
  const arcs = parts.map((g, i) => ({
    ...g,
    len: (g.value / total) * c,
    before: parts.slice(0, i).reduce((a, q) => a + (q.value / total) * c, 0),
  }));
  const money = segments.every((g) => g.display.trim().startsWith("£") || g.display.trim().startsWith("-£"));
  return (
    <div className={s.donutWrap}>
      <div className={s.donut}>
        <svg viewBox="0 0 180 180" role="img" aria-label={parts.map((g) => `${g.label} ${g.display}`).join(", ")}>
          <circle cx="90" cy="90" r={r} fill="none" stroke="var(--ax-line)" strokeWidth="12" />
          {arcs.map((g) => (
            <circle
              key={g.label}
              cx="90"
              cy="90"
              r={r}
              fill="none"
              stroke={soften(g.color)}
              strokeWidth="12"
              strokeDasharray={`${g.len} ${c - g.len}`}
              strokeDashoffset={-g.before}
              transform="rotate(-90 90 90)"
            />
          ))}
        </svg>
        {money && (
          <div className={s.donutCentre}>
            <span>Total</span>
            <strong>{gbp(total)}</strong>
          </div>
        )}
      </div>
      <ul className={s.donutLegend}>
        {segments.map((g) => (
          <li key={g.label}>
            <span>
              <i style={{ background: soften(g.color) }} aria-hidden="true" />
              {g.label}
            </span>
            <strong>{g.display}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Calculator workspace, laid out like a bank calculator page.
 *
 * One soft-grey panel holds the inputs on the left, ending in a white bar
 * with the headline figure (like "Your EMI"), and a white card on the right
 * with a ring chart of where the money goes (or the answer, when there is
 * no split). Everything updates live. The detailed results follow
 * underneath in a two-column grid; the button saves the inputs to the
 * address and jumps to them.
 */
export default function Studio({
  title,
  ready,
  onCalculate,
  calculateLabel = "Calculate",
  onReset,
  inputs,
  dock,
  children,
}: {
  title: string;
  /** True once the inputs have been confirmed (keeps the address shareable). */
  ready: boolean;
  onCalculate: () => void;
  calculateLabel?: string;
  onReset?: () => void;
  inputs: ReactNode;
  dock: { label: string; value: string };
  children: ReactNode;
}) {
  const details = useRef<HTMLElement>(null);
  const jump = useRef(false);

  const blocks = topLevel(children);
  const answer = blocks.find((b) => b.type === Answer);
  const split = flatten(children).find((e) => e.type === SplitBar);
  const segments = split ? (split.props as { segments: Segment[] }).segments : null;
  // With a ring chart in the summary card, the full answer (sentence,
  // badges, share) leads the detailed results instead.
  const rest = segments ? blocks : blocks.filter((b) => b !== answer);

  useEffect(() => {
    if (!ready || !jump.current) return;
    jump.current = false;
    requestAnimationFrame(() => details.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [ready]);

  return (
    <>
      <div className={`gm-wrap ${s.studio}`} data-ready="">
        <aside className={s.panel} aria-label={title}>
          <header className={s.panelHead}>
            <h2>{title}</h2>
            {onReset && (
              <button type="button" onClick={onReset} className={s.reset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
                </svg>
                Reset
              </button>
            )}
          </header>
          <div className={s.panelBody}>{inputs}</div>
          <footer className={s.totalBar}>
            <p aria-live="polite">
              <span>{dock.label}</span>
              <strong>{dock.value}</strong>
            </p>
            <button
              type="button"
              className={s.calcBtn}
              aria-label={`${calculateLabel}: see full results`}
              onClick={() => {
                jump.current = true;
                if (ready) details.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                else onCalculate();
              }}
            >
              See full results
            </button>
          </footer>
        </aside>

        <section className={s.summary} aria-label="Summary">
          {segments ? <Donut segments={segments} /> : answer}
        </section>
      </div>

      {rest.length > 0 && (
        <section ref={details} id="results" className={`gm-wrap ${s.details}`} aria-labelledby="results-title">
          <header className={s.detailsHead}>
            <h2 id="results-title">Your results in detail</h2>
            <p>Every figure behind the answer, updated live as you change the inputs.</p>
          </header>
          {rest}
        </section>
      )}

    </>
  );
}
