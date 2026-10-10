"use client";

import { compoundInterest, DAY_COUNT_LABEL, days30360, daysBetween, simpleInterest, usDate, type DayCount } from "@/lib/us/loan-math";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, DateField, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { usd, usdShort } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  purpose: oneOf<"loan" | "deposit">("loan", ["loan", "deposit"]),
  principal: num(10_000, 0, 100_000_000),
  rate: num(5, 0, 100),
  how: oneOf<"length" | "dates">("length", ["length", "dates"]),
  length: num(1, 0, 1_000),
  unit: oneOf<"days" | "months" | "years">("years", ["days", "months", "years"]),
  start: date("2026-10-10"),
  end: date("2027-10-10"),
  basis: oneOf<DayCount>("actual365", ["actual365", "actual360", "30-360"]),
  freq: oneOf<"daily" | "monthly" | "annually">("monthly", ["daily", "monthly", "annually"]),
};
const ADVANCED = ["basis", "freq"] as const;

const FREQ: Record<"daily" | "monthly" | "annually", { n: number; label: string }> = {
  daily: { n: 365, label: "daily" },
  monthly: { n: 12, label: "monthly" },
  annually: { n: 1, label: "once a year" },
};

const UNIT_WORD = { days: "days", months: "months", years: "years" } as const;

export default function SimpleInterestStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const byDates = v.how === "dates";
  const actualDays = byDates ? daysBetween(v.start, v.end) : 0;
  const badDates = byDates && actualDays <= 0;
  // Days counted for interest under the chosen convention, and the time in years.
  let days: number;
  let years: number;
  if (byDates) {
    days = v.basis === "30-360" ? Math.max(0, days30360(v.start, v.end)) : Math.max(0, actualDays);
    years = Math.max(0, actualDays) / 365;
  } else if (v.unit === "days") {
    days = v.length;
    years = v.length / 365;
  } else {
    const yrs = v.unit === "years" ? v.length : v.length / 12;
    days = v.basis === "30-360" ? yrs * 360 : yrs * 365;
    years = yrs;
  }
  const interest = simpleInterest(v.principal, v.rate, days, v.basis);
  const total = v.principal + interest;
  const perDay = simpleInterest(v.principal, v.rate, 1, v.basis === "actual360" ? "actual360" : "actual365");
  const comp = compoundInterest(v.principal, v.rate, years, FREQ[v.freq].n);
  const loan = v.purpose === "loan";
  const allBases = (["actual365", "actual360", "30-360"] as DayCount[]).map((b) => {
    let d: number;
    if (byDates) d = b === "30-360" ? Math.max(0, days30360(v.start, v.end)) : Math.max(0, actualDays);
    else if (v.unit === "days") d = v.length;
    else d = (v.unit === "years" ? v.length : v.length / 12) * (b === "30-360" ? 360 : 365);
    return { b, d, i: simpleInterest(v.principal, v.rate, d, b) };
  });
  const maxI = Math.max(1, ...allBases.map((x) => x.i));
  // Chart: yearly points for 2 years or more, monthly points below.
  const yearly = years >= 2;
  const steps = yearly ? Math.min(60, Math.ceil(years)) : Math.max(1, Math.min(24, Math.ceil(years * 12)));
  const tAt = (k: number) => Math.min(years, yearly ? k : k / 12);
  // Simple interest grows in a straight line to the total.
  const share = (t: number) => (years > 0 ? t / years : 0);
  const simpleLine = Array.from({ length: steps + 1 }, (_, k) => v.principal + interest * share(tAt(k)));
  const compLine = Array.from({ length: steps + 1 }, (_, k) => v.principal + compoundInterest(v.principal, v.rate, tAt(k), FREQ[v.freq].n));
  const timeText = byDates ? `${Math.max(0, actualDays)} days` : `${v.length} ${UNIT_WORD[v.unit]}`;
  const tableYears = Array.from({ length: Math.min(30, Math.max(1, Math.ceil(years))) }, (_, k) => k + 1).filter((y) => y <= Math.ceil(years));

  return (
    <Studio
      title="Your simple interest"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the interest"
      onReset={st.reset}
      dock={{ label: "Interest", value: usd(interest, true) }}
      inputs={
        <>
          <InputGroup title="The money">
            <Segmented
              label="Is this a loan or savings?"
              value={v.purpose}
              onChange={st.bind("purpose")}
              options={[
                { value: "loan", label: "A loan" },
                { value: "deposit", label: "Savings or a deposit" },
              ]}
            />
            <MoneyField label={loan ? "Amount borrowed" : "Amount deposited"} symbol="$" value={v.principal} onChange={st.bind("principal")} pence slider={{ min: 100, max: 100_000, step: 100, ends: ["$100", "$100k"] }} />
            <StepperField label="Interest rate a year" value={v.rate} onChange={st.bind("rate")} step={0.25} min={0} max={40} unit="%" dp={3} />
          </InputGroup>
          <InputGroup title="How long">
            <Segmented
              label="Set the time by"
              value={v.how}
              onChange={st.bind("how")}
              options={[
                { value: "length", label: "A length of time" },
                { value: "dates", label: "Start and end dates" },
              ]}
            />
            {byDates ? (
              <>
                <DateField label="Start date" value={v.start} onChange={st.bind("start")} />
                <DateField label="End date" value={v.end} onChange={st.bind("end")} hint={badDates ? "The end date must be after the start date." : undefined} />
              </>
            ) : (
              <>
                <SelectField
                  label="Count time in"
                  value={v.unit}
                  onChange={st.bind("unit")}
                  options={[
                    { value: "days", label: "Days" },
                    { value: "months", label: "Months" },
                    { value: "years", label: "Years" },
                  ]}
                />
                <StepperField label="Length" value={v.length} onChange={st.bind("length")} step={1} min={0} max={v.unit === "days" ? 1_000 : v.unit === "months" ? 600 : 50} unit={UNIT_WORD[v.unit]} dp={v.unit === "years" ? 2 : 0} />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Day count"
              optional
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "actual365", label: "Actual/365 (most consumer loans and savings)" },
                { value: "actual360", label: "Actual/360 (many business loans)" },
                { value: "30-360", label: "30/360 (bonds and some mortgages)" },
              ]}
              info="How days are counted. Actual/360 divides by a 360-day year, so it charges a little more interest than actual/365. 30/360 treats every month as 30 days."
            />
            <SelectField
              label="Compare with compounding"
              optional
              value={v.freq}
              onChange={st.bind("freq")}
              options={[
                { value: "daily", label: "Daily" },
                { value: "monthly", label: "Monthly" },
                { value: "annually", label: "Once a year" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={loan ? "Simple interest you pay" : "Simple interest you earn"}
        value={usd(interest, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          badDates ? (
            <>The end date is not after the start date, so no interest builds up. Change the dates.</>
          ) : (
            <>
              {usd(v.principal, true)}{" "}at {v.rate}% simple interest {byDates ? `from ${usDate(v.start)} to ${usDate(v.end)}` : `for ${timeText}`}{" "}
              {loan ? "costs" : "earns"} <b>{usd(interest, true)}</b>, for a total of <b>{usd(total, true)}</b>. Compounded {FREQ[v.freq].label} it would be{" "}
              <b>{usd(comp, true)}</b>.
            </>
          )
        }
        badges={[`${Number.isInteger(days) ? days : days.toFixed(1)} days counted`, DAY_COUNT_LABEL[v.basis], `${usd(perDay, true)} a day`]}
      />

      <Facts
        items={[
          { label: "Interest", value: usd(interest, true), tone: loan ? "warn" : "good" },
          { label: loan ? "Total to repay" : "Total at the end", value: usd(total, true) },
          { label: "Interest a day", value: usd(perDay, true) },
          { label: `Compounded ${FREQ[v.freq].label}`, value: usd(comp, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Formula", value: "Interest = principal × rate × time; interest is never added to the balance" },
          { label: "Time", value: byDates ? `${Math.max(0, actualDays)} actual days${v.basis === "30-360" ? `, ${days} days on 30/360` : ""}` : `${timeText}; a month is 1/12 of a year` },
          { label: "Day count", value: `${DAY_COUNT_LABEL[v.basis]}${v.basis === "actual365" ? ": days ÷ 365" : v.basis === "actual360" ? ": actual days ÷ 360" : ": 30-day months ÷ 360"}` },
          { label: "No payments", value: "The whole principal stays outstanding to the end, with no payments in between" },
        ]}
      />

      <ResultCard title={loan ? "What you repay" : "What you have at the end"} sub="Principal and simple interest.">
        <SplitBar
          segments={[
            { label: loan ? "Amount borrowed" : "Amount deposited", value: v.principal, display: usd(v.principal), color: "#16a34a" },
            { label: "Interest", value: interest, display: usd(interest), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Simple or compound interest" sub={`Simple interest against interest compounded ${FREQ[v.freq].label}.`}>
        <AreaChart
          ariaLabel="Balance with simple and compound interest"
          series={[
            { key: "c", label: `Compounded ${FREQ[v.freq].label}`, color: "#f59e0b", values: compLine },
            { key: "s", label: "Simple interest", color: "#16a34a", values: simpleLine, fill: true },
          ]}
          xLabel={(i) => (yearly ? `Yr ${i}` : `${i}`)}
          yFormat={usdShort}
          initial={steps}
          hint={yearly ? undefined : "Drag across the chart, or use the arrow keys, to read any month."}
          readout={(i) => (
            <>
              {yearly ? "Year" : "Month"} <b>{i}</b>: simple <b>{usd(simpleLine[i] ?? 0, true)}</b>, compounded <b>{usd(compLine[i] ?? 0, true)}</b>.
            </>
          )}
        />
        {years >= 1 && (
          <DataTable
            summary="Year by year"
            columns={["Year", "Simple interest to date", "Compound interest to date", "Difference"]}
            rows={tableYears.map((y) => {
              const t = Math.min(y, years);
              const s = interest * share(t);
              const c = compoundInterest(v.principal, v.rate, t, FREQ[v.freq].n);
              return [y, usd(s, true), usd(c, true), usd(c - s, true)];
            })}
          />
        )}
      </ResultCard>

      <ResultCard title="The same sum on each day count" sub="Why the small print on day counts matters.">
        <Compare
          head={["Day count", "Interest"]}
          rows={allBases.map((x) => ({
            label: `${DAY_COUNT_LABEL[x.b]} (${Number.isInteger(x.d) ? x.d : x.d.toFixed(1)} days)`,
            value: usd(x.i, true),
            delta: x.b === v.basis ? "your choice" : `${x.i >= interest ? "+" : "−"}${usd(Math.abs(x.i - interest), true)}`,
            bar: x.i / maxI,
            current: x.b === v.basis,
          }))}
        />
      </ResultCard>

      {loan ? (
        <Callout title="On a simple-interest loan, timing matters">
          Many car and personal loans charge simple interest by the day on the balance. Here that is {usd(perDay, true)} a day, so paying 10 days late adds about{" "}
          {usd(perDay * 10, true)} of interest, and paying early saves the same.
        </Callout>
      ) : (
        <Callout title="Most savings compound">
          Savings accounts and CDs usually add interest to the balance, so you earn interest on interest. Compounded {FREQ[v.freq].label}, this deposit would earn{" "}
          {usd(comp - interest, true)} more.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. Your loan agreement or account terms set the day count and how interest is charged.
      </p>
    </Studio>
  );
}
