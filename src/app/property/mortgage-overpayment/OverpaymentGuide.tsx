import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Mortgage overpayments — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "why", title: "Why overpaying saves so much" },
  { id: "monthly", title: "Regular monthly overpayments" },
  { id: "lump", title: "Lump sums" },
  { id: "timing", title: "Why earlier is better" },
  { id: "term-or-payment", title: "Shorter term or lower payment" },
  { id: "rates", title: "How the rate changes the saving" },
  { id: "allowance", title: "Allowances and early repayment charges" },
  { id: "save-or-overpay", title: "Overpay or save?" },
  { id: "invest", title: "Overpay or invest in a pension?" },
  { id: "how", title: "How to overpay" },
  { id: "remortgage", title: "Overpaying and remortgaging" },
  { id: "when-not", title: "When not to overpay" },
  { id: "bigger", title: "Bigger mortgages, bigger savings" },
  { id: "yearly-vs-monthly", title: "Yearly lump or monthly?" },
  { id: "fix-ends", title: "When your fix ends" },
  { id: "offset", title: "Offset and flexible mortgages" },
  { id: "isa", title: "Overpay or invest in an ISA?" },
  { id: "retirement", title: "Mortgage-free by retirement" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Overpaying your mortgage", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/should-you-pay-off-your-mortgage-early" },
  { label: "FCA — Consumer help, including mortgages", href: "https://www.fca.org.uk/consumers" },
  { label: "GOV.UK — Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "GOV.UK — Individual Savings Accounts", href: "https://www.gov.uk/individual-savings-accounts" },
];

export default function OverpaymentGuide() {
  return (
    <Guide
      kicker="The overpayment guide"
      title="Overpaying your mortgage, explained"
      intro={
        <>
          Paying a little extra into your mortgage can save tens of thousands of pounds in interest and years of payments. This
          guide shows how much different overpayments save, how lump sums compare, how to stay within your lender&apos;s
          allowance, and when saving or investing the money would be better.
        </>
      }
      meta={["Figures for 2026", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="why" n={1} kicker="The basics" title="Why overpaying saves so much">
        <p>
          Mortgage interest is charged on the balance you still owe. Every extra pound you pay goes straight off that balance, so
          you stop paying interest on it for the rest of the mortgage. Your regular payment then clears the balance sooner,
          because more of each payment goes to the loan and less to interest.
        </p>
        <p>
          Take a £200,000 repayment mortgage at 4.5% over 25 years. The monthly payment is £1,111.66, and over the full term you
          would pay £133,499 in interest: two-thirds of the amount borrowed. Overpaying cuts into that interest bill directly.
        </p>
        <Callout tone="good" title="A guaranteed, tax-free return">
          Each pound you overpay saves interest at your mortgage rate. Unlike savings interest, that saving is not taxed, and
          unlike investments, it is certain.
        </Callout>
      </GuideSection>

      <GuideSection id="monthly" n={2} kicker="Monthly overpayments" title="Regular monthly overpayments">
        <p>Here is what different monthly overpayments do to a £200,000 mortgage at 4.5% with 25 years left:</p>
        <DataTable
          caption="£200,000 at 4.5% over 25 years, keeping the same payment"
          head={["Extra each month", "Interest saved", "Mortgage-free sooner by", "Total overpaid"]}
          numeric={[1, 3]}
          rows={[
            ["£50", "£11,534", "1 year 10 months", "£13,850"],
            ["£100", "£21,142", "3 years 6 months", "£25,700"],
            ["£200", "£36,280", "6 years 1 month", "£45,200"],
            ["£300", "£47,708", "8 years 1 month", "£60,600"],
            ["£500", "£63,887", "11 years", "£83,500"],
            ["£1,000", "£85,961", "15 years 2 months", "£117,000"],
          ]}
        />
        <p>
          With £200 a month extra, you would clear the mortgage in about 19 years instead of 25. You would overpay £45,200 in
          total and save £36,280 of interest, so every £1 overpaid saves about 80p.
        </p>
        <Bars
          items={[
            { label: "£50 a month", value: 11_534 },
            { label: "£100 a month", value: 21_142 },
            { label: "£200 a month", value: 36_280 },
            { label: "£500 a month", value: 63_887 },
          ]}
        />
      </GuideSection>

      <GuideSection id="lump" n={3} kicker="Lump sums" title="Lump sums">
        <p>
          A one-off payment, such as a bonus, inheritance or savings, reduces the balance at once. A £10,000 lump sum on the same
          £200,000 mortgage saves £19,300 in interest and finishes the mortgage 2 years 2 months early.
        </p>
        <p>
          A yearly lump sum works like a monthly overpayment paid less often. Paying £2,000 at the start of each year from the
          second year saves £30,433 and clears the mortgage 5 years 1 month early.
        </p>
        <WorkedExample
          title="A £10,000 lump sum today"
          steps={[
            { label: "Interest without the lump sum", value: "£133,499" },
            { label: "Interest with the lump sum", value: "£114,199" },
          ]}
          total={{ label: "Interest saved", value: "£19,300" }}
        />
      </GuideSection>

      <GuideSection id="timing" n={4} kicker="Timing" title="Why earlier is better">
        <p>
          The longer the money stays off your balance, the more interest it saves. A pound overpaid with 25 years to go saves
          interest for 25 years; the same pound overpaid with 5 years to go saves interest for 5.
        </p>
        <DataTable
          caption="Your balance with and without £200 a month extra"
          head={["After", "Without overpaying", "With £200 a month", "Difference"]}
          numeric={[1, 2, 3]}
          rows={[
            ["5 years", "£175,716", "£162,287", "£13,429"],
            ["10 years", "£145,317", "£115,077", "£30,240"],
          ]}
        />
        <p>
          Early in a mortgage, most of each payment is interest. That is exactly when overpaying has the biggest effect, and when
          it most quickly improves your loan-to-value for your next remortgage.
        </p>
      </GuideSection>

      <GuideSection id="term-or-payment" n={5} kicker="Your choice" title="Shorter term or lower payment">
        <p>When you overpay, your lender either keeps your payment the same and shortens the term, or keeps the term and lowers your payment. Many recalculate the payment by default.</p>
        <CompareCards
          columns={[
            {
              name: "Shorten the term",
              rows: [
                { label: "Payment", value: "Stays the same" },
                { label: "End date", value: "Earlier" },
                { label: "£200 a month saves", value: "£36,280" },
                { label: "Best for", value: "Saving the most interest" },
              ],
            },
            {
              name: "Lower the payment",
              rows: [
                { label: "Payment", value: "Falls a little each time" },
                { label: "End date", value: "Unchanged" },
                { label: "£200 a month saves", value: "£18,998" },
                { label: "Best for", value: "More room in your budget" },
              ],
            },
          ]}
        />
        <p>
          If you want the biggest saving, ask your lender to reduce the term, or keep paying your original amount after they
          recalculate.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={6} kicker="Interest rates" title="How the rate changes the saving">
        <p>The higher your rate, the more each overpayment saves. £200 a month on a £200,000, 25-year mortgage saves:</p>
        <DataTable
          caption="Interest saved by £200 a month at different rates"
          head={["Mortgage rate", "Monthly payment", "Interest saved"]}
          numeric={[1, 2]}
          rows={[
            ["3%", "£948", "£21,622"],
            ["4%", "£1,056", "£31,067"],
            ["4.5%", "£1,112", "£36,280"],
            ["5%", "£1,169", "£41,843"],
            ["6%", "£1,289", "£54,078"],
          ]}
        />
      </GuideSection>

      <GuideSection id="allowance" n={7} kicker="Limits" title="Allowances and early repayment charges">
        <p>
          Most fixed-rate and discounted deals let you overpay up to <strong>10% of the balance each year</strong> without a
          charge. Above that, an early repayment charge (ERC) applies to the excess, often 1% to 5% depending on how long the
          deal has left.
        </p>
        <ul>
          <li>Check whether the allowance runs per calendar year or per year of the deal.</li>
          <li>Some lenders work out 10% of the balance at the start of the year, others of the original loan.</li>
          <li>Regular overpayments and lump sums usually share the same allowance.</li>
          <li>Tracker and standard variable rate mortgages often have no limit at all.</li>
        </ul>
        <Callout tone="warn" title="Check before a big lump sum">
          On a £200,000 balance, 10% is £20,000. A £30,000 payment would put £10,000 over the limit, and a 3% charge on that
          would cost £300.
        </Callout>
      </GuideSection>

      <GuideSection id="save-or-overpay" n={8} kicker="The comparison" title="Overpay or save?">
        <p>
          Overpaying saves interest at your mortgage rate, with no tax. Savings earn interest that may be taxed. To compare them
          fairly, convert your mortgage rate into the savings rate you would need before tax.
        </p>
        <DataTable
          caption="Savings rate needed to beat overpaying a 4.5% mortgage"
          head={["Tax on your savings interest", "Savings rate needed"]}
          numeric={[1]}
          rows={[
            ["None (ISA or within allowance)", "4.5%"],
            ["20% (basic rate)", "5.63%"],
            ["40% (higher rate)", "7.5%"],
            ["45% (additional rate)", "8.18%"],
          ]}
        />
        <p>
          The Personal Savings Allowance lets basic-rate taxpayers earn £1,000 of interest tax-free a year, and higher-rate
          taxpayers £500. ISAs are tax-free entirely. So for many people the fair comparison is simply the mortgage rate against
          the best tax-free savings rate.
        </p>
        <p>
          Savings have one big advantage: you can get the money back. Once you overpay a mortgage, getting it back usually means
          borrowing again.
        </p>
      </GuideSection>

      <GuideSection id="invest" n={9} kicker="Pensions" title="Overpay or invest in a pension?">
        <p>
          Pension contributions get tax relief, and many employers match extra contributions. A higher-rate taxpayer pays only
          60p for each £1 that goes into their pension. That head start is hard for mortgage overpayments to beat, though
          pensions are invested, can fall in value, and cannot be touched until at least age 55 (57 from 2028).
        </p>
        <p>
          Many people split the difference: take the full employer match first, then overpay the mortgage with what is left.
        </p>
      </GuideSection>

      <GuideSection id="how" n={10} kicker="Practical steps" title="How to overpay">
        <Timeline
          items={[
            { when: "1", what: "Check your deal", detail: "Find the allowance and any early repayment charges in your mortgage offer or online account." },
            { when: "2", what: "Choose term or payment", detail: "Tell your lender whether you want a shorter term or a lower payment." },
            { when: "3", what: "Set it up", detail: "Increase your direct debit, set up a standing order, or make a one-off card or bank payment." },
            { when: "4", what: "Track it", detail: "Keep a running total so you stay within the yearly allowance." },
          ]}
        />
      </GuideSection>

      <GuideSection id="remortgage" n={11} kicker="Remortgaging" title="Overpaying and remortgaging">
        <p>
          Overpaying lowers your balance, which lowers your loan-to-value. Crossing a band, such as from 76% to 75%, can unlock
          a cheaper rate on your next deal. When your fix ends, you can usually pay off any amount without a charge, so it is a
          good moment to put a lump sum in.
        </p>
      </GuideSection>

      <GuideSection id="when-not" n={12} kicker="Caution" title="When not to overpay">
        <ul>
          <li>If you have more expensive debts, such as credit cards or car finance, pay those first.</li>
          <li>If you have no emergency fund. Aim for three to six months of spending in easy-access savings.</li>
          <li>If you would lose an employer pension match.</li>
          <li>If the overpayment would trigger an early repayment charge larger than the interest saved.</li>
          <li>If you might need the money soon, for example for a move, a car or a baby.</li>
        </ul>
        <p>
          Some lenders offer flexible mortgages that let you borrow back overpayments, and offset mortgages that reduce
          interest using your savings while keeping them accessible.
        </p>
      </GuideSection>

      <GuideSection id="bigger" n={13} kicker="Scale" title="Bigger mortgages, bigger savings">
        <p>
          The larger the balance and the longer the term, the more interest each overpayment avoids. £200 a month extra on a
          £300,000 mortgage at 4.5% over 30 years saves £59,436 of interest and clears the mortgage 6 years 4 months early.
        </p>
        <p>
          Near the end of a mortgage the effect is smaller. With £120,000 left over 15 years at 4.5%, the same £200 a month
          saves £11,409 and finishes 3 years 6 months early, because there are fewer years of interest left to save.
        </p>
      </GuideSection>

      <GuideSection id="yearly-vs-monthly" n={14} kicker="Timing" title="Yearly lump or monthly?">
        <p>
          If you can, paying a year&apos;s overpayments up front saves slightly more than spreading them out. On the £200,000
          mortgage, £2,400 paid at the start of each year saves £38,031 and finishes 6 years 3 months early, compared with
          £36,280 and 6 years 1 month for £200 a month. The difference comes from the money being off the balance for longer.
        </p>
        <p>
          In practice, a monthly standing order is easier to stick to. The best plan is the one you will keep up.
        </p>
      </GuideSection>

      <GuideSection id="fix-ends" n={15} kicker="Remortgaging" title="When your fix ends">
        <p>
          The end of a fixed deal is often the best time to make a large overpayment, because early repayment charges no longer
          apply. On the £200,000 mortgage, after 5 years the balance would be about £175,716. Paying £10,000 off at that point,
          with 20 years left, saves £13,634 of interest and 1 year 9 months.
        </p>
        <p>
          Paying down before you remortgage can also move you into a lower loan-to-value band, so the new deal may be cheaper
          too. If you are moving to a new lender, ask your current lender how to make the payment before the switch.
        </p>
      </GuideSection>

      <GuideSection id="offset" n={16} kicker="Alternatives" title="Offset and flexible mortgages">
        <p>
          An <strong>offset mortgage</strong> links your savings to your mortgage. You pay interest only on the balance minus
          your savings, but the savings stay yours to withdraw. It is a way to get most of the benefit of overpaying without
          giving up access to the money. Offset rates are often a little higher than standard deals.
        </p>
        <p>
          A <strong>flexible mortgage</strong> lets you overpay and later borrow the overpayments back, or take a payment
          holiday. Check the terms: the lender may need to approve any drawdown.
        </p>
      </GuideSection>

      <GuideSection id="isa" n={17} kicker="Investing" title="Overpay or invest in an ISA?">
        <p>
          A stocks and shares ISA has historically returned more than mortgage rates over long periods, but with no guarantee:
          investments can fall, sometimes sharply, and you might need the money at a bad time. Overpaying gives a certain,
          tax-free return equal to your mortgage rate.
        </p>
        <p>
          A common approach is to do both: build an emergency fund first, take any employer pension match, then split spare
          money between overpaying and investing. The higher your mortgage rate, the stronger the case for overpaying.
        </p>
      </GuideSection>

      <GuideSection id="retirement" n={18} kicker="Planning" title="Mortgage-free by retirement">
        <p>
          Many people extend their term to keep payments affordable, then find the mortgage runs past their planned retirement.
          Lenders check whether you can afford payments after you retire, and an income drop with a mortgage still running can be
          a strain.
        </p>
        <p>
          Overpaying is a straightforward way to bring the end date forward. Use the calculator to find the monthly overpayment
          that ends your mortgage by a chosen age: increase the extra payment until the &quot;mortgage-free in&quot; figure
          fits your plans. Some people also plan to use part of their pension tax-free lump sum to clear what is left. That can
          work, but it reduces your retirement income, so take advice before relying on it.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={19} kicker="FAQs" title="Common questions">
        <h3>Is it better to overpay monthly or in a lump sum?</h3>
        <p>
          Pound for pound, the earlier the money is paid, the more it saves. A lump sum today beats the same total spread over
          the year, but regular overpayments are easier to sustain.
        </p>
        <h3>Do overpayments reduce my monthly payment automatically?</h3>
        <p>Some lenders recalculate your payment; others shorten the term. Ask which yours does, and tell them which you want.</p>
        <h3>Can I take overpayments back?</h3>
        <p>Not usually, unless you have a flexible mortgage with a payment holiday or drawdown facility.</p>
        <h3>Do overpayments count towards my allowance if I am on a variable rate?</h3>
        <p>Most variable and tracker deals have no overpayment limit, but check your offer.</p>
        <h3>Should I overpay with interest-only?</h3>
        <p>Overpaying an interest-only mortgage reduces the capital and the interest charged on it, and the amount you need at the end.</p>
        <h3>Do overpayments affect my credit score?</h3>
        <p>No. Overpaying is not new borrowing, and a lower balance is generally seen positively by lenders.</p>
        <h3>Should I overpay if I plan to move soon?</h3>
        <p>
          Overpaying still saves interest and increases your equity, which adds to your next deposit. But keep enough cash for
          the costs of moving, and check any early repayment charge if you might redeem the mortgage during a fixed deal.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "10%", label: "Typical yearly overpayment allowance" },
            { value: "£36,280", label: "Saved by £200 a month on £200,000 at 4.5%" },
            { value: "6 years", label: "Sooner mortgage-free with that £200 a month" },
            { value: "5.63%", label: "Savings rate a basic-rate taxpayer needs to beat 4.5%" },
            { value: "1% to 5%", label: "Typical early repayment charge" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
