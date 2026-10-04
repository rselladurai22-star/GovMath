"use client";

import { IHT, inheritanceTax2026, type IhtInput } from "@/lib/life/estate";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  home: num(450_000, 0, 50_000_000),
  other: num(250_000, 0, 100_000_000),
  descendants: bool(true),
  widowed: bool(false),
  debts: num(5_000, 0, 10_000_000),
  pension: num(0, 0, 50_000_000),
  pensionsCount: bool(false),
  business: num(0, 0, 100_000_000),
  aim: num(0, 0, 50_000_000),
  spouse: num(0, 0, 100_000_000),
  charity: num(0, 0, 100_000_000),
  transfer: num(100, 0, 100),
  gifts: num(0, 0, 50_000_000),
  giftYears: num(2, 0, 7),
};
const ADVANCED = ["debts", "pension", "pensionsCount", "business", "aim", "spouse", "charity", "transfer", "gifts", "giftYears"] as const;
const POINTS = 31;
const neg = (n: number): string => (n > 0.005 ? `−${gbp(n)}` : gbp(0));

export default function IhtStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input: IhtInput = {
    home: v.home,
    homeToDescendants: v.descendants,
    otherAssets: v.other,
    debts: v.debts,
    pension: v.pension,
    pensionsCount: v.pensionsCount,
    businessProperty: v.business,
    aimShares: v.aim,
    toSpouse: v.spouse,
    toCharity: v.charity,
    transferPct: v.widowed ? v.transfer : 0,
    gifts: v.gifts,
    giftYearsAgo: v.giftYears,
  };
  const r = inheritanceTax2026(input);
  const top = Math.max(1_000_000, Math.ceil((r.net * 1.6) / 250_000) * 250_000);
  const levels = Array.from({ length: POINTS }, (_, i) => (top * i) / (POINTS - 1));
  // Vary other assets to show tax at different estate sizes.
  const curve = levels.map((x) => inheritanceTax2026({ ...input, otherAssets: Math.max(0, x - v.home) }).total);
  const heirs = Math.max(0, r.net - r.estateTax - r.exempt);
  const allowances = r.nrbForEstate + r.rnrb;

  return (
    <Studio
      title="The estate"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out Inheritance Tax"
      onReset={st.reset}
      dock={{ label: "Inheritance Tax", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="What they own">
            <MoneyField label="Main home" value={v.home} onChange={st.bind("home")} hint="Market value, less any mortgage." />
            <MoneyField label="Everything else" value={v.other} onChange={st.bind("other")} hint="Savings, investments, other property, cars and belongings." />
          </InputGroup>
          <InputGroup title="Family">
            <Switch label="The home goes to children or grandchildren" checked={v.descendants} onChange={st.bind("descendants")} hint="Includes step, adopted and foster children and their descendants." />
            <Switch label="Widowed: a late spouse's allowances can be used" checked={v.widowed} onChange={st.bind("widowed")} hint="Most people whose late spouse left everything to them can double both bands." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {v.widowed && <StepperField label="Share of the late spouse's bands unused" value={v.transfer} onChange={st.bind("transfer")} step={5} min={0} max={100} unit="%" dp={0} optional hint="100% if everything went to you." />}
            <MoneyField label="Debts and funeral costs" value={v.debts} onChange={st.bind("debts")} optional />
            <MoneyField label="Unused pension funds" value={v.pension} onChange={st.bind("pension")} optional hint="Defined contribution pots. Counted for deaths from 6 April 2027." />
            <Switch label="Death on or after 6 April 2027" checked={v.pensionsCount} onChange={st.bind("pensionsCount")} optional hint="Includes unused pensions in the estate." />
            <MoneyField label="Business or farm property" value={v.business} onChange={st.bind("business")} optional hint="Qualifying for relief: 100% on the first £2.5 million, 50% above." />
            <MoneyField label="AIM shares" value={v.aim} onChange={st.bind("aim")} optional hint="Qualifying shares get 50% relief." />
            <MoneyField label="Left to a spouse or civil partner" value={v.spouse} onChange={st.bind("spouse")} optional hint="Exempt from Inheritance Tax." />
            <MoneyField label="Left to charity" value={v.charity} onChange={st.bind("charity")} optional hint="Exempt, and 10% of the baseline cuts the rate to 36%." />
            <MoneyField label="Gifts in the last 7 years" value={v.gifts} onChange={st.bind("gifts")} optional hint="After the £3,000 annual exemption and other exempt gifts." />
            {v.gifts > 0 && <StepperField label="Years since the gift" value={v.giftYears} onChange={st.bind("giftYears")} step={0.5} min={0} max={7} unit="years" dp={1} optional />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Inheritance Tax"
        value={gbp(r.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.total <= 0 ? (
            <>
              No Inheritance Tax is due. The estate of <b>{gbp(r.net)}</b> is within the tax-free allowances of <b>{gbp(allowances + r.exempt + r.businessRelief)}</b>, including exemptions and reliefs.
            </>
          ) : (
            <>
              The estate is worth <b>{gbp(r.net)}</b> after debts. After <b>{gbp(allowances)}</b> of nil-rate bands{r.exempt > 0 ? <> and <b>{gbp(r.exempt)}</b> of exempt gifts</> : null}, <b>{gbp(r.taxable)}</b> is taxed at{" "}
              <b>{percent(r.rate, 0)}</b>.{r.giftTax > 0 ? <> Gifts add <b>{gbp(r.giftTax)}</b>, paid by the people who received them.</> : null}
            </>
          )
        }
        badges={[`Nil-rate band ${gbp(r.nrbForEstate)}`, r.rnrb > 0 ? `Residence band ${gbp(r.rnrb)}` : "No residence band", `Effective rate ${percent(r.effectiveRate, 1)}`]}
      />

      <Facts
        items={[
          { label: "Estate after debts", value: gbp(r.net) },
          { label: "Tax-free allowances", value: gbp(allowances) },
          { label: "Taxable", value: gbp(r.taxable) },
          { label: "Inheritance Tax", value: gbp(r.total), tone: r.total > 0 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Bands", value: "£325,000 and £175,000, frozen to April 2030" },
          { label: "Spouse's bands", value: v.widowed ? `${v.transfer}% transferred` : "Not used" },
          { label: "Pensions", value: v.pensionsCount ? "Included (death from April 2027)" : "Outside the estate" },
          { label: "Domicile", value: "Long-term UK resident" },
        ]}
      />

      <ResultCard title="How the tax is worked out" sub="On death, in 2026/27.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Estate before debts", values: [gbp(r.gross)] },
            ...(v.debts > 0 ? [{ label: "Debts and funeral", values: [neg(Math.min(v.debts, r.gross))], kind: "deduction" as const }] : []),
            ...(r.businessRelief > 0 ? [{ label: "Business, farm and AIM relief", values: [neg(r.businessRelief)], kind: "deduction" as const }] : []),
            ...(r.exempt > 0 ? [{ label: "To spouse and charity", values: [neg(r.exempt)], kind: "deduction" as const }] : []),
            { label: "Nil-rate band", values: [neg(r.nrbForEstate)], kind: "deduction" as const },
            ...(r.rnrbMax > 0 ? [{ label: r.taperLost > 0 ? "Residence nil-rate band (after taper)" : "Residence nil-rate band", values: [neg(r.rnrb)], kind: "deduction" as const }] : []),
            { label: "Taxable estate", values: [gbp(r.taxable)], kind: "total" as const },
            { label: `Tax at ${percent(r.rate, 0)}`, values: [gbp(r.estateTax)] },
            ...(r.giftTax > 0 ? [{ label: "Tax on gifts", values: [gbp(r.giftTax)] }] : []),
            { label: "Inheritance Tax", values: [gbp(r.total)], kind: "total" as const },
          ]}
        />
        {r.net > 0 && (
          <SplitBar
            segments={[
              { label: "To family and others", value: heirs, display: gbp(heirs), color: "#4353ff" },
              ...(r.exempt > 0 ? [{ label: "Spouse and charity", value: r.exempt, display: gbp(r.exempt), color: "#16a34a" }] : []),
              { label: "Inheritance Tax", value: r.estateTax, display: gbp(r.estateTax), color: "#f59e0b" },
            ]}
          />
        )}
      </ResultCard>

      <ResultCard title="Tax at different estate sizes" sub="Keeping the home and everything else you entered the same.">
        <AreaChart
          ariaLabel="Inheritance Tax by estate value"
          series={[{ key: "tax", label: "Inheritance Tax", color: "#f59e0b", values: curve, fill: true }]}
          xLabel={(i) => gbpShort(levels[i] ?? 0)}
          yFormat={gbpShort}
          initial={Math.min(POINTS - 1, Math.round(((v.home + v.other) / top) * (POINTS - 1)))}
          hint="Drag across the chart, or use the arrow keys, to read any estate value."
          readout={(i) => (
            <>
              Estate <b>{gbp(levels[i] ?? 0)}</b>: Inheritance Tax <b>{gbp(curve[i] ?? 0)}</b>.
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways the bill can change.">
        {r.taperLost > 0 && (
          <Callout tone="warn" title={`${gbp(r.taperLost)} of residence band lost to the taper`}>
            The residence nil-rate band falls by £1 for every £2 the estate is over £2 million. Lifetime gifts or charity gifts that bring the estate under the threshold can restore it.
          </Callout>
        )}
        {r.charityNeeded > 0 && r.charityNeeded < r.taxable && (
          <Callout title="Leaving 10% to charity">
            Leaving another {gbp(r.charityNeeded)} to charity would cut the rate on the rest of the taxable estate from 40% to 36%.
          </Callout>
        )}
        {!v.descendants && v.home > 0 && (
          <Callout title="The residence band needs direct descendants">
            Leaving the home to children, grandchildren or their spouses would add up to {gbp(IHT.rnrb)} of tax-free allowance.
          </Callout>
        )}
        {v.pension > 0 && !v.pensionsCount && (
          <Callout tone="warn" title="Pensions join the estate from April 2027">
            For deaths on or after 6 April 2027, unused pension funds of {gbp(v.pension)} would be added. Switch it on under More options to see the effect.
          </Callout>
        )}
        <Callout title="Gifts out of income are exempt">
          Regular gifts from surplus income, the £3,000 annual exemption, small gifts of up to £250 a person and wedding gifts are all exempt and never count towards the 7 years.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rules. An estimate, not legal or tax advice. Estates with trusts or foreign assets need professional advice.
      </p>
    </Studio>
  );
}
