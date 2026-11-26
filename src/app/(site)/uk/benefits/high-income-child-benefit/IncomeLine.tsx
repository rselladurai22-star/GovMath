"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { gbp, percent } from "@/components/flagship/format";

export type LinePoint = { income: number; share: number; charge: number };

const MIN = 55_000;
const MAX = 85_000;
const START = 60_000;
const END = 80_000;
const TICKS = [55_000, 60_000, 65_000, 70_000, 75_000, 80_000, 85_000];

/**
 * Adjusted net income from £55,000 to £85,000. The plot's height stands for
 * the Child Benefit: the red wedge is the part the charge takes back at each
 * income, the green above it is the part kept. Two sliders sit on the wedge's
 * edge: income before pension contributions, and after them. Drag either, or
 * focus one and use the arrow keys. Labels are HTML over a stretched SVG, so
 * text keeps its size on a phone.
 */
export default function IncomeLine({
  before,
  after,
  onBefore,
  onAfter,
  partner,
  whose,
}: {
  /** Income before pension contributions (after Gift Aid), and what it would cost. */
  before: LinePoint;
  /** Adjusted net income, and the charge on it. */
  after: LinePoint;
  onBefore: (income: number) => void;
  onAfter: (income: number) => void;
  /** Partner's adjusted net income, shown as a tick when it is the higher one. */
  partner?: number;
  whose: string;
}) {
  const plot = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<"before" | "after" | null>(null);
  const x = (income: number) => ((Math.min(MAX, Math.max(MIN, income)) - MIN) / (MAX - MIN)) * 100;
  const y = (share: number) => 100 - Math.min(1, Math.max(0, share)) * 100;
  const off = (income: number) => (income > MAX ? " is-over" : income < MIN ? " is-under" : "");
  const side = (income: number) => (x(income) < 14 ? " is-left" : x(income) > 86 ? " is-right" : "");
  const split = before.income - after.income >= 100;

  const incomeAt = (clientX: number) => {
    const box = plot.current?.getBoundingClientRect();
    if (!box || box.width === 0) return MIN;
    return Math.round((MIN + Math.min(1, Math.max(0, (clientX - box.left) / box.width)) * (MAX - MIN)) / 100) * 100;
  };
  const move = (which: "before" | "after", income: number) => (which === "before" ? onBefore(income) : onAfter(Math.min(income, before.income)));
  const down = (e: PointerEvent<HTMLDivElement>) => {
    const at = incomeAt(e.clientX);
    const asked = (e.target as HTMLElement).closest<HTMLElement>("[data-marker]")?.dataset.marker as "before" | "after" | undefined;
    // On the bare line: left of your income means "what if a pension took me down to here"; right of it moves the income itself.
    const which = asked ?? (at < Math.min(before.income, MAX) ? "after" : "before");
    setDrag(which);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!asked) move(which, at);
  };
  const keys = (which: "before" | "after", value: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const by: Record<string, number> = { ArrowRight: 200, ArrowUp: 200, ArrowLeft: -200, ArrowDown: -200, PageUp: 1000, PageDown: -1000 };
    let to: number | null = null;
    if (e.key in by) to = Math.min(MAX, Math.max(MIN, value)) + by[e.key];
    if (e.key === "Home") to = which === "after" ? START : MIN;
    if (e.key === "End") to = which === "after" ? before.income : MAX;
    if (to === null) return;
    e.preventDefault();
    move(which, Math.min(MAX, Math.max(MIN, to)));
  };
  const say = (p: LinePoint) => `${gbp(p.income)}: ${percent(p.share, 0)} repaid, a charge of ${gbp(p.charge)}`;
  const summary =
    `Adjusted net income from ${gbp(MIN)} to ${gbp(MAX)}. No charge up to ${gbp(START)}, then 1% of the Child Benefit for every £200, and all of it from ${gbp(END)}. ` +
    `${whose} income before pension contributions is ${say(before)}.` +
    (split ? ` After pension contributions it is ${say(after)}.` : "");

  return (
    <div className="sa-hicbc-line">
      <div
        className={`sa-hicbc-plot${drag ? " is-dragging" : ""}`}
        ref={plot}
        onPointerDown={down}
        onPointerMove={(e) => {
          if (!drag) return;
          const at = incomeAt(e.clientX);
          // With no pension yet the two markers sit together: pulling right moves the income, pulling left adds pension.
          if (drag === "after" && !split && at > before.income) {
            setDrag("before");
            move("before", at);
          } else move(drag, at);
        }}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={summary}>
          <rect x="0" y="0" width="100" height="100" className="sa-hicbc-kept" />
          <path d={`M${x(START)} 100 L${x(END)} 0 L100 0 L100 100 Z`} className="sa-hicbc-taken" />
          <line x1={x(START)} x2={x(START)} y1="0" y2="100" className="sa-hicbc-edge" />
          <line x1={x(END)} x2={x(END)} y1="0" y2="100" className="sa-hicbc-edge" />
          <path d={`M0 100 L${x(START)} 100 L${x(END)} 0 L100 0`} className="sa-hicbc-ramp" />
          {split && <line x1={x(after.income)} x2={x(before.income)} y1={y(after.share)} y2={y(after.share)} className="sa-hicbc-saved" />}
          {split && <line x1={x(before.income)} x2={x(before.income)} y1={y(before.share)} y2={y(after.share)} className="sa-hicbc-saved" />}
          {partner !== undefined && <line x1={x(partner)} x2={x(partner)} y1="0" y2="100" className="sa-hicbc-partner" />}
        </svg>
        <span className="sa-hicbc-zone is-none" aria-hidden="true">
          No charge
        </span>
        <span className="sa-hicbc-zone is-taper" aria-hidden="true">
          1% for every £200
        </span>
        <span className="sa-hicbc-zone is-full" aria-hidden="true">
          All repaid
        </span>
        {partner !== undefined && (
          <span className={`sa-hicbc-partnertag${side(partner)}`} style={{ left: `${x(partner)}%` }} aria-hidden="true">
            Partner {gbp(partner)}
          </span>
        )}
        <button
          type="button"
          role="slider"
          data-marker="before"
          className={`sa-hicbc-marker is-before${side(before.income)}${off(before.income)}${split ? " is-split" : " is-joined"}`}
          style={{ left: `${x(before.income)}%`, top: `${y(before.share)}%` }}
          aria-label={`${whose} income before pension contributions`}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={Math.min(MAX, Math.max(MIN, before.income))}
          aria-valuetext={say(before)}
          onKeyDown={keys("before", before.income)}
        >
          <span>
            {split ? "Income" : whose === "Your" ? "You" : "Income"} · {gbp(before.income)}
          </span>
        </button>
        <button
          type="button"
          role="slider"
          data-marker="after"
          className={`sa-hicbc-marker is-after${side(after.income)}${off(after.income)}${split ? " is-split" : " is-joined"}`}
          style={{ left: `${x(after.income)}%`, top: `${y(after.share)}%` }}
          aria-label="Income after pension contributions"
          aria-valuemin={MIN}
          aria-valuemax={Math.min(MAX, Math.max(MIN, before.income))}
          aria-valuenow={Math.min(MAX, Math.max(MIN, after.income))}
          aria-valuetext={say(after)}
          onKeyDown={keys("after", after.income)}
        >
          <span>{split ? `After pension · ${gbp(after.income)}` : "Drag left to add pension"}</span>
        </button>
      </div>
      <div className="sa-hicbc-axis" aria-hidden="true">
        {TICKS.map((t) => (
          <span key={t} style={{ left: `${x(t)}%` }} className={t === START || t === END ? "is-edge" : undefined}>
            £{t / 1000}k
          </span>
        ))}
      </div>
      <p className="sa-hicbc-axistitle" aria-hidden="true">
        Adjusted net income a year
      </p>
      <ul className="sa-hicbc-legend" aria-hidden="true">
        <li>
          <i className="is-kept" />
          Child Benefit you keep
        </li>
        <li>
          <i className="is-taken" />
          Paid back through the charge
        </li>
      </ul>
    </div>
  );
}
