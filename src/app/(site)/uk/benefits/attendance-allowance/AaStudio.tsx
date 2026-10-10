"use client";

import { AA_2026, attendanceAllowance2026, PC_2026, PC_DEFAULT_INPUT, pensionCredit2026 } from "@/lib/benefits/later-life";
import { CA_2026 } from "@/lib/benefits/carers";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  wash: bool(true),
  dress: bool(true),
  eat: bool(false),
  toilet: bool(false),
  meds: bool(false),
  watch: bool(false),
  nightHelp: bool(false),
  nightWatch: bool(false),
  terminal: bool(false),
  months: num(6, 0, 600),
  couple: bool(false),
  income: num(0, 0, 2_000),
  savings: num(0, 0, 1_000_000),
  alone: bool(true),
  carerPaid: bool(false),
  pre2016: bool(false),
};
const ADVANCED = ["terminal", "months", "couple", "income", "savings", "alone", "carerPaid", "pre2016"] as const;

export default function AaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const dayNeeds = [v.wash, v.dress, v.eat, v.toilet, v.meds, v.watch].filter(Boolean).length;
  const nightNeeds = [v.nightHelp, v.nightWatch].filter(Boolean).length;
  const aa = attendanceAllowance2026({ dayNeeds, nightNeeds, terminallyIll: v.terminal, monthsNeeded: v.months });

  const pcBase = { ...PC_DEFAULT_INPUT, couple: v.couple, statePension: v.income, savings: v.savings, savingsCreditEligible: v.pre2016 };
  const pcBefore = pensionCredit2026(pcBase);
  const sdQualifies = aa.rate !== "none" && v.alone && !v.carerPaid && !v.couple;
  const pcAfter = pensionCredit2026({ ...pcBase, severeDisability: sdQualifies ? 1 : 0 });
  const pcGain = pcAfter.weekly - pcBefore.weekly;
  const showPc = v.income > 0;
  const totalGain = aa.weekly + (showPc ? pcGain : 0);

  return (
    <Studio
      title="The help you need"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my Attendance Allowance"
      onReset={st.reset}
      dock={{ label: "Attendance Allowance a week", value: gbp(aa.weekly, true) }}
      inputs={
        <>
          <InputGroup title="During the day, do you need help or reminding with">
            <Switch label="Washing, bathing or showering" checked={v.wash} onChange={st.bind("wash")} />
            <Switch label="Dressing or undressing" checked={v.dress} onChange={st.bind("dress")} />
            <Switch label="Eating or drinking, or cutting up food" checked={v.eat} onChange={st.bind("eat")} />
            <Switch label="Using the toilet or managing incontinence" checked={v.toilet} onChange={st.bind("toilet")} />
            <Switch label="Taking medication or treatment" checked={v.meds} onChange={st.bind("meds")} />
            <Switch label="Someone keeping an eye on you to stay safe" checked={v.watch} onChange={st.bind("watch")} hint="For example because of falls, dementia or seizures." />
          </InputGroup>
          <InputGroup title="During the night">
            <Switch label="Help more than once a night, or for 20 minutes or more" checked={v.nightHelp} onChange={st.bind("nightHelp")} hint="Such as turning over, using the toilet or taking medication." />
            <Switch label="Someone awake to watch over you" checked={v.nightWatch} onChange={st.bind("nightWatch")} hint="Three times a night or for 20 minutes or more." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Terminally ill (12 months or less to live)" checked={v.terminal} onChange={st.bind("terminal")} optional hint="Special rules: the higher rate straight away, with no waiting period." />
            <StepperField label="Months you have needed this help" value={v.months} onChange={st.bind("months")} step={1} min={0} max={600} unit="months" dp={0} optional hint="You must normally have needed help for 6 months." />
            <Segmented
              label="For Pension Credit: you are"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "A couple" },
              ]}
            />
            <MoneyField label="Weekly income: State Pension and other pensions" value={v.income} onChange={st.bind("income")} pence optional hint="To see whether Pension Credit could add more. Couples enter both." />
            <MoneyField label="Savings" value={v.savings} onChange={st.bind("savings")} optional hint="The first £10,000 is ignored for Pension Credit." />
            <Switch label="I live alone" checked={v.alone} onChange={st.bind("alone")} optional hint="Needed for the severe disability addition." />
            <Switch label="Someone gets Carer's Allowance for looking after me" checked={v.carerPaid} onChange={st.bind("carerPaid")} optional />
            <Switch label="Reached State Pension age before 6 April 2016" checked={v.pre2016} onChange={st.bind("pre2016")} optional hint="For Savings Credit." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Attendance Allowance"
        value={gbp(aa.weekly, true)}
        unit="a week"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          aa.rate === "none" ? (
            <>Tick the help you need with personal care or supervision. Attendance Allowance is for people over State Pension age who need help because of an illness or disability.</>
          ) : (
            <>
              {v.terminal ? "Under the special rules you" : "You"} would get the <b>{aa.rate} rate</b> of <b>{gbp(aa.weekly, true)}</b> a week, about <b>{gbp(aa.annual)}</b> a year, tax-free and not
              means-tested.
              {showPc && pcGain > 0.005 ? (
                <>
                  {" "}
                  It also adds <b>{gbp(pcGain, true)}</b> a week of Pension Credit.
                </>
              ) : null}
            </>
          )
        }
        badges={[aa.rate === "higher" ? "Day and night" : aa.rate === "lower" ? "Day or night" : "No award", aa.waiting ? `Wait ${aa.monthsToWait} more month${aa.monthsToWait === 1 ? "" : "s"}` : "Can claim now"]}
      />

      <Facts
        items={[
          { label: "Lower rate", value: gbp(AA_2026.lower, true), note: "Day or night" },
          { label: "Higher rate", value: gbp(AA_2026.higher, true), note: "Day and night" },
          { label: "Every 4 weeks", value: gbp(aa.fourWeekly, true) },
          { label: "Extra a year", value: gbp(totalGain * 52), tone: totalGain > 0 ? "good" : undefined, note: showPc ? "Including Pension Credit" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27, weekly" },
          { label: "Day needs ticked", value: String(dayNeeds) },
          { label: "Night needs ticked", value: String(nightNeeds) },
          { label: "Pension Credit", value: showPc ? `${gbp(v.income, true)} a week of income` : "Not checked (add income under More options)" },
        ]}
      />

      {showPc && (
        <ResultCard title="Pension Credit with and without Attendance Allowance" sub="A week.">
          <Statement
            columns={["Without", "With"]}
            rows={[
              { label: "Minimum guarantee", values: [gbp(pcBefore.minimumGuarantee, true), gbp(pcAfter.minimumGuarantee, true)] },
              { label: "Your income", values: [gbp(pcBefore.income, true), gbp(pcAfter.income, true)] },
              { label: "Guarantee Credit", values: [gbp(pcBefore.guaranteeCredit, true), gbp(pcAfter.guaranteeCredit, true)] },
              ...(v.pre2016 ? [{ label: "Savings Credit", values: [gbp(pcBefore.savingsCredit, true), gbp(pcAfter.savingsCredit, true)] }] : []),
              { label: "Attendance Allowance", values: [gbp(0, true), gbp(aa.weekly, true)] },
              { label: "Total extra help", values: [gbp(pcBefore.weekly, true), gbp(pcAfter.weekly + aa.weekly, true)], kind: "total" as const },
            ]}
          />
          {totalGain > 0 && (
            <SplitBar
              segments={[
                { label: "Attendance Allowance", value: aa.weekly, display: gbp(aa.weekly, true), color: "#5b1e6e" },
                { label: "Extra Pension Credit", value: Math.max(0, pcGain), display: gbp(Math.max(0, pcGain), true), color: "#16a34a" },
              ]}
            />
          )}
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Making the most of an award.">
        {aa.waiting && (
          <Callout tone="warn" title="The six-month qualifying period">
            You must normally have needed help for six months before Attendance Allowance is paid. You can claim before then, and it will start when the six months are up.
          </Callout>
        )}
        {aa.rate !== "none" && !v.carerPaid && (
          <Callout title="Your carer may get Carer's Allowance">
            Someone who looks after you for 35 hours a week or more can claim Carer&apos;s Allowance of {gbp(CA_2026.weekly, true)} a week, if they earn {gbp(CA_2026.earningsLimit)} a week or less. If you
            live alone and get the severe disability addition, it stops when they are paid Carer&apos;s Allowance.
          </Callout>
        )}
        {aa.rate !== "none" && (
          <Callout title="Severe disability addition">
            If you get Pension Credit, live alone and nobody gets Carer&apos;s Allowance for you, Attendance Allowance adds {gbp(PC_2026.severeDisability, true)} a week to your Pension Credit, even if you had no
            Pension Credit before.
          </Callout>
        )}
        <Callout title="It is about care, not what you spend">
          You do not need to have a carer, or to spend the money on care. What matters is the help you need, even if nobody gives it.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates. A self-check, not a decision. Not financial advice.
      </p>
    </Studio>
  );
}
