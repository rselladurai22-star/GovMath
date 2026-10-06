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
          <Link href="/property/council-tax-bands">council tax calculator</Link> estimates the bill by band, and if you
          live alone the{" "}
          <Link href="/property/single-person-discount">single person discount</Link> takes 25% off it.
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
  {
    slug: "sole-trader-vs-limited-company",
    title: "Sole trader or limited company in 2026/27: which leaves you with more?",
    description:
      "We ran profits from £20,000 to £150,000 through the 2026/27 rules for both. With dividend tax at 10.75% and employer NI at 15%, the answer has changed. Here are the numbers, and when a company still makes sense.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "11 min read",
    category: "Business",
    body: (
      <>
        <p>
          &ldquo;Should I go limited?&rdquo; is one of the first questions most self-employed people ask once their
          profits start to grow. For years the standard answer was yes: pay yourself a small salary, take the rest as
          dividends and keep a few thousand pounds more than a sole trader on the same profit. That answer rested on
          particular tax rates, and most of them have moved. Employer National Insurance went up to 15% in April 2025,
          the point where it starts fell to £5,000, and dividend tax rose by two percentage points in April 2026, to
          10.75% at the basic rate and 35.75% at the higher rate.
        </p>
        <p>
          So we went back to the numbers. This guide runs the same profit through both structures for the 2026/27 tax
          year, using the engines behind our{" "}
          <Link href="/business/sole-trader-tax">sole trader tax calculator</Link> and our{" "}
          <Link href="/business/dividend-vs-salary">salary vs dividend calculator</Link>. Every figure assumes
          England, Wales or Northern Ireland, no other income, no student loan and, for the company, a single director
          who takes every penny of profit out in the same year. Then we look at the cases where the answer changes,
          because they are the ones that matter in practice.
        </p>

        <h2>How each structure is taxed</h2>
        <h3>Sole trader</h3>
        <p>
          As a sole trader, you and the business are the same person for tax. Your profit (turnover less allowable
          expenses) is added to any other income and taxed through Self Assessment:
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> at 20%, 40% and 45% above the £12,570 Personal Allowance, which tapers away
            between £100,000 and £125,140.
          </li>
          <li>
            <strong>Class 4 National Insurance</strong> at 6% on profit between £12,570 and £50,270, and 2% above that.
          </li>
          <li>
            <strong>Class 2 National Insurance</strong> is no longer charged. If your profit is at least £7,105 (the
            small profits threshold) you get a State Pension credit for the year without paying. Below that you can pay
            voluntary Class 2 at £3.65 a week.
          </li>
        </ul>
        <h3>Limited company</h3>
        <p>A company is a separate legal person, so the money passes through two layers of tax on its way to you:</p>
        <ul>
          <li>
            <strong>Corporation Tax</strong> on the company&rsquo;s profit: 19% up to £50,000, 25% from £250,000, and a
            tapered rate in between (marginal relief), where each extra pound is taxed at an effective 26.5%.
          </li>
          <li>
            <strong>Salary</strong> paid to you as a director is a cost to the company, so it comes off the profit before
            Corporation Tax. It is taxed on you through PAYE, and the company pays employer National Insurance of 15% on
            pay above £5,000 a year.
          </li>
          <li>
            <strong>Dividends</strong> are paid from profit after Corporation Tax. You pay dividend tax on them after a
            £500 allowance: 10.75% in the basic rate band, 35.75% in the higher rate band and 39.35% above £125,140.
          </li>
        </ul>
        <p>
          The Employment Allowance, which knocks up to £10,500 a year off employer National Insurance, is not available
          to a company whose only paid employee is a director. That rule matters a lot for one-person companies, and we
          assume it applies throughout.
        </p>

        <h2>The best salary for a one-person company</h2>
        <p>
          Before comparing the two, we need the company&rsquo;s best split between salary and dividends. Our optimiser
          tries every salary in £100 steps (and £10 steps around the best) and keeps the one that leaves the director
          with the most cash. For every profit from £20,000 to £100,000, the winner was the same:{" "}
          <strong>a salary of £12,570</strong>, with the rest paid as dividends.
        </p>
        <p>Why that figure, when employer National Insurance starts at £5,000?</p>
        <ul>
          <li>
            A salary of £12,570 uses your whole Personal Allowance, so there is no Income Tax on it, and it sits exactly
            at the employee National Insurance threshold, so you pay no employee NI either.
          </li>
          <li>
            The company does pay employer NI on the £7,570 above £5,000: <strong>£1,135.50</strong>. But both the salary
            and that NI are deductible for Corporation Tax, and every pound of salary is a pound that is not taxed again
            as a dividend.
          </li>
          <li>
            It is well above the lower earnings limit of £6,708, so the year counts towards your State Pension.
          </li>
        </ul>
        <p>
          The difference is not huge, but it is real. On £20,000 of profit, a £12,570 salary leaves the director with{" "}
          <strong>£17,174.20</strong>; the old favourite of a £5,000 salary leaves <strong>£16,711.40</strong>, which is
          £462.80 less. On £100,000 of profit the gap is £752.66 in favour of the higher salary. If your company has
          another employee and can claim the Employment Allowance, the sums change again, and the{" "}
          <Link href="/business/dividend-vs-salary">salary vs dividend calculator</Link> will find the best salary for
          your case.
        </p>

        <h2>The head-to-head: what you keep</h2>
        <p>
          Here is the cash in your pocket at the end of 2026/27, for the same profit run through each structure. For the
          company, &ldquo;profit&rdquo; means profit before your salary, employer NI and Corporation Tax, and the salary
          is the best one found above.
        </p>
        <table>
          <thead>
            <tr>
              <th>Profit</th>
              <th>Sole trader keeps</th>
              <th>Limited company keeps</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>£20,000</td>
              <td>£18,068.20</td>
              <td>£17,174.20</td>
              <td>Sole trader +£894.00</td>
            </tr>
            <tr>
              <td>£30,000</td>
              <td>£25,468.20</td>
              <td>£24,403.45</td>
              <td>Sole trader +£1,064.75</td>
            </tr>
            <tr>
              <td>£50,000</td>
              <td>£40,268.20</td>
              <td>£38,861.95</td>
              <td>Sole trader +£1,406.25</td>
            </tr>
            <tr>
              <td>£80,000</td>
              <td>£57,711.40</td>
              <td>£55,764.87</td>
              <td>Sole trader +£1,946.53</td>
            </tr>
            <tr>
              <td>£100,000</td>
              <td>£69,311.40</td>
              <td>£65,209.62</td>
              <td>Sole trader +£4,101.78</td>
            </tr>
            <tr>
              <td>£150,000</td>
              <td>£92,040.40</td>
              <td>£87,463.54</td>
              <td>Sole trader +£4,576.86</td>
            </tr>
          </tbody>
        </table>
        <p>
          At £150,000 the optimiser picks a much larger salary, £87,610, because dividends there would fall in the
          35.75% and 39.35% bands on top of 26.5% marginal Corporation Tax. Even so, the company comes out behind.
        </p>
        <p>
          That is the headline of this guide. <strong>If you take all the profit out every year, a sole trader keeps
          more at every level we tested in 2026/27.</strong> The gap is about £900 at £20,000 of profit and grows to more
          than £4,000 at £100,000. This is before the extra running costs of a company, which we come to below and which
          widen the gap further.
        </p>

        <h2>Where the money goes: £50,000 of profit</h2>
        <p>
          To see why, it helps to follow one figure all the way through. Take £50,000 of profit.
        </p>
        <p>
          <strong>As a sole trader</strong>, Income Tax is 20% of the £37,430 above the Personal Allowance,{" "}
          <strong>£7,486</strong>, and Class 4 NI is 6% of the same slice, <strong>£2,245.80</strong>. Total tax is
          £9,731.80, and you keep <strong>£40,268.20</strong>. That is an effective rate of 19.5%.
        </p>
        <p>
          <strong>As a limited company</strong>, the money goes through four steps:
        </p>
        <ol>
          <li>
            The company pays you a £12,570 salary and £1,135.50 of employer NI. That leaves £36,294.50 of profit.
          </li>
          <li>
            Corporation Tax at 19% on that is <strong>£6,895.96</strong>, leaving £29,398.55 to pay out as dividends.
          </li>
          <li>
            The dividends sit on top of your salary. The first £500 is covered by the dividend allowance; the rest is in
            the basic rate band at 10.75%: <strong>£3,106.59</strong> of dividend tax.
          </li>
          <li>
            You keep the salary of £12,570 plus dividends of £29,398.55 less dividend tax: <strong>£38,861.95</strong>.
          </li>
        </ol>
        <p>
          Total tax through the company is <strong>£11,138.05</strong> (£1,135.50 employer NI, £6,895.96 Corporation Tax
          and £3,106.59 dividend tax), against £9,731.80 as a sole trader. The company route loses mainly because 19%
          Corporation Tax plus 10.75% dividend tax adds up to a combined rate of almost 28% on each extra pound of
          profit, while a basic-rate sole trader pays 20% Income Tax plus 6% Class 4 NI: 26%.
        </p>

        <h2>Why the old advantage has gone</h2>
        <p>
          Line those two combined rates up band by band and the picture is clear. For each extra £1 of profit:
        </p>
        <table>
          <thead>
            <tr>
              <th>Where the pound falls</th>
              <th>Sole trader</th>
              <th>Company (profit under £50,000)</th>
              <th>Company (marginal relief)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic rate</td>
              <td>26p (20% + 6%)</td>
              <td>27.7p (19%, then 10.75%)</td>
              <td>34.4p (26.5%, then 10.75%)</td>
            </tr>
            <tr>
              <td>Higher rate</td>
              <td>42p (40% + 2%)</td>
              <td>48.0p (19%, then 35.75%)</td>
              <td>52.8p (26.5%, then 35.75%)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Before April 2022 the company figures in this table were much lower: dividend tax was 7.5% and 32.5%, and
          Corporation Tax was a flat 19% at every level of profit. The rise to a 25% main rate (with the 26.5% marginal
          band between £50,000 and £250,000), two rises in dividend tax, the cut in the dividend allowance from £2,000
          to £500, and the higher employer NI have together closed the gap and then reversed it.
        </p>
        <p>
          Sole traders have had the opposite treatment. Class 4 NI at the main rate fell from 9% to 6% in April 2024, and
          Class 2 was abolished as a compulsory charge. That 3-point cut alone is worth over £1,100 a year to a sole
          trader making £50,270.
        </p>

        <h2>So when does a limited company still make sense?</h2>
        <p>
          The table above assumes every pound is drawn out each year. Real businesses often do something different, and
          there are some situations where a company still comes out ahead, or where the tax is not the deciding factor.
        </p>

        <h3>1. You leave profit in the company</h3>
        <p>
          This is the big one. A sole trader pays Income Tax on all the profit, whether they spend it or leave it in the
          business bank account. A company only creates personal tax when it pays you. If you can live on less than the
          business earns, a company lets you stop at the top of the basic rate band and leave the rest inside, taxed only
          at Corporation Tax for now.
        </p>
        <p>
          Take £100,000 of profit. The director takes a £12,570 salary and £37,700 of dividends, which fills the basic
          rate band exactly. Corporation Tax is £19,118.04 and dividend tax on the £37,700 is £3,999. The director has{" "}
          <strong>£46,271 in hand</strong>, and <strong>£29,476.46</strong> stays in the company after tax. Total tax
          paid so far is £24,252.54. A sole trader on the same profit pays £30,688.60.
        </p>
        <p>
          That looks like a saving of about £6,400, but it is a deferral, not a saving. When the retained money is paid
          out later it will be taxed as dividends. The company route only wins overall if you take that money out in a
          later year when you have room in your basic rate band (for example in a lean year, a career break or early
          retirement), use it to grow the business, or pay it into a pension (see below). If you just draw it next year
          at the higher rate, you end up worse off than a sole trader.
        </p>

        <h3>2. You want to put a lot into a pension</h3>
        <p>
          A company can pay into your pension as an <em>employer contribution</em>. It is a business expense, so it
          reduces Corporation Tax, and there is no National Insurance or Income Tax on it. A sole trader gets tax relief
          on personal contributions instead. We compared the two at £80,000 of profit with £10,000 going into a pension:
        </p>
        <ul>
          <li>
            <strong>Company:</strong> £10,000 employer contribution, £12,570 salary, the rest as dividends. The director
            keeps £51,042.50 in cash plus the £10,000 pension: <strong>£61,042.50</strong> in total value.
          </li>
          <li>
            <strong>Sole trader:</strong> pays £8,000 into a personal pension, which the provider tops up to £10,000, and
            claims higher rate relief through Self Assessment. Tax falls to £20,288.60. Cash left after the £8,000
            contribution is £51,711.40, plus the £10,000 pension: <strong>£61,711.40</strong>.
          </li>
        </ul>
        <p>
          So even with a pension, the sole trader is still slightly ahead at this level of profit. The pension makes the
          gap much smaller (£668.90 rather than £1,946.53), and the more you pay in, the closer the two get. It also
          avoids the 26.5% marginal Corporation Tax band. Our{" "}
          <Link href="/investing/pension-tax-relief">pension tax relief calculator</Link> shows how each method of relief
          works for a personal contribution.
        </p>

        <h3>3. Limited liability matters to you</h3>
        <p>
          A sole trader is personally liable for every debt of the business. If a contract goes wrong or a customer sues,
          your house and savings are exposed. A company&rsquo;s debts belong to the company, so your personal assets are
          generally protected, unless you have given a personal guarantee (banks and landlords often ask for one) or have
          traded wrongfully. For businesses with real risk, such as building work, manufacturing, or anything with large
          contracts or stock, this protection can be worth more than any tax difference. Insurance covers some of the
          same ground for a sole trader, so price both.
        </p>

        <h3>4. Clients insist on it</h3>
        <p>
          Some larger clients will only work with limited companies, especially for contracting in IT, engineering and
          consulting. If you work through your own company for a medium or large client, the off-payroll working rules
          (IR35) may apply. If the client decides you are &ldquo;inside IR35&rdquo;, it deducts tax and National
          Insurance as if you were an employee, and most of the dividend planning above disappears. The{" "}
          <Link href="/tax-and-salary/ir35-take-home">IR35 take-home calculator</Link> compares inside and outside for
          the same day rate.
        </p>

        <h3>5. You are bringing in investors or co-owners</h3>
        <p>
          Shares make it easy to bring in a partner or an investor, give staff a stake, or sell the business later. A
          sale of company shares may qualify for Business Asset Disposal Relief, which taxes the gain at a reduced Capital
          Gains Tax rate (14% from April 2025 and 18% from April 2026) on up to £1 million over your lifetime. A sole
          trader can also claim the relief when selling the whole business, but selling a company is usually simpler.
        </p>

        <h2>The costs of running a company</h2>
        <p>
          The tax comparison above does not include the extra work and cost of a company, which all push further in the
          sole trader&rsquo;s favour:
        </p>
        <ul>
          <li>
            <strong>Accountancy fees.</strong> Statutory accounts, a Corporation Tax return, payroll and your own Self
            Assessment return typically cost noticeably more than a sole trader&rsquo;s single return.
          </li>
          <li>
            <strong>Companies House filings.</strong> Annual accounts and a confirmation statement every year, with a fee,
            and automatic late filing penalties for accounts.
          </li>
          <li>
            <strong>Payroll.</strong> Even a single director&rsquo;s salary has to be reported through PAYE in real time,
            every time it is paid.
          </li>
          <li>
            <strong>Public record.</strong> Your name, a service address and the company&rsquo;s accounts are visible on
            the public register. Identity verification for directors is now required too.
          </li>
          <li>
            <strong>Keeping money separate.</strong> The company&rsquo;s money is not yours. Taking it out other than as
            salary or a properly declared dividend creates a director&rsquo;s loan, which has its own tax charges if it is
            not repaid in time.
          </li>
        </ul>
        <p>
          Sole traders are not free of admin either. From April 2026, sole traders and landlords with qualifying income
          over £50,000 must use Making Tax Digital for Income Tax, which means digital records and quarterly updates. The
          line drops to £30,000 from April 2027 and £20,000 from April 2028. Making Tax Digital does not apply to a
          company&rsquo;s Corporation Tax, though directors still file their own Self Assessment returns.
        </p>

        <h2>Things that are the same either way</h2>
        <p>Some questions people expect to tip the balance are actually neutral:</p>
        <ul>
          <li>
            <strong>Expenses.</strong> The same broad rule applies to both: costs incurred wholly and exclusively for the
            business are deductible. A company can pay for some things a sole trader cannot claim easily (such as a
            company-provided mobile phone), but it also faces benefit-in-kind rules on others, such as company cars. The{" "}
            <Link href="/business/allowable-expenses">allowable expenses checker</Link> covers the main categories.
          </li>
          <li>
            <strong>VAT.</strong> Registration depends on turnover, not structure. The threshold is £90,000 for both. See
            the <Link href="/business/vat-calculator">VAT calculator</Link> and the{" "}
            <Link href="/business/flat-rate-vat">Flat Rate Scheme calculator</Link>.
          </li>
          <li>
            <strong>Mileage.</strong> Both can use HMRC&rsquo;s approved mileage rates of 45p a mile for the first 10,000
            business miles and 25p after that. Our{" "}
            <Link href="/business/business-mileage">business mileage calculator</Link> works them out.
          </li>
          <li>
            <strong>Mortgages.</strong> Lenders look at both, but they often want two years of accounts or tax
            calculations. A company director may be assessed on salary plus dividends, or on salary plus their share of
            profit, depending on the lender.
          </li>
        </ul>

        <h2>Timing: when the tax is due</h2>
        <p>Cash flow is different too, which can matter as much as the total:</p>
        <ul>
          <li>
            <strong>Sole traders</strong> pay through Self Assessment. Once the bill passes £1,000, payments on account
            kick in: half of last year&rsquo;s bill on 31 January and half on 31 July, with a balancing payment the next
            31 January. In the first year this can mean paying 150% of a year&rsquo;s tax in one January. The{" "}
            <Link href="/business/payment-on-account">payment on account calculator</Link> sets out the dates and
            amounts.
          </li>
          <li>
            <strong>Companies</strong> pay Corporation Tax nine months and one day after the end of the accounting
            period (unless profits are large enough for quarterly instalments). Dividend tax is paid by the director
            through Self Assessment, with the same payment on account rules.
          </li>
        </ul>

        <h2>Turning a sole trade into a company</h2>
        <p>
          If you already trade on your own and decide to incorporate, the business can be transferred to the new
          company. A few points to check with an accountant first:
        </p>
        <ul>
          <li>
            Your final sole trader year ends on the date you stop, and its profit is taxed in the normal way.
          </li>
          <li>
            Transferring goodwill or other assets to the company can create a Capital Gains Tax charge. Incorporation
            relief can defer it if the whole business goes across in exchange for shares.
          </li>
          <li>
            Contracts, insurance, the bank account, VAT registration and any licences may all need to move or be
            reissued in the company&rsquo;s name.
          </li>
          <li>
            Watch out for the Employment Allowance rule: a company whose only employee is the director cannot claim it,
            so employer NI costs are higher than many online guides suggest.
          </li>
        </ul>

        <h2>Checklist: which is right for you?</h2>
        <p>Stay a sole trader if most of these are true:</p>
        <ul>
          <li>You spend most of what the business earns each year.</li>
          <li>Your business has little risk of large claims or debts.</li>
          <li>You want simple admin and low accountancy costs.</li>
          <li>Your clients are happy to work with sole traders.</li>
        </ul>
        <p>Consider a company if several of these apply:</p>
        <ul>
          <li>You can leave a meaningful part of the profit in the business each year.</li>
          <li>You plan to put large sums into a pension.</li>
          <li>You want limited liability, or clients require a company.</li>
          <li>You expect to take on investors or sell the business.</li>
        </ul>

        <h2>The bottom line</h2>
        <p>
          On 2026/27 rates, a one-person company that pays out all its profit leaves its owner with less than a sole
          trader at every level of profit we tested, from about £900 less at £20,000 to more than £4,000 less at
          £100,000, before the company&rsquo;s extra costs. A company is no longer a tax win by default. It earns its place
          when you can leave profit inside it, use employer pension contributions, need limited liability or have clients
          who insist on it. Run your own figures through the{" "}
          <Link href="/business/sole-trader-tax">sole trader tax calculator</Link>, the{" "}
          <Link href="/business/dividend-vs-salary">salary vs dividend calculator</Link> and the{" "}
          <Link href="/business/corporation-tax">Corporation Tax calculator</Link>, and speak to an accountant before you
          change structure. These figures are estimates for 2026/27 and general guidance, not tax advice.
        </p>
      </>
    ),
  },
  {
    slug: "universal-credit-and-work",
    title: "Working on Universal Credit in 2026/27: how much more do extra hours really pay?",
    description:
      "The work allowance, the 55% taper, tax and National Insurance all take a share of each extra pound. We follow a single parent from 0 to 37.5 hours at the National Living Wage to show what work is really worth.",
    date: "2026-10-06",
    dateLabel: "6 October 2026",
    readingTime: "11 min read",
    category: "Benefits",
    body: (
      <>
        <p>
          Universal Credit was designed so that work always pays. In one sense it does: every extra hour you work leaves
          you better off than before. But how much better off is a question most people can&rsquo;t answer, because the
          award changes every month with your pay, and tax, National Insurance and the Universal Credit taper all take a
          share of each extra pound. Someone on Universal Credit can easily keep less than half of a pay rise, and the
          rules about when that happens are not obvious.
        </p>
        <p>
          This guide explains how earnings affect Universal Credit in the 2026/27 rates, then follows one household
          from no work to full time to show what each extra hour is worth. Every figure comes from the engine behind our{" "}
          <Link href="/benefits/universal-credit">Universal Credit calculator</Link> and our{" "}
          <Link href="/benefits/universal-credit-taper">Universal Credit taper calculator</Link>, so you can put in your
          own details and check them.
        </p>

        <h2>The three rules that link pay to Universal Credit</h2>
        <p>
          Universal Credit starts from a <strong>maximum award</strong>: the standard allowance for you (and your
          partner), plus elements for children, housing costs, childcare, disability, health or caring. Your earnings
          then reduce that maximum in three steps.
        </p>
        <h3>1. The work allowance</h3>
        <p>
          Some households can earn a set amount each month before their Universal Credit is touched at all. This is the{" "}
          <strong>work allowance</strong>. You only get one if you are responsible for a child, or if you (or your
          partner) have limited capability for work. For 2026/27 it is:
        </p>
        <table>
          <thead>
            <tr>
              <th>Your Universal Credit includes</th>
              <th>Work allowance a month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Help with housing costs</td>
              <td>£427</td>
            </tr>
            <tr>
              <td>No help with housing costs</td>
              <td>£710</td>
            </tr>
          </tbody>
        </table>
        <p>
          Single people and couples without children, and without a health condition that limits their work, get no work
          allowance. For them the taper starts from the first pound of earnings.
        </p>
        <h3>2. The 55% taper</h3>
        <p>
          For every £1 of earnings above the work allowance, Universal Credit falls by <strong>55p</strong>. This is the
          taper. It was 63% until November 2021, when it was cut to 55%.
        </p>
        <h3>3. It uses take-home pay</h3>
        <p>
          The taper is applied to your <strong>net</strong> earnings: what is left after Income Tax, National Insurance
          and pension contributions. That matters. Once you pay tax and NI, part of each extra pound has already gone
          before Universal Credit looks at it, so the taper bites on a smaller amount. It also means pension
          contributions reduce the earnings Universal Credit counts, which we come back to below.
        </p>

        <h2>Our example household</h2>
        <p>To make the numbers concrete, here is the household we will follow through the rest of this guide:</p>
        <ul>
          <li>A single parent aged 25 or over, with one child born after April 2017.</li>
          <li>Rents from a housing association for £550 a month, with no spare bedrooms.</li>
          <li>Paid the National Living Wage of £12.71 an hour, with no pension contributions.</li>
          <li>Lives in England, has no savings over £6,000 and no other income.</li>
        </ul>
        <p>Their maximum Universal Credit for 2026/27 is made up of:</p>
        <table>
          <thead>
            <tr>
              <th>Element</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard allowance (single, 25 or over)</td>
              <td>£424.90</td>
            </tr>
            <tr>
              <td>Child element</td>
              <td>£303.94</td>
            </tr>
            <tr>
              <td>Housing element (rent)</td>
              <td>£550.00</td>
            </tr>
            <tr>
              <td>
                <strong>Maximum award</strong>
              </td>
              <td>
                <strong>£1,278.84</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Because the award includes housing costs and there is a child, the work allowance is £427 a month. Child
          Benefit is paid on top and does not count as income for Universal Credit, so we leave it out of the figures
          below.
        </p>

        <h2>From 0 to 37.5 hours a week</h2>
        <p>
          Here is the household&rsquo;s monthly income at different weekly hours. Pay is worked out as hourly rate ×
          hours × 52 ÷ 12. &ldquo;Total&rdquo; is take-home pay plus Universal Credit.
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours a week</th>
              <th>Gross pay</th>
              <th>Take-home pay</th>
              <th>Universal Credit</th>
              <th>Total a month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>£0</td>
              <td>£0</td>
              <td>£1,278.84</td>
              <td>£1,278.84</td>
            </tr>
            <tr>
              <td>8</td>
              <td>£440.61</td>
              <td>£440.61</td>
              <td>£1,271.35</td>
              <td>£1,711.97</td>
            </tr>
            <tr>
              <td>16</td>
              <td>£881.23</td>
              <td>£881.23</td>
              <td>£1,029.02</td>
              <td>£1,910.24</td>
            </tr>
            <tr>
              <td>20</td>
              <td>£1,101.53</td>
              <td>£1,086.40</td>
              <td>£916.17</td>
              <td>£2,002.57</td>
            </tr>
            <tr>
              <td>25</td>
              <td>£1,376.92</td>
              <td>£1,284.68</td>
              <td>£807.12</td>
              <td>£2,091.80</td>
            </tr>
            <tr>
              <td>30</td>
              <td>£1,652.30</td>
              <td>£1,482.96</td>
              <td>£698.06</td>
              <td>£2,181.02</td>
            </tr>
            <tr>
              <td>37.5</td>
              <td>£2,065.38</td>
              <td>£1,780.37</td>
              <td>£534.49</td>
              <td>£2,314.86</td>
            </tr>
          </tbody>
        </table>
        <p>A few things stand out.</p>
        <ul>
          <li>
            <strong>The first hours pay best by far.</strong> Eight hours a week adds £433.13 to the household&rsquo;s
            monthly income, because almost all of it falls inside the £427 work allowance. Universal Credit drops by only
            £7.49.
          </li>
          <li>
            <strong>After that, each extra hour is worth much less.</strong> Going from 8 to 16 hours adds another
            £198.27 a month, less than half of what the first 8 hours added, because almost every extra pound is now
            above the work allowance and loses 55p to the taper.
          </li>
          <li>
            <strong>Going from 16 hours to full time adds £404.62 a month.</strong> More than doubling the hours from 16
            to 37.5 raises total income by about a fifth.
          </li>
          <li>
            <strong>Universal Credit is still paid at full time.</strong> At 37.5 hours this household still gets
            £534.49 a month. Their award would only reach zero at take-home pay of about £2,752 a month.
          </li>
        </ul>
        <p>
          You can see the same shape for your own hours, rent and family in the{" "}
          <Link href="/benefits/universal-credit-taper">Universal Credit taper calculator</Link>, which draws the full
          curve from no work to the point where Universal Credit stops.
        </p>

        <h2>The real marginal rate: what you keep from a pay rise</h2>
        <p>
          The share of each extra pound you lose to tax, National Insurance and the taper together is your{" "}
          <em>effective marginal rate</em>. On Universal Credit it depends on where your pay sits:
        </p>
        <table>
          <thead>
            <tr>
              <th>Where your earnings are</th>
              <th>Lost from each extra £1</th>
              <th>You keep</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inside the work allowance, below the tax threshold</td>
              <td>0p</td>
              <td>£1.00</td>
            </tr>
            <tr>
              <td>Above the work allowance, below the tax threshold</td>
              <td>55p (taper)</td>
              <td>45p</td>
            </tr>
            <tr>
              <td>Above the work allowance and paying basic rate tax and NI</td>
              <td>28p tax and NI, then 55% of the 72p left: 67.6p</td>
              <td>32.4p</td>
            </tr>
          </tbody>
        </table>
        <p>
          That last row is where most full-time workers on Universal Credit are. In our example, a £100 a month pay rise
          at 30 hours adds just <strong>£32.40</strong> to the household&rsquo;s income: £28 goes in Income Tax and
          National Insurance, and Universal Credit falls by £39.60. A basic rate taxpayer who is not on Universal Credit
          would keep £72 of the same rise.
        </p>
        <p>
          The step from 16 to 20 hours is in between. It adds £220.31 of gross pay a month and the household keeps
          £92.33, about 42p in the pound, because only the hours above the tax threshold are taxed.
        </p>

        <h2>Single with no children: no work allowance</h2>
        <p>
          The picture is harsher for single people without children, because there is no work allowance. Take someone
          aged 25 or over renting from a housing association for £450 a month, also on £12.71 an hour. Their maximum
          award is £874.90 a month (£424.90 standard allowance plus £450 housing).
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours a week</th>
              <th>Take-home pay</th>
              <th>Universal Credit</th>
              <th>Total a month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>£0</td>
              <td>£874.90</td>
              <td>£874.90</td>
            </tr>
            <tr>
              <td>16</td>
              <td>£881.23</td>
              <td>£390.23</td>
              <td>£1,271.45</td>
            </tr>
            <tr>
              <td>30</td>
              <td>£1,482.96</td>
              <td>£59.27</td>
              <td>£1,542.23</td>
            </tr>
          </tbody>
        </table>
        <p>
          Here the taper applies from the first pound. Sixteen hours of work adds £396.55 a month, 45p for every pound
          earned. By 30 hours Universal Credit has almost gone, and it stops entirely at take-home pay of about £1,591 a
          month. From that point on, this person keeps 72p of each extra pound, just like any other basic rate taxpayer.
        </p>

        <h2>Childcare: the element that changes the sums</h2>
        <p>
          If you are working and pay a registered childminder, nursery or after-school club, Universal Credit can pay{" "}
          <strong>85% of the cost</strong>, up to a monthly limit of <strong>£1,071.09 for one child</strong> and{" "}
          <strong>£1,836.16 for two or more</strong>. Every adult in the household must be in paid work (there is no
          minimum number of hours), and the costs must be for the hours you work or prepare for work.
        </p>
        <p>
          The childcare element is added to the maximum award, so as long as some Universal Credit is still being paid,
          each £100 of childcare brings £85 more in Universal Credit. If our single parent working 30 hours paid £600 a
          month for childcare, their Universal Credit would rise by £510, from £698.06 to £1,208.06. The childcare element
          is also not reduced by the benefit cap.
        </p>
        <p>
          There are two things to watch. First, you pay the provider and claim it back, so you need to report the costs
          in your journal, with proof, by the end of the assessment period after the one in which you paid. Second, you
          cannot get the childcare element and Tax-Free Childcare at the same time. For lower earners Universal Credit
          is almost always worth more, but once your award gets small, Tax-Free Childcare (20% top-up, up to £2,000 a
          year per child) can win. Compare both in the{" "}
          <Link href="/benefits/tax-free-childcare">Tax-Free Childcare calculator</Link>, and check the{" "}
          <Link href="/benefits/free-childcare-hours">free childcare hours checker</Link> too, since funded hours reduce
          what you pay in the first place.
        </p>

        <h2>Pension contributions are cheaper on Universal Credit</h2>
        <p>
          Because Universal Credit uses take-home pay after pension contributions, paying into a workplace pension costs
          you less than it seems. In our example at 30 hours, joining a pension at 5% of pay means £82.62 a month going
          into the pension, but the household&rsquo;s spending money only falls by £26.77 (from £2,181.02 to £2,154.25).
          Lower Income Tax and National Insurance and higher Universal Credit make up the rest, and the employer adds
          its own contribution on top. For many people on Universal Credit, a workplace pension is one of the best-value
          savings there is. The{" "}
          <Link href="/investing/workplace-pension">workplace pension calculator</Link> shows what auto-enrolment
          builds up over time.
        </p>

        <h2>The benefit cap and the 16-hour line</h2>
        <p>
          The benefit cap limits the total of most benefits a household of working age can receive. For 2026/27 outside
          London it is £22,020 a year for couples and families (£1,835 a month) and £14,753 for single people without
          children. In London it is £25,323 and £16,967.
        </p>
        <p>
          The cap does not apply if household take-home earnings are at least <strong>£881 a month</strong>, which is
          roughly 16 hours a week at the National Living Wage. Sixteen hours at £12.71 is £881.23 a month, just over the
          line. For families with high rents in expensive areas, crossing that line can be worth far more than the extra
          pay itself, because it can lift the cap entirely. The cap also does not apply if someone gets the health element
          for limited capability for work and work-related activity, the carer element, or certain disability benefits.
          Check your household with the <Link href="/benefits/benefit-cap">benefit cap calculator</Link>.
        </p>

        <h2>Monthly assessment periods and paydays</h2>
        <p>
          Universal Credit is worked out over monthly <strong>assessment periods</strong>, and it counts the pay you
          actually receive in each one, not what you earn on average. If you are paid monthly, that usually works
          smoothly. If you are paid weekly, every two weeks or every four weeks, some assessment periods will contain an
          extra payday:
        </p>
        <ul>
          <li>Weekly pay: some months have five paydays instead of four.</li>
          <li>Four-weekly pay: once a year a month has two paydays.</li>
        </ul>
        <p>
          In those months your earnings look higher and your Universal Credit drops, sometimes to zero, then goes back up
          the next month. Over a year it roughly evens out, but it can make budgeting hard. If your award drops to nil
          because of an extra payday, you do not usually need to make a new claim, but check your journal. A very large
          one-off payment, such as a big bonus, can also be carried forward as &ldquo;surplus earnings&rdquo; and reduce
          your award the following month.
        </p>

        <h2>Self-employed on Universal Credit</h2>
        <p>
          If you are self-employed, you report your actual business income and expenses each month, and the same taper
          applies to the profit. After the first 12 months of a business (the start-up period), Universal Credit may
          assume you earn at least the <strong>minimum income floor</strong>, roughly what an employee on the National
          Living Wage would earn for the hours you are expected to work, even if your real profit is lower. This can
          sharply reduce the award in a quiet month. It does not apply in the start-up period, or if you have limited
          capability for work. Our <Link href="/business/sole-trader-tax">sole trader tax calculator</Link> works out the
          tax and National Insurance side.
        </p>

        <h2>Other things that change the picture</h2>
        <ul>
          <li>
            <strong>Savings.</strong> Savings between £6,000 and £16,000 reduce Universal Credit by £4.35 a month for
            each £250 (or part of £250). Above £16,000 you can&rsquo;t usually get Universal Credit at all.
          </li>
          <li>
            <strong>A partner&rsquo;s earnings.</strong> Couples are assessed together, so both incomes count, and the
            household gets only one work allowance.
          </li>
          <li>
            <strong>Private renting.</strong> If you rent privately, the housing element is capped at the Local Housing
            Allowance for your area and bedroom size, which has been frozen since April 2024 rates. Look yours up with the{" "}
            <Link href="/benefits/local-housing-allowance">Local Housing Allowance checker</Link>.
          </li>
          <li>
            <strong>Council Tax.</strong> Universal Credit does not cover Council Tax, but your council&rsquo;s Council
            Tax Reduction scheme might. It usually has its own earnings rules. Estimate it with the{" "}
            <Link href="/benefits/council-tax-reduction">Council Tax Reduction calculator</Link>.
          </li>
          <li>
            <strong>Under 25.</strong> The standard allowance is lower: £338.58 a month for a single person under 25.
          </li>
          <li>
            <strong>Scotland.</strong> Universal Credit rules are the same, but Scottish Income Tax has different bands,
            so take-home pay at the same gross wage is slightly different. Scotland also pays the Scottish Child Payment
            on top, which does not affect Universal Credit.
          </li>
        </ul>

        <h2>Ways to keep more of your pay</h2>
        <ul>
          <li>
            <strong>Use the whole work allowance.</strong> If you have a work allowance, earnings up to that level are
            not tapered at all. If you can only work a few hours, these are the most valuable ones.
          </li>
          <li>
            <strong>Claim all your childcare costs.</strong> Report them every assessment period with receipts, and do
            not let a deadline pass.
          </li>
          <li>
            <strong>Join the workplace pension.</strong> On Universal Credit it costs you much less than it adds to
            your pension.
          </li>
          <li>
            <strong>Report changes on time.</strong> Overpayments are recovered from future awards, which can leave you
            short later. Underpayments may only be backdated in limited cases.
          </li>
          <li>
            <strong>Check you are on the right tax code.</strong> An emergency tax code reduces your take-home pay. Your
            Universal Credit then rises to make up part of it, but you still lose out until it is fixed. The{" "}
            <Link href="/tax-and-salary/tax-code-decoder">tax code decoder</Link> explains what yours means.
          </li>
          <li>
            <strong>Check your wage.</strong> If you are 21 or over, you are entitled to at least £12.71 an hour from
            April 2026. The <Link href="/tax-and-salary/minimum-wage">minimum wage checker</Link> tests your pay,
            including deductions for uniforms and accommodation.
          </li>
        </ul>

        <h2>The bottom line</h2>
        <p>
          On Universal Credit, work always pays, but the amount it pays changes sharply with your hours. The first hours
          inside the work allowance are worth almost every penny. Above it, you keep around 45p of each extra pound, and
          once you also pay Income Tax and National Insurance, around 32p. Childcare costs, pension contributions and the
          benefit cap can each shift the sums by hundreds of pounds a month, so it is worth running your own figures
          before you change your hours. Try the{" "}
          <Link href="/benefits/universal-credit">Universal Credit calculator</Link> and the{" "}
          <Link href="/benefits/universal-credit-taper">Universal Credit taper calculator</Link>. These figures use
          2026/27 rates and are estimates for general guidance, not benefits advice. For help with your own claim, contact
          Citizens Advice or your local welfare rights service.
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
