"use client";

import { useEffect, useState } from "react";
import s from "./Flagship.module.css";

/**
 * Shared state for flagship calculators.
 *
 * Each calculator declares its inputs once as a schema (default value plus a
 * parser for the URL). The hook then handles the parts every calculator
 * needs: reading a shared link, keeping the URL in step once results show,
 * Reset, the Share button, and counting changed "More options" fields.
 */

export type Param<T> = { def: T; parse: (raw: string) => T | undefined; write?: (v: T) => string };
export type Schema<T> = { [K in keyof T]: Param<T[K]> };
export type Query = Record<string, string | string[] | undefined>;

/** A number from the URL, clamped to [min, max]. */
export function num(def: number, min = 0, max = 10_000_000): Param<number> {
  return {
    def,
    parse: (raw) => {
      const n = Number(raw);
      return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : undefined;
    },
  };
}
/** One of a fixed set of strings. */
export function oneOf<T extends string>(def: T, options: readonly T[]): Param<T> {
  return { def, parse: (raw) => (options as readonly string[]).includes(raw) ? (raw as T) : undefined };
}
export function bool(def: boolean): Param<boolean> {
  return { def, parse: (raw) => (raw === "1" ? true : raw === "0" ? false : undefined), write: (v) => (v ? "1" : "0") };
}
/** An ISO date (YYYY-MM-DD). */
export function date(def: string): Param<string> {
  return { def, parse: (raw) => (/^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : undefined) };
}
/** Free text, trimmed and length-limited. */
export function text(def: string, maxLength = 40): Param<string> {
  return { def, parse: (raw) => raw.trim().slice(0, maxLength) };
}

/** Values from a page's searchParams, falling back to each default. */
export function readQuery<T>(schema: Schema<T>, query: Query): { values: T; hasAny: boolean } {
  const values = {} as T;
  let hasAny = false;
  for (const key in schema) {
    const raw = query[key];
    const str = Array.isArray(raw) ? raw[0] : raw;
    const parsed = str === undefined ? undefined : schema[key].parse(str);
    if (parsed !== undefined) hasAny = true;
    values[key] = parsed === undefined ? schema[key].def : parsed;
  }
  return { values, hasAny };
}

export function useStudio<T extends Record<string, unknown>>(schema: Schema<T>, query: Query) {
  const [initial] = useState(() => readQuery(schema, query));
  const [values, setValues] = useState<T>(initial.values);
  const [ready, setReady] = useState(initial.hasAny);
  const [copied, setCopied] = useState(false);

  // Keep the address bar shareable once results are showing.
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => {
      const q = new URLSearchParams();
      for (const key in schema) {
        const v = values[key];
        if (v === schema[key].def) continue;
        q.set(key, schema[key].write ? schema[key].write!(v) : String(v));
      }
      const qs = q.toString();
      window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
    }, 400);
    return () => window.clearTimeout(t);
  }, [ready, values, schema]);

  const set = <K extends keyof T>(key: K, value: T[K]) => setValues((prev) => ({ ...prev, [key]: value }));

  const defaults = () => {
    const d = {} as T;
    for (const key in schema) d[key] = schema[key].def;
    return d;
  };

  return {
    values,
    set,
    /** A setter bound to one key, for onChange props. */
    bind: <K extends keyof T>(key: K) => (value: T[K]) => set(key, value),
    ready,
    calculate: () => setReady(true),
    reset: () => {
      setValues(defaults());
      setReady(false);
      window.history.replaceState(null, "", window.location.pathname);
    },
    /** Reset only these keys (for a "More options" panel). */
    resetKeys: (keys: (keyof T)[]) =>
      setValues((prev) => {
        const next = { ...prev };
        for (const k of keys) next[k] = schema[k].def;
        return next;
      }),
    /** How many of these keys differ from their defaults. */
    changed: (keys: (keyof T)[]) => keys.filter((k) => values[k] !== schema[k].def).length,
    copied,
    share: async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard blocked — the link is still in the address bar */
      }
    },
  };
}

/** The Share button that sits in the answer card. */
export function ShareButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <button type="button" className={s.ghostBtn} onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
      </svg>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
