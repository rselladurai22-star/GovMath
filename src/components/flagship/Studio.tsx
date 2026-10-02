"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./Flagship.module.css";

/**
 * Calculator workspace in two stages.
 *
 * Before the first calculation only the inputs show, centred, with a
 * Calculate button. After it, the inputs move left (sticky on desktop) and
 * the results open in their own tray on the right, updating live from then
 * on. On phones a dock keeps the headline answer in view while the inputs
 * are being edited, and jumps to the results on tap.
 */
export default function Studio({
  title,
  ready,
  onCalculate,
  calculateLabel = "Calculate",
  onReset,
  inputs,
  dock,
  children,
}: {
  title: string;
  /** True once results should show. */
  ready: boolean;
  onCalculate: () => void;
  calculateLabel?: string;
  onReset?: () => void;
  inputs: ReactNode;
  dock: { label: string; value: string };
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const results = useRef<HTMLElement>(null);
  const justCalculated = useRef(false);
  const [showDock, setShowDock] = useState(false);

  // Bring the fresh results into view right after Calculate.
  useEffect(() => {
    if (!ready || !justCalculated.current) return;
    justCalculated.current = false;
    const target = window.innerWidth < 1024 ? results.current : root.current;
    requestAnimationFrame(() => target?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [ready]);

  useEffect(() => {
    const el = results.current;
    if (!ready || !el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setShowDock(!e.isIntersecting && e.boundingClientRect.top > 0), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  return (
    <div ref={root} className={`gm-wrap ${s.studio}`} data-ready={ready || undefined}>
      <aside ref={panel} className={s.panel} aria-label={title}>
        <header className={s.panelHead}>
          <h2>{title}</h2>
          {onReset && (
            <button type="button" onClick={onReset} className={s.reset}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
              </svg>
              Reset
            </button>
          )}
        </header>
        <div className={s.panelBody}>{inputs}</div>
        {!ready && (
          <footer className={s.panelFoot}>
            <button
              type="button"
              className={s.calcBtn}
              onClick={() => {
                justCalculated.current = true;
                onCalculate();
              }}
            >
              {calculateLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p>Free and private. Nothing you enter is stored.</p>
          </footer>
        )}
      </aside>

      {ready && (
        <section ref={results} id="results" className={s.results} aria-label="Your results">
          <header className={s.resultsHead}>
            <div>
              <h2>Your results</h2>
              <p>
                <i aria-hidden="true" />
                Updates live as you change the inputs
              </p>
            </div>
            <button type="button" className={s.editBtn} onClick={() => panel.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit inputs
            </button>
          </header>
          {children}
        </section>
      )}

      {ready && (
        <button
          type="button"
          className={s.dock}
          data-show={showDock || undefined}
          tabIndex={showDock ? 0 : -1}
          aria-hidden={!showDock}
          onClick={() => results.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          <span>
            <small>{dock.label}</small>
            <strong>{dock.value}</strong>
          </span>
          <em>
            See results
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </em>
        </button>
      )}
    </div>
  );
}
