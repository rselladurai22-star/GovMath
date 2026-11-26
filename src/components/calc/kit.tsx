import type { ReactNode } from "react";

/**
 * Parts for building a calculator's own layout inside CalcPage. They carry
 * the design system's look and no page structure: arrange them however the
 * calculator needs (CSS grid helpers `sa-cols-2`, `sa-cols-3`, `sa-stack`
 * are in the "Calculator kit" block of public/gm/sumatlas-ds.css), and add
 * page-specific visuals (SVG charts, calendars, scales) beside them.
 *
 * Inputs come from components/flagship/inputs.tsx (full-width rows with
 * sliders) and components/calc/fields.tsx (`Mini` number boxes and `Pills`,
 * small enough to sit several to a line). Wrap them in <Inputs> so they take
 * the kit's field styling in any layout.
 */

/** The tool's outer element. `id="calculator"` keeps in-page links working. */
export function Tool({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section className="calculator gm-atlas sa-tool" id="calculator" aria-label={label}>
      {children}
    </section>
  );
}

/** A group of inputs. `tone="plain"` drops the warm panel when the inputs sit inside another surface. */
export function Inputs({ children, title, tone = "panel", onSubmit }: { children: ReactNode; title?: string; tone?: "panel" | "plain"; onSubmit?: () => void }) {
  return (
    <form
      className={tone === "panel" ? "gm-form sa-inputs sa-panel" : "gm-form sa-inputs"}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      {title && <h2 className="sa-h">{title}</h2>}
      {children}
    </form>
  );
}

/** A surface. "warm" is the cream panel, "card" is white with a rule, "tint" is the light brand tint for the thing that matters most. */
export function Panel({ children, tone = "card", title, className }: { children: ReactNode; tone?: "warm" | "card" | "tint"; title?: string; className?: string }) {
  return (
    <div className={`sa-panel sa-panel--${tone}${className ? ` ${className}` : ""}`}>
      {title && <h2 className="sa-h">{title}</h2>}
      {children}
    </div>
  );
}

/**
 * The answer. One per page, placed where the eye lands first. `value` is
 * the figure, `label` says what it is in plain words, `sub` adds the one
 * line of context that stops it being misread.
 */
export function Hero({ label, value, unit, sub, tone = "brand" }: { label: string; value: ReactNode; unit?: string; sub?: ReactNode; tone?: "brand" | "ink" | "warn" }) {
  return (
    <div className={`sa-hero sa-hero--${tone}`} aria-live="polite">
      <p className="sa-hero-label">{label}</p>
      <p className="sa-hero-value">
        {value}
        {unit && <span className="sa-hero-unit"> {unit}</span>}
      </p>
      {sub && <p className="sa-hero-sub">{sub}</p>}
    </div>
  );
}

export type Row = { label: ReactNode; value: ReactNode; note?: ReactNode; strong?: boolean; tone?: "good" | "bad" | "muted"; swatch?: string };

/** Label and figure rows (a statement, a breakdown). The last strong row reads as the total. */
export function Rows({ rows, caption }: { rows: Row[]; caption?: string }) {
  return (
    <dl className="sa-rows" aria-label={caption}>
      {rows.map((r, i) => (
        <div key={i} className={`sa-row${r.strong ? " sa-row--strong" : ""}${r.tone ? ` sa-row--${r.tone}` : ""}`}>
          <dt>
            {r.swatch && <i style={{ background: r.swatch }} aria-hidden="true" />}
            {r.label}
            {r.note && <small>{r.note}</small>}
          </dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** One horizontal bar split into parts, with the parts labelled underneath. For "where each pound goes". */
export function SplitStrip({ parts, label }: { parts: { label: string; value: number; display: string; color: string }[]; label: string }) {
  const total = parts.reduce((a, p) => a + Math.max(0, p.value), 0);
  return (
    <figure className="sa-strip" role="img" aria-label={`${label}: ${parts.map((p) => `${p.label} ${p.display}`).join(", ")}`}>
      <div className="sa-strip-bar" aria-hidden="true">
        {parts.map((p) => (p.value > 0 ? <span key={p.label} style={{ flex: p.value, background: p.color }} /> : null))}
      </div>
      <figcaption>
        {parts.map((p) => (
          <span key={p.label}>
            <i style={{ background: p.color }} aria-hidden="true" />
            {p.label} <b>{p.display}</b>
            {total > 0 && <em>{Math.round((Math.max(0, p.value) / total) * 100)}%</em>}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

/** A short line under a result that says what kind of answer it is: an estimate, and the main thing it leaves out. */
export function Caveat({ children }: { children: ReactNode }) {
  return <p className="sa-caveat">{children}</p>;
}

/** A plain-words flag for something the reader should act on or know ("You are £12 over the limit"). */
export function Flag({ children, tone = "info", title }: { children: ReactNode; tone?: "info" | "good" | "warn"; title?: string }) {
  return (
    <div className={`sa-flag sa-flag--${tone}`} role={tone === "warn" ? "alert" : undefined}>
      {title && <strong>{title}</strong>}
      <span>{children}</span>
    </div>
  );
}

/** The line that closes a tool: the caveat on one side, the share link on the other. */
export function Foot({ children }: { children: ReactNode }) {
  return <div className="sa-foot">{children}</div>;
}
