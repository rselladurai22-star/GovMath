import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Take-home pay — the full guide. Figures from src/lib/tax/take-home-engine.ts. Pure server component. */

const TOC: TocItem[] = [
  { id: "how", title: "How take-home pay is worked out" },
  { id: "example", title: "A worked example" },
  { id: "bands", title: "Income Tax bands for 2026/27" },
  { id: "ni", title: "National Insurance" },
  { id: "by-salary", title: "Take-home pay by salary" },
  { id: "marginal", title: "What a pay rise is really worth" },
  { id: "pension", title: "Pensions and salary sacrifice" },
  { id: "student-loans", title: "Student loan repayments" },
  { id: "trap", title: "The 60% band between £100,000 and £125,140" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "tax-code", title: "Your tax code" },
  { id: "bonus", title: "Bonuses and overtime" },
  { id: "payslip", title: "Reading your payslip" },
  { id: "thresholds", title: "Frozen thresholds" },
  { id: "terms", title: "Terms worth knowing" },
  { id: "checks", title: "Checking you pay the right tax" },
  { id: "starting", title: "Starting a job part-way through the year" },
  { id: "two-jobs", title: "Two jobs" },
  { id: "marriage", title: "Marriage Allowance" },
  { id: "self-employed", title: "Employed or self-employed" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
  { label: "GOV.UK — Scottish Income Tax", href: "https://www.gov.uk/scottish-income-tax" },
  { label: "GOV.UK — Repaying your student loan", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK — Tax on your private pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension" },
];

export default function TakeHomeGuide() {
  return (
    <Guide
      kicker="The take-home pay guide"
      title="Take-home pay, explained"
      intro={
        <>
          The salary you are offered and the amount paid into your bank are two different figures. This guide explains how Income Tax and
          National Insurance are worked out, what pensions and student loans take, what a pay rise is really worth, and how to check your
          payslip. Examples use 2026/27 rates for England, Wales and Northern Ireland unless they say otherwise.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="how" n={1} kicker="The basics" title="How take-home pay is worked out">
        <p>
          Your employer starts with your gross pay, takes off any salary sacrifice, then deducts Income Tax and National Insurance through PAYE.
          If you have a student loan, a repayment comes off too. What is left is your take-home pay, sometimes called net pay.
        </p>
        <p>
          Income Tax and National Insurance are each worked out separately on the same pay, using their own thresholds. They do not stack on top
          of each other, so you can add them up to see what you pay in total.
        </p>
      </GuideSection>

      <GuideSection id="example" n={2} kicker="Worked example" title="A worked example">
        <p>A salary of £35,000, on the standard 1257L tax code, with no pension or student loan:</p>
        <WorkedExample
          title="£35,000 salary, 2026/27"
          steps={[
            { label: "Income Tax", note: "20% of £22,430 above the Personal Allowance", value: "£4,486.00" },
            { label: "National Insurance", note: "8% of £22,430 above £12,570", value: "£1,794.40" },
          ]}
          total={{ label: "Take-home pay a year", value: "£28,719.60" }}
        />
        <p>That is £2,393.30 a month or £552.30 a week. You keep about 82p of every £1 you earn, and 17.9% goes in tax and National Insurance.</p>
      </GuideSection>

      <GuideSection id="bands" n={3} kicker="Income Tax" title="Income Tax bands for 2026/27">
        <DataTable
          caption="England, Wales and Northern Ireland"
          head={["Band", "Income", "Rate"]}
          numeric={[2]}
          rows={[
            ["Personal Allowance", "Up to £12,570", "0%"],
            ["Basic rate", "£12,571 to £50,270", "20%"],
            ["Higher rate", "£50,271 to £125,140", "40%"],
            ["Additional rate", "Over £125,140", "45%"],
          ]}
        />
        <p>
          Tax is charged in slices. Each band&apos;s rate applies only to the part of your income inside it, so a pay rise that takes you into a
          higher band is only taxed at the higher rate on the part above the line. You can never take home less by earning more.
        </p>
      </GuideSection>

      <GuideSection id="ni" n={4} kicker="National Insurance" title="National Insurance">
        <DataTable
          caption="Employee Class 1 National Insurance, 2026/27"
          head={["Earnings a year", "Rate"]}
          numeric={[1]}
          rows={[
            ["Up to £12,570", "0%"],
            ["£12,571 to £50,270", "8%"],
            ["Over £50,270", "2%"],
          ]}
        />
        <p>
          National Insurance is worked out on each pay period separately, not on the year as a whole. It stops at State Pension age. Your
          contributions build your entitlement to the State Pension and some benefits.
        </p>
      </GuideSection>

      <GuideSection id="by-salary" n={5} kicker="Salaries" title="Take-home pay by salary">
        <DataTable
          caption="2026/27, 1257L tax code, no pension or student loan"
          head={["Salary", "Income Tax", "National Insurance", "Take-home a year", "A month"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£20,000", "£1,486", "£594", "£17,920", "£1,493"],
            ["£25,000", "£2,486", "£994", "£21,520", "£1,793"],
            ["£30,000", "£3,486", "£1,394", "£25,120", "£2,093"],
            ["£35,000", "£4,486", "£1,794", "£28,720", "£2,393"],
            ["£40,000", "£5,486", "£2,194", "£32,320", "£2,693"],
            ["£50,000", "£7,486", "£2,994", "£39,520", "£3,293"],
            ["£60,000", "£11,432", "£3,211", "£45,357", "£3,780"],
            ["£75,000", "£17,432", "£3,511", "£54,057", "£4,505"],
            ["£100,000", "£27,432", "£4,011", "£68,557", "£5,713"],
            ["£150,000", "£53,703", "£5,011", "£91,286", "£7,607"],
          ]}
        />
        <p>
          The share taken in tax and National Insurance rises with income: 10.4% at £20,000, 21.0% at £50,000 and 39.1% at £150,000.
        </p>
      </GuideSection>

      <GuideSection id="marginal" n={6} kicker="Pay rises" title="What a pay rise is really worth">
        <p>The rate on your next pound, your marginal rate, decides how much of a rise you keep:</p>
        <Bars
          items={[
            { label: "Up to £50,270", value: 28 },
            { label: "£50,270 to £100,000", value: 42 },
            { label: "£100,000 to £125,140", value: 62 },
            { label: "Over £125,140", value: 47 },
          ]}
          format={(n) => `${n}% deducted`}
        />
        <p>
          A £3,000 rise from £35,000 adds £2,160 to take-home pay. The same rise from £50,000 adds £1,777.80, because part of it is taxed at 40%.
          A student loan adds a further 9% above its threshold.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={7} kicker="Pensions" title="Pensions and salary sacrifice">
        <p>
          With salary sacrifice, pension contributions come out before Income Tax and National Insurance, so each £1 in your pension costs you
          less than £1 of take-home pay.
        </p>
        <WorkedExample
          title="£35,000 salary, 5% salary sacrifice pension"
          steps={[
            { label: "Into your pension", value: "£1,750" },
            { label: "Fall in take-home pay", value: "£1,260" },
          ]}
          total={{ label: "Tax and NI saved", value: "£490" }}
        />
        <p>
          Other workplace pensions give tax relief in different ways, and some do not save National Insurance. The{" "}
          <a href="/investing/pension-tax-relief">pension tax relief calculator</a> compares them.
        </p>
      </GuideSection>

      <GuideSection id="student-loans" n={8} kicker="Student loans" title="Student loan repayments">
        <DataTable
          caption="Repayment thresholds, 2026/27"
          head={["Plan", "Threshold", "Rate"]}
          numeric={[1, 2]}
          rows={[
            ["Plan 1", "£26,900", "9%"],
            ["Plan 2", "£29,385", "9%"],
            ["Plan 4 (Scotland)", "£33,795", "9%"],
            ["Plan 5", "£25,000", "9%"],
            ["Postgraduate Loan", "£21,000", "6%"],
          ]}
        />
        <p>
          On £35,000, a Plan 2 loan takes £505.35 a year and a Plan 5 loan £900, on top of tax and National Insurance. With a Plan 2 loan, 37p
          of each extra pound goes in deductions. See the <a href="/students/plan-2-student-loan">Plan 2 calculator</a> for interest and
          write-off.
        </p>
      </GuideSection>

      <GuideSection id="trap" n={9} kicker="High earners" title="The 60% band between £100,000 and £125,140">
        <p>
          Above £100,000, you lose £1 of Personal Allowance for every £2 of income, until it is gone at £125,140. Combined with 40% tax, that
          creates an effective Income Tax rate of 60% in this band, or 62% with National Insurance.
        </p>
        <WorkedExample
          title="£110,000 salary, 10% salary sacrifice pension"
          steps={[
            { label: "Into your pension", value: "£11,000" },
            { label: "Fall in take-home pay", value: "£4,380" },
          ]}
          total={{ label: "Tax and NI saved", value: "£6,620" }}
        />
        <Callout tone="warn" title="Childcare support too">
          Income over £100,000 also ends Tax-Free Childcare and the funded childcare hours for working parents. Pension contributions that bring
          your income below £100,000 can restore them.
        </Callout>
      </GuideSection>

      <GuideSection id="scotland" n={10} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scotland sets its own Income Tax bands and rates on earnings, from 19% to 48%. National Insurance and student loans are the same across
          the UK.
        </p>
        <CompareCards
          columns={[
            { name: "£35,000", rows: [{ label: "Scotland", value: "£28,704.53 take-home" }, { label: "Rest of UK", value: "£28,719.60 take-home" }] },
            { name: "£50,000", rows: [{ label: "Scotland", value: "£38,023.55 take-home" }, { label: "Rest of UK", value: "£39,519.60 take-home" }] },
          ]}
        />
        <p>
          On lower and middle incomes, Scottish taxpayers pay about the same as elsewhere: £15 a year more on £35,000. From around £43,660, the 42% higher rate
          applies, so a Scottish taxpayer on £50,000 takes home £1,496 less a year and pays 50% on each extra pound.
        </p>
      </GuideSection>

      <GuideSection id="tax-code" n={11} kicker="Tax codes" title="Your tax code">
        <p>
          Your tax code tells your employer how much tax-free pay to give you. The standard code is 1257L, meaning £12,570 of tax-free pay. A
          different code can mean HMRC is collecting tax on benefits such as a company car, taking off underpaid tax, or giving you extra
          allowances.
        </p>
        <DataTable
          caption="Common tax code letters"
          head={["Code", "What it means"]}
          rows={[
            ["L", "The standard Personal Allowance"],
            ["M / N", "Marriage Allowance: you receive or give away part of the allowance"],
            ["BR", "All pay taxed at 20%, often a second job"],
            ["K", "Benefits or debts are larger than your allowance"],
            ["W1, M1, X", "Emergency tax: each pay period is taxed on its own"],
            ["S / C prefix", "Scottish or Welsh taxpayer"],
          ]}
        />
        <p>Our <a href="/tax-and-salary/tax-code-decoder">tax code decoder</a> explains any code.</p>
      </GuideSection>

      <GuideSection id="bonus" n={12} kicker="Extra pay" title="Bonuses and overtime">
        <p>
          A bonus or overtime is taxed as ordinary pay, at your marginal rate. A £2,000 bonus on a £35,000 salary adds £1,440 to take-home pay
          over the year. Because PAYE works on each pay period, a large bonus can look as if it is taxed heavily in the month it is paid, but
          the tax evens out over the year on a cumulative code.
        </p>
      </GuideSection>

      <GuideSection id="payslip" n={13} kicker="Payslips" title="Reading your payslip">
        <Timeline
          items={[
            { when: "Gross pay", what: "Salary, overtime and bonuses before deductions", detail: "" },
            { when: "Pre-tax deductions", what: "Salary sacrifice pension and other schemes", detail: "Lower the pay used for tax and National Insurance." },
            { when: "Statutory deductions", what: "Income Tax, National Insurance and student loan", detail: "Paid to HMRC." },
            { when: "Net pay", what: "What reaches your bank", detail: "After any other deductions, such as a season ticket loan." },
          ]}
        />
        <p>
          Check the tax code, the tax period and the year-to-date figures. Monthly take-home can vary when you change jobs, get a bonus or move
          to a new tax code.
        </p>
      </GuideSection>

      <GuideSection id="thresholds" n={14} kicker="Thresholds" title="Frozen thresholds">
        <p>
          The Personal Allowance of £12,570 and the higher rate threshold of £50,270 are frozen until April 2031. As pay rises with inflation,
          more of it falls into tax and more people move into the higher rate. A pay rise that only matches inflation can leave you slightly
          worse off after tax.
        </p>
      </GuideSection>

      <GuideSection id="terms" n={15} kicker="Jargon" title="Terms worth knowing">
        <DataTable
          caption="Payslip terms in plain English"
          head={["Term", "What it means"]}
          rows={[
            ["Gross pay", "Your pay before any deductions"],
            ["Net pay", "What you receive after deductions"],
            ["PAYE", "Pay As You Earn: how employers collect tax and National Insurance"],
            ["Personal Allowance", "Income you can earn before Income Tax, £12,570"],
            ["Marginal rate", "The share of your next £1 that goes in deductions"],
            ["Effective rate", "Total deductions as a share of your gross pay"],
            ["P60", "Your yearly summary of pay and tax, given after 5 April"],
          ]}
        />
      </GuideSection>

      <GuideSection id="checks" n={16} kicker="Checks" title="Checking you pay the right tax">
        <ul>
          <li>Check your tax code in your HMRC personal tax account or the HMRC app.</li>
          <li>Compare your P60 with this calculator at the end of each tax year.</li>
          <li>If you have two jobs, make sure only one uses your Personal Allowance.</li>
          <li>Tell HMRC about benefits, such as a company car or medical insurance, that change your code.</li>
          <li>If you think you have overpaid, HMRC can refund it through your code or directly.</li>
        </ul>
      </GuideSection>

      <GuideSection id="starting" n={17} kicker="New jobs" title="Starting a job part-way through the year">
        <p>
          When you start a job, give your new employer your P45 from your last one, or fill in a starter checklist. Without it, you may be put
          on an emergency tax code at first, so your first payslips can show more tax than expected. Once HMRC sends the right code, the extra
          is usually refunded through your pay. If you start your first job mid-year, you may pay little or no tax at first because the unused
          allowance from earlier in the year is spread over your remaining pay.
        </p>
      </GuideSection>

      <GuideSection id="two-jobs" n={18} kicker="More than one job" title="Two jobs">
        <p>
          Your Personal Allowance is normally given against your main job. A second job usually gets a BR code, so all of its pay is taxed at
          20%. National Insurance is worked out separately for each job, so if both pay under £12,570 you may pay no National Insurance at all.
          If your main job pays less than the allowance, you can ask HMRC to split it between the two.
        </p>
      </GuideSection>

      <GuideSection id="marriage" n={19} kicker="Couples" title="Marriage Allowance">
        <p>
          If you are married or in a civil partnership and one of you earns less than the Personal Allowance, they can transfer £1,260 of
          their allowance to the other, as long as the higher earner pays tax at the basic rate. That cuts the couple&apos;s tax by up to £252 a
          year, and you can backdate a claim for up to four years.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={20} kicker="Self-employed" title="Employed or self-employed">
        <p>
          Self-employed people pay the same Income Tax but a lower rate of National Insurance, 6% rather than 8%, through Self Assessment rather
          than PAYE. They can also deduct allowable business expenses. The <a href="/business/sole-trader-tax">sole trader tax calculator</a>{" "}
          works out take-home pay from self-employment.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={21} kicker="FAQs" title="Common questions">
        <h3>Why is my take-home different from the calculator?</h3>
        <p>Your tax code, benefits in kind, pension type and the month you started a job all affect a real payslip. The calculator assumes a standard code for the full year.</p>
        <h3>Is the take-home pay figure monthly or yearly?</h3>
        <p>Both. The calculator shows yearly, monthly, weekly and daily figures. Monthly figures divide the year by 12.</p>
        <h3>Does National Insurance count towards my pension?</h3>
        <p>Yes. Each year you pay enough National Insurance counts as a qualifying year towards your State Pension.</p>
        <h3>Do I pay tax on a pay rise in my first year?</h3>
        <p>Yes, from the month it starts. PAYE spreads your allowance across the year, so the extra is taxed at your marginal rate.</p>
        <h3>What if I earn under £12,570?</h3>
        <p>You pay no Income Tax and no National Insurance, though you may still build National Insurance credits.</p>
        <h3>Should I join my workplace pension?</h3>
        <p>Usually yes. Your employer pays in too, and you get tax relief, so each £1 you contribute is worth much more than £1 of take-home.</p>
        <h3>Is my take-home pay lower in my first month?</h3>
        <p>It can be, if you are on an emergency tax code or started part-way through a month. It usually evens out once HMRC issues your correct code.</p>
        <h3>Do I pay tax on my pension contributions?</h3>
        <p>No. Pension contributions get tax relief, either by coming out before tax or by HMRC adding basic-rate tax to what you pay in.</p>
        <h3>Does working from home change my take-home pay?</h3>
        <p>Not directly. If your employer requires you to work from home, you may be able to claim tax relief on extra household costs, but only if they are not reimbursed and you meet HMRC&apos;s conditions.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£12,570", label: "Personal Allowance" },
            { value: "£50,270", label: "Higher rate threshold" },
            { value: "20% / 40% / 45%", label: "Income Tax rates" },
            { value: "8% / 2%", label: "Employee National Insurance" },
            { value: "£28,719.60", label: "Take-home on £35,000" },
            { value: "60%", label: "Effective tax £100k to £125,140" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
