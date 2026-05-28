"use client";

import { useId } from "react";

type NumberInputProps = {
  label: string;
  value: number | "";
  onChange: (next: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  placeholder?: string;
};

export default function NumberInput({
  label,
  value,
  onChange,
  prefix = "£",
  suffix,
  min = 0,
  max,
  step = 100,
  hint,
  placeholder,
}: NumberInputProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-text mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text/60">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value}
          placeholder={placeholder}
          aria-describedby={hint ? hintId : undefined}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? 0 : Number(v));
          }}
          className={`w-full rounded-md border border-border bg-white py-3 text-base focus:border-primary ${
            prefix ? "pl-7" : "pl-3"
          } ${suffix ? "pr-10" : "pr-3"}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text/60">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={hintId} className="text-xs text-text/60 mt-1">
          {hint}
        </p>
      )}
    </div>
  );
}
