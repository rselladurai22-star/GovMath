import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Early repayment charges — the guide. Figures from src/lib/property/early-repayment.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an early repayment charge is" },
  { id: "why", title: "Why lenders charge it" },
  { id: "when", title: "When you pay one, and when you do not" },
  { id: "how-much", title: "How much it costs" },
  { id: "stepping", title: "Charges that fall each year" },
  { id: "find", title: "Finding your charge" },
  { id: "allowance", title: "The 10% overpayment allowance" },
  { id: "full-or-part", title: "Repaying in full or in part" },
  { id: "switch-example", title: "Worked example: switching to a lower rate" },
  { id: "timing", title: "Waiting for the charge to fall" },
  { id: "break-even", title: "The break-even rate" },
  { id: "overpay-example", title: "Worked example: a lump sum" },
  { id: "split", title: "Splitting an overpayment" },
  { id: "moving", title: "Moving home: porting your mortgage" },
  { id: "selling", title: "Selling without buying again" },
  { id: "product-transfer", title: "Booking a new deal early" },
  { id: "tracker", title: "Tracker and variable rates" },
  { id: "hardship", title: "If you are struggling" },
  { id: "tax", title: "Tax and early repayment charges" },
  { id: "checklist", title: "Before you repay: a checklist" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Mortgage fees explained", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-fees-explained" },
  { label: "MoneyHelper — Should you pay off your mortgage early?", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/should-you-pay-off-your-mortgage-early" },
  { label: "FCA — Mortgage Conduct of Business sourcebook (MCOB 12: charges)", href: "https://www.handbook.fca.org.uk/handbook/MCOB/12/" },
  { label: "FCA — Mortgages: your rights", href: "https://www.fca.org.uk/consumers/mortgages" },
  { label: "MoneyHelper — Remortgaging", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/remortgaging-to-cut-costs" },
];

export default function ErcGuide() {
  return (
    <Guide
      kicker="The early repayment charge guide"
      title="Early repayment charges explained"
      intro={
        <>
          Most fixed-rate and many tracker mortgages charge a fee if you repay more than your allowance before the deal ends. The charge can run to
          thousands of pounds, but it is predictable: it is a set percentage, it often falls each year, and there are several ways to avoid it. This guide
          explains how the charge is worked out, when it is worth paying, and how to time a switch, a move or an overpayment so it costs you as little as
          possible.
        </>
      }
      meta={["October 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>An early repayment charge (ERC) is usually <strong>1% to 5%</strong> of the amount you repay early, set out in your mortgage offer.</li>
          <li>Repaying a £200,000 balance with a 3% charge costs <strong>£6,000</strong>.</li>
          <li>Most lenders let you overpay <strong>10% of the balance a year</strong> with no charge.</li>
          <li>There is no charge once the deal ends, and you can usually book your next deal up to six months ahead.</li>
          <li>Paying the charge to switch is worth it only if the new rate is low enough and plenty of the deal is left.</li>
        </ul>
        <KeyStats
          items={[
            { value: "1% to 5%", label: "Typical charge" },
            { value: "10%", label: "Usual yearly overpayment allowance" },
            { value: "£6,000", label: "3% on a £200,000 balance" },
            { value: "6 months", label: "How early you can usually book a new deal" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an early repayment charge is">
        <p>
          An early repayment charge is a fee your lender can take if you pay off all or part of your mortgage during an initial deal period, such as a
          two- or five-year fixed rate. It applies to the amount you repay above any allowance. Once the deal ends and you move onto the lender&rsquo;s
          standard variable rate, there is normally no charge at all.
        </p>
        <p>
          The charge has to be set out in your mortgage offer and in the European Standardised Information Sheet (ESIS) you received before applying. The
          FCA requires an early repayment charge to be a reasonable pre-estimate of the lender&rsquo;s costs and to be expressed so you can understand it,
          usually as a percentage for each year of the deal.
        </p>
      </GuideSection>

      <GuideSection id="why" n={3} kicker="Background" title="Why lenders charge it">
        <p>
          When you fix your rate, your lender arranges its own funding at a fixed cost for the same period. If you leave early, it has to unwind that
          funding and loses the income it expected. The charge covers that cost. It is the reason fixed rates are cheaper than variable rates: you get a
          lower rate in return for staying for the whole deal.
        </p>
      </GuideSection>

      <GuideSection id="when" n={4} kicker="Triggers" title="When you pay one, and when you do not">
        <CompareCards
          columns={[
            {
              name: "Usually a charge",
              rows: [
                { label: "Remortgaging to another lender mid-deal", value: "On the whole balance" },
                { label: "Selling and not taking the mortgage with you", value: "On the whole balance" },
                { label: "Overpaying above the allowance", value: "On the excess" },
                { label: "Switching to a new deal with your lender early", value: "Often" },
              ],
            },
            {
              name: "Usually no charge",
              rows: [
                { label: "Repaying after the deal ends", value: "None" },
                { label: "Overpaying within the allowance", value: "None" },
                { label: "Porting the mortgage to a new home", value: "None on the ported amount" },
                { label: "Lifetime trackers and many variable rates", value: "Often none" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="how-much" n={5} kicker="The sums" title="How much it costs">
        <p>
          The charge is the percentage for the current year of your deal multiplied by the amount you repay above your allowance. Repaying in full, many
          lenders charge on the whole balance; some first deduct your unused allowance. On a £200,000 balance with a 3% charge:
        </p>
        <DataTable
          caption="A 3% charge on £200,000"
          head={["How the lender charges", "Amount charged on", "Charge"]}
          numeric={[1, 2]}
          rows={[
            ["On the whole balance", "£200,000", "£6,000"],
            ["Above the unused 10% allowance", "£180,000", "£5,400"],
          ]}
        />
      </GuideSection>

      <GuideSection id="stepping" n={6} kicker="Tiered charges" title="Charges that fall each year">
        <p>
          Most five-year fixes use a stepped charge such as 5%, 4%, 3%, 2% and 1%, falling at the start of each year of the deal. Two-year fixes often
          charge 2% then 1%, or a flat percentage throughout. On a £250,000 balance, a 5% to 1% schedule looks like this:
        </p>
        <DataTable
          caption="A five-year fix on £250,000"
          head={["Year of the deal", "Charge", "On £250,000"]}
          numeric={[1, 2]}
          rows={[
            ["Year 1", "5%", "£12,500"],
            ["Year 2", "4%", "£10,000"],
            ["Year 3", "3%", "£7,500"],
            ["Year 4", "2%", "£5,000"],
            ["Year 5", "1%", "£2,500"],
            ["After the deal ends", "0%", "£0"],
          ]}
        />
        <p>
          In practice the balance falls as you make payments, so each year&rsquo;s charge is a little lower than the table shows. The calculator counts
          the years back from the date your deal ends, which is how most offers define them. Some lenders use calendar dates instead, so check yours.
        </p>
      </GuideSection>

      <GuideSection id="find" n={7} kicker="Paperwork" title="Finding your charge">
        <p>Your charge and the dates it changes are in:</p>
        <ul>
          <li>your mortgage offer, usually in a section headed &ldquo;What happens if you do not want this mortgage any more&rdquo;;</li>
          <li>the ESIS (Key Facts) document you were given before applying;</li>
          <li>your annual mortgage statement, or your lender&rsquo;s app or website.</li>
        </ul>
        <p>
          For an exact figure on a given date, ask your lender for a <strong>redemption statement</strong>. It shows the balance, the interest to that
          day, the early repayment charge and any exit fee. Statements are usually free and valid for a set number of days.
        </p>
      </GuideSection>

      <GuideSection id="allowance" n={8} kicker="Overpayments" title="The 10% overpayment allowance">
        <p>
          Most lenders let you overpay up to 10% of the balance each year without a charge. The year usually runs from the start of your deal or from
          1 January, and the 10% is usually worked out on the balance at the start of that year. Any regular monthly overpayments count towards it.
        </p>
        <p>
          On £200,000, that is £20,000 a year you can pay off for free. Unused allowance does not normally carry over: if you overpay nothing this year,
          next year&rsquo;s limit is still 10%. Some lenders set a lower limit, especially on the cheapest deals, so check before you pay.
        </p>
        <Callout tone="warn" title="Going over by a little still costs">
          If you pay £1 over the allowance, the charge applies to that £1. But if your lender takes the allowance into account only on part repayments,
          repaying everything can be charged on the whole balance.
        </Callout>
      </GuideSection>

      <GuideSection id="full-or-part" n={9} kicker="Two questions" title="Repaying in full or in part">
        <p>The calculator answers two different questions.</p>
        <ul>
          <li>
            <strong>Leave the deal or repay it all.</strong> You are remortgaging, selling or clearing the mortgage. It works out the charge today and
            compares switching now with waiting for the charge to fall or the deal to end.
          </li>
          <li>
            <strong>Overpay a lump sum.</strong> You have savings, an inheritance or a bonus. It works out how much is free, the charge on the rest, and
            the interest the overpayment saves.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="switch-example" n={10} kicker="Worked example" title="Worked example: switching to a lower rate">
        <p>
          You owe £200,000 at 5% with 20 years left. Your deal has 30 months to run and the charge is 3% now, falling to 2% and then 1%. A new deal at 4%
          would cut your payment by about £108 a month.
        </p>
        <WorkedExample
          title="£200,000 at 5%, 30 months left, 3% charge, switching to 4%"
          steps={[
            { label: "Monthly payment now", value: "£1,320" },
            { label: "Monthly payment at 4%", value: "£1,212" },
            { label: "Charge to leave today", value: "£6,000" },
            { label: "Interest saved by switching now rather than in 30 months", value: "£4,899" },
          ]}
          total={{ label: "Worse off by switching now", value: "£1,101" }}
        />
        <p>
          The new rate saves less interest than the charge costs, so waiting is cheaper. At 3.5% the sums flip: switching now leaves you about £1,335
          better off than waiting for the deal to end, and at 3% about £3,761.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={11} kicker="Timing" title="Waiting for the charge to fall">
        <p>
          Because the charge steps down, switching just after a step can beat switching today. In the example, with a new rate of 3.5%, the charge falls
          from 3% to 2% in 6 months, from about £6,000 to about £3,941. Switching then leaves you about £1,899 better off than waiting for the deal to end,
          against £1,335 if you switch today.
        </p>
        <Timeline
          items={[
            { when: "Now", what: "3% charge: £6,000", detail: "Gain against waiting for the deal to end: £1,335 at 3.5%." },
            { when: "In 6 months", what: "2% charge: £3,941", detail: "Gain: £1,899. The best time to switch at 3.5%." },
            { when: "In 18 months", what: "1% charge: £1,909", detail: "Gain: £981." },
            { when: "In 30 months", what: "Deal ends: no charge", detail: "Move to a new deal booked in advance." },
          ]}
        />
        <p>
          The calculator shows the gain at each step for your own figures. Rates can change while you wait, so if a good rate is available now, ask
          whether it can be held until the step date.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={12} kicker="Rule of thumb" title="The break-even rate">
        <p>
          For any charge and time left, there is a new rate at which paying the charge now and waiting cost the same. In the example it is about
          <strong> 3.77%</strong>: a deal below that is worth switching to now; above it, it is cheaper to wait. The calculator shows this as the break-even
          new rate.
        </p>
        <p>
          The less time left on the deal, the lower the break-even rate, because there are fewer months of savings to set against the charge. With only 4
          months left and a 2% charge on £200,000 (£4,000), even a 0% rate would not save enough interest, so no new rate makes switching early worth it.
        </p>
      </GuideSection>

      <GuideSection id="overpay-example" n={13} kicker="Worked example" title="Worked example: a lump sum">
        <p>
          On the same £200,000 mortgage at 5%, you want to pay off £30,000. Your allowance is 10% of the balance, £20,000, so £10,000 is above it and
          charged at 3%.
        </p>
        <WorkedExample
          title="Overpaying £30,000 with a 10% allowance and a 3% charge"
          steps={[
            { label: "Free under the allowance", value: "£20,000" },
            { label: "Charged at 3%", value: "£10,000" },
            { label: "Early repayment charge", value: "£300" },
            { label: "Interest saved by the end of the deal", value: "£3,986" },
            { label: "Interest saved over the mortgage", value: "£42,581" },
          ]}
          total={{ label: "Better off overall, after the charge", value: "£42,281" }}
        />
        <p>
          Keeping the same monthly payment, the mortgage ends about 4 years and 6 months sooner. Overpaying just the free £20,000 saves about £30,182 of
          interest and takes about 3 years and 2 months off. To plan regular monthly overpayments instead, use the{" "}
          <a href="/uk/property/mortgage-overpayment">mortgage overpayment calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="split" n={14} kicker="Options" title="Splitting an overpayment">
        <p>
          You can avoid the charge by paying the free amount now and the rest the day your deal ends, or in the next deal year when your allowance resets.
          In the example, paying £20,000 now and £10,000 in 30 months saves about £40,034 of interest, with no charge.
        </p>
        <p>
          Paying everything now saves £42,581 less the £300 charge, £42,281. So here, paying the charge and overpaying now is about £2,247 better than
          splitting, because the money starts saving 5% straight away. The answer changes with the rate, the charge and how long is left; the calculator
          compares both for your figures.
        </p>
        <Callout title="Savings interest matters too">
          If you keep the money in savings while you wait, the interest it earns, after tax, narrows the gap. The{" "}
          <a href="/uk/investing/savings-interest">savings interest calculator</a>{" "}shows what it would earn. A savings rate close to your mortgage rate
          makes waiting more attractive.
        </Callout>
      </GuideSection>

      <GuideSection id="moving" n={15} kicker="Moving home" title="Moving home: porting your mortgage">
        <p>
          Most mortgages are portable: you can move the deal, with its rate and remaining charge period, to a new property. You must apply again and pass
          the lender&rsquo;s <a href="/uk/property/mortgage-affordability">affordability checks</a>. If you port, no charge is due on the amount you move.
        </p>
        <ul>
          <li>If you need to borrow more, the extra is usually on one of the lender&rsquo;s current deals, which may end on a different date.</li>
          <li>If you borrow less, the charge may apply to the part you repay.</li>
          <li>Some lenders refund the charge if you complete on the new property within a set time, often 3 to 6 months.</li>
        </ul>
      </GuideSection>

      <GuideSection id="selling" n={16} kicker="Selling" title="Selling without buying again">
        <p>
          If you sell and do not take the mortgage with you, for example moving into rented housing or with a partner, the charge applies to the whole
          balance. Your solicitor pays it out of the sale proceeds, using the redemption statement. Time the completion date for just after a step-down,
          or after the deal ends, if you can.
        </p>
      </GuideSection>

      <GuideSection id="product-transfer" n={17} kicker="Remortgaging" title="Booking a new deal early">
        <p>
          The simplest way to avoid a charge is not to leave early. Most lenders let you choose a product transfer (a new deal with the same lender) up to
          3 to 6 months before your current deal ends, and most other lenders hold a remortgage offer for about 6 months. The new deal then starts the
          day after the old one ends, with no charge. Use our <a href="/uk/property/remortgage">remortgage calculator</a>{" "}to compare deals over their whole length.
        </p>
      </GuideSection>

      <GuideSection id="tracker" n={18} kicker="Other mortgages" title="Tracker and variable rates">
        <p>
          Many tracker deals have charges for the initial period, just like fixes. Lifetime trackers and standard variable rates often have no charge, so
          you can repay at any time, though some lenders charge on discounted variable deals. Offset mortgages usually let you reduce interest with your
          savings without counting as an overpayment.
        </p>
      </GuideSection>

      <GuideSection id="hardship" n={19} kicker="Help" title="If you are struggling">
        <p>
          If you need to sell because you cannot keep up payments, tell your lender early. FCA rules require lenders to treat customers in payment
          difficulty fairly and to consider options such as a payment holiday, a longer term or a temporary switch to interest-only. Some lenders waive
          or reduce the charge in hardship, though they do not have to. Free debt advice is available from MoneyHelper, StepChange and Citizens Advice.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={20} kicker="Tax" title="Tax and early repayment charges">
        <p>
          For your own home, the charge is not tax-deductible. For a <a href="/uk/property/buy-to-let-yield">buy-to-let</a>{" "}mortgage, an early repayment charge may count as a cost of the loan.
          If it does, individual landlords get basic rate relief on it, as on mortgage interest, while companies may deduct it in full. The rules
          depend on why you repaid, so ask an accountant before you claim.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={21} kicker="Checklist" title="Before you repay: a checklist">
        <ul>
          <li>Find the charge, its dates and how it is calculated in your mortgage offer.</li>
          <li>Check how much of this year&rsquo;s overpayment allowance you have left.</li>
          <li>Ask for a redemption statement for the date you plan to repay.</li>
          <li>Compare switching now, after the next step-down and at the end of the deal.</li>
          <li>If you are moving, ask about porting and any refund of the charge.</li>
          <li>Keep an emergency fund before overpaying: money paid off a mortgage is hard to get back.</li>
          <li>Check for an exit (deeds release) fee, usually under £200, which is separate from the charge.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          caption="£200,000 at 5%, 20 years left, 30 months of a 3%, 2%, 1% charge"
          head={["Measure", "Figure"]}
          numeric={[1]}
          rows={[
            ["Charge to repay in full now", "£6,000"],
            ["Charge if the allowance is deducted", "£5,400"],
            ["Free overpayment this year (10%)", "£20,000"],
            ["Break-even new rate to switch now", "3.77%"],
            ["Charge on a £30,000 overpayment", "£300"],
            ["Interest saved by overpaying £30,000", "£42,581"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
