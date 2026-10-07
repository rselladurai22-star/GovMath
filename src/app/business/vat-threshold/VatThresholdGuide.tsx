import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** VAT registration threshold — the guide. Figures from src/lib/business/freelance.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "turnover", title: "What counts as taxable turnover" },
  { id: "rolling", title: "The rolling 12-month test" },
  { id: "forward", title: "The 30-day forward-look test" },
  { id: "examples", title: "Worked examples" },
  { id: "dates", title: "Registration deadlines" },
  { id: "cost", title: "What registering costs your business" },
  { id: "voluntary", title: "Registering voluntarily" },
  { id: "schemes", title: "VAT schemes for small businesses" },
  { id: "staying-under", title: "Staying under the threshold" },
  { id: "late", title: "If you register late" },
  { id: "mtd", title: "Making Tax Digital for VAT" },
  { id: "deregister", title: "Deregistering" },
  { id: "exception", title: "Temporary rises: the exception" },
  { id: "pricing", title: "Raising your prices when you register" },
  { id: "reclaim", title: "Reclaiming VAT on costs and past purchases" },
  { id: "tracking", title: "Tracking your rolling total" },
  { id: "sole-trader-company", title: "Sole traders, partnerships and companies" },
  { id: "international", title: "Selling online and abroad" },
  { id: "after", title: "After you register" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — VAT registration: when to register", href: "https://www.gov.uk/register-for-vat" },
  { label: "GOV.UK — VAT registration thresholds", href: "https://www.gov.uk/vat-registration-thresholds" },
  { label: "HMRC — VAT Notice 700/1: who should register", href: "https://www.gov.uk/guidance/vat-registration-notice-7001" },
  { label: "GOV.UK — VAT Flat Rate Scheme", href: "https://www.gov.uk/vat-flat-rate-scheme" },
  { label: "GOV.UK — Making Tax Digital for VAT", href: "https://www.gov.uk/government/publications/making-tax-digital/overview-of-making-tax-digital" },
];

export default function VatThresholdGuide() {
  return (
    <Guide
      kicker="The VAT threshold guide"
      title="When do I have to register for VAT?"
      intro={
        <>
          Once your business&rsquo;s taxable turnover goes over £90,000 in any 12 months, you must register for VAT and start charging it. The test is
          a rolling one, checked every month, which catches out many growing businesses. This guide explains exactly how the test works, the deadlines,
          what registering costs and how small businesses can make VAT simpler.
        </>
      }
      meta={["2026/27 thresholds", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You must register if taxable turnover in the <strong>last 12 months</strong> goes over <strong>£90,000</strong>.</li>
          <li>You must also register straight away if you expect over £90,000 in the <strong>next 30 days alone</strong>.</li>
          <li>Register within 30 days of the end of the month you went over; you are registered from the first day of the month after that.</li>
          <li>You can deregister if turnover falls below <strong>£88,000</strong>.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£90,000", label: "Registration threshold" },
            { value: "£88,000", label: "Deregistration threshold" },
            { value: "30 days", label: "To register" },
            { value: "20%", label: "Standard rate of VAT" },
          ]}
        />
      </GuideSection>

      <GuideSection id="turnover" n={2} kicker="Turnover" title="What counts as taxable turnover">
        <p>
          Taxable turnover is the total value of everything you sell that is not exempt from VAT: standard-rated, reduced-rated and zero-rated sales all
          count. It is your sales, not your profit. Exempt sales, such as most insurance, finance, education and residential rents, do not count, and nor
          do sales of capital assets such as old equipment. If you run more than one business as a <a href="/business/sole-trader-tax">sole trader</a>, their turnover is added together.
        </p>
      </GuideSection>

      <GuideSection id="rolling" n={3} kicker="The main test" title="The rolling 12-month test">
        <p>
          At the end of every month, add up your taxable turnover for that month and the previous 11. If the total is over £90,000, you must register. It
          is not based on the tax year or your accounting year, so a business can cross the threshold in any month. As each month passes, the oldest
          month drops out of the total and the newest one comes in: a busy month replacing a quiet one can push you over.
        </p>
      </GuideSection>

      <GuideSection id="forward" n={4} kicker="Big contracts" title="The 30-day forward-look test">
        <p>
          You must also register if, at any point, you expect your taxable turnover in the next 30 days alone to be over £90,000, for example because you
          have won a large contract. In that case you register by the end of those 30 days, and you are registered from the start of the 30-day period,
          so VAT is due on the big sale itself.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Rolling turnover of £91,000 at the end of September 2026"
          steps={[
            { label: "Over £90,000 at the end of", value: "September" },
            { label: "Tell HMRC by", value: "30 October 2026" },
          ]}
          total={{ label: "VAT registered from", value: "1 November 2026" }}
        />
        <WorkedExample
          title="£85,000 now, £9,000 expected next month, £3,000 month dropping out"
          steps={[
            { label: "Rolling total now", value: "£85,000" },
            { label: "Next month: £85,000 − £3,000 + £9,000", value: "£91,000" },
          ]}
          total={{ label: "Status", value: "Over next month" }}
        />
      </GuideSection>

      <GuideSection id="dates" n={6} kicker="Deadlines" title="Registration deadlines">
        <Timeline
          items={[
            { when: "End of the month you go over", what: "You become liable", detail: "Work out the rolling total at each month end." },
            { when: "Within 30 days", what: "Register with HMRC", detail: "Online, through your business tax account." },
            { when: "First day of the second month", what: "Registration takes effect", detail: "Charge VAT on sales from this date." },
            { when: "After registering", what: "First VAT return", detail: "Usually quarterly, filed through Making Tax Digital software." },
          ]}
        />
        <p>
          While you wait for your VAT number, you cannot show VAT on invoices, but you should raise prices to include it and reissue invoices once your
          number arrives.
        </p>
      </GuideSection>

      <GuideSection id="cost" n={7} kicker="Pricing" title="What registering costs your business">
        <p>
          Whether VAT costs you anything depends on your customers. Businesses that are VAT registered can reclaim the VAT you charge, so you can usually add
          it to their prices. Consumers cannot, so if you keep the same prices, a sixth of what they pay goes to HMRC. On £91,000 of sales to consumers that is
          £15,167, less the VAT you reclaim on costs: £2,000 on £12,000 of costs, leaving £13,167 a year. That is why the threshold matters so much to
          hairdressers, trades and other consumer-facing businesses.
        </p>
      </GuideSection>

      <GuideSection id="voluntary" n={8} kicker="Option" title="Registering voluntarily">
        <p>
          You can register even if your turnover is below the threshold. It can make sense if most of your customers are VAT-registered businesses, or if
          you have large costs with VAT, such as equipment or stock, as you can reclaim the VAT on them. It can also make a small business look more
          established. The downside is the extra admin and, for consumer sales, higher prices.
        </p>
      </GuideSection>

      <GuideSection id="schemes" n={9} kicker="Simpler VAT" title="VAT schemes for small businesses">
        <CompareCards
          columns={[
            {
              name: "Flat Rate Scheme",
              rows: [
                { label: "How", value: "Pay a fixed % of VAT-inclusive turnover" },
                { label: "For", value: "Taxable turnover up to £150,000" },
                { label: "Best for", value: "Businesses with low costs" },
              ],
            },
            {
              name: "Cash Accounting Scheme",
              rows: [
                { label: "How", value: "Pay VAT when customers pay you" },
                { label: "For", value: "Turnover up to £1.35 million" },
                { label: "Best for", value: "Businesses with slow payers" },
              ],
            },
          ]}
        />
        <p>
          There is also an Annual Accounting Scheme, with one return a year and fixed payments on account. See the{" "}
          <a href="/business/flat-rate-vat">Flat Rate VAT calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="staying-under" n={10} kicker="Planning" title="Staying under the threshold">
        <p>
          Some sole traders deliberately limit their work to stay under £90,000. That is legal, but splitting one business artificially between family members
          or companies to keep each under the threshold is not: HMRC can treat them as one business. Track your rolling total every month so that the
          threshold never surprises you; the calculator&rsquo;s next-month check shows when you are getting close.
        </p>
      </GuideSection>

      <GuideSection id="late" n={11} kicker="Penalties" title="If you register late">
        <p>
          HMRC backdates your registration to when it should have started. You then owe VAT on all sales since that date, even though you did not charge your
          customers for it, and a late registration penalty based on the VAT due and how late you are. If you realise you have gone over, register straight
          away: penalties are lower if you tell HMRC before it finds out.
        </p>
      </GuideSection>

      <GuideSection id="mtd" n={12} kicker="Records" title="Making Tax Digital for VAT">
        <p>
          All VAT-registered businesses must keep digital records and file VAT returns using software that works with Making Tax Digital. Choose your software
          before you register, so your first return is straightforward.
        </p>
      </GuideSection>

      <GuideSection id="deregister" n={13} kicker="Leaving" title="Deregistering">
        <p>
          If your taxable turnover for the next 12 months is expected to be £88,000 or less, you can ask to deregister. You may need to pay VAT on stock and
          assets you still hold on which you reclaimed VAT, if the VAT due is over £1,000.
        </p>
      </GuideSection>

      <GuideSection id="exception" n={14} kicker="Exception" title="Temporary rises: the exception">
        <p>
          If you go over £90,000 because of a one-off, such as a single large order, and you expect turnover in the next 12 months to be £88,000 or less, you
          can ask HMRC for an exception from registering. You must still tell HMRC and give evidence, and it decides whether to grant it.
        </p>
      </GuideSection>

      <GuideSection id="pricing" n={15} kicker="Pricing" title="Raising your prices when you register">
        <p>
          When you register, you decide whether to add VAT to your prices or absorb it. For business customers, adding 20% is normal: they reclaim it on
          their own VAT return, so their real cost does not change. For consumers, adding 20% is a visible price rise, so many businesses split the
          difference, raising prices a little and absorbing the rest. Work out the effect on your <a href="/business/gross-profit-margin">margin</a>{" "}before deciding. If a £100 job becomes £120 with
          VAT, or stays at £100 including VAT, your income falls to £83.33. See the <a href="/business/vat-calculator">VAT calculator</a> to work out prices
          with and without VAT.
        </p>
      </GuideSection>

      <GuideSection id="reclaim" n={16} kicker="Input VAT" title="Reclaiming VAT on costs and past purchases">
        <p>
          Once registered, you can reclaim the VAT you pay on business costs, such as equipment, stock, software and professional fees, as long as you
          have a valid VAT invoice. You can also reclaim VAT on goods you bought up to four years before registration that you still have, such as a van or
          computer, and on services bought up to six months before. For businesses with large costs, this input VAT can offset much of the VAT on sales.
        </p>
      </GuideSection>

      <GuideSection id="tracking" n={17} kicker="Record keeping" title="Tracking your rolling total">
        <p>
          The simplest way to stay on top of the threshold is a monthly spreadsheet or your accounting software&rsquo;s report showing taxable sales for each
          month and the total of the last 12. Add each new month and remove the one from 12 months ago. Most accounting packages can show this automatically.
          Set yourself a warning level, such as £80,000, so you have time to plan prices and choose software before you have to register.
        </p>
      </GuideSection>

      <GuideSection id="sole-trader-company" n={18} kicker="Business types" title="Sole traders, partnerships and companies">
        <p>
          The threshold applies to the business, not the person. A sole trader&rsquo;s different activities count together, because the person is the
          business. A partnership or limited company is a separate business with its own threshold. A sole trader who also has a share in a partnership
          therefore has two separate turnovers. Where HMRC thinks a business has been split artificially to stay under the threshold, it can direct that the
          parts be registered together.
        </p>
      </GuideSection>

      <GuideSection id="international" n={19} kicker="International" title="Selling online and abroad">
        <p>
          Exports of goods to customers outside the UK are usually zero-rated but still count towards your taxable turnover. Services to overseas business
          customers are often outside the scope of UK VAT and do not count. Businesses based outside the UK that sell to UK consumers must register with no
          threshold at all. Online marketplace sellers should check whether the marketplace is responsible for the VAT on their sales.
        </p>
      </GuideSection>

      <GuideSection id="after" n={20} kicker="First steps" title="After you register">
        <p>
          Once registered, you get a VAT number, which must appear on every invoice. Each invoice must show your business name and address, the invoice date and
          number, a description of what you supplied, the price before VAT, the VAT rate and the VAT amount. Most businesses file returns every quarter, due one
          month and seven days after the end of the period, and pay at the same time. Set aside the VAT you collect in a separate account, because it is not
          your money.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          caption="VAT thresholds and rates, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Registration threshold", "£90,000"],
            ["Deregistration threshold", "£88,000"],
            ["Standard rate", "20%"],
            ["Reduced rate", "5%"],
            ["Flat Rate Scheme entry limit", "£150,000"],
            ["Cash Accounting Scheme limit", "£1.35 million"],
          ]}
        />
        <Callout title="Threshold frozen">
          The £90,000 threshold was raised from £85,000 in April 2024 and has not changed since.
        </Callout>
      </GuideSection>
    </Guide>
  );
}
