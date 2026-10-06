import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Pension drawdown — the guide. Figures from src/lib/investing/savings.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What drawdown is" },
  { id: "tax-free", title: "Tax-free cash: upfront or phased" },
  { id: "tax", title: "How withdrawals are taxed" },
  { id: "examples", title: "Worked examples" },
  { id: "how-much", title: "How much can I take each year?" },
  { id: "sequence", title: "The risk of bad early years" },
  { id: "state-pension", title: "Bridging to the State Pension" },
  { id: "mpaa", title: "The Money Purchase Annual Allowance" },
  { id: "emergency-tax", title: "Emergency tax on first withdrawals" },
  { id: "vs-annuity", title: "Drawdown or an annuity?" },
  { id: "inheritance", title: "Drawdown and inheritance" },
  { id: "review", title: "Reviewing your plan" },
  { id: "costs", title: "Charges in drawdown" },
  { id: "spending", title: "Planning your spending" },
  { id: "care", title: "Care costs later in life" },
  { id: "couples", title: "Couples" },
  { id: "providers", title: "Choosing a drawdown provider" },
  { id: "review-example", title: "A review in practice" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Personal pensions: taking your pension", href: "https://www.gov.uk/personal-pensions-your-rights/taking-your-pension" },
  { label: "GOV.UK — Tax on your private pension contributions: Money Purchase Annual Allowance", href: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
  { label: "GOV.UK — Tax when you get a pension: Lump Sum Allowance", href: "https://www.gov.uk/tax-on-pension" },
  { label: "MoneyHelper — Pension Wise", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-wise" },
  { label: "GOV.UK — The new State Pension", href: "https://www.gov.uk/new-state-pension" },
];

export default function DrawdownGuide() {
  return (
    <Guide
      kicker="The pension drawdown guide"
      title="How long will my pension last in drawdown?"
      intro={
        <>
          Drawdown lets you leave your pension invested and take money out as you need it, instead of buying an annuity. It is flexible, but the
          risk sits with you: take too much, or suffer poor returns, and the money can run out. This guide explains tax-free cash, how withdrawals
          are taxed alongside the State Pension, how much is sensible to take and the rules that catch people out.
        </>
      }
      meta={["2026/27 rules", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You can usually take <strong>25% tax-free</strong>, up to £268,275, and the rest is taxed as income when you withdraw it.</li>
          <li>A £250,000 pot at 66, with £62,500 taken tax-free and £15,000 a year withdrawn rising with inflation, lasts to about <strong>79</strong> at 4% growth.</li>
          <li>Taking less, or growth above inflation, makes it last much longer.</li>
          <li>Once you take taxable income, you can only pay <strong>£10,000 a year</strong> into pensions with tax relief.</li>
        </ul>
        <KeyStats
          items={[
            { value: "25%", label: "Tax-free cash" },
            { value: "£268,275", label: "Lump Sum Allowance" },
            { value: "£10,000", label: "Money Purchase Annual Allowance" },
            { value: "55", label: "Minimum pension age (57 from 2028)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What drawdown is">
        <p>
          With flexi-access drawdown, your defined contribution pension stays invested in funds you choose, and you take income when you want:
          regular monthly payments, occasional lump sums, or nothing for a while. Whatever is left when you die can pass to your beneficiaries. The
          alternative is an annuity, which turns your pot into a guaranteed income for life. Many people combine the two.
        </p>
      </GuideSection>

      <GuideSection id="tax-free" n={3} kicker="Tax-free cash" title="Tax-free cash: upfront or phased">
        <CompareCards
          columns={[
            {
              name: "Take 25% upfront",
              rows: [
                { label: "How", value: "One lump sum when you start" },
                { label: "Then", value: "Every later withdrawal is taxed" },
                { label: "Good for", value: "Paying off a mortgage, a big purchase" },
              ],
            },
            {
              name: "Phased (UFPLS)",
              rows: [
                { label: "How", value: "25% of each withdrawal is tax-free" },
                { label: "Then", value: "75% of each is taxed" },
                { label: "Good for", value: "Keeping the tax-free part invested" },
              ],
            },
          ]}
        />
        <p>
          Taking the lump sum upfront and leaving it in cash means it is no longer invested for growth. If you do not need it, phasing keeps more money
          invested and spreads the tax-free element across many years.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={4} kicker="Tax" title="How withdrawals are taxed">
        <p>
          The taxable part of each withdrawal is added to your other income for the year, including the State Pension, and taxed at your normal
          rates. The full new State Pension is £12,547.60 a year in 2026/27, which uses almost all of the £12,570 Personal Allowance. So once you
          get the State Pension, nearly every pound of drawdown income is taxed at 20% or more. Before State Pension age, the first £12,570 a year
          of withdrawals can come out tax-free.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="£250,000 at 66, 25% upfront, £15,000 a year, 4% growth, 2.5% inflation"
          steps={[
            { label: "Tax-free lump sum", value: "£62,500" },
            { label: "Year 1 (before State Pension): tax", value: "£486" },
            { label: "Year 2 with State Pension: income after tax", value: "£25,103" },
          ]}
          total={{ label: "Pot runs out at", value: "79" }}
        />
        <DataTable
          caption="How long £250,000 lasts from 66, with 25% taken upfront"
          head={["Yearly withdrawal", "Growth", "Lasts until"]}
          rows={[
            ["£10,000", "4%", "87"],
            ["£15,000", "2%", "78"],
            ["£15,000", "4%", "79"],
            ["£15,000", "6%", "81"],
            ["£20,000", "4%", "75"],
          ]}
        />
        <p>
          Phasing the tax-free cash instead, with the whole £250,000 kept invested, makes the same £15,000 a year last until 84, and the first
          year&rsquo;s withdrawal is completely tax-free.
        </p>
      </GuideSection>

      <GuideSection id="how-much" n={6} kicker="Withdrawal rate" title="How much can I take each year?">
        <p>
          A common rule of thumb is that withdrawing about 4% of a pot in the first year, then raising it with inflation, has historically lasted
          around 30 years. Research based on UK markets suggests a lower figure, nearer 3% to 3.5%, may be safer for someone retiring in their
          early sixties. The calculator shows your starting withdrawal rate and how different amounts change how long the pot lasts.
        </p>
        <Callout title="Plan for a long life">
          A 66-year-old has a good chance of living into their late eighties or nineties. Plan for your pot to last at least that long, or combine
          drawdown with an annuity for a guaranteed floor of income.
        </Callout>
      </GuideSection>

      <GuideSection id="sequence" n={7} kicker="Risk" title="The risk of bad early years">
        <p>
          The calculator assumes the same growth every year. Real markets go up and down, and the order matters: big losses in the first few years,
          while you are also withdrawing, do far more damage than the same losses later. This is called sequence of returns risk. Keeping one or
          two years of withdrawals in cash, and cutting back after a bad year, are common ways to manage it.
        </p>
      </GuideSection>

      <GuideSection id="state-pension" n={8} kicker="Timing" title="Bridging to the State Pension">
        <p>
          Many people retire before State Pension age, which is 66 now, rising to 67 between 2026 and 2028. Drawing more from your pension until the
          State Pension starts, then less, can make good use of your Personal Allowance in the early years. Check your State Pension age with the{" "}
          <a href="/investing/state-pension-age">State Pension age calculator</a>, and your forecast on GOV.UK.
        </p>
      </GuideSection>

      <GuideSection id="mpaa" n={9} kicker="Contributions" title="The Money Purchase Annual Allowance">
        <p>
          Taking any taxable income from flexi-access drawdown, or a UFPLS payment, triggers the Money Purchase Annual Allowance. From then on, only
          £10,000 a year can be paid into defined contribution pensions with tax relief, instead of £60,000. Taking just the 25% tax-free lump sum
          does not trigger it. If you are still working and saving into a pension, think about this before taking income.
        </p>
      </GuideSection>

      <GuideSection id="emergency-tax" n={10} kicker="Tax codes" title="Emergency tax on first withdrawals">
        <p>
          Your pension provider often taxes the first withdrawal on an emergency tax code, as if you would take the same amount every month. That can
          mean far too much tax. You can reclaim it from HMRC straight away using form P55 (for a one-off withdrawal) or P53Z (if you have emptied the
          pot), or wait for it to be corrected through your tax code. See the <a href="/tax-and-salary/emergency-tax">emergency tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="vs-annuity" n={11} kicker="Choosing" title="Drawdown or an annuity?">
        <CompareCards
          columns={[
            {
              name: "Drawdown",
              rows: [
                { label: "Income", value: "Flexible, not guaranteed" },
                { label: "Investment risk", value: "Yours" },
                { label: "On death", value: "What is left passes on" },
              ],
            },
            {
              name: "Annuity",
              rows: [
                { label: "Income", value: "Guaranteed for life" },
                { label: "Investment risk", value: "The insurer's" },
                { label: "On death", value: "Stops, unless you add a guarantee" },
              ],
            },
          ]}
        />
        <p>
          Compare a guaranteed income with the <a href="/investing/annuity">annuity calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="inheritance" n={12} kicker="Estate" title="Drawdown and inheritance">
        <p>
          Money left in a pension can pass to your beneficiaries. If you die before 75 it is usually free of Income Tax for them; after 75 they pay
          Income Tax at their own rate when they take it. From April 2027, unused pension funds will also count towards your estate for inheritance
          tax, so leaving a large pot untouched will be less attractive than it has been.
        </p>
      </GuideSection>

      <GuideSection id="review" n={13} kicker="Practical" title="Reviewing your plan">
        <p>
          Drawdown is not a decision you make once. Review your withdrawals, investments and charges at least once a year, and after any large market
          fall. Pension Wise offers free guidance, and a regulated financial adviser can recommend a plan for you. Watch out for scams: never transfer
          a pension after an unexpected call.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={14} kicker="Charges" title="Charges in drawdown">
        <p>
          Drawdown usually involves a platform fee, fund charges and sometimes an adviser&rsquo;s fee, often adding up to 0.5% to 1.5% a year. Charges come
          out whether markets rise or fall, so they matter more the longer your money is invested. The calculator&rsquo;s growth rate should be after
          charges: if you expect 5% from investments and pay 1% in fees, enter 4%.
        </p>
      </GuideSection>

      <GuideSection id="spending" n={15} kicker="Budgeting" title="Planning your spending">
        <p>
          Spending in retirement is rarely flat. Many people spend more in their early, active years on travel and hobbies, less in their seventies,
          then possibly more again on care. Start by working out your essential spending: housing, bills, food and transport. Aim to cover that from
          guaranteed income such as the State Pension, a final salary pension or an annuity, and use drawdown for the rest. That way a bad year in the
          markets affects holidays, not heating.
        </p>
      </GuideSection>

      <GuideSection id="care" n={16} kicker="Care" title="Care costs later in life">
        <p>
          Care costs can be large. A pension pot in drawdown counts as capital in the council&rsquo;s care means test only once you take money out, but the
          income you could draw may be taken into account. Planning for possible care is one reason not to draw a pot down too quickly. See the{" "}
          <a href="/life/care-home-means-test">care home means test calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={17} kicker="Couples" title="Couples">
        <p>
          Each partner has their own Personal Allowance, so drawing income from both partners&rsquo; pensions can keep both of you in the basic-rate band
          and reduce the tax a couple pays. If one partner has a smaller pension, it can make sense to draw more from theirs first. Make sure both pensions
          have up-to-date nominations, so the money goes to the right person if one of you dies.
        </p>
      </GuideSection>

      <GuideSection id="providers" n={18} kicker="Practical" title="Choosing a drawdown provider">
        <p>
          You do not have to stay with your current pension provider for drawdown. Many workplace schemes do not offer it at all, so you may need to
          transfer to a personal pension or SIPP. When you compare providers, look at the yearly platform fee, the charges for each withdrawal, the range
          and cost of funds, and how easy it is to change your income. Some providers offer ready-made investment pathways, chosen for common plans such as
          taking an income over the next five years or leaving the money untouched. Check that any firm is authorised by the Financial Conduct Authority.
        </p>
      </GuideSection>

      <GuideSection id="review-example" n={19} kicker="Example" title="A review in practice">
        <p>
          Suppose you start drawdown at 66 with £187,500 invested and take £15,000 a year. After a year in which markets fall 15%, your pot would be worth
          far less than planned. Cutting your withdrawal for a year or two, or skipping the inflation increase, gives the pot time to recover and can add
          several years to how long it lasts. Planning these adjustments in advance, for example a rule to take 10% less after any year with a loss, makes
          them easier to stick to when the time comes.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Pension drawdown, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Tax-free cash", "25%, up to £268,275 in total"],
            ["Money Purchase Annual Allowance", "£10,000"],
            ["Annual Allowance (before taking income)", "£60,000"],
            ["Full new State Pension", "£241.30 a week (£12,547.60 a year)"],
            ["Personal Allowance", "£12,570"],
            ["Minimum pension age", "55, rising to 57 in April 2028"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
