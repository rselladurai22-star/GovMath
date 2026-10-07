import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Fixed versus easy-access savings — the guide. Figures from src/lib/investing/savings.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "types", title: "The main kinds of savings account" },
  { id: "aer", title: "AER, gross and compounding" },
  { id: "examples", title: "Worked examples" },
  { id: "tax", title: "Tax on savings interest" },
  { id: "maturity", title: "Interest paid at the end of a fix" },
  { id: "when-fix", title: "When fixing makes sense" },
  { id: "when-not", title: "When easy access is better" },
  { id: "ladder", title: "Building a savings ladder" },
  { id: "inflation", title: "Inflation and real returns" },
  { id: "isa", title: "Cash ISAs" },
  { id: "2027", title: "Changes from April 2027" },
  { id: "safety", title: "Keeping your savings safe" },
  { id: "switching", title: "Switching and maturity" },
  { id: "notice", title: "Notice accounts and regular savers" },
  { id: "emergency", title: "How big should an emergency fund be?" },
  { id: "rates-falling", title: "What if rates change?" },
  { id: "example-higher", title: "A higher-rate example" },
  { id: "joint", title: "Joint accounts and couples" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "GOV.UK — Individual Savings Accounts (ISAs)", href: "https://www.gov.uk/individual-savings-accounts" },
  { label: "FSCS — Deposit protection limit", href: "https://www.fscs.org.uk/what-we-cover/banks-building-societies-credit-unions/deposit-limit-increase/" },
  { label: "ONS — Consumer price inflation", href: "https://www.ons.gov.uk/economy/inflationandpriceindices" },
  { label: "MoneyHelper — Savings accounts explained", href: "https://www.moneyhelper.org.uk/en/savings/types-of-savings" },
];

export default function SavingsGuide() {
  return (
    <Guide
      kicker="The savings guide"
      title="Fixed-rate or easy-access savings?"
      intro={
        <>
          A fixed-rate account usually pays more than an easy-access one, but locks your money away. Whether the extra interest is worth it depends
          on the gap between the rates, how long you fix for, whether rates are likely to fall, and how much of the interest is taxed. This guide
          explains how to compare them properly, after tax, and how to avoid the tax trap of interest paid all at once.
        </>
      }
      meta={["2026/27 tax rules", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>On £20,000, a 2-year fix at 4.2% earns about <strong>£291 more</strong> than easy access at 3.5%, if the easy-access rate does not change.</li>
          <li>Basic-rate taxpayers can earn <strong>£1,000</strong> of interest a year tax-free, higher-rate taxpayers <strong>£500</strong>.</li>
          <li>If a fixed account pays all its interest at the end, it is all taxed in that one year.</li>
          <li>Keep an emergency fund in easy access before fixing anything.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£1,000", label: "Tax-free interest, basic rate" },
            { value: "£500", label: "Tax-free interest, higher rate" },
            { value: "£20,000", label: "ISA allowance a year" },
            { value: "£120,000", label: "FSCS protection per bank" },
          ]}
        />
      </GuideSection>

      <GuideSection id="types" n={2} kicker="Accounts" title="The main kinds of savings account">
        <CompareCards
          columns={[
            {
              name: "Easy access",
              rows: [
                { label: "Withdrawals", value: "Any time" },
                { label: "Rate", value: "Variable, can change at any time" },
                { label: "Best for", value: "Emergency funds, short-term goals" },
              ],
            },
            {
              name: "Fixed-rate bond",
              rows: [
                { label: "Withdrawals", value: "None, or with a penalty" },
                { label: "Rate", value: "Fixed for 1 to 5 years" },
                { label: "Best for", value: "Money you will not need for a while" },
              ],
            },
          ]}
        />
        <p>
          In between are notice accounts, where you give 30 to 120 days&rsquo; notice to withdraw, and regular savers, which pay high rates on a
          limited monthly deposit. Some easy-access accounts limit withdrawals to a few a year, or pay a bonus rate that drops after 12 months.
        </p>
      </GuideSection>

      <GuideSection id="aer" n={3} kicker="Rates" title="AER, gross and compounding">
        <p>
          The <strong>AER</strong> (annual equivalent rate) shows what you would earn in a year if interest were added and left in the account,
          whether it is paid monthly or yearly. It is the fairest way to compare accounts, and it is what the calculator uses. The{" "}
          <strong>gross</strong> rate is the rate before tax; banks pay interest without taking tax off, so any tax due is collected by HMRC through
          your <a href="/uk/tax-and-salary/tax-code-decoder">tax code</a>{" "}or Self Assessment.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="£20,000 for 2 years, basic-rate taxpayer"
          steps={[
            { label: "Fixed at 4.2%: interest", value: "£1,715.28" },
            { label: "Easy access at 3.5%: interest", value: "£1,424.50" },
            { label: "Tax on either", value: "£0 (within the £1,000 allowance each year)" },
          ]}
          total={{ label: "Fixing earns more by", value: "£290.78" }}
        />
        <WorkedExample
          title="£50,000 for 2 years, basic-rate taxpayer, interest paid yearly"
          steps={[
            { label: "Fixed interest", value: "£4,288.20" },
            { label: "Tax on fixed interest", value: "£457.64" },
            { label: "Easy-access interest", value: "£3,561.25" },
            { label: "Tax on easy-access interest", value: "£312.25" },
          ]}
          total={{ label: "Fixing earns more by, after tax", value: "£581.56" }}
        />
      </GuideSection>

      <GuideSection id="tax" n={5} kicker="Tax" title="Tax on savings interest">
        <p>Three allowances can make interest tax-free, applied in this order:</p>
        <ol>
          <li>your <strong>Personal Allowance</strong> of £12,570, if your other income does not use it all;</li>
          <li>the <strong>starting rate for savings</strong>: up to £5,000 of interest at 0%, reduced by £1 for every £1 of other income over £12,570;</li>
          <li>the <strong>Personal Savings Allowance</strong>: £1,000 for basic-rate taxpayers, £500 for higher rate, nothing for additional rate.</li>
        </ol>
        <p>
          Interest above these is taxed at 20%, 40% or 45% in 2026/27. A higher-rate taxpayer with £50,000 earning the same rates as above would pay
          £1,315.28 tax on the fixed interest and £1,024.50 on the easy-access interest. See the{" "}
          <a href="/uk/investing/personal-savings-allowance">Personal Savings Allowance calculator</a> for your own figures.
        </p>
      </GuideSection>

      <GuideSection id="maturity" n={6} kicker="A trap" title="Interest paid at the end of a fix">
        <p>
          Some fixed bonds pay all the interest when the bond ends. For tax, interest counts in the tax year it is paid or credited, so two or three
          years of interest can land in one year and blow through your allowance. In the £50,000 example, paying at maturity puts £4,288.20 of
          interest into one year and raises the tax from £457.64 to £657.64.
        </p>
        <Callout title="Choose annual interest if you can">
          Many bonds offer annual or monthly interest instead. It may pay a fraction less, but the tax saving can be worth more.
        </Callout>
      </GuideSection>

      <GuideSection id="when-fix" n={7} kicker="Choosing" title="When fixing makes sense">
        <ul>
          <li>You are sure you will not need the money for the whole term.</li>
          <li>The fixed rate is clearly higher than the best easy-access rate.</li>
          <li>You expect rates to fall: a fix locks in today&rsquo;s rate.</li>
          <li>You want certainty, for example saving for a known date such as a house purchase.</li>
        </ul>
      </GuideSection>

      <GuideSection id="when-not" n={8} kicker="Choosing" title="When easy access is better">
        <ul>
          <li>It is your emergency fund: three to six months of essential spending should always be reachable.</li>
          <li>The gap between the rates is small. On £10,000, a 0.3% gap is only £30 a year.</li>
          <li>You expect rates to rise, or you may need the money for a deposit soon.</li>
          <li>Your easy-access account pays a bonus that will end: compare the rate you will actually get.</li>
        </ul>
        <p>The calculator&rsquo;s table shows how the gain from fixing shrinks, or turns into a loss, as the easy-access rate changes.</p>
      </GuideSection>

      <GuideSection id="ladder" n={9} kicker="Strategy" title="Building a savings ladder">
        <p>
          Instead of fixing everything for one term, you can split your savings across 1, 2 and 3-year fixes. Each year one bond matures, giving you
          access to part of your money and a chance to reinvest at the going rate. A ladder balances higher fixed rates with regular access, and
          spreads the interest across tax years.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Real returns" title="Inflation and real returns">
        <p>
          What matters is whether your savings grow faster than prices. With CPI inflation at 3.1% in August 2026, a 4.2% fixed rate grows your money
          by about 1.07% a year in real terms; an account paying less than inflation loses buying power. The{" "}
          <a href="/uk/investing/inflation-impact">inflation calculator</a> shows how this adds up over time.
        </p>
      </GuideSection>

      <GuideSection id="isa" n={11} kicker="ISAs" title="Cash ISAs">
        <p>
          Interest in a cash ISA is tax-free and does not use your Personal Savings Allowance. You can save up to £20,000 a year across all your <a href="/uk/investing/isa-vs-gia">ISAs</a>.
          Fixed-rate and easy-access cash ISAs both exist, and many easy-access ISAs are flexible, so you can take money out and put it back in the
          same tax year without using more allowance. If your interest is above your allowances, or soon will be, a cash ISA is usually the better
          home. Tick the ISA option in the calculator to compare.
        </p>
      </GuideSection>

      <GuideSection id="2027" n={12} kicker="Coming changes" title="Changes from April 2027">
        <p>
          From 6 April 2027 tax on savings interest rises by 2 percentage points, to 22%, 42% and 47%, and under-65s will only be able to put £12,000 a
          year into cash ISAs, within the overall £20,000. If you are fixing now across April 2027, the higher rates will apply to interest paid
          after that date. The calculator has an option to use them.
        </p>
      </GuideSection>

      <GuideSection id="safety" n={13} kicker="Protection" title="Keeping your savings safe">
        <p>
          Since 1 December 2025 the Financial Services Compensation Scheme protects up to £120,000 per person at each UK-authorised bank or building
          society group. Some brands share one licence, so check which group an account belongs to if you have more than the limit. Joint accounts
          are protected up to £240,000. Temporary high balances, such as house sale proceeds, are protected up to £1.4 million for 6 months.
        </p>
      </GuideSection>

      <GuideSection id="switching" n={14} kicker="Practical" title="Switching and maturity">
        <p>
          When a fixed bond ends, many banks move the money into a low-rate account unless you tell them otherwise. Put the maturity date in your
          diary and compare rates a few weeks before. Easy-access rates also tend to drift down over time, so check yours every few months; moving
          is usually quick and free.
        </p>
      </GuideSection>

      <GuideSection id="notice" n={15} kicker="Other accounts" title="Notice accounts and regular savers">
        <p>
          <strong>Notice accounts</strong>{" "}pay a variable rate, often higher than easy access, but you must give 30, 60, 90 or 120 days&rsquo; notice
          before taking money out. They suit money you might need within months but not days. <strong>Regular savers</strong> pay some of the highest
          rates, but only on a limited monthly deposit, often £200 to £500, for a year. Because the balance builds up gradually, you earn the headline
          rate on a much smaller average amount: roughly half the interest you might expect.
        </p>
      </GuideSection>

      <GuideSection id="emergency" n={16} kicker="Emergency fund" title="How big should an emergency fund be?">
        <p>
          A common guide is three to six months of essential spending, kept in easy access. Self-employed people and single-income households often keep
          more. Once that is in place, money for goals a year or more away can go into fixed accounts, and money for long-term goals of five years or more
          may be better invested.
        </p>
      </GuideSection>

      <GuideSection id="rates-falling" n={17} kicker="Rate risk" title="What if rates change?">
        <p>
          If the Bank of England cuts interest rates, easy-access rates usually fall within weeks, while a fix keeps paying its rate. If rates rise, easy
          access can catch up and overtake a fix. Nobody knows which way rates will move, so splitting money between the two is a reasonable middle
          course. The calculator assumes the easy-access rate stays the same throughout.
        </p>
      </GuideSection>

      <GuideSection id="example-higher" n={18} kicker="Example" title="A higher-rate example">
        <WorkedExample
          title="£50,000 for 2 years, higher-rate taxpayer (other income £60,000)"
          steps={[
            { label: "Fixed interest at 4.2%", value: "£4,288.20" },
            { label: "Tax on fixed interest", value: "£1,315.28" },
            { label: "Easy-access interest at 3.5%", value: "£3,561.25" },
            { label: "Tax on easy-access interest", value: "£1,024.50" },
          ]}
          total={{ label: "Fixing earns more by, after tax", value: "£436.17" }}
        />
        <p>
          For a higher-rate taxpayer, 40p of every pound of interest over £500 a year goes in tax, so a cash ISA or <a href="/uk/investing/premium-bonds">Premium Bonds</a>{" "}can beat a taxable account
          with a noticeably higher rate.
        </p>
      </GuideSection>

      <GuideSection id="joint" n={19} kicker="Couples" title="Joint accounts and couples">
        <p>
          Interest on a joint account is split equally between the account holders for tax, so each uses half of it against their own allowances. A couple
          where both are basic-rate taxpayers can earn £2,000 of interest a year between them before paying tax. If one partner pays a higher rate, holding more
          savings in the other partner&rsquo;s sole name can cut the tax bill, as long as the money genuinely belongs to them. Each person also has their own
          £120,000 of FSCS protection at every bank group, and their own £20,000 ISA allowance.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Savings tax and protection, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Personal Savings Allowance: basic / higher / additional", "£1,000 / £500 / £0"],
            ["Starting rate for savings", "Up to £5,000 at 0%"],
            ["Savings tax rates 2026/27", "20% / 40% / 45%"],
            ["Savings tax rates from April 2027", "22% / 42% / 47%"],
            ["ISA allowance", "£20,000 a year"],
            ["FSCS protection", "£120,000 per person per bank"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
