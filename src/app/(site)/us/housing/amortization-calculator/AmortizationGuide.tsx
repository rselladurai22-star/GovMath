import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Amortization guide. Figures from src/lib/us/home-equity.ts (datedSchedule), first payment December 2026. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What amortization means" },
  { id: "formula", title: "How the payment is worked out" },
  { id: "first-payment", title: "Inside your first payment" },
  { id: "example", title: "A 30-year schedule, year by year" },
  { id: "tipping", title: "The tipping point" },
  { id: "equity", title: "How fast you build equity" },
  { id: "term", title: "15, 20 or 30 years" },
  { id: "rate", title: "What the rate does to the schedule" },
  { id: "extra-monthly", title: "Extra monthly payments" },
  { id: "extra-yearly", title: "Yearly and one-time extras" },
  { id: "timing", title: "Why early extras count most" },
  { id: "recast", title: "Extra payments and recasting" },
  { id: "dates", title: "Payment dates and the first payment" },
  { id: "escrow", title: "What the schedule leaves out" },
  { id: "other-loans", title: "Car, personal and student loans" },
  { id: "arm", title: "Adjustable-rate and interest-only loans" },
  { id: "statement", title: "Checking your own statement" },
  { id: "taxes", title: "The schedule and your taxes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What is amortization and how could it affect my loan?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-loan-en-1943/" },
  { label: "CFPB: What is a prepayment penalty?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/" },
  { label: "CFPB: What is an escrow or impound account?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-140/" },
  { label: "Freddie Mac: Primary Mortgage Market Survey", href: "https://www.freddiemac.com/pmms" },
  { label: "IRS Publication 936: Home Mortgage Interest Deduction", href: "https://www.irs.gov/publications/p936" },
];

export default function AmortizationGuide() {
  return (
    <Guide
      kicker="The amortization guide"
      title="How a loan is paid down, payment by payment"
      intro={
        <>
          An amortization schedule shows every payment on a fixed-rate loan: how much pays interest, how much pays down the balance and what you still owe afterward. This guide
          explains why the early years are mostly interest, when that turns around, and how extra payments change the schedule.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            On {usd(300_000)} at 7.25% over 30 years, the payment is $2,046.53 a month and total interest is {usd(436_750)}, more than the amount borrowed.
          </li>
          <li>In the first year, {usd(21_655)} of your {usd(24_558)} in payments goes to interest. Only {usd(2_904)} reduces the balance.</li>
          <li>The payment does not split mostly toward principal until payment 246, in May 2047: more than 20 years in.</li>
          <li>An extra $200 a month pays the loan off in August 2049 instead of November 2056 and saves {usd(123_590)} of interest.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$2,046.53", label: "Monthly payment, $300,000 at 7.25%, 30 years" },
            { value: usd(436_750), label: "Total interest over 30 years" },
            { value: "88%", label: "Share of the first year's payments that is interest" },
            { value: usd(123_590), label: "Interest saved by $200 a month extra" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What amortization means">
        <p>
          To amortize a loan is to pay it off in equal installments that cover both interest and principal, so that the last payment leaves a balance of zero. Most US mortgages,
          car loans, personal loans and student loans work this way. The payment stays the same each month, but its make-up changes: interest is charged on the balance, so as the
          balance falls, the interest part shrinks and the principal part grows.
        </p>
        <p>
          The schedule is fixed the day the loan starts. Given the amount, the rate and the term, you can say exactly what you will owe after 37 payments or after 212. That is what
          this calculator shows, month by month, with dates.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={3} kicker="The maths" title="How the payment is worked out">
        <p>
          Lenders use one formula. With the loan amount P, the monthly rate r (the yearly rate ÷ 12) and the number of payments n, the payment is P × r ÷ (1 − (1 + r)<sup>−n</sup>
          ). It is the only level payment that clears the loan in exactly n months.
        </p>
        <p>
          Each month the lender then does two simple steps. Interest = balance × r. Principal = payment − interest. The new balance is the old balance minus that principal. Repeat
          360 times and you have the whole schedule. Interest is charged on what you still owe, not on the original amount, which is why the split shifts over time.
        </p>
      </GuideSection>

      <GuideSection id="first-payment" n={4} kicker="Worked example" title="Inside your first payment">
        <WorkedExample
          title="$300,000 at 7.25% for 30 years, first payment December 2026"
          steps={[
            { label: "Monthly rate", note: "7.25% ÷ 12", value: "0.6042%" },
            { label: "Monthly payment", note: "From the formula", value: "$2,046.53" },
            { label: "Interest in month 1", note: "$300,000 × 0.6042%", value: "$1,812.50" },
            { label: "Principal in month 1", note: "$2,046.53 − $1,812.50", value: "$234.03" },
          ]}
          total={{ label: "Balance after payment 1", value: "$299,765.97" }}
        />
        <p>
          Almost nine dollars in ten of that first payment is interest. The next month, interest is charged on $299,765.97, which is slightly less, so a few cents more go to
          principal. That small shift repeats every month for 30 years.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Schedule" title="A 30-year schedule, year by year">
        <DataTable
          caption="$300,000 at 7.25%, first payment December 2026: selected calendar years"
          head={["Year", "Principal paid", "Interest paid", "Balance at year end"]}
          numeric={[1, 2, 3]}
          rows={[
            ["2027", usd(2_921), usd(21_637), usd(296_845)],
            ["2031", usd(3_900), usd(20_658), usd(282_800)],
            ["2036", usd(5_599), usd(18_960), usd(258_449)],
            ["2046", usd(11_534), usd(13_024), usd(173_326)],
            ["2056", usd(21_717), usd(795), "$0"],
          ]}
        />
        <p>
          Every full year costs the same {usd(24_558)} in payments. In 2027 nearly all of it is interest; by 2056 nearly all of it is principal. The calculator shows every
          calendar year, and you can open any year to see its twelve monthly rows.
        </p>
      </GuideSection>

      <GuideSection id="tipping" n={6} kicker="Milestone" title="The tipping point">
        <p>
          The tipping point is the first payment where more goes to principal than to interest. On this loan it is payment 246, in May 2047, more than two-thirds of the way
          through. The higher the rate and the longer the term, the later it comes. At the same 7.25%, a 20-year loan tips at payment 126, a 15-year loan at payment 66 and a 10-year loan at payment 6.
        </p>
        <p>The calculator shows your tipping point in the first-year card. It is a good way to see how much of a long loan is spent just carrying the debt.</p>
      </GuideSection>

      <GuideSection id="equity" n={7} kicker="Equity" title="How fast you build equity">
        <DataTable
          caption="Balance and interest paid so far, $300,000 at 7.25% over 30 years"
          head={["After", "Balance", "Paid off", "Interest paid so far"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1 year", usd(297_096), usd(2_904), usd(21_655)],
            ["5 years", usd(283_136), usd(16_864), usd(105_928)],
            ["10 years", usd(258_931), usd(41_069), usd(204_515)],
            ["15 years", usd(224_188), usd(75_812), usd(292_563)],
            ["20 years", usd(174_319), usd(125_681), usd(365_486)],
            ["25 years", usd(102_741), usd(197_259), usd(416_699)],
          ]}
        />
        <p>
          You owe half the original amount only after payment 263, in October 2048, nearly 22 years in. Over the first five years you pay down less than {usd(17_000)}. This
          matters if you plan to sell or refinance: in the early years most of your equity comes from your down payment and any rise in the home&rsquo;s value, not from your
          payments.
        </p>
      </GuideSection>

      <GuideSection id="term" n={8} kicker="Term" title="15, 20 or 30 years">
        <CompareCards
          columns={[
            {
              name: "30 years at 7.25%",
              rows: [
                { label: "Payment", value: "$2,046.53" },
                { label: "Total interest", value: usd(436_750) },
              ],
            },
            {
              name: "20 years at 7.25%",
              rows: [
                { label: "Payment", value: "$2,371.13" },
                { label: "Total interest", value: usd(269_071) },
              ],
            },
            {
              name: "15 years at 6.6%",
              rows: [
                { label: "Payment", value: "$2,629.84" },
                { label: "Total interest", value: usd(173_372) },
              ],
            },
          ]}
        />
        <p>
          A shorter term raises the payment but cuts interest sharply, both because you borrow for less time and because 15-year loans usually carry lower rates. Freddie
          Mac&rsquo;s survey put the 15-year average about 0.7 points below the 30-year on October 1, 2026. Even at the same 7.25%, the 15-year payment of $2,738.59 brings total
          interest down to {usd(192_946)}.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={9} kicker="Rates" title="What the rate does to the schedule">
        <Bars
          format={usd}
          items={[
            { label: "3% for 30 years", value: 155_332 },
            { label: "4%", value: 215_609 },
            { label: "5.5%", value: 313_212 },
            { label: "6.5%", value: 382_633 },
            { label: "7.25%", value: 436_750 },
          ]}
        />
        <p>
          Total interest on {usd(300_000)} over 30 years climbs steeply with the rate. At 3% it is about half the loan; at 7.25% it is nearly one and a half times the loan. The
          payment moves less: from $1,264.81 at 3% to $2,046.53 at 7.25%. That is why a small rate cut can save tens of thousands over a full term, and why the{" "}
          <a href="/us/housing/mortgage-points-calculator">mortgage points calculator</a>{" "}is worth a look before you lock a rate.
        </p>
      </GuideSection>

      <GuideSection id="extra-monthly" n={10} kicker="Extra payments" title="Extra monthly payments">
        <DataTable
          caption="$300,000 at 7.25% over 30 years, first payment December 2026"
          head={["Extra each month", "Last payment", "Interest saved"]}
          numeric={[2]}
          rows={[
            ["None", "November 2056", "–"],
            ["$100", "August 2052", usd(73_785)],
            ["$200", "August 2049", usd(123_590)],
            ["$500", "February 2044", usd(210_853)],
          ]}
        />
        <p>
          Extra principal skips you ahead on the schedule. Each extra dollar removes a dollar of balance that would otherwise have charged 7.25% a year for the rest of the loan.
          With $100 a month, you put in {usd(30_800)} of extra principal and save {usd(73_785)} of interest.
        </p>
      </GuideSection>

      <GuideSection id="extra-yearly" n={11} kicker="Extra payments" title="Yearly and one-time extras">
        <p>
          Not everyone can spare money every month. A yearly extra, such as part of a tax refund, works too. Paying {usd(2_000)} extra every April on the same loan ends it in June
          2050 and saves {usd(109_920)} of interest, for {usd(48_000)} of extra principal in all.
        </p>
        <p>
          A one-time lump sum early in the loan is powerful. {usd(10_000)} paid with the seventh payment, in June 2027, moves the payoff from November 2056 to November 2053 and
          saves {usd(65_133)} of interest. The calculator lets you combine all three kinds of extra payment and see the effect on each month of the schedule.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={12} kicker="Timing" title="Why early extras count most">
        <p>
          The same {usd(10_000)} paid 20 years in, with the December 2046 payment, saves only {usd(9_942)} of interest and ends the loan in February 2056, nine months early.
          Paid in June 2027, it saved {usd(65_133)}. Early money has decades of interest to avoid; late money has only a few years.
        </p>
        <Callout title="Check for a prepayment penalty">
          Most mortgages made since 2014 have no prepayment penalty, and where one is allowed it can only apply in the first three years. Your Loan Estimate and Closing Disclosure
          say whether yours has one.
        </Callout>
      </GuideSection>

      <GuideSection id="recast" n={13} kicker="Options" title="Extra payments and recasting">
        <p>
          On a US mortgage, an extra payment does not lower your required payment. It shortens the loan instead, and the schedule above shows exactly that: the payment stays at
          $2,046.53 and the last payment moves earlier. Some servicers will &ldquo;recast&rdquo; the loan after a large lump sum, for a fee of a few hundred dollars: they
          recompute the payment over the remaining term on the new, lower balance. Recasting lowers your payment but saves less interest than keeping the payment and finishing
          early.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={14} kicker="Dates" title="Payment dates and the first payment">
        <p>
          Mortgage interest is paid in arrears: the payment due on January 1 covers December&rsquo;s interest. At closing you prepay interest from the closing date to the end of
          that month, and the first regular payment is usually due on the first day of the second month after closing. Close on October 20, 2026, for example, and the first
          payment is typically due December 1, 2026.
        </p>
        <p>
          Enter that first payment date in the calculator and every row of the schedule shows its month and year. The last payment date is the one to circle: it is when the home
          is yours outright.
        </p>
      </GuideSection>

      <GuideSection id="escrow" n={15} kicker="What is missing" title="What the schedule leaves out">
        <p>
          An amortization schedule covers principal and interest only. Most mortgage payments also include property tax and homeowners insurance, collected into an escrow
          account, and sometimes PMI. Those parts can change each year, so your actual bill can rise even on a fixed-rate loan. To see the full monthly cost with tax, insurance,
          PMI and HOA dues, use the <a href="/us/housing/mortgage-calculator">mortgage calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="other-loans" n={16} kicker="Other loans" title="Car, personal and student loans">
        <p>
          The same schedule applies to any fixed-rate installment loan. A {usd(30_000)} car loan at 7.5% over 60 months costs $601.14 a month and {usd(6_068)} of interest. Set the
          term in years (5 for 60 months) and the calculator does the rest. For loans with fees, compare the APR; the{" "}
          <a href="/us/loans/loan-calculator">loan calculator</a>{" "}covers personal loans with an origination fee, and the{" "}
          <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}adds sales tax and a trade-in.
        </p>
      </GuideSection>

      <GuideSection id="arm" n={17} kicker="Loan types" title="Adjustable-rate and interest-only loans">
        <p>
          On an adjustable-rate mortgage (ARM), the schedule holds only until the first rate change, often after five, seven or ten years. At each reset the lender recomputes the
          payment over the remaining term at the new rate. You can model that here by running the remaining balance at the new rate for the years left.
        </p>
        <p>
          Interest-only loans and home equity lines of credit do not amortize during their draw or interest-only period, so the balance does not fall at all unless you pay extra.
          The <a href="/us/housing/heloc-calculator">HELOC calculator</a>{" "}shows how the payment jumps when such a loan starts to amortize.
        </p>
      </GuideSection>

      <GuideSection id="statement" n={18} kicker="Checking" title="Checking your own statement">
        <p>
          Your monthly mortgage statement shows the principal and interest split of your last payment and your current balance. Compare them with the calculator&rsquo;s row for the
          same month. Small differences of a few cents come from rounding, which servicers do each month. A larger gap usually means the start date, rate or amount entered does not
          match the loan, or that an extra payment was applied to escrow rather than principal. When you send extra money, write &ldquo;apply to principal&rdquo; or choose that
          option online.
        </p>
      </GuideSection>

      <GuideSection id="taxes" n={19} kicker="Taxes" title="The schedule and your taxes">
        <p>
          If you itemize deductions, mortgage interest on up to {usd(750_000)} of debt used to buy, build or improve your home is generally deductible (IRS Publication 936). The
          yearly interest column in the schedule is close to what your servicer reports on Form 1098 each January. Because interest falls each year, the deduction shrinks over
          time. Most households take the standard deduction ({usd(32_200)} for married couples filing jointly in 2026), so for them the interest gives no tax benefit at all.
        </p>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the loan amount, the note rate (not the APR) and the term in years.</li>
          <li>Set the first payment date so the schedule shows real months.</li>
          <li>Under More options, add any monthly, yearly or one-time extra payment.</li>
          <li>Read the first-year card, the balance chart and the yearly table, and open a year to see each month.</li>
          <li>Share the page link: it keeps your inputs.</li>
        </ol>
        <p>
          To plan a payoff by a target date, or to compare paying extra with investing, use the <a href="/us/housing/mortgage-payoff-calculator">mortgage payoff calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Monthly rate", "Yearly rate ÷ 12"],
            ["Payment formula", "P × r ÷ (1 − (1 + r)^−n)"],
            ["$300,000 at 7.25%, 30 years", "$2,046.53 a month, $436,750 interest"],
            ["Same loan, 15 years at 6.6%", "$2,629.84 a month, $173,372 interest"],
            ["Average 30-year rate (October 1, 2026)", "about 7.3%"],
            ["Average 15-year rate (October 1, 2026)", "about 6.6%"],
            ["Mortgage interest deduction cap", "$750,000 of home debt"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
