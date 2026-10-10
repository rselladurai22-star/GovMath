import {
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

/** Shared Ownership — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What shared ownership is" },
  { id: "eligible", title: "Who can apply" },
  { id: "costs", title: "Your monthly costs" },
  { id: "example", title: "A worked example" },
  { id: "shares", title: "Choosing your share" },
  { id: "outright", title: "Against buying outright" },
  { id: "rent", title: "Rent and rent increases" },
  { id: "charges", title: "Service charges and repairs" },
  { id: "staircasing", title: "Staircasing" },
  { id: "stamp-duty", title: "Stamp Duty" },
  { id: "selling", title: "Selling your home" },
  { id: "mortgages", title: "Mortgages and deposits" },
  { id: "pros-cons", title: "Pros and cons" },
  { id: "nations", title: "Outside England" },
  { id: "buying-costs", title: "Costs when you buy" },
  { id: "stair-reckoner", title: "Staircasing ready reckoner" },
  { id: "vs-renting", title: "Against renting" },
  { id: "other-schemes", title: "Older buyers and disabled buyers" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Shared Ownership homes: buying a home", href: "https://www.gov.uk/shared-ownership-scheme" },
  { label: "GOV.UK — Affordable home ownership schemes", href: "https://www.gov.uk/affordable-home-ownership-schemes" },
  { label: "GOV.UK — SDLT: shared ownership property", href: "https://www.gov.uk/guidance/sdlt-shared-ownership-property" },
  { label: "MoneyHelper — Government home-buying schemes", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/government-schemes-for-first-time-home-buyers-and-existing-homeowners" },
];

export default function SharedOwnershipGuide() {
  return (
    <Guide
      kicker="The shared ownership guide"
      title="Shared ownership, explained"
      intro={
        <>
          Shared ownership lets you buy part of a home with a smaller deposit and mortgage, and pay rent on the rest. This guide
          explains who can apply, what it really costs each month, how rent and service charges rise, how to buy more shares,
          the <a href="/uk/property/stamp-duty-england">Stamp Duty</a>{" "}choices, and how it compares with buying outright.
        </>
      }
      meta={["England rules", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What shared ownership is">
        <p>
          With shared ownership you buy a share of a home, usually between 10% and 75%, and pay rent to a housing provider,
          usually a housing association, on the share you do not own. You take out a mortgage for your share, so the deposit and
          loan are much smaller than buying the whole home.
        </p>
        <p>
          You can buy more shares later, a process called staircasing, often up to 100%. Shared ownership homes are almost always
          leasehold, so you also pay a service charge and must follow the terms of the lease.
        </p>
      </GuideSection>

      <GuideSection id="eligible" n={2} kicker="Eligibility" title="Who can apply">
        <p>In England you can usually buy through shared ownership if your household income is:</p>
        <ul>
          <li>£80,000 a year or less outside London, or</li>
          <li>£90,000 a year or less in London,</li>
        </ul>
        <p>and one of these applies:</p>
        <ul>
          <li>you are a <a href="/uk/property/first-time-buyer">first-time buyer</a>;</li>
          <li>you used to own a home but cannot afford to buy one now; or</li>
          <li>you already own a shared ownership home and want to move.</li>
        </ul>
        <p>
          Providers also check that you can afford the costs and cannot afford to buy a suitable home outright. Some homes give
          priority to local people, key workers or members of the armed forces.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={3} kicker="Costs" title="Your monthly costs">
        <p>Each month you usually pay three things:</p>
        <ol>
          <li><strong>Mortgage</strong> on the share you buy.</li>
          <li><strong>Rent</strong> on the share you do not own, often around 2.75% of its value a year for new homes.</li>
          <li><strong>Service charge and ground rent</strong> for the building, insurance and management.</li>
        </ol>
        <p>
          Only the mortgage builds equity you own. The rent and service charge are housing costs, much like renting. Lenders
          include all three in their affordability check.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <p>A 40% share of a £300,000 flat, with a 10% deposit, a 4.75% mortgage over 30 years and a £150 monthly service charge:</p>
        <WorkedExample
          title="40% of a £300,000 home"
          steps={[
            { label: "Share price", note: "40% of £300,000", value: "£120,000" },
            { label: "Deposit", note: "10% of the share", value: "£12,000" },
            { label: "Mortgage payment", note: "£108,000 at 4.75% over 30 years", value: "£563.38" },
            { label: "Rent", note: "2.75% of £180,000, divided by 12", value: "£412.50" },
            { label: "Service charge", value: "£150.00" },
          ]}
          total={{ label: "Monthly cost", value: "£1,125.88" }}
        />
        <p>
          The calculator lets you change every one of these, including the rent percentage and service charge in your
          provider&apos;s key information document.
        </p>
      </GuideSection>

      <GuideSection id="shares" n={5} kicker="Your share" title="Choosing your share">
        <p>
          A bigger share means a bigger deposit and mortgage but less rent. Because rent is usually cheaper than mortgage interest
          plus capital, the total monthly cost rises as your share grows, but so does the part of the home you own.
        </p>
        <DataTable
          caption="A £300,000 home at 4.75% over 30 years, 10% deposit, £150 service charge"
          head={["Share", "Deposit", "Mortgage", "Rent", "Total a month"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["25%", "£7,500", "£352", "£516", "£1,018"],
            ["40%", "£12,000", "£563", "£413", "£1,126"],
            ["75%", "£22,500", "£1,056", "£172", "£1,378"],
          ]}
        />
        <p>
          Buy the largest share you can comfortably afford. It reduces rent, which rises every year, and means less to buy when
          you staircase.
        </p>
      </GuideSection>

      <GuideSection id="outright" n={6} kicker="Comparison" title="Against buying outright">
        <p>
          With the same £12,000 deposit, buying the whole £300,000 home would need a £288,000 mortgage, a 96% loan-to-value that
          most lenders will not offer. Even if you could, the mortgage would cost about £1,502 a month, plus the same service
          charge: £1,652 in total.
        </p>
        <CompareCards
          columns={[
            {
              name: "Shared ownership (40%)",
              rows: [
                { label: "Deposit", value: "£12,000" },
                { label: "Mortgage", value: "£108,000" },
                { label: "Monthly cost", value: "£1,126" },
                { label: "You own", value: "40%" },
              ],
            },
            {
              name: "Buy outright",
              rows: [
                { label: "Deposit", value: "£15,000 or more (5%)" },
                { label: "Mortgage", value: "Up to £285,000" },
                { label: "Monthly cost", value: "About £1,637" },
                { label: "You own", value: "100%" },
              ],
            },
          ]}
        />
        <p>
          Shared ownership is cheaper to get into and often cheaper each month. Buying outright builds equity in the whole home
          and avoids <a href="/uk/property/rent-increase">rent rises</a>{" "}and lease restrictions. If you can afford to buy outright, it is usually the better long-term
          choice.
        </p>
      </GuideSection>

      <GuideSection id="rent" n={7} kicker="Rent" title="Rent and rent increases">
        <p>
          Your rent is set as a percentage of the value of the share you do not own when you buy. It then rises each year by a
          formula in your lease. Many older leases use RPI inflation plus 0.5%; newer leases are often linked to CPI inflation
          plus 1%.
        </p>
        <DataTable
          caption="Rent of £412.50 a month rising 3% a year"
          head={["Year", "Rent a month", "Rent a year"]}
          numeric={[1, 2]}
          rows={[
            ["1", "£412.50", "£4,950"],
            ["3", "£437.62", "£5,251"],
            ["5", "£464.27", "£5,571"],
            ["10", "£538.22", "£6,459"],
          ]}
        />
        <Callout tone="warn" title="Rent rises even if prices fall">
          Rent increases follow inflation, not house prices. Staircasing is the main way to reduce your rent.
        </Callout>
      </GuideSection>

      <GuideSection id="charges" n={8} kicker="Charges" title="Service charges and repairs">
        <p>
          Most shared ownership homes are flats or houses on managed estates with a service charge for building insurance,
          cleaning, gardening, lifts and a reserve fund for major works. Service charges can rise significantly and are payable in
          full whatever share you own.
        </p>
        <p>
          On newer leases the provider helps with some essential repairs during the first 10 years. Otherwise, and after that
          period, you are usually responsible for all repairs and maintenance inside your home, even though you own only part of
          it.
        </p>
      </GuideSection>

      <GuideSection id="staircasing" n={9} kicker="Buying more" title="Staircasing">
        <p>
          Staircasing means buying more shares. You pay the market value of the share at the time, based on a RICS valuation, plus
          fees. If prices have risen, the extra share costs more than it would have at the start.
        </p>
        <WorkedExample
          title="Staircasing from 40% to 75% after 5 years"
          steps={[
            { label: "Value today", value: "£300,000" },
            { label: "Value after 5 years at 3% a year", value: "£347,782" },
            { label: "Cost of 35% more", value: "£121,724" },
            { label: "Rent before", value: "£478.20 a month" },
            { label: "Rent after", value: "£199.25 a month" },
          ]}
          total={{ label: "Rent saved", value: "£278.95 a month" }}
        />
        <p>
          Buying the remaining 60% at the same point would cost £208,669 and end the rent entirely. Many newer leases also let you
          buy 1% at a time for the first 15 years with reduced fees.
        </p>
        <Timeline
          items={[
            { when: "1", what: "Tell your provider", detail: "Ask for a staircasing pack and how much you can buy." },
            { when: "2", what: "Get a valuation", detail: "A RICS surveyor values the home. The valuation is usually valid for 3 months." },
            { when: "3", what: "Arrange the money", detail: "Usually by remortgaging or a further advance from your lender." },
            { when: "4", what: "Complete", detail: "Your solicitor completes the purchase and your rent is reduced." },
          ]}
        />
      </GuideSection>

      <GuideSection id="stamp-duty" n={10} kicker="Tax" title="Stamp Duty">
        <p>In England and Northern Ireland you choose how to pay Stamp Duty when you first buy:</p>
        <CompareCards
          columns={[
            {
              name: "Pay on your share",
              rows: [
                { label: "Now", value: "Tax on the share price" },
                { label: "Staircasing", value: "Tax may be due once you own more than 80%" },
                { label: "Best if", value: "You may not staircase much" },
              ],
            },
            {
              name: "Market value election",
              rows: [
                { label: "Now", value: "Tax on the full value" },
                { label: "Staircasing", value: "No more Stamp Duty" },
                { label: "Best if", value: "The full value is below the tax threshold" },
              ],
            },
          ]}
        />
        <p>
          First-time buyer relief can apply either way if the full market value is £500,000 or less. For a first-time buyer on a
          £300,000 home, both options cost £0. For a home mover buying 40% of £450,000, paying on the share costs £1,100, while
          paying on the full value costs £12,500 but nothing more later.
        </p>
      </GuideSection>

      <GuideSection id="selling" n={11} kicker="Selling" title="Selling your home">
        <p>
          When you sell, your provider usually has the first chance to find a buyer for your share, for a set period. If it
          cannot, you can sell on the open market. You sell at the current market value, so you benefit from any rise in value on
          your share, and lose if prices fall.
        </p>
        <p>If you have staircased to 100%, you can usually sell like any other home, though leasehold terms may still apply.</p>
      </GuideSection>

      <GuideSection id="mortgages" n={12} kicker="Borrowing" title="Mortgages and deposits">
        <p>
          Fewer lenders offer shared ownership mortgages, so rates can be slightly higher. Deposits are usually 5% to 10% of the
          share price, not of the whole home. Some buyers use savings to buy their share outright, with no mortgage.
        </p>
        <p>
          Lenders check affordability on the mortgage, rent and service charge together. Our affordability calculator gives a
          first estimate of what you could borrow.
        </p>
      </GuideSection>

      <GuideSection id="pros-cons" n={13} kicker="Weighing it up" title="Pros and cons">
        <CompareCards
          columns={[
            {
              name: "Advantages",
              rows: [
                { label: "Deposit", value: "Much smaller" },
                { label: "Mortgage", value: "Smaller and easier to get" },
                { label: "Monthly cost", value: "Often below buying outright" },
                { label: "Security", value: "Long lease, not a tenancy" },
              ],
            },
            {
              name: "Drawbacks",
              rows: [
                { label: "Rent", value: "Rises every year" },
                { label: "Repairs", value: "Usually yours in full" },
                { label: "Selling", value: "Can be slower" },
                { label: "Lease", value: "Restrictions on letting and changes" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="nations" n={14} kicker="Across the UK" title="Outside England">
        <p>
          Scotland, Wales and Northern Ireland run their own schemes. Scotland mainly uses shared equity schemes, where you own the
          whole home but the government holds a stake and you pay no rent. Wales has its own shared ownership and Homebuy schemes,
          and Northern Ireland has Co-Ownership. Rules and costs differ, so check the scheme in your nation.
        </p>
      </GuideSection>

      <GuideSection id="buying-costs" n={15} kicker="Budget" title="Costs when you buy">
        <p>On top of your deposit, budget for:</p>
        <ul>
          <li><strong>Legal fees</strong>, often a little higher than for a normal purchase because of the lease.</li>
          <li><strong>Stamp Duty</strong>, if any is due on your share or the full value.</li>
          <li><strong>Mortgage fees</strong>, such as an arrangement fee and valuation.</li>
          <li><strong>A reservation fee</strong> to the provider, often a few hundred pounds, usually taken off the price at completion.</li>
          <li><strong>A survey</strong>, if you want one. New-build homes usually come with a warranty instead.</li>
        </ul>
        <p>
          Your provider gives you a key information document before you reserve. It sets out the rent, service charge, rent
          increase formula, staircasing rules and resale terms. Read it carefully, and ask your solicitor to explain anything
          unclear.
        </p>
      </GuideSection>

      <GuideSection id="stair-reckoner" n={16} kicker="Ready reckoner" title="Staircasing ready reckoner">
        <p>
          Starting with 40% of a £300,000 home, if prices rise 3% a year, the home is worth about £347,782 after 5 years. Here is
          what buying more would cost then, and what it would do to the rent:
        </p>
        <DataTable
          caption="Staircasing after 5 years, rent £478.20 a month before"
          head={["Buy", "Cost", "You own", "Rent after"]}
          numeric={[1, 3]}
          rows={[
            ["10% more", "£34,778", "50%", "£398.50"],
            ["25% more", "£86,946", "65%", "£278.95"],
            ["35% more", "£121,724", "75%", "£199.25"],
            ["60% more", "£208,669", "100%", "£0"],
          ]}
        />
        <p>
          If prices fall, staircasing gets cheaper. If they rise faster than your savings grow, each share becomes harder to
          afford, which is one reason many owners never reach 100%.
        </p>
      </GuideSection>

      <GuideSection id="vs-renting" n={17} kicker="Comparison" title="Against renting">
        <p>
          Compared with renting privately, shared ownership usually offers more security, a long lease rather than a tenancy, and
          a share of any rise in the home&apos;s value. Your monthly cost may be similar to or lower than local rents, especially
          in expensive areas.
        </p>
        <p>
          But you also take on costs a tenant does not: repairs, a service charge that can rise, and the cost and time of selling.
          If you may move within a few years, the buying and selling costs can outweigh any gain. Our rent versus buy calculator
          can help you compare.
        </p>
      </GuideSection>

      <GuideSection id="other-schemes" n={18} kicker="Other schemes" title="Older buyers and disabled buyers">
        <p>
          <strong>Older People&apos;s Shared Ownership</strong> is for people aged 55 or over. It works like standard shared
          ownership, but you can only buy up to 75%, and once you own 75% you pay no rent on the rest.
        </p>
        <p>
          <strong>Home Ownership for people with Long-term Disabilities (HOLD)</strong> helps people with a long-term disability
          buy a home that meets their needs, if the homes available through standard shared ownership do not.
        </p>
        <p>
          Both schemes have the same income limits and most of the same rules as standard shared ownership. Ask providers in your
          area which homes are available.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "10% to 75%", label: "Typical starting share" },
            { value: "2.75%", label: "Common yearly rent on the share you don't own" },
            { value: "£80,000", label: "Household income limit (£90,000 in London)" },
            { value: "5% to 10%", label: "Deposit, as a share of your share" },
            { value: "80%", label: "Stamp Duty may be due when you staircase above this" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
