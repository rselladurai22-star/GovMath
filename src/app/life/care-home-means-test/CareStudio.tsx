"use client";

import { CARE_2026, careMeansTest, FNC_2026, spendDown, type Nation } from "@/lib/life/care";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { duration, gbp, gbpShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  nation: oneOf<Nation>("england", ["england", "scotland", "wales", "ni"]),
  savings: num(60_000, 0, 10_000_000),
  home: num(0, 0, 10_000_000),
  homeIgnored: bool(false),
  income: num(260, 0, 5_000),
  fee: num(1_300, 0, 10_000),
  councilRate: num(1_000, 0, 10_000),
  nursing: bool(false),
};
const ADVANCED = ["home", "homeIgnored", "councilRate", "nursing"] as const;
const MONTHS = 10 * 12;
const STEP = 3;
const shortMonths = (m: number) => `${Math.floor(m / 12)}y${m % 12 ? ` ${m % 12}m` : ""}`;

export default function CareStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const rules = CARE_2026[v.nation];
  const input = { nation: v.nation, savings: v.savings, home: v.home, homeDisregarded: v.homeIgnored, income: v.income, fee: v.fee, councilRate: v.councilRate, nursing: v.nursing };
  const r = careMeansTest(input);
  const weeks = Math.round((MONTHS * 52) / 12);
  const path = spendDown(input, weeks);
  const monthly = Array.from({ length: MONTHS / STEP + 1 }, (_, k) => path[Math.min(path.length - 1, Math.round((k * STEP * 52) / 12))]);
  const capitalSeries = monthly.map((p) => p.capital);
  const months = r.weeksToLimit === Infinity ? Infinity : (r.weeksToLimit * 12) / 52;
  const youWeekly = r.selfFunder ? r.selfFundCost : r.you;
  const fromSavings = Math.max(0, youWeekly - (r.selfFunder ? v.income : Math.max(0, v.income - rules.allowance)));

  return (
    <Studio
      title="Care and money"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check who pays"
      onReset={st.reset}
      dock={{ label: "You pay a week", value: gbp(youWeekly, true) }}
      inputs={
        <>
          <InputGroup title="Where and how much">
            <SelectField
              label="Where the care home is"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england", label: "England" },
                { value: "scotland", label: "Scotland" },
                { value: "wales", label: "Wales" },
                { value: "ni", label: "Northern Ireland" },
              ]}
            />
            <MoneyField label="Savings and investments" value={v.savings} onChange={st.bind("savings")} hint="Including shares, bonds and second properties." />
            <MoneyField label="Weekly income" value={v.income} onChange={st.bind("income")} pence hint="State Pension, other pensions and most benefits." />
            <MoneyField label="Care home fee a week" value={v.fee} onChange={st.bind("fee")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Value of your home" value={v.home} onChange={st.bind("home")} optional hint="Counted after 12 weeks in permanent care, unless disregarded." />
            <Switch label="A partner or qualifying relative still lives there" checked={v.homeIgnored} onChange={st.bind("homeIgnored")} optional hint="Such as a relative aged 60 or over, or one who is disabled." />
            <MoneyField label="Council's usual rate a week" value={v.councilRate} onChange={st.bind("councilRate")} optional hint="Ask the council. A dearer home needs a top-up." />
            <Switch label="Nursing care" checked={v.nursing} onChange={st.bind("nursing")} optional hint={v.nation === "england" ? `NHS-funded nursing care pays ${gbp(FNC_2026.standard, true)} a week.` : "Affects free nursing care where it applies."} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.selfFunder ? "You pay in full" : "You pay a week"}
        value={gbp(youWeekly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.selfFunder ? (
            <>
              With <b>{gbp(r.capital)}</b> of capital, over the <b>{gbp(rules.upper)}</b> limit in {rules.label}, you pay the fee yourself
              {r.stateCare > 0 ? <>, less <b>{gbp(r.stateCare, true)}</b> a week of state help</> : null}. Your capital falls by about <b>{gbp(r.burn, true)}</b> a week
              {months !== Infinity ? <> and reaches the limit in about <b>{duration(Math.round(months))}</b></> : null}.
            </>
          ) : (
            <>
              The council funds your care. You pay <b>{gbp(r.you, true)}</b> a week from income{r.tariff > 0 ? <> and tariff income of <b>{gbp(r.tariff)}</b></> : null}, keeping{" "}
              <b>{gbp(rules.allowance, true)}</b> a week for personal expenses. The council pays <b>{gbp(r.council, true)}</b>.
              {r.topUp > 0 ? <> A top-up of <b>{gbp(r.topUp, true)}</b> a week is needed for a home above the council&apos;s rate.</> : null}
            </>
          )
        }
        badges={[`${rules.label} limit ${gbp(rules.upper)}`, r.selfFunder ? "Self-funding" : "Council-funded", r.tariff > 0 ? `Tariff ${gbp(r.tariff)} a week` : "No tariff income"]}
      />

      <Facts
        items={[
          { label: "Capital counted", value: gbp(r.capital) },
          { label: "You pay a week", value: gbp(youWeekly, true) },
          { label: "From savings a week", value: gbp(fromSavings, true), tone: fromSavings > 0 ? "warn" : undefined },
          { label: "Council pays", value: gbp(r.council, true), tone: r.council > 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Limits", value: rules.tariff ? `${gbp(rules.lower)} to ${gbp(rules.upper)}` : `${gbp(rules.upper)}, no tariff` },
          { label: "Personal allowance", value: `${gbp(rules.allowance, true)} a week` },
          { label: "Home", value: v.home > 0 ? (v.homeIgnored ? "Disregarded" : "Counted") : "None entered" },
          { label: "Year", value: "2026/27 rates" },
        ]}
      />

      <ResultCard title="Who pays the weekly fee" sub={`${gbp(v.fee, true)} a week.`}>
        <Statement
          columns={["A week"]}
          rows={[
            { label: "Care home fee", values: [gbp(v.fee, true)] },
            ...(r.stateCare > 0 ? [{ label: v.nation === "scotland" ? "Free personal and nursing care" : "NHS-funded nursing care", values: [gbp(r.stateCare, true)] }] : []),
            { label: "You pay", values: [gbp(youWeekly, true)], kind: "total" as const },
            ...(r.council > 0 ? [{ label: "Council pays", values: [gbp(r.council, true)] }] : []),
            ...(r.topUp > 0 ? [{ label: "Top-up by family or others", values: [gbp(r.topUp, true)] }] : []),
          ]}
        />
        <SplitBar
          segments={[
            { label: "You", value: youWeekly, display: gbp(youWeekly, true), color: "#5b1e6e" },
            ...(r.council > 0 ? [{ label: "Council", value: r.council, display: gbp(r.council, true), color: "#16a34a" }] : []),
            ...(r.stateCare > 0 ? [{ label: "NHS or state", value: r.stateCare, display: gbp(r.stateCare, true), color: "#0ea5e9" }] : []),
            ...(r.topUp > 0 ? [{ label: "Top-up", value: r.topUp, display: gbp(r.topUp, true), color: "#f59e0b" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Your capital over 10 years" sub="Assuming fees and income stay the same.">
        <AreaChart
          ariaLabel="Capital over time"
          series={[{ key: "cap", label: "Capital", color: "#5b1e6e", values: capitalSeries, fill: true }]}
          xLabel={(i) => shortMonths(i * STEP)}
          yFormat={gbpShort}
          initial={0}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => {
            const p = monthly[i];
            if (!p) return null;
            return (
              <>
                After <b>{i === 0 ? "0 months" : duration(i * STEP)}</b>: capital <b>{gbp(p.capital)}</b>, paying <b>{gbp(p.youPay, true)}</b> a week{p.council > 0 ? <>, council <b>{gbp(p.council, true)}</b></> : null}.
              </>
            );
          }}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Protecting your money.">
        {r.selfFunder && (
          <Callout title="Ask for an assessment before you reach the limit">
            Contact the council about three months before your capital is expected to fall to {gbp(rules.upper)}, so funding can start on time.
          </Callout>
        )}
        {v.home > 0 && !v.homeIgnored && (
          <Callout title="You may not have to sell your home straight away">
            The home is ignored for the first 12 weeks of permanent care. After that, a deferred payment agreement lets the council lend against it, with the loan repaid when the home is sold.
          </Callout>
        )}
        <Callout title="Check for NHS Continuing Healthcare">
          If your needs are mainly health needs, the NHS may pay the whole fee, whatever your savings. Ask for an assessment.
        </Callout>
        <Callout title="Attendance Allowance continues for self-funders">
          If you pay your own fees, you can keep Attendance Allowance. The <a href="/benefits/attendance-allowance">Attendance Allowance calculator</a> shows the rates.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 limits. Councils&apos; assessments can differ. Not financial advice.
      </p>
    </Studio>
  );
}
