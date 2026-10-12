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
    slug: "energy-bills-winter-2026-price-cap-vat-cut",
    title: "Energy bills this winter: the October 2026 price cap and the electricity VAT cut in real numbers",
    seoTitle: "Energy Bills Winter 2026: Price Cap and VAT Cut",
    description:
      "What the October to December 2026 price cap and 0% VAT on electricity mean for your bill, with worked examples for low, typical and high use, and appliance costs.",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
    readingTime: "11 min read",
    category: "Property",
    body: (
      <>
        <p>
          Two things changed on household energy bills in Great Britain on 1 October 2026. Ofgem&rsquo;s price cap moved
          to new rates for October to December, and VAT on household electricity fell from 5% to 0% until 31 March 2027.
          Gas still carries 5% VAT. The headlines talk about a &ldquo;typical bill&rdquo; of £1,723 a year, but very
          few homes use exactly the typical amount, and the two changes pull in different directions: gas got dearer,
          while electricity, thanks to the VAT cut, costs about the same as it did over the summer.
        </p>
        <p>
          This guide works through what the new cap means in pounds for low, typical and high users, for homes with
          and without gas, and for Direct Debit, prepayment and pay-on-receipt customers. It also prices the appliances
          people worry about most in winter: electric heaters, tumble dryers, electric showers and car chargers. Every
          figure comes from the same engine as our{" "}
          <Link href="/uk/property/energy-bill-calculator">energy bill calculator</Link> and{" "}
          <Link href="/uk/property/appliance-running-cost">appliance running cost calculator</Link>, using Ofgem&rsquo;s
          published unit rates and standing charges for the Great Britain average.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>
            <strong>Typical dual fuel bill:</strong>{" "}£1,723 a year by Direct Debit from 1 October 2026, up about £60 from
            £1,664 for July to September.
          </li>
          <li>
            <strong>Electricity:</strong>{" "}26.32p per kWh and a standing charge of 54.83p a day, with no VAT. The
            standing charge fell from 57.19p.
          </li>
          <li>
            <strong>Gas:</strong>{" "}7.97p per kWh and 29.68p a day, including 5% VAT. Both went up, which is where almost
            all of the rise comes from.
          </li>
          <li>
            <strong>The VAT cut</strong>{" "}is worth about £43 a year on a typical electricity bill, or roughly £21 over the
            six months it lasts.
          </li>
          <li>
            <strong>The next cap</strong>{" "}(January to March 2027) is due to be announced on 25 November 2026.
          </li>
        </ul>

        <h2>What the price cap is, and what it is not</h2>
        <p>
          The price cap is not a cap on your bill. It is a limit on the unit rate (pence per kWh) and the standing
          charge (pence per day) that a supplier can charge on a standard variable tariff. If you use more energy, you
          pay more. Ofgem sets the cap every three months from the wholesale cost of energy plus network, policy and
          operating costs. It applies to default tariffs in England, Scotland and Wales; Northern Ireland has its own
          system.
        </p>
        <p>
          The rates differ by region and payment method, and Ofgem publishes them all. The figures in this guide are
          the Great Britain average for Direct Debit, which is what most comparisons quote. Your own bill shows your
          region&rsquo;s actual rates; you can type them into the calculator to replace the averages.
        </p>
        <p>
          A fixed tariff is not affected by the cap during its term. If you fixed earlier in the year, your unit rates
          stay the same, though the electricity VAT cut still applies to you: VAT is a tax on the supply, not part of
          the tariff, so suppliers pass the 0% rate through on fixed deals as well.
        </p>

        <h2>The new rates side by side</h2>
        <table>
          <thead>
            <tr>
              <th>Rate (GB average, Direct Debit)</th>
              <th>July to September 2026</th>
              <th>October to December 2026</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Electricity unit rate</td><td>26.11p per kWh (5% VAT)</td><td>26.32p per kWh (0% VAT)</td></tr>
            <tr><td>Electricity standing charge</td><td>57.19p a day</td><td>54.83p a day</td></tr>
            <tr><td>Gas unit rate</td><td>7.33p per kWh</td><td>7.97p per kWh</td></tr>
            <tr><td>Gas standing charge</td><td>29.04p a day</td><td>29.68p a day</td></tr>
            <tr><td>Typical yearly bill (Ofgem)</td><td>£1,663</td><td>£1,723</td></tr>
          </tbody>
        </table>
        <p>
          Look closely at the electricity unit rate. It went up by only 0.21p, but the old figure included 5% VAT and
          the new one includes none. Before tax, the underlying rate rose by about 6%. Without the VAT cut, the
          electricity unit rate would have been close to 27.6p from October. The cut hides an increase rather than
          delivering a fall.
        </p>

        <h2>What a typical home pays</h2>
        <p>
          Ofgem&rsquo;s typical home uses 2,500 kWh of electricity and 9,500 kWh of gas a year. These are the new
          &ldquo;typical domestic consumption values&rdquo; that came in on 1 July 2026, lower than the 2,700 and 11,500
          kWh used before, because homes have been using less since the energy crisis.
        </p>
        <p>
          At those amounts, the yearly bill splits like this at the October rates:
        </p>
        <table>
          <thead>
            <tr>
              <th>Part of the bill</th>
              <th>Electricity</th>
              <th>Gas</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Energy used</td><td>£658.00 (2,500 kWh)</td><td>£757.15 (9,500 kWh)</td></tr>
            <tr><td>Standing charges</td><td>£200.13</td><td>£108.33</td></tr>
            <tr><td>Total for the year</td><td>£858.13</td><td>£865.48</td></tr>
            <tr><td>VAT included</td><td>£0</td><td>£41.21</td></tr>
          </tbody>
        </table>
        <p>
          That is £1,723.61 a year, or about £143.63 a month spread evenly. Over the summer quarter&rsquo;s rates the
          same home would have paid £1,663.84. The electricity half of the bill actually fell slightly, from £861.49 to
          £858.13, because the lower standing charge and the VAT cut together outweigh the higher underlying unit rate.
          The gas half rose from £802.35 to £865.48, a jump of about £63.
        </p>

        <h2>Low, typical and high users</h2>
        <p>
          Ofgem publishes three usage levels. A flat or a one- or two-person home is often near &ldquo;low&rdquo;; a
          larger family home, or one with someone at home all day, is often near &ldquo;high&rdquo;.
        </p>
        <table>
          <thead>
            <tr>
              <th>Usage (electricity / gas a year)</th>
              <th>July to September rates</th>
              <th>October to December rates</th>
              <th>Change a year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Low (1,600 / 6,000 kWh)</td><td>£1,172.30</td><td>£1,207.78</td><td>+£35.48</td></tr>
            <tr><td>Typical (2,500 / 9,500 kWh)</td><td>£1,663.84</td><td>£1,723.61</td><td>+£59.77</td></tr>
            <tr><td>High (3,800 / 14,000 kWh)</td><td>£2,333.12</td><td>£2,424.42</td><td>+£91.30</td></tr>
          </tbody>
        </table>
        <p>
          The more gas you burn, the bigger the rise. A high-use home pays about £91 a year more at the new rates, and
          almost all of that is gas. A low user sees about £35 more.
        </p>

        <h2>Homes without gas: the VAT cut matters most here</h2>
        <p>
          Millions of homes in Great Britain have no mains gas and heat with electricity, oil or something else.
          For an all-electric home, the October changes are mildly good news: the bill falls slightly, and the VAT
          saving is larger because every unit is electricity.
        </p>
        <table>
          <thead>
            <tr>
              <th>Electricity used a year</th>
              <th>Bill with 0% VAT</th>
              <th>Same bill at 5% VAT</th>
              <th>VAT saving a year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>2,500 kWh</td><td>£858.13</td><td>£901.04</td><td>£42.91</td></tr>
            <tr><td>3,800 kWh</td><td>£1,200.29</td><td>£1,260.30</td><td>£60.01</td></tr>
            <tr><td>6,000 kWh (electric heating)</td><td>£1,779.33</td><td>£1,868.30</td><td>£88.97</td></tr>
          </tbody>
        </table>
        <p>
          These are yearly figures at the October rates, so the real saving is roughly half of each, since the cut lasts
          six months, and a little more for homes with electric heating, which use most of their electricity in exactly
          those winter months. Many all-electric homes are on Economy 7 or another time-of-use tariff, with cheaper
          night rates; the calculator lets you enter your own day and night rates.
        </p>

        <h2>Direct Debit, prepayment or paying on receipt</h2>
        <p>
          The cap differs by payment method. Ofgem&rsquo;s typical bills for October to December are £1,723 by Direct
          Debit, £1,678 on a prepayment meter and £1,861 for &ldquo;standard credit&rdquo;, where you pay each bill as
          it arrives by cash, cheque or card.
        </p>
        <ul>
          <li>
            <strong>Prepayment</strong>{" "}is now about £45 a year cheaper than Direct Debit for a typical home, after a
            change Ofgem made to stop prepayment customers paying more.
          </li>
          <li>
            <strong>Standard credit</strong>{" "}is about £138 a year dearer, reflecting the cost of late payments and
            chasing debts. If you can set up a Direct Debit, it is usually worth doing.
          </li>
        </ul>
        <p>
          A Direct Debit is normally a fixed monthly amount. It is set so that summer overpayments build a credit that
          covers winter bills. A credit balance in October is normal; a large one in spring may mean your Direct Debit is
          too high, and you can ask for it to be reviewed or refunded.
        </p>

        <h2>Working back from your Direct Debit</h2>
        <p>
          Many people know their monthly payment but not their usage. The calculator can work backwards, assuming your
          use is in the same proportion as Ofgem&rsquo;s typical home:
        </p>
        <table>
          <thead>
            <tr>
              <th>Monthly Direct Debit at October rates</th>
              <th>Electricity a year</th>
              <th>Gas a year</th>
              <th>Compared with typical</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>£100</td><td>about 1,575 kWh</td><td>about 5,985 kWh</td><td>63%</td></tr>
            <tr><td>£150</td><td>about 2,635 kWh</td><td>about 10,013 kWh</td><td>105%</td></tr>
            <tr><td>£200</td><td>about 3,695 kWh</td><td>about 14,041 kWh</td><td>148%</td></tr>
          </tbody>
        </table>
        <p>
          This is a rough guide: your real split between gas and electricity may differ. The best source is your annual
          statement, which lists the kWh you used over the last 12 months. If you have a smart meter, the in-home display
          or your supplier&rsquo;s app shows the same.
        </p>

        <h2>Standing charges: the part you cannot switch off</h2>
        <p>
          Standing charges cover the cost of connecting your home to the networks, plus some policy costs. You pay them
          every day whether you use any energy or not. At the October rates they come to £200.13 a year for electricity
          and £108.33 for gas: £308.46 before you boil a kettle.
        </p>
        <p>
          The electricity standing charge fell by about £8.61 a year compared with the summer, while gas rose by about
          £2.34. For a low user, standing charges are a large share of the bill: about a quarter of the £1,207.78 low-use
          figure. That is why some suppliers offer tariffs with lower standing charges and higher unit rates, which can
          suit people who use very little; ask your supplier whether it has one.
        </p>

        <h2>What heating costs this winter</h2>
        <p>
          Heating is the biggest part of most winter bills, and the cost depends hugely on how you heat. With gas at
          7.97p and electricity at 26.32p per kWh, a unit of electricity costs about 3.3 times as much as a unit of gas.
          Gas boilers lose some heat, so we assume 90% efficiency, but electricity still costs about three times as much
          for the same warmth.
        </p>
        <table>
          <thead>
            <tr>
              <th>Heater (typical use)</th>
              <th>Cost per hour</th>
              <th>Cost a week</th>
              <th>Same heat from a gas boiler, a year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>2kW fan or convector heater, 3 hours a day</td><td>£0.53</td><td>£11.05</td><td>£193.94 (vs £576.41)</td></tr>
            <tr><td>1.5kW oil-filled radiator, 4 hours a day, on 60% of the time</td><td>£0.24</td><td>£6.63</td><td>£116.36 (vs £345.84)</td></tr>
            <tr><td>1.2kW halogen heater, 3 hours a day</td><td>£0.32</td><td>£6.63</td><td>£116.36 (vs £345.84)</td></tr>
            <tr><td>100W electric blanket, 1 hour a day</td><td>£0.03</td><td>£0.18</td><td>£3.23 (vs £9.61)</td></tr>
          </tbody>
        </table>
        <p>
          An hour of a 2kW heater costs about 53p; the same heat from gas central heating costs about 18p. So the
          popular advice to &ldquo;heat the person, not the room&rdquo; is right on the numbers only if the plug-in heater
          lets you leave the central heating off. Running a heater in one room while the boiler heats the whole house
          rarely saves money unless the rest of the house is cold anyway. Heating one room with a 2kW heater for three
          hours a day all year would cost £576, against about £194 for the same heat from gas.
        </p>
        <p>
          An electric blanket is the cheapest warmth on the list by far: about 3p an hour. Heat pumps change this sum
          entirely, because they deliver three or more units of heat for each unit of electricity; our{" "}
          <Link href="/uk/property/heat-pump-vs-boiler">heat pump vs boiler calculator</Link> compares the two.
        </p>

        <h2>The appliances that cost the most</h2>
        <p>
          At 26.32p per kWh, appliances that heat water or air cost the most. The figures below assume typical
          wattages and use; every one can be changed in the appliance calculator.
        </p>
        <table>
          <thead>
            <tr>
              <th>Appliance (typical use)</th>
              <th>Per use</th>
              <th>A year</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Electric shower, 9.5kW, 8 minutes a day</td><td>£0.33</td><td>£121.69</td></tr>
            <tr><td>Immersion heater, 3kW, 1 hour a day</td><td>£0.79</td><td>£288.20</td></tr>
            <tr><td>Tumble dryer (vented or condenser), 75 minutes, 3 times a week</td><td>£0.82</td><td>£128.66</td></tr>
            <tr><td>Heat pump tumble dryer, 2 hours, 3 times a week</td><td>£0.42</td><td>£65.88</td></tr>
            <tr><td>Electric oven, 45 minutes a day</td><td>£0.28</td><td>£103.75</td></tr>
            <tr><td>Air fryer, 20 minutes a day</td><td>£0.13</td><td>£48.03</td></tr>
            <tr><td>Dehumidifier, 8 hours a day</td><td>£0.63</td><td>£230.56</td></tr>
            <tr><td>Heated clothes airer, 4 hours, 3 times a week</td><td>£0.32</td><td>£49.41</td></tr>
            <tr><td>Fridge freezer, always on</td><td>£0.19 a day</td><td>£69.17</td></tr>
            <tr><td>Kettle, 4 boils a day</td><td>£0.04</td><td>£57.64</td></tr>
          </tbody>
        </table>
        <p>
          Three things stand out. First, an immersion heater left on for an hour a day costs nearly £290 a year: a timer
          and a well-insulated cylinder pay for themselves quickly. Second, a heat pump tumble dryer uses about half the
          electricity of a standard one; at three loads a week the difference is about £63 a year. Third, drying
          clothes on a heated airer costs well under half as much as a standard tumble dryer, and a dehumidifier in the
          same room speeds it up, though running one for eight hours a day costs about £230 a year on its own.
        </p>
        <p>
          Cooking in an air fryer instead of the oven saves about £56 a year at these assumptions, but only if it
          replaces the oven rather than being used as well. A microwave is cheaper still: about 3p a use.
        </p>

        <h2>Charging an electric car at home</h2>
        <p>
          At the capped rate, charging a car on a 7kW home charger for four hours costs about £7.37, or about £769 a year
          at twice a week. On a typical overnight electric vehicle tariff of about 8p per kWh, the same charging costs
          about £2.24 a session and £234 a year. If you have an electric car and are still on the standard variable
          tariff, moving to a time-of-use tariff is probably the single biggest saving available to you. Our{" "}
          <Link href="/uk/vehicles/petrol-vs-ev-cost">petrol vs electric calculator</Link> compares the running costs with a
          petrol car.
        </p>

        <h2>Why gas went up and electricity did not</h2>
        <p>
          The cap follows wholesale prices with a lag. Higher wholesale gas costs in the period Ofgem used for October to
          December pushed the gas unit rate from 7.33p to 7.97p,
          about 9%. The electricity rate before VAT also rose, by about 6%, partly because much of Britain&rsquo;s
          electricity is still generated from gas.
        </p>
        <p>
          The government&rsquo;s decision to remove VAT from household electricity for six months means the rise in the
          underlying electricity price does not reach bills for now. Gas was left at 5%. That choice favours homes that
          heat with electricity, which tend to pay more per unit of heat.
        </p>

        <h2>What happens in April 2027</h2>
        <p>
          Unless the government extends it, the electricity VAT cut ends on 31 March 2027. If the underlying rates were
          unchanged, the 5% would come back on top: on the typical home&rsquo;s electricity that is about £43 a year, and
          on 6,000 kWh of electric heating about £89. The cap for January to March 2027 will be announced on 25 November
          2026, and the April to June cap in late February 2027. We update both calculators on announcement day.
        </p>

        <h2>Help with bills this winter</h2>
        <ul>
          <li>
            <strong>Warm Home Discount:</strong>{" "}£150 off your electricity bill each winter for households on
            means-tested benefits, usually applied automatically.
          </li>
          <li>
            <strong>Winter Fuel Payment:</strong>{" "}£200, or £300 at 80 or over, paid automatically at State Pension age;
            it is taken back through tax if your income is over £35,000.
          </li>
          <li>
            <strong>Cold Weather Payments:</strong>{" "}£25 for each very cold week if you get certain benefits.
          </li>
          <li>
            <strong>Supplier hardship funds:</strong>{" "}most large suppliers have grants or debt write-off schemes for
            customers struggling to pay. Ask your supplier, or get free advice from Citizens Advice, StepChange or
            National Debtline.
          </li>
          <li>
            <strong>Priority Services Register:</strong>{" "}free extra support from your supplier if you are of State
            Pension age, disabled, have a long-term health condition or young children.
          </li>
        </ul>
        <p>
          If you are not sure what you can claim, our{" "}
          <Link href="/uk/benefits/benefits-checker">benefits checker</Link> runs the Universal Credit and Pension Credit
          rules and lists other help, including the Warm Home Discount.
        </p>

        <h2>Ten practical ways to cut the bill</h2>
        <ol>
          <li>
            <strong>Give a meter reading</strong>{" "}on or just after 1 October and again on 1 January, so the right rates
            are applied to the right days. Smart meters do this automatically.
          </li>
          <li>
            <strong>Turn the boiler flow temperature down</strong>{" "}on a combi boiler to about 60°C. Condensing boilers
            work more efficiently at lower temperatures.
          </li>
          <li>
            <strong>Set the thermostat one degree lower.</strong>{" "}Every degree makes a noticeable difference to gas use.
          </li>
          <li>
            <strong>Use thermostatic radiator valves</strong>{" "}to keep rooms you rarely use cooler.
          </li>
          <li>
            <strong>Put the immersion heater on a timer,</strong>{" "}or turn it off if your boiler heats your water.
          </li>
          <li>
            <strong>Shorten showers.</strong>{" "}Each minute in a 9.5kW electric shower costs about 4p.
          </li>
          <li>
            <strong>Dry clothes outside or on an airer</strong>{" "}when you can; a standard tumble dryer costs about 82p a
            load.
          </li>
          <li>
            <strong>Fill the kettle only as far as you need.</strong>
          </li>
          <li>
            <strong>Check a fixed tariff.</strong>{" "}A fix below the cap protects you from a rise in January; one above it
            costs you more unless prices rise. Compare the unit rates and standing charges, not just the headline
            yearly figure.
          </li>
          <li>
            <strong>Draught-proof</strong>{" "}doors, windows and letterboxes: cheap materials, often a fast payback.
          </li>
        </ol>

        <h2>Key numbers</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>October to December 2026</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Electricity unit rate</td><td>26.32p per kWh, 0% VAT</td></tr>
            <tr><td>Electricity standing charge</td><td>54.83p a day (£200.13 a year)</td></tr>
            <tr><td>Gas unit rate</td><td>7.97p per kWh, 5% VAT</td></tr>
            <tr><td>Gas standing charge</td><td>29.68p a day (£108.33 a year)</td></tr>
            <tr><td>Typical use</td><td>2,500 kWh electricity, 9,500 kWh gas</td></tr>
            <tr><td>Typical bill: Direct Debit / prepayment / standard credit</td><td>£1,723 / £1,678 / £1,861</td></tr>
            <tr><td>Electricity VAT at 0%</td><td>1 October 2026 to 31 March 2027</td></tr>
            <tr><td>Next cap announcement</td><td>25 November 2026 (for January to March 2027)</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          For a typical home with gas central heating, the October cap adds about £60 a year, nearly all of it on gas.
          The electricity VAT cut stops the electricity side of the bill rising, and saves about £43 a year on typical
          use (more for all-electric homes) while it lasts. The biggest savings are still in how you heat your home and
          heat water: a degree on the thermostat, a timer on the immersion heater, and a time-of-use tariff if you have
          an electric car. To see your own figures, enter your usage or monthly Direct Debit in the{" "}
          <Link href="/uk/property/energy-bill-calculator">energy bill calculator</Link>, and price any appliance with the{" "}
          <Link href="/uk/property/appliance-running-cost">appliance running cost calculator</Link>. Figures are Great
          Britain averages for Direct Debit at Ofgem&rsquo;s October to December 2026 rates; your region and tariff may
          differ. This is general guidance, not financial advice.
        </p>
      </>
    ),
  },
  {
    slug: "pay-off-credit-card-debt-fastest-way",
    title: "The fastest way to pay off credit card debt in 2026: minimums, fixed payments, balance transfers and loans compared",
    seoTitle: "Fastest Way to Pay Off Credit Card Debt (2026)",
    description:
      "How long a $6,000 card balance takes to clear at 22% APR: minimum payments, fixed payments, a 0% balance transfer, a personal loan, and snowball vs avalanche.",
    date: "2026-10-12",
    dateLabel: "12 October 2026",
    readingTime: "12 min read",
    category: "US Loans",
    body: (
      <>
        <p>
          Credit card interest is the most expensive debt most Americans carry. The Federal Reserve&rsquo;s G.19 survey
          put the average APR on cards that were charged interest at about 22% in August 2026. At that rate, a balance
          that is not paid in full grows by almost 2% every month, and the minimum payment barely dents it.
        </p>
        <p>
          This guide takes one realistic balance, $6,000 at 22% APR, and runs it through every common way of paying it
          off: minimum payments only, a fixed monthly payment, a target payoff date, a 0% balance transfer and a
          personal loan. Then it compares the snowball and avalanche methods for people with several cards. Every
          figure comes from the same engines as our{" "}
          <Link href="/us/loans/credit-card-payoff">credit card payoff calculator</Link>,{" "}
          <Link href="/us/loans/balance-transfer-calculator">balance transfer calculator</Link> and{" "}
          <Link href="/us/loans/debt-payoff-calculator">debt payoff calculator</Link>. Interest is charged monthly at
          APR ÷ 12; real cards compound daily, which adds a few cents a month.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>
            <strong>Minimum payments only:</strong>{" "}$6,000 at 22% takes about 20 years and 9 months to clear and costs
            $9,933 in interest, more than the balance itself.
          </li>
          <li>
            <strong>A fixed $300 a month:</strong>{" "}26 months and $1,543 in interest. That one change saves about
            $8,400.
          </li>
          <li>
            <strong>A 0% balance transfer</strong>{" "}(3% fee, 18 months) at the same $300 a month: 21 months and $207 in
            fee and interest, about $1,336 cheaper than staying put.
          </li>
          <li>
            <strong>A 36-month personal loan</strong>{" "}at 15% to 19% beats paying the card over the same 36 months, but
            an origination fee can wipe out much of the gain.
          </li>
          <li>
            <strong>Avalanche</strong>{" "}(highest rate first) always costs the least interest; <strong>snowball</strong>{" "}
            (smallest balance first) gives earlier wins. With typical balances, the difference is often a few hundred
            dollars.
          </li>
        </ul>

        <h2>How card interest works</h2>
        <p>
          Your card&rsquo;s APR is an annual rate, but interest is charged on your balance every day and billed monthly.
          At 22%, the monthly rate is about 1.83%. On a $6,000 balance that is about $110 of interest in the first
          month alone.
        </p>
        <p>
          If you pay your statement balance in full by the due date, most cards charge no interest on purchases: this
          is the grace period. Once you carry a balance, you usually lose the grace period, so new purchases start
          collecting interest from the day you make them. That is why the first rule of paying off a card is to stop
          adding to it, even with small purchases. Our{" "}
          <Link href="/us/loans/credit-card-interest-calculator">credit card interest calculator</Link> shows how the
          average daily balance and grace period work in detail.
        </p>

        <h2>Paying only the minimum</h2>
        <p>
          Card issuers set the minimum payment by formula. A common one is 1% of the balance plus that month&rsquo;s
          interest, with a floor of $25 to $40. On $6,000 at 22%, the first minimum is $170: $110 of interest and $60
          off the balance.
        </p>
        <p>
          The problem is that the minimum shrinks as the balance shrinks, so you never speed up. Here is what happens
          if you pay only the minimum every month and never spend on the card again:
        </p>
        <table>
          <thead>
            <tr>
              <th>Minimum formula</th>
              <th>First payment</th>
              <th>Time to clear</th>
              <th>Total interest</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1% of balance + interest, $25 floor</td><td>$170</td><td>249 months (20 years 9 months)</td><td>$9,933</td></tr>
            <tr><td>2% of balance + interest, $25 floor</td><td>$230</td><td>146 months (12 years 2 months)</td><td>$5,145</td></tr>
          </tbody>
        </table>
        <p>
          On the 1% formula you would pay $15,933 in total for $6,000 of spending. Your statement must show this: under
          the Credit CARD Act of 2009, card statements include a &ldquo;minimum payment warning&rdquo; with how long
          minimum payments would take and the total cost, plus what you would need to pay each month to clear the
          balance in three years.
        </p>

        <h2>The power of a fixed payment</h2>
        <p>
          The simplest fix is to pick a fixed amount and pay it every month, even as the minimum falls. Because the
          amount stays the same, more and more of it goes to the balance as the interest shrinks.
        </p>
        <table>
          <thead>
            <tr>
              <th>Fixed monthly payment ($6,000 at 22%)</th>
              <th>Months to clear</th>
              <th>Total interest</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>$150</td><td>73</td><td>$4,913</td></tr>
            <tr><td>$200</td><td>44</td><td>$2,791</td></tr>
            <tr><td>$250</td><td>32</td><td>$1,979</td></tr>
            <tr><td>$300</td><td>26</td><td>$1,543</td></tr>
            <tr><td>$400</td><td>18</td><td>$1,081</td></tr>
            <tr><td>$500</td><td>14</td><td>$839</td></tr>
          </tbody>
        </table>
        <p>
          Two things jump out. First, paying a fixed $170, the same as the first minimum, would already cut the time
          from 249 months to 58 and the interest from $9,933 to $3,746, simply because the payment never shrinks. Second, the savings flatten out: going from $150 to $200
          saves about $2,100 in interest, while going from $400 to $500 saves about $240. The biggest gain comes from
          the first step away from minimum payments.
        </p>

        <h2>Working back from a payoff date</h2>
        <p>
          If you have a target date in mind, such as clearing the card before a wedding or a home purchase, work out the
          payment for that date:
        </p>
        <table>
          <thead>
            <tr>
              <th>Clear $6,000 at 22% in</th>
              <th>Monthly payment</th>
              <th>Total interest</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>12 months</td><td>$561.57</td><td>$739</td></tr>
            <tr><td>24 months</td><td>$311.27</td><td>$1,470</td></tr>
            <tr><td>36 months</td><td>$229.14</td><td>$2,249</td></tr>
            <tr><td>48 months</td><td>$189.04</td><td>$3,074</td></tr>
          </tbody>
        </table>
        <p>
          The 36-month figure is the one your statement shows in its minimum payment warning. It is a useful
          benchmark: if you can pay at least that, you will be free of the debt within three years.
        </p>

        <h2>Balance transfers: 0% for a while, at a price</h2>
        <p>
          A balance transfer card lets you move a balance from another card and pay a promotional rate, usually 0%, for
          a set period: often 12 to 21 months. You pay a transfer fee up front, typically 3% to 5% of the amount moved.
          After the promotion, any balance left is charged the card&rsquo;s normal APR.
        </p>
        <p>
          Here is $6,000 moved to a card with a 3% fee and 0% for 18 months, then 22%, paying $300 a month:
        </p>
        <table>
          <thead>
            <tr>
              <th>Paying $300 a month</th>
              <th>Stay on the current card</th>
              <th>Balance transfer (3% fee, 18 months at 0%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Transfer fee</td><td>$0</td><td>$180</td></tr>
            <tr><td>Months to clear</td><td>26</td><td>21</td></tr>
            <tr><td>Interest</td><td>$1,543</td><td>$27</td></tr>
            <tr><td>Total paid</td><td>$7,543</td><td>$6,207</td></tr>
          </tbody>
        </table>
        <p>
          The transfer saves about $1,336 and clears the debt five months sooner. At $300 a month, $780 is left when the
          18 months end, so a little interest is charged at 22% before it is cleared.
        </p>
        <p>
          To clear the whole balance before the promotion ends, you need about $344 a month: the $6,180 balance with the
          fee, divided by 18. Then you pay no interest at all, just the $180 fee, and save about $1,117 compared with
          paying $344 a month on the current card.
        </p>
        <p>
          A longer promotion with a higher fee can also work. A 5% fee ($300) with 21 months at 0% clears exactly in 21
          months at $300 a month, with no interest, about $1,243 cheaper than staying.
        </p>

        <h3>When a balance transfer goes wrong</h3>
        <p>
          The danger is paying too little. At $150 a month on the 3% transfer above, $3,480 is still owed when the 0%
          ends, and the whole plan takes 49 months with about $1,094 of interest. It still beats staying on the old card
          at $150 a month (73 months and $4,913 of interest), but the benefit is much smaller than it looks. Other
          traps:
        </p>
        <ul>
          <li>
            <strong>New purchases</strong>{" "}on the transfer card usually get the normal APR, not 0%, and only the
            amount you pay above the minimum has to go to the highest-rate balance first.
          </li>
          <li>
            <strong>A late payment</strong>{" "}can end the promotional rate early on many cards. Set up autopay for at
            least the minimum.
          </li>
          <li>
            <strong>Deferred interest</strong>{" "}is a different product, common on store cards: if the balance is not
            fully paid by the end, interest is charged back to the start. A true 0% balance transfer does not do this,
            but check the terms.
          </li>
          <li>
            <strong>Approval</strong>{" "}generally needs good credit, and the credit limit may be lower than the balance
            you want to move.
          </li>
        </ul>

        <h2>Personal loans: a fixed rate and an end date</h2>
        <p>
          A debt consolidation loan replaces card debt with one fixed payment over a fixed term, usually 2 to 5 years.
          Rates depend heavily on your credit score. Average offers in the 30 days to October 1, 2026 (NerdWallet,
          lenders with a maximum APR of 36% or less) were about 15.17% for excellent credit, 19.47% for good and
          24.21% for fair.
        </p>
        <table>
          <thead>
            <tr>
              <th>$6,000 over 36 months</th>
              <th>Monthly payment</th>
              <th>Interest and fees</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Keep on the card at 22%</td><td>$229.14</td><td>$2,249</td></tr>
            <tr><td>Loan at 15.17%, no fee</td><td>$208.49</td><td>$1,506</td></tr>
            <tr><td>Loan at 15.17%, 5% fee taken from the loan</td><td>$219.47</td><td>$1,901</td></tr>
            <tr><td>Loan at 19.47%, no fee</td><td>$221.36</td><td>$1,969</td></tr>
            <tr><td>Loan at 19.47%, 5% fee taken from the loan</td><td>$233.02</td><td>$2,389</td></tr>
            <tr><td>Loan at 24.21%, no fee</td><td>$236.06</td><td>$2,498</td></tr>
          </tbody>
        </table>
        <p>
          Many personal loans charge an origination fee of 1% to 10%, taken from the money you receive. To get the full
          $6,000 into your hands with a 5% fee, you have to borrow about $6,316. With good credit and a 5% fee, the loan
          costs more than leaving the debt on a 22% card. With excellent credit and no fee, it saves about $743 over
          three years.
        </p>
        <p>
          A loan&rsquo;s real advantage is structure: a fixed end date and a payment that cannot shrink. Its risk is
          that the cards are now empty. If they fill up again, you have the loan and new card debt. Many people close
          or lock away the cards once they consolidate. Our{" "}
          <Link href="/us/loans/debt-consolidation-calculator">debt consolidation calculator</Link> compares your own cards
          with a loan offer, fee included, and our{" "}
          <Link href="/us/loans/personal-loan-calculator">personal loan calculator</Link> shows the true APR once the fee
          is counted.
        </p>

        <h2>Several cards: snowball or avalanche?</h2>
        <p>
          With more than one card, pay the minimum on all of them and put every spare dollar on one target. When the
          target is cleared, its minimum moves on to the next card. The two methods differ only in the order:
        </p>
        <ul>
          <li>
            <strong>Avalanche:</strong>{" "}highest APR first. Mathematically, this always costs the least interest.
          </li>
          <li>
            <strong>Snowball:</strong>{" "}smallest balance first. You clear a card sooner, which many people find keeps
            them going.
          </li>
        </ul>
        <p>
          Take three cards with $250 a month on top of the minimums:
        </p>
        <table>
          <thead>
            <tr>
              <th>Card</th>
              <th>Balance</th>
              <th>APR</th>
              <th>Minimum</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Card A</td><td>$900</td><td>18.99%</td><td>$30</td></tr>
            <tr><td>Card B</td><td>$5,200</td><td>27.99%</td><td>$160</td></tr>
            <tr><td>Card C</td><td>$3,100</td><td>22.99%</td><td>$95</td></tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Method ($535 a month in all)</th>
              <th>First card cleared</th>
              <th>Debt-free</th>
              <th>Total interest</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Snowball (A, then C, then B)</td><td>Card A in month 4</td><td>Month 22</td><td>$2,516</td></tr>
            <tr><td>Avalanche (B, then C, then A)</td><td>Card B in month 16</td><td>Month 22</td><td>$2,255</td></tr>
          </tbody>
        </table>
        <p>
          Both plans finish in the same month. The avalanche saves about $261, but you wait 16 months to clear your
          first card, against 4 months with the snowball. If an early win is what keeps you paying, the snowball&rsquo;s
          extra cost is the price of that motivation, and for many people it is worth it.
        </p>
        <p>
          Sometimes the two methods agree. With a $1,200 store card at 29.99%, a $4,500 card at 24.99% and a $7,800 card
          at 19.99%, the smallest balance is also the most expensive, so both methods attack the same card first. With
          $200 extra a month, both clear all three in 31 months with about $4,069 of interest; with no extra, they take
          58 months and cost about $8,760. The extra $200 a month saves about $4,700.
        </p>

        <h2>Finding the money to pay more</h2>
        <p>
          Every example above says the same thing: the payment matters more than the method. A few ways people find
          an extra $50 to $200 a month:
        </p>
        <ul>
          <li>
            <strong>Pause extra savings, but not all of them.</strong>{" "}Money in a savings account earning 4% while a card
            charges 22% loses you about 18% a year on that amount. Keep a small emergency fund, perhaps one month of
            essential costs, so a surprise bill does not go back on the card. Our{" "}
            <Link href="/us/savings/emergency-fund-calculator">emergency fund calculator</Link> can help set the figure.
          </li>
          <li>
            <strong>Keep the 401(k) match.</strong>{" "}An employer match is usually an instant 50% or 100% return, which
            beats paying off a 22% card.
          </li>
          <li>
            <strong>Check your withholding.</strong>{" "}A large tax refund is money you lent the government for free;
            adjusting your W-4 puts it in your paycheck now.
          </li>
          <li>
            <strong>Cancel subscriptions you rarely use,</strong>{" "}and put each saving straight onto the card.
          </li>
          <li>
            <strong>Use windfalls:</strong>{" "}a bonus, a tax refund or a gift paid onto a card at 22% earns a guaranteed
            22% return.
          </li>
        </ul>

        <h2>Ask for a lower rate</h2>
        <p>
          It is worth calling your card issuer to ask for a lower APR, especially if you have paid on time for a year
          or more, or if your credit score has risen. A cut from 22% to 18% on $6,000 at $300 a month clears the
          balance in 24 months instead of 26 and saves about $356 of interest. If you are struggling to pay, ask about a hardship program: many
          issuers will lower the rate or the payment for a time.
        </p>
        <p>
          A nonprofit credit counseling agency can also set up a debt management plan, often with lower rates
          negotiated with your card issuers, for a small monthly fee. Look for an agency accredited by the National
          Foundation for Credit Counseling. Be wary of &ldquo;debt settlement&rdquo; companies that tell you to stop
          paying your cards: settlement damages your credit, can bring fees and lawsuits, and forgiven debt may be
          taxable.
        </p>

        <h2>What paying off cards does to your credit score</h2>
        <p>
          Paying down card balances usually helps your credit score fairly quickly, because credit utilization (the
          share of your card limits you are using) is a major factor. Keeping old cards open after you pay them off
          helps too, since closing them lowers your total available credit. A balance transfer or loan application
          causes a small, temporary dip from the hard inquiry. A lower score is rarely a reason not to consolidate if
          the plan saves real money.
        </p>

        <h2>A five-step plan</h2>
        <ol>
          <li>
            <strong>List every card</strong>{" "}with its balance, APR and minimum payment.
          </li>
          <li>
            <strong>Stop adding to the balances.</strong>{" "}Use a debit card or cash for day-to-day spending.
          </li>
          <li>
            <strong>Choose a fixed monthly amount</strong>{" "}you can keep up, ideally at least the 36-month payment.
          </li>
          <li>
            <strong>Cut the rate if you can:</strong>{" "}a 0% balance transfer if you can clear it within the promotion, or a
            fee-free personal loan with a clearly lower APR.
          </li>
          <li>
            <strong>Pick avalanche or snowball</strong>{" "}and stick with it. Move each cleared card&rsquo;s minimum to the
            next target.
          </li>
        </ol>

        <h2>Key numbers</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Figure</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Average card APR, accounts charged interest (Fed G.19, August 2026)</td><td>about 22%</td></tr>
            <tr><td>$6,000 at 22%, minimum payments only (1% + interest)</td><td>249 months, $9,933 interest</td></tr>
            <tr><td>$6,000 at 22%, $300 a month</td><td>26 months, $1,543 interest</td></tr>
            <tr><td>Payment to clear $6,000 at 22% in 36 months</td><td>$229.14</td></tr>
            <tr><td>Balance transfer, 3% fee, 18 months at 0%, $300 a month</td><td>21 months, $207 fee and interest</td></tr>
            <tr><td>Typical balance transfer fee</td><td>3% to 5%</td></tr>
            <tr><td>Average personal loan APR (excellent / good / fair credit)</td><td>15.17% / 19.47% / 24.21%</td></tr>
          </tbody>
        </table>

        <h2>The bottom line</h2>
        <p>
          On a typical 22% card, paying only the minimum turns a $6,000 balance into a 20-year, $16,000 commitment. A
          fixed payment of $300 clears it in just over two years. A 0% balance transfer you can pay off within the
          promotion cuts the cost to little more than its fee, and a fee-free personal loan at a clearly lower rate gives
          you a firm end date. Whatever you choose, the amount you pay each month matters most. To run your own
          numbers, use the <Link href="/us/loans/credit-card-payoff">credit card payoff calculator</Link>, the{" "}
          <Link href="/us/loans/balance-transfer-calculator">balance transfer calculator</Link> and the{" "}
          <Link href="/us/loans/debt-payoff-calculator">debt payoff calculator</Link>. These figures are estimates using
          monthly interest at APR ÷ 12 and are general information, not financial advice.
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
