"use client";

import {
  ageLabel,
  aimeFromSalary,
  benefitTax,
  breakEvenMonths,
  claimTable,
  earningsTestWithheld,
  pia,
  SS_2026,
} from "@/lib/us/retirement-income";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "hoh", "mfs"] as const;
const MODES = ["salary", "aime", "pia"] as const;
type Mode = (typeof MODES)[number];
const YEAR = 2026;

const SCHEMA = {
  age: num(60, 18, 68),
  mode: oneOf<Mode>("salary", MODES),
  salary: num(70_000, 0, 10_000_000),
  worked: num(25, 0, 50),
  aime: num(5_000, 0, 20_000),
  fra: num(2_000, 0, 6_000),
  claim: num(67, 62, 70),
  stop: num(65, 40, 75),
  lifeTo: num(85, 70, 100),
  status: oneOf<FilingStatus>("single", STATUSES),
  other: num(30_000, 0, 1_000_000),
  earnings: num(0, 0, 1_000_000),
};
const ADVANCED = ["stop", "lifeTo", "status", "other", "earnings"] as const;

/** "78 and 8 months", or a phrase when it never catches up. */
function beLabel(months: number): string {
  return Number.isFinite(months) ? ageLabel(months) : "never";
}

export default function SocialSecurityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const age = v.age;
  const born = YEAR - v.age;
  const futureYears = Math.max(0, v.stop - age);
  const totalYears = Math.min(50, v.worked + futureYears);
  const aime = v.mode === "salary" ? aimeFromSalary(v.salary, totalYears) : v.aime;
  const full = v.mode === "pia" ? v.fra : pia(aime);
  const t = claimTable(full, born, v.lifeTo);
  const claimMonths = v.claim * 12;
  const chosen = t.rows.find((r) => r.months === claimMonths) ?? t.rows[0];
  const at62 = t.rows[0];
  const at70 = t.rows[t.rows.length - 1];
  const fraLabel = ageLabel(t.fra);
  const early = claimMonths < t.fra;

  const be62Fra = breakEvenMonths(at62.monthly, at62.months, t.atFra.monthly, t.fra);
  const beFra70 = breakEvenMonths(t.atFra.monthly, t.fra, at70.monthly, at70.months);
  const be62to70 = breakEvenMonths(at62.monthly, at62.months, at70.monthly, at70.months);

  const over65 = v.status === "mfj" ? 2 : 1;
  const tax = benefitTax(chosen.yearly, v.other, v.status, over65);
  const withheld = early && v.earnings > 0 ? earningsTestWithheld(chosen.yearly, v.earnings, false) : 0;

  // Running totals from 62 to the planning age for three claiming ages.
  const ages = Array.from({ length: Math.max(2, v.lifeTo - 62 + 1) }, (_, i) => 62 + i);
  const fraWhole = Math.round(t.fra / 12);
  const fraRow = t.rows.find((r) => r.months === fraWhole * 12) ?? t.atFra;
  const total = (monthly: number, startMonths: number, a: number) => Math.max(0, a * 12 - startMonths) * monthly;
  const s62 = ages.map((a) => total(at62.monthly, at62.months, a));
  const sFra = ages.map((a) => total(fraRow.monthly, fraRow.months, a));
  const s70 = ages.map((a) => total(at70.monthly, at70.months, a));
  const best = t.rows.reduce((b, r) => (r.lifetime > b.lifetime ? r : b), t.rows[0]);

  const sourceText =
    v.mode === "salary"
      ? `${usd(v.salary)} a year for ${totalYears} ${totalYears === 1 ? "year" : "years"} of work, about ${usd(aime)} AIME`
      : v.mode === "aime"
        ? `Average indexed monthly earnings of ${usd(aime)}`
        : `${usd(v.fra)} a month at full retirement age, from your Social Security statement`;

  return (
    <Studio
      title="Your Social Security"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my benefit"
      onReset={st.reset}
      dock={{ label: `At ${v.claim}`, value: `${usd(chosen.monthly)}/mo` }}
      inputs={
        <>
          <InputGroup title="You">
            <StepperField label="Your age at the end of 2026" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={68} unit="years" dp={0} info={`We take your birth year as ${YEAR - v.age}, which sets your full retirement age: 67 for anyone born in 1960 or later.`} />
            <StepperField label="Age you plan to claim" value={v.claim} onChange={(n) => st.set("claim", Math.round(n))} step={1} min={62} max={70} unit="years" dp={0} info="From 62 to 70. Waiting past 70 adds nothing more." />
            <RadioGroup
              label="Estimate from"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "salary", label: "My salary" },
                { value: "aime", label: "My AIME" },
                { value: "pia", label: "My statement" },
              ]}
              info="Your Social Security statement at ssa.gov/myaccount shows your benefit at full retirement age. That is the most accurate figure to use."
            />
            {v.mode === "salary" && (
              <>
                <MoneyField label="Salary now" value={v.salary} onChange={st.bind("salary")} symbol="$" slider={{ min: 0, max: 200_000, step: 1_000, ends: ["$0", "$200k"] }} info={`Earnings above the ${usd(SS_2026.wageBase)} taxable maximum don't count.`} />
                <StepperField label="Years worked so far" value={v.worked} onChange={(n) => st.set("worked", Math.round(n))} step={1} min={0} max={50} unit="years" dp={0} info="Years you paid Social Security tax. We add the years until the age you stop working (under More options)." />
              </>
            )}
            {v.mode === "aime" && (
              <MoneyField label="Average indexed monthly earnings (AIME)" value={v.aime} onChange={st.bind("aime")} symbol="$" info="Your highest 35 years of earnings, indexed to wage growth, divided by 420 months." />
            )}
            {v.mode === "pia" && (
              <MoneyField label="Benefit at full retirement age" value={v.fra} onChange={st.bind("fra")} symbol="$" info="The monthly amount your Social Security statement shows at full retirement age." />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Age you stop working" value={v.stop} onChange={(n) => st.set("stop", Math.round(n))} step={1} min={40} max={75} unit="years" dp={0} optional info="Only used when you estimate from your salary. Each extra year of earnings can replace a low or zero year." />
            <StepperField label="Plan for benefits until age" value={v.lifeTo} onChange={(n) => st.set("lifeTo", Math.round(n))} step={1} min={70} max={100} unit="years" dp={0} optional info="Used for lifetime totals. A 65-year-old today lives to about 84 to 87 on average; many live much longer." />
            <SelectField label="Filing status in retirement" value={v.status} onChange={st.bind("status")} optional options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Other taxable income in retirement" value={v.other} onChange={st.bind("other")} symbol="$" optional info="Pensions, IRA and 401(k) withdrawals, wages and interest a year. Decides how much of your benefit is taxed. For a married couple, include your spouse's income and benefits." />
            <MoneyField label="Earnings if you work while claiming" value={v.earnings} onChange={st.bind("earnings")} symbol="$" optional info={`Before full retirement age, $1 of benefits is held back for every $2 you earn above ${usd(SS_2026.earningsTest.under)} (2026).`} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your benefit if you claim at ${v.claim}`}
        value={usd(chosen.monthly)}
        unit="a month"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Your full retirement age is <b>{fraLabel}</b>, when you would get <b>{usd(t.atFra.monthly)}</b>{" "}a month. Claiming at {v.claim} pays{" "}
            <b>{percent(chosen.factor, 1)}</b>{" "}of that, or <b>{usd(chosen.yearly)}</b>{" "}a year in today&apos;s dollars, rising each year with the
            cost-of-living adjustment.
          </>
        }
        badges={[`Full retirement age ${fraLabel}`, `At 62: ${usd(at62.monthly)}`, `At 70: ${usd(at70.monthly)}`]}
      />

      <Facts
        items={[
          { label: "At full retirement age", value: usd(t.atFra.monthly) },
          { label: "Claim at 62", value: usd(at62.monthly), tone: "warn" },
          { label: "Claim at 70", value: usd(at70.monthly), tone: "good" },
          { label: "62 vs 70 break-even", value: Number.isFinite(be62to70) ? `Age ${Math.floor(be62to70 / 12)}` : "Never" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Earnings record", value: sourceText },
          { label: "Formula", value: "2026 bend points ($1,286 and $7,749): 90%, 32% and 15%" },
          { label: "Dollars", value: "Today's dollars; COLAs (2.8% in 2026) keep pace with inflation" },
          { label: "Claiming", value: "On your birthday month at each age; your own retirement benefit only, not spousal or survivor benefits" },
          { label: "Tax", value: `Federal only, ${FILING_LABEL[v.status].toLowerCase()}, with ${usd(v.other)} of other income` },
        ]}
      />

      <ResultCard title="Your benefit at each claiming age" sub={`Monthly benefit in today's dollars. Full retirement age is ${fraLabel}.`}>
        <BarChart
          rows={t.rows.map((r) => ({
            label: `${r.age}`,
            note: percent(r.factor, 1),
            value: r.monthly,
            display: usd(r.monthly),
            current: r.months === claimMonths,
          }))}
        />
        <SplitBar
          segments={
            early
              ? [
                  { label: `Your benefit at ${v.claim}`, value: chosen.monthly, display: usd(chosen.monthly), color: "#0f9f6e" },
                  { label: "Given up by claiming early", value: Math.max(0, t.atFra.monthly - chosen.monthly), display: usd(Math.max(0, t.atFra.monthly - chosen.monthly)), color: "#f59e0b" },
                ]
              : [
                  { label: "Full benefit", value: t.atFra.monthly, display: usd(t.atFra.monthly), color: "#0f9f6e" },
                  { label: "Delayed retirement credits", value: Math.max(0, chosen.monthly - t.atFra.monthly), display: usd(Math.max(0, chosen.monthly - t.atFra.monthly)), color: "#5b1e6e" },
                ]
          }
        />
        <DataTable
          summary="See the full table"
          columns={["Claim at", "Share of full benefit", "A month", "A year", `Total to ${v.lifeTo}`]}
          rows={t.rows.map((r) => [`${r.age}`, percent(r.factor, 1), usd(r.monthly), usd(r.yearly), usd(r.lifetime)])}
        />
      </ResultCard>

      <ResultCard title="Break-even: when waiting pays off" sub="Total benefits received, from 62 to the age you plan for, in today's dollars.">
        <AreaChart
          ariaLabel="Total Social Security received by age for claims at 62, full retirement age and 70"
          series={[
            { key: "s70", label: "Claim at 70", color: "#0f9f6e", values: s70, fill: true },
            { key: "sfra", label: `Claim at ${fraWhole}`, color: "#5b1e6e", values: sFra },
            { key: "s62", label: "Claim at 62", color: "#f59e0b", values: s62, dashed: true },
          ]}
          xLabel={(i) => `${ages[i]}`}
          yFormat={usdShort}
          initial={ages.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any age."
          readout={(i) => (
            <>
              By <b>{ages[i]}</b>: claim at 62 <b>{usd(s62[i] ?? 0)}</b>, at {fraWhole} <b>{usd(sFra[i] ?? 0)}</b>, at 70 <b>{usd(s70[i] ?? 0)}</b>.
            </>
          )}
        />
        <Facts
          items={[
            { label: `62 vs ${fraLabel}`, value: beLabel(be62Fra) },
            { label: `${fraLabel} vs 70`, value: beLabel(beFra70) },
            { label: "62 vs 70", value: beLabel(be62to70) },
            { label: `Most in total to ${v.lifeTo}`, value: `Claim at ${best.age}` },
          ]}
        />
        <p className="footnote">
          Break-even is the age when the larger, later checks have made up for the years without them. Live past it and waiting pays more in total. It ignores
          investment returns on early checks and taxes.
        </p>
      </ResultCard>

      <ResultCard title="Tax on your benefit" sub={`Federal income tax, ${FILING_LABEL[v.status].toLowerCase()}.`}>
        <Facts
          items={[
            { label: "Provisional income", value: usd(tax.provisional) },
            { label: "Taxable part of benefits", value: usd(tax.taxable), note: chosen.yearly > 0 ? `${percent(tax.taxable / chosen.yearly)} of ${usd(chosen.yearly)}` : undefined },
            { label: "Extra federal tax a year", value: usd(tax.extra), tone: tax.extra > 0 ? "warn" : "good" },
            { label: "Benefit after that tax", value: usd(chosen.yearly - tax.extra) },
          ]}
        />
        <p className="footnote">
          Provisional income is your other income plus half your benefits. Above {v.status === "mfj" ? "$32,000" : v.status === "mfs" ? "$0" : "$25,000"}, up to 50% of
          benefits is taxable; above {v.status === "mfj" ? "$44,000" : v.status === "mfs" ? "$0" : "$34,000"}, up to 85%. We include the 2025 to 2028 senior
          deduction for anyone 65 or older. Some states tax benefits too.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Rules that change what you actually receive.">
        {withheld > 0 && (
          <Callout tone="warn" title={`Earnings test: about ${usd(withheld)} held back a year`}>
            Earning {usd(v.earnings)} while claiming at {v.claim}, before full retirement age, means $1 of benefits is withheld for every $2 above{" "}
            {usd(SS_2026.earningsTest.under)}. It isn&apos;t lost: your benefit is raised at full retirement age to credit the months withheld.
          </Callout>
        )}
        {early && (
          <Callout title="Claiming early is permanent">
            The reduction to {percent(chosen.factor, 1)} lasts for life, and it also lowers what a surviving spouse could get. You can withdraw an application within
            12 months by paying back what you received, once.
          </Callout>
        )}
        {v.mode === "salary" && totalYears < 35 && (
          <Callout tone="warn" title={`Only ${totalYears} years of earnings`}>
            The formula averages your top 35 years, so each missing year counts as zero. Working longer, even part-time, raises your benefit.
          </Callout>
        )}
        <Callout title="Married?">
          A spouse can get up to 50% of your full benefit at their own full retirement age if that is more than their own, and a surviving spouse keeps the
          larger of your two checks. That makes the higher earner&apos;s delay worth more.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate in today&apos;s dollars from the 2026 formula. Your Social Security statement is the official figure. Not financial advice.
      </p>
    </Studio>
  );
}
