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

/** LBTT (Scotland) — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What LBTT is" },
  { id: "rates", title: "The rates for 2026/27" },
  { id: "example", title: "A worked example" },
  { id: "ftb", title: "First-time buyer relief" },
  { id: "ads", title: "The Additional Dwelling Supplement" },
  { id: "who-ads", title: "Who pays ADS" },
  { id: "reclaim", title: "Reclaiming ADS" },
  { id: "reckoner", title: "Ready reckoner" },
  { id: "uk", title: "Scotland, England and Wales compared" },
  { id: "paying", title: "Filing and paying" },
  { id: "reduce", title: "Paying no more than you owe" },
  { id: "special", title: "Special cases" },
  { id: "history", title: "How LBTT has changed" },
  { id: "effective", title: "Effective rates" },
  { id: "budget", title: "The full cost of buying in Scotland" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "Revenue Scotland — LBTT residential rates and bands", href: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property" },
  { label: "Revenue Scotland — Additional Dwelling Supplement", href: "https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads" },
  { label: "Revenue Scotland — First-time buyer relief", href: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property/first-time-buyer-relief" },
  { label: "mygov.scot — Land and Buildings Transaction Tax", href: "https://www.mygov.scot/land-and-buildings-transaction-tax" },
];

const BANDS = [
  { from: 0, to: 145_000, label: "0%", legend: "0% up to £145,000", color: SERIES[0], light: true },
  { from: 145_000, to: 250_000, label: "2%", legend: "2% £145,001 to £250,000", color: SERIES[1] },
  { from: 250_000, to: 325_000, label: "5%", legend: "5% £250,001 to £325,000", color: SERIES[2] },
  { from: 325_000, to: 750_000, label: "10%", legend: "10% £325,001 to £750,000", color: SERIES[3] },
  { from: 750_000, to: 1_000_000, label: "12%", legend: "12% above £750,000", color: "var(--g-c5, #64748b)" },
];

export default function LBTTGuide() {
  return (
    <Guide
      kicker="The LBTT guide"
      title="Land and Buildings Transaction Tax, explained"
      intro={
        <>
          If you buy a home in Scotland you pay Land and Buildings Transaction Tax (LBTT) rather than Stamp Duty. This guide
          explains the 2026/27 rates, how first-time buyer relief and the 8% Additional Dwelling Supplement work, when you can
          claim the supplement back, and how the bill compares with England and Wales.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What LBTT is">
        <p>
          LBTT is a tax on buying land and buildings in Scotland. It replaced UK Stamp Duty Land Tax for Scottish property on
          1 April 2015 and is collected by Revenue Scotland, not HMRC. It applies whether you buy with a mortgage or with cash,
          and whether the home is newly built or decades old.
        </p>
        <p>
          You pay it on the price you pay for the property, which the law calls the chargeable consideration. On a normal
          purchase that is simply the agreed price. Gifts with no payment, and most transfers between spouses or civil partners
          when they separate, are not taxed.
        </p>
        <p>
          Residential and non-residential property have different rates. This guide and the calculator cover homes. Shops,
          offices, farmland and mixed-use property use the non-residential rates.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="The rates for 2026/27">
        <p>
          LBTT is a slice tax, like Income Tax. The price is split into bands, and each rate applies only to the part of the
          price inside its band. Moving into a higher band never increases the tax on the slices below it.
        </p>
        <BandBar bands={BANDS} max={1_000_000} />
        <DataTable
          caption="LBTT residential rates for a main home"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £145,000", "0%"],
            ["£145,001 to £250,000", "2%"],
            ["£250,001 to £325,000", "5%"],
            ["£325,001 to £750,000", "10%"],
            ["Above £750,000", "12%"],
          ]}
        />
        <p>
          These bands have not changed since April 2021, so the same price has paid the same LBTT for several years. The rates
          are set by the Scottish Parliament and can change at each Scottish Budget, usually announced in December or January.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>Here is the tax on a £280,000 home bought by someone moving house.</p>
        <WorkedExample
          title="LBTT on £280,000, moving home"
          steps={[
            { label: "First £145,000 at 0%", value: "£0" },
            { label: "Next £105,000 at 2%", note: "£145,001 to £250,000", value: "£2,100" },
            { label: "Last £30,000 at 5%", note: "£250,001 to £280,000", value: "£1,500" },
          ]}
          total={{ label: "LBTT to pay", value: "£3,600" }}
        />
        <p>
          That is 1.29% of the price. At £400,000 the same buyer pays £13,350, because £75,000 of the price now falls in the
          10% band. That jump is why the rate on the next pound you offer matters when you are negotiating: above £325,000,
          every extra £1,000 of price costs £100 in tax.
        </p>
      </GuideSection>

      <GuideSection id="ftb" n={4} kicker="Relief" title="First-time buyer relief">
        <p>
          First-time buyers get a larger 0% band. Instead of £145,000, the first £175,000 is tax-free. The rest of the bands
          are the same, so the relief is worth up to <strong>£600</strong> (2% of £30,000).
        </p>
        <DataTable
          caption="LBTT for first-time buyers"
          head={["Price", "Moving home", "First-time buyer", "Saving"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£175,000", "£600", "£0", "£600"],
            ["£200,000", "£1,100", "£500", "£600"],
            ["£250,000", "£2,100", "£1,500", "£600"],
            ["£300,000", "£4,600", "£4,000", "£600"],
            ["£400,000", "£13,350", "£12,750", "£600"],
          ]}
        />
        <p>To qualify, you must:</p>
        <ul>
          <li>be buying your only or main home in Scotland;</li>
          <li>never have owned a home before, anywhere in the world, either on your own or jointly; and</li>
          <li>if buying with others, every buyer must also be a first-time buyer.</li>
        </ul>
        <p>
          Unlike England, Scotland has no price cap on the relief. A first-time buyer paying £600,000 still saves £600. You
          claim it on the LBTT return, which your solicitor completes.
        </p>
      </GuideSection>

      <GuideSection id="ads" n={5} kicker="Second homes" title="The Additional Dwelling Supplement">
        <p>
          If you will own more than one home after the purchase, you usually pay the Additional Dwelling Supplement (ADS) on top
          of the normal LBTT. Since 5 December 2024 the supplement is <strong>8% of the whole price</strong>, not just the part
          above a threshold.
        </p>
        <WorkedExample
          title="A £200,000 buy-to-let flat"
          steps={[
            { label: "Normal LBTT", note: "2% on £55,000", value: "£1,100" },
            { label: "ADS at 8% of £200,000", value: "£16,000" },
          ]}
          total={{ label: "Total to pay", value: "£17,100" }}
        />
        <p>
          ADS does not apply if the price is under £40,000. Above that, the 8% applies to the full price, so a £100,000 flat
          carries £8,000 of ADS even though no normal LBTT is due.
        </p>
        <Callout tone="warn" title="ADS is charged on the whole price">
          Because the supplement is a flat 8% of the price, it is far larger than the normal LBTT on most homes. On a £300,000
          second home the ADS is £24,000, more than five times the £4,600 of normal LBTT.
        </Callout>
      </GuideSection>

      <GuideSection id="who-ads" n={6} kicker="Who pays it" title="Who pays ADS">
        <p>ADS usually applies when, at the end of the day you buy, you own two or more homes. Common cases:</p>
        <ul>
          <li>buying a buy-to-let property or a holiday home;</li>
          <li>buying a new home before you have sold your old one;</li>
          <li>buying a home for a child to live in, if you are named on the title and already own your own home;</li>
          <li>buying jointly with someone who already owns a home and is keeping it.</li>
        </ul>
        <p>
          Spouses, civil partners and cohabiting couples are treated as one unit. If your partner owns a home, you are treated
          as owning it too, even if only one of you is buying. Homes anywhere in the world count, but a share of a home worth
          less than £40,000 is ignored.
        </p>
        <p>
          Companies and other non-individual buyers pay ADS on all residential purchases of £40,000 or more, whatever else
          they own.
        </p>
      </GuideSection>

      <GuideSection id="reclaim" n={7} kicker="Refunds" title="Reclaiming ADS">
        <p>
          If you buy your new main home before selling the old one, you pay ADS at first but can claim it back once you sell.
          You must sell your previous main home within <strong>36 months</strong> of buying the new one.
        </p>
        <Timeline
          items={[
            { when: "Day 1", what: "Buy your new home", detail: "Pay normal LBTT plus 8% ADS through your solicitor." },
            { when: "Within 36 months", what: "Sell your old main home", detail: "It must have been your main home at some point in the three years before you bought the new one." },
            { when: "After the sale", what: "Claim the refund", detail: "Apply to Revenue Scotland, usually through your solicitor, within the time limit for repayment claims." },
          ]}
        />
        <p>
          The refund is the ADS only; the normal LBTT stays paid. Revenue Scotland sets a time limit for the claim, so make it
          soon after the sale. If you sold your old main home before buying, ADS does not apply in the first place, as long as
          the new home replaces it.
        </p>
      </GuideSection>

      <GuideSection id="reckoner" n={8} kicker="Ready reckoner" title="LBTT at common prices">
        <DataTable
          caption="LBTT for 2026/27 by buyer type"
          head={["Price", "Moving home", "First-time buyer", "Second home (with ADS)"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£150,000", "£100", "£0", "£12,100"],
            ["£200,000", "£1,100", "£500", "£17,100"],
            ["£250,000", "£2,100", "£1,500", "£22,100"],
            ["£300,000", "£4,600", "£4,000", "£28,600"],
            ["£350,000", "£8,350", "£7,750", "£36,350"],
            ["£400,000", "£13,350", "£12,750", "£45,350"],
            ["£500,000", "£23,350", "£22,750", "£63,350"],
            ["£750,000", "£48,350", "£47,750", "£108,350"],
            ["£1,000,000", "£78,350", "£77,750", "£158,350"],
          ]}
        />
        <p>
          The calculator above gives the exact figure for any price, along with the band-by-band workings your solicitor will
          use.
        </p>
      </GuideSection>

      <GuideSection id="uk" n={9} kicker="Comparison" title="Scotland, England and Wales compared">
        <p>
          Each nation now has its own property tax. Scotland is cheaper than England for lower-priced homes but more expensive
          for most homes above about £330,000, because the 10% band starts at £325,000 rather than £925,000.
        </p>
        <DataTable
          caption="The same home bought by a home mover"
          head={["Price", "Scotland (LBTT)", "Wales (LTT)", "England & NI (SDLT)"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£200,000", "£1,100", "£0", "£1,500"],
            ["£250,000", "£2,100", "£1,500", "£2,500"],
            ["£300,000", "£4,600", "£4,500", "£5,000"],
            ["£400,000", "£13,350", "£10,500", "£10,000"],
            ["£500,000", "£23,350", "£18,000", "£15,000"],
            ["£750,000", "£48,350", "£36,750", "£27,500"],
          ]}
        />
        <p>
          For second homes the gap is wider still. A £300,000 buy-to-let costs £28,600 in Scotland, £20,000 in England and
          £19,950 in Wales.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={10} kicker="Paying" title="Filing and paying">
        <p>
          Your solicitor completes an LBTT return and sends it to Revenue Scotland with the payment within{" "}
          <strong>30 days</strong> of the date of entry, which is usually the settlement date when you get the keys. In
          practice, solicitors ask you for the money before settlement and pay it on the day, because the title cannot be
          registered with the Registers of Scotland until the return is filed.
        </p>
        <p>
          A return is needed for most purchases of £40,000 or more, even when no tax is due. Late returns and late payments
          attract penalties and interest.
        </p>
        <Callout title="Budget for it alongside your deposit">
          LBTT cannot normally be added to your mortgage. Plan to have the full amount in cash at settlement, together with your
          deposit, legal fees and any Home Report or survey costs.
        </Callout>
      </GuideSection>

      <GuideSection id="reduce" n={11} kicker="Planning" title="Paying no more than you owe">
        <p>There are no loopholes, but a few legitimate points can keep the bill right:</p>
        <ul>
          <li>
            <strong>Furniture and fittings.</strong> Items that are not part of the building, such as curtains, free-standing
            white goods and furniture, are not taxed. If they are included in the price, they can be listed separately at a fair
            value. Overstating them is tax evasion.
          </li>
          <li>
            <strong>Thresholds.</strong> Because each rate applies only to its slice, there are no cliff edges in LBTT. But an
            offer just over £325,000 pays 10% on the excess, so negotiating down to the threshold saves 10p in every pound.
          </li>
          <li>
            <strong>Sell before you buy.</strong> If you can, selling your old home first avoids paying ADS and waiting for the
            refund.
          </li>
          <li>
            <strong>Check first-time buyer status.</strong> If every buyer qualifies, make sure your solicitor claims the relief.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="special" n={12} kicker="Special cases" title="Special cases">
        <p>
          <strong>New-build incentives.</strong> If a developer pays your LBTT as an incentive, the tax is still worked out on
          the price you pay. Part-exchange deals have their own rules.
        </p>
        <p>
          <strong>Shared equity.</strong> Under Scottish Government shared equity schemes you usually pay LBTT on the share you
          buy. Your solicitor will confirm how the scheme is treated.
        </p>
        <p>
          <strong>Buying several homes at once.</strong> Different rules can apply when several dwellings are bought in one
          transaction. Get specialist advice.
        </p>
        <p>
          <strong>Inherited shares.</strong> Inheriting part of a home can mean you count as owning another home for ADS.
          Special rules can ignore some small or recently inherited shares, so tell your solicitor about any inheritance.
        </p>
        <p>
          <strong>Leases.</strong> Residential leases in Scotland are rare, and most homes are bought outright. Non-residential
          leases have their own LBTT rules.
        </p>
      </GuideSection>

      <GuideSection id="history" n={13} kicker="Background" title="How LBTT has changed">
        <Timeline
          items={[
            { when: "April 2015", what: "LBTT replaces Stamp Duty in Scotland", detail: "Devolved under the Scotland Act 2012 and run by Revenue Scotland." },
            { when: "April 2016", what: "ADS introduced at 3%", detail: "Matching the surcharge introduced in England at the same time." },
            { when: "June 2018", what: "First-time buyer relief", detail: "The 0% band rises to £175,000 for first-time buyers." },
            { when: "January 2019", what: "ADS rises to 4%", detail: "" },
            { when: "December 2022", what: "ADS rises to 6%", detail: "" },
            { when: "December 2024", what: "ADS rises to 8%", detail: "The highest second-home surcharge in the UK." },
          ]}
        />
      </GuideSection>

      <GuideSection id="effective" n={14} kicker="In context" title="Effective rates">
        <p>
          Because LBTT is charged in slices, the share of the price you pay in tax rises gradually. The effective rate is the
          total LBTT divided by the price:
        </p>
        <DataTable
          caption="LBTT as a share of the price, home mover"
          head={["Price", "LBTT", "Effective rate"]}
          numeric={[1, 2]}
          rows={[
            ["£200,000", "£1,100", "0.55%"],
            ["£300,000", "£4,600", "1.53%"],
            ["£400,000", "£13,350", "3.34%"],
            ["£500,000", "£23,350", "4.67%"],
            ["£750,000", "£48,350", "6.45%"],
            ["£1,000,000", "£78,350", "7.84%"],
          ]}
        />
        <p>
          Above £325,000 the effective rate climbs quickly because each extra pound is taxed at 10%. That matters when you are
          stretching to a bigger home: moving from £350,000 to £400,000 adds £5,000 of LBTT on top of the extra £50,000.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={15} kicker="Budget" title="The full cost of buying in Scotland">
        <p>LBTT is one of several costs when you buy a home in Scotland. Budget for:</p>
        <ul>
          <li><strong>Legal fees</strong> for your solicitor, who also handles the missives and settlement.</li>
          <li><strong>Registration dues</strong> paid to the Registers of Scotland to register your title, which rise with the price.</li>
          <li><strong>Mortgage fees</strong>, such as an arrangement fee and a valuation fee.</li>
          <li><strong>Surveys</strong> beyond the Home Report, if you want more detail. The seller pays for the Home Report.</li>
          <li><strong>Removals and furnishing</strong>, plus buildings insurance from the date of entry.</li>
        </ul>
        <p>Our moving house budget calculator brings these together with your LBTT and deposit.</p>
      </GuideSection>

      <GuideSection id="questions" n={16} kicker="FAQs" title="Common questions">
        <h3>Do I pay LBTT on a house under £145,000?</h3>
        <p>
          No, unless it is an additional home. A home mover or first-time buyer pays nothing below £145,000, and a first-time
          buyer pays nothing up to £175,000.
        </p>
        <h3>Do I pay LBTT if I am buying in Scotland but live in England?</h3>
        <p>
          Yes. LBTT depends on where the property is, not where you live. If you keep your English home, ADS applies as well.
        </p>
        <h3>Is there a surcharge for overseas buyers?</h3>
        <p>
          No. Scotland has no equivalent of England&apos;s 2% surcharge for non-UK residents. ADS still applies if you own a home
          anywhere else.
        </p>
        <h3>Can I add LBTT to my mortgage?</h3>
        <p>
          Not directly. You could borrow more and put down a smaller deposit, but lenders lend against the property value, so
          you still need the cash for the tax at settlement.
        </p>
        <h3>What happens if I buy before selling and the sale falls through?</h3>
        <p>
          Nothing changes straight away, but you only get the ADS back if you sell the old home within 36 months of buying
          the new one. After that, the supplement is not refundable.
        </p>
        <h3>Do I pay LBTT if I am given a home?</h3>
        <p>
          Not if no money changes hands. If you take over a mortgage on the home, the amount of debt you take on counts as the
          price.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£145,000", label: "0% band for home movers" },
            { value: "£175,000", label: "0% band for first-time buyers" },
            { value: "£600", label: "Most first-time buyer relief can save" },
            { value: "8%", label: "ADS on the whole price of a second home" },
            { value: "£40,000", label: "ADS does not apply below this price" },
            { value: "36 months", label: "To sell your old home and reclaim ADS" },
            { value: "30 days", label: "To file the return and pay" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
