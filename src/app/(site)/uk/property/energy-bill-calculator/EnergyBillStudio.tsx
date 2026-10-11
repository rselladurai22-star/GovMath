"use client";

import {
  CAP_JUL_SEP_2026 as PREV,
  CAP_OCT_DEC_2026 as CAP,
  ELEC_VAT_ZERO_UNTIL,
  NEXT_CAP_ANNOUNCEMENT,
  TDCV_2026,
  energyBill,
  usageFromSpend,
  type Payment,
} from "@/lib/energy/costs";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  mode: oneOf<"kwh" | "spend">("kwh", ["kwh", "spend"]),
  fuel: oneOf<"dual" | "elec">("dual", ["dual", "elec"]),
  elecKwh: num(TDCV_2026.elec.medium, 0, 50_000),
  gasKwh: num(TDCV_2026.gas.medium, 0, 100_000),
  spend: num(140, 0, 5_000),
  payment: oneOf<Payment>("dd", ["dd", "sc", "ppm"]),
  eUnit: num(0, 0, 200),
  eSt: num(0, 0, 300),
  gUnit: num(0, 0, 100),
  gSt: num(0, 0, 300),
};
const ADVANCED = ["payment", "eUnit", "eSt", "gUnit", "gSt"] as const;
type Level = "low" | "medium" | "high";
const PAY_LABEL: Record<Payment, string> = { dd: "Direct Debit", sc: "Pay on receipt of bill", ppm: "Prepayment" };
const kwh = (n: number) => `${Math.round(Number.isFinite(n) ? n : 0).toLocaleString("en-GB")} kWh`;

export default function EnergyBillStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const hasGas = v.fuel === "dual";
  const fromSpend = v.mode === "spend" ? usageFromSpend(v.spend, PREV, hasGas) : null;
  const elecKwh = fromSpend ? fromSpend.elecKwh : v.elecKwh;
  const gasKwh = fromSpend ? fromSpend.gasKwh : v.gasKwh;
  const own = { elecUnit: v.eUnit, elecStanding: v.eSt, gasUnit: v.gUnit, gasStanding: v.gSt };
  const ownRates = v.eUnit > 0 || v.eSt > 0 || v.gUnit > 0 || v.gSt > 0;

  const b = energyBill({ elecKwh, gasKwh, hasGas, cap: CAP, payment: v.payment, own });
  const p = energyBill({ elecKwh, gasKwh, hasGas, cap: PREV, payment: v.payment });
  const change = b.year - p.year;
  const vatSaved = b.elec.total * 0.05;

  const level: Level | "" = (["low", "medium", "high"] as Level[]).find((l) => TDCV_2026.elec[l] === v.elecKwh && (!hasGas || TDCV_2026.gas[l] === v.gasKwh)) ?? "";
  const pickLevel = (l: Level | "") => {
    if (!l) return;
    st.set("elecKwh", TDCV_2026.elec[l]);
    st.set("gasKwh", TDCV_2026.gas[l]);
  };

  const segments = [
    { label: "Electricity used", value: b.elec.units, display: gbp(b.elec.units), color: "#2a78d6" },
    { label: "Electricity standing charge", value: b.elec.standing, display: gbp(b.elec.standing), color: "#4a3aa7" },
    ...(hasGas
      ? [
          { label: "Gas used", value: b.gas.units, display: gbp(b.gas.units), color: "#eb6834" },
          { label: "Gas standing charge", value: b.gas.standing, display: gbp(b.gas.standing), color: "#eda100" },
        ]
      : []),
    ...(b.paymentAdjust > 0 ? [{ label: "Payment method extra", value: b.paymentAdjust, display: gbp(b.paymentAdjust), color: "#9aa1a9" }] : []),
  ];
  const twelfth = (n: number) => gbp(n / 12, true);
  const eUnitShown = v.eUnit > 0 ? v.eUnit : CAP.elecUnit;
  const eStShown = v.eSt > 0 ? v.eSt : CAP.elecStanding;
  const gUnitShown = v.gUnit > 0 ? v.gUnit : CAP.gasUnit;
  const gStShown = v.gSt > 0 ? v.gSt : CAP.gasStanding;

  return (
    <Studio
      title="Your energy use"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my energy bill"
      onReset={st.reset}
      dock={{ label: "Energy a year", value: gbp(b.year) }}
      inputs={
        <>
          <InputGroup title="Your energy use">
            <RadioGroup
              label="Your home has"
              value={v.fuel}
              onChange={st.bind("fuel")}
              options={[
                { value: "dual", label: "Gas and electricity" },
                { value: "elec", label: "Electricity only" },
              ]}
            />
            <RadioGroup
              label="I know my"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "kwh", label: "Yearly use (kWh)" },
                { value: "spend", label: "Monthly payment" },
              ]}
              info="Your yearly use is on your bill or annual statement, as your \u201cestimated annual consumption\u201d. If you only know what you pay each month, choose Monthly payment."
            />
            {v.mode === "kwh" ? (
              <>
                <RadioGroup
                  label="Typical use"
                  value={level as Level}
                  onChange={pickLevel}
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                  ]}
                  info={`Ofgem's typical yearly use from July 2026. Electricity: ${TDCV_2026.elec.low.toLocaleString("en-GB")}, ${TDCV_2026.elec.medium.toLocaleString("en-GB")} or ${TDCV_2026.elec.high.toLocaleString("en-GB")} kWh. Gas: ${TDCV_2026.gas.low.toLocaleString("en-GB")}, ${TDCV_2026.gas.medium.toLocaleString("en-GB")} or ${TDCV_2026.gas.high.toLocaleString("en-GB")} kWh. Medium is a typical home.`}
                />
                <StepperField label="Electricity a year" value={v.elecKwh} onChange={st.bind("elecKwh")} step={100} min={0} max={50000} unit="kWh" dp={0} />
                {hasGas && <StepperField label="Gas a year" value={v.gasKwh} onChange={st.bind("gasKwh")} step={500} min={0} max={100000} unit="kWh" dp={0} />}
              </>
            ) : (
              <MoneyField
                label="Monthly payment, July to September 2026"
                value={v.spend}
                onChange={st.bind("spend")}
                info="What you paid each month by Direct Debit for gas and electricity on a price cap tariff before 1 October 2026. We work out your likely use from it, then price that use at the new cap."
              />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <RadioGroup
              label="How you pay"
              value={v.payment}
              onChange={st.bind("payment")}
              optional
              options={[
                { value: "dd", label: "Direct Debit" },
                { value: "sc", label: "On receipt of bill" },
                { value: "ppm", label: "Prepayment" },
              ]}
              info="Paying when the bill arrives (standard credit) costs more than Direct Debit; prepayment costs a little less. We scale by Ofgem's typical bills for each method."
            />
            <StepperField label="Your electricity unit rate" value={v.eUnit} onChange={st.bind("eUnit")} step={0.5} min={0} max={200} unit="p/kWh" dp={2} optional info={`From your bill. Leave at 0 to use the price cap average, ${CAP.elecUnit}p.`} />
            <StepperField label="Your electricity standing charge" value={v.eSt} onChange={st.bind("eSt")} step={1} min={0} max={300} unit="p/day" dp={2} optional info={`Leave at 0 to use the price cap average, ${CAP.elecStanding}p a day.`} />
            {hasGas && (
              <>
                <StepperField label="Your gas unit rate" value={v.gUnit} onChange={st.bind("gUnit")} step={0.25} min={0} max={100} unit="p/kWh" dp={2} optional info={`Leave at 0 to use the price cap average, ${CAP.gasUnit}p.`} />
                <StepperField label="Your gas standing charge" value={v.gSt} onChange={st.bind("gSt")} step={1} min={0} max={300} unit="p/day" dp={2} optional info={`Leave at 0 to use the price cap average, ${CAP.gasStanding}p a day.`} />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Energy bill, ${CAP.label}`}
        value={gbp(b.month, true)}
        unit="a month"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Using {kwh(elecKwh)} of electricity{hasGas ? <> and {kwh(gasKwh)} of gas</> : null} a year, your bill at {ownRates ? "your rates" : "the price cap"} is{" "}
            <b>{gbp(b.year)}</b> a year, or <b>{gbp(b.month, true)}</b> a month. At the {PREV.label} cap, the same use cost {gbp(p.year)}
            {ownRates ? "." : <>, so your bill is <b>{change >= 0 ? `${gbp(change)} higher` : `${gbp(-change)} lower`}</b> a year.</>}
          </>
        }
        badges={[PAY_LABEL[v.payment], hasGas ? "Gas and electricity" : "Electricity only", "GB average"]}
      />

      <ResultCard title="Where the money goes" sub={`${gbp(b.year)} a year.`}>
        <SplitBar segments={segments} />
      </ResultCard>

      <Facts
        items={[
          { label: "A year", value: gbp(b.year) },
          { label: "A month", value: gbp(b.month, true) },
          { label: "A day", value: gbp(b.day, true) },
          { label: "Electricity a year", value: gbp(b.elec.total) },
          ...(hasGas ? [{ label: "Gas a year", value: gbp(b.gas.total) }] : []),
          { label: `Change since ${PREV.label.split(" ")[0]}`, value: `${change >= 0 ? "+" : "−"}${gbp(Math.abs(change))}`, tone: change > 0 ? ("warn" as const) : ("good" as const) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Period", value: `${CAP.label} price cap` },
          { label: "Region", value: "Great Britain average" },
          { label: "Electricity", value: `${eUnitShown}p/kWh, ${eStShown}p a day, no VAT` },
          ...(hasGas ? [{ label: "Gas", value: `${gUnitShown}p/kWh, ${gStShown}p a day, 5% VAT included` }] : []),
          { label: "Payment", value: PAY_LABEL[v.payment] },
          ...(fromSpend ? [{ label: "Use worked out from", value: `${gbp(v.spend)} a month at the ${PREV.label} cap` }] : []),
        ]}
        note="Price cap rates vary by region. These are Great Britain averages for Direct Debit. Enter the rates from your own bill under More options for an exact figure."
      />

      <ResultCard title="Your bill, line by line" sub="Unit costs plus daily standing charges.">
        <Statement
          columns={["A year", "A month"]}
          rows={[
            { label: `Electricity: ${kwh(elecKwh)} at ${eUnitShown}p`, values: [gbp(b.elec.units, true), twelfth(b.elec.units)], swatch: "#2a78d6" },
            { label: `Electricity standing charge: ${eStShown}p × 365 days`, values: [gbp(b.elec.standing, true), twelfth(b.elec.standing)], swatch: "#4a3aa7" },
            ...(hasGas
              ? [
                  { label: `Gas: ${kwh(gasKwh)} at ${gUnitShown}p`, values: [gbp(b.gas.units, true), twelfth(b.gas.units)], swatch: "#eb6834" },
                  { label: `Gas standing charge: ${gStShown}p × 365 days`, values: [gbp(b.gas.standing, true), twelfth(b.gas.standing)], swatch: "#eda100" },
                  { label: "VAT on gas at 5% (included above)", values: [gbp(b.gas.vat, true), twelfth(b.gas.vat)] },
                ]
              : []),
            ...(b.paymentAdjust !== 0 ? [{ label: `${PAY_LABEL[v.payment]} adjustment (estimate)`, values: [`${b.paymentAdjust > 0 ? "+" : "−"}${gbp(Math.abs(b.paymentAdjust), true)}`, twelfth(Math.abs(b.paymentAdjust))] }] : []),
            { label: "Total", values: [gbp(b.year, true), gbp(b.month, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Against the last price cap" sub="The same use at each period's average rates.">
        <Compare
          head={["Price cap period", "A year"]}
          rows={[
            { label: `${PREV.label} (${PREV.elecUnit}p electricity${hasGas ? `, ${PREV.gasUnit}p gas` : ""})`, value: gbp(p.year), bar: p.year / Math.max(1, p.year, b.year) },
            {
              label: `${CAP.label} (${eUnitShown}p electricity${hasGas ? `, ${gUnitShown}p gas` : ""})`,
              value: gbp(b.year),
              bar: b.year / Math.max(1, p.year, b.year),
              current: true,
              delta: `${change >= 0 ? "+" : "−"}${gbp(Math.abs(change))}`,
              deltaTone: change > 0 ? "up" : "down",
            },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="What changes your bill.">
        <Callout tone="good" title="No VAT on electricity until 31 March 2027">
          VAT on household electricity is 0% until {ELEC_VAT_ZERO_UNTIL}. At 5% VAT, your electricity would cost about {gbp(vatSaved)} more a year. Gas keeps its 5% VAT.
        </Callout>
        <Callout title="The next price cap">
          Ofgem is due to announce the cap for January to March 2027 on {NEXT_CAP_ANNOUNCEMENT}. Your Direct Debit may be reviewed when it changes.
        </Callout>
        {fromSpend && (
          <Callout title="Worked out from your payment">
            Your Direct Debit is set by your supplier and may include catching up a debt or building a credit, so your real use could differ. Your bill or app shows your estimated annual use in kWh.
          </Callout>
        )}
        <Callout title="See what each appliance costs">
          Find out where your electricity goes with our <a href="/uk/property/appliance-running-cost">appliance running cost calculator</a>.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Ofgem price cap, {CAP.label}, Great Britain average for Direct Debit. Rates in your region may be higher or lower.
      </p>
    </Studio>
  );
}
