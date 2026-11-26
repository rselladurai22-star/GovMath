import type { EsaGroup } from "@/lib/benefits/new-style";

/**
 * The claim as a timeline: 7 unpaid waiting days, the 13-week assessment
 * phase at the assessment rate, then the two places the Work Capability
 * Assessment can put you. The work-related activity group stops at 365 days
 * (counted from the start of the claim); the support group has no limit.
 * The chosen path is highlighted; the other is dimmed.
 */
export default function EsaTimeline({
  group,
  assessment,
  wrag,
  support,
  money,
  paid,
}: {
  group: EsaGroup;
  /** Weekly amounts on the visitor's figures. */
  assessment: number;
  wrag: number;
  support: number;
  money: (n: number) => string;
  /** False when the NI test or the work rules mean nothing is paid: the rates are then shown greyed, as what it would pay. */
  paid: boolean;
}) {
  const show = money;
  const label =
    (paid ? "" : "What New Style ESA would pay if your record qualified. ") +
    `Timeline of a New Style ESA claim: 7 waiting days unpaid, then the assessment rate of ${show(assessment)} a week for about 13 weeks. ` +
    `After the assessment, the work-related activity group pays ${show(wrag)} a week and stops 365 days from the start of the claim; ` +
    `the support group pays ${show(support)} a week with no time limit.` +
    (group === "assessment" ? "" : ` You chose the ${group === "support" ? "support group" : "work-related activity group"}.`);
  const row = (key: "wrag" | "support") => {
    const on = group === "assessment" || group === key;
    return (
      <div className={`sa-esa-row sa-esa-row--${key}${on ? " is-on" : " is-off"}${group === key ? " is-chosen" : ""}`}>
        <span className="sa-esa-seg sa-esa-seg--main">
          <b>{key === "wrag" ? "Work-related activity group" : "Support group"}</b>
          <em>{show(key === "wrag" ? wrag : support)} a week</em>
        </span>
        <span className={`sa-esa-end${key === "support" ? " is-open" : ""}`}>{key === "wrag" ? "Stops at 365 days" : "No time limit"}</span>
      </div>
    );
  };
  return (
    <figure className={`sa-esa-fig${paid ? "" : " is-muted"}`} role="img" aria-label={label}>
      <div className="sa-esa-track" aria-hidden="true">
        <div className="sa-esa-start">
          <span className="sa-esa-seg sa-esa-seg--wait">
            <b>Waiting days</b>
            <em>7 days, unpaid</em>
          </span>
          <span className={`sa-esa-seg sa-esa-seg--assess${group === "assessment" ? " is-chosen" : ""}`}>
            <b>Assessment phase</b>
            <em>{show(assessment)} a week, about 13 weeks</em>
          </span>
        </div>
        <div className="sa-esa-branches">
          {row("wrag")}
          {row("support")}
        </div>
      </div>
      <figcaption aria-hidden="true">
        <span>Claim starts</span>
        <span>Week 14: Work Capability Assessment decides the group</span>
      </figcaption>
    </figure>
  );
}
