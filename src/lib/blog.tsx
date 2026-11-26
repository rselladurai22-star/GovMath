import Link from "next/link";
import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter title for search results (the page's <title>), when `title` is too long. */
  seoTitle?: string;
  description: string;
  /** ISO date for metadata + sorting. */
  date: string;
  /** Human label shown in the UI. */
  dateLabel: string;
  readingTime: string;
  category: string;
  /** The official pages behind the post's rules and figures, shown in a Sources box at the end. */
  sources?: { label: string; href: string }[];
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "universal-credit-pay-rise-what-you-keep",
    title: "Working more on Universal Credit: how much of a pay rise you really keep in 2026/27",
    seoTitle: "Universal Credit Pay Rise: What You Keep 2026/27",
    description:
      "How the 55% taper, the work allowance, tax and National Insurance combine on Universal Credit in 2026/27, with examples of extra hours, pay rises and pensions.",
    date: "2026-11-26",
    dateLabel: "26 November 2026",
    readingTime: "10 min read",
    category: "Benefits",
    sources: [
      { label: "GOV.UK — Universal Credit and earnings", href: "https://www.gov.uk/universal-credit/how-your-earnings-affect-your-payments" },
      { label: "GOV.UK — Universal Credit: what you'll get", href: "https://www.gov.uk/universal-credit/what-youll-get" },
      { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
      { label: "GOV.UK — Benefit cap", href: "https://www.gov.uk/benefit-cap" },
      { label: "GOV.UK — Universal Credit and self-employment", href: "https://www.gov.uk/self-employment-and-universal-credit" },
      { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
    ],
    body: (
      <>
        <p>
          If you get Universal Credit and work, every extra pound you earn has to pass through up to four deductions:
          Income Tax, National Insurance, your pension contribution and the Universal Credit taper. Depending on where
          you are, you might keep every penny of a pay rise, 45p of each pound, or as little as 32p. Knowing which applies
          to you makes it much easier to judge whether extra hours, a new job or a promotion is worth it.
        </p>
        <p>
          This guide explains the rules for the 2026/27 tax year and works through real examples, all calculated with the
          same engine as our{" "}
          <Link href="/uk/benefits/universal-credit-taper">Universal Credit taper calculator</Link> and{" "}
          <Link href="/uk/benefits/universal-credit">Universal Credit calculator</Link>. The examples assume pay at the
          National Living Wage of £12.71 an hour, a worker aged 25 or over, and tax rules for England, Wales and Northern
          Ireland.
        </p>

        <h2>The two rules: the work allowance and the 55% taper</h2>
        <p>
          Universal Credit is worked out each monthly assessment period. Your maximum award (the standard allowance plus
          any elements for children, housing, disability or caring) is reduced by your earnings, in two steps:
        </p>
        <ul>
          <li>
            <strong>The work allowance.</strong>{" "}Some households can earn a set amount before their award falls at all:
            £427 a month if Universal Credit helps with your housing costs, or £710 a month if it does not. You only get a
            work allowance if you are responsible for a child or you (or your partner) have limited capability for work.
          </li>
          <li>
            <strong>The taper.</strong>{" "}Above the work allowance (or from the first pound, if you do not have one), your
            award falls by 55p for every £1 you earn.
          </li>
        </ul>
        <p>
          The taper applies to your <em>take-home</em> pay: earnings after Income Tax, National Insurance and pension
          contributions. That detail matters, because it means the deductions stack rather than add up.
        </p>

        <h2>How the deductions stack</h2>
        <p>
          While your pay is below the Personal Allowance (£12,570 a year, about £1,048 a month), there is no Income Tax and
          little or no National Insurance, so only the taper bites: you keep 45p of each extra pound. Once you pay tax and
          National Insurance, each extra £1 of gross pay loses 20p in Income Tax and 8p in National Insurance first. That
          leaves 72p, and the taper takes 55% of that (39.6p). You keep 32.4p.
        </p>
        <table>
          <thead>
            <tr>
              <th>Where your earnings are</th>
              <th>Kept from an extra £100 a month</th>
              <th>Where the rest goes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Below your work allowance</td><td>£100</td><td>Nothing</td></tr>
            <tr><td>Above the work allowance, below the Personal Allowance</td><td>£45</td><td>£55 Universal Credit</td></tr>
            <tr><td>Above the work allowance and paying tax and NI</td><td>£32.40</td><td>£20 tax, £8 NI, £39.60 Universal Credit</td></tr>
            <tr><td>Universal Credit has stopped</td><td>£72</td><td>£20 tax, £8 NI</td></tr>
          </tbody>
        </table>
        <p>
          A 67.6% deduction on the next pound is higher than a higher-rate taxpayer pays. It is the main reason a pay rise
          on Universal Credit can feel smaller than expected. But it is never more than 100%: working more always leaves
          you better off, which was not always true under the older benefits Universal Credit replaced.
        </p>

        <h2>Example 1: a single person renting, no children</h2>
        <p>
          A single person aged 25 or over renting privately for £650 a month, with the full rent covered by the housing
          element, has a maximum award of £1,074.90 a month (the £424.90 standard allowance plus £650 for rent). With no
          children and no health condition, there is no work allowance, so the taper starts from the first pound.
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours a week</th>
              <th>Gross pay a month</th>
              <th>Take-home</th>
              <th>Universal Credit</th>
              <th>Total income</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0</td><td>£0</td><td>£0</td><td>£1,074.90</td><td>£1,074.90</td></tr>
            <tr><td>16</td><td>£881.23</td><td>£881.23</td><td>£590.23</td><td>£1,471.45</td></tr>
            <tr><td>30</td><td>£1,652.30</td><td>£1,482.96</td><td>£259.27</td><td>£1,742.23</td></tr>
            <tr><td>37.5</td><td>£2,065.38</td><td>£1,780.37</td><td>£95.70</td><td>£1,876.07</td></tr>
          </tbody>
        </table>
        <p>
          Going from no work to 16 hours a week raises their income by £396.55 a month. Going from 30 hours to full time
          (7.5 more hours, £413.08 more gross pay) adds £133.84. Their Universal Credit stops once take-home pay reaches
          about £1,954 a month.
        </p>

        <h2>Example 2: a single parent renting, one child</h2>
        <p>
          A single parent with one child born after April 2017, renting privately for £900 a month, has a maximum award of
          £1,628.84. Because they are responsible for a child and get help with rent, their work allowance is £427 a
          month.
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours a week</th>
              <th>Gross pay a month</th>
              <th>Take-home</th>
              <th>Universal Credit</th>
              <th>Total income</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0</td><td>£0</td><td>£0</td><td>£1,628.84</td><td>£1,628.84</td></tr>
            <tr><td>16</td><td>£881.23</td><td>£881.23</td><td>£1,379.02</td><td>£2,260.24</td></tr>
            <tr><td>30</td><td>£1,652.30</td><td>£1,482.96</td><td>£1,048.06</td><td>£2,531.02</td></tr>
            <tr><td>37.5</td><td>£2,065.38</td><td>£1,780.37</td><td>£884.49</td><td>£2,664.86</td></tr>
          </tbody>
        </table>
        <p>
          The first £427 of take-home pay each month is kept in full, so 16 hours a week adds £631.40 to their income:
          about 72p for each pound earned. Above that, the familiar 45p and then 32.4p apply. Their award does not stop
          until take-home pay reaches about £3,389 a month, so even a full-time job at the National Living Wage leaves
          them with £884 of Universal Credit.
        </p>
        <p>
          If the same parent owned their home outright (no housing element), their work allowance would be the higher
          £710 a month, so more of the first hours would be kept in full.
        </p>

        <h2>One more hour a week: what is it worth?</h2>
        <p>
          An extra hour every week at £12.71 adds about £55.08 a month of gross pay. What you keep depends on where you
          start:
        </p>
        <ul>
          <li>Still within your work allowance: all £55.08.</li>
          <li>Above the work allowance, not yet paying tax: £24.78.</li>
          <li>Paying tax and National Insurance, still on Universal Credit: £17.84.</li>
          <li>No longer on Universal Credit, paying tax and NI: £39.66.</li>
        </ul>
        <p>
          In other words, an extra hour at the National Living Wage can be worth as little as £4.12 to you (about 32% of
          the hourly rate). Costs of working that hour, such as travel or childcare, come out of that. Our{" "}
          <Link href="/uk/benefits/universal-credit-taper">taper calculator</Link> shows the figure for your own household
          and pay.
        </p>

        <h2>A pay rise or a new job</h2>
        <p>
          The same arithmetic applies to a pay rise. A rise from £12.71 to £13.50 an hour on 30 hours a week adds about
          £102.70 a month of gross pay. For the single parent above, about £33 of that reaches their pocket. For the single
          renter it is the same. That does not mean a rise is not worth having: it builds your pay for the time when you
          no longer need Universal Credit, and it counts towards your pension and any future redundancy or maternity pay.
          But it does mean comparing two job offers by their hourly rates alone can mislead. If you are thinking of
          changing your hours instead, the <Link href="/uk/tax-and-salary/pro-rata">pro rata salary calculator</Link>{" "}
          turns a full-time salary into pay for your hours.
        </p>

        <h2>The pension surprise: saving costs you only about 32p per £1</h2>
        <p>
          The flip side of the stacked deductions is that paying into a pension is unusually cheap on Universal Credit.
          Pension contributions come off your earnings before the taper is applied, so a contribution lowers your
          take-home pay, but your award rises to make up part of it.
        </p>
        <p>
          For the single renter on 30 hours a week, a 5% contribution through salary sacrifice puts £82.62 a month into
          their pension. Their tax and NI fall by £23.13 and their Universal Credit rises by £32.72, so their total income
          falls by just £26.77. Each £1 in the pension costs them about 32p. Under the older net pay arrangement, where
          National Insurance is not saved, the cost is a little higher.
        </p>

        <h2>The benefit cap and the 16-hour rule</h2>
        <p>
          The benefit cap limits the total benefits a working-age household can receive: £22,020 a year for a couple or a
          family outside London (£1,835 a month) and £25,323 in London. It stops applying once your household earns at
          least £881 a month after tax, which is 16 hours a week at the National Living Wage.
        </p>
        <p>
          For a capped family this creates a very large gain at that point. Take a couple with three children renting
          privately for £1,400 a month outside London. Their maximum award is £2,978.79, but the cap cuts it to £1,562.65.
          If one of them takes a job of 16 hours a week at the National Living Wage (£881.23 a month), the cap is lifted:
          their Universal Credit rises to £2,728.97 and their total income goes from £1,562.65 to £3,610.19, a gain of
          £2,047.54 a month. Earning a few pounds less than the threshold gives up most of that, so check your pay against
          it carefully. Our <Link href="/uk/benefits/benefit-cap">benefit cap calculator</Link> shows how close you are.
        </p>

        <h2>Childcare: 85% back</h2>
        <p>
          If you work and pay for registered childcare, Universal Credit can pay back 85% of the cost, up to £1,071.09 a
          month for one child or £1,836.16 for two or more. The childcare element is part of your maximum award, so it
          also raises the point at which your Universal Credit stops; the taper on your earnings works the same way. Free funded hours and
          Tax-Free Childcare change the picture: see our{" "}
          <Link href="/uk/benefits/free-childcare-hours">free childcare hours</Link> and{" "}
          <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</Link> calculators. You cannot use Tax-Free
          Childcare and the Universal Credit childcare element at the same time.
        </p>

        <h2>Paydays and assessment periods</h2>
        <p>
          Universal Credit looks at the pay you actually receive in each monthly assessment period, not your contract.
          If you are paid weekly or every four weeks, some assessment periods will include an extra payday, and your award
          for that month will be lower. It evens out over the year, but it can make a single month look as if a pay rise
          cost you money. Overtime and bonuses count in the month they are paid.
        </p>

        <h2>If you are self-employed</h2>
        <p>
          Self-employed claimants report their profit each month instead of payslips. After a start-up period, many are
          treated as earning at least a set amount (the minimum income floor) based on the National Living Wage for the
          hours they are expected to work, even if they earn less. The taper then applies in the same way.
        </p>

        <h2>Key numbers for 2026/27</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026/27</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Taper rate</td><td>55% of take-home pay</td></tr>
            <tr><td>Work allowance with housing costs</td><td>£427 a month</td></tr>
            <tr><td>Work allowance without housing costs</td><td>£710 a month</td></tr>
            <tr><td>Standard allowance, single, 25 or over</td><td>£424.90 a month</td></tr>
            <tr><td>Standard allowance, couple, either 25 or over</td><td>£666.97 a month</td></tr>
            <tr><td>Child element</td><td>£303.94 a month (£351.88 for a first child born before 6 April 2017)</td></tr>
            <tr><td>National Living Wage</td><td>£12.71 an hour (21 and over)</td></tr>
            <tr><td>Benefit cap earnings exemption</td><td>£881 a month</td></tr>
            <tr><td>Kept from £1 above the work allowance, paying tax and NI</td><td>32.4p</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          On Universal Credit, work always pays, but by less than your payslip suggests. The first pounds within a work
          allowance are kept in full; after that you keep 45p in each pound, falling to 32.4p once you pay tax and
          National Insurance. Two points work in your favour: pension saving costs about a third of its face value, and
          earning £881 a month can lift the benefit cap entirely. To see your own figures, use the{" "}
          <Link href="/uk/benefits/universal-credit-taper">Universal Credit taper calculator</Link>. These are estimates
          for 2026/27 and general guidance; your Universal Credit statement shows the figures DWP actually used.
        </p>
      </>
    ),
  },
  {
    slug: "100k-tax-trap",
    title: "The £100,000 tax trap: why a pay rise can cost you 62% and how to keep more",
    seoTitle: "The £100,000 Tax Trap: 62% Tax Explained",
    description:
      "Earn £100,000 to £125,140 and you lose your Personal Allowance and childcare help. What that costs in 2026/27, and how pension contributions win it back.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Tax & Salary",
    sources: [
      { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
      { label: "GOV.UK — Tax relief on pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
      { label: "GOV.UK — Pension annual allowance", href: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
      { label: "GOV.UK — Free childcare for working parents", href: "https://www.gov.uk/free-childcare-if-working" },
      { label: "GOV.UK — Tax-Free Childcare", href: "https://www.gov.uk/tax-free-childcare" },
    ],
    body: (
      <>
        <p>
          Most people expect a pay rise to make them better off, and almost always it does. But there is one stretch of
          income in the UK where the tax system takes far more than the headline rates suggest. Between{" "}
          <strong>£100,000 and £125,140</strong>, an employee in England, Wales or Northern Ireland keeps just{" "}
          <strong>38p of every extra pound</strong>. For parents of young children, crossing £100,000 by even £1 can also
          switch off thousands of pounds of childcare support.
        </p>
        <p>
          This guide explains where the trap comes from, what it costs in real pounds for 2026/27, and the legal, common
          ways to step back out of it. Every figure here was worked out with the same tested take-home pay engine that
          drives our <Link href="/uk/tax-and-salary/pro-rata">pro rata salary calculator</Link>.
        </p>

        <h2>Where the trap comes from</h2>
        <p>
          Everyone starts with a tax-free <strong>Personal Allowance of £12,570</strong>. Once your{" "}
          <em>adjusted net income</em> goes above £100,000, that allowance is reduced by £1 for every £2 of income over
          the line. By £125,140 it has gone completely.
        </p>
        <p>
          So each extra £2 you earn in this band does two things. It is taxed at the 40% higher rate, and it removes £1 of
          allowance, which means another £1 of your income that used to be tax-free is now taxed at 40% too. Put
          together:
        </p>
        <ul>
          <li>
            Income Tax on the £2 itself: <strong>80p</strong> (40%).
          </li>
          <li>
            Income Tax on the £1 of lost allowance: <strong>40p</strong>.
          </li>
          <li>
            Total: <strong>£1.20 of tax on £2</strong>, an effective rate of <strong>60%</strong>.
          </li>
        </ul>
        <p>
          Add 2% employee National Insurance and the marginal rate on salary is <strong>62%</strong>. Above £125,140 the
          allowance is already gone, so the rate falls back to the 45% additional rate plus 2% NI: 47%. That is the odd
          shape of the UK system: the marginal rate between £100,000 and £125,140 is higher than the rate above it.
        </p>

        <h2>What it costs in real pounds</h2>
        <p>Here is a salary of £100,000, £110,000 and £125,140 in 2026/27, with no pension or student loan:</p>
        <table>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Personal Allowance</th>
              <th>Income Tax</th>
              <th>National Insurance</th>
              <th>Take-home</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£100,000</td>
              <td>£12,570</td>
              <td>£27,432</td>
              <td>£4,010.60</td>
              <td>£68,557.40</td>
            </tr>
            <tr>
              <td>£110,000</td>
              <td>£7,570</td>
              <td>£33,432</td>
              <td>£4,210.60</td>
              <td>£72,357.40</td>
            </tr>
            <tr>
              <td>£125,140</td>
              <td>£0</td>
              <td>£42,516</td>
              <td>£4,513.40</td>
              <td>£78,110.60</td>
            </tr>
          </tbody>
        </table>
        <p>
          A £10,000 rise from £100,000 to £110,000 adds just <strong>£3,800</strong> to take-home pay. Going all the way
          to £125,140, a rise of £25,140, adds <strong>£9,553.20</strong>.
        </p>
        <p>
          In Scotland the trap is steeper still. The Personal Allowance taper is the same, but the income it pulls into
          tax meets the 45% advanced rate, so the marginal rate on salary is <strong>69.5%</strong> including NI. A
          Scottish taxpayer going from £100,000 to £110,000 keeps £3,050 of the £10,000.
        </p>

        <h2>The childcare cliff for parents</h2>
        <p>
          The tax taper is gradual. The childcare rules are not. Two valuable schemes use the same £100,000 adjusted net
          income test, and each one is all or nothing:
        </p>
        <ul>
          <li>
            <strong>Funded childcare hours for working parents</strong>{" "}in England: up to 30 hours a week, 38 weeks a
            year (1,140 hours) for children from 9 months until they start school. If either parent&rsquo;s adjusted net
            income is expected to be over £100,000, the family loses the working-parent hours. The universal 15 hours for
            3 and 4-year-olds stay. Check eligibility with the{" "}
            <Link href="/uk/benefits/free-childcare-hours">free childcare hours calculator</Link>.
          </li>
          <li>
            <strong>Tax-Free Childcare</strong>: the government adds £2 for every £8 you pay into a childcare account, up
            to <strong>£2,000 a year per child</strong> (£4,000 for a disabled child). Same £100,000 limit, for either
            parent. See the <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare calculator</Link>.
          </li>
        </ul>
        <p>
          With two young children in nursery, going £1 over the line can cost more in lost support than the whole of a
          modest pay rise. Child Benefit is a separate matter: the High Income Child Benefit Charge claws it back
          between £60,000 and £80,000, so by £100,000 it has already gone in full (worth £2,337.40 a year for two
          children in 2026/27). The{" "}
          <Link href="/uk/benefits/high-income-child-benefit">High Income Child Benefit calculator</Link> covers that
          earlier band.
        </p>

        <h2>The fix: reduce your adjusted net income</h2>
        <p>
          Every rule above is tested on <strong>adjusted net income</strong>, not on your salary. Adjusted net income is
          your total taxable income less certain deductions, mainly pension contributions and Gift Aid donations. So the
          same tool fixes all three problems at once: put the excess into a pension.
        </p>
        <p>
          Take someone on £110,000 who pays an extra <strong>£10,000</strong> into their pension through salary
          sacrifice. Their pay for tax falls to £100,000, they get their full Personal Allowance back, and their
          take-home falls by only <strong>£3,800</strong>. In other words, £10,000 lands in the pension at a cost of
          £3,800: an effective 62% boost, before any employer top-up. If their adjusted net income is now £100,000 or
          less, the childcare support comes back too.
        </p>
        <p>The method of paying in changes the mechanics, but not much the outcome:</p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>How it works</th>
              <th>Cost of £10,000 into the pension at £110,000</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salary sacrifice</td>
              <td>You give up salary; your employer pays it in. Saves tax and NI.</td>
              <td>£3,800</td>
            </tr>
            <tr>
              <td>Net pay arrangement</td>
              <td>Paid from your gross pay before tax. Saves tax, not NI.</td>
              <td>£4,000</td>
            </tr>
            <tr>
              <td>Relief at source</td>
              <td>
                You pay £8,000; the provider adds £2,000. You claim the other £4,000 back through Self Assessment.
              </td>
              <td>£4,000 (after the claim)</td>
            </tr>
          </tbody>
        </table>
        <p>
          With relief at source, the claim matters: if you don&rsquo;t file a tax return or ask HMRC, you miss the
          higher-rate relief <em>and</em> the Personal Allowance stays reduced. Many people in this band are owed money
          for this reason. Your pension provider or HMRC can confirm which method your scheme uses.
        </p>

        <h2>Bonuses, timing and other ways in</h2>
        <p>
          The trap often catches people through a one-off. A bonus, a big overtime month, savings interest or dividends
          all count towards adjusted net income for the tax year. A few points worth knowing:
        </p>
        <ul>
          <li>
            <strong>Bonus sacrifice.</strong> Many employers let you sacrifice part or all of a bonus into your pension.
            It must be agreed before the bonus is paid, and it can take your adjusted net income back under £100,000.
          </li>
          <li>
            <strong>It is a tax-year test.</strong>{" "}Income from 6 April to 5 April counts. A contribution made in March
            reduces that year&rsquo;s figure; one made in May counts towards the next.
          </li>
          <li>
            <strong>Gift Aid.</strong> Donations to charity reduce adjusted net income by the grossed-up amount. A £800
            donation counts as £1,000.
          </li>
          <li>
            <strong>Savings and dividends count.</strong> Interest above your Personal Savings Allowance and dividends
            still add to adjusted net income, even if some are tax-free. Moving savings into an ISA keeps them out of
            the calculation.
          </li>
        </ul>

        <h2>Limits and things to watch</h2>
        <ul>
          <li>
            <strong>The annual allowance.</strong>{" "}You can normally get tax relief on pension savings of up to £60,000 a
            year (including your employer&rsquo;s contributions), or 100% of your earnings if less. Unused allowance
            from the three previous years can be carried forward.
          </li>
          <li>
            <strong>Pension money is locked away.</strong>{" "}You can&rsquo;t normally draw it until 55 (57 from April
            2028). If you need the cash for a house deposit or school fees, this strategy has a real cost.
          </li>
          <li>
            <strong>Salary sacrifice lowers your contractual pay.</strong> That can affect mortgage applications, life
            cover and statutory pay such as maternity pay. Check with your employer first.
          </li>
          <li>
            <strong>Changes from April 2029.</strong> The government plans to cap the NI saving on salary sacrifice
            pension contributions at £2,000 a year. Income Tax relief is unaffected, so the trap fix still works; the
            extra NI saving shrinks for large sacrifices.
          </li>
        </ul>

        <h2>A simple checklist</h2>
        <ul>
          <li>Estimate your adjusted net income for the whole tax year, including bonuses, interest and dividends.</li>
          <li>If it is between £100,000 and £125,140, work out how much you would need to pay into a pension to get back to £100,000.</li>
          <li>If you have young children in childcare, treat £100,000 as a hard line for <em>each</em> parent.</li>
          <li>If you use relief at source, make sure you claim the extra relief through Self Assessment.</li>
          <li>Check the figures with your payroll or pension provider before changing your contribution.</li>
        </ul>

        <h2>The bottom line</h2>
        <p>
          The £100,000 trap is not a reason to turn down a pay rise: you are always better off in cash terms, just by
          much less than you would expect. But for anyone in this band, every pound paid into a pension is unusually
          cheap, and for parents of young children, staying at or under £100,000 can be worth thousands. These figures
          are estimates for 2026/27 and general guidance, not personal financial advice.
        </p>
      </>
    ),
  },
  {
    slug: "plan-2-vs-plan-5-student-loans",
    title: "Plan 2 vs Plan 5 student loans: what you will actually repay",
    seoTitle: "Plan 2 vs Plan 5 Student Loans: What You Repay",
    description:
      "Plan 2 vs Plan 5 for 2026/27: thresholds, interest and write-off compared over a lifetime, and when overpaying your student loan helps or wastes money.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Students",
    sources: [
      { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
      { label: "GOV.UK — Which repayment plan you are on", href: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
      { label: "GOV.UK — When your student loan gets written off or cancelled", href: "https://www.gov.uk/repaying-your-student-loan/when-your-student-loan-gets-written-off-or-cancelled" },
      { label: "GOV.UK — Make extra repayments on your student loan", href: "https://www.gov.uk/repaying-your-student-loan/make-extra-repayments" },
    ],
    body: (
      <>
        <p>
          If you started an undergraduate course in England from August 2023, your loan is on <strong>Plan 5</strong>.
          If you started between September 2012 and July 2023 (in England or Wales), you are on <strong>Plan 2</strong>.
          The two look similar on paper, but they behave very differently over a working life. This guide compares them
          for 2026/27; its figures were worked out with the same engine as our{" "}
          <Link href="/uk/students/plan-2-student-loan">Plan 2 student loan calculator</Link>.
        </p>

        <h2>The rules side by side</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Plan 2</th>
              <th>Plan 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Repayment threshold 2026/27</td>
              <td>£29,385 a year</td>
              <td>£25,000 a year</td>
            </tr>
            <tr>
              <td>Repayment rate</td>
              <td>9% of income above the threshold</td>
              <td>9% of income above the threshold</td>
            </tr>
            <tr>
              <td>Threshold in future</td>
              <td>Frozen at £29,385 until April 2030</td>
              <td>Rises with RPI from April 2027</td>
            </tr>
            <tr>
              <td>Interest (September 2026 to August 2027)</td>
              <td>RPI to RPI + 3% depending on income, capped at 6%</td>
              <td>RPI only: 4.1%</td>
            </tr>
            <tr>
              <td>Written off</td>
              <td>30 years after you were first due to repay</td>
              <td>40 years after you were first due to repay</td>
            </tr>
          </tbody>
        </table>
        <p>
          On Plan 2, interest depends on what you earn: 4.1% (RPI) on income up to £29,385, rising on a sliding scale to
          RPI + 3% at £52,885, with the 6% cap applying this year. Someone on £40,000 is charged about 5.46%; anyone earning
          about £44,300 or more hits the 6% cap.
        </p>

        <h2>What comes out of your pay each month</h2>
        <p>
          Repayments depend only on your income, not on how much you borrowed. Plan 5&rsquo;s lower threshold means you
          repay more at every salary:
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary</th>
              <th>Plan 2 a month</th>
              <th>Plan 5 a month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£25,000</td>
              <td>£0</td>
              <td>£0</td>
            </tr>
            <tr>
              <td>£30,000</td>
              <td>£4.61</td>
              <td>£37.50</td>
            </tr>
            <tr>
              <td>£35,000</td>
              <td>£42.11</td>
              <td>£75.00</td>
            </tr>
            <tr>
              <td>£40,000</td>
              <td>£79.61</td>
              <td>£112.50</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£154.61</td>
              <td>£187.50</td>
            </tr>
            <tr>
              <td>£60,000</td>
              <td>£229.61</td>
              <td>£262.50</td>
            </tr>
          </tbody>
        </table>
        <p>
          The gap is a steady £32.89 a month (£394.65 a year) once you earn above the Plan 2 threshold. That is 9% of the
          £4,385 difference between the two thresholds. Repayments are taken through PAYE alongside tax and NI, and the{" "}
          <Link href="/uk/students/plan-2-student-loan">Plan 2 calculator</Link> shows them for your own salary.
        </p>

        <h2>What you repay over a lifetime</h2>
        <p>
          The real difference is the length of the term. Here are projections for a £50,000 balance, starting to repay
          now, with pay rising 3% a year and RPI at 3% from 2027:
        </p>
        <table>
          <thead>
            <tr>
              <th>Starting salary</th>
              <th>Plan 2: total repaid</th>
              <th>Plan 2: written off</th>
              <th>Plan 5: total repaid</th>
              <th>Plan 5: written off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£28,000</td>
              <td>£4,467</td>
              <td>£191,013</td>
              <td>£20,358</td>
              <td>£130,640</td>
            </tr>
            <tr>
              <td>£35,000</td>
              <td>£34,266</td>
              <td>£168,232</td>
              <td>£67,861</td>
              <td>£50,831</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£98,493</td>
              <td>£59,176</td>
              <td>£73,611</td>
              <td>£0 (cleared in year 24)</td>
            </tr>
          </tbody>
        </table>
        <p>Three things stand out:</p>
        <ul>
          <li>
            <strong>Most people on Plan 2 never clear the loan.</strong> Even a graduate starting on £50,000 still has a
            balance written off after 30 years in this projection, having repaid nearly twice what they borrowed.
          </li>
          <li>
            <strong>Plan 5 takes more from middle earners.</strong> At £35,000, a Plan 5 borrower repays roughly double
            what a Plan 2 borrower would, because the threshold is lower and the payments run for 40 years instead of
            30.
          </li>
          <li>
            <strong>Plan 5 is cheaper for high earners.</strong> Lower interest (RPI only) means a Plan 5 borrower on
            £50,000 clears the loan in 24 years and repays about £25,000 less than on Plan 2.
          </li>
        </ul>
        <p>
          The written-off figures look alarming, but you never pay them. Once the term ends, whatever is left is
          cancelled. The balance you see in your online account is, for many people, not a debt you will ever repay.
        </p>

        <h2>Should you overpay?</h2>
        <p>
          This is where most people go wrong. Overpaying only saves money if you were going to clear the loan anyway. If
          you are heading for a write-off, every extra pound simply replaces a pound that would have been cancelled.
        </p>
        <p>Here is the effect of overpaying £100 a month on a £50,000 Plan 5 loan:</p>
        <ul>
          <li>
            <strong>Starting salary £35,000:</strong> total repaid rises from £67,861 to <strong>£80,818</strong>. The
            loan is cleared in year 31, but you have paid nearly £13,000 more. Overpaying costs money.
          </li>
          <li>
            <strong>Starting salary £50,000:</strong> total repaid falls from £73,611 to <strong>£65,395</strong>, and
            the loan is cleared in year 17 instead of year 24. Overpaying saves about £8,200.
          </li>
        </ul>
        <p>
          The calculators show both paths for your own balance and pay. As a rough rule, overpaying makes sense only if
          you expect your earnings to be high enough to clear the loan well before the write-off date. Otherwise, the
          money usually does more in a pension (with tax relief) or a{" "}
          stocks and shares ISA, or towards a house deposit.
        </p>

        <h2>Common questions</h2>
        <h3>Does a student loan affect my mortgage?</h3>
        <p>
          It is not a debt on your credit file, but lenders count the monthly repayment as an outgoing when they work
          out how much to lend. A Plan 5 borrower on £40,000 has £112.50 a month taken into account.
        </p>
        <h3>What if I have a Plan 2 loan and a Postgraduate Loan?</h3>
        <p>
          You repay both at once: 9% above the Plan 2 threshold and 6% above £21,000 for the Postgraduate Loan. Both
          come out of your pay through PAYE, and your payslip shows them separately.
        </p>
        <h3>What if I move abroad?</h3>
        <p>
          You must tell the Student Loans Company. Repayments are then set using the threshold for the country you live
          in, and you pay them directly instead of through PAYE.
        </p>
        <h3>I&rsquo;m starting university. What will I borrow?</h3>
        <p>
          Tuition fee loans plus maintenance loans of up to several thousand pounds a year. The{" "}
          <Link href="/uk/students/maintenance-loan">maintenance loan calculator</Link> shows your entitlement from
          household income.
        </p>

        <h2>The bottom line</h2>
        <p>
          A student loan works more like a 9% graduate tax for 30 or 40 years than a normal debt. Plan 5 takes more from
          middle earners and less from high earners than Plan 2. Before you overpay, check whether you would ever clear
          the loan; for most people, you won&rsquo;t, and the money is better used elsewhere. These are projections
          based on assumptions about pay and inflation, not a guarantee.
        </p>
      </>
    ),
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
