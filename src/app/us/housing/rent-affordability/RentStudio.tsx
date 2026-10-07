"use client";

import { rentAffordability } from "@/lib/us/mortgage";
import { paycheck, stateNote } from "@/lib/us/pay";
import { STATES, stateByCode } from "@/lib/us/states";
import type { FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  income: num(60_000, 0, 100_000_000),
  pay: oneOf<"estimate" | "enter">("estimate", ["estimate", "enter"]),
  state: oneOf<string>("TX", CODES),
  status: oneOf<FilingStatus>("single", ["single", "mfj", "hoh"]),
  stateRate: num(4, 0, 20),
  takeHome: num(4_200, 0, 10_000_000),
  otherNeeds: num(700, 0, 1_000_000),
  debts: num(300, 0, 1_000_000),
  rent: num(1_800, 0, 1_000_000),
};
const ADVANCED = ["pay", "state", "status", "stateRate", "takeHome"] as const;

export default function RentStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const st8 = stateByCode(v.state);
  const asks = st8?.income.kind === "ask";
  const pc = paycheck({
    salary: v.income,
    frequency: "monthly",
    status: v.status,
    k401Pct: 0,
    rothPct: 0,
    section125: 0,
    children: 0,
    otherDependents: 0,
    state: v.state,
    stateRate: v.stateRate / 100,
    localRate: 0,
    extraWithholding: 0,
  });
  const takeHome = v.pay === "estimate" ? pc.net.period : v.takeHome;
  const r = rentAffordability(v.income, takeHome, v.otherNeeds, v.debts);
  const dtiRoom = Math.max(0, r.grossMonthly * 0.36 - v.debts);
  const rules = [
    { label: "30% of gross income", value: r.thirty },
    { label: "40× rule (income ÷ 40)", value: r.fortyTimes },
    { label: "50/30/20 budget", value: r.budget },
    { label: "36% all-debts line", value: dtiRoom },
  ];
  const lowest = rules.reduce((a, b) => (b.value < a.value ? b : a));
  const need = r.incomeFor(v.rent);
  const rentGross = r.grossMonthly > 0 ? v.rent / r.grossMonthly : 0;
  const rentNet = takeHome > 0 ? v.rent / takeHome : 0;
  const wants = takeHome * 0.3;
  const saving = takeHome * 0.2;
  const spare = Math.max(0, takeHome - r.comfortable - v.otherNeeds - wants - saving);

  return (
    <Studio
      title="Your rent budget"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my rent budget"
      onReset={st.reset}
      dock={{ label: "Comfortable rent", value: usd(r.comfortable) }}
      inputs={
        <>
          <InputGroup title="Your income">
            <MoneyField label="Income a year, before tax" symbol="$" value={v.income} onChange={st.bind("income")} slider={{ min: 15_000, max: 300_000, step: 1_000, ends: ["$15k", "$300k"] }} info="For roommates or a couple, enter everyone's income who will be on the lease." />
            <p className="footnote">
              Take-home pay: {usd(takeHome)} a month{v.pay === "estimate" ? ` (estimated for ${st8?.name ?? v.state})` : ""}. Change it under More options.
            </p>
          </InputGroup>
          <InputGroup title="Your other costs">
            <MoneyField label="Other essentials a month" symbol="$" value={v.otherNeeds} onChange={st.bind("otherNeeds")} info="Groceries, utilities, insurance, transportation, phone and childcare: the needs in a 50/30/20 budget, other than rent." />
            <MoneyField label="Debt payments a month" symbol="$" value={v.debts} onChange={st.bind("debts")} info="Car and student loans, credit card minimums and personal loans." />
          </InputGroup>
          <InputGroup title="Check a rent">
            <MoneyField label="Rent you are looking at" symbol="$" value={v.rent} onChange={st.bind("rent")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Take-home pay"
              optional
              value={v.pay}
              onChange={st.bind("pay")}
              options={[
                { value: "estimate", label: "Estimate it" },
                { value: "enter", label: "I'll enter it" },
              ]}
            />
            {v.pay === "estimate" ? (
              <>
                <SelectField label="State" optional value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} hint={stateNote(v.state)} />
                {asks && <StepperField label="State income tax, share of pay" optional value={v.stateRate} onChange={st.bind("stateRate")} step={0.25} min={0} max={20} unit="%" dp={2} />}
                <SelectField
                  label="Filing status"
                  optional
                  value={v.status}
                  onChange={st.bind("status")}
                  options={[
                    { value: "single", label: "Single" },
                    { value: "mfj", label: "Married filing jointly" },
                    { value: "hoh", label: "Head of household" },
                  ]}
                />
              </>
            ) : (
              <MoneyField label="Take-home pay a month" symbol="$" optional value={v.takeHome} onChange={st.bind("takeHome")} />
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Comfortable rent a month"
        value={usd(r.comfortable)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            On {usd(v.income)} a year, the 30% rule allows <b>{usd(r.thirty)}</b>{" "}and the 40× rule <b>{usd(r.fortyTimes)}</b>. Your budget allows <b>{usd(r.budget)}</b>{" "}after other
            essentials. The lowest, set by the <b>{lowest.label}</b>, is a rent you can comfortably afford: <b>{usd(r.comfortable)}</b>{" "}a month.
          </>
        }
        badges={[`Take-home ${usd(takeHome)} a month`, `${percent(takeHome > 0 ? r.comfortable / takeHome : 0, 0)} of take-home`, `Set by the ${lowest.label}`]}
      />

      <Facts
        items={[
          { label: "30% rule", value: usd(r.thirty) },
          { label: "40× rule", value: usd(r.fortyTimes) },
          { label: "50/30/20 budget", value: usd(r.budget) },
          { label: "All-debts line (36%)", value: usd(dtiRoom) },
        ]}
      />

      <Assumptions
        items={[
          {
            label: "Take-home pay",
            value:
              v.pay === "estimate"
                ? `${usd(takeHome)} a month: 2026 federal tax, FICA and ${st8?.name ?? v.state} tax, ${v.status === "mfj" ? "married filing jointly" : v.status === "hoh" ? "head of household" : "single"}, no pre-tax deductions`
                : `${usd(takeHome)} a month, as entered`,
          },
          { label: "50/30/20", value: "Needs (rent and other essentials) up to 50% of take-home pay" },
          { label: "All-debts line", value: "Rent plus debt payments up to 36% of gross income" },
          { label: "Not included", value: "Renters insurance, deposits, fees and moving costs" },
        ]}
      />

      <ResultCard title="Your month at this rent" sub="Take-home pay split the 50/30/20 way.">
        <SplitBar
          segments={[
            { label: "Rent", value: r.comfortable, display: usd(r.comfortable), color: "#16a34a" },
            { label: "Other essentials", value: v.otherNeeds, display: usd(v.otherNeeds), color: "#f59e0b" },
            { label: "Wants (30%)", value: wants, display: usd(wants), color: "#5b1e6e" },
            { label: "Savings and extra debt payments (20%)", value: saving, display: usd(saving), color: "#2e0a3a" },
            { label: "Spare", value: spare, display: usd(spare), color: "#94a3b8" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Each rule side by side" sub="Monthly rent each rule allows.">
        <Statement
          columns={["Rent a month", "A year"]}
          rows={[
            ...rules.map((x) => ({ label: x.label, values: [usd(x.value), usd(x.value * 12)] })),
            { label: "Comfortable (the lowest)", values: [usd(r.comfortable), usd(r.comfortable * 12)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title={`Can you afford ${usd(v.rent)}?`} sub="The income each rule needs for this rent.">
        <Facts
          items={[
            { label: "Income needed, 30% rule", value: usd(need.thirty), tone: v.income >= need.thirty ? "good" : "warn" },
            { label: "Income needed, 40× rule", value: usd(need.fortyTimes), tone: v.income >= need.fortyTimes ? "good" : "warn" },
            { label: "Share of gross pay", value: percent(rentGross, 0) },
            { label: "Share of take-home pay", value: percent(rentNet, 0) },
          ]}
        />
        <p className="footnote">
          {v.rent <= r.comfortable
            ? `${usd(v.rent)} fits within your comfortable rent.`
            : `${usd(v.rent)} is ${usd(v.rent - r.comfortable)} a month above your comfortable rent.`}{" "}
          Landlords using the 40× rule often accept a guarantor or co-signer with a higher income instead.
        </p>
      </ResultCard>

      {rentGross > 0.3 && (
        <Callout tone="warn" title="Over 30% of gross income">
          HUD counts households paying more than 30% of income on housing as cost-burdened, and more than 50% as severely cost-burdened. At {usd(v.rent)} you would be paying{" "}
          {percent(rentGross, 0)}.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        A guide, not a promise of approval. Landlords set their own income and credit rules.
      </p>
    </Studio>
  );
}
