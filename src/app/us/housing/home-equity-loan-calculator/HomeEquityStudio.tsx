"use client";

import { AVG_HELOC_RATE, AVG_HOME_EQUITY_RATE, deductibleShare, equityAvailable, equityOptions, firstYearInterest, MORTGAGE_DEBT_CAP } from "@/lib/us/home-equity";
import { amortize } from "@/lib/us/loans";
import { loanWithFee } from "@/lib/us/housing-loans-extra";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const BRACKETS = ["10", "12", "22", "24", "32", "35", "37"] as const;
type Bracket = (typeof BRACKETS)[number];

const SCHEMA = {
  value: num(500_000, 0, 100_000_000),
  owed: num(300_000, 0, 100_000_000),
  cltv: num(85, 50, 100),
  amount: num(50_000, 0, 100_000_000),
  rate: num(AVG_HOME_EQUITY_RATE, 0, 30),
  years: num(15, 1, 30),
  costs: num(1_000, 0, 1_000_000),
  purpose: oneOf<"home" | "other">("home", ["home", "other"]),
  itemize: bool(false),
  bracket: oneOf<Bracket>("22", BRACKETS),
  mortgageRate: num(4, 0, 30),
  mortgageYears: num(25, 1, 40),
  helocRate: num(AVG_HELOC_RATE, 0, 30),
  refiRate: num(7.3, 0, 30),
  refiCostPct: num(3, 0, 10),
};
const ADVANCED = ["costs", "purpose", "itemize", "bracket", "mortgageRate", "mortgageYears", "helocRate", "refiRate", "refiCostPct"] as const;

export default function HomeEquityStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const eq = equityAvailable(v.value, v.owed, v.cltv);
  const tooMuch = v.amount > eq.available + 0.5;
  const amount = Math.min(v.amount, eq.available);
  const months = Math.round(v.years * 12);
  const loan = amortize(amount, v.rate, months);
  const payment = amount > 0 ? loan.payment : 0;
  const apr = loanWithFee(amount, v.rate, months, v.costs, false);
  const cltvAfter = v.value > 0 ? (v.owed + amount) / v.value : 0;
  const equityLeft = Math.max(0, v.value - v.owed - amount);

  const refiCosts = ((v.owed + amount) * v.refiCostPct) / 100;
  const cmp = equityOptions({
    cash: amount,
    owed: v.owed,
    mortgagePct: v.mortgageRate,
    monthsLeft: Math.round(v.mortgageYears * 12),
    helPct: v.rate,
    helYears: v.years,
    helCosts: v.costs,
    helocPct: v.helocRate,
    helocDrawYears: 10,
    helocRepayYears: 20,
    helocCosts: 0,
    refiPct: v.refiRate,
    refiYears: 30,
    refiCosts,
  });
  const [hel, hl, refi] = cmp.options;
  const cheapest = [hel, hl, refi].reduce((a, b) => (b.extraCost < a.extraCost ? b : a));
  const NAMES = { hel: "Home equity loan", heloc: "HELOC", refi: "Cash-out refinance" } as const;

  const share = deductibleShare(v.owed, amount, v.purpose === "home");
  const yearOneInterest = amount > 0 ? firstYearInterest(amount, v.rate, months) : 0;
  const deductible = yearOneInterest * share.equity;
  const taxSaving = v.itemize ? (deductible * Number(v.bracket)) / 100 : 0;

  return (
    <Studio
      title="Your home equity loan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my loan"
      onReset={st.reset}
      dock={{ label: "Monthly payment", value: usd(payment, true) }}
      inputs={
        <>
          <InputGroup title="Your home and the loan">
            <MoneyField label="Home value" symbol="$" value={v.value} onChange={st.bind("value")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <MoneyField label="Mortgage balance" symbol="$" value={v.owed} onChange={st.bind("owed")} info="Include any other loan secured on the home." />
            <StepperField label="Lender's CLTV limit" value={v.cltv} onChange={st.bind("cltv")} step={1} min={50} max={100} unit="%" dp={0} info="All loans on the home as a share of its value. Most lenders stop at 80% to 85%." />
            <MoneyField label="Amount to borrow" symbol="$" value={v.amount} onChange={st.bind("amount")} aside={tooMuch ? `Max ${usd(eq.available)}` : `Up to ${usd(eq.available)}`} />
            <StepperField
              label="Interest rate"
              value={v.rate}
              onChange={st.bind("rate")}
              step={0.125}
              min={0}
              max={30}
              unit="%"
              dp={3}
              info={`Fixed for the whole loan. Bankrate's survey put the average 10-year home equity loan at about ${AVG_HOME_EQUITY_RATE}% on October 7, 2026.`}
            />
            <StepperField label="Loan term" value={v.years} onChange={st.bind("years")} step={1} min={1} max={30} unit="years" dp={0} info="Usually 5 to 30 years. A shorter term costs more each month and much less overall." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Closing costs" symbol="$" optional value={v.costs} onChange={st.bind("costs")} info="Often 2% to 5% of the loan: appraisal, origination, title and recording fees. Some lenders waive them." />
            <SelectField
              label="What the money is for"
              optional
              value={v.purpose}
              onChange={st.bind("purpose")}
              options={[
                { value: "home", label: "Buying, building or improving this home" },
                { value: "other", label: "Something else (debts, car, tuition)" },
              ]}
              info="Interest is deductible only when the money buys, builds or substantially improves the home that secures the loan, and only if you itemize."
            />
            <Switch label="I itemize deductions" optional checked={v.itemize} onChange={st.bind("itemize")} />
            {v.itemize && (
              <SelectField label="Your federal tax bracket" optional value={v.bracket} onChange={st.bind("bracket")} options={BRACKETS.map((b) => ({ value: b, label: `${b}%` }))} />
            )}
            <StepperField label="Current mortgage rate" optional value={v.mortgageRate} onChange={st.bind("mortgageRate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Used to compare with a cash-out refinance, which replaces this mortgage." />
            <StepperField label="Years left on the mortgage" optional value={v.mortgageYears} onChange={st.bind("mortgageYears")} step={1} min={1} max={40} unit="years" dp={0} />
            <StepperField label="HELOC rate to compare" optional value={v.helocRate} onChange={st.bind("helocRate")} step={0.125} min={0} max={30} unit="%" dp={3} info="Variable. Bankrate's average was about 7.33% on October 7, 2026." />
            <StepperField label="Cash-out refinance rate" optional value={v.refiRate} onChange={st.bind("refiRate")} step={0.125} min={0} max={30} unit="%" dp={3} info="A 30-year rate. Freddie Mac's survey average was about 7.3% on October 1, 2026; cash-out loans often cost a little more." />
            <StepperField label="Refinance closing costs" optional value={v.refiCostPct} onChange={st.bind("refiCostPct")} step={0.5} min={0} max={10} unit="%" dp={1} aside={usd(refiCosts)} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Monthly payment"
        value={usd(payment, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          eq.available <= 0 ? (
            <>
              You owe {percent(eq.cltvNow)} of your home&apos;s value, above the {v.cltv}% limit, so there is no room for a home equity loan yet.
            </>
          ) : (
            <>
              You could borrow up to <b>{usd(eq.available)}</b>. Borrowing <b>{usd(amount)}</b>{" "}at {v.rate}% fixed over {v.years} years costs <b>{usd(payment, true)}</b>{" "}a month and{" "}
              <b>{usd(loan.totalInterest)}</b>{" "}in interest. With your mortgage, you would owe {percent(cltvAfter)} of the home&apos;s value.
            </>
          )
        }
        badges={[`Up to ${usd(eq.available)}`, `CLTV after ${percent(cltvAfter)}`, `APR with costs ${apr.trueAprPct.toFixed(2)}%`]}
      />

      <Facts
        items={[
          { label: "Most you can borrow", value: usd(eq.available), note: `${v.cltv}% of ${usd(v.value)}, less ${usd(v.owed)}` },
          { label: "Total interest", value: usd(loan.totalInterest), tone: "warn" },
          { label: "Cash in hand after costs", value: usd(Math.max(0, amount - v.costs)) },
          { label: "APR including costs", value: `${apr.trueAprPct.toFixed(2)}%` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Loan", value: `${usd(amount)} at ${v.rate}% fixed, ${v.years} years, monthly payments` },
          { label: "Closing costs", value: `${usd(v.costs)}, paid from the loan` },
          { label: "Comparisons", value: `HELOC at ${v.helocRate}% held level (10-year draw, then 20 years); cash-out refinance at ${v.refiRate}% for 30 years with ${v.refiCostPct}% costs` },
          { label: "Your mortgage", value: `${usd(v.owed)} at ${v.mortgageRate}% with ${v.mortgageYears} years left` },
        ]}
      />

      {tooMuch && (
        <Callout tone="warn" title="More than the limit allows">
          You asked for {usd(v.amount)}, but a {v.cltv}% limit on a {usd(v.value)} home allows {usd(eq.available)}. The results use {usd(amount)}.
        </Callout>
      )}

      <ResultCard title="Your home's value, split" sub="What you owe after the loan and the equity you keep.">
        <SplitBar
          segments={[
            { label: "Mortgage", value: Math.min(v.owed, v.value), display: usd(Math.min(v.owed, v.value)), color: "#94a3b8" },
            { label: "Home equity loan", value: amount, display: usd(amount), color: "#f59e0b" },
            { label: "Equity you keep", value: equityLeft, display: usd(equityLeft), color: "#16a34a" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Home equity loan, HELOC or cash-out refinance" sub={`Raising ${usd(amount)} three ways. Totals include your current mortgage.`}>
        <DataTable
          summary="Compare the three ways"
          columns={["Option", "All mortgage payments now", "Later", "Extra interest and costs"]}
          rows={[
            ["Keep the mortgage only", usd(cmp.keepPayment, true), usd(cmp.keepPayment, true), "–"],
            [NAMES.hel + " (fixed)", usd(hel.monthlyNow, true), usd(hel.monthlyLater, true), usd(hel.extraCost)],
            [NAMES.heloc + " (variable)", usd(hl.monthlyNow, true), usd(hl.monthlyLater, true), usd(hl.extraCost)],
            [NAMES.refi, usd(refi.monthlyNow, true), usd(refi.monthlyLater, true), usd(refi.extraCost)],
          ]}
        />
        <p className="footnote">
          &ldquo;Later&rdquo; is after the HELOC&apos;s 10-year draw period. Extra interest and costs are over each loan&apos;s full life against keeping only your mortgage. On these
          figures the {NAMES[cheapest.key].toLowerCase()} costs least overall
          {cheapest.key === "heloc" ? ", if its rate does not rise" : ""}.
        </p>
      </ResultCard>

      <ResultCard title="Tax on the interest" sub="Home equity interest is deductible only in some cases.">
        {v.purpose !== "home" ? (
          <p>
            Interest on home equity borrowing used for anything other than buying, building or substantially improving the home is not deductible, whether or not you itemize.
          </p>
        ) : !v.itemize ? (
          <p>
            The money is for the home, so the interest can count as mortgage interest, but only if you itemize. Most households take the standard deduction ($32,200 for married
            couples filing jointly in 2026) and get no benefit. Turn on &ldquo;I itemize deductions&rdquo; under More options to estimate it.
          </p>
        ) : (
          <Facts
            items={[
              { label: "First-year interest", value: usd(yearOneInterest) },
              { label: "Deductible share", value: percent(share.equity), note: v.owed + amount > MORTGAGE_DEBT_CAP ? `Above the ${usd(MORTGAGE_DEBT_CAP)} cap` : `Within the ${usd(MORTGAGE_DEBT_CAP)} cap` },
              { label: "Tax saved in year one, about", value: usd(taxSaving), tone: "good" },
              { label: "After-tax rate, about", value: `${(v.rate * (1 - (Number(v.bracket) / 100) * share.equity)).toFixed(2)}%` },
            ]}
          />
        )}
      </ResultCard>

      {v.mortgageRate < v.refiRate && refi.extraCost > hel.extraCost && amount > 0 && (
        <Callout title="Keep your low first mortgage">
          Your mortgage rate of {v.mortgageRate}% is below today&apos;s refinance rate. A cash-out refinance would reprice all {usd(v.owed)} at {v.refiRate}%, so a second loan on top
          is usually cheaper.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan offer. A home equity loan is secured on your home: if you cannot repay, you could lose it.
      </p>
    </Studio>
  );
}
