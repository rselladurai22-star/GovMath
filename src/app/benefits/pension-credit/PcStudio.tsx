"use client";

import { PC_2026, pensionCredit2026, STATE_PENSION_2026, type PensionCreditInput } from "@/lib/benefits/later-life";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  couple: bool(false),
  sp: num(200, 0, 2_000),
  other: num(0, 0, 2_000),
  savings: num(0, 0, 2_000_000),
  earnings: num(0, 0, 2_000),
  otherIncome: num(0, 0, 2_000),
  sd: num(0, 0, 2),
  carers: num(0, 0, 2),
  children: num(0, 0, 10),
  pre2017: bool(false),
  disLower: num(0, 0, 10),
  disHigher: num(0, 0, 10),
  pre2016: bool(false),
  over75: bool(false),
  renting: bool(false),
};
const ADVANCED = ["earnings", "otherIncome", "sd", "carers", "children", "pre2017", "disLower", "disHigher", "pre2016", "over75", "renting"] as const;
const POINTS = 41;
const axis = (n: number) => gbp(Math.round(n));

export default function PcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input: PensionCreditInput = {
    couple: v.couple,
    statePension: v.sp,
    otherPensions: v.other,
    earnings: v.earnings,
    otherIncome: v.otherIncome,
    savings: v.savings,
    severeDisability: v.sd,
    carers: v.carers,
    children: v.children,
    firstChildPre2017: v.pre2017,
    disabledChildrenLower: v.disLower,
    disabledChildrenHigher: v.disHigher,
    savingsCreditEligible: v.pre2016,
  };
  const r = pensionCredit2026(input);
  const top = Math.max(400, Math.ceil((r.minimumGuarantee + 60) / 50) * 50);
  const levels = Array.from({ length: POINTS }, (_, i) => (top * i) / (POINTS - 1));
  const curve = levels.map((x) => pensionCredit2026({ ...input, statePension: x, otherPensions: 0, earnings: 0, otherIncome: 0 }).weekly);
  const getsAny = r.weekly > 0.005;
  const gc = r.guaranteeCredit > 0.005;
  const shortBy = r.income - r.minimumGuarantee;

  return (
    <Studio
      title="Your income and savings"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my Pension Credit"
      onReset={st.reset}
      dock={{ label: "Pension Credit a week", value: gbp(r.weekly, true) }}
      inputs={
        <>
          <InputGroup title="Your household">
            <Segmented
              label="You are"
              value={v.couple ? "couple" : "single"}
              onChange={(x) => st.set("couple", x === "couple")}
              options={[
                { value: "single", label: "Single" },
                { value: "couple", label: "A couple", note: "Both of you must have reached State Pension age." },
              ]}
            />
          </InputGroup>
          <InputGroup title="Weekly income">
            <MoneyField label="State Pension a week" value={v.sp} onChange={st.bind("sp")} pence hint={`The full new State Pension is ${gbp(STATE_PENSION_2026.newFull, true)}, the full basic State Pension ${gbp(STATE_PENSION_2026.basicFull, true)}.${v.couple ? " Add both together." : ""}`} />
            <MoneyField label="Private and workplace pensions a week" value={v.other} onChange={st.bind("other")} pence />
            <MoneyField label="Savings and investments" value={v.savings} onChange={st.bind("savings")} hint="The first £10,000 is ignored. There is no upper limit." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Earnings a week, after tax and NI" value={v.earnings} onChange={st.bind("earnings")} pence optional hint="£5 is ignored for a single person, £10 for a couple, £20 for carers and some disabled people." />
            <MoneyField label="Other income a week" value={v.otherIncome} onChange={st.bind("otherIncome")} pence optional hint="Such as Carer's Allowance. Attendance Allowance, PIP and DLA are ignored." />
            <StepperField label="People getting the severe disability addition" value={v.sd} onChange={(n) => st.set("sd", Math.round(n))} step={1} min={0} max={v.couple ? 2 : 1} unit="people" dp={0} optional hint="Gets Attendance Allowance, PIP daily living or DLA middle or high care, lives alone, and nobody gets Carer's Allowance for them." />
            <StepperField label="Carers in the household" value={v.carers} onChange={(n) => st.set("carers", Math.round(n))} step={1} min={0} max={v.couple ? 2 : 1} unit="people" dp={0} optional hint="Entitled to Carer's Allowance, even if not paid because of the State Pension." />
            <StepperField label="Children you are responsible for" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />
            {v.children > 0 && <Switch label="Eldest child born before 6 April 2017" checked={v.pre2017} onChange={st.bind("pre2017")} optional />}
            {v.children > 0 && <StepperField label="Disabled children (lower addition)" value={v.disLower} onChange={(n) => st.set("disLower", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />}
            {v.children > 0 && <StepperField label="Disabled children (higher addition)" value={v.disHigher} onChange={(n) => st.set("disHigher", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional />}
            <Switch label={v.couple ? "One of us reached State Pension age before 6 April 2016" : "I reached State Pension age before 6 April 2016"} checked={v.pre2016} onChange={st.bind("pre2016")} optional hint="Only then can you get Savings Credit." />
            <Switch label={v.couple ? "One of us is 75 or over" : "I am 75 or over"} checked={v.over75} onChange={st.bind("over75")} optional />
            <Switch label="I rent my home" checked={v.renting} onChange={st.bind("renting")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Pension Credit"
        value={gbp(r.weekly, true)}
        unit="a week"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          getsAny ? (
            <>
              Pension Credit tops your income up to <b>{gbp(r.minimumGuarantee, true)}</b> a week. Your income counts as <b>{gbp(r.income, true)}</b>, so you would get about{" "}
              <b>{gbp(r.weekly, true)}</b> a week, or <b>{gbp(r.annual)}</b> a year.
            </>
          ) : (
            <>
              Your income of <b>{gbp(r.income, true)}</b> a week is <b>{gbp(shortBy, true)}</b> above the <b>{gbp(r.minimumGuarantee, true)}</b> Pension Credit guarantee
              {v.pre2016 ? " and too high for Savings Credit" : ""}. Check the additions under More options: a disability or caring can raise the guarantee.
            </>
          )
        }
        badges={[`Guarantee ${gbp(r.minimumGuarantee, true)}`, gc ? "Guarantee Credit" : r.savingsCredit > 0 ? "Savings Credit only" : "No award", r.tariffIncome > 0 ? `${gbp(r.tariffIncome)} from savings` : "Savings ignored"]}
      />

      <Facts
        items={[
          { label: "Guarantee", value: gbp(r.minimumGuarantee, true) },
          { label: "Income counted", value: gbp(r.income, true) },
          { label: "Guarantee Credit", value: gbp(r.guaranteeCredit, true), tone: gc ? "good" : undefined },
          { label: "Savings Credit", value: v.pre2016 ? gbp(r.savingsCredit, true) : "Not eligible", tone: r.savingsCredit > 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27, weekly" },
          { label: "Savings", value: r.tariffIncome > 0 ? `£1 a week for each £500 over £10,000: ${gbp(r.tariffIncome)}` : "Under £10,000, ignored" },
          { label: "Household", value: v.couple ? "Couple, both over State Pension age" : "Single" },
          { label: "Housing costs", value: "Rent is covered by Housing Benefit, not here" },
        ]}
      />

      <ResultCard title="How it is worked out" sub="A week.">
        <Statement
          columns={["A week"]}
          rows={[
            ...r.guaranteeLines.map((l) => ({ label: l.label, values: [gbp(l.amount, true)] })),
            { label: "Minimum guarantee", values: [gbp(r.minimumGuarantee, true)], kind: "total" as const },
            ...(v.sp > 0 ? [{ label: "State Pension", values: [`−${gbp(v.sp, true)}`], kind: "deduction" as const }] : []),
            ...(v.other > 0 ? [{ label: "Other pensions", values: [`−${gbp(v.other, true)}`], kind: "deduction" as const }] : []),
            ...(v.earnings - r.earningsDisregard > 0.005 ? [{ label: "Earnings after the disregard", values: [`−${gbp(v.earnings - r.earningsDisregard, true)}`], kind: "deduction" as const }] : []),
            ...(v.otherIncome > 0 ? [{ label: "Other income", values: [`−${gbp(v.otherIncome, true)}`], kind: "deduction" as const }] : []),
            ...(r.tariffIncome > 0 ? [{ label: "Assumed income from savings", values: [`−${gbp(r.tariffIncome, true)}`], kind: "deduction" as const }] : []),
            { label: "Guarantee Credit", values: [gbp(r.guaranteeCredit, true)], kind: "total" as const },
            ...(v.pre2016 ? [{ label: "Savings Credit", values: [gbp(r.savingsCredit, true)] }] : []),
            { label: "Pension Credit", values: [gbp(r.weekly, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Pension Credit at different incomes" sub="Weekly income from pensions on the bottom axis.">
        <AreaChart
          ariaLabel="Pension Credit by weekly income"
          series={[{ key: "pc", label: "Pension Credit", color: "#5b1e6e", values: curve, fill: true }]}
          xLabel={(i) => gbp(Math.round(levels[i] ?? 0))}
          yFormat={axis}
          initial={Math.min(POINTS - 1, Math.round(((v.sp + v.other) / top) * (POINTS - 1)))}
          hint="Drag across the chart, or use the arrow keys, to read any level of income."
          readout={(i) => (
            <>
              Income <b>{gbp(levels[i] ?? 0, true)}</b> a week: Pension Credit <b>{gbp(curve[i] ?? 0, true)}</b>.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Pension Credit opens other doors.">
        {gc && (
          <Callout tone="good" title="Guarantee Credit unlocks more help">
            Full help with rent through Housing Benefit{v.renting ? "" : " if you rent"}, Council Tax Reduction, Cold Weather Payments, help with NHS dental treatment and glasses, and the Warm Home Discount.
            {v.over75 ? " At 75 or over you also get a free TV licence." : ""}
          </Callout>
        )}
        {!gc && r.savingsCredit > 0 && (
          <Callout tone="good" title="Even a little Savings Credit helps">
            Any Pension Credit can bring a free TV licence at 75 or over, Cold Weather Payments and help from your council with Council Tax and rent.
          </Callout>
        )}
        {v.sd === 0 && (
          <Callout title="Disability adds £86.05 a week">
            If you get Attendance Allowance, PIP daily living or DLA care, live alone and nobody gets Carer&apos;s Allowance for you, the guarantee rises by {gbp(PC_2026.severeDisability, true)} a week.
            The <a href="/benefits/attendance-allowance">Attendance Allowance calculator</a> checks this.
          </Callout>
        )}
        <Callout title="Claim and backdate">
          You can claim up to four months before you reach State Pension age, and a claim can be backdated by up to three months if you qualified then.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. An estimate, not a decision. Not financial advice.
      </p>
    </Studio>
  );
}
