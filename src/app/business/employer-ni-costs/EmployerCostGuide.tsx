import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Employer NI and employment costs — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How employer NI is worked out" },
  { id: "2025", title: "What changed in April 2025" },
  { id: "allowance", title: "The Employment Allowance" },
  { id: "young", title: "Under-21s and apprentices" },
  { id: "pension", title: "Workplace pensions" },
  { id: "sacrifice", title: "Salary sacrifice" },
  { id: "benefits", title: "Benefits in kind and Class 1A" },
  { id: "true-cost", title: "The rest of the true cost" },
  { id: "budgeting", title: "Budgeting for a new hire" },
  { id: "team", title: "A small team, worked through" },
  { id: "minimum-wage", title: "Employing at the National Living Wage" },
  { id: "directors", title: "Directors and National Insurance" },
  { id: "paying", title: "Paying and reporting" },
  { id: "compare", title: "Employee, freelancer or director?" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Rates and thresholds for employers 2026 to 2027", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK — Employment Allowance", href: "https://www.gov.uk/claim-employment-allowance" },
  { label: "GOV.UK — National Insurance for under-25s and apprentices: employer guide", href: "https://www.gov.uk/government/publications/national-insurance-contributions-for-under-25s-employer-guide" },
  { label: "The Pensions Regulator — Earnings thresholds", href: "https://www.thepensionsregulator.gov.uk/employers/new-employers/im-an-employer-who-has-to-provide-a-pension/declare-your-compliance/ongoing-duties-for-employers/earnings-thresholds" },
  { label: "GOV.UK — Salary sacrifice for employers", href: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
  { label: "GOV.UK — Employer's liability insurance", href: "https://www.gov.uk/employers-liability-insurance" },
];

export default function EmployerCostGuide() {
  return (
    <Guide
      kicker="The cost of employing guide"
      title="Employer National Insurance and the true cost of an employee"
      intro={
        <>
          An employee costs more than their salary. On top of pay, employers pay National Insurance at 15% above £5,000 a year,
          at least 3% into a workplace pension, and a range of smaller costs. This guide explains how each is worked out for
          2026/27, the reliefs that reduce them, and how to budget for a new hire.
        </>
      }
      meta={["2026/27 tax year", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          Employer National Insurance is <strong>15%</strong> of pay above <strong>£5,000</strong> a year. Add the minimum 3%
          pension contribution and a £30,000 employee costs about <strong>£34,463</strong> a year, roughly 15% more than their
          salary.
        </p>
        <DataTable
          caption="Cost of one employee, 2026/27, 3% pension on qualifying earnings"
          head={["Salary", "Employer NI", "Pension", "Total cost", "On top of salary"]}
          numeric={[0, 1, 2, 3, 4]}
          rows={[
            ["£12,570", "£1,136", "£190", "£13,895", "10.5%"],
            ["£20,000", "£2,250", "£413", "£22,663", "13.3%"],
            ["£30,000", "£3,750", "£713", "£34,463", "14.9%"],
            ["£40,000", "£5,250", "£1,013", "£46,263", "15.7%"],
            ["£50,000", "£6,750", "£1,313", "£58,063", "16.1%"],
            ["£75,000", "£10,500", "£1,321", "£86,821", "15.8%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The calculation" title="How employer NI is worked out">
        <p>
          Employer, or secondary Class 1, National Insurance is charged on each employee&rsquo;s earnings above the{" "}
          <strong>secondary threshold</strong>. Payroll works it out each pay period:
        </p>
        <DataTable
          caption="Secondary threshold, 2026/27"
          head={["Pay period", "Threshold", "Rate above it"]}
          rows={[
            ["Weekly", "£96", "15%"],
            ["Monthly", "£417", "15%"],
            ["Yearly", "£5,000", "15%"],
          ]}
        />
        <WorkedExample
          title="A £30,000 salary"
          steps={[
            { label: "Salary", value: "£30,000" },
            { label: "Less the secondary threshold", value: "−£5,000" },
            { label: "Earnings above it", value: "£25,000" },
          ]}
          total={{ label: "Employer NI at 15%", value: "£3,750" }}
        />
        <p>
          Unlike employee NI, there is no upper limit: employer NI is 15% on every pound above £5,000, however high the pay.
          It is paid to HMRC with PAYE each month, and it is an allowable business expense.
        </p>
      </GuideSection>

      <GuideSection id="2025" n={3} kicker="Recent changes" title="What changed in April 2025">
        <p>From 6 April 2025, three changes raised the cost of most employees, and all three continue in 2026/27:</p>
        <CompareCards
          columns={[
            {
              name: "Before April 2025",
              rows: [
                { label: "Rate", value: "13.8%" },
                { label: "Threshold", value: "£9,100" },
                { label: "Employment Allowance", value: "£5,000" },
                { label: "NI on £30,000", value: "£2,884" },
              ],
            },
            {
              name: "From April 2025",
              rows: [
                { label: "Rate", value: "15%" },
                { label: "Threshold", value: "£5,000" },
                { label: "Employment Allowance", value: "£10,500" },
                { label: "NI on £30,000", value: "£3,750" },
              ],
            },
          ]}
        />
        <p>
          The lower threshold hit part-time and lower-paid staff hardest in percentage terms. Employer NI on a £20,000 salary
          rose from £1,504 to £2,250. The larger Employment Allowance offsets this for many small employers.
        </p>
      </GuideSection>

      <GuideSection id="allowance" n={4} kicker="Relief" title="The Employment Allowance">
        <p>
          The Employment Allowance reduces your employer NI bill by up to <strong>£10,500</strong> a year. It is claimed through
          your payroll software and used up against your employer NI each month until it runs out.
        </p>
        <WorkedExample
          title="Four employees on £30,000"
          steps={[
            { label: "Employer NI: 4 × £3,750", value: "£15,000" },
            { label: "Employment Allowance", value: "−£10,500" },
            { label: "Employer NI to pay", value: "£4,500" },
          ]}
          total={{ label: "Payroll cost before pensions", value: "£124,500" }}
        />
        <p>Most employers can claim it. The main exceptions are:</p>
        <ul>
          <li>a company whose only employee paid above the secondary threshold is a single director;</li>
          <li>public bodies and businesses doing more than half their work in the public sector, with some exceptions;</li>
          <li>employers of care or support workers in their own home, unless the worker provides personal care.</li>
        </ul>
        <p>
          Since April 2025 there is no limit on the size of employer that can claim. For a small business, the allowance covers
          employer NI on roughly £75,000 of pay for one employee, or on two salaries of £40,000 between them.
        </p>
      </GuideSection>

      <GuideSection id="young" n={5} kicker="Relief" title="Under-21s and apprentices">
        <p>
          Employers pay <strong>no employer NI</strong> on earnings up to £50,270 a year for employees under 21, and for
          apprentices under 25 on an approved apprenticeship. Above £50,270, the usual 15% applies.
        </p>
        <Figure label="Employer NI on a £30,000 salary" caption="Under-21s and apprentices under 25 pay nothing on earnings up to £50,270.">
          <Bars
            items={[
              { label: "Employee aged 21 or over", value: 3750 },
              { label: "Under 21 or apprentice under 25", value: 0 },
            ]}
          />
        </Figure>
        <p>
          Payroll applies the relief automatically through the employee&rsquo;s NI category letter. For apprentices you need
          evidence of the apprenticeship, such as the written agreement.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={6} kicker="Pensions" title="Workplace pensions">
        <p>
          Under automatic enrolment, you must put employees aged 22 to State Pension age who earn over{" "}
          <strong>£10,000</strong> a year into a workplace pension. The minimum total contribution is 8% of{" "}
          <strong>qualifying earnings</strong>, with at least 3% from you.
        </p>
        <DataTable
          caption="Automatic enrolment thresholds, frozen for 2026/27"
          head={["Threshold", "Amount"]}
          numeric={[1]}
          rows={[
            ["Earnings trigger for automatic enrolment", "£10,000"],
            ["Qualifying earnings: lower limit", "£6,240"],
            ["Qualifying earnings: upper limit", "£50,270"],
          ]}
        />
        <p>
          On a £30,000 salary, qualifying earnings are £23,760, so the 3% minimum is £712.80. Many employers pay more, or pay
          on full salary: 5% of the full £30,000 is £1,500. Employer pension contributions carry no National Insurance and
          are an allowable business expense.
        </p>
      </GuideSection>

      <GuideSection id="sacrifice" n={7} kicker="Saving NI" title="Salary sacrifice">
        <p>
          With salary sacrifice, an employee gives up part of their salary and the employer pays the same amount into their
          pension. Because the sacrificed pay is no longer earnings, neither side pays NI on it.
        </p>
        <WorkedExample
          title="5% sacrificed from a £40,000 salary"
          steps={[
            { label: "Salary sacrificed", value: "£2,000" },
            { label: "Employer NI saved: 15% of £2,000", value: "£300" },
            { label: "Employee NI saved: 8% of £2,000", value: "£160" },
          ]}
          total={{ label: "Total NI saved", value: "£460" }}
        />
        <p>
          Some employers add part or all of their NI saving to the employee&rsquo;s pension. The government plans to charge NI on
          sacrificed pension contributions above £2,000 a year from April 2029, but nothing changes for 2026/27. Pay after a
          sacrifice must not fall below the National Minimum Wage.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={8} kicker="Perks" title="Benefits in kind and Class 1A">
        <p>
          Taxable benefits, such as a company car, private medical insurance or a loan at a low rate, carry{" "}
          <strong>Class 1A</strong> employer NI at 15% of their taxable value. It is paid once a year, by 22 July after the
          tax year if paid electronically.
        </p>
        <p>
          A £5,000 benefit costs £750 in Class 1A NI on top of the benefit itself. Many employers now payroll benefits, taxing
          them through monthly pay instead of reporting them on a P11D; the Class 1A still applies. Electric company cars have
          low taxable values, which keeps Class 1A low.
        </p>
      </GuideSection>

      <GuideSection id="true-cost" n={9} kicker="Beyond tax" title="The rest of the true cost">
        <p>Tax and pensions are only part of what an employee costs. Budget for:</p>
        <ul>
          <li>
            <strong>Holiday:</strong> 5.6 weeks a year of paid leave for full-time staff. You pay for these weeks without
            getting the work, which matters if you need cover.
          </li>
          <li>
            <strong>Sick pay:</strong> Statutory Sick Pay, or more under your own policy.
          </li>
          <li>
            <strong>Employer&rsquo;s liability insurance:</strong> a legal requirement for most employers, with a fine for
            each day without it.
          </li>
          <li>
            <strong>Recruitment and training:</strong> adverts, agency fees, induction time and courses.
          </li>
          <li>
            <strong>Equipment and space:</strong> a laptop, phone, desk, software licences and uniforms.
          </li>
          <li>
            <strong>Payroll and HR:</strong> software or a bureau to run payroll, and advice on contracts and policies.
          </li>
        </ul>
        <Callout title="Rule of thumb">
          Once all of this is included, many small businesses budget for an employee to cost 20% to 30% more than their salary.
          Use the calculator for the tax and pension part, which is the part that is fixed by law.
        </Callout>
      </GuideSection>

      <GuideSection id="budgeting" n={10} kicker="Planning" title="Budgeting for a new hire">
        <Timeline
          items={[
            { when: "Before you advertise", what: "Set the salary and work out the full cost", detail: "Salary, employer NI, pension and the extras above." },
            { when: "Before day one", what: "Register as an employer with HMRC", detail: "You need a PAYE reference before the first payday, plus employer's liability insurance." },
            { when: "Day one", what: "Check the right to work and set up payroll", detail: "Assess them for automatic enrolment from their first day." },
            { when: "Each payday", what: "Run payroll and report to HMRC", detail: "Pay PAYE and NI by the 22nd of the following month if paying electronically." },
          ]}
        />
        <p>
          Check that the extra sales or capacity the person brings will cover their full cost. The{" "}
          <a href="/business/break-even">break-even calculator</a> helps you see how many extra sales a new salary needs.
        </p>
      </GuideSection>

      <GuideSection id="team" n={11} kicker="Worked example" title="A small team, worked through">
        <p>
          A café employs three people: a manager on £30,000, a cook on £24,000 and a 19-year-old on £20,000. It pays the 3%
          minimum pension and claims the Employment Allowance.
        </p>
        <DataTable
          caption="Employer costs for the team, 2026/27"
          head={["Employee", "Salary", "Employer NI", "Pension"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Manager", "£30,000", "£3,750", "£713"],
            ["Cook", "£24,000", "£2,850", "£533"],
            ["Under 21", "£20,000", "£0", "£413"],
          ]}
        />
        <WorkedExample
          title="The café's yearly payroll cost"
          steps={[
            { label: "Salaries", value: "£74,000" },
            { label: "Employer NI", value: "£6,600" },
            { label: "Pensions", value: "£1,658" },
            { label: "Employment Allowance", value: "−£6,600" },
          ]}
          total={{ label: "Total payroll cost", value: "£75,658" }}
        />
        <p>
          The allowance wipes out the whole £6,600 of employer NI, and £3,900 of it is left unused. The café could take on more
          staff before paying any employer NI at all.
        </p>
      </GuideSection>

      <GuideSection id="minimum-wage" n={12} kicker="Pay floors" title="Employing at the National Living Wage">
        <p>
          From April 2026 the National Living Wage for workers aged 21 and over is £12.71 an hour. A full-time employee on 37.5
          hours a week for 52 weeks earns £24,784.50.
        </p>
        <WorkedExample
          title="A full-time employee on the National Living Wage"
          steps={[
            { label: "Pay", value: "£24,784.50" },
            { label: "Employer NI", value: "£2,967.68" },
            { label: "Minimum pension", value: "£556.34" },
            { label: "Total cost", value: "£28,308.51" },
          ]}
          total={{ label: "Cost per hour paid", value: "£14.52" }}
        />
        <p>
          Paid holiday means some of those hours are not worked, so the cost per hour actually worked is higher still. Check
          the <a href="/tax-and-salary/minimum-wage">minimum wage calculator</a> for the rates at other ages.
        </p>
      </GuideSection>

      <GuideSection id="directors" n={13} kicker="Directors" title="Directors and National Insurance">
        <p>
          Company directors pay NI on an <strong>annual earnings period</strong> rather than pay period by pay period. The
          company&rsquo;s employer NI is worked out on their total pay for the year, so a director paid irregularly does not pay
          more than one paid monthly.
        </p>
        <p>
          A company whose only employee is a single director cannot claim the Employment Allowance. If the director&rsquo;s
          salary is £12,570, the company pays £1,135.50 of employer NI on it. The{" "}
          <a href="/business/dividend-vs-salary">dividend vs salary calculator</a> shows why that is usually still worth it.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={14} kicker="Admin" title="Paying and reporting">
        <p>
          Employers report pay and deductions to HMRC every payday through Real Time Information. Employer NI, employee NI and
          PAYE tax are paid together by the 22nd of the following month if paying electronically, or quarterly if your monthly
          bill is under £1,500.
        </p>
        <p>
          Late payments and late reports can bring penalties and interest. Payroll software calculates employer NI, applies the
          Employment Allowance and age reliefs, and handles automatic enrolment assessments for you.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={15} kicker="Choices" title="Employee, freelancer or director?">
        <p>
          When you need help, the cost depends on how the person is engaged. Employer NI only applies to employees and
          directors.
        </p>
        <CompareCards
          columns={[
            {
              name: "Employee",
              rows: [
                { label: "Employer NI", value: "15% above £5,000" },
                { label: "Pension", value: "At least 3% if eligible" },
                { label: "Holiday and sick pay", value: "Yes" },
                { label: "Employment rights", value: "Full" },
              ],
            },
            {
              name: "Freelancer or contractor",
              rows: [
                { label: "Employer NI", value: "None" },
                { label: "Pension", value: "None" },
                { label: "Holiday and sick pay", value: "No" },
                { label: "Day rate", value: "Usually higher" },
              ],
            },
          ]}
        />
        <p>
          You cannot choose freely between the two. Employment status depends on how the work is actually done: who controls
          it, whether the person can send a substitute, and whether they are part of your business. If someone works like an
          employee, HMRC can treat them as one, and you could owe the employer NI and PAYE you did not deduct. HMRC&rsquo;s
          Check Employment Status for Tax tool helps you decide, and the off-payroll rules apply when larger businesses engage
          contractors through their own companies.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "15%", label: "Employer NI rate" },
            { value: "£5,000", label: "Secondary threshold a year" },
            { value: "£10,500", label: "Employment Allowance" },
            { value: "£50,270", label: "Upper limit for under-21 and apprentice relief" },
            { value: "3%", label: "Minimum employer pension" },
            { value: "£6,240 to £50,270", label: "Qualifying earnings" },
            { value: "£10,000", label: "Auto-enrolment trigger" },
            { value: "15%", label: "Class 1A NI on benefits" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
