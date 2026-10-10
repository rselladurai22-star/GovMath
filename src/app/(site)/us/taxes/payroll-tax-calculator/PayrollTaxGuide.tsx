import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Employer payroll tax: the guide. Figures from src/lib/us/credits-payroll.ts (employerCost, FUTA, SUTA_2026, FUTA_CREDIT_REDUCTION, HEALTH_2025). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What employer payroll taxes are" },
  { id: "fica", title: "Social Security and Medicare" },
  { id: "futa", title: "FUTA: federal unemployment tax" },
  { id: "credit-reduction", title: "FUTA credit reduction states" },
  { id: "suta", title: "SUTA: state unemployment tax" },
  { id: "suta-table", title: "2026 SUTA wage bases and new employer rates" },
  { id: "example", title: "A $50,000 employee, line by line" },
  { id: "states", title: "How much the state changes it" },
  { id: "benefits", title: "Benefits and insurance" },
  { id: "full-cost", title: "The full cost of an employee" },
  { id: "per-hour", title: "Cost per hour worked" },
  { id: "high-pay", title: "High earners and the wage base" },
  { id: "not-wages", title: "What is not taxed as wages" },
  { id: "employee-share", title: "The employee's share" },
  { id: "deposits", title: "Deposits and forms" },
  { id: "calendar", title: "The 2026 payroll tax calendar" },
  { id: "who-pays-futa", title: "Who has to pay FUTA" },
  { id: "contractors", title: "Employees or contractors" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: Publication 15 (Circular E), Employer's Tax Guide", href: "https://www.irs.gov/publications/p15" },
  { label: "IRS: Instructions for Form 940 (FUTA)", href: "https://www.irs.gov/instructions/i940" },
  { label: "IRS: Topic no. 759, Form 940 and FUTA tax", href: "https://www.irs.gov/taxtopics/tc759" },
  { label: "U.S. Department of Labor, ETA: FUTA credit reductions", href: "https://oui.doleta.gov/unemploy/futa_credit.asp" },
  { label: "U.S. Department of Labor, ETA: Significant Provisions of State UI Laws, January 2026", href: "https://oui.doleta.gov/unemploy/content/sigpros/2020-2029/January2026.pdf" },
  { label: "Social Security Administration: 2026 contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
  { label: "KFF: 2025 Employer Health Benefits Survey", href: "https://www.kff.org/health-costs/2025-employer-health-benefits-survey/" },
  { label: "IRS: Independent contractor or employee", href: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" },
];

export default function PayrollTaxGuide() {
  return (
    <Guide
      kicker="The employer payroll tax guide"
      title="What an employee really costs in 2026"
      intro={
        <>
          An employee costs more than their salary. On top of wages, employers pay their own share of Social Security and Medicare, federal and state
          unemployment tax, and often benefits and insurance. This guide sets out each one with 2026 rates and shows the full cost per year and per hour.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Employer Social Security: 6.2% of wages up to $184,500. Employer Medicare: 1.45% of all wages.</li>
          <li>FUTA: 0.6% of the first $7,000 (usually $42 per employee a year), more in California.</li>
          <li>SUTA: your state&rsquo;s rate on its own wage base, $7,000 to $78,200 in 2026.</li>
          <li>On a $50,000 salary in Texas, employer payroll taxes are about $4,110 a year: 8.2% on top of wages.</li>
        </ul>
        <KeyStats
          items={[
            { value: "7.65%", label: "Employer Social Security and Medicare" },
            { value: "$42", label: "Usual FUTA per employee" },
            { value: "$4,110", label: "Employer taxes on $50,000 in Texas" },
            { value: "$64,495", label: "Full cost of a $50,000 employee with benefits" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What employer payroll taxes are">
        <p>Employers deal with two kinds of payroll tax:</p>
        <CompareCards
          columns={[
            {
              name: "Withheld from the employee",
              rows: [
                { label: "Federal income tax", value: "Form W-4" },
                { label: "Social Security", value: "6.2%" },
                { label: "Medicare", value: "1.45% (+0.9%)" },
                { label: "State and local income tax", value: "Varies" },
              ],
            },
            {
              name: "Paid by the employer",
              rows: [
                { label: "Social Security", value: "6.2%" },
                { label: "Medicare", value: "1.45%" },
                { label: "FUTA", value: "0.6% of $7,000" },
                { label: "SUTA", value: "State rate and base" },
              ],
            },
          ]}
        />
        <p>
          Only the second column is a cost to the business. The first is the employee&rsquo;s money that you hold and pass on. A few states also charge
          employers for disability insurance, paid family leave or workforce training.
        </p>
      </GuideSection>

      <GuideSection id="fica" n={3} kicker="Federal" title="Social Security and Medicare">
        <p>
          Under the Federal Insurance Contributions Act (FICA), the employer matches the employee&rsquo;s Social Security and Medicare. Social Security is 6.2%
          on wages up to $184,500 in 2026, so the most an employer pays per worker is $11,439. Medicare is 1.45% on every dollar, with no cap. The extra 0.9%
          Medicare tax on wages over $200,000 is paid by the employee only.
        </p>
      </GuideSection>

      <GuideSection id="futa" n={4} kicker="Federal" title="FUTA: federal unemployment tax">
        <p>
          The Federal Unemployment Tax Act tax pays for the federal side of unemployment insurance. The rate is 6.0% on the first $7,000 of each
          employee&rsquo;s wages a year. If you pay your state unemployment tax in full and on time, you get a credit of up to 5.4%, leaving 0.6%.
        </p>
        <WorkedExample
          title="FUTA on one employee, 2026"
          steps={[
            { label: "Gross FUTA: 6.0% × $7,000", value: "$420" },
            { label: "Credit for state tax paid: 5.4% × $7,000", value: "−$378" },
          ]}
          total={{ label: "FUTA to pay", value: "$42" }}
        />
        <p>Paying state tax late, or not at all, shrinks the credit, and FUTA can rise as high as $420 per employee.</p>
      </GuideSection>

      <GuideSection id="credit-reduction" n={5} kicker="Federal" title="FUTA credit reduction states">
        <p>
          When a state borrows from the federal government to pay unemployment benefits and does not repay the loan in time, employers there lose part of the
          5.4% credit. The reduction starts at 0.3% and grows each year the loan is unpaid.
        </p>
        <DataTable
          caption="FUTA credit reductions"
          head={["State", "2025 (final)", "2026 (possible)", "FUTA per employee, 2026"]}
          numeric={[1, 2, 3]}
          rows={[
            ["California", "1.2%", "1.5%", "$147"],
            ["U.S. Virgin Islands", "4.5%", "To be set", "–"],
            ["All other states", "0%", "0%", "$42"],
          ]}
        />
        <p>
          The Department of Labor confirms the 2026 list after November 10, 2026. The extra tax is paid with Form 940 for 2026, due February 1, 2027 (January
          31 falls on a Sunday).
        </p>
      </GuideSection>

      <GuideSection id="suta" n={6} kicker="State" title="SUTA: state unemployment tax">
        <p>
          Each state runs its own unemployment insurance fund, paid for by employers. The state sets a taxable wage base (at least $7,000, the FUTA base) and a
          rate for each employer. New employers usually get a set rate for their first two or three years. After that, the rate follows your
          &ldquo;experience&rdquo;: how many former employees claimed benefits. Employers with few layoffs pay less.
        </p>
        <p>
          Alaska, New Jersey and Pennsylvania also take a small unemployment contribution from employees&rsquo; pay. That is withheld, not an employer cost.
        </p>
      </GuideSection>

      <GuideSection id="suta-table" n={7} kicker="State" title="2026 SUTA wage bases and new employer rates">
        <p>From the Department of Labor&rsquo;s summary of state laws in effect on January 1, 2026:</p>
        <DataTable
          caption="Selected states, 2026"
          head={["State", "Taxable wage base", "New employer rate", "SUTA on $50,000"]}
          numeric={[1, 2, 3]}
          rows={[
            ["California", "$7,000", "3.4%", "$238"],
            ["Florida", "$7,000", "2.7%", "$189"],
            ["Texas", "$9,000", "2.7%", "$243"],
            ["Pennsylvania", "$10,000", "3.822%", "$382"],
            ["Illinois", "$14,250", "2.8%", "$399"],
            ["New York", "$17,600", "4.025%", "$708"],
            ["New Jersey", "$44,800", "2.8%", "$1,254"],
            ["Washington", "$78,200", "By industry (2.7% assumed)", "$1,350"],
          ]}
        />
        <p>
          Washington, Louisiana, Minnesota, Montana, New Mexico, Utah and Wyoming set new employer rates from the industry average; the calculator assumes 2.7%
          there. Your state sends a rate notice each year, and you can enter it under More options. Rates exclude surcharges some states add.
        </p>
      </GuideSection>

      <GuideSection id="example" n={8} kicker="Worked example" title="A $50,000 employee, line by line">
        <WorkedExample
          title="$50,000 salary, Texas, new employer, no benefits"
          steps={[
            { label: "Wages", value: "$50,000" },
            { label: "Social Security: 6.2%", value: "$3,100" },
            { label: "Medicare: 1.45%", value: "$725" },
            { label: "FUTA: 0.6% × $7,000", value: "$42" },
            { label: "SUTA: 2.7% × $9,000", value: "$243" },
          ]}
          total={{ label: "Total cost", value: "$54,110" }}
        />
        <p>Employer taxes are $4,110, or 8.2% of wages. Per paid hour (2,080 a year), the employee costs $26.01 against a wage of $24.04.</p>
      </GuideSection>

      <GuideSection id="states" n={9} kicker="Comparison" title="How much the state changes it">
        <p>Employer payroll taxes on a $50,000 salary, at each state&rsquo;s 2026 new employer rate:</p>
        <Bars
          format={usd}
          items={[
            { label: "Florida", value: 4056 },
            { label: "Texas", value: 4110 },
            { label: "California", value: 4210 },
            { label: "Pennsylvania", value: 4249 },
            { label: "Illinois", value: 4266 },
            { label: "New York", value: 4575 },
            { label: "New Jersey", value: 5121 },
            { label: "Washington", value: 5217 },
          ]}
        />
        <p>
          States with high wage bases, such as Washington and New Jersey, tax far more of each salary. California&rsquo;s low base is offset by the FUTA credit
          reduction.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={10} kicker="Benefits" title="Benefits and insurance">
        <ul>
          <li>
            <strong>Health insurance.</strong>{" "}KFF&rsquo;s 2025 survey found the average single plan cost $9,325 a year, with workers paying $1,440 and
            employers about $7,885. Family plans averaged $26,993.
          </li>
          <li>
            <strong>Retirement match.</strong>{" "}A match of 3% to 6% of pay is common. A 4% match on $50,000 is $2,000.
          </li>
          <li>
            <strong>Workers&rsquo; compensation.</strong>{" "}Required in almost every state. Insurers price it by job class, from well under 1% of pay for
            office staff to much more for roofers.
          </li>
          <li>
            <strong>Paid time off.</strong>{" "}Vacation, holidays and sick days do not add to wages, but they mean fewer hours of work for the same pay.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="full-cost" n={11} kicker="Worked example" title="The full cost of an employee">
        <WorkedExample
          title="$50,000 salary, Texas, with typical benefits"
          steps={[
            { label: "Wages", value: "$50,000" },
            { label: "Employer payroll taxes", value: "$4,110" },
            { label: "Health insurance (employer share)", value: "$7,885" },
            { label: "401(k) match: 4%", value: "$2,000" },
            { label: "Workers' compensation: 1%", value: "$500" },
          ]}
          total={{ label: "Total cost", value: "$64,495" }}
        />
        <p>That is 29% on top of salary. A common rule of thumb is that an employee costs 1.25 to 1.4 times their salary; this example sits inside it.</p>
      </GuideSection>

      <GuideSection id="per-hour" n={12} kicker="Insight" title="Cost per hour worked">
        <p>
          The cost per paid hour divides the total by 2,080 hours. But with 20 days of vacation, holidays and sick leave, the employee works 1,920 hours. In the
          example above, that turns $31.01 per paid hour into $33.59 per hour worked. Use the hours-worked figure when you price your services or compare an
          employee with a contractor.
        </p>
      </GuideSection>

      <GuideSection id="high-pay" n={13} kicker="Special cases" title="High earners and the wage base">
        <p>
          Unemployment taxes stop early in the year for most workers: FUTA after $7,000 and SUTA after the state base. Social Security stops at $184,500. On a
          $200,000 salary in Texas, employer taxes are $14,624, only 7.3% of wages, because Social Security stops at $11,439 while Medicare carries on at 1.45%.
        </p>
      </GuideSection>

      <GuideSection id="not-wages" n={14} kicker="Rules" title="What is not taxed as wages">
        <p>Some pay and benefits are free of Social Security, Medicare and unemployment tax:</p>
        <ul>
          <li>Employer-paid health, dental and vision premiums.</li>
          <li>Employer 401(k) matching and profit-sharing contributions.</li>
          <li>Employee premiums and HSA or FSA amounts paid through a section 125 cafeteria plan.</li>
          <li>Accountable-plan expense reimbursements, such as mileage at the IRS rate.</li>
        </ul>
        <p>
          An employee&rsquo;s own 401(k) deferrals are still subject to Social Security, Medicare and FUTA, even though they escape income tax.
        </p>
      </GuideSection>

      <GuideSection id="employee-share" n={15} kicker="Rules" title="The employee's share">
        <p>
          You also withhold the employee&rsquo;s 7.65% and their income tax, and pay them over with your own. A $50,000 employee has $3,825 of Social Security
          and Medicare withheld, the same as you pay. The <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}shows the employee&rsquo;s
          take-home pay, and the <a href="/us/taxes/salary-to-hourly">salary to hourly calculator</a>{" "}turns a salary into an hourly rate.
        </p>
        <Callout tone="warn" title="Withheld taxes are trust fund taxes">
          Money withheld from employees belongs to the government. If a business fails to pay it over, the IRS can make the owners and officers personally
          liable for it under the trust fund recovery penalty.
        </Callout>
      </GuideSection>

      <GuideSection id="deposits" n={16} kicker="Filing" title="Deposits and forms">
        <ul>
          <li>
            <strong>Form 941</strong>{" "}(quarterly): Social Security, Medicare and withheld income tax. Small employers with less than $1,000 a year of these
            taxes may file Form 944 once a year instead.
          </li>
          <li>
            <strong>Deposits</strong>: monthly if your lookback-period taxes were $50,000 or less, otherwise semiweekly. All deposits go through EFTPS or
            another electronic method.
          </li>
          <li>
            <strong>Form 940</strong>{" "}(yearly): FUTA. Deposit each quarter once the amount owed passes $500.
          </li>
          <li>
            <strong>State returns</strong>: SUTA is usually reported and paid each quarter to your state workforce agency.
          </li>
          <li>
            <strong>Forms W-2 and W-3</strong>: to employees and the Social Security Administration by January 31.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="calendar" n={17} kicker="Filing" title="The 2026 payroll tax calendar">
        <Timeline
          items={[
            { when: "April 30, 2026", what: "Form 941 for January to March" },
            { when: "July 31, 2026", what: "Form 941 for April to June" },
            { when: "November 2, 2026", what: "Form 941 for July to September", detail: "October 31 falls on a Saturday." },
            { when: "February 1, 2027", what: "Form 941 for October to December, Form 940, Forms W-2", detail: "January 31, 2027 falls on a Sunday." },
          ]}
        />
      </GuideSection>

      <GuideSection id="who-pays-futa" n={18} kicker="Rules" title="Who has to pay FUTA">
        <p>
          You pay FUTA if, this year or last, you paid $1,500 or more of wages in any calendar quarter, or had at least one employee for some part of a day in
          20 or more different weeks. Household employers (of nannies or housekeepers, for example) pay it once they pay $1,000 of cash wages in a quarter.
          Farm employers have their own thresholds. Charities under section 501(c)(3) are exempt from FUTA, though most still pay state unemployment tax or
          reimburse the state for benefits.
        </p>
      </GuideSection>

      <GuideSection id="contractors" n={19} kicker="Rules" title="Employees or contractors">
        <p>
          You pay none of these taxes for an independent contractor paid on Form 1099-NEC; the contractor pays self-employment tax of 15.3% on their own
          profit instead. But the label in a contract does not decide it. The IRS looks at behavioral control, financial control and the relationship, and
          states often use stricter tests. Misclassifying an employee can bring back payroll taxes, interest and penalties. The{" "}
          <a href="/us/taxes/1099-vs-w2-calculator">1099 vs W-2 calculator</a>{" "}compares the two from the worker&rsquo;s side, and the{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}shows a contractor&rsquo;s tax.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "6.2%", label: "Employer Social Security, up to $184,500" },
            { value: "1.45%", label: "Employer Medicare, all wages" },
            { value: "$7,000", label: "FUTA wage base" },
            { value: "0.6%", label: "Usual FUTA rate after the 5.4% credit" },
            { value: "1.5%", label: "Possible California credit reduction, 2026" },
            { value: "$7,000–$78,200", label: "State unemployment wage bases" },
            { value: "$11,439", label: "Most employer Social Security per worker" },
            { value: "$9,325", label: "Average single health premium, 2025" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
