import {
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  StepChart,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Sole trader tax — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "profit", title: "Working out your profit" },
  { id: "income-tax", title: "Income Tax on your profit" },
  { id: "ni", title: "National Insurance" },
  { id: "rates", title: "Your rate on each extra pound" },
  { id: "side", title: "Self-employed alongside a job" },
  { id: "extras", title: "Student loans, Scotland and pensions" },
  { id: "paying", title: "Registering, filing and paying" },
  { id: "first-year", title: "The first-year cash trap" },
  { id: "mtd", title: "Making Tax Digital" },
  { id: "setting-aside", title: "How much to set aside" },
  { id: "company", title: "Sole trader or limited company?" },
  { id: "year-end", title: "Your accounting year" },
  { id: "losses", title: "If you make a loss" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Working for yourself", href: "https://www.gov.uk/working-for-yourself" },
  { label: "GOV.UK — Self-employed National Insurance rates", href: "https://www.gov.uk/self-employed-national-insurance-rates" },
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — Tax-free allowances on property and trading income", href: "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income" },
  { label: "GOV.UK — Understand your Self Assessment tax bill", href: "https://www.gov.uk/understand-self-assessment-bill" },
  { label: "GOV.UK — Making Tax Digital for Income Tax", href: "https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax" },
];

export default function SoleTraderGuide() {
  return (
    <Guide
      kicker="The sole trader tax guide"
      title="How sole traders are taxed in 2026/27"
      intro={
        <>
          As a sole trader you pay Income Tax and National Insurance on your profit, not on what you take out of the
          business. This guide explains how the bill is worked out, the rates for 2026/27, how a job or a student loan
          changes it, when you pay, and how much to put aside each month so January is not a shock.
        </>
      }
      meta={["2026/27 tax year", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          Your tax is based on your <strong>profit</strong>: turnover minus allowable expenses. On that profit you pay:
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> at 0% on the first £12,570, 20% up to £50,270, 40% up to £125,140 and 45% above
            (different bands in Scotland);
          </li>
          <li>
            <strong>Class 4 National Insurance</strong> at 6% on profit between £12,570 and £50,270, and 2% above.
          </li>
        </ul>
        <DataTable
          caption="Tax on sole trader profit, 2026/27, England, Wales or NI, no other income"
          head={["Profit", "Income Tax", "Class 4 NI", "You keep", "Share in tax"]}
          numeric={[0, 1, 2, 3, 4]}
          rows={[
            ["£20,000", "£1,486", "£446", "£18,068", "9.7%"],
            ["£30,000", "£3,486", "£1,046", "£25,468", "15.1%"],
            ["£40,000", "£5,486", "£1,646", "£32,868", "17.8%"],
            ["£50,000", "£7,486", "£2,246", "£40,268", "19.5%"],
            ["£75,000", "£17,432", "£2,757", "£54,811", "26.9%"],
            ["£100,000", "£27,432", "£3,257", "£69,311", "30.7%"],
            ["£150,000", "£53,703", "£4,257", "£92,040", "38.6%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="profit" n={2} kicker="Step one" title="Working out your profit">
        <p>
          Profit is everything you earned from the business in the tax year, 6 April to 5 April, minus the allowable expenses
          of running it. Most sole traders use the <strong>cash basis</strong>: count money when it arrives and costs when
          you pay them.
        </p>
        <p>
          Allowable expenses are costs incurred <strong>wholly and exclusively</strong> for the business: stock and materials,
          tools, business travel, phone and internet, insurance, accountancy, advertising, and a share of home costs if you
          work from home. Your own drawings are not an expense. The{" "}
          <a href="/business/allowable-expenses">allowable expenses calculator</a> goes through each category.
        </p>
        <h3>The £1,000 trading allowance</h3>
        <p>
          Instead of claiming actual expenses you can deduct a flat <strong>£1,000</strong>. If your total turnover is
          £1,000 or less, it is completely tax-free and you do not need to register. Above that, choose whichever is bigger:
          the allowance or your real costs.
        </p>
        <WorkedExample
          title="£3,000 of side income with £400 of costs, alongside a £30,000 job"
          steps={[
            { label: "Claiming actual expenses", note: "£2,600 profit at 20%", value: "£520 tax" },
            { label: "Claiming the trading allowance", note: "£2,000 profit at 20%", value: "£400 tax" },
          ]}
          total={{ label: "Saving from the allowance", value: "£120" }}
        />
      </GuideSection>

      <GuideSection id="income-tax" n={3} kicker="Income Tax" title="Income Tax on your profit">
        <p>
          Your profit is added to any other income, such as a salary, pension or rent, and taxed at the normal rates. Your
          Personal Allowance of £12,570 is used first, then the bands below.
        </p>
        <DataTable
          caption="Income Tax bands, England, Wales and Northern Ireland, 2026/27"
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
          The Personal Allowance shrinks by £1 for every £2 of income over £100,000, and is gone at £125,140. That creates an
          effective 60% Income Tax rate between those figures. In Scotland, six bands apply from 19% to 48%; Class 4 NI is the
          same everywhere.
        </p>
      </GuideSection>

      <GuideSection id="ni" n={4} kicker="National Insurance" title="National Insurance">
        <p>Two classes of National Insurance apply to the self-employed:</p>
        <CompareCards
          columns={[
            {
              name: "Class 4",
              rows: [
                { label: "Who pays", value: "Profit over £12,570" },
                { label: "Rate", value: "6% to £50,270, then 2%" },
                { label: "How", value: "Through Self Assessment" },
              ],
            },
            {
              name: "Class 2",
              rows: [
                { label: "Who pays", value: "Nobody has to" },
                { label: "Profit £7,105+", value: "Credit given free" },
                { label: "Below £7,105", value: "Optional £3.65 a week" },
              ],
            },
          ]}
        />
        <p>
          Class 2 used to be compulsory. Since April 2024, if your profit is at least the <strong>Small Profits
          Threshold</strong> of £7,105, you get a National Insurance credit towards your State Pension without paying
          anything. Below that, you can choose to pay voluntary Class 2 at £3.65 a week, £189.80 for the year, to keep the
          year on your record. That is far cheaper than voluntary Class 3 contributions.
        </p>
        <Callout title="Class 4 is lower than employee NI">
          Employees pay 8% between £12,570 and £50,270. The self-employed pay 6% on the same slice, which is one reason a
          sole trader keeps more of £40,000 than an employee on the same salary.
        </Callout>
      </GuideSection>

      <GuideSection id="rates" n={5} kicker="Marginal rates" title="Your rate on each extra pound">
        <p>
          The share of your total profit that goes in tax is lower than the rate on your next pound, because the first £12,570
          is tax-free. When you decide whether a job is worth taking or an expense is worth buying, the rate on the next pound
          is the one that matters.
        </p>
        <Figure label="Income Tax plus Class 4 NI on the next £1 of profit, 2026/27" caption="England, Wales and NI, no other income. Hover or tap a step for its range.">
          <StepChart
            ariaLabel="Marginal rate on sole trader profit: 0% to £12,570, 26% to £50,270, 42% to £100,000, 62% to £125,140, then 47%."
            max={150000}
            yMax={70}
            yTicks={[0, 20, 40, 60]}
            steps={[
              { from: 0, to: 12570, value: 0 },
              { from: 12570, to: 50270, value: 26 },
              { from: 50270, to: 100000, value: 42 },
              { from: 100000, to: 125140, value: 62 },
              { from: 125140, to: 150000, value: 47 },
            ]}
          />
        </Figure>
        <p>
          So a £1,000 allowable expense saves a basic-rate sole trader £260, a higher-rate one £420, and someone in the £100,000
          to £125,140 band £620.
        </p>
      </GuideSection>

      <GuideSection id="side" n={6} kicker="Side income" title="Self-employed alongside a job">
        <p>
          If you have a job as well, your salary uses up your Personal Allowance and some of your tax bands first. Your profit
          sits on top, so it is taxed at your highest rate. Class 4 NI, though, looks only at your self-employed profit.
        </p>
        <DataTable
          caption="Tax on £10,000 of profit alongside a salary"
          head={["Salary", "Income Tax on the profit", "Class 4 NI", "You keep"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£30,000", "£2,000", "£0", "£8,000"],
            ["£60,000", "£4,000", "£0", "£6,000"],
          ]}
        />
        <p>
          The Class 4 figure is zero because £10,000 of profit is below the £12,570 lower limit, whatever your salary. Your
          employer&rsquo;s PAYE covers the tax on your salary; the tax on your profit is paid through Self Assessment, or
          sometimes collected through your tax code if you ask HMRC.
        </p>
      </GuideSection>

      <GuideSection id="extras" n={7} kicker="Other deductions" title="Student loans, Scotland and pensions">
        <h3>Student loans</h3>
        <p>
          Student loan repayments for the self-employed are worked out in Self Assessment, at your plan&rsquo;s rate on total
          income above its threshold. On £40,000 of profit with a Plan 2 loan, that is 9% of £10,615, or £955 a year, on top of
          tax and NI.
        </p>
        <h3>Scotland</h3>
        <p>
          Scottish taxpayers pay Scottish Income Tax on their profit. At £40,000 that is £5,551 instead of £5,486, about £65
          more. Above £43,663 the 42% rate starts, so the gap widens for higher profits.
        </p>
        <h3>Pension contributions</h3>
        <p>
          Personal pension contributions get tax relief at your top rate. You pay in 80%, the provider claims 20% from HMRC,
          and any higher-rate relief comes off your Self Assessment bill.
        </p>
        <WorkedExample
          title="£10,000 gross into a pension on £70,000 profit"
          steps={[
            { label: "You pay in", value: "£8,000" },
            { label: "Provider claims from HMRC", value: "+£2,000" },
            { label: "Income Tax without the pension", value: "£15,432" },
            { label: "Income Tax with the pension", value: "£13,432" },
          ]}
          total={{ label: "Total relief on £10,000", value: "£4,000" }}
        />
        <p>
          At £110,000 of profit, the same contribution cuts Income Tax by £4,000 on top of the £2,000 basic relief, because it
          also brings back part of your Personal Allowance.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={8} kicker="Self Assessment" title="Registering, filing and paying">
        <Timeline
          items={[
            { when: "5 October 2027", what: "Register for Self Assessment", detail: "If 2026/27 is your first year with self-employed turnover over £1,000." },
            { when: "31 October 2027", what: "Paper return deadline", detail: "Most people file online instead." },
            { when: "31 January 2028", what: "Online return and payment", detail: "File the 2026/27 return and pay the balance, plus your first payment on account for 2027/28." },
            { when: "31 July 2028", what: "Second payment on account", detail: "Half of the 2026/27 Income Tax and Class 4 bill, towards 2027/28." },
          ]}
        />
        <p>
          A return filed late gets an automatic £100 penalty, with more after three, six and twelve months. Interest is
          charged on late tax at the Bank of England base rate plus 4%. The{" "}
          <a href="/business/payment-on-account">payment on account calculator</a> sets out every date for your own figures.
          If you are in Making Tax Digital, late submissions earn penalty points instead, and late payment penalties are a
          percentage of the tax unpaid after 15 and 30 days.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={9} kicker="Cash flow" title="The first-year cash trap">
        <p>
          Self Assessment tax is paid after the year ends, so in your first year there is no tax to pay for many months. Then,
          on the first 31 January, two things fall due together: the whole of the first year&rsquo;s bill and the first
          payment on account for the next year.
        </p>
        <WorkedExample
          title="First year, £40,000 profit"
          steps={[
            { label: "Income Tax and Class 4 for the year", value: "£7,132" },
            { label: "First payment on account for next year", note: "Half of £7,132", value: "£3,566" },
            { label: "Due on the first 31 January", value: "£10,698" },
            { label: "Second payment on account, 31 July", value: "£3,566" },
          ]}
          total={{ label: "Paid within six months", value: "£14,264" }}
        />
        <Callout tone="warn" title="Plan for 150%">
          In your first January you pay about one and a half years&rsquo; tax at once. Save from your first invoice, ideally
          into a separate account, so the money is there.
        </Callout>
      </GuideSection>

      <GuideSection id="mtd" n={10} kicker="New rules" title="Making Tax Digital">
        <p>
          Making Tax Digital for Income Tax started on <strong>6 April 2026</strong>. Sole traders and landlords whose combined
          self-employment and property income (turnover, not profit) was over <strong>£50,000</strong> in 2024/25 must now:
        </p>
        <ul>
          <li>keep their business records in compatible software;</li>
          <li>send HMRC a summary of income and expenses every quarter;</li>
          <li>file a final declaration after the year ends, by 31 January as before.</li>
        </ul>
        <p>
          The threshold falls to £30,000 from April 2027 and £20,000 from April 2028. The quarterly updates do not change how
          much tax you pay or when you pay it.
        </p>
      </GuideSection>

      <GuideSection id="setting-aside" n={11} kicker="Budgeting" title="How much to set aside">
        <p>
          A simple rule is to save a percentage of every payment you receive. The right figure depends on your profit and your
          other income:
        </p>
        <ul>
          <li>Profit under £12,570, no other income: little or nothing, though you may still want to save for the year ahead.</li>
          <li>Profit of £20,000 to £50,000: about 15% to 20% of profit.</li>
          <li>Higher-rate profit, or self-employment on top of a well-paid job: 30% to 40% of profit.</li>
        </ul>
        <p>
          At £40,000 of profit, putting aside about £594 a month covers the year&rsquo;s tax. In your first year, aim higher to
          cover the first payment on account as well.
        </p>
      </GuideSection>

      <GuideSection id="company" n={12} kicker="Structure" title="Sole trader or limited company?">
        <p>
          As profits grow, many sole traders wonder whether a limited company would save tax. A company pays Corporation Tax on
          its profit, and you take money out as a small salary plus dividends. The saving depends on how much you take out and
          on the extra costs of running a company: accounts, a Corporation Tax return, a confirmation statement and stricter
          rules on what is yours and what is the company&rsquo;s.
        </p>
        <p>
          Dividend tax rose to 10.75% and 35.75% in April 2026, which has narrowed the gap. Compare your own figures with the{" "}
          <a href="/business/dividend-vs-salary">dividend vs salary calculator</a> and the{" "}
          <a href="/business/corporation-tax">Corporation Tax calculator</a> before deciding.
        </p>
      </GuideSection>

      <GuideSection id="year-end" n={13} kicker="Basis periods" title="Your accounting year">
        <p>
          Since the 2024/25 tax year, sole traders are taxed on the profit that falls within the tax year itself, 6 April to
          5 April. If your accounts run to a different date, such as 31 December, you apportion profits from two sets of
          accounts to arrive at the tax-year figure.
        </p>
        <p>
          Most new sole traders find it simplest to make their accounts run to 5 April, or to 31 March, which HMRC treats as the
          same as 5 April. Then your accounts and your tax return cover the same period, and there is no apportioning to do.
        </p>
      </GuideSection>

      <GuideSection id="losses" n={14} kicker="Bad years" title="If you make a loss">
        <p>
          If your allowable expenses are more than your turnover, you make a trading loss and there is no tax on the business
          for that year. You can use the loss in several ways:
        </p>
        <ul>
          <li>set it against your other income, such as a salary, in the same tax year or the year before;</li>
          <li>in the first four years of trading, carry it back against income from the three years before;</li>
          <li>carry it forward against future profits from the same business.</li>
        </ul>
        <p>
          Some of these reliefs are capped for larger amounts, and losses from a business not run on a commercial basis cannot
          be set against other income. If your loss is large, an accountant can help you choose the best use.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Personal Allowance" },
            { value: "£50,270", label: "Higher rate and Class 4 upper limit" },
            { value: "6% / 2%", label: "Class 4 NI rates" },
            { value: "£7,105", label: "Small Profits Threshold" },
            { value: "£3.65", label: "Voluntary Class 2 a week" },
            { value: "£1,000", label: "Trading allowance" },
            { value: "31 January", label: "Online return and payment deadline" },
            { value: "£50,000", label: "Making Tax Digital threshold from April 2026" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
