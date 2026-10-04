"use client";

import { capitalGains2026, INV_2026 } from "@/lib/investing/tax";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Asset = "shares" | "property" | "crypto" | "business";

const SCHEMA = {
  asset: oneOf<Asset>("shares", ["shares", "property", "crypto", "business"]),
  sale: num(60_000, 0, 1_000_000_000),
  cost: num(30_000, 0, 1_000_000_000),
  costs: num(500, 0, 100_000_000),
  income: num(45_000, 0, 10_000_000),
  savings: num(0, 0, 10_000_000),
  dividends: num(0, 0, 10_000_000),
  pension: num(0, 0, 10_000_000),
  losses: num(0, 0, 100_000_000),
  bf: num(0, 0, 100_000_000),
  exemptUsed: num(0, 0, 3_000),
  prr: num(0, 0, 100),
  spouseIncome: num(20_000, 0, 10_000_000),
  scotland: bool(false),
};
const ADVANCED = ["savings", "dividends", "pension", "losses", "bf", "exemptUsed", "prr", "spouseIncome", "scotland"] as const;

const ASSET_LABEL: Record<Asset, string> = { shares: "Shares or funds", property: "Residential property", crypto: "Cryptoassets", business: "Business (Business Asset Disposal Relief)" };

export default function CgtStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const rawGain = v.sale - v.cost - v.costs;
  const prrShare = v.asset === "property" ? Math.min(100, v.prr) / 100 : 0;
  const gain = Math.max(0, rawGain * (1 - prrShare));
  const loss = rawGain < 0 ? -rawGain : 0;
  const base = { nonSavings: v.income, savings: v.savings, dividends: v.dividends, bandExtension: v.pension, scotland: v.scotland };
  const isBadr = v.asset === "business";
  const r = capitalGains2026({ ...base, gains: isBadr ? 0 : gain, reliefGains: isBadr ? gain : 0, currentLosses: v.losses + loss, broughtForward: v.bf, exemptUsed: v.exemptUsed });
  // Splitting the sale across two tax years, or sharing with a spouse first.
  const half = gain / 2;
  const split = capitalGains2026({ ...base, gains: isBadr ? 0 : half, reliefGains: isBadr ? half : 0, broughtForward: v.bf, exemptUsed: v.exemptUsed });
  const splitNext = capitalGains2026({ ...base, gains: isBadr ? 0 : half, reliefGains: isBadr ? half : 0 });
  const spouse = capitalGains2026({ nonSavings: v.spouseIncome, savings: 0, dividends: 0, gains: isBadr ? 0 : half, reliefGains: isBadr ? half : 0 });
  const options = [
    { label: "Sell everything this tax year", tax: r.tax },
    { label: "Sell half now, half after 5 April", tax: split.tax + splitNext.tax },
    { label: "Give half to your spouse first", tax: split.tax + spouse.tax },
  ];
  const maxOpt = Math.max(1, ...options.map((o) => o.tax));
  const best = options.reduce((a, b) => (b.tax < a.tax ? b : a));

  return (
    <Studio
      title="The sale"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out Capital Gains Tax"
      onReset={st.reset}
      dock={{ label: "Capital Gains Tax", value: gbp(r.tax) }}
      inputs={
        <>
          <InputGroup title="What you sold">
            <SelectField label="Type of asset" value={v.asset} onChange={st.bind("asset")} options={(Object.keys(ASSET_LABEL) as Asset[]).map((a) => ({ value: a, label: ASSET_LABEL[a] }))} />
            <MoneyField label="Sale price" value={v.sale} onChange={st.bind("sale")} hint="Or market value, if you gave it away." />
            <MoneyField label="Purchase price" value={v.cost} onChange={st.bind("cost")} />
            <MoneyField label="Buying and selling costs" value={v.costs} onChange={st.bind("costs")} hint="Fees, stamp duty, legal costs and improvements (not repairs)." />
          </InputGroup>
          <InputGroup title="Your income">
            <MoneyField label="Taxable income this year" value={v.income} onChange={st.bind("income")} hint="Salary, pension, self-employed profit and rent, before the Personal Allowance." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Savings interest" value={v.savings} onChange={st.bind("savings")} optional />
            <MoneyField label="Dividends" value={v.dividends} onChange={st.bind("dividends")} optional />
            <MoneyField label="Personal pension contributions and Gift Aid (gross)" value={v.pension} onChange={st.bind("pension")} optional hint="Extend your basic-rate band, so more of the gain is taxed at 18%." />
            <MoneyField label="Other losses this tax year" value={v.losses} onChange={st.bind("losses")} optional />
            <MoneyField label="Losses brought forward" value={v.bf} onChange={st.bind("bf")} optional hint="Reported to HMRC in earlier years." />
            <MoneyField label="Annual exempt amount already used" value={v.exemptUsed} onChange={st.bind("exemptUsed")} optional />
            {v.asset === "property" && <StepperField label="Share of the gain covered by Private Residence Relief" value={v.prr} onChange={st.bind("prr")} step={5} min={0} max={100} unit="%" dp={0} optional hint="For a home you lived in for part of the time you owned it." />}
            <MoneyField label="Spouse's or civil partner's income" value={v.spouseIncome} onChange={st.bind("spouseIncome")} optional hint="For the option of giving them half first." />
            <Switch label="Scottish taxpayer" checked={v.scotland} onChange={st.bind("scotland")} optional hint="Capital gains use UK bands, but your Scottish income tax is shown correctly." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Capital Gains Tax"
        value={gbp(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          rawGain <= 0 ? (
            <>
              This sale makes a loss of <b>{gbp(loss)}</b>. There is no tax, and you can report the loss to HMRC to set against future gains.
            </>
          ) : r.tax <= 0 ? (
            <>
              Your gain of <b>{gbp(gain)}</b> is covered by the <b>{gbp(INV_2026.cgtExempt)}</b> annual exempt amount{r.lossesUsedCurrent + r.lossesUsedBroughtForward > 0 ? " and your losses" : ""}, so no tax is due.
            </>
          ) : (
            <>
              Your gain is <b>{gbp(gain)}</b>. After the <b>{gbp(r.exempt)}</b> exempt amount{r.lossesUsedCurrent + r.lossesUsedBroughtForward > 0 ? " and losses" : ""}, <b>{gbp(r.taxableGains)}</b> is taxable
              {isBadr ? (
                <> at the Business Asset Disposal Relief rate of 18%</>
              ) : (
                <>
                  : <b>{gbp(r.atBasic)}</b> at 18% and <b>{gbp(r.atHigher)}</b> at 24%
                </>
              )}
              . {best.tax < r.tax - 1 ? <>{best.label} could cut the bill to {gbp(best.tax)}.</> : null}
            </>
          )
        }
        badges={[ASSET_LABEL[v.asset], `Effective rate ${percent(r.effectiveRate, 1)}`, v.asset === "property" ? "Report and pay within 60 days" : "Pay by 31 January"]}
      />

      <Facts
        items={[
          { label: "Gain", value: gbp(gain) },
          { label: "Taxable gain", value: gbp(r.taxableGains) },
          { label: "Basic-rate band left", value: gbp(r.basicBandLeft) },
          { label: "Tax", value: gbp(r.tax), tone: r.tax > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Exempt amount", value: gbp(INV_2026.cgtExempt) },
          { label: "Rates", value: isBadr ? "18% with relief" : "18% and 24%" },
          { label: "Bands", value: "UK bands, including for Scottish taxpayers" },
        ]}
      />

      <ResultCard title="How the tax is worked out" sub="For this tax year.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Sale price", values: [gbp(v.sale)] },
            { label: "Purchase price and costs", values: [`−${gbp(v.cost + v.costs)}`], kind: "deduction" as const },
            ...(prrShare > 0 ? [{ label: "Private Residence Relief", values: [`−${gbp(Math.max(0, rawGain) * prrShare)}`], kind: "deduction" as const }] : []),
            { label: "Gain", values: [gbp(gain)], kind: "total" as const },
            ...(r.lossesUsedCurrent > 0 ? [{ label: "Losses this year", values: [`−${gbp(Math.min(r.lossesUsedCurrent, gain))}`], kind: "deduction" as const }] : []),
            ...(r.lossesUsedBroughtForward > 0 ? [{ label: "Losses brought forward", values: [`−${gbp(r.lossesUsedBroughtForward)}`], kind: "deduction" as const }] : []),
            { label: "Annual exempt amount", values: [`−${gbp(r.exempt)}`], kind: "deduction" as const },
            { label: "Taxable gain", values: [gbp(r.taxableGains)], kind: "total" as const },
            ...(isBadr ? [{ label: "At 18% (Business Asset Disposal Relief)", values: [gbp(r.reliefTax)] }] : [{ label: "At 18%", values: [gbp(r.atBasic * INV_2026.cgtBasic)] }, { label: "At 24%", values: [gbp(r.atHigher * INV_2026.cgtHigher)] }]),
            { label: "Capital Gains Tax", values: [gbp(r.tax)], kind: "total" as const },
          ]}
        />
        {gain > 0 && (
          <SplitBar
            segments={[
              { label: "Tax-free", value: Math.max(0, gain - r.taxableGains), display: gbp(Math.max(0, gain - r.taxableGains)), color: "#16a34a" },
              { label: "Taxed at 18%", value: isBadr ? r.reliefTaxable : r.atBasic, display: gbp(isBadr ? r.reliefTaxable : r.atBasic), color: "#4353ff" },
              ...(isBadr ? [] : [{ label: "Taxed at 24%", value: r.atHigher, display: gbp(r.atHigher), color: "#f59e0b" }]),
            ]}
          />
        )}
      </ResultCard>

      {gain > INV_2026.cgtExempt && (
        <ResultCard title="Ways to pay less" sub="The same gain, timed or shared differently.">
          <Compare head={["Approach", "Tax"]} rows={options.map((o) => ({ label: o.label, value: gbp(o.tax), delta: o.tax < r.tax - 1 ? `Save ${gbp(r.tax - o.tax)}` : undefined, bar: o.tax / maxOpt, current: o === options[0] }))} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Reporting and paying.">
        {v.asset === "property" && (
          <Callout tone="warn" title="60 days to report and pay">
            For UK residential property, you must report the sale and pay the tax within 60 days of completion, using a Capital Gains Tax on UK property account.
          </Callout>
        )}
        {v.asset !== "property" && (
          <Callout title="Report through Self Assessment">
            Report gains on shares, crypto and other assets in your tax return, or with the real-time service if you do not normally file one. Tax is due by 31 January after the tax year ends.
          </Callout>
        )}
        <Callout title="Shelter future gains">
          Gains inside an ISA or pension are tax-free. &ldquo;Bed and ISA&rdquo; moves investments into an ISA by selling and rebuying, using up to £3,000 of gains a year tax-free.
        </Callout>
        {isBadr && (
          <Callout title="Business Asset Disposal Relief">
            The rate rose to 18% from 6 April 2026, the same as the basic rate. The relief still matters for higher-rate taxpayers, who would otherwise pay 24%. Lifetime limit £1 million.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rules. Not tax advice.
      </p>
    </Studio>
  );
}
