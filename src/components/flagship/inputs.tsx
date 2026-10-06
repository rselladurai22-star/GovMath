"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { per, whole } from "./format";

/*
 * Calculator inputs in the approved GovMath design's markup (see
 * public/gm/original-layout.css, matching-mortgage.css, matching-controls.css
 * and matching-calculators.css): a .field with a .labelrow, a .number box,
 * a range slider with .endpoints, .chips, .ax-calctabs, the .ax-select
 * dropdown and details.moreoptions. Parts the package does not include use
 * gm-* classes styled in public/gm/govmath-site.css.
 */

/** 1234.5 → "1,234.50"; whole pounds stay "1,234". */
function money2(n: number): string {
  const v = Number.isFinite(n) ? n : 0;
  return Number.isInteger(v)
    ? whole(v)
    : v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const Optional = () => <span className="gm-optional">Optional</span>;

/** A small (i) button beside a label that shows a short explanation. */
export function InfoTip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const wrap = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  return (
    <span className="gm-info" ref={wrap}>
      <button type="button" className="gm-info-button" aria-label={`About ${label.toLowerCase()}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        i
      </button>
      <span id={id} role="tooltip" className="gm-info-bubble" hidden={!open}>
        {children}
      </span>
    </span>
  );
}

/** A titled group of inputs (the title is for screen readers, as in the design). */
export function InputGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="gm-group">
      <legend className="sr-only">{title}</legend>
      {children}
    </fieldset>
  );
}

/** Label row + control + optional hint. `inline` sits at the right of the label row. */
export function Field({
  label,
  htmlFor,
  aside,
  hint,
  optional,
  inline,
  info,
  children,
}: {
  label: string;
  htmlFor?: string;
  aside?: ReactNode;
  hint?: ReactNode;
  /** Explanation shown from an (i) button beside the label. */
  info?: ReactNode;
  /** Shows an "Optional" tag beside the label. */
  optional?: boolean;
  inline?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="field">
      <div className="labelrow">
        <span className="gm-labelwrap">
          {htmlFor ? (
            <label htmlFor={htmlFor}>
              {label}
              {optional && <Optional />}
            </label>
          ) : (
            <span className="gm-label">
              {label}
              {optional && <Optional />}
            </span>
          )}
          {info && <InfoTip label={label}>{info}</InfoTip>}
          {aside && <span className="gm-aside">{aside}</span>}
        </span>
        {inline}
      </div>
      {children}
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

/** Range slider with a filled track and its end values. */
function Slider({
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
    <>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        aria-label={`Adjust ${label.toLowerCase()}`}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      {ends && (
        <div className="endpoints" aria-hidden="true">
          <span>{ends[0]}</span>
          <span>{ends[1]}</span>
        </div>
      )}
    </>
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
  pence,
  optional,
  info,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  optional?: boolean;
  info?: ReactNode;
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
  const box = (
    <div className="number">
      <span aria-hidden="true">£</span>
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
      <span />
    </div>
  );
  return (
    <Field label={label} htmlFor={id} aside={aside} hint={hint} optional={optional} info={info} inline={box}>
      {slider && <Slider value={value} onChange={onChange} label={label} {...slider} />}
    </Field>
  );
}

/** "12.5" with a unit: "%" sits tight, words get a space. */
function withUnit(n: number, unit: string) {
  const v = Number(n.toFixed(4)).toLocaleString("en-GB");
  const u = per(n, unit);
  return /^[%£]/.test(u) ? `${v}${u}` : `${v} ${u}`;
}

/** Decimal field with a unit (%, years…) and a slider across its range. */
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
  info,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  optional?: boolean;
  info?: ReactNode;
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
  const box = (
    <div className="number">
      <span />
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
      <span aria-hidden="true">{per(value, unit)}</span>
    </div>
  );
  return (
    <Field label={label} htmlFor={id} hint={hint} aside={aside} optional={optional} info={info} inline={box}>
      <Slider value={value} onChange={(n) => onChange(clamp(n))} label={label} min={min} max={max} step={step} ends={[withUnit(min, unit), withUnit(max, unit)]} />
    </Field>
  );
}

/** Quick-pick buttons; pressed when the value matches. */
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
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={String(o.value)} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Two-to-four way choice, as the design's underlined calculator tabs. */
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
    <Field label={label} optional={optional} hint={current?.note}>
      <div className="ax-calctabs gm-choice" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            className={value === o.value ? "selected" : undefined}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </Field>
  );
}

/** The design's dropdown (.ax-select): a button and a listbox, keyboard friendly. */
export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
  optional,
  info,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: ReactNode;
  optional?: boolean;
  info?: ReactNode;
}) {
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const items = [...(list.current?.querySelectorAll<HTMLElement>("[role=option]") ?? [])];
    (items.find((i) => i.dataset.value === value) ?? items[0])?.focus();
    const away = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", away);
    return () => document.removeEventListener("click", away);
  }, [open, value]);

  const choose = (v: T) => {
    onChange(v);
    setOpen(false);
    toggle.current?.focus();
  };

  return (
    <div className="ax-select-field">
      <div className="gm-labelwrap">
        <label id={`${id}-label`} htmlFor={`${id}-toggle`}>
          {label}
          {optional && <Optional />}
        </label>
        {info && <InfoTip label={label}>{info}</InfoTip>}
      </div>
      <div className="ax-select" ref={wrap}>
        <button
          ref={toggle}
          type="button"
          className="ax-select-toggle"
          id={`${id}-toggle`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-options`}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          <span id={`${id}-value`}>{current?.label}</span>
          <span className="chevron" aria-hidden="true" />
        </button>
        <div
          ref={list}
          className="ax-options"
          id={`${id}-options`}
          role="listbox"
          aria-label={label}
          hidden={!open}
          onKeyDown={(e) => {
            const items = [...(list.current?.querySelectorAll<HTMLElement>("[role=option]") ?? [])];
            const i = items.indexOf(document.activeElement as HTMLElement);
            let n = i;
            if (e.key === "ArrowDown") n = (i + 1) % items.length;
            else if (e.key === "ArrowUp") n = (i - 1 + items.length) % items.length;
            else if (e.key === "Home") n = 0;
            else if (e.key === "End") n = items.length - 1;
            else if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (items[i]) choose(items[i].dataset.value as T);
              return;
            } else if (e.key === "Escape") {
              e.preventDefault();
              setOpen(false);
              toggle.current?.focus();
              return;
            } else if (e.key === "Tab") {
              setOpen(false);
              return;
            } else if (e.key.length === 1) {
              const k = e.key.toLowerCase();
              n = items.findIndex((o, j) => j > i && (o.textContent ?? "").toLowerCase().startsWith(k));
              if (n < 0) n = items.findIndex((o) => (o.textContent ?? "").toLowerCase().startsWith(k));
            } else return;
            if (n >= 0) {
              e.preventDefault();
              items[n].focus();
            }
          }}
        >
          {options.map((o) => (
            <div
              key={o.value}
              className="ax-option"
              role="option"
              tabIndex={-1}
              data-value={o.value}
              aria-selected={o.value === value}
              onClick={() => choose(o.value)}
            >
              {o.label}
            </div>
          ))}
        </div>
      </div>
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

/**
 * "More options": the optional inputs for less common situations, closed by
 * default, with how many differ from their defaults and a reset.
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
    <details className="moreoptions" open={defaultOpen || changed > 0 || undefined}>
      <summary>
        {title}
        {changed > 0 && <em className="gm-changed"> · {changed} changed</em>}
        <span>{description}</span>
      </summary>
      <div>
        {children}
        {onReset && changed > 0 && (
          <button type="button" className="textbutton" onClick={onReset}>
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
  info,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: ReactNode;
  optional?: boolean;
  info?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="field gm-switchfield">
      <div className="gm-switchrow">
        <button id={id} type="button" role="switch" aria-checked={checked} className="gm-switch" onClick={() => onChange(!checked)}>
          <span aria-hidden="true" />
        </button>
        <label htmlFor={id}>
          {label}
          {optional && <Optional />}
        </label>
        {info && <InfoTip label={label}>{info}</InfoTip>}
      </div>
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

/** A short list of choices as radio buttons, one per line. */
export function RadioGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  info,
  optional,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  info?: ReactNode;
  optional?: boolean;
}) {
  const name = useId();
  return (
    <fieldset className="field gm-radiogroup">
      <legend className="gm-labelwrap">
        <span className="gm-label">
          {label}
          {optional && <Optional />}
        </span>
        {info && <InfoTip label={label}>{info}</InfoTip>}
      </legend>
      <div className="gm-radios">
        {options.map((o) => (
          <label key={o.value} className="gm-radio">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
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
      <input className="gm-input" id={id} type="date" value={value} min={min} max={max} onChange={(e) => onChange(e.target.value)} />
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
      <input
        className="gm-input"
        id={id}
        type="text"
        autoComplete="off"
        spellCheck={false}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)}
      />
    </Field>
  );
}
