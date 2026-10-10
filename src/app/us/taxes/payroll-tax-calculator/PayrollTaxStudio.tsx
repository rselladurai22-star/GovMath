"use client";

import { employerCost, FUTA, FUTA_CREDIT_REDUCTION, HEALTH_2025, SUTA_2026, SUTA_FALLBACK_RATE, type EmployerInput } from "@/lib/us/credits-payroll";
import { STATES, stateByCode } from "@/lib/us/states";
import { US_2026 } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, per, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const CODES = STATES.map((s) => s.code);
const COMPARE = ["TX", "FL", "CA", "NY", "PA", "IL", "NJ", "WA"];

const SCHEMA = {
  pay: oneOf<"salary" | "hourly">("salary", ["salary", "hourly"]),
  salary: num(50_000, 0, 100_000_000),
  hourly: num(20, 0, 100_000),
  hours: num(40, 0, 80),
  state: oneOf<string>("TX", CODES),
  staff: num(1, 1, 10_000),
  custom: bool(false),
  sutaRate: num(2.7, 0, 20),
  sutaBase: num(9_000, 0, 1_000_000),
  benefits: num(0, 0, 1_000_000),
  match: num(0, 0, 100),
  comp: num(0, 0, 50),
  other: num(0, 0, 20),
  pto: num(0, 0, 100),
  exempt: bool(false),
};
const ADVANCED = ["custom", "sutaRate", "sutaBase", "benefits", "match", "comp", "other", "pto", "exempt"] as const;

const COLORS = { wages: "#2a78d6", ss: "#4a3aa7", medicare: "#e87ba4", futa: "#eb6834", suta: "#eda100", benefits: "#1baf7a", match: "#1baf7a", comp: "#e34948", other: "#9aa1a9" };

function stateSuta(code: string) {
  const s = SUTA_2026[code];
  return { rate: s?.newRate ?? SUTA_FALLBACK_RATE, base: s?.base ?? FUTA.wageBase, industry: !s || s.newRate === null };
}

export default function PayrollTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const hours = v.pay === "hourly" ? v.hours : 40;
  const wages = v.pay === "hourly" ? v.hourly * v.hours * 52 : v.salary;
  const def = stateSuta(v.state);
  const sutaRate = v.custom ? v.sutaRate / 100 : def.rate;
  const sutaBase = v.custom ? v.sutaBase : def.base;
  const reduction = FUTA_CREDIT_REDUCTION[2026][v.state] ?? 0;
  const base: Omit<EmployerInput, "sutaRate" | "sutaBase" | "futaReduction"> = {
    wages,
    hours,
    weeks: 52,
    benefits: v.benefits,
    matchPct: v.match / 100,
    workersCompPct: v.comp / 100,
    otherPct: v.other / 100,
    paidDaysOff: v.pto,
    futaExempt: v.exempt,
  };
  const r = employerCost({ ...base, sutaRate, sutaBase, futaReduction: reduction });
  const staff = Math.max(1, Math.round(v.staff));
  const state = stateByCode(v.state);
  const fica = r.socialSecurity + r.medicare;

  const compare = COMPARE.map((code) => {
    const s = stateSuta(code);
    const x = employerCost({ ...base, sutaRate: s.rate, sutaBase: s.base, futaReduction: FUTA_CREDIT_REDUCTION[2026][code] ?? 0 });
    return { code, name: stateByCode(code)?.name ?? code, taxes: x.taxes };
  });
  if (!COMPARE.includes(v.state)) compare.push({ code: v.state, name: state?.name ?? v.state, taxes: r.taxes });
  const maxTax = Math.max(1, ...compare.map((c) => c.taxes));

  const segments = [
    { label: "Wages", value: r.wages, display: usd(r.wages), color: COLORS.wages },
    { label: "Social Security (6.2%)", value: r.socialSecurity, display: usd(r.socialSecurity), color: COLORS.ss },
    { label: "Medicare (1.45%)", value: r.medicare, display: usd(r.medicare), color: COLORS.medicare },
    { label: "Federal unemployment (FUTA)", value: r.futa, display: usd(r.futa), color: COLORS.futa },
    { label: "State unemployment (SUTA)", value: r.suta, display: usd(r.suta), color: COLORS.suta },
    { label: "Health and other benefits", value: r.benefits, display: usd(r.benefits), color: COLORS.benefits },
    { label: "401(k) match", value: r.match, display: usd(r.match), color: COLORS.match },
    { label: "Workers' compensation", value: r.workersComp, display: usd(r.workersComp), color: COLORS.comp },
    { label: "Other payroll taxes", value: r.other, display: usd(r.other), color: COLORS.other },
  ].filter((s, i) => i === 0 || s.value > 0);

  const line = (label: string, year: number, kind?: "deduction" | "total", swatch?: string) => ({
    label,
    kind,
    swatch,
    values: [usd(year), usd(year / 12), r.paidHours > 0 ? usd(year / r.paidHours, true) : "–", ...(staff > 1 ? [usd(year * staff)] : [])],
  });

  return (
    <Studio
      title="Your employee's cost"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the cost"
      onReset={st.reset}
      dock={{ label: "Total cost a year", value: usd(r.total * staff) }}
      inputs={
        <>
          <InputGroup title="The job">
            <RadioGroup
              label="Pay type"
              value={v.pay}
              onChange={st.bind("pay")}
              options={[
                { value: "salary", label: "Salary" },
                { value: "hourly", label: "Hourly" },
              ]}
            />
            {v.pay === "salary" ? (
              <MoneyField label="Salary a year" symbol="$" value={v.salary} onChange={st.bind("salary")} slider={{ min: 0, max: 250_000, step: 1_000, ends: ["$0", "$250k"] }} />
            ) : (
              <>
                <MoneyField label="Hourly rate" symbol="$" pence value={v.hourly} onChange={st.bind("hourly")} />
                <StepperField label="Hours a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={80} unit="hours" dp={1} />
              </>
            )}
            <SelectField label="State where they work" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} />
            <StepperField label="Employees on this pay" value={v.staff} onChange={(x) => st.set("staff", Math.max(1, Math.round(x)))} step={1} min={1} max={100} unit="people" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch
              label="Use my own state unemployment rate"
              checked={v.custom}
              onChange={st.bind("custom")}
              optional
              info={`We use ${state?.name ?? "the state"}'s 2026 new employer rate (${percent(def.rate, 2)}${def.industry ? ", an assumed rate: this state sets new employer rates by industry" : ""}) on the first ${usd(def.base)}. Your state sends your own rate each year.`}
            />
            {v.custom && (
              <>
                <StepperField label="State unemployment rate" value={v.sutaRate} onChange={st.bind("sutaRate")} step={0.1} min={0} max={20} unit="%" dp={3} optional />
                <MoneyField label="State taxable wage base" symbol="$" value={v.sutaBase} onChange={st.bind("sutaBase")} optional />
              </>
            )}
            <MoneyField
              label="Health and other benefits a year"
              symbol="$"
              value={v.benefits}
              onChange={st.bind("benefits")}
              optional
              info={`The employer's share of premiums. The average single plan cost ${usd(HEALTH_2025.singlePremium)} in 2025, of which employers paid about ${usd(HEALTH_2025.singlePremium - HEALTH_2025.singleWorker)} (KFF).`}
            />
            <StepperField label="401(k) match" value={v.match} onChange={st.bind("match")} step={0.5} min={0} max={25} unit="% of pay" dp={1} optional />
            <StepperField label="Workers' compensation" value={v.comp} onChange={st.bind("comp")} step={0.1} min={0} max={20} unit="% of pay" dp={2} optional info="Set by your insurer by job class: often under 1% for office work, much more for construction." />
            <StepperField
              label="Other employer payroll taxes"
              value={v.other}
              onChange={st.bind("other")}
              step={0.1}
              min={0}
              max={10}
              unit="% of pay"
              dp={2}
              optional
              info="State disability or paid family leave paid by the employer, local payroll taxes, state surcharges."
            />
            <StepperField label="Paid days off a year" value={v.pto} onChange={st.bind("pto")} step={1} min={0} max={60} unit="days" dp={0} optional info="Vacation, holidays and sick days: paid but not worked. Raises the cost per hour worked." />
            <Switch label="Exempt from FUTA" checked={v.exempt} onChange={st.bind("exempt")} optional info="Charities under section 501(c)(3) do not pay FUTA." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={staff > 1 ? `Total cost a year, ${staff} employees` : "Total cost of the employee a year"}
        value={usd(r.total * staff)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Paying <b>{usd(wages)}</b>{" "}in wages{state ? ` in ${state.name}` : ""} costs you about <b>{usd(r.total)}</b>{" "}a year per employee: <b>{usd(r.taxes)}</b>{" "}in employer payroll
            taxes{r.benefits + r.match + r.workersComp > 0 ? ` and ${usd(r.benefits + r.match + r.workersComp)} in benefits and insurance` : ""}. That is{" "}
            <b>{usd(r.perPaidHour, true)}</b>{" "}for each paid hour.
          </>
        }
        badges={[`${percent(r.overhead, 1)} on top of wages`, `${usd(r.taxes)} employer taxes`, `${usd(r.perWorkedHour, true)} per hour worked`]}
      />

      <Facts
        items={[
          { label: "Employer Social Security and Medicare", value: usd(fica) },
          { label: "FUTA (federal unemployment)", value: usd(r.futa) },
          { label: "SUTA (state unemployment)", value: usd(r.suta) },
          { label: "Cost per paid hour", value: usd(r.perPaidHour, true), note: `Wage ${usd(r.hourlyWage, true)}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Year", value: "2026 rates, a full year of employment from January" },
          { label: "Social Security", value: `6.2% up to ${usd(US_2026.socialSecurity.wageBase)}; Medicare 1.45% on all wages` },
          { label: "FUTA", value: `${percent(r.futaRate, 2)} on the first $7,000 (6.0% less the 5.4% credit${reduction > 0 ? `, less a ${percent(reduction, 1)} credit reduction` : ""})` },
          { label: "SUTA", value: `${percent(sutaRate, 3)} on the first ${usd(sutaBase)}${v.custom ? " (your figures)" : def.industry ? " (assumed: this state sets new employer rates by industry)" : " (2026 new employer base rate, U.S. Department of Labor)"}` },
          { label: "Hours", value: `${hours} paid hours a week, 52 weeks` },
          { label: "Not included", value: "Recruiting, training, equipment, office space and payroll software" },
        ]}
      />

      <ResultCard title="Where the money goes" sub="Wages plus everything an employer pays on top, per employee a year.">
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="The cost, line by line" sub={staff > 1 ? `Per employee and for all ${staff}.` : "Per year, per month and per paid hour."}>
        <Statement
          columns={["Year", "Month", "Per paid hour", ...(staff > 1 ? [`All ${staff}`] : [])]}
          rows={[
            line("Wages", r.wages),
            line("Social Security (6.2%)", r.socialSecurity, undefined, COLORS.ss),
            line("Medicare (1.45%)", r.medicare, undefined, COLORS.medicare),
            line("FUTA", r.futa, undefined, COLORS.futa),
            line("SUTA", r.suta, undefined, COLORS.suta),
            ...(r.other > 0 ? [line("Other payroll taxes", r.other, undefined, COLORS.other)] : []),
            ...(r.benefits > 0 ? [line("Health and other benefits", r.benefits, undefined, COLORS.benefits)] : []),
            ...(r.match > 0 ? [line("401(k) match", r.match, undefined, COLORS.match)] : []),
            ...(r.workersComp > 0 ? [line("Workers' compensation", r.workersComp, undefined, COLORS.comp)] : []),
            line("Total cost", r.total, "total", COLORS.wages),
          ]}
        />
      </ResultCard>

      <ResultCard title="Employer payroll taxes by state" sub={`The same ${usd(wages)} of wages, at each state's 2026 new employer unemployment rate.`}>
        <Compare
          head={["State", "Employer taxes a year"]}
          rows={compare.map((c) => ({ label: c.name, value: usd(c.taxes), bar: c.taxes / maxTax, current: c.code === v.state }))}
        />
        <p className="footnote">Social Security and Medicare are the same everywhere; the difference is state unemployment tax and any FUTA credit reduction.</p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Rules that change the real bill.">
        {reduction > 0 && (
          <Callout tone="warn" title={`${state?.name ?? "This state"} FUTA credit reduction`}>
            The state has not repaid federal loans for unemployment benefits, so employers there get a smaller FUTA credit. For 2025 the reduction was 1.2%; the Department of Labor
            lists a possible {percent(reduction, 1)} for 2026, confirmed after November 10, 2026. It is paid with Form 940 by February 1, 2027.
          </Callout>
        )}
        {def.industry && !v.custom && (
          <Callout title="Your state sets the rate by industry">
            {state?.name} gives new employers the average rate for their industry, so we assumed {percent(SUTA_FALLBACK_RATE, 1)}. Turn on your own rate under More options when you
            have your notice.
          </Callout>
        )}
        <Callout title="The employee pays FICA too">
          You also withhold 7.65% from the employee&rsquo;s pay ({usd(Math.min(wages, US_2026.socialSecurity.wageBase) * 0.062 + wages * 0.0145)} a year here) and pay it over with your own share. That is
          the employee&rsquo;s cost, not yours; see the <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>.
        </Callout>
        <Callout title="Contractors cost less in tax, but carry risk">
          You do not pay payroll taxes on a 1099 contractor, but treating an employee as a contractor can lead to back taxes and penalties. The test is how much control you have
          over the work, not what the contract says.
        </Callout>
        <p className="footnote">
          {staff} {per(staff, "employees")} at this pay: {usd(r.taxes * staff)} of employer payroll taxes a year.
        </p>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Check your state&rsquo;s rate notice. Not tax or legal advice.
      </p>
    </Studio>
  );
}
