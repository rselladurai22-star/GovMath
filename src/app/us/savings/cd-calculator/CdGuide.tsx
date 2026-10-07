import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** CDs — the guide. Figures from cd and apy in src/lib/us/savings.ts and cd-extra.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a CD is" },
  { id: "example", title: "A worked example" },
  { id: "apy", title: "APY and the interest rate" },
  { id: "compounding", title: "How often interest compounds" },
  { id: "rates", title: "What CDs pay in 2026" },
  { id: "terms", title: "Choosing a term" },
  { id: "penalty", title: "Early withdrawal penalties" },
  { id: "penalty-example", title: "What cashing in early costs" },
  { id: "ladder", title: "Building a CD ladder" },
  { id: "savings", title: "CDs vs high-yield savings" },
  { id: "treasuries", title: "CDs vs Treasury bills" },
  { id: "types", title: "Other kinds of CD" },
  { id: "insurance", title: "FDIC and NCUA insurance" },
  { id: "tax", title: "Tax on CD interest" },
  { id: "ira", title: "CDs in an IRA" },
  { id: "maturity", title: "When your CD matures" },
  { id: "inflation", title: "CDs and inflation" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "payout", title: "How the interest is paid" },
  { id: "opening", title: "How to open a CD" },
  { id: "rates-move", title: "Why CD rates change" },
  { id: "break-even", title: "When breaking a CD can pay" },
  { id: "ownership", title: "Joint accounts and beneficiaries" },
  { id: "goals", title: "Good uses for a CD" },
  { id: "credit-unions", title: "Credit union share certificates" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "FDIC — National rates and rate caps", href: "https://www.fdic.gov/national-rates-and-rate-caps" },
  { label: "FDIC — Deposit insurance: understanding coverage", href: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
  { label: "NCUA — Share insurance coverage", href: "https://ncua.gov/consumers/share-insurance-coverage" },
  { label: "HelpWithMyBank.gov (OCC) — CD penalties", href: "https://www.helpwithmybank.gov/help-topics/bank-accounts/certificates-of-deposit/cd-penalties.html" },
  { label: "Investor.gov — Certificates of deposit", href: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/certificates-deposit-cds" },
  { label: "IRS — Topic 403, Interest received", href: "https://www.irs.gov/taxtopics/tc403" },
  { label: "TreasuryDirect — Treasury bills", href: "https://www.treasurydirect.gov/marketable-securities/treasury-bills/" },
];

export default function CdGuide() {
  return (
    <Guide
      kicker="The CD guide"
      title="How CDs work, and when they beat savings"
      intro={
        <>
          A certificate of deposit (CD) pays a fixed rate for a fixed term in exchange for leaving your money alone. This guide explains how CD
          interest is worked out, what APY means, how early withdrawal penalties work, how to build a CD ladder, how CDs compare with high-yield
          savings and Treasury bills, and how the interest is taxed and insured.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>{usd(10_000)} in a 12-month CD at 4.00% APY earns $400.00. After 22% tax you keep $312.00.</li>
          <li>The FDIC&rsquo;s national average 12-month CD paid about 1.73% in September 2026, so shopping around matters.</li>
          <li>Cashing in early usually costs a set number of months of interest, and can eat into your deposit.</li>
          <li>Deposits are insured up to $250,000 per depositor, per bank or credit union, per ownership category.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$400", label: "$10,000 for 12 months at 4% APY" },
            { value: "about 1.73%", label: "National average 12-month CD (FDIC, Sept 2026)" },
            { value: "about 0.37%", label: "National average savings rate" },
            { value: "$250,000", label: "FDIC and NCUA insurance limit" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a CD is">
        <p>
          A CD is a time deposit at a bank or credit union (where it may be called a share certificate). You deposit a lump sum, the rate is fixed
          for the term, and at maturity you get your money back with interest. In exchange for the higher, guaranteed rate, you agree not to take
          the money out early, or to pay a penalty if you do.
        </p>
        <p>
          Terms usually run from three months to five years. Most CDs take a single deposit; you cannot add to them after opening, unlike a savings
          account.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$10,000 in a 12-month CD at 4.00% APY, compounded daily"
          steps={[
            { label: "Rate before compounding", value: "3.922%" },
            { label: "Interest at maturity", value: "$400.00" },
            { label: "Federal tax at 22%", value: "−$88.00" },
            { label: "Interest after tax", value: "$312.00" },
          ]}
          total={{ label: "Value at maturity", value: "$10,400.00" }}
        />
        <p>
          A 5-year CD at 3.80% APY turns {usd(10_000)} into $12,049.99, earning {usd(2_050)}. Use the calculator for your own deposit, rate and
          term.
        </p>
      </GuideSection>

      <GuideSection id="apy" n={4} kicker="Rates" title="APY and the interest rate">
        <p>
          Banks quote two figures. The <strong>interest rate</strong> is the yearly rate before compounding. The <strong>annual percentage
          yield (APY)</strong> includes the effect of compounding, so it is what you actually earn in a year. Federal Truth in Savings rules
          require banks to show the APY, which makes it the right figure for comparing CDs.
        </p>
        <p>
          The calculator takes either. Choose &quot;APY&quot; if your bank quotes APY (most do); choose &quot;Interest rate before
          compounding&quot; if you only have the nominal rate.
        </p>
      </GuideSection>

      <GuideSection id="compounding" n={5} kicker="Rates" title="How often interest compounds">
        <DataTable
          caption="A 4.00% nominal rate on $10,000 for one year"
          head={["Compounded", "APY", "Interest"]}
          numeric={[1, 2]}
          rows={[
            ["Daily", "4.081%", "$408.08"],
            ["Monthly", "4.074%", "$407.42"],
            ["Quarterly", "4.060%", "$406.04"],
            ["Once a year", "4.000%", "$400.00"],
          ]}
        />
        <p>More frequent compounding helps a little. Comparing APYs already accounts for it, so you do not need to adjust.</p>
      </GuideSection>

      <GuideSection id="rates" n={6} kicker="Rates" title="What CDs pay in 2026">
        <Figure label="FDIC national average rates, September 21, 2026" caption="Averages include large banks paying very little.">
          <Bars
            format={(n) => `${n.toFixed(2)}%`}
            items={[
              { label: "Savings", value: 0.37 },
              { label: "Money market", value: 0.63 },
              { label: "6-month CD", value: 1.41 },
              { label: "12-month CD", value: 1.73 },
              { label: "24-month CD", value: 1.61 },
              { label: "60-month CD", value: 1.38 },
            ]}
          />
        </Figure>
        <p>
          The averages are pulled down by large banks that pay very little. Online banks and credit unions often pay several times the national
          average, so compare offers. On {usd(10_000)} for a year, the average 12-month CD earns about $173, against $400 at 4%.
        </p>
      </GuideSection>

      <GuideSection id="terms" n={7} kicker="Choosing" title="Choosing a term">
        <p>
          Longer terms usually pay more, but not always: in September 2026 the average 12-month CD paid more than the 5-year one, a sign that
          banks expected rates to fall. Match the term to when you need the money: a house deposit in 18 months, tuition next fall, or a
          cash reserve you want to keep earning.
        </p>
        <Callout title="Locking in a rate cuts both ways">
          If rates fall, a long CD keeps paying the old, higher rate. If rates rise, you are stuck at the lower one unless you pay the penalty.
        </Callout>
      </GuideSection>

      <GuideSection id="penalty" n={8} kicker="Penalties" title="Early withdrawal penalties">
        <p>
          Each bank sets its own penalty in the account agreement, usually as months or days of interest. There is no legal maximum. Typical
          rules:
        </p>
        <DataTable
          head={["CD term", "Typical penalty"]}
          rows={[
            ["Under 1 year", "About 3 months of interest"],
            ["1 to 2 years", "About 6 months of interest"],
            ["Over 2 years", "About 12 months of interest"],
          ]}
        />
        <p>
          Federal rules set a minimum: money withdrawn within six days of the deposit must pay at least seven days&rsquo; simple interest, even on
          a no-penalty CD. If the penalty is more than the interest earned so far, the rest comes out of your deposit.
        </p>
      </GuideSection>

      <GuideSection id="penalty-example" n={9} kicker="Penalties" title="What cashing in early costs">
        <CompareCards
          columns={[
            { name: "Cashed in after 8 months", rows: [{ label: "Penalty (6 months' interest)", value: "$196.11" }, { label: "You get back", value: "$10,068.81" }] },
            { name: "Cashed in after 2 months", rows: [{ label: "Penalty (6 months' interest)", value: "$196.11" }, { label: "You get back", value: "$9,869.47" }] },
            { name: "Held to maturity (18 months)", rows: [{ label: "Penalty", value: "None" }, { label: "You get back", value: "$10,605.96" }] },
          ]}
        />
        <p>
          The example is {usd(10_000)} in an 18-month CD at 4.00% APY with a penalty of six months of simple interest. Cashing in after two
          months loses about $131 of the original deposit. Turn on &quot;Cash in the CD early&quot; under More options to see your own figures.
        </p>
      </GuideSection>

      <GuideSection id="ladder" n={10} kicker="Strategy" title="Building a CD ladder">
        <p>
          A CD ladder spreads your money across CDs that mature at different times, so some cash is always coming free and you still earn
          long-term rates on most of it.
        </p>
        <Timeline
          items={[
            { when: "Today", what: "Split $25,000 into five $5,000 CDs", detail: "Terms of 1, 2, 3, 4 and 5 years." },
            { when: "Year 1", what: "The 1-year CD matures", detail: "Reinvest it in a new 5-year CD, or use the cash." },
            { when: "Years 2 to 4", what: "One CD matures each year", detail: "Each is rolled into a new 5-year CD." },
            { when: "Year 5 on", what: "A full ladder", detail: "Every rung earns a 5-year rate, and one matures every year." },
          ]}
        />
        <p>
          A shorter ladder, such as 3-, 6-, 9- and 12-month CDs, works for money you may need within a year. Ladders also smooth out changes in
          rates, because you reinvest a little at a time.
        </p>
      </GuideSection>

      <GuideSection id="savings" n={11} kicker="Compare" title="CDs vs high-yield savings">
        <CompareCards
          columns={[
            { name: "CD", rows: [{ label: "Rate", value: "Fixed for the term" }, { label: "Access", value: "Penalty to withdraw early" }, { label: "$10,000 for a year at 4%", value: "$400" }] },
            { name: "High-yield savings", rows: [{ label: "Rate", value: "Variable, can change any time" }, { label: "Access", value: "Withdraw any time" }, { label: "$10,000 for a year at 3.5%", value: "$350" }] },
          ]}
        />
        <p>
          A high-yield savings account is better for an emergency fund you might need at short notice. A CD is better for money with a known date
          when you want to lock in today&rsquo;s rate. The average savings account paid about 0.37% in September 2026, which earns just $37 a
          year on {usd(10_000)}. The <a href="/us/savings/savings-goal-calculator">savings goal calculator</a> shows how fast regular deposits
          reach a target.
        </p>
      </GuideSection>

      <GuideSection id="treasuries" n={12} kicker="Compare" title="CDs vs Treasury bills">
        <p>
          Treasury bills, sold through TreasuryDirect or a brokerage, are backed by the US government and run from 4 to 52 weeks. Their interest
          is exempt from state and local income tax, which can make them pay more after tax than a CD at the same rate if you live in a
          high-tax state. Selling one before maturity is possible at a brokerage, but the price can be higher or lower than you paid.
        </p>
      </GuideSection>

      <GuideSection id="types" n={13} kicker="Options" title="Other kinds of CD">
        <ul>
          <li><strong>No-penalty CDs</strong> let you withdraw after the first week without a penalty, usually at a slightly lower rate.</li>
          <li><strong>Bump-up CDs</strong>{" "}let you raise the rate once or twice if the bank&rsquo;s rates rise.</li>
          <li><strong>Jumbo CDs</strong> need a large deposit, often $100,000, and may pay a little more.</li>
          <li><strong>Brokered CDs</strong> are bought through a brokerage and can be sold before maturity, at the market price.</li>
          <li><strong>Callable CDs</strong> can be ended early by the bank, usually when rates fall, which removes the rate you locked in.</li>
        </ul>
      </GuideSection>

      <GuideSection id="insurance" n={14} kicker="Safety" title="FDIC and NCUA insurance">
        <p>
          CDs at FDIC-insured banks and NCUA-insured credit unions are covered up to <strong>$250,000 per depositor, per insured institution,
          for each ownership category</strong>, such as single, joint and retirement accounts. Interest counts toward the limit. If you have more,
          spread it across banks or ownership categories. Brokered CDs are insured too, as long as the issuing bank is FDIC-insured and the
          limits are respected.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={15} kicker="Tax" title="Tax on CD interest">
        <p>
          CD interest is taxed as ordinary income at your federal rate and usually your state rate. It is taxed in the year it is credited to the
          CD, even if you do not withdraw it, so a multi-year CD can create a tax bill each year. Your bank sends Form 1099-INT. An early
          withdrawal penalty can be deducted on your return. The <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a> shows your
          marginal rate.
        </p>
      </GuideSection>

      <GuideSection id="ira" n={16} kicker="Tax" title="CDs in an IRA">
        <p>
          You can hold CDs inside a traditional or Roth IRA. The interest then grows tax-deferred or tax-free, but IRA withdrawal rules apply on top
          of the bank&rsquo;s penalty. The <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a> shows the 2026 limits.
        </p>
      </GuideSection>

      <GuideSection id="maturity" n={17} kicker="Next" title="When your CD matures">
        <p>
          Banks send a notice before maturity. Many CDs renew automatically into a new CD of the same term at whatever rate the bank then pays,
          which may be low. There is usually a grace period, often 7 to 10 days, to withdraw or move the money without a penalty. Put the date in
          your calendar.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={18} kicker="Real returns" title="CDs and inflation">
        <p>
          A CD protects your dollars but not their buying power. If inflation runs above your after-tax rate, the money loses value in real terms.
          For goals many years away, the <a href="/us/savings/compound-interest-calculator">compound interest calculator</a> lets you compare
          other rates of growth.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Comparing interest rates instead of APYs.</li>
          <li>Locking up your emergency fund in a long CD.</li>
          <li>Letting a CD renew automatically at a low rate.</li>
          <li>Not reading the penalty rule before opening.</li>
          <li>Going over the $250,000 insurance limit at one bank in one ownership category.</li>
        </ul>
      </GuideSection>

      <GuideSection id="payout" n={20} kicker="Basics" title="How the interest is paid">
        <p>
          Most CDs add interest to the CD itself, so it compounds, and you receive it all at maturity. Some let you have interest paid out monthly
          or quarterly to a checking or savings account instead, which suits people living on the income. Paid-out interest does not compound,
          so the CD earns a little less than its APY suggests. The calculator assumes interest stays in the CD.
        </p>
      </GuideSection>

      <GuideSection id="opening" n={21} kicker="Action" title="How to open a CD">
        <ol>
          <li>Decide how much you can lock away and for how long, keeping an emergency fund in an account you can reach.</li>
          <li>Compare APYs at online banks, credit unions and your own bank, for the same term.</li>
          <li>Read the early withdrawal penalty, the minimum deposit and what happens at maturity.</li>
          <li>Check the bank is FDIC-insured or the credit union NCUA-insured.</li>
          <li>Fund the CD by transfer and note the maturity date in your calendar.</li>
        </ol>
      </GuideSection>

      <GuideSection id="rates-move" n={22} kicker="Rates" title="Why CD rates change">
        <p>
          CD rates follow the interest rates set in markets, which in turn follow the Federal Reserve&rsquo;s policy rate and expectations
          about it. When the Fed raises rates, new CDs usually pay more; when markets expect cuts, longer CDs often pay less than shorter ones, as
          they did in 2026. Banks also raise rates when they want deposits, which is why online banks and credit unions often lead.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={23} kicker="Strategy" title="When breaking a CD can pay">
        <p>
          If rates rise a lot after you open a CD, cashing in and reopening at a higher rate can come out ahead, even after the penalty. Compare
          the interest you would earn on the rest of your current CD with what a new CD would earn over the same months, less the penalty. With a
          penalty of several months&rsquo; interest, the new rate usually has to be well above the old one, and the gain is small on short
          remaining terms. Turn on &quot;Cash in the CD early&quot; to see the penalty in dollars.
        </p>
      </GuideSection>

      <GuideSection id="ownership" n={24} kicker="Safety" title="Joint accounts and beneficiaries">
        <p>
          Insurance limits apply per ownership category, so a married couple can be covered for more than $250,000 at one bank. A joint account
          is insured up to $250,000 for each co-owner, and accounts with named beneficiaries, such as payable-on-death accounts, have their own
          coverage rules. The FDIC&rsquo;s online estimator works out your exact coverage.
        </p>
      </GuideSection>

      <GuideSection id="goals" n={25} kicker="Planning" title="Good uses for a CD">
        <ul>
          <li>A house down payment you plan to make in one to three years.</li>
          <li>Money set aside for tuition, a wedding or a car.</li>
          <li>Part of a retiree&rsquo;s cash reserve, laddered so some matures each year.</li>
          <li>Cash beyond your emergency fund that you want to keep safe but earning.</li>
        </ul>
        <p>For money you will not need for many years, stocks and bonds have historically grown faster, though with ups and downs.</p>
      </GuideSection>

      <GuideSection id="credit-unions" n={26} kicker="Options" title="Credit union share certificates">
        <p>
          Credit unions call their CDs share certificates. They work the same way, are insured by the NCUA up to the same $250,000 limit, and
          often pay competitive rates. You usually need to become a member first, which may depend on where you live or work, or on a small
          donation to a partner charity. Compare their APYs and penalties just as you would a bank&rsquo;s.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={27} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["National average 12-month CD (FDIC, Sept 21, 2026)", "about 1.73%"],
            ["National average 60-month CD", "about 1.38%"],
            ["National average savings", "about 0.37%"],
            ["Insurance limit (FDIC and NCUA)", "$250,000 per depositor, per institution, per category"],
            ["Minimum penalty within six days of deposit", "Seven days' simple interest"],
            ["Typical penalty, 1- to 2-year CD", "About 6 months of interest"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
