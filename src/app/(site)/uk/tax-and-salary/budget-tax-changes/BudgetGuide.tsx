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

/** Announced tax changes, 2026/27 to 2030/31 — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what-counts", title: "What this calculator includes" },
  { id: "timeline", title: "The changes, year by year" },
  { id: "freeze", title: "Frozen thresholds to April 2031" },
  { id: "fiscal-drag", title: "Fiscal drag: why a pay rise costs more tax" },
  { id: "freeze-examples", title: "The freeze at different salaries" },
  { id: "ni", title: "National Insurance thresholds" },
  { id: "savings", title: "Savings interest: 22%, 42% and 47%" },
  { id: "savings-allowances", title: "Allowances that still protect savers" },
  { id: "isa", title: "Cash ISAs from April 2027" },
  { id: "dividends", title: "Dividends: the April 2026 rise" },
  { id: "property", title: "Rental income: the new property rates" },
  { id: "finance-costs", title: "Mortgage interest relief for landlords" },
  { id: "salary-sacrifice", title: "The salary sacrifice NI cap from April 2029" },
  { id: "student-loans", title: "Plan 2 student loans" },
  { id: "pensions-iht", title: "Pensions and inheritance tax from April 2027" },
  { id: "scotland", title: "Scotland and Wales" },
  { id: "not-modelled", title: "What is not included" },
  { id: "budget-2026", title: "The Budget on 28 October 2026" },
  { id: "reduce", title: "Ways to soften the changes" },
  { id: "reading-results", title: "How to read your results" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Budget 2025", href: "https://www.gov.uk/government/publications/budget-2025-document" },
  {
    label: "GOV.UK — Maintaining Income Tax and NI thresholds until 5 April 2031",
    href: "https://www.gov.uk/government/publications/maintaining-income-tax-and-equivalent-national-insurance-contributions-thresholds-until-5-april-2031",
  },
  { label: "GOV.UK — Changes to tax rates for property, savings and dividend income", href: "https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-and-dividend-income" },
  {
    label: "GOV.UK — Salary sacrifice reform for pension contributions from 6 April 2029",
    href: "https://www.gov.uk/government/publications/salary-sacrifice-reform-for-pension-contributions-effective-from-6-april-2029",
  },
  { label: "GOV.UK — Cash ISA limit reduction", href: "https://www.gov.uk/government/publications/reduction-in-the-cash-individual-savings-account-isa-limit" },
  { label: "GOV.UK — Budget 2026 date: Chancellor's letter to the Treasury Committee", href: "https://www.gov.uk/government/publications/chancellor-letter-to-the-treasury-select-committee-tsc-budget-2026-date" },
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
];

export default function BudgetGuide() {
  return (
    <Guide
      kicker="The tax changes guide"
      title="What the announced tax changes mean for you, 2026 to 2031"
      intro={
        <>
          Several tax changes have already been announced for the next few years: frozen thresholds, higher rates on savings and rental income, a cap on salary
          sacrifice and more. They arrive at different times and hit different kinds of income. This guide sets them out year by year, with worked examples from the
          calculator, and explains what is and is not included. It covers only measures announced by October 2026.
        </>
      }
      meta={["2026/27 to 2030/31", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          For most employees, the announced changes do not change the tax on the same salary. The Personal Allowance, the higher-rate threshold and the National
          Insurance thresholds are all frozen until April 2031. Someone earning £45,000 every year pays £9,080.40 in Income Tax and NI in 2026/27 and the same in
          2030/31.
        </p>
        <p>The changes bite in three ways:</p>
        <ul>
          <li>
            <strong>When your pay rises</strong>, frozen thresholds take a bigger share of it. This is the largest effect for most people.
          </li>
          <li>
            <strong>If you have savings interest or rental profit</strong>, the rates on that income go up by 2 percentage points from April 2027.
          </li>
          <li>
            <strong>If you sacrifice more than £2,000 a year</strong>{" "}into a pension, you pay National Insurance on the excess from April 2029.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="what-counts" n={2} kicker="Scope" title="What this calculator includes">
        <p>
          The calculator only uses measures the government has announced and published on GOV.UK, mostly in Budget 2025 (26 November 2025) and its tax documents. It does
          not guess at what future Budgets might do. Where something has not been announced, such as Scottish rates after 2026/27, it holds today&rsquo;s figures and says
          so.
        </p>
        <p>
          It compares each tax year from 2026/27 to 2030/31, the last year of the threshold freeze. It covers salary, salary sacrifice pension contributions,
          personal pension contributions, savings interest, dividends, rental profit and mortgage interest, and Plan 2 student loans. For a full payslip in the current
          year, use the <a href="/uk/tax-and-salary/salary-calculator">salary calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={3} kicker="Timeline" title="The changes, year by year">
        <Timeline
          items={[
            { when: "6 April 2026", what: "Dividend rates rise", detail: "Ordinary rate 8.75% to 10.75%, upper rate 33.75% to 35.75%. Additional rate stays 39.35%." },
            { when: "6 April 2027", what: "Savings and property rates rise", detail: "Both become 22%, 42% and 47%. The cash ISA limit for under-65s falls to £12,000. Unused pensions come into inheritance tax." },
            { when: "6 April 2028", what: "Freeze extended", detail: "Thresholds were due to rise from here; they now stay frozen." },
            { when: "6 April 2029", what: "Salary sacrifice NI cap", detail: "National Insurance on pension salary sacrifice above £2,000 a year, for employees and employers." },
            { when: "5 April 2031", what: "Freeze ends", detail: "The last day of the frozen Personal Allowance, bands and NI thresholds, unless a later Budget changes it." },
          ]}
        />
      </GuideSection>

      <GuideSection id="freeze" n={4} kicker="Thresholds" title="Frozen thresholds to April 2031">
        <p>
          The Personal Allowance has been £12,570 since April 2021. The basic rate limit is £37,700, so the higher rate starts at £50,270, and the additional rate starts
          at £125,140. Budget 2025 extended the freeze by three more years, from April 2028 to April 2031.
        </p>
        <p>
          Normally these thresholds would rise with inflation each April. Holding them still is a tax rise that does not change any rate: as wages and prices rise, more
          of everyone&rsquo;s income is taxed, and more of it at higher rates.
        </p>
        <Callout title="A freeze is not a cut">
          Your tax only rises if your income rises. At the same salary, a freeze changes nothing. But with inflation, the same salary buys less, so most people&rsquo;s pay
          does rise, and that is where the freeze takes its share.
        </Callout>
      </GuideSection>

      <GuideSection id="fiscal-drag" n={5} kicker="Fiscal drag" title="Fiscal drag: why a pay rise costs more tax">
        <p>
          Economists call this &ldquo;fiscal drag&rdquo;. The calculator measures it by comparing your tax with frozen thresholds against your tax if every threshold had
          risen in line with your pay. The difference is the cost of the freeze to you.
        </p>
        <WorkedExample
          title="Worked example: £45,000 salary, 3% pay rises each year"
          steps={[
            { label: "Salary in 2026/27", value: "£45,000" },
            { label: "Salary in 2030/31", value: "£50,648" },
            { label: "Income Tax and NI in 2026/27", value: "£9,080.40" },
            { label: "Income Tax and NI in 2030/31", value: "£10,714.72" },
            { label: "Of which: cost of the freeze in 2030/31", value: "£494.65" },
          ]}
          total={{ label: "Rise in yearly tax by 2030/31", value: "£1,634.32" }}
        />
        <p>
          Most of the rise is ordinary tax on a higher salary. The £494.65 is the extra caused by thresholds standing still, and it grows each year: £105.59 in 2027/28,
          £214.34 in 2028/29, £326.36 in 2029/30 and £494.65 in 2030/31. In 2030/31 this person&rsquo;s salary passes £50,270 and part of it is taxed at 40%.
        </p>
      </GuideSection>

      <GuideSection id="freeze-examples" n={6} kicker="Who pays most" title="The freeze at different salaries">
        <p>The cost depends on where your pay sits. These figures assume 3% pay rises each year, and show the cost of the freeze in 2030/31 alone:</p>
        <Figure label="Cost of the freeze in 2030/31, with 3% pay rises" caption="England, Wales or Northern Ireland, no pension or student loan.">
          <Bars
            items={[
              { label: "£30,000", value: 441.74 },
              { label: "£45,000", value: 494.65 },
              { label: "£50,000", value: 1282.5 },
              { label: "£80,000", value: 1325.05 },
            ]}
          />
        </Figure>
        <p>
          The jump at £50,000 is the higher-rate threshold: with frozen thresholds, more and more of the pay rise falls into the 40% band. People already well inside
          the higher-rate band, like the £80,000 earner, lose a similar amount. Use the <a href="/uk/tax-and-salary/pay-rise">pay rise calculator</a>{" "}to see what a
          single rise is worth after tax.
        </p>
      </GuideSection>

      <GuideSection id="ni" n={7} kicker="National Insurance" title="National Insurance thresholds">
        <p>
          Employee National Insurance is 8% on earnings between £12,570 and £50,270 and 2% above that. These thresholds are tied to the Income Tax ones and are frozen
          to April 2031 too. So is the £5,000 threshold above which employers pay 15%.
        </p>
        <p>
          With no change in the rates, NI on the same salary does not change. Our £45,000 earner pays £2,594.40 in every year. With 3% pay rises, it rises to £3,023.56
          by 2030/31.
        </p>
      </GuideSection>

      <GuideSection id="savings" n={8} kicker="Savings" title="Savings interest: 22%, 42% and 47%">
        <p>
          From 6 April 2027, taxable savings interest is taxed at 22% for basic-rate taxpayers, 42% for higher-rate and 47% for additional-rate: 2 points more at each
          rate. The change applies across the whole UK, including Scotland, because savings income is taxed at UK rates.
        </p>
        <DataTable
          caption="Tax on £3,000 of savings interest, same salary each year"
          head={["Salary", "2026/27", "2027/28 on", "Extra a year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£30,000", "£400", "£440", "£40"],
            ["£60,000", "£1,000", "£1,050", "£50"],
            ["£130,000", "£1,350", "£1,410", "£60"],
          ]}
        />
        <p>
          The rise is modest because the allowances in the next section still cover the first part of most people&rsquo;s interest. It only applies to interest above
          those allowances.
        </p>
      </GuideSection>

      <GuideSection id="savings-allowances" n={9} kicker="Allowances" title="Allowances that still protect savers">
        <p>Three allowances keep savings interest tax-free before the new rates apply:</p>
        <ul>
          <li>
            the <strong>Personal Savings Allowance</strong>: £1,000 of interest for basic-rate taxpayers, £500 for higher-rate, none for additional-rate;
          </li>
          <li>
            the <strong>starting rate for savings</strong>: up to £5,000 at 0% if your other income is low, held at £5,000 until April 2031;
          </li>
          <li>any unused Personal Allowance.</li>
        </ul>
        <p>
          The <a href="/uk/investing/personal-savings-allowance">Personal Savings Allowance calculator</a>{" "}shows how much of your interest is covered. Interest inside an
          ISA is tax-free and does not use these allowances at all.
        </p>
      </GuideSection>

      <GuideSection id="isa" n={10} kicker="ISAs" title="Cash ISAs from April 2027">
        <p>
          From 6 April 2027 the most you can pay into cash ISAs each year falls to £12,000 if you are under 65. The overall ISA limit stays £20,000, so you can still put
          the other £8,000 into a stocks and shares ISA. Savers aged 65 or over keep a £20,000 cash ISA limit. The regulations were laid before Parliament in September
          2026.
        </p>
        <p>
          With savings rates rising at the same time, moving savings into an ISA before and after April 2027 is the simplest way to avoid the extra tax.
        </p>
      </GuideSection>

      <GuideSection id="dividends" n={11} kicker="Dividends" title="Dividends: the April 2026 rise">
        <p>
          Dividend rates rose by 2 points on 6 April 2026: the ordinary rate from 8.75% to 10.75% and the upper rate from 33.75% to 35.75%. The additional rate stays at
          39.35%, and the dividend allowance stays at £500.
        </p>
        <p>
          Because this happened in April 2026, it is already in every year the calculator shows. The calculator also shows what it added compared with the old rates.
          Someone earning £45,000 with £5,000 of dividends pays £90 a year more; someone on £30,000 with £2,000 of dividends pays £30 more. No further dividend changes
          have been announced. The <a href="/uk/investing/dividend-tax">dividend tax calculator</a>{" "}works through the 2026/27 rules in detail.
        </p>
      </GuideSection>

      <GuideSection id="property" n={12} kicker="Rental income" title="Rental income: the new property rates">
        <p>
          From 6 April 2027, property income has its own rates in England, Wales and Northern Ireland: 22% basic, 42% higher and 47% additional. Allowances and reliefs
          are set against your other income first, such as wages and pensions, and only then against rental profit, so more of a landlord&rsquo;s rent is likely to be
          taxed.
        </p>
        <CompareCards
          columns={[
            {
              name: "2026/27",
              rows: [
                { label: "Basic rate", value: "20%" },
                { label: "Higher rate", value: "40%" },
                { label: "Additional rate", value: "45%" },
                { label: "Finance cost relief", value: "20%" },
              ],
            },
            {
              name: "From 2027/28",
              rows: [
                { label: "Property basic rate", value: "22%" },
                { label: "Property higher rate", value: "42%" },
                { label: "Property additional rate", value: "47%" },
                { label: "Finance cost relief", value: "22%" },
              ],
            },
          ]}
        />
        <p>
          The rise is 2 points at every rate, so the extra tax is 2% of your taxable rental profit. On £12,000 of rental profit that is £240 a year. Check how this changes
          your returns with the <a href="/uk/property/buy-to-let-yield">buy-to-let yield calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="finance-costs" n={13} kicker="Landlords" title="Mortgage interest relief for landlords">
        <p>
          Landlords of homes cannot deduct mortgage interest from rental profit. Instead they get a tax reduction of 20% of the interest. From April 2027 that reduction
          is worked out at the property basic rate, 22%, which softens the rise for landlords with mortgages.
        </p>
        <WorkedExample
          title="Worked example: £40,000 salary, £12,000 rental profit, £6,000 mortgage interest"
          steps={[
            { label: "Extra tax on rental profit at +2 points", value: "+£240" },
            { label: "Finance cost relief: 20% then 22% of £6,000", note: "£1,200 to £1,320", value: "−£120" },
          ]}
          total={{ label: "Net rise in tax from 2027/28", value: "£120 a year" }}
        />
        <p>
          A higher-rate landlord on £60,000 with the same rental figures also pays £120 more: the property higher rate rises by the same 2 points, and the relief is the
          same. The calculator does not model the rule that limits finance cost relief when profits are low.
        </p>
      </GuideSection>

      <GuideSection id="salary-sacrifice" n={14} kicker="Pensions" title="The salary sacrifice NI cap from April 2029">
        <p>
          Salary sacrifice lets you give up salary in return for an employer pension contribution. Today you save Income Tax and National Insurance on all of it. From 6
          April 2029, sacrifice above £2,000 a year will pay employee and employer Class 1 National Insurance in the usual way. Income Tax relief is unchanged.
        </p>
        <DataTable
          caption="Extra National Insurance from 2029/30, same salary"
          head={["Salary and sacrifice", "Sacrifice a year", "Above £2,000", "Your extra NI", "Employer's extra NI"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£30,000 at 5%", "£1,500", "£0", "£0", "£0"],
            ["£40,000 at 10%", "£4,000", "£2,000", "£160", "£300"],
            ["£60,000 at 8%", "£4,800", "£2,800", "£56", "£420"],
          ]}
        />
        <p>
          Higher earners pay less extra NI on the same excess, because their pay above £50,270 is charged at 2% rather than 8%. The employer&rsquo;s cost matters too:
          some employers pass part of their NI saving into staff pensions, and may stop. HMRC says the details will be set in regulations. See what salary sacrifice
          saves today with the <a href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="student-loans" n={15} kicker="Student loans" title="Plan 2 student loans">
        <p>
          The Plan 2 repayment threshold is £29,385 in 2026/27 and is held at that level for three years from April 2027. Repayments are 9% of income above it. As pay
          rises, repayments rise faster than they would if the threshold kept pace.
        </p>
        <p>
          With 3% pay rises, someone on £35,000 repays £505.35 in 2026/27 and £900.70 in 2030/31. The calculator assumes the threshold stays at £29,385 in 2030/31 as
          well, because nothing has been announced for that year. Other plans are not modelled here.
        </p>
      </GuideSection>

      <GuideSection id="pensions-iht" n={16} kicker="Inheritance" title="Pensions and inheritance tax from April 2027">
        <p>
          From 6 April 2027, most unused pension funds and death benefits count towards the value of an estate for inheritance tax. This does not change the tax on your
          pay, so the calculator does not include it, but it matters if you have been treating a pension as a way to pass on wealth. Inheritance tax thresholds are also
          frozen, now to April 2031. The <a href="/uk/life/inheritance-tax">inheritance tax calculator</a>{" "}shows how an estate is taxed.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={17} kicker="Devolution" title="Scotland and Wales">
        <p>
          In Scotland, the Scottish Parliament sets the rates and bands on wages, pensions and rental profit. It has not set them for 2027/28 onwards, so the calculator
          holds the 2026/27 Scottish figures. Savings and dividends are taxed at UK rates everywhere, so those changes apply in Scotland.
        </p>
        <p>
          The new property rates apply in England, Wales and Northern Ireland. The UK government has said it will work with the Scottish and Welsh governments so they can
          set their own property income rates, so this may change for Welsh and Scottish landlords.
        </p>
      </GuideSection>

      <GuideSection id="not-modelled" n={18} kicker="Limits" title="What is not included">
        <p>To keep the calculator honest, it leaves out:</p>
        <ul>
          <li>anything not yet announced, including whatever the 28 October 2026 Budget contains;</li>
          <li>Scottish rate changes after 2026/27, and Plan 1, 4, 5 and Postgraduate loan thresholds after 2026/27;</li>
          <li>the High Income Child Benefit Charge, the Marriage Allowance and other personal circumstances;</li>
          <li>
            changes that do not affect income tax on pay, savings or rent, such as the council tax surcharge on homes worth £2 million or more in England from April
            2028, and the per-mile charge on electric cars from April 2028.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="budget-2026" n={19} kicker="What next" title="The Budget on 28 October 2026">
        <p>
          The Chancellor has confirmed the next Budget for Wednesday 28 October 2026, with the Office for Budget Responsibility&rsquo;s forecast on the same day. Any
          new tax measures will be announced then. We will update this calculator on Budget day with whatever is confirmed, and leave out speculation before it.
        </p>
        <WorkedExample
          title="Example: a mixed income, today's announced rules, 3% pay rises"
          steps={[
            { label: "Income in 2026/27", note: "£55,000 salary with 6% salary sacrifice, £2,000 savings interest, £3,000 dividends, £8,000 rental profit, £3,000 mortgage interest", value: "£68,000" },
            { label: "Savings rates, by 2030/31", value: "+£30" },
            { label: "Property rates and relief, by 2030/31", value: "+£100" },
            { label: "Salary sacrifice cap, at the same pay", value: "+£26" },
            { label: "Cost of the freeze, 2030/31", value: "£1,378.86" },
          ]}
          total={{ label: "Rise in yearly tax by 2030/31", value: "£2,889.58" }}
        />
      </GuideSection>

      <GuideSection id="reduce" n={20} kicker="Planning" title="Ways to soften the changes">
        <p>None of these suits everyone, but they are the usual places to start:</p>
        <ul>
          <li>
            <strong>Use your ISA allowance.</strong>{" "}Interest and dividends inside an ISA are tax-free, so the new savings rates and the dividend rise do not touch them.
          </li>
          <li>
            <strong>Pay more into a pension.</strong>{" "}Contributions still get Income Tax relief at your top rate, which helps most when a pay rise takes you over
            £50,270 or £100,000. Salary sacrifice up to £2,000 a year stays free of NI after April 2029.
          </li>
          <li>
            <strong>Share income with a spouse or civil partner.</strong>{" "}Savings or rental property held jointly, or by the partner who pays less tax, can use two sets
            of allowances. Transfers between spouses are usually free of Capital Gains Tax, but take advice on property.
          </li>
          <li>
            <strong>Check your tax code each year.</strong>{" "}With frozen thresholds and more people paying tax on savings, HMRC adjusts more codes. A wrong code means
            the wrong tax.
          </li>
        </ul>
        <p>
          Before acting on any plan, think about access to your money, fees and your wider circumstances. For larger sums, a regulated financial adviser or tax adviser
          can help.
        </p>
      </GuideSection>

      <GuideSection id="reading-results" n={21} kicker="Using the calculator" title="How to read your results">
        <p>The calculator shows the same information in a few ways:</p>
        <ul>
          <li>
            <strong>The headline figure</strong>{" "}is the change in your yearly Income Tax, NI and student loan between 2026/27 and 2030/31, including any pay rise you
            entered.
          </li>
          <li>
            <strong>From the rule changes</strong>{" "}holds your income still and shows only what the new rates and the salary sacrifice cap add.
          </li>
          <li>
            <strong>Cost of the freeze</strong>{" "}appears when you enter a pay rise. It is the extra tax compared with every threshold, allowance and limit rising in line
            with your pay.
          </li>
          <li>
            <strong>Take-home</strong>{" "}is what is left of all your income after tax, NI, student loan, pension contributions and mortgage interest.
          </li>
        </ul>
        <p>
          Leave the pay rise at 0% first to see the rule changes on their own, then try a realistic rise. Every input is saved in the address bar, so you can share or
          revisit your figures after the Budget.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "£12,570", label: "Personal Allowance, frozen to April 2031" },
            { value: "£50,270", label: "Higher-rate threshold, frozen to April 2031" },
            { value: "22/42/47%", label: "Savings and property rates from April 2027" },
            { value: "10.75% / 35.75%", label: "Dividend ordinary and upper rates from April 2026" },
            { value: "£2,000", label: "Salary sacrifice free of NI from April 2029" },
            { value: "£12,000", label: "Cash ISA limit for under-65s from April 2027" },
            { value: "£29,385", label: "Plan 2 threshold, held from April 2027" },
            { value: "28 Oct 2026", label: "Next Budget" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
