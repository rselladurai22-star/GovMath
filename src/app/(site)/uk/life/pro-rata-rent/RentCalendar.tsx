import { formatDate, parse } from "@/lib/life/calendar";
import { monthEnd, monthStart } from "@/lib/life/everyday";

const DAY = 86_400_000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const iso = (d: Date) => d.toISOString().slice(0, 10);

type MonthView = { key: string; title: string; blanks: number; days: { n: number; iso: string }[]; charged: number };

function monthView(anyDay: string, from: string, to: string): MonthView {
  const first = parse(monthStart(anyDay));
  const length = parse(monthEnd(anyDay)).getUTCDate();
  const days = Array.from({ length }, (_, i) => ({ n: i + 1, iso: iso(new Date(first.getTime() + i * DAY)) }));
  return {
    key: monthStart(anyDay),
    title: `${MONTHS[first.getUTCMonth()]} ${first.getUTCFullYear()}`,
    // Weeks start on Monday.
    blanks: (first.getUTCDay() + 6) % 7,
    days,
    charged: days.filter((d) => d.iso >= from && d.iso <= to).length,
  };
}

/**
 * The months a part period touches, with the charged days shaded, so the
 * day count can be checked by eye. Shows the first and last month in full;
 * whole months between them are summarised in one line.
 */
export default function RentCalendar({ from, to, days }: { from: string; to: string; days: number }) {
  const valid = days > 0;
  const first = monthView(from, from, valid ? to : from);
  const sameMonth = !valid || monthStart(from) === monthStart(to);
  const last = sameMonth ? null : monthView(to, from, to);
  let between = 0;
  if (last) {
    const a = parse(first.key);
    const b = parse(last.key);
    between = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + b.getUTCMonth() - a.getUTCMonth() - 1;
  }
  const months = last ? [first, last] : [first];
  const label = valid
    ? `Calendar: ${days} ${days === 1 ? "day" : "days"} charged, from ${formatDate(from)} to ${formatDate(to)}, counting both. ` +
      months.map((m) => `${m.charged} of ${m.days.length} days in ${m.title}`).join("; ") +
      (between > 0 ? `; and ${between} whole ${between === 1 ? "month" : "months"} between.` : ".")
    : "Calendar: no days charged, because the last day is before the first.";

  return (
    <div className={`sa-rent-months${months.length > 1 ? " is-two" : ""}`} role="img" aria-label={label}>
      {months.map((m, i) => (
        <div key={m.key} className="sa-rent-month" aria-hidden="true">
          <p className="sa-rent-monthhead">
            <b>{m.title}</b>
            <span>
              {m.charged} of {m.days.length} days
            </span>
          </p>
          <div className="sa-rent-grid">
            {WEEKDAYS.map((w, j) => (
              <span key={j} className="sa-rent-wd">
                {w}
              </span>
            ))}
            {Array.from({ length: m.blanks }, (_, j) => (
              <span key={`b${j}`} />
            ))}
            {m.days.map((d) => {
              const on = valid && d.iso >= from && d.iso <= to;
              const edge = on && (d.iso === from || d.iso === to);
              return (
                <span key={d.iso} className={`sa-rent-day${on ? " is-on" : ""}${edge ? " is-edge" : ""}`}>
                  {d.n}
                </span>
              );
            })}
          </div>
          {i === 0 && between > 0 && (
            <p className="sa-rent-between">
              then {between} whole {between === 1 ? "month" : "months"}, then
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
