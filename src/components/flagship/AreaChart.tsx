"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import s from "./Flagship.module.css";

export type Series = {
  key: string;
  label: string;
  color: string;
  values: number[];
  /** Filled area under the line. */
  fill?: boolean;
  dashed?: boolean;
};

const W = 1000;
const H = 300;

/**
 * Responsive line/area chart with a scrubber. Drag, hover or use the arrow
 * keys to read any point; `readout` renders what that point means.
 */
export default function AreaChart({
  series,
  xLabel,
  yFormat,
  readout,
  ariaLabel,
  initial = null,
}: {
  series: Series[];
  /** Label for index i on the x axis. */
  xLabel: (i: number) => string;
  yFormat: (n: number) => string;
  readout: (i: number) => ReactNode;
  ariaLabel: string;
  initial?: number | null;
}) {
  const gid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(initial);
  const n = Math.max(...series.map((x) => x.values.length), 2);
  const max = Math.max(1, ...series.flatMap((x) => x.values)) * 1.08;
  const xAt = (i: number) => (i / (n - 1)) * W;
  const yAt = (v: number) => H - (Math.max(0, v) / max) * H;

  const pick = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setActive(Math.round(t * (n - 1)));
  };

  const ticks = [0.25, 0.5, 0.75, 1].map((t) => t * (max / 1.08));
  const step = n > 30 ? 10 : n > 12 ? 5 : n > 6 ? 2 : 1;
  const xTicks = Array.from({ length: n }, (_, i) => i).filter((i) => i % step === 0 || i === n - 1);
  const shown = active ?? n - 1;

  return (
    <div className={s.chart}>
      <ul className={s.chartKey}>
        {series.map((x) => (
          <li key={x.key}>
            <i style={{ background: x.color }} data-dashed={x.dashed || undefined} aria-hidden="true" />
            {x.label}
          </li>
        ))}
      </ul>

      <div className={s.chartReadout} aria-live="polite">
        {readout(shown)}
      </div>

      <div
        ref={ref}
        className={s.chartPlot}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={n - 1}
        aria-valuenow={shown}
        aria-valuetext={xLabel(shown)}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture?.(e.pointerId);
          pick(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse" || e.buttons) pick(e.clientX);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            setActive(Math.min(n - 1, Math.max(0, shown + (e.key === "ArrowRight" ? 1 : -1))));
          } else if (e.key === "Home") setActive(0);
          else if (e.key === "End") setActive(n - 1);
        }}
      >
        {ticks.map((t) => (
          <span key={t} className={s.gridline} style={{ top: `${(yAt(t) / H) * 100}%` }}>
            <em>{yFormat(t)}</em>
          </span>
        ))}

        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            {series.map((x) => (
              <linearGradient key={x.key} id={`${gid}-${x.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={x.color} stopOpacity="0.28" />
                <stop offset="100%" stopColor={x.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
          </defs>
          {series.map((x) => {
            const pts = x.values.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`);
            if (pts.length === 0) return null;
            const line = `M${pts.join("L")}`;
            const last = xAt(x.values.length - 1).toFixed(1);
            return (
              <g key={x.key}>
                {x.fill && <path d={`${line}L${last},${H}L0,${H}Z`} fill={`url(#${gid}-${x.key})`} />}
                <path
                  d={line}
                  fill="none"
                  stroke={x.color}
                  strokeWidth={x.dashed ? 2 : 3}
                  strokeDasharray={x.dashed ? "7 6" : undefined}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        <span className={s.cursor} style={{ left: `${(shown / (n - 1)) * 100}%` }} aria-hidden="true">
          {series.map((x) =>
            shown < x.values.length ? (
              <i key={x.key} style={{ top: `${(yAt(x.values[shown]) / H) * 100}%`, background: x.color }} />
            ) : null,
          )}
        </span>
      </div>

      <div className={s.chartX} aria-hidden="true">
        {xTicks.map((i) => (
          <span key={i} style={{ left: `${(i / (n - 1)) * 100}%` }}>
            {xLabel(i)}
          </span>
        ))}
      </div>
      <p className={s.chartHint}>Drag across the chart, or use the arrow keys, to read any year.</p>
    </div>
  );
}
