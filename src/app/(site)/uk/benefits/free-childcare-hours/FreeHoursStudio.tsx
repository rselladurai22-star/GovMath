"use client";

import { fundedCost, minimumQuarterEarnings, minimumWeeklyEarnings, taxFreeChildcarePlan, workingParentTest, type ChildStage, type ParentWork } from "@/lib/benefits/family";
import { addMonths, childcareTimeline, fundedHoursOn, fundedSteps, isIsoDate } from "@/lib/benefits/childcare-dates";
import type { NMWBand } from "@/lib/benefits/minimum-wage";
import { useToday } from "@/components/benefits/TaxYearCards";
import { Caveat, Flag, Foot, Inputs, Rows, Tool, type Row } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { AdvancedOptions, DateField, SelectField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import ChildcareTimeline, { longDate } from "./ChildcareTimeline";

type Band = "21" | "18-20" | "under18";

const SCHEMA = {
  /** Kept from the earlier calculator: the age band, used only until a date of birth is entered. */
  stage: oneOf<ChildStage>("3-4", ["under9m", "9m-2", "2", "3-4"]),
  dob: date(""),
  couple: bool(true),
  /** You work (or are on leave). */
  working: bool(true),
  /** Your expected gross pay a week (0 = not entered). */
  earnings: num(0, 0, 100_000),
  work2: bool(true),
  pay2: num(0, 0, 100_000),
  cover2: bool(false),
  over100k: bool(false),
  benefits: bool(false),
  age1: oneOf<Band>("21", ["21", "18-20", "under18"]),
  age2: oneOf<Band>("21", ["21", "18-20", "under18"]),
  hours: num(40, 0, 60),
  weeks: num(48, 1, 52),
  rate: num(8.5, 0, 50),
  extras: num(0, 0, 500),
};
const MORE = ["age1", "age2", "benefits", "cover2"] as const;
const BAND: Record<Band, NMWBand> = { "21": "national-living-wage", "18-20": "18-20", under18: "16-17" };
const BAND_OPTIONS = [
  { value: "21" as const, label: "21 or over" },
  { value: "18-20" as const, label: "18 to 20" },
  { value: "under18" as const, label: "Under 18, or an apprentice" },
];
const YESNO = [
  { value: "yes" as const, label: "Yes" },
  { value: "no" as const, label: "No" },
];
/** A date of birth that fits the age band an older share link carries. */
const STAGE_MONTHS: Record<ChildStage, number> = { under9m: 5, "9m-2": 14, "2": 28, "3-4": 40 };

export default function FreeHoursStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  // Without a date of birth: the age band of an older share link, or a 7-month-old for a first visit.
  const fallbackMonths = query.stage !== undefined ? STAGE_MONTHS[v.stage] : 7;
  const dob = isIsoDate(v.dob) && v.dob <= today ? v.dob : addMonths(today, -fallbackMonths);
  const t = childcareTimeline(dob);

  const parents: ParentWork[] = [{ works: v.working, band: BAND[v.age1], weekly: v.earnings, over100k: v.over100k }];
  if (v.couple) parents.push({ works: v.work2, covered: v.cover2, band: BAND[v.age2], weekly: v.pay2, over100k: false });
  const test = workingParentTest(parents);
  const family = { working: test.passes, twosEligible: v.benefits };
  const steps = fundedSteps(t, family);
  const now = fundedHoursOn(t, today, family);
  const next = steps.find((s) => s.from > today && s.hours > now);
  const inSchool = today >= t.school;
  const headline = now > 0 ? now : (next?.hours ?? 0);
  const workingNext = test.passes && today < t.working.starts;
  // The hours you could get if the work test were met, for the "what you are missing" line.
  const ifWorking = fundedHoursOn(t, today >= t.working.starts ? today : t.working.starts, { working: true, twosEligible: v.benefits });

  const cost = fundedCost(headline, { hoursUsed: v.hours, weeksUsed: v.weeks, hourlyRate: v.rate, extrasWeekly: v.extras });
  const tfc = test.passes ? taxFreeChildcarePlan([{ cost: cost.youPay, disabled: false }]) : null;
  const finalPay = tfc ? tfc.youPay : cost.youPay;
  const m = (n: number) => gbp(n);
  const costRows: Row[] = [
    { label: `${v.hours} hours a week for ${v.weeks} weeks at ${gbp(v.rate, true)}`, value: m(v.hours * v.weeks * v.rate), note: v.extras > 0 ? `plus ${gbp(v.extras, true)} a week of extras: ${m(v.extras * v.weeks)}` : undefined },
    { label: `${headline} funded hours a week, 38 weeks a year`, value: cost.value > 0 ? `−${m(cost.value)}` : m(0), tone: cost.value > 0 ? "good" : undefined, note: cost.annualHours > 0 ? `${cost.annualHours.toLocaleString("en-GB")} hours a year, or ${cost.stretchedWeekly.toFixed(1)} a week stretched over ${v.weeks} weeks` : undefined },
    ...(tfc && tfc.topUp > 0 ? [{ label: "Tax-Free Childcare on the rest (20%)", value: `−${m(tfc.topUp)}`, tone: "good" as const, note: tfc.children[0].capped ? "At the £2,000 yearly limit" : undefined }] : []),
    { label: "You still pay a year", value: m(finalPay), strong: true, note: `About ${m(finalPay / 12)} a month` },
  ];

  const fail = test.parents
    .map((r, i) => (r === null ? null : { who: i === 0 ? "You" : "Your partner", r }))
    .filter((x): x is { who: string; r: NonNullable<(typeof test.parents)[number]> } => x !== null);
  const floor = (b: Band) => minimumWeeklyEarnings(BAND[b]);

  return (
    <Tool label="Free childcare hours calculator">
      <div className="sa-fc">
        <div className="sa-fc-inputs">
          <Inputs tone="plain">
            <DateField label="Your child's date of birth" value={dob} onChange={st.bind("dob")} max={today} hint="Funded hours start the term after a birthday: 1 January, 1 April or 1 September." />
            <Pills
              label="Parents in the household"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Just me" },
                { value: "couple", label: "Me and a partner" },
              ]}
            />
            <div className="sa-fc-parents">
              <div className={`sa-fc-parent${test.parents[0] ? " is-fail" : " is-pass"}`}>
                <Pills label="You: in work or on leave" value={v.working ? "yes" : "no"} onChange={(x) => st.set("working", x === "yes")} options={YESNO} />
                {v.working && (
                  <Mini label="Expected pay a week, before tax" value={v.earnings} onChange={st.bind("earnings")} prefix="£" max={100_000} step={10} dp={2} wide hint={v.earnings > 0 ? undefined : `Leave at £0 if it is at least ${gbp(floor(v.age1), true)}.`} />
                )}
              </div>
              {v.couple && (
                <div className={`sa-fc-parent${test.parents[1] ? " is-fail" : " is-pass"}`}>
                  <Pills label="Your partner: in work or on leave" value={v.work2 ? "yes" : "no"} onChange={(x) => st.set("work2", x === "yes")} options={YESNO} />
                  {v.work2 ? (
                    <Mini label="Their expected pay a week" value={v.pay2} onChange={st.bind("pay2")} prefix="£" max={100_000} step={10} dp={2} wide hint={v.pay2 > 0 ? undefined : `Leave at £0 if it is at least ${gbp(floor(v.age2), true)}.`} />
                  ) : (
                    <Switch label="They get Carer's Allowance, contribution-based ESA, the UC health or carer element, or are on carer's leave" checked={v.cover2} onChange={st.bind("cover2")} />
                  )}
                </div>
              )}
            </div>
            <Switch label={v.couple ? "Either of you expects adjusted net income over £100,000 this tax year" : "I expect adjusted net income over £100,000 this tax year"} checked={v.over100k} onChange={st.bind("over100k")} />
            <AdvancedOptions description="Your ages, and the 15 hours for some 2-year-olds." changed={st.changed([...MORE])} onReset={() => st.resetKeys([...MORE])}>
              <SelectField label="Your age" value={v.age1} onChange={st.bind("age1")} options={BAND_OPTIONS} hint={`Sets the earnings floor: ${gbp(floor(v.age1), true)} a week.`} />
              {v.couple && <SelectField label="Your partner's age" value={v.age2} onChange={st.bind("age2")} options={BAND_OPTIONS} hint={`Their floor: ${gbp(floor(v.age2), true)} a week.`} />}
              <Switch
                label="We get Universal Credit with take-home pay of £15,400 a year or less, or Income Support, income-based JSA, income-related ESA or Guarantee Credit"
                checked={v.benefits}
                onChange={st.bind("benefits")}
                hint="Or the child gets DLA, has an EHC plan, or is or was in care. This gives 15 hours from the term after the second birthday."
              />
            </AdvancedOptions>
          </Inputs>
        </div>

        <div className={`sa-fc-answer${headline > 0 ? " is-yes" : " is-no"}`} aria-live="polite">
          {inSchool ? (
            <>
              <p className="sa-fc-kicker">Your child has started school</p>
              <p className="sa-fc-sub">Funded hours end when a child starts reception. Wraparound and holiday clubs can still be paid through Tax-Free Childcare until the September after their 11th birthday.</p>
            </>
          ) : headline > 0 ? (
            <>
              <p className="sa-fc-kicker">{now > 0 ? "You can get" : "You will be able to get"}</p>
              <p className="sa-fc-big">
                <b>{headline}</b> hours a week
              </p>
              <p className="sa-fc-when">{now > 0 ? "Now, for 38 weeks a year" : `From ${longDate(next!.from)}, for 38 weeks a year`}</p>
              <p className="sa-fc-sub">
                {workingNext ? (
                  <>
                    Apply between <b>{longDate(t.working.applyFrom)}</b> and <b>{longDate(t.working.applyBy)}</b>, then reconfirm every 3 months.
                  </>
                ) : test.passes ? (
                  <>Keep reconfirming every 3 months in your childcare account, or the code stops.</>
                ) : now === 0 && next ? (
                  <>The universal hours need no application: ask your nursery to claim them from {longDate(next.from)}.</>
                ) : (
                  <>Every 3 and 4-year-old in England gets these, whatever their parents&rsquo; work.</>
                )}
                {!test.passes && ifWorking > headline && <> Meeting the working parent test would give {ifWorking} hours.</>}
              </p>
            </>
          ) : (
            <>
              <p className="sa-fc-kicker">No funded hours yet</p>
              <p className="sa-fc-sub">
                {test.passes
                  ? "Funded hours start the term after your child is 9 months old."
                  : `Without the working parent test, the 15 universal hours start ${longDate(t.universal.starts)}.`}
              </p>
            </>
          )}
          {fail.length > 0 && (
            <ul className="sa-fc-fails">
              {fail.map((f) => (
                <li key={f.who}>
                  {f.r === "over-100k"
                    ? `${f.who === "You" && v.couple ? "One of you expects" : "You expect"} income over £100,000, which rules out the working parent hours.`
                    : f.r === "low-earnings"
                      ? `${f.who} ${f.who === "You" ? "are" : "is"} under the earnings floor of ${gbp(floor(f.who === "You" ? v.age1 : v.age2), true)} a week (${gbp(minimumQuarterEarnings(BAND[f.who === "You" ? v.age1 : v.age2]), true)} over 3 months).`
                      : `${f.who} ${f.who === "You" ? "need" : "needs"} to be working, on leave or starting a job.`}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="sa-fc-line">
          <ChildcareTimeline timeline={t} steps={steps} today={today} working={test.passes} twos={v.benefits} />
        </div>

        <div className="sa-fc-cost">
          <h2 className="sa-fc-h">What nursery will still cost</h2>
          <Inputs tone="plain">
            <div className="sa-fc-costfields">
              <Mini label="Hours a week" value={v.hours} onChange={(n) => st.set("hours", Math.round(n))} max={60} stepper />
              <Mini label="Hourly rate" value={v.rate} onChange={st.bind("rate")} prefix="£" max={50} step={0.25} dp={2} />
              <Mini label="Weeks a year" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} min={1} max={52} stepper hint="Term time only is 38." />
              <Mini label="Extras a week" value={v.extras} onChange={st.bind("extras")} prefix="£" max={500} step={5} dp={2} hint="Meals, nappies, trips." />
            </div>
          </Inputs>
          <Rows caption="A year of childcare, and what is left to pay" rows={costRows} />
        </div>

        {headline === 30 && v.hours * v.weeks < cost.annualHours && (
          <Flag title="You are not using all the hours">
            {v.hours} hours for {v.weeks} weeks uses {(v.hours * v.weeks).toLocaleString("en-GB")} of your {cost.annualHours.toLocaleString("en-GB")} funded hours. Unused hours do not carry over.
          </Flag>
        )}

        <Foot>
          <Caveat>
            England only, 2026/27 rules. Start dates are exact for the date of birth; the earnings floor uses the April 2026 minimum wage. Your council and provider confirm the place.
          </Caveat>
          <ShareButton copied={st.copied} onClick={st.share} />
        </Foot>
      </div>
    </Tool>
  );
}
