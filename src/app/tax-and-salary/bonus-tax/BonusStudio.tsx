"use client";

import { bonusOutcome } from "@/lib/tax/bonus";
import type { PayPeriod } from "@/lib/tax/payslip";
import { STUDENT_PLANS } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

const COLORS = { keep: "#0f9f6e", tax: "#f59e0b", ni: "#4353ff", loan: "#db2777", pension: "#7c3aed" };

const SCHEMA = {
  salary: num(45_000),
  bonus: num(5_000),
  ...taxParams,
  toPension: num(0),
  period: oneOf<PayPeriod>("month", ["month", "week"]),
};
const ADVANCED = [...TAX_KEYS, "toPension", "period"] as const;

export default function BonusStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = bonusOutcome({
    salary: v.salary,
    bonus: v.bonus,
    pensionPct: v.pension,
    bonusToPension: v.toPension,
    plan: v.plan,
    region: v.region,
    period: v.period,
  });
  const allCash = bonusOutcome({ salary: v.salary, bonus: v.bonus, pensionPct: v.pension, plan: v.plan, region: v.region, period: v.period });
  const periodWord = v.period === "month" ? "month" : "week";
  const salaryAfter = v.salary * (1 - v.pension / 100);
  const crossesTrap = r.yearIncome > 100_000 && salaryAfter < 125_140 && r.cashBonus > 0;
  const trapSlice = Math.min(r.cashBonus, Math.max(0, Math.min(r.yearIncome, 125_140) - Math.max(100_000, salaryAfter)));
  const crossesHigher = salaryAfter < 50_270 && r.yearIncome > 50_270;
  const hasLoan = v.plan !== "none";

  const ladder = [1_000, 2_500, 5_000, 10_000, 20_000, 50_000].map((b) => {
    const o = bonusOutcome({ salary: v.salary, bonus: b, pensionPct: v.pension, plan: v.plan, region: v.region, period: v.period });
    return [gbp(b), gbp(o.kept), percent(o.cashBonus > 0 ? o.kept / o.cashBonus : 0)];
  });

  return (
    <Studio
      title="Your pay and bonus"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my bonus"
      onReset={st.reset}
      dock={{ label: "You keep", value: gbp(r.kept) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField
              label="Yearly salary (before tax)"
              value={v.salary}
              onChange={st.bind("salary")}
              big
              slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }}
            />
            <MoneyField
              label="Bonus (before tax)"
              value={v.bonus}
              onChange={st.bind("bonus")}
              slider={{ min: 0, max: 50_000, step: 250, ends: ["£0", "£50k"] }}
              hint="A one-off payment on top of your normal pay, such as an annual or performance bonus."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <TaxSituationFields
              region={v.region}
              plan={v.plan}
              pension={v.pension}
              onRegion={st.bind("region")}
              onPlan={st.bind("plan")}
              onPension={st.bind("pension")}
              pensionHint="Your usual salary-sacrifice pension, as a % of salary."
            />
            <MoneyField
              label="Bonus paid into your pension"
              value={v.toPension}
              onChange={(n) => st.set("toPension", Math.min(n, v.bonus))}
              optional
              hint="Many employers let you sacrifice some or all of a bonus into your pension, before tax and National Insurance."
            />
            <Segmented
              label="You are paid"
              value={v.period}
              onChange={st.bind("period")}
              optional
              options={[
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your bonus after tax"
        value={gbp(r.kept)}
        unit={`of your ${gbp(v.bonus)} bonus`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.bonus <= 0 ? (
            <>Enter a bonus to see what you keep.</>
          ) : r.cashBonus <= 0 ? (
            <>
              All <b>{gbp(r.toPension)}</b> goes into your pension, before tax and National Insurance.
            </>
          ) : (
            <>
              Of a <b>{gbp(r.cashBonus)}</b> cash bonus, <b>{gbp(r.tax + r.ni + r.studentLoan)}</b> goes in deductions, so you keep <b>{percent(r.kept / r.cashBonus)}</b>.
              {r.toPension > 0 && (
                <>
                  {" "}
                  Another <b>{gbp(r.toPension)}</b> goes into your pension.
                </>
              )}
            </>
          )
        }
        badges={[
          `${percent(r.deductionRate)} deducted`,
          `Paid in one ${periodWord}`,
          REGION_LABEL[v.region],
        ]}
      />

      <Facts
        items={[
          { label: "Income Tax", value: gbp(r.tax) },
          { label: "National Insurance", value: gbp(r.ni) },
          hasLoan
            ? { label: "Student loan", value: gbp(r.studentLoan) }
            : { label: `Bonus ${periodWord} pay`, value: gbp(r.bonusPeriod.net), note: "After deductions" },
          r.toPension > 0
            ? { label: "Into pension", value: gbp(r.toPension), tone: "good" as const }
            : { label: "Share kept", value: percent(r.cashBonus > 0 ? r.kept / r.cashBonus : 0), tone: "good" as const },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Tax code", value: "1257L, cumulative" },
          { label: "Paid", value: `${v.period === "month" ? "Monthly" : "Weekly"}, bonus in one ${periodWord}` },
          { label: "Student loan", value: STUDENT_PLANS[v.plan].label },
        ]}
      />

      {v.bonus > 0 && (
        <ResultCard title="Where your bonus goes" sub="Every pound of the bonus, split by who gets it.">
          <SplitBar
            segments={[
              { label: "You keep", value: r.kept, display: gbp(r.kept), color: COLORS.keep },
              ...(r.toPension > 0 ? [{ label: "Your pension", value: r.toPension, display: gbp(r.toPension), color: COLORS.pension }] : []),
              { label: "Income Tax", value: r.tax, display: gbp(r.tax), color: COLORS.tax },
              { label: "National Insurance", value: r.ni, display: gbp(r.ni), color: COLORS.ni },
              ...(hasLoan ? [{ label: "Student loan", value: r.studentLoan, display: gbp(r.studentLoan), color: COLORS.loan }] : []),
            ]}
          />
        </ResultCard>
      )}

      <ResultCard
        title={`Your bonus ${periodWord} payslip`}
        sub={`A normal ${periodWord} next to the ${periodWord} the bonus is paid. National Insurance and student loan are worked out on each payment on its own.`}
      >
        <Statement
          columns={[`Normal ${periodWord}`, `Bonus ${periodWord}`]}
          rows={[
            { label: "Gross pay", values: [gbp(r.normal.gross, true), gbp(r.bonusPeriod.gross, true)] },
            { label: "Income Tax", values: [gbp(-r.normal.tax, true), gbp(-r.bonusPeriod.tax, true)], kind: "deduction", swatch: COLORS.tax },
            { label: "National Insurance", values: [gbp(-r.normal.ni, true), gbp(-r.bonusPeriod.ni, true)], kind: "deduction", swatch: COLORS.ni },
            ...(hasLoan
              ? [{ label: "Student loan", values: [gbp(-r.normal.studentLoan, true), gbp(-r.bonusPeriod.studentLoan, true)], kind: "deduction" as const, swatch: COLORS.loan }]
              : []),
            { label: "Take-home", values: [gbp(r.normal.net, true), gbp(r.bonusPeriod.net, true)], kind: "total" },
          ]}
        />
      </ResultCard>

      {v.bonus > 0 && (
        <ResultCard title="Cash or pension?" sub="The same bonus, taken as cash or paid into your pension by salary sacrifice.">
          <Compare
            head={["Option", "What you get"]}
            rows={[
              { label: "Take it all as cash", value: gbp(allCash.kept), bar: v.bonus > 0 ? allCash.kept / v.bonus : 0, current: r.toPension === 0 },
              { label: "Pay it all into your pension", value: gbp(v.bonus), bar: 1, current: r.toPension === v.bonus, delta: `+${gbp(v.bonus - allCash.kept)} more` },
            ]}
          />
          <p className={s.hint}>
            Pension money is taxed when you draw it, though usually a quarter can be taken tax-free. Some employers also add the National Insurance they save.
          </p>
        </ResultCard>
      )}

      {(crossesTrap || crossesHigher || r.cashBonus > 0) && (
        <ResultCard title="Worth knowing" sub="What this bonus does to your tax position.">
          {crossesTrap && (
            <Callout tone="warn" title="Part of this bonus is taxed at an effective 60%">
              Between £100,000 and £125,140 you lose £1 of tax-free allowance for every £2 earned. About <b>{gbp(trapSlice)}</b> of your bonus falls in that band. Paying
              that part into your pension would avoid it.
            </Callout>
          )}
          {crossesHigher && !crossesTrap && (
            <Callout title="Your bonus takes you into the 40% band">
              Only the part above £50,270 is taxed at 40% ({v.region === "scotland" ? "the Scottish bands differ" : "plus 2% NI"}). The rest of your bonus is taxed as before.
            </Callout>
          )}
          {r.cashBonus > 0 && (
            <Callout title="If the bonus month looks over-taxed">
              PAYE is cumulative, so the tax on your bonus usually evens out over the year. If you have an emergency tax code or start a job mid-year, it may not, and HMRC
              refunds any overpayment after the tax year ends.
            </Callout>
          )}
        </ResultCard>
      )}

      <DataTable summary="What you'd keep from different bonuses" columns={["Bonus", "You keep", "Share kept"]} rows={ladder} />

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. Estimates assume your salary is paid evenly and the bonus arrives in one {periodWord}.
      </p>
    </Studio>
  );
}
