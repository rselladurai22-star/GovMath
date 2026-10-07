"use client";

import { sharedOwnership } from "@/lib/property/shared-ownership";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent, per } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  value: num(300_000, 0, 5_000_000),
  share: num(40, 10, 75),
  deposit: num(10, 5, 100),
  rate: num(4.75, 0, 15),
  term: num(30, 5, 40),
  rent: num(2.75, 0, 5),
  service: num(150, 0, 5_000),
  growth: num(3, -5, 15),
  rentRise: num(3, 0, 10),
  stairYear: num(0, 0, 25),
  stairTo: num(75, 0, 100),
  ftb: bool(true),
};
const ADVANCED = ["term", "rent", "service", "growth", "rentRise", "stairYear", "stairTo", "ftb"] as const;
const COLORS = { mortgage: "#5b1e6e", rent: "#f59e0b", service: "#2e0a3a" };

export default function SharedOwnershipStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = sharedOwnership({
    value: v.value,
    sharePct: v.share,
    depositPct: v.deposit,
    ratePct: v.rate,
    termYears: v.term,
    rentPct: v.rent,
    serviceCharge: v.service,
    growthPct: v.growth,
    rentRisePct: v.rentRise,
    staircaseYear: v.stairYear,
    staircaseTo: v.stairTo,
    firstTimeBuyer: v.ftb,
  });
  const outrightLtvOk = r.outright.ltv <= 0.95;
  const cheaper = r.monthly < r.outright.monthly;

  return (
    <Studio
      title="Your shared ownership home"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my monthly costs"
      onReset={st.reset}
      dock={{ label: "Monthly cost", value: gbp(r.monthly) }}
      inputs={
        <>
          <InputGroup title="The home and your share">
            <MoneyField label="Full market value" value={v.value} onChange={st.bind("value")} big slider={{ min: 100_000, max: 600_000, step: 5_000, ends: ["£100k", "£600k"] }} hint="The value of the whole home, not your share." />
            <StepperField label="Share you are buying" value={v.share} onChange={st.bind("share")} step={5} min={10} max={75} unit="%" dp={0} hint="Usually 10% to 75%." />
            <StepperField label="Deposit as % of your share" value={v.deposit} onChange={st.bind("deposit")} step={1} min={5} max={100} unit="%" dp={0} hint="Usually 5% to 10% of the share price." />
            <StepperField label="Mortgage rate" value={v.rate} onChange={st.bind("rate")} step={0.1} min={0} max={15} unit="%" />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Mortgage term" value={v.term} onChange={st.bind("term")} step={1} min={5} max={40} unit="years" dp={0} optional />
            <StepperField label="Rent on the share you don't own" value={v.rent} onChange={st.bind("rent")} step={0.25} min={0} max={5} unit="% a year" optional hint="Often 2.75% for new homes. Check your lease." />
            <MoneyField label="Service charge and ground rent a month" value={v.service} onChange={st.bind("service")} optional />
            <StepperField label="Yearly rent increase" value={v.rentRise} onChange={st.bind("rentRise")} step={0.5} min={0} max={10} unit="%" dp={1} optional hint="Usually linked to inflation in your lease." />
            <StepperField label="Yearly house price growth" value={v.growth} onChange={st.bind("growth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional />
            <StepperField label="Buy more shares in year" value={v.stairYear} onChange={st.bind("stairYear")} step={1} min={0} max={25} unit="" dp={0} optional hint="Staircasing. Leave at 0 to skip." />
            {v.stairYear > 0 && <StepperField label="Share after staircasing" value={v.stairTo} onChange={st.bind("stairTo")} step={5} min={v.share} max={100} unit="%" dp={0} optional />}
            <Switch label="First-time buyer" checked={v.ftb} onChange={st.bind("ftb")} optional hint="For the Stamp Duty figures (England)." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your monthly cost"
        value={gbp(r.monthly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Buying <b>{v.share}%</b> of a <b>{gbp(v.value)}</b> home costs <b>{gbp(r.sharePrice)}</b>. With a <b>{gbp(r.deposit)}</b> deposit you pay about <b>{gbp(r.mortgage)}</b> mortgage,{" "}
            <b>{gbp(r.rent)}</b> rent{v.service > 0 && <> and <b>{gbp(v.service)}</b> service charge</>} a month.
          </>
        }
        badges={[`${gbp(r.sharePrice)} share price`, `${gbp(r.deposit)} deposit`, `${gbp(r.rent)} rent a month`]}
      />

      <Facts
        items={[
          { label: "Mortgage", value: gbp(r.mortgage), note: `On ${gbp(r.loan)}` },
          { label: "Rent", value: gbp(r.rent), note: `${v.rent}% of ${gbp(v.value - r.sharePrice)}` },
          { label: "Service charge", value: gbp(r.serviceCharge) },
          { label: "Stamp Duty on your share", value: gbp(r.sdlt.onShare), tone: r.sdlt.onShare === 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Where", value: "England" },
          { label: "Mortgage", value: `${v.rate}%, ${v.term} ${per(v.term, "years")}, repayment` },
          { label: "Rent", value: `${v.rent}% a year, rising ${v.rentRise}%` },
          { label: "Prices", value: `Rising ${v.growth}% a year` },
        ]}
      />

      <ResultCard title="Where your money goes each month" sub="Mortgage on your share, rent on the rest, plus charges.">
        <SplitBar
          segments={[
            { label: "Mortgage", value: r.mortgage, display: gbp(r.mortgage), color: COLORS.mortgage },
            { label: "Rent", value: r.rent, display: gbp(r.rent), color: COLORS.rent },
            ...(r.serviceCharge > 0 ? [{ label: "Service charge", value: r.serviceCharge, display: gbp(r.serviceCharge), color: COLORS.service }] : []),
          ]}
          caption={
            <>
              Only the mortgage part builds up equity you own. The rent and service charge are like rent in a rented home.
            </>
          }
        />
      </ResultCard>

      <ResultCard title="Against buying the whole home" sub={`With the same ${gbp(r.deposit)} deposit.`}>
        <Statement
          columns={["Shared ownership", "Buy outright"]}
          rows={[
            { label: "Mortgage needed", values: [gbp(r.loan), gbp(r.outright.loan)] },
            { label: "Loan to value", values: [percent(r.sharePrice > 0 ? r.loan / r.sharePrice : 0), percent(r.outright.ltv)] },
            { label: "Mortgage a month", values: [gbp(r.mortgage), gbp(r.outright.mortgage)] },
            { label: "Rent a month", values: [gbp(r.rent), "£0"] },
            { label: "Total a month", values: [gbp(r.monthly), gbp(r.outright.monthly)], kind: "total" },
          ]}
        />
        {!outrightLtvOk ? (
          <Callout title="Buying outright would need a bigger deposit">
            Your deposit is only {percent(v.value > 0 ? r.deposit / v.value : 0, 1)} of the full value. Most lenders need at least 5%: <b>{gbp(v.value * 0.05)}</b>.
          </Callout>
        ) : cheaper ? (
          <Callout tone="good" title={`${gbp(r.outright.monthly - r.monthly)} a month cheaper than buying outright`}>
            Shared ownership costs less each month here, and needs a much smaller mortgage.
          </Callout>
        ) : (
          <Callout title={`${gbp(r.monthly - r.outright.monthly)} a month more than buying outright`}>
            If you could get the larger mortgage, buying outright would cost less each month and you would own the whole home.
          </Callout>
        )}
      </ResultCard>

      {r.staircase && (
        <ResultCard title={`Staircasing to ${v.stairTo}% in year ${r.staircase.year}`} sub="Buying more shares at the home's value at the time.">
          <Facts
            items={[
              { label: "Home value then", value: gbp(r.staircase.valueThen) },
              { label: `Cost of ${percent(r.staircase.shareBought)} more`, value: gbp(r.staircase.cost) },
              { label: "Rent before", value: `${gbp(r.staircase.rentBefore)} a month` },
              { label: "Rent after", value: `${gbp(r.staircase.rentAfter)} a month`, tone: "good" },
            ]}
          />
          <p className="footnote">
            You pay the market value at the time, set by a RICS valuation. You also pay legal and valuation fees, and usually remortgage to raise the money.
          </p>
        </ResultCard>
      )}

      <ResultCard title="Stamp Duty: two ways to pay" sub="Choose when you buy. You cannot switch later.">
        <Statement
          columns={["Pay on your share", "Pay on full value"]}
          rows={[
            { label: "Stamp Duty now", values: [gbp(r.sdlt.onShare), gbp(r.sdlt.marketValue)], kind: "total" },
            { label: "When you staircase", values: ["Tax may be due above 80%", "Nothing more"] },
          ]}
        />
        {r.sdlt.ftbRelief ? (
          <p className="footnote">First-time buyer relief applies because the full value is £500,000 or less.</p>
        ) : (
          v.ftb && <p className="footnote">First-time buyer relief does not apply because the full value is over £500,000.</p>
        )}
      </ResultCard>

      {r.rent > 0 && (
        <DataTable
          summary="Your rent over the next 10 years"
          columns={["Year", "Rent a month", "Rent a year"]}
          rows={r.rentByYear.map((m, i) => [`Year ${i + 1}`, gbp(m), gbp(m * 12)])}
        />
      )}

      <ResultCard title="Worth knowing" sub="Shared ownership has rules a normal purchase does not.">
        <Callout title="Repairs">
          On most newer leases the landlord helps with some essential repairs for the first 10 years. After that, and on older leases, you are usually responsible for all
          repairs even though you only own part of the home.
        </Callout>
        <Callout title="Selling">
          Your housing provider usually has a period to find a buyer before you can sell on the open market. You sell your share at its value at the time.
        </Callout>
        <Callout tone="warn" title="Rent and service charges rise">
          Rent usually rises each year in line with inflation, set by your lease. Service charges can rise too, sometimes sharply.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        England rules. Your provider&apos;s lease sets the rent, rent increases and staircasing terms.
      </p>
    </Studio>
  );
}
