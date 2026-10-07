import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Personal Savings Allowance — the guide. Figures from src/lib/investing/savings.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "three", title: "Three ways interest is tax-free" },
  { id: "psa", title: "The Personal Savings Allowance" },
  { id: "starting-rate", title: "The starting rate for savings" },
  { id: "order", title: "The order the allowances apply" },
  { id: "examples", title: "Worked examples" },
  { id: "table", title: "Tax on interest at different incomes" },
  { id: "what-counts", title: "What counts as savings interest" },
  { id: "isas", title: "ISAs and Premium Bonds" },
  { id: "paying", title: "How the tax is collected" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "couples", title: "Couples and joint accounts" },
  { id: "2027", title: "Savings tax from April 2027" },
  { id: "reduce", title: "Ways to pay less tax on savings" },
  { id: "self-assessment", title: "Savings interest and Self Assessment" },
  { id: "estimating", title: "Estimating your interest" },
  { id: "children", title: "Children's savings" },
  { id: "pensioners", title: "Pensioners and the starting rate" },
  { id: "band-edge", title: "Interest near the higher-rate threshold" },
  { id: "dividends", title: "Savings and dividends together" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax on savings interest", href: "https://www.gov.uk/apply-tax-free-interest-on-savings" },
  { label: "GOV.UK — Income Tax rates and allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "HMRC — Savings and Investment Manual: Personal Savings Allowance", href: "https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual" },
  { label: "GOV.UK — Individual Savings Accounts", href: "https://www.gov.uk/individual-savings-accounts" },
];

export default function PsaGuide() {
  return (
    <Guide
      kicker="The savings tax guide"
      title="How much tax will I pay on my savings?"
      intro={
        <>
          With savings rates well above the levels of a few years ago, more people are paying tax on interest for the first time. Most savers can
          still earn a good amount tax-free, thanks to three allowances that work together: the Personal Allowance, the starting rate for savings
          and the Personal Savings Allowance. This guide explains how they fit, with examples for 2026/27 and the higher rates due from April 2027.
        </>
      }
      meta={["2026/27 tax year", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Basic-rate taxpayers can earn <strong>£1,000</strong> of interest tax-free each year; higher-rate taxpayers <strong>£500</strong>; additional-rate taxpayers nothing.</li>
          <li>If your other income is under £17,570, up to <strong>£5,000</strong> more can be tax-free under the starting rate for savings.</li>
          <li>Interest above that is taxed at 20%, 40% or 45%, rising to 22%, 42% and 47% from April 2027.</li>
          <li>Interest in <a href="/investing/isa-vs-gia">ISAs</a>{" "}is always tax-free and does not count.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£1,000", label: "PSA, basic rate" },
            { value: "£500", label: "PSA, higher rate" },
            { value: "£5,000", label: "Starting rate for savings" },
            { value: "£17,570", label: "Starting rate gone above" },
          ]}
        />
      </GuideSection>

      <GuideSection id="three" n={2} kicker="Allowances" title="Three ways interest is tax-free">
        <ol>
          <li><strong>Personal Allowance:</strong> the first £12,570 of all your income is tax-free. If your pay or pension does not use it all, the rest covers interest.</li>
          <li><strong>Starting rate for savings:</strong> up to £5,000 of interest taxed at 0%, for people with low other income.</li>
          <li><strong>Personal Savings Allowance:</strong> £1,000 or £500 of interest taxed at 0%, depending on your tax band.</li>
        </ol>
      </GuideSection>

      <GuideSection id="psa" n={3} kicker="The PSA" title="The Personal Savings Allowance">
        <p>
          Your Personal Savings Allowance depends on the highest tax band your total income reaches, including the interest itself. Interest
          that would push you over £50,270 can therefore halve your allowance. It is not a separate band of income: interest covered by the PSA
          still counts towards your total income, for example for the £100,000 Personal Allowance taper or the <a href="/benefits/high-income-child-benefit">High Income Child Benefit Charge</a>.
        </p>
      </GuideSection>

      <GuideSection id="starting-rate" n={4} kicker="Low incomes" title="The starting rate for savings">
        <p>
          The starting rate band is £5,000. It is reduced by £1 for every £1 of non-savings income (pay, pensions, rent, self-employed profit) above
          your Personal Allowance. So with other income of £14,000, the band is £5,000 − £1,430 = £3,570. With other income of £17,570 or more it is
          gone. Many pensioners and part-time workers have a large slice of tax-free interest without realising it.
        </p>
      </GuideSection>

      <GuideSection id="order" n={5} kicker="Method" title="The order the allowances apply">
        <p>
          Income is taxed in a fixed order: non-savings income first, then savings interest, then dividends. Your Personal Allowance is used up by
          non-savings income first. Interest then uses any Personal Allowance left, then the starting rate, then the Personal Savings Allowance,
          and anything left is taxed at your rate. Dividends sit on top, so a large dividend can push your interest into a higher band.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Salary £30,000, interest £1,500"
          steps={[
            { label: "Personal Savings Allowance (basic rate)", value: "£1,000 at 0%" },
            { label: "Taxable interest", value: "£500" },
            { label: "Tax at 20%", value: "£100" },
          ]}
          total={{ label: "Tax on interest (£110 at April 2027 rates)", value: "£100" }}
        />
        <WorkedExample
          title="Pension income £14,000, interest £5,000"
          steps={[
            { label: "Starting rate: £5,000 − (£14,000 − £12,570)", value: "£3,570 at 0%" },
            { label: "Personal Savings Allowance", value: "£1,000 at 0%" },
            { label: "Taxable interest", value: "£430" },
          ]}
          total={{ label: "Tax on interest at 20%", value: "£86" }}
        />
        <WorkedExample
          title="Salary £60,000, interest £3,000"
          steps={[
            { label: "Personal Savings Allowance (higher rate)", value: "£500 at 0%" },
            { label: "Taxable interest", value: "£2,500" },
          ]}
          total={{ label: "Tax at 40%", value: "£1,000" }}
        />
      </GuideSection>

      <GuideSection id="table" n={7} kicker="At a glance" title="Tax on interest at different incomes">
        <DataTable
          caption="Most interest you can earn tax-free, 2026/27"
          head={["Other income", "Tax-free interest"]}
          numeric={[1]}
          rows={[
            ["£12,570 (all of the Personal Allowance used)", "£6,000"],
            ["£14,000", "£4,570"],
            ["£17,570 to £50,270", "£1,000"],
            ["Higher rate (to £125,140)", "£500"],
            ["Additional rate", "£0"],
          ]}
        />
        <p>Someone with no other income at all can earn £18,570 of interest tax-free: £12,570 of Personal Allowance, £5,000 starting rate and £1,000 PSA.</p>
      </GuideSection>

      <GuideSection id="what-counts" n={8} kicker="Income" title="What counts as savings interest">
        <ul>
          <li>Interest from bank, building society and credit union accounts, including fixed bonds;</li>
          <li>interest from government and corporate bonds, and peer-to-peer lending;</li>
          <li>interest distributions from bond and money market funds held outside ISAs;</li>
          <li>some purchased life <a href="/investing/annuity">annuity</a>{" "}payments.</li>
        </ul>
        <p>Interest counts in the tax year it is paid or credited to your account, not when it builds up.</p>
      </GuideSection>

      <GuideSection id="isas" n={9} kicker="Tax-free" title="ISAs and Premium Bonds">
        <CompareCards
          columns={[
            {
              name: "ISAs",
              rows: [
                { label: "Tax", value: "None, ever" },
                { label: "Uses PSA", value: "No" },
                { label: "Limit", value: "£20,000 a year" },
              ],
            },
            {
              name: "Premium Bonds",
              rows: [
                { label: "Tax", value: "Prizes are tax-free" },
                { label: "Uses PSA", value: "No" },
                { label: "Limit", value: "£50,000 holding" },
              ],
            },
          ]}
        />
        <p>See the <a href="/investing/premium-bonds">Premium Bonds calculator</a> to compare their expected return with a savings account.</p>
      </GuideSection>

      <GuideSection id="paying" n={10} kicker="Collection" title="How the tax is collected">
        <p>
          Banks and building societies report interest to HMRC. If you are employed or get a pension, HMRC usually collects tax on interest by
          reducing your <a href="/tax-and-salary/tax-code-decoder">tax code</a>{" "}for a later year, based on an estimate. If you fill in a Self Assessment return, you report the interest there. If
          you owe tax and HMRC has not contacted you, you must tell them; if your interest is under £10,000 you can ask them to collect it through
          your tax code.
        </p>
      </GuideSection>

      <GuideSection id="scotland" n={11} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scottish Income Tax rates apply only to non-savings income. Savings interest is taxed at the UK rates of 20%, 40% and 45%, and your
          Personal Savings Allowance depends on the UK bands, so a <a href="/tax-and-salary/scottish-tax">Scottish taxpayer</a>{" "}earning £45,000 pays the Scottish higher rate on pay but still
          gets the £1,000 allowance on interest.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={12} kicker="Couples" title="Couples and joint accounts">
        <p>
          Each person has their own allowances. Interest from a joint account is normally split equally between you. If one partner pays a lower
          rate of tax, holding more savings in their name can reduce the tax a couple pays, as long as the money genuinely belongs to them.
        </p>
      </GuideSection>

      <GuideSection id="2027" n={13} kicker="Coming changes" title="Savings tax from April 2027">
        <p>
          From 6 April 2027 the rates of tax on savings interest rise by 2 points, to 22%, 42% and 47%. The allowances stay the same. A basic-rate
          taxpayer paying £100 tax on £500 of taxable interest would pay £110. Cash ISA contributions will be limited to £12,000 a year for under-65s
          from the same date.
        </p>
      </GuideSection>

      <GuideSection id="reduce" n={14} kicker="Tips" title="Ways to pay less tax on savings">
        <ul>
          <li>Use your ISA allowance first for savings that earn more than your allowance.</li>
          <li>Choose accounts that pay interest each year, not all at the end of a long fix.</li>
          <li>Hold savings in the name of a partner with a lower tax rate.</li>
          <li>Pay more into a pension to keep your income in the basic-rate band, doubling your allowance.</li>
          <li>Consider Premium Bonds for some savings if you are a higher-rate taxpayer.</li>
        </ul>
        <Callout title="Compare accounts after tax">
          A higher rate is not always better after tax. Use the <a href="/investing/savings-interest">savings interest calculator</a> to compare
          fixed and easy-access accounts on what you keep.
        </Callout>
      </GuideSection>

      <GuideSection id="self-assessment" n={15} kicker="Reporting" title="Savings interest and Self Assessment">
        <p>
          You must fill in a Self Assessment return if your savings interest is £10,000 or more, or if you already file one for another reason, for
          example as self-employed. Otherwise HMRC normally deals with tax on interest automatically. Each year it receives figures from banks and
          building societies, then sends a calculation (a P800 or a Simple Assessment) or adjusts your tax code. Check these carefully: the figures
          sometimes include interest from ISAs or accounts you have closed.
        </p>
      </GuideSection>

      <GuideSection id="estimating" n={16} kicker="Planning" title="Estimating your interest">
        <p>
          To estimate interest for the year, multiply each balance by its rate. £30,000 at 4% earns about £1,200 a year; £25,000 at 4% earns £1,000,
          the whole basic-rate allowance. As a rule of thumb, at 4% a basic-rate taxpayer can hold about £25,000 outside ISAs before paying tax, and a
          higher-rate taxpayer about £12,500. If rates rise, the same savings earn more and you may cross the line without adding a penny.
        </p>
      </GuideSection>

      <GuideSection id="children" n={17} kicker="Children" title="Children's savings">
        <p>
          Children have their own Personal Allowance, starting rate and Personal Savings Allowance, so most pay no tax on interest. The exception is money
          given by a parent: if it earns more than £100 a year, all of that interest is taxed as the parent&rsquo;s. Grandparents&rsquo; gifts and
          Junior ISAs are not affected. See the <a href="/investing/junior-isa">Junior ISA calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="pensioners" n={18} kicker="Pensioners" title="Pensioners and the starting rate">
        <p>
          Many pensioners have income just above the Personal Allowance, so part of the starting rate band is still available. Someone with the full
          new State Pension of £12,547.60 and no other income has the whole £5,000 starting rate band and the £1,000 allowance, so can earn about
          £6,022 of interest tax-free. A small private pension reduces that pound for pound until other income reaches £17,570.
        </p>
      </GuideSection>

      <GuideSection id="band-edge" n={19} kicker="Band edges" title="Interest near the higher-rate threshold">
        <p>
          Because your allowance depends on the band your total income reaches, including interest, a small amount of extra interest can cost more
          than you expect. Suppose your salary is £49,500 and you earn £1,000 of interest. Your total income of £50,500 puts you in the higher-rate band,
          so your allowance falls from £1,000 to £500. The £230 of interest above £50,270 is taxed at 40%, and some of the rest at 20%, so a basic-rate
          taxpayer&rsquo;s tax-free £1,000 turns into a tax bill. Paying a little more into a pension, or moving savings into an ISA, keeps you below the
          line and protects the full allowance.
        </p>
        <p>
          The same applies at £125,140, where the allowance disappears completely, and between £100,000 and £125,140, where interest also reduces your
          Personal Allowance.
        </p>
      </GuideSection>

      <GuideSection id="dividends" n={20} kicker="Dividends" title="Savings and dividends together">
        <p>
          If you have both savings interest and dividends, interest is taxed before dividends. Each has its own allowance: the Personal Savings Allowance
          for interest and the £500 <a href="/investing/dividend-tax">dividend allowance</a>{" "}for dividends. Dividends are taxed at 10.75%, 35.75% and 39.35% in 2026/27. Large dividends can push
          your total income into the higher-rate band and reduce your savings allowance from £1,000 to £500, even though the dividends are taxed after the
          interest. The calculator includes dividends under More options so you can see the effect.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Savings tax, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Personal Allowance", "£12,570"],
            ["Starting rate for savings", "£5,000 at 0%"],
            ["Personal Savings Allowance: basic / higher / additional", "£1,000 / £500 / £0"],
            ["Savings tax rates", "20% / 40% / 45%"],
            ["Savings tax rates from April 2027", "22% / 42% / 47%"],
            ["ISA allowance", "£20,000"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
