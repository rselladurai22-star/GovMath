"use client";

import { MAINTENANCE_2026, maintenanceLoan2026, over60Loan2026, STUDENT_SUPPORT_2026, type Living } from "@/lib/students/loans";
import { Caveat, Flag, Foot, Hero, Inputs, Rows, Tool } from "@/components/calc/kit";
import { Mini, Pills } from "@/components/calc/fields";
import { MoneyField, Switch } from "@/components/flagship/inputs";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import LoanCurve from "./LoanCurve";

const SCHEMA = {
  income: num(40_000, 0, 1_000_000),
  living: oneOf<Living>("away", ["home", "away", "london", "abroad"]),
  // Course length and fee: kept so older shared links still open; the page no longer asks for them.
  years: num(3, 1, 7),
  fee: num(STUDENT_SUPPORT_2026.tuitionFee, 0, 20_000),
  rent: num(0, 0, 1_000),
  over60: bool(false),
  final: bool(false),
  benefits: bool(false),
  care: bool(false),
};

const LIVING: { value: Living; label: string }[] = [
  { value: "home", label: "At home" },
  { value: "away", label: "Away" },
  { value: "london", label: "London" },
  { value: "abroad", label: "Abroad" },
];

const WHERE: Record<Living, string> = {
  home: "living with your parents",
  away: "living away from home outside London",
  london: "living away from home in London",
  abroad: "on a year abroad",
};

export default function MaintenanceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const opts = { finalYear: v.final, benefits: v.benefits, careLeaver: v.care };
  const r = maintenanceLoan2026(v.income, v.living, opts);
  const knee = STUDENT_SUPPORT_2026.benefitsKnee;
  const kneeLoan = v.benefits ? maintenanceLoan2026(knee, v.living, opts).loan : undefined;
  const old = v.over60;
  const loan = old ? over60Loan2026(v.income, v.care) : r.loan;
  const terms = [Math.round(loan / 3), Math.round(loan / 3), loan - 2 * Math.round(loan / 3)];
  const band = v.care ? "care" : v.income <= STUDENT_SUPPORT_2026.incomeThreshold ? "full" : r.loan <= r.min ? "minimum" : "tapered";
  const rentYear = v.rent * 40;
  const moreOpen = v.final || v.benefits || v.care || v.over60 || v.rent > 0;

  return (
    <Tool label="Maintenance Loan calculator">
      <div className="sa-ml">
        <div className="sa-ml-inputs">
          <Inputs title="Your household">
            <MoneyField
              label="Household income"
              value={v.income}
              onChange={st.bind("income")}
              slider={{ min: 0, max: 100_000, step: 500, ends: ["£0", "£100,000"] }}
              hint={`Usually your parents’ taxable income for 2024/25, less their pension contributions and ${gbp(STUDENT_SUPPORT_2026.childAllowance)} for each other child they support. If you are an independent student, your own income and your partner’s.`}
            />
            <Pills label="Where you will live in term time" value={v.living} onChange={st.bind("living")} options={LIVING} />
            <details className="sa-ml-more" open={moreOpen || undefined}>
              <summary>Final year, benefits, care leavers and over-60s</summary>
              <div className="sa-ml-moregrid">
                <Switch label="This is my final year" checked={v.final} onChange={st.bind("final")} hint="The final year is shorter, so the maximum is lower." />
                <Switch
                  label="I can claim benefits while studying"
                  checked={v.benefits}
                  onChange={st.bind("benefits")}
                  hint="For example a lone parent, or a disabled student who gets PIP or DLA and can claim Universal Credit. Part of the loan is then a Special Support Loan."
                />
                <Switch label="I am a care leaver" checked={v.care} onChange={st.bind("care")} hint="From 2026/27 Student Finance England does not use household income for care leavers: you can borrow the maximum." />
                <Switch label="I will be 60 or over when the course starts" checked={v.over60} onChange={st.bind("over60")} hint={`A smaller loan for living costs, up to ${gbp(STUDENT_SUPPORT_2026.over60.max)}.`} />
                <Mini label="Rent a week, to check it fits" value={v.rent} onChange={st.bind("rent")} prefix="£" max={1_000} wide hint="Most halls charge for about 40 weeks." />
              </div>
            </details>
          </Inputs>
        </div>

        <div className="sa-ml-main">
          <Hero
            label={`Your Maintenance Loan for 2026/27${v.final ? ", final year" : ""}`}
            value={gbp(loan)}
            unit="a year"
            sub={
              old ? (
                <>
                  Students aged 60 or over get a loan for living costs of up to {gbp(STUDENT_SUPPORT_2026.over60.max)}, reduced by £1 for every £4.16 of household income over £25,000.
                  {loan === 0 && " At this income it falls below £50, so nothing is paid."}
                </>
              ) : (
                <>
                  Paid in three instalments of about <b>{gbp(terms[0])}</b>, one at the start of each term, {WHERE[v.living]}.{" "}
                  {r.reduction > 0 ? (
                    <>
                      That is <b>{gbp(r.reduction)}</b> less than the {gbp(r.max)} maximum: the gap Student Finance England expects your household to help with.
                    </>
                  ) : (
                    <>That is the most anyone {WHERE[v.living]} can borrow.</>
                  )}
                </>
              )
            }
          />

          {!old && (
            <>
              <LoanCurve income={v.income} loan={r.loan} max={r.max} min={r.min} minAt={r.minAt} knee={v.benefits ? knee : undefined} kneeLoan={kneeLoan} />
              <Rows
                caption="Your loan against the maximum"
                rows={[
                  { label: "Most you could get", value: gbp(r.max), note: v.benefits ? "Including the Special Support Loan" : undefined },
                  { label: "Taken off for household income", value: r.reduction > 0 ? `−${gbp(r.reduction)}` : "£0", note: r.reduction > 0 ? `£1 for every £${MAINTENANCE_2026[v.living].divisor.toFixed(2)} over £25,000` : "£25,000 or less, or a care leaver" },
                  { label: "Your loan", value: gbp(r.loan), strong: true },
                ]}
              />
              <ol className="sa-ml-terms" aria-label="Instalments">
                {["Autumn term", "Spring term", "Summer term"].map((t, i) => (
                  <li key={t}>
                    <span>{t}</span>
                    <b>{gbp(terms[i])}</b>
                  </li>
                ))}
              </ol>
            </>
          )}

          {band === "minimum" && !old && (
            <Flag title="You are on the minimum">
              Above {gbp(r.minAt)} household income the loan stops falling: {gbp(r.min)} is the part that does not depend on income. You can get it without sending your parents&rsquo; details.
            </Flag>
          )}
          {band === "full" && !old && !v.care && (
            <Flag tone="good" title="The full loan">
              At {gbp(STUDENT_SUPPORT_2026.incomeThreshold)} or less nothing is taken off. Ask your university about bursaries too: many pay a few hundred to a few thousand pounds a year on lower incomes.
            </Flag>
          )}
          {v.rent > 0 && (
            <p className="sa-ml-rent">
              Rent of {gbp(v.rent)} a week for 40 weeks is <b>{gbp(rentYear)}</b>
              {loan - rentYear >= 0 ? (
                <>
                  , leaving <b>{gbp(loan - rentYear)}</b> of the loan for everything else: about {gbp((loan - rentYear) / 39)} a week over the academic year.
                </>
              ) : (
                <>, which is {gbp(rentYear - loan)} more than the loan.</>
              )}
            </p>
          )}

          <Foot>
            <Caveat>
              Exact at the 2026/27 rates for a full-time student in England who started in or after August 2016, for the household income you enter. Student Finance England confirms your
              figure; this leaves out the Long Courses Loan and grants for students with children or adult dependants.
            </Caveat>
            <ShareButton copied={st.copied} onClick={st.share} />
          </Foot>
        </div>
      </div>
    </Tool>
  );
}
