import type { ChildcareTimeline as Timeline, FundedStep } from "@/lib/benefits/childcare-dates";
import { daysBetween } from "@/lib/benefits/childcare-dates";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "1 April 2027" (fixed, so the server and the browser print the same). */
export const longDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
const shortDate = (iso: string) => {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${y}`;
};

/**
 * The child's years before school as one line, birth to reception. The
 * funded hours sit on it as blocks that start on the term dates, with the
 * three offers marked where they begin and today shown as a pin. The text
 * equivalent is the list of dates under it (and the figure's label).
 */
export default function ChildcareTimeline({ timeline: t, steps, today, working, twos }: { timeline: Timeline; steps: FundedStep[]; today: string; working: boolean; twos: boolean }) {
  const span = Math.max(1, daysBetween(t.dob, t.school));
  const at = (iso: string) => Math.min(100, Math.max(0, (daysBetween(t.dob, iso) / span) * 100));
  const blocks = steps.map((s, i) => ({ ...s, to: steps[i + 1]?.from ?? t.school })).filter((b) => b.from < t.school);
  const marks = [
    { key: "nine", label: "9 months", date: t.working.starts, on: working },
    { key: "two", label: "Age 2", date: t.twos.starts, on: twos && !working },
    { key: "three", label: "Age 3", date: t.universal.starts, on: true },
  ];
  const showToday = today >= t.dob && today < t.school;
  const funded = blocks.filter((b) => b.hours > 0);
  const label =
    `Funded hours from birth to school. ` +
    (funded.length ? funded.map((b) => `${b.hours} hours a week from ${longDate(b.from)}`).join(", ") : "No funded hours before school on these answers") +
    `, until reception starts on ${longDate(t.school)}.`;

  const dates: { label: string; date: string; muted?: boolean }[] = [
    { label: "Apply for the 30 hours from (23 weeks old)", date: t.working.applyFrom, muted: !working },
    { label: "Apply by, for 30 hours from 9 months", date: t.working.applyBy, muted: !working },
    { label: "30 hours start", date: t.working.starts, muted: !working },
    ...(twos ? [{ label: "15 hours for a 2-year-old start", date: t.twos.starts, muted: working }] : []),
    { label: working ? "Universal hours begin (part of your 30)" : "15 universal hours start", date: t.universal.starts },
    { label: "Reception starts, and funded hours end", date: t.school },
  ];

  return (
    <figure className="sa-fc-fig">
      <div className="sa-fc-marks" aria-hidden="true">
        {marks.map((mk) => (
          <span key={mk.key} className={mk.on ? "is-on" : undefined} style={{ left: `${at(mk.date)}%` }}>
            <b>{mk.label}</b>
            {shortDate(mk.date)}
          </span>
        ))}
      </div>
      <div className="sa-fc-track" role="img" aria-label={label}>
        {blocks.map((b) => (
          <span key={b.from} className={`sa-fc-block is-${b.hours}`} style={{ left: `${at(b.from)}%`, width: `${at(b.to) - at(b.from)}%` }}>
            {b.hours > 0 && <em>{b.hours} hrs</em>}
          </span>
        ))}
        {showToday && <i className="sa-fc-today" style={{ left: `${at(today)}%` }} />}
      </div>
      <div className="sa-fc-ends" aria-hidden="true">
        <span className={showToday && at(today) < 22 ? "is-hidden" : undefined}>Born {shortDate(t.dob)}</span>
        {showToday && (
          <span className="sa-fc-todaylabel" style={{ left: `${at(today)}%` }}>
            Today
          </span>
        )}
        <span className={showToday && at(today) > 70 ? "is-hidden" : undefined}>School {shortDate(t.school)}</span>
      </div>
      <figcaption>
        <dl className="sa-fc-dates">
          {dates.map((d) => (
            <div key={d.label} className={d.muted ? "is-muted" : undefined}>
              <dt>{d.label}</dt>
              <dd>
                <time dateTime={d.date}>{longDate(d.date)}</time>
                {d.date < today && d.date !== t.school && <small> (passed)</small>}
              </dd>
            </div>
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}
