import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, type Source, type TocItem } from "@/components/guide/Guide";

/** ISA vs GIA — the guide. Figures from src/lib/investing/wrappers.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "ISAs and general investment accounts" },
  { id: "taxes", title: "The three taxes a GIA pays" },
  { id: "examples", title: "How much an ISA saves" },
  { id: "time", title: "Why the gap grows over time" },
  { id: "income-type", title: "Income, bonds and growth" },
  { id: "allowance", title: "The £20,000 allowance" },
  { id: "2027", title: "Changes from April 2027" },
  { id: "types", title: "Types of ISA" },
  { id: "bed-isa", title: "Bed and ISA" },
  { id: "order", title: "Which account to fill first" },
  { id: "gia-uses", title: "When a GIA still makes sense" },
  { id: "assumptions", title: "How the comparison works" },
  { id: "frozen", title: "Frozen allowances and fiscal drag" },
  { id: "couples", title: "Couples: two allowances" },
  { id: "flexible", title: "Flexible ISAs and withdrawals" },
  { id: "transfers", title: "Transferring ISAs" },
  { id: "pensions", title: "ISA or pension?" },
  { id: "charges", title: "Charges and platforms" },
  { id: "children", title: "Junior ISAs" },
  { id: "inheritance", title: "ISAs, death and inheritance" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "lisa", title: "Lifetime ISA in more detail" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Individual Savings Accounts", href: "https://www.gov.uk/individual-savings-accounts" },
  { label: "GOV.UK — Tax on dividends", href: "https://www.gov.uk/tax-on-dividends" },
  { label: "GOV.UK — Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "GOV.UK — Capital Gains Tax", href: "https://www.gov.uk/capital-gains-tax" },
  { label: "GOV.UK — Lifetime ISA", href: "https://www.gov.uk/lifetime-isa" },
];

export default function IsaGuide() {
  return (
    <Guide
      kicker="The ISA vs GIA guide"
      title="ISA or general investment account?"
      intro={
        <>
          A stocks and shares ISA and a general investment account (GIA) can hold exactly the same investments. The difference is tax: an ISA pays
          none, while a GIA pays Income Tax on dividends and interest, and Capital Gains Tax on profits. With allowances now small and frozen, the gap
          can be tens of thousands of pounds over a working life. This guide shows how big it is and how to use both accounts well.
        </>
      }
      meta={["2026/27 rules", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Use your £20,000 ISA allowance first: everything inside is free of Income Tax and Capital Gains Tax.</li>
          <li>A GIA pays tax once dividends exceed £500, interest exceeds your savings allowance, or gains exceed £3,000.</li>
          <li>The ISA advantage grows each year because tax paid in a GIA no longer grows.</li>
          <li>From April 2027, under-65s can only put £12,000 a year into cash ISAs, but the overall limit stays at £20,000.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£20,000", label: "ISA allowance a year" },
            { value: "£500", label: "Dividend allowance outside an ISA" },
            { value: "£3,000", label: "CGT exempt amount" },
            { value: "£35,216", label: "ISA advantage in our 20-year example" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="ISAs and general investment accounts">
        <CompareCards
          columns={[
            {
              name: "Stocks and shares ISA",
              rows: [
                { label: "Dividends", value: "Tax-free" },
                { label: "Interest", value: "Tax-free" },
                { label: "Gains", value: "Tax-free" },
                { label: "Limit", value: "£20,000 a year" },
                { label: "Reporting", value: "None" },
              ],
            },
            {
              name: "General investment account",
              rows: [
                { label: "Dividends", value: "Taxed above £500" },
                { label: "Interest", value: "Taxed above your allowance" },
                { label: "Gains", value: "Taxed above £3,000" },
                { label: "Limit", value: "None" },
                { label: "Reporting", value: "May need a tax return" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="taxes" n={3} kicker="The drag" title="The three taxes a GIA pays">
        <DataTable
          caption="Tax in a GIA, 2026/27"
          head={["Income", "Tax-free", "Basic rate", "Higher rate"]}
          rows={[
            ["Dividends", "£500", "10.75%", "35.75%"],
            ["Interest", "£1,000 / £500", "20% (22% from 2027)", "40% (42% from 2027)"],
            ["Capital gains", "£3,000", "18%", "24%"],
          ]}
        />
        <p>
          Dividends and interest are taxed every year, even if you reinvest them. Gains are taxed when you sell, including when you switch funds or
          rebalance.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Real numbers" title="How much an ISA saves">
        <p>
          Our example invests £20,000 now and £500 a month for 20 years, with 4% growth and a 2% dividend yield, for a higher-rate taxpayer earning
          £55,000, selling at the end.
        </p>
        <DataTable
          caption="20 years, £140,000 invested, sold at the end"
          head={["Taxpayer", "ISA", "GIA", "ISA advantage"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Basic rate (£30,000)", "£297,889", "£278,154", "£19,736"],
            ["Higher rate (£55,000)", "£297,819", "£262,603", "£35,216"],
            ["Additional rate (£150,000)", "£297,819", "£260,716", "£37,103"],
          ]}
        />
        <p>
          The higher-rate investor&rsquo;s GIA pays £17,018 in tax along the way and £12,015 of Capital Gains Tax at the end. Without selling, the
          advantage is still £23,481.
        </p>
      </GuideSection>

      <GuideSection id="time" n={5} kicker="Compounding" title="Why the gap grows over time">
        <Figure label="ISA advantage for a higher-rate taxpayer" caption="£20,000 now and £500 a month, sold at the end.">
          <Bars
            items={[
              { label: "10 years", value: 6779 },
              { label: "20 years", value: 35216 },
              { label: "30 years", value: 118908 },
            ]}
          />
        </Figure>
        <p>
          Every pound of tax paid in a GIA is a pound that stops growing. Over 30 years the advantage reaches £118,908, more than half of the
          £200,000 invested.
        </p>
      </GuideSection>

      <GuideSection id="income-type" n={6} kicker="What you hold" title="Income, bonds and growth">
        <p>
          The more income an investment pays, the more an ISA saves. A 4.5% dividend yield with 2% growth gives a higher-rate taxpayer a £59,707
          advantage over 20 years in our example. A bond fund paying 4.5% interest gives £46,849, because interest is taxed at income tax rates.
        </p>
        <Callout title="Hold income in the ISA">
          If you have both accounts, keep high-yield shares, bond funds and cash-like investments in the ISA, and low-yield growth investments in
          the GIA.
        </Callout>
      </GuideSection>

      <GuideSection id="allowance" n={7} kicker="Limits" title="The £20,000 allowance">
        <p>
          You can put up to £20,000 a year into ISAs, split between cash, stocks and shares, innovative finance and Lifetime ISAs (up to £4,000 in a
          Lifetime ISA). The allowance resets on 6 April and unused allowance is lost. With £100,000 to invest at once, only £20,000 can go into an ISA
          in year one, so the ISA advantage in our example falls to £14,462 unless you move more in each year.
        </p>
      </GuideSection>

      <GuideSection id="2027" n={8} kicker="New rules" title="Changes from April 2027">
        <Timeline
          items={[
            { when: "6 April 2027", what: "Cash ISA limit £12,000", detail: "For savers under 65. The rest of the £20,000 must go into other ISA types." },
            { when: "6 April 2027", what: "Savings tax rises", detail: "Rates on interest go to 22%, 42% and 47%." },
            { when: "Ongoing", what: "Allowances frozen", detail: "The £20,000 ISA limit has not changed since 2017." },
          ]}
        />
      </GuideSection>

      <GuideSection id="types" n={9} kicker="Options" title="Types of ISA">
        <DataTable
          caption="ISA types"
          head={["ISA", "Holds", "Notes"]}
          rows={[
            ["Cash ISA", "Savings", "£12,000 limit for under-65s from April 2027"],
            ["Stocks and shares ISA", "Shares, funds, bonds", "Most flexible for long-term investing"],
            ["Lifetime ISA", "Cash or investments", "Up to £4,000 a year, 25% bonus, for a first home or age 60"],
            ["Innovative finance ISA", "Peer-to-peer loans", "Higher risk"],
            ["Junior ISA", "For under-18s", "Up to £9,000 a year, separate from your allowance"],
          ]}
        />
      </GuideSection>

      <GuideSection id="bed-isa" n={10} kicker="Moving money" title="Bed and ISA">
        <p>
          &ldquo;Bed and ISA&rdquo; means selling investments in a GIA and buying them back inside your ISA. It uses your ISA allowance and may
          trigger a gain, so do it within the £3,000 exempt amount if you can, or spread it over several years. Most platforms do it in one
          transaction, with little time out of the market.
        </p>
      </GuideSection>

      <GuideSection id="order" n={11} kicker="Priorities" title="Which account to fill first">
        <ol>
          <li>Take any employer pension match: it is free money.</li>
          <li>Keep an emergency fund in easy-access savings.</li>
          <li>Use a Lifetime ISA if you are buying a first home or saving for later life and are under 40.</li>
          <li>Fill your ISA allowance.</li>
          <li>Consider extra pension contributions, especially as a higher-rate taxpayer.</li>
          <li>Use a GIA for anything beyond that, and move it into ISAs each year.</li>
        </ol>
      </GuideSection>

      <GuideSection id="gia-uses" n={12} kicker="Exceptions" title="When a GIA still makes sense">
        <ul>
          <li>You have used your full ISA allowance.</li>
          <li>You need to hold assets not allowed in an ISA.</li>
          <li>You want to give away or transfer investments, for example to a spouse, which is simpler from a GIA.</li>
          <li>You expect losses you want to set against other gains, which only works outside an ISA.</li>
        </ul>
      </GuideSection>

      <GuideSection id="assumptions" n={13} kicker="Method" title="How the comparison works">
        <p>
          The calculator follows the same money through both accounts. In the ISA plan, up to £20,000 a year goes into the ISA and anything above
          that into a GIA. In the GIA plan, everything goes into a GIA. Each year, the GIA pays Income Tax on dividends and interest at your rates,
          after the dividend allowance and Personal Savings Allowance. A share of gains is taken each year, to reflect fund switches and rebalancing,
          and taxed after the £3,000 exempt amount. Income is reinvested after tax. At the end you can choose to sell everything.
        </p>
        <p>
          Tax rates and allowances are held at 2026/27 levels, apart from the optional 2027 savings rates. In reality allowances may change, which is
          one more reason to use the ISA while you can.
        </p>
      </GuideSection>

      <GuideSection id="frozen" n={14} kicker="Background" title="Frozen allowances and fiscal drag">
        <p>
          The ISA allowance has been £20,000 since April 2017, while the dividend allowance has fallen from £5,000 to £500 and the Capital Gains Tax
          exempt amount from £12,300 to £3,000. As wages and investment values rise, more investors pay tax outside an ISA each year. Income Tax
          thresholds are frozen until 2031, which also pulls more people into the higher-rate band, where the ISA saves most.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={15} kicker="Households" title="Couples: two allowances">
        <p>
          Each adult has their own £20,000 ISA allowance, so a couple can shelter £40,000 a year. Gifts between spouses and civil partners are free of
          Capital Gains Tax, so one partner can give money or investments to the other to use their allowance. If one of you pays a lower rate of tax,
          holding the GIA in their name reduces the tax drag on anything outside the ISAs.
        </p>
      </GuideSection>

      <GuideSection id="flexible" n={16} kicker="Access" title="Flexible ISAs and withdrawals">
        <p>
          You can take money out of a stocks and shares ISA at any time. With a flexible ISA, you can put money back in the same tax year without it
          counting towards your allowance. Most stocks and shares ISAs are not flexible, so a withdrawal permanently uses up that part of the
          allowance. Check the terms before taking money out.
        </p>
      </GuideSection>

      <GuideSection id="transfers" n={17} kicker="Moving providers" title="Transferring ISAs">
        <p>
          You can move an ISA to another provider without losing its tax-free status, as long as you use the provider&rsquo;s transfer process. Do not
          withdraw the money yourself, or it loses its ISA status and uses up allowance when you put it back. Transfers can take several weeks, and
          some providers charge exit fees.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={18} kicker="Comparison" title="ISA or pension?">
        <CompareCards
          columns={[
            {
              name: "ISA",
              rows: [
                { label: "Going in", value: "No tax relief" },
                { label: "Coming out", value: "Tax-free, any time" },
                { label: "Best for", value: "Flexible goals and early retirement" },
              ],
            },
            {
              name: "Pension",
              rows: [
                { label: "Going in", value: "Tax relief at your top rate" },
                { label: "Coming out", value: "25% tax-free, rest taxed, from age 57 (from 2028)" },
                { label: "Best for", value: "Retirement, especially for higher-rate taxpayers" },
              ],
            },
          ]}
        />
        <p>
          For many people the answer is both. The <a href="/investing/pension-tax-relief">pension tax relief calculator</a> shows how much a pension
          contribution really costs you.
        </p>
      </GuideSection>

      <GuideSection id="charges" n={19} kicker="Costs" title="Charges and platforms">
        <p>
          ISA and GIA charges are usually the same on any one platform, which is why the calculator leaves them out. Platforms charge either a
          percentage of your investments or a flat fee, and fund managers charge an ongoing fee. Over decades, a difference of 0.5% a year in charges
          can matter as much as the tax saved, so compare both.
        </p>
      </GuideSection>

      <GuideSection id="children" n={20} kicker="Family" title="Junior ISAs">
        <p>
          A Junior ISA lets parents, grandparents and others save up to £9,000 a year for a child, tax-free. The money belongs to the child and can
          only be taken out at 18. Because the parental £100 income rule does not apply, it is usually the best way for parents to invest for
          children.
        </p>
      </GuideSection>

      <GuideSection id="inheritance" n={21} kicker="Estate" title="ISAs, death and inheritance">
        <p>
          On death, an ISA remains tax-free while the estate is dealt with, for up to three years. A surviving spouse or civil partner gets an
          additional permitted subscription equal to the ISA&rsquo;s value, on top of their own allowance. But ISAs are part of the estate for
          Inheritance Tax, unlike unused pensions before April 2027.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={22} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scottish taxpayers pay UK rates on dividends, savings and gains, so a GIA is taxed in the same way as in the rest of the UK. But Scotland&rsquo;s
          higher Income Tax rates on salary can push more income into the higher-rate band for savings and dividends purposes, making an ISA slightly
          more valuable.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={23} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Leaving the ISA allowance unused, especially in years with spare cash.</li>
          <li>Holding cash in a stocks and shares ISA for years when it could be invested.</li>
          <li>Withdrawing from a non-flexible ISA and losing the allowance.</li>
          <li>Paying more than £20,000 into ISAs in one year, which HMRC will correct.</li>
          <li>Ignoring the tax on accumulation units in a GIA.</li>
        </ul>
      </GuideSection>

      <GuideSection id="lisa" n={24} kicker="First homes and retirement" title="Lifetime ISA in more detail">
        <p>
          A Lifetime ISA can be opened between 18 and 39. You can pay in up to £4,000 a year until 50, and the government adds a 25% bonus, up to
          £1,000 a year. The money can be used for a first home costing up to £450,000, or taken from 60. Other withdrawals face a 25% charge, which
          takes back more than the bonus. The £4,000 counts towards your £20,000 overall ISA allowance.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={25} kicker="FAQs" title="Common questions">
        <h3>Do I need to report my ISA to HMRC?</h3>
        <p>No. ISA income and gains do not go on a tax return.</p>
        <h3>Can I have more than one ISA?</h3>
        <p>Yes. You can open several, as long as your total payments stay within £20,000 a year.</p>
        <h3>What happens to an ISA when I die?</h3>
        <p>It stays tax-free until the estate is settled, and a spouse can inherit an extra ISA allowance equal to its value.</p>
        <h3>Does an ISA protect from Inheritance Tax?</h3>
        <p>No. ISAs count towards your estate for Inheritance Tax.</p>
        <h3>Can I lose money in a stocks and shares ISA?</h3>
        <p>Yes. The ISA only changes the tax; the investments inside can still fall in value.</p>
        <h3>Should I choose a cash ISA or a stocks and shares ISA?</h3>
        <p>
          Cash suits money you need within about five years. For longer periods, shares have usually grown faster than cash, though with ups and
          downs along the way.
        </p>
        <h3>Do I get the ISA allowance if I live abroad?</h3>
        <p>You can keep an existing ISA, but you cannot pay into one while you are not resident in the UK, with limited exceptions.</p>
        <h3>Does it matter when in the tax year I invest?</h3>
        <p>Investing early in the tax year gives the money longer to grow tax-free, but regular monthly investing works well too.</p>
        <h3>Is the calculator&rsquo;s growth rate realistic?</h3>
        <p>
          It is your choice. Lower growth makes the ISA advantage smaller, higher growth makes it bigger. Try a range of rates to see how sensitive
          the result is.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={26} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£20,000", label: "ISA allowance" },
            { value: "£12,000", label: "Cash ISA limit from April 2027 (under 65)" },
            { value: "£4,000", label: "Lifetime ISA limit" },
            { value: "£9,000", label: "Junior ISA limit" },
            { value: "£500", label: "Dividend allowance" },
            { value: "£3,000", label: "CGT exempt amount" },
            { value: "£1,000", label: "Savings allowance, basic rate" },
            { value: "£118,908", label: "ISA advantage over 30 years" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
