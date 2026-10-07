import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Annuities — the guide. Figures from src/lib/investing/savings.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an annuity is" },
  { id: "rates", title: "Annuity rates in 2026" },
  { id: "examples", title: "Worked examples" },
  { id: "tax", title: "How annuity income is taxed" },
  { id: "options", title: "Options that change the rate" },
  { id: "level-increasing", title: "Level or increasing?" },
  { id: "enhanced", title: "Enhanced annuities" },
  { id: "payback", title: "When do you get your money back?" },
  { id: "vs-drawdown", title: "Annuity or drawdown?" },
  { id: "mix", title: "Mixing the two" },
  { id: "timing", title: "When to buy" },
  { id: "shopping", title: "Shopping around" },
  { id: "defined-benefit", title: "Final salary pensions" },
  { id: "small-pots", title: "Small pots" },
  { id: "benefits", title: "Annuities and means-tested benefits" },
  { id: "scams", title: "Avoiding pension scams" },
  { id: "how-priced", title: "How insurers price annuities" },
  { id: "example-joint", title: "A joint-life example" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Annuities explained", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/taking-your-pension/guaranteed-retirement-income-annuities-explained" },
  { label: "MoneyHelper — Compare annuities", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/taking-your-pension/compare-annuities" },
  { label: "Which? — Annuity rates", href: "https://www.which.co.uk/money/pensions-and-retirement/options-for-cashing-in-your-pensions/annuities/annuity-rates-aQGfH6W5n2rm" },
  { label: "GOV.UK — Tax when you get a pension", href: "https://www.gov.uk/tax-on-pension" },
  { label: "MoneyHelper — Pension Wise", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-wise" },
];

export default function AnnuityGuide() {
  return (
    <Guide
      kicker="The annuity guide"
      title="How much income will an annuity give me?"
      intro={
        <>
          An annuity turns some or all of your pension pot into a guaranteed income for the rest of your life. After years of very low rates,
          annuities pay far more than they did a decade ago, and they have become popular again with people who want certainty. This guide
          explains how rates work, how the income is taxed, the options that change it, and how an annuity compares with drawdown.
        </>
      }
      meta={["2026/27 rules", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>An annuity pays a fixed income for life in return for a lump sum from your pension.</li>
          <li>At an annuity rate of 7.5%, <strong>£75,000</strong> buys <strong>£5,625 a year</strong> before tax.</li>
          <li>From a £100,000 pot, with 25% taken tax-free first, that is about <strong>£375 a month</strong> after tax for someone with the full State Pension.</li>
          <li>Rates depend on your age, health and the options you choose, so always get quotes.</li>
        </ul>
        <KeyStats
          items={[
            { value: "7.5%+", label: "Typical best level rate at 65 in 2026" },
            { value: "25%", label: "Tax-free cash first" },
            { value: "For life", label: "How long it pays" },
            { value: "£268,275", label: "Lump Sum Allowance" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an annuity is">
        <p>
          You hand over part of your pension to an insurance company. In return it pays you an agreed income, usually monthly, for as long as you live.
          The insurer takes on the risk of investments falling and of you living a long time. Once bought, most annuities cannot be cancelled or
          changed, so the choices you make at the start matter.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Rates" title="Annuity rates in 2026">
        <p>
          The annuity rate is the first year&rsquo;s income as a share of the price. Rates follow long-term interest rates, especially gilt yields,
          and rise with age because the insurer expects to pay for fewer years. According to Which?, the best level single-life rate for a healthy
          65-year-old has stayed above 7.5% since the start of 2025, and was over 8% at times in 2026. Ten years earlier it was nearer 5%.
        </p>
        <Callout title="Your quote is what counts">
          The calculator uses the rate you enter. Rates change daily and vary by postcode, health and the features you choose.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="£100,000 pot at 66, 25% tax-free, 7.5% level annuity, full State Pension"
          steps={[
            { label: "Tax-free lump sum", value: "£25,000" },
            { label: "Annuity price", value: "£75,000" },
            { label: "Income a year before tax", value: "£5,625" },
            { label: "Income Tax (State Pension uses the allowance)", value: "£1,120.52" },
          ]}
          total={{ label: "Income after tax (£375.37 a month)", value: "£4,504.48" }}
        />
        <p>
          Without taking the tax-free cash, the whole £100,000 would buy £7,500 a year, or £6,004 after tax. A £200,000 pot on the same terms gives
          about £750 a month after tax.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={5} kicker="Tax" title="How annuity income is taxed">
        <p>
          Income from an annuity bought with pension money is taxed like a salary, through PAYE. It is added to your State Pension and other income.
          The full new State Pension is £12,547.60 in 2026/27, using almost all of the £12,570 Personal Allowance, so most annuity income is taxed at
          20% or more. The 25% lump sum taken before buying the annuity is tax-free. An annuity bought with your own savings (a purchased life annuity)
          is taxed differently: only the interest part of each payment is taxed.
        </p>
      </GuideSection>

      <GuideSection id="options" n={6} kicker="Choices" title="Options that change the rate">
        <ul>
          <li><strong>Joint life:</strong> keeps paying a spouse or partner after you die, often at half or two-thirds of the income. Lowers the rate.</li>
          <li><strong>Guarantee period:</strong> pays for at least, say, 5 or 10 years even if you die sooner. Lowers the rate slightly.</li>
          <li><strong>Value protection:</strong> returns the unused part of the price to your estate if you die early.</li>
          <li><strong>Escalation:</strong> income rises each year by a fixed percentage or with <a href="/investing/inflation-impact">inflation</a>. Lowers the starting rate a lot.</li>
          <li><strong>Payment timing:</strong> monthly in advance or in arrears, which slightly changes the amount.</li>
        </ul>
      </GuideSection>

      <GuideSection id="level-increasing" n={7} kicker="Inflation" title="Level or increasing?">
        <CompareCards
          columns={[
            {
              name: "Level annuity",
              rows: [
                { label: "Starting income", value: "Higher" },
                { label: "Later", value: "Same cash, buys less each year" },
                { label: "Best if", value: "You expect a shorter retirement or have other inflation-linked income" },
              ],
            },
            {
              name: "Increasing annuity",
              rows: [
                { label: "Starting income", value: "Lower, often by a third" },
                { label: "Later", value: "Keeps pace with prices" },
                { label: "Best if", value: "You expect a long retirement" },
              ],
            },
          ]}
        />
        <p>
          With 3% a year inflation, a level income loses about a quarter of its buying power in 10 years. An increasing annuity starting at, say, 5.5%
          and rising 3% a year takes about 14.7 years to pay back its price, against 13.3 years for a level one at 7.5%.
        </p>
      </GuideSection>

      <GuideSection id="enhanced" n={8} kicker="Health" title="Enhanced annuities">
        <p>
          If you smoke or have a health condition such as high blood pressure, diabetes, heart disease or a history of cancer, or are significantly
          overweight, insurers may offer a higher rate, because they expect to pay for fewer years. Many people buying annuities qualify for
          some enhancement, so always fill in the health and lifestyle questions.
        </p>
      </GuideSection>

      <GuideSection id="payback" n={9} kicker="Value" title="When do you get your money back?">
        <p>
          At a 7.5% level rate, you receive the purchase price back in income after about 13.3 years: age 79 for someone buying at 66. Every year you
          live after that is income you would not have had from the money otherwise. A 66-year-old in the UK has a good chance of living well into
          their eighties, which is why an annuity can be good value, but if you die early, a single-life annuity with no guarantee stops.
        </p>
      </GuideSection>

      <GuideSection id="vs-drawdown" n={10} kicker="Choosing" title="Annuity or drawdown?">
        <p>
          Taking the same £5,625 a year from £75,000 left invested in drawdown would last until about 81 at 2% growth, 84 at 4% and 86 at 5%. The
          annuity keeps paying beyond that, for life, with no investment risk. Drawdown keeps flexibility and leaves money for your heirs if you die
          early. Compare with the <a href="/investing/pension-drawdown">drawdown calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="mix" n={11} kicker="Strategy" title="Mixing the two">
        <p>
          You do not have to choose one. A common approach is to buy an annuity that, with the State Pension, covers essential spending such as
          housing, food and bills, and keep the rest in drawdown for flexible spending and emergencies. You can also buy an annuity later: rates are
          higher at older ages, so some people use drawdown in their sixties and buy an annuity in their seventies.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={12} kicker="Timing" title="When to buy">
        <p>
          There is no need to buy at retirement. Waiting means a higher rate because you are older, but you give up the income in the meantime and
          rates may fall if interest rates fall. You can also split your purchase over several years to spread the risk of buying at a bad time.
        </p>
      </GuideSection>

      <GuideSection id="shopping" n={13} kicker="Practical" title="Shopping around">
        <ul>
          <li>Your pension provider must tell you how its quote compares with the best on the market. Use the open market option to buy elsewhere.</li>
          <li>Use a comparison service or broker, and give full health and lifestyle details.</li>
          <li>Book a free Pension Wise appointment, or take regulated financial advice for larger sums.</li>
          <li>Check whether any of your pensions offer a guaranteed annuity rate: older policies sometimes have generous ones.</li>
        </ul>
      </GuideSection>

      <GuideSection id="defined-benefit" n={14} kicker="Other pensions" title="Final salary pensions">
        <p>
          An annuity is only needed for defined contribution pensions, where you have a pot of money. A defined benefit (final salary) pension already
          pays a guaranteed income for life, usually rising with inflation and often with a spouse&rsquo;s pension. Transferring a final salary pension
          to buy an annuity or use drawdown is rarely in your interest, and if it is worth more than £30,000 you must take regulated financial advice
          first.
        </p>
      </GuideSection>

      <GuideSection id="small-pots" n={15} kicker="Small pensions" title="Small pots">
        <p>
          If your pot is small, an annuity may not be worth buying: some insurers have minimum purchase amounts, and the income may be only a few pounds a
          week. Pots of £10,000 or less can usually be taken as a cash lump sum under the small pots rules, with 25% tax-free and the rest taxed as income,
          without triggering the Money Purchase Annual Allowance. You can do this for up to three personal pensions, and any number of workplace ones.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={16} kicker="Benefits" title="Annuities and means-tested benefits">
        <p>
          Annuity income counts as income for Pension Credit, Housing Benefit and <a href="/benefits/council-tax-reduction">Council Tax Reduction</a>. If your income is low, a small annuity can reduce
          these benefits pound for pound, so check the <a href="/benefits/pension-credit">Pension Credit calculator</a> before you buy. The DWP may also
          treat you as having income from a pension pot you could have used to buy an annuity, so leaving it untouched does not always help.
        </p>
      </GuideSection>

      <GuideSection id="scams" n={17} kicker="Safety" title="Avoiding pension scams">
        <ul>
          <li>Be wary of anyone who contacts you out of the blue about your pension.</li>
          <li>Check any firm on the Financial Conduct Authority register before dealing with it.</li>
          <li>Be suspicious of offers of free pension reviews, guaranteed high returns or early access before 55.</li>
          <li>Take your time: a genuine annuity quote will still be available after you have checked it.</li>
        </ul>
      </GuideSection>

      <GuideSection id="how-priced" n={18} kicker="Pricing" title="How insurers price annuities">
        <p>
          An insurer works out how long it expects to pay you, using life expectancy tables adjusted for your age, health, lifestyle and postcode, and then
          how much it can earn by investing your money, mainly in government and corporate bonds. When long-term interest rates rise, annuity rates rise with
          them; when they fall, annuity rates fall. That is why annuities were poor value in the late 2010s, when gilt yields were very low, and much better
          value since 2023. The insurer also adds a margin for its costs and profit, which is why rates differ between companies by several percent.
        </p>
      </GuideSection>

      <GuideSection id="example-joint" n={19} kicker="Example" title="A joint-life example">
        <p>
          A couple who want the income to continue after the first death can buy a joint-life annuity. Covering a partner with a 50% pension typically
          reduces the starting income by roughly 10% to 15%, depending on the partner&rsquo;s age. On the £75,000 example above, that might mean around
          £5,000 a year instead of £5,625, with half continuing to the surviving partner for life. Ask for both quotes and compare them with life
          insurance as a way to protect a partner.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Annuities, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Tax-free cash before buying", "25%, up to £268,275"],
            ["Best level rate at 65 (Which?, 2025 to 2026)", "Above 7.5%"],
            ["£75,000 at 7.5%", "£5,625 a year"],
            ["Full new State Pension", "£12,547.60 a year"],
            ["Personal Allowance", "£12,570"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
