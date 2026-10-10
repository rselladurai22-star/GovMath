"use client";

import { eitc, eitcCurve, EITC_2026, EITC_INVESTMENT_LIMIT } from "@/lib/us/credits-payroll";
import type { FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs"] as const;
const STATUS_LABEL: Record<(typeof STATUSES)[number], string> = {
  single: "Single or head of household",
  mfj: "Married filing jointly",
  mfs: "Married filing separately",
};
const KIDS = ["0", "1", "2", "3"] as const;

const SCHEMA = {
  status: oneOf<(typeof STATUSES)[number]>("single", STATUSES),
  kids: oneOf<(typeof KIDS)[number]>("1", KIDS),
  earned: num(25_000, 0, 100_000_000),
  otherIncome: num(0, 0, 100_000_000),
  investment: num(0, 0, 100_000_000),
  age: bool(true),
  separated: bool(false),
};
const ADVANCED = ["otherIncome", "investment", "age", "separated"] as const;

const COLORS = { credit: "#1baf7a", gap: "#c3c8ce" };

const STAGE: Record<string, string> = {
  "phase-in": "Phase-in: each extra dollar earned raises the credit",
  plateau: "Plateau: you get the maximum credit",
  "phase-out": "Phase-out: each extra dollar lowers the credit",
  over: "Above the income limit",
  none: "Not eligible",
};

export default function EitcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const k = Number(v.kids);
  const status: FilingStatus = v.status;
  const agi = v.earned + v.otherIncome + v.investment;
  const r = eitc({ status, children: k, earnedIncome: v.earned, agi, investmentIncome: v.investment, ageOk: v.age, separatedSpouse: v.separated });
  const row = EITC_2026[k];

  const curve = eitcCurve(status === "mfs" ? "single" : status, k, 1_000);
  const top = curve.length - 1;
  const at = Math.min(top, Math.round(Math.max(v.earned, agi) / 1_000));

  const byKids = KIDS.map((n) => ({ n: Number(n), c: eitc({ status, children: Number(n), earnedIncome: v.earned, agi, investmentIncome: v.investment, ageOk: v.age, separatedSpouse: v.separated }).credit }));
  const maxKids = Math.max(1, ...byKids.map((b) => b.c));

  const kidsLabel = k === 3 ? "three or more children" : k === 1 ? "one child" : k === 2 ? "two children" : "no qualifying children";

  const reason: Record<string, string> = {
    investment: `Your investment income is over the 2026 limit of ${usd(EITC_INVESTMENT_LIMIT)}, so no credit is allowed.`,
    age: "Without a qualifying child, you (or your spouse, on a joint return) must be at least 25 and under 65 at the end of 2026.",
    mfs: "On a separate return you can claim the credit only if a qualifying child lived with you for more than half the year and you lived apart from your spouse for the last six months of 2026 (or are legally separated). Turn on that option under More options if it applies.",
    "no-earnings": "The credit needs earned income: wages, tips or self-employment profit.",
    income: `Your income is above the ${usd(r.end)} limit for a household with ${kidsLabel} at this filing status.`,
  };

  const segments = [
    { label: "Your credit", value: r.credit, display: usd(r.credit), color: COLORS.credit },
    { label: "Below the maximum", value: Math.max(0, row.max - r.credit), display: usd(Math.max(0, row.max - r.credit)), color: COLORS.gap },
  ];


  return (
    <Studio
      title="Your earned income credit"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my EITC"
      onReset={st.reset}
      dock={{ label: "EITC for 2026", value: usd(r.credit) }}
      inputs={
        <>
          <InputGroup title="Your household">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] }))} />
            <RadioGroup
              label="Qualifying children"
              value={v.kids}
              onChange={st.bind("kids")}
              options={KIDS.map((n) => ({ value: n, label: n === "3" ? "3 or more" : n }))}
              info="Under 19 at the end of 2026 (under 24 if a full-time student, any age if permanently disabled), lived with you in the U.S. for more than half the year, with an SSN."
            />
            <MoneyField
              label="Earned income a year"
              symbol="$"
              value={v.earned}
              onChange={st.bind("earned")}
              slider={{ min: 0, max: 80_000, step: 500, ends: ["$0", "$80k"] }}
              info="Wages, salary and tips (W-2 box 1) plus net self-employment earnings, for you and your spouse if filing jointly."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField
              label="Other income (not investment)"
              symbol="$"
              value={v.otherIncome}
              onChange={st.bind("otherIncome")}
              optional
              info="Unemployment, taxable pensions, alimony from older divorces and other income in your AGI. It does not earn credit but can push you into the phase-out."
            />
            <MoneyField
              label="Investment income"
              symbol="$"
              value={v.investment}
              onChange={st.bind("investment")}
              optional
              info={`Interest (including tax-exempt), dividends, capital gains, rents and royalties. Over ${usd(EITC_INVESTMENT_LIMIT)} in 2026 and you get no credit.`}
            />
            {k === 0 && <Switch label="You (or your spouse) are aged 25 to 64" checked={v.age} onChange={st.bind("age")} optional info="Required when you have no qualifying child." />}
            {v.status === "mfs" && (
              <Switch
                label="Separated-spouse rules apply"
                checked={v.separated}
                onChange={st.bind("separated")}
                optional
                info="A qualifying child lived with you for over half the year, and you lived apart from your spouse for the last six months of 2026 or have a separation agreement."
              />
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Earned income credit for 2026"
        value={usd(r.credit)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.blocked && r.blocked !== "income" ? (
            <>{reason[r.blocked]}</>
          ) : r.credit > 0 ? (
            <>
              With <b>{usd(v.earned)}</b>{" "}of earned income and {kidsLabel}, your 2026 EITC is about <b>{usd(r.credit)}</b>. It is fully refundable: you get it even if
              you owe no tax.
            </>
          ) : (
            <>{reason.income}</>
          )
        }
        badges={[`Maximum ${usd(row.max)}`, STAGE[r.stage].split(":")[0], `Ends at ${usd(r.end)}`]}
      />

      <Facts
        items={[
          { label: "Maximum for your family", value: usd(row.max) },
          { label: "Phase-out starts", value: usd(r.start) },
          { label: "Credit ends at", value: usd(r.end) },
          { label: "Each extra $100 earned", value: r.perDollar === 0 ? "No change" : `${r.perDollar > 0 ? "+" : "−"}${usd(Math.abs(r.perDollar) * 100, true)}`, tone: r.perDollar < 0 ? "warn" : r.perDollar > 0 ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 (the return you file in 2027)" },
          { label: "Method", value: "The IRS formula; the EIC table in the Form 1040 instructions works in $50 steps, so it can differ by a few dollars" },
          { label: "AGI", value: "Earned income plus the other and investment income you entered" },
          { label: "Eligibility", value: "You, your spouse and each child have SSNs valid for work, you lived in the U.S. for over half the year and are not a qualifying child of someone else" },
          { label: "Head of household", value: "Uses the same limits as single" },
        ]}
      />

      <ResultCard title="Your credit against the maximum" sub={`The most anyone with ${kidsLabel} can get in 2026 is ${usd(row.max)}.`}>
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="The EITC curve for your family" sub="The credit rises with earnings, levels off, then falls away.">
        <AreaChart
          ariaLabel="Earned income credit by income"
          series={[{ key: "eitc", label: "EITC", color: COLORS.credit, values: curve.map((p) => p.credit), fill: true }]}
          xLabel={(i) => usdShort(curve[i]?.income ?? 0)}
          yFormat={usdShort}
          initial={at}
          hint="Drag across the chart, or use the arrow keys, to read any income."
          readout={(i) => (
            <>
              At <b>{usd(curve[i]?.income ?? 0)}</b>{" "}of income: credit <b>{usd(curve[i]?.credit ?? 0)}</b>.
            </>
          )}
        />
        <p className="footnote">
          Phase-in at {percent(row.rate, row.rate < 0.1 ? 2 : 0)} of earnings up to {usd(row.earnedAmount)}; phase-out at {percent(row.phaseRate, 2)} of income above {usd(r.start)}.
          Assumes AGI equals earned income.
        </p>
      </ResultCard>

      <ResultCard title="Credit by number of children" sub="Your income, with 0 to 3 or more qualifying children.">
        <Compare
          head={["Children", "EITC"]}
          rows={byKids.map((b) => ({ label: b.n === 3 ? "3 or more" : String(b.n), value: usd(b.c), bar: b.c / maxKids, current: b.n === k }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Things that change the credit on your real return.">
        {r.stage === "phase-out" && (
          <Callout title="You are in the phase-out">
            Each extra $1,000 of income cuts the credit by about {usd(row.phaseRate * 1_000)}. Pre-tax 401(k) contributions come out of both your earned income and your AGI, so
            here they raise the credit as well as cutting your tax.
          </Callout>
        )}
        {r.stage === "phase-in" && (
          <Callout tone="good" title="More work raises the credit">
            In the phase-in, each extra $1,000 earned adds {usd(row.rate * 1_000)} of credit, until earnings reach {usd(row.earnedAmount)}.
          </Callout>
        )}
        {k > 0 && (
          <Callout title="Child tax credit too">
            Families with children usually get the child tax credit as well. Check it with the <a href="/us/taxes/child-tax-credit-calculator">child tax credit calculator</a>.
          </Callout>
        )}
        <Callout title="Refunds come after mid-February">
          The IRS holds refunds that include the EITC until mid-February. Most arrive by early March if you file online with direct deposit.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax advice.
      </p>
    </Studio>
  );
}
