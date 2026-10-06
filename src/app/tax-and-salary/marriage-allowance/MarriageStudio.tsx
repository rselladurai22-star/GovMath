"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { MARRIAGE_ALLOWANCE, marriageAllowance } from "@/lib/tax/pay-and-perks";

const SCHEMA = {
  lower: num(8_000, 0, 1_000_000),
  higher: num(30_000, 0, 1_000_000),
  backdate: num(4, 0, 4),
  lowerScot: bool(false),
  higherScot: bool(false),
};
const ADVANCED = ["lowerScot", "higherScot"] as const;

export default function MarriageStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = marriageAllowance({ transferorIncome: v.lower, recipientIncome: v.higher, transferorScotland: v.lowerScot, recipientScotland: v.higherScot, backdate: v.backdate });
  const years = MARRIAGE_ALLOWANCE.backdateYears;
  const claimed = years.slice(years.length - Math.min(years.length, Math.round(v.backdate)));

  return (
    <Studio
      title="Your incomes"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my Marriage Allowance"
      onReset={st.reset}
      dock={{ label: "You could get", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="Your incomes this tax year">
            <MoneyField label="Lower earner's income" value={v.lower} onChange={st.bind("lower")} hint="All taxable income before tax: pay, pensions, rent and savings interest over your allowances. It must be under £12,570." />
            <MoneyField label="Higher earner's income" value={v.higher} onChange={st.bind("higher")} hint="Must be a basic-rate taxpayer: £12,571 to £50,270 (£43,662 in Scotland)." />
            <StepperField label="Earlier years to backdate" value={v.backdate} onChange={(n) => st.set("backdate", Math.round(n))} step={1} min={0} max={4} unit="years" dp={0} hint="You can claim back to 2022/23 if you were eligible then. We assume the same incomes each year." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Lower earner pays Scottish Income Tax" checked={v.lowerScot} onChange={st.bind("lowerScot")} optional />
            <Switch label="Higher earner pays Scottish Income Tax" checked={v.higherScot} onChange={st.bind("higherScot")} optional hint="Scottish recipients can earn up to the top of the intermediate band." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Marriage Allowance in total"
        value={gbp(r.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.eligible ? (
            <>
              Transferring £1,260 of allowance saves your household <b>{gbp(r.netGain)}</b> this tax year
              {r.backdated > 0 ? (
                <>
                  , plus <b>{gbp(r.backdated)}</b> for {claimed.length} earlier {claimed.length === 1 ? "year" : "years"}
                </>
              ) : null}
              . The higher earner pays <b>{gbp(r.recipientSaving)}</b> less tax{r.transferorCost > 0 ? <>, and the lower earner pays {gbp(r.transferorCost)} more</> : null}.
            </>
          ) : (
            <>You cannot benefit from Marriage Allowance on these incomes. {r.reason}</>
          )
        }
        badges={[r.eligible ? "Eligible" : "Not eligible", "£1,260 transferred", `Backdate ${claimed.length} ${claimed.length === 1 ? "year" : "years"}`]}
      />

      <Facts
        items={[
          { label: "Higher earner saves", value: gbp(r.recipientSaving), tone: r.recipientSaving > 0 ? "good" : undefined },
          { label: "Lower earner pays extra", value: gbp(r.transferorCost), tone: r.transferorCost > 0 ? "warn" : undefined },
          { label: "Household gain a year", value: gbp(r.netGain) },
          { label: "Backdated", value: gbp(r.backdated) },
        ]}
      />

      <Assumptions
        items={[
          { label: "You are", value: "Married or in a civil partnership, and at least one of you was born on or after 6 April 1935" },
          { label: "Transfer", value: "£1,260 of Personal Allowance, giving a £252 tax reduction" },
          { label: "Earlier years", value: "Same incomes as this year, and eligible in each" },
          { label: "Tax year", value: "2026/27" },
        ]}
      />

      <ResultCard title="How it works">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Allowance transferred", values: [gbp(MARRIAGE_ALLOWANCE.transfer)] },
            { label: "Lower earner's allowance falls to", values: [gbp(MARRIAGE_ALLOWANCE.personalAllowance - MARRIAGE_ALLOWANCE.transfer)] },
            { label: "Higher earner's tax reduced by (20%)", values: [gbp(r.recipientSaving)] },
            { label: "Extra tax for the lower earner", values: [`− ${gbp(r.transferorCost)}`], kind: "deduction" },
            { label: "Household gain this year", values: [gbp(r.netGain)], kind: "total" },
          ]}
        />
      </ResultCard>

      {r.eligible && claimed.length > 0 && (
        <ResultCard title="Backdated claims" sub="If you were eligible in those years.">
          <Compare head={["Tax year", "Gain"]} rows={[...claimed, "2026/27"].map((y) => ({ label: y, value: gbp(r.netGain), bar: 1, current: y === "2026/27" }))} />
        </ResultCard>
      )}

      <ResultCard title="Things to know">
        {r.transferorCost > 0 && (
          <Callout tone="warn" title="Check the lower earner's income">
            With income over {gbp(MARRIAGE_ALLOWANCE.personalAllowance - MARRIAGE_ALLOWANCE.transfer)}, the lower earner starts paying tax on part of the transferred allowance, which cuts the gain.
          </Callout>
        )}
        <Callout title="Claim online in minutes">
          The lower earner applies on GOV.UK. It renews automatically each year until you cancel it or your circumstances change, such as a divorce or a rise in income.
        </Callout>
        <Callout title="Claims for 2022/23 end on 5 April 2027">
          Backdated claims can go back four years. After 5 April 2027 the 2022/23 year can no longer be claimed.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rules. HMRC decides your claim. Married Couple&rsquo;s Allowance applies instead if either of you was born before 6 April 1935.
      </p>
    </Studio>
  );
}
