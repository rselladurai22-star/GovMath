import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Allowable expenses — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "test", title: "The wholly and exclusively test" },
  { id: "categories", title: "What you can claim" },
  { id: "cannot", title: "What you cannot claim" },
  { id: "home", title: "Working from home" },
  { id: "vehicles", title: "Vehicles and travel" },
  { id: "capital", title: "Equipment and big purchases" },
  { id: "worth", title: "What an expense is worth" },
  { id: "allowance", title: "Expenses or the trading allowance?" },
  { id: "examples", title: "Two worked examples" },
  { id: "records", title: "Records and receipts" },
  { id: "staff", title: "Staff, family and subcontractors" },
  { id: "timing", title: "When an expense counts" },
  { id: "company", title: "If you run a limited company" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Expenses if you're self-employed", href: "https://www.gov.uk/expenses-if-youre-self-employed" },
  { label: "GOV.UK — Simplified expenses", href: "https://www.gov.uk/simpler-income-tax-simplified-expenses" },
  { label: "GOV.UK — Simplified expenses: working from home", href: "https://www.gov.uk/simpler-income-tax-simplified-expenses/working-from-home" },
  { label: "GOV.UK — Cash basis", href: "https://www.gov.uk/simpler-income-tax-cash-basis" },
  { label: "GOV.UK — Business records if you're self-employed", href: "https://www.gov.uk/self-employed-records" },
];

export default function ExpensesGuide() {
  return (
    <Guide
      kicker="The allowable expenses guide"
      title="Allowable expenses for sole traders"
      intro={
        <>
          Every allowable expense you claim lowers your profit, and with it your Income Tax and National Insurance. This guide
          explains the test HMRC applies, what you can and cannot claim, the flat rates for working from home and mileage, and
          how much each pound of expenses really saves.
        </>
      }
      meta={["2026/27 tax year", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          You can deduct costs you incur <strong>wholly and exclusively</strong> for your business. They come off your turnover
          before tax is worked out, so a basic-rate sole trader saves about 26p in Income Tax and Class 4 NI for every £1 of
          expenses, and a higher-rate one about 42p.
        </p>
        <WorkedExample
          title="£40,000 turnover with £3,666 of expenses"
          steps={[
            { label: "Office, phone and software", value: "£1,200" },
            { label: "3,000 business miles at 45p", value: "£1,350" },
            { label: "Marketing", value: "£600" },
            { label: "Insurance and accountancy", value: "£300" },
            { label: "Working from home, 51 to 100 hours a month", value: "£216" },
          ]}
          total={{ label: "Tax and NI saved", value: "£953" }}
        />
      </GuideSection>

      <GuideSection id="test" n={2} kicker="The rule" title="The wholly and exclusively test">
        <p>
          An expense is allowable if it is incurred wholly and exclusively for the purposes of your trade. In practice that
          means two questions:
        </p>
        <ul>
          <li>
            <strong>Is it for the business?</strong> Stock, tools, software, insurance and advertising clearly are.
          </li>
          <li>
            <strong>Is there any private benefit?</strong> If a cost is partly personal, like a phone, broadband or a car, you
            can usually claim the business share, as long as you can identify it.
          </li>
        </ul>
        <p>
          Some costs fail the test even though they help you work, because they meet a personal need too. Everyday clothing is
          the classic example: a suit you only wear to meetings still keeps you warm and decent, so it is not allowable.
        </p>
      </GuideSection>

      <GuideSection id="categories" n={3} kicker="Allowable" title="What you can claim">
        <DataTable
          caption="Common allowable expenses"
          head={["Category", "Examples"]}
          rows={[
            ["Office and admin", "Stationery, printing, postage, phone, broadband, software subscriptions, computer accessories"],
            ["Travel", "Business mileage, train and bus fares, parking, tolls, hotels and meals on overnight business trips"],
            ["Stock and materials", "Goods to resell, raw materials, direct costs of producing goods"],
            ["Premises", "Rent, business rates, utilities, insurance and repairs for business premises"],
            ["Staff", "Wages, employer National Insurance and pension contributions, subcontractor payments"],
            ["Professional costs", "Accountant, solicitor and surveyor fees; professional indemnity insurance"],
            ["Finance", "Bank charges, card processing fees, interest on business loans"],
            ["Marketing", "Advertising, website costs, leaflets, free samples"],
            ["Training", "Courses that update the skills you use in your current business"],
            ["Clothing", "Uniforms, protective clothing and costumes for performers"],
          ]}
        />
        <p>
          Professional subscriptions to bodies on HMRC&rsquo;s approved list, trade journals and small tools are also
          allowable. The calculator groups these under &ldquo;other business costs&rdquo;.
        </p>
      </GuideSection>

      <GuideSection id="cannot" n={4} kicker="Not allowable" title="What you cannot claim">
        <ul>
          <li>
            <strong>Your own pay.</strong> Money you take out of the business, called drawings, is not an expense.
          </li>
          <li>
            <strong>Commuting</strong> between home and a permanent business base that is not your home.
          </li>
          <li>
            <strong>Client entertainment</strong>, such as meals, drinks or event tickets for customers.
          </li>
          <li>
            <strong>Everyday clothing</strong>, haircuts and personal grooming.
          </li>
          <li>
            <strong>Fines and penalties</strong>, including parking fines and HMRC penalties.
          </li>
          <li>
            <strong>Loan repayments</strong>: only the interest is allowable, not the capital.
          </li>
          <li>
            <strong>Training for a new skill</strong> unrelated to your current business.
          </li>
          <li>
            <strong>Your own Income Tax and National Insurance.</strong>
          </li>
        </ul>
        <Callout tone="warn" title="Food and drink">
          Your lunch on a normal working day is not allowable. Reasonable meals while travelling away from your usual base on
          business, or staying overnight, usually are.
        </Callout>
      </GuideSection>

      <GuideSection id="home" n={5} kicker="Home working" title="Working from home">
        <p>If you run your business from home, you have two ways to claim part of your household costs:</p>
        <CompareCards
          columns={[
            {
              name: "Simplified flat rate",
              rows: [
                { label: "25 to 50 hours a month", value: "£10 a month" },
                { label: "51 to 100 hours a month", value: "£18 a month" },
                { label: "101 hours or more", value: "£26 a month" },
                { label: "Records", value: "Hours worked at home" },
              ],
            },
            {
              name: "Share of actual costs",
              rows: [
                { label: "What", value: "Heating, electricity, broadband, council tax, rent or mortgage interest" },
                { label: "Split by", value: "Rooms used and time used for work" },
                { label: "Records", value: "Bills and your workings" },
                { label: "Best for", value: "Larger homes and longer hours" },
              ],
            },
          ]}
        />
        <p>
          The flat rate does not cover phone and broadband, which you can claim separately for their business share. A full
          year at 101 hours or more a month gives £312. If you have a dedicated office and high bills, a share of actual costs
          is often worth more, but keep careful workings in case HMRC asks.
        </p>
        <Callout title="Watch out for business rates and Capital Gains Tax">
          Using part of your home only for business can, in some cases, bring business rates or a small Capital Gains Tax
          charge when you sell. Using a room for business and private purposes avoids both.
        </Callout>
      </GuideSection>

      <GuideSection id="vehicles" n={6} kicker="Getting around" title="Vehicles and travel">
        <p>
          For a car, van or motorcycle you choose between the HMRC mileage rates and the business share of actual running
          costs. The mileage rate for cars and vans is 45p a mile for the first 10,000 business miles in the tax year and 25p
          after that.
        </p>
        <p>
          Once you use the mileage rate for a vehicle you must stick with it for as long as you use that vehicle in the
          business. Parking and tolls for business journeys can be claimed on top either way. The{" "}
          <a href="/business/business-mileage">business mileage calculator</a> works out the claim and the tax it saves.
        </p>
        <p>
          Other business travel, such as train fares, taxis to a client and hotels on a business trip, is claimed at cost.
        </p>
      </GuideSection>

      <GuideSection id="capital" n={7} kicker="Capital costs" title="Equipment and big purchases">
        <p>
          A laptop, tools or a van last for years, so they are capital purchases. How you claim depends on your accounting
          method:
        </p>
        <ul>
          <li>
            <strong>Cash basis</strong>, which most sole traders now use: you can usually deduct the cost as an expense in the
            year you pay for it. Cars are the exception and go through capital allowances.
          </li>
          <li>
            <strong>Traditional accounting:</strong> you claim capital allowances instead. The Annual Investment Allowance
            gives a 100% deduction in the year of purchase for most equipment, up to £1 million a year.
          </li>
        </ul>
        <p>
          If the item is used privately too, claim only the business share. When you sell it or stop using it for the business,
          you may need to add some of the value back.
        </p>
      </GuideSection>

      <GuideSection id="worth" n={8} kicker="The saving" title="What an expense is worth">
        <p>
          An expense saves your <strong>marginal rate</strong> of tax and National Insurance, the rate on the top slice of your
          profit. Here is what £1,000 of expenses saves at different profit levels.
        </p>
        <Figure label="Tax and NI saved by £1,000 of expenses, 2026/27" caption="England, Wales and NI, no other income.">
          <Bars
            items={[
              { label: "Profit £10,000", value: 0 },
              { label: "Profit £40,000", value: 260 },
              { label: "Profit £80,000", value: 420 },
              { label: "Profit £110,000", value: 620 },
            ]}
          />
        </Figure>
        <p>
          Below the £12,570 Personal Allowance, expenses save no tax this year, though they can create a loss you may be able to
          use. Between £100,000 and £125,140, each £1,000 of expenses saves £620, because it also restores part of your Personal
          Allowance.
        </p>
        <Callout title="Do not spend just to save tax">
          An expense of £1,000 still costs you £740 after tax relief at the basic rate. Only spend on things the business
          needs.
        </Callout>
      </GuideSection>

      <GuideSection id="allowance" n={9} kicker="A shortcut" title="Expenses or the trading allowance?">
        <p>
          Instead of claiming actual expenses, you can deduct a flat <strong>£1,000 trading allowance</strong>. You cannot do
          both. The allowance is better if your real costs are under £1,000, which is common for small side businesses.
        </p>
        <WorkedExample
          title="£4,000 of side income, £350 of costs, alongside a £30,000 job"
          steps={[
            { label: "Tax claiming £350 of expenses", value: "£730" },
            { label: "Tax claiming the £1,000 allowance", value: "£600" },
          ]}
          total={{ label: "Saving from the allowance", value: "£130" }}
        />
        <p>
          If your turnover is £1,000 or less, the allowance covers all of it: no tax, and no need to register for Self
          Assessment for that income.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={10} kicker="Worked examples" title="Two worked examples">
        <h3>A freelance designer</h3>
        <p>
          Turnover of £55,000. Software and equipment £1,800, professional insurance and accountancy £900, marketing £1,200, a
          course £400, 1,500 business miles and over 100 hours a month working from home.
        </p>
        <WorkedExample
          title="Designer's expenses"
          steps={[
            { label: "Itemised costs", value: "£4,300" },
            { label: "Mileage: 1,500 × 45p", value: "£675" },
            { label: "Working from home: 12 × £26", value: "£312" },
            { label: "Total expenses", value: "£5,287" },
          ]}
          total={{ label: "Tax and NI saved", value: "£2,131" }}
        />
        <p>
          The saving is more than 26% because the expenses bring profit from above £50,270 down below it, so part of them saves
          tax at 42%.
        </p>
        <h3>A plumber</h3>
        <p>
          Turnover of £65,000. Parts and materials £14,000, insurance and accountancy £1,600, workwear £250, phone and software
          £700, and 12,000 business miles in a van on the mileage rate.
        </p>
        <WorkedExample
          title="Plumber's expenses"
          steps={[
            { label: "Itemised costs", value: "£16,550" },
            { label: "Mileage: 10,000 × 45p + 2,000 × 25p", value: "£5,000" },
            { label: "Total expenses", value: "£21,550" },
          ]}
          total={{ label: "Tax and NI saved", value: "£7,960" }}
        />
      </GuideSection>

      <GuideSection id="records" n={11} kicker="Paperwork" title="Records and receipts">
        <p>
          Keep a record of every expense: receipts, invoices, bank statements and, for mileage and home working, a log of miles
          and hours. Digital copies are fine.
        </p>
        <ul>
          <li>Keep records for at least five years after the 31 January filing deadline for the year.</li>
          <li>Note the business reason for anything that could look personal.</li>
          <li>For part-business costs, write down how you worked out the business share.</li>
          <li>
            If you are within Making Tax Digital, from April 2026 for income over £50,000, your records must be kept in
            compatible software.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="staff" n={12} kicker="People" title="Staff, family and subcontractors">
        <p>
          Wages you pay to employees are allowable, together with employer National Insurance and any workplace pension
          contributions you make for them. Payments to freelancers and subcontractors for work on your business are allowable
          too.
        </p>
        <p>
          You can employ a family member, but the pay must be for real work and at a rate you would pay anyone else for the
          same job. Paying a partner or child more than the work is worth, simply to use their tax-free allowance, is the kind
          of claim HMRC looks at closely. Keep timesheets and run payroll properly if you pay them as an employee.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={13} kicker="Timing" title="When an expense counts">
        <p>
          Under the <strong>cash basis</strong>, the default for sole traders since April 2024, an expense counts in the tax
          year you pay it. A software subscription paid on 1 April 2027 counts in 2026/27; paid on 10 April, it falls into
          2027/28.
        </p>
        <p>
          Under <strong>traditional accounting</strong>, an expense counts in the period it relates to, whenever you pay it.
          Stock is only deducted when it is sold, and unpaid bills at the year end are still included.
        </p>
        <p>
          The cash basis is simpler and suits most small businesses. Traditional accounting can suit businesses with large
          amounts of stock or long credit terms, and you can opt into it on your tax return.
        </p>
      </GuideSection>

      <GuideSection id="company" n={14} kicker="Companies" title="If you run a limited company">
        <p>
          The same broad test applies to a limited company, but the expenses belong to the company and reduce its Corporation
          Tax rather than your own Income Tax. There are some differences:
        </p>
        <ul>
          <li>the company cannot use the simplified flat rates for working from home or vehicle costs;</li>
          <li>it can pay you a tax-free £6 a week for working from home without receipts, or more with evidence of extra costs;</li>
          <li>it can pay you the approved mileage rates tax-free for business journeys in your own car;</li>
          <li>a director&rsquo;s salary and employer pension contributions are company expenses.</li>
        </ul>
        <p>
          See the <a href="/business/corporation-tax">Corporation Tax calculator</a> for what company expenses save.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "26p", label: "Saved per £1 of expenses, basic rate" },
            { value: "42p", label: "Saved per £1, higher rate" },
            { value: "£1,000", label: "Trading allowance instead of expenses" },
            { value: "£10 / £18 / £26", label: "Monthly working-from-home flat rates" },
            { value: "45p / 25p", label: "Mileage rates for cars and vans" },
            { value: "5 years", label: "How long to keep records after the deadline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
