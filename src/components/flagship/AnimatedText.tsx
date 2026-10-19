"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A figure such as "£2,288.30", "$1,938.08", "37p" or "12.5%" that rolls
 * smoothly to its new value when it changes, and briefly marks itself as
 * changed (CSS gives the result row a glow). The first render prints the
 * exact text, so server and client HTML match; text that is not a single
 * number ("Not eligible") is shown as it is.
 */

type Parsed = { pre: string; n: number; post: string; dp: number; commas: boolean };

const NUM = /^([^\d-]*?)(-?[\d,]*\d(?:\.\d+)?)([\s\S]*)$/;

export function parseFigure(text: string): Parsed | null {
  const m = NUM.exec(text);
  if (!m) return null;
  const raw = m[2];
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n)) return null;
  const dot = raw.indexOf(".");
  return { pre: m[1], n, post: m[3], dp: dot < 0 ? 0 : raw.length - dot - 1, commas: raw.includes(",") || Math.abs(n) >= 10_000 };
}

export function formatFigure(p: Parsed, n: number): string {
  const fixed = Math.abs(n).toFixed(p.dp);
  const [int, dec] = fixed.split(".");
  const grouped = p.commas ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : int;
  return `${p.pre}${n < 0 ? "-" : ""}${grouped}${dec ? `.${dec}` : ""}${p.post}`;
}

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function AnimatedText({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);
  const [changed, setChanged] = useState(false);
  const from = useRef(text);

  useEffect(() => {
    const start = parseFigure(from.current);
    const end = parseFigure(text);
    from.current = text;
    let raf = 0;
    let timer = 0;
    const done = () => setShown(text);
    if (!start || !end || start.pre !== end.pre || start.post !== end.post || start.n === end.n || reduced()) {
      raf = requestAnimationFrame(done);
    } else {
      const t0 = performance.now();
      const span = 420;
      let first = true;
      const step = (now: number) => {
        if (first) {
          first = false;
          setChanged(true);
          timer = window.setTimeout(() => setChanged(false), 900);
        }
        const k = Math.min(1, (now - t0) / span);
        const e = 1 - Math.pow(1 - k, 3);
        setShown(k >= 1 ? text : formatFigure(end, start.n + (end.n - start.n) * e));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [text]);

  return <span className={`gm-num${changed ? " is-changed" : ""}${className ? ` ${className}` : ""}`}>{shown}</span>;
}
