"use client";

import { useId, useState, type ReactNode } from "react";
import { whole } from "./format";

/** 1234.5 → "1,234.50"; whole pounds stay "1,234". */
function money2(n: number): string {
  const v = Number.isFinite(n) ? n : 0;
  return Number.isInteger(v)
    ? whole(v)
    : v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
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
  optional,
  children,
}: {
  label: string;
  htmlFor?: string;
  aside?: ReactNode;
  hint?: ReactNode;
  /** Shows an "Optional" tag beside the label. */
  optional?: boolean;
  children: ReactNode;
}) {
  const tag = optional && <span className={s.optional}>Optional</span>;
  return (
    <div className={s.field}>
      <div className={s.fieldHead}>
        {htmlFor ? (
          <label htmlFor={htmlFor}>
            {label}
            {tag}
          </label>
        ) : (
          <span>
            {label}
            {tag}
          </span>
        )}
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
  pence,
  optional,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  optional?: boolean;
  max?: number;
  slider?: { min: number; max: number; step: number; ends?: [string, string] };
  aside?: ReactNode;
  hint?: ReactNode;
  big?: boolean;
  /** Accept and show pence, e.g. 99.99. */
  pence?: boolean;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const shown = pence ? money2(value) : whole(value);
  const parse = (raw: string) => {
    const n = pence ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw.replace(/[^\d]/g, ""));
    return Math.min(Number.isFinite(n) ? Math.round(n * 100) / 100 : 0, max);
  };
  return (
    <Field label={label} htmlFor={id} aside={aside} hint={hint} optional={optional}>
      <div className={`${s.box} ${big ? s.boxBig : ""}`}>
        <span className={s.affix} aria-hidden="true">
          £
        </span>
        <input
          id={id}
          type="text"
          inputMode={pence ? "decimal" : "numeric"}
          autoComplete="off"
          value={draft ?? shown}
          onFocus={(e) => {
            setDraft(shown);
            e.currentTarget.select();
          }}
          onChange={(e) => {
            setDraft(e.target.value);
            onChange(parse(e.target.value));
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
  optional,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  optional?: boolean;
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
    <Field label={label} htmlFor={id} hint={hint} aside={aside} optional={optional}>
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
  optional,
}: {
  label: string;
  options: { value: T; label: string; note?: string }[];
  value: T;
  onChange: (v: T) => void;
  optional?: boolean;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <Field label={label} optional={optional}>
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
  optional,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: ReactNode;
  optional?: boolean;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} optional={optional}>
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

/**
 * "More options" — the optional, advanced inputs for less common situations.
 * Closed by default so most people answer from the core fields; shows how
 * many options differ from their defaults and offers to reset them.
 */
export function AdvancedOptions({
  title = "More options",
  description = "Optional. The defaults suit most people; change these if your situation is different.",
  changed = 0,
  onReset,
  defaultOpen = false,
  children,
}: {
  title?: string;
  description?: string;
  /** How many advanced options differ from their defaults. */
  changed?: number;
  onReset?: () => void;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className={s.advanced} open={defaultOpen || changed > 0 || undefined}>
      <summary>
        <span className={s.advancedIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
            <circle cx="16" cy="6" r="2" />
            <circle cx="10" cy="12" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
        </span>
        <span className={s.advancedTitle}>
          {title}
          <span className={s.optional}>Optional</span>
        </span>
        {changed > 0 && <span className={s.advancedCount}>{changed} changed</span>}
        <svg className={s.advancedChevron} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className={s.advancedBody}>
        <p className={s.hint}>{description}</p>
        {children}
        {onReset && changed > 0 && (
          <button type="button" className={s.advancedReset} onClick={onReset}>
            Reset these options
          </button>
        )}
      </div>
    </details>
  );
}

/** On/off switch with a label and optional hint. */
export function Switch({
  label,
  checked,
  onChange,
  hint,
  optional,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: ReactNode;
  optional?: boolean;
}) {
  const id = useId();
  return (
    <div className={s.switchRow}>
      <button id={id} type="button" role="switch" aria-checked={checked} className={s.switch} onClick={() => onChange(!checked)}>
        <span aria-hidden="true" />
      </button>
      <div>
        <label htmlFor={id} className={s.switchLabel}>
          {label}
          {optional && <span className={s.optional}>Optional</span>}
        </label>
        {hint && <p className={s.hint}>{hint}</p>}
      </div>
    </div>
  );
}

/** Calendar date (yyyy-mm-dd). */
export function DateField({
  label,
  value,
  onChange,
  min,
  max,
  hint,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  max?: string;
  hint?: ReactNode;
  optional?: boolean;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} optional={optional}>
      <div className={s.box}>
        <input id={id} type="date" value={value} min={min} max={max} onChange={(e) => onChange(e.target.value)} />
      </div>
    </Field>
  );
}

export type Period = "year" | "month" | "week" | "day" | "hour";
const PERIOD_LABEL: Record<Period, string> = { year: "a year", month: "a month", week: "a week", day: "a day", hour: "an hour" };

/** £ amount with a period picker beside it, e.g. "£2,500 a month". */
export function PeriodMoneyField({
  label,
  value,
  period,
  periods = ["year", "month", "week"],
  onChange,
  hint,
  optional,
  big,
}: {
  label: string;
  value: number;
  period: Period;
  periods?: Period[];
  onChange: (value: number, period: Period) => void;
  hint?: ReactNode;
  optional?: boolean;
  big?: boolean;
}) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const shown = money2(value);
  return (
    <Field label={label} htmlFor={id} hint={hint} optional={optional}>
      <div className={s.periodRow}>
        <div className={`${s.box} ${big ? s.boxBig : ""}`}>
          <span className={s.affix} aria-hidden="true">
            £
          </span>
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
              onChange(Number.isFinite(n) ? Math.round(n * 100) / 100 : 0, period);
            }}
            onBlur={() => setDraft(null)}
          />
        </div>
        <div className={`${s.box} ${s.selectBox} ${big ? s.boxBig : ""}`}>
          <select aria-label={`${label}: period`} value={period} onChange={(e) => onChange(value, e.target.value as Period)}>
            {periods.map((p) => (
              <option key={p} value={p}>
                {PERIOD_LABEL[p]}
              </option>
            ))}
          </select>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Field>
  );
}

/** Short free-text field, such as a tax code. */
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  optional,
  big,
  maxLength = 20,
  uppercase,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  optional?: boolean;
  big?: boolean;
  maxLength?: number;
  uppercase?: boolean;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} optional={optional}>
      <div className={`${s.box} ${big ? s.boxBig : ""}`}>
        <input
          id={id}
          type="text"
          autoComplete="off"
          spellCheck={false}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)}
        />
      </div>
    </Field>
  );
}
