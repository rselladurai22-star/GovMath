"use client";

import { tip } from "@/lib/us/pay";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, Chips, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { per, usd } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  bill: num(80, 0, 1_000_000),
  tax: num(0, 0, 100_000),
  pct: num(18, 0, 100),
  people: num(1, 1, 50),
  onTotal: bool(false),
  roundUp: bool(false),
};
const ADVANCED = ["onTotal", "roundUp"] as const;
const QUICK = [15, 18, 20, 22, 25];

export default function TipStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const people = Math.max(1, Math.round(v.people));
  const t = tip(v.bill, v.tax, v.pct / 100, people, v.onTotal, v.roundUp);
  const share = v.roundUp ? t.roundedPerPerson : t.perPerson;
  const paid = share * people;
  const tipPaid = v.roundUp ? t.effectiveTip : t.tip;
  const effectivePct = v.bill > 0 ? (tipPaid / v.bill) * 100 : 0;
  const many = people > 1;
  const table = [10, 15, 18, 20, 22, 25].map((p) => ({ p, r: tip(v.bill, v.tax, p / 100, people, v.onTotal, false) }));

  return (
    <Studio
      title="Your bill"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the tip"
      onReset={st.reset}
      dock={{ label: many ? "Each person pays" : "Total with tip", value: usd(many ? share : paid, true) }}
      inputs={
        <>
          <InputGroup title="The bill">
            <MoneyField label="Bill before tax" value={v.bill} onChange={st.bind("bill")} symbol="$" pence max={1_000_000} />
            <MoneyField label="Sales tax on the bill" value={v.tax} onChange={st.bind("tax")} symbol="$" pence max={100_000} optional info="The tax line on your check. Leave at $0 if your bill already includes it or you only want the tip." />
            <StepperField label="Tip" value={v.pct} onChange={st.bind("pct")} step={1} min={0} max={100} unit="%" dp={1} />
            <Chips label="Quick tip" value={QUICK.includes(v.pct) ? v.pct : null} onChange={(p) => st.set("pct", p)} options={QUICK.map((p) => ({ value: p, label: `${p}%` }))} />
            <StepperField label="Split between" value={people} onChange={(n) => st.set("people", Math.max(1, Math.round(n)))} step={1} min={1} max={50} unit="people" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Tip on the total after tax" checked={v.onTotal} onChange={st.bind("onTotal")} optional info="Etiquette guides usually suggest tipping on the bill before tax. Turn this on to tip on the bill plus tax." />
            <Switch label="Round each share up to the dollar" checked={v.roundUp} onChange={st.bind("roundUp")} optional info="Each person pays a whole number of dollars. The extra goes to the tip." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={many ? `Each of ${people} people pays` : "Total with tip"}
        value={usd(many ? share : paid, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            A <b>{v.pct}%</b>{" "}tip on {usd(v.onTotal ? v.bill + v.tax : v.bill, true)} {v.onTotal ? "(bill plus tax)" : "(bill before tax)"} is <b>{usd(t.tip, true)}</b>, so the total is <b>{usd(t.total, true)}</b>.
            {v.roundUp && share !== t.perPerson ? (
              <>
                {" "}
                Rounding up raises the tip to <b>{usd(tipPaid, true)}</b>, or {effectivePct.toFixed(1)}% of the bill.
              </>
            ) : null}
          </>
        }
        badges={[`Tip ${usd(tipPaid, true)}`, many ? `${usd(tipPaid / people, true)} tip each` : `${effectivePct.toFixed(1)}% of the bill`]}
      />

      <SplitBar
        segments={[
          { label: "Bill", value: v.bill, display: usd(v.bill, true), color: "#0f9f6e" },
          ...(v.tax > 0 ? [{ label: "Sales tax", value: v.tax, display: usd(v.tax, true), color: "#5b1e6e" }] : []),
          { label: "Tip", value: tipPaid, display: usd(tipPaid, true), color: "#f59e0b" },
        ]}
      />

      <Facts
        items={[
          { label: "Tip", value: usd(tipPaid, true) },
          { label: "Total", value: usd(paid, true) },
          { label: "Each person", value: usd(share, true) },
          { label: "Tip each", value: usd(tipPaid / people, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tip on", value: v.onTotal ? "The bill plus tax" : "The bill before tax" },
          { label: "Split", value: `Evenly between ${people} ${per(people, "people")}` },
          { label: "Rounding", value: v.roundUp ? "Each share up to the next dollar" : "To the cent" },
          { label: "Service charge", value: "None already on the bill" },
        ]}
      />

      <ResultCard title="Your bill at other tip rates" sub={many ? `Total and each person's share of ${people}.` : "Tip and total."}>
        <Statement
          columns={many ? ["Tip", "Total", "Each"] : ["Tip", "Total"]}
          rows={table.map(({ p, r }) => ({
            label: `${p}%`,
            values: many ? [usd(r.tip, true), usd(r.total, true), usd(r.perPerson, true)] : [usd(r.tip, true), usd(r.total, true)],
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you pay.">
        <Callout title="Check for a service charge">
          Some restaurants add a service charge or automatic gratuity, often for groups. If it is on the bill, you don&apos;t need to tip on top unless you want to.
        </Callout>
        <Callout title="For tipped workers">
          From 2025 to 2028, people in tipped jobs can deduct up to $25,000 of qualified tips on their federal return. See the{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Results are rounded to the cent.
      </p>
    </Studio>
  );
}
