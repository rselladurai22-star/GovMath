"use client";

import { hicbc } from "@/lib/benefits/family";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  children: num(2, 1, 15),
  income: num(70_000, 0, 10_000_000),
  pension: num(0, 0, 10_000_000),
  gift: num(0, 0, 10_000_000),
  partner: num(0, 0, 10_000_000),
  weeks: num(52, 1, 52),
};
const ADVANCED = ["pension", "gift", "partner", "weeks"] as const;
const COLORS = { keep: "#0f9f6e", charge: "#e11d48" };
const POINTS = 31;

export default function HicbcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  // The charge falls on whichever partner has the higher adjusted net income.
  const mine = hicbc({ children: v.children, income: v.income, pension: v.pension, giftAid: v.gift, weeks: v.weeks });
  const partnerHigher = v.partner > mine.adjustedNetIncome;
  const r = partnerHigher ? hicbc({ children: v.children, income: v.partner, pension: 0, giftAid: 0, weeks: v.weeks }) : mine;
  const incomes = Array.from({ length: POINTS }, (_, i) => 55_000 + i * 1_000);
  const keepLine = incomes.map((x) => hicbc({ children: v.children, income: x, pension: 0, giftAid: 0, weeks: v.weeks }).keep);
  const pensionCost = mine.pensionToAvoid * 0.8;

  return (
    <Studio
      title="Your income and family"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my tax charge"
      onReset={st.reset}
      dock={{ label: "Tax charge", value: gbp(r.charge, true) }}
      inputs={
        <>
          <InputGroup title="Your situation">
            <StepperField label="Children you get Child Benefit for" value={v.children} onChange={(n) => st.set("children", Math.max(1, Math.round(n)))} step={1} min={1} max={15} unit="children" dp={0} />
            <MoneyField label="Your total income a year" value={v.income} onChange={st.bind("income")} big slider={{ min: 50_000, max: 100_000, step: 500, ends: ["£50k", "£100k"] }} hint="Salary, bonus, self-employed profit, rent, savings interest and dividends, before tax. After any salary sacrifice." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Personal pension contributions (gross)" value={v.pension} onChange={st.bind("pension")} optional hint="Paid from your take-home pay into a personal or workplace pension using relief at source, including the 20% tax relief." />
            <MoneyField label="Gift Aid donations (gross)" value={v.gift} onChange={st.bind("gift")} optional hint="What you gave plus the 25% the charity claims." />
            <MoneyField label="Partner's adjusted net income" value={v.partner} onChange={st.bind("partner")} optional hint="The charge is paid by whichever of you has the higher income." />
            <StepperField label="Weeks of Child Benefit this tax year" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} step={1} min={1} max={52} unit="weeks" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={partnerHigher ? "Your partner's tax charge" : "Your tax charge"}
        value={gbp(r.charge, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.band === "none" ? (
            <>
              Adjusted net income of <b>{gbp(r.adjustedNetIncome)}</b> is not over £60,000, so there is no charge. You keep all <b>{gbp(r.benefit, true)}</b> of Child Benefit.
            </>
          ) : r.band === "full" ? (
            <>
              Adjusted net income of <b>{gbp(r.adjustedNetIncome)}</b> is £80,000 or more, so the charge takes back all <b>{gbp(r.benefit, true)}</b> of Child Benefit.
            </>
          ) : (
            <>
              Adjusted net income of <b>{gbp(r.adjustedNetIncome)}</b> is <b>{gbp(r.adjustedNetIncome - 60_000)}</b> over £60,000, so <b>{percent(r.share, 0)}</b> of your{" "}
              <b>{gbp(r.benefit, true)}</b> Child Benefit is taken back. You keep <b>{gbp(r.keep, true)}</b>.
            </>
          )
        }
        badges={[`${percent(r.share, 0)} clawed back`, `${gbp(r.adjustedNetIncome)} adjusted net income`, partnerHigher ? "Partner pays" : "You pay"]}
      />

      <Facts
        items={[
          { label: "Child Benefit", value: gbp(r.benefit, true) },
          { label: "Charge", value: gbp(r.charge, true), tone: r.charge > 0 ? "warn" : "good" },
          { label: "You keep", value: gbp(r.keep, true), tone: "good" },
          { label: "Tax on your next £1,000", value: percent(mine.marginalRate, 1), note: "Income Tax, NI and the charge" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Employee", value: "Income Tax and NI at rUK rates" },
          { label: "Charge", value: "1% for every £200 over £60,000" },
          { label: "Child Benefit", value: `${v.weeks} weeks for ${v.children} ${v.children === 1 ? "child" : "children"}` },
        ]}
      />

      {r.benefit > 0 && (
        <ResultCard title="Your Child Benefit after the charge" sub="What you keep and what goes back to HMRC.">
          <SplitBar
            segments={[
              ...(r.keep > 0 ? [{ label: "You keep", value: r.keep, display: gbp(r.keep, true), color: COLORS.keep }] : []),
              ...(r.charge > 0 ? [{ label: "Tax charge", value: r.charge, display: gbp(r.charge, true), color: COLORS.charge }] : []),
            ]}
          />
          <Statement
            columns={["A year"]}
            rows={[
              { label: "Total income", values: [gbp(v.income)] },
              ...(v.pension > 0 ? [{ label: "Pension contributions", values: [`−${gbp(v.pension)}`], kind: "deduction" as const }] : []),
              ...(v.gift > 0 ? [{ label: "Gift Aid", values: [`−${gbp(v.gift)}`], kind: "deduction" as const }] : []),
              { label: "Your adjusted net income", values: [gbp(mine.adjustedNetIncome)], kind: "total" },
              ...(partnerHigher ? [{ label: "Partner's adjusted net income (higher)", values: [gbp(v.partner)] }] : []),
              { label: `Charge: ${percent(r.share, 0)} of ${gbp(r.benefit, true)}`, values: [gbp(r.charge, true)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Child Benefit kept at each income" sub={`${v.children} ${v.children === 1 ? "child" : "children"}, a full year.`}>
        <AreaChart
          ariaLabel="Child Benefit kept after the charge, by adjusted net income"
          series={[{ key: "keep", label: "Child Benefit kept", color: COLORS.keep, values: keepLine, fill: true }]}
          xLabel={(i) => gbpShort(incomes[i] ?? 0)}
          yFormat={gbpShort}
          initial={Math.min(POINTS - 1, Math.max(0, Math.round((r.adjustedNetIncome - 55_000) / 1_000)))}
          hint="Drag across the chart, or use the arrow keys, to read any income."
          readout={(i) => (
            <>
              At <b>{gbp(incomes[i] ?? 0)}</b>: you keep <b>{gbp(keepLine[i] ?? 0, true)}</b>.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways to reduce or manage the charge.">
        {!partnerHigher && mine.pensionToAvoid > 0 && mine.pensionToAvoid < 20_000 && (
          <Callout tone="good" title={`A ${gbp(mine.pensionToAvoid)} pension contribution would remove the charge`}>
            Paid into a personal pension from take-home pay, it costs you about {gbp(pensionCost)} after basic-rate relief, plus higher-rate relief through your tax return. It also saves the{" "}
            {gbp(mine.charge, true)} charge. Salary sacrifice works too.
          </Callout>
        )}
        {mine.adjustedNetIncome > 60_000 && mine.adjustedNetIncome < 80_000 && (
          <Callout tone="warn" title={`Each extra £1,000 costs you ${gbp(mine.marginalRate * 1000)}`}>
            Between £60,000 and £80,000 the charge adds to Income Tax and NI, so a pay rise or bonus is worth less than it looks.
          </Callout>
        )}
        <Callout title="Register and pay">
          If you have to pay the charge, register for Self Assessment, or ask HMRC to collect it through your tax code if you are employed. Register by 5 October after the end of the tax
          year.
        </Callout>
        {r.band === "full" && (
          <Callout title="Consider opting out of payments, not the claim">
            You can stop the payments to avoid the charge but keep the claim, so the parent at home still gets National Insurance credits.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rules. Not tax advice.
      </p>
    </Studio>
  );
}
