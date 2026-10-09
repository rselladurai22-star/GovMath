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
  body: ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "salary-sacrifice-worth-it",
    title: "Is salary sacrifice worth it? What it really saves in 2026/27",
    seoTitle: "Is Salary Sacrifice Worth It? 2026/27 Figures",
    description:
      "Salary sacrifice cuts Income Tax, NI and student loan repayments. Worked 2026/27 examples for pensions, Cycle to Work and other schemes, and the catches.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "8 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Salary sacrifice means agreeing with your employer to give up part of your salary in return for a benefit,
          usually a bigger pension contribution. Because the salary you give up is never paid to you, you pay no Income
          Tax, no National Insurance and no student loan repayment on it. The result is that a £1,000 pension
          contribution can cost you only £580 to £720 of take-home pay, and less still in some salary bands.
        </p>
        <p>
          This guide works through real 2026/27 examples, all from the same engine as our{" "}
          <Link href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>, and explains the catches:
          the minimum wage rule, the effect on mortgages and other benefits, and the National Insurance cap planned for
          2029.
        </p>

        <h2>How salary sacrifice saves money</h2>
        <p>
          Compare two ways of putting £1,500 a year into a workplace pension on a £30,000 salary in England. Paid out of
          your salary under the &ldquo;net pay&rdquo; or &ldquo;relief at source&rdquo; methods, you get Income Tax
          relief but still pay National Insurance on the full £30,000. By salary sacrifice, your salary becomes £28,500
          and the £1,500 goes straight into the pension, so both tax and National Insurance fall.
        </p>
        <table>
          <thead>
            <tr>
              <th>£30,000 salary, £1,500 sacrificed into a pension</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Take-home pay before</td><td>£25,119.60</td></tr>
            <tr><td>Take-home pay after</td><td>£24,039.60</td></tr>
            <tr><td>Fall in take-home pay</td><td>£1,080</td></tr>
            <tr><td>Income Tax saved</td><td>£300</td></tr>
            <tr><td>National Insurance saved</td><td>£120</td></tr>
            <tr><td>Paid into your pension</td><td>£1,500</td></tr>
          </tbody>
        </table>
        <p>
          So £1,500 goes into your pension for £1,080 out of your pocket: a saving of £420, or 28% of the amount
          sacrificed. That 28% is simply the basic rate of tax (20%) plus the main rate of employee National Insurance
          (8%).
        </p>

        <h2>What it saves at different salaries</h2>
        <p>
          The saving on each pound you sacrifice is your marginal rate of tax, National Insurance and student loan on
          the slice of salary you give up. Four 2026/27 examples, each sacrificing a pension contribution in England,
          Wales or Northern Ireland:
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary and sacrifice</th>
              <th>Cost to you</th>
              <th>Saving</th>
              <th>Saving as a share</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£30,000, sacrifice £1,500</td><td>£1,080</td><td>£420</td><td>28%</td></tr>
            <tr><td>£45,000 with a Plan 2 loan, sacrifice £2,250</td><td>£1,417.50</td><td>£832.50</td><td>37%</td></tr>
            <tr><td>£60,000, sacrifice £3,000</td><td>£1,740</td><td>£1,260</td><td>42%</td></tr>
            <tr><td>£105,000, sacrifice £5,000</td><td>£1,900</td><td>£3,100</td><td>62%</td></tr>
          </tbody>
        </table>
        <p>
          The Plan 2 example saves an extra £202.50 because student loan repayments are 9% of earnings above the
          threshold, and sacrificed salary is not counted. The £105,000 example is the most striking: bringing income
          back down to £100,000 restores £2,500 of Personal Allowance, so £5,000 goes into the pension for just £1,900
          of take-home pay. Our guide to the <Link href="/blog/100k-tax-trap">£100,000 tax trap</Link> explains why.
        </p>
        <p>
          In Scotland the saving can be larger, because the Scottish intermediate and higher rates are 21% and 42%. On
          £45,000 with £2,250 sacrificed, a Scottish taxpayer saves £933.48 against £630 for the same salary elsewhere
          in the UK (without a student loan).
        </p>

        <h2>Your employer saves too</h2>
        <p>
          Employers pay 15% National Insurance on earnings above £5,000 a year. When you sacrifice £1,500, your employer
          saves £225 of its own National Insurance. Some employers add part or all of that saving to your pension. If
          yours adds all of it, the £30,000 example puts £1,725 into your pension for the same £1,080 of take-home pay.
          It is worth asking HR whether your employer shares its saving.
        </p>

        <h2>Cycle to Work and other schemes</h2>
        <p>
          Pensions are not the only exempt benefit. Under the Cycle to Work scheme, giving up £1,000 of a £30,000 salary
          for a bike costs £720 of take-home pay, a saving of £280, because tax and National Insurance both fall.
          Electric car schemes work in a similar way, but you pay company car tax on the car, so use the{" "}
          <Link href="/uk/vehicles/ev-salary-sacrifice">EV salary sacrifice calculator</Link> for those.
        </p>
        <p>
          Most other benefits fall under the &ldquo;optional remuneration&rdquo; rules. For them you still pay Income
          Tax on the salary you gave up, so only National Insurance falls. Sacrificing £1,200 of a £30,000 salary for
          such a benefit saves just £96 a year: the 8% National Insurance.
        </p>

        <h2>The catches</h2>
        <h3>You cannot go below the minimum wage</h3>
        <p>
          A sacrifice must not take your pay below the National Living Wage, £12.71 an hour for workers aged 21 and
          over from April 2026. On £26,000 for 37.5 hours a week, sacrificing £1,500 would leave £12.56 an hour, so your
          employer cannot agree it. A sacrifice of £1,000 leaves £12.82 an hour and is allowed.
        </p>
        <h3>A lower salary can affect other things</h3>
        <ul>
          <li>
            <strong>Mortgages:</strong>{" "}lenders may use your salary after sacrifice when working out how much you can
            borrow.
          </li>
          <li>
            <strong>Statutory pay:</strong>{" "}Statutory Maternity Pay, Statutory Sick Pay and similar payments depend on
            your earnings, so a big sacrifice can reduce them or make you ineligible.
          </li>
          <li>
            <strong>Life cover and pay rises:</strong>{" "}some employers base life insurance or percentage pay rises on
            the salary after sacrifice. Check your scheme&rsquo;s rules.
          </li>
          <li>
            <strong>Universal Credit and tax credits:</strong>{" "}lower earnings can mean more help, which is usually a
            good thing, but it does change the sums.
          </li>
        </ul>
        <h3>The National Insurance cap from April 2029</h3>
        <p>
          The government has announced that from April 2029 only the first £2,000 a year of pension contributions made
          by salary sacrifice will be free of National Insurance. Contributions above £2,000 will still save Income Tax,
          but both you and your employer will pay National Insurance on them. Until then, the full saving applies.
        </p>

        <h2>Is it worth it?</h2>
        <p>
          For most employees whose employer offers it, yes: salary sacrifice is the cheapest way to pay into a pension,
          because it saves National Insurance on top of Income Tax. It is most valuable for higher-rate taxpayers,
          anyone repaying a student loan, and anyone with income between £100,000 and £125,140. The main reasons to hold
          back are a mortgage application in the near future, a pay level close to the minimum wage, or plans to take
          family leave soon.
        </p>
        <p>
          To see the effect on your own pay, use the{" "}
          <Link href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>, or compare the different ways
          of getting tax relief with the <Link href="/uk/investing/pension-tax-relief">pension tax relief calculator</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "marriage-allowance-explained",
    title: "Marriage Allowance in 2026/27: who gains £252, and how to claim four years back",
    seoTitle: "Marriage Allowance 2026/27: Who Gets £252?",
    description:
      "A low earner can pass £1,260 of Personal Allowance to a basic rate spouse, worth up to £252 a year. Who qualifies, when it does not pay, and how to backdate.",
    date: "2026-10-07",
    dateLabel: "7 October 2026",
    readingTime: "7 min read",
    category: "Tax & Salary",
    body: (
      <>
        <p>
          Marriage Allowance is one of the easiest tax savings in the UK, and one of the most often missed. If one of
          you earns less than the Personal Allowance and the other pays tax at the basic rate, the lower earner can
          transfer <strong>£1,260</strong>{" "}of their allowance to their partner. That cuts the higher earner&rsquo;s tax
          by up to <strong>£252 a year</strong>, and you can claim for up to four earlier years too.
        </p>
        <p>
          This guide uses 2026/27 figures from the same engine as our{" "}
          <Link href="/uk/tax-and-salary/marriage-allowance">Marriage Allowance calculator</Link>, so you can check your own
          incomes there.
        </p>

        <h2>Who can claim</h2>
        <ul>
          <li>You are married or in a civil partnership. Living together is not enough.</li>
          <li>
            The lower earner&rsquo;s income is £12,570 or less (the Personal Allowance). Income includes pensions,
            savings interest above any tax-free amounts, rent and other taxable income.
          </li>
          <li>
            The higher earner pays tax at the basic rate: income up to £50,270 in England, Wales or Northern Ireland.
            In Scotland, they must pay no more than the intermediate rate, up to £43,662.
          </li>
          <li>
            Neither of you was born before 6 April 1935. Couples where one was are looked after by the Married
            Couple&rsquo;s Allowance instead.
          </li>
        </ul>

        <h2>How much it is worth</h2>
        <p>
          The higher earner&rsquo;s tax falls by 20% of £1,260, which is £252. The lower earner&rsquo;s own allowance
          falls to £11,310. If they earn £11,310 or less, that costs them nothing, so the couple gains the full £252.
          If they earn between £11,310 and £12,570, they pay some tax on the slice above £11,310, and the gain is
          smaller.
        </p>
        <table>
          <thead>
            <tr>
              <th>Lower earner&rsquo;s income</th>
              <th>Higher earner&rsquo;s income</th>
              <th>Couple gains each year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£8,000</td><td>£30,000</td><td>£252</td></tr>
            <tr><td>£11,500</td><td>£30,000</td><td>£214</td></tr>
            <tr><td>£12,000</td><td>£30,000</td><td>£114</td></tr>
            <tr><td>£12,570</td><td>£30,000</td><td>Nothing: it costs as much as it saves</td></tr>
            <tr><td>£8,000</td><td>£13,000</td><td>£86 (the higher earner only pays £86 tax)</td></tr>
            <tr><td>£8,000</td><td>£55,000</td><td>Not eligible: higher rate taxpayer</td></tr>
          </tbody>
        </table>
        <p>
          The £12,000 example is easy to get wrong: the higher earner saves £252, but the lower earner now pays £138
          of tax on the £690 above £11,310, leaving a gain of £114. Claim only if the household comes out ahead.
        </p>

        <h2>Claiming for earlier years</h2>
        <p>
          You can backdate a claim for up to four tax years if you were eligible in each of them. In 2026/27 that
          means 2022/23, 2023/24, 2024/25 and 2025/26. The allowance was £1,260 in each of those years, so a couple who
          gain the full amount every year can receive <strong>£1,260 in total</strong>: £252 this year and £1,008
          backdated. HMRC pays backdated amounts as a lump sum to the higher earner.
        </p>

        <h2>How to claim</h2>
        <p>
          The lower earner applies on GOV.UK, free of charge. It takes a few minutes and needs both National Insurance
          numbers. You do not need to use a claims company: they charge a share of the refund for something you can do
          yourself.
        </p>
        <p>
          Once it is in place, HMRC changes both <Link href="/uk/tax-and-salary/tax-code-decoder">tax codes</Link>. The
          higher earner&rsquo;s code ends in M (for example 1383M) and the lower earner&rsquo;s ends in N (for example
          1131N). The allowance renews each year automatically until you cancel it or your circumstances change.
        </p>

        <h2>When to cancel</h2>
        <ul>
          <li>
            The lower earner&rsquo;s income rises above £12,570, or the higher earner moves into the higher rate band
            (perhaps after a <Link href="/uk/tax-and-salary/pay-rise">pay rise</Link>).
          </li>
          <li>You divorce, end a civil partnership, or your partner dies (special rules apply on bereavement).</li>
        </ul>
        <p>
          If you claim when you are not entitled, HMRC will ask for the tax back, so review the claim each April.
        </p>

        <h2>Scotland</h2>
        <p>
          In Scotland the rules are the same, except that the higher earner must not pay tax above the intermediate
          rate (21%). A Scottish higher earner on £45,000 is above the £43,662 limit and cannot receive the allowance.
          The saving is still worked out at 20%, so a couple where the lower earner earns £8,000 and the higher earner
          £40,000 still gain £252.
        </p>

        <p>
          Check your own figures, including backdating, with the{" "}
          <Link href="/uk/tax-and-salary/marriage-allowance">Marriage Allowance calculator</Link>, and see what else you
          take home with the <Link href="/uk/tax-and-salary/salary-calculator">salary calculator</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "uk-take-home-pay-explained",
    title: "How UK take-home pay works in 2026/27: a plain-English guide",
    seoTitle: "How UK Take-Home Pay Works in 2026/27",
    description:
      "Income Tax, National Insurance, the Personal Allowance and the hidden 60% trap: what comes out of your salary in 2026/27, with a worked example.",
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
          <Link href="/uk/tax-and-salary/salary-calculator">
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
          Everyone gets a <strong>Personal Allowance</strong>{" "}— an amount you
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
          <Link href="/uk/tax-and-salary/scottish-tax">
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
          <Link href="/uk/tax-and-salary/national-insurance">
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
          <Link href="/uk/tax-and-salary/salary-calculator">
            take-home calculator
          </Link>{" "}
          is the fastest way to see where you stand — and if you&apos;re
          weighing up a raise, the{" "}
          <Link href="/uk/tax-and-salary/tax-bracket-checker">
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
    seoTitle: "The £100,000 Tax Trap: 62% Tax Explained",
    description:
      "Earn £100,000 to £125,140 and you lose your Personal Allowance and childcare help. What that costs in 2026/27, and how pension contributions win it back.",
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
          <Link href="/uk/tax-and-salary/salary-calculator">Salary &amp; Take-Home Pay Calculator</Link>, so you can check
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
          salary in the <Link href="/uk/tax-and-salary/tax-bracket-checker">Tax Bracket Checker</Link>.
        </p>
        <p>
          In Scotland the trap is steeper still. The Personal Allowance taper is the same, but the income it pulls into
          tax meets the 45% advanced rate, so the marginal rate on salary is <strong>69.5%</strong> including NI. A
          Scottish taxpayer going from £100,000 to £110,000 keeps £3,050 of the £10,000. The{" "}
          <Link href="/uk/tax-and-salary/scottish-tax">Scottish Income Tax calculator</Link> shows the full picture.
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
          for this reason. The <Link href="/uk/investing/pension-tax-relief">pension tax relief calculator</Link> works out
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
            It must be agreed before the bonus is paid. Our <Link href="/uk/tax-and-salary/bonus-tax">bonus tax calculator</Link>{" "}
            shows what a bonus is worth with and without it.
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
          <li>Run the numbers in the <Link href="/uk/investing/workplace-pension">workplace pension calculator</Link> before changing your contribution.</li>
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
      "Plan 2 vs Plan 5 for 2026/27: thresholds, interest and write-off compared with lifetime projections, and when overpaying your student loan helps or wastes money.",
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
          <Link href="/uk/students/plan-2-student-loan">Plan 2</Link> and{" "}
          <Link href="/uk/students/plan-5-student-loan">Plan 5</Link> calculators.
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
          <Link href="/uk/tax-and-salary/salary-calculator">take-home pay calculator</Link> includes them.
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
          <Link href="/uk/investing/isa-vs-gia">stocks and shares ISA</Link>, or towards a house deposit.
        </p>

        <h2>Common questions</h2>
        <h3>Does a student loan affect my mortgage?</h3>
        <p>
          It is not a debt on your credit file, but lenders count the monthly repayment as an outgoing when they work
          out how much to lend. A Plan 5 borrower on £40,000 has £112.50 a month taken into account. Our{" "}
          <Link href="/uk/property/mortgage-affordability">mortgage affordability calculator</Link> lets you include it.
        </p>
        <h3>What if I have a Plan 2 loan and a Postgraduate Loan?</h3>
        <p>
          You repay both at once: 9% above the Plan 2 threshold and 6% above £21,000 for the Postgraduate Loan. See the{" "}
          <Link href="/uk/students/postgrad-loan">Postgraduate Loan calculator</Link>.
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
  {
    slug: "first-time-buyer-costs",
    title: "Buying your first home in 2026/27: the real cost, from deposit to monthly payments",
    seoTitle: "First-Time Buyer Costs 2026/27: The Real Total",
    description:
      "Stamp Duty relief, deposit, legal fees, surveys and mortgage payments for first-time buyers in England, Scotland and Wales, worked through for a £350,000 home.",
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
          use the same engines as our <Link href="/uk/property/first-time-buyer">first-time buyer calculator</Link> and{" "}
          <Link href="/uk/property/moving-house-budget">moving house budget calculator</Link>.
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
          <Link href="/uk/property/stamp-duty-england">Stamp Duty calculator</Link>, the{" "}
          <Link href="/uk/property/lbtt-scotland">LBTT calculator</Link> or the{" "}
          <Link href="/uk/property/ltt-wales">LTT calculator</Link>.
        </p>

        <h2>3. Legal fees, survey and mortgage fee</h2>
        <ul>
          <li>
            <strong>Conveyancing:</strong> typically £1,200 to £2,000 including VAT and searches for a straightforward
            purchase. Leasehold flats cost more, as there is more paperwork.
          </li>
          <li>
            <strong>Survey:</strong>{" "}the lender&rsquo;s valuation is not a survey. A RICS Level 2 (HomeBuyer) report
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
          <Link href="/uk/property/mortgage-repayment">mortgage repayment calculator</Link>, and use the{" "}
          <Link href="/uk/property/mortgage-overpayment">overpayment calculator</Link> to see how regular overpayments
          shorten a long term.
        </p>

        <h2>5. How much can you borrow?</h2>
        <p>
          Most lenders cap borrowing at about 4 to 4.5 times household income, and some go to 5 or 5.5 times for
          higher earners or certain professions. They also stress-test whether you could afford the payments if rates
          rose, and take account of commitments such as car finance, childcare and student loan repayments. The{" "}
          <Link href="/uk/property/mortgage-affordability">mortgage affordability calculator</Link> gives a realistic range.
        </p>

        <h2>Other routes to a first home</h2>
        <ul>
          <li>
            <strong>Shared ownership:</strong> buy a share (often 25% to 75%) and pay rent on the rest. The deposit is
            smaller, but you pay rent, service charges and a mortgage. The{" "}
            <Link href="/uk/property/shared-ownership">shared ownership calculator</Link> adds it all up.
          </li>
          <li>
            <strong>Buying with someone else:</strong> joint incomes raise what you can borrow. For first-time buyer
            relief in England, every buyer must be a first-time buyer.
          </li>
          <li>
            <strong>Keep renting for now:</strong>{" "}buying isn&rsquo;t always cheaper. The{" "}
            <Link href="/uk/property/rent-vs-buy">rent vs buy calculator</Link> compares the two over time.
          </li>
        </ul>

        <h2>Ongoing costs to budget for</h2>
        <p>
          Once you own the home, budget for buildings insurance (often required by the lender), council tax, energy
          and water, maintenance (a common rule of thumb is 1% of the property&rsquo;s value a year), and, for
          leasehold flats, ground rent and service charges. The{" "}
          <Link href="/uk/property/council-tax-bands">council tax calculator</Link> estimates the bill by band, and if you
          live alone the{" "}
          <Link href="/uk/property/single-person-discount">single person discount</Link> takes 25% off it.
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
    slug: "no-tax-on-overtime-and-tips-2026",
    title: "No tax on overtime and tips in 2026: what the new deductions are really worth",
    seoTitle: "No Tax on Overtime and Tips: 2026 Real Savings",
    description:
      "The 2026 overtime and tips deductions explained with worked examples: who qualifies, the $12,500 and $25,000 caps, the income phase-out, and the taxes you still pay.",
    date: "2026-10-08",
    dateLabel: "8 October 2026",
    readingTime: "11 min read",
    category: "US Taxes",
    body: (
      <>
        <p>
          &ldquo;No tax on overtime&rdquo; and &ldquo;no tax on tips&rdquo; were two of the most talked-about promises
          of the last few years, and the One Big Beautiful Bill Act, signed on July 4, 2025, turned both into law. But
          the law does not quite do what the slogans say. Overtime and tips are not tax-free. Instead, there are two
          new federal deductions, each with a cap, an income phase-out and a list of rules about what counts. For many
          hourly workers and tipped staff they are worth hundreds or a few thousand dollars a year. For others they are
          worth nothing at all.
        </p>
        <p>
          This guide explains how both deductions work for the 2026 tax year, the return you file in early 2027, with
          worked examples for a warehouse worker, a married pair of nurses, a restaurant server, a bartender and higher
          earners caught by the phase-out. Every dollar figure comes from the same 2026 federal tax engine as our{" "}
          <Link href="/us/taxes/federal-income-tax">federal income tax calculator</Link>, using the 2026 brackets and
          standard deduction. The examples assume the standard deduction and no other income unless they say otherwise.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>
            <strong>Overtime:</strong>{" "}you can deduct the extra &ldquo;half&rdquo; of time-and-a-half pay that
            federal law requires, up to $12,500 a year, or $25,000 on a joint return.
          </li>
          <li>
            <strong>Tips:</strong>{" "}you can deduct qualified tips, up to $25,000 a year per return, if you work in a job
            where tipping was customary before 2025.
          </li>
          <li>
            <strong>Both</strong>{" "}shrink by $100 for every $1,000 of modified adjusted gross income above $150,000
            ($300,000 for married couples filing jointly).
          </li>
          <li>
            <strong>Both</strong>{" "}apply whether or not you itemize, but neither cuts Social Security, Medicare or (in
            most states) state income tax.
          </li>
          <li>
            <strong>Both</strong>{" "}run for the 2025 to 2028 tax years only, and neither is available if you are married
            and file separately.
          </li>
        </ul>

        <h2>Why &ldquo;no tax&rdquo; is not quite right</h2>
        <p>
          A deduction lowers your taxable income. It does not remove tax dollar for dollar. If you are in the 12% bracket, every $1,000 of deduction saves $120 of federal income tax. In the 22%
          bracket the same $1,000 saves $220. So the value of the overtime and tips deductions depends on your bracket,
          and if your income is already low enough that you owe no federal income tax, the deductions save nothing,
          because there is no tax left to cut.
        </p>
        <p>
          The second reason the slogans overstate it is payroll tax. Every dollar of overtime and tips is still subject
          to Social Security tax (6.2%) and Medicare tax (1.45%), a combined 7.65% for most employees. Those taxes come
          out of every paycheck whatever the new deductions say. For many lower-paid workers, payroll tax is actually a
          bigger bill than federal income tax, so the headline promise touches only part of what they pay.
        </p>
        <p>
          The third reason is state tax. The new deductions sit in the federal calculation after adjusted gross income
          (AGI). Most states start their own income tax from federal AGI or from wages, so unless your state passes its
          own matching rule, your overtime and tips are still taxed by the state. Nine states have no tax on wages at
          all, so there it makes no difference.
        </p>

        <h2>How the overtime deduction works</h2>
        <h3>Only the premium counts</h3>
        <p>
          The deduction covers &ldquo;qualified overtime compensation&rdquo;: the part of your overtime pay that is
          above your regular rate and is required by the Fair Labor Standards Act (FLSA). Under the FLSA, most hourly
          employees must get at least one and a half times their regular rate for hours over 40 in a workweek. If you
          earn $22 an hour, an overtime hour pays $33. Only the extra $11, the &ldquo;half&rdquo; in time-and-a-half, is
          qualified overtime. The first $22 is ordinary pay, taxed as usual.
        </p>
        <p>
          That one detail cuts the value of the deduction to about a third of what many people expect. Someone who earns
          $9,900 of overtime pay in a year at time-and-a-half can deduct $3,300, not $9,900.
        </p>
        <h3>Federal overtime only</h3>
        <p>
          Because the definition is tied to the FLSA, overtime that is paid only because of state law or a contract
          generally does not qualify. Examples include daily overtime after eight hours in a day (required in some
          states, but not by the FLSA), double time, and overtime paid to salaried staff who are exempt from the FLSA
          overtime rules. If you are paid double time for hours over 40, only the premium that the FLSA requires (half
          your regular rate) counts, not the full extra amount. Our{" "}
          <Link href="/us/taxes/overtime-calculator">overtime calculator</Link> splits your overtime pay into the regular
          part and the premium, so you can see the deductible amount.
        </p>
        <h3>The cap and the phase-out</h3>
        <p>
          The deduction is capped at $12,500 a year for single filers and heads of household, and $25,000 for married
          couples filing jointly. To reach the single cap you would need $25,000 of overtime premium, which means
          $75,000 of overtime pay at time-and-a-half. Very few people get near it, so for most workers the cap is not
          the limit that matters. The phase-out may be.
        </p>

        <h2>How the tips deduction works</h2>
        <p>
          The tips deduction lets you deduct up to $25,000 of &ldquo;qualified tips&rdquo; a year. The cap is per
          return, not per person, so a married couple who both earn tips still share one $25,000 cap. To be qualified,
          tips must meet several conditions:
        </p>
        <ul>
          <li>
            <strong>A tipped occupation:</strong>{" "}the job must be one that customarily and regularly received tips on
            or before December 31, 2024. The Treasury published a list of qualifying occupations, which covers jobs such
            as servers, bartenders, hairstylists, delivery drivers, valets, hotel staff and many others.
          </li>
          <li>
            <strong>Voluntary:</strong>{" "}the customer must choose whether to tip and how much. Automatic service
            charges added to a bill, such as an 18% charge for large groups, are not tips, even if the employer passes
            them on to staff.
          </li>
          <li>
            <strong>Cash or card:</strong>{" "}tips paid in cash, by card or through a tip-sharing arrangement all count,
            as long as they are reported.
          </li>
          <li>
            <strong>Reported:</strong>{" "}tips must appear on your Form W-2 or, for self-employed workers, on the forms
            and records used for your return. Tips that were never reported to your employer cannot be deducted.
          </li>
        </ul>
        <p>
          Self-employed people in tipped occupations can claim the deduction too, but the deduction cannot exceed their
          net profit from that work, and some professional service businesses are excluded.
        </p>

        <h2>Who cannot claim either deduction</h2>
        <ul>
          <li>Married people who file separate returns.</li>
          <li>Anyone without a Social Security number valid for work (the number must be on the return).</li>
          <li>Salaried staff who are exempt from FLSA overtime, for the overtime deduction.</li>
          <li>Workers in jobs not on the tipped occupation list, for the tips deduction.</li>
          <li>High earners whose income has fully phased the deduction out (see below).</li>
        </ul>

        <h2>Example 1: a warehouse worker on $22 an hour</h2>
        <p>
          Maria is single and earns $22 an hour. She works 40 hours every week of the year, which is $45,760, plus six
          hours of overtime a week for 50 weeks at $33 an hour, another $9,900. Her total wages are $55,660.
        </p>
        <table>
          <thead>
            <tr>
              <th>Maria, single, 2026</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Regular pay</td><td>$45,760</td></tr>
            <tr><td>Overtime pay</td><td>$9,900</td></tr>
            <tr><td>Qualified overtime premium (the &ldquo;half&rdquo;)</td><td>$3,300</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$4,499.20</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$4,103.20</td></tr>
            <tr><td>Saving</td><td>$396</td></tr>
            <tr><td>Social Security and Medicare still due on the overtime pay</td><td>$757.35</td></tr>
          </tbody>
        </table>
        <p>
          Maria saves $396 a year, which is 12% of her $3,300 premium because her top dollar of taxable income sits in
          the 12% bracket. Notice that the payroll tax on her overtime pay, $757.35, is almost twice the income tax she
          saves. The deduction helps, but her overtime is a long way from tax-free.
        </p>

        <h2>Example 2: a married couple who are both nurses</h2>
        <p>
          A married couple filing jointly earn $140,000 between them, including overtime with a qualified premium of
          $9,000. They have two children, so they also get the child tax credit of $2,200 a child.
        </p>
        <table>
          <thead>
            <tr>
              <th>Married filing jointly, two children</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wages</td><td>$140,000</td></tr>
            <tr><td>Overtime deduction</td><td>$9,000</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$8,740</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$6,960</td></tr>
            <tr><td>Saving</td><td>$1,780</td></tr>
          </tbody>
        </table>
        <p>
          The saving is $1,780 rather than a flat 22% of $9,000 ($1,980). Without the deduction, $7,000 of their taxable
          income sits in the 22% bracket, which starts at $100,800 for joint filers in 2026. The deduction removes that
          $7,000 at 22% and another $2,000 at 12%. When a deduction straddles a bracket line, the saving is a blend of
          the two rates. The <Link href="/us/taxes/tax-bracket-calculator">tax bracket calculator</Link> shows exactly
          where your income sits.
        </p>

        <h2>Example 3: a restaurant server</h2>
        <p>
          Jordan is single and works as a server. Jordan&rsquo;s wages from the restaurant come to $28,000 and reported
          tips add $18,000, so W-2 income is $46,000.
        </p>
        <table>
          <thead>
            <tr>
              <th>Jordan, single</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wages including tips</td><td>$46,000</td></tr>
            <tr><td>Tips deduction</td><td>$18,000</td></tr>
            <tr><td>Taxable income after the standard deduction and tips</td><td>$11,900</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$3,340</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$1,190</td></tr>
            <tr><td>Saving</td><td>$2,150</td></tr>
          </tbody>
        </table>
        <p>
          The tips deduction is far more valuable than the overtime deduction for the same income, because the whole tip
          counts, not just a premium. Jordan&rsquo;s federal income tax falls by almost two thirds. Payroll tax of 7.65%
          on all $46,000 still applies, $3,519 in total, which is now nearly three times Jordan&rsquo;s income tax.
        </p>

        <h2>Example 4: a bartender who hits the cap</h2>
        <p>
          A single bartender earns $30,000 in wages and $40,000 in tips, $70,000 in all. Only $25,000 of the tips can be
          deducted.
        </p>
        <table>
          <thead>
            <tr>
              <th>Bartender, single</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Wages including tips</td><td>$70,000</td></tr>
            <tr><td>Tips deduction (capped)</td><td>$25,000</td></tr>
            <tr><td>Federal income tax without the deduction</td><td>$6,570</td></tr>
            <tr><td>Federal income tax with the deduction</td><td>$3,220</td></tr>
            <tr><td>Saving</td><td>$3,350</td></tr>
          </tbody>
        </table>
        <p>
          The deduction takes this bartender from the 22% bracket down into the 12% bracket, so the first part of the
          deduction saves 22 cents on the dollar and the rest saves 12 cents. The remaining $15,000 of tips is taxed as
          normal.
        </p>

        <h2>Example 5: tips and overtime together</h2>
        <p>
          You can claim both deductions in the same year if you qualify for both, for example a hotel worker who earns
          tips and also works overtime. A single worker with $70,000 of wages, including $10,000 of qualified tips and an
          overtime premium of $4,000, pays $6,570 of federal income tax without the deductions and $4,540 with them, a
          saving of $2,030. Each deduction has its own cap, so claiming one does not use up the other.
        </p>

        <h2>Example 6: when the deduction saves nothing, or adds to a refund</h2>
        <p>
          A single part-time server with $24,000 of wages, including $8,000 of tips, would owe $790 of federal income tax
          without the deduction. With it, taxable income falls to zero, so the saving is the full $790. A bigger tips
          figure would not save any more: once taxable income reaches zero, there is nothing left to deduct from.
        </p>
        <p>
          The interaction with credits can be surprising. A head of household server with one child, wages of $38,000
          including $14,000 of tips, already owes no federal income tax after the child tax credit. Without the tips
          deduction the return shows a refund of $815 from the refundable part of the credit. With it, the refund rises to
          $1,700, the full refundable amount, because the deduction leaves less income tax for the credit to cancel and
          more of the credit is paid out in cash. That is $885 better off.
        </p>
        <p>
          At the other end, a worker whose income is entirely covered by the standard deduction, $16,100 for a single
          filer in 2026, owes no income tax and gains nothing from either deduction.
        </p>

        <h2>The phase-out for higher earners</h2>
        <p>
          Both deductions shrink by $100 for each $1,000, or part of $1,000, of modified adjusted gross income above
          $150,000 for single filers and heads of household, or $300,000 for joint filers. For most people, modified AGI
          is simply AGI. Because the cut is the same $100 per $1,000 for both deductions, the bigger tips cap lasts
          longer.
        </p>
        <table>
          <thead>
            <tr>
              <th>Modified AGI</th>
              <th>Maximum overtime deduction</th>
              <th>Maximum tips deduction</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Single, $150,000 or less</td><td>$12,500</td><td>$25,000</td></tr>
            <tr><td>Single, $160,000</td><td>$11,500</td><td>$24,000</td></tr>
            <tr><td>Single, $175,000</td><td>$10,000</td><td>$22,500</td></tr>
            <tr><td>Single, $200,000</td><td>$7,500</td><td>$20,000</td></tr>
            <tr><td>Single, $275,000</td><td>$0</td><td>$12,500</td></tr>
            <tr><td>Joint, $300,000 or less</td><td>$25,000</td><td>$25,000</td></tr>
            <tr><td>Joint, $350,000</td><td>$20,000</td><td>$20,000</td></tr>
            <tr><td>Joint, $425,000</td><td>$12,500</td><td>$12,500</td></tr>
            <tr><td>Joint, $550,000</td><td>$0</td><td>$0</td></tr>
          </tbody>
        </table>
        <p>
          Even $1 over the line costs $100 of deduction: a single filer with modified AGI of $150,001 can deduct up to
          $12,400 of overtime, not $12,500. In practice the phase-out only bites when your overtime premium is larger
          than the reduced cap.
        </p>
        <p>
          Two examples. A single filer earning $170,000 with $12,500 of overtime premium can deduct only $10,500,
          saving $2,520 at the 24% rate. A married couple earning $320,000 with a $20,000 premium face a reduced cap of
          $23,000, which is still above their premium, so they deduct the full $20,000 and save $4,800.
        </p>

        <h2>Lower-income examples at a glance</h2>
        <p>
          The deduction&rsquo;s value grows with your bracket, but only up to the phase-out. A married couple filing
          jointly on $75,000, with one spouse earning a $6,000 overtime premium, save $720, because all of it sits in
          the 12% bracket. Compare that with the bartender above, who saved $3,350 on $70,000 because the tips deduction
          was larger and reached into the 22% bracket.
        </p>
        <table>
          <thead>
            <tr>
              <th>Example (2026)</th>
              <th>Deduction</th>
              <th>Federal income tax saved</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Single, $55,660 with $3,300 overtime premium</td><td>$3,300</td><td>$396</td></tr>
            <tr><td>Joint, $75,000 with $6,000 overtime premium</td><td>$6,000</td><td>$720</td></tr>
            <tr><td>Joint, $140,000 with $9,000 premium, two children</td><td>$9,000</td><td>$1,780</td></tr>
            <tr><td>Single, $24,000 with $8,000 tips</td><td>$8,000</td><td>$790</td></tr>
            <tr><td>Single, $46,000 with $18,000 tips</td><td>$18,000</td><td>$2,150</td></tr>
            <tr><td>Single, $70,000 with $40,000 tips</td><td>$25,000 (capped)</td><td>$3,350</td></tr>
            <tr><td>Single, $170,000 with $12,500 premium</td><td>$10,500 (phased)</td><td>$2,520</td></tr>
            <tr><td>Married filing separately, any amount</td><td>$0</td><td>$0</td></tr>
          </tbody>
        </table>

        <h2>What it does not change</h2>
        <h3>Social Security and Medicare</h3>
        <p>
          Payroll taxes are worked out on wages, and the new deductions only reduce income tax. You still pay 6.2%
          Social Security tax up to the 2026 wage base of $184,500 and 1.45% Medicare tax on all of it, plus the
          additional 0.9% Medicare tax above $200,000 for a single filer. One upside of this: because tips and overtime
          still count as wages for Social Security, they still build your future Social Security benefit.
        </p>
        <h3>Your AGI</h3>
        <p>
          The deductions come after AGI. That matters because many other tax rules use AGI, including the phase-outs for
          Roth IRA contributions, the child tax credit and the student loan interest deduction, and income-based student
          loan repayment plans and health insurance subsidies. Claiming the overtime or tips deduction does not lower
          your AGI, so it will not, on its own, help you qualify for those.
        </p>
        <h3>State income tax</h3>
        <p>
          As explained above, most states tax overtime and tips as normal unless they have passed their own law. Check
          your state&rsquo;s rules for 2026 before counting on any state saving. Our{" "}
          <Link href="/us/taxes/paycheck-calculator">paycheck calculator</Link> includes state income tax for all 50 states
          and DC, so you can see what is left after every tax.
        </p>

        <h2>Will my paycheck change?</h2>
        <p>
          Not automatically. Employers withhold federal income tax from each paycheck using your Form W-4, and the
          standard withholding tables do not know how much of your pay is overtime premium or qualified tips. Without a
          change, the saving arrives as a bigger refund (or a smaller bill) when you file.
        </p>
        <p>
          If you would rather have the money through the year, you can give your employer a new Form W-4 and enter an
          estimate of your yearly deductions in Step 4(b), the line for deductions other than the standard deduction.
          Be cautious: if your overtime or tips fall short of the estimate, too little tax will be withheld and you may
          owe at filing time. A conservative estimate, perhaps two thirds of what you expect, is a sensible middle
          ground. The <Link href="/us/taxes/paycheck-calculator">paycheck calculator</Link> shows your take-home pay per
          paycheck so you can check the result.
        </p>

        <h2>How to claim on your return</h2>
        <p>
          You claim both deductions when you file Form 1040, using Schedule 1-A, which also covers the new senior
          deduction and the car loan interest deduction. The figures come from your records and your Form W-2:
        </p>
        <ul>
          <li>
            <strong>Overtime:</strong>{" "}your employer should report qualified overtime compensation on your W-2. If it
            reports total overtime pay instead, work out the premium yourself: at time-and-a-half it is one third of your
            overtime pay.
          </li>
          <li>
            <strong>Tips:</strong>{" "}your W-2 shows the tips you reported to your employer. Tips you did not report to your employer at the time can be added with
            Form 4137, but then you owe payroll tax on them too.
          </li>
          <li>
            <strong>Keep records:</strong>{" "}pay stubs showing overtime hours and rates, and a daily tip log, make it
            easy to back up the figures if the IRS asks.
          </li>
        </ul>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Deducting all overtime pay:</strong>{" "}only the premium is deductible. At time-and-a-half that is a
            third of the overtime pay.
          </li>
          <li>
            <strong>Counting service charges as tips:</strong>{" "}a mandatory charge on the bill is not a voluntary tip,
            even if you receive it.
          </li>
          <li>
            <strong>Filing separately:</strong>{" "}married couples who file separate returns lose both deductions. If one
            of you has large overtime or tips, compare a joint return.
          </li>
          <li>
            <strong>Assuming state tax falls too:</strong>{" "}in most states it does not.
          </li>
          <li>
            <strong>Forgetting the end date:</strong>{" "}the deductions are scheduled to end after the 2028 tax year. Do
            not make long-term plans, such as a mortgage, that depend on them lasting unless Congress extends them.
          </li>
        </ul>

        <h2>How it compares with other ways to cut your tax</h2>
        <p>
          The overtime and tips deductions are generous for the people they reach, but they sit alongside older tools
          that work for almost everyone with a job. A pre-tax 401(k) contribution lowers both your taxable income and
          your AGI, and many employers add a match. Putting $3,300 into a traditional 401(k) would save Maria in Example 1
          the same $396 of federal income tax as her overtime deduction, and she could do both. The{" "}
          <Link href="/us/savings/401k-calculator">401(k) calculator</Link> shows the long-term value. If you also do
          some self-employed work, such as delivery driving on your own account, the{" "}
          <Link href="/us/taxes/self-employment-tax">self-employment tax calculator</Link> shows the 15.3% payroll tax that
          applies to that profit, which the new deductions do not touch.
        </p>

        <h2>Key numbers for 2026</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026 figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Overtime deduction cap</td><td>$12,500 ($25,000 joint)</td></tr>
            <tr><td>Tips deduction cap</td><td>$25,000 per return</td></tr>
            <tr><td>Phase-out starts (modified AGI)</td><td>$150,000 ($300,000 joint)</td></tr>
            <tr><td>Phase-out rate</td><td>$100 per $1,000 above the start</td></tr>
            <tr><td>Standard deduction</td><td>$16,100 single, $32,200 joint, $24,150 head of household</td></tr>
            <tr><td>Social Security wage base</td><td>$184,500</td></tr>
            <tr><td>Employee payroll tax</td><td>7.65% (6.2% + 1.45%)</td></tr>
            <tr><td>Years covered</td><td>2025 to 2028</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          For a tipped worker in the 12% or 22% bracket, the tips deduction is one of the most valuable tax changes in
          years, often worth $2,000 to $3,500. The overtime deduction is smaller than its name suggests, because only the
          premium counts: a few hundred dollars for a typical hourly worker, more for couples with heavy overtime in the
          22% bracket. Neither touches payroll tax or, in most states, state tax, and neither helps if you already owe
          no federal income tax. To see your own figures, try the{" "}
          <Link href="/us/taxes/overtime-calculator">overtime calculator</Link> and the{" "}
          <Link href="/us/taxes/federal-income-tax">federal income tax calculator</Link>. These figures are estimates for
          the 2026 tax year and general information, not tax advice.
        </p>
      </>
    ),
  },
  {
    slug: "self-employed-expenses-what-you-can-claim",
    title: "Self-employed expenses in 2026/27: what you can claim and what it saves",
    seoTitle: "Self-Employed Expenses 2026/27: What You Can Claim",
    description:
      "What sole traders can claim as allowable expenses in 2026/27, the flat rates for mileage and working from home, the £1,000 trading allowance, and worked tax savings.",
    date: "2026-10-08",
    dateLabel: "8 October 2026",
    readingTime: "11 min read",
    category: "Business",
    body: (
      <>
        <p>
          If you work for yourself, every allowable expense you claim comes off your profit before Income Tax and
          Class 4 National Insurance are worked out. A £1,000 cost you forget to claim can mean £260 to £620 more tax,
          depending on your profit. Yet many sole traders under-claim, either because they are unsure what counts or
          because they never write the small costs down.
        </p>
        <p>
          This guide sets out what HMRC lets you claim as a sole trader in the 2026/27 tax year (6 April 2026 to 5 April
          2027), the flat rates that save you working out the exact cost of using your car or your home, when the
          £1,000 trading allowance beats your real expenses, and what all of it is worth in tax. Every figure comes from
          the same engine as our{" "}
          <Link href="/uk/business/allowable-expenses">self-employed expenses calculator</Link> and{" "}
          <Link href="/uk/business/sole-trader-tax">sole trader tax calculator</Link>. Limited companies follow different
          rules and are not covered here.
        </p>

        <h2>The one rule behind every expense</h2>
        <p>
          HMRC&rsquo;s test is that a cost must be incurred &ldquo;wholly and exclusively&rdquo; for the purposes of
          your business. In plain words: you spent the money because of the business, not for yourself. Where a cost is
          partly business and partly personal, such as a phone you also use for family calls, you can claim the business
          share if you can separate it sensibly, for example by the proportion of calls or data used for work.
        </p>
        <p>
          Three things follow from that rule. You cannot claim personal costs, even if they help you work (lunch on an
          ordinary working day, for instance). You cannot claim your own wages or the money you take out of the business
          (drawings), because profit is what you are taxed on. And you cannot claim your own Income Tax or National
          Insurance as an expense.
        </p>

        <h2>What you can claim: the main categories</h2>
        <p>
          The Self Assessment self-employment pages group expenses into categories. If your turnover is below the VAT
          threshold of £90,000, you can use the short pages and enter a single total for expenses, but it still helps to
          keep your records in these groups:
        </p>
        <ul>
          <li>
            <strong>Office, property and equipment:</strong>{" "}stationery, printing, postage, software and subscriptions, phone and broadband (business share), rent and business rates for business premises, small equipment.
          </li>
          <li>
            <strong>Car, van and travel:</strong>{" "}fuel, insurance, repairs and road tax for a business vehicle (or the mileage rates instead), train and bus fares, parking, hotel and meals on overnight business trips.
          </li>
          <li>
            <strong>Clothing:</strong>{" "}uniforms, protective clothing and costumes for performers; not everyday clothes, even if bought for work.
          </li>
          <li>
            <strong>Staff:</strong>{" "}wages, employer National Insurance, employer pension contributions, subcontractor costs, agency fees.
          </li>
          <li>
            <strong>Stock and materials:</strong>{" "}goods for resale, raw materials, direct costs of producing what you sell.
          </li>
          <li>
            <strong>Financial costs:</strong>{" "}business insurance, bank charges, card fees, interest on business loans (up to £500 under the cash basis).
          </li>
          <li>
            <strong>Professional fees:</strong>{" "}accountant, bookkeeper, solicitor and surveyor fees for the business.
          </li>
          <li>
            <strong>Marketing and subscriptions:</strong>{" "}advertising, a website, directory listings, trade or professional body subscriptions.
          </li>
          <li>
            <strong>Training:</strong>{" "}courses that maintain or update skills you use in your current trade.
          </li>
        </ul>

        <h2>What you cannot claim</h2>
        <ul>
          <li>
            <strong>Commuting:</strong>{" "}travel between home and a permanent workplace, such as a shop you rent. Travel
            to clients, temporary sites and suppliers is allowed.
          </li>
          <li>
            <strong>Entertaining:</strong>{" "}taking clients or potential clients for meals or drinks. Staff events can be
            allowable.
          </li>
          <li>
            <strong>Everyday clothing:</strong>{" "}a suit for meetings is not allowable, even if you only wear it for work.
          </li>
          <li>
            <strong>Fines and penalties:</strong>{" "}parking and speeding fines, and HMRC penalties.
          </li>
          <li>
            <strong>Training for a new trade:</strong>{" "}a course to start a different kind of business is not allowable
            against your current one.
          </li>
          <li>
            <strong>The personal share:</strong>{" "}of anything used partly for private life.
          </li>
        </ul>

        <h2>What claiming is worth: your marginal rate</h2>
        <p>
          An expense saves tax at your marginal rate: the Income Tax and Class 4 National Insurance on the last slice of
          profit it removes. In 2026/27 Class 4 is 6% on profit between £12,570 and £50,270 and 2% above that. The table
          shows the tax and National Insurance on the next £100 of profit for a sole trader with no other income.
        </p>
        <table>
          <thead>
            <tr>
              <th>Profit</th>
              <th>England, Wales, NI</th>
              <th>Scotland</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£10,000</td><td>0%</td><td>0%</td></tr>
            <tr><td>£20,000</td><td>26%</td><td>26%</td></tr>
            <tr><td>£30,000</td><td>26%</td><td>27%</td></tr>
            <tr><td>£45,000</td><td>26%</td><td>48%</td></tr>
            <tr><td>£60,000</td><td>42%</td><td>44%</td></tr>
            <tr><td>£90,000</td><td>42%</td><td>47%</td></tr>
            <tr><td>£110,000</td><td>62%</td><td>69.5%</td></tr>
            <tr><td>£130,000</td><td>47%</td><td>50%</td></tr>
          </tbody>
        </table>
        <p>
          So a £1,000 expense you remember to claim saves £260 at a profit of £30,000 and £420 at £60,000. Between
          £100,000 and £125,140 the Personal Allowance is withdrawn, which pushes the marginal rate to 62% in England,
          Wales and Northern Ireland. If your profit is below the £12,570 Personal Allowance and you have no other
          income, expenses save no tax at all that year, though they still matter if your profit later turns into a
          loss you can carry forward.
        </p>

        <h2>Worked example: a freelance designer on £40,000</h2>
        <p>
          Sam is a self-employed graphic designer in England with turnover of £40,000 and no other income. Over the year
          Sam spends £1,500 on software, a laptop accessory, stationery and the business share of a phone; £600 on a
          website and advertising; £900 on insurance, an accountant and bank fees; and £400 on a course updating design
          skills. Sam drives 2,000 business miles to clients and works from home 51 to 100 hours a month all year.
        </p>
        <table>
          <thead>
            <tr>
              <th>Sam&rsquo;s expenses, 2026/27</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Itemised costs</td><td>£3,400</td></tr>
            <tr><td>Mileage, 2,000 miles at 45p</td><td>£900</td></tr>
            <tr><td>Working from home flat rate, £18 a month for 12 months</td><td>£216</td></tr>
            <tr><td>Total expenses</td><td>£4,516</td></tr>
            <tr><td>Taxable profit</td><td>£35,484</td></tr>
            <tr><td>Income Tax and Class 4 NI with no expenses</td><td>£7,131.80</td></tr>
            <tr><td>Income Tax and Class 4 NI with the expenses</td><td>£5,957.64</td></tr>
            <tr><td>Saved by claiming</td><td>£1,174.16</td></tr>
          </tbody>
        </table>
        <p>
          The same £4,516 of expenses saves £1,896.72 if Sam&rsquo;s turnover is £70,000, because the profit sits in
          the higher-rate band, and £1,219.32 for a designer in Scotland on £40,000. If Sam had claimed only the £1,000
          trading allowance instead, the bill would be £6,871.80, £914.16 more than claiming real expenses.
        </p>

        <h2>Simplified expenses: the flat rates</h2>
        <p>
          Simplified expenses let you use flat rates for a few costs that are awkward to split between business and
          personal use. They are optional; you can always work out the actual cost instead if it is higher and you have
          the records.
        </p>
        <h3>Vehicles: 45p and 25p a mile</h3>
        <p>
          For a car or van, you can claim 45p a mile for the first 10,000 business miles in the year and 25p a mile after
          that. Motorcycles are 24p a mile. The rate covers fuel, insurance, servicing, road tax and depreciation, so you
          cannot also claim those. Parking, tolls and congestion charges on business journeys can be claimed on top.
        </p>
        <p>
          A courier or a tradesperson who drives 12,000 business miles can claim £5,000 (10,000 at 45p plus 2,000 at
          25p). On turnover of £50,000, that cuts Income Tax and National Insurance by £1,300. Once you choose the
          mileage rate for a vehicle, you must keep using it for as long as you use that vehicle in the business. Our{" "}
          <Link href="/uk/business/business-mileage">business mileage calculator</Link> works out the claim.
        </p>
        <h3>Working from home</h3>
        <p>
          Instead of working out a share of your heating, lighting and electricity, you can claim a flat monthly amount
          based on the hours you work at home on business:
        </p>
        <table>
          <thead>
            <tr>
              <th>Hours of business use at home each month</th>
              <th>Flat rate a month</th>
              <th>Over a full year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>25 to 50</td><td>£10</td><td>£120</td></tr>
            <tr><td>51 to 100</td><td>£18</td><td>£216</td></tr>
            <tr><td>101 or more</td><td>£26</td><td>£312</td></tr>
          </tbody>
        </table>
        <p>
          The flat rate does not cover phone and broadband, which you claim separately for the business share. The
          amounts are modest: £312 a year saves £81.12 of tax and National Insurance at a profit of about £30,000. If you
          use a room mainly for work and your bills are high, working out the actual business share (by rooms and hours)
          can give a bigger figure, but you will need to show how you calculated it.
        </p>
        <h3>Living at your business premises</h3>
        <p>
          If you run a guest house, bed and breakfast or care home and live there too, you can deduct a flat amount from
          your total premises costs for private use: £350 a month for one person, £500 for two and £650 for three or
          more.
        </p>

        <h2>The £1,000 trading allowance</h2>
        <p>
          The trading allowance lets you deduct a flat £1,000 from your self-employed income instead of your actual
          expenses. If your total trading income (before expenses) is £1,000 or less, you do not need to tell HMRC about
          it at all. Above that, you choose each year between the allowance and your real expenses; you cannot claim
          both.
        </p>
        <p>
          The choice is simple: use the allowance when your real expenses are below £1,000. Take someone with a £30,000
          salary and a side business with turnover of £3,000. With no deduction, the side income would cost £600 in
          Income Tax. The table shows the result with different levels of real expenses:
        </p>
        <table>
          <thead>
            <tr>
              <th>Real expenses</th>
              <th>Tax claiming real expenses</th>
              <th>Tax with the trading allowance</th>
              <th>Better choice</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£300</td><td>£540</td><td>£400</td><td>Trading allowance</td></tr>
            <tr><td>£600</td><td>£480</td><td>£400</td><td>Trading allowance</td></tr>
            <tr><td>£1,500</td><td>£300</td><td>£400</td><td>Real expenses</td></tr>
          </tbody>
        </table>
        <p>
          There is no Class 4 National Insurance here because the side profit is well below £12,570. The allowance also
          saves record-keeping, which is useful for small side incomes such as occasional craft sales or tutoring. One
          catch: if you make a loss, claiming real expenses lets you use it against other income or carry it forward,
          whereas the allowance cannot create a loss.
        </p>

        <h2>Equipment, computers and vans</h2>
        <p>
          Since April 2024 the cash basis has been the default for sole traders. Under the cash basis, most equipment
          you buy for the business, such as a laptop, tools or a printer, is simply an expense in the year you pay for
          it. Under traditional accounting you claim capital allowances instead, and the Annual Investment Allowance of
          £1 million means most small businesses can still deduct the full cost in the year of purchase.
        </p>
        <p>
          Cars are the exception. Under either basis, a car (not a van) is not an expense when you buy it: you either use
          the mileage rate or claim capital allowances on the car plus the business share of running costs. If you use
          equipment partly for personal reasons, claim only the business share, and if you later sell it, the sale price
          may need to be added to your income.
        </p>

        <h2>Big incomes: expenses and the 62% band</h2>
        <p>
          If your profit is between £100,000 and £125,140, each £1 of expenses gives back 50p of Personal Allowance as
          well as cutting tax on the £1 itself. A sole trader with turnover of £110,000 who claims £10,000 of genuine
          expenses brings profit down to £100,000 and saves £6,200 of Income Tax and National Insurance. Personal
          pension contributions have a similar effect on the Personal Allowance, even though they are not a business
          expense; the{" "}
          <Link href="/uk/investing/pension-tax-relief">pension tax relief calculator</Link> shows how they work for the
          self-employed.
        </p>

        <h2>Student loans: a hidden extra saving</h2>
        <p>
          If you are repaying a student loan, your repayments are worked out on your profit through Self Assessment, so
          expenses cut those too. A sole trader with a Plan 2 loan and turnover of £40,000 pays £8,087.15 in Income Tax,
          National Insurance and student loan repayments with no expenses. With £5,000 of expenses the total falls to
          £6,337.15, a saving of £1,750, of which £450 is the lower student loan repayment.
        </p>

        <h2>Records: what to keep and for how long</h2>
        <p>
          You do not send receipts to HMRC, but you must keep records that support the figures on your tax return, for
          at least five years after the 31 January filing deadline for that year. Useful habits:
        </p>
        <ul>
          <li>Keep receipts or invoices for every purchase, digital copies are fine.</li>
          <li>Use a separate bank account for the business, so business spending is easy to spot.</li>
          <li>Keep a mileage log with the date, destination, purpose and miles of each business journey.</li>
          <li>Note how you worked out any business share, for example of your phone or home costs.</li>
          <li>Record small cash purchases as you go; they add up over a year.</li>
        </ul>

        <h2>Making Tax Digital changes the routine</h2>
        <p>
          From 6 April 2026, sole traders and landlords whose qualifying income (turnover from self-employment and
          property together) was over £50,000 must keep digital records and send quarterly updates to HMRC through
          compatible software. The threshold falls to £30,000 from April 2027 and £20,000 from April 2028. Quarterly
          updates do not change what you can claim, but they do mean recording expenses through the year rather than in a
          rush in January, which tends to catch more of them. If you are getting close to the VAT threshold as well, the{" "}
          <Link href="/uk/business/vat-threshold">VAT threshold calculator</Link> tracks your rolling 12-month turnover.
        </p>

        <h2>Paying the tax: payments on account</h2>
        <p>
          Lower profit also means lower payments on account. If your Self Assessment bill is £1,000 or more and less
          than 80% of your tax was collected at source, HMRC asks for two advance payments towards next year&rsquo;s bill,
          each half of this year&rsquo;s. Claiming all your expenses reduces this year&rsquo;s bill and so both advance
          payments. The <Link href="/uk/business/payment-on-account">payments on account calculator</Link> shows the
          dates and amounts.
        </p>

        <h2>Ten commonly missed expenses</h2>
        <ol>
          <li>The business share of your mobile phone and broadband.</li>
          <li>Accountancy and bookkeeping software subscriptions.</li>
          <li>Professional body and trade association fees.</li>
          <li>Business insurance, including professional indemnity and public liability.</li>
          <li>Bank charges and card processing fees, including online payment platforms.</li>
          <li>Parking, tolls and congestion charges on business trips, on top of the mileage rate.</li>
          <li>Train and bus fares to clients and suppliers.</li>
          <li>Hotel stays and meals when travelling overnight for work.</li>
          <li>The working from home flat rate, even if you also have an office.</li>
          <li>Small tools and equipment under the cash basis.</li>
        </ol>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Claiming mileage and fuel together:</strong>{" "}the mileage rate already covers fuel and running
            costs.
          </li>
          <li>
            <strong>Claiming the trading allowance and expenses together:</strong>{" "}it is one or the other.
          </li>
          <li>
            <strong>Claiming the whole cost of something used privately:</strong>{" "}claim only the business share.
          </li>
          <li>
            <strong>Treating drawings as expenses:</strong>{" "}money you take out for yourself is not a cost of the
            business.
          </li>
          <li>
            <strong>Forgetting VAT:</strong>{" "}if you are VAT-registered under the standard scheme, claim expenses net
            of the VAT you reclaim. On the{" "}
            <Link href="/uk/business/flat-rate-vat">Flat Rate Scheme</Link> you usually cannot reclaim VAT on purchases,
            so the full cost is the expense.
          </li>
        </ul>

        <h2>Key numbers for 2026/27</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026/27 figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Trading allowance</td><td>£1,000</td></tr>
            <tr><td>Personal Allowance</td><td>£12,570 (withdrawn between £100,000 and £125,140)</td></tr>
            <tr><td>Class 4 National Insurance</td><td>6% from £12,570 to £50,270, 2% above</td></tr>
            <tr><td>Small Profits Threshold (free State Pension credit)</td><td>£7,105</td></tr>
            <tr><td>Mileage, cars and vans</td><td>45p for 10,000 miles, then 25p</td></tr>
            <tr><td>Mileage, motorcycles</td><td>24p</td></tr>
            <tr><td>Working from home</td><td>£10, £18 or £26 a month</td></tr>
            <tr><td>VAT registration threshold</td><td>£90,000</td></tr>
            <tr><td>Making Tax Digital threshold</td><td>£50,000 (£30,000 from April 2027)</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          Claiming every allowable expense is the simplest legal way for a sole trader to cut a tax bill. For most
          people the saving is 26p to 42p for each £1 claimed, rising to 62p for profits between £100,000 and £125,140.
          Use the flat rates for mileage and working from home when they are easier, choose the £1,000 trading allowance
          only when your real costs are lower, and keep records as you go. To check your own figures, try the{" "}
          <Link href="/uk/business/allowable-expenses">self-employed expenses calculator</Link> and the{" "}
          <Link href="/uk/business/sole-trader-tax">sole trader tax calculator</Link>. These figures are estimates for
          2026/27 and general guidance, not tax advice; an accountant can help with anything unusual.
        </p>
      </>
    ),
  },
  {
    slug: "maintenance-loan-by-household-income-2026-27",
    title: "How much maintenance loan will I get? Every household income for 2026/27",
    seoTitle: "Maintenance Loan by Household Income 2026/27",
    description:
      "2026/27 maintenance loan amounts at every household income from £25,000 to £70,000, living at home, away or in London, with weekly budgets and what you repay.",
    date: "2026-10-09",
    dateLabel: "9 October 2026",
    readingTime: "11 min read",
    category: "Students",
    body: (
      <>
        <p>
          The maintenance loan is the money Student Finance England lends you for rent, food and everything else while
          you study. Everyone on a full-time undergraduate course can get some of it, but the amount depends on two
          things: where you live during term, and your household income, which for most students under 25 means your
          parents&rsquo; income. Two students on the same course in the same halls can be lent very different sums.
        </p>
        <p>
          This guide sets out the 2026/27 loan at every household income from £25,000 to £70,000, in steps of £2,500,
          for students living with their parents, away from home outside London and in London. It shows how much each
          instalment is, what that means a week, how much the means test expects parents to add, and what the loan is
          likely to cost you after you graduate. Every figure comes from the same engine as our{" "}
          <Link href="/uk/students/maintenance-loan">maintenance loan calculator</Link>, which uses Student Finance
          England&rsquo;s published 2026/27 rates.
        </p>

        <h2>The short answer</h2>
        <ul>
          <li>
            <strong>Household income £25,000 or less:</strong>{" "}you get the full loan: £10,830 away from home outside
            London, £14,135 in London, or £9,118 living with your parents.
          </li>
          <li>
            <strong>Above £25,000:</strong>{" "}the loan falls by about 15.5p for every extra £1 of household income, or
            roughly £386 for every £2,500.
          </li>
          <li>
            <strong>The minimum:</strong>{" "}£5,048 away from home outside London (reached at £62,410), £7,039 in London
            (at £70,131) and £4,013 at home (at £58,347). Nobody gets less than this, whatever their parents earn.
          </li>
          <li>
            <strong>Tuition fees:</strong>{" "}up to £9,790 a year, paid by a separate tuition fee loan that is not
            means-tested.
          </li>
          <li>
            <strong>Repayment:</strong>{" "}9% of your income above £25,000 a year on Plan 5, written off after 40 years.
            What you repay depends far more on what you earn later than on how much you borrow.
          </li>
        </ul>

        <h2>The full table: loan by household income</h2>
        <p>
          These are the yearly amounts for full-time students from England in 2026/27. They apply both to new students
          and to those continuing a course that started after August 2016.
        </p>
        <table>
          <thead>
            <tr>
              <th>Household income</th>
              <th>Living with parents</th>
              <th>Away, outside London</th>
              <th>Away, in London</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£25,000 or less</td><td>£9,118</td><td>£10,830</td><td>£14,135</td></tr>
            <tr><td>£27,500</td><td>£8,736</td><td>£10,444</td><td>£13,742</td></tr>
            <tr><td>£30,000</td><td>£8,353</td><td>£10,058</td><td>£13,349</td></tr>
            <tr><td>£32,500</td><td>£7,970</td><td>£9,671</td><td>£12,956</td></tr>
            <tr><td>£35,000</td><td>£7,588</td><td>£9,285</td><td>£12,563</td></tr>
            <tr><td>£37,500</td><td>£7,205</td><td>£8,899</td><td>£12,170</td></tr>
            <tr><td>£40,000</td><td>£6,822</td><td>£8,512</td><td>£11,777</td></tr>
            <tr><td>£42,500</td><td>£6,439</td><td>£8,126</td><td>£11,384</td></tr>
            <tr><td>£45,000</td><td>£6,057</td><td>£7,739</td><td>£10,991</td></tr>
            <tr><td>£47,500</td><td>£5,674</td><td>£7,353</td><td>£10,598</td></tr>
            <tr><td>£50,000</td><td>£5,291</td><td>£6,967</td><td>£10,205</td></tr>
            <tr><td>£52,500</td><td>£4,909</td><td>£6,580</td><td>£9,812</td></tr>
            <tr><td>£55,000</td><td>£4,526</td><td>£6,194</td><td>£9,419</td></tr>
            <tr><td>£57,500</td><td>£4,143</td><td>£5,807</td><td>£9,025</td></tr>
            <tr><td>£60,000</td><td>£4,013</td><td>£5,421</td><td>£8,632</td></tr>
            <tr><td>£62,500</td><td>£4,013</td><td>£5,048</td><td>£8,239</td></tr>
            <tr><td>£65,000</td><td>£4,013</td><td>£5,048</td><td>£7,846</td></tr>
            <tr><td>£70,000</td><td>£4,013</td><td>£5,048</td><td>£7,060</td></tr>
          </tbody>
        </table>
        <p>
          Between the rows the loan moves in a straight line, so for an income of, say, £41,250 you can take the
          halfway point between the £40,000 and £42,500 rows. Student Finance England rounds in your favour, so the
          exact award can be a pound above what simple arithmetic gives. For any income, the{" "}
          <Link href="/uk/students/maintenance-loan">calculator</Link>{" "}gives the precise figure.
        </p>

        <h2>How the taper works</h2>
        <p>
          Above £25,000 of household income, the loan is reduced in a straight line from the maximum down to the
          minimum. The slope is slightly different for each living arrangement, because each starts from a different
          maximum and reaches its minimum at a different income:
        </p>
        <table>
          <thead>
            <tr>
              <th>Living arrangement</th>
              <th>Loan lost per £1 of extra income</th>
              <th>Income for each £1 of loan lost</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>With parents</td><td>15.3p</td><td>£6.53</td></tr>
            <tr><td>Away, outside London</td><td>15.5p</td><td>£6.47</td></tr>
            <tr><td>Away, in London</td><td>15.7p</td><td>£6.36</td></tr>
          </tbody>
        </table>
        <p>
          In practice, that means each £1,000 of extra household income above £25,000 cuts the loan by about £153 to
          £157 a year, until the minimum is reached. A pay rise of £5,000 for a parent therefore costs a student away
          from home about £770 of loan a year. The taper stops at the minimum, so in a London household earning £70,131
          or more the loan stays at £7,039 however high income goes.
        </p>

        <h2>Instalments and weekly budgets</h2>
        <p>
          The loan is paid in three instalments, one at the start of each term, straight into your bank account. The
          first arrives once your university confirms you have registered; the next two usually come in January and
          April. Each instalment is roughly a third of the year&rsquo;s loan:
        </p>
        <table>
          <thead>
            <tr>
              <th>Household income</th>
              <th>With parents</th>
              <th>Away, outside London</th>
              <th>Away, in London</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£25,000 or less</td><td>£3,039</td><td>£3,610</td><td>£4,712</td></tr>
            <tr><td>£35,000</td><td>£2,529</td><td>£3,095</td><td>£4,188</td></tr>
            <tr><td>£45,000</td><td>£2,019</td><td>£2,580</td><td>£3,664</td></tr>
            <tr><td>£55,000</td><td>£1,509</td><td>£2,065</td><td>£3,140</td></tr>
            <tr><td>£65,000</td><td>£1,338</td><td>£1,683</td><td>£2,615</td></tr>
          </tbody>
        </table>
        <p>
          Thinking in weeks makes it easier to see whether the money will stretch. Spread over a 40-week academic year,
          the loan gives you:
        </p>
        <table>
          <thead>
            <tr>
              <th>Household income</th>
              <th>With parents</th>
              <th>Away, outside London</th>
              <th>Away, in London</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£25,000 or less</td><td>£227.95</td><td>£270.75</td><td>£353.38</td></tr>
            <tr><td>£35,000</td><td>£189.70</td><td>£232.13</td><td>£314.07</td></tr>
            <tr><td>£45,000</td><td>£151.43</td><td>£193.47</td><td>£274.77</td></tr>
            <tr><td>£55,000</td><td>£113.15</td><td>£154.85</td><td>£235.47</td></tr>
            <tr><td>£65,000</td><td>£100.33</td><td>£126.20</td><td>£196.15</td></tr>
          </tbody>
        </table>
        <p>
          Compare those weekly figures with your rent. A student away from home from a £45,000 household has £193.47 a
          week. If their room costs £160 a week, only £33.47 is left for food, travel, books, a phone and a social
          life. Many hall and private tenancies also run for 44 to 51 weeks, not 40, so the true weekly rent is higher
          than it looks. Our <Link href="/uk/students/student-budget">student budget calculator</Link>{" "}lets you put in
          your own rent, contract length and spending.
        </p>

        <h2>The parental contribution: the gap nobody tells you about</h2>
        <p>
          The means test is built on an assumption: as household income rises, parents will make up the difference
          between the maximum loan and the reduced loan. Student Finance England never says this on your award letter,
          and parents have no legal duty to pay, but the system is designed around it. These are the &ldquo;expected
          contributions&rdquo; at different incomes:
        </p>
        <table>
          <thead>
            <tr>
              <th>Household income</th>
              <th>With parents</th>
              <th>Away, outside London</th>
              <th>Away, in London</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£30,000</td><td>£765</td><td>£772</td><td>£786</td></tr>
            <tr><td>£40,000</td><td>£2,296</td><td>£2,318</td><td>£2,358</td></tr>
            <tr><td>£50,000</td><td>£3,827</td><td>£3,863</td><td>£3,930</td></tr>
            <tr><td>£60,000</td><td>£5,105</td><td>£5,409</td><td>£5,503</td></tr>
            <tr><td>£70,000</td><td>£5,105</td><td>£5,782</td><td>£7,075</td></tr>
          </tbody>
        </table>
        <p>
          For a family on £50,000 with a child at university outside London, that is £3,863 a year, or about £322 a
          month. Over a three-year course it adds up to more than £11,500. It is worth talking about early, ideally
          before applications open, because the gap often surprises families who are comfortable but not wealthy. A
          household on £60,000 after tax and pension contributions does not usually have £450 a month spare.
        </p>
        <p>
          If parents cannot or will not contribute, the student has to fill the gap another way: part-time work,
          savings, a bursary from the university, or an interest-free student overdraft. Students who are estranged from
          their parents can apply to be assessed as independent, so their parents&rsquo; income is ignored.
        </p>

        <h2>What counts as household income</h2>
        <p>
          &ldquo;Household income&rdquo; is not simply your parents&rsquo; salaries added together. Student Finance
          England looks at:
        </p>
        <ul>
          <li>
            <strong>Whose income:</strong>{" "}for most students under 25, both parents if they live together, or the
            parent you live with and their partner if they have separated. Your own income counts too, above a small
            allowance, but part-time earnings during your course usually do not.
          </li>
          <li>
            <strong>Which year:</strong>{" "}for 2026/27, the 2024/25 tax year, two years before the academic year.
          </li>
          <li>
            <strong>What is taken off:</strong>{" "}pension contributions are deducted, and £1,130 is taken off for each
            other child the household supports.
          </li>
        </ul>
        <p>
          Those deductions can make a real difference. A family with gross income of £45,000 and one younger child is
          assessed on £43,870, which raises a student&rsquo;s loan away from home from £7,739 to £7,914. With two younger
          children the assessed income is £42,740 and the loan is £8,089. Pension contributions work the same way: a
          parent earning £52,000 who pays £3,000 a year into a pension is assessed on £49,000, lifting the loan from £6,657
          to £7,121.
        </p>
        <p>
          That last point is worth knowing if a parent is thinking about paying more into a pension anyway. Every extra
          £1,000 of contributions cuts assessed income by £1,000 and raises the loan by about £155, on top of the usual
          tax relief. Our <Link href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</Link>{" "}shows the
          tax side of the same decision. It only helps for the tax year Student Finance England actually assesses, so
          the timing matters.
        </p>

        <h2>If household income has dropped</h2>
        <p>
          Because the assessment uses income from two years earlier, it can be out of date. If your household income in
          the current tax year is likely to be at least 15% lower than in 2024/25 (after a redundancy, a move to part-time
          work, illness or retirement, for example), you can ask for a current year income assessment. Student Finance
          England will base the loan on an estimate of this year&rsquo;s income, then check it against the actual figures
          after the tax year ends. If the real income turns out higher, the loan can be reduced later, so estimate
          honestly.
        </p>

        <h2>Three years of borrowing</h2>
        <p>
          Over a standard three-year course with the same household income each year (in practice it changes, and the
          rates usually rise a little), the maintenance loan alone adds up to:
        </p>
        <table>
          <thead>
            <tr>
              <th>Household income</th>
              <th>With parents</th>
              <th>Away, outside London</th>
              <th>Away, in London</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£25,000 or less</td><td>£27,354</td><td>£32,490</td><td>£42,405</td></tr>
            <tr><td>£40,000</td><td>£20,466</td><td>£25,536</td><td>£35,331</td></tr>
            <tr><td>£55,000</td><td>£13,578</td><td>£18,582</td><td>£28,257</td></tr>
            <tr><td>£70,000</td><td>£12,039</td><td>£15,144</td><td>£21,180</td></tr>
          </tbody>
        </table>
        <p>
          Add £29,370 of tuition fee loans (£9,790 a year for three years) and a student away from home from a £40,000
          household borrows £54,906 before interest. With interest charged from the first payment, the balance at
          graduation is higher still. The <Link href="/uk/students/degree-cost">cost of a degree calculator</Link>{" "}shows
          the year-by-year build-up for your own course.
        </p>

        <h2>Does borrowing more mean repaying more?</h2>
        <p>
          This is the question families most often get wrong. On Plan 5, the loan for students who started from August
          2023, you repay 9% of your income above £25,000 (a threshold that rises with RPI from April 2027), and whatever
          is left after 40 years is written off. Your monthly repayment depends only on what you earn, not on what you
          owe.
        </p>
        <table>
          <thead>
            <tr>
              <th>Salary after graduating</th>
              <th>Plan 5 repayment a month</th>
              <th>A year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£25,000</td><td>£0</td><td>£0</td></tr>
            <tr><td>£28,000</td><td>£22.50</td><td>£270</td></tr>
            <tr><td>£30,000</td><td>£37.50</td><td>£450</td></tr>
            <tr><td>£35,000</td><td>£75</td><td>£900</td></tr>
            <tr><td>£40,000</td><td>£112.50</td><td>£1,350</td></tr>
            <tr><td>£50,000</td><td>£187.50</td><td>£2,250</td></tr>
          </tbody>
        </table>
        <p>
          To see what that means over a working life, we projected two students on three-year courses away from home
          outside London: one from a household on £25,000 who takes the full maintenance loan (£61,860 borrowed in total
          with fees), and one from a household on £62,410 who takes the minimum (£44,514). Both are charged interest at
          RPI, assumed to be 3% a year, and both see their pay rise by 3% a year.
        </p>
        <table>
          <thead>
            <tr>
              <th>Starting salary</th>
              <th>Total repaid, full loan</th>
              <th>Total repaid, minimum loan</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£32,000</td><td>£47,503 (rest written off)</td><td>£47,503 (rest written off)</td></tr>
            <tr><td>£45,000</td><td>£124,302 (cleared in year 38)</td><td>£74,556 (cleared in year 28)</td></tr>
            <tr><td>£60,000</td><td>£94,401 (cleared in year 22)</td><td>£61,586 (cleared in year 16)</td></tr>
          </tbody>
        </table>
        <p>
          The pattern is clear. For a graduate starting on £32,000, the extra £17,000 of borrowing costs nothing at all:
          they repay exactly the same £47,503 either way, because their repayments never clear even the smaller balance
          and the rest is written off. For higher earners, who are on course to clear the loan, extra borrowing does add
          to the total, because they keep paying until it is gone. The graduate on £45,000 who cannot clear the larger
          balance until year 38 is the worst case: high enough earnings to repay a lot, not high enough to finish
          quickly.
        </p>
        <p>
          Nobody knows at 18 what they will earn at 30, so the projection is a guide, not a rule. But it does suggest
          that for most students, taking the loan they need is sensible, while borrowing extra just to save it is not.
          The <Link href="/uk/students/plan-5-student-loan">Plan 5 calculator</Link>{" "}lets you test your own salary path.
        </p>

        <h2>Scotland and Wales work differently</h2>
        <p>
          Students from Scotland and Wales are not funded by Student Finance England, and their systems are built in a
          different way. Here is how a young student living away from home compares at different household incomes:
        </p>
        <table>
          <thead>
            <tr>
              <th>Household income</th>
              <th>England: loan</th>
              <th>Scotland: bursary + loan</th>
              <th>Wales: grant + loan</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£20,000</td><td>£10,830</td><td>£2,000 + £9,400</td><td>£7,971 + £4,619</td></tr>
            <tr><td>£30,000</td><td>£10,058</td><td>£500 + £9,400</td><td>£6,198 + £6,392</td></tr>
            <tr><td>£40,000</td><td>£8,512</td><td>£0 + £8,400</td><td>£4,425 + £8,165</td></tr>
            <tr><td>£50,000</td><td>£6,967</td><td>£0 + £8,400</td><td>£2,651 + £9,939</td></tr>
            <tr><td>£60,000</td><td>£5,421</td><td>£0 + £8,400</td><td>£1,020 + £11,570</td></tr>
          </tbody>
        </table>
        <p>
          In Wales, every student away from home outside London gets the same £12,590 in total; household income only
          changes how much of it is a grant (which is never repaid) and how much is a loan. In Scotland, SAAS pays a
          non-repayable bursary on lower incomes and a loan of £8,400 to £9,400. Scottish students studying in Scotland
          also pay much lower fees. Our <Link href="/uk/students/saas-funding">SAAS calculator</Link>{" "}and{" "}
          <Link href="/uk/students/welsh-student-finance">Welsh student finance calculator</Link>{" "}cover both systems in
          detail.
        </p>

        <h2>Extra money that does not need repaying</h2>
        <p>
          The maintenance loan is the main source of money for most students, but it is not the only one. On top of it,
          you may be able to get:
        </p>
        <ul>
          <li>
            <strong>University bursaries and scholarships:</strong>{" "}many universities pay cash bursaries to students
            from lower-income households, often £1,000 to £3,000 a year. Check each university&rsquo;s website before
            you choose, because the difference between them can be bigger than the difference in loans.
          </li>
          <li>
            <strong>Childcare Grant:</strong>{" "}up to 85% of childcare costs, to a maximum of £199.62 a week for one
            child or £342.24 for two or more.
          </li>
          <li>
            <strong>Parents&rsquo; Learning Allowance:</strong>{" "}£50 to £2,024 a year for students with children.
          </li>
          <li>
            <strong>Adult Dependants&rsquo; Grant:</strong>{" "}up to £3,545 a year if a partner or another adult
            depends on you financially.
          </li>
          <li>
            <strong>Disabled Students&rsquo; Allowance:</strong>{" "}help with the extra study costs of a disability,
            long-term illness or specific learning difficulty, not means-tested.
          </li>
          <li>
            <strong>Hardship funds:</strong>{" "}universities hold emergency funds for students who run into money
            problems during the year.
          </li>
        </ul>
        <p>
          Full-time students are also exempt from council tax in most cases. If you share with people who are not
          students, our <Link href="/uk/students/student-council-tax">student council tax calculator</Link>{" "}shows who
          pays what.
        </p>

        <h2>Four worked examples</h2>
        <p>
          <strong>Amira, household income £28,000, living away from home in Leeds.</strong>{" "}Her loan is £10,367 a
          year, paid in three instalments of about £3,456. At £150 a week for a 44-week hall contract, rent costs £6,600,
          leaving £3,767 for 40 weeks of term, or about £94 a week. Her university also pays a bursary to students from
          lower-income families, which she should apply for.
        </p>
        <p>
          <strong>Tom, household income £45,000, living with his parents in Manchester.</strong>{" "}His loan is £6,057,
          about £151 a week over 40 weeks. With no rent to pay, that covers travel, food on campus and books
          comfortably. He borrows about £5,000 less over three years than he would living away (£1,682 a year), and saves
          far more than that in rent.
        </p>
        <p>
          <strong>Priya, household income £55,000, studying in London.</strong>{" "}Her loan is £9,419. London rents
          mean it is unlikely to cover a room on its own, and the means test expects her parents to add £4,716. If they
          cannot, a part-time job of 12 hours a week at £12.71 an hour (the 2026/27 National Living Wage for those aged 21 and over) over 30 weeks
          would add about £4,576 before tax, and she would pay no Income Tax on it below the £12,570 Personal Allowance.
        </p>
        <p>
          <strong>Sam, household income £72,000, living away from home in Bristol.</strong>{" "}His loan is the minimum,
          £5,048. His parents&rsquo; expected contribution is £5,782 a year. If one parent paid an extra £5,000 into a
          pension in the assessed tax year, household income would still be above £62,410, so the loan would not change.
          Pension planning only moves the loan for incomes inside the taper.
        </p>

        <h2>How and when to apply</h2>
        <ol>
          <li>
            Apply online through your Student Finance England account. Applications for new students usually open in
            the spring before the course starts. You do not need a confirmed place to apply.
          </li>
          <li>
            Give your parents&rsquo; or partner&rsquo;s details. They will be asked to confirm their income online,
            using their National Insurance numbers. Chase them: a slow reply is the most common reason a loan arrives
            late.
          </li>
          <li>
            Choose the right living arrangement. If you are not sure whether you will live at home, you can change it
            later, and your loan will be adjusted.
          </li>
          <li>
            Apply again for each year of your course. Returning students are usually reminded, but the loan is not
            renewed automatically.
          </li>
        </ol>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Assuming the loan covers rent:</strong>{" "}for many students it does not. Check the contract length
            as well as the weekly price.
          </li>
          <li>
            <strong>Forgetting the deductions:</strong>{" "}parents should include pension contributions and other
            children, which lower assessed income.
          </li>
          <li>
            <strong>Not asking for a current year assessment:</strong>{" "}if income has fallen by 15% or more, the
            standard assessment uses old, higher figures.
          </li>
          <li>
            <strong>Spending the first instalment too fast:</strong>{" "}it has to last from September to January, which
            is the longest gap of the year.
          </li>
          <li>
            <strong>Turning the loan down to avoid debt:</strong>{" "}for most graduates, repayments depend on income,
            not the balance, and any balance left after 40 years is written off.
          </li>
        </ul>

        <h2>Key numbers for 2026/27</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>2026/27 figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Full loan up to household income of</td><td>£25,000</td></tr>
            <tr><td>Maximum: with parents / away / London</td><td>£9,118 / £10,830 / £14,135</td></tr>
            <tr><td>Minimum: with parents / away / London</td><td>£4,013 / £5,048 / £7,039</td></tr>
            <tr><td>Minimum reached at</td><td>£58,347 / £62,410 / £70,131</td></tr>
            <tr><td>Deduction for each other dependent child</td><td>£1,130</td></tr>
            <tr><td>Income year assessed</td><td>2024/25</td></tr>
            <tr><td>Current year assessment if income falls by</td><td>15% or more</td></tr>
            <tr><td>Tuition fee loan</td><td>Up to £9,790 (£11,750 accelerated)</td></tr>
            <tr><td>Plan 5 repayment</td><td>9% above £25,000, written off after 40 years</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          If your household income is £25,000 or less, you get the full maintenance loan. Above that, every £1,000 of
          household income costs about £155 of loan, until the minimum is reached somewhere between £58,347 and £70,131.
          The loan rarely covers everything, especially away from home, and the means test quietly assumes parents fill
          the gap. Check the figure for your own household with the{" "}
          <Link href="/uk/students/maintenance-loan">maintenance loan calculator</Link>, plan a weekly budget, and talk
          about the gap before term starts. These figures are for Student Finance England in 2026/27 and are general
          guidance, not financial advice.
        </p>
      </>
    ),
  },
  {
    slug: "how-much-house-can-i-afford-2026",
    title: "How much house can I afford in 2026? Answers for every salary from $50,000 to $250,000",
    seoTitle: "How Much House Can I Afford? 2026 by Salary",
    description:
      "How much house you can afford in 2026 on $50,000 to $250,000 a year under the 28/36 rule, and how rates, down payment, debts and property tax change it.",
    date: "2026-10-09",
    dateLabel: "9 October 2026",
    readingTime: "11 min read",
    category: "US Housing",
    body: (
      <>
        <p>
          &ldquo;How much house can I afford?&rdquo; is the first question almost every buyer asks, and the answer you
          get depends heavily on who you ask. A real estate agent, a lender and a cautious financial planner can give
          three different numbers for the same income. Most of them start from the same place, though: the 28/36 rule
          that mortgage lenders have used for decades to decide how big a payment a household can carry.
        </p>
        <p>
          This guide works through that rule for incomes from $50,000 to $250,000 a year in 2026, then shows how much
          the answer moves when mortgage rates, your down payment, your other debts or your state&rsquo;s property tax
          change. Every figure comes from the same engine as our{" "}
          <Link href="/us/housing/mortgage-affordability">home affordability calculator</Link>, and every monthly
          payment includes principal, interest, property tax, homeowners insurance and private mortgage insurance (PMI),
          not just the loan payment that adverts quote.
        </p>

        <h2>The short answer</h2>
        <ul>
          <li>
            <strong>Rule of thumb:</strong>{" "}with a 7.25% 30-year mortgage, $40,000 down and $500 a month of other
            debts, most households can afford a home of about 3 times their gross yearly income.
          </li>
          <li>
            <strong>On $100,000 a year:</strong>{" "}about $310,000, with a full monthly payment of about $2,333.
          </li>
          <li>
            <strong>Interest rates matter less than people think</strong>{" "}for the price, but a lot for the cost:
            each half point moves the $100,000 budget by roughly $11,000 to $14,000.
          </li>
          <li>
            <strong>Debts matter more than people think:</strong>{" "}every $100 of monthly car or student loan payments
            above the point where the 36% limit starts to bind cuts the price by about $12,500.
          </li>
          <li>
            <strong>Property tax</strong>{" "}changes the answer by about $50,000 between low-tax and high-tax states on
            the same income.
          </li>
        </ul>

        <h2>The 28/36 rule, in plain English</h2>
        <p>
          Lenders look at two ratios of your gross (before-tax) monthly income:
        </p>
        <ul>
          <li>
            <strong>The front-end ratio, 28%:</strong>{" "}your total housing payment (principal, interest, property tax,
            homeowners insurance, PMI and any HOA dues) should be no more than 28% of gross monthly income.
          </li>
          <li>
            <strong>The back-end ratio, 36%:</strong>{" "}your housing payment plus all your other monthly debt payments
            (car loans, student loans, minimum credit card payments, personal loans, child support) should be no more
            than 36%.
          </li>
        </ul>
        <p>
          Whichever limit is lower sets your maximum payment. On $100,000 a year, gross monthly income is $8,333. The
          28% limit allows $2,333 for housing. The 36% limit allows $3,000 for all debts, so with $500 of other debts it
          allows $2,500 for housing. The lower figure, $2,333, wins. Our{" "}
          <Link href="/us/loans/debt-to-income-ratio">debt-to-income calculator</Link>{" "}shows both ratios for your own
          numbers.
        </p>
        <p>
          The rule is a starting point rather than a law. Conventional lenders often approve back-end ratios up to 45%
          or even 50% with strong credit and savings, and FHA loans use 31/43. But a lender&rsquo;s maximum is the most
          they will lend, not what is comfortable to pay, which is why many planners stick to 28/36 or lower.
        </p>

        <h2>How much house you can afford, by salary</h2>
        <p>
          The table assumes a 30-year fixed mortgage at 7.25%, a $40,000 down payment, $500 a month of other debts,
          property tax at the national typical rate of 0.89% of the home&rsquo;s value a year, homeowners insurance of
          $1,800 a year, PMI at 0.5% of the loan a year while you have less than 20% equity, and no HOA dues.
        </p>
        <table>
          <thead>
            <tr>
              <th>Gross income</th>
              <th>Home price</th>
              <th>Monthly payment</th>
              <th>Price ÷ income</th>
              <th>Limit that binds</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>$50,000</td><td>$148,460</td><td>$1,000</td><td>2.97</td><td>36% (debts)</td></tr>
            <tr><td>$60,000</td><td>$188,125</td><td>$1,300</td><td>3.14</td><td>36% (debts)</td></tr>
            <tr><td>$75,000</td><td>$236,781</td><td>$1,750</td><td>3.16</td><td>Both equal</td></tr>
            <tr><td>$90,000</td><td>$280,640</td><td>$2,100</td><td>3.12</td><td>28% (housing)</td></tr>
            <tr><td>$100,000</td><td>$309,880</td><td>$2,333</td><td>3.10</td><td>28% (housing)</td></tr>
            <tr><td>$125,000</td><td>$382,978</td><td>$2,917</td><td>3.06</td><td>28% (housing)</td></tr>
            <tr><td>$150,000</td><td>$456,077</td><td>$3,500</td><td>3.04</td><td>28% (housing)</td></tr>
            <tr><td>$200,000</td><td>$602,274</td><td>$4,667</td><td>3.01</td><td>28% (housing)</td></tr>
            <tr><td>$250,000</td><td>$748,471</td><td>$5,833</td><td>2.99</td><td>28% (housing)</td></tr>
          </tbody>
        </table>
        <p>
          Two things stand out. First, the multiple is fairly steady at about 3 times income, which is why &ldquo;three
          times your salary&rdquo; is a common rule of thumb at today&rsquo;s rates. (When rates were near 3% in 2021,
          the same rules allowed about 4.4 times.) Second, at lower incomes the 36% limit binds: $500 of car or
          student loan payments takes a much bigger bite out of a $4,167 monthly income than out of an $8,333 one.
          Without those debts, a $50,000 household could afford about $170,500 rather than $148,460.
        </p>

        <h2>Where the monthly payment goes</h2>
        <p>
          On $100,000 a year, the $2,333 maximum payment buys a $309,880 home with a $269,880 loan. It splits like this
          in the first month:
        </p>
        <table>
          <thead>
            <tr>
              <th>Part of the payment</th>
              <th>A month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Principal and interest</td><td>$1,841</td></tr>
            <tr><td>Property tax (0.89%)</td><td>$230</td></tr>
            <tr><td>Homeowners insurance</td><td>$150</td></tr>
            <tr><td>PMI</td><td>$112</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>$2,333</strong></td></tr>
          </tbody>
        </table>
        <p>
          More than a fifth of the payment is not the loan at all. That is why a quote of &ldquo;$1,841 a month&rdquo; for a
          $270,000 mortgage can mislead: the bill you actually pay is $2,333. PMI is the one part that goes away. In this
          example it lasts 99 months, a little over 8 years, and costs about $11,100 in total before it ends
          automatically when the balance reaches 78% of the original price. Our{" "}
          <Link href="/us/housing/mortgage-calculator">mortgage calculator</Link>{" "}shows the full schedule.
        </p>

        <h2>What the payment means for your take-home pay</h2>
        <p>
          The 28/36 rule is based on gross income, but you pay the mortgage from take-home pay. A single filer earning
          $100,000 in Texas, putting 5% into a 401(k), takes home about $6,273 a month after federal income tax, Social
          Security and Medicare. A $2,333 housing payment is 37% of that. In California, with state income tax and SDI,
          take-home falls to about $5,783, and the same payment is 40% of it.
        </p>
        <p>
          At $50,000 in Texas, take-home is about $3,346 a month, and the $1,000 payment the rule allows is 30% of it.
          At $75,000 it is $4,889, and $1,750 is 36%. Before you commit, run your own figures through the{" "}
          <Link href="/us/taxes/paycheck-calculator">paycheck calculator</Link>{" "}and list everything else the rest of the
          money has to cover: utilities, maintenance (often 1% of the home&rsquo;s value a year), childcare, food,
          transport and saving for retirement.
        </p>

        <h2>How mortgage rates change the answer</h2>
        <p>
          Freddie Mac&rsquo;s weekly survey put the average 30-year fixed rate at about 7.3% at the start of October
          2026. Here is how the $100,000 budget moves with the rate, with everything else the same:
        </p>
        <table>
          <thead>
            <tr>
              <th>Mortgage rate</th>
              <th>Home price</th>
              <th>Price ÷ income</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>5.5%</td><td>$355,037</td><td>3.55</td></tr>
            <tr><td>6.0%</td><td>$341,050</td><td>3.41</td></tr>
            <tr><td>6.5%</td><td>$327,961</td><td>3.28</td></tr>
            <tr><td>7.0%</td><td>$315,709</td><td>3.16</td></tr>
            <tr><td>7.25%</td><td>$309,880</td><td>3.10</td></tr>
            <tr><td>7.5%</td><td>$304,238</td><td>3.04</td></tr>
            <tr><td>8.0%</td><td>$293,492</td><td>2.93</td></tr>
          </tbody>
        </table>
        <p>
          A drop from 7.25% to 6.0% would add about $31,000 to the budget. That sounds like a lot, but it is only 10%,
          because property tax, insurance and PMI do not fall with the rate. Waiting for rates to drop is a gamble on
          both rates and prices: if lower rates bring more buyers back, prices can rise by more than the extra
          borrowing power. If you buy now and rates fall later, you can look at refinancing; our{" "}
          <Link href="/us/housing/refinance-calculator">refinance calculator</Link>{" "}shows when the closing costs pay for
          themselves.
        </p>

        <h2>How your down payment changes the answer</h2>
        <p>
          A bigger down payment raises the price you can afford in two ways: you borrow less for each dollar of house,
          and you pay less PMI, or none at all once you reach 20% down. On $100,000 a year:
        </p>
        <table>
          <thead>
            <tr>
              <th>Down payment</th>
              <th>Home price</th>
              <th>Down as a share of price</th>
              <th>Total PMI paid</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>$10,000</td><td>$282,668</td><td>3.5%</td><td>$17,155</td></tr>
            <tr><td>$20,000</td><td>$291,739</td><td>6.9%</td><td>$15,399</td></tr>
            <tr><td>$40,000</td><td>$309,880</td><td>12.9%</td><td>$11,133</td></tr>
            <tr><td>$60,000</td><td>$328,021</td><td>18.3%</td><td>$5,695</td></tr>
            <tr><td>$80,000</td><td>$360,825</td><td>22.2%</td><td>$0</td></tr>
            <tr><td>$100,000</td><td>$378,864</td><td>26.4%</td><td>$0</td></tr>
          </tbody>
        </table>
        <p>
          Notice the jump between $60,000 and $80,000: crossing the 20% line removes PMI entirely, which frees about
          $110 a month of the payment for the loan itself, so the budget rises by almost $33,000 for $20,000 more down.
          If you are close to 20%, it can be worth waiting a few months to get there. If you are far from it, buying with
          less down and paying PMI for a few years is often cheaper than paying rent while you save.
        </p>
        <p>
          Remember that the down payment is not the only cash you need. Closing costs usually run to 2% to 5% of the
          loan, and you will want an emergency fund left over after you move in. A goal-based plan in our{" "}
          <Link href="/us/savings/savings-goal-calculator">savings goal calculator</Link>{" "}helps you see how long the
          deposit will take.
        </p>

        <h2>How other debts change the answer</h2>
        <p>
          Other monthly debts are the biggest single lever most buyers can pull. On $100,000 a year, the 28% housing
          limit binds until other debts reach $667 a month; above that, the 36% limit takes over and each extra dollar of
          debt payment is a dollar less for the mortgage.
        </p>
        <table>
          <thead>
            <tr>
              <th>Other debts a month</th>
              <th>Home price</th>
              <th>Housing payment allowed</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>$0 to $500</td><td>$309,880</td><td>$2,333</td></tr>
            <tr><td>$750</td><td>$299,437</td><td>$2,250</td></tr>
            <tr><td>$1,000</td><td>$268,109</td><td>$2,000</td></tr>
            <tr><td>$1,500</td><td>$205,453</td><td>$1,500</td></tr>
          </tbody>
        </table>
        <p>
          Going from $1,000 to $1,500 of monthly debts cuts the budget by about $62,700, or roughly $12,500 for every
          $100. A $600 car payment can cost a family a whole bedroom. Paying off a car loan or a credit card before you
          apply often does more for your budget than months of extra saving. Our{" "}
          <Link href="/us/loans/debt-payoff-calculator">debt payoff calculator</Link>{" "}compares the snowball and
          avalanche methods if you have several debts to clear.
        </p>

        <h2>How your state&rsquo;s property tax changes the answer</h2>
        <p>
          Property tax is part of the monthly payment, so a high-tax state leaves less room for the loan. Using each
          state&rsquo;s typical effective rate (median real estate taxes divided by median home value, from the Census
          Bureau&rsquo;s 2024 American Community Survey), the $100,000 budget looks like this:
        </p>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Typical property tax rate</th>
              <th>Home price on $100,000</th>
              <th>Tax a month</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Hawaii</td><td>0.27%</td><td>$331,331</td><td>$75</td></tr>
            <tr><td>Alabama</td><td>0.38%</td><td>$327,311</td><td>$104</td></tr>
            <tr><td>California</td><td>0.71%</td><td>$315,816</td><td>$187</td></tr>
            <tr><td>Florida</td><td>0.75%</td><td>$314,477</td><td>$197</td></tr>
            <tr><td>Texas</td><td>1.31%</td><td>$296,860</td><td>$324</td></tr>
            <tr><td>New York</td><td>1.45%</td><td>$292,760</td><td>$354</td></tr>
            <tr><td>New Jersey</td><td>1.89%</td><td>$280,580</td><td>$442</td></tr>
            <tr><td>Illinois</td><td>1.92%</td><td>$279,786</td><td>$448</td></tr>
          </tbody>
        </table>
        <p>
          The same income buys about $51,500 more house in Hawaii than in Illinois, before you even look at local
          prices. Texas is a good example of a trade-off: no state income tax, so take-home pay is higher, but property
          tax well above average. Rates also vary a lot within states, by county and school district, so check the tax
          bill on any home you are considering. Homeowners insurance varies too, and in parts of Florida, Louisiana and
          California it can be several times the $1,800 used here.
        </p>

        <h2>HOA dues count too</h2>
        <p>
          Condos and many newer subdivisions charge homeowners association dues, and lenders count them in the housing
          payment. On $100,000 a year, $300 a month of HOA dues cuts the price you can afford from $309,880 to $272,286,
          about $37,600 less. A condo with high dues can cost as much each month as a pricier house without them.
        </p>

        <h2>15-year or 30-year?</h2>
        <p>
          A 15-year mortgage has a lower rate (about 6.6% in early October 2026) and costs far less interest over its
          life, but the payment is much higher. On $100,000 a year, the 28% limit buys about $257,000 of house on a
          15-year loan, against $309,880 on a 30-year loan. Many buyers take the 30-year loan for the lower required
          payment and make extra payments when they can. That keeps the flexibility to pay less in a tight month.
        </p>

        <h2>FHA loans and lower down payments</h2>
        <p>
          FHA loans, backed by the Federal Housing Administration, allow 3.5% down with lower credit scores and use
          31/43 limits instead of 28/36. On $75,000 a year with $10,000 down, FHA limits (with its 0.55% annual mortgage
          insurance) allow about $231,900, against about $209,600 on a conventional loan with the same down payment under
          28/36. The catch is cost: FHA also charges an upfront premium of 1.75% of the loan, usually added to the
          balance, and on most loans with less than 10% down its annual premium lasts for the life of the loan rather
          than ending at 78%. Many FHA borrowers refinance into a conventional loan once they reach 20% equity.
        </p>

        <h2>Five ways to afford more (or need less)</h2>
        <ol>
          <li>
            <strong>Pay down debts first.</strong>{" "}If the 36% limit binds, each $100 of monthly payments cleared adds
            about $12,500 to your budget.
          </li>
          <li>
            <strong>Get to 20% down.</strong>{" "}It ends PMI and can add more than the extra cash itself.
          </li>
          <li>
            <strong>Improve your credit score.</strong>{" "}A higher score can mean a lower rate and cheaper PMI; the
            best rates usually start around 740 to 760.
          </li>
          <li>
            <strong>Compare property taxes and HOA dues,</strong>{" "}not just prices. A cheaper home with a high tax
            bill can cost more each month.
          </li>
          <li>
            <strong>Buy points or ask for seller credits</strong>{" "}to lower the rate, if you plan to stay long enough
            to recoup the upfront cost.
          </li>
        </ol>

        <h2>Renting while you get ready</h2>
        <p>
          If the numbers do not work yet, renting is not wasted money: it buys flexibility and frees you from repairs,
          property tax and insurance. A common guide is to keep rent to about 30% of gross income. Our{" "}
          <Link href="/us/housing/rent-affordability">rent affordability calculator</Link>{" "}applies that and two other
          common rules to your income, and shows how much is left to save toward a down payment each month.
        </p>

        <h2>Common mistakes</h2>
        <ul>
          <li>
            <strong>Budgeting from the loan payment alone:</strong>{" "}tax, insurance, PMI and HOA dues can add a fifth
            or more.
          </li>
          <li>
            <strong>Taking the lender&rsquo;s maximum:</strong>{" "}pre-approval tells you what you can borrow, not what
            you can comfortably repay alongside retirement saving and everyday life.
          </li>
          <li>
            <strong>Forgetting maintenance:</strong>{" "}a common rule is to set aside 1% to 2% of the home&rsquo;s value
            each year for repairs.
          </li>
          <li>
            <strong>Emptying savings for the down payment:</strong>{" "}keep an emergency fund of three to six months of
            costs after closing.
          </li>
          <li>
            <strong>Taking on a car loan just before buying:</strong>{" "}a new monthly payment can shrink the budget, or
            even derail an approval, between pre-approval and closing.
          </li>
        </ul>

        <h2>Key numbers for 2026</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Front-end (housing) limit</td><td>28% of gross income (FHA 31%)</td></tr>
            <tr><td>Back-end (all debts) limit</td><td>36% of gross income (FHA 43%, some conventional up to 50%)</td></tr>
            <tr><td>Average 30-year fixed rate, early October 2026</td><td>about 7.3% (15-year about 6.6%)</td></tr>
            <tr><td>Typical property tax, US</td><td>0.89% of value a year (0.27% to 1.92% by state)</td></tr>
            <tr><td>PMI</td><td>Below 20% down; ends automatically at 78% of the original price</td></tr>
            <tr><td>FHA minimum down payment</td><td>3.5%, upfront premium 1.75%</td></tr>
            <tr><td>Rule-of-thumb price at 7.25%</td><td>About 3 times gross income</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          At 2026 mortgage rates, the 28/36 rule lets most households afford a home of about three times their gross
          income: about $150,000 on $50,000, $237,000 on $75,000, $310,000 on $100,000 and $456,000 on $150,000, with
          $40,000 down. Debts, down payment, property tax and HOA dues can each move that by tens of thousands of
          dollars. Put your own numbers into the{" "}
          <Link href="/us/housing/mortgage-affordability">home affordability calculator</Link>, then check the monthly
          payment against your take-home pay, not just your salary. These figures are estimates for 2026 and general
          guidance, not mortgage or financial advice.
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
