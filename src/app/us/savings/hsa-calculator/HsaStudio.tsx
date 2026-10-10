"use client";

import { HSA_2026, hsaGrowth, hsaLimit, hsaTax, type HsaCoverage } from "@/lib/us/investing";
import { STATES, stateByCode } from "@/lib/us/states";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const CODES = STATES.map((s) => s.code);
const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const COVERAGE = ["self", "family"] as const;

const SCHEMA = {
  coverage: oneOf<HsaCoverage>("self", COVERAGE),
  age: num(40, 18, 100),
  wages: num(75_000, 0, 10_000_000),
  state: oneOf<string>("TX", CODES),
  max: bool(true),
  amount: num(2_000, 0, 100_000),
  employer: num(0, 0, 100_000),
  status: oneOf<FilingStatus>("single", STATUSES),
  payroll: bool(true),
  months: num(12, 1, 12),
  start: num(0, 0, 10_000_000),
  medical: num(1_500, 0, 1_000_000),
  ret: num(6, -10, 15),
  until: num(65, 19, 100),
  infl: num(2.5, 0, 10),
};
const ADVANCED = ["status", "payroll", "months", "start", "medical", "ret", "until", "infl"] as const;

export default function HsaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const limit = hsaLimit(v.coverage, v.age, v.months);
  const t = hsaTax({
    coverage: v.coverage,
    age: v.age,
    months: v.months,
    wages: v.wages,
    status: v.status,
    state: v.state,
    dependents: 0,
    contribution: v.max ? Math.max(0, limit - Math.min(v.employer, limit)) : v.amount,
    employer: v.employer,
    payroll: v.payroll,
  });
  const stateName = stateByCode(v.state)?.name ?? v.state;
  const untilAge = Math.max(v.age, v.until);
  const years = untilAge - v.age;
  const g = hsaGrowth(v.start, t.total, v.medical, v.ret, v.age, untilAge, v.infl, v.infl);
  const ages = [v.age, ...g.years.map((y) => y.age)];
  const bal = [Math.max(0, v.start), ...g.years.map((y) => y.balance)];
  const real = [Math.max(0, v.start), ...g.years.map((y) => y.real)];
  const step = years > 30 ? 5 : years > 12 ? 2 : 1;
  const rows = g.years.filter((y, i) => (i + 1) % step === 0 || i === g.years.length - 1);
  const wantedMedical = Array.from({ length: years }, (_, y) => v.medical * Math.pow(1 + v.infl / 100, y)).reduce((a, b) => a + b, 0);
  const coversMedical = g.spent >= wantedMedical - 1;

  return (
    <Studio
      title="Your health savings account"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my HSA"
      onReset={st.reset}
      dock={{ label: "Tax saved in 2026", value: usd(t.saved) }}
      inputs={
        <>
          <InputGroup title="Your plan">
            <RadioGroup
              label="HDHP coverage"
              value={v.coverage}
              onChange={st.bind("coverage")}
              options={[
                { value: "self", label: "Self-only" },
                { value: "family", label: "Family" },
              ]}
              info={`Family means your high-deductible plan covers at least one other person. In 2026 the plan's deductible must be at least ${usd(HSA_2026.hdhpMinDeductible.self)} (self-only) or ${usd(HSA_2026.hdhpMinDeductible.family)} (family).`}
            />
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={18} max={100} unit="years" dp={0} info="From 55 you can add a $1,000 catch-up contribution." />
            <MoneyField label="Annual wages" value={v.wages} onChange={st.bind("wages")} symbol="$" slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} />
            <SelectField label="State you live in" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} info="California and New Jersey tax HSA contributions and growth on the state return." />
          </InputGroup>
          <InputGroup title="Contributions">
            <Switch label="Contribute the 2026 maximum" checked={v.max} onChange={st.bind("max")} info="The limit covers your money and your employer's together." />
            {!v.max && <MoneyField label="You contribute this year" value={v.amount} onChange={st.bind("amount")} symbol="$" slider={{ min: 0, max: 10_000, step: 50, ends: ["$0", "$10k"] }} />}
            <MoneyField label="Your employer puts in" value={v.employer} onChange={st.bind("employer")} symbol="$" info="Employer contributions are tax-free to you and count toward the yearly limit." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField label="Filing status" value={v.status} onChange={st.bind("status")} optional options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <Switch label="Paid through payroll" checked={v.payroll} onChange={st.bind("payroll")} optional info="Contributions taken from your paycheck through a cafeteria plan also skip Social Security and Medicare tax. Money you put in yourself is deducted on Form 8889 and saves income tax only." />
            <StepperField label="Months with HDHP coverage in 2026" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={1} max={12} unit="months" dp={0} optional info="The limit is prorated by month. Under the last-month rule, coverage on December 1 can allow the full year's limit if you stay covered through 2027." />
            <MoneyField label="HSA balance now" value={v.start} onChange={st.bind("start")} symbol="$" optional />
            <MoneyField label="Medical costs paid from the HSA a year" value={v.medical} onChange={st.bind("medical")} symbol="$" optional info="Deductibles, copays, prescriptions, dental and vision costs you pay from the account. They rise with inflation each year." />
            <StepperField label="Investment return a year" value={v.ret} onChange={st.bind("ret")} step={0.5} min={-10} max={15} unit="%" dp={1} optional info="After fees. Many HSAs pay little on cash; investing the balance in funds can earn more but can also fall." />
            <StepperField label="Keep contributing until age" value={v.until} onChange={(n) => st.set("until", Math.round(n))} step={1} min={19} max={100} unit="years" dp={0} optional info="Contributions must stop once you enroll in Medicare, usually at 65." />
            <StepperField label="Inflation" value={v.infl} onChange={st.bind("infl")} step={0.25} min={0} max={10} unit="%" dp={2} optional info="Raises your medical costs each year and shows the balance in today's dollars. Contributions stay at this year's amount." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Tax you save in 2026"
        value={usd(t.saved)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          t.yours > 0 ? (
            <>
              Putting <b>{usd(t.yours)}</b> into your HSA saves <b>{usd(t.federal)}</b> of federal income tax
              {t.fica > 0 ? <>, <b>{usd(t.fica)}</b> of Social Security and Medicare tax</> : null}
              {t.state > 0 ? <> and <b>{usd(t.state)}</b> of {stateName} tax</> : null}. So it really costs you <b>{usd(t.netCost)}</b>.
              {t.employer > 0 ? <> Your employer adds <b>{usd(t.employer)}</b> on top, tax-free.</> : null}
            </>
          ) : (
            <>
              {t.employer > 0
                ? `Your employer's ${usd(t.employer)} uses up your whole ${usd(limit)} limit, so there is no room for your own contributions.`
                : "Enter a contribution to see the tax it saves."}
            </>
          )
        }
        badges={[`2026 limit ${usd(limit)}`, `${percent(t.rate, 1)} saved per dollar`, years > 0 ? `${usd(g.balance)} at ${untilAge}` : "No years left to invest"]}
      />

      <Facts
        items={[
          { label: "Your contribution", value: usd(t.yours) },
          { label: "Employer contribution", value: usd(t.employer), tone: t.employer > 0 ? "good" : undefined },
          { label: "Tax saved", value: usd(t.saved), tone: "good" },
          { label: `Balance at ${untilAge}`, value: usd(g.balance) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Limit", value: `${usd(limit)} for ${v.coverage === "self" ? "self-only" : "family"} coverage${v.age >= 55 ? ", including the $1,000 catch-up" : ""}${v.months < 12 ? `, ${v.months} of 12 months` : ""}` },
          { label: "Federal tax", value: `2026 brackets, ${FILING_LABEL[v.status].toLowerCase()}, standard deduction, wages as your only income` },
          { label: "Payroll tax", value: v.payroll ? "Saved: contributions go through a cafeteria plan" : "Not saved: you contribute directly and deduct it" },
          { label: "State tax", value: t.stateTaxed ? `${stateName} does not allow the HSA deduction` : `${stateName} 2026 rules, no dependents` },
          { label: "Growth", value: `${v.ret}% a year after fees; ${usd(v.medical)} a year of medical costs paid from the account, rising ${v.infl}% a year` },
        ]}
      />

      <ResultCard title="What your contribution really costs" sub="Each dollar you put in, split into the tax it saves and what comes out of your pocket.">
        <SplitBar
          segments={[
            { label: "Your real cost", value: Math.max(0, t.netCost), display: usd(t.netCost), color: "#94a3b8" },
            { label: "Federal income tax saved", value: t.federal, display: usd(t.federal), color: "#0f9f6e" },
            { label: "Social Security and Medicare saved", value: t.fica, display: usd(t.fica), color: "#5b1e6e" },
            { label: "State tax saved", value: t.state, display: usd(t.state), color: "#f59e0b" },
          ]}
        />
        {t.overLimit > 0.5 && (
          <Callout tone="warn" title={`${usd(t.overLimit)} is over the limit`}>
            Your contributions and your employer&apos;s can&apos;t total more than {usd(limit)} in 2026. Excess contributions face a 6% excise tax each year they stay in the account unless you take them out (with any earnings) by the tax filing deadline.
          </Callout>
        )}
        {t.stateTaxed && (
          <Callout tone="warn" title={`${stateName} taxes HSA money`}>
            {stateName} doesn&apos;t follow the federal HSA rules: contributions are added back on your state return and interest, dividends and gains in the account are taxed by the state each year. The federal and payroll tax savings still apply.
          </Callout>
        )}
        {!v.payroll && (
          <Callout title="Contributing through payroll saves more">
            If your employer offers payroll HSA contributions, using them would also save about {usd(t.yours * 0.0765)} of Social Security and Medicare tax on the same amount (7.65% up to the wage base).
          </Callout>
        )}
        {v.age >= 65 && (
          <Callout tone="warn" title="Medicare ends new contributions">
            Once you enroll in any part of Medicare you can&apos;t contribute to an HSA, and Part A can be backdated up to six months when you sign up late. You can still spend the balance tax-free on medical costs, including Medicare premiums.
          </Callout>
        )}
      </ResultCard>

      {years > 0 && (
        <ResultCard title={`Your HSA by age ${untilAge}`} sub="Contributions in, medical costs out, the rest invested.">
          <AreaChart
            ariaLabel="HSA balance by age"
            series={[
              { key: "bal", label: "Balance", color: "#0f9f6e", values: bal, fill: true },
              { key: "real", label: "In today's dollars", color: "#94a3b8", values: real, dashed: true },
            ]}
            xLabel={(i) => `${ages[i] ?? ""}`}
            yFormat={usdShort}
            initial={ages.length - 1}
            hint="Drag across the chart, or use the arrow keys, to read any age."
            readout={(i) => (
              <>
                At <b>{ages[i]}</b>: balance <b>{usd(bal[i] ?? 0)}</b>, worth <b>{usd(real[i] ?? 0)}</b> in today&apos;s dollars.
              </>
            )}
          />
          <Facts
            items={[
              { label: "Put in", value: usd(g.deposits) },
              { label: "Spent on medical costs", value: usd(g.spent) },
              { label: "Investment growth", value: usd(g.growth), tone: g.growth >= 0 ? "good" : "bad" },
              { label: `At ${untilAge}`, value: usd(g.balance) },
            ]}
          />
          {!coversMedical && (
            <Callout tone="warn" title="Some years the account runs dry">
              Your medical costs are larger than the balance in some years, so part of them would come from your own pocket.
            </Callout>
          )}
          <DataTable
            summary="Show the yearly table"
            columns={["Age", "Put in so far", "Spent so far", "Balance", "Today's dollars"]}
            rows={rows.map((y) => [y.age, usd(y.deposits), usd(y.spent), usd(y.balance), usd(y.real)])}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Getting the most from an HSA.">
        <Callout title="The receipts strategy">
          There is no deadline for paying yourself back. If you can afford to pay medical bills from your checking account and keep the receipts, the HSA money can stay invested for years and you can reimburse yourself tax-free later for any expense incurred after the account was opened.
        </Callout>
        <Callout title="After 65">
          From 65 you can take money out for anything without the 20% penalty; it is taxed as income, like a traditional IRA. Spent on medical costs, it stays tax-free at any age. Before 65, non-medical withdrawals are taxed and pay the 20% penalty.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate of 2026 tax with wages as your only income. Investment returns are not guaranteed. Not tax advice.
      </p>
    </Studio>
  );
}
