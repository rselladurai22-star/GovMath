import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Flat Rate VAT — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the scheme works" },
  { id: "rates", title: "Flat rates by trade" },
  { id: "lct", title: "The limited cost trader test" },
  { id: "examples", title: "Who gains and who loses" },
  { id: "turnover", title: "What counts as turnover" },
  { id: "capital", title: "Capital purchases" },
  { id: "first-year", title: "The first-year discount" },
  { id: "join-leave", title: "Joining and leaving" },
  { id: "tax", title: "Income Tax on the VAT you keep" },
  { id: "decide", title: "How to decide" },
  { id: "return", title: "Your VAT return on the scheme" },
  { id: "years", title: "Year one and beyond" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — VAT Flat Rate Scheme", href: "https://www.gov.uk/vat-flat-rate-scheme" },
  { label: "GOV.UK — Flat rates by business type", href: "https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay" },
  { label: "HMRC — VAT Notice 733: Flat Rate Scheme for small businesses", href: "https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2" },
  { label: "GOV.UK — VAT registration", href: "https://www.gov.uk/vat-registration" },
];

export default function FlatRateGuide() {
  return (
    <Guide
      kicker="The Flat Rate Scheme guide"
      title="Is the VAT Flat Rate Scheme worth it?"
      intro={
        <>
          The Flat Rate Scheme lets a small business pay HMRC a fixed percentage of its turnover instead of working out VAT on
          every sale and purchase. For some trades it saves money as well as time. For many freelancers it now costs more than
          standard VAT. This guide explains how it works, the limited cost trader test that catches most people, and how to
          decide.
        </>
      }
      meta={["VAT", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          On the Flat Rate Scheme you still charge customers <a href="/business/vat-calculator">20% VAT</a>, but instead of paying HMRC the VAT you charged minus the
          VAT you paid on costs, you pay a <strong>flat percentage of your VAT-inclusive turnover</strong>. The percentage
          depends on your trade, from 4% to 14.5%.
        </p>
        <p>
          The catch is the <strong>limited cost trader</strong> rule. If you spend little on goods, you must use 16.5%
          whatever your trade. At 16.5%, the scheme takes almost all the VAT you charge, so it rarely saves money.
        </p>
        <KeyStats
          items={[
            { value: "4% to 14.5%", label: "Flat rates for different trades" },
            { value: "16.5%", label: "Rate for limited cost traders" },
            { value: "£150,000", label: "Join if expected sales are up to this" },
            { value: "1%", label: "Discount in your first year of VAT registration" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Mechanics" title="How the scheme works">
        <CompareCards
          columns={[
            {
              name: "Standard VAT accounting",
              rows: [
                { label: "Charge customers", value: "20% VAT" },
                { label: "Pay HMRC", value: "VAT charged − VAT on costs" },
                { label: "Reclaim VAT on costs", value: "Yes" },
                { label: "Records", value: "VAT on every sale and purchase" },
              ],
            },
            {
              name: "Flat Rate Scheme",
              rows: [
                { label: "Charge customers", value: "20% VAT" },
                { label: "Pay HMRC", value: "Flat % × turnover including VAT" },
                { label: "Reclaim VAT on costs", value: "No, except capital items of £2,000+" },
                { label: "Records", value: "Mainly your sales" },
              ],
            },
          ]}
        />
        <WorkedExample
          title="A business with £60,000 of sales before VAT, 14.5% flat rate"
          steps={[
            { label: "Sales before VAT", value: "£60,000" },
            { label: "VAT charged at 20%", value: "£12,000" },
            { label: "Turnover including VAT", value: "£72,000" },
            { label: "Flat rate VAT", note: "£72,000 × 14.5%", value: "£10,440" },
          ]}
          total={{ label: "VAT kept by the business", value: "£1,560" }}
        />
        <p>
          The flat rate applies to the VAT-inclusive figure, not the price before VAT. That is easy to get wrong when you first
          estimate what the scheme is worth.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Your percentage" title="Flat rates by trade">
        <p>
          HMRC sets a percentage for each type of business. You use the one that best describes your main activity. A
          selection is below; the calculator lists them all.
        </p>
        <DataTable
          caption="Selected flat rates (unchanged since April 2022)"
          head={["Trade", "Flat rate"]}
          numeric={[1]}
          rows={[
            ["Retailing food, confectionery, tobacco, newspapers or children's clothing", "4%"],
            ["Pubs", "6.5%"],
            ["Retailing not listed elsewhere", "7.5%"],
            ["General building or construction services", "9.5%"],
            ["Transport or storage, including couriers and taxis", "10%"],
            ["Photography", "11%"],
            ["Any other activity not listed elsewhere", "12%"],
            ["Catering, including restaurants and takeaways", "12.5%"],
            ["Hairdressing or other beauty treatment", "13%"],
            ["Management consultancy", "14%"],
            ["Accountancy, IT consultancy, legal, labour-only building", "14.5%"],
            ["Limited cost trader (any trade)", "16.5%"],
          ]}
        />
        <p>
          Lower rates go to trades that usually spend a lot on stock or materials, because they would reclaim more VAT under
          standard accounting. Higher rates go to service trades with few costs.
        </p>
      </GuideSection>

      <GuideSection id="lct" n={4} kicker="The key test" title="The limited cost trader test">
        <p>
          Since April 2017 you must use the 16.5% rate if you are a <strong>limited cost business</strong>. You are one if the
          goods you buy for the business, including VAT, are either:
        </p>
        <ul>
          <li>less than <strong>2%</strong> of your VAT-inclusive turnover, or</li>
          <li>more than 2% but less than <strong>£1,000 a year</strong> (£250 a quarter).</li>
        </ul>
        <p>Only goods count, and only goods used wholly for the business. These do not count:</p>
        <ul>
          <li>services of any kind, such as software subscriptions, phone contracts, accountancy, rent or advertising;</li>
          <li>capital items, such as a laptop, camera or machine;</li>
          <li>food or drink for you or your staff;</li>
          <li>vehicles, vehicle parts and fuel, unless you are in the transport business;</li>
          <li>goods for resale, leasing or hire that are not your main business, and gifts or promotional items.</li>
        </ul>
        <Callout tone="warn" title="Why most freelancers fail it">
          A consultant or developer typically buys software and services, not goods. Even with thousands of pounds of costs,
          their goods may be close to zero, so they must use 16.5%. You have to check the test every VAT period, and you
          cannot buy goods you do not need just to pass it.
        </Callout>
        <WorkedExample
          title="The test for £60,000 of sales"
          steps={[
            { label: "Turnover including VAT", value: "£72,000" },
            { label: "2% of that", value: "£1,440" },
            { label: "Minimum goods to pass", note: "The higher of £1,440 and £1,000", value: "£1,440" },
          ]}
          total={{ label: "Goods of £600: limited cost trader", value: "16.5%" }}
        />
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Who gains and who loses">
        <p>The same scheme gives very different results depending on trade and costs. All figures are for a full year.</p>
        <DataTable
          caption="Standard VAT against the Flat Rate Scheme"
          head={["Business", "Standard VAT", "Flat rate VAT", "Difference"]}
          numeric={[1, 2, 3]}
          rows={[
            ["IT contractor, £60k sales, £3k costs, £600 goods (16.5%)", "£11,500", "£11,880", "Costs £380 more"],
            ["Same, first year of registration (15.5%)", "£11,500", "£11,160", "Saves £340"],
            ["Same, with £1,500 of goods (14.5%)", "£11,500", "£10,440", "Saves £1,060"],
            ["Hairdresser, £80k sales, £12k costs, £4k goods (13%)", "£14,000", "£12,480", "Saves £1,520"],
            ["Builder, £80k sales, £30k costs, £25k goods (9.5%)", "£11,000", "£9,120", "Saves £1,880"],
            ["Shop, £100k sales, £60k stock (7.5%)", "£10,000", "£9,000", "Saves £1,000"],
          ]}
        />
        <Figure label="VAT kept each year on the Flat Rate Scheme" caption="VAT charged to customers minus flat rate VAT, before Income Tax on the gain.">
          <Bars
            items={[
              { label: "IT contractor (16.5%)", value: 120 },
              { label: "Hairdresser (13%)", value: 3520 },
              { label: "Builder (9.5%)", value: 6880 },
              { label: "Shop (7.5%)", value: 11000 },
            ]}
          />
        </Figure>
        <p>
          &ldquo;VAT kept&rdquo; is not the same as the saving: a business on standard accounting would also reclaim VAT on
          its costs. The builder keeps £6,880 of the VAT it charges but gives up £5,000 of VAT it could have reclaimed, so it
          is £1,880 better off.
        </p>
      </GuideSection>

      <GuideSection id="turnover" n={6} kicker="A common trap" title="What counts as turnover">
        <p>
          The flat rate applies to your <strong>whole</strong> VAT-inclusive turnover, including zero-rated and exempt sales.
          Under standard accounting those sales carry no VAT at all, so a business with a mix of sales can lose out.
        </p>
        <CompareCards
          columns={[
            {
              name: "£50k standard-rated sales only",
              rows: [
                { label: "Flat rate turnover", value: "£60,000" },
                { label: "Flat rate VAT at 12%", value: "£7,200" },
                { label: "Standard VAT", value: "£9,500" },
                { label: "Result", value: "Flat rate saves £2,300" },
              ],
            },
            {
              name: "Plus £20k zero-rated sales",
              rows: [
                { label: "Flat rate turnover", value: "£80,000" },
                { label: "Flat rate VAT at 12%", value: "£9,600" },
                { label: "Standard VAT", value: "£9,500" },
                { label: "Result", value: "Standard saves £100" },
              ],
            },
          ]}
        />
        <p>
          Sales to customers outside the UK, some books and children&rsquo;s clothes are typical zero-rated sales that catch
          people out. If a large share of your sales are zero-rated or exempt, the scheme is unlikely to help.
        </p>
      </GuideSection>

      <GuideSection id="capital" n={7} kicker="Big purchases" title="Capital purchases">
        <p>
          On the Flat Rate Scheme you cannot reclaim VAT on normal costs, but you can reclaim it on a single purchase of
          capital goods costing <strong>£2,000 or more including VAT</strong>, such as a computer, a van or a piece of
          machinery. You claim it on your VAT return in the usual way.
        </p>
        <p>
          A £2,400 computer carries £400 of VAT, which you reclaim on either scheme. The rule applies to a single purchase:
          several smaller items bought together do not count unless they are invoiced as one item, and services do not count
          however large.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={8} kicker="New registrations" title="The first-year discount">
        <p>
          If you join the scheme in your first year of VAT registration, you can take <strong>1%</strong> off your flat rate
          until the day before the first anniversary of your registration. A limited cost trader pays 15.5% instead of 16.5%.
        </p>
        <p>
          The discount is small, but for some freelancers it is the only year the scheme saves money. In the IT example above,
          16.5% costs £380 more than standard accounting, while 15.5% saves £340. Diary the anniversary: once the discount
          ends, compare again and leave the scheme if it no longer pays.
        </p>
      </GuideSection>

      <GuideSection id="join-leave" n={9} kicker="Eligibility" title="Joining and leaving">
        <Timeline
          items={[
            { when: "To join", what: "Expected taxable sales of £150,000 or less", detail: "Before VAT, over the next 12 months. Apply online or when you register for VAT." },
            { when: "While on it", what: "Check the limited cost test every return", detail: "Use 16.5% for any period in which you fail it, and your trade rate in periods you pass." },
            { when: "Must leave", what: "Income including VAT over £230,000", detail: "In the last 12 months, or expected in the next 30 days alone." },
            { when: "After leaving", what: "Wait 12 months to rejoin", detail: "You can leave voluntarily at any time, but you cannot come back for a year." },
          ]}
        />
        <p>
          You cannot use the scheme if you are in the VAT <a href="/business/gross-profit-margin">margin</a>{" "}scheme for second-hand goods or the capital goods scheme, or
          if you are closely associated with another business. HMRC&rsquo;s Notice 733 lists every condition.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={10} kicker="Income Tax" title="Income Tax on the VAT you keep">
        <p>
          The difference between the VAT you charge and the flat rate VAT you pay is extra income for your business. It is
          added to your taxable profits.
        </p>
        <p>
          For the builder in the examples, the £1,880 saving is taxed like any other profit: a <a href="/business/sole-trader-tax">sole trader</a>{" "}paying basic-rate
          tax and Class 4 <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}keeps about £1,391 of it after 20% Income Tax and 6% National Insurance.
          Remember this when you compare schemes: the real saving is after tax.
        </p>
      </GuideSection>

      <GuideSection id="decide" n={11} kicker="Choosing" title="How to decide">
        <ol>
          <li>Work out whether you pass the limited cost test. If you do not, compare at 16.5% (15.5% in year one).</li>
          <li>Add up a typical year&rsquo;s costs that carry VAT, including the VAT.</li>
          <li>Compare the VAT payable under each scheme using the calculator above.</li>
          <li>Allow for the Income Tax on any gain and the time you save on bookkeeping.</li>
          <li>Recheck every year, or sooner if your costs or sales mix change.</li>
        </ol>
        <p>
          As a rule of thumb, the scheme suits trades with a low flat rate and steady spending on goods, such as builders,
          shops and hairdressers. It rarely suits consultants, developers and other professionals after the first year.
        </p>
      </GuideSection>

      <GuideSection id="return" n={12} kicker="Filing" title="Your VAT return on the scheme">
        <p>
          On the Flat Rate Scheme your VAT return is simpler than under standard accounting, but a few boxes work differently:
        </p>
        <ul>
          <li>
            <strong>Box 1</strong> shows the flat rate VAT: your flat rate percentage times your VAT-inclusive turnover for the
            period.
          </li>
          <li>
            <strong>Box 4</strong> is usually zero, unless you are reclaiming VAT on a capital purchase of £2,000 or more.
          </li>
          <li>
            <strong>Box 6</strong> shows your flat rate turnover <em>including</em> VAT, not the net figure most businesses
            use.
          </li>
        </ul>
        <p>
          You still need to keep a record of your sales, the flat rate you used for each period and how you worked out the
          limited cost test. Keep your purchase invoices too: you need them for capital purchases and to show the goods figure
          behind the test.
        </p>
      </GuideSection>

      <GuideSection id="years" n={13} kicker="Planning ahead" title="Year one and beyond">
        <p>
          The scheme can look attractive when you first register and less so a year later. For the IT contractor in the
          examples, with £60,000 of sales, £3,000 of costs and £600 of goods:
        </p>
        <CompareCards
          columns={[
            {
              name: "First year (15.5%)",
              rows: [
                { label: "Flat rate VAT", value: "£11,160" },
                { label: "Standard VAT", value: "£11,500" },
                { label: "Result", value: "Flat rate saves £340" },
              ],
            },
            {
              name: "Later years (16.5%)",
              rows: [
                { label: "Flat rate VAT", value: "£11,880" },
                { label: "Standard VAT", value: "£11,500" },
                { label: "Result", value: "Standard saves £380" },
              ],
            },
          ]}
        />
        <p>
          You can ask HMRC to take you off the scheme at any time, and the change normally applies from the start of a VAT
          period. Set a reminder for the first anniversary of your registration, rerun the comparison, and move to standard
          accounting if it now costs less. Make sure your invoicing software is ready to record VAT on purchases from the day
          you switch.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "16.5%", label: "Limited cost trader rate" },
            { value: "2% or £1,000", label: "Goods needed to avoid it" },
            { value: "£150,000", label: "Join limit, sales before VAT" },
            { value: "£230,000", label: "Leave limit, income including VAT" },
            { value: "£2,000", label: "Capital purchase you can still reclaim" },
            { value: "1%", label: "First-year discount" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
