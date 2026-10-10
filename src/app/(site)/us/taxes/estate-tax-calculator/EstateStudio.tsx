"use client";

import { annualGifting, ESTATE_2026, estateTax, stateDeathTax } from "@/lib/us/estate-property";
import { STATES } from "@/lib/us/states";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  gross: num(20_000_000, 0, 10_000_000_000),
  debts: num(500_000, 0, 10_000_000_000),
  marital: num(0, 0, 10_000_000_000),
  charitable: num(0, 0, 10_000_000_000),
  state: oneOf<string>("TX", CODES),
  expenses: num(300_000, 0, 1_000_000_000),
  lifetimeGifts: num(0, 0, 10_000_000_000),
  giftTaxPaid: num(0, 0, 10_000_000_000),
  dsue: num(0, 0, ESTATE_2026.exclusion),
  stateTaxPaid: num(0, 0, 1_000_000_000),
  recipients: num(0, 0, 50),
  giftYears: num(10, 1, 40),
  split: bool(false),
};
const ADVANCED = ["expenses", "lifetimeGifts", "giftTaxPaid", "dsue", "stateTaxPaid", "recipients", "giftYears", "split"] as const;

const C = { heirs: "#2a78d6", tax: "#eb6834", spouse: "#1baf7a", charity: "#4a3aa7", debts: "#9aa1a9" };
const SIZES = [5_000_000, 10_000_000, 15_000_000, 20_000_000, 25_000_000, 30_000_000, 40_000_000, 50_000_000, 75_000_000, 100_000_000];

export default function EstateStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    gross: v.gross,
    debts: v.debts,
    expenses: v.expenses,
    marital: v.marital,
    charitable: v.charitable,
    stateDeathTax: v.stateTaxPaid,
    lifetimeGifts: v.lifetimeGifts,
    giftTaxPaid: v.giftTaxPaid,
    dsue: v.dsue,
  };
  const r = estateTax(input);
  const debtsAndCosts = Math.min(v.gross, v.debts + v.expenses + v.stateTaxPaid);
  const spouse = Math.min(Math.max(0, v.gross - debtsAndCosts), v.marital);
  const charity = Math.min(Math.max(0, v.gross - debtsAndCosts - spouse), v.charitable);
  const stateRule = stateDeathTax(v.state);
  const stateName = STATES.find((s) => s.code === v.state)?.name ?? v.state;
  const gifted = Math.min(v.gross, annualGifting(v.recipients, v.giftYears, v.split));
  const afterGifts = estateTax({ ...input, gross: v.gross - gifted });
  const giftSaving = r.tax - afterGifts.tax;
  const rows = SIZES.map((g) => {
    const x = estateTax({ ...input, gross: g });
    return [usd(g), usd(x.taxableEstate), usd(x.tax), percent(x.effectiveRate, 1)];
  });

  return (
    <Studio
      title="Your estate tax"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the estate tax"
      onReset={st.reset}
      dock={{ label: "Federal estate tax", value: usd(r.tax) }}
      inputs={
        <>
          <InputGroup title="The estate">
            <MoneyField
              label="Gross estate"
              symbol="$"
              value={v.gross}
              onChange={st.bind("gross")}
              slider={{ min: 0, max: 100_000_000, step: 250_000, ends: ["$0", "$100m"] }}
              info="Everything owned at death at market value: homes, investments, retirement accounts, business interests, life insurance the person owned, and their share of joint property."
            />
            <MoneyField label="Debts and mortgages" symbol="$" value={v.debts} onChange={st.bind("debts")} />
            <MoneyField label="Left to a spouse" symbol="$" value={v.marital} onChange={st.bind("marital")} info="Everything left to a spouse who is a US citizen is deducted in full (the unlimited marital deduction)." />
            <MoneyField label="Left to charity" symbol="$" value={v.charitable} onChange={st.bind("charitable")} info="Bequests to qualifying charities are deducted in full." />
            <SelectField
              label="State of residence"
              value={v.state}
              onChange={st.bind("state")}
              options={STATES.map((s) => ({ value: s.code, label: s.name }))}
              info="Used to flag a state estate or inheritance tax. The federal figure is the same in every state."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Funeral and settlement costs" symbol="$" optional value={v.expenses} onChange={st.bind("expenses")} info="Funeral costs, executor and attorney fees, appraisals and other costs of settling the estate." />
            <MoneyField
              label="Taxable gifts made in life"
              symbol="$"
              optional
              value={v.lifetimeGifts}
              onChange={st.bind("lifetimeGifts")}
              info="Gifts above the annual exclusion reported on Form 709 since 1976. They use up part of the same $15 million and are added back here."
            />
            <MoneyField label="Gift tax already paid" symbol="$" optional value={v.giftTaxPaid} onChange={st.bind("giftTaxPaid")} />
            <MoneyField
              label="Unused exclusion from a late spouse (DSUE)"
              symbol="$"
              optional
              value={v.dsue}
              onChange={st.bind("dsue")}
              info="Portability: if a spouse died and their executor filed Form 706 to elect it, their unused exclusion adds to yours. A spouse who died in 2025 had $13.99 million."
            />
            <MoneyField label="State estate or inheritance tax paid" symbol="$" optional value={v.stateTaxPaid} onChange={st.bind("stateTaxPaid")} info="Deductible from the federal taxable estate." />
            <StepperField
              label="Annual gifts: people you give to"
              optional
              value={v.recipients}
              onChange={(n) => st.set("recipients", Math.round(n))}
              step={1}
              min={0}
              max={50}
              unit="people"
              dp={0}
              info={`Gifts of up to ${usd(ESTATE_2026.annualExclusion)} a person a year in 2026 don't use the exclusion and leave the estate.`}
            />
            <StepperField label="Years of annual gifts" optional value={v.giftYears} onChange={(n) => st.set("giftYears", Math.round(n))} step={1} min={1} max={40} unit="years" dp={0} />
            <Switch label="Split gifts with a spouse" optional checked={v.split} onChange={st.bind("split")} info={`A married couple can give ${usd(ESTATE_2026.annualExclusion * 2)} a person a year.`} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Federal estate tax"
        value={usd(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.tax > 0 ? (
            <>
              The taxable estate of <b>{usd(r.taxableEstate)}</b>
              {v.lifetimeGifts > 0 ? <> plus {usd(v.lifetimeGifts)} of lifetime gifts</> : null} is {usd(r.taxBase - r.exclusion)} over the {usd(r.exclusion)} exclusion, taxed at
              40%. That is <b>{percent(r.effectiveRate, 1)}</b>{" "}of the gross estate.
            </>
          ) : (
            <>
              No federal estate tax. The taxable estate{v.lifetimeGifts > 0 ? " and lifetime gifts" : ""} of <b>{usd(r.taxBase)}</b>{" "}fit within the {usd(r.exclusion)} exclusion, with{" "}
              <b>{usd(r.exclusionLeft)}</b>{" "}to spare.
            </>
          )
        }
        badges={[`Exclusion ${usd(r.exclusion)}`, `Taxable estate ${usd(r.taxableEstate)}`, r.tax > 0 ? "Top rate 40%" : "Under the exclusion", stateRule ? `${stateName}: state ${stateRule.kind === "inheritance" ? "inheritance" : "estate"} tax` : "No state death tax"]}
      />

      <Facts
        items={[
          { label: "Taxable estate", value: usd(r.taxableEstate) },
          { label: "Exclusion available", value: usd(r.exclusion), note: v.dsue > 0 ? "Including your late spouse's DSUE" : "2026 basic exclusion" },
          { label: "Estate tax", value: usd(r.tax), tone: r.tax > 0 ? "warn" : "good" },
          { label: "Left to heirs after tax", value: usd(r.toHeirs) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Year of death", value: "2026: $15,000,000 basic exclusion, rates of 18% to 40%" },
          { label: "Spouse", value: v.marital > 0 ? "A US citizen, so the marital deduction is unlimited" : "Nothing left to a spouse" },
          { label: "Lifetime gifts", value: v.lifetimeGifts > 0 ? `${usd(v.lifetimeGifts)} of taxable gifts added back` : "None above the annual exclusion" },
          { label: "Portability", value: v.dsue > 0 ? `${usd(Math.min(v.dsue, ESTATE_2026.exclusion))} of DSUE elected on a late spouse's Form 706` : "No unused exclusion from a late spouse" },
          { label: "Not included", value: "State estate or inheritance tax, generation-skipping tax, valuation discounts and income tax on inherited retirement accounts" },
        ]}
      />

      <ResultCard title="Where the estate goes" sub="The gross estate split between debts and costs, your spouse, charity, the IRS and other heirs.">
        <SplitBar
          segments={[
            { label: "Other heirs", value: r.toHeirs, display: usd(r.toHeirs), color: C.heirs },
            { label: "Federal estate tax", value: r.tax, display: usd(r.tax), color: C.tax },
            { label: "Spouse", value: spouse, display: usd(spouse), color: C.spouse },
            { label: "Charity", value: charity, display: usd(charity), color: C.charity },
            { label: "Debts and costs", value: debtsAndCosts, display: usd(debtsAndCosts), color: C.debts },
          ]}
          caption="Heirs may still owe income tax later on inherited traditional IRAs and 401(k)s."
        />
      </ResultCard>

      <ResultCard title="How the tax is worked out" sub="A simplified Form 706.">
        <Statement
          columns={["2026"]}
          rows={[
            { label: "Gross estate", values: [usd(v.gross)] },
            { label: "Debts, costs, spouse, charity and state tax", values: [`−${usd(r.deductions)}`], kind: "deduction" },
            { label: "Taxable estate", values: [usd(r.taxableEstate)], kind: "total" },
            ...(v.lifetimeGifts > 0 ? [{ label: "Plus taxable gifts made in life", values: [usd(v.lifetimeGifts)] }] : []),
            { label: "Tax base", values: [usd(r.taxBase)] },
            { label: "Tentative tax (18% to 40% schedule)", values: [usd(r.tentative)] },
            ...(v.giftTaxPaid > 0 ? [{ label: "Less gift tax already paid", values: [`−${usd(v.giftTaxPaid)}`], kind: "deduction" as const }] : []),
            { label: `Less the credit on ${usd(r.exclusion)}`, values: [`−${usd(Math.min(r.credit, r.tentative))}`], kind: "deduction" },
            { label: "Federal estate tax", values: [usd(r.tax)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="The tax at other estate sizes" sub="With the same debts, costs, gifts and bequests as now.">
        <DataTable summary="Estate tax by gross estate" columns={["Gross estate", "Taxable estate", "Estate tax", "Share of the estate"]} rows={rows} />
      </ResultCard>

      {v.recipients > 0 ? (
        <ResultCard title="What annual gifts would save" sub={`${v.recipients} ${v.recipients === 1 ? "person" : "people"} × ${usd(ESTATE_2026.annualExclusion * (v.split ? 2 : 1))} a year for ${v.giftYears} years.`}>
          <Facts
            items={[
              { label: "Moved out of the estate", value: usd(gifted) },
              { label: "Estate tax after the gifts", value: usd(afterGifts.tax) },
              { label: "Tax saved", value: usd(giftSaving), tone: giftSaving > 0 ? "good" : undefined },
            ]}
          />
          <p className="footnote">Assumes the estate is the same size apart from the gifts. Any growth on money given away also stays out of the estate.</p>
        </ResultCard>
      ) : (
        <ResultCard title="Annual gifts" sub="Gifts within the annual exclusion don't use the $15 million.">
          <Callout title="Try a gifting plan">
            Under More options, enter how many people you give to each year. In 2026 each can receive {usd(ESTATE_2026.annualExclusion)} from you ({usd(ESTATE_2026.annualExclusion * 2)} from a couple) with no
            gift tax return.
          </Callout>
        </ResultCard>
      )}

      {stateRule && (
        <Callout tone="warn" title={`${stateName} has its own ${stateRule.kind === "both" ? "estate and inheritance taxes" : stateRule.kind === "inheritance" ? "inheritance tax" : "estate tax"}`}>
          {stateRule.estateExemption
            ? `Its estate tax applied above about ${usd(stateRule.estateExemption)} in 2025, with a top rate of ${percent(stateRule.topRate)}. That is far below the federal exclusion, so a state bill is possible even when the federal one is zero. `
            : `Rates of up to ${percent(stateRule.topRate)} depend on who inherits; spouses are exempt and close relatives often pay little or nothing. `}
          Check the state revenue department for the current figures.
        </Callout>
      )}

      {v.marital > 0 && r.exclusionLeft > 0 && (
        <Callout title="Elect portability">
          {usd(Math.min(r.exclusionLeft, ESTATE_2026.exclusion))} of exclusion is unused. If the executor files Form 706 and elects portability, your spouse can add it to their own exclusion, even if no tax is due.
        </Callout>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate for planning, not legal or tax advice. An estate attorney can check valuations and the state rules.
      </p>
    </Studio>
  );
}
