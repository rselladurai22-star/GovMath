import Link from "next/link";
import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date for metadata + sorting. */
  date: string;
  /** Human label shown in the UI. */
  dateLabel: string;
  readingTime: string;
  category: string;
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "uk-take-home-pay-explained",
    title: "How UK take-home pay works in 2026/27: a plain-English guide",
    description:
      "Income Tax, National Insurance, the Personal Allowance and the hidden 60% trap — exactly what comes out of your salary in 2026/27, explained with a worked example.",
    date: "2026-05-20",
    dateLabel: "20 May 2026",
    readingTime: "8 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          You agree a salary, then your first payslip arrives and it&apos;s
          noticeably smaller than you expected. Where did the money go? In the
          UK, the gap between your <strong>gross</strong> salary (what you
          agreed) and your <strong>take-home</strong> pay (what hits your bank)
          comes down to two main deductions: <strong>Income Tax</strong> and{" "}
          <strong>National Insurance</strong>. This guide explains both for the{" "}
          <strong>2026/27 tax year</strong>, in plain English, with a worked
          example you can follow.
        </p>
        <p>
          Want the number first and the theory second? Run your figure through
          the{" "}
          <Link href="/tax-and-salary/salary-calculator">
            Salary &amp; Take-Home Pay Calculator
          </Link>{" "}
          and come back here to understand it.
        </p>

        <h2>The two deductions that shrink your salary</h2>
        <p>
          For a standard employee paid through PAYE (Pay As You Earn), almost
          all of the difference between gross and net pay is these two:
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> — paid to HMRC on most of your income
            above a tax-free allowance.
          </li>
          <li>
            <strong>National Insurance (NI)</strong> — a separate contribution
            that funds the State Pension and some benefits.
          </li>
        </ul>
        <p>
          Pensions and student loans can also reduce your pay, but we&apos;ll
          set those aside to keep the core picture clear.
        </p>

        <h2>Step 1: Your Personal Allowance (the tax-free bit)</h2>
        <p>
          Everyone gets a <strong>Personal Allowance</strong> — an amount you
          can earn before paying any Income Tax. For 2026/27 it&apos;s{" "}
          <strong>£12,570</strong>. Earn less than that and you pay no Income
          Tax at all.
        </p>
        <p>
          There&apos;s a catch for higher earners: once your income passes{" "}
          <strong>£100,000</strong>, your Personal Allowance shrinks by £1 for
          every £2 you earn above that line, disappearing entirely at £125,140.
          More on why that matters below.
        </p>

        <h2>Step 2: The Income Tax bands</h2>
        <p>
          Income Tax in England, Wales and Northern Ireland is{" "}
          <em>banded</em>. You don&apos;t pay one rate on everything — you pay
          each rate only on the slice of income that falls inside its band. For
          2026/27:
        </p>
        <table>
          <thead>
            <tr>
              <th>Band</th>
              <th>Taxable income</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Personal Allowance</td>
              <td>Up to £12,570</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Basic rate</td>
              <td>£12,571 – £50,270</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>Higher rate</td>
              <td>£50,271 – £125,140</td>
              <td>40%</td>
            </tr>
            <tr>
              <td>Additional rate</td>
              <td>Over £125,140</td>
              <td>45%</td>
            </tr>
          </tbody>
        </table>
        <p>
          The key idea: a pay rise that pushes you into the higher-rate band
          does <strong>not</strong> mean all your income is suddenly taxed at
          40%. Only the pounds above £50,270 are. Scotland uses a different,
          six-band system — see the{" "}
          <Link href="/tax-and-salary/scottish-tax">
            Scottish Income Tax calculator
          </Link>{" "}
          if that&apos;s you.
        </p>

        <h2>Step 3: National Insurance</h2>
        <p>
          On top of Income Tax, employees pay Class 1 National Insurance. For
          2026/27 the employee rates are:
        </p>
        <ul>
          <li>
            <strong>0%</strong> on earnings up to £12,570.
          </li>
          <li>
            <strong>8%</strong> on earnings between £12,570 and £50,270.
          </li>
          <li>
            <strong>2%</strong> on earnings above £50,270.
          </li>
        </ul>
        <p>
          NI is calculated on your earnings, separately from Income Tax. You can
          break it down with the{" "}
          <Link href="/tax-and-salary/national-insurance">
            National Insurance calculator
          </Link>
          .
        </p>

        <h2>A worked example: £35,000 salary</h2>
        <p>Let&apos;s put it together for someone earning £35,000 a year.</p>
        <ul>
          <li>
            <strong>Income Tax:</strong> the first £12,570 is tax-free. That
            leaves £22,430 taxed at 20% = <strong>£4,486</strong>.
          </li>
          <li>
            <strong>National Insurance:</strong> 8% on the £22,430 between
            £12,570 and £35,000 = <strong>£1,794</strong>.
          </li>
          <li>
            <strong>Total deductions:</strong> £4,486 + £1,794 ={" "}
            <strong>£6,280</strong>.
          </li>
          <li>
            <strong>Take-home pay:</strong> £35,000 − £6,280 ={" "}
            <strong>£28,720 a year</strong>, or about £2,393 a month.
          </li>
        </ul>
        <p>
          That&apos;s an effective tax rate of roughly 18% — even though the
          person is a &quot;20% taxpayer&quot;. The difference is the tax-free
          allowance dragging the average down.
        </p>

        <h2>The hidden 60% tax trap</h2>
        <p>
          Here&apos;s the quirk that surprises people most. Between{" "}
          <strong>£100,000 and £125,140</strong>, every extra £1 you earn does
          two things: it&apos;s taxed at 40%, <em>and</em> it removes 50p of
          your Personal Allowance, which is itself then taxed. The combined
          effect is an effective marginal rate of <strong>60%</strong>. A pay
          rise into this band is often worth far less than it looks — and paying
          into a pension is a common way to step back below the line.
        </p>

        <h2>What this guide leaves out</h2>
        <p>
          To stay readable, the example above ignores a few things that can
          change your real payslip:
        </p>
        <ul>
          <li>
            <strong>Workplace pensions</strong>, especially salary sacrifice,
            which reduce both take-home and taxable pay.
          </li>
          <li>
            <strong>Student loan repayments</strong> (Plans 1, 2, 4, 5 and
            postgraduate), each with its own threshold.
          </li>
          <li>
            <strong>Non-standard tax codes</strong> like BR, 0T or K, which can
            change your tax dramatically.
          </li>
        </ul>
        <p>
          For the headline number, the{" "}
          <Link href="/tax-and-salary/salary-calculator">
            take-home calculator
          </Link>{" "}
          is the fastest way to see where you stand — and if you&apos;re
          weighing up a raise, the{" "}
          <Link href="/tax-and-salary/tax-bracket-checker">
            Tax Bracket Checker
          </Link>{" "}
          shows what each band actually costs.
        </p>

        <h2>The bottom line</h2>
        <p>
          UK take-home pay isn&apos;t random — it&apos;s a tax-free allowance,
          then banded Income Tax, then National Insurance layered on top. Once
          you see the slices, your payslip stops being a mystery. Bookmark the
          calculators you need, and remember: the figures here are estimates for
          general guidance, not personal advice. Always check your own tax code
          and circumstances.
        </p>
      </>
    ),
  },
  {
    slug: "100k-tax-trap",
    title: "The £100,000 tax trap: why a pay rise can cost you 62% and how to keep more",
    description:
      "Between £100,000 and £125,140 you lose your Personal Allowance, free childcare and Tax-Free Childcare. Here is what that really costs in 2026/27, and how pension contributions win it back.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Tax & Salary",
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
          ways to step back out of it. Every figure here comes from the same engine as our{" "}
          <Link href="/tax-and-salary/salary-calculator">Salary &amp; Take-Home Pay Calculator</Link>, so you can check
          your own numbers there.
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
          to £125,140, a rise of £25,140, adds <strong>£9,553.20</strong>. You can see the band-by-band picture for any
          salary in the <Link href="/tax-and-salary/tax-bracket-checker">Tax Bracket Checker</Link>.
        </p>
        <p>
          In Scotland the trap is steeper still. The Personal Allowance taper is the same, but the income it pulls into
          tax meets the 45% advanced rate, so the marginal rate on salary is <strong>69.5%</strong> including NI. A
          Scottish taxpayer going from £100,000 to £110,000 keeps £3,050 of the £10,000. The{" "}
          <Link href="/tax-and-salary/scottish-tax">Scottish Income Tax calculator</Link> shows the full picture.
        </p>

        <h2>The childcare cliff for parents</h2>
        <p>
          The tax taper is gradual. The childcare rules are not. Two valuable schemes use the same £100,000 adjusted net
          income test, and each one is all or nothing:
        </p>
        <ul>
          <li>
            <strong>Funded childcare hours for working parents</strong> in England: up to 30 hours a week, 38 weeks a
            year (1,140 hours) for children from 9 months until they start school. If either parent&rsquo;s adjusted net
            income is expected to be over £100,000, the family loses the working-parent hours. The universal 15 hours for
            3 and 4-year-olds stay. Check eligibility with the{" "}
            <Link href="/benefits/free-childcare-hours">free childcare hours calculator</Link>.
          </li>
          <li>
            <strong>Tax-Free Childcare</strong>: the government adds £2 for every £8 you pay into a childcare account, up
            to <strong>£2,000 a year per child</strong> (£4,000 for a disabled child). Same £100,000 limit, for either
            parent. See the <Link href="/benefits/tax-free-childcare">Tax-Free Childcare calculator</Link>.
          </li>
        </ul>
        <p>
          With two young children in nursery, going £1 over the line can cost more in lost support than the whole of a
          modest pay rise. Child Benefit is a separate matter: the High Income Child Benefit Charge claws it back
          between £60,000 and £80,000, so by £100,000 it has already gone in full (worth £2,337.40 a year for two
          children in 2026/27). The{" "}
          <Link href="/benefits/high-income-child-benefit">High Income Child Benefit calculator</Link> covers that
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
          for this reason. The <Link href="/investing/pension-tax-relief">pension tax relief calculator</Link> works out
          each method for your salary.
        </p>

        <h2>Bonuses, timing and other ways in</h2>
        <p>
          The trap often catches people through a one-off. A bonus, a big overtime month, savings interest or dividends
          all count towards adjusted net income for the tax year. A few points worth knowing:
        </p>
        <ul>
          <li>
            <strong>Bonus sacrifice.</strong> Many employers let you sacrifice part or all of a bonus into your pension.
            It must be agreed before the bonus is paid. Our <Link href="/tax-and-salary/bonus-tax">bonus tax calculator</Link>{" "}
            shows what a bonus is worth with and without it.
          </li>
          <li>
            <strong>It is a tax-year test.</strong> Income from 6 April to 5 April counts. A contribution made in March
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
            <strong>The annual allowance.</strong> You can normally get tax relief on pension savings of up to £60,000 a
            year (including your employer&rsquo;s contributions), or 100% of your earnings if less. Unused allowance
            from the three previous years can be carried forward.
          </li>
          <li>
            <strong>Pension money is locked away.</strong> You can&rsquo;t normally draw it until 55 (57 from April
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
          <li>Run the numbers in the <Link href="/investing/workplace-pension">workplace pension calculator</Link> before changing your contribution.</li>
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
    description:
      "Plan 5 has a lower threshold, a lower interest rate and a 40-year term. We compare Plan 2 and Plan 5 for 2026/27, with lifetime projections, and explain when overpaying helps and when it wastes money.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Students",
    body: (
      <>
        <p>
          If you started an undergraduate course in England from August 2023, your loan is on <strong>Plan 5</strong>.
          If you started between September 2012 and July 2023 (in England or Wales), you are on <strong>Plan 2</strong>.
          The two look similar on paper, but they behave very differently over a working life. This guide compares them
          for 2026/27, using the same engine as our{" "}
          <Link href="/students/plan-2-student-loan">Plan 2</Link> and{" "}
          <Link href="/students/plan-5-student-loan">Plan 5</Link> calculators.
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
          £4,385 difference between the two thresholds. Repayments are taken through PAYE alongside tax and NI; the{" "}
          <Link href="/tax-and-salary/salary-calculator">take-home pay calculator</Link> includes them.
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
          <Link href="/investing/isa-vs-gia">stocks and shares ISA</Link>, or towards a house deposit.
        </p>

        <h2>Common questions</h2>
        <h3>Does a student loan affect my mortgage?</h3>
        <p>
          It is not a debt on your credit file, but lenders count the monthly repayment as an outgoing when they work
          out how much to lend. A Plan 5 borrower on £40,000 has £112.50 a month taken into account. Our{" "}
          <Link href="/property/mortgage-affordability">mortgage affordability calculator</Link> lets you include it.
        </p>
        <h3>What if I have a Plan 2 loan and a Postgraduate Loan?</h3>
        <p>
          You repay both at once: 9% above the Plan 2 threshold and 6% above £21,000 for the Postgraduate Loan. See the{" "}
          <Link href="/students/postgrad-loan">Postgraduate Loan calculator</Link>.
        </p>
        <h3>What if I move abroad?</h3>
        <p>
          You must tell the Student Loans Company. Repayments are then set using the threshold for the country you live
          in, and you pay them directly instead of through PAYE.
        </p>
        <h3>I&rsquo;m starting university. What will I borrow?</h3>
        <p>
          Tuition fee loans plus maintenance loans of up to several thousand pounds a year. The{" "}
          <Link href="/students/maintenance-loan">maintenance loan calculator</Link> shows your entitlement from
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
  {
    slug: "first-time-buyer-costs",
    title: "Buying your first home in 2026/27: the real cost, from deposit to monthly payments",
    description:
      "Stamp Duty relief, deposits, legal fees, surveys and mortgage payments for first-time buyers in England, Scotland and Wales, with a full worked example for a £350,000 home.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "9 min read",
    category: "Property",
    body: (
      <>
        <p>
          The deposit is the number everyone focuses on, but it is only part of the cash you need to buy your first
          home. Stamp Duty, legal fees, a survey, a mortgage fee and the move itself all come on top. This guide walks
          through each cost for 2026/27, with a full worked example, so you can plan for the real total. The figures
          use the same engines as our <Link href="/property/first-time-buyer">first-time buyer calculator</Link> and{" "}
          <Link href="/property/moving-house-budget">moving house budget calculator</Link>.
        </p>

        <h2>1. The deposit</h2>
        <p>
          Most lenders need at least 5% of the price, but the rate you are offered improves as the deposit grows. The
          usual steps are 5%, 10%, 15%, 25% and 40%. Moving from a 5% to a 10% deposit often makes a noticeable
          difference to the rate.
        </p>
        <p>
          If you are aged 18 to 39, a <strong>Lifetime ISA</strong> can help: you can save up to £4,000 a year and the
          government adds 25% (up to £1,000 a year). The home must cost £450,000 or less, and you must have held the
          account for at least 12 months. Withdraw for any other reason before 60 and you pay a 25% charge, which takes
          back more than the bonus.
        </p>

        <h2>2. Stamp Duty and its equivalents</h2>
        <p>
          In England and Northern Ireland, first-time buyers pay no Stamp Duty on the first £300,000 and 5% on the part
          from £300,001 to £500,000. Above £500,000 the relief is lost completely and you pay the normal rates on the
          whole price. Scotland and Wales have their own taxes with different rules:
        </p>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>England / NI: first-time buyer</th>
              <th>England / NI: other buyers</th>
              <th>Scotland LBTT: first-time buyer</th>
              <th>Wales LTT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£250,000</td>
              <td>£0</td>
              <td>£2,500</td>
              <td>£1,500</td>
              <td>£1,500</td>
            </tr>
            <tr>
              <td>£300,000</td>
              <td>£0</td>
              <td>£5,000</td>
              <td>£4,000</td>
              <td>£4,500</td>
            </tr>
            <tr>
              <td>£350,000</td>
              <td>£2,500</td>
              <td>£7,500</td>
              <td>£7,750</td>
              <td>£7,500</td>
            </tr>
            <tr>
              <td>£450,000</td>
              <td>£7,500</td>
              <td>£12,500</td>
              <td>£17,750</td>
              <td>£14,250</td>
            </tr>
            <tr>
              <td>£500,000</td>
              <td>£10,000</td>
              <td>£15,000</td>
              <td>£22,750</td>
              <td>£18,000</td>
            </tr>
            <tr>
              <td>£510,000</td>
              <td>£15,500</td>
              <td>£15,500</td>
              <td>£23,750</td>
              <td>£18,750</td>
            </tr>
          </tbody>
        </table>
        <p>
          Note the cliff at £500,000: a first-time buyer in England pays £10,000 at £500,000 but £15,500 at £510,000.
          Wales has no first-time buyer relief, but its tax only starts above £225,000. To qualify in England, every
          buyer must be a first-time buyer, and the home must be your main residence. Check your figure with the{" "}
          <Link href="/property/stamp-duty-england">Stamp Duty calculator</Link>, the{" "}
          <Link href="/property/lbtt-scotland">LBTT calculator</Link> or the{" "}
          <Link href="/property/ltt-wales">LTT calculator</Link>.
        </p>

        <h2>3. Legal fees, survey and mortgage fee</h2>
        <ul>
          <li>
            <strong>Conveyancing:</strong> typically £1,200 to £2,000 including VAT and searches for a straightforward
            purchase. Leasehold flats cost more, as there is more paperwork.
          </li>
          <li>
            <strong>Survey:</strong> the lender&rsquo;s valuation is not a survey. A RICS Level 2 (HomeBuyer) report
            costs around £600; a Level 3 building survey, for older or unusual homes, around £1,000.
          </li>
          <li>
            <strong>Mortgage arrangement fee:</strong> often £999, though fee-free deals exist at a slightly higher
            rate. You can usually add the fee to the loan, but you then pay interest on it.
          </li>
          <li>
            <strong>Removals and setting up:</strong> from a few hundred pounds for a van to £1,000 or more for a full
            removal firm, plus anything you need to furnish the place.
          </li>
        </ul>

        <h2>A worked example: £350,000 in England</h2>
        <p>
          A first-time buyer in England buys a £350,000 home with a 10% deposit of £35,000. They pay £1,500 in legal
          fees, £600 for a HomeBuyer survey, a £999 mortgage fee and £1,000 for removals, and keep a 10% buffer for
          surprises:
        </p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deposit (10%)</td>
              <td>£35,000</td>
            </tr>
            <tr>
              <td>Stamp Duty (first-time buyer relief)</td>
              <td>£2,500</td>
            </tr>
            <tr>
              <td>Legal fees</td>
              <td>£1,500</td>
            </tr>
            <tr>
              <td>HomeBuyer survey</td>
              <td>£600</td>
            </tr>
            <tr>
              <td>Mortgage fee</td>
              <td>£999</td>
            </tr>
            <tr>
              <td>Removals</td>
              <td>£1,000</td>
            </tr>
            <tr>
              <td>10% contingency on the costs</td>
              <td>£659.90</td>
            </tr>
            <tr>
              <td>
                <strong>Total cash needed</strong>
              </td>
              <td>
                <strong>£42,258.90</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          On top of the deposit, the costs come to about £7,259. Without first-time buyer relief, the same purchase
          would need £47,758.90, because Stamp Duty would be £7,500 instead of £2,500.
        </p>

        <h2>4. The monthly payment</h2>
        <p>
          The mortgage in our example is £315,000. At an interest rate of 4.5%, the monthly repayment depends heavily on
          the term:
        </p>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Monthly payment</th>
              <th>Total paid over the term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25 years</td>
              <td>£1,750.87</td>
              <td>£525,262</td>
            </tr>
            <tr>
              <td>30 years</td>
              <td>£1,596.06</td>
              <td>£574,581</td>
            </tr>
            <tr>
              <td>35 years</td>
              <td>£1,490.76</td>
              <td>£626,119</td>
            </tr>
          </tbody>
        </table>
        <p>
          Stretching from 25 to 35 years saves about £260 a month but adds about £100,900 of interest if the rate stayed
          the same throughout. A rate of 5% instead of 4.5% on the 25-year mortgage would push the payment up to
          £1,841.46. Rates change, so try your own figures in the{" "}
          <Link href="/property/mortgage-repayment">mortgage repayment calculator</Link>, and use the{" "}
          <Link href="/property/mortgage-overpayment">overpayment calculator</Link> to see how regular overpayments
          shorten a long term.
        </p>

        <h2>5. How much can you borrow?</h2>
        <p>
          Most lenders cap borrowing at about 4 to 4.5 times household income, and some go to 5 or 5.5 times for
          higher earners or certain professions. They also stress-test whether you could afford the payments if rates
          rose, and take account of commitments such as car finance, childcare and student loan repayments. The{" "}
          <Link href="/property/mortgage-affordability">mortgage affordability calculator</Link> gives a realistic range.
        </p>

        <h2>Other routes to a first home</h2>
        <ul>
          <li>
            <strong>Shared ownership:</strong> buy a share (often 25% to 75%) and pay rent on the rest. The deposit is
            smaller, but you pay rent, service charges and a mortgage. The{" "}
            <Link href="/property/shared-ownership">shared ownership calculator</Link> adds it all up.
          </li>
          <li>
            <strong>Buying with someone else:</strong> joint incomes raise what you can borrow. For first-time buyer
            relief in England, every buyer must be a first-time buyer.
          </li>
          <li>
            <strong>Keep renting for now:</strong> buying isn&rsquo;t always cheaper. The{" "}
            <Link href="/property/rent-vs-buy">rent vs buy calculator</Link> compares the two over time.
          </li>
        </ul>

        <h2>Ongoing costs to budget for</h2>
        <p>
          Once you own the home, budget for buildings insurance (often required by the lender), council tax, energy
          and water, maintenance (a common rule of thumb is 1% of the property&rsquo;s value a year), and, for
          leasehold flats, ground rent and service charges. The{" "}
          <Link href="/property/council-tax-bands">council tax calculator</Link> estimates the bill by band.
        </p>

        <h2>The bottom line</h2>
        <p>
          For a typical first home, plan for the deposit plus roughly £5,000 to £10,000 of costs, depending on the price
          and where you buy. First-time buyer relief makes a large difference in England up to £500,000, and the
          mortgage term changes the monthly payment far more than most people expect. These figures are estimates for
          2026/27 and general guidance, not mortgage or financial advice.
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
