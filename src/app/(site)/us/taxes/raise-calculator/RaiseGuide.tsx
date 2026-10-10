import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Pay raise: the guide. Figures from src/lib/us/credits-payroll.ts (raise, raisePath, yearsToDouble, CPI_LATEST), which runs paycheck() in pay.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "percent", title: "Percent and dollars" },
  { id: "hourly", title: "Hourly raises" },
  { id: "example", title: "A 4% raise, line by line" },
  { id: "kept", title: "How much of a raise you keep" },
  { id: "states", title: "State tax on a raise" },
  { id: "brackets", title: "The tax bracket myth" },
  { id: "crossing", title: "Example: a raise that crosses a bracket" },
  { id: "k401", title: "Raises and your 401(k)" },
  { id: "inflation", title: "Real raise: beating inflation" },
  { id: "keep-up", title: "The raise you need to stand still" },
  { id: "compound", title: "Raises compound" },
  { id: "double", title: "How long until your pay doubles" },
  { id: "types", title: "Merit, cost-of-living and promotion raises" },
  { id: "credits", title: "Credits and benefits that shrink" },
  { id: "timing", title: "When the raise reaches your paycheck" },
  { id: "asking", title: "Asking for a raise" },
  { id: "compare", title: "Comparing a raise with a new job" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "U.S. Bureau of Labor Statistics: Consumer Price Index, August 2026 release", href: "https://www.bls.gov/news.release/archives/cpi_09112026.htm" },
  { label: "U.S. Bureau of Labor Statistics: CPI inflation calculator", href: "https://www.bls.gov/data/inflation_calculator.htm" },
  { label: "IRS: Rev. Proc. 2025-32, 2026 tax brackets and standard deduction", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "IRS: Publication 15, Employer's Tax Guide (supplemental wages)", href: "https://www.irs.gov/publications/p15" },
  { label: "Social Security Administration: 2026 contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
];

export default function RaiseGuide() {
  return (
    <Guide
      kicker="The pay raise guide"
      title="What a raise is really worth"
      intro={
        <>
          A raise is quoted before tax and before inflation. This guide shows how to turn a percentage into dollars, how much of each extra dollar you keep in
          2026, why a higher bracket never costs you money, and how to tell whether a raise beats rising prices.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>New pay = old pay × (1 + raise %). A 4% raise on $60,000 is $2,400, for $62,400.</li>
          <li>You keep roughly 70% to 80% of a raise after federal tax, Social Security and Medicare, and less in states with income tax.</li>
          <li>A higher tax bracket applies only to the dollars above the line, so a raise never lowers your take-home pay.</li>
          <li>Prices rose 3.4% in the 12 months to August 2026. A smaller raise is a pay cut in buying power.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$2,400", label: "4% raise on $60,000" },
            { value: "$74", label: "Extra take-home every two weeks (Texas)" },
            { value: "80%", label: "Share of that raise kept" },
            { value: "3.4%", label: "Inflation, 12 months to August 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="percent" n={2} kicker="Method" title="Percent and dollars">
        <p>
          To turn a percentage into dollars, multiply your current pay by the percentage. To go the other way, divide the raise by your old pay. A $3,000 raise
          on $60,000 is 5%. The <a href="/everyday/percentage-calculator">percentage calculator</a>{" "}does any percentage change.
        </p>
        <DataTable
          caption="Raises on a $60,000 salary"
          head={["Raise", "Dollars a year", "New salary", "Per biweekly paycheck"]}
          numeric={[1, 2, 3]}
          rows={[
            ["2%", "$1,200", "$61,200", "$46.15"],
            ["3.4%", "$2,040", "$62,040", "$78.46"],
            ["4%", "$2,400", "$62,400", "$92.31"],
            ["5%", "$3,000", "$63,000", "$115.38"],
            ["10%", "$6,000", "$66,000", "$230.77"],
          ]}
        />
      </GuideSection>

      <GuideSection id="hourly" n={3} kicker="Method" title="Hourly raises">
        <p>
          For hourly workers, multiply the raise by the hours you work in a year. A full-time year is 2,080 hours, so each $1 an hour is $2,080 a year. Going
          from $20 to $21 is a 5% raise. After tax in Texas it adds $1,671 a year, or $64.28 a biweekly paycheck. The{" "}
          <a href="/us/taxes/hourly-paycheck-calculator">hourly paycheck calculator</a>{" "}shows your whole paycheck at the new rate.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A 4% raise, line by line">
        <WorkedExample
          title="$60,000 to $62,400, single, Texas, paid every two weeks"
          steps={[
            { label: "Raise a year", value: "$2,400" },
            { label: "Federal income tax (12%)", value: "−$288" },
            { label: "Social Security and Medicare (7.65%)", value: "−$184" },
            { label: "Texas income tax", value: "$0" },
          ]}
          total={{ label: "Extra take-home a year", value: "$1,928" }}
        />
        <p>That is $74.17 more in each of 26 paychecks, against $92.31 more before tax.</p>
      </GuideSection>

      <GuideSection id="kept" n={5} kicker="Tax" title="How much of a raise you keep">
        <p>
          Every extra dollar is taxed at your top rates: your federal bracket, 7.65% for Social Security and Medicare (until your pay passes $184,500, when
          only Medicare remains) and your state&rsquo;s top rate. Add them up to find the tax on each dollar of the raise.
        </p>
        <DataTable
          caption="Share of a raise kept, single, Texas, 2026"
          head={["Pay before the raise", "Federal bracket", "Tax per extra dollar", "Kept"]}
          numeric={[2, 3]}
          rows={[
            ["$60,000, 4% raise", "12%", "19.65%", "80.3%"],
            ["$100,000, 5% raise", "22%", "29.65%", "70.3%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="states" n={6} kicker="Tax" title="State tax on a raise">
        <p>State income tax takes its share of a raise too. The same 4% raise on $60,000 adds this much take-home a year:</p>
        <Bars
          format={usd}
          items={[
            { label: "Texas", value: 1928 },
            { label: "New York", value: 1799 },
            { label: "California", value: 1753 },
          ]}
        />
      </GuideSection>

      <GuideSection id="brackets" n={7} kicker="Tax" title="The tax bracket myth">
        <p>
          Many people fear a raise that pushes them into a higher bracket. Federal income tax is marginal: each rate applies only to the income inside its
          band. If a raise crosses from the 12% to the 22% bracket, only the dollars above the line pay 22%. Everything below is taxed as before. The{" "}
          <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows where your income falls.
        </p>
        <Callout tone="good" title="A raise always raises take-home pay">
          No federal bracket takes more than 37 cents of a dollar, and with payroll and state tax most people keep well over half of any raise.
        </Callout>
      </GuideSection>

      <GuideSection id="crossing" n={8} kicker="Worked example" title="Example: a raise that crosses a bracket">
        <WorkedExample
          title="$62,000 to $68,000, single, Texas"
          steps={[
            { label: "Raise", value: "$6,000" },
            { label: "Taxable income goes from $45,900 to $51,900", value: "" },
            { label: "$4,500 taxed at 12%", value: "−$540" },
            { label: "$1,500 above $50,400 taxed at 22%", value: "−$330" },
            { label: "Social Security and Medicare", value: "−$459" },
          ]}
          total={{ label: "Extra take-home a year", value: "$4,671" }}
        />
        <p>The worker keeps 77.8% of the raise. Without the higher bracket it would have been 80.3%: the difference is $150 a year, not a loss.</p>
      </GuideSection>

      <GuideSection id="k401" n={9} kicker="Savings" title="Raises and your 401(k)">
        <p>
          If you save a percentage of pay, your 401(k) contribution rises with a raise, and so does any employer match. With 6% going to a traditional 401(k),
          the 4% raise on $60,000 adds $144 a year to savings and $1,802 to take-home. Raising your contribution rate by a point each time you get a raise is a
          painless way to save more: you never see your paycheck fall. See the <a href="/us/savings/401k-calculator">401(k) calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Inflation" title="Real raise: beating inflation">
        <p>
          A raise only improves your standard of living if it beats inflation. Your real raise is (1 + raise) ÷ (1 + inflation) − 1. The Consumer Price Index
          for All Urban Consumers (CPI-U) rose 3.4% in the 12 months to August 2026.
        </p>
        <DataTable
          caption="Real raise with 3.4% inflation"
          head={["Raise", "Real raise", "New $60,000 pay in today's dollars"]}
          numeric={[1, 2]}
          rows={[
            ["2%", "−1.35%", "$59,188"],
            ["3.4%", "0.00%", "$60,000"],
            ["4%", "+0.58%", "$60,348"],
            ["5%", "+1.55%", "$60,928"],
            ["10%", "+6.38%", "$63,830"],
          ]}
        />
      </GuideSection>

      <GuideSection id="keep-up" n={11} kicker="Inflation" title="The raise you need to stand still">
        <p>
          To keep the same buying power, your pay must rise by the inflation rate: $2,040 on $60,000 at 3.4%. The federal brackets and standard
          deduction rise with inflation each year, so a raise that only matches inflation leaves your tax share about the same.
        </p>
      </GuideSection>

      <GuideSection id="compound" n={12} kicker="Long term" title="Raises compound">
        <p>
          Each raise is a percentage of a bigger salary than the last. Starting from $60,000, with 3% inflation:
        </p>
        <DataTable
          caption="$60,000 with the same raise every year"
          head={["Yearly raise", "After 10 years", "In today's dollars", "After 20 years", "In today's dollars"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["2%", "$73,140", "$54,423", "$89,157", "$49,364"],
            ["3%", "$80,635", "$60,000", "$108,367", "$60,000"],
            ["4%", "$88,815", "$66,086", "$131,467", "$72,790"],
            ["5%", "$97,734", "$72,723", "$159,198", "$88,144"],
          ]}
        />
        <p>After 20 years, a 4% raise each year instead of 2% is worth $23,426 a year more in today&rsquo;s dollars.</p>
      </GuideSection>

      <GuideSection id="double" n={13} kicker="Long term" title="How long until your pay doubles">
        <Bars
          format={(n) => `${n.toFixed(1)} years`}
          items={[
            { label: "2% a year", value: 35.0 },
            { label: "3% a year", value: 23.4 },
            { label: "4% a year", value: 17.7 },
            { label: "5% a year", value: 14.2 },
          ]}
        />
        <p>The rule of 72 gives a close estimate: divide 72 by the raise percentage.</p>
      </GuideSection>

      <GuideSection id="types" n={14} kicker="Background" title="Merit, cost-of-living and promotion raises">
        <CompareCards
          columns={[
            { name: "Cost of living", rows: [{ label: "Given to", value: "Everyone" }, { label: "Aim", value: "Keep pace with prices" }, { label: "Typical timing", value: "Once a year" }] },
            { name: "Merit", rows: [{ label: "Given to", value: "Strong performers" }, { label: "Aim", value: "Reward results" }, { label: "Typical timing", value: "After a review" }] },
            { name: "Promotion", rows: [{ label: "Given to", value: "A new role" }, { label: "Aim", value: "Pay for bigger duties" }, { label: "Typical timing", value: "Any time" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="credits" n={15} kicker="Watch out" title="Credits and benefits that shrink">
        <p>
          Some tax credits fall as income rises. The earned income credit drops by up to 21.06 cents for each extra dollar in its phase-out, on top of tax,
          and the child tax credit falls by $50 for each $1,000 above $200,000 ($400,000 joint). Health insurance subsidies and some state benefits also depend
          on income. A raise is still almost always worth taking, but the share you keep can be lower than the bracket suggests. Check with the{" "}
          <a href="/us/taxes/earned-income-credit-calculator">earned income credit calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={16} kicker="Paychecks" title="When the raise reaches your paycheck">
        <p>
          A raise starts with the first full pay period after its effective date. A backdated raise is usually paid as a lump sum; employers can withhold
          federal tax on it at a flat 22% as supplemental wages. Your real tax is settled on your return, so any over-withholding comes back.
        </p>
      </GuideSection>

      <GuideSection id="asking" n={17} kicker="Practical" title="Asking for a raise">
        <ul>
          <li>Find what your role pays at other employers in your area.</li>
          <li>List your results in numbers: sales, savings, projects delivered.</li>
          <li>Ask for a specific yearly figure in dollars, before budgets are set.</li>
          <li>If the answer is no, ask what would earn a raise and when to revisit it.</li>
        </ul>
      </GuideSection>

      <GuideSection id="compare" n={18} kicker="Practical" title="Comparing a raise with a new job">
        <p>
          Compare offers by yearly take-home pay plus benefits, not headline salary. A 401(k) match of 4% on $60,000 is $2,400 a year, the same as a 4% raise,
          and employer health cover can be worth thousands more. A move to a state with income tax can take back much of a bigger salary. The{" "}
          <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}shows take-home pay in every state.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "3.4%", label: "CPI-U inflation, year to August 2026" },
            { value: "2,080", label: "Hours in a full-time year" },
            { value: "$2,080", label: "Value of $1 an hour a year" },
            { value: "7.65%", label: "Social Security and Medicare on a raise" },
            { value: "$184,500", label: "Social Security wage base, 2026" },
            { value: "22%", label: "Flat withholding on supplemental pay" },
            { value: "72", label: "Rule of 72 for doubling time" },
            { value: "37%", label: "Top federal bracket" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
