"use client";

import { Children, Fragment, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { gbp } from "./format";
import { Answer, SplitBar, type Segment } from "./results";
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
  const r = 70;
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
          <circle cx="90" cy="90" r={r} fill="none" stroke="var(--ax-line)" strokeWidth="18" />
          {arcs.map((g) => (
            <circle
              key={g.label}
              cx="90"
              cy="90"
              r={r}
              fill="none"
              stroke={g.color}
              strokeWidth="18"
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
              <i style={{ background: g.color }} aria-hidden="true" />
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
 * One soft-grey panel holds the inputs on the left and a white summary card
 * on the right: the headline answer with a ring chart of where the money
 * goes. The summary updates live. The detailed results (key figures,
 * assumptions, tables and charts) follow underneath in a two-column grid.
 * The Calculate button saves the inputs to the address and jumps to them.
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
  const summary = useRef<HTMLElement>(null);
  const details = useRef<HTMLElement>(null);
  const jump = useRef(false);
  const [showDock, setShowDock] = useState(false);

  const blocks = topLevel(children);
  const answer = blocks.find((b) => b.type === Answer);
  const rest = blocks.filter((b) => b !== answer);
  const split = flatten(children).find((e) => e.type === SplitBar);
  const segments = split ? (split.props as { segments: Segment[] }).segments : null;

  useEffect(() => {
    if (!ready || !jump.current) return;
    jump.current = false;
    requestAnimationFrame(() => details.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [ready]);

  // On phones the summary sits under the inputs: keep the answer in a dock.
  useEffect(() => {
    const el = summary.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setShowDock(!e.isIntersecting && e.boundingClientRect.top > 0), {
      rootMargin: "0px 0px -20% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
          <footer className={s.panelFoot}>
            <button
              type="button"
              className={s.calcBtn}
              onClick={() => {
                jump.current = true;
                if (ready) details.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                else onCalculate();
              }}
            >
              {calculateLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p>Results update as you type. Nothing you enter is stored.</p>
          </footer>
        </aside>

        <section ref={summary} className={s.summary} aria-label="Summary">
          {answer}
          {segments && <Donut segments={segments} />}
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

      <button
        type="button"
        className={s.dock}
        data-show={showDock || undefined}
        tabIndex={showDock ? 0 : -1}
        aria-hidden={!showDock}
        onClick={() => summary.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      >
        <span>
          <small>{dock.label}</small>
          <strong>{dock.value}</strong>
        </span>
        <em>
          See results
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </em>
      </button>
    </>
  );
}
