"use client";

import { breakEvenSavingsRate, overpaymentPlan, type OverpayMode } from "@/lib/property/overpayment-plan";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { duration, gbp, gbpShort, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  balance: num(200_000, 0, 10_000_000),
  rate: num(4.5, 0, 15),
  years: num(25, 1, 40),
  monthly: num(200, 0, 100_000),
  lump: num(0, 0, 10_000_000),
  yearly: num(0, 0, 1_000_000),
  mode: oneOf<OverpayMode>("term", ["term", "payment"]),
  allowance: num(10, 0, 100),
  erc: num(0, 0, 10),
  savings: num(4, 0, 15),
  taxRate: oneOf<"0" | "20" | "40" | "45">("20", ["0", "20", "40", "45"]),
};
const ADVANCED = ["lump", "yearly", "mode", "allowance", "erc", "savings", "taxRate"] as const;
const COLORS = { plan: "#0f9f6e", base: "#9aa0bf" };

export default function OverpaymentStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = overpaymentPlan({ balance: v.balance, ratePct: v.rate, years: v.years, monthly: v.monthly, lump: v.lump, yearlyLump: v.yearly, mode: v.mode });
  const allowance = v.balance * (v.allowance / 100);
  const overAllowance = Math.max(0, r.firstYearOverpaid - allowance);
  const ercCost = overAllowance * (v.erc / 100);
  const tax = Number(v.taxRate) / 100;
  const breakEven = breakEvenSavingsRate(v.rate, tax);
  const savingsWin = v.savings > breakEven;
  const active = v.monthly > 0 || v.lump > 0 || v.yearly > 0;
  const perPound = r.totalOverpaid > 0 ? r.interestSaved / r.totalOverpaid : 0;

  // Same overpayments at a few levels, for comparison.
  const plan = { balance: v.balance, ratePct: v.rate, years: v.years, lump: v.lump, yearlyLump: v.yearly };
  const levels = [0, 100, 200, 500].map((m) => ({ m, saved: overpaymentPlan({ ...plan, monthly: m, mode: v.mode }) }));
  const termSaving = v.mode === "payment" ? overpaymentPlan({ ...plan, monthly: v.monthly, mode: "term" }).interestSaved : 0;
  const maxSaved = Math.max(...levels.map((l) => l.saved.interestSaved), 1);

  return (
    <Studio
      title="Your mortgage"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See what I'd save"
      onReset={st.reset}
      dock={{ label: "Interest saved", value: gbp(r.interestSaved) }}
      inputs={
        <>
          <InputGroup title="Your mortgage today">
            <MoneyField label="Balance left to pay" value={v.balance} onChange={st.bind("balance")} big slider={{ min: 10_000, max: 750_000, step: 5_000, ends: ["£10k", "£750k"] }} />
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.1} min={0} max={15} unit="%" />
            <StepperField label="Years left" value={v.years} onChange={st.bind("years")} step={1} min={1} max={40} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="Your overpayments">
            <MoneyField label="Extra each month" value={v.monthly} onChange={st.bind("monthly")} slider={{ min: 0, max: 2_000, step: 25, ends: ["£0", "£2k"] }} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="One-off lump sum now" value={v.lump} onChange={st.bind("lump")} optional />
            <MoneyField label="Lump sum every year" value={v.yearly} onChange={st.bind("yearly")} optional hint="For example from a bonus, paid at the start of each later year." />
            <Segmented
              label="What overpaying should do"
              value={v.mode}
              onChange={st.bind("mode")}
              optional
              options={[
                { value: "term", label: "Shorten the term", note: "Keep paying the same and finish sooner. Saves the most interest." },
                { value: "payment", label: "Lower the payment", note: "Keep the same end date with a smaller monthly payment." },
              ]}
            />
            <StepperField label="Penalty-free allowance" value={v.allowance} onChange={st.bind("allowance")} step={1} min={0} max={100} unit="% a year" dp={0} optional hint="Most fixed deals allow 10% of the balance a year." />
            <StepperField label="Early repayment charge" value={v.erc} onChange={st.bind("erc")} step={0.5} min={0} max={10} unit="%" dp={1} optional hint="Charged on overpayments above the allowance during a fixed deal." />
            <StepperField label="Savings rate you could get" value={v.savings} onChange={st.bind("savings")} step={0.1} min={0} max={15} unit="%" optional />
            <Segmented
              label="Tax on your savings interest"
              value={v.taxRate}
              onChange={st.bind("taxRate")}
              optional
              options={[
                { value: "0", label: "None", note: "In an ISA or within your Personal Savings Allowance." },
                { value: "20", label: "20%" },
                { value: "40", label: "40%" },
                { value: "45", label: "45%" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Interest you would save"
        value={gbp(r.interestSaved)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !active ? (
            <>Add a monthly overpayment or a lump sum to see what you would save.</>
          ) : v.mode === "term" ? (
            <>
              Overpaying would clear your mortgage <b>{duration(r.monthsSaved)}</b> early, in <b>{duration(r.newMonths)}</b>, and save <b>{gbp(r.interestSaved)}</b> in interest.
              Each £1 you overpay saves about <b>{gbp(perPound, true)}</b>.
            </>
          ) : (
            <>
              After a year your payment would fall from <b>{gbp(r.payment, true)}</b> to about <b>{gbp(r.paymentAfterYear, true)}</b>, and you would save{" "}
              <b>{gbp(r.interestSaved)}</b> in interest over the term.
            </>
          )
        }
        badges={[
          v.mode === "term" ? `${duration(r.monthsSaved)} sooner` : `${gbp(r.payment - r.paymentAfterYear, true)} less a month`,
          `${gbp(r.payment, true)} monthly payment`,
          overAllowance > 0 ? "Over your allowance" : "Within your allowance",
        ]}
      />

      <Facts
        items={[
          { label: "Interest saved", value: gbp(r.interestSaved), tone: "good" },
          v.mode === "term" ? { label: "Mortgage-free in", value: duration(r.newMonths) } : { label: "Payment after a year", value: gbp(r.paymentAfterYear, true) },
          { label: "Total interest now", value: gbp(r.newInterest), note: `Was ${gbp(r.baseInterest)}` },
          { label: "First-year overpayments", value: gbp(r.firstYearOverpaid), tone: overAllowance > 0 ? "warn" : undefined, note: `Allowance ${gbp(allowance)}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% for the whole term` },
          { label: "Mortgage", value: "Repayment" },
          { label: "Overpayments", value: v.mode === "term" ? "Shorten the term" : "Lower the payment" },
          { label: "Allowance", value: `${v.allowance}% of the balance a year` },
        ]}
        note="Rates change when a fix ends. Re-run the figures when you remortgage."
      />

      {active && (
        <ResultCard title="Your balance, year by year" sub="With your overpayments against the original plan.">
          <AreaChart
            ariaLabel="Mortgage balance by year, with and without overpayments"
            series={[
              { key: "base", label: "Without overpaying", color: COLORS.base, values: r.years.map((y) => y.baseBalance), dashed: true },
              { key: "plan", label: "With overpayments", color: COLORS.plan, values: r.years.map((y) => y.balance), fill: true },
            ]}
            xLabel={(i) => (i === 0 ? "Today" : `Year ${i}`)}
            yFormat={gbpShort}
            initial={Math.min(10, r.years.length - 1)}
            readout={(i) => {
              const y = r.years[i];
              if (!y) return null;
              return i === 0 ? (
                <>You owe <b>{gbp(y.balance)}</b> today.</>
              ) : (
                <>
                  After {i} {i === 1 ? "year" : "years"} you would owe <b>{gbp(y.balance)}</b>, against <b>{gbp(y.baseBalance)}</b> without overpaying.
                </>
              );
            }}
          />
        </ResultCard>
      )}

      {v.balance > 0 && (
        <ResultCard title="Different monthly overpayments" sub="Interest saved over the term, with any lump sums you entered.">
          <Compare
            head={["Extra each month", "Interest saved"]}
            rows={levels.map((l) => ({
              label: l.m === 0 ? (v.lump > 0 || v.yearly > 0 ? "Lump sums only" : "Nothing extra") : `${gbp(l.m)} a month`,
              value: gbp(l.saved.interestSaved),
              delta: v.mode === "term" && l.saved.monthsSaved > 0 ? `${duration(l.saved.monthsSaved)} sooner` : undefined,
              deltaTone: "down",
              bar: l.saved.interestSaved / maxSaved,
              current: l.m === v.monthly,
            }))}
          />
        </ResultCard>
      )}

      {active && (
        <ResultCard title="Worth knowing" sub="Check these before you overpay.">
          {overAllowance > 0 ? (
            <Callout tone="warn" title={`${gbp(overAllowance)} over your penalty-free allowance`}>
              In the first year you would overpay {gbp(r.firstYearOverpaid)}, above the {v.allowance}% allowance of {gbp(allowance)}.
              {v.erc > 0 ? (
                <>
                  {" "}
                  At a {v.erc}% charge that could cost <b>{gbp(ercCost)}</b>.
                </>
              ) : (
                <> Check whether your deal has an early repayment charge.</>
              )}
            </Callout>
          ) : (
            <Callout tone="good" title={`Within a ${v.allowance}% allowance`}>
              Your first-year overpayments of {gbp(r.firstYearOverpaid)} are within {gbp(allowance)}, so most fixed deals would charge nothing.
            </Callout>
          )}
          {savingsWin ? (
            <Callout title="Saving may earn more">
              At {v.savings}% {tax > 0 ? `taxed at ${percent(tax)}` : "tax-free"}, savings beat the {v.rate}% you save by overpaying. Overpaying only wins above a savings rate of{" "}
              {breakEven.toFixed(2)}% before tax. Savings also stay accessible.
            </Callout>
          ) : (
            <Callout tone="good" title="Overpaying beats saving at these rates">
              Overpaying saves {v.rate}% with no tax. A savings account would need to pay more than <b>{breakEven.toFixed(2)}%</b> before tax to match it.
            </Callout>
          )}
          <Callout title="Keep an emergency fund first">
            Money paid into your mortgage is hard to get back. Keep three to six months of spending in easy-access savings before overpaying.
          </Callout>
          {v.mode === "payment" && (
            <Callout title="Shortening the term saves more">
              Keeping your payment the same and finishing sooner would save <b>{gbp(termSaving)}</b>.
            </Callout>
          )}
        </ResultCard>
      )}

      <p className={s.hint} style={{ textAlign: "center" }}>
        Assumes the rate stays the same and interest is worked out monthly. Your lender&apos;s figures may differ slightly.
      </p>
    </Studio>
  );
}
