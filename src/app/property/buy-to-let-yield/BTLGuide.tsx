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

/** Buy-to-let yield and profit — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "yields", title: "Gross and net yield" },
  { id: "costs", title: "Running costs to include" },
  { id: "example", title: "A worked example" },
  { id: "section24", title: "Tax and Section 24" },
  { id: "tax-bands", title: "Why your tax band matters" },
  { id: "cash-return", title: "Return on the cash you put in" },
  { id: "buying", title: "The cost of buying" },
  { id: "mortgages", title: "Buy-to-let mortgages" },
  { id: "rates", title: "When rates rise" },
  { id: "company", title: "Personal or limited company?" },
  { id: "cgt", title: "Selling and Capital Gains Tax" },
  { id: "rules", title: "Rules for landlords" },
  { id: "admin", title: "Tax returns and records" },
  { id: "good-yield", title: "What is a good yield?" },
  { id: "repayment", title: "Interest-only or repayment?" },
  { id: "growth", title: "Capital growth" },
  { id: "checklist", title: "Before you buy: a checklist" },
  { id: "other-lets", title: "Holiday lets, HMOs and furnished lets" },
  { id: "costs-reckoner", title: "Running costs ready reckoner" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Renting out a property: paying tax", href: "https://www.gov.uk/renting-out-a-property/paying-tax" },
  { label: "GOV.UK — Restricting finance cost relief for individual landlords", href: "https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies" },
  { label: "GOV.UK — Stamp Duty: higher rates for additional properties", href: "https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property" },
  { label: "GOV.UK — Capital Gains Tax on property", href: "https://www.gov.uk/tax-sell-property" },
  { label: "GOV.UK — Making Tax Digital for Income Tax", href: "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax" },
];

export default function BTLGuide() {
  return (
    <Guide
      kicker="The buy-to-let guide"
      title="Buy-to-let yields and profit, explained"
      intro={
        <>
          A headline yield tells you little about what a rental property actually earns. This guide explains gross and net
          yield, the costs landlords often forget, how Section 24 taxes rental profit before mortgage interest, the cost of
          buying, and how to judge the return on the cash you put in.
        </>
      }
      meta={["2026/27 tax rules", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="yields" n={1} kicker="The basics" title="Gross and net yield">
        <p>
          <strong>Gross yield</strong> is a year&apos;s rent divided by the price. It is quick to work out and useful for
          comparing listings, but ignores every cost.
        </p>
        <p>
          <strong>Net yield</strong> takes off running costs and empty periods first. It is a much better guide to what the
          property earns before mortgage interest and tax.
        </p>
        <WorkedExample
          title="Gross against net on a £250,000 flat let for £1,300 a month"
          steps={[
            { label: "Rent for a full year", value: "£15,600" },
            { label: "Gross yield", note: "£15,600 ÷ £250,000", value: "6.24%" },
            { label: "Less 2 empty weeks, 10% agent fee and £2,000 of costs", value: "−£4,100" },
            { label: "Net rent", value: "£11,500" },
          ]}
          total={{ label: "Net yield", value: "4.60%" }}
        />
      </GuideSection>

      <GuideSection id="costs" n={2} kicker="Costs" title="Running costs to include">
        <ul>
          <li><strong>Letting agent fees:</strong> about 10% to 15% of rent for full management, less for tenant-find only.</li>
          <li><strong>Empty periods:</strong> two to four weeks a year between tenants is a common allowance.</li>
          <li><strong>Landlord insurance:</strong> buildings and liability cover, often a few hundred pounds a year.</li>
          <li><strong>Repairs and maintenance:</strong> boilers, appliances, decorating; many landlords budget 5% to 10% of rent.</li>
          <li><strong>Safety checks:</strong> a yearly gas safety certificate, electrical checks every five years and an EPC.</li>
          <li><strong>Service charge and ground rent:</strong> for leasehold flats, often £1,000 to £3,000 a year or more.</li>
          <li><strong>Licensing:</strong> some councils require a licence for rented homes.</li>
        </ul>
        <p>All of these are allowable expenses that reduce your taxable profit. Mortgage interest is treated differently.</p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>
          The same £250,000 flat, bought with a 25% deposit and a 5% interest-only mortgage of £187,500. The landlord earns
          £40,000 a year from a job.
        </p>
        <DataTable
          caption="The first year"
          head={["", "Amount"]}
          numeric={[1]}
          rows={[
            ["Rent due", "£15,600"],
            ["Empty weeks, agent and costs", "−£4,100"],
            ["Taxable profit", "£11,500"],
            ["Income Tax on that profit", "−£2,546"],
            ["20% credit for mortgage interest", "+£1,875"],
            ["Mortgage interest", "−£9,375"],
            ["Profit after tax", "£1,454"],
          ]}
        />
        <p>
          A 6.24% gross yield becomes £1,454 a year after tax, about £121 a month. The cash put in was £80,500, so the return on
          cash is 1.8% before any rise in the property&apos;s value.
        </p>
      </GuideSection>

      <GuideSection id="section24" n={4} kicker="Tax" title="Tax and Section 24">
        <p>
          Individual landlords cannot deduct mortgage interest from rental income. Since April 2020, under rules known as
          Section 24, you pay Income Tax on your profit before interest and then get a tax credit of 20% of the interest.
        </p>
        <p>
          For a basic-rate taxpayer, that works out roughly the same as deducting the interest. For higher and additional-rate
          taxpayers it means paying more tax, sometimes on a property that makes no profit at all.
        </p>
        <p>
          The credit is limited to 20% of the lowest of your finance costs, your property profit, and your income above the
          Personal Allowance. Any unused credit is carried forward to later years.
        </p>
        <Callout tone="warn" title="Announced: higher rates on property income">
          The government has announced separate Income Tax rates for property income from April 2027 of 22%, 42% and 47%, with
          relief for finance costs rising to 22%. They apply from 2027/28, so this calculator uses the 2026/27 rates.
        </Callout>
      </GuideSection>

      <GuideSection id="tax-bands" n={5} kicker="Your tax band" title="Why your tax band matters">
        <p>The same property gives very different results depending on the landlord&apos;s other income:</p>
        <DataTable
          caption="The £250,000 flat for landlords with different other income"
          head={["Other income", "Tax on rent", "Profit after tax"]}
          numeric={[1, 2]}
          rows={[
            ["£0", "£0", "£2,125"],
            ["£40,000", "£671", "£1,454"],
            ["£60,000", "£2,725", "−£600"],
          ]}
        />
        <p>
          The landlord earning £60,000 has £2,125 of cash left after costs and interest, but owes £2,725 in tax, so they lose
          £600 a year. That is Section 24 at work.
        </p>
      </GuideSection>

      <GuideSection id="cash-return" n={6} kicker="Returns" title="Return on the cash you put in">
        <p>
          Yield is measured against the price. Your return is better measured against the cash you actually invested: deposit,
          Stamp Duty and buying costs.
        </p>
        <CompareCards
          columns={[
            {
              name: "With a 25% deposit",
              rows: [
                { label: "Cash put in", value: "£80,500" },
                { label: "Profit after tax", value: "£1,454" },
                { label: "Return on cash", value: "1.8%" },
              ],
            },
            {
              name: "Bought with cash",
              rows: [
                { label: "Cash put in", value: "£268,000" },
                { label: "Profit after tax", value: "£8,954" },
                { label: "Return on cash", value: "3.3%" },
              ],
            },
          ]}
        />
        <p>
          A mortgage magnifies both gains and losses. When the mortgage rate is above the net yield, borrowing reduces your
          return; when it is below, borrowing increases it. Capital growth, which is not included here, is what makes many
          buy-to-let investments work.
        </p>
      </GuideSection>

      <GuideSection id="buying" n={7} kicker="Buying" title="The cost of buying">
        <p>Buy-to-let purchases pay the higher rates of property tax:</p>
        <DataTable
          caption="Purchase tax on a £250,000 buy-to-let"
          head={["Where", "Tax", "Amount"]}
          numeric={[2]}
          rows={[
            ["England & NI", "Stamp Duty with 5% surcharge", "£15,000"],
            ["Scotland", "LBTT plus 8% ADS", "£22,100"],
            ["Wales", "LTT higher rates", "£14,950"],
          ]}
        />
        <p>Add legal fees, a survey and a mortgage arrangement fee, often £2,000 to £4,000 in total.</p>
      </GuideSection>

      <GuideSection id="mortgages" n={8} kicker="Borrowing" title="Buy-to-let mortgages">
        <p>
          Buy-to-let lenders usually want a deposit of at least 25% and lend based on the rent rather than your salary. They
          check the <strong>interest cover ratio</strong>: the rent must be at least 125% of the mortgage interest at a stress
          rate, or 145% for higher-rate taxpayers.
        </p>
        <p>
          At a 5.5% stress rate and 125% cover, £1,300 a month of rent supports a loan of about £226,900. At 145% cover it
          supports about £195,600. Most buy-to-let mortgages are interest-only, so the loan must be repaid when the property is
          sold or refinanced.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={9} kicker="Risk" title="When rates rise">
        <p>
          Mortgage interest is usually a landlord&apos;s biggest cost. On the £187,500 loan, each 1 point rise in rate adds £1,875
          a year in interest. At 6% instead of 5%, the higher-rate landlord&apos;s loss grows from £600 to £2,100 a year.
        </p>
        <Callout title="Stress-test your numbers">
          Try the calculator at your expected remortgage rate, not just today&apos;s. A property that only works at a low fixed
          rate is a risk when the fix ends.
        </Callout>
      </GuideSection>

      <GuideSection id="company" n={10} kicker="Structure" title="Personal or limited company?">
        <p>
          Section 24 does not apply to companies. A company deducts mortgage interest in full and pays Corporation Tax at 19% to
          25% on profits. But getting money out of the company means dividends or salary, which are taxed again, and company
          buy-to-let mortgages are often more expensive.
        </p>
        <p>
          Moving properties you already own into a company is treated as a sale, so Capital Gains Tax and Stamp Duty can be due.
          Take advice from an accountant before deciding.
        </p>
      </GuideSection>

      <GuideSection id="cgt" n={11} kicker="Selling" title="Selling and Capital Gains Tax">
        <p>
          When you sell, the gain is taxed at 18% within your basic-rate band and 24% above it, after the £3,000 annual exempt
          amount. You can deduct buying and selling costs and the cost of improvements, but not repairs. You must report and pay
          within 60 days of completion.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={12} kicker="Regulation" title="Rules for landlords">
        <ul>
          <li>Protect any deposit in a government-approved scheme within 30 days.</li>
          <li>Carry out right-to-rent checks in England.</li>
          <li>Provide a gas safety certificate, electrical safety report and EPC.</li>
          <li>Fit smoke alarms and carbon monoxide alarms where required.</li>
          <li>
            In England, the Renters&apos; Rights Act ends &quot;no-fault&quot; section 21 evictions and moves tenancies to
            rolling periodic agreements.
          </li>
        </ul>
        <p>Scotland and Wales have their own tenancy systems and landlord registration rules.</p>
      </GuideSection>

      <GuideSection id="admin" n={13} kicker="Admin" title="Tax returns and records">
        <Timeline
          items={[
            { when: "Every year", what: "Self Assessment", detail: "Rental income goes on your tax return, due online by 31 January after the tax year ends." },
            { when: "April 2026", what: "Making Tax Digital starts", detail: "Landlords and sole traders with qualifying income over £50,000 keep digital records and send quarterly updates." },
            { when: "April 2027", what: "Threshold falls to £30,000", detail: "More landlords join Making Tax Digital." },
          ]}
        />
        <p>
          Up to £1,000 a year of property income is covered by the property allowance, and renting a room in your own home has a
          separate £7,500 Rent a Room allowance.
        </p>
      </GuideSection>

      <GuideSection id="good-yield" n={14} kicker="Benchmarks" title="What is a good yield?">
        <p>
          There is no single answer. Yields are usually higher in cheaper areas and lower where prices are high, such as London,
          where landlords often rely more on capital growth. As a rough check, compare your net yield with your mortgage rate:
          if the net yield is below the rate, the property will not pay for its own borrowing without rising rents or prices.
        </p>
        <DataTable
          caption="Gross yield on a £250,000 property at different rents"
          head={["Monthly rent", "Gross yield"]}
          numeric={[1]}
          rows={[
            ["£1,000", "4.8%"],
            ["£1,250", "6.0%"],
            ["£1,500", "7.2%"],
            ["£1,750", "8.4%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="repayment" n={15} kicker="Mortgage type" title="Interest-only or repayment?">
        <p>
          Most buy-to-let mortgages are interest-only: you pay only the interest and repay the loan when you sell or refinance.
          That keeps monthly costs low, but the debt never falls.
        </p>
        <p>
          With a 25-year repayment mortgage on the same £187,500 loan at 5%, first-year interest falls slightly to about £9,287,
          but you also repay about £3,866 of capital. Your profit after tax is similar, about £1,524, but your cash flow becomes
          negative at about −£2,342, because capital repayments come out of your pocket and are not tax-deductible. The
          capital is not lost: it builds equity in the property.
        </p>
      </GuideSection>

      <GuideSection id="growth" n={16} kicker="The other return" title="Capital growth">
        <p>
          Rental profit is only half the story. If the £250,000 flat rose in value by 3% a year, after 5 years it would be worth
          about £289,819, a rise of about £39,819. With a mortgage, that gain is on the whole property while your cash in was
          £80,500.
        </p>
        <p>
          Prices can fall as well as rise, and a gain is only realised when you sell, after selling costs and Capital Gains Tax.
          Stamp Duty and your buying and selling costs are deducted from the gain when working out the tax.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={17} kicker="Due diligence" title="Before you buy: a checklist">
        <ul>
          <li>Check achievable rents with local letting agents and current listings, not the seller&apos;s estimate.</li>
          <li>Run the numbers at a higher mortgage rate and with a month or two empty.</li>
          <li>Check the EPC rating, and budget for improvements if it is low.</li>
          <li>For leasehold flats, check the lease length, service charge history and any restrictions on letting.</li>
          <li>Check whether the council requires a licence for rented homes in that area.</li>
          <li>Make sure you have savings for repairs and empty periods.</li>
          <li>Decide on personal or company ownership before you buy, with advice.</li>
        </ul>
      </GuideSection>

      <GuideSection id="other-lets" n={18} kicker="Other types" title="Holiday lets, HMOs and furnished lets">
        <p>
          <strong>Holiday lets.</strong> The special tax rules for furnished holiday lettings ended in April 2025. Holiday let
          profits are now taxed like other rental income, including the Section 24 restriction on mortgage interest.
        </p>
        <p>
          <strong>Houses in multiple occupation (HMOs).</strong> Letting rooms to several unrelated tenants can raise the yield,
          but large HMOs need a licence, extra safety measures and more management, and running costs are higher.
        </p>
        <p>
          <strong>Furnished lets.</strong> You can deduct the cost of replacing furniture, appliances and furnishings, but not
          the cost of furnishing the property for the first time.
        </p>
      </GuideSection>

      <GuideSection id="costs-reckoner" n={19} kicker="Ready reckoner" title="Running costs ready reckoner">
        <p>On rent of £1,300 a month, typical yearly costs might look like this:</p>
        <DataTable
          caption="Illustrative yearly costs on £15,600 of rent"
          head={["Cost", "Basis", "A year"]}
          numeric={[2]}
          rows={[
            ["Empty weeks", "2 weeks", "£600"],
            ["Letting agent", "10% of rent collected", "£1,500"],
            ["Landlord insurance", "Typical policy", "£400"],
            ["Repairs and maintenance", "About 5% of rent", "£780"],
            ["Safety certificates", "Gas, electrical", "£150"],
            ["Service charge and ground rent", "Leasehold flat", "£670"],
          ]}
        />
        <p>
          That adds up to £4,100, the figure used in the worked example. Your own costs may be quite different, especially for
          older houses or flats with high service charges, so use real quotes where you can.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "20%", label: "Tax credit for mortgage interest" },
            { value: "5%", label: "Stamp Duty surcharge in England" },
            { value: "25%", label: "Typical minimum buy-to-let deposit" },
            { value: "125% to 145%", label: "Rental cover lenders usually need" },
            { value: "18% / 24%", label: "Capital Gains Tax rates on property" },
            { value: "60 days", label: "To report and pay CGT after selling" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
