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

/** Rent a Room — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what", title: "What Rent a Room is" },
  { id: "qualifies", title: "What qualifies" },
  { id: "counts", title: "What counts towards the limit" },
  { id: "under", title: "Under the limit" },
  { id: "over", title: "Over the limit: two methods" },
  { id: "examples", title: "Examples" },
  { id: "shared", title: "Sharing the limit" },
  { id: "reporting", title: "Telling HMRC" },
  { id: "practical", title: "Practical checks before taking a lodger" },
  { id: "lodger-tenant", title: "Lodger or tenant?" },
  { id: "part-year", title: "Example: a lodger for part of the year" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Rent a Room Scheme", href: "https://www.gov.uk/rent-room-in-your-home" },
  { label: "HMRC — Rent a Room relief (HS223)", href: "https://www.gov.uk/government/publications/rent-a-room-for-traders-hs223-self-assessment-helpsheet" },
  { label: "GOV.UK — Renting out a property: paying tax", href: "https://www.gov.uk/renting-out-a-property/paying-tax" },
  { label: "GOV.UK — Right to rent checks", href: "https://www.gov.uk/check-tenant-right-to-rent-documents" },
];

export default function RentARoomGuide() {
  return (
    <Guide
      kicker="The Rent a Room guide"
      title="Rent a Room relief, explained"
      intro={
        <>
          You can earn up to £7,500 a year tax-free by letting furnished rooms in your own home. This guide explains what
          qualifies, what counts towards the limit, how to choose between the scheme and the normal method when you earn more,
          and what to check before taking in a lodger.
        </>
      }
      meta={["2026/27", "7 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="what" n={1} kicker="The basics" title="What Rent a Room is">
        <p>
          The Rent a Room scheme lets you receive up to <strong>£7,500</strong> a year from letting furnished accommodation in your
          main home without paying tax on it. It applies whether you own your home or rent it, as long as your landlord allows
          lodgers.
        </p>
        <p>
          The limit applies to the tax year, from 6 April to 5 April, and is not reduced if you only let a room for part of the
          year.
        </p>
      </GuideSection>

      <GuideSection id="qualifies" n={2} kicker="Eligibility" title="What qualifies">
        <ul>
          <li>Furnished rooms in your only or main home, let to a lodger.</li>
          <li>Bed and breakfast or guest house income from rooms in your home.</li>
          <li>Short stays, such as letting a spare room to holiday guests, if you live there at the same time.</li>
        </ul>
        <p>It does not cover:</p>
        <ul>
          <li>a separate, self-contained flat let unfurnished;</li>
          <li>a home you do not live in;</li>
          <li>rooms used as an office or for a business.</li>
        </ul>
        <p>You must live in the home for at least part of the time the room is let in each tax year.</p>
      </GuideSection>

      <GuideSection id="counts" n={3} kicker="Receipts" title="What counts towards the limit">
        <p>
          The £7,500 is a limit on <strong>gross receipts</strong>, not profit. It includes the rent and anything you charge for
          extras, such as meals, cleaning, laundry, or a share of energy and broadband bills.
        </p>
        <WorkedExample
          title="A lodger paying £650 a month plus £50 for bills"
          steps={[
            { label: "Rent", note: "£650 × 12", value: "£7,800" },
            { label: "Bills", note: "£50 × 12", value: "£600" },
          ]}
          total={{ label: "Receipts for the limit", value: "£8,400" }}
        />
        <p>That is over the limit, even though the rent alone is only £300 over.</p>
      </GuideSection>

      <GuideSection id="under" n={4} kicker="Under the limit" title="Under the limit">
        <p>
          If your receipts are £7,500 or less, the relief is automatic. You pay no tax on the income and you do not need to tell
          HMRC or fill in a tax return for it.
        </p>
        <Callout title="When you might opt out">
          If your costs are higher than your receipts, you make a loss. You can opt out of the scheme for that year to record the
          loss and carry it forward against future rental profits.
        </Callout>
      </GuideSection>

      <GuideSection id="over" n={5} kicker="Over the limit" title="Over the limit: two methods">
        <p>If your receipts are over £7,500, you must tell HMRC and choose one of two methods each year:</p>
        <CompareCards
          columns={[
            {
              name: "Rent a Room method",
              rows: [
                { label: "Taxable amount", value: "Receipts above £7,500" },
                { label: "Expenses", value: "Cannot be claimed" },
                { label: "Best when", value: "Your costs are under £7,500" },
              ],
            },
            {
              name: "Normal method",
              rows: [
                { label: "Taxable amount", value: "Receipts minus expenses" },
                { label: "Expenses", value: "Actual costs claimed" },
                { label: "Best when", value: "Your costs are over £7,500" },
              ],
            },
          ]}
        />
        <p>The profit is added to your other income and taxed at your normal Income Tax rates. There is no <a href="/uk/tax-and-salary/national-insurance">National Insurance</a>{" "}on it.</p>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Examples">
        <DataTable
          caption="Tax under each method, 2026/27"
          head={["Receipts", "Expenses", "Other income", "Rent a Room tax", "Normal method tax"]}
          numeric={[0, 1, 2, 3, 4]}
          rows={[
            ["£6,000", "£0", "£30,000", "£0", "£1,200"],
            ["£9,000", "£1,000", "£30,000", "£300", "£1,600"],
            ["£9,000", "£1,000", "£60,000", "£600", "£3,200"],
            ["£12,000", "£2,000", "£30,000", "£900", "£2,000"],
            ["£12,000", "£9,000", "£30,000", "£900", "£600"],
          ]}
        />
        <p>
          In most cases the Rent a Room method wins, because few lodger arrangements cost more than £7,500 a year to run. The
          last row shows the exception: with £9,000 of costs, the normal method saves £300.
        </p>
      </GuideSection>

      <GuideSection id="shared" n={7} kicker="Sharing" title="Sharing the limit">
        <p>
          If more than one person receives income from letting rooms in the same home, such as a couple who both own it, the limit
          is halved to <strong>£3,750</strong> each. This applies even if one of you receives all the rent.
        </p>
        <WorkedExample
          title="A couple sharing £6,000 of rent"
          steps={[
            { label: "Each person's share of receipts", value: "£3,000" },
            { label: "Each person's limit", value: "£3,750" },
          ]}
          total={{ label: "Tax for each", value: "£0" }}
        />
        <p>
          If one person alone receives £6,000 but the other also receives some rent from the home, the first person&apos;s limit
          is £3,750 and £2,250 is taxable: £450 at the basic rate.
        </p>
      </GuideSection>

      <GuideSection id="reporting" n={8} kicker="HMRC" title="Telling HMRC">
        <Timeline
          items={[
            { when: "Over £7,500", what: "Register for Self Assessment", detail: "By 5 October after the end of the tax year in which you first go over the limit." },
            { when: "Tax return", what: "Choose your method", detail: "Tick the Rent a Room box to use the scheme, or report income and expenses for the normal method." },
            { when: "31 January", what: "Pay the tax", detail: "Online returns and payment are due by 31 January after the tax year." },
          ]}
        />
      </GuideSection>

      <GuideSection id="practical" n={9} kicker="Before you start" title="Practical checks before taking a lodger">
        <ul>
          <li><strong>Mortgage:</strong> tell your lender. Most allow a lodger, but some need consent.</li>
          <li><strong>Home insurance:</strong> tell your insurer, as a lodger can affect your cover.</li>
          <li><strong>Tenancy:</strong>{" "}if you rent, check your tenancy allows a lodger and get your landlord&apos;s permission.</li>
          <li><strong>Right to rent:</strong> in England you must check that an adult lodger has the <a href="/uk/life/right-to-rent">right to rent</a>.</li>
          <li><strong>Council tax:</strong> a lodger who lives with you as their main home ends any <a href="/uk/property/single-person-discount">single person discount</a>.</li>
          <li><strong>Benefits:</strong> lodger income can affect means-tested benefits; check before you start.</li>
          <li><strong>Agreement:</strong> a simple written lodger agreement setting out rent, notice and house rules avoids disputes.</li>
        </ul>
      </GuideSection>

      <GuideSection id="lodger-tenant" n={10} kicker="The difference" title="Lodger or tenant?">
        <p>
          A lodger lives in your home and shares facilities such as the kitchen or bathroom with you. They have fewer rights than a
          tenant: they are usually an &quot;excluded occupier&quot;, so you can end the arrangement with reasonable notice, often
          the length of the rent period, without a court order.
        </p>
        <p>
          If you move out and let the whole home, or let a self-contained part with its own front door and facilities, the person
          is more likely to be a tenant with full tenancy rights. That is not covered by Rent a Room and is taxed as normal rental
          income.
        </p>
      </GuideSection>

      <GuideSection id="part-year" n={11} kicker="Worked example" title="Example: a lodger for part of the year">
        <p>
          Priya lets her spare room for £700 a month from October to March, six months of the tax year. She earns £32,000 from her
          job.
        </p>
        <WorkedExample
          title="Six months at £700"
          steps={[
            { label: "Rent received", note: "£700 × 6", value: "£4,200" },
            { label: "Rent a Room limit", value: "£7,500" },
          ]}
          total={{ label: "Tax to pay", value: "£0" }}
        />
        <p>
          Her receipts are under the limit, so there is nothing to pay or report. If the lodger stayed all year, she would receive
          £8,400 and pay tax on £900 under the scheme: £180 at the basic rate.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={12} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£7,500", label: "Tax-free receipts a year" },
            { value: "£3,750", label: "Limit each if shared" },
            { value: "5 October", label: "To register for Self Assessment" },
            { value: "31 January", label: "Online return and payment deadline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
