import {
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  StepChart,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Business rates — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How business rates are worked out" },
  { id: "multipliers", title: "The 2026/27 multipliers" },
  { id: "sbrr", title: "Small business rate relief" },
  { id: "second", title: "Having more than one property" },
  { id: "revaluation", title: "The 2026 revaluation" },
  { id: "other-reliefs", title: "Other reliefs" },
  { id: "empty", title: "Moving in, moving out and empty property" },
  { id: "home", title: "Working from home" },
  { id: "challenge", title: "Checking and challenging your valuation" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "examples", title: "Worked examples for common businesses" },
  { id: "valuation", title: "How rateable value is set" },
  { id: "leases", title: "Before you sign a lease" },
  { id: "paying", title: "Paying your bill" },
  { id: "changes", title: "When your circumstances change" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Calculate your business rates", href: "https://www.gov.uk/calculate-your-business-rates" },
  { label: "GOV.UK — Small business rate relief", href: "https://www.gov.uk/business-rates-relief/small-business-rate-relief" },
  { label: "GOV.UK — Business rates relief", href: "https://www.gov.uk/apply-for-business-rate-relief" },
  { label: "GOV.UK — Find a business rates valuation", href: "https://www.gov.uk/find-business-rates" },
  { label: "GOV.UK — Business rates: empty property", href: "https://www.gov.uk/apply-for-business-rate-relief/relief-for-empty-buildings" },
];

export default function RatesGuide() {
  return (
    <Guide
      kicker="The business rates guide"
      title="Business rates and small business rate relief"
      intro={
        <>
          Most non-domestic property in England pays business rates: shops, offices, workshops, pubs, warehouses and more. April
          2026 brought new valuations and new multipliers, with lower rates for retail, hospitality and leisure. This guide
          explains how your bill is worked out, how small business rate relief can cut it to nothing, and what to check.
        </>
      }
      meta={["England 2026/27", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Your bill is the <strong>rateable value</strong> of the property times a <strong>multiplier</strong>, less any
            reliefs.
          </li>
          <li>
            If it is your only business property and its rateable value is <strong>£12,000 or less</strong>, small business
            rate relief usually takes the bill to zero.
          </li>
          <li>Between £12,000 and £15,000, the relief tapers away.</li>
        </ul>
        <DataTable
          caption="Bills for a single property, England, 2026/27"
          head={["Rateable value", "Standard use", "Retail, hospitality or leisure"]}
          numeric={[0, 1, 2]}
          rows={[
            ["£12,000", "£0", "£0"],
            ["£13,500", "£2,916", "£2,579"],
            ["£15,000", "£6,480", "£5,730"],
            ["£30,000", "£12,960", "£11,460"],
            ["£50,000", "£21,600", "£19,100"],
            ["£100,000", "£48,000", "£43,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The formula" title="How business rates are worked out">
        <p>
          The Valuation Office Agency (VOA) gives each property a <strong>rateable value</strong>: roughly the yearly rent it
          could have been let for on a set valuation date. Your council then multiplies it by the multiplier for the year and
          takes off any reliefs.
        </p>
        <WorkedExample
          title="An office with a rateable value of £30,000, not your only property"
          steps={[
            { label: "Rateable value", value: "£30,000" },
            { label: "× small business multiplier", value: "43.2p" },
            { label: "Rates before relief", value: "£12,960" },
          ]}
          total={{ label: "Bill for the year", value: "£12,960" }}
        />
        <p>
          The rates year runs from <strong>1 April to 31 March</strong>. Councils usually collect the bill in 10 monthly
          instalments, from April to January, and you can ask to spread it over 12.
        </p>
      </GuideSection>

      <GuideSection id="multipliers" n={3} kicker="2026/27" title="The 2026/27 multipliers">
        <p>
          From 1 April 2026 there are five multipliers in England, replacing the old 40% retail, hospitality and leisure relief
          with permanently lower rates for those properties:
        </p>
        <DataTable
          caption="Business rates multipliers, England, 2026/27"
          head={["Rateable value", "Retail, hospitality and leisure", "Everything else"]}
          rows={[
            ["Under £51,000", "38.2p", "43.2p"],
            ["£51,000 to £499,999", "43.0p", "48.0p"],
            ["£500,000 or more", "50.8p", "50.8p"],
          ]}
        />
        <p>
          The lower multipliers apply to properties wholly or mainly used for qualifying retail, hospitality or leisure, such as
          shops, cafés, restaurants, pubs, hotels, gyms and cinemas. It depends on how the property is actually used, not just
          on how the VOA describes it.
        </p>
        <p>
          The small business multiplier applies to every property with a rateable value under £51,000, whether or not you get
          small business rate relief.
        </p>
      </GuideSection>

      <GuideSection id="sbrr" n={4} kicker="Relief" title="Small business rate relief">
        <p>You get small business rate relief if you only use one property in England and its rateable value is under £15,000.</p>
        <Figure label="Small business rate relief by rateable value" caption="100% up to £12,000, then tapering to nothing at £15,000.">
          <StepChart
            ariaLabel="Small business rate relief: 100% up to £12,000, 67% at £13,000, 33% at £14,000, none from £15,000."
            max={16000}
            yMax={100}
            yTicks={[0, 50, 100]}
            unit="%"
            steps={[
              { from: 0, to: 12000, value: 100 },
              { from: 12000, to: 13000, value: 67 },
              { from: 13000, to: 14000, value: 33 },
              { from: 14000, to: 15000, value: 0 },
              { from: 15000, to: 16000, value: 0 },
            ]}
          />
        </Figure>
        <p>
          The chart shows the relief at each step of £1,000; in reality it falls smoothly. Between £12,000 and £15,000 the
          relief is <strong>(£15,000 − rateable value) ÷ £3,000</strong>, so it drops about 3.3 percentage points for every £100.
        </p>
        <WorkedExample
          title="A shop with a rateable value of £13,500, only property"
          steps={[
            { label: "£13,500 × 38.2p", value: "£5,157" },
            { label: "Relief: (£15,000 − £13,500) ÷ £3,000", value: "50%" },
            { label: "Small business rate relief", value: "−£2,579" },
          ]}
          total={{ label: "Bill for the year", value: "£2,579" }}
        />
        <Callout title="Check that it has been applied">
          Many councils apply the relief automatically, but not all. If your bill does not show it and you think you qualify,
          contact your council. Relief can usually be backdated.
        </Callout>
      </GuideSection>

      <GuideSection id="second" n={5} kicker="More premises" title="Having more than one property">
        <p>
          Normally you lose small business rate relief if you use more than one property. You can keep it on your main property
          if:
        </p>
        <ul>
          <li>each of your other properties has a rateable value under £2,900; and</li>
          <li>the total rateable value of all your properties is under £20,000, or £28,000 in London.</li>
        </ul>
        <p>
          If you take on a second property that does not meet these conditions, you keep the relief on your first property for
          12 months, giving you time to adjust.
        </p>
      </GuideSection>

      <GuideSection id="revaluation" n={6} kicker="New values" title="The 2026 revaluation">
        <p>
          Rateable values are updated in revaluations. New values took effect on <strong>1 April 2026</strong>, based on rents
          at 1 April 2024. Some properties went up, some down. Three schemes soften big increases:
        </p>
        <Timeline
          items={[
            { when: "Transitional relief", what: "Caps how fast bills rise", detail: "For smaller properties (rateable value up to £20,000), the increase is limited to 5% in 2026/27, with higher caps in later years." },
            { when: "Supporting Small Business", what: "Protects those losing relief", detail: "If the revaluation takes away some or all of your small business or rural rate relief, the rise is capped at £800 or the transitional cap, whichever is higher." },
            { when: "Automatic", what: "Councils apply them", detail: "You do not usually need to apply. Check your bill and contact your council if something looks wrong." },
          ]}
        />
        <p>
          The calculator shows your bill before these schemes. If you enter last year&rsquo;s bill and the increase is over
          £800, it flags that a cap may apply.
        </p>
      </GuideSection>

      <GuideSection id="other-reliefs" n={7} kicker="More relief" title="Other reliefs">
        <CompareCards
          columns={[
            {
              name: "Charitable relief",
              rows: [
                { label: "Who", value: "Charities and community amateur sports clubs" },
                { label: "Relief", value: "80%, plus up to 20% more at the council's choice" },
              ],
            },
            {
              name: "Rural rate relief",
              rows: [
                { label: "Who", value: "The only shop, post office or pub in a small rural settlement" },
                { label: "Relief", value: "Up to 100% within value limits" },
              ],
            },
          ]}
        />
        <p>
          Councils can also give <strong>discretionary relief</strong> for local reasons, <strong>hardship relief</strong> and
          relief for some new and improved properties. Properties used for some purposes, such as places of worship and
          agricultural land, are exempt altogether.
        </p>
        <WorkedExample
          title="A charity shop with a rateable value of £30,000"
          steps={[
            { label: "Rates before relief: £30,000 × 43.2p", value: "£12,960" },
            { label: "Charitable relief at 80%", value: "−£10,368" },
          ]}
          total={{ label: "Bill before any council top-up", value: "£2,592" }}
        />
      </GuideSection>

      <GuideSection id="empty" n={8} kicker="Occupation" title="Moving in, moving out and empty property">
        <p>
          Rates are charged daily. If you take on or give up a property part-way through the year, you pay for the days you are
          responsible for it. Six months in a £30,000 office costs about £6,462.
        </p>
        <p>
          Empty property is usually exempt for the first <strong>three months</strong> after it becomes empty, or six months
          for industrial property such as warehouses. After that the owner normally pays full rates. Some empty properties,
          such as listed buildings and those with a rateable value under £2,900, stay exempt.
        </p>
      </GuideSection>

      <GuideSection id="home" n={9} kicker="Home businesses" title="Working from home">
        <p>
          Most people who work from home do not pay business rates. You may need to if, for example, part of your home has been
          converted for business use, you employ people there, you sell to customers who visit, or you use a room only for
          business in a way that makes it non-domestic.
        </p>
        <p>
          If you are unsure, the VOA can tell you whether part of your home needs a rateable value. Using a room for both
          business and family life usually keeps it domestic.
        </p>
      </GuideSection>

      <GuideSection id="challenge" n={10} kicker="Checks" title="Checking and challenging your valuation">
        <p>
          You can find your property&rsquo;s rateable value, and how it was worked out, on GOV.UK. If you think it is wrong,
          the VOA&rsquo;s <strong>check, challenge, appeal</strong> process lets you:
        </p>
        <ol>
          <li>check the facts the VOA holds, such as floor area and use;</li>
          <li>challenge the valuation with evidence, such as rents for similar properties;</li>
          <li>appeal to the Valuation Tribunal if you disagree with the decision.</li>
        </ol>
        <p>
          It is free to do yourself. Be wary of agents who cold-call promising savings for an upfront fee. A challenge matters
          most near the relief thresholds: bringing a rateable value from £13,500 to £12,000 takes a £2,916 bill to nothing.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={11} kicker="Elsewhere in the UK" title="Scotland, Wales and Northern Ireland">
        <p>
          Business rates are devolved. Scotland has its own poundage and the Small Business Bonus Scheme; Wales and Northern
          Ireland have their own multipliers and small business relief. The calculator and this guide cover England only.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={12} kicker="Worked examples" title="Worked examples for common businesses">
        <DataTable
          caption="Bills for 2026/27, England"
          head={["Business", "Rateable value", "Multiplier", "Relief", "Bill"]}
          numeric={[1, 4]}
          rows={[
            ["Small café, only property", "£9,000", "38.2p", "100%", "£0"],
            ["Hair salon, only property", "£14,000", "38.2p", "33%", "£3,565"],
            ["Workshop, only property", "£18,000", "43.2p", "None", "£7,776"],
            ["Office, one of several", "£30,000", "43.2p", "None", "£12,960"],
            ["Pub", "£60,000", "43.0p", "None", "£25,800"],
          ]}
        />
        <p>
          The pub shows the value of the new retail, hospitality and leisure multipliers: on the standard 48p multiplier the
          same pub would pay £28,800, £3,000 more.
        </p>
      </GuideSection>

      <GuideSection id="valuation" n={13} kicker="The VOA" title="How rateable value is set">
        <p>
          For most shops, offices and industrial units, the VOA looks at the rent similar properties were let for around the
          valuation date, adjusted for size, location and condition. Floor area is usually the biggest factor, so check the
          measurements on your valuation.
        </p>
        <p>
          Some properties are valued differently. Pubs, hotels and some leisure businesses are valued on their likely trade, and
          specialist properties on the cost of building them. Your valuation on GOV.UK says which method was used.
        </p>
      </GuideSection>

      <GuideSection id="leases" n={14} kicker="Planning" title="Before you sign a lease">
        <ul>
          <li>Look up the property&rsquo;s rateable value on GOV.UK before agreeing the rent.</li>
          <li>Check whether it will be your only business property, so you know if small business rate relief applies.</li>
          <li>Ask whether the rent includes rates, which is common in serviced offices but rare in shops.</li>
          <li>Budget for the bill from the day the lease starts, even if you are still fitting out.</li>
          <li>If you are close to £12,000 or £15,000, a property a little smaller can be much cheaper to occupy.</li>
        </ul>
      </GuideSection>

      <GuideSection id="paying" n={15} kicker="Paying" title="Paying your bill">
        <p>
          Your council sends a bill each spring. Most people pay by direct debit in 10 or 12 instalments. If you cannot pay,
          speak to the council early: they can sometimes spread the bill or consider hardship relief. Unpaid rates can be
          recovered through the courts, which adds costs, so it is worth acting before a reminder.
        </p>
        <p>
          Business rates are an allowable expense for Income Tax and <a href="/uk/business/corporation-tax">Corporation Tax</a>, so part of the cost comes back through a
          lower tax bill.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={16} kicker="Keeping it right" title="When your circumstances change">
        <p>Tell your council straight away if any of these happen, because each can change your bill:</p>
        <ul>
          <li>you move in to, or out of, a property;</li>
          <li>you take on a second property, which can end small business rate relief after 12 months;</li>
          <li>the way the property is used changes, for example from an office to a shop, which can affect the multiplier;</li>
          <li>you become a charity or start trading as a different business;</li>
          <li>the property is altered, extended, split or merged with another unit.</li>
        </ul>
        <p>
          New duties are also being phased in. From April 2026 the VOA is piloting rules that require ratepayers to report
          changes to their property, occupation, lease or rent within 60 days, and to confirm their details once a year. They
          become compulsory for everyone in England from April 2029.
        </p>
        <p>
          If your bill is wrong because the council was not told about a change, it can usually be corrected backwards, which
          may mean a large catch-up bill. Equally, if you have been overcharged, you can ask for a refund.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "43.2p / 38.2p", label: "Small business multipliers (standard / RHL)" },
            { value: "48p / 43p", label: "Standard multipliers (standard / RHL)" },
            { value: "50.8p", label: "Properties of £500,000 or more" },
            { value: "£12,000", label: "100% small business rate relief up to this" },
            { value: "£15,000", label: "Relief ends here" },
            { value: "£51,000", label: "Small business multiplier ends here" },
            { value: "80%", label: "Charitable relief" },
            { value: "£800", label: "Minimum cap for Supporting Small Business relief" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
