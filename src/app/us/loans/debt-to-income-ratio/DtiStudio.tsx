"use client";

import { debtToIncome } from "@/lib/us/loans";
import { dtiRoom } from "@/lib/us/pay-extra";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Program = "rule" | "convManual" | "convStrong" | "du" | "fha" | "fhaComp" | "va";

/** Lender limits: Fannie Mae Selling Guide B3-6-02, HUD Handbook 4000.1 (manual underwriting), VA Lenders Handbook chapter 4. */
const PROGRAMS: Record<Program, { label: string; short: string; front: number; back: number }> = {
  rule: { label: "Rule of thumb (28% / 36%)", short: "28/36 rule", front: 0.28, back: 0.36 },
  convManual: { label: "Conventional, manual underwriting (36%)", short: "Conventional, manual", front: Infinity, back: 0.36 },
  convStrong: { label: "Conventional, manual with strong credit and reserves (45%)", short: "Conventional, strong file", front: Infinity, back: 0.45 },
  du: { label: "Conventional through Desktop Underwriter (50%)", short: "Conventional, DU", front: Infinity, back: 0.5 },
  fha: { label: "FHA standard (31% / 43%)", short: "FHA 31/43", front: 0.31, back: 0.43 },
  fhaComp: { label: "FHA with two compensating factors (40% / 50%)", short: "FHA 40/50", front: 0.4, back: 0.5 },
  va: { label: "VA guideline (41%)", short: "VA 41%", front: Infinity, back: 0.41 },
};
const ORDER: Program[] = ["rule", "convManual", "fha", "va", "convStrong", "fhaComp", "du"];

const SCHEMA = {
  period: oneOf<"year" | "month">("year", ["year", "month"]),
  income: num(90_000, 0, 100_000_000),
  coIncome: num(0, 0, 100_000_000),
  housing: num(2_100, 0, 1_000_000),
  car: num(350, 0, 1_000_000),
  student: num(250, 0, 1_000_000),
  cards: num(120, 0, 1_000_000),
  other: num(0, 0, 1_000_000),
  program: oneOf<Program>("du", ORDER),
  studentBalance: num(0, 0, 10_000_000),
};
const ADVANCED = ["coIncome", "program", "studentBalance"] as const;

const limitText = (front: number, back: number) => (Number.isFinite(front) ? `${percent(front)} / ${percent(back)}` : percent(back));

export default function DtiStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const toMonth = (n: number) => (v.period === "year" ? n / 12 : n);
  const gross = toMonth(v.income) + toMonth(v.coIncome);
  const debts = v.car + v.student + v.cards + v.other;
  const r = debtToIncome(gross, v.housing, debts);
  const prog = PROGRAMS[v.program];
  const room = dtiRoom(gross, v.housing, debts, prog.front, prog.back);
  const left = Math.max(0, gross - v.housing - debts);
  const noIncome = gross <= 0;
  // How much the monthly payments would have to fall to fit both ratios.
  const cut = Math.max(0, v.housing + debts - gross * prog.back, Number.isFinite(prog.front) ? v.housing - gross * prog.front : 0);

  // A $0 student loan payment with a balance: what FHA (0.5%) and Fannie Mae for deferred loans (1%) would count.
  const zeroStudent = v.student === 0 && v.studentBalance > 0;
  const fhaStudent = v.studentBalance * 0.005;
  const deferredStudent = v.studentBalance * 0.01;
  const fhaBack = debtToIncome(gross, v.housing, debts + fhaStudent).back;

  const lines = [
    { label: "Housing payment", value: v.housing },
    { label: "Car loans", value: v.car },
    { label: "Student loans", value: v.student },
    { label: "Credit card minimums", value: v.cards },
    { label: "Other debts", value: v.other },
  ];

  const verdict = noIncome
    ? "Enter your income to see your ratio."
    : room.fits
      ? `Within the ${prog.short} limit of ${limitText(prog.front, prog.back)}.`
      : `Over the ${prog.short} limit of ${limitText(prog.front, prog.back)}.`;

  return (
    <Studio
      title="Your income and debts"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my DTI"
      onReset={st.reset}
      dock={{ label: "Back-end DTI", value: noIncome ? "–" : percent(r.back, 1) }}
      inputs={
        <>
          <InputGroup title="Income">
            <Segmented
              label="I'll enter income"
              value={v.period}
              onChange={st.bind("period")}
              options={[
                { value: "year", label: "A year" },
                { value: "month", label: "A month" },
              ]}
            />
            <MoneyField label={`Gross income ${v.period === "year" ? "a year" : "a month"}`} value={v.income} onChange={st.bind("income")} symbol="$" info="Before tax and other deductions. Lenders use stable income you can document." />
          </InputGroup>
          <InputGroup title="Monthly payments">
            <MoneyField label="Housing payment a month" value={v.housing} onChange={st.bind("housing")} symbol="$" info="For a new home: principal, interest, property tax, homeowners insurance, mortgage insurance and HOA dues. If you rent and are not buying, use your rent." />
            <MoneyField label="Car loan or lease payments" value={v.car} onChange={st.bind("car")} symbol="$" />
            <MoneyField label="Student loan payments" value={v.student} onChange={st.bind("student")} symbol="$" />
            <MoneyField label="Credit card minimum payments" value={v.cards} onChange={st.bind("cards")} symbol="$" info="The minimum due on each card, not what you usually pay." />
            <MoneyField label="Other debts" value={v.other} onChange={st.bind("other")} symbol="$" info="Personal loans, other mortgages, child support, alimony and similar. Not utilities, phone, insurance or groceries." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label={`Co-borrower's gross income ${v.period === "year" ? "a year" : "a month"}`} value={v.coIncome} onChange={st.bind("coIncome")} symbol="$" optional info="If someone will apply with you. Add their debts to the payments above." />
            <SelectField label="Loan type to check against" value={v.program} onChange={st.bind("program")} optional options={ORDER.map((p) => ({ value: p, label: PROGRAMS[p].label }))} />
            <MoneyField label="Student loan balance (if your payment is $0)" value={v.studentBalance} onChange={st.bind("studentBalance")} symbol="$" optional info="If you are on a $0 income-driven payment, in deferment or in forbearance, lenders may count a payment based on the balance." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your back-end debt-to-income ratio"
        value={noIncome ? "–" : percent(r.back, 1)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          noIncome ? (
            <>Enter your gross income to see your ratio.</>
          ) : (
            <>
              Your debts take <b>{usd(v.housing + debts)}</b> of <b>{usd(gross)}</b> gross income a month: <b>{percent(r.back, 1)}</b> in all, and{" "}
              <b>{percent(r.front, 1)}</b> for housing alone. {verdict}
            </>
          )
        }
        badges={[`Front-end ${noIncome ? "–" : percent(r.front, 1)}`, room.fits ? "Within the limit" : "Over the limit"]}
      />

      <SplitBar
        segments={[
          { label: "Housing", value: v.housing, display: usd(v.housing), color: "#0f9f6e" },
          { label: "Other debts", value: debts, display: usd(debts), color: "#f59e0b" },
          { label: "Left before tax and bills", value: left, display: usd(left), color: "#94a3b8" },
        ]}
        caption="Shares of your gross monthly income."
      />

      <Facts
        items={[
          { label: "Front-end DTI", value: noIncome ? "–" : percent(r.front, 1) },
          { label: "Back-end DTI", value: noIncome ? "–" : percent(r.back, 1), tone: room.fits ? "good" : "warn" },
          { label: "Monthly debts", value: usd(v.housing + debts) },
          { label: "Gross monthly income", value: usd(gross) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Income", value: `${usd(gross)} a month, before tax${v.coIncome > 0 ? ", both borrowers" : ""}` },
          { label: "Debts", value: "Monthly payments as entered" },
          { label: "Limit checked", value: prog.label },
          { label: "Not counted", value: "Utilities, phone, insurance, groceries" },
        ]}
      />

      <ResultCard title="Against lender limits" sub="Your back-end ratio compared with common maximums. Lenders can set stricter limits of their own.">
        <Compare
          head={["Loan type and limit", "Your room for housing"]}
          rows={ORDER.map((p) => {
            const L = PROGRAMS[p];
            const rm = dtiRoom(gross, v.housing, debts, L.front, L.back);
            return {
              label: (
                <>
                  {L.short} <small>({limitText(L.front, L.back)})</small>
                </>
              ),
              value: `${usd(rm.maxHousing)} a month`,
              delta: noIncome ? "" : rm.fits ? "Fits" : "Over",
              deltaTone: rm.fits ? ("up" as const) : ("down" as const),
              bar: L.back / 0.5,
              current: p === v.program,
            };
          })}
        />
        <p className="footnote">&ldquo;Room for housing&rdquo; is the highest housing payment that keeps you within that limit with your other debts as they are.</p>
      </ResultCard>

      <ResultCard title={`Your room under the ${prog.short} limit`} sub={limitText(prog.front, prog.back)}>
        <Statement
          columns={["A month"]}
          rows={[
            { label: "Highest housing payment", values: [usd(room.maxHousing)] },
            { label: "Highest other debts with this housing payment", values: [usd(room.maxOtherDebts)] },
            { label: "Gross income needed for these payments", values: [usd(room.incomeNeeded)], kind: "total" },
          ]}
        />
        {!room.fits && !noIncome && (
          <Callout tone="warn" title="Over this limit">
            To fit, you would need about {usd(Math.max(0, room.incomeNeeded - gross))} more gross income a month, or {usd(cut)} less in monthly
            payments. Paying off a loan with few payments left, or paying down cards, is often the quickest way.
          </Callout>
        )}
      </ResultCard>

      <ResultCard title="Your debts line by line" sub="Each payment as a share of gross monthly income.">
        <Statement
          columns={["A month", "Share"]}
          rows={[
            ...lines.map((l) => ({ label: l.label, values: [usd(l.value), noIncome ? "–" : percent(l.value / gross, 1)] })),
            { label: "Total", values: [usd(v.housing + debts), noIncome ? "–" : percent(r.back, 1)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      {zeroStudent && (
        <ResultCard title="Your $0 student loan payment" sub="How lenders may count it.">
          <Callout title="Lenders may count a payment anyway">
            FHA counts 0.5% of the balance when the credit report shows $0: {usd(fhaStudent)} a month here, which would make your back-end DTI {noIncome ? "–" : percent(fhaBack, 1)}. Fannie Mae can use a documented $0 income-driven payment, but for a loan in deferment or forbearance it uses 1% of the balance ({usd(deferredStudent)}) or a fully amortizing payment.
          </Callout>
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate, not a loan decision. See what you can borrow with the <a href="/us/housing/mortgage-affordability">home affordability calculator</a>.
      </p>
    </Studio>
  );
}
