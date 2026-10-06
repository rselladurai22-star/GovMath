import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Dividend tax — the guide. Figures from src/lib/investing/tax.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rates", title: "Dividend tax rates for 2026/27" },
  { id: "allowance", title: "The £500 dividend allowance" },
  { id: "order", title: "How dividends are stacked on other income" },
  { id: "examples", title: "Worked examples" },
  { id: "change", title: "What changed in April 2026" },
  { id: "directors", title: "Company directors" },
  { id: "100k", title: "The £100,000 trap" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "funds", title: "Funds, ETFs and foreign dividends" },
  { id: "reducing", title: "Ways to pay less" },
  { id: "reporting", title: "Reporting and paying" },
  { id: "what", title: "What a dividend is" },
  { id: "yield", title: "Dividend yields and income investing" },
  { id: "savings", title: "Dividends and savings interest together" },
  { id: "benefits", title: "Dividends and benefits" },
  { id: "child-benefit", title: "Dividends and Child Benefit" },
  { id: "pensioners", title: "Dividends in retirement" },
  { id: "children", title: "Shares held for children" },
  { id: "history", title: "How dividend tax has changed" },
  { id: "records", title: "Keeping records" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "dates", title: "Ex-dividend and payment dates" },
  { id: "foreign", title: "Foreign withholding tax" },
  { id: "drip", title: "Dividend reinvestment" },
  { id: "checklist", title: "A year-end checklist" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax on dividends", href: "https://www.gov.uk/tax-on-dividends" },
  { label: "GOV.UK — Income Tax rates and allowances", href: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax" },
  { label: "GOV.UK — Self Assessment: who must send a tax return", href: "https://www.gov.uk/check-if-you-need-tax-return" },
];

export default function DividendGuide() {
  return (
    <Guide
      kicker="The dividend tax guide"
      title="Dividend tax in 2026/27"
      intro={
        <>
          Dividends from shares, funds and your own company are taxed at their own rates, which rose in April 2026. With only a £500 tax-free
          allowance, many investors and company directors now pay dividend tax. This guide explains the rates, how dividends sit on top of other
          income, and practical ways to pay less.
        </>
      }
      meta={["2026/27 rates", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            The first <strong>£500</strong> of dividends is tax-free.
          </li>
          <li>
            Above that: <strong>10.75%</strong> in the basic-rate band, <strong>35.75%</strong> in the higher-rate band and{" "}
            <strong>39.35%</strong> in the additional-rate band.
          </li>
          <li>Dividends are taxed after your other income, so your salary decides the rate.</li>
          <li>Dividends in an ISA or pension are tax-free.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£500", label: "Dividend allowance" },
            { value: "10.75%", label: "Basic rate" },
            { value: "35.75%", label: "Higher rate" },
            { value: "39.35%", label: "Additional rate" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="Dividend tax rates for 2026/27">
        <DataTable
          caption="Dividend tax rates, 2026/27"
          head={["Band", "Taxable income", "Dividend rate"]}
          rows={[
            ["Personal Allowance", "Up to £12,570", "0%"],
            ["Dividend allowance", "First £500 of dividends", "0%"],
            ["Basic rate", "£12,571 to £50,270", "10.75%"],
            ["Higher rate", "£50,271 to £125,140", "35.75%"],
            ["Additional rate", "Over £125,140", "39.35%"],
          ]}
        />
        <p>The same rates apply in England, Wales, Scotland and Northern Ireland.</p>
      </GuideSection>

      <GuideSection id="allowance" n={3} kicker="Tax-free" title="The £500 dividend allowance">
        <p>
          The dividend allowance makes the first £500 of dividends tax-free, but those dividends still count towards your income and use up band
          space. That can push other dividends into a higher band. The allowance was £2,000 until April 2023 and £1,000 in 2023/24.
        </p>
        <Callout title="The Personal Allowance comes first">
          If your other income is below £12,570, dividends use up the rest of your Personal Allowance before the dividend allowance. Someone with no
          other income can receive £13,070 of dividends tax-free.
        </Callout>
      </GuideSection>

      <GuideSection id="order" n={4} kicker="Stacking" title="How dividends are stacked on other income">
        <p>
          Income tax is worked out in a fixed order: salary, pensions and other non-savings income first, then savings interest, then dividends.
          Dividends are always the top slice. So the more you earn, the higher the rate on your dividends.
        </p>
        <WorkedExample
          title="Salary £45,000 and dividends of £10,000"
          steps={[
            { label: "Salary uses the Personal Allowance and £32,430 of the basic band", value: "£45,000" },
            { label: "Next £500 of dividends: allowance", value: "£0" },
            { label: "£4,770 left in the basic band at 10.75%", value: "£513" },
            { label: "£4,730 in the higher band at 35.75%", value: "£1,691" },
          ]}
          total={{ label: "Dividend tax", value: "£2,204" }}
        />
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Real numbers" title="Worked examples">
        <DataTable
          caption="Dividend tax, 2026/27"
          head={["Other income", "Dividends", "Dividend tax"]}
          numeric={[0, 1, 2]}
          rows={[
            ["£0", "£20,000", "£744.98"],
            ["£30,000", "£2,000", "£161.25"],
            ["£40,000", "£8,000", "£806.25"],
            ["£60,000", "£5,000", "£1,608.75"],
            ["£60,000", "£20,000", "£6,971.25"],
            ["£130,000", "£10,000", "£3,738.25"],
          ]}
        />
        <Figure label="Tax on £5,000 of dividends" caption="Before and after the April 2026 rate rise.">
          <Bars
            items={[
              { label: "Basic rate, 2025/26", value: 393.75 },
              { label: "Basic rate, 2026/27", value: 483.75 },
              { label: "Higher rate, 2025/26", value: 1518.75 },
              { label: "Higher rate, 2026/27", value: 1608.75 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="change" n={6} kicker="New rates" title="What changed in April 2026">
        <p>
          The November 2025 Budget raised the basic and higher dividend rates by 2 percentage points from 6 April 2026: from 8.75% to 10.75%, and
          from 33.75% to 35.75%. The additional rate stayed at 39.35%. On £5,000 of dividends above the allowance, that adds £90 a year for a basic or
          higher-rate taxpayer. Savings income rates are due to rise by 2 points from April 2027.
        </p>
      </GuideSection>

      <GuideSection id="directors" n={7} kicker="Your own company" title="Company directors">
        <p>
          Many directors of small companies take a low salary and the rest as dividends, because dividends do not attract National Insurance.
          Dividends are paid from profits after Corporation Tax.
        </p>
        <WorkedExample
          title="A director with a £12,570 salary and dividends up to the higher-rate threshold"
          steps={[
            { label: "Salary covered by the Personal Allowance", value: "£12,570" },
            { label: "Dividends", value: "£37,700" },
            { label: "Allowance", value: "£500 at 0%" },
          ]}
          total={{ label: "Dividend tax at 10.75%", value: "£3,999.00" }}
        />
        <p>
          The <a href="/business/dividend-vs-salary">dividend vs salary calculator</a> works out the best mix for your company, including
          Corporation Tax and employer costs.
        </p>
      </GuideSection>

      <GuideSection id="100k" n={8} kicker="High earners" title="The £100,000 trap">
        <p>
          Between £100,000 and £125,140, you lose £1 of Personal Allowance for every £2 of income. Dividends in this range are taxed at 35.75%, plus
          the effect of the lost allowance, giving an effective rate of 55.75% on the next £100. Pension contributions can bring income back below
          £100,000.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={9} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scottish rates and bands apply only to non-savings income such as salary. Dividends use the UK rates and bands, based on where your total
          income falls in the UK structure. A Scottish taxpayer with the same income and dividends as someone in England pays the same dividend tax,
          but different tax on their salary.
        </p>
      </GuideSection>

      <GuideSection id="funds" n={10} kicker="Investments" title="Funds, ETFs and foreign dividends">
        <CompareCards
          columns={[
            {
              name: "Taxed as dividends",
              rows: [
                { label: "UK shares", value: "Dividends paid in cash or reinvested" },
                { label: "Equity funds", value: "Distributions and accumulated income" },
                { label: "Foreign shares", value: "In pounds, with credit for some foreign tax" },
              ],
            },
            {
              name: "Taxed as interest",
              rows: [
                { label: "Bond funds", value: "Funds over 60% in bonds or cash pay interest" },
                { label: "Cash", value: "Savings accounts and money market funds" },
              ],
            },
          ]}
        />
        <p>
          Accumulation units still count: income reinvested inside the fund is taxable each year, even though you receive nothing. Check your annual
          tax voucher.
        </p>
      </GuideSection>

      <GuideSection id="reducing" n={11} kicker="Planning" title="Ways to pay less">
        <ul>
          <li>Hold dividend-paying investments in an ISA, where dividends are tax-free.</li>
          <li>Use &ldquo;bed and ISA&rdquo; to move investments into an ISA each year.</li>
          <li>Hold shares in the name of a spouse or civil partner with a lower income.</li>
          <li>Pay into a personal pension to extend your basic-rate band.</li>
          <li>Prefer growth investments in a general account, and income investments in an ISA or pension.</li>
        </ul>
        <WorkedExample
          title="£10,000 of dividends, salary £60,000, spouse earning £15,000"
          steps={[
            { label: "All in your name", value: "£3,396.25" },
            { label: "Half each", value: "£2,092.50" },
          ]}
          total={{ label: "Saving a year", value: "£1,303.75" }}
        />
      </GuideSection>

      <GuideSection id="reporting" n={12} kicker="HMRC" title="Reporting and paying">
        <Timeline
          items={[
            { when: "Under £10,000", what: "Tell HMRC", detail: "If tax is due, it can usually be collected through your tax code." },
            { when: "£10,000 or more", what: "Self Assessment", detail: "You must file a tax return." },
            { when: "31 January", what: "Pay any tax due", detail: "Payments on account may also be needed." },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={13} kicker="Basics" title="What a dividend is">
        <p>
          A dividend is a share of a company&rsquo;s profits paid to its shareholders. Companies pay dividends from profits that have already been
          taxed through Corporation Tax, which is why dividends are taxed at lower rates than salary and carry no National Insurance. Funds that hold
          shares pass on the dividends they receive as &ldquo;distributions&rdquo;, which are taxed in the same way.
        </p>
        <p>
          Dividends are usually paid twice a year, though some companies pay quarterly. They are taxed in the tax year they are paid, not when
          the profits were made.
        </p>
      </GuideSection>

      <GuideSection id="yield" n={14} kicker="Investing" title="Dividend yields and income investing">
        <p>
          The dividend yield is the yearly dividend as a percentage of the share price. A yield of 4% on a £100,000 portfolio produces £4,000 a year.
          Only £500 of that is covered by the allowance, so a higher-rate taxpayer would pay £1,251.25 on the rest. Holding the same portfolio in
          an ISA would remove the tax entirely.
        </p>
        <DataTable
          caption="Dividends from a portfolio at different yields"
          head={["Portfolio", "2% yield", "4% yield"]}
          numeric={[1, 2]}
          rows={[
            ["£25,000", "£500", "£1,000"],
            ["£50,000", "£1,000", "£2,000"],
            ["£100,000", "£2,000", "£4,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="savings" n={15} kicker="Ordering" title="Dividends and savings interest together">
        <p>
          Savings interest is taxed before dividends. If you have both, interest can use up the basic-rate band and push dividends into the higher
          band. Basic-rate taxpayers can earn £1,000 of interest tax-free through the Personal Savings Allowance, higher-rate taxpayers £500, and
          the starting rate for savings can make up to £5,000 more tax-free for people with low other income. Add your savings interest under More
          options to see the combined effect.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={16} kicker="Means tests" title="Dividends and benefits">
        <p>
          Means-tested benefits usually ignore the dividends themselves and look at the value of the shares as capital instead. For Universal
          Credit, capital over £6,000 reduces the award and over £16,000 stops it. For Pension Credit, capital over £10,000 is treated as giving an
          assumed income. Directors paying themselves dividends from their own company may have the company&rsquo;s profits treated as
          self-employed earnings for Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="child-benefit" n={17} kicker="Families" title="Dividends and Child Benefit">
        <p>
          The High Income Child Benefit Charge is based on adjusted net income, which includes dividends. A parent earning £55,000 with £8,000 of
          dividends would have income of £63,000 and start repaying Child Benefit. The{" "}
          <a href="/benefits/high-income-child-benefit">High Income Child Benefit Charge calculator</a> shows the effect.
        </p>
      </GuideSection>

      <GuideSection id="pensioners" n={18} kicker="Retirement" title="Dividends in retirement">
        <p>
          In retirement, your State Pension and other pensions use up your Personal Allowance and basic-rate band first, and dividends sit on top. Many
          retirees keep income investments in ISAs, where withdrawals are tax-free and do not affect the tax on their pension. Drawing tax-free cash
          from a pension does not use up any of your bands.
        </p>
      </GuideSection>

      <GuideSection id="children" n={19} kicker="Family investing" title="Shares held for children">
        <p>
          Children have their own Personal Allowance and dividend allowance. But if a parent gives a child money that produces more than £100 of
          income a year, the whole amount is taxed as the parent&rsquo;s income. Junior ISAs and pensions avoid this rule, and gifts from grandparents
          are not affected.
        </p>
      </GuideSection>

      <GuideSection id="history" n={20} kicker="Background" title="How dividend tax has changed">
        <DataTable
          caption="Dividend allowance and basic rate"
          head={["Tax year", "Allowance", "Basic rate"]}
          rows={[
            ["2016/17 to 2017/18", "£5,000", "7.5%"],
            ["2018/19 to 2021/22", "£2,000", "7.5%"],
            ["2022/23", "£2,000", "8.75%"],
            ["2023/24", "£1,000", "8.75%"],
            ["2024/25 to 2025/26", "£500", "8.75%"],
            ["2026/27", "£500", "10.75%"],
          ]}
        />
        <p>Over ten years, the tax-free allowance has fallen by 90% and the basic rate has risen by more than 40%.</p>
      </GuideSection>

      <GuideSection id="records" n={21} kicker="Paperwork" title="Keeping records">
        <p>
          Keep dividend vouchers and annual tax statements from your platform or fund manager. They show the dividends paid, any foreign tax taken,
          and income accumulated in funds. HMRC may ask for these if you file a tax return.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={22} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Forgetting accumulated income in accumulation funds.</li>
          <li>Assuming the £500 allowance does not use up band space.</li>
          <li>Missing the £10,000 Self Assessment threshold.</li>
          <li>Treating bond fund distributions as dividends: they are interest.</li>
        </ul>
      </GuideSection>

      <GuideSection id="dates" n={23} kicker="Timing" title="Ex-dividend and payment dates">
        <p>
          To receive a dividend, you must own the shares before the ex-dividend date. If you sell on or after that date, you still get the
          dividend. The tax point is the payment date. For directors, a dividend is paid when the money is made available to you, such as when it is
          credited to your director&rsquo;s loan account, so the timing can be chosen to fall in the most efficient tax year.
        </p>
      </GuideSection>

      <GuideSection id="foreign" n={24} kicker="Overseas" title="Foreign withholding tax">
        <p>
          Many countries take tax from dividends before they are paid to UK investors. US shares usually have 15% withheld if you have completed a
          W-8BEN form, or 30% if not. You can usually set the foreign tax against UK tax on the same dividends, up to the UK tax due, but any excess
          is lost. In an ISA, US tax is usually still withheld even though there is no UK tax to set it against, while UK pension schemes
          such as SIPPs can often receive US dividends without withholding.
        </p>
      </GuideSection>

      <GuideSection id="drip" n={25} kicker="Compounding" title="Dividend reinvestment">
        <p>
          Many platforms let you reinvest dividends automatically, buying more shares or fund units. This helps your investment grow, but the
          reinvested dividends are taxed just as if you had received the cash. Each reinvestment also adds to your base cost for Capital Gains Tax,
          so record the amounts to avoid paying tax twice when you sell.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={26} kicker="Before 5 April" title="A year-end checklist">
        <ol>
          <li>Use this year&rsquo;s £20,000 ISA allowance, moving dividend payers in first.</li>
          <li>Check whether your income is near £50,270, £100,000 or £125,140, where rates jump.</li>
          <li>Consider a personal pension contribution to extend your basic-rate band.</li>
          <li>Review whose name investments are held in, if you are married or in a civil partnership.</li>
          <li>Gather dividend statements ready for your tax return.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={27} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£500", label: "Dividend allowance" },
            { value: "10.75%", label: "Basic rate" },
            { value: "35.75%", label: "Higher rate" },
            { value: "39.35%", label: "Additional rate" },
            { value: "£13,070", label: "Tax-free with no other income" },
            { value: "£10,000", label: "Dividends needing a tax return" },
            { value: "£20,000", label: "ISA allowance" },
            { value: "55.75%", label: "Effective rate, £100k to £125k" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
