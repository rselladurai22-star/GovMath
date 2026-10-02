"use client";

import { useRef, useState, type ReactNode } from "react";
import s from "./CalcStage.module.css";

/**
 * Two-stage wrapper for the standard calculators (inputs card on the left,
 * results column on the right). Until Calculate is pressed only the inputs
 * card shows, centred; afterwards the results open in their own tray and
 * update live. Calculators without that two-column layout are left as they
 * are — the CSS only matches the standard grid.
 */
export default function CalcStage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const calculate = () => {
    setReady(true);
    requestAnimationFrame(() => {
      const el = root.current;
      if (!el) return;
      const results = el.querySelector<HTMLElement>(`.${s.stage} [class*="lg:grid-cols-["] > :nth-child(2)`);
      const target = window.innerWidth < 1024 && results ? results : el;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div ref={root} className={`gm-calc min-w-0 ${s.stage}`} data-ready={ready || undefined}>
      {children}
      {!ready && (
        <div className={s.foot}>
          <button type="button" className={s.calcBtn} onClick={calculate}>
            Calculate
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p>Free and private. Nothing you enter is stored.</p>
        </div>
      )}
    </div>
  );
}
