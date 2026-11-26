"use client";

import { maternityDates, maternityPay, ratesYearOf, statutoryRates } from "@/lib/benefits/family";
import { addDays } from "@/lib/benefits/childcare-dates";
import { RatesChoice, ratesParam } from "@/components/benefits/RatesChoice";
import { Caveat, Flag, Foot, Inputs, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, DateField, MoneyField } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import LeaveRibbon, { fmtDate, groupWeeks } from "./LeaveRibbon";

const SCHEMA = {
  salary: num(36_000, 0, 10_000_000),
  due: date("2027-03-01"),
  service: bool(true),
  awe: num(0, 0, 100_000),
  full: num(0, 0, 52),
  half: num(0, 0, 52),
  leave: num(52, 1, 52),
  /** Weeks before the due date that leave starts. */
  early: num(2, 0, 11),
  rates: ratesParam(),
};
const MORE = ["awe", "full", "half"] as const;
const monthly = (weekly: number) => (weekly * 52) / 12;

export default function MaternityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const next = v.rates === "2027/28";
  const d = maternityDates(v.due);
  const wanted = addDays(v.due, -Math.round(v.early) * 7);
  const start = wanted < d.earliestStart ? d.earliestStart : wanted;
  const awe = v.awe > 0 ? v.awe : v.salary / 52;
  const r = maternityPay({
    awe,
    service: v.service,
    fullPayWeeks: Math.round(v.full),
    halfPayWeeks: Math.round(v.half),
    leaveWeeks: Math.round(v.leave),
    year: v.rates,
    startIso: start,
    qualifyingYear: next ? ratesYearOf(d.qwEnd) : "2026/27",
  });
  const groups = groupWeeks(r.weeks, awe);
  const paidWeeks = r.weeks.filter((w) => w.total > 0);
  // The month most people notice: weeks 7 to 39, after the 90% weeks and any full pay.
  const settled = r.weeks.find((w) => w.week >= 7 && w.kind === "flat" && w.week > v.full);
  const name = r.route === "smp" ? "Statutory Maternity Pay" : r.route === "ma" ? "Maternity Allowance" : "No statutory pay";
  const SR = statutoryRates(v.rates);
  const crosses = next && r.weeks.some((w) => w.starts && w.starts < "2027-04-04") && r.weeks.some((w) => w.starts && w.starts >= "2027-04-04" && w.kind !== "unpaid");
  const m = (n: number) => gbp(n);
  const p = (n: number) => gbp(n, true);
  const leaveEnds = addDays(start, Math.round(v.leave) * 7 - 1);
  const payEnds = addDays(start, Math.min(39, Math.round(v.leave)) * 7 - 1);

  const keyDates = [
    { label: "Qualifying week", value: `${fmtDate(d.qwStart, true)} to ${fmtDate(d.qwEnd)}`, note: "Your 26 weeks of service and your earnings are judged here." },
    { label: "Tell your employer by", value: fmtDate(d.noticeBy), note: "The due date and when you want leave to start, at least 15 weeks before the expected week." },
    { label: "Earliest leave can start", value: fmtDate(d.earliestStart), note: "11 weeks before the expected week of childbirth." },
    { label: "Your leave starts", value: fmtDate(start), note: start > wanted ? "Moved to the earliest date allowed." : undefined },
    { label: "Pay ends", value: fmtDate(payEnds) },
    { label: "Leave ends", value: fmtDate(leaveEnds), note: "Give 8 weeks' notice to come back earlier." },
  ];

  return (
    <Tool label="Maternity pay calculator">
      <div className="sa-mp">
        <div className="sa-mp-inputs">
          <Inputs tone="plain">
            <MoneyField label="Salary a year, before tax" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100k"] }} hint="Your normal gross pay, divided by 52. Enter your average weekly earnings under More options if overtime or a pay rise changes it." />
            <DateField label="Baby's due date" value={v.due} onChange={st.bind("due")} />
            <div className="sa-mp-row">
              <Mini label="Leave starts, weeks before" value={v.early} onChange={(n) => st.set("early", Math.round(n))} min={0} max={11} stepper />
              <Mini label="Weeks of leave" value={v.leave} onChange={(n) => st.set("leave", Math.round(n))} min={1} max={52} stepper />
            </div>
            <Pills
              label={`With your employer since ${fmtDate(d.startedBy)} or earlier?`}
              value={v.service ? "yes" : "no"}
              onChange={(x) => st.set("service", x === "yes")}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No, or self-employed" },
              ]}
            />
            <RatesChoice value={v.rates} onChange={st.bind("rates")} />
            <AdvancedOptions description="Average weekly earnings, and enhanced pay from your employer." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <MoneyField label="Average weekly earnings, if you know them" value={v.awe} onChange={st.bind("awe")} pence optional hint="Gross pay in the 8 weeks up to the last payday before the end of the qualifying week, including overtime and bonuses paid then. Overrides the salary." />
              <div className="sa-mp-row">
                <Mini label="Employer full pay, weeks" value={v.full} onChange={(n) => st.set("full", Math.round(n))} max={52} stepper />
                <Mini label="Then half pay, weeks" value={v.half} onChange={(n) => st.set("half", Math.round(n))} max={52} stepper />
              </div>
            </AdvancedOptions>
          </Inputs>
        </div>

        <div className={`sa-mp-answer${r.route === "none" ? " is-none" : ""}`} aria-live="polite">
          {r.route === "none" ? (
            <>
              <p className="sa-mp-kicker">No statutory maternity pay</p>
              <p className="sa-mp-sub">Average earnings under {p(SR.maThreshold)} a week do not qualify for Maternity Allowance either. Universal Credit, a Sure Start Maternity Grant and Healthy Start may still help.</p>
            </>
          ) : (
            <>
              <p className="sa-mp-kicker">{name}</p>
              <p className="sa-mp-big">
                <b>{m(r.total)}</b> in total
              </p>
              <p className="sa-mp-sub">
                Over {paidWeeks.length} paid weeks{r.employerTopUp > 0.5 ? `, including ${m(r.employerTopUp)} from your employer` : ""}. Normal pay over the same {Math.round(v.leave)} weeks would be {m(r.normalPay)}.
              </p>
              {settled && (
                <p className="sa-mp-drop">
                  <span>A month, before tax</span>
                  <b>{m(monthly(awe))}</b>
                  <i aria-hidden="true">→</i>
                  <b className="is-low">{m(monthly(settled.total))}</b>
                  <small>from week {settled.week}</small>
                </p>
              )}
            </>
          )}
        </div>

        <div className="sa-mp-ribbon">
          <LeaveRibbon groups={groups} leave={Math.round(v.leave)} money={p} />
        </div>

        <dl className="sa-mp-dates" aria-label="Key dates">
          {keyDates.map((k) => (
            <div key={k.label}>
              <dt>{k.label}</dt>
              <dd>
                {k.value}
                {k.note && <small>{k.note}</small>}
              </dd>
            </div>
          ))}
        </dl>

        {(r.route === "ma" || crosses) && (
          <div className="sa-mp-flags">
        {r.route === "ma" && (
          <Flag title={v.service ? `Under ${p(r.threshold)} a week: Maternity Allowance instead` : "Maternity Allowance instead of SMP"}>
            Claim it from Jobcentre Plus with form MA1, from 26 weeks pregnant. You need to have worked, employed or self-employed, in at least 26 of the 66 weeks before the due week, earning {p(SR.maThreshold)} a week or more in 13 of them. It is 90% of your earnings up to {p(SR.flatRate)} a week for 39 weeks, is not taxed, and comes off any Universal Credit pound for pound.
          </Flag>
        )}
        {crosses && <Flag title="Your pay rises in April">Weeks that start before 4 April 2027 are paid at {p(statutoryRates("2026/27").flatRate)}; later weeks at the proposed {p(SR.flatRate)}.</Flag>}
          </div>
        )}

        <Foot>
          <Caveat>
            {r.route === "ma"
              ? "An estimate of Maternity Allowance for employed earnings; self-employed claims can be paid less, from £27 a week, depending on National Insurance contributions."
              : "An estimate before tax and National Insurance, from your salary divided by 52."}{" "}
            {next ? "Proposed April 2027 rates apply from 4 April 2027; final once Parliament approves them." : "2026/27 rates for every week."} Your employer confirms the figures.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
