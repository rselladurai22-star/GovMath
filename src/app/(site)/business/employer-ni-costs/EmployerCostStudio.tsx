"use client";

import { EMPLOYER, employeeCost } from "@/lib/business/company";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Relief = "none" | "under21" | "apprentice";

const SCHEMA = {
  salary: num(30_000, 0, 10_000_000),
  staff: num(1, 1, 10_000),
  bonus: num(0, 0, 10_000_000),
  pension: num(3, 0, 50),
  full: bool(false),
  sacrifice: num(0, 0, 50),
  relief: oneOf<Relief>("none", ["none", "under21", "apprentice"]),
  benefits: num(0, 0, 10_000_000),
  ea: bool(false),
};
const ADVANCED = ["bonus", "pension", "full", "sacrifice", "relief", "benefits", "ea"] as const;
const COLORS = { pay: "#5b1e6e", ni: "#e11d48", pension: "#0f9f6e", c1a: "#f59e0b" };

export default function EmployerCostStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    salary: v.salary,
    bonus: v.bonus,
    pensionPct: v.pension / 100,
    pensionOnFullPay: v.full,
    sacrificePct: v.sacrifice / 100,
    relief: v.relief,
    benefits: v.benefits,
    headcount: v.staff,
    employmentAllowance: v.ea,
  };
  const r = employeeCost(input);
  const gross = v.salary + v.bonus;
  const team = v.staff > 1;
  const ladder = [15_000, 25_000, 35_000, 50_000, 75_000, 100_000].map((x) => ({ x, c: employeeCost({ ...input, salary: x, bonus: 0, headcount: 1, employmentAllowance: false }) }));
  const maxCost = Math.max(...ladder.map((l) => l.c.costEach), 1);
  const belowAe = gross < EMPLOYER.aeTrigger;

  return (
    <Studio
      title="Your employee"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out the cost"
      onReset={st.reset}
      dock={{ label: "Cost a year", value: gbp(team ? r.teamCost : r.costEach) }}
      inputs={
        <>
          <InputGroup title="The job">
            <MoneyField label="Salary a year" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} />
            <StepperField label="Employees on this salary" value={v.staff} onChange={(n) => st.set("staff", Math.max(1, Math.round(n)))} step={1} min={1} max={10_000} unit="people" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Bonus or overtime a year" value={v.bonus} onChange={st.bind("bonus")} optional />
            <StepperField label="Employer pension contribution" value={v.pension} onChange={st.bind("pension")} step={0.5} min={0} max={50} unit="%" dp={1} optional hint="The legal minimum for auto-enrolment is 3% of qualifying earnings." />
            <Switch label="Pension on full pay, not qualifying earnings" checked={v.full} onChange={st.bind("full")} optional hint={`Qualifying earnings are pay between ${gbp(EMPLOYER.aeLower)} and ${gbp(EMPLOYER.aeUpper)}.`} />
            <StepperField label="Salary sacrifice into pension" value={v.sacrifice} onChange={st.bind("sacrifice")} step={1} min={0} max={50} unit="% of salary" dp={0} optional hint="The employee gives up salary and you pay it into their pension, saving employer NI." />
            <Segmented
              label="Employer NI relief"
              value={v.relief}
              onChange={st.bind("relief")}
              optional
              options={[
                { value: "none", label: "None" },
                { value: "under21", label: "Under 21", note: "No employer NI on pay up to £50,270 for employees under 21." },
                { value: "apprentice", label: "Apprentice", note: "No employer NI on pay up to £50,270 for apprentices under 25." },
              ]}
            />
            <MoneyField label="Benefits in kind a year" value={v.benefits} onChange={st.bind("benefits")} optional hint="Taxable value of a company car, health insurance and so on. Class 1A NI at 15%." />
            <Switch label="Claim the Employment Allowance" checked={v.ea} onChange={st.bind("ea")} optional hint="Up to £10,500 a year off your employer NI bill. Not for companies whose only employee is a director." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={team ? `Cost of ${v.staff} employees` : "True cost of this employee"}
        value={gbp(team ? r.teamCost : r.costEach)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            A <b>{gbp(gross)}</b> salary{v.bonus > 0 ? " and bonus" : ""} costs you <b>{gbp(r.costEach)}</b> a year: <b>{gbp(r.employerNi)}</b> employer National Insurance
            {r.pension > 0 ? (
              <>
                {" "}
                and <b>{gbp(r.pension)}</b> pension
              </>
            ) : null}{" "}
            on top of pay. That is <b>{percent(r.onCost, 1)}</b> more than the salary.
            {r.allowanceUsed > 0 ? (
              <>
                {" "}
                The Employment Allowance takes <b>{gbp(r.allowanceUsed)}</b> off the {team ? "team's" : ""} bill.
              </>
            ) : null}
          </>
        }
        badges={[`${gbp(r.costEach / 12)} a month`, `${percent(r.onCost, 1)} on-cost`, v.relief !== "none" ? "Employer NI relief" : "15% employer NI"]}
      />

      <Facts
        items={[
          { label: "Employer NI", value: gbp(r.employerNi), tone: "warn", note: v.relief === "none" ? "15% above £5,000" : "0% up to £50,270" },
          { label: "Employer pension", value: gbp(r.pension) },
          { label: "Cost a month", value: gbp(r.costEach / 12) },
          team ? { label: "Team NI after allowance", value: gbp(r.teamNi - r.allowanceUsed) } : { label: "On-cost", value: percent(r.onCost, 1) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Employer NI", value: "15% above £5,000 a year" },
          { label: "Pension", value: v.pension > 0 ? `${v.pension}% of ${v.full ? "full pay" : "qualifying earnings"}` : "None" },
          { label: "Employment Allowance", value: v.ea ? "Claimed" : "Not claimed" },
        ]}
      />

      {gross > 0 && (
        <ResultCard title="What one employee costs" sub="Pay plus everything on top.">
          <SplitBar
            segments={[
              { label: "Pay", value: r.pay, display: gbp(r.pay), color: COLORS.pay },
              ...(r.employerNi > 0 ? [{ label: "Employer NI", value: r.employerNi, display: gbp(r.employerNi), color: COLORS.ni }] : []),
              ...(r.pension > 0 ? [{ label: "Pension", value: r.pension, display: gbp(r.pension), color: COLORS.pension }] : []),
              ...(r.class1a > 0 ? [{ label: "Class 1A NI", value: r.class1a, display: gbp(r.class1a), color: COLORS.c1a }] : []),
            ]}
          />
          <Statement
            columns={["A year", "A month"]}
            rows={[
              { label: "Salary", values: [gbp(v.salary), gbp(v.salary / 12)] },
              ...(v.bonus > 0 ? [{ label: "Bonus or overtime", values: [gbp(v.bonus), gbp(v.bonus / 12)] }] : []),
              ...(r.sacrificed > 0 ? [{ label: "Salary sacrificed", values: [`−${gbp(r.sacrificed)}`, `−${gbp(r.sacrificed / 12)}`], kind: "deduction" as const }] : []),
              { label: "Employer NI", values: [gbp(r.employerNi), gbp(r.employerNi / 12)] },
              ...(r.pension > 0 ? [{ label: "Employer pension", values: [gbp(r.pension), gbp(r.pension / 12)] }] : []),
              ...(r.class1a > 0 ? [{ label: "Class 1A NI on benefits", values: [gbp(r.class1a), gbp(r.class1a / 12)] }] : []),
              { label: "Total cost", values: [gbp(r.costEach), gbp(r.costEach / 12)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {team && (
        <ResultCard title={`Your team of ${v.staff}`} sub="The Employment Allowance applies once across the whole payroll.">
          <Statement
            columns={["A year"]}
            rows={[
              { label: `${v.staff} × ${gbp(r.costEach)}`, values: [gbp(r.team)] },
              ...(r.allowanceUsed > 0 ? [{ label: "Employment Allowance", values: [`−${gbp(r.allowanceUsed)}`], kind: "deduction" as const }] : []),
              { label: "Total payroll cost", values: [gbp(r.teamCost)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Cost at other salaries" sub="One employee, your other settings, no Employment Allowance.">
        <Compare
          head={["Salary", "Total cost"]}
          rows={ladder.map(({ x, c }) => ({
            label: gbp(x),
            value: gbp(c.costEach),
            delta: `+${percent(c.onCost, 1)}`,
            deltaTone: "up",
            bar: c.costEach / maxCost,
            current: x === gross,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways to manage the cost.">
        {r.sacrificeNiSaving > 0 && (
          <Callout tone="good" title={`Salary sacrifice saves ${gbp(r.sacrificeNiSaving)} of employer NI`}>
            The employee also saves their own NI. Some employers pass part of their saving into the employee&apos;s pension.
          </Callout>
        )}
        {!v.ea && (
          <Callout title="Check the Employment Allowance">
            Most employers can claim up to £10,500 a year off employer NI, unless the only person paid is a single director. Claim it through your payroll software.
          </Callout>
        )}
        {belowAe ? (
          <Callout title="Below the auto-enrolment trigger">
            At under {gbp(EMPLOYER.aeTrigger)} a year you do not have to enrol them automatically, but they can ask to join, and you may still need to contribute.
          </Callout>
        ) : (
          <Callout title="Auto-enrolment applies">
            Earning over {gbp(EMPLOYER.aeTrigger)}, they must be enrolled in a workplace pension with at least 8% of qualifying earnings in total, of which you pay at least 3%.
          </Callout>
        )}
        <Callout title="Other costs of employing">
          Holiday pay, sick pay, recruitment, training, equipment and employer&apos;s liability insurance, which is a legal requirement, all add to the true cost.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 employer rates. Not tax advice.
      </p>
    </Studio>
  );
}
