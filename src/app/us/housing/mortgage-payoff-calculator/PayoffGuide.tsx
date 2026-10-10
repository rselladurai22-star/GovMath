import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Mortgage payoff guide. Figures from src/lib/us/home-equity.ts (earlyPayoff, extraForTarget, prepayVsInvest), next payment November 2026. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "Why extra payments work" },
  { id: "example", title: "A worked example" },
  { id: "monthly", title: "Extra every month" },
  { id: "biweekly", title: "Biweekly payments" },
  { id: "lump", title: "A lump sum" },
  { id: "yearly", title: "Once a year" },
  { id: "target", title: "Picking a payoff date" },
  { id: "invest", title: "Prepay or invest?" },
  { id: "low-rate", title: "If your rate is low" },
  { id: "taxes", title: "Taxes on both sides" },
  { id: "first", title: "What to do first" },
  { id: "penalty", title: "Prepayment penalties" },
  { id: "servicer", title: "Making sure it goes to principal" },
  { id: "recast", title: "Recasting instead" },
  { id: "refinance", title: "Refinancing to a shorter term" },
  { id: "pmi", title: "Extra payments and PMI" },
  { id: "retire", title: "Paying off before retirement" },
  { id: "final", title: "The final payoff" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What is a prepayment penalty?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-prepayment-penalty-en-1957/" },
  { label: "CFPB: When can I remove private mortgage insurance (PMI) from my loan?", href: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" },
  { label: "CFPB: How do I get a payoff amount for my mortgage?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-payoff-amount-is-it-the-same-as-my-current-balance-en-205/" },
  { label: "IRS Publication 936: Home Mortgage Interest Deduction", href: "https://www.irs.gov/publications/p936" },
  { label: "Investor.gov: Compound interest calculator", href: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
];

export default function PayoffGuide() {
  return (
    <Guide
      kicker="The mortgage payoff guide"
      title="How to pay off your mortgage early, and whether you should"
      intro={
        <>
          Paying a little more than your mortgage asks can take years off the loan and save tens of thousands in interest. This guide compares the ways to do it, shows how to
          work out the extra needed for a target date, and weighs prepaying against investing the same money.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>On {usd(300_000)} at 6.5% with 27 years left, the payment is $1,966.66 and {usd(337_199)} of interest is still ahead.</li>
          <li>An extra $200 a month ends the loan in March 2048 instead of October 2053 and saves {usd(81_179)}.</li>
          <li>To be done in 20 years, pay $270.06 more each month. That saves {usd(100_388)}.</li>
          <li>Prepaying earns your mortgage rate, risk free. Investing only wins if it earns more than that after tax.</li>
        </ul>
        <KeyStats
          items={[
            { value: "5 yrs 7 mos", label: "Time saved by $200 a month extra" },
            { value: usd(81_179), label: "Interest saved by $200 a month" },
            { value: "$270.06", label: "Extra a month to finish in 20 years" },
            { value: "6.5%", label: "Return that makes prepaying and investing equal" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="Why extra payments work">
        <p>
          Each month, interest is charged on the balance you still owe. An extra dollar of principal removes a dollar of balance for good, so it never charges interest again. On a
          6.5% loan that dollar saves 6.5 cents a year, every year, until the loan would have ended. The required payment stays the same, so more of each later payment goes to
          principal and the last payment comes sooner.
        </p>
        <p>
          The calculator works from your current balance, rate and time left, so it fits a loan you took out years ago as well as a new one. The{" "}
          <a href="/us/housing/amortization-calculator">amortization calculator</a>{" "}shows the full schedule from the start of a loan.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$300,000 left at 6.5%, 27 years to go, next payment November 2026"
          steps={[
            { label: "Monthly payment", note: "Principal and interest", value: "$1,966.66" },
            { label: "Last payment, no extra", value: "October 2053" },
            { label: "Interest still to pay", value: usd(337_199) },
            { label: "With $200 a month extra", note: `${usd(51_200)} of extra principal in all`, value: "March 2048" },
          ]}
          total={{ label: "Interest saved", value: usd(81_179) }}
        />
        <p>Every extra dollar here saves about $1.59 of interest, and the loan ends 5 years 7 months sooner.</p>
      </GuideSection>

      <GuideSection id="monthly" n={4} kicker="Strategy" title="Extra every month">
        <DataTable
          caption="$300,000 at 6.5% with 27 years left"
          head={["Extra each month", "Last payment", "Time saved", "Interest saved"]}
          numeric={[3]}
          rows={[
            ["$100", "August 2050", "3 years 2 months", usd(46_838)],
            ["$200", "March 2048", "5 years 7 months", usd(81_179)],
            ["$250", "March 2047", "6 years 7 months", usd(95_216)],
            ["$500", "June 2043", "10 years 4 months", usd(146_227)],
            ["$1,000", "January 2039", "14 years 9 months", usd(201_414)],
          ]}
        />
        <p>
          A fixed monthly extra is the simplest plan: set it up once with your servicer and forget it. Each step up saves more, though the saving per dollar shrinks as the loan
          gets shorter.
        </p>
      </GuideSection>

      <GuideSection id="biweekly" n={5} kicker="Strategy" title="Biweekly payments">
        <p>
          Paying half the payment every two weeks means 26 half payments a year: 13 full payments instead of 12. On the example loan that is the same as about $163.89 extra a
          month. It ends the loan in January 2049, 4 years 9 months early, and saves {usd(69_864)}.
        </p>
        <Callout tone="warn" title="Do it yourself">
          Some third-party biweekly programs charge setup or transaction fees, and some hold your money until a full payment builds up. Adding one-twelfth of your payment to each
          monthly payment gets the same result for free.
        </Callout>
      </GuideSection>

      <GuideSection id="lump" n={6} kicker="Strategy" title="A lump sum">
        <p>
          A lump sum now has the most time to work. {usd(10_000)} paid with the next payment ends the loan in July 2051, 2 years 3 months early, and saves {usd(43_305)}. A{" "}
          {usd(25_000)} lump sum saves {usd(95_986)} and ends the loan in September 2048. Windfalls such as an inheritance, a bonus or the sale of another property are the usual
          source.
        </p>
      </GuideSection>

      <GuideSection id="yearly" n={7} kicker="Strategy" title="Once a year">
        <p>
          If your budget is tight month to month, a yearly extra works too. {usd(2_000)} every April, perhaps from a tax refund, ends the example loan in December 2048 and saves{" "}
          {usd(71_022)}. Combine plans for a bigger effect: $200 a month plus biweekly payments ends it in April 2045, 8 years 6 months early, saving {usd(121_704)}.
        </p>
        <Bars
          format={usd}
          items={[
            { label: "$100 a month", value: 46_838 },
            { label: "$10,000 now", value: 43_305 },
            { label: "Biweekly", value: 69_864 },
            { label: "$2,000 each April", value: 71_022 },
            { label: "$200 a month", value: 81_179 },
            { label: "$200 + biweekly", value: 121_704 },
          ]}
        />
      </GuideSection>

      <GuideSection id="target" n={8} kicker="Target date" title="Picking a payoff date">
        <p>
          Many people want the mortgage gone by a date: retirement, a child starting college, a 50th birthday. Choose &ldquo;Pick a payoff date&rdquo; and the calculator finds the
          smallest extra monthly payment that gets you there, to the cent.
        </p>
        <DataTable
          caption="$300,000 at 6.5% with 27 years left"
          head={["Pay off in", "Extra each month", "Last payment", "Interest saved"]}
          numeric={[1, 3]}
          rows={[
            ["20 years", "$270.06", "October 2046", usd(100_388)],
            ["15 years", "$646.66", "October 2041", usd(166_802)],
            ["10 years", "$1,439.78", "October 2036", usd(228_427)],
          ]}
        />
      </GuideSection>

      <GuideSection id="invest" n={9} kicker="Trade-off" title="Prepay or invest?">
        <p>
          The real question is what else the money could do. The calculator compares two people with the same budget until the original payoff date. One prepays, then invests the
          whole payment once the loan is gone. The other pays the normal payment and invests the extra every month.
        </p>
        <DataTable
          caption="$200 a month extra on $300,000 at 6.5%, 27 years left: investments by October 2053"
          head={["Return on investments", "Invest the extra", "Prepay, then invest", "Better choice"]}
          numeric={[1, 2]}
          rows={[
            ["4%", usd(116_364), usd(163_368), "Prepay"],
            ["6%", usd(161_309), usd(173_071), "Prepay"],
            ["8%", usd(228_276), usd(183_521), "Invest"],
            ["10%", usd(329_140), usd(194_784), "Invest"],
          ]}
        />
        <p>
          The two come out level at a 6.5% return, exactly the mortgage rate. Prepaying is a guaranteed return at your loan rate. Stocks have beaten that over long periods, but
          with real risk of years when they do not. Savings accounts and Treasury bills are safe but usually pay less than a mortgage costs.
        </p>
      </GuideSection>

      <GuideSection id="low-rate" n={10} kicker="Trade-off" title="If your rate is low">
        <p>
          Many owners locked in rates near 3% in 2020 and 2021. For them, prepaying is a weak use of spare cash when safe savings pay more. Take {usd(250_000)} at 3% with 25 years
          left: $300 a month extra saves {usd(30_826)} of interest and 6 years 9 months, but investing the same money at 4.5% would leave {usd(24_928)} more by the original payoff
          date. The break-even return is 3%.
        </p>
      </GuideSection>

      <GuideSection id="taxes" n={11} kicker="Taxes" title="Taxes on both sides">
        <p>
          If you itemize and deduct mortgage interest, your loan&rsquo;s real cost is lower: a 6.5% rate in the 24% bracket costs about 4.94% after tax. Most households take the
          standard deduction ({usd(32_200)} for married couples filing jointly in 2026), so for them the full rate applies. On the other side, investment gains in a taxable account
          are taxed, while gains in a 401(k), IRA or Roth IRA grow tax-deferred or tax-free. The comparison above is before tax, so adjust the return you enter to match.
        </p>
      </GuideSection>

      <GuideSection id="first" n={12} kicker="Priorities" title="What to do first">
        <ol>
          <li>Keep an emergency fund of three to six months of costs. Money in your home is hard to get back out quickly.</li>
          <li>Take any employer 401(k) match: it is an instant return no mortgage can beat. The <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows its value.</li>
          <li>Pay off higher-rate debt such as credit cards first; the <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}helps order them.</li>
          <li>Then decide between extra mortgage payments and investing, using your rate and your comfort with risk.</li>
        </ol>
      </GuideSection>

      <GuideSection id="penalty" n={13} kicker="Check first" title="Prepayment penalties">
        <p>
          Most US mortgages have no prepayment penalty. Federal rules since 2014 allow one only on certain fixed-rate loans, and only in the first three years. Your Loan Estimate,
          Closing Disclosure and note say whether yours has one. If it does, the calculator&rsquo;s savings are reduced by the penalty in those years.
        </p>
      </GuideSection>

      <GuideSection id="servicer" n={14} kicker="How to pay" title="Making sure it goes to principal">
        <p>
          When you pay extra, tell the servicer to apply it to principal. Online portals usually have a box for &ldquo;additional principal&rdquo;. Without that instruction, some
          servicers treat extra money as an early payment of next month&rsquo;s bill, which does not cut interest. Check the next statement: the balance should fall by the extra
          amount on top of the normal principal.
        </p>
      </GuideSection>

      <GuideSection id="recast" n={15} kicker="Options" title="Recasting instead">
        <p>
          After a large lump sum, some servicers will recast the loan: they keep your rate and end date but recompute a lower payment on the smaller balance, usually for a fee of a
          few hundred dollars. Recasting lowers your monthly bill and keeps flexibility, but saves less interest than leaving the payment unchanged and finishing early.
        </p>
      </GuideSection>

      <GuideSection id="refinance" n={16} kicker="Options" title="Refinancing to a shorter term">
        <CompareCards
          columns={[
            {
              name: "Pay extra",
              rows: [
                { label: "Rate", value: "Your current rate" },
                { label: "Costs", value: "None" },
                { label: "Flexibility", value: "Stop any month" },
              ],
            },
            {
              name: "Refinance to 15 years",
              rows: [
                { label: "Rate", value: "Often lower" },
                { label: "Costs", value: "Closing costs, about 3% to 6%" },
                { label: "Flexibility", value: "Higher required payment" },
              ],
            },
          ]}
        />
        <p>
          A 15-year loan usually carries a lower rate, about 6.6% against 7.3% for 30 years in Freddie Mac&rsquo;s October 1, 2026 survey. That only helps if your current rate is
          above the new one. The <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}weighs the closing costs.
        </p>
      </GuideSection>

      <GuideSection id="pmi" n={17} kicker="PMI" title="Extra payments and PMI">
        <p>
          On a conventional loan with PMI, extra payments bring forward the day your balance reaches 80% of the home&rsquo;s original value, when you can ask in writing to cancel
          PMI. The automatic end at 78% follows the original schedule, so do not wait for it. Dropping PMI adds a second saving on top of the interest.
        </p>
      </GuideSection>

      <GuideSection id="retire" n={18} kicker="Planning" title="Paying off before retirement">
        <p>
          Entering retirement without a mortgage lowers the income you need each month, which can mean smaller withdrawals and less tax on them. Work back from your retirement
          date with the target option. Weigh it against your savings: a paid-off home with a thin 401(k) is less flexible than a small mortgage and a larger nest egg. The{" "}
          <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}shows whether your savings are on track.
        </p>
      </GuideSection>

      <GuideSection id="final" n={19} kicker="The end" title="The final payoff">
        <p>
          For the last payment, ask the servicer for a payoff statement: it adds interest up to the payoff date, so it differs from the balance on your statement. Afterward the
          lender should send a release of lien (or satisfaction of mortgage) and the county records it. Any escrow balance is refunded, and you start paying property tax and
          insurance yourself, so budget for them.
        </p>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Take the principal balance, rate and months left from your latest statement.</li>
          <li>Choose a plan: an extra amount, biweekly payments, or a target payoff date.</li>
          <li>Under More options, add a lump sum or a yearly extra, set your next payment date and the investment return to compare.</li>
          <li>Read the new payoff date, the interest saved and the prepay-or-invest card.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Biweekly payments", "13 monthly payments a year"],
            ["Biweekly as a monthly extra", "Payment ÷ 12"],
            ["Prepaying earns", "Your mortgage rate, risk free"],
            ["Prepayment penalties (where allowed)", "First 3 years only"],
            ["Ask to cancel PMI at", "80% of the original value"],
            ["Average 30-year rate (October 1, 2026)", "about 7.3%"],
            ["Average 15-year rate (October 1, 2026)", "about 6.6%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
