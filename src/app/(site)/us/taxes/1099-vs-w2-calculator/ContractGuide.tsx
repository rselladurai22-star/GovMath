import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** 1099 vs W-2 guide. Figures from src/lib/us/estate-property.ts (w2Value, contractorValue, breakEvenRate). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const usd2 = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "difference", title: "What changes when you go 1099" },
  { id: "example", title: "A worked example" },
  { id: "payroll", title: "Self-employment tax vs FICA" },
  { id: "income-tax", title: "Income tax and the QBI deduction" },
  { id: "benefits", title: "What benefits are worth" },
  { id: "health", title: "Health insurance" },
  { id: "retirement", title: "Retirement: match vs SEP and solo 401(k)" },
  { id: "pto", title: "Paid time off and holidays" },
  { id: "unbilled", title: "Unbilled time" },
  { id: "expenses", title: "Business expenses" },
  { id: "break-even", title: "The break-even rate" },
  { id: "rule-of-thumb", title: "Is 1.25 to 1.5 times right?" },
  { id: "salary-levels", title: "At other salaries" },
  { id: "states", title: "State taxes" },
  { id: "quarterly", title: "Quarterly estimated tax" },
  { id: "classification", title: "Are you really a contractor?" },
  { id: "when-1099-wins", title: "When the contract wins" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: Independent contractor (self-employed) or employee?", href: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" },
  { label: "IRS: Self-employment tax (Social Security and Medicare taxes)", href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
  { label: "IRS: Qualified business income deduction", href: "https://www.irs.gov/newsroom/qualified-business-income-deduction" },
  { label: "IRS: Revenue Procedure 2025-32 (2026 inflation adjustments)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "SSA: 2026 Social Security changes (wage base $184,500)", href: "https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf" },
  { label: "BLS: Employer Costs for Employee Compensation", href: "https://www.bls.gov/ecec/" },
  { label: "KFF: 2025 Employer Health Benefits Survey", href: "https://www.kff.org/health-costs/2025-employer-health-benefits-survey/" },
  { label: "U.S. Department of Labor: Employee or independent contractor classification", href: "https://www.dol.gov/agencies/whd/flsa/misclassification" },
];

export default function ContractGuide() {
  return (
    <Guide
      kicker="The 1099 vs W-2 guide"
      title="What a contract rate has to cover"
      intro={
        <>
          A contract rate always looks higher than a salary worked out per hour. It has to be. As a 1099 contractor you pay both halves of Social Security and Medicare, buy your
          own health insurance, fund your own retirement, cover your own equipment and go unpaid for vacations, holidays and the hours spent finding work. This guide prices each
          of those for 2026 and shows how to find the rate that really matches a salaried job.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A {usd(100_000)} salary works out to {usd2(48.08)} an hour over 2,080 hours.</li>
          <li>
            To match it as a single contractor in Texas billing 32 hours a week for 46 weeks, with {usd(5_000)} of expenses, a {usd(9_325)} health plan and {usd(4_000)} of
            retirement savings, you need about {usd2(82.58)} an hour: 1.72 times the salary rate.
          </li>
          <li>At {usd(75)} an hour the contract leaves you about {usd(7_758)} a year worse off.</li>
          <li>Bill 40 hours for 50 weeks and the break-even rate falls to {usd2(60.78)}. Unbilled time matters more than tax.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd2(82.58), label: "Break-even rate for a $100,000 job (example)" },
            { value: "15.3%", label: "Self-employment tax on 92.35% of profit" },
            { value: "about 30%", label: "Benefits' share of private-sector pay (BLS)" },
            { value: "20%", label: "QBI deduction for most sole proprietors" },
          ]}
        />
      </GuideSection>

      <GuideSection id="difference" n={2} kicker="Basics" title="What changes when you go 1099">
        <p>
          A W-2 employee is on the payroll. The employer withholds income tax, pays half of Social Security and Medicare, and usually adds health insurance, a 401(k) match and
          paid time off. A 1099 contractor runs a business of one. Clients pay the invoice in full and report it on Form 1099-NEC; everything else is your job.
        </p>
        <CompareCards
          columns={[
            {
              name: "W-2 employee",
              rows: [
                { label: "Social Security and Medicare", value: "7.65%, employer pays the other half" },
                { label: "Health insurance", value: "Employer pays most of it" },
                { label: "Retirement", value: "401(k), often with a match" },
                { label: "Time off", value: "Paid" },
                { label: "Equipment", value: "Provided" },
              ],
            },
            {
              name: "1099 contractor",
              rows: [
                { label: "Social Security and Medicare", value: "15.3% self-employment tax" },
                { label: "Health insurance", value: "You buy it, deductible" },
                { label: "Retirement", value: "SEP IRA or solo 401(k)" },
                { label: "Time off", value: "Unpaid" },
                { label: "Equipment", value: "Yours, deductible" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>
          Two offers for a single filer in Texas, which has no state income tax: a {usd(100_000)} job with a 4% match where you pay {usd(1_440)} a year toward health insurance,
          or a contract at {usd(75)} an hour.
        </p>
        <WorkedExample
          title="The $100,000 job"
          steps={[
            { label: "Salary", value: usd(100_000) },
            { label: "Your health premium share", value: "−" + usd(1_440) },
            { label: "Social Security and Medicare", note: "7.65% of $98,560", value: "−$7,539.84" },
            { label: "Federal income tax", value: "−$12,853.20" },
            { label: "Employer 401(k) match", note: "4% of salary", value: "+" + usd(4_000) },
          ]}
          total={{ label: "What you keep, with the match", value: "$82,166.96" }}
        />
        <WorkedExample
          title="The $75 an hour contract"
          steps={[
            { label: "Billed", note: "32 hours × 46 weeks × $75", value: usd(110_400) },
            { label: "Business expenses", value: "−" + usd(5_000) },
            { label: "Health insurance", value: "−" + usd(9_325) },
            { label: "Self-employment tax", value: "−$14,892.55" },
            { label: "Federal income tax", note: "after a $13,706 QBI deduction", value: "−$6,773.06" },
          ]}
          total={{ label: "What you keep, with $4,000 saved for retirement", value: "$74,409.40" }}
        />
        <p>
          The job comes out {usd(7_758)} ahead. The contract would need to pay {usd2(82.58)} an hour to match it. Put the other way, the contract is worth the same as a{" "}
          {usd(89_566)} salary.
        </p>
      </GuideSection>

      <GuideSection id="payroll" n={4} kicker="Payroll tax" title="Self-employment tax vs FICA">
        <p>
          Employees pay 6.2% Social Security and 1.45% Medicare on wages, and the employer pays the same again. A contractor pays both halves as self-employment tax: 15.3% on
          92.35% of net profit, with the Social Security part stopping at the 2026 wage base of {usd(184_500)}. Half of it is deducted when working out income tax, which is the
          tax code&rsquo;s way of treating the &quot;employer half&quot; as a business cost.
        </p>
        <p>
          In the example, the employee pays {usd2(7_539.84)} and the contractor {usd2(14_892.55)}: almost double, on similar pay. Our{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}breaks this down line by line, with quarterly payment dates.
        </p>
      </GuideSection>

      <GuideSection id="income-tax" n={5} kicker="Income tax" title="Income tax and the QBI deduction">
        <p>Contractors often pay less income tax than employees on the same money, for three reasons:</p>
        <ul>
          <li>Business expenses come off before tax.</li>
          <li>Half the self-employment tax and the self-employed health insurance premium are deducted from income.</li>
          <li>
            The <strong>qualified business income (QBI) deduction</strong>{" "}takes up to 20% of business profit off taxable income. From 2026 it phases out for specified
            service businesses (consultants, doctors, lawyers, financial advisers) above {usd(201_750)} of taxable income ({usd(403_500)} joint).
          </li>
        </ul>
        <p>
          In the example the contractor&rsquo;s federal income tax is {usd2(6_773.06)}, against {usd2(12_853.20)} for the employee. Without the QBI deduction it would be{" "}
          {usd2(9_788.32)} and the contractor would keep {usd2(71_394.13)}. Lower income tax only partly offsets the extra payroll tax and the costs.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={6} kicker="Benefits" title="What benefits are worth">
        <p>
          The Bureau of Labor Statistics measures what employers spend. In December 2025, private-industry pay cost {usd2(46.15)} an hour worked: {usd2(32.36)} in wages and{" "}
          {usd2(13.79)} in benefits. Benefits were about 30% of the total.
        </p>
        <p>
          That figure includes paid leave, insurance, retirement, bonuses and legally required costs such as the employer&rsquo;s half of Social Security and unemployment
          insurance. The calculator counts the parts that land in your pocket (the match, the health subsidy and paid time off) and asks you to add anything else you value.
        </p>
      </GuideSection>

      <GuideSection id="health" n={7} kicker="Health" title="Health insurance">
        <p>
          KFF&rsquo;s 2025 survey put the average employer plan at {usd(9_325)} a year for one person and {usd(26_993)} for a family. Workers paid about 16% and 26% of those; the
          employer paid the rest. As a contractor you pay the whole premium yourself, through the ACA marketplace or a private plan.
        </p>
        <p>
          Self-employed health insurance is deductible from income, but not from self-employment tax, and only when you aren&rsquo;t eligible for a spouse&rsquo;s employer
          plan. Marketplace premium tax credits can lower the cost if your income qualifies. For a family, enter the family premium: it is often the single biggest item in the
          comparison.
        </p>
      </GuideSection>

      <GuideSection id="retirement" n={8} kicker="Retirement" title="Retirement: match vs SEP and solo 401(k)">
        <p>
          A 4% match on {usd(100_000)} is {usd(4_000)} a year of free money. A contractor can save as much or more through a SEP IRA (up to 20% of net self-employment earnings)
          or a solo 401(k), where you contribute both as employee (up to {usd(24_500)} in 2026) and as employer. But the money is yours, not an extra from someone else.
        </p>
        <p>
          The calculator counts the match on the job side and your own savings on the contract side, so both totals include retirement money. Our{" "}
          <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows what a match grows to.
        </p>
      </GuideSection>

      <GuideSection id="pto" n={9} kicker="Time off" title="Paid time off and holidays">
        <p>
          A salary pays you for 52 weeks, including vacation, public holidays and sick days. A contractor is paid only for weeks worked. Three weeks of vacation, ten holidays and
          a week of sick time come to about six weeks: that is why the calculator starts at 46 billed weeks.
        </p>
        <p>
          Gaps between contracts count too. A contractor who spends a month between clients each year bills 42 weeks, not 46. Our{" "}
          <a href="/us/taxes/salary-to-hourly">salary to hourly calculator</a>{" "}shows the same effect for unpaid days off.
        </p>
      </GuideSection>

      <GuideSection id="unbilled" n={10} kicker="Time" title="Unbilled time">
        <p>
          Contractors spend part of every week on work no client pays for: finding the next contract, writing proposals, invoicing, bookkeeping, chasing late payments and
          keeping skills current. Billing 32 hours of a 40-hour week is common; many freelancers bill fewer.
        </p>
        <Bars
          format={usd2}
          items={[
            { label: "40 hours × 50 weeks", value: 60.78 },
            { label: "32 hours × 46 weeks", value: 82.58 },
          ]}
        />
        <p>
          The same {usd(100_000)} job needs {usd2(60.78)} an hour if you bill 40 hours for 50 weeks, but {usd2(82.58)} if you bill 32 hours for 46. Billed hours move the answer
          more than any tax rule.
        </p>
      </GuideSection>

      <GuideSection id="expenses" n={11} kicker="Costs" title="Business expenses">
        <p>
          An employer supplies a laptop, software, a phone, an office and professional insurance. A contractor buys them. Typical costs include equipment, software
          subscriptions, professional liability insurance, accounting, a home office, travel and training. They are deductible, so they cut both income tax and self-employment
          tax, but they are still money out of your pocket.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={12} kicker="The answer" title="The break-even rate">
        <p>
          The calculator searches for the hourly rate at which the contract leaves you with exactly what the job does, after every tax, premium, expense and benefit. It also
          works the other way: the salary that would leave you as well off as the contract you were offered. Use the first when you set your rate; use the second when an
          employer asks what salary would make you switch.
        </p>
        <Callout title="Compare like with like">
          Both totals include retirement money: the employer&rsquo;s match on one side, your own SEP or solo 401(k) savings on the other. Everything else is cash you can spend.
        </Callout>
      </GuideSection>

      <GuideSection id="rule-of-thumb" n={13} kicker="Rules of thumb" title="Is 1.25 to 1.5 times right?">
        <p>
          A common rule says a contract rate should be 1.25 to 1.5 times the salary divided by 2,080. It works only when you bill close to full time all year. With no expenses,
          no health plan and no retirement savings, billing 40 hours for 52 weeks, the {usd(100_000)} job is matched at {usd2(51.21)}: just 1.07 times {usd2(48.08)}, because
          the QBI deduction and the deductions for half the SE tax offset most of the payroll tax. Add realistic time off, unbilled hours and a health plan, and the multiple
          rises to 1.72.
        </p>
      </GuideSection>

      <GuideSection id="salary-levels" n={14} kicker="Other salaries" title="At other salaries">
        <p>With the same 32 hours for 46 weeks and the same costs, single, in Texas:</p>
        <DataTable
          head={["Salary", "Salary per hour", "Break-even contract rate"]}
          numeric={[1, 2]}
          rows={[
            [usd(60_000), usd2(28.85), usd2(54.5)],
            [usd(100_000), usd2(48.08), usd2(82.58)],
            [usd(150_000), usd2(72.12), usd2(118.39)],
          ]}
        />
        <p>
          The fixed costs (the health plan, expenses) weigh most on lower salaries, which is why the multiple is highest there: 1.89 times at {usd(60_000)} against 1.64 at{" "}
          {usd(150_000)}.
        </p>
      </GuideSection>

      <GuideSection id="states" n={15} kicker="States" title="State taxes">
        <p>
          State income tax applies to both, so it changes the gap less than you might expect. In California the same example costs the employee {usd2(4_921.06)} of state tax
          and the contractor {usd2(3_625.45)}, and the break-even rate moves from {usd2(82.58)} to {usd2(82.21)}. A few cities, such as New York City and Philadelphia, add their
          own taxes on business income, which the calculator does not include. Some states also run disability or family leave programs that employees are enrolled in and
          contractors must opt into.
        </p>
      </GuideSection>

      <GuideSection id="quarterly" n={16} kicker="Cash flow" title="Quarterly estimated tax">
        <p>
          Nobody withholds tax from a contractor&rsquo;s invoices. You pay estimated tax four times a year: April 15, June 15 and September 15, 2026, and January 15, 2027.
          Setting aside 25% to 30% of each payment is a common habit. Missing payments brings an underpayment penalty, and a large bill in April can be a shock in the first year.
        </p>
      </GuideSection>

      <GuideSection id="classification" n={17} kicker="The law" title="Are you really a contractor?">
        <p>
          The label in a contract does not decide your status. The IRS looks at behavioral control (who decides how the work is done), financial control (who supplies tools,
          whether you can make a profit or loss) and the relationship (benefits, permanence). The Department of Labor applies its own economic reality test for minimum wage and
          overtime, and some states, such as California, use a stricter ABC test.
        </p>
        <p>
          If you are treated as a contractor but work like an employee, you can ask the IRS for a ruling on Form SS-8, and file Form 8919 to pay only the employee share of Social
          Security and Medicare.
        </p>
      </GuideSection>

      <GuideSection id="when-1099-wins" n={18} kicker="Upside" title="When the contract wins">
        <ul>
          <li>You can bill close to full time all year, or charge a premium for a specialty.</li>
          <li>You already have health insurance through a spouse.</li>
          <li>You have several clients, so losing one doesn&rsquo;t stop your income.</li>
          <li>You want to save more for retirement than an employer plan allows.</li>
          <li>You value control over when, where and how you work.</li>
        </ul>
        <p>
          At {usd(75)} an hour billing 40 hours for 50 weeks, the example contractor keeps {usd2(101_936.88)}: about {usd(19_770)} more than the job.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Dividing the salary by 2,080 and adding 20%, without counting unbilled time.</li>
          <li>Forgetting that health insurance is the biggest benefit for most people.</li>
          <li>Counting the employer half of payroll tax as a benefit and the 15.3% self-employment tax as well: the calculator counts it once.</li>
          <li>Spending each invoice in full and having nothing set aside for quarterly tax.</li>
          <li>Assuming a contract role is a stepping stone to a staff job.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the salary and the contract rate you were offered.</li>
          <li>Be honest about billable hours and weeks: check last year&rsquo;s calendar if you already freelance.</li>
          <li>Under More options, enter the job&rsquo;s match and premium share from the benefits guide, and real quotes for your own health plan.</li>
          <li>Read the break-even rate and the equivalent salary.</li>
          <li>Use the table to see how much each rate step is worth.</li>
        </ol>
        <p>
          For a paycheck view of the job, try our <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026 figure"]}
          rows={[
            ["Employee Social Security and Medicare", "7.65% (6.2% + 1.45%)"],
            ["Self-employment tax", "15.3% on 92.35% of profit"],
            ["Social Security wage base", usd(184_500)],
            ["QBI deduction", "Up to 20% of business profit"],
            ["QBI phase-out starts (taxable income)", `${usd(201_750)} single, ${usd(403_500)} joint`],
            ["401(k) employee limit", usd(24_500)],
            ["Average employer health premium (KFF 2025)", `${usd(9_325)} single, ${usd(26_993)} family`],
            ["Benefits' share of private-sector compensation (BLS, December 2025)", "about 30%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
