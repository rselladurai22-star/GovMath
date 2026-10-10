"use client";

import { pointsGainByYear, pointsOption, pointsTaxValue } from "@/lib/us/home-equity";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const BRACKETS = ["10", "12", "22", "24", "32", "35", "37"] as const;
type Bracket = (typeof BRACKETS)[number];

const SCHEMA = {
  loan: num(400_000, 0, 100_000_000),
  rate: num(7.25, 0, 30),
  years: oneOf<"15" | "20" | "30">("30", ["15", "20", "30"]),
  points: num(1, 0, 4),
  perPoint: num(0.25, 0, 1),
  stay: num(10, 1, 30),
  purpose: oneOf<"buy" | "refi">("buy", ["buy", "refi"]),
  itemize: bool(false),
  bracket: oneOf<Bracket>("22", BRACKETS),
};
const ADVANCED = ["purpose", "itemize", "bracket"] as const;

const COMPARE = [-1, 0, 0.5, 1, 1.5, 2, 3];

/** "37 months (3 years 1 month)" or words for never. */
function months(n: number, credit = false): string {
  if (!Number.isFinite(n)) return credit ? "Never: the credit always wins" : "Never";
  if (n <= 0) return "Right away";
  return n >= 12 ? `${n} months (${duration(n)})` : `${n} months`;
}

export default function PointsStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const years = Number(v.years);
  const stayYears = Math.min(v.stay, years);
  const p = pointsOption(v.loan, v.rate, years, v.points, v.perPoint, stayYears);
  const none = pointsOption(v.loan, v.rate, years, 0, v.perPoint, stayYears);
  const gain = pointsGainByYear(v.loan, v.rate, years, v.points, v.perPoint);
  const costLine = gain.map(() => p.cost);
  const tax = v.itemize ? pointsTaxValue(p.cost, v.purpose, years, Number(v.bracket)) : { firstYear: 0, perYear: 0 };
  const worth = p.netAtStay > 0;
  const stayMonths = Math.round(stayYears * 12);
  const paymentSavings = p.saving * stayMonths;
  const balanceGain = p.netAtStay + p.cost - paymentSavings;
  const principalPaid = Math.max(0, p.payment * stayMonths - p.interestAtStay);

  const rows = COMPARE.map((pts) => {
    const o = pointsOption(v.loan, v.rate, years, pts, v.perPoint, stayYears);
    const label = pts < 0 ? `${Math.abs(pts)} point lender credit` : pts === 0 ? "No points" : `${pts} ${pts === 1 ? "point" : "points"}`;
    return [
      label,
      `${o.ratePct.toFixed(3)}%`,
      o.cost < 0 ? `${usd(-o.cost)} credit` : usd(o.cost),
      usd(o.payment, true),
      pts === 0 ? "–" : pts < 0 ? `Credit lasts ${months(o.breakEvenWithBalance, true)}` : months(o.breakEvenWithBalance),
      pts === 0 ? "–" : `${o.netAtStay >= 0 ? "+" : "−"}${usd(Math.abs(o.netAtStay))}`,
    ];
  });

  return (
    <Studio
      title="Your mortgage points"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check if points pay off"
      onReset={st.reset}
      dock={{ label: "Break-even", value: months(p.breakEven) }}
      inputs={
        <>
          <InputGroup title="The loan and the points">
            <MoneyField label="Loan amount" symbol="$" value={v.loan} onChange={st.bind("loan")} slider={{ min: 50_000, max: 1_500_000, step: 5_000, ends: ["$50k", "$1.5m"] }} />
            <StepperField label="Rate with no points" value={v.rate} onChange={st.bind("rate")} step={0.125} min={0} max={30} unit="%" dp={3} info="The par rate on your Loan Estimate. Freddie Mac's survey put the 30-year average at about 7.3% on October 1, 2026." />
            <Segmented
              label="Loan term"
              value={v.years}
              onChange={st.bind("years")}
              options={[
                { value: "15", label: "15 years" },
                { value: "20", label: "20 years" },
                { value: "30", label: "30 years" },
              ]}
            />
            <StepperField label="Points to buy" value={v.points} onChange={st.bind("points")} step={0.125} min={0} max={4} unit="points" dp={3} aside={usd(p.cost)} info="One point costs 1% of the loan amount." />
            <StepperField
              label="Rate cut per point"
              value={v.perPoint}
              onChange={st.bind("perPoint")}
              step={0.025}
              min={0}
              max={1}
              unit="%"
              dp={3}
              aside={`New rate ${p.ratePct.toFixed(3)}%`}
              info="Lenders set their own pricing. One point often cuts the rate by about 0.25 of a point, but it varies by lender and by day. Use the figures on your Loan Estimate."
            />
            <StepperField label="Years you expect to keep the loan" value={v.stay} onChange={st.bind("stay")} step={1} min={1} max={30} unit="years" dp={0} info="Until you sell or refinance. Many loans are repaid within ten years." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Loan is for"
              optional
              value={v.purpose}
              onChange={st.bind("purpose")}
              options={[
                { value: "buy", label: "Buying my main home" },
                { value: "refi", label: "A refinance" },
              ]}
            />
            <Switch label="I itemize deductions" optional checked={v.itemize} onChange={st.bind("itemize")} />
            {v.itemize && (
              <SelectField label="Your federal tax bracket" optional value={v.bracket} onChange={st.bind("bracket")} options={BRACKETS.map((b) => ({ value: b, label: `${b}%` }))} />
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Break-even"
        value={months(p.breakEven)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.points <= 0 || v.loan <= 0 ? (
            <>Enter the points you are offered to see when they pay for themselves.</>
          ) : p.saving <= 0 ? (
            <>These points do not lower the payment, so they never pay for themselves. Check the rate cut per point.</>
          ) : (
            <>
              Paying <b>{usd(p.cost)}</b>{" "}for {v.points} {v.points === 1 ? "point" : "points"} cuts the rate to <b>{p.ratePct.toFixed(3)}%</b>{" "}and the payment by{" "}
              <b>{usd(p.saving, true)}</b>{" "}a month. If you keep the loan <b>{stayYears} years</b>, you come out <b>{usd(Math.abs(p.netAtStay))}</b>{" "}
              {worth ? "ahead" : "behind"}.
            </>
          )
        }
        badges={[`Rate ${p.ratePct.toFixed(3)}%`, `Saves ${usd(p.saving, true)} a month`, worth ? "Worth it for your stay" : "Not worth it for your stay"]}
      />

      <Facts
        items={[
          { label: "Cost of the points", value: usd(p.cost) },
          { label: "Monthly payment", value: usd(p.payment, true), note: `Was ${usd(none.payment, true)}` },
          { label: "Break-even with the lower balance", value: months(p.breakEvenWithBalance), note: "Counts the extra principal you pay off" },
          { label: `Net after ${stayYears} years`, value: `${p.netAtStay >= 0 ? "+" : "−"}${usd(Math.abs(p.netAtStay))}`, tone: worth ? "good" : "bad" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Point price", value: `1 point = 1% of the loan; each cuts the rate by ${v.perPoint} of a point` },
          { label: "Loan", value: `${usd(v.loan)} fixed for ${years} years; points paid in cash at closing` },
          { label: "Your stay", value: `${stayYears} years, then you sell or refinance and repay the balance` },
          { label: "Not included", value: v.itemize ? "Interest the money could have earned elsewhere" : "Taxes, and interest the money could have earned elsewhere" },
        ]}
      />

      <ResultCard title={`Your money over ${stayYears} years`} sub="Everything paid with these points: the points, interest and principal.">
        <SplitBar
          segments={[
            { label: "Principal paid off", value: principalPaid, display: usd(principalPaid), color: "#16a34a" },
            { label: "Interest", value: p.interestAtStay, display: usd(p.interestAtStay), color: "#f59e0b" },
            { label: "Points", value: Math.max(0, p.cost), display: usd(Math.max(0, p.cost)), color: "#5b1e6e" },
          ]}
        />
        <Facts
          items={[
            { label: "Lower payments", value: usd(paymentSavings), tone: paymentSavings > 0 ? "good" : undefined },
            { label: "Lower balance when you leave", value: usd(balanceGain), tone: balanceGain > 0 ? "good" : undefined },
            { label: "Less the points", value: `−${usd(Math.max(0, p.cost))}` },
            { label: "Net", value: `${p.netAtStay >= 0 ? "+" : "−"}${usd(Math.abs(p.netAtStay))}`, tone: worth ? "good" : "bad" },
          ]}
        />
      </ResultCard>

      <ResultCard title="When the points pay off" sub="Savings so far, including the lower balance, against the cost.">
        <AreaChart
          ariaLabel="Savings from points by year"
          series={[
            { key: "gain", label: "Savings so far", color: "#16a34a", values: gain, fill: true },
            { key: "cost", label: "Cost of the points", color: "#f59e0b", values: costLine, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(stayYears, gain.length - 1)}
          readout={(i) => (
            <>
              After <b>{i}</b>{" "}{i === 1 ? "year" : "years"}: <b>{usd(gain[i] ?? 0)}</b>{" "}saved against <b>{usd(p.cost)}</b>{" "}paid.{" "}
              {(gain[i] ?? 0) >= p.cost ? "The points have paid off." : "Not yet paid off."}
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Compare point options" sub={`On ${usd(v.loan)} at ${v.rate}% with no points, kept ${stayYears} years.`}>
        <DataTable summary="Points and lender credits side by side" columns={["Option", "Rate", "Cost", "Payment", "Break-even", `Net after ${stayYears} years`]} rows={rows} />
        <p className="footnote">A lender credit works the other way: the lender pays part of your closing costs and you take a higher rate. It suits short stays.</p>
      </ResultCard>

      <ResultCard title="Tax on points" sub="Points are prepaid interest.">
        {!v.itemize ? (
          <p>
            Points count as mortgage interest only if you itemize. Most households take the standard deduction ($32,200 for married couples filing jointly in 2026), so the points
            give no tax saving. Turn on &ldquo;I itemize deductions&rdquo; under More options to estimate it.
          </p>
        ) : v.purpose === "buy" ? (
          <Facts
            items={[
              { label: "Deductible", value: "In the year you pay", note: "Main home purchase, if the IRS tests are met" },
              { label: "Tax saved, about", value: usd(tax.firstYear), tone: "good" },
              { label: "Net cost of the points", value: usd(p.cost - tax.firstYear) },
            ]}
          />
        ) : (
          <Facts
            items={[
              { label: "Deductible", value: `Over ${years} years`, note: "Refinance points are spread over the loan" },
              { label: "Tax saved a year, about", value: usd(tax.perYear) },
              { label: "If you repay early", value: "Deduct the rest then" },
            ]}
          />
        )}
      </ResultCard>

      {v.points > 0 && stayYears * 12 < p.breakEvenWithBalance && Number.isFinite(p.breakEvenWithBalance) && (
        <Callout tone="warn" title="You may leave before the break-even">
          The points pay for themselves after {months(p.breakEvenWithBalance)}, longer than the {stayYears} years you expect to keep the loan. If rates fall and you refinance, the
          money spent on points is lost.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate. Compare Loan Estimates from several lenders on the same day; section A lists the points.
      </p>
    </Studio>
  );
}
