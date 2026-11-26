"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { gbp } from "@/components/flagship/format";

export type TaperPoint = { h: number; pay: number; uc: number; total: number };
export type TaperMark = { key: string; label: string; h: number };

const hrs = (h: number) => `${Number(h.toFixed(1))} ${h === 1 ? "hour" : "hours"}`;

/** Gridline spacing that gives three to six round lines up to n. */
function gridStep(n: number): number {
  for (const s of [100, 200, 250, 500, 1000, 2000, 2500, 5000]) if (n / s <= 6) return s;
  return 10_000;
}

/**
 * Monthly income (take-home pay plus Universal Credit) against hours worked.
 * The lines are an SVG stretched to the plot; every label is HTML on top, so
 * text keeps its size on a phone. "Now" and "New" are sliders: drag them, or
 * focus one and use the arrow keys.
 */
export default function TaperChart({
  points,
  now,
  next,
  nowPoint,
  nextPoint,
  marks,
  maxHours,
  hourly,
  onNow,
  onNext,
}: {
  /** One point for each whole hour from 0 to maxHours. */
  points: TaperPoint[];
  now: number;
  next: number;
  nowPoint: TaperPoint;
  nextPoint: TaperPoint;
  /** Where the slope changes, numbered in this order. */
  marks: TaperMark[];
  maxHours: number;
  hourly: number;
  onNow: (h: number) => void;
  onNext: (h: number) => void;
}) {
  const plot = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<"now" | "next" | null>(null);
  const peak = Math.max(...points.map((p) => p.total), 1) * 1.04;
  const step = gridStep(peak);
  const top = Math.ceil(peak / step) * step;
  const x = (h: number) => (Math.min(maxHours, Math.max(0, h)) / maxHours) * 100;
  const y = (v: number) => 100 - (Math.max(0, v) / top) * 100;
  const line = (get: (p: TaperPoint) => number) => points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.h).toFixed(2)} ${y(get(p)).toFixed(2)}`).join(" ");
  const payArea = `${line((p) => p.pay)} L100 100 L0 100 Z`;
  const ucArea = `${line((p) => p.total)} ${[...points].reverse().map((p) => `L${x(p.h).toFixed(2)} ${y(p.pay).toFixed(2)}`).join(" ")} Z`;
  const grid = Array.from({ length: Math.round(top / step) }, (_, i) => (i + 1) * step);
  const ticks = Array.from({ length: Math.floor(maxHours / 8) + 1 }, (_, i) => i * 8);

  const hourAt = (clientX: number) => {
    const box = plot.current?.getBoundingClientRect();
    if (!box || box.width === 0) return 0;
    return Math.round(Math.min(1, Math.max(0, (clientX - box.left) / box.width)) * maxHours);
  };
  const move = (which: "now" | "next", h: number) => (which === "now" ? onNow(h) : onNext(h));
  const down = (e: PointerEvent<HTMLDivElement>) => {
    const h = hourAt(e.clientX);
    const asked = (e.target as HTMLElement).closest<HTMLElement>("[data-marker]")?.dataset.marker as "now" | "next" | undefined;
    // On the bare plot, take the nearer marker; a tie goes to "new", which is the one people explore with.
    const which = asked ?? (Math.abs(h - now) < Math.abs(h - next) ? "now" : "next");
    setDrag(which);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!asked) move(which, h);
  };
  const keys = (which: "now" | "next", value: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const by: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 8, PageDown: -8 };
    let to: number | null = null;
    if (e.key in by) to = value + by[e.key];
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = maxHours;
    if (to === null) return;
    e.preventDefault();
    move(which, Math.min(maxHours, Math.max(0, Math.round(to))));
  };
  const side = (h: number) => (x(h) < 12 ? " is-left" : x(h) > 88 ? " is-right" : "");
  const describe = (p: TaperPoint) => `take-home pay ${gbp(p.pay, true)}, Universal Credit ${gbp(p.uc, true)}, total ${gbp(p.total, true)} a month`;
  const summary =
    `Monthly income by hours worked a week at ${gbp(hourly, true)} an hour. ` +
    `Now, at ${hrs(now)}: ${describe(nowPoint)}. New, at ${hrs(next)}: ${describe(nextPoint)}. ` +
    marks.map((m) => `${m.label} at about ${hrs(m.h)}.`).join(" ");

  return (
    <div className="sa-taper-chart">
      <div
        className={`sa-taper-plot${drag ? " is-dragging" : ""}`}
        ref={plot}
        onPointerDown={down}
        onPointerMove={(e) => drag && move(drag, hourAt(e.clientX))}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={summary}>
          {grid.map((g) => (
            <line key={g} x1="0" x2="100" y1={y(g)} y2={y(g)} className="sa-taper-grid" />
          ))}
          <path d={payArea} className="sa-taper-payarea" />
          <path d={ucArea} className="sa-taper-ucarea" />
          {marks.map((m) => (
            <line key={m.key} x1={x(m.h)} x2={x(m.h)} y1="0" y2="100" className="sa-taper-markline" />
          ))}
          <path d={line((p) => p.pay)} className="sa-taper-payline" />
          <path d={line((p) => p.total)} className="sa-taper-totalline" />
          <line x1={x(now)} x2={x(now)} y1={y(nowPoint.total)} y2="100" className="sa-taper-drop" />
          <line x1={x(next)} x2={x(next)} y1={y(nextPoint.total)} y2="100" className="sa-taper-drop sa-taper-drop--next" />
        </svg>
        {grid.map((g) => (
          <span key={g} className="sa-taper-ylabel" style={{ top: `${y(g)}%` }} aria-hidden="true">
            {gbp(g)}
          </span>
        ))}
        {marks.map((m, i) => (
          <span key={m.key} className={`sa-taper-pin${i > 0 && Math.abs(x(m.h) - x(marks[i - 1].h)) < 5 ? " is-lower" : ""}`} style={{ left: `${x(m.h)}%` }} aria-hidden="true">
            {i + 1}
          </span>
        ))}
        <button
          type="button"
          role="slider"
          data-marker="now"
          className={`sa-taper-marker sa-taper-marker--now${side(now)}`}
          style={{ left: `${x(now)}%`, top: `${y(nowPoint.total)}%` }}
          aria-label="Hours you work now"
          aria-valuemin={0}
          aria-valuemax={maxHours}
          aria-valuenow={now}
          aria-valuetext={`${hrs(now)} a week: ${describe(nowPoint)}`}
          onKeyDown={keys("now", now)}
        >
          <span>Now · {Number(now.toFixed(1))}h</span>
        </button>
        <button
          type="button"
          role="slider"
          data-marker="next"
          className={`sa-taper-marker sa-taper-marker--next${side(next)}`}
          style={{ left: `${x(next)}%`, top: `${y(nextPoint.total)}%` }}
          aria-label="New hours"
          aria-valuemin={0}
          aria-valuemax={maxHours}
          aria-valuenow={next}
          aria-valuetext={`${hrs(next)} a week: ${describe(nextPoint)}`}
          onKeyDown={keys("next", next)}
        >
          <span>New · {Number(next.toFixed(1))}h</span>
        </button>
      </div>
      <div className="sa-taper-xaxis" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ left: `${x(t)}%` }}>
            {t}
          </span>
        ))}
      </div>
      <p className="sa-taper-xtitle" aria-hidden="true">
        Hours worked a week
      </p>
      <ul className="sa-taper-legend">
        <li>
          <i className="sa-taper-sw sa-taper-sw--total" aria-hidden="true" />
          Total income
        </li>
        <li>
          <i className="sa-taper-sw sa-taper-sw--uc" aria-hidden="true" />
          Universal Credit
        </li>
        <li>
          <i className="sa-taper-sw sa-taper-sw--pay" aria-hidden="true" />
          Take-home pay
        </li>
      </ul>
      {marks.length > 0 && (
        <ol className="sa-taper-marks">
          {marks.map((m, i) => (
            <li key={m.key}>
              <b aria-hidden="true">{i + 1}</b>
              <span>
                {m.label} <strong>{m.h < 0.25 ? "from the first hour" : `at about ${hrs(Math.round(m.h * 2) / 2)}`}</strong>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
