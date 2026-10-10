"use client";

import { FREQUENCY_LABEL, PERIODS, type PayFrequency } from "@/lib/us/pay";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import { w4Plan, type W4Input } from "@/lib/us/withholding";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { per, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const FREQS = ["weekly", "biweekly", "semimonthly", "monthly"] as const;
const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;

const SCHEMA = {
  status: oneOf<FilingStatus>("single", STATUSES),
  freq: oneOf<PayFrequency>("biweekly", FREQS),
  pay: num(2_500, 0, 10_000_000),
  current: num(216, 0, 10_000_000),
  left: num(6, 0, 52),
  ytd: num(4_320, 0, 100_000_000),
  children: num(0, 0, 15),
  pretax: num(0, 0, 10_000_000),
  ytdPay: num(0, 0, 100_000_000),
  job2: num(0, 0, 100_000_000),
  job2w: num(0, 0, 100_000_000),
  other: num(0, 0, 100_000_000),
  adjust: num(0, 0, 1_000_000),
  itemized: num(0, 0, 100_000_000),
  others: num(0, 0, 15),
  over65: num(0, 0, 2),
  tips: num(0, 0, 1_000_000),
  overtime: num(0, 0, 1_000_000),
  target: num(0, 0, 1_000_000),
};
const ADVANCED = ["pretax", "ytdPay", "job2", "job2w", "other", "adjust", "itemized", "others", "over65", "tips", "overtime", "target"] as const;

const C = { ytd: "#1baf7a", rest: "#2a78d6", gap: "#e34948", extra: "#eda100" };

export default function W4Studio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const periods = PERIODS[v.freq];
  const left = Math.min(Math.round(v.left), periods);
  const input: W4Input = {
    status: v.status,
    periods,
    payPerPeriod: v.pay,
    preTaxPerPeriod: v.pretax,
    paychecksLeft: left,
    ytdWithheld: v.ytd,
    currentPerPeriod: v.current,
    ytdPay: v.ytdPay,
    otherJobWages: v.job2,
    otherJobWithholding: v.job2w,
    otherIncome: v.other,
    adjustments: v.adjust,
    itemized: v.itemized,
    children: Math.round(v.children),
    otherDependents: Math.round(v.others),
    over65: Math.min(Math.round(v.over65), v.status === "mfj" ? 2 : 1),
    tips: v.tips,
    overtimePremium: v.overtime,
    targetRefund: v.target,
  };
  const p = w4Plan(input);
  const off = p.refundIfUnchanged - v.target;
  const onTrack = Math.abs(off) <= Math.max(100, p.target * 0.02);
  const short = !onTrack && off < 0;
  const restCurrent = v.current * left;
  const status = onTrack ? "On track" : short ? "Under-withheld" : "Over-withheld";

  const segments = [
    { label: "Withheld so far", value: v.ytd + v.job2w, display: usd(v.ytd + v.job2w), color: C.ytd },
    { label: "Still to come at today’s rate", value: restCurrent, display: usd(restCurrent), color: C.rest },
    ...(off < 0 ? [{ label: "Shortfall", value: -off, display: usd(-off), color: C.gap }] : [{ label: "More than you need", value: off, display: usd(off), color: C.extra }]),
  ].filter((s, i) => i < 2 || s.value > 0.5);

  // The sooner you change it, the smaller the change each paycheck.
  const timing = [left, left - 2, left - 4, 1]
    .filter((n, i, a) => n >= 1 && a.indexOf(n) === i)
    .map((n) => {
      const gap = -off;
      return { n, perCheck: gap / n };
    });

  return (
    <Studio
      title="Your W-4 check"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my withholding"
      onReset={st.reset}
      dock={{ label: p.refundIfUnchanged < 0 ? "You would owe" : "Your refund", value: usd(Math.abs(p.refundIfUnchanged)) }}
      inputs={
        <>
          <InputGroup title="Your paycheck">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <SelectField label="How often you are paid" value={v.freq} onChange={st.bind("freq")} options={FREQS.map((f) => ({ value: f, label: `${FREQUENCY_LABEL[f]} (${PERIODS[f]} paychecks)` }))} />
            <MoneyField label="Gross pay each paycheck" symbol="$" value={v.pay} onChange={st.bind("pay")} info="Before tax and deductions, from your latest pay stub." />
            <MoneyField label="Federal income tax withheld each paycheck" symbol="$" value={v.current} onChange={st.bind("current")} pence info="The federal income tax (often &ldquo;Fed W/H&rdquo; or &ldquo;FITW&rdquo;) line on your pay stub. Not Social Security or Medicare." />
            <StepperField label="Paychecks left in 2026" value={v.left} onChange={(n) => st.set("left", Math.round(n))} step={1} min={0} max={52} unit="paychecks" dp={0} info="Count the paychecks you will still be paid this year, not counting the one on your latest stub." />
            <MoneyField label="Federal tax withheld so far this year" symbol="$" value={v.ytd} onChange={st.bind("ytd")} info="The year-to-date (YTD) federal income tax on your latest pay stub." />
            <StepperField label="Children under 17" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={15} unit="children" dp={0} info="$2,200 each on Step 3 of Form W-4." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Pre-tax deductions each paycheck" symbol="$" value={v.pretax} onChange={st.bind("pretax")} optional info="Traditional 401(k) or 403(b), HSA, and health, dental and vision premiums taken before tax." />
            <MoneyField label="Gross pay so far this year" symbol="$" value={v.ytdPay} onChange={st.bind("ytdPay")} optional info="Year-to-date gross pay from your stub. Leave at $0 if your pay has been the same every paycheck." />
            <MoneyField label="Second job or spouse's wages for 2026" symbol="$" value={v.job2} onChange={st.bind("job2")} optional info="Wages for the whole year from a second job, or from your spouse's job if you file jointly." />
            <MoneyField label="Tax that job will withhold in 2026" symbol="$" value={v.job2w} onChange={st.bind("job2w")} optional info="Federal income tax withheld from the second job for the whole year." />
            <MoneyField label="Other income with no withholding" symbol="$" value={v.other} onChange={st.bind("other")} optional info="Interest, dividends and similar income for the year (Step 4(a)). For self-employment income, use the quarterly estimated tax calculator." />
            <MoneyField label="Adjustments to income" symbol="$" value={v.adjust} onChange={st.bind("adjust")} optional info="Student loan interest, deductible IRA contributions, educator expenses (Deductions Worksheet line 5)." />
            <MoneyField label="Itemized deductions" symbol="$" value={v.itemized} onChange={st.bind("itemized")} optional info="Mortgage interest, state and local taxes up to $40,400, charity and medical costs above 7.5% of income. Only the part above your standard deduction goes on the W-4." />
            <StepperField label="Other dependents" value={v.others} onChange={(n) => st.set("others", Math.round(n))} step={1} min={0} max={15} unit="people" dp={0} optional info="$500 each on Step 3." />
            <StepperField label="People 65 or over" value={v.over65} onChange={(n) => st.set("over65", Math.round(n))} step={1} min={0} max={2} unit="people" dp={0} optional info="$6,000 each on the Deductions Worksheet if total income is under $75,000 ($150,000 joint)." />
            <MoneyField label="Qualified tips for the year" symbol="$" value={v.tips} onChange={st.bind("tips")} optional />
            <MoneyField label="Qualified overtime premium for the year" symbol="$" value={v.overtime} onChange={st.bind("overtime")} optional info="Only the extra half of time-and-a-half pay." />
            <MoneyField label="Refund you would like" symbol="$" value={v.target} onChange={st.bind("target")} optional info="Leave at $0 to aim to break even. A few hundred dollars gives a cushion." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`${status}: if you change nothing`}
        value={p.refundIfUnchanged < -0.5 ? `Owe ${usd(-p.refundIfUnchanged)}` : `${usd(p.refundIfUnchanged)} refund`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          p.noPaychecksLeft ? (
            <>
              With no paychecks left, withholding can&rsquo;t change for 2026. Your tax is <b>{usd(p.ret.totalTax)}</b>{" "}and you have paid in <b>{usd(p.projected)}</b>.
            </>
          ) : onTrack ? (
            <>
              Your 2026 tax is about <b>{usd(p.ret.totalTax)}</b>{" "}and your withholding is on course for <b>{usd(p.projected)}</b>. No change needed.
            </>
          ) : (
            <>
              Your 2026 tax is about <b>{usd(p.ret.totalTax)}</b>, but withholding is on course for <b>{usd(p.projected)}</b>. With the W-4 below, each of your {left} remaining{" "}
              {per(left, "paychecks")} would withhold <b>{usd(p.newPerPeriod, true)}</b>{" "}instead of {usd(v.current, true)}.
            </>
          )
        }
        badges={[`${left} ${per(left, "paychecks")} left`, `${usd(p.changePerPeriod, true)} a paycheck change`, FREQUENCY_LABEL[v.freq]]}
      />

      <Facts
        items={[
          { label: "Your 2026 federal tax", value: usd(p.ret.totalTax) },
          { label: "Withholding on track for", value: usd(p.projected) },
          { label: off < 0 ? "Shortfall" : "Over-withheld by", value: usd(Math.abs(off)), tone: onTrack ? "good" : short ? "bad" : "warn" },
          { label: "New withholding a paycheck", value: p.noPaychecksLeft ? "None left" : usd(p.newPerPeriod, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 brackets, standard deduction and credits" },
          { label: "Withholding method", value: "IRS Publication 15-T (2026) percentage method, Form W-4 from 2020 or later" },
          { label: "Pay", value: v.ytdPay > 0 ? "Your year-to-date pay plus the same pay on each paycheck left" : "The same gross pay on every paycheck this year" },
          { label: "This W-4", value: "For your highest-paying job; any second job's tax is covered through Step 4(c) here" },
          { label: "Not included", value: "Self-employment income, capital gains, state tax" },
        ]}
      />

      <ResultCard title="Where your 2026 withholding stands" sub={`Against a target of ${usd(p.target)}.`}>
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="What to put on your new W-4" sub="Form W-4 (2026), for this job.">
        {p.noPaychecksLeft ? (
          <p>There are no paychecks left in 2026, so a new W-4 only matters for 2027. To cut a balance due, make an estimated payment by January 15, 2027.</p>
        ) : (
          <Statement
            columns={["Enter"]}
            rows={[
              { label: "Step 1(c): filing status", values: [FILING_LABEL[v.status]] },
              { label: "Step 2: multiple jobs or spouse works", values: [v.job2 > 0 ? "Leave blank (covered in 4(c))" : "Leave blank"] },
              { label: "Step 3: dependents and other credits", values: [p.w4.step3 > 0 ? usd(p.w4.step3) : "Leave blank"] },
              { label: "Step 4(a): other income", values: [p.w4.step4a > 0 ? usd(p.w4.step4a) : "Leave blank"] },
              { label: "Step 4(b): deductions", values: [p.w4.step4b > 0 ? usd(p.w4.step4b) : "Leave blank"] },
              { label: "Step 4(c): extra withholding each paycheck", values: [p.w4.step4c > 0 ? usd(p.w4.step4c) : "Leave blank"] },
              { label: "Federal tax withheld each paycheck", values: [usd(p.newPerPeriod, true)], kind: "total" },
              { label: p.refundWithNew < -0.5 ? "Balance due at filing" : "Refund at filing", values: [usd(Math.abs(p.refundWithNew))], kind: "total" },
            ]}
          />
        )}
        <p className="footnote">Withholding is set in whole dollars, so the result can be off by a few dollars either way.</p>
      </ResultCard>

      <ResultCard title="Withholding each paycheck" sub="Three ways to fill in the form.">
        <Compare
          head={["W-4", "Withheld a paycheck"]}
          rows={[
            { label: "Your paycheck today", value: usd(v.current, true), bar: 1, current: true },
            { label: "A W-4 with only your filing status", value: usd(p.blankPerPeriod, true), bar: v.current > 0 ? Math.min(1, p.blankPerPeriod / Math.max(v.current, p.blankPerPeriod, p.newPerPeriod)) : 0 },
            { label: "The W-4 suggested here", value: usd(p.newPerPeriod, true), bar: Math.min(1, p.newPerPeriod / Math.max(1, v.current, p.blankPerPeriod, p.newPerPeriod)) },
          ]}
        />
      </ResultCard>

      {!onTrack && !p.noPaychecksLeft && (
        <ResultCard title="The sooner, the smaller" sub="Change needed each paycheck to close the gap, by how many paychecks are left when the new W-4 starts.">
          <Compare
            head={["Paychecks left when it starts", off < 0 ? "Extra each paycheck" : "Less each paycheck"]}
            rows={timing.map((t) => ({ label: `${t.n} ${per(t.n, "paychecks")}`, value: usd(Math.abs(t.perCheck), true), bar: Math.abs(t.perCheck) / Math.max(1, Math.abs(timing[timing.length - 1].perCheck)), current: t.n === left }))}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Before you hand in the form.">
        {short && -p.refundIfUnchanged >= 1_000 && (
          <Callout tone="warn" title="Avoid the underpayment penalty">
            A balance due of $1,000 or more can bring a penalty unless withholding covers 90% of your 2026 tax or 100% of your 2025 tax (110% if your 2025 AGI was over $150,000). Withholding counts as paid evenly through the year, so extra
            withholding late in the year still helps.
          </Callout>
        )}
        {p.overWithheldAlready && (
          <Callout title="Your refund is already locked in">
            You have had more withheld so far than your whole 2026 tax, so you will get a refund whatever you put on the form. Set a W-4 for 2027 in January.
          </Callout>
        )}
        {v.job2 > 0 && (
          <Callout title="Two jobs">
            Put the entries above on the W-4 for your highest-paying job only and leave Steps 3 and 4 blank on the other. The IRS form&rsquo;s own Step 2 checkbox or Multiple Jobs Worksheet gets a similar result for the full year.
          </Callout>
        )}
        <Callout title="Next year">
          These entries aim at what is left of 2026. In January 2027, look again: with a full year of paychecks the same result usually needs a smaller Step 4(c), or none.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax advice.
      </p>
    </Studio>
  );
}
