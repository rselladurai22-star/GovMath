"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./Flagship.module.css";

/**
 * Two-pane calculator workspace: inputs on the left (sticky on desktop),
 * live results on the right. On phones a dock keeps the headline answer in
 * view while the inputs are being edited, and jumps to the results on tap.
 */
export default function Studio({
  title,
  onReset,
  inputs,
  dock,
  children,
}: {
  title: string;
  onReset?: () => void;
  inputs: ReactNode;
  dock: { label: string; value: string };
  children: ReactNode;
}) {
  const results = useRef<HTMLDivElement>(null);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const el = results.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setShowDock(!e.isIntersecting && e.boundingClientRect.top > 0), {
      rootMargin: "0px 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`gm-wrap ${s.studio}`}>
      <aside className={s.panel} aria-label={title}>
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
      </aside>

      <div ref={results} id="results" className={s.results}>
        {children}
      </div>

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
    </div>
  );
}
