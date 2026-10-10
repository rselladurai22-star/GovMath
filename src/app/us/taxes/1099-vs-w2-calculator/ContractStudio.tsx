"use client";

import { breakEvenRate, contractorValue, equivalentSalary, w2Value } from "@/lib/us/estate-property";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import { STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  salary: num(100_000, 0, 10_000_000),
  rate: num(75, 0, 5_000),
  billableHours: num(32, 0, 80),
  weeks: num(46, 0, 52),
  status: oneOf<FilingStatus>("single", STATUSES),
  state: oneOf<string>("TX", CODES),
  premiumShare: num(1_440, 0, 100_000),
  matchPct: num(4, 0, 25),
  otherBenefits: num(0, 0, 1_000_000),
  expenses: num(5_000, 0, 10_000_000),
  premium: num(9_325, 0, 200_000),
  retirement: num(4_000, 0, 1_000_000),
  qbi: bool(true),
};
const ADVANCED = ["premiumShare", "matchPct", "otherBenefits", "expenses", "premium", "retirement", "qbi"] as const;

const C = { keep: "#2a78d6", se: "#4a3aa7", federal: "#eb6834", state: "#eda100", health: "#1baf7a", expenses: "#9aa1a9" };

export default function ContractStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const w2In = { salary: v.salary, premiumShare: v.premiumShare, matchPct: v.matchPct, otherBenefits: v.otherBenefits, status: v.status, state: v.state };
  const cIn = { rate: v.rate, billableHours: v.billableHours, weeks: v.weeks, expenses: v.expenses, premium: v.premium, retirement: v.retirement, qbi: v.qbi, status: v.status, state: v.state };
  const w = w2Value(w2In);
  const c = contractorValue(cIn);
  const be = breakEvenRate(w2In, cIn);
  const eq = equivalentSalary(w2In, cIn);
  const diff = c.net - w.net;
  const salaryHourly = v.salary / 2_080;
  const multiple = Number.isFinite(be) && salaryHourly > 0 ? be / salaryHourly : 0;
  const rates = Array.from({ length: 13 }, (_, i) => Math.max(5, Math.round((v.rate * (0.6 + i * 0.1)) / 5) * 5));
  const uniqueRates = Array.from(new Set(rates));
  const contractorCash = Math.max(0, c.net - c.retirement);

  return (
    <Studio
      title="1099 contract vs W-2 job"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare the two offers"
      onReset={st.reset}
      dock={{ label: "Break-even contract rate", value: Number.isFinite(be) ? usd(be, true) : "None" }}
      inputs={
        <>
          <InputGroup title="The two offers">
            <MoneyField label="W-2 salary" symbol="$" value={v.salary} onChange={st.bind("salary")} slider={{ min: 20_000, max: 300_000, step: 1_000, ends: ["$20k", "$300k"] }} />
            <MoneyField label="1099 hourly rate" symbol="$" pence value={v.rate} onChange={st.bind("rate")} max={5_000} slider={{ min: 10, max: 300, step: 1, ends: ["$10", "$300"] }} />
            <StepperField
              label="Billable hours a week"
              value={v.billableHours}
              onChange={st.bind("billableHours")}
              step={1}
              min={0}
              max={80}
              unit="hours"
              dp={1}
              info="Hours a client pays for. Finding work, invoicing, bookkeeping and training are unbilled, so many contractors bill 25 to 35 hours of a 40-hour week."
            />
            <StepperField
              label="Weeks billed a year"
              value={v.weeks}
              onChange={(n) => st.set("weeks", Math.round(n))}
              step={1}
              min={0}
              max={52}
              unit="weeks"
              dp={0}
              info="52 less your vacation, holidays, sick days and gaps between contracts. An employee is paid for these; a contractor is not."
            />
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <SelectField label="State" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField
              label="Job: your share of health premiums a year"
              symbol="$"
              optional
              value={v.premiumShare}
              onChange={st.bind("premiumShare")}
              info="KFF's 2025 survey: workers paid about 16% of a $9,325 single premium and 26% of a $26,993 family premium. Taken pre-tax."
            />
            <StepperField label="Job: 401(k) match" optional value={v.matchPct} onChange={st.bind("matchPct")} step={0.5} min={0} max={25} unit="% of salary" dp={1} info="What the employer adds. We assume you contribute enough to get all of it." />
            <MoneyField label="Job: other benefits a year" symbol="$" optional value={v.otherBenefits} onChange={st.bind("otherBenefits")} info="HSA contributions, bonus, stipends, tuition help or anything else you would value in cash." />
            <MoneyField label="Contract: business expenses a year" symbol="$" optional value={v.expenses} onChange={st.bind("expenses")} info="Laptop, software, insurance, accounting, a home office and other costs an employer would cover." />
            <MoneyField label="Contract: health insurance a year" symbol="$" optional value={v.premium} onChange={st.bind("premium")} info="The full premium you would buy yourself. Deductible as self-employed health insurance." />
            <MoneyField label="Contract: retirement savings a year" symbol="$" optional value={v.retirement} onChange={st.bind("retirement")} info="SEP IRA or solo 401(k) money to replace the match. It lowers income tax, not self-employment tax." />
            <Switch label="Claim the 20% QBI deduction" optional checked={v.qbi} onChange={st.bind("qbi")} info="Most sole proprietors qualify. It phases out above $201,750 of taxable income ($403,500 joint) for specified service businesses." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Contract rate that matches the job"
        value={Number.isFinite(be) ? usd(be, true) : "None"}
        unit={Number.isFinite(be) ? "an hour" : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          Number.isFinite(be) ? (
            <>
              To match the {usd(v.salary)} job you need <b>{usd(be, true)}</b>{" "}an hour billing {v.billableHours} hours a week for {v.weeks} weeks
              {multiple > 0 ? <> ({multiple.toFixed(2)}× the job&rsquo;s {usd(salaryHourly, true)} an hour)</> : null}. At {usd(v.rate, true)}, the contract is worth{" "}
              <b>{usd(Math.abs(diff))} a year {diff >= 0 ? "more" : "less"}</b>.
            </>
          ) : (
            <>With no billable hours, no contract rate can match the job. Enter the hours and weeks you expect to bill.</>
          )
        }
        badges={[`Job ${usd(w.net)} a year`, `Contract ${usd(c.net)} a year`, diff >= 0 ? "Contract pays more" : "Job pays more", `Equal to a ${usd(eq)} salary`]}
      />

      <Facts
        items={[
          { label: "Job: what you keep, with benefits", value: usd(w.net) },
          { label: "Contract: what you keep", value: usd(c.net) },
          { label: "Difference", value: `${diff >= 0 ? "+" : "−"}${usd(Math.abs(diff))}`, tone: diff >= 0 ? "good" : "warn" },
          { label: "Contract equals a salary of", value: usd(eq) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: `2026, ${FILING_LABEL[v.status].toLowerCase()}, standard deduction, no other income` },
          { label: "Contract time", value: `${v.billableHours} billable hours × ${v.weeks} weeks = ${c.hoursWorkedYear.toLocaleString("en-US")} hours` },
          { label: "Job benefits", value: `${v.matchPct}% match, ${usd(v.premiumShare)} premium share; paid time off is in the salary` },
          { label: "Contract costs", value: `${usd(v.expenses)} expenses, ${usd(v.premium)} health insurance, ${usd(v.retirement)} retirement savings` },
          { label: "What we compare", value: "Cash after tax and premiums, plus retirement money (the match or your own savings)" },
          { label: "Not included", value: "State unemployment and disability benefits, life and disability insurance, local income tax" },
        ]}
      />

      <ResultCard title="Where the contract money goes" sub={`${usd(c.gross)} billed in a year.`}>
        <SplitBar
          segments={[
            { label: "You keep", value: contractorCash, display: usd(contractorCash), color: C.keep },
            { label: "Retirement savings", value: c.retirement, display: usd(c.retirement), color: "#4a1659" },
            { label: "Self-employment tax", value: c.seTax, display: usd(c.seTax), color: C.se },
            { label: "Federal income tax", value: c.federal, display: usd(c.federal), color: C.federal },
            { label: "State income tax", value: c.state, display: usd(c.state), color: C.state },
            { label: "Health insurance", value: c.premium, display: usd(c.premium), color: C.health },
            { label: "Business expenses", value: c.expenses, display: usd(c.expenses), color: C.expenses },
          ]}
          caption="Self-employment tax is both halves of Social Security and Medicare: 15.3% of 92.35% of profit."
        />
      </ResultCard>

      <ResultCard title="Side by side" sub="A year of each, in 2026.">
        <Statement
          columns={["W-2 job", "1099 contract"]}
          rows={[
            { label: "Pay", values: [usd(w.salary), usd(c.gross)] },
            { label: "Business expenses", values: ["$0", `−${usd(c.expenses)}`], kind: "deduction" },
            { label: "Health insurance you pay", values: [`−${usd(w.premiumShare)}`, `−${usd(c.premium)}`], kind: "deduction" },
            { label: "Social Security and Medicare", values: [`−${usd(w.fica)}`, `−${usd(c.seTax)}`], kind: "deduction" },
            { label: "Federal income tax", values: [`−${usd(w.federal)}`, `−${usd(c.federal)}`], kind: "deduction" },
            { label: "State income tax", values: [`−${usd(w.state)}`, `−${usd(c.state)}`], kind: "deduction" },
            { label: "Employer 401(k) match and other benefits", values: [usd(w.match + w.otherBenefits), "$0"] },
            { label: "What you keep, with retirement money", values: [usd(w.net), usd(c.net)], kind: "total" },
          ]}
        />
        {c.qbi > 0 && <p className="footnote">The contract&rsquo;s income tax includes a {usd(c.qbi)} QBI deduction.</p>}
      </ResultCard>

      <ResultCard title="Other contract rates" sub="Same hours, costs and job.">
        <DataTable
          summary="What you keep at each hourly rate"
          columns={["Hourly rate", "Billed a year", "You keep", "Versus the job"]}
          rows={uniqueRates.map((rate) => {
            const x = contractorValue({ ...cIn, rate });
            const d = x.net - w.net;
            return [usd(rate), usd(x.gross), usd(x.net), `${d >= 0 ? "+" : "−"}${usd(Math.abs(d))}`];
          })}
        />
      </ResultCard>

      {Number.isFinite(be) && multiple > 0 && (
        <Callout title={`The multiple here is ${multiple.toFixed(2)}×`}>
          A rule of thumb says a contract rate should be 1.25 to 1.5 times the salary divided by 2,080 hours. With {v.billableHours} billable hours for {v.weeks} weeks and these costs,
          you need {multiple.toFixed(2)}×. Unbilled time and health insurance move it most. The share of benefits in pay is about {percent(13.79 / 46.15)} for private-sector workers
          (BLS, December 2025).
        </Callout>
      )}

      <Callout tone="warn" title="Contractor or employee is not your choice alone">
        The IRS and the Department of Labor look at who controls the work, not the label on the contract. If a business sets your hours and tools and you work only for it, you
        may be an employee. Form SS-8 asks the IRS to decide.
      </Callout>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate for comparing offers, not tax advice. Real benefits and premiums vary a lot by employer and state.
      </p>
    </Studio>
  );
}
