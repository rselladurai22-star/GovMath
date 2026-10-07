"use client";

import { federalReturn, FILING_LABEL, US_2026, type FilingStatus, type ReturnInput } from "@/lib/us/tax-2026";
import { STATES, stateByCode } from "@/lib/us/states";
import { capitalLoss, homeExclusion } from "@/lib/us/taxes-extra";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);
const C = { keep: "#2a78d6", federal: "#eb6834", niit: "#e34948", state: "#eda100" };

const SCHEMA = {
  buy: num(10_000, 0, 1_000_000_000),
  sell: num(30_000, 0, 1_000_000_000),
  term: oneOf<"long" | "short">("long", ["long", "short"]),
  status: oneOf<FilingStatus>("single", STATUSES),
  income: num(60_000, 0, 100_000_000),
  state: oneOf<string>("TX", CODES),
  stateRate: num(5, 0, 20),
  costs: num(0, 0, 100_000_000),
  losses: num(0, 0, 100_000_000),
  home: bool(false),
  itemized: num(0, 0, 100_000_000),
};
const ADVANCED = ["costs", "losses", "home", "itemized"] as const;

const BASE: Omit<ReturnInput, "status" | "wages" | "itemized"> = {
  otherIncome: 0,
  longTermGains: 0,
  selfEmployment: 0,
  preTax: 0,
  adjustments: 0,
  over65: 0,
  blind: 0,
  children: 0,
  otherDependents: 0,
  overtimePremium: 0,
  tips: 0,
  withheld: 0,
};

/** Federal tax caused by the gain: the return with it less the return without it. */
function gainTax(status: FilingStatus, income: number, itemized: number, net: number, deduction: number, long: boolean) {
  const without = federalReturn({ ...BASE, status, wages: income, itemized });
  const withIt = federalReturn({ ...BASE, status, wages: income, itemized, adjustments: deduction, ...(long ? { longTermGains: net } : { otherIncome: net }) });
  return { tax: withIt.totalTax - without.totalTax, niit: withIt.niit - without.niit, gains: withIt.gains, marginal: withIt.ordinary.marginal, ordinaryTaxable: withIt.ordinaryTaxable };
}

export default function CapitalGainsStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const long = v.term === "long";
  const gain = v.sell - v.buy - v.costs;
  const homeOk = v.home && long;
  const excluded = homeOk && gain > 0 ? homeExclusion(gain, v.status) : 0;
  const afterExclusion = Math.max(0, gain - excluded);
  const cl = capitalLoss(afterExclusion, v.losses + Math.max(0, -gain), v.status);
  const fed = gainTax(v.status, v.income, v.itemized, cl.netGain, cl.deduction, long);
  const other = gainTax(v.status, v.income, v.itemized, cl.netGain, cl.deduction, !long);
  const state = stateByCode(v.state);
  const stateRate = !state || state.income.kind === "none" ? 0 : state.income.kind === "flat" ? state.income.rate : v.stateRate / 100;
  const stateTax = cl.netGain * stateRate;
  const federalOnly = Math.max(0, fed.tax - fed.niit);
  const total = fed.tax + stateTax;
  const keep = Math.max(0, gain - Math.max(0, total));
  const rate = gain > 0 ? total / gain : 0;
  const zeroTop = US_2026.capitalGains[v.status][0];
  const zeroRoom = Math.max(0, zeroTop - fed.ordinaryTaxable);
  const hasLoss = cl.deduction > 0 || cl.carryforward > 0;

  return (
    <Studio
      title="Your capital gain"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate capital gains tax"
      onReset={st.reset}
      dock={{ label: hasLoss ? "Tax saved" : "Tax on the gain", value: usd(Math.abs(total)) }}
      inputs={
        <>
          <InputGroup title="The sale">
            <MoneyField label="What you paid (cost basis)" symbol="$" value={v.buy} onChange={st.bind("buy")} info="The purchase price plus buying fees. For a home, add the cost of improvements." />
            <MoneyField label="What you sold it for" symbol="$" value={v.sell} onChange={st.bind("sell")} />
            <Segmented
              label="How long you owned it"
              value={v.term}
              onChange={st.bind("term")}
              options={[
                { value: "long", label: "More than a year", note: "Long-term: taxed at 0%, 15% or 20%." },
                { value: "short", label: "A year or less", note: "Short-term: taxed like wages." },
              ]}
            />
          </InputGroup>
          <InputGroup title="Your taxes">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Your other income for 2026" symbol="$" value={v.income} onChange={st.bind("income")} info="Wages and other ordinary income before deductions. The gain is taxed on top." />
            <SelectField label="State" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} />
            {state?.income.kind === "ask" && (
              <StepperField label={`${state.name} tax rate on the gain`} value={v.stateRate} onChange={st.bind("stateRate")} step={0.25} min={0} max={15} unit="%" dp={2} info="Most states tax gains as ordinary income at your top state rate." />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Selling costs" symbol="$" value={v.costs} onChange={st.bind("costs")} optional info="Commissions, closing costs and other costs of the sale." />
            <MoneyField label="Other capital losses this year (or carried over)" symbol="$" value={v.losses} onChange={st.bind("losses")} optional info="Losses offset gains first; up to $3,000 more comes off other income." />
            <Switch label="This is my main home" checked={v.home} onChange={st.bind("home")} optional info="Up to $250,000 of gain ($500,000 married filing jointly) is tax-free if you owned and lived in it for 2 of the last 5 years." />
            <MoneyField label="Itemized deductions" symbol="$" value={v.itemized} onChange={st.bind("itemized")} optional info="Used only if more than the standard deduction." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={hasLoss ? "Federal tax saved by the loss" : "Tax on your gain"}
        value={usd(Math.abs(total))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          hasLoss ? (
            <>
              You have a net capital loss of <b>{usd(cl.deduction + cl.carryforward)}</b>. Up to <b>{usd(cl.deduction)}</b>{" "}comes off your other income this year, saving about{" "}
              <b>{usd(Math.abs(total))}</b>{" "}of federal tax, and <b>{usd(cl.carryforward)}</b>{" "}carries forward to later years.
            </>
          ) : gain > 0 ? (
            <>
              Your <b>{long ? "long-term" : "short-term"}</b>{" "}gain is <b>{usd(gain)}</b>
              {excluded > 0 ? (
                <>
                  , of which <b>{usd(excluded)}</b>{" "}is tax-free under the home sale exclusion
                </>
              ) : null}
              . Federal tax on it is <b>{usd(Math.max(0, fed.tax))}</b>
              {stateTax > 0 ? (
                <>
                  {" "}and {state?.name} tax about <b>{usd(stateTax)}</b>
                </>
              ) : null}
              , so you keep <b>{usd(keep)}</b>.
            </>
          ) : (
            <>There is no gain on this sale, so there is no capital gains tax to pay.</>
          )
        }
        badges={[`${percent(Math.max(0, rate), 1)} of the gain`, long ? "Long-term rates" : "Taxed as ordinary income", fed.niit > 0 ? "3.8% NIIT applies" : "No NIIT"]}
      />

      <Facts
        items={[
          { label: "Gain", value: usd(gain) },
          { label: "Taxable gain", value: usd(cl.netGain) },
          { label: "Federal tax", value: usd(fed.tax) },
          { label: "State tax", value: usd(stateTax) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026" },
          { label: "Other income", value: `${usd(v.income)} of ordinary income, ${v.itemized > 0 ? "larger of itemized and standard deduction" : "standard deduction"}` },
          { label: "Federal rates", value: long ? "0%, 15% or 20%, stacked on your other income" : "Your ordinary income brackets" },
          { label: "State", value: state ? (state.income.kind === "none" ? `${state.name}: no income tax on gains` : `${state.name}: ${percent(stateRate, 2)} on the gain`) : "" },
          { label: "Not included", value: "28% collectibles rate, 25% depreciation recapture, AMT" },
        ]}
      />

      {gain > 0 && (
        <ResultCard title="Where your gain goes" sub="Your profit split into taxes and what you keep.">
          <SplitBar
            segments={[
              { label: "You keep", value: keep, display: usd(keep), color: C.keep },
              { label: "Federal capital gains tax", value: federalOnly, display: usd(federalOnly), color: C.federal },
              ...(fed.niit > 0 ? [{ label: "Net investment income tax", value: fed.niit, display: usd(fed.niit), color: C.niit }] : []),
              ...(stateTax > 0 ? [{ label: "State tax", value: stateTax, display: usd(stateTax), color: C.state }] : []),
            ]}
          />
        </ResultCard>
      )}

      {long && cl.netGain > 0 && (
        <ResultCard title="How the gain fills the brackets" sub="Long-term gains sit on top of your other taxable income.">
          <Statement
            columns={["Gain", "Tax"]}
            rows={[
              { label: "Taxed at 0%", values: [usd(fed.gains.zero), usd(0)] },
              { label: "Taxed at 15%", values: [usd(fed.gains.fifteen), usd(fed.gains.fifteen * 0.15)] },
              { label: "Taxed at 20%", values: [usd(fed.gains.twenty), usd(fed.gains.twenty * 0.2)] },
              ...(fed.niit > 0 ? [{ label: "Net investment income tax (3.8%)", values: ["", usd(fed.niit)] }] : []),
              { label: "Federal total", values: [usd(cl.netGain), usd(fed.tax)], kind: "total" as const },
            ]}
          />
          <p className="footnote">
            {zeroRoom > 0
              ? `You have ${usd(zeroRoom)} of room left in the 0% band (up to ${usd(zeroTop)} of taxable income).`
              : `Your other taxable income is already above the ${usd(zeroTop)} top of the 0% band.`}
          </p>
        </ResultCard>
      )}

      {gain > 0 && (
        <ResultCard title="Short-term or long-term" sub="The same gain, held for different lengths of time.">
          <Compare
            head={["Held", "Federal tax"]}
            rows={[
              { label: "A year or less (short-term)", value: usd((long ? other : fed).tax), bar: 1, current: !long },
              {
                label: "More than a year (long-term)",
                value: usd((long ? fed : other).tax),
                bar: Math.max(0, (long ? fed : other).tax) / Math.max(1, (long ? other : fed).tax),
                delta: `Saves ${usd(Math.max(0, (long ? other : fed).tax - (long ? fed : other).tax))}`,
                deltaTone: "down" as const,
                current: long,
              },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Before you sell.">
        {v.home && !long && (
          <Callout tone="warn" title="Home sale exclusion needs two years">
            You must have owned and lived in the home for at least 2 of the last 5 years, so a sale within a year does not qualify. A partial exclusion may apply after a move for work, health or other unforeseen reasons.
          </Callout>
        )}
        {cl.carryforward > 0 && (
          <Callout title="Loss carryforward">
            {usd(cl.carryforward)} of loss is left over. It carries forward to 2027 and later years with no time limit.
          </Callout>
        )}
        {v.state === "WA" && (
          <Callout title="Washington capital gains tax">
            Washington has no income tax, but it taxes long-term gains on stocks and similar assets above a yearly standard deduction (about $270,000 or more) at 7%, and 9.9% on gains over $1 million. Real estate is exempt. We left it out.
          </Callout>
        )}
        {!long && gain > 0 && (
          <Callout title="Waiting can pay">
            Holding an asset for more than a year turns the gain into a long-term gain, taxed at lower rates. The day after the one-year anniversary of the purchase is the first long-term day.
          </Callout>
        )}
        <Callout title="Crypto and collectibles">
          Crypto is taxed like other property: the same short and long-term rules apply. Long-term gains on collectibles such as art, coins and gold are taxed at up to 28%.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for tax year 2026. Not tax advice.
      </p>
    </Studio>
  );
}
