"use client";

import { saleProceeds } from "@/lib/us/estate-property";
import { FILING_LABEL, type FilingStatus } from "@/lib/us/tax-2026";
import { STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  price: num(450_000, 0, 100_000_000),
  payoff: num(250_000, 0, 100_000_000),
  listingPct: num(2.5, 0, 10),
  buyerAgentPct: num(2.5, 0, 10),
  purchase: num(300_000, 0, 100_000_000),
  status: oneOf<FilingStatus>("mfj", STATUSES),
  improvements: num(20_000, 0, 100_000_000),
  mainHome: bool(true),
  longTerm: bool(true),
  otherIncome: num(120_000, 0, 100_000_000),
  state: oneOf<string>("TX", CODES),
  concessions: num(0, 0, 10_000_000),
  transferPct: num(0, 0, 10),
  otherPct: num(1, 0, 10),
  prep: num(0, 0, 10_000_000),
  taxProration: num(0, 0, 1_000_000),
};
const ADVANCED = ["improvements", "mainHome", "longTerm", "otherIncome", "state", "concessions", "transferPct", "otherPct", "prep", "taxProration"] as const;

const C = { keep: "#2a78d6", payoff: "#9aa1a9", commission: "#eb6834", costs: "#4a3aa7", tax: "#e34948" };
const PRICES = [-0.1, -0.05, 0, 0.05, 0.1];

export default function SaleStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const inputFor = (price: number) => ({
    price,
    payoff: v.payoff,
    listingPct: v.listingPct,
    buyerAgentPct: v.buyerAgentPct,
    concessions: v.concessions,
    transferPct: v.transferPct,
    otherPct: v.otherPct,
    prep: v.prep,
    taxProration: v.taxProration,
    purchase: v.purchase,
    improvements: v.improvements,
    mainHome: v.mainHome,
    longTerm: v.longTerm,
    status: v.status,
    otherIncome: v.otherIncome,
    state: v.state,
  });
  const r = saleProceeds(inputFor(v.price));
  const tax = r.federalTax + r.stateTax;
  const otherCosts = r.transfer + r.other + v.concessions + v.taxProration;
  const keep = Math.max(0, r.proceeds - tax);
  const underwater = r.proceeds < 0;
  const limit = v.status === "mfj" ? 500_000 : 250_000;

  return (
    <Studio
      title="Your home sale"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my proceeds"
      onReset={st.reset}
      dock={{ label: underwater ? "Shortfall at closing" : "You walk away with", value: usd(Math.abs(r.walkAway)) }}
      inputs={
        <>
          <InputGroup title="The sale">
            <MoneyField label="Sale price" symbol="$" value={v.price} onChange={st.bind("price")} slider={{ min: 50_000, max: 2_000_000, step: 5_000, ends: ["$50k", "$2m"] }} />
            <MoneyField label="Mortgage payoff" symbol="$" value={v.payoff} onChange={st.bind("payoff")} info="The payoff amount from your servicer, including any home equity loan or HELOC. It is a little more than the balance on your statement because of interest to the payoff date." />
            <StepperField label="Listing agent commission" value={v.listingPct} onChange={st.bind("listingPct")} step={0.25} min={0} max={10} unit="% of price" dp={2} info="Set in your listing agreement. Commissions are negotiable." />
            <StepperField
              label="Buyer's agent pay you agree to"
              value={v.buyerAgentPct}
              onChange={st.bind("buyerAgentPct")}
              step={0.25}
              min={0}
              max={10}
              unit="% of price"
              dp={2}
              info="Since August 17, 2024, offers to pay the buyer's agent can't appear on the MLS. Sellers may still offer it, or agree to it in the purchase contract. Enter 0 if the buyer pays their own agent."
            />
            <MoneyField label="What you paid for the home" symbol="$" value={v.purchase} onChange={st.bind("purchase")} info="Purchase price plus buying costs such as title insurance and recording fees. Used for the taxable gain." />
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Improvements you made" symbol="$" optional value={v.improvements} onChange={st.bind("improvements")} info="Additions and upgrades that last, such as a new roof, kitchen or deck. Not repairs or maintenance. They raise your basis." />
            <Switch label="Main home for 2 of the last 5 years" optional checked={v.mainHome} onChange={st.bind("mainHome")} info="Owned and lived in for at least 2 of the 5 years before the sale, and no exclusion used in the last 2 years." />
            <Switch label="Owned for more than a year" optional checked={v.longTerm} onChange={st.bind("longTerm")} />
            <MoneyField label="Other income this year" symbol="$" optional value={v.otherIncome} onChange={st.bind("otherIncome")} info="Wages and other income. A taxable gain is taxed on top." />
            <SelectField label="State" optional value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} info="For state income tax on any taxable gain, at ordinary rates." />
            <MoneyField label="Seller concessions" symbol="$" optional value={v.concessions} onChange={st.bind("concessions")} info="Credits to the buyer for closing costs or repairs." />
            <StepperField label="Transfer tax you pay" optional value={v.transferPct} onChange={st.bind("transferPct")} step={0.05} min={0} max={10} unit="% of price" dp={3} info="State and local transfer taxes vary; many states have none. Ask your title company who pays where you live." />
            <StepperField label="Other closing costs" optional value={v.otherPct} onChange={st.bind("otherPct")} step={0.1} min={0} max={10} unit="% of price" dp={2} info="Title and escrow fees, the owner's title policy where sellers pay it, attorney fees, HOA transfer fees and recording." />
            <MoneyField label="Repairs, staging and moving" symbol="$" optional value={v.prep} onChange={st.bind("prep")} info="Cash you spend to sell. Not deducted from the gain unless it is an improvement." />
            <MoneyField label="Property tax you owe at closing" symbol="$" optional value={v.taxProration} onChange={st.bind("taxProration")} info="Your share of the year's tax not yet paid, credited to the buyer." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={underwater ? "Shortfall at closing" : "You walk away with"}
        value={usd(Math.abs(r.walkAway))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          underwater ? (
            <>
              After <b>{usd(r.sellingCosts)}</b>{" "}of selling costs and the <b>{usd(v.payoff)}</b>{" "}payoff, the sale leaves you <b>{usd(Math.abs(r.walkAway))}</b>{" "}short. You would
              need to bring that to closing, or ask your lender about a short sale.
            </>
          ) : (
            <>
              Selling for {usd(v.price)} costs <b>{usd(r.sellingCosts)}</b>{" "}({percent(v.price > 0 ? r.sellingCosts / v.price : 0, 1)} of the price). After the {usd(v.payoff)} payoff
              {tax > 0 ? <> and {usd(tax)} of tax on the gain</> : <>, with the gain {r.gain > 0 ? "tax-free" : "nil"}</>}
              {v.prep > 0 ? <> and {usd(v.prep)} of preparation costs</> : null}, you keep <b>{usd(r.walkAway)}</b>.
            </>
          )
        }
        badges={[`Commission ${usd(r.commission)}`, `Gain ${usd(r.gain)}`, r.taxableGain > 0 ? `Taxable gain ${usd(r.taxableGain)}` : "No taxable gain", `Equity after costs ${usd(r.equityAfterCosts - v.payoff)}`]}
      />

      <Facts
        items={[
          { label: "Selling costs", value: usd(r.sellingCosts) },
          { label: "Mortgage payoff", value: usd(v.payoff) },
          { label: "Tax on the gain", value: usd(tax), tone: tax > 0 ? "warn" : "good" },
          { label: underwater ? "Shortfall" : "You walk away with", value: usd(Math.abs(r.walkAway)), tone: underwater ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Commission", value: `${v.listingPct}% listing + ${v.buyerAgentPct}% buyer's agent = ${usd(r.commission)}` },
          { label: "Other costs", value: `${v.otherPct}% closing costs${v.transferPct > 0 ? `, ${v.transferPct}% transfer tax` : ", no transfer tax"}${v.concessions > 0 ? `, ${usd(v.concessions)} concessions` : ""}` },
          { label: "Tax", value: v.mainHome ? `Main home: up to ${usd(limit)} of gain excluded` : "Not a main home: the whole gain is taxable" },
          { label: "Gain", value: `${v.longTerm ? "Long-term" : "Short-term"}, taxed on top of ${usd(v.otherIncome)} of other 2026 income (${FILING_LABEL[v.status].toLowerCase()})` },
          { label: "Not included", value: "Depreciation recapture on a home office or rental, a partial exclusion, prepayment penalties and moving costs not entered" },
        ]}
      />

      <ResultCard title="Where the sale price goes" sub={`${usd(v.price)} split between you and everyone else.`}>
        <SplitBar
          segments={[
            { label: "You keep", value: keep, display: usd(keep), color: C.keep },
            { label: "Mortgage payoff", value: Math.min(v.payoff, Math.max(0, v.price - r.sellingCosts - v.taxProration)), display: usd(v.payoff), color: C.payoff },
            { label: "Agent commissions", value: r.commission, display: usd(r.commission), color: C.commission },
            { label: "Other costs and credits", value: otherCosts, display: usd(otherCosts), color: C.costs },
            { label: "Tax on the gain", value: tax, display: usd(tax), color: C.tax },
          ]}
          caption={v.prep > 0 ? `Repairs, staging and moving (${usd(v.prep)}) are paid separately and come off what you keep.` : "The payoff goes to your lender at closing; the rest is wired to you."}
        />
      </ResultCard>

      <ResultCard title="Your settlement statement" sub="Roughly as the seller's side of the Closing Disclosure shows it.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Sale price", values: [usd(v.price)] },
            { label: "Listing agent commission", values: [`−${usd(r.listing)}`], kind: "deduction" },
            ...(r.buyerAgent > 0 ? [{ label: "Buyer's agent commission", values: [`−${usd(r.buyerAgent)}`], kind: "deduction" as const }] : []),
            ...(r.transfer > 0 ? [{ label: "Transfer tax", values: [`−${usd(r.transfer)}`], kind: "deduction" as const }] : []),
            ...(r.other > 0 ? [{ label: "Title, escrow and other closing costs", values: [`−${usd(r.other)}`], kind: "deduction" as const }] : []),
            ...(v.concessions > 0 ? [{ label: "Seller concessions", values: [`−${usd(v.concessions)}`], kind: "deduction" as const }] : []),
            ...(v.taxProration > 0 ? [{ label: "Property tax owed", values: [`−${usd(v.taxProration)}`], kind: "deduction" as const }] : []),
            { label: "Mortgage payoff", values: [`−${usd(v.payoff)}`], kind: "deduction" },
            { label: underwater ? "Due from you at closing" : "Due to you at closing", values: [usd(Math.abs(r.proceeds))], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Capital gains tax" sub="Your gain and the home sale exclusion.">
        <Statement
          columns={["2026"]}
          rows={[
            { label: "Sale price less selling costs", values: [usd(v.price - r.sellingCosts)] },
            { label: "Basis: what you paid plus improvements", values: [`−${usd(r.basis)}`], kind: "deduction" },
            { label: "Gain", values: [usd(r.gain)], kind: "total" },
            { label: v.mainHome ? `Home sale exclusion (up to ${usd(limit)})` : "No exclusion: not a main home", values: [`−${usd(r.excluded)}`], kind: "deduction" },
            { label: "Taxable gain", values: [usd(r.taxableGain)], kind: "total" },
            { label: "Federal tax, including any 3.8% NIIT", values: [usd(r.federalTax)] },
            { label: "State income tax", values: [usd(r.stateTax)] },
          ]}
        />
        {r.taxableGain > 0 && <p className="footnote">Report the sale on Form 8949 and Schedule D. A taxable gain may need an estimated tax payment.</p>}
      </ResultCard>

      <ResultCard title="If the price changes" sub="Your proceeds at prices around your figure.">
        <DataTable
          summary="Proceeds at other sale prices"
          columns={["Sale price", "Selling costs", "Tax", "You walk away with"]}
          rows={PRICES.map((d) => {
            const p = Math.round((v.price * (1 + d)) / 1_000) * 1_000;
            const x = saleProceeds(inputFor(p));
            return [usd(p), usd(x.sellingCosts), usd(x.federalTax + x.stateTax), x.walkAway < 0 ? `−${usd(-x.walkAway)}` : usd(x.walkAway)];
          })}
        />
      </ResultCard>

      {underwater && (
        <Callout tone="warn" title="The sale doesn't cover the mortgage">
          You would need {usd(Math.abs(r.walkAway))} at closing. If you can&rsquo;t, talk to your servicer early about a short sale or other options.
        </Callout>
      )}

      {v.mainHome && r.gain > limit && (
        <Callout tone="warn" title="Your gain is over the exclusion">
          {usd(r.gain - limit)} of the gain is taxable. Records of improvements raise your basis and cut the tax, so gather receipts before you file.
        </Callout>
      )}

      <Callout title="Commissions after the 2024 settlement">
        Since August 17, 2024, the National Association of Realtors&rsquo; rules keep offers of buyer&rsquo;s agent pay off the MLS, and buyers sign their own agreements with their
        agents. Whether you pay the buyer&rsquo;s agent is now a separate decision you negotiate.
      </Callout>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a net sheet from your title company or tax advice.
      </p>
    </Studio>
  );
}
