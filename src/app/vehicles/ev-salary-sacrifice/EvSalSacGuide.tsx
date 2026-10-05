import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** EV salary sacrifice — the guide. Figures from src/lib/vehicles/tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How EV salary sacrifice works" },
  { id: "why-electric", title: "Why it only works well for electric cars" },
  { id: "example", title: "A worked example" },
  { id: "by-income", title: "Savings by income" },
  { id: "100k", title: "Earning over £100,000" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "future", title: "As company car tax rises" },
  { id: "included", title: "What the monthly cost includes" },
  { id: "knock-on", title: "Knock-on effects of a lower salary" },
  { id: "minimum-wage", title: "The minimum wage limit" },
  { id: "leaving", title: "Leaving your job or ending early" },
  { id: "charging", title: "Charging at home and work" },
  { id: "compare", title: "Comparing with other ways to get a car" },
  { id: "choosing", title: "Choosing a car" },
  { id: "steps", title: "How to sign up" },
  { id: "insurance", title: "Insurance and named drivers" },
  { id: "right-for-you", title: "Is it right for you?" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "employer-view", title: "How employers set up schemes" },
  { id: "ni-cap", title: "Will the pension salary sacrifice cap affect cars?" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "HMRC — Company car benefit: the appropriate percentage", href: "https://www.gov.uk/guidance/company-car-benefit-the-appropriate-percentage-480-appendix-2" },
  { label: "HMRC — Salary sacrifice for employers", href: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
  { label: "HMRC — Optional remuneration arrangements", href: "https://www.gov.uk/guidance/optional-remuneration-arrangements-480-appendix-12" },
  { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
];

export default function EvSalSacGuide() {
  return (
    <Guide
      kicker="The EV salary sacrifice guide"
      title="How electric car salary sacrifice saves you money"
      intro={
        <>
          Salary sacrifice lets you lease a new electric car through your employer and pay for it from your salary before tax and National
          Insurance. Because electric company cars are taxed very lightly, the saving can be large. This guide explains how it works, what you
          save at different incomes, and the catches to check before you sign.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You give up some salary, so you pay less income tax and National Insurance.</li>
          <li>You pay company car tax on the car, but electric cars are taxed at only 4% of the list price in 2026/27.</li>
          <li>On £45,000, a £450-a-month sacrifice for a £40,000 car costs about £350.67 a month in take-home pay, 22% less than leasing privately.</li>
          <li>Higher earners save more: about 30% on £70,000 and 44% on £110,000.</li>
        </ul>
        <KeyStats
          items={[
            { value: "4%", label: "Electric benefit rate 2026/27" },
            { value: "22%", label: "Saving at £45,000" },
            { value: "30%", label: "Saving at £70,000" },
            { value: "44%", label: "Saving at £110,000" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How EV salary sacrifice works">
        <ol>
          <li>Your employer leases an electric car, usually through a specialist provider.</li>
          <li>You agree to a lower salary for the length of the lease, typically two to four years.</li>
          <li>Because your salary is lower, you pay less income tax and National Insurance.</li>
          <li>The car is a company car, so you pay benefit in kind tax on it at 4% of its list price.</li>
        </ol>
        <p>
          The net cost to you is the salary you give up, less the tax and National Insurance you save, plus the company car tax. Your employer
          also saves employer National Insurance, and some pass part of that on.
        </p>
      </GuideSection>

      <GuideSection id="why-electric" n={3} kicker="Rules" title="Why it only works well for electric cars">
        <p>
          Cars provided through salary sacrifice are normally taxed on the higher of the company car benefit and the salary given up. These
          are called optional remuneration arrangement rules. Cars with CO2 emissions of 75 g/km or less are exempt, so an electric car is
          taxed only on its small company car benefit. A petrol car would be taxed on the full salary sacrificed, wiping out the saving.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Salary £45,000, sacrifice £450 a month, car list price £40,000"
          steps={[
            { label: "Salary given up: £450 × 12", value: "£5,400" },
            { label: "Income tax saved at 20%", value: "−£1,080" },
            { label: "National Insurance saved at 8%", value: "−£432" },
            { label: "Company car tax: £40,000 × 4% × 20%", value: "+£320" },
          ]}
          total={{ label: "Fall in take-home pay a year", value: "£4,208" }}
        />
        <p>
          That is £350.67 a month. Leasing the same car privately for £450 a month from take-home pay would cost £5,400 a year, so the saving is
          £1,192 a year, or 22%.
        </p>
      </GuideSection>

      <GuideSection id="by-income" n={5} kicker="Income" title="Savings by income">
        <Figure label="Net monthly cost of a £450 sacrifice" caption="£40,000 electric car, 2026/27, England.">
          <Bars
            items={[
              { label: "£45,000 salary", value: 350.67 },
              { label: "£70,000", value: 314.33 },
              { label: "£110,000", value: 251 },
              { label: "£150,000", value: 298.5 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
        <DataTable
          head={["Salary", "Tax and NI saved", "Car tax", "Net cost a year", "Saving vs private"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£45,000", "£1,512", "£320", "£4,208", "22%"],
            ["£70,000", "£2,268", "£640", "£3,772", "30%"],
            ["£110,000", "£3,348", "£960", "£3,012", "44%"],
            ["£150,000", "£2,538", "£720", "£3,582", "34%"],
          ]}
        />
        <p>
          Higher-rate taxpayers save 40% income tax but only 2% National Insurance on the sacrificed salary, so they save more overall than
          basic-rate taxpayers, even though their company car tax doubles.
        </p>
      </GuideSection>

      <GuideSection id="100k" n={6} kicker="High earners" title="Earning over £100,000">
        <p>
          Between £100,000 and £125,140, you lose £1 of Personal Allowance for every £2 of income, creating an effective tax rate of 60%. A
          sacrifice that brings your income down within this band saves tax at 60%. On £110,000, the same car costs just £251 a month, a 44%
          saving. Bringing income below £100,000 can also restore tax-free childcare and funded childcare hours.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={7} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scottish taxpayers save tax at Scottish rates. On £45,000 in Scotland, part of the sacrifice is saved at 42% and part at 21%, so the
          same car costs about £324.08 a month, a 28% saving. The company car tax is £336 a year.
        </p>
      </GuideSection>

      <GuideSection id="future" n={8} kicker="Future" title="As company car tax rises">
        <DataTable
          caption="£45,000 salary, £450 a month, £40,000 car"
          head={["Tax year", "Benefit rate", "Net cost a year"]}
          numeric={[1, 2]}
          rows={[
            ["2026/27", "4%", "£4,208"],
            ["2029/30", "9%", "£4,608"],
          ]}
        />
        <p>
          The rate for electric cars rises to 5% in 2027/28, 7% in 2028/29 and 9% in 2029/30. Even at 9%, the scheme in the example still
          saves £792 a year compared with a private lease. A higher-rate taxpayer would save £828.
        </p>
      </GuideSection>

      <GuideSection id="included" n={9} kicker="Packages" title="What the monthly cost includes">
        <p>
          Most schemes bundle the lease with insurance, servicing, tyres, breakdown cover and road tax. That makes them easier to compare with
          the full cost of running a car privately, not just a lease. When comparing, add the cost of insuring and maintaining the car yourself
          to any private lease quote.
        </p>
      </GuideSection>

      <GuideSection id="knock-on" n={10} kicker="Side effects" title="Knock-on effects of a lower salary">
        <CompareCards
          columns={[
            {
              name: "Can work against you",
              rows: [
                { label: "Pension", value: "Contributions based on salary may fall, unless your employer uses your pre-sacrifice pay" },
                { label: "Mortgage", value: "Lenders may look at the lower salary" },
                { label: "Statutory pay", value: "Maternity and sick pay can be lower" },
              ],
            },
            {
              name: "Can work for you",
              rows: [
                { label: "Student loan", value: "Repayments fall with your salary" },
                { label: "Child Benefit", value: "Less High Income Child Benefit Charge" },
                { label: "Allowances", value: "Personal Allowance and childcare support restored below £100,000" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="minimum-wage" n={11} kicker="Limits" title="The minimum wage limit">
        <p>
          A salary sacrifice cannot take your pay below the National Living Wage, which is £12.71 an hour for workers aged 21 and over from
          April 2026. For a full-time worker on 37.5 hours a week, that is about £24,785 a year. Lower earners may find a scheme limits the car
          they can choose, or turns them down.
        </p>
      </GuideSection>

      <GuideSection id="leaving" n={12} kicker="Risks" title="Leaving your job or ending early">
        <p>
          The lease is between your employer and the provider. If you leave, go on long-term sick leave or parental leave, most schemes have a
          policy covering early termination, but some charge a fee or require you to buy out the lease. Read the terms carefully, especially
          if you might change jobs in the next few years.
        </p>
        <Callout tone="warn" title="Ask about early termination cover">
          Check what happens if you resign, are made redundant, or go on maternity leave, and whether there is a cost.
        </Callout>
      </GuideSection>

      <GuideSection id="charging" n={13} kicker="Charging" title="Charging at home and work">
        <p>
          Many schemes offer a home charger, sometimes in the package. Charging at work is tax-free for employees. If your employer pays for
          home charging, it is not taxed either. For business journeys you pay for yourself, your employer can reimburse 7p a mile for home
          charging or 15p a mile for public charging from September 2026 without tax.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={14} kicker="Options" title="Comparing with other ways to get a car">
        <ul>
          <li><strong>Private lease:</strong> paid from take-home pay, so no tax saving.</li>
          <li><strong>Buying on finance:</strong> you own the car at the end, but pay from taxed income and carry the depreciation risk.</li>
          <li><strong>Company car:</strong> no salary sacrifice, but you still pay company car tax.</li>
          <li><strong>Cash allowance:</strong> taxed as salary, with National Insurance.</li>
        </ul>
        <p>The <a href="/vehicles/benefit-in-kind">company car tax calculator</a> shows the tax on other cars.</p>
      </GuideSection>

      <GuideSection id="choosing" n={15} kicker="Choice" title="Choosing a car">
        <p>
          The company car tax depends on the list price, so a pricier car costs more in tax as well as in salary. With a 4% rate, each extra
          £10,000 of list price adds £400 to the taxable benefit: £80 a year in tax for a basic-rate taxpayer and £160 for a higher-rate
          taxpayer. That is modest compared with the extra lease cost, which usually matters more.
        </p>
        <p>
          Look at the real-world range, the charging speed and the boot space as well as the price. A car that suits your journeys for the
          next three or four years is worth more than a slightly cheaper one that does not.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={16} kicker="How to" title="How to sign up">
        <ol>
          <li>Check your employer offers a scheme. Many use a provider with an online quote tool.</li>
          <li>Get a quote for the car, lease length and mileage you want. Note the gross monthly sacrifice.</li>
          <li>Enter it here with your salary and the car&rsquo;s list price to see your real cost.</li>
          <li>Read the terms about early termination, mileage limits and damage charges at the end.</li>
          <li>Sign the salary sacrifice agreement. Your payslip will show a lower salary and a company car benefit.</li>
        </ol>
        <p>Delivery often takes a few weeks, and the sacrifice starts when you get the car.</p>
      </GuideSection>

      <GuideSection id="insurance" n={17} kicker="Insurance" title="Insurance and named drivers">
        <p>
          Insurance is normally included and arranged by the provider. Check who else can drive the car: many schemes let you add a partner or
          family members, sometimes for a small extra charge. Check the excess you would pay after a claim, and whether a courtesy car is
          included if yours is off the road.
        </p>
      </GuideSection>

      <GuideSection id="right-for-you" n={18} kicker="Fit" title="Is it right for you?">
        <CompareCards
          columns={[
            {
              name: "Likely to suit",
              rows: [
                { label: "Income", value: "Comfortably above the minimum wage" },
                { label: "Job", value: "Settled, with no plan to move soon" },
                { label: "Driving", value: "Within the scheme's mileage limit" },
              ],
            },
            {
              name: "Think carefully",
              rows: [
                { label: "Mortgage", value: "Applying soon, when a lower salary matters" },
                { label: "Family", value: "Maternity or paternity leave coming up" },
                { label: "Pension", value: "Contributions based on the lower salary" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Comparing with a lease price alone.</strong> Add insurance, servicing and tyres to a private quote before comparing.</li>
          <li><strong>Forgetting the company car tax.</strong> It is small, but it rises every year to 2029/30.</li>
          <li><strong>Ignoring the end-of-lease condition.</strong> Damage beyond fair wear and tear is charged when the car goes back.</li>
          <li><strong>Not checking the pension.</strong> A lower pensionable salary can quietly cost more than the car saves.</li>
          <li><strong>Choosing a high mileage you will not use.</strong> Higher mileage limits raise the monthly cost.</li>
        </ul>
      </GuideSection>

      <GuideSection id="employer-view" n={20} kicker="Employers" title="How employers set up schemes">
        <p>
          Employers usually work with a specialist provider who arranges the lease, insurance and servicing and handles the paperwork. The
          employer saves 15% employer National Insurance on the salary sacrificed but pays 15% Class 1A National Insurance on the car benefit,
          which is small for an electric car. Many employers pass some of the saving on to employees or use it to cover the cost of the scheme.
        </p>
        <p>
          If your employer does not offer a scheme, it is worth asking. Providers often set them up at little or no cost to the employer, and
          they are popular as a benefit that helps staff move to electric cars.
        </p>
      </GuideSection>

      <GuideSection id="ni-cap" n={21} kicker="Rules" title="Will the pension salary sacrifice cap affect cars?">
        <p>
          From April 2029, the government plans to charge National Insurance on pension contributions made through salary sacrifice above
          £2,000 a year. That change is about pensions. It does not apply to electric cars, which keep their full tax and National Insurance
          saving under current rules.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={22} kicker="FAQs" title="Common questions">
        <h3>Can I get a plug-in hybrid through salary sacrifice?</h3>
        <p>Yes. Plug-in hybrids at 75 g/km or less are also exempt from the optional remuneration rules, but they are taxed at 4% to 16% depending on electric range in 2026/27, and 18% from April 2028, so the saving is usually smaller.</p>
        <h3>Does my employer save money too?</h3>
        <p>Yes. They save employer National Insurance at 15% on the salary sacrificed, but pay 15% on the car benefit.</p>
        <h3>Can I buy the car at the end?</h3>
        <p>Not usually. The car goes back at the end of the lease, though some schemes offer a purchase option.</p>
        <h3>Does salary sacrifice affect my tax code?</h3>
        <p>Your salary is lower, so less tax is taken through payroll. The company car benefit is either payrolled or collected through your tax code.</p>
        <h3>What happens at the end of the lease?</h3>
        <p>The car is inspected and collected. You can usually choose a new car through the scheme, and your salary returns to normal if you do not.</p>
        <h3>Is the saving guaranteed?</h3>
        <p>The tax and National Insurance rates and company car percentages can change. The rates for electric cars up to 2029/30 have already been set.</p>
        <h3>Can part-time workers join a scheme?</h3>
        <p>Usually yes, as long as your pay after the sacrifice stays above the National Living Wage for the hours you work. Schemes check this when you apply.</p>
        <h3>Is my car insured if I change jobs?</h3>
        <p>Cover usually continues until the car is returned or the lease is transferred. Check the early termination terms with the provider.</p>
        <h3>Does the car count towards my income for mortgage applications?</h3>
        <p>Lenders usually look at your salary after the sacrifice, and some also count the monthly cost. Tell your lender about the scheme.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={23} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4%", label: "Electric benefit rate 2026/27" },
            { value: "9%", label: "Electric benefit rate 2029/30" },
            { value: "75 g/km", label: "Optional remuneration limit" },
            { value: "8% / 2%", label: "Employee NI saved" },
            { value: "60%", label: "Effective rate £100k to £125,140" },
            { value: "£12.71", label: "National Living Wage an hour" },
            { value: "£350.67", label: "Example cost a month at £45,000" },
            { value: "15%", label: "Employer NI" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
