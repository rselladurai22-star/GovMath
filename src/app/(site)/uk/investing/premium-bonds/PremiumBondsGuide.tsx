import { Bars, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Premium Bonds — the guide. Figures from src/lib/investing/growth.ts (4,000 simulated years, seed 42). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What Premium Bonds are" },
  { id: "rate", title: "The prize fund rate and odds" },
  { id: "prizes", title: "The prize table" },
  { id: "typical", title: "Average versus typical" },
  { id: "holding", title: "What different holdings win" },
  { id: "tax", title: "Tax-free prizes" },
  { id: "compare", title: "Premium Bonds or a savings account" },
  { id: "safety", title: "How safe your money is" },
  { id: "inflation", title: "Inflation and Premium Bonds" },
  { id: "rules", title: "Buying, cashing in and prizes" },
  { id: "suits", title: "Who they suit" },
  { id: "myths", title: "Myths about winning" },
  { id: "method", title: "How the calculator works" },
  { id: "reinvest", title: "Reinvesting prizes" },
  { id: "uses", title: "Ways people use Premium Bonds" },
  { id: "children", title: "Premium Bonds for children" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NS&I — Premium Bonds", href: "https://www.nsandi.com/products/premium-bonds" },
  { label: "NS&I — Prize draw details", href: "https://www.nsandi.com/prize-checker" },
  { label: "GOV.UK — Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "Financial Services Compensation Scheme", href: "https://www.fscs.org.uk/" },
];

export default function PremiumBondsGuide() {
  return (
    <Guide
      kicker="The Premium Bonds guide"
      title="What you are likely to win with Premium Bonds"
      intro={
        <>
          Premium Bonds pay prizes instead of interest. The prize fund rate tells you the average return, but most people win less than that
          in a typical year, because a few large prizes pull the average up. This guide explains the odds, what different holdings tend to win,
          and how Premium Bonds compare with a savings account.
        </>
      }
      meta={["September 2026 draw", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The prize fund rate is 4.35% and the odds are 21,000 to 1 for each £1 Bond, each month.</li>
          <li>With £10,000, the average is £435 a year, but a typical year brings about £350.</li>
          <li>Prizes are tax-free, which helps higher-rate taxpayers most.</li>
          <li>Your money is 100% backed by HM Treasury.</li>
        </ul>
        <KeyStats
          items={[
            { value: "4.35%", label: "Prize fund rate" },
            { value: "21,000 to 1", label: "Odds per £1, per month" },
            { value: "£50,000", label: "Maximum holding" },
            { value: "£350", label: "Typical year on £10,000" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What Premium Bonds are">
        <p>
          Premium Bonds are a savings product from National Savings and Investments (NS&amp;I), which is backed by the Treasury. Each £1 you put
          in buys one Bond with its own number. Every month, a computer called ERNIE picks winning numbers at random. Instead of interest, you
          have the chance of a tax-free prize from £25 to £1 million.
        </p>
        <p>
          You never lose the money you put in, and you can cash in at any time. What you give up is a guaranteed return: your prizes could be
          more or less than you would earn in a savings account.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={3} kicker="The numbers" title="The prize fund rate and odds">
        <p>
          The <strong>prize fund rate</strong> is the total value of prizes each year as a percentage of all eligible Bonds. It is 4.35% from
          the September 2026 draw. The <strong>odds</strong>{" "}are 21,000 to 1, meaning each £1 Bond has a 1 in 21,000 chance of winning in a
          month. NS&amp;I can change both at any time, usually with notice.
        </p>
        <p>
          With £10,000 in Bonds, you would expect 5.71 prizes a year on average. With £1,000, you would expect 0.57, so many years would bring
          nothing at all.
        </p>
      </GuideSection>

      <GuideSection id="prizes" n={4} kicker="Prizes" title="The prize table">
        <DataTable
          caption="Estimated prizes in each monthly draw, September 2026"
          head={["Prize", "Number of prizes"]}
          numeric={[0, 1]}
          rows={[
            ["£1,000,000", "2"],
            ["£100,000", "95"],
            ["£50,000", "192"],
            ["£25,000", "382"],
            ["£10,000", "954"],
            ["£5,000", "1,909"],
            ["£1,000", "19,892"],
            ["£500", "59,676"],
            ["£100", "2,366,135"],
            ["£50", "2,366,135"],
            ["£25", "1,717,659"],
          ]}
        />
        <p>
          Of the 6.5 million or so prizes each month, 98.7% are £25, £50 or £100. The average prize is about £76.12, but that is pulled up by
          the rare big prizes. The chance of a particular £1 Bond winning the £1 million jackpot in a given month is roughly 1 in 69 billion.
        </p>
      </GuideSection>

      <GuideSection id="typical" n={5} kicker="Reality" title="Average versus typical">
        <p>
          The average return includes the tiny chance of a huge prize. Since almost nobody wins one, most holders get less than the average.
          The calculator simulates 4,000 years of draws to show what a typical (median) year looks like, as well as an unlucky and a lucky one.
        </p>
        <WorkedExample
          title="£10,000 in Premium Bonds for a year"
          steps={[
            { label: "Average prizes: £10,000 × 4.35%", value: "£435" },
            { label: "Unlucky year (1 in 10 do worse)", value: "£150" },
            { label: "Typical year (median)", value: "£350" },
            { label: "Lucky year (1 in 10 do better)", value: "£650" },
          ]}
          total={{ label: "Effective rate in a typical year", value: "3.50%" }}
        />
        <p>Only about 32% of simulated years with £10,000 matched or beat the average of £435.</p>
      </GuideSection>

      <GuideSection id="holding" n={6} kicker="By holding" title="What different holdings win">
        <DataTable
          head={["Holding", "Average a year", "Typical year", "Chance of any prize in a year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£1,000", "£44", "£0", "44%"],
            ["£5,000", "£217", "£175", "94%"],
            ["£10,000", "£435", "£350", "Almost certain"],
            ["£25,000", "£1,088", "£925", "Almost certain"],
            ["£50,000", "£2,175", "£1,900", "Almost certain"],
          ]}
        />
        <Figure label="Effective rate in a typical year" caption="Median prizes as a percentage of the holding, against the 4.35% prize fund rate.">
          <Bars
            items={[
              { label: "£5,000", value: 3.5 },
              { label: "£10,000", value: 3.5 },
              { label: "£25,000", value: 3.7 },
              { label: "£50,000", value: 3.8 },
              { label: "Prize fund rate", value: 4.35 },
            ]}
            format={(n) => `${n.toFixed(2)}%`}
          />
        </Figure>
        <p>
          The bigger your holding, the closer a typical year gets to the average, because you have more chances and the luck evens out. With
          small holdings, results swing a lot from year to year.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={7} kicker="Tax" title="Tax-free prizes">
        <p>
          Premium Bond prizes are free of income tax and capital gains tax, and do not count towards your <a href="/uk/investing/personal-savings-allowance">Personal Savings Allowance</a>. Savings
          interest is taxed once it goes over your allowance: £1,000 for basic-rate taxpayers, £500 for higher-rate, and nothing for
          additional-rate taxpayers.
        </p>
        <DataTable
          caption="Taxable interest rate needed to match the 4.35% prize rate, once your allowance is used"
          head={["Tax band", "Equivalent rate"]}
          numeric={[1]}
          rows={[
            ["Basic rate (20%)", "5.44%"],
            ["Higher rate (40%)", "7.25%"],
            ["Additional rate (45%)", "7.91%"],
          ]}
        />
        <p>
          These figures compare against the average prize rate, not a typical year. For basic-rate taxpayers whose interest stays within the
          £1,000 allowance, <a href="/uk/investing/savings-interest">savings interest</a>{" "}is effectively tax-free too, so the tax advantage disappears.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={8} kicker="Comparison" title="Premium Bonds or a savings account">
        <CompareCards
          columns={[
            {
              name: "Premium Bonds",
              rows: [
                { label: "Return", value: "Random prizes, 4.35% on average" },
                { label: "Tax", value: "Tax-free" },
                { label: "Protection", value: "100% Treasury backed" },
                { label: "Access", value: "Cash in any time, usually within a few working days" },
              ],
            },
            {
              name: "Savings account",
              rows: [
                { label: "Return", value: "Guaranteed interest" },
                { label: "Tax", value: "Taxed above your allowance, unless in an ISA" },
                { label: "Protection", value: "FSCS up to £120,000 per bank" },
                { label: "Access", value: "Depends on the account" },
              ],
            },
          ]}
        />
        <p>
          A cash <a href="/uk/investing/isa-vs-gia">ISA</a>{" "}gives tax-free interest too, with a guaranteed rate. If a cash ISA pays more than your typical Premium Bonds return, it is
          likely to be the better choice for most people. The calculator compares your holding with any savings rate you enter.
        </p>
      </GuideSection>

      <GuideSection id="safety" n={9} kicker="Security" title="How safe your money is">
        <p>
          NS&amp;I is backed by HM Treasury, so every pound in Premium Bonds is protected, however much you hold. Bank and building society
          savings are protected by the Financial Services Compensation Scheme up to £120,000 per person, per banking licence. For people with
          large cash sums, this is one reason to use Premium Bonds.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Real value" title="Inflation and Premium Bonds">
        <p>
          Your Bonds keep their face value, but not their buying power. With CPI inflation at 3.1% in the year to August 2026, a typical return
          of 3.5% only just keeps up, and a small holding that wins nothing loses about 3% of its value in a year. The{" "}
          <a href="/uk/investing/inflation-impact">inflation calculator</a> shows the effect over time.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={11} kicker="Rules" title="Buying, cashing in and prizes">
        <ul>
          <li>Anyone aged 16 or over can buy Bonds, and parents or grandparents can buy for children under 16.</li>
          <li>You can hold from £25 to £50,000.</li>
          <li>New Bonds must be held for one full calendar month before they enter a draw.</li>
          <li>You can have prizes paid to your bank or reinvested in more Bonds automatically, up to the limit.</li>
          <li>Cashing in is free, and there is no penalty, though you lose the chance of prizes in the draw that month.</li>
          <li>Unclaimed prizes can be claimed at any time; NS&amp;I&rsquo;s prize checker shows any you have missed.</li>
        </ul>
      </GuideSection>

      <GuideSection id="suits" n={12} kicker="Fit" title="Who they suit">
        <ul>
          <li><strong>Higher and additional-rate taxpayers</strong> who have used their Personal Savings Allowance and ISA allowance.</li>
          <li><strong>People with large cash sums</strong> above the FSCS limit who want full protection.</li>
          <li><strong>Savers who enjoy the chance of a prize</strong> and accept a lower typical return in exchange.</li>
        </ul>
        <p>
          They suit basic-rate taxpayers with small holdings less well. A best-buy savings account or cash ISA usually pays more, guaranteed.
        </p>
      </GuideSection>

      <GuideSection id="myths" n={13} kicker="Myths" title="Myths about winning">
        <ul>
          <li><strong>&ldquo;Old Bonds win more.&rdquo;</strong> Every eligible Bond has exactly the same chance in each draw.</li>
          <li><strong>&ldquo;Bonds bought in one go are unlucky.&rdquo;</strong> Numbers are drawn at random; when you bought them makes no difference.</li>
          <li><strong>&ldquo;I am due a win.&rdquo;</strong> Each draw is independent. A long run without prizes does not make one more likely.</li>
        </ul>
      </GuideSection>

      <GuideSection id="method" n={14} kicker="Method" title="How the calculator works">
        <p>
          Prizes are random, so a single formula cannot tell you what you will win. The calculator plays out 4,000 separate years of monthly
          draws for your holding. In each month, it works out how many of your Bonds win using the 21,000 to 1 odds, then picks each
          prize&rsquo;s value from the September 2026 prize table, in proportion to how many of each prize there are.
        </p>
        <p>
          It then sorts the 4,000 years from worst to best. The middle one is the typical (median) year. The year 10% of the way up is the
          unlucky case, and the one 90% of the way up is the lucky case. The simulation uses a fixed starting point, so the same holding always
          gives the same answer, and the figures barely move if the starting point changes.
        </p>
        <p>
          If you change the prize fund rate, the calculator scales the prizes up or down in proportion. In practice NS&amp;I may change the
          odds and the prize table instead, but the average return is the same.
        </p>
      </GuideSection>

      <GuideSection id="reinvest" n={15} kicker="Growth" title="Reinvesting prizes">
        <p>
          You can choose to have prizes reinvested in more Bonds automatically. Your holding then grows over time, much like interest added
          to a savings account, until it reaches the £50,000 limit.
        </p>
        <WorkedExample
          title="£10,000 with prizes reinvested for 10 years"
          steps={[
            { label: "Growing at the 4.35% average", value: "£15,308" },
            { label: "Growing at a typical 3.5%", value: "£14,106" },
          ]}
          total={{ label: "Difference from luck alone", value: "£1,202" }}
        />
        <p>
          This is a rough guide, treating prizes as if they were added once a year. In reality, prizes arrive at random times, and reinvested
          Bonds wait a full month before entering the draw.
        </p>
      </GuideSection>

      <GuideSection id="uses" n={16} kicker="Uses" title="Ways people use Premium Bonds">
        <ul>
          <li>
            <strong>Part of an emergency fund.</strong> Money is safe and can be cashed in within a few working days, though not instantly.
            Many people keep a month or two of costs in an instant-access account as well.
          </li>
          <li>
            <strong>A home for cash above the FSCS limit.</strong> For example, after selling a house or receiving an inheritance.
          </li>
          <li>
            <strong>A tax-efficient extra for higher earners.</strong> Once the ISA and Personal Savings Allowance are used, tax-free prizes
            become more valuable.
          </li>
          <li>
            <strong>A gift.</strong> Bonds bought for a child or grandchild can be a lasting present with the chance of a prize.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="children" n={17} kicker="Family" title="Premium Bonds for children">
        <p>
          Parents and guardians can hold Bonds on behalf of a child under 16, and grandparents and others can buy them as gifts. The parent or
          guardian looks after the Bonds until the child turns 16, when the child takes control. Prizes are tax-free, so they do not count
          towards the rule that taxes parents on interest over £100 a year from money they give their children.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Expecting the average.</strong> Most holders win less than the prize fund rate in a typical year.</li>
          <li><strong>Ignoring better guaranteed rates.</strong> If a cash ISA pays more than your typical return, it is usually the better choice.</li>
          <li><strong>Missing prizes.</strong> Keep your contact and bank details up to date, and check for unclaimed prizes.</li>
          <li><strong>Holding a tiny amount and hoping for a big win.</strong> With £100, you can expect a prize only about once every 17 years.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4.35%", label: "Prize fund rate" },
            { value: "21,000 to 1", label: "Odds per £1 Bond, per month" },
            { value: "£25 to £50,000", label: "Holding limits" },
            { value: "£1 million", label: "Top prize, two a month" },
            { value: "98.7%", label: "Prizes of £25 to £100" },
            { value: "£76", label: "Average prize" },
            { value: "£350", label: "Typical year on £10,000" },
            { value: "7.25%", label: "Taxable rate to match, higher rate" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
