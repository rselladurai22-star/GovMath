import {
  BandBar,
  Callout,
  CompareCards,
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

/** Stamp Duty (England and NI) — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What Stamp Duty is" },
  { id: "rates", title: "Rates for home movers" },
  { id: "example", title: "A worked example" },
  { id: "ftb", title: "First-time buyers" },
  { id: "additional", title: "Second homes and buy-to-let" },
  { id: "refund", title: "Getting the surcharge back" },
  { id: "non-resident", title: "Buyers from outside the UK" },
  { id: "reckoner", title: "Ready reckoner" },
  { id: "effective", title: "Effective rates" },
  { id: "leasehold", title: "Leasehold, shared ownership and new builds" },
  { id: "special", title: "Gifts, divorce and companies" },
  { id: "paying", title: "Filing and paying" },
  { id: "reduce", title: "Paying no more than you owe" },
  { id: "history", title: "How the rates have changed" },
  { id: "nations", title: "Scotland and Wales" },
  { id: "buy-before-sell", title: "Example: buying before you sell" },
  { id: "who-ftb", title: "Who counts as a first-time buyer" },
  { id: "non-residential", title: "Mixed-use and non-residential property" },
  { id: "deposit", title: "Stamp Duty and your deposit" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Stamp Duty Land Tax: residential property rates", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
  { label: "GOV.UK — Higher rates for additional properties", href: "https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property" },
  { label: "GOV.UK — Relief for first-time buyers", href: "https://www.gov.uk/government/publications/stamp-duty-land-tax-relief-for-first-time-buyers" },
  { label: "GOV.UK — Rates for non-UK residents", href: "https://www.gov.uk/guidance/rates-of-stamp-duty-land-tax-for-non-uk-residents" },
  { label: "GOV.UK — Apply for a repayment of the higher rates", href: "https://www.gov.uk/guidance/apply-for-a-refund-of-stamp-duty-land-tax" },
];

const BANDS = [
  { from: 0, to: 125_000, label: "0%", legend: "0% up to £125,000", color: SERIES[0], light: true },
  { from: 125_000, to: 250_000, label: "2%", legend: "2% £125,001 to £250,000", color: SERIES[1] },
  { from: 250_000, to: 925_000, label: "5%", legend: "5% £250,001 to £925,000", color: SERIES[2] },
  { from: 925_000, to: 1_500_000, label: "10%", legend: "10% £925,001 to £1.5m (12% above)", color: SERIES[3] },
];

export default function StampDutyGuide() {
  return (
    <Guide
      kicker="The Stamp Duty guide"
      title="Stamp Duty in England and Northern Ireland, explained"
      intro={
        <>
          Stamp Duty Land Tax is charged when you buy a home in England or Northern Ireland. This guide explains the 2026/27 rates
          for home movers, first-time buyers and second homes, how the bill is worked out slice by slice, how to reclaim the
          surcharge, and the special rules for leasehold, shared ownership and buyers from abroad.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What Stamp Duty is">
        <p>
          Stamp Duty Land Tax (SDLT) is a tax on buying land or property in England and Northern Ireland. You pay it whether you
          buy with a mortgage or in cash, and whether the home is new or old. Scotland and Wales have their own taxes instead.
        </p>
        <p>
          It is worked out on the price you pay, called the chargeable consideration. Your solicitor or conveyancer usually files
          the return and pays HMRC for you, from money you provide at completion.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="Rates for home movers">
        <p>
          Stamp Duty is a slice tax. The price is split into bands and each rate applies only to the part of the price inside its
          band. Paying more never increases the tax on the slices below.
        </p>
        <BandBar bands={BANDS} max={1_500_000} />
        <DataTable
          caption="Standard residential rates, from 1 April 2025"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £125,000", "0%"],
            ["£125,001 to £250,000", "2%"],
            ["£250,001 to £925,000", "5%"],
            ["£925,001 to £1,500,000", "10%"],
            ["Above £1,500,000", "12%"],
          ]}
        />
        <p>These rates are unchanged for 2026/27 and apply to anyone buying a main home who is not a first-time buyer.</p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="A home mover paying £295,000"
          steps={[
            { label: "First £125,000 at 0%", value: "£0" },
            { label: "Next £125,000 at 2%", note: "£125,001 to £250,000", value: "£2,500" },
            { label: "Last £45,000 at 5%", note: "£250,001 to £295,000", value: "£2,250" },
          ]}
          total={{ label: "Stamp Duty to pay", value: "£4,750" }}
        />
        <p>
          That is 1.61% of the price. Each extra £1,000 above £250,000 adds £50 of tax, until the 10% band starts at £925,000.
        </p>
      </GuideSection>

      <GuideSection id="ftb" n={4} kicker="First-time buyers" title="First-time buyers">
        <p>
          If every buyer is a first-time buyer and the price is £500,000 or less, you pay nothing on the first £300,000 and 5% on
          the part from £300,001 to £500,000. Above £500,000 the relief is lost completely and the standard rates apply.
        </p>
        <DataTable
          caption="First-time buyer against home mover"
          head={["Price", "First-time buyer", "Home mover", "Saving"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£250,000", "£0", "£2,500", "£2,500"],
            ["£300,000", "£0", "£5,000", "£5,000"],
            ["£400,000", "£5,000", "£10,000", "£5,000"],
            ["£500,000", "£10,000", "£15,000", "£5,000"],
            ["£500,001", "£15,000", "£15,000", "£0"],
          ]}
        />
        <p>Our first-time buyer calculator covers the rules, joint buyers and Lifetime ISAs in more detail.</p>
      </GuideSection>

      <GuideSection id="additional" n={5} kicker="Second homes" title="Second homes and buy-to-let">
        <p>
          If you will own two or more homes after buying, and the new one is not replacing your main home, you pay the higher
          rates: the standard rates plus a <strong>5% surcharge</strong> on every band, from the first pound. The surcharge rose
          from 3% to 5% on 31 October 2024.
        </p>
        <DataTable
          caption="Higher rates for additional properties"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £125,000", "5%"],
            ["£125,001 to £250,000", "7%"],
            ["£250,001 to £925,000", "10%"],
            ["£925,001 to £1,500,000", "15%"],
            ["Above £1,500,000", "17%"],
          ]}
        />
        <WorkedExample
          title="A £200,000 buy-to-let"
          steps={[
            { label: "Standard Stamp Duty", value: "£1,500" },
            { label: "5% surcharge on £200,000", value: "£10,000" },
          ]}
          total={{ label: "Stamp Duty to pay", value: "£11,500" }}
        />
        <p>
          The higher rates do not apply to homes bought for less than £40,000. Married couples and civil partners are treated as
          one: if your spouse owns a home, so do you for this test. Homes owned anywhere in the world count.
        </p>
      </GuideSection>

      <GuideSection id="refund" n={6} kicker="Refunds" title="Getting the surcharge back">
        <p>
          If you buy a new main home before selling your old one, you pay the higher rates on completion. If you then sell your
          previous main home within <strong>3 years</strong>, you can claim the surcharge back from HMRC.
        </p>
        <Timeline
          items={[
            { when: "Day 1", what: "Buy your new main home", detail: "Pay Stamp Duty at the higher rates." },
            { when: "Within 3 years", what: "Sell your old main home", detail: "It must have been your main home at some point in the 3 years before the purchase." },
            { when: "After the sale", what: "Claim the refund", detail: "Apply online, usually within 12 months of the sale. HMRC refunds the surcharge." },
          ]}
        />
        <p>On a £400,000 home the surcharge is £20,000, so the refund is worth having in the diary.</p>
      </GuideSection>

      <GuideSection id="non-resident" n={7} kicker="Overseas buyers" title="Buyers from outside the UK">
        <p>
          A further <strong>2% surcharge</strong> applies if you have not been present in the UK for at least 183 days in the 12
          months before buying. It is added on top of whichever rates apply to you, including the higher rates for additional
          homes. A non-resident home mover buying for £300,000 would pay £5,000 plus £6,000: £11,000.
        </p>
        <p>
          If you then spend 183 days in the UK in a 365-day period around the purchase, you may be able to claim the 2% back.
        </p>
      </GuideSection>

      <GuideSection id="reckoner" n={8} kicker="Ready reckoner" title="Ready reckoner">
        <DataTable
          caption="Stamp Duty for 2026/27"
          head={["Price", "Home mover", "First-time buyer", "Second home"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£200,000", "£1,500", "£0", "£11,500"],
            ["£250,000", "£2,500", "£0", "£15,000"],
            ["£300,000", "£5,000", "£0", "£20,000"],
            ["£350,000", "£7,500", "£2,500", "£25,000"],
            ["£400,000", "£10,000", "£5,000", "£30,000"],
            ["£500,000", "£15,000", "£10,000", "£40,000"],
            ["£750,000", "£27,500", "£27,500", "£65,000"],
            ["£1,000,000", "£43,750", "£43,750", "£93,750"],
            ["£2,000,000", "£153,750", "£153,750", "£253,750"],
          ]}
        />
      </GuideSection>

      <GuideSection id="effective" n={9} kicker="In context" title="Effective rates">
        <p>The effective rate is the total tax as a share of the price. For a home mover it rises steadily:</p>
        <DataTable
          caption="Stamp Duty as a share of the price, home mover"
          head={["Price", "Stamp Duty", "Effective rate"]}
          numeric={[1, 2]}
          rows={[
            ["£300,000", "£5,000", "1.67%"],
            ["£500,000", "£15,000", "3.00%"],
            ["£925,000", "£36,250", "3.92%"],
            ["£1,000,000", "£43,750", "4.38%"],
            ["£2,000,000", "£153,750", "7.69%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="leasehold" n={10} kicker="Special purchases" title="Leasehold, shared ownership and new builds">
        <p>
          <strong>Buying an existing lease.</strong> Most leasehold flats are bought for a price (premium) with a low ground
          rent. Stamp Duty is worked out on the premium using the normal rates.
        </p>
        <p>
          <strong>New leases with significant rent.</strong> Where a new lease has a large rent, Stamp Duty can also be due on
          the net present value of the rent above £125,000, at 1%. This is unusual for normal home purchases.
        </p>
        <p>
          <strong>Shared ownership.</strong> You can pay on the share you buy, or elect to pay on the full market value up front.
          Our shared ownership calculator compares both.
        </p>
        <p>
          <strong>New builds.</strong> The rates are the same. If the developer pays your Stamp Duty as an incentive, the tax is
          still worked out on the price.
        </p>
      </GuideSection>

      <GuideSection id="special" n={11} kicker="Special cases" title="Gifts, divorce and companies">
        <CompareCards
          columns={[
            {
              name: "Usually no Stamp Duty",
              rows: [
                { label: "Gifts", value: "If no money or mortgage changes hands" },
                { label: "Inheritance", value: "Inheriting a home" },
                { label: "Divorce", value: "Transfers under a court order or agreement" },
              ],
            },
            {
              name: "Stamp Duty may be due",
              rows: [
                { label: "Taking on a mortgage", value: "The debt you take on counts as the price" },
                { label: "Buying a share", value: "Buying out a co-owner" },
                { label: "Companies", value: "17% on homes over £500,000, unless a relief applies" },
              ],
            },
          ]}
        />
        <p>
          Buying several homes in one transaction used to qualify for multiple dwellings relief, but that relief was abolished from
          June 2024.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={12} kicker="Paying" title="Filing and paying">
        <p>
          The SDLT return must be filed and the tax paid within <strong>14 days of completion</strong>. Your conveyancer normally
          does this, using money you send before completion. A return is needed for most purchases over £40,000, even if no tax is
          due. HMRC charges penalties and interest for late returns and payments.
        </p>
        <Callout title="Budget for it in cash">
          Stamp Duty cannot normally be added to your mortgage. Have it ready alongside your deposit and fees. Our moving costs
          calculator adds everything up.
        </Callout>
      </GuideSection>

      <GuideSection id="reduce" n={13} kicker="Planning" title="Paying no more than you owe">
        <ul>
          <li>
            <strong>Furniture and fittings.</strong> Movable items, such as curtains, free-standing appliances and furniture,
            are not taxed. If included in the price they can be listed at a fair value. Inflating them is evasion.
          </li>
          <li>
            <strong>Thresholds.</strong> There are no cliff edges for home movers, but there is one at £500,000 for first-time
            buyers, where an extra £1 costs £5,000.
          </li>
          <li><strong>Sell first</strong> if you can, to avoid paying the higher rates and waiting for a refund.</li>
          <li><strong>Check your status.</strong> Make sure relief or the main residence rules are applied correctly.</li>
        </ul>
        <Callout tone="warn" title="Beware of avoidance schemes">
          Schemes that promise to cut or remove Stamp Duty through complex arrangements are challenged by HMRC, and buyers end up
          paying the tax plus interest and penalties.
        </Callout>
      </GuideSection>

      <GuideSection id="history" n={14} kicker="Background" title="How the rates have changed">
        <Timeline
          items={[
            { when: "December 2014", what: "Slice system introduced", detail: "Each rate applies only to the part of the price in its band." },
            { when: "April 2016", what: "3% surcharge on additional homes", detail: "" },
            { when: "April 2021", what: "2% non-resident surcharge", detail: "" },
            { when: "September 2022", what: "Temporary cut", detail: "The 0% band rose to £250,000, and £425,000 for first-time buyers." },
            { when: "October 2024", what: "Surcharge rises to 5%", detail: "" },
            { when: "April 2025", what: "Temporary cut ends", detail: "The 0% band returned to £125,000, and £300,000 for first-time buyers." },
          ]}
        />
      </GuideSection>

      <GuideSection id="nations" n={15} kicker="Across the UK" title="Scotland and Wales">
        <p>
          Scotland charges Land and Buildings Transaction Tax and Wales charges Land Transaction Tax, each with different bands and
          surcharges. For a home mover at £300,000: £5,000 in England, £4,600 in Scotland and £4,500 in Wales. Our LBTT and LTT
          calculators cover them.
        </p>
      </GuideSection>

      <GuideSection id="buy-before-sell" n={16} kicker="Worked example" title="Example: buying before you sell">
        <p>
          Sam and Alex buy their next home for £400,000 before their flat has sold. On completion day they own two homes, so the
          higher rates apply.
        </p>
        <WorkedExample
          title="A £400,000 replacement home bought before selling"
          steps={[
            { label: "Stamp Duty at the higher rates", note: "Paid within 14 days of completion", value: "£30,000" },
            { label: "Stamp Duty at the standard rates", value: "£10,000" },
          ]}
          total={{ label: "Refund if they sell within 3 years", value: "£20,000" }}
        />
        <p>
          They need the full £30,000 at completion. When their flat sells five months later, they claim £20,000 back from HMRC. If
          the flat had not sold within 3 years, the refund would be lost.
        </p>
      </GuideSection>

      <GuideSection id="who-ftb" n={17} kicker="Eligibility" title="Who counts as a first-time buyer">
        <p>
          For Stamp Duty you are a first-time buyer only if you have never owned a home, or a share of one, anywhere in the world,
          and you will live in the new home as your main residence. Every buyer must qualify.
        </p>
        <p>
          Inherited shares of homes, homes owned with a former partner and homes abroad all count as owning before. Having had a
          mortgage is not the test; owning is. A parent who helps with a gifted deposit but is not buying does not affect your
          relief.
        </p>
      </GuideSection>

      <GuideSection id="non-residential" n={18} kicker="Other property" title="Mixed-use and non-residential property">
        <p>
          Property that is partly residential and partly commercial, such as a flat above a shop, or a home with a substantial
          commercial element, can use the non-residential rates:
        </p>
        <DataTable
          caption="Non-residential and mixed-use rates"
          head={["Part of the price", "Rate"]}
          rows={[
            ["Up to £150,000", "0%"],
            ["£150,001 to £250,000", "2%"],
            ["Above £250,000", "5%"],
          ]}
        />
        <p>
          HMRC looks closely at mixed-use claims on homes with a paddock, woodland or annexe, and many have been rejected at
          tribunal. A large garden does not make a home mixed-use.
        </p>
      </GuideSection>

      <GuideSection id="deposit" n={19} kicker="Budgeting" title="Stamp Duty and your deposit">
        <p>
          Stamp Duty comes on top of your deposit, and lenders will not usually lend to cover it. A home mover buying for £400,000
          with a 10% deposit needs £40,000 for the deposit and £10,000 for Stamp Duty, before legal fees and removals.
        </p>
        <p>
          If cash is tight, you could put down a slightly smaller deposit to keep money back for the tax, but check that this does
          not push you into a higher loan-to-value band with a worse rate.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={20} kicker="FAQs" title="Common questions">
        <h3>Does Stamp Duty depend on my deposit?</h3>
        <p>No. It is worked out on the price, whether you pay cash or borrow 95%.</p>
        <h3>I am buying before selling. Do I pay the surcharge?</h3>
        <p>Yes, if you own two homes at the end of the day of completion. Claim it back once you sell your old home within 3 years.</p>
        <h3>Do I pay Stamp Duty on a garage or parking space?</h3>
        <p>If bought with the home, it is part of the same purchase. Bought separately, non-residential rates may apply.</p>
        <h3>Is Stamp Duty due on a house swap or part exchange?</h3>
        <p>Each side is a purchase, but there are reliefs for part exchanges with house builders. Ask your conveyancer.</p>
        <h3>Can I pay Stamp Duty in instalments?</h3>
        <p>No. It is due in full within 14 days of completion.</p>
        <h3>Do I pay Stamp Duty on a home I am given?</h3>
        <p>Not if nothing is paid. If you take over the giver&apos;s mortgage, the amount of debt you take on counts as the price.</p>
        <h3>Is Stamp Duty the same in Northern Ireland?</h3>
        <p>Yes. Northern Ireland uses the same Stamp Duty Land Tax rates and rules as England.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£125,000", label: "0% band for home movers" },
            { value: "£300,000", label: "0% band for first-time buyers" },
            { value: "£500,000", label: "First-time buyer relief limit" },
            { value: "5%", label: "Surcharge on additional homes" },
            { value: "2%", label: "Surcharge for non-UK residents" },
            { value: "14 days", label: "To file the return and pay" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
