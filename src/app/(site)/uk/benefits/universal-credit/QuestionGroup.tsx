"use client";

import type { ReactNode } from "react";

/**
 * One group of questions in the Universal Credit estimate. Closed, it is a
 * single line: the title and a summary of what has been answered. Open, it
 * shows its questions and a button that moves on to the next group.
 */
export default function QuestionGroup({
  id,
  step,
  title,
  summary,
  open,
  seen,
  onToggle,
  next,
  children,
}: {
  id: string;
  step: number;
  title: string;
  /** What has been answered, in a few words. */
  summary: string;
  open: boolean;
  /** Opened at least once: until then the summary is an assumption. */
  seen: boolean;
  onToggle: () => void;
  /** The button that closes this group and opens the next. */
  next: { label: string; onClick: () => void };
  children: ReactNode;
}) {
  return (
    <section className={`sa-uc-group${open ? " is-open" : ""}${seen && !open ? " is-done" : ""}`}>
      <h3 className="sa-uc-grouphead">
        <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} id={`${id}-head`} onClick={onToggle}>
          <span className="sa-uc-step" aria-hidden="true">
            {seen && !open ? "✓" : step}
          </span>
          <span className="sa-uc-grouptitle">{title}</span>
          {!open && (
            <span className="sa-uc-summary">
              {!seen && <span className="sa-uc-assumed">Assumed: </span>}
              {summary}
            </span>
          )}
          <span className="sa-uc-change" aria-hidden="true">
            {open ? "Close" : seen ? "Change" : "Answer"}
          </span>
        </button>
      </h3>
      <div className="sa-uc-panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-head`} hidden={!open}>
        {children}
        <button type="button" className="sa-uc-next" onClick={next.onClick}>
          {next.label}
        </button>
      </div>
    </section>
  );
}
