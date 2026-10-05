"use client";

import { PIP_2026, PIP_ACTIVITIES, pipScore, type PipBand } from "@/lib/benefits/pip-assessment";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const CODES = ["a", "b", "c", "d", "e", "f", "g"] as const;
type Code = (typeof CODES)[number];
const pick = () => oneOf<Code>("a", CODES);

const SCHEMA = {
  food: pick(),
  eating: pick(),
  therapy: pick(),
  washing: pick(),
  toilet: pick(),
  dressing: pick(),
  speaking: pick(),
  reading: pick(),
  people: pick(),
  money: pick(),
  journeys: pick(),
  moving: pick(),
  terminal: bool(false),
  monthsHad: num(6, 0, 600),
  carer: bool(false),
};
type ActivityKey = Exclude<keyof typeof SCHEMA, "terminal" | "monthsHad" | "carer">;
const ADVANCED = ["terminal", "monthsHad", "carer"] as const;

const bandName = (b: PipBand) => (b === "enhanced" ? "Enhanced rate" : b === "standard" ? "Standard rate" : "No award");

export default function PipStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const choices = Object.fromEntries(PIP_ACTIVITIES.map((a) => [a.id, v[a.id as ActivityKey]]));
  const sc = pipScore(choices);
  // Terminal illness: the enhanced daily living rate without an assessment of points.
  const dailyBand: PipBand = v.terminal ? "enhanced" : sc.dailyBand;
  const dailyWeekly = dailyBand === "none" ? 0 : PIP_2026.daily[dailyBand];
  const weekly = dailyWeekly + sc.mobilityWeekly;
  const tooSoon = !v.terminal && v.monthsHad < 3;
  const rows = PIP_ACTIVITIES.map((a) => {
    const d = a.descriptors.find((x) => x.code === v[a.id as ActivityKey]) ?? a.descriptors[0];
    return { a, d };
  });
  const select = (component: "daily" | "mobility") =>
    PIP_ACTIVITIES.filter((a) => a.component === component).map((a) => (
      <SelectField
        key={a.id}
        label={a.title}
        value={v[a.id as ActivityKey]}
        onChange={(x) => st.set(a.id as ActivityKey, x)}
        options={a.descriptors.map((d) => ({ value: d.code as Code, label: `${d.points} pts: ${d.text}` }))}
      />
    ));

  return (
    <Studio
      title="Your daily life"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my PIP points"
      onReset={st.reset}
      dock={{ label: "PIP a week", value: gbp(weekly, true) }}
      inputs={
        <>
          <InputGroup title="Daily living">{select("daily")}</InputGroup>
          <InputGroup title="Mobility">{select("mobility")}</InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Terminally ill (life expectancy of 12 months or less)" checked={v.terminal} onChange={st.bind("terminal")} optional hint="Special rules: the enhanced daily living rate is paid without an assessment." />
            <StepperField label="Months you have had these difficulties" value={v.monthsHad} onChange={st.bind("monthsHad")} step={1} min={0} max={600} unit="months" dp={0} optional hint="You normally need 3 months before and to expect 9 months after." />
            <Switch label="Someone cares for you 35 hours a week or more" checked={v.carer} onChange={st.bind("carer")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Personal Independence Payment"
        value={gbp(weekly, true)}
        unit="a week"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          weekly > 0 ? (
            <>
              You score <b>{sc.daily} points</b> for daily living and <b>{sc.mobility}</b> for mobility. That points to <b>{gbp(weekly, true)}</b> a week, <b>{gbp(weekly * 4, true)}</b> every four weeks
              or <b>{gbp(weekly * 52)}</b> a year.
            </>
          ) : (
            <>
              You score <b>{sc.daily} points</b> for daily living and <b>{sc.mobility}</b> for mobility. You need at least 8 points in one component for an award. Choose the descriptor that applies on most days
              for each activity.
            </>
          )
        }
        badges={[`Daily living: ${bandName(dailyBand)}`, `Mobility: ${bandName(sc.mobilityBand)}`]}
      />

      <Facts
        items={[
          { label: "Daily living points", value: v.terminal ? "Special rules" : String(sc.daily), note: bandName(dailyBand) },
          { label: "Mobility points", value: String(sc.mobility), note: bandName(sc.mobilityBand) },
          { label: "Every 4 weeks", value: gbp(weekly * 4, true) },
          { label: "A year", value: gbp(weekly * 52), tone: weekly > 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27, weekly" },
          { label: "Bands", value: "8 points standard, 12 enhanced" },
          { label: "Descriptor", value: "Applies on more than half of days" },
          { label: "Status", value: "A self-check, not a decision" },
        ]}
      />

      <ResultCard title="Your award" sub="Each component is assessed separately.">
        <Statement
          columns={["Points", "A week"]}
          rows={[
            { label: `Daily living: ${bandName(dailyBand).toLowerCase()}`, values: [v.terminal ? "SR" : String(sc.daily), gbp(dailyWeekly, true)] },
            { label: `Mobility: ${bandName(sc.mobilityBand).toLowerCase()}`, values: [String(sc.mobility), gbp(sc.mobilityWeekly, true)] },
            { label: "Total", values: ["", gbp(weekly, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Points by activity" sub="The descriptor you chose in each.">
        <Compare
          head={["Activity", "Points"]}
          rows={rows.map(({ a, d }) => ({
            label: a.title,
            value: String(d.points),
            delta: a.component === "mobility" ? "Mobility" : undefined,
            bar: d.points / 12,
            current: d.points > 0,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="What your score means.">
        {!v.terminal && sc.dailyToNext > 0 && sc.daily > 0 && (
          <Callout title={`${sc.dailyToNext} more daily living point${sc.dailyToNext === 1 ? "" : "s"} for the ${sc.dailyBand === "standard" ? "enhanced" : "standard"} rate`}>
            Check each activity again. Needing prompting, supervision or an aid such as a perching stool or grab rail all score points.
          </Callout>
        )}
        {sc.mobilityToNext > 0 && sc.mobility > 0 && (
          <Callout title={`${sc.mobilityToNext} more mobility point${sc.mobilityToNext === 1 ? "" : "s"} for the ${sc.mobilityBand === "standard" ? "enhanced" : "standard"} rate`}>
            How far you can walk reliably, safely, repeatedly and in a reasonable time is what counts, not the furthest you can manage on a good day.
          </Callout>
        )}
        {sc.mobilityBand === "enhanced" && (
          <Callout tone="good" title="The enhanced mobility rate unlocks more help">
            You can use it to lease a car, scooter or powered wheelchair through the Motability Scheme, and you can claim a full exemption from vehicle tax.
          </Callout>
        )}
        {(dailyBand !== "none" || v.carer) && (
          <Callout title="Help for your carer and the benefit cap">
            {dailyBand !== "none" ? "With the daily living component, someone caring for you for 35 hours a week can claim Carer's Allowance. " : ""}
            Any PIP award also exempts your household from the benefit cap.
          </Callout>
        )}
        {tooSoon && (
          <Callout tone="warn" title="The required period">
            You normally need to have had your difficulties for 3 months and expect them to last at least 9 more. You can start a claim during the 3 months.
          </Callout>
        )}
        <Callout title="Reliably means safely, repeatedly and in good time">
          A descriptor only counts as something you can do if you can do it safely, to an acceptable standard, as often as needed, and in no more than twice the time it would take someone without your condition.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. A self-check against the official descriptors. Only the Department for Work and Pensions can decide a claim.
      </p>
    </Studio>
  );
}
