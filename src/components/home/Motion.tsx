"use client";

import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Page-level motion for the homepage. Progressive: content is fully visible
 * without JS or with reduced motion. When active it
 *  - marks the root `data-motion="on"` so CSS can hide `[data-reveal]` items,
 *  - reveals them as they scroll into view,
 *  - feeds cursor position to `[data-spot]` cards for the spotlight effect.
 */
export function HomeMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root || reduced()) return;

    root.dataset.motion = "on";
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            (e.target as HTMLElement).dataset.in = "";
            io?.unobserve(e.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      items.forEach((el) => io?.observe(el));
    } else {
      items.forEach((el) => (el.dataset.in = ""));
    }

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest?.<HTMLElement>("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    root.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io?.disconnect();
      root.removeEventListener("pointermove", onMove);
      delete root.dataset.motion;
    };
  }, [rootId]);
  return null;
}

/** Smoothly tweens to `value` whenever it changes (ease-out cubic). */
export function useTween(value: number, duration = 450): number {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    const t0 = performance.now();
    const ms = reduced() ? 0 : duration;
    let raf = 0;
    const tick = (t: number) => {
      const p = ms === 0 ? 1 : Math.min(1, (t - t0) / ms);
      const v = start + (value - start) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return shown;
}

/** Counts up from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, duration = 1100 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return <span ref={ref}>{n}</span>;
}
