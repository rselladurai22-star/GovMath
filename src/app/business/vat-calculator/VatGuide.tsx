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

/** VAT — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "add", title: "How to add VAT" },
  { id: "remove", title: "How to remove VAT" },
  { id: "rates", title: "Which rate applies" },
  { id: "registration", title: "When you must register" },
  { id: "how-it-works", title: "How VAT works for a business" },
  { id: "invoices", title: "VAT invoices and rounding" },
  { id: "reclaim", title: "What you can and cannot reclaim" },
  { id: "schemes", title: "VAT accounting schemes" },
  { id: "returns", title: "Returns, deadlines and penalties" },
  { id: "traps", title: "Rate traps to watch for" },
  { id: "records", title: "Records and Making Tax Digital" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — VAT rates", href: "https://www.gov.uk/vat-rates" },
  { label: "GOV.UK — VAT registration: when to register", href: "https://www.gov.uk/vat-registration/when-to-register" },
  { label: "GOV.UK — VAT invoices", href: "https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include" },
  { label: "GOV.UK — Reclaiming VAT", href: "https://www.gov.uk/reclaim-vat" },
  { label: "GOV.UK — VAT Cash Accounting Scheme", href: "https://www.gov.uk/vat-cash-accounting-scheme" },
  { label: "GOV.UK — VAT Annual Accounting Scheme", href: "https://www.gov.uk/vat-annual-accounting-scheme" },
  { label: "GOV.UK — VAT return deadlines", href: "https://www.gov.uk/vat-returns/deadlines" },
];

export default function VatGuide() {
  return (
    <Guide
      kicker="The VAT guide"
      title="VAT explained: rates, registration and returns"
      intro={
        <>
          VAT is a tax on spending that businesses collect for HMRC. Adding it to a price is simple; taking it out is where
          most mistakes happen. This guide covers both, then explains the rates, when you must register, how a VAT return
          works, and what you can reclaim.
        </>
      }
      meta={["UK rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            <strong>To add 20% VAT,</strong> multiply the price by 1.2. £100 becomes £120.
          </li>
          <li>
            <strong>To remove 20% VAT,</strong> divide by 1.2. £120 becomes £100.
          </li>
          <li>
            <strong>The VAT inside a VAT-inclusive price</strong> is one-sixth of it at 20%, and one twenty-first at 5%.
          </li>
          <li>
            <strong>You must register</strong> once your taxable sales pass £90,000 in any rolling 12 months.
          </li>
        </ul>
        <KeyStats
          items={[
            { value: "20%", label: "Standard rate" },
            { value: "5%", label: "Reduced rate" },
            { value: "0%", label: "Zero rate" },
            { value: "£90,000", label: "Registration threshold" },
          ]}
        />
      </GuideSection>

      <GuideSection id="add" n={2} kicker="Adding VAT" title="How to add VAT">
        <p>
          VAT is charged on the price before VAT, often called the <strong>net</strong> price. Multiply the net price by one
          plus the rate.
        </p>
        <WorkedExample
          title="Adding 20% VAT to £100"
          steps={[
            { label: "Net price", value: "£100.00" },
            { label: "VAT", note: "£100 × 20%", value: "£20.00" },
          ]}
          total={{ label: "Price including VAT (gross)", value: "£120.00" }}
        />
        <p>
          At the reduced rate, multiply by 1.05: £100 becomes £105. Zero-rated goods have nothing added, but they are still
          VAT sales, which matters for registration and reclaiming VAT on costs.
        </p>
      </GuideSection>

      <GuideSection id="remove" n={3} kicker="Removing VAT" title="How to remove VAT">
        <p>
          Taking VAT out of a gross price is the step that catches most people. The VAT was added on top of the net price, so
          you have to divide to reverse it. Taking 20% off does not work.
        </p>
        <CompareCards
          columns={[
            {
              name: "Right: divide by 1.2",
              rows: [
                { label: "Gross price", value: "£120.00" },
                { label: "÷ 1.2", value: "£100.00 net" },
                { label: "VAT", value: "£20.00" },
              ],
            },
            {
              name: "Wrong: take 20% off",
              rows: [
                { label: "Gross price", value: "£120.00" },
                { label: "− 20%", value: "£96.00" },
                { label: "Error", value: "£4.00 too little" },
              ],
            },
          ]}
        />
        <p>
          A quicker way to find just the VAT is the <strong>VAT fraction</strong>. At 20%, VAT is 20/120, or one-sixth, of
          any VAT-inclusive price. At 5% it is 5/105, or one twenty-first.
        </p>
        <DataTable
          caption="VAT inside some common prices at 20%"
          head={["Price including VAT", "Price before VAT", "VAT (one-sixth)"]}
          numeric={[0, 1, 2]}
          rows={[
            ["£12.00", "£10.00", "£2.00"],
            ["£59.99", "£49.99", "£10.00"],
            ["£120.00", "£100.00", "£20.00"],
            ["£1,000.00", "£833.33", "£166.67"],
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={4} kicker="Rates" title="Which rate applies">
        <p>
          The UK has three VAT rates, and some things are exempt or outside VAT altogether. The rate depends on what is
          being sold, not on who is selling it.
        </p>
        <DataTable
          caption="UK VAT rates and examples"
          head={["Rate", "Examples"]}
          rows={[
            ["Standard 20%", "Most goods and services: clothing for adults, electronics, alcohol, restaurant meals, professional services"],
            ["Reduced 5%", "Home energy, children's car seats, mobility aids for older people, some energy-saving installations"],
            ["Zero 0%", "Most food, books and newspapers, children's clothes and shoes, public transport, new homes"],
            ["Exempt", "Most insurance, finance, education, health services, postage stamps, residential rent"],
            ["Outside the scope", "Wages, statutory fees such as the congestion charge, MOT test fees, donations with nothing in return"],
          ]}
        />
        <p>
          Food is the classic grey area. Most food is zero-rated, but confectionery, crisps, alcohol, hot takeaway food and
          anything eaten on the premises are standard-rated. HMRC publishes detailed notices for each sector; check the
          relevant one if you are not sure.
        </p>
        <Callout title="Zero-rated is not the same as exempt">
          Zero-rated sales count towards the registration threshold, and you can reclaim VAT on the costs of making them.
          Exempt sales do neither. A business that only makes exempt sales cannot register for VAT.
        </Callout>
      </GuideSection>

      <GuideSection id="registration" n={5} kicker="Registration" title="When you must register">
        <p>
          You must register for VAT if your <strong>taxable turnover</strong> (standard, reduced and zero-rated sales, but
          not exempt ones) goes over <strong>£90,000</strong> in any rolling 12-month period. It is not based on your tax
          year or your accounting year: check it at the end of every month.
        </p>
        <Timeline
          items={[
            { when: "Month end", what: "Add up the last 12 months", detail: "If taxable sales are over £90,000, you have gone over the threshold." },
            { when: "Within 30 days", what: "Register with HMRC", detail: "You have 30 days from the end of the month you went over." },
            { when: "Next month but one", what: "Start charging VAT", detail: "Your registration takes effect from the first day of the second month after you went over." },
          ]}
        />
        <p>
          There is also a forward-looking test: if you expect to go over £90,000 in the <strong>next 30 days alone</strong>,
          you must register straight away. Registering late does not get you out of the VAT: HMRC will ask for it from the
          date you should have registered, whether or not you charged it, plus a penalty.
        </p>
        <h3>Voluntary registration</h3>
        <p>You can register below the threshold. It tends to help when:</p>
        <ul>
          <li>your customers are VAT-registered businesses, who can reclaim the VAT you charge;</li>
          <li>you have significant costs with VAT on them, such as equipment, stock or a van;</li>
          <li>you make mainly zero-rated sales, so you can reclaim VAT on costs without charging any.</li>
        </ul>
        <p>
          It tends to hurt when you sell mainly to the public, because they cannot reclaim VAT. Either your prices rise by up
          to a fifth or your margin falls. A £50 item that stays at £50 on the shelf earns you only £41.67 once you are
          registered.
        </p>
        <p>
          You can ask to deregister if your taxable turnover falls below <strong>£88,000</strong> and you expect it to stay
          there.
        </p>
      </GuideSection>

      <GuideSection id="how-it-works" n={6} kicker="The mechanics" title="How VAT works for a business">
        <p>A VAT-registered business acts as a collector. On each return it works out two figures:</p>
        <ul>
          <li>
            <strong>Output tax:</strong> the VAT it charged customers.
          </li>
          <li>
            <strong>Input tax:</strong> the VAT it paid on business costs.
          </li>
        </ul>
        <p>It pays HMRC the difference. If input tax is bigger, HMRC pays the business.</p>
        <WorkedExample
          title="A quarterly VAT return"
          steps={[
            { label: "Sales before VAT", value: "£30,000" },
            { label: "Output tax charged at 20%", value: "£6,000" },
            { label: "Costs before VAT", value: "£6,000" },
            { label: "Input tax paid at 20%", value: "−£1,200" },
          ]}
          total={{ label: "VAT to pay HMRC", value: "£4,800" }}
        />
        <p>
          In effect, VAT is charged on the value each business adds, and the final consumer, who cannot reclaim it, bears the
          whole tax. That is why VAT is not a cost for most registered businesses, and why you leave it out when you work out{" "}
          <a href="/business/gross-profit-margin">your margin</a>.
        </p>
      </GuideSection>

      <GuideSection id="invoices" n={7} kicker="Paperwork" title="VAT invoices and rounding">
        <p>Once registered, you must give a VAT invoice to VAT-registered customers. A full VAT invoice shows:</p>
        <ul>
          <li>a unique invoice number, the invoice date and the time of supply (tax point) if different;</li>
          <li>your business name, address and VAT registration number;</li>
          <li>the customer&rsquo;s name and address;</li>
          <li>a description of each item, the quantity, the unit price before VAT and the VAT rate;</li>
          <li>the total before VAT, the total VAT and any discount.</li>
        </ul>
        <p>
          For sales of <strong>£250 or less</strong> including VAT, a simplified invoice is enough: it can show the total
          including VAT and the rate, without a separate VAT figure.
        </p>
        <h3>Rounding</h3>
        <p>
          You can work out VAT on the invoice total or on each line, then round to the nearest penny. Three items at £3.99
          including VAT contain £1.995 of VAT in total, or 66.5p each, so the two methods can differ by a penny. HMRC accepts
          either if you use it consistently. The calculator works out VAT on the total, as most invoicing software does.
        </p>
      </GuideSection>

      <GuideSection id="reclaim" n={8} kicker="Input tax" title="What you can and cannot reclaim">
        <p>
          You can reclaim VAT on goods and services you buy for your business, as long as you have a valid VAT invoice and the
          costs relate to taxable sales.
        </p>
        <DataTable
          caption="Common costs and VAT"
          head={["Cost", "Can you reclaim the VAT?"]}
          rows={[
            ["Stock, materials and equipment", "Yes"],
            ["Software, phone and broadband for the business", "Yes, the business share"],
            ["A van used for the business", "Yes"],
            ["A car", "Usually not, unless it is used only for business, such as a taxi or driving school car"],
            ["Fuel", "Yes for business mileage; private fuel needs a fuel scale charge or apportioning"],
            ["Entertaining clients", "No"],
            ["Staff entertaining, such as a party", "Yes"],
            ["Costs for exempt sales", "No, or only partly"],
          ]}
        />
        <p>
          When you first register, you can reclaim VAT on goods you still have that you bought in the{" "}
          <strong>four years</strong> before, and on services bought in the <strong>six months</strong> before, if they were
          for the business.
        </p>
      </GuideSection>

      <GuideSection id="schemes" n={9} kicker="Schemes" title="VAT accounting schemes">
        <p>Smaller businesses can choose a scheme that makes VAT easier to manage:</p>
        <DataTable
          caption="The main schemes"
          head={["Scheme", "Join if taxable turnover is up to", "What it does"]}
          rows={[
            ["Cash accounting", "£1.35 million", "Pay VAT when customers pay you, not when you invoice. Helps cash flow if customers pay late."],
            ["Annual accounting", "£1.35 million", "One return a year, with advance payments through the year."],
            ["Flat Rate Scheme", "£150,000", "Pay a fixed percentage of your VAT-inclusive turnover instead of working out input and output VAT."],
          ]}
        />
        <p>
          The Flat Rate Scheme suits some small service businesses with few costs, but the 16.5% rate for limited cost traders
          often removes the saving. The <a href="/business/flat-rate-vat">Flat Rate VAT calculator</a> compares it with
          standard accounting on your own figures.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={10} kicker="Deadlines" title="Returns, deadlines and penalties">
        <p>
          Most businesses file a VAT return every quarter through Making Tax Digital compatible software. The return and the
          payment are both due <strong>one calendar month and seven days</strong> after the end of the quarter. For a
          quarter ending 31 March, that is 7 May.
        </p>
        <p>Late returns and late payments are dealt with separately:</p>
        <ul>
          <li>
            <strong>Late returns</strong> earn a penalty point. Once you reach the threshold, four points for quarterly
            filers, you get a £200 penalty, and another for each further late return.
          </li>
          <li>
            <strong>Late payments</strong> attract a penalty of 3% of the VAT still unpaid after 15 days, a further 3% if it
            is still unpaid after 30 days, then a daily penalty at 10% a year. Interest is charged on top at the Bank of
            England base rate plus 4%.
          </li>
        </ul>
        <Callout tone="good" title="Ask before the deadline">
          If you cannot pay in full, contact HMRC before the payment is due. Agreeing a Time to Pay arrangement can stop late
          payment penalties building up.
        </Callout>
      </GuideSection>

      <GuideSection id="traps" n={11} kicker="Grey areas" title="Rate traps to watch for">
        <p>
          Most businesses only ever charge the standard rate. If you sell food, children&rsquo;s goods or anything to do with
          energy or buildings, the rate can depend on small details. A few that regularly cause problems:
        </p>
        <ul>
          <li>
            <strong>Hot food and eating in.</strong> Cold takeaway food such as a sandwich is usually zero-rated. The same
            sandwich toasted, or eaten at a table on your premises, is standard-rated.
          </li>
          <li>
            <strong>Snacks and treats.</strong> Cakes and most biscuits are zero-rated; chocolate-covered biscuits, sweets and
            crisps are standard-rated.
          </li>
          <li>
            <strong>Children&rsquo;s clothes.</strong> Zero-rated only if designed for young children and within size limits.
            Larger sizes are standard-rated even if a child wears them.
          </li>
          <li>
            <strong>Building work.</strong> Most repairs and extensions are standard-rated, but building a new home is
            zero-rated and some conversions and energy-saving installations get 5% or 0%.
          </li>
          <li>
            <strong>Mixed supplies.</strong> A gift hamper with food and wine, or a magazine sold with a toy, may need the price
            split between rates.
          </li>
        </ul>
        <p>
          Getting the rate wrong usually costs the seller, not the customer: if you charge 0% on something that should carry
          20%, HMRC treats the VAT as included in what you were paid. On a £120 sale, that is £20 out of your own pocket.
        </p>
      </GuideSection>

      <GuideSection id="records" n={12} kicker="Record keeping" title="Records and Making Tax Digital">
        <p>
          Every VAT-registered business must follow <strong>Making Tax Digital</strong> for VAT. That means keeping VAT records
          in software, or in spreadsheets linked to software, and sending returns to HMRC through it. You cannot file on the
          old HMRC online form.
        </p>
        <p>The digital records must include, for each sale and purchase:</p>
        <ul>
          <li>the date, the value before VAT and the VAT rate charged;</li>
          <li>for purchases, the VAT you are reclaiming;</li>
          <li>any adjustments, such as corrections to earlier returns.</li>
        </ul>
        <p>
          Keep VAT records and invoices for at least six years. If HMRC checks a return, it will ask to see the invoices behind
          your input tax claims, so a missing purchase invoice can mean losing the VAT on it.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "× 1.2", label: "Adds 20% VAT" },
            { value: "÷ 1.2", label: "Removes 20% VAT" },
            { value: "1/6", label: "VAT fraction at 20%" },
            { value: "1/21", label: "VAT fraction at 5%" },
            { value: "£90,000", label: "Must register above this" },
            { value: "£88,000", label: "Can deregister below this" },
            { value: "£250", label: "Simplified invoice limit" },
            { value: "1 month + 7 days", label: "Return and payment deadline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
