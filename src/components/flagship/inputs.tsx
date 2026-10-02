"use client";

import { useId, useState, type ReactNode } from "react";
import { whole } from "./format";
import s from "./Flagship.module.css";

/** A titled group of inputs inside the input panel. */
export function InputGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className={s.group}>
      <legend>{title}</legend>
      <div className={s.groupBody}>{children}</div>
    </fieldset>
  );
}

/** Label row + control + optional hint. */
export function Field({
  label,
  htmlFor,
  aside,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  aside?: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={s.field}>
      <div className={s.fieldHead}>
        {htmlFor ? <label htmlFor={htmlFor}>{label}</label> : <span>{label}</span>}
        {aside && <span className={s.fieldAside}>{aside}</span>}
      </div>
      {children}
      {hint && <p className={s.hint}>{hint}</p>}
    </div>
  );
}

/** Range slider with a filled track. */
export function Slider({
  value,
  min,
  max,
  step,
  onChange,
  label,
  ends,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  label: string;
  ends?: [string, string];
}) {
  const clamped = Math.min(Math.max(value, min), max);
  const fill = max > min ? ((clamped - min) / (max - min)) * 100 : 0;
  return (
    <div className={s.slider}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      {ends && (
        <div className={s.sliderEnds} aria-hidden="true">
          <span>{ends[0]}</span>
          <span>{ends[1]}</span>
        </div>
      )}
    </div>
  );
}

/**
 * £ amount field. Keeps thousands separators tidy while typing and reformats
 * on blur; an optional slider sits underneath.
 */
export function MoneyField({
  label,
  value,
  onChange,
  max = 100_000_000,
  slider,
  aside,
  hint,
  big,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max?: number;
  slider?: { min: number; max: number; step: number; ends?: [string, string] };
  aside?: ReactNode;
  hint?: ReactNode;
  big?: boolean;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <Field label={label} htmlFor={id} aside={aside} hint={hint}>
      <div className={`${s.box} ${big ? s.boxBig : ""}`}>
        <span className={s.affix} aria-hidden="true">
          £
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={draft ?? whole(value)}
          onFocus={(e) => {
            setDraft(whole(value));
            e.currentTarget.select();
          }}
          onChange={(e) => {
            setDraft(e.target.value);
            onChange(Math.min(Number(e.target.value.replace(/[^\d]/g, "") || 0), max));
          }}
          onBlur={() => setDraft(null)}
        />
      </div>
      {slider && <Slider value={value} onChange={onChange} label={label} {...slider} />}
    </Field>
  );
}

/** Decimal field with − / + steppers and a unit (%, years…). */
export function StepperField({
  label,
  value,
  onChange,
  step,
  min,
  max,
  unit,
  dp = 2,
  hint,
  aside,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step: number;
  min: number;
  max: number;
  unit: string;
  dp?: number;
  hint?: ReactNode;
  aside?: ReactNode;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, Number(n.toFixed(dp))));
  const shown = Number(value.toFixed(dp)).toString();
  return (
    <Field label={label} htmlFor={id} hint={hint} aside={aside}>
      <div className={s.stepper}>
        <button type="button" onClick={() => onChange(clamp(value - step))} aria-label={`Decrease ${label.toLowerCase()}`} disabled={value <= min}>
          −
        </button>
        <div className={s.box}>
          <input
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={draft ?? shown}
            onFocus={(e) => {
              setDraft(shown);
              e.currentTarget.select();
            }}
            onChange={(e) => {
              setDraft(e.target.value);
              const n = Number(e.target.value.replace(/[^\d.]/g, ""));
              if (Number.isFinite(n)) onChange(clamp(n));
            }}
            onBlur={() => setDraft(null)}
          />
          <span className={s.affix} aria-hidden="true">
            {unit}
          </span>
        </div>
        <button type="button" onClick={() => onChange(clamp(value + step))} aria-label={`Increase ${label.toLowerCase()}`} disabled={value >= max}>
          +
        </button>
      </div>
    </Field>
  );
}

/** Pill buttons for quick picks; pressed when the value matches. */
export function Chips<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className={s.chips} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={String(o.value)} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Two-to-four way switch with an optional one-line description per option. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; note?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <Field label={label}>
      <div className={s.segmented} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
      {current?.note && <p className={s.hint}>{current.note}</p>}
    </Field>
  );
}

/** Native dropdown, styled to match the other fields. */
export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: ReactNode;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <div className={`${s.box} ${s.selectBox}`}>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Field>
  );
}
