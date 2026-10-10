import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** HSA (US) — the guide. Figures from src/lib/us/investing.ts (hsaTax, hsaGrowth, hsaLimit), which uses tax-2026.ts and state-tax-2026.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an HSA is" },
  { id: "eligible", title: "Who can open one" },
  { id: "limits", title: "2026 contribution limits" },
  { id: "triple", title: "The triple tax break" },
  { id: "example", title: "A worked example" },
  { id: "income", title: "How the saving changes with income" },
  { id: "states", title: "State tax: California and New Jersey" },
  { id: "payroll", title: "Payroll or direct contributions" },
  { id: "employer", title: "Employer contributions" },
  { id: "partial", title: "Part-year coverage and the last-month rule" },
  { id: "growth", title: "Investing the balance" },
  { id: "receipts", title: "The receipts strategy" },
  { id: "qualified", title: "What you can spend it on" },
  { id: "after-65", title: "At 65 and Medicare" },
  { id: "vs-401k", title: "HSA, 401(k) or IRA first?" },
  { id: "fsa", title: "HSA vs FSA" },
  { id: "is-hdhp-right", title: "Is a high-deductible plan right for you?" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "inheritance", title: "When you die" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — Rev. Proc. 2025-19 (2026 HSA and HDHP amounts)", href: "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf" },
  { label: "IRS — Publication 969, Health savings accounts and other tax-favored health plans", href: "https://www.irs.gov/publications/p969" },
  { label: "IRS — About Form 8889, Health savings accounts", href: "https://www.irs.gov/forms-pubs/about-form-8889" },
  { label: "IRS — Publication 502, Medical and dental expenses", href: "https://www.irs.gov/publications/p502" },
  { label: "HealthCare.gov — High deductible health plan", href: "https://www.healthcare.gov/glossary/high-deductible-health-plan/" },
  { label: "Medicare.gov — When does Medicare coverage start?", href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start" },
];

export default function HsaGuide() {
  return (
    <Guide
      kicker="The HSA guide"
      title="How a health savings account cuts your tax"
      intro={
        <>
          A health savings account is the only account in the US tax code that is tax-free going in, while invested and coming out for medical
          costs. This guide covers who can open one, the 2026 limits, how much tax it saves at different incomes and in different states, and
          how to use it as a long-term investment account.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You need a high-deductible health plan (HDHP) and no other health coverage to contribute.</li>
          <li>In 2026 you can put in {usd(4_400)} with self-only coverage or {usd(8_750)} with family coverage, plus {usd(1_000)} from age 55.</li>
          <li>A single filer earning {usd(75_000)} who contributes {usd(4_400)} through payroll saves about {usd(1_305)} of tax, so the {usd(4_400)} really costs {usd(3_095)}.</li>
          <li>Invested at 6% a year from 40 to 65, {usd(4_400)} a year grows to about {usd(247_973)}.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(4_400), label: "Self-only limit, 2026" },
            { value: usd(8_750), label: "Family limit, 2026" },
            { value: usd(1_305), label: "Tax saved on $4,400 at $75,000 (Texas)" },
            { value: "20%", label: "Penalty on non-medical use before 65" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an HSA is">
        <p>
          A health savings account is a personal savings account for medical costs, held with a bank, credit union or investment firm acting as
          trustee. You own it, not your employer, and the money never expires. You can spend it on deductibles, copays, prescriptions, dental
          and vision care, or leave it to grow.
        </p>
        <p>
          It is different from a flexible spending account (FSA), which your employer owns and which mostly resets each year. An HSA rolls over
          forever and moves with you from job to job and into retirement.
        </p>
      </GuideSection>

      <GuideSection id="eligible" n={3} kicker="Eligibility" title="Who can open one">
        <p>To contribute for a month, on the first day of that month you must:</p>
        <ul>
          <li>Be covered by a qualifying high-deductible health plan.</li>
          <li>Have no other health coverage that pays before the deductible (a spouse&rsquo;s general-purpose FSA counts as other coverage; dental, vision and accident cover do not).</li>
          <li>Not be enrolled in Medicare.</li>
          <li>Not be claimed as a dependent on someone else&rsquo;s tax return.</li>
        </ul>
        <DataTable
          caption="What makes a plan an HDHP in 2026"
          head={["", "Self-only", "Family"]}
          numeric={[1, 2]}
          rows={[
            ["Minimum deductible", usd(1_700), usd(3_400)],
            ["Maximum out-of-pocket (not premiums)", usd(8_500), usd(17_000)],
          ]}
        />
        <p>
          From 2026, bronze and catastrophic plans bought through a Health Insurance Marketplace also count as HDHPs, and a direct primary care
          membership no longer blocks you from contributing. Your plan documents or insurer will say whether the plan is &quot;HSA-qualified&quot;.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={4} kicker="2026" title="2026 contribution limits">
        <DataTable
          caption="HSA contribution limits (yours and your employer's together)"
          head={["Coverage", "Under 55", "55 or older"]}
          numeric={[1, 2]}
          rows={[
            ["Self-only", usd(4_400), usd(5_400)],
            ["Family", usd(8_750), usd(9_750)],
          ]}
        />
        <p>
          The IRS raises the base limits each year for inflation; the {usd(1_000)} catch-up is fixed by law. Married couples with family coverage
          share one family limit, which they can split however they like, but each spouse aged 55 or older must put their catch-up in an HSA in
          their own name. You have until the tax filing deadline, April 15, 2027, to make 2026 contributions.
        </p>
      </GuideSection>

      <GuideSection id="triple" n={5} kicker="Why it matters" title="The triple tax break">
        <CompareCards
          columns={[
            {
              name: "Going in",
              rows: [
                { label: "Federal income tax", value: "Deducted" },
                { label: "Social Security and Medicare", value: "Saved, through payroll" },
              ],
            },
            {
              name: "While invested",
              rows: [
                { label: "Interest, dividends and gains", value: "Not taxed" },
                { label: "Selling and switching funds", value: "No tax" },
              ],
            },
            {
              name: "Coming out",
              rows: [
                { label: "Qualified medical costs", value: "Tax-free at any age" },
                { label: "Anything else from 65", value: "Taxed as income, no penalty" },
              ],
            },
          ]}
        />
        <p>
          A <a href="/us/savings/401k-calculator">401(k)</a>{" "}gives you a deduction going in but taxes withdrawals; a{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA</a>{" "}taxes money going in but not coming out. An HSA used for medical costs
          does neither, which is why many planners call it the best tax deal available.
        </p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Single, 40, $75,000 salary, Texas, $4,400 through payroll"
          steps={[
            { label: "Federal income tax saved (22% bracket)", value: usd(968) },
            { label: "Social Security and Medicare saved (7.65%)", value: usd(337) },
            { label: "State tax saved (Texas has none)", value: "$0" },
            { label: "Total tax saved", value: usd(1_305) },
          ]}
          total={{ label: "What the $4,400 really costs", value: usd(3_095) }}
        />
        <p>
          That is a saving of 29.7 cents on every dollar, before any investment growth. The same person living in New York would also save{" "}
          {usd(238)} of state tax, for a total of {usd(1_542)}.
        </p>
      </GuideSection>

      <GuideSection id="income" n={7} kicker="Your bracket" title="How the saving changes with income">
        <Figure label="Tax saved on $4,400 through payroll, single, Texas" caption="Federal income tax plus Social Security and Medicare, 2026.">
          <Bars
            format={usd}
            items={[
              { label: "$45,000 salary", value: 865 },
              { label: "$75,000 salary", value: 1_305 },
              { label: "$150,000 salary", value: 1_393 },
              { label: "$250,000 salary", value: 1_511 },
            ]}
          />
        </Figure>
        <p>
          The federal saving follows your top tax bracket: 12% at {usd(45_000)}, 22% at {usd(75_000)}, 24% at {usd(150_000)} and 32% at{" "}
          {usd(250_000)}. The payroll saving works the other way: above the {usd(184_500)} Social Security wage base for 2026, you already pay no
          more Social Security tax, so only the Medicare part is saved. That is why the {usd(250_000)} earner saves just {usd(103)} of payroll tax
          against {usd(337)} for everyone below the wage base. Our <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}
          shows which bracket your last dollar falls in.
        </p>
      </GuideSection>

      <GuideSection id="states" n={8} kicker="Where you live" title="State tax: California and New Jersey">
        <DataTable
          caption="$4,400 through payroll, single, $75,000 salary, 2026"
          head={["State", "State tax saved", "Total saved"]}
          numeric={[1, 2]}
          rows={[
            ["Texas (no income tax)", "$0", usd(1_305)],
            ["Pennsylvania", usd(135), usd(1_440)],
            ["North Carolina", usd(176), usd(1_480)],
            ["Illinois", usd(218), usd(1_522)],
            ["New York", usd(238), usd(1_542)],
            ["California", "$0 (taxed)", usd(1_305)],
            ["New Jersey", "$0 (taxed)", usd(1_305)],
          ]}
        />
        <p>
          Most states with an income tax follow the federal rules, so your contribution comes off state income too. California and New Jersey
          don&rsquo;t: contributions are added back on the state return, and interest, dividends and gains inside the account are taxed by the state
          each year, so keep records of the account&rsquo;s earnings for your state return. Residents there still get the full federal and payroll
          saving.
        </p>
      </GuideSection>

      <GuideSection id="payroll" n={9} kicker="How you pay in" title="Payroll or direct contributions">
        <p>
          Contributions taken from your paycheck through your employer&rsquo;s cafeteria (Section 125) plan come out before income tax and before
          the 7.65% Social Security and Medicare tax. Money you deposit yourself is deducted on Form 8889 when you file, which saves income tax but
          not payroll tax.
        </p>
        <p>
          In the example, contributing directly saves {usd(968)} instead of {usd(1_305)}. If your employer offers payroll contributions, use them.
          Self-employed people can only contribute directly, and their HSA deduction doesn&rsquo;t reduce self-employment tax.
        </p>
      </GuideSection>

      <GuideSection id="employer" n={10} kicker="Free money" title="Employer contributions">
        <p>
          Many employers seed HSAs, often with {usd(500)} to {usd(1_500)} a year, or match contributions. Employer money isn&rsquo;t taxed as wages,
          isn&rsquo;t subject to payroll tax and shows on your W-2 in box 12 with code W. It counts toward the limit, so it reduces how much you can
          put in yourself.
        </p>
        <p>
          A married couple with family coverage earning {usd(120_000)} whose employer puts in {usd(1_000)} can add {usd(7_750)} of their own,
          which saves {usd(930)} of federal tax and {usd(593)} of payroll tax.
        </p>
      </GuideSection>

      <GuideSection id="partial" n={11} kicker="Timing" title="Part-year coverage and the last-month rule">
        <p>
          If you are HSA-eligible for only part of the year, your limit is one-twelfth of the annual amount for each month you were eligible on
          the first day. Six months of self-only coverage allows {usd(2_200)}.
        </p>
        <Callout tone="warn" title="The last-month rule has a catch">
          If you are eligible on December 1, you can contribute the full year&rsquo;s limit. But you must then stay eligible for the whole of the
          next year (the testing period). If you don&rsquo;t, the extra is added to your income and charged a 10% additional tax.
        </Callout>
      </GuideSection>

      <GuideSection id="growth" n={12} kicker="Long term" title="Investing the balance">
        <Figure label="$4,400 a year from 40 to 65" caption="Balance at 65, by how the money is used and invested.">
          <Bars
            format={usd}
            items={[
              { label: "Invested at 6%, nothing spent", value: 247_973 },
              { label: "Invested at 6%, $1,500 a year spent", value: 140_647 },
              { label: "Left in cash at 1%, nothing spent", value: 124_839 },
            ]}
          />
        </Figure>
        <p>
          Over 25 years you put in {usd(110_000)}. Invested at 6% and left alone, it grows to about {usd(247_973)}, worth about {usd(133_754)} in
          today&rsquo;s dollars at 2.5% inflation. Paying {usd(1_500)} a year of medical costs from the account (rising with inflation) leaves about{" "}
          {usd(140_647)}. Left in cash at 1%, the same deposits reach only {usd(124_839)}. Starting at 30 instead of 40 lifts the invested balance
          at 65 to about {usd(503_655)}. Our <a href="/us/savings/investment-calculator">investment calculator</a>{" "}shows how fees and returns
          change long-term growth.
        </p>
      </GuideSection>

      <GuideSection id="receipts" n={13} kicker="Strategy" title="The receipts strategy">
        <p>
          There is no time limit on reimbursing yourself for a qualified medical expense, as long as it was incurred after you opened the HSA.
          So if you can afford it, you can pay medical bills from your checking account, keep the receipts, and let the HSA stay invested. Years
          later you can take out the total of those receipts tax-free, for any reason.
        </p>
        <Callout title="Keep the paperwork">
          Store receipts and explanation-of-benefits statements digitally. If the IRS asks, you need to show the expense was qualified, was not
          reimbursed by insurance and was not claimed as an itemized deduction.
        </Callout>
      </GuideSection>

      <GuideSection id="qualified" n={14} kicker="Spending" title="What you can spend it on">
        <ul>
          <li><strong>Yes:</strong>{" "}deductibles, copays and coinsurance; prescriptions; dental and vision care, including glasses and contacts; mental health care; over-the-counter medicines and menstrual products; COBRA premiums; long-term care insurance premiums up to an age-based limit; Medicare premiums from 65 (not Medigap).</li>
          <li><strong>No:</strong>{" "}regular health insurance premiums while you work, gym memberships, cosmetic procedures and general health items.</li>
        </ul>
        <p>
          You can also spend it on your spouse&rsquo;s and dependents&rsquo; qualified costs, even if they aren&rsquo;t on your HDHP. IRS Publication 502
          has the full list.
        </p>
      </GuideSection>

      <GuideSection id="after-65" n={15} kicker="Retirement" title="At 65 and Medicare">
        <Timeline
          items={[
            { when: "Before 65", what: "Non-medical withdrawals are taxed and pay a 20% additional tax." },
            { when: "65", what: "The 20% penalty ends. Non-medical withdrawals are taxed as income, like a traditional IRA." },
            { when: "Medicare enrollment", what: "New contributions stop. Part A can be backdated up to six months if you enroll after 65, so stop contributing six months before you apply." },
            { when: "Any age", what: "Withdrawals for qualified medical costs, including Medicare Part B, Part D and Medicare Advantage premiums, are tax-free." },
          ]}
        />
        <p>
          Health costs in retirement are large, so many retirees never need to make a taxable withdrawal: the HSA simply pays Medicare premiums,
          dental work and prescriptions. Our <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}helps size the rest of your
          savings.
        </p>
      </GuideSection>

      <GuideSection id="vs-401k" n={16} kicker="Priorities" title="HSA, 401(k) or IRA first?">
        <p>A common order, if you have an HDHP:</p>
        <ol>
          <li>Contribute enough to your 401(k) to get the full employer match.</li>
          <li>Fill the HSA through payroll, since it saves payroll tax too.</li>
          <li>Then add to a Roth IRA or more to the 401(k).</li>
        </ol>
        <p>
          The HSA wins over a 401(k) for money you will spend on health care, because it is never taxed. It also saves Social Security and
          Medicare tax, which 401(k) deferrals do not.
        </p>
      </GuideSection>

      <GuideSection id="fsa" n={17} kicker="Compare" title="HSA vs FSA">
        <CompareCards
          columns={[
            {
              name: "HSA",
              rows: [
                { label: "Needs an HDHP", value: "Yes" },
                { label: "Unused money", value: "Rolls over forever" },
                { label: "Can be invested", value: "Yes" },
                { label: "Leaves with you", value: "Yes" },
              ],
            },
            {
              name: "Health care FSA",
              rows: [
                { label: "Needs an HDHP", value: "No" },
                { label: "Unused money", value: "Mostly lost each year" },
                { label: "Can be invested", value: "No" },
                { label: "Leaves with you", value: "No" },
              ],
            },
          ]}
        />
        <p>
          You can&rsquo;t have a general-purpose FSA and contribute to an HSA, but a limited-purpose FSA for dental and vision costs works alongside
          one.
        </p>
      </GuideSection>

      <GuideSection id="is-hdhp-right" n={18} kicker="Choosing a plan" title="Is a high-deductible plan right for you?">
        <p>
          HDHPs usually have lower premiums but higher costs when you need care. Compare the total: yearly premiums plus your likely out-of-pocket
          costs, minus any employer HSA money and the tax you save. If you are healthy and can cover the deductible from savings, an HDHP plus HSA
          often comes out ahead. If you expect large regular costs, a plan with a lower deductible may be cheaper overall, even without the HSA.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Leaving the whole balance in cash for decades.</li>
          <li>Forgetting that your employer&rsquo;s contribution counts toward the limit, and going over it (excess contributions pay 6% a year until removed).</li>
          <li>Contributing after enrolling in Medicare, including the six months Part A can be backdated.</li>
          <li>Losing receipts for expenses you plan to reimburse later.</li>
          <li>Living in California or New Jersey and not reporting the account&rsquo;s earnings on the state return.</li>
        </ul>
      </GuideSection>

      <GuideSection id="inheritance" n={20} kicker="Estate" title="When you die">
        <p>
          If your spouse is the beneficiary, the HSA becomes their HSA, with all the same tax breaks. Anyone else receives the balance as taxable
          income in the year of your death, reduced by any of your medical bills they pay within a year. That is one reason to spend the HSA on
          your own health costs in later life and leave other savings, such as a Roth IRA, to heirs.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["Contribution limit, self-only", usd(4_400)],
            ["Contribution limit, family", usd(8_750)],
            ["Catch-up from age 55", usd(1_000)],
            ["HDHP minimum deductible", `${usd(1_700)} / ${usd(3_400)}`],
            ["HDHP out-of-pocket maximum", `${usd(8_500)} / ${usd(17_000)}`],
            ["Penalty on non-medical use before 65", "20%"],
            ["Excise tax on excess contributions", "6% a year"],
            ["Deadline for 2026 contributions", "April 15, 2027"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
