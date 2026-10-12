"use client";

import { Children, Fragment, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { gbp, usd } from "./format";
import { Answer, ResultCard, SplitBar, soften, type Segment } from "./results";

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

/**
 * Donut chart with its legend. Each slice is an SVG arc; hovering or
 * focusing a slice or a legend row highlights it and shows its amount and
 * share in the middle.
 */
function Ring({ segments }: { segments: Segment[] }) {
  const [active, setActive] = useState<number | null>(null);
  const parts = segments.map((g, i) => ({ ...g, i })).filter((g) => g.value > 0);
  const total = parts.reduce((a, g) => a + g.value, 0);
  if (total <= 0) return null;
  const pounds = segments.every((g) => /^-?£/.test(g.display.trim()));
  const dollars = segments.every((g) => /^-?\$/.test(g.display.trim()));
  const money = pounds || dollars;
  const R = 78;
  const C = 2 * Math.PI * R;
  const gap = parts.length > 1 ? 3 : 0;
  const arcs = parts.map((g, k) => {
    const before = parts.slice(0, k).reduce((a, q) => a + q.value, 0);
    const len = (g.value / total) * C;
    return { ...g, dash: Math.max(len - gap, 0.5), offset: -(before / total) * C };
  });
  const share = (v: number) => `${((v / total) * 100).toFixed(v / total < 0.1 ? 1 : 0)}%`;
  const on = active === null ? null : segments[active];
  return (
    <>
      <div className="gm-donut" role="img" aria-label={parts.map((g) => `${g.label} ${g.display}`).join(", ")}>
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle className="gm-donut-track" cx="100" cy="100" r={R} />
          {arcs.map((a) => (
            <circle
              key={a.label}
              className={`gm-donut-arc${active === null ? "" : active === a.i ? " is-on" : " is-off"}`}
              cx="100"
              cy="100"
              r={R}
              stroke={soften(a.color)}
              strokeDasharray={`${a.dash} ${C - a.dash}`}
              strokeDashoffset={a.offset}
              onMouseEnter={() => setActive(a.i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="gm-donut-centre">
          {on ? (
            <>
              <span>{on.label}</span>
              <strong>{on.display}</strong>
              <small>{share(on.value)} of the total</small>
            </>
          ) : money ? (
            <>
              <span>Total</span>
              <strong>{dollars ? usd(total) : gbp(total)}</strong>
              <small>Hover a slice for detail</small>
            </>
          ) : (
            <span>How it splits</span>
          )}
        </div>
      </div>
      <ul className="gm-legend">
        {segments.map((g, i) => (
          <li
            key={g.label}
            tabIndex={0}
            className={active === i ? "is-on" : undefined}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <i style={{ background: soften(g.color) }} aria-hidden="true" />
            <span>{g.label}</span>
            <b>{g.display}</b>
            <em>{g.value > 0 ? share(g.value) : "0%"}</em>
          </li>
        ))}
      </ul>
    </>
  );
}

type AnswerProps = { eyebrow: string; value: string; unit?: string; sentence: ReactNode; badges?: ReactNode[]; actions?: ReactNode };

/**
 * Calculator workspace in the approved design's markup (as on the approved
 * mortgage and take-home pages): section.calculator with the form on the
 * left and the results panel (.result.ax-chartpanel) on the right, then
 * "Your results in detail" (section#results) with result cards paired in
 * .resultgrid rows. Results update live; the submit button saves the inputs
 * to the address (via onCalculate) and jumps to the detail.
 */
export default function Studio({
  title,
  ready,
  onCalculate,
  calculateLabel = "Calculate",
  onReset,
  inputs,
  children,
}: {
  /** Heading for the inputs, read by screen readers (not shown since the October 2026 redesign). */
  title: string;
  /** True once the inputs have been confirmed (keeps the address shareable). */
  ready: boolean;
  onCalculate: () => void;
  calculateLabel?: string;
  onReset?: () => void;
  inputs: ReactNode;
  /** Headline figure for compact displays (kept for every studio's API). */
  dock: { label: string; value: string };
  children: ReactNode;
}) {
  const details = useRef<HTMLElement>(null);
  const jump = useRef(false);

  const blocks = topLevel(children);
  const answer = blocks.find((b) => b.type === Answer);
  const a = answer?.props as AnswerProps | undefined;
  const rest = blocks.filter((b) => b !== answer);
  const split = flatten(children).find((e) => e.type === SplitBar);
  const segments = split ? (split.props as { segments: Segment[] }).segments : null;

  // Consecutive result cards share a two-column .resultgrid, as in the design.
  const grouped: ReactNode[] = [];
  let run: ReactElement[] = [];
  const flush = () => {
    if (run.length) grouped.push(<div className="resultgrid" key={`grid-${grouped.length}`}>{run}</div>);
    run = [];
  };
  rest.forEach((b, i) => {
    if (b.type === ResultCard) run.push(b);
    else {
      flush();
      grouped.push(<Fragment key={`b-${i}`}>{b}</Fragment>);
    }
  });
  flush();

  useEffect(() => {
    if (!ready || !jump.current) return;
    jump.current = false;
    requestAnimationFrame(() => details.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [ready]);

  return (
    <>
      <section className="calculator gm-clear" id="calculator">
        <div className="calcgrid">
          <form
            className="gm-form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              jump.current = true;
              if (ready) details.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              else onCalculate();
            }}
          >
            <div className="formheading pg-stephead">
              <h2 className="pg-step">
                <span aria-hidden="true">1</span>Your details{title && <span className="sr-only">: {title}</span>}
              </h2>
              {onReset && (
                <button type="button" className="textbutton" onClick={onReset}>
                  Reset
                </button>
              )}
            </div>
            {inputs}
            <p className="footnote">Free to use. Your details are not saved to an account.</p>
            <button type="submit" className="button bank-calculate">
              {calculateLabel}
            </button>
          </form>

          <div className="result ax-chartpanel" aria-live="polite">
            <h2 className="pg-step">
              <span aria-hidden="true">2</span>Your results
            </h2>
            <p className="resultlabel">Your summary</p>
            {a && (
              <div className="ax-paymentstrip">
                <div>
                  <span>{a.eyebrow}</span>
                  <strong>{a.value}</strong>
                  {a.unit && <small>{a.unit}</small>}
                </div>
              </div>
            )}
            {segments && <Ring segments={segments} />}
            {a && <p className="loan-summary">{a.sentence}</p>}
            {a?.badges && a.badges.length > 0 && (
              <div className="badges">
                {a.badges.map((b, i) => (
                  <span key={i}>{b}</span>
                ))}
              </div>
            )}
            {a?.actions}
          </div>
        </div>
      </section>

      {grouped.length > 0 && (
        <section ref={details} className="section gm-details" id="results" aria-labelledby="results-title">
          <div className="sectionheading">
            <div>
              <p className="pg-badge">Based on your figures</p>
              <h2 id="results-title">Your results in detail</h2>
            </div>
          </div>
          {grouped}
        </section>
      )}
    </>
  );
}
