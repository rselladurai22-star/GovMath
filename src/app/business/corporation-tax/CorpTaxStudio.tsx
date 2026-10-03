"use client";

import { corporationTaxFull } from "@/lib/business/company";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  profit: num(100_000, 0, 1_000_000_000),
  yearEnd: date("2027-03-31"),
  associated: num(0, 0, 50),
  months: num(12, 1, 12),
  losses: num(0, 0, 1_000_000_000),
  pension: num(0, 0, 1_000_000_000),
  received: num(0, 0, 1_000_000_000),
};
const ADVANCED = ["associated", "months", "losses", "pension", "received"] as const;
const COLORS = { tax: "#e11d48", keep: "#0f9f6e" };
const BAND_LABEL = { none: "No tax", small: "Small profits rate, 19%", marginal: "Marginal relief", main: "Main rate, 25%" };

function addMonthsPlusDay(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  // N months later (month end to month end), plus one day.
  const target = new Date(Date.UTC(y, m - 1 + months, 1));
  const last = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  const monthEnd = new Date(Date.UTC(y, m, 0)).getUTCDate() === d;
  target.setUTCDate((monthEnd ? last : Math.min(d, last)) + 1);
  return target.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function CorpTaxStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const taxable = Math.max(0, v.profit - v.losses - v.pension);
  const opts = { associated: v.associated, months: v.months, dividendsReceived: v.received };
  const r = corporationTaxFull({ profit: taxable, ...opts });
  const noPension = corporationTaxFull({ profit: Math.max(0, v.profit - v.losses), ...opts });
  const pensionSaving = noPension.tax - r.tax;
  const due = addMonthsPlusDay(v.yearEnd, 9);
  const returnDue = (() => {
    const [y, m, d] = v.yearEnd.split("-").map(Number);
    return new Date(Date.UTC(y + 1, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  })();
  const ladder = Array.from(new Set([25_000, 50_000, 100_000, 150_000, 250_000, 400_000, Math.round(taxable)]))
    .filter((p) => p > 0)
    .sort((a, b) => a - b)
    .map((p) => ({ p, x: corporationTaxFull({ profit: p, ...opts }) }));
  const maxRate = Math.max(...ladder.map((l) => l.x.effectiveRate), 0.01);
  const limitsChanged = v.associated > 0 || v.months < 12;

  return (
    <Studio
      title="Your company"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out Corporation Tax"
      onReset={st.reset}
      dock={{ label: "Corporation Tax", value: gbp(r.tax) }}
      inputs={
        <>
          <InputGroup title="This accounting period">
            <MoneyField label="Taxable profit" value={v.profit} onChange={st.bind("profit")} big slider={{ min: 0, max: 500_000, step: 1_000, ends: ["£0", "£500k"] }} hint="After allowable expenses, salaries and capital allowances, before Corporation Tax." />
            <DateField label="Accounting year end" value={v.yearEnd} onChange={st.bind("yearEnd")} hint="Sets your payment and filing deadlines." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Associated companies" value={v.associated} onChange={(n) => st.set("associated", Math.round(n))} step={1} min={0} max={50} unit="companies" dp={0} optional hint="Other trading companies under the same control. They share the £50,000 and £250,000 limits." />
            <StepperField label="Length of accounting period" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={1} max={12} unit="months" dp={0} optional hint="A shorter first period reduces the limits pro rata." />
            <MoneyField label="Trading losses brought forward" value={v.losses} onChange={st.bind("losses")} optional hint="Losses from earlier years set against this year's profit." />
            <MoneyField label="Extra employer pension contribution" value={v.pension} onChange={st.bind("pension")} optional hint="Paid by the company before the year end. Usually deductible, so it cuts the profit taxed." />
            <MoneyField label="Dividends received from other companies" value={v.received} onChange={st.bind("received")} optional hint="Not taxed, but they count towards the limits that set your rate." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Corporation Tax to pay"
        value={gbp(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.band === "none" ? (
            <>With no taxable profit there is no Corporation Tax to pay. You still need to file a company tax return.</>
          ) : (
            <>
              On taxable profit of <b>{gbp(taxable)}</b> your company pays <b>{gbp(r.tax)}</b>, an effective rate of <b>{percent(r.effectiveRate, 2)}</b>.{" "}
              {r.band === "marginal" ? (
                <>
                  Marginal relief of <b>{gbp(r.marginalRelief)}</b> takes it below 25%, but each extra £1 of profit costs <b>{percent(r.marginalRate, 1)}</b>.
                </>
              ) : (
                <>Each extra £1 of profit costs {percent(r.marginalRate, 0)}.</>
              )}{" "}
              Pay by <b>{due}</b>.
            </>
          )
        }
        badges={[BAND_LABEL[r.band], `${percent(r.marginalRate, 1)} on the next £1`, `Due ${due}`]}
      />

      <Facts
        items={[
          { label: "Taxable profit", value: gbp(taxable) },
          { label: "Corporation Tax", value: gbp(r.tax), tone: "warn" },
          { label: "Effective rate", value: percent(r.effectiveRate, 2) },
          { label: "Profit after tax", value: gbp(r.afterTax), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Year end", value: longDate(v.yearEnd) },
          { label: "Rates", value: "19% to 25%, financial years 2025 and 2026" },
          { label: "Limits", value: `${gbp(r.lowerLimit)} and ${gbp(r.upperLimit)}` },
          { label: "Company", value: "UK trading company, not a close investment company" },
        ]}
      />

      {taxable > 0 && (
        <ResultCard title="Your profit after tax" sub="What the company keeps to reinvest or pay out.">
          <SplitBar
            segments={[
              { label: "Corporation Tax", value: r.tax, display: gbp(r.tax), color: COLORS.tax },
              { label: "Profit after tax", value: r.afterTax, display: gbp(r.afterTax), color: COLORS.keep },
            ]}
          />
          <Statement
            columns={["This period"]}
            rows={[
              ...(v.losses > 0 || v.pension > 0 ? [{ label: "Profit before adjustments", values: [gbp(v.profit)] }] : []),
              ...(v.losses > 0 ? [{ label: "Losses brought forward", values: [`−${gbp(v.losses)}`], kind: "deduction" as const }] : []),
              ...(v.pension > 0 ? [{ label: "Employer pension contribution", values: [`−${gbp(v.pension)}`], kind: "deduction" as const }] : []),
              { label: "Taxable profit", values: [gbp(taxable)], kind: "total" },
              ...(r.band === "marginal"
                ? [
                    { label: "Tax at 25%", values: [gbp(r.atMainRate)] },
                    { label: "Marginal relief", values: [`−${gbp(r.marginalRelief)}`], kind: "deduction" as const },
                  ]
                : []),
              { label: "Corporation Tax", values: [gbp(r.tax)], kind: "total" },
            ]}
          />
          {r.band === "marginal" && (
            <p className={s.hint} style={{ marginTop: "0.9rem" }}>
              Marginal relief = 3/200 × ({gbp(r.upperLimit)} − {gbp(r.augmented)}){v.received > 0 ? " × taxable ÷ augmented profits" : ""}.
            </p>
          )}
        </ResultCard>
      )}

      <ResultCard title="Tax at other profit levels" sub={limitsChanged ? "Using your reduced limits." : "The effective rate climbs from 19% to 25%."}>
        <Compare
          head={["Taxable profit", "Corporation Tax"]}
          rows={ladder.map(({ p, x }) => ({
            label: gbp(p),
            value: gbp(x.tax),
            delta: `${percent(x.effectiveRate, 1)} effective`,
            bar: x.effectiveRate / maxRate,
            current: p === Math.round(taxable),
          }))}
        />
      </ResultCard>

      <ResultCard title="Deadlines and tips" sub="For this accounting period.">
        <Statement
          columns={["Date"]}
          rows={[
            { label: "Period ends", values: [longDate(v.yearEnd)] },
            { label: r.large ? "Quarterly instalments" : "Pay Corporation Tax", values: [r.large ? "During and after the year" : due] },
            { label: "File the company tax return (CT600)", values: [returnDue] },
          ]}
        />
        {r.band === "marginal" && (
          <Callout title="Profits in the marginal band are taxed at 26.5%">
            Between the two limits each extra pound costs 26.5p, more than the 25% main rate. Spending that reduces profit here, such as a pension contribution or equipment, saves
            26.5% too.
          </Callout>
        )}
        {v.pension > 0 && (
          <Callout tone="good" title={`The pension contribution saves ${gbp(pensionSaving)} of Corporation Tax`}>
            Employer contributions are usually an allowable expense as long as the total package is reasonable for the work done.
          </Callout>
        )}
        {r.large && (
          <Callout tone="warn" title="Quarterly instalments">
            With profits over {gbp(1_500_000 * (v.months / 12) / (1 + v.associated))}, large companies pay Corporation Tax in instalments starting in the seventh month of the period.
          </Callout>
        )}
        {limitsChanged && (
          <Callout title="Your limits are reduced">
            {v.associated > 0 ? `With ${v.associated} associated ${v.associated === 1 ? "company" : "companies"}, ` : ""}
            {v.months < 12 ? `a ${v.months}-month period, ` : ""}the 19% rate stops at {gbp(r.lowerLimit)} and 25% applies from {gbp(r.upperLimit)}.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Corporation Tax rates for financial years 2025 and 2026. Not tax advice.
      </p>
    </Studio>
  );
}
