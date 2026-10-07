import {
  BandBar,
  Callout,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  SERIES,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** LTT (Wales) — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What LTT is" },
  { id: "main", title: "Main residential rates" },
  { id: "example", title: "A worked example" },
  { id: "ftb", title: "First-time buyers in Wales" },
  { id: "higher", title: "Higher residential rates" },
  { id: "who-higher", title: "Who pays the higher rates" },
  { id: "refund", title: "Getting the higher rates back" },
  { id: "reckoner", title: "Ready reckoner" },
  { id: "uk", title: "Wales, England and Scotland compared" },
  { id: "paying", title: "Filing and paying" },
  { id: "reduce", title: "Paying no more than you owe" },
  { id: "special", title: "Special cases" },
  { id: "history", title: "How LTT has changed" },
  { id: "effective", title: "Effective rates" },
  { id: "second-homes", title: "Second homes and holiday lets in Wales" },
  { id: "budget", title: "The full cost of buying in Wales" },
  { id: "buy-before-sell", title: "Example: buying before you sell" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.WALES — Land Transaction Tax rates and bands", href: "https://www.gov.wales/land-transaction-tax-rates-and-bands" },
  { label: "GOV.WALES — Higher rates for residential property", href: "https://www.gov.wales/higher-rates-land-transaction-tax-overview" },
  { label: "Welsh Revenue Authority — Land Transaction Tax", href: "https://www.gov.wales/land-transaction-tax-guide" },
  { label: "GOV.WALES — Claim a refund of higher rates", href: "https://www.gov.wales/claim-refund-land-transaction-tax-higher-rates" },
];

const MAIN = [
  { from: 0, to: 225_000, label: "0%", legend: "0% up to £225,000", color: SERIES[0], light: true },
  { from: 225_000, to: 400_000, label: "6%", legend: "6% £225,001 to £400,000", color: SERIES[1] },
  { from: 400_000, to: 750_000, label: "7.5%", legend: "7.5% £400,001 to £750,000", color: SERIES[2] },
  { from: 750_000, to: 1_000_000, label: "10%", legend: "10% £750,001 to £1.5m (12% above)", color: SERIES[3] },
];

export default function LTTGuide() {
  return (
    <Guide
      kicker="The LTT guide"
      title="Land Transaction Tax in Wales, explained"
      intro={
        <>
          Buy a home in Wales and you pay Land Transaction Tax (LTT), not <a href="/property/stamp-duty-england">Stamp Duty</a>. Wales has the UK&apos;s highest tax-free
          band for home buyers but no separate <a href="/property/first-time-buyer">first-time buyer relief</a>, and its own higher rates for second homes. This guide
          covers the 2026/27 rates, the higher rates and refunds, and how the bill compares with England and Scotland.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What LTT is">
        <p>
          LTT is a tax on buying land and property in Wales. It replaced Stamp Duty Land Tax for Welsh property on 1 April 2018
          and is collected by the Welsh Revenue Authority (WRA). It applies to cash and mortgage purchases alike, and to new and
          older homes.
        </p>
        <p>
          You pay it on the price, which the law calls the chargeable consideration. If no money changes hands, for example a
          gift with no mortgage taken on, there is usually nothing to pay. Residential property has its own rates. Shops,
          offices, farmland and mixed-use property use the non-residential rates.
        </p>
      </GuideSection>

      <GuideSection id="main" n={2} kicker="Rates" title="Main residential rates">
        <p>
          The main rates apply when you buy your only home, or replace your main home and sell the old one first. LTT is a slice
          tax: each rate applies only to the part of the price inside its band.
        </p>
        <BandBar bands={MAIN} max={1_000_000} />
        <DataTable
          caption="LTT main residential rates"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £225,000", "0%"],
            ["£225,001 to £400,000", "6%"],
            ["£400,001 to £750,000", "7.5%"],
            ["£750,001 to £1,500,000", "10%"],
            ["Above £1,500,000", "12%"],
          ]}
        />
        <p>
          The £225,000 starting threshold has applied since October 2022. It is the highest 0% band in the UK for a home mover,
          which means most homes in Wales pay little or no LTT.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="LTT on a £280,000 home, main rates"
          steps={[
            { label: "First £225,000 at 0%", value: "£0" },
            { label: "Next £55,000 at 6%", note: "£225,001 to £280,000", value: "£3,300" },
          ]}
          total={{ label: "LTT to pay", value: "£3,300" }}
        />
        <p>
          That is 1.18% of the price. At £400,000 the bill is £10,500 (6% of £175,000). Above £400,000 each extra pound is taxed
          at 7.5%, so a home at £500,000 pays £18,000.
        </p>
      </GuideSection>

      <GuideSection id="ftb" n={4} kicker="First-time buyers" title="First-time buyers in Wales">
        <p>
          There is no separate first-time buyer relief in Wales. Instead, every buyer of an only or main home gets the £225,000
          0% band. For most first-time buyers in Wales that is more generous than relief elsewhere:
        </p>
        <DataTable
          caption="A first-time buyer in each nation"
          head={["Price", "Wales", "Scotland", "England & NI"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£200,000", "£0", "£500", "£0"],
            ["£250,000", "£1,500", "£1,500", "£0"],
            ["£300,000", "£4,500", "£4,000", "£0"],
            ["£400,000", "£10,500", "£12,750", "£5,000"],
            ["£500,000", "£18,000", "£22,750", "£10,000"],
          ]}
        />
        <p>
          England&apos;s first-time buyer relief, with 0% up to £300,000, beats Wales above £225,000, but it stops entirely
          above £500,000. In Wales the same rates apply whatever the price, so there is no cliff edge.
        </p>
      </GuideSection>

      <GuideSection id="higher" n={5} kicker="Second homes" title="Higher residential rates">
        <p>
          If you will own more than one home after buying, you usually pay the higher residential rates. Since 11 December 2024
          they are:
        </p>
        <DataTable
          caption="LTT higher residential rates"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £180,000", "5%"],
            ["£180,001 to £250,000", "8.5%"],
            ["£250,001 to £400,000", "10%"],
            ["£400,001 to £750,000", "12.5%"],
            ["£750,001 to £1,500,000", "15%"],
            ["Above £1,500,000", "17%"],
          ]}
        />
        <p>
          There is no 0% band, so tax is due from the first pound. The higher rates do not apply to a home bought for less than
          £40,000.
        </p>
        <WorkedExample
          title="A £300,000 buy-to-let in Wales"
          steps={[
            { label: "First £180,000 at 5%", value: "£9,000" },
            { label: "Next £70,000 at 8.5%", value: "£5,950" },
            { label: "Last £50,000 at 10%", value: "£5,000" },
          ]}
          total={{ label: "LTT to pay", value: "£19,950" }}
        />
        <p>That compares with £4,500 for someone buying the same home as their only home: the higher rates add £15,450.</p>
      </GuideSection>

      <GuideSection id="who-higher" n={6} kicker="Who pays them" title="Who pays the higher rates">
        <p>You usually pay the higher rates if, at the end of the day of purchase:</p>
        <ul>
          <li>you own two or more homes worth £40,000 or more, anywhere in the world; and</li>
          <li>the home you are buying is not replacing your main home.</li>
        </ul>
        <p>
          Married couples and civil partners are treated as one: if your spouse owns a home, so do you for LTT. Buying jointly
          with someone who already owns a home they are keeping also triggers the higher rates for the whole purchase.
          Companies pay the higher rates on most residential purchases.
        </p>
        <Callout tone="warn" title="Buying before you sell">
          If you buy your next home before your old one sells, you will own two homes on the day, so the higher rates apply. You
          can claim them back once you sell, as explained below.
        </Callout>
      </GuideSection>

      <GuideSection id="refund" n={7} kicker="Refunds" title="Getting the higher rates back">
        <p>
          If the new home replaces your main home and you sell the old one within <strong>3 years</strong>, you can claim back
          the difference between the higher rates and the main rates.
        </p>
        <Timeline
          items={[
            { when: "Day 1", what: "Buy your new home", detail: "Pay LTT at the higher rates." },
            { when: "Within 3 years", what: "Sell your old main home", detail: "It must have been your main home in the 3 years before the purchase." },
            { when: "After the sale", what: "Claim from the WRA", detail: "Apply online, usually within 12 months of the sale. The refund is the extra tax, not the whole bill." },
          ]}
        />
        <p>
          On a £300,000 home the refund would be £15,450, leaving the £4,500 at the main rates. The calculator shows the
          refundable amount when you turn on &quot;This replaces your main home&quot;.
        </p>
      </GuideSection>

      <GuideSection id="reckoner" n={8} kicker="Ready reckoner" title="LTT at common prices">
        <DataTable
          caption="LTT for 2026/27"
          head={["Price", "Main rates", "Higher rates", "Difference"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£150,000", "£0", "£7,500", "£7,500"],
            ["£200,000", "£0", "£10,700", "£10,700"],
            ["£250,000", "£1,500", "£14,950", "£13,450"],
            ["£300,000", "£4,500", "£19,950", "£15,450"],
            ["£350,000", "£7,500", "£24,950", "£17,450"],
            ["£400,000", "£10,500", "£29,950", "£19,450"],
            ["£500,000", "£18,000", "£42,450", "£24,450"],
            ["£750,000", "£36,750", "£73,700", "£36,950"],
            ["£1,000,000", "£61,750", "£111,200", "£49,450"],
          ]}
        />
      </GuideSection>

      <GuideSection id="uk" n={9} kicker="Comparison" title="Wales, England and Scotland compared">
        <p>
          For a home mover, Wales is the cheapest of the three nations up to about £350,000, thanks to the £225,000 0% band.
          Above that England is cheaper, because its 5% band runs all the way to £925,000.
        </p>
        <DataTable
          caption="The same home bought by a home mover"
          head={["Price", "Wales (LTT)", "Scotland (LBTT)", "England & NI (SDLT)"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£200,000", "£0", "£1,100", "£1,500"],
            ["£250,000", "£1,500", "£2,100", "£2,500"],
            ["£300,000", "£4,500", "£4,600", "£5,000"],
            ["£400,000", "£10,500", "£13,350", "£10,000"],
            ["£500,000", "£18,000", "£23,350", "£15,000"],
            ["£750,000", "£36,750", "£48,350", "£27,500"],
          ]}
        />
      </GuideSection>

      <GuideSection id="paying" n={10} kicker="Paying" title="Filing and paying">
        <p>
          Your solicitor or conveyancer files the LTT return with the WRA and pays the tax within <strong>30 days</strong>{" "}of
          completion. In practice they collect the money from you before completion and pay on the day, because the purchase
          cannot be registered with HM Land Registry without the WRA&apos;s certificate.
        </p>
        <p>
          A return is needed for most purchases of £40,000 or more, even when no tax is due. Late returns and payments attract
          penalties and interest.
        </p>
        <Callout title="Budget for LTT in cash">
          LTT cannot usually be added to the mortgage. Have it ready on completion day along with your deposit, legal fees and
          survey costs.
        </Callout>
      </GuideSection>

      <GuideSection id="reduce" n={11} kicker="Planning" title="Paying no more than you owe">
        <ul>
          <li>
            <strong>Furniture and fittings.</strong> Movable items such as curtains, furniture and free-standing appliances are
            not taxed. If they are included in the price, they can be listed at a fair value. Inflating them is evasion.
          </li>
          <li>
            <strong>Thresholds.</strong> There are no cliff edges, but just above £225,000 every extra pound costs 6p in tax, and
            above £400,000 it costs 7.5p.
          </li>
          <li>
            <strong>Sell first if you can.</strong> Selling your old home before you complete avoids paying the higher rates and
            waiting for a refund.
          </li>
          <li>
            <strong>Diarise the refund.</strong> If you do buy first, note the 3-year deadline to sell and the time limit to
            claim.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="special" n={12} kicker="Special cases" title="Special cases">
        <p>
          <strong><a href="/property/shared-ownership">Shared ownership</a>{" "}and shared equity.</strong> Special rules let you pay LTT on the share you buy or on the full
          value. Your conveyancer will advise which suits you.
        </p>
        <p>
          <strong>New-build incentives.</strong> If the developer pays your LTT, it is still worked out on the price you pay.
        </p>
        <p>
          <strong>Several dwellings at once.</strong> Buying more than one dwelling in one transaction has its own rules. Get
          specialist advice.
        </p>
        <p>
          <strong>Leasehold homes.</strong> Most leasehold flats are bought for a premium with a low ground rent, and LTT is
          worked out on the premium. Leases with a significant rent can also be taxed on the rent.
        </p>
      </GuideSection>

      <GuideSection id="history" n={13} kicker="Background" title="How LTT has changed">
        <Timeline
          items={[
            { when: "April 2018", what: "LTT replaces Stamp Duty in Wales", detail: "Run by the new Welsh Revenue Authority, with a £180,000 0% band." },
            { when: "July 2020", what: "Temporary threshold rise", detail: "The 0% band rose to £250,000 until June 2021." },
            { when: "October 2022", what: "0% band rises to £225,000", detail: "The current main residential threshold." },
            { when: "December 2022", what: "Higher rates rise by 1 point", detail: "" },
            { when: "December 2024", what: "Higher rates rise again", detail: "To the current 5% to 17% rates." },
          ]}
        />
      </GuideSection>

      <GuideSection id="effective" n={14} kicker="In context" title="Effective rates">
        <p>The effective rate is the total LTT as a share of the price. At the main rates it stays low for most homes:</p>
        <DataTable
          caption="LTT as a share of the price"
          head={["Price", "Main rates", "Effective", "Higher rates", "Effective"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£250,000", "£1,500", "0.60%", "£14,950", "5.98%"],
            ["£300,000", "£4,500", "1.50%", "£19,950", "6.65%"],
            ["£400,000", "£10,500", "2.63%", "£29,950", "7.49%"],
            ["£500,000", "£18,000", "3.60%", "£42,450", "8.49%"],
            ["£750,000", "£36,750", "4.90%", "£73,700", "9.83%"],
            ["£1,000,000", "£61,750", "6.18%", "£111,200", "11.12%"],
          ]}
        />
        <p>
          The gap between the two columns is what the higher rates cost. For a second home or buy-to-let it is usually the
          largest single cost of buying after the deposit.
        </p>
      </GuideSection>

      <GuideSection id="second-homes" n={15} kicker="Second homes" title="Second homes and holiday lets in Wales">
        <p>
          Wales has introduced several measures aimed at second homes and holiday lets, alongside the higher LTT rates:
        </p>
        <ul>
          <li>
            <strong>Council tax premiums.</strong> Councils can charge a premium of up to 300% on second homes and long-term
            empty homes, on top of the normal <a href="/property/council-tax-bands">council tax</a>.
          </li>
          <li>
            <strong>Holiday let <a href="/business/small-business-rates">business rates</a>.</strong> To be rated for business rates rather than council tax, a self-catering
            property must be available to let for at least 252 days a year and actually let for at least 182 days.
          </li>
          <li>
            <strong>Planning controls.</strong> Some councils can require planning permission to change a main home into a
            second home or holiday let.
          </li>
        </ul>
        <p>
          If you are buying in Wales for occasional use, check the council tax premium in that area before you commit: it can
          add thousands of pounds a year to the running cost.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={16} kicker="Budget" title="The full cost of buying in Wales">
        <p>Alongside LTT, budget for:</p>
        <ul>
          <li><strong>Conveyancing fees</strong> and searches, usually £1,200 to £2,000.</li>
          <li><strong>HM Land Registry fee</strong> to register the purchase, which rises with the price.</li>
          <li><strong>Survey</strong>, from a few hundred pounds for a basic report.</li>
          <li><strong>Mortgage fees</strong>, such as an arrangement fee.</li>
          <li><strong>Removals</strong>, furnishing and buildings insurance from exchange of contracts.</li>
        </ul>
        <p>
          Our <a href="/property/moving-house-budget">moving house</a>{" "}budget calculator adds these to your deposit and LTT so you can see the total cash you need on
          completion day.
        </p>
      </GuideSection>

      <GuideSection id="buy-before-sell" n={17} kicker="Worked example" title="Example: buying before you sell">
        <p>
          Sian and Rhys own a home in Swansea and find their next home for £350,000 before their old one has sold. On completion
          day they own two homes, so the higher rates apply.
        </p>
        <WorkedExample
          title="A £350,000 replacement home bought before selling"
          steps={[
            { label: "LTT at the higher rates", note: "Paid on completion", value: "£24,950" },
            { label: "LTT at the main rates", note: "What they would have paid if they had sold first", value: "£7,500" },
          ]}
          total={{ label: "Refund if they sell within 3 years", value: "£17,450" }}
        />
        <p>
          Their old home sells 8 months later, so they claim the £17,450 back from the WRA. In the meantime they needed the full
          £24,950 in cash, so many buyers in this position use savings or a short-term loan, or wait to buy until their sale is
          agreed. If the old home had not sold within 3 years, the refund would have been lost.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£225,000", label: "0% band at the main rates" },
            { value: "6%", label: "Rate from £225,001 to £400,000" },
            { value: "5% to 17%", label: "Higher rates for additional homes" },
            { value: "£40,000", label: "Higher rates do not apply below this" },
            { value: "3 years", label: "To sell your old home and claim back the higher rates" },
            { value: "30 days", label: "To file the return and pay" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
