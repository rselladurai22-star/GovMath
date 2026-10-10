import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The state income tax guide. Every figure comes from stateTax() in src/lib/us/state-tax-2026.ts (wages only, tax year 2026). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "three-kinds", title: "Three kinds of state" },
  { id: "no-tax", title: "The nine states with no wage tax" },
  { id: "flat", title: "The flat-tax states" },
  { id: "graduated", title: "Graduated states and top rates" },
  { id: "how-worked-out", title: "How a state works out your tax" },
  { id: "example-ca", title: "Example: single in California on $75,000" },
  { id: "example-ny", title: "Example: a New York family on $150,000" },
  { id: "ranking-75k", title: "Every state at $75,000" },
  { id: "ranking-family", title: "A family on $150,000" },
  { id: "income-ladder", title: "How the bill grows with income" },
  { id: "marginal", title: "Marginal and effective rates" },
  { id: "dependents", title: "Dependents and filing status" },
  { id: "401k", title: "401(k) contributions and Pennsylvania" },
  { id: "local", title: "City and county income taxes" },
  { id: "two-states", title: "Living in one state, working in another" },
  { id: "federal", title: "Deducting state tax on your federal return" },
  { id: "moving", title: "Moving to save tax" },
  { id: "other-income", title: "Income this calculator leaves out" },
  { id: "changes-2026", title: "What changed for 2026" },
  { id: "limits", title: "What the calculator simplifies" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "Tax Foundation: State Individual Income Tax Rates and Brackets, 2026", href: "https://taxfoundation.org/data/all/state/state-income-tax-rates/" },
  { label: "Federation of Tax Administrators: State tax agencies", href: "https://taxadmin.org/state-tax-agencies/" },
  { label: "California Franchise Tax Board: Tax rates and credits", href: "https://www.ftb.ca.gov/file/personal/tax-calculator-tables-rates.asp" },
  { label: "California EDD: SDI contribution rates", href: "https://edd.ca.gov/en/payroll_taxes/rates_and_withholding/" },
  { label: "New York State Department of Taxation and Finance: Income tax rates", href: "https://www.tax.ny.gov/pit/file/tax-tables/" },
  { label: "IRS: Topic no. 503, Deductible taxes", href: "https://www.irs.gov/taxtopics/tc503" },
  { label: "Census Bureau: American Community Survey (property tax medians)", href: "https://www.census.gov/programs-surveys/acs" },
];

export default function StateTaxGuide() {
  return (
    <Guide
      kicker="The state income tax guide"
      title="State income tax in 2026: how every state taxes your paycheck"
      intro={
        <>
          Federal income tax is the same wherever you live. State income tax is not: on the same $75,000 salary it ranges from nothing in Texas or Florida to more than $5,700 in Oregon. This
          guide explains the three kinds of state tax system, how a state gets from your wages to a tax bill, and how all 50 states and DC compare at different incomes in 2026.
        </>
      }
      meta={["Tax year 2026", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Nine states don&rsquo;t tax wages at all: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming.</li>
          <li>Fourteen use a single flat rate, from 2.5% in Arizona to 4.99% in Georgia.</li>
          <li>The other 27 states and DC use brackets, with top rates up to 13.3% in California.</li>
          <li>On $75,000 of wages, single, the median state with an income tax takes {usd(2830)} for 2026.</li>
        </ul>
        <KeyStats
          items={[
            { value: "9", label: "States with no tax on wages" },
            { value: "14", label: "Flat-tax states" },
            { value: "13.3%", label: "Top rate, California" },
            { value: usd(2830), label: "Median state tax on $75,000, single" },
          ]}
        />
      </GuideSection>

      <GuideSection id="three-kinds" n={2} kicker="Basics" title="Three kinds of state">
        <p>
          Every state falls into one of three groups. Some have no income tax on wages. Some charge one flat percentage on all taxable income above their deductions. The rest work like the
          federal system, with brackets that charge higher rates on higher slices of income. Within each group the details differ a lot: what you can deduct, whether you get a personal
          exemption or a credit, and whether the brackets double for married couples.
        </p>
        <p>
          That is why a headline rate on its own tells you little. Illinois&rsquo;s flat 4.95% takes more from a $50,000 single worker than California&rsquo;s graduated system with its
          13.3% top rate, because California&rsquo;s low brackets are very low at that income.
        </p>
      </GuideSection>

      <GuideSection id="no-tax" n={3} kicker="Zero" title="The nine states with no wage tax">
        <p>
          Alaska, Florida, Nevada, South Dakota, Texas and Wyoming have no personal income tax. Tennessee and New Hampshire used to tax interest and dividends but have repealed those taxes,
          so neither taxes wages. Washington doesn&rsquo;t tax wages either, though it has a tax on large long-term capital gains.
        </p>
        <p>
          These states raise money in other ways: higher sales taxes (Tennessee and Washington), higher property taxes (Texas and New Hampshire) or taxes on oil, gas and tourism (Alaska,
          Wyoming, Nevada and Florida). The <a href="/us/taxes/sales-tax-calculator">sales tax calculator</a>{" "}and the{" "}
          <a href="/us/housing/property-tax-calculator">property tax calculator</a>{" "}show that side of the bill.
        </p>
      </GuideSection>

      <GuideSection id="flat" n={4} kicker="One rate" title="The flat-tax states">
        <DataTable
          caption="Flat income tax rates, 2026"
          head={["State", "Rate"]}
          numeric={[1]}
          rows={[
            ["Arizona", "2.50%"],
            ["Ohio", "2.75%"],
            ["Indiana", "2.95%"],
            ["Louisiana", "3.00%"],
            ["Pennsylvania", "3.07%"],
            ["Kentucky", "3.50%"],
            ["Iowa", "3.80%"],
            ["North Carolina", "3.99%"],
            ["Mississippi", "4.00%"],
            ["Michigan", "4.25%"],
            ["Colorado", "4.40%"],
            ["Utah", "4.45%"],
            ["Illinois", "4.95%"],
            ["Georgia", "4.99%"],
          ]}
        />
        <p>
          A flat rate does not mean everyone pays the same share. Most flat states take a standard deduction or an exemption first, so low earners pay a smaller share of their pay.
          Colorado starts from federal taxable income, so it uses the federal standard deduction ($16,100 single). Georgia gives $15,000 single, North Carolina $12,750, Arizona $8,350. Illinois
          and Ohio give small exemptions instead, and Pennsylvania gives nothing at all.
        </p>
      </GuideSection>

      <GuideSection id="graduated" n={5} kicker="Brackets" title="Graduated states and top rates">
        <p>The highest top rates are concentrated on the coasts. These rates apply only to the slice of income in the top bracket, often far above a typical salary.</p>
        <Bars
          format={(n) => `${n.toFixed(2)}%`}
          items={[
            { label: "California", value: 13.3 },
            { label: "Hawaii", value: 11 },
            { label: "New York", value: 10.9 },
            { label: "New Jersey", value: 10.75 },
            { label: "District of Columbia", value: 10.75 },
            { label: "Oregon", value: 9.9 },
            { label: "Minnesota", value: 9.85 },
            { label: "Massachusetts", value: 9 },
            { label: "Vermont", value: 8.75 },
          ]}
        />
        <p>
          At the other end, North Dakota&rsquo;s brackets top out at 2.5% and start so high that a single worker on $50,000 owes nothing. Oregon is the odd one out: its top rate is only
          the sixth highest, but it reaches 8.75% on taxable income above about $11,400, so middle earners pay more there than anywhere else.
        </p>
      </GuideSection>

      <GuideSection id="how-worked-out" n={6} kicker="Method" title="How a state works out your tax">
        <ol>
          <li>Start from your wages, usually after pre-tax 401(k) and health insurance deductions (the same figure as box 16 of your W-2).</li>
          <li>Take off the state&rsquo;s standard deduction, if it has one.</li>
          <li>Take off personal and dependent exemptions, if the state uses them.</li>
          <li>Apply the state&rsquo;s rate or brackets to what is left: your state taxable income.</li>
          <li>Take off credits, such as California&rsquo;s personal exemption credits or Utah&rsquo;s taxpayer credit.</li>
        </ol>
        <p>
          Some states phase their deductions, exemptions or credits out as income rises (Alabama, Connecticut, Illinois, Maryland, Ohio, Oregon, Rhode Island, Utah and Wisconsin among them),
          so the real rate on the next dollar can be higher than the bracket rate.
        </p>
      </GuideSection>

      <GuideSection id="example-ca" n={7} kicker="Worked example" title="Example: single in California on $75,000">
        <WorkedExample
          title="Single, $75,000 of wages, no 401(k), no dependents"
          steps={[
            { label: "Wages", value: usd(75000) },
            { label: "California standard deduction", value: "−" + usd(5706) },
            { label: "Taxable income", value: usd(69294) },
            { label: "Tax less the personal exemption credit", value: usd(2775) },
            { label: "State Disability Insurance at 1.3%", value: usd(975) },
          ]}
          total={{ label: "Taken by California", value: usd(3750) }}
        />
        <p>
          The income tax is 3.7% of pay, even though the next dollar is taxed at 8%. California also takes 1.3% State Disability Insurance from every dollar of wages, with no ceiling since
          2024. SDI is not income tax, but it comes out of the same paycheck, so the calculator shows it.
        </p>
      </GuideSection>

      <GuideSection id="example-ny" n={8} kicker="Worked example" title="Example: a New York family on $150,000">
        <WorkedExample
          title="Married filing jointly, $150,000 of wages, two children"
          steps={[
            { label: "Wages", value: usd(150000) },
            { label: "New York standard deduction", value: "−" + usd(16050) },
            { label: "Dependent exemptions (2 × $1,000)", value: "−" + usd(2000) },
            { label: "Taxable income", value: usd(131950) },
            { label: "Marginal rate", value: "5.4%" },
          ]}
          total={{ label: "New York State income tax", value: usd(6793) }}
        />
        <p>
          That is state tax only. A family living in New York City also pays city income tax, which you can add in the calculator&rsquo;s local tax field. The same family would pay{" "}
          {usd(4599)} in California and nothing in Texas or Florida.
        </p>
      </GuideSection>

      <GuideSection id="ranking-75k" n={9} kicker="Comparison" title="Every state at $75,000">
        <p>For a single filer with $75,000 of wages and no dependents, the lowest and highest 2026 bills are:</p>
        <CompareCards
          columns={[
            {
              name: "Lowest (with an income tax)",
              rows: [
                { label: "North Dakota", value: usd(203) },
                { label: "Ohio", value: usd(1287) },
                { label: "Arizona", value: usd(1666) },
                { label: "Louisiana", value: usd(1864) },
                { label: "South Carolina", value: usd(2160) },
              ],
            },
            {
              name: "Highest",
              rows: [
                { label: "Oregon", value: usd(5733) },
                { label: "Hawaii", value: usd(4170) },
                { label: "Maine", value: usd(3881) },
                { label: "Delaware", value: usd(3609) },
                { label: "Minnesota", value: usd(3577) },
              ],
            },
          ]}
        />
        <p>
          The big names sit in the middle: California {usd(2775)}, New York {usd(3453)}, Illinois {usd(3568)}, Pennsylvania {usd(2303)} and North Carolina {usd(2484)}. California ranks
          lower than many people expect at this income because its first brackets are 1% to 6%.
        </p>
      </GuideSection>

      <GuideSection id="ranking-family" n={10} kicker="Comparison" title="A family on $150,000">
        <p>For a married couple filing jointly with $150,000 of wages and two children, the median state with an income tax takes {usd(5489)}.</p>
        <Bars
          format={usd}
          items={[
            { label: "Oregon", value: 10954 },
            { label: "District of Columbia", value: 8413 },
            { label: "Hawaii", value: 8166 },
            { label: "Illinois", value: 6846 },
            { label: "New York", value: 6793 },
            { label: "Georgia", value: 5489 },
            { label: "California", value: 4599 },
            { label: "Arizona", value: 3133 },
            { label: "North Dakota", value: 718 },
          ]}
        />
        <p>
          California does well here because its joint brackets are double the single ones and it gives a credit for each child. Flat-tax Illinois takes more than California at this
          income.
        </p>
      </GuideSection>

      <GuideSection id="income-ladder" n={11} kicker="Scale" title="How the bill grows with income">
        <DataTable
          caption="State income tax on wages, single, 2026"
          head={["Wages", "Arizona", "North Carolina", "Illinois", "New York", "California"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["$25,000", usd(416), usd(489), usd(1093), usd(753), usd(122)],
            ["$50,000", usd(1041), usd(1486), usd(2330), usd(2103), usd(1040)],
            ["$100,000", usd(2291), usd(3481), usd(4805), usd(4860), usd(5055)],
            ["$250,000", usd(6041), usd(9466), usd(12230), usd(13962), usd(19005)],
            ["$500,000", usd(12291), usd(19441), usd(24750), usd(31087), usd(43968)],
            ["$1,000,000", usd(24791), usd(39391), usd(49500), usd(65337), usd(102982)],
          ]}
        />
        <p>
          Flat states grow in a straight line. Graduated states start below them and overtake them: California is the cheapest of the five at $25,000 and by far the most expensive at $1
          million, where it takes more than four times Arizona&rsquo;s bill.
        </p>
      </GuideSection>

      <GuideSection id="marginal" n={12} kicker="Rates" title="Marginal and effective rates">
        <p>
          Your <strong>marginal rate</strong>{" "}is what the state takes from your next dollar: the rate to use for a raise, a bonus or a 401(k) contribution. Your{" "}
          <strong>effective rate</strong>{" "}is the whole bill divided by your wages. For the single $75,000 earner, California&rsquo;s marginal rate is 8% but its effective rate is 3.7%; New
          York&rsquo;s are 5.4% and 4.6%; Oregon&rsquo;s are 8.75% and 7.6%.
        </p>
        <p>
          Where a deduction or credit phases out, the marginal rate can be higher than any bracket. The calculator works it out by adding $1,000 of wages and measuring the change. For a
          bonus, the <a href="/us/taxes/bonus-tax-calculator">bonus tax calculator</a>{" "}shows the flat rates states use to withhold from one.
        </p>
      </GuideSection>

      <GuideSection id="dependents" n={13} kicker="Household" title="Dependents and filing status">
        <p>
          Most states give something for each child, but in very different forms: a deduction, an exemption or a credit. For a head of household on $75,000 with two children, compared with
          a single filer with none:
        </p>
        <DataTable
          caption="Single, no dependents versus head of household, two dependents, $75,000"
          head={["State", "Single", "Head of household, 2 children"]}
          numeric={[1, 2]}
          rows={[
            ["California", usd(2775), usd(1825)],
            ["Georgia", usd(2994), usd(2495)],
            ["Virginia", usd(3498), usd(3391)],
            ["Illinois", usd(3568), usd(3278)],
            ["Ohio", usd(1287), usd(1169)],
          ]}
        />
        <p>
          Many states have no separate head of household brackets, so the calculator uses the single brackets for that status. Married couples filing separately get half the joint brackets
          and deductions, which is how most states treat them.
        </p>
      </GuideSection>

      <GuideSection id="401k" n={14} kicker="Pre-tax savings" title="401(k) contributions and Pennsylvania">
        <p>
          Traditional 401(k) contributions come off your wages before state tax in almost every state. A single Illinois worker on $75,000 who puts $6,000 into a 401(k) pays {usd(3271)}{" "}
          instead of {usd(3568)}: a saving of {usd(297)}, exactly 4.95% of the contribution.
        </p>
        <Callout tone="warn" title="Pennsylvania is different">
          Pennsylvania taxes 401(k) contributions when you earn them. The same $6,000 contribution leaves a Pennsylvania worker&rsquo;s state tax at {usd(2303)}, unchanged. The money
          isn&rsquo;t taxed again by Pennsylvania when you withdraw it.
        </Callout>
        <p>
          The <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows the federal saving, which is usually larger.
        </p>
      </GuideSection>

      <GuideSection id="local" n={15} kicker="Local" title="City and county income taxes">
        <p>
          In a handful of states, cities, counties or school districts add their own income tax. The best known are New York City, Yonkers, Philadelphia and other Pennsylvania localities,
          Detroit and other Michigan cities, most Ohio cities, every Maryland county, every Indiana county, and Kentucky cities and counties. Rates are usually between about 1% and 4%.
        </p>
        <p>
          Some local taxes follow where you live, some where you work, and some both. Enter your combined local rate in the calculator&rsquo;s local tax field to add it to the state bill.
        </p>
      </GuideSection>

      <GuideSection id="two-states" n={16} kicker="Commuters" title="Living in one state, working in another">
        <p>
          Normally the state where you work taxes your wages there, and your home state taxes all your income but gives you a credit for tax paid to the other state. The result is that you
          pay roughly the higher of the two states&rsquo; taxes, not both.
        </p>
        <p>
          Some neighboring states have reciprocity agreements, so you pay only your home state. Examples include Pennsylvania and New Jersey; Illinois with Iowa, Kentucky, Michigan and
          Wisconsin; and Virginia with DC, Kentucky, Maryland, Pennsylvania and West Virginia. You file an exemption form with your employer to stop work-state withholding. Remote workers
          should also know that a few states, such as New York, can tax remote work for an in-state employer.
        </p>
      </GuideSection>

      <GuideSection id="federal" n={17} kicker="Federal return" title="Deducting state tax on your federal return">
        <p>
          If you itemize deductions on your federal return, you can deduct state and local income tax (or sales tax instead) plus property tax, up to the SALT cap. For 2026 the cap is
          $40,400 ($20,200 married filing separately), and it shrinks for incomes over about $505,000, never falling below $10,000.
        </p>
        <p>
          Most people take the standard deduction ($16,100 single, $32,200 joint for 2026), so state tax gives them no federal saving at all. The{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}shows whether itemizing would beat it for you.
        </p>
      </GuideSection>

      <GuideSection id="moving" n={18} kicker="Moving" title="Moving to save tax">
        <p>
          A single worker on $100,000 pays {usd(5055)} of California income tax plus {usd(1300)} SDI, and no income tax in Texas. That {usd(6355)} a year is real money, but it is only one
          line of the budget.
        </p>
        <CompareCards
          columns={[
            {
              name: "California",
              rows: [
                { label: "Income tax on $100,000", value: usd(5055) },
                { label: "Median property tax rate", value: "0.71%" },
                { label: "Property tax on a $400,000 home", value: usd(2840) },
              ],
            },
            {
              name: "Texas",
              rows: [
                { label: "Income tax on $100,000", value: "$0" },
                { label: "Median property tax rate", value: "1.31%" },
                { label: "Property tax on a $400,000 home", value: usd(5240) },
              ],
            },
          ]}
        />
        <p>
          Housing costs, insurance, sales tax and wages all differ between states too. In the year you move you usually file part-year resident returns in both states, each taxing the
          income you earned while you lived there.
        </p>
      </GuideSection>

      <GuideSection id="other-income" n={19} kicker="Scope" title="Income this calculator leaves out">
        <p>
          The calculator covers wages. Most states tax interest, dividends, rental and self-employment income the same way, but many treat other income differently:
        </p>
        <ul>
          <li>Social Security benefits are untaxed in all but a few states.</li>
          <li>Many states exempt part or all of pensions and retirement account withdrawals, especially for older residents.</li>
          <li>Some states tax long-term capital gains at a lower rate or exclude part of them.</li>
          <li>Military pay is exempt in many states.</li>
        </ul>
        <p>If most of your income isn&rsquo;t wages, check your state&rsquo;s own rules or a tax professional.</p>
      </GuideSection>

      <GuideSection id="changes-2026" n={20} kicker="2026" title="What changed for 2026">
        <p>
          The trend is toward lower and flatter rates. Several states cut rates for 2026, retroactive to January 1: Georgia to 4.99% with a $15,000 single standard deduction, Arkansas&rsquo;s
          top rate to 3.7%, Utah to 4.45%, Ohio to a flat 2.75%, South Carolina to a two-rate system topping out at 5.21%, and West Virginia, which cut every rate by 5%. Most graduated
          states also index their brackets for inflation each year.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={21} kicker="Fine print" title="What the calculator simplifies">
        <ul>
          <li>It starts from wages after pre-tax deductions (Pennsylvania adds 401(k) contributions back).</li>
          <li>Head of household uses the single brackets; married filing separately uses half the joint ones.</li>
          <li>It leaves out New York&rsquo;s and Connecticut&rsquo;s high-income recapture rules and Missouri&rsquo;s and Oregon&rsquo;s partial deduction of federal tax.</li>
          <li>It doesn&rsquo;t include state earned income credits, renter credits or other credits you might claim.</li>
          <li>Where a state hadn&rsquo;t published 2026 inflation adjustments by early 2026, it uses the 2025 figures.</li>
        </ul>
        <p>
          For the whole paycheck, federal and state together, use the <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "9", label: "States with no tax on wages" },
            { value: "2.5% to 4.99%", label: "Flat-tax range" },
            { value: "13.3%", label: "Highest top rate (California)" },
            { value: "1.3%", label: "California SDI, no wage ceiling" },
            { value: usd(2830), label: "Median state tax, $75,000 single" },
            { value: usd(5489), label: "Median state tax, $150,000 family of four" },
            { value: "$40,400", label: "Federal SALT deduction cap" },
            { value: usd(5733), label: "Highest bill at $75,000 (Oregon)" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
