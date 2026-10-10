"use client";

import { STATES, stateByCode } from "@/lib/us/states";
import { CA_SDI, stateTax } from "@/lib/us/state-tax-2026";
import { stateNote } from "@/lib/us/pay";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import { stateComparison } from "@/lib/us/withholding";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);
const NAME = (code: string) => stateByCode(code)?.name ?? code;

const SCHEMA = {
  income: num(75_000, 0, 100_000_000),
  state: oneOf<string>("CA", CODES),
  status: oneOf<FilingStatus>("single", STATUSES),
  deps: num(0, 0, 15),
  compare: oneOf<string>("TX", CODES),
  k401: num(0, 0, 1_000_000),
  local: num(0, 0, 10),
};
const ADVANCED = ["compare", "k401", "local"] as const;

const C = { keep: "#2a78d6", state: "#eda100", local: "#eb6834", sdi: "#4a3aa7" };

export default function StateTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const deps = Math.round(v.deps);
  const k401 = Math.min(v.k401, v.income);
  const taxable = v.income - k401;
  const r = stateTax({ code: v.state, wages: taxable, k401, status: v.status, dependents: deps });
  const sdi = v.state === "CA" ? v.income * CA_SDI : 0;
  const local = taxable * (v.local / 100);
  const total = r.tax + local;
  const rows = stateComparison(CODES, v.income, v.status, deps, k401);
  const rank = rows.findIndex((x) => x.code === v.state) + 1;
  const mine = rows.find((x) => x.code === v.state)!;
  const other = rows.find((x) => x.code === v.compare)!;
  const diff = mine.tax - other.tax;
  const taxed = rows.filter((x) => x.tax > 0);
  const median = taxed.length ? taxed[Math.floor(taxed.length / 2)].tax : 0;

  const ladder = [25_000, 50_000, 75_000, 100_000, 150_000, 250_000, 500_000].map((inc) => {
    const t = stateTax({ code: v.state, wages: Math.max(0, inc - k401), k401, status: v.status, dependents: deps }).tax;
    return { inc, t };
  });
  const maxLadder = Math.max(1, ...ladder.map((l) => l.t));
  const top10 = rows.slice(-10).reverse();
  const maxTop = Math.max(1, top10[0]?.tax ?? 1);

  return (
    <Studio
      title="Your state income tax"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my state tax"
      onReset={st.reset}
      dock={{ label: `${NAME(v.state)} income tax`, value: usd(r.tax) }}
      inputs={
        <>
          <InputGroup title="Your income and state">
            <MoneyField label="Wages and salary for 2026" symbol="$" value={v.income} onChange={st.bind("income")} slider={{ min: 0, max: 400_000, step: 1_000, ends: ["$0", "$400k"] }} />
            <SelectField label="State you live and work in" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} info={stateNote(v.state)} />
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <StepperField label="Dependents" value={v.deps} onChange={(n) => st.set("deps", Math.round(n))} step={1} min={0} max={15} unit="people" dp={0} info="Children and other dependents. Many states give an exemption or credit for each." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField label="Compare with" value={v.compare} onChange={st.bind("compare")} optional options={STATES.map((s) => ({ value: s.code, label: s.name }))} info="Another state, for example one you might move to." />
            <MoneyField label="Traditional 401(k) and pre-tax deductions" symbol="$" value={v.k401} onChange={st.bind("k401")} optional info="Most states don't tax these. Pennsylvania taxes 401(k) contributions." />
            <StepperField label="Local income tax" value={v.local} onChange={st.bind("local")} step={0.1} min={0} max={10} unit="%" dp={2} optional info="City or county income tax, for example New York City, Philadelphia, Detroit, Ohio cities, Maryland counties or Indiana counties." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`${NAME(v.state)} income tax, 2026`}
        value={usd(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.kind === "none" ? (
            <>
              {NAME(v.state)} has no income tax on wages, so you pay <b>$0</b>{" "}on <b>{usd(v.income)}</b>. It is one of the cheapest states for income tax, tied in first place.
            </>
          ) : (
            <>
              On <b>{usd(v.income)}</b>{" "}of wages, {NAME(v.state)} takes <b>{usd(r.tax)}</b>, an effective rate of <b>{percent(mine.effective, 2)}</b>. That ranks <b>{rank} of 51</b>{" "}(1 is cheapest), and the next $1,000 you earn costs{" "}
              <b>{usd(mine.marginal * 1_000)}</b>{" "}in state tax.
            </>
          )
        }
        badges={[`Effective ${percent(mine.effective, 2)}`, `Marginal ${percent(mine.marginal, 2)}`, r.kind === "none" ? "No income tax" : r.kind === "flat" ? "Flat tax" : "Graduated brackets"]}
      />

      <Facts
        items={[
          { label: "State taxable income", value: usd(r.taxable) },
          { label: "State income tax", value: usd(r.tax) },
          { label: `Versus ${NAME(v.compare)}`, value: diff === 0 ? "Same" : `${diff > 0 ? "+" : "−"}${usd(Math.abs(diff))}`, tone: diff > 0 ? "warn" : "good" },
          { label: "Rank (1 = lowest)", value: `${rank} of 51` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 state brackets, standard deductions, exemptions and credits" },
          { label: "Income", value: "Wages only, after pre-tax 401(k) and cafeteria plan deductions" },
          { label: "Filing status", value: `${FILING_LABEL[v.status]}${v.status === "hoh" ? " (states' single brackets)" : v.status === "mfs" ? " (half the joint brackets)" : ""}` },
          { label: "Left out", value: "Credits such as state EITCs, Connecticut and New York high-income recapture, Missouri and Oregon federal tax subtractions" },
          { label: "Local taxes", value: v.local > 0 ? `${v.local}% local income tax added` : "Not included unless you add a rate" },
        ]}
      />

      <ResultCard title="Your wages and state taxes" sub="What the state (and city or county) takes from a year of pay.">
        <SplitBar
          segments={[
            { label: "Left after state and local tax", value: Math.max(0, v.income - total - sdi), display: usd(v.income - total - sdi), color: C.keep },
            { label: `${NAME(v.state)} income tax`, value: r.tax, display: usd(r.tax), color: C.state },
            { label: "Local income tax", value: local, display: usd(local), color: C.local },
            { label: "California SDI (1.3%)", value: sdi, display: usd(sdi), color: C.sdi },
          ].filter((s, i) => i === 0 || s.value > 0)}
        />
      </ResultCard>

      {r.kind !== "none" && (
        <ResultCard title={`How ${NAME(v.state)} works it out`} sub="From wages to state tax.">
          <Statement
            columns={["2026"]}
            rows={[
              { label: "Wages", values: [usd(v.income)] },
              ...(k401 > 0 ? [{ label: v.state === "PA" ? "401(k) (taxed in Pennsylvania)" : "Pre-tax deductions", values: [v.state === "PA" ? usd(0) : `−${usd(k401)}`], kind: "deduction" as const }] : []),
              ...(r.deduction > 0 ? [{ label: "State standard deduction", values: [`−${usd(r.deduction)}`], kind: "deduction" as const }] : []),
              ...(r.exemptions > 0 ? [{ label: "Personal and dependent exemptions", values: [`−${usd(r.exemptions)}`], kind: "deduction" as const }] : []),
              { label: "State taxable income", values: [usd(r.taxable)], kind: "total" },
              ...(r.credits > 0 ? [{ label: "Personal and dependent credits", values: [`−${usd(r.credits)}`], kind: "deduction" as const }] : []),
              { label: "State income tax", values: [usd(r.tax)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title={`${NAME(v.state)} versus ${NAME(v.compare)}`} sub="The same wages, filing status and dependents.">
        <Compare
          head={["State", "Income tax"]}
          rows={[mine, other]
            .filter((x, i, a) => a.findIndex((y) => y.code === x.code) === i)
            .map((x) => ({ label: `${NAME(x.code)} (${percent(x.effective, 2)} effective)`, value: usd(x.tax), bar: x.tax / Math.max(1, mine.tax, other.tax), current: x.code === v.state }))}
        />
        <p className="footnote">
          {diff > 0
            ? `${NAME(v.compare)} would save you ${usd(diff)} a year in income tax. Sales and property taxes, housing and pay differ too.`
            : diff < 0
              ? `${NAME(v.state)} costs ${usd(-diff)} less a year in income tax.`
              : "Both states take the same income tax on these wages."}
        </p>
      </ResultCard>

      <ResultCard title={`${NAME(v.state)} tax at other incomes`} sub="Same filing status and dependents.">
        <Compare
          head={["Wages", "State tax"]}
          rows={ladder.map((l) => ({ label: usd(l.inc), value: usd(l.t), delta: l.inc > 0 ? `${percent(l.t / l.inc, 1)} effective` : undefined, bar: l.t / maxLadder, current: l.inc === v.income }))}
        />
      </ResultCard>

      <ResultCard title="The 10 highest at your income" sub={`On ${usd(v.income)} of wages. The median state with an income tax takes ${usd(median)}.`}>
        <Compare head={["State", "Income tax"]} rows={top10.map((x) => ({ label: NAME(x.code), value: usd(x.tax), bar: x.tax / maxTop, current: x.code === v.state }))} />
      </ResultCard>

      <ResultCard title="All 50 states and DC" sub={`On ${usd(v.income)}, ${FILING_LABEL[v.status].toLowerCase()}, cheapest first.`}>
        <DataTable
          summary="Show every state"
          columns={["Rank", "State", "Income tax", "Effective rate", "Tax on next $1,000"]}
          rows={rows.map((x, i) => [i + 1, NAME(x.code), usd(x.tax), percent(x.effective, 2), usd(x.marginal * 1_000)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="State income tax in 2026.">
        <Callout title={NAME(v.state)}>{stateNote(v.state)}</Callout>
        <Callout title="Where you live, where you work">
          You generally pay income tax to the state you live in on all your income, and to a state you work in on the pay you earn there; your home state then usually gives a credit for tax paid to the other state. Some neighbors have
          reciprocal agreements so only your home state taxes your pay.
        </Callout>
        <Callout title="Deducting state tax on your federal return">
          If you itemize, state and local income (or sales) and property taxes are deductible up to the $40,400 SALT cap in 2026. With the standard deduction, state tax does not lower your federal tax.
        </Callout>
        {r.tax > 0 && (
          <Callout title="Moving to save tax">
            Nine states have no income tax on wages. Most make up for it with higher sales or property taxes, so compare the whole cost of living, not just this figure.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026 wages. Not tax advice.
      </p>
    </Studio>
  );
}
