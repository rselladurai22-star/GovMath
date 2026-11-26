"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Compact inputs for individually designed calculators (the kit's client
 * parts). The flagship inputs (components/flagship/inputs.tsx) are full-width
 * rows with sliders; these are small enough to sit several to a line, in a
 * sentence, or inside a result. Styles: "Calculator kit" block of
 * public/gm/sumatlas-ds.css (`sa-mini`, `sa-pills`).
 */

const shown = (n: number, dp: number, group: boolean) => {
  const v = Number.isFinite(n) ? n : 0;
  if (!group) return Number(v.toFixed(dp)).toString();
  const whole = Number.isInteger(Number(v.toFixed(dp)));
  return v.toLocaleString("en-GB", { minimumFractionDigits: whole ? 0 : dp, maximumFractionDigits: dp });
};

/**
 * A small labelled number box: label above, value below, with an optional
 * prefix ("£"), suffix ("hours") and −/+ buttons. Typing updates the value
 * at once; the box tidies its text on blur.
 */
export function Mini({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max = 10_000_000,
  step = 1,
  dp = 0,
  stepper,
  hint,
  wide,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  /** What − and + (and the arrow keys) change the value by. */
  step?: number;
  /** Decimal places kept. */
  dp?: number;
  /** Show − and + buttons. */
  stepper?: boolean;
  /** One short line under the box. */
  hint?: ReactNode;
  /** A wider box, for amounts in the thousands. */
  wide?: boolean;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, Number(n.toFixed(dp))));
  const text = shown(value, dp, prefix === "£");
  const nudge = (by: number) => {
    setDraft(null);
    onChange(clamp(value + by));
  };
  return (
    <div className={`sa-mini${wide ? " sa-mini--wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="sa-mini-box">
        {stepper && (
          <button type="button" aria-label={`Lower ${label.toLowerCase()}`} disabled={value <= min} onClick={() => nudge(-step)}>
            −
          </button>
        )}
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="text"
          inputMode={dp > 0 ? "decimal" : "numeric"}
          autoComplete="off"
          value={draft ?? text}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onFocus={(e) => {
            // Keep the text exactly as shown: changing it here would drop the selection.
            setDraft(text);
            e.currentTarget.select();
          }}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = Number(e.target.value.replace(/[^\d.]/g, ""));
            if (Number.isFinite(n)) onChange(clamp(n));
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.preventDefault();
              nudge(e.key === "ArrowUp" ? step : -step);
            }
          }}
          onBlur={() => setDraft(null)}
        />
        {suffix && <span aria-hidden="true">{suffix}</span>}
        {stepper && (
          <button type="button" aria-label={`Raise ${label.toLowerCase()}`} disabled={value >= max} onClick={() => nudge(step)}>
            +
          </button>
        )}
      </div>
      {hint && (
        <small id={`${id}-hint`} className="sa-mini-hint">
          {hint}
        </small>
      )}
    </div>
  );
}

/** A choice between two or three short options, as pills (radio buttons underneath). */
export function Pills<T extends string>({ label, value, onChange, options, hideLabel }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; hideLabel?: boolean }) {
  const name = useId();
  return (
    <fieldset className="sa-pills">
      <legend className={hideLabel ? "sr-only" : undefined}>{label}</legend>
      <div>
        {options.map((o) => (
          <label key={o.value}>
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
