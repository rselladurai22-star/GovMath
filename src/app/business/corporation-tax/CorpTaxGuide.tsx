import {
  Callout,
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

/** Corporation Tax — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rates", title: "The rates and limits" },
  { id: "marginal", title: "How marginal relief works" },
  { id: "rate-chart", title: "The rate on each extra pound" },
  { id: "profits", title: "What profit is taxed" },
  { id: "associated", title: "Associated companies" },
  { id: "short-periods", title: "Short accounting periods" },
  { id: "reducing", title: "Legitimate ways to reduce the bill" },
  { id: "deadlines", title: "Paying and filing" },
  { id: "extraction", title: "Getting money out of the company" },
  { id: "allowances", title: "Capital allowances in practice" },
  { id: "growth", title: "A growing company" },
  { id: "investment", title: "Investment companies and other income" },
  { id: "losses", title: "Losses in more detail" },
  { id: "records", title: "Records, accounts and the return" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Corporation Tax rates and reliefs", href: "https://www.gov.uk/corporation-tax-rates" },
  { label: "GOV.UK — Marginal Relief for Corporation Tax", href: "https://www.gov.uk/guidance/corporation-tax-marginal-relief" },
  { label: "GOV.UK — Pay your Corporation Tax bill", href: "https://www.gov.uk/pay-corporation-tax" },
  { label: "GOV.UK — Company tax returns", href: "https://www.gov.uk/company-tax-returns" },
  { label: "GOV.UK — Capital allowances", href: "https://www.gov.uk/capital-allowances" },
];

export default function CorpTaxGuide() {
  return (
    <Guide
      kicker="The Corporation Tax guide"
      title="Corporation Tax for small companies"
      intro={
        <>
          UK limited companies pay Corporation Tax on their profits at between 19% and 25%. In the middle, marginal relief
          creates an effective 26.5% rate that surprises many directors. This guide explains the rates, how marginal relief is
          worked out, what counts as profit, how associated companies and short periods change the limits, and when you pay.
        </>
      }
      meta={["Financial year 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            Profits up to <strong>£50,000</strong>: 19%, the small profits rate.
          </li>
          <li>
            Profits of <strong>£250,000</strong> or more: 25%, the main rate, on all of it.
          </li>
          <li>
            In between: 25% less <strong>marginal relief</strong>, which works out at 19% on the first £50,000 and 26.5% on the
            rest.
          </li>
        </ul>
        <DataTable
          caption="Corporation Tax on different profits, one company, 12-month period"
          head={["Taxable profit", "Corporation Tax", "Effective rate", "Profit after tax"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["£25,000", "£4,750", "19.00%", "£20,250"],
            ["£50,000", "£9,500", "19.00%", "£40,500"],
            ["£75,000", "£16,125", "21.50%", "£58,875"],
            ["£100,000", "£22,750", "22.75%", "£77,250"],
            ["£150,000", "£36,000", "24.00%", "£114,000"],
            ["£200,000", "£49,250", "24.63%", "£150,750"],
            ["£300,000", "£75,000", "25.00%", "£225,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="The rates and limits">
        <p>
          Corporation Tax rates are set for financial years, which run from 1 April to 31 March. The rates have been the same
          since 1 April 2023 and are unchanged for the financial year starting 1 April 2026.
        </p>
        <DataTable
          caption="Corporation Tax from 1 April 2023"
          head={["Profit", "Rate"]}
          rows={[
            ["Up to £50,000 (lower limit)", "19% small profits rate"],
            ["£50,001 to £249,999", "25% less marginal relief"],
            ["£250,000 or more (upper limit)", "25% main rate"],
          ]}
        />
        <p>
          The limits are for a 12-month period and a company with no associated companies. Ring-fenced oil and gas profits are
          taxed under separate rules not covered here.
        </p>
      </GuideSection>

      <GuideSection id="marginal" n={3} kicker="The maths" title="How marginal relief works">
        <p>
          A company with profits between the limits works out tax at 25% on all its profit, then takes off marginal relief:
        </p>
        <p>
          <strong>Marginal relief = 3/200 × (upper limit − profits)</strong>
        </p>
        <WorkedExample
          title="£100,000 of taxable profit"
          steps={[
            { label: "Tax at 25%", value: "£25,000" },
            { label: "Marginal relief: 3/200 × (£250,000 − £100,000)", value: "−£2,250" },
            { label: "Corporation Tax", value: "£22,750" },
          ]}
          total={{ label: "Effective rate", value: "22.75%" }}
        />
        <p>
          The same answer comes from 19% on the first £50,000 (£9,500) plus 26.5% on the next £50,000 (£13,250). That is why
          the band is often described as having a 26.5% <a href="/tax-and-salary/tax-bracket-checker">marginal rate</a>.
        </p>
        <p>
          If the company receives dividends from other, non-group companies, these are added to profit to give{" "}
          <strong>augmented profits</strong>. Augmented profits decide the rate, but the dividends themselves are not taxed. The
          relief is then scaled by taxable profit ÷ augmented profits.
        </p>
      </GuideSection>

      <GuideSection id="rate-chart" n={4} kicker="Marginal rates" title="The rate on each extra pound">
        <Figure label="Corporation Tax on the next £1 of profit" caption="One company, 12-month accounting period. Hover or tap a step for its range.">
          <StepChart
            ariaLabel="Marginal Corporation Tax rate: 19% to £50,000, 26.5% to £250,000, then 25%."
            max={300000}
            yMax={30}
            yTicks={[0, 10, 20, 30]}
            unit="%"
            steps={[
              { from: 0, to: 50000, value: 19 },
              { from: 50000, to: 250000, value: 26.5 },
              { from: 250000, to: 300000, value: 25 },
            ]}
          />
        </Figure>
        <p>
          This matters for decisions made before the year end. In the marginal band, every £1,000 of extra profit costs £265 in
          tax, and every £1,000 of extra allowable spending saves £265. Below £50,000 the saving is £190; above £250,000 it is
          £250.
        </p>
      </GuideSection>

      <GuideSection id="profits" n={5} kicker="The tax base" title="What profit is taxed">
        <p>Corporation Tax is charged on the company&rsquo;s <strong>taxable profits</strong>. To get there from your accounts:</p>
        <ul>
          <li>start with the profit in the accounts;</li>
          <li>add back costs that are not allowable for tax, such as client entertaining, fines and accounting depreciation;</li>
          <li>take off capital allowances on equipment, vans and machinery;</li>
          <li>take off any trading losses brought forward;</li>
          <li>add any taxable gains on assets the company sold.</li>
        </ul>
        <p>
          Directors&rsquo; salaries, <a href="/business/employer-ni-costs">employer National Insurance</a>{" "}and employer pension contributions are all deductible.
          Dividends paid to shareholders are <strong>not</strong>: they come out of profit after Corporation Tax.
        </p>
        <Callout title="Capital allowances">
          The Annual Investment Allowance gives 100% relief on up to £1 million a year of most plant and machinery. Companies
          can also claim full expensing on new main-rate equipment. Cars are treated differently and get writing-down
          allowances based on their emissions.
        </Callout>
      </GuideSection>

      <GuideSection id="associated" n={6} kicker="Groups" title="Associated companies">
        <p>
          If two or more companies are under the same control, the £50,000 and £250,000 limits are shared between them. They
          are divided by the number of associated companies plus one.
        </p>
        <WorkedExample
          title="£40,000 of profit with one associated company"
          steps={[
            { label: "Lower limit: £50,000 ÷ 2", value: "£25,000" },
            { label: "Upper limit: £250,000 ÷ 2", value: "£125,000" },
            { label: "Tax at 25%", value: "£10,000" },
            { label: "Marginal relief: 3/200 × (£125,000 − £40,000)", value: "−£1,275" },
          ]}
          total={{ label: "Corporation Tax", value: "£8,725" }}
        />
        <p>
          On its own, the same company would pay £7,600 at 19%. Associated companies include companies controlled by the same
          person, and in some cases by close relatives or business partners where there is substantial commercial
          interdependence. Dormant companies and passive holding companies are not counted.
        </p>
      </GuideSection>

      <GuideSection id="short-periods" n={7} kicker="First years" title="Short accounting periods">
        <p>
          A company&rsquo;s first accounting period is often shorter or longer than 12 months. An accounting period for
          Corporation Tax can never be longer than 12 months, so a longer first set of accounts is split into two periods.
        </p>
        <p>For a period shorter than 12 months, the limits are reduced pro rata.</p>
        <WorkedExample
          title="£30,000 of profit in a six-month first period"
          steps={[
            { label: "Lower limit: £50,000 × 6/12", value: "£25,000" },
            { label: "Upper limit: £250,000 × 6/12", value: "£125,000" },
            { label: "Tax at 25% less marginal relief", value: "£7,500 − £1,425" },
          ]}
          total={{ label: "Corporation Tax", value: "£6,075" }}
        />
      </GuideSection>

      <GuideSection id="reducing" n={8} kicker="Planning" title="Legitimate ways to reduce the bill">
        <ul>
          <li>
            <strong>Employer pension contributions.</strong> Paid by the company and normally deductible. A £10,000
            contribution on £100,000 of profit saves £2,650 of Corporation Tax, and the director pays no tax or NI on it going
            in.
          </li>
          <li>
            <strong>Timing equipment purchases.</strong> Buying needed equipment before the year end brings the capital
            allowance into this year.
          </li>
          <li>
            <strong>Claiming every allowable cost,</strong> including use of home, <a href="/business/business-mileage">mileage</a>{" "}at the approved rates, and
            accountancy and software.
          </li>
          <li>
            <strong>Research and development relief</strong> for qualifying projects that seek an advance in science or
            technology.
          </li>
          <li>
            <strong>Using losses</strong> from earlier years, or carrying a current loss back to the previous year.
          </li>
        </ul>
        <Callout tone="warn" title="Spending to save tax still costs money">
          A £1,000 cost saves at most £265 of tax. Only spend on things the business needs.
        </Callout>
      </GuideSection>

      <GuideSection id="deadlines" n={9} kicker="Deadlines" title="Paying and filing">
        <Timeline
          items={[
            { when: "Within 3 months of starting", what: "Register for Corporation Tax", detail: "Usually done when the company is set up at Companies House." },
            { when: "9 months and 1 day", what: "Pay Corporation Tax", detail: "After the end of the accounting period. A 31 March 2027 year end means paying by 1 January 2028." },
            { when: "9 months", what: "File accounts at Companies House", detail: "For private companies, after the year end (the first accounts can differ)." },
            { when: "12 months", what: "File the company tax return (CT600)", detail: "After the end of the accounting period." },
          ]}
        />
        <p>
          The tax is due before the return. Large companies, with profits over £1.5 million (divided between associated
          companies), pay in quarterly instalments starting during the year. Late payment interest runs from the due date, and
          late returns bring penalties starting at £200.
        </p>
      </GuideSection>

      <GuideSection id="extraction" n={10} kicker="Next step" title="Getting money out of the company">
        <p>
          Profit after Corporation Tax belongs to the company. To get it to you, a director usually takes a small salary plus
          dividends. Dividends carry their own tax: from April 2026, 10.75% in the basic rate band, 35.75% in the higher rate
          band and 39.35% in the additional rate band, after a £500 allowance.
        </p>
        <p>
          The combined rate of Corporation Tax and <a href="/investing/dividend-tax">dividend tax</a>{" "}on the same profit can be close to, or above, what a sole trader
          pays. The <a href="/business/dividend-vs-salary">dividend vs salary calculator</a> finds the best split for your
          profit, and the <a href="/business/sole-trader-tax">sole trader tax calculator</a> shows the comparison.
        </p>
      </GuideSection>

      <GuideSection id="allowances" n={11} kicker="Equipment" title="Capital allowances in practice">
        <p>
          Spending on equipment for the business is not deducted like an everyday cost in the accounts, but capital allowances
          usually give the same result for tax. With the Annual Investment Allowance, a company can deduct the full cost of most
          plant and machinery, including vans, tools, computers and furniture, in the year it buys them.
        </p>
        <WorkedExample
          title="A £20,000 van bought by a company with £100,000 of profit"
          steps={[
            { label: "Corporation Tax on £100,000", value: "£22,750" },
            { label: "Profit after the allowance", value: "£80,000" },
            { label: "Corporation Tax on £80,000", value: "£17,450" },
          ]}
          total={{ label: "Tax saved this year", value: "£5,300" }}
        />
        <p>
          The saving is 26.5% because the whole £20,000 comes out of the marginal band. The same purchase would save £3,800 for
          a company with profits under £50,000 and £5,000 for one above £250,000. Cars are the main exception: they get
          writing-down allowances spread over several years, unless they are new and zero-emission.
        </p>
        <p>
          When you later sell an asset you claimed allowances on, the sale price usually comes back into profit as a balancing
          charge. Keep a simple register of what you bought, when, and what you claimed.
        </p>
      </GuideSection>

      <GuideSection id="growth" n={12} kicker="Worked example" title="A growing company">
        <p>A company&rsquo;s rate changes as it grows. Here is one business over three years:</p>
        <DataTable
          caption="The same company as profits grow"
          head={["Year", "Taxable profit", "Corporation Tax", "Effective rate"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Year 1", "£40,000", "£7,600", "19.0%"],
            ["Year 2", "£90,000", "£20,100", "22.3%"],
            ["Year 3", "£180,000", "£43,950", "24.4%"],
          ]}
        />
        <p>
          In year 1 every extra pound was taxed at 19%. From year 2 the company is in the marginal band, where each extra pound
          costs 26.5%. That is the point at which timing spending and pension contributions starts to make a bigger difference.
        </p>
      </GuideSection>

      <GuideSection id="investment" n={13} kicker="Other income" title="Investment companies and other income">
        <p>
          Corporation Tax is charged on all of a company&rsquo;s taxable profits, not just its trading profit. Rental income,
          interest and most gains on selling assets are added in. Dividends from other UK companies are usually not taxed, but
          they can push up the rate on the rest, as shown earlier.
        </p>
        <p>
          A <strong>close investment-holding company</strong>, broadly a company controlled by five or fewer people that mainly
          holds investments rather than trading or letting property to unconnected tenants, pays 25% on all its profits whatever
          their size. The small profits rate and marginal relief do not apply.
        </p>
      </GuideSection>

      <GuideSection id="losses" n={14} kicker="Bad years" title="Losses in more detail">
        <p>If the company makes a trading loss, there is no Corporation Tax to pay for that period, and the loss can be used:</p>
        <ul>
          <li>against other profits of the same period, such as rental income or gains;</li>
          <li>carried back against the previous 12 months&rsquo; profits, giving a refund of tax already paid;</li>
          <li>carried forward against future profits, subject to limits for very large amounts;</li>
          <li>in a group, surrendered to another group company with profits.</li>
        </ul>
        <p>
          A carry-back can be valuable in a downturn because it turns a loss into cash quickly. Claim it on the company tax
          return for the loss-making period.
        </p>
      </GuideSection>

      <GuideSection id="records" n={15} kicker="Compliance" title="Records, accounts and the return">
        <p>
          Every limited company has to keep accounting records and produce annual accounts, whether or not it owes any
          Corporation Tax. The Corporation Tax return, form CT600, is filed with HMRC online and includes:
        </p>
        <ul>
          <li>the company&rsquo;s full accounts for the period, in a tagged digital format;</li>
          <li>a tax computation showing how the accounts profit becomes taxable profit;</li>
          <li>claims for capital allowances, losses and reliefs such as research and development.</li>
        </ul>
        <p>
          Most small companies use accounting software or an accountant to prepare both. Records must normally be kept for six
          years from the end of the accounting period, longer if there is an open enquiry.
        </p>
        <p>
          Even a company with no taxable profit must file a return if HMRC sends a notice to file. From 1 April 2026 the fixed
          penalties doubled: £200 for a late return, £400 if it is more than three months late, and up to £2,000 for repeated
          lateness, with further tax-geared penalties after six and twelve months. Set reminders for both the payment and the
          filing date.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "19%", label: "Small profits rate, up to £50,000" },
            { value: "25%", label: "Main rate, £250,000 and above" },
            { value: "26.5%", label: "Effective marginal rate in between" },
            { value: "3/200", label: "Marginal relief fraction" },
            { value: "9 months + 1 day", label: "Payment deadline" },
            { value: "12 months", label: "Return deadline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
