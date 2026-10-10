"use client";

import { familyCredits } from "@/lib/us/credits-payroll";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { per, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;

const SCHEMA = {
  status: oneOf<FilingStatus>("mfj", STATUSES),
  children: num(2, 0, 15),
  others: num(0, 0, 15),
  wages: num(60_000, 0, 100_000_000),
  se: num(0, 0, 100_000_000),
  other: num(0, 0, 100_000_000),
  pretax: num(0, 0, 10_000_000),
  itemized: num(0, 0, 100_000_000),
};
const ADVANCED = ["se", "other", "pretax", "itemized"] as const;

const COLORS = { used: "#2a78d6", refund: "#1baf7a", phase: "#eb6834", lost: "#9aa1a9" };

export default function ChildCreditStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const kids = Math.round(v.children);
  const others = Math.round(v.others);
  const input = { status: v.status, wages: v.wages, selfEmployment: v.se, otherIncome: v.other, preTax: v.pretax, children: kids, otherDependents: others, itemized: v.itemized };
  const f = familyCredits(input);
  const c = f.ctc;
  const phaseStart = US_2026.childTaxCredit.phaseStart[v.status];

  // Credit by income for this family (wages only), for the chart.
  const top = Math.max(100_000, Math.ceil(Math.min(v.wages * 1.25, 1_000_000) / 10_000) * 10_000);
  const steps = 40;
  const xs = Array.from({ length: steps + 1 }, (_, i) => (top / steps) * i);
  const series = xs.map((w) => familyCredits({ ...input, wages: w, selfEmployment: 0, otherIncome: 0, preTax: 0, itemized: 0 }).ctc);
  const totalLine = series.map((s) => s.total);
  const refundLine = series.map((s) => s.refundable);

  const segments = [
    { label: "Cuts your tax", value: c.nonRefundable, display: usd(c.nonRefundable), color: COLORS.used },
    { label: "Paid as a refund", value: c.refundable, display: usd(c.refundable), color: COLORS.refund },
    { label: "Lost to the income phase-out", value: c.reduction, display: usd(c.reduction), color: COLORS.phase },
    { label: "Not usable (too little tax or earnings)", value: Math.max(0, c.lost), display: usd(Math.max(0, c.lost)), color: COLORS.lost },
  ].filter((s, i) => i === 0 || s.value > 0);

  const noOne = kids + others === 0;
  const fullPer = kids * US_2026.childTaxCredit.perChild + others * US_2026.childTaxCredit.otherDependent;
  const earningsForFullRefund = 2_500 + (kids * US_2026.childTaxCredit.refundable) / 0.15;

  return (
    <Studio
      title="Your child tax credit"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my credit"
      onReset={st.reset}
      dock={{ label: "Credit for 2026", value: usd(c.total) }}
      inputs={
        <>
          <InputGroup title="Your family">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <StepperField
              label="Children under 17"
              value={v.children}
              onChange={(x) => st.set("children", Math.round(x))}
              step={1}
              min={0}
              max={15}
              unit="children"
              dp={0}
              info="Under 17 on December 31, 2026, lived with you more than half the year, and has a Social Security number valid for work."
            />
            <StepperField
              label="Other dependents"
              value={v.others}
              onChange={(x) => st.set("others", Math.round(x))}
              step={1}
              min={0}
              max={15}
              unit="people"
              dp={0}
              info="Children aged 17 or over, college students, parents or relatives you support, and children with an ITIN instead of an SSN: $500 each."
            />
            <MoneyField
              label="Wages a year (household)"
              symbol="$"
              value={v.wages}
              onChange={st.bind("wages")}
              slider={{ min: 0, max: 500_000, step: 1_000, ends: ["$0", "$500k"] }}
              info="Form W-2 box 1 pay for you (and your spouse, if filing jointly)."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Self-employment profit" symbol="$" value={v.se} onChange={st.bind("se")} optional info="Net profit from Schedule C. It counts as earned income for the refundable part." />
            <MoneyField label="Other income" symbol="$" value={v.other} onChange={st.bind("other")} optional info="Interest, dividends, capital gains, rental income. Raises your AGI but is not earned income." />
            <MoneyField label="Pre-tax 401(k) and benefits" symbol="$" value={v.pretax} onChange={st.bind("pretax")} optional info="Taken from your pay before income tax: they lower your AGI and your tax." />
            <MoneyField
              label="Itemized deductions"
              symbol="$"
              value={v.itemized}
              onChange={st.bind("itemized")}
              optional
              info={`Only if more than the standard deduction (${usd(US_2026.standardDeduction[v.status])} for your filing status).`}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Child tax credit for 2026"
        value={usd(c.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          noOne ? (
            <>Add at least one child or other dependent to see your credit.</>
          ) : (
            <>
              With {kids} {per(kids, "children")} under 17{others > 0 ? ` and ${others} other ${per(others, "dependents")}` : ""} and an AGI of <b>{usd(f.agi)}</b>, your credits are worth <b>{usd(c.total)}</b>.{" "}
              {usd(c.nonRefundable)} cuts your income tax{c.refundable > 0 ? <> and <b>{usd(c.refundable)}</b>{" "}comes back as a refund</> : null}.
            </>
          )
        }
        badges={[`${usd(fullPer)} full credit`, `${usd(c.refundable)} refundable`, c.reduction > 0 ? `${usd(c.reduction)} phased out` : `Phase-out starts at ${usd(phaseStart)}`]}
      />

      <Facts
        items={[
          { label: "Tax before credits", value: usd(f.taxBeforeCredits) },
          { label: "Used against your tax", value: usd(c.nonRefundable) },
          { label: "Refundable part (ACTC)", value: usd(c.refundable), tone: c.refundable > 0 ? "good" : undefined },
          { label: "Tax left after the credit", value: usd(f.taxAfterCredits) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 (the return you file in 2027)" },
          { label: "Credit", value: "$2,200 a child under 17, $500 for each other dependent, $1,700 a child refundable" },
          { label: "Phase-out", value: `$50 less for each $1,000 (or part) of AGI over ${usd(phaseStart)}` },
          { label: "Income", value: "Wages and any profit or other income you entered; standard deduction unless your itemized figure is larger" },
          { label: "Other credits", value: "None that would use up your tax first (such as the child and dependent care credit)" },
          { label: "Eligibility", value: "Every child and dependent meets the IRS tests and has the right ID number" },
        ]}
      />

      <ResultCard title="What your credit does" sub="The full credit split into what cuts your tax, what is refunded and what you lose.">
        <SplitBar segments={segments.length > 1 || c.nonRefundable > 0 ? segments : [{ label: "No credit", value: 1, display: "$0", color: COLORS.lost }]} />
      </ResultCard>

      <ResultCard title="Schedule 8812, line by line" sub="How the IRS form gets to your figure.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: `Full credit (${kids} × $2,200 + ${others} × $500)`, values: [usd(c.full)] },
            ...(c.reduction > 0 ? [{ label: "Less the income phase-out", values: [`−${usd(c.reduction)}`], kind: "deduction" as const, swatch: COLORS.phase }] : []),
            { label: "Credit after the phase-out (line 12)", values: [usd(c.credit)] },
            { label: "Used against your income tax (line 14)", values: [usd(c.nonRefundable)], swatch: COLORS.used },
            { label: "Left over (line 16a)", values: [usd(c.unused)] },
            ...(kids > 0
              ? [
                  { label: `$1,700 × ${kids} ${per(kids, "children")} (line 16b)`, values: [usd(c.refundCap)] },
                  { label: "15% of earned income over $2,500 (line 20)", values: [usd(c.earnedLimit)] },
                  ...(kids >= 3 ? [{ label: "Social Security and Medicare less the EITC (line 25)", values: [usd(c.payrollLimit)] }] : []),
                ]
              : []),
            { label: "Additional child tax credit (line 27)", values: [usd(c.refundable)], kind: "total" as const, swatch: COLORS.refund },
          ]}
        />
      </ResultCard>

      {kids > 0 && (
        <ResultCard title="Your credit at other incomes" sub="Same family, wages only, standard deduction.">
          <AreaChart
            ariaLabel="Child tax credit by household wages"
            series={[
              { key: "total", label: "Total credit", color: COLORS.used, values: totalLine, fill: true },
              { key: "refund", label: "Refundable part", color: COLORS.refund, values: refundLine, dashed: true },
            ]}
            xLabel={(i) => usdShort(xs[i] ?? 0)}
            yFormat={usdShort}
            initial={Math.min(steps, Math.round((Math.min(v.wages, top) / top) * steps))}
            hint="Drag across the chart, or use the arrow keys, to read any income."
            readout={(i) => (
              <>
                At <b>{usd(xs[i] ?? 0)}</b>{" "}of wages: credit <b>{usd(totalLine[i] ?? 0)}</b>, of which <b>{usd(refundLine[i] ?? 0)}</b>{" "}refundable.
              </>
            )}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Things that change the credit on your real return.">
        {kids > 0 && c.earnedLimit < c.refundCap && (
          <Callout tone="warn" title="Earnings limit the refund">
            The refundable part is 15% of earned income over $2,500. To get the full {usd(c.refundCap)} you would need about {usd(earningsForFullRefund)} of earnings.
            {kids >= 3 ? " With three or more children, Social Security and Medicare paid can count instead if that is more." : ""}
          </Callout>
        )}
        {c.reduction > 0 && (
          <Callout title="You are in the phase-out">
            Your AGI is over {usd(phaseStart)}, so the credit drops by $50 for each $1,000 above it. It reaches zero above {usd((c.zeroAt ?? 1) - 1)}. A bigger pre-tax 401(k) or HSA contribution lowers AGI and wins some back.
          </Callout>
        )}
        {f.eitc > 0 && (
          <Callout tone="good" title="You may also get the earned income credit">
            At this income you could get about {usd(f.eitc)} of earned income credit as well. Check it with the <a href="/us/taxes/earned-income-credit-calculator">earned income credit calculator</a>.
          </Callout>
        )}
        {v.status === "mfs" && (
          <Callout tone="warn" title="Married filing separately">
            You can claim the credit on a separate return, but each child can be claimed by only one parent, and the phase-out starts at $200,000 for each of you.
          </Callout>
        )}
        <Callout title="Refunds come after mid-February">
          By law the IRS cannot send refunds that include the additional child tax credit before mid-February. Most arrive by early March if you file online with direct deposit.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax advice.
      </p>
    </Studio>
  );
}
