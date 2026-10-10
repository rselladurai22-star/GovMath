"use client";

import { equityAvailable, heloc, PRIME_RATE } from "@/lib/us/home-equity";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  value: num(500_000, 0, 100_000_000),
  owed: num(300_000, 0, 100_000_000),
  cltv: num(85, 50, 100),
  draw: num(50_000, 0, 100_000_000),
  margin: num(0.5, -3, 10),
  drawYears: num(10, 0, 20),
  repayYears: num(20, 1, 30),
  prime: num(PRIME_RATE, 0, 20),
  pattern: oneOf<"now" | "even">("now", ["now", "even"]),
  rateChange: num(0, -5, 10),
  fee: num(0, 0, 10_000),
  closing: num(0, 0, 1_000_000),
};
const ADVANCED = ["prime", "pattern", "rateChange", "fee", "closing"] as const;

export default function HelocStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const eq = equityAvailable(v.value, v.owed, v.cltv);
  const tooMuch = v.draw > eq.available + 0.5;
  const draw = Math.min(v.draw, eq.available);
  const input = { draw, primePct: v.prime, marginPct: v.margin, drawYears: v.drawYears, repayYears: v.repayYears, pattern: v.pattern, rateChange: v.rateChange, annualFee: v.fee };
  const h = heloc(input);
  const unused = Math.max(0, eq.available - draw);
  const kept = Math.max(0, v.value - eq.maxDebt);
  const hasDraw = v.drawYears > 0;

  // Balance and payment at the end of each year.
  const years = Math.ceil(h.months.length / 12);
  const balance = [h.months[0] && v.pattern === "now" ? draw : 0];
  for (let y = 1; y <= years; y++) balance.push(h.months[Math.min(h.months.length, y * 12) - 1]?.balance ?? 0);
  const paymentAt = (y: number) => h.months[Math.min(h.months.length - 1, Math.max(0, y * 12 - 1))]?.payment ?? 0;

  const stress = [-1, 0, 1, 2, 3].map((d) => {
    const x = heloc({ ...input, rateChange: 0, primePct: v.prime + d });
    return [d === 0 ? "Today's rate" : `${d > 0 ? "+" : "−"}${Math.abs(d)} point${Math.abs(d) === 1 ? "" : "s"}`, `${x.ratePct.toFixed(2)}%`, usd(x.drawPayment, true), usd(x.repayPayment, true), usd(x.totalInterest)];
  });

  return (
    <Studio
      title="Your HELOC"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my HELOC"
      onReset={st.reset}
      dock={{ label: "You could borrow", value: usd(eq.available) }}
      inputs={
        <>
          <InputGroup title="Your home and the line of credit">
            <MoneyField label="Home value" symbol="$" value={v.value} onChange={st.bind("value")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} info="The lender orders an appraisal or an automated valuation. Recent sales of similar homes nearby are a fair guide." />
            <MoneyField label="Mortgage balance" symbol="$" value={v.owed} onChange={st.bind("owed")} info="Include any other loan secured on the home, such as a second mortgage." />
            <StepperField label="Lender's CLTV limit" value={v.cltv} onChange={st.bind("cltv")} step={1} min={50} max={100} unit="%" dp={0} info="Combined loan-to-value: all loans on the home as a share of its value. Most lenders cap it at 80% to 85%; a few go to 90% or more for strong credit." />
            <MoneyField label="Amount you plan to draw" symbol="$" value={v.draw} onChange={st.bind("draw")} aside={tooMuch ? `Max ${usd(eq.available)}` : undefined} />
            <StepperField
              label="Margin over prime"
              value={v.margin}
              onChange={st.bind("margin")}
              step={0.125}
              min={-3}
              max={10}
              unit="%"
              dp={3}
              aside={`Rate ${h.ratePct.toFixed(2)}%`}
              info={`Your rate is the prime rate (about ${PRIME_RATE}% in October 2026) plus the lender's margin. Bankrate's survey put the average HELOC rate at about 7.33% on October 7, 2026.`}
            />
            <StepperField label="Draw period" value={v.drawYears} onChange={st.bind("drawYears")} step={1} min={0} max={20} unit="years" dp={0} info="Usually 10 years. You can borrow and pay back as you like, and most lenders ask only for interest." />
            <StepperField label="Repayment period" value={v.repayYears} onChange={st.bind("repayYears")} step={1} min={1} max={30} unit="years" dp={0} info="Usually 20 years. No new draws; the balance is paid off with principal and interest." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Prime rate" optional value={v.prime} onChange={st.bind("prime")} step={0.25} min={0} max={20} unit="%" dp={2} info="The Wall Street Journal prime rate, about 7.00% after the Federal Reserve's rise on September 16, 2026. It moves with the Fed's rate." />
            <Segmented
              label="How you draw"
              optional
              value={v.pattern}
              onChange={st.bind("pattern")}
              options={[
                { value: "now", label: "All at once" },
                { value: "even", label: "Evenly over the draw period" },
              ]}
            />
            <StepperField label="Rate change when repayment starts" optional value={v.rateChange} onChange={st.bind("rateChange")} step={0.25} min={-5} max={10} unit="points" dp={2} info="A stress test: how the repayment payment changes if the rate is higher (or lower) by then." />
            <MoneyField label="Annual fee" symbol="$" optional value={v.fee} onChange={st.bind("fee")} info="Some lenders charge $50 to $100 a year during the draw period." />
            <MoneyField label="Closing costs" symbol="$" optional value={v.closing} onChange={st.bind("closing")} info="Many lenders waive them, though some charge them back if you close the line within about three years." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You could borrow up to"
        value={usd(eq.available)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          eq.available <= 0 ? (
            <>
              With <b>{usd(v.owed)}</b>{" "}owed on a <b>{usd(v.value)}</b>{" "}home, you already owe {percent(eq.cltvNow)} of its value, above the {v.cltv}% limit. There is no room for a
              HELOC until the balance falls or the value rises.
            </>
          ) : (
            <>
              A {v.cltv}% limit on a <b>{usd(v.value)}</b>{" "}home allows <b>{usd(eq.maxDebt)}</b>{" "}of loans in all. Less your <b>{usd(v.owed)}</b>{" "}mortgage, that leaves a line of{" "}
              <b>{usd(eq.available)}</b>.
              {draw > 0 ? (
                <>
                  {" "}Drawing <b>{usd(draw)}</b>{" "}at {h.ratePct.toFixed(2)}% costs {hasDraw ? <>about <b>{usd(h.drawPayment, true)}</b>{" "}a month interest-only, then </> : null}
                  <b>{usd(h.repayPayment, true)}</b>{" "}a month to repay it over {v.repayYears} years.
                </>
              ) : null}
            </>
          )
        }
        badges={[`Equity ${usd(eq.equity)}`, `CLTV now ${percent(eq.cltvNow)}`, `Rate ${h.ratePct.toFixed(2)}%`]}
      />

      <Facts
        items={[
          { label: hasDraw ? "Draw-period payment" : "First payment", value: usd(hasDraw ? h.drawPayment : h.repayPayment, true), note: hasDraw ? "Interest only, once fully drawn" : undefined },
          { label: "Repayment payment", value: usd(h.repayPayment, true), note: `${v.repayYears} years at ${h.repayRatePct.toFixed(2)}%` },
          { label: "Total interest", value: usd(h.totalInterest), tone: "warn" },
          { label: "Total cost with fees", value: usd(h.totalInterest + h.fees + v.closing) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `Prime ${v.prime}% + margin ${v.margin}% = ${h.ratePct.toFixed(2)}%, held level${v.rateChange !== 0 ? ` until repayment, then ${h.repayRatePct.toFixed(2)}%` : ""}` },
          { label: "Draws", value: v.pattern === "now" ? `${usd(draw)} drawn on day one` : `${usd(draw)} drawn in equal monthly amounts over ${v.drawYears} years` },
          { label: "Payments", value: hasDraw ? "Interest only in the draw period, then principal and interest" : "Principal and interest from the start" },
          { label: "Borrowing limit", value: `${v.cltv}% of the home's value, less what you owe` },
          { label: "Not included", value: "Rate caps, minimum draws, early closure fees and taxes" },
        ]}
      />

      {tooMuch && (
        <Callout tone="warn" title="More than the limit allows">
          You asked to draw {usd(v.draw)}, but a {v.cltv}% limit allows {usd(eq.available)}. The results use {usd(draw)}.
        </Callout>
      )}

      <ResultCard title="Your home's value, split" sub={`What is owed, what the HELOC uses, and the ${100 - v.cltv}% the lender leaves untouched.`}>
        <SplitBar
          segments={[
            { label: "Mortgage", value: Math.min(v.owed, v.value), display: usd(Math.min(v.owed, v.value)), color: "#94a3b8" },
            { label: "HELOC drawn", value: draw, display: usd(draw), color: "#f59e0b" },
            { label: "Unused credit line", value: unused, display: usd(unused), color: "#16a34a" },
            { label: "Equity kept back", value: Math.max(0, kept - Math.max(0, v.owed - eq.maxDebt)), display: usd(Math.max(0, kept - Math.max(0, v.owed - eq.maxDebt))), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="The payment jump" sub="When the draw period ends, principal is added to the payment.">
        <Facts
          items={[
            { label: hasDraw ? `Years 1 to ${v.drawYears}` : "Payments", value: usd(hasDraw ? h.drawPayment : h.repayPayment, true) },
            { label: `Years ${v.drawYears + 1} to ${v.drawYears + v.repayYears}`, value: usd(h.repayPayment, true) },
            { label: "Increase", value: hasDraw ? `${usd(h.jump, true)} a month` : "None", tone: h.jump > 0 && hasDraw ? "warn" : undefined },
            { label: "Interest in the draw period", value: usd(h.drawInterest) },
          ]}
        />
      </ResultCard>

      <ResultCard title="Balance and payment over time" sub="The balance stays level while you pay interest only, then falls.">
        <AreaChart
          ariaLabel="HELOC balance by year"
          series={[{ key: "bal", label: "Balance", color: "#f59e0b", values: balance, fill: true }]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={usdShort}
          initial={Math.min(hasDraw ? v.drawYears + 1 : 1, balance.length - 1)}
          readout={(i) =>
            i === 0 ? (
              <>
                At the start you owe <b>{usd(balance[0])}</b>.
              </>
            ) : (
              <>
                Year <b>{i}</b>: owing <b>{usd(balance[i] ?? 0)}</b>, paying <b>{usd(paymentAt(i), true)}</b>{" "}a month ({i <= v.drawYears ? "draw period" : "repayment"}).
              </>
            )
          }
        />
      </ResultCard>

      <ResultCard title="If the prime rate moves" sub="HELOC rates are variable. The same draw at other prime rates.">
        <DataTable summary="Payments at other rates" columns={["Prime change", "HELOC rate", "Draw payment", "Repayment payment", "Total interest"]} rows={stress} />
      </ResultCard>

      {h.jump > 0 && hasDraw && draw > 0 && (
        <Callout tone="warn" title="Plan for the end of the draw period">
          Your payment rises from {usd(h.drawPayment, true)} to {usd(h.repayPayment, true)} a month in year {v.drawYears + 1}. Paying some principal during the draw period softens
          the jump.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. A HELOC is secured on your home: if you cannot repay, you could lose it.
      </p>
    </Studio>
  );
}
