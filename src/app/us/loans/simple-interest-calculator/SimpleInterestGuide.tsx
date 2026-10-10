import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Simple interest guide. Figures from src/lib/us/loan-math.ts (simpleInterest, compoundInterest, daysBetween, days30360, simpleRateFor). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "formula", title: "The formula" },
  { id: "example", title: "A worked example" },
  { id: "time", title: "Turning time into years" },
  { id: "day-counts", title: "Day-count conventions" },
  { id: "actual-360", title: "Why actual/360 costs more" },
  { id: "thirty-360", title: "How 30/360 counts days" },
  { id: "dates", title: "Counting between two dates" },
  { id: "compound", title: "Simple vs compound interest" },
  { id: "growth", title: "How the gap grows" },
  { id: "where-used", title: "Where simple interest is used" },
  { id: "auto", title: "Simple-interest car loans" },
  { id: "timing", title: "Paying early or late" },
  { id: "savings", title: "Savings, CDs and Treasury bills" },
  { id: "rearrange", title: "Solving for rate or time" },
  { id: "add-on", title: "Simple interest vs add-on interest" },
  { id: "apr", title: "Simple interest and APR" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: Simple interest vs precomputed interest on an auto loan", href: "https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-simple-interest-rate-and-precomputed-interest-on-an-auto-loan-en-841/" },
  { label: "Investor.gov: Compound interest calculator and explanation", href: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  { label: "TreasuryDirect: Treasury bills", href: "https://www.treasurydirect.gov/marketable-securities/treasury-bills/" },
  { label: "FDIC: Deposit insurance and interest-bearing accounts", href: "https://www.fdic.gov/resources/deposit-insurance/" },
  { label: "CFPB: Regulation Z, Appendix J (APR computations)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/j/" },
];

export default function SimpleInterestGuide() {
  return (
    <Guide
      kicker="The simple interest guide"
      title="How simple interest works, day by day"
      intro={
        <>
          Simple interest is the oldest and plainest way to charge for money: a rate, applied to the amount you borrowed or saved, for as long as you have it. This guide shows
          the formula, the three ways lenders count days, why that small print can change the answer, and how simple interest compares with compounding over months and
          decades.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Simple interest = principal × rate × time in years. $10,000 at 5% for a year is $500.</li>
          <li>Counting days on a 360-day year (actual/360) raises that to $506.94 for the same 365 days.</li>
          <li>Over 10 years, $10,000 at 5% earns $5,000 simple interest but $6,470.09 compounded monthly.</li>
          <li>A $20,000 simple-interest car loan balance at 7% costs about $3.84 a day.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$500.00", label: "$10,000 at 5% for one year (actual/365)" },
            { value: "$506.94", label: "Same, actual/360" },
            { value: "$6,470.09", label: "10 years compounded monthly, vs $5,000 simple" },
            { value: "$3.84", label: "A day on $20,000 at 7%" },
          ]}
        />
      </GuideSection>

      <GuideSection id="formula" n={2} kicker="The maths" title="The formula">
        <p>
          <strong>I = P × r × t</strong>
        </p>
        <ul>
          <li>
            <em>P</em>{" "}is the principal: the amount borrowed or deposited.
          </li>
          <li>
            <em>r</em>{" "}is the yearly rate as a decimal: 5% is 0.05.
          </li>
          <li>
            <em>t</em>{" "}is the time in years: 6 months is 0.5, 90 days is 90 ÷ 365.
          </li>
        </ul>
        <p>
          The total owed or held at the end is P + I, which can also be written P × (1 + r × t). The key point is that interest is worked out on the original principal only. It
          is never added to the balance to earn more interest.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$5,000 at 6% from January 15 to October 10, 2026"
          steps={[
            { label: "Days between the dates", note: "actual calendar days", value: "268" },
            { label: "Time in years", note: "268 ÷ 365", value: "0.7342" },
            { label: "Rate", value: "6% = 0.06" },
            { label: "Interest", note: "$5,000 × 0.06 × 268 ÷ 365", value: "$220.27" },
          ]}
          total={{ label: "Total at the end", value: "$5,220.27" }}
        />
        <p>The same dates give $223.33 on actual/360 and $220.83 on 30/360, which counts 265 days.</p>
      </GuideSection>

      <GuideSection id="time" n={4} kicker="Time" title="Turning time into years">
        <p>
          Time must be in years because the rate is a yearly rate. Months are easy: divide by 12. Days are where conventions differ, because the year can be taken as 365 or 360
          days and the days themselves can be counted as they fall on the calendar or as 30-day months. The calculator lets you enter a length in days, months or years, or two
          dates, and choose the convention under More options.
        </p>
      </GuideSection>

      <GuideSection id="day-counts" n={5} kicker="Day counts" title="Day-count conventions">
        <DataTable
          head={["Convention", "Days counted", "Year length", "Typical use"]}
          rows={[
            ["Actual/365", "Calendar days", "365", "Car loans, personal loans, savings, credit cards"],
            ["Actual/360", "Calendar days", "360", "Commercial and business loans, lines of credit, Treasury bill yields"],
            ["30/360", "Every month = 30 days", "360", "Corporate and municipal bonds, many mortgages"],
          ]}
        />
        <p>
          Your loan agreement or account terms say which applies. On consumer loans, look for wording such as &quot;interest is computed on a 365-day year for the actual number
          of days elapsed&quot;.
        </p>
      </GuideSection>

      <GuideSection id="actual-360" n={6} kicker="Day counts" title="Why actual/360 costs more">
        <p>
          With actual/360, each day carries 1/360 of the yearly rate, but there are 365 days in a year. So a full year of interest is 365/360 of the stated rate. On a 5% loan that
          is about 5.07% in practice.
        </p>
        <CompareCards
          columns={[
            {
              name: "Actual/365",
              rows: [
                { label: "$10,000 at 5%, 1 year", value: "$500.00" },
                { label: "$25,000 at 8%, 90 days", value: "$493.15" },
              ],
            },
            {
              name: "Actual/360",
              rows: [
                { label: "$10,000 at 5%, 1 year", value: "$506.94" },
                { label: "$25,000 at 8%, 90 days", value: "$500.00" },
              ],
            },
          ]}
        />
        <p>
          The difference is small on one loan, but banks lend billions this way. If you are offered a business loan, ask which day count it uses; two quotes at the same rate are
          not equal if one is actual/360. Our <a href="/us/loans/business-loan-calculator">business loan calculator</a>{" "}covers term loans and SBA loans.
        </p>
      </GuideSection>

      <GuideSection id="thirty-360" n={7} kicker="Day counts" title="How 30/360 counts days">
        <p>
          The 30/360 method, also called the bond basis, treats every month as 30 days. The day count between two dates is 360 × (years apart) + 30 × (months apart) + (days
          apart), with two adjustments: a start date on the 31st becomes the 30th, and an end date on the 31st becomes the 30th when the start is the 30th or 31st. January 31 to
          March 31 is therefore 60 days, even though the calendar has 59. Every month&rsquo;s interest comes out the same, which is why fixed-rate mortgages and bonds favor it.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={8} kicker="Dates" title="Counting between two dates">
        <p>
          When you enter dates, the calculator counts from the start date to the end date, including one end but not both: interest from October 10 to October 11 is one day.
          Leap years are counted as they fall, so a loan running through February 29, 2028 has 366 days in that year. Dates are shown in the US style, such as October 10, 2026.
        </p>
      </GuideSection>

      <GuideSection id="compound" n={9} kicker="Comparison" title="Simple vs compound interest">
        <p>
          With compound interest, each period&rsquo;s interest is added to the balance and earns interest itself. The formula is A = P × (1 + r ÷ m)<sup>m × t</sup>, where{" "}
          <em>m</em>{" "}is the number of times a year interest is added. Over one year the difference is small; over decades it is large.
        </p>
        <DataTable
          caption="Interest on $10,000 at 5%"
          head={["Years", "Simple", "Compounded yearly", "Compounded monthly", "Compounded daily"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["1", "$500.00", "$500.00", "$511.62", "$512.67"],
            ["3", "$1,500.00", "$1,576.25", "$1,614.72", "$1,618.22"],
            ["5", "$2,500.00", "$2,762.82", "$2,833.59", "$2,840.03"],
            ["10", "$5,000.00", "$6,288.95", "$6,470.09", "$6,486.65"],
            ["20", "$10,000.00", "$16,532.98", "$17,126.40", "$17,180.96"],
            ["30", "$15,000.00", "$33,219.42", "$34,677.44", "$34,812.29"],
          ]}
        />
      </GuideSection>

      <GuideSection id="growth" n={10} kicker="Comparison" title="How the gap grows">
        <Bars
          format={(n) => "$" + Math.round(n).toLocaleString("en-US")}
          items={[
            { label: "Simple, 30 years", value: 15_000 },
            { label: "Yearly compounding", value: 33_219 },
            { label: "Monthly compounding", value: 34_677 },
            { label: "Daily compounding", value: 34_812 },
          ]}
        />
        <p>
          Simple interest grows in a straight line; compound interest grows on a curve that bends upward. After 30 years, compounding has more than doubled the interest. That is
          why savers want compounding and borrowers are better off with simple interest. For long-term saving, see our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="where-used" n={11} kicker="In real life" title="Where simple interest is used">
        <ul>
          <li>
            <strong>Car loans and many personal loans</strong>: interest accrues daily on the balance (a simple-interest amortizing loan).
          </li>
          <li>
            <strong>Short-term business loans and lines of credit</strong>, often on actual/360.
          </li>
          <li>
            <strong>Bonds and notes</strong>: coupons are simple interest on the face value, usually on 30/360 for corporate bonds.
          </li>
          <li>
            <strong>Loans between family members</strong> and promissory notes, which often state a simple yearly rate.
          </li>
          <li>
            <strong>Interest on late payments</strong> such as court judgments and some tax underpayments, set by statute.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="auto" n={12} kicker="Car loans" title="Simple-interest car loans">
        <p>
          Most auto loans in the US are simple-interest loans. Your payment is fixed, but each day the lender charges interest on what you still owe: balance × rate ÷ 365. When a
          payment arrives, it first covers the interest that has built up since the last payment and the rest reduces the balance. Because interest is never charged on interest,
          the balance falls steadily as long as you pay on time. Our <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}shows the full payment schedule.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={13} kicker="Car loans" title="Paying early or late">
        <p>
          On a simple-interest loan, the day your payment arrives matters. With a $20,000 balance at 7%, interest builds at $3.84 a day. Pay 10 days late and about $38.36 more of
          that payment goes to interest and less to the balance, on top of any late fee. Pay 10 days early and the same amount shifts the other way. Over the life of a loan,
          habitually paying a few days early trims the total interest; habitually paying late adds to it, and can leave a balance owing at the end.
        </p>
        <Callout tone="warn" title="Late payments can stretch the loan">
          If you are often late, more of each fixed payment goes to interest, so the last scheduled payment may not clear the loan. Check your final payoff amount before the last
          payment.
        </Callout>
      </GuideSection>

      <GuideSection id="savings" n={14} kicker="Saving" title="Savings, CDs and Treasury bills">
        <p>
          Most bank savings accounts and CDs compound and quote an APY. Simple interest shows up when interest is paid out rather than added: a CD that sends its interest to
          your checking account each month earns simple interest on the deposit. Treasury bills are sold at a discount and the yield is often quoted on an actual/360 basis: at a
          4% rate, $10,000 for 182 days on actual/360 is $202.22. Our <a href="/us/savings/cd-calculator">CD calculator</a>{" "}shows compounding CDs and early withdrawal
          penalties.
        </p>
      </GuideSection>

      <GuideSection id="rearrange" n={15} kicker="The maths" title="Solving for rate or time">
        <p>The formula rearranges to answer other questions:</p>
        <ul>
          <li>
            <strong>Rate:</strong> r = I ÷ (P × t). $300 earned on $10,000 over 180 days is about 6.08% a year.
          </li>
          <li>
            <strong>Time:</strong> t = I ÷ (P × r). Earning $1,000 on $10,000 at 5% takes 2 years.
          </li>
          <li>
            <strong>Principal:</strong> P = I ÷ (r × t). To earn $500 in a year at 5%, you need $10,000.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="add-on" n={16} kicker="Watch out" title="Simple interest vs add-on interest">
        <p>
          Some lenders, especially for used cars and furniture, use add-on interest: the simple interest for the whole term is worked out on the full amount at the start and
          added to the loan, then split into equal payments. Because you pay interest on the full amount even as you repay it, the true APR is close to double the add-on rate on
          a long loan. Always ask for the APR, which the Truth in Lending Act requires lenders to show. Our <a href="/us/loans/apr-calculator">APR calculator</a>{" "}can work it out
          from the payment.
        </p>
      </GuideSection>

      <GuideSection id="apr" n={17} kicker="Rates" title="Simple interest and APR">
        <p>
          An APR is itself a simple yearly rate: the rate per period times the number of periods in a year. It does not include compounding. The APY, used for savings, does. So a
          loan at 12% APR charged monthly has an APY of about 12.68%, while a simple-interest loan at 12% charged on the original balance only would cost exactly 12% a year.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ol>
          <li>Using the rate as a whole number: 5% must be 0.05 in the formula.</li>
          <li>Forgetting to turn months or days into years.</li>
          <li>Assuming every lender uses 365 days. Business loans often use 360.</li>
          <li>Applying simple interest to a savings account that compounds; the real figure will be a little higher.</li>
          <li>Treating an add-on rate as if it were an APR.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator">
        <p>
          Choose a loan or savings, enter the amount and the yearly rate, then set the time as a length or as two dates. Under More options, pick the day count and the
          compounding to compare against. The results show the interest, the total, the interest per day, the same sum on all three day counts, and a chart of simple against
          compound growth.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Simple interest", "I = P × r × t"],
            ["Compound interest", "A = P × (1 + r ÷ m)^(m × t)"],
            ["$10,000 at 5% for 1 year", "$500.00 (actual/365), $506.94 (actual/360)"],
            ["5% on actual/360 over a full year", "about 5.07% in practice"],
            ["January 15 to October 10, 2026", "268 actual days, 265 on 30/360"],
            ["$20,000 at 7%, interest a day", "$3.84"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
