import {
  BandBar,
  CompareCards,
  Callout,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  NEUTRAL,
  SERIES,
  StepChart,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** UK tax bands — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "how-bands-work", title: "How tax bands work" },
  { id: "ruk-bands", title: "England, Wales and Northern Ireland" },
  { id: "scottish-bands", title: "Scotland" },
  { id: "effective", title: "Top rate, marginal rate, effective rate" },
  { id: "taper", title: "The £100,000 trap" },
  { id: "reliefs", title: "Moving down a band" },
  { id: "other-income", title: "Savings, dividends and gains" },
  { id: "myths", title: "Tax band myths" },
  { id: "tax-codes", title: "Your tax code and your band" },
  { id: "child-benefit", title: "Child Benefit and the £60,000 line" },
  { id: "fiscal-drag", title: "Frozen thresholds and fiscal drag" },
  { id: "other-people", title: "Self-employed, landlords and pensioners" },
  { id: "take-home-table", title: "Tax and take-home at common incomes" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — Scottish Income Tax", href: "https://www.gov.uk/scottish-income-tax" },
  { label: "GOV.UK — Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "GOV.UK — Tax on dividends", href: "https://www.gov.uk/tax-on-dividends" },
  { label: "GOV.UK — Tax relief on pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
  { label: "GOV.UK — Marriage Allowance", href: "https://www.gov.uk/marriage-allowance" },
];

export default function TaxBracketGuide() {
  return (
    <Guide
      kicker="The tax band guide"
      title="UK Income Tax bands, explained"
      intro={
        <>
          &ldquo;I don&rsquo;t want a pay rise, it&rsquo;ll put me in a higher tax bracket&rdquo; is one of the most
          common money myths in the UK. This guide shows how the bands really work for 2026/27, the difference between
          your top rate and the tax you actually pay, and the legal ways to move down a band.
        </>
      }
      meta={["2026/27 tax year", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="how-bands-work" n={1} kicker="The basics" title="How tax bands work">
        <p>
          Income Tax is charged in slices. Your income is split into bands, and each band is taxed at its own rate. The
          first slice, the <strong>Personal Allowance</strong> of £12,570, is tax-free. The next slice is taxed at 20%,
          and so on up.
        </p>
        <p>
          Your &ldquo;tax bracket&rdquo; is simply the highest band your income reaches. Being a higher-rate taxpayer
          means some of your income is taxed at 40%, not all of it. Every pound below £50,270 is taxed exactly as it
          would be for a basic-rate taxpayer.
        </p>
        <WorkedExample
          title="Worked example: £55,000 income, England"
          steps={[
            { label: "First £12,570", note: "Personal Allowance at 0%", value: "£0" },
            { label: "£12,570 to £50,270", note: "£37,700 at 20%", value: "£7,540" },
            { label: "£50,270 to £55,000", note: "£4,730 at 40%", value: "£1,892" },
          ]}
          total={{ label: "Income Tax for the year (17.1% of income)", value: "£9,432" }}
        />
        <p>
          This person is a higher-rate taxpayer, but only £4,730 of their £55,000 is taxed at 40%. Their tax bill is
          17.1% of their income.
        </p>
      </GuideSection>

      <GuideSection id="ruk-bands" n={2} kicker="England, Wales and NI" title="Bands in England, Wales and Northern Ireland">
        <Figure label="Income Tax bands, 2026/27" caption="Drawn to scale up to £150,000. The 60% band is the Personal Allowance taper; see section 5.">
          <BandBar
            max={150000}
            bands={[
              { from: 0, to: 12570, label: "0%", legend: "Up to £12,570: Personal Allowance", color: NEUTRAL, light: true },
              { from: 12570, to: 50270, label: "20%", legend: "£12,570 to £50,270: basic rate", color: SERIES[0] },
              { from: 50270, to: 100000, label: "40%", legend: "£50,270 to £100,000: higher rate", color: SERIES[1] },
              { from: 100000, to: 125140, label: "60%", legend: "£100,000 to £125,140: allowance withdrawn", color: SERIES[3] },
              { from: 125140, to: 1e9, label: "45%", legend: "Above £125,140: additional rate", color: SERIES[2] },
            ]}
          />
        </Figure>
        <p>
          Wales has the power to set its own rates, but for 2026/27 it uses the same rates as England and Northern
          Ireland. The thresholds have been frozen since 2021 and are due to stay frozen until April 2031, so as pay
          rises, more people move into the higher bands. This is often called fiscal drag.
        </p>
      </GuideSection>

      <GuideSection id="scottish-bands" n={3} kicker="Scotland" title="Bands in Scotland">
        <p>
          Scotland sets its own Income Tax on earnings, with six bands. The tax-free Personal Allowance is the same.
        </p>
        <DataTable
          caption="Scottish Income Tax bands, 2026/27"
          head={["Band", "Income", "Rate"]}
          numeric={[2]}
          rows={[
            ["Personal Allowance", "Up to £12,570", "0%"],
            ["Starter", "£12,571 to £16,537", "19%"],
            ["Basic", "£16,538 to £29,526", "20%"],
            ["Intermediate", "£29,527 to £43,662", "21%"],
            ["Higher", "£43,663 to £75,000", "42%"],
            ["Advanced", "£75,001 to £125,140", "45%"],
            ["Top", "Over £125,140", "48%"],
          ]}
        />
        <p>
          Scottish taxpayers earning under about £33,500 pay slightly less Income Tax than elsewhere in the UK. Above
          that they pay more: on £55,000 the difference is £1,650 a year, and on £100,000 it is £3,300.
        </p>
        <p>
          National Insurance is UK-wide, so between £43,663 and £50,270 a Scottish taxpayer pays 42% Income Tax plus 8%
          NI: a 50% marginal rate. Our Scottish tax calculator covers this in more detail.
        </p>
      </GuideSection>

      <GuideSection id="effective" n={4} kicker="Three rates" title="Top rate, marginal rate and effective rate">
        <p>People mean different things by &ldquo;my tax rate&rdquo;. Three numbers are worth knowing:</p>
        <ul>
          <li>
            <strong>Top rate</strong>: the rate on the highest slice of your income. This is your tax bracket.
          </li>
          <li>
            <strong>Marginal rate</strong>: what is taken from the next £1 you earn, including National Insurance. This
            is what matters for a pay rise, overtime or a pension contribution.
          </li>
          <li>
            <strong>Effective rate</strong>: your total Income Tax divided by your total income. This is always lower
            than your top rate.
          </li>
        </ul>
        <DataTable
          caption="Income Tax and effective rate at different incomes, 2026/27"
          head={["Income", "England, Wales, NI", "Effective", "Scotland", "Effective"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£20,000", "£1,486", "7.4%", "£1,446", "7.2%"],
            ["£30,000", "£3,486", "11.6%", "£3,451", "11.5%"],
            ["£45,000", "£6,486", "14.4%", "£6,882", "15.3%"],
            ["£60,000", "£11,432", "19.1%", "£13,182", "22.0%"],
            ["£80,000", "£19,432", "24.3%", "£21,732", "27.2%"],
            ["£100,000", "£27,432", "27.4%", "£30,732", "30.7%"],
            ["£150,000", "£53,703", "35.8%", "£59,634", "39.8%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="taper" n={5} kicker="The trap" title="The £100,000 trap">
        <p>
          Above £100,000 of adjusted net income, the Personal Allowance is reduced by £1 for every £2 you earn. By
          £125,140 it has gone. Each extra £2 in this range costs 80p in higher-rate tax plus 40p of tax on allowance
          you have lost: £1.20, or 60%.
        </p>
        <Figure label="Income Tax plus employee NI on the next £1, 2026/27" caption="England, Wales and Northern Ireland, standard tax code.">
          <StepChart
            ariaLabel="Marginal rate: 0% to £12,570, 28% to £50,270, 42% to £100,000, 62% to £125,140, then 47%."
            max={150000}
            yMax={70}
            yTicks={[0, 20, 40, 60]}
            steps={[
              { from: 0, to: 12570, value: 0 },
              { from: 12570, to: 50270, value: 28 },
              { from: 50270, to: 100000, value: 42 },
              { from: 100000, to: 125140, value: 62 },
              { from: 125140, to: 150000, value: 47 },
            ]}
          />
        </Figure>
        <p>
          The trap also hits childcare: above £100,000, families lose Tax-Free Childcare and the working-parent
          entitlement to funded childcare hours in England. For a family with young children, earning £100,001 can cost
          thousands of pounds a year.
        </p>
      </GuideSection>

      <GuideSection id="reliefs" n={6} kicker="Legal ways down" title="Moving down a band">
        <p>
          Your band is based on <strong>adjusted net income</strong>, not just your salary. Three things reduce it:
        </p>
        <ul>
          <li>
            <strong>Salary sacrifice</strong>: your pay is reduced before tax and National Insurance, with your employer
            paying the same amount into your pension.
          </li>
          <li>
            <strong>Personal pension contributions</strong> (relief at source): you pay 80% and the provider adds 20%.
            The grossed-up amount extends your basic-rate band, and higher-rate taxpayers claim the rest of the relief
            through Self Assessment.
          </li>
          <li>
            <strong>Gift Aid donations</strong>, which extend your basic-rate band in the same way.
          </li>
        </ul>
        <WorkedExample
          title="Worked example: £110,000 salary, £10,000 salary sacrifice"
          steps={[
            { label: "Adjusted income falls to", value: "£100,000" },
            { label: "Income Tax saved", note: "60% of £10,000", value: "£6,000" },
            { label: "National Insurance saved", note: "2% of £10,000", value: "£200" },
          ]}
          total={{ label: "Cost to take-home for £10,000 in your pension", value: "£3,800" }}
        />
        <p>
          At £60,000, taking adjusted income back to £50,270 needs £9,730 of contributions and costs about £5,643 of
          take-home pay. In Scotland, bringing £50,000 back to £43,662 costs about £3,169 of take-home for £6,338 in a
          pension.
        </p>
        <Callout title="Marriage Allowance">
          If you are a basic-rate taxpayer (or starter, basic or intermediate in Scotland) and your spouse or civil
          partner earns under £12,570, they can transfer £1,260 of their allowance to you. That cuts your tax by up to
          £252 a year, and you can backdate a claim by up to four years.
        </Callout>
      </GuideSection>

      <GuideSection id="other-income" n={7} kicker="Other income" title="Savings, dividends and capital gains">
        <p>
          Your band also sets your allowances and rates for other income. These use UK-wide bands, even for Scottish
          taxpayers.
        </p>
        <DataTable
          caption="Allowances and rates by band, 2026/27"
          head={["Band", "Savings allowance", "Dividend rate", "Capital gains rate"]}
          rows={[
            ["Basic rate", "£1,000", "10.75%", "18%"],
            ["Higher rate", "£500", "35.75%", "24%"],
            ["Additional rate", "£0", "39.35%", "24%"],
          ]}
        />
        <p>
          Savings interest, dividends and gains are added on top of your earnings, so they can push you into a higher
          band themselves. The first £500 of dividends and the first £3,000 of capital gains are tax-free for everyone.
          Interest and dividends in an ISA are not taxed at all and do not count towards your band.
        </p>
      </GuideSection>

      <GuideSection id="myths" n={8} kicker="Myths" title="Tax band myths">
        <ul>
          <li>
            <strong>&ldquo;A pay rise can leave me worse off.&rdquo;</strong> Not through Income Tax: only the pounds above
            a threshold are taxed at the higher rate. Losing a benefit or Child Benefit can create real cliff edges, but
            tax bands do not.
          </li>
          <li>
            <strong>&ldquo;Higher-rate taxpayers pay 40% on everything.&rdquo;</strong> They pay 40% only on income above
            £50,270.
          </li>
          <li>
            <strong>&ldquo;My bonus will be taxed at 40%.&rdquo;</strong> Only if your total income for the year goes above
            £50,270, and then only the part above it.
          </li>
          <li>
            <strong>&ldquo;Scotland always pays more.&rdquo;</strong> Not below about £33,500, where the 19% starter rate
            makes Scottish tax slightly lower.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="tax-codes" n={9} kicker="Tax codes" title="Your tax code and your band">
        <p>
          Your tax code tells payroll how much tax-free income to give you, not which band you are in. The standard code
          for 2026/27 is <strong>1257L</strong>: £12,570 of tax-free pay spread across the year. Payroll then applies the
          bands to everything above it.
        </p>
        <DataTable
          caption="Tax codes that affect your band"
          head={["Code", "What it means"]}
          rows={[
            ["1257L", "Standard Personal Allowance, bands applied as normal"],
            ["S1257L / C1257L", "Scottish or Welsh taxpayer: Scottish bands, or the same bands as England for Wales"],
            ["BR", "All pay taxed at 20%, usually a second job"],
            ["D0", "All pay taxed at 40%, a second job when your main job uses the basic band"],
            ["D1", "All pay taxed at 45%"],
            ["K codes", "You owe tax on something else, so tax-free pay is negative"],
            ["0T", "No tax-free allowance, often when the Personal Allowance has been withdrawn above £100,000"],
          ]}
        />
        <p>
          If your income falls in the £100,000 to £125,140 band, HMRC normally reduces your code to reflect the lost
          allowance. If it does not, you may owe tax after the year ends. Our tax code decoder explains your code line
          by line.
        </p>
      </GuideSection>

      <GuideSection id="child-benefit" n={10} kicker="Families" title="Child Benefit and the £60,000 line">
        <p>
          The High Income Child Benefit Charge is not a tax band, but it behaves like one. If either parent&rsquo;s
          adjusted net income goes above £60,000, the higher earner repays 1% of the family&rsquo;s Child Benefit for
          every £200 above it. At £80,000 the whole amount is repaid.
        </p>
        <CompareCards
          columns={[
            {
              name: "£70,000, no pension top-up",
              rows: [
                { label: "Child Benefit, two children", value: "£2,337.40" },
                { label: "Charge (50%)", value: "£1,168.70" },
                { label: "Extra marginal rate", value: "about 11.7%" },
              ],
            },
            {
              name: "£70,000, £8,000 net into a pension",
              rows: [
                { label: "Adjusted net income", value: "£60,000" },
                { label: "Charge", value: "£0" },
                { label: "Tax relief claimed", value: "£2,000 + £2,000" },
              ],
            },
          ]}
        />
        <p>
          Paying £8,000 into a personal pension is grossed up to £10,000, which brings adjusted net income back to
          £60,000. The family keeps all its Child Benefit, and the higher-rate relief adds another £2,000. Employees can
          now usually pay the charge through their tax code rather than registering for Self Assessment.
        </p>
      </GuideSection>

      <GuideSection id="fiscal-drag" n={11} kicker="Over time" title="Frozen thresholds and fiscal drag">
        <p>
          The Personal Allowance and the £50,270 threshold have been frozen since April 2021 and are due to stay frozen
          until April 2031. When wages rise and the thresholds do not, more of each pay rise is taxed at the higher rate
          and more people cross into higher bands. This is called fiscal drag.
        </p>
        <WorkedExample
          title="Worked example: £48,000 salary rising 4% a year"
          steps={[
            { label: "This year", value: "£48,000 · basic rate" },
            { label: "Next year", value: "£49,920 · basic rate" },
            { label: "The year after", value: "£51,917 · higher rate" },
          ]}
          total={{ label: "Income taxed at 40% in year three", value: "£1,647" }}
        />
        <p>
          This is why many people find themselves paying the higher rate without feeling any richer. Increasing pension
          contributions as your salary rises is one way to stay in the same band.
        </p>
      </GuideSection>

      <GuideSection id="other-people" n={12} kicker="Other incomes" title="Self-employed, landlords and pensioners">
        <p>
          The bands apply to all your taxable income together, not just to wages. For the self-employed they apply to
          profits after allowable expenses, through Self Assessment. Landlords add their rental profits to other income,
          and that can push them into a higher band.
        </p>
        <p>
          Pensioners pay Income Tax on the State Pension and any private or workplace pensions. The full new State Pension
          for 2026/27 is £12,547.60 a year, just under the £12,570 Personal Allowance, so almost any other pension income
          is taxed at 20% from the first pound. National Insurance is not charged on pension income.
        </p>
        <p>
          If you have several sources of income, your band is set by the total. HMRC usually gives the full Personal
          Allowance to your main job or pension and taxes the others through a BR or D0 code.
        </p>
      </GuideSection>

      <GuideSection id="take-home-table" n={13} kicker="Reference" title="Tax and take-home at common incomes">
        <DataTable
          caption="Income Tax, National Insurance and take-home, England, Wales or NI, 2026/27"
          head={["Income", "Income Tax", "National Insurance", "Take-home a year", "Take-home a month"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£15,000", "£486", "£194", "£14,320", "£1,193"],
            ["£25,000", "£2,486", "£994", "£21,520", "£1,793"],
            ["£35,000", "£4,486", "£1,794", "£28,720", "£2,393"],
            ["£50,270", "£7,540", "£3,016", "£39,714", "£3,310"],
            ["£70,000", "£15,432", "£3,411", "£51,157", "£4,263"],
            ["£90,000", "£23,432", "£3,811", "£62,757", "£5,230"],
            ["£125,140", "£42,516", "£4,513", "£78,111", "£6,509"],
            ["£200,000", "£76,203", "£6,011", "£117,786", "£9,816"],
          ]}
        />
        <p>
          The step from £90,000 to £125,140 adds £35,140 of income but only £15,354 of take-home pay, because it crosses
          the whole of the 60% band.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Personal Allowance" },
            { value: "£50,270", label: "40% band starts (England, Wales and NI)" },
            { value: "£43,663", label: "42% band starts (Scotland)" },
            { value: "£100,000", label: "Personal Allowance starts to shrink" },
            { value: "£125,140", label: "45% (48% in Scotland) band starts" },
            { value: "£252", label: "Most Marriage Allowance can save" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
