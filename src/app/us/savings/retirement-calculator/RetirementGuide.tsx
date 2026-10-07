import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Retirement planning — the guide. Figures from src/lib/us/savings.ts (retirement). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the calculator works" },
  { id: "example", title: "A worked example" },
  { id: "spending", title: "How much you will spend" },
  { id: "social-security", title: "Social Security in 2026" },
  { id: "claiming", title: "When to claim Social Security" },
  { id: "gap", title: "The gap your savings must fill" },
  { id: "four-percent", title: "The 4% rule" },
  { id: "two-tests", title: "Why two tests can disagree" },
  { id: "inflation", title: "Inflation: the biggest number" },
  { id: "retire-age", title: "Retiring earlier or later" },
  { id: "save-more", title: "Saving more each month" },
  { id: "returns", title: "Returns before and after retiring" },
  { id: "longevity", title: "How long to plan for" },
  { id: "late-start", title: "Starting late" },
  { id: "accounts", title: "Where to save" },
  { id: "taxes", title: "Taxes in retirement" },
  { id: "health", title: "Health care before and after 65" },
  { id: "behind", title: "If you're behind" },
  { id: "sequence", title: "Sequence-of-returns risk" },
  { id: "pensions", title: "Pensions and annuities" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Social Security Administration — 2026 cost-of-living adjustment fact sheet", href: "https://www.ssa.gov/cola/factsheets/2026.html" },
  { label: "Social Security Administration — Retirement age and benefit reduction", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "Social Security Administration — Delayed retirement credits", href: "https://www.ssa.gov/benefits/retirement/planner/delayret.html" },
  { label: "IRS — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500", href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
  { label: "Medicare.gov — When to sign up", href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start" },
  { label: "Investor.gov — Save and invest", href: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest" },
];

export default function RetirementGuide() {
  return (
    <Guide
      kicker="The retirement planning guide"
      title="Are you on track to retire? How to check, and what to change"
      intro={
        <>
          Planning for retirement comes down to one question: will your savings and Social Security pay for the life you want, for as long as you
          live? This guide explains how the calculator answers it, the 2026 Social Security figures, the 4% rule, why inflation matters so much, and
          the levers you can pull if you&rsquo;re behind.
        </>
      }
      meta={["Worked examples", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Work out the yearly gap between the spending you want and the Social Security and pensions you will get.</li>
          <li>The 4% rule says you need about 25 times that gap saved: a $36,000 gap points to $900,000 in today&rsquo;s dollars.</li>
          <li>Social Security rose 2.8% in 2026; the average retired worker gets about $2,071 a month.</li>
          <li>If you&rsquo;re short, saving more, retiring later, spending less and claiming Social Security later all help.</li>
        </ul>
        <KeyStats
          items={[
            { value: "25×", label: "Yearly gap: the 4% rule target" },
            { value: "67", label: "Full retirement age (born 1960+)" },
            { value: "$2,071", label: "Average retired worker benefit a month" },
            { value: "2.8%", label: "2026 Social Security increase" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How the calculator works">
        <p>The calculator runs your plan in two stages.</p>
        <ol>
          <li>
            <strong>Saving.</strong>{" "}Your current savings and monthly saving grow at the return you set until your retirement age, month by
            month.
          </li>
          <li>
            <strong>Spending.</strong>{" "}From retirement, it takes out each year&rsquo;s gap between spending and Social Security, both rising with
            inflation, at the start of the year, and grows what&rsquo;s left at your retirement return.
          </li>
        </ol>
        <p>
          It also works out the nest egg you would need at retirement to pay the gap every year to your plan-to age, and, if you are short, the extra
          monthly saving that closes the gap. Everything is before tax, so enter spending as the amount you would need before paying any tax on
          withdrawals.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Age 35, $50,000 saved, $800 a month, retire at 67, plan to 92"
          steps={[
            { label: "Spending wanted (today's dollars)", value: "$60,000 a year" },
            { label: "Social Security (today's dollars)", value: "$24,000 a year" },
            { label: "Gap from savings (today's dollars)", value: "$36,000 a year" },
            { label: "Saved by 67 at 7% a year", value: usd(1_609_349) },
            { label: "Needed at 67 to pay the gap to 92 at 5%", value: usd(1_507_850) },
          ]}
          total={{ label: "Result", value: "On track: money lasts to 92" }}
        />
        <p>
          With 2.5% inflation, the {usd(1_609_349)} at 67 is worth about {usd(730_275)} in today&rsquo;s dollars, and the amount needed is about{" "}
          {usd(684_218)}. The balance peaks at retirement and then falls, to about {usd(1_050_949)} at 85 and {usd(343_710)} at 92.
        </p>
      </GuideSection>

      <GuideSection id="spending" n={4} kicker="Your budget" title="How much you will spend">
        <p>
          A common starting point is 70% to 80% of your income before retirement. You stop saving for retirement and paying Social Security and
          Medicare tax on wages, and commuting and work costs fall. But travel, hobbies and health care often rise, especially in the first years.
        </p>
        <p>Better still, build a retirement budget from your current spending:</p>
        <ul>
          <li>Housing: will your mortgage be paid off? Property tax, insurance and upkeep continue.</li>
          <li>Health care: Medicare premiums, supplemental coverage and out-of-pocket costs.</li>
          <li>Everyday living, transport, travel and gifts.</li>
          <li>Tax on withdrawals from traditional 401(k)s and IRAs.</li>
        </ul>
      </GuideSection>

      <GuideSection id="social-security" n={5} kicker="2026 figures" title="Social Security in 2026">
        <p>
          Social Security benefits rose by 2.8% from January 2026, the cost-of-living adjustment (COLA) based on inflation. The Social Security
          Administration estimates the average retired worker&rsquo;s benefit rose from $2,015 to about $2,071 a month, or about $24,850 a year. The
          maximum benefit at full retirement age is $4,152 a month.
        </p>
        <p>
          Your own benefit is based on your highest 35 years of earnings, adjusted for wage growth. The best source is your my Social Security
          account at ssa.gov, which shows estimates at 62, at full retirement age and at 70. Enter the yearly amount for the age you plan to claim,
          in today&rsquo;s dollars; the calculator raises it with inflation, as COLAs do.
        </p>
        <Callout title="Benefits and taxes">
          In 2026, Social Security tax applies to wages up to $184,500. Depending on your other income, up to 85% of your benefit can be taxable
          in retirement.
        </Callout>
      </GuideSection>

      <GuideSection id="claiming" n={6} kicker="A big choice" title="When to claim Social Security">
        <Timeline
          items={[
            { when: "Age 62", what: "Earliest claim: up to 30% less", detail: "For anyone born in 1960 or later, claiming at 62 pays 70% of the full benefit, for life." },
            { when: "Age 67", what: "Full retirement age", detail: "The full benefit for anyone born in 1960 or later." },
            { when: "Age 70", what: "Maximum: 24% more", detail: "Delayed retirement credits add 8% for each year you wait past 67, up to 70." },
          ]}
        />
        <p>
          Waiting raises your check for life and the benefit your spouse could receive as a survivor. Claiming early can make sense if your health is
          poor or you need the income. If you retire before you claim, your savings must cover the full spending until Social Security starts, which
          the calculator doesn&rsquo;t model separately: lower the Social Security figure to reflect an early claim, or add the bridge years to your
          spending.
        </p>
      </GuideSection>

      <GuideSection id="gap" n={7} kicker="The key figure" title="The gap your savings must fill">
        <p>
          The gap is spending minus Social Security and pensions. It drives everything else. In the example, $60,000 of spending and $24,000 of
          Social Security leave a $36,000 gap. Without Social Security, the same person would need about {usd(2_513_084)} at 67 instead of{" "}
          {usd(1_507_850)}, and the money would run out at 81. With $30,000 of Social Security, the need falls to {usd(1_256_542)}.
        </p>
        <Figure label="Needed at 67 by yearly Social Security" caption="Same example: $60,000 spending, 2.5% inflation, 5% return in retirement, plan to 92.">
          <Bars
            format={usd}
            items={[
              { label: "No Social Security", value: 2_513_084 },
              { label: "$24,000 a year", value: 1_507_850 },
              { label: "$30,000 a year", value: 1_256_542 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="four-percent" n={8} kicker="Rule of thumb" title="The 4% rule">
        <p>
          The 4% rule comes from studies of US market history in the 1990s. If you take 4% of your savings in the first year of retirement and raise
          the dollar amount with inflation each year after, a portfolio of stocks and bonds has historically lasted at least 30 years, even through bad
          markets. Turned around, it means saving 25 times the yearly gap.
        </p>
        <DataTable
          caption="The 4% rule target for different yearly gaps (today's dollars)"
          head={["Yearly gap", "Savings target (25×)"]}
          numeric={[1]}
          rows={[
            ["$20,000", "$500,000"],
            ["$36,000", "$900,000"],
            ["$50,000", "$1,250,000"],
            ["$75,000", "$1,875,000"],
          ]}
        />
        <p>
          It is a starting point, not a law. Retiring very early, with 40 or more years ahead, calls for a lower rate, often 3% to 3.5%. People who
          can cut spending in bad years can usually start a little higher.
        </p>
      </GuideSection>

      <GuideSection id="two-tests" n={9} kicker="Reading the result" title="Why two tests can disagree">
        <p>
          In the example the calculator says you&rsquo;re on track, yet the 4% rule says {usd(900_000)} and you are on course for {usd(730_275)} in
          today&rsquo;s dollars. Both can be right. The calculator assumes a steady 5% return in retirement and a plan that ends at 92, spending the
          money down to nothing. The 4% rule is built to survive the worst historical sequences of returns, including a crash just after you retire,
          over 30 years.
        </p>
        <Callout tone="warn" title="Treat a narrow pass with care">
          If you pass the calculator&rsquo;s test but not the 4% rule, your plan works if markets behave on average. A bigger margin, from saving a
          little more or working a little longer, protects you if they don&rsquo;t.
        </Callout>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Real value" title="Inflation: the biggest number">
        <p>
          Over 32 years at 2.5% inflation, prices rise about 2.2 times. $60,000 of spending today becomes about {usd(132_225)} a year at 67, and the
          $36,000 gap becomes about {usd(79_335)} in the first year of retirement. That is why the nest egg needed looks so large in future dollars.
        </p>
        <CompareCards
          columns={[
            {
              name: "2% inflation",
              rows: [
                { label: "Needed at 67", value: usd(1_224_124) },
                { label: "Extra a month", value: "$0" },
              ],
            },
            {
              name: "3% inflation",
              rows: [
                { label: "Needed at 67", value: usd(1_857_706) },
                { label: "Extra a month", value: "$182" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="retire-age" n={11} kicker="Timing" title="Retiring earlier or later">
        <DataTable
          caption="Same saver, different retirement ages (Social Security held at $24,000)"
          head={["Retire at", "Saved", "Needed", "Extra a month", "Money lasts to"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["62", usd(1_094_841), usd(1_515_742), "$456", "81"],
            ["65", usd(1_381_802), usd(1_516_892), "$116", "88"],
            ["67", usd(1_609_349), usd(1_507_850), "$0", "92"],
            ["70", usd(2_016_151), usd(1_476_512), "$0", "92"],
          ]}
        />
        <p>
          Each extra year of work helps three ways: another year of saving, another year of growth, and one less year to pay for. In reality the
          effect is even larger, because claiming Social Security later also raises the check.
        </p>
      </GuideSection>

      <GuideSection id="save-more" n={12} kicker="The main lever" title="Saving more each month">
        <Figure label="Saved by 67 by monthly saving" caption="Age 35, $50,000 saved, 7% return.">
          <Bars
            format={usd}
            items={[
              { label: "$500 a month", value: 1_180_825 },
              { label: "$800 a month", value: 1_609_349 },
              { label: "$1,200 a month", value: 2_180_713 },
              { label: "$1,500 a month", value: 2_609_236 },
            ]}
          />
        </Figure>
        <p>
          At $500 a month the money runs out at 85, and about $240 a month more would fix it. The easiest way to save more is through work: our{" "}
          <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows what your employer match adds, and the{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a>{" "}what tax-free saving on the side could reach.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={13} kicker="Assumptions" title="Returns before and after retiring">
        <p>
          The defaults are 7% a year while you save and 5% in retirement, both before inflation. Stocks have earned more than that over long
          periods, bonds and cash less. As retirement nears, most people move toward more bonds to reduce the risk of a crash just before or after
          they stop work, so returns tend to fall.
        </p>
        <p>
          Small changes matter. Dropping the saving return from 7% to 6% cuts the example&rsquo;s savings at 67 to {usd(1_265_565)}, and the money
          then runs out at 86. Dropping the retirement return to 4% raises the amount needed to {usd(1_675_225)}. Try cautious figures as well as
          hopeful ones.
        </p>
      </GuideSection>

      <GuideSection id="longevity" n={14} kicker="Life expectancy" title="How long to plan for">
        <p>
          Average life expectancy is a poor planning target, because half of people live longer. The default plan-to age is 92. Planning to 97
          instead raises the amount needed in the example to {usd(1_714_922)}, and the extra monthly saving to $77. Annuities and delaying Social
          Security are two ways to protect against a very long life, since both pay for as long as you live.
        </p>
      </GuideSection>

      <GuideSection id="late-start" n={15} kicker="Ages 45 and up" title="Starting late">
        <p>
          A 45-year-old with $150,000 saved and $800 a month, retiring at 67, is on course for {usd(1_196_281)}, just above the {usd(1_177_930)}{" "}
          needed, because fewer years of inflation also mean a smaller target. From 50, catch-up contributions let you put an extra $8,000 into a
          401(k) and $1,100 into an IRA each year in 2026, and from 60 to 63 the 401(k) catch-up is $11,250.
        </p>
        <p>
          Starting early is still far easier. A 25-year-old with $5,000 saved and $400 a month reaches {usd(1_311_258)} by 67 but needs{" "}
          {usd(1_930_176)} in future dollars, because 42 years of inflation lift the target. About $217 a month more puts them on track. Our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows how much time adds.
        </p>
      </GuideSection>

      <GuideSection id="accounts" n={16} kicker="Accounts" title="Where to save">
        <ul>
          <li><strong>401(k), 403(b) or 457(b):</strong>{" "}up to $24,500 in 2026, plus catch-ups, often with an employer match.</li>
          <li><strong>IRA:</strong>{" "}up to $7,500, plus $1,100 from 50. Roth or traditional.</li>
          <li><strong>Health savings account:</strong>{" "}for people with a high-deductible health plan; tax-free for medical costs.</li>
          <li><strong>Taxable brokerage account:</strong>{" "}no limits or early-withdrawal rules, but no tax breaks.</li>
        </ul>
        <p>
          The calculator treats all of these as one pot. For short-term goals before retirement, a savings account is better: see our{" "}
          <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="taxes" n={17} kicker="Tax" title="Taxes in retirement">
        <p>
          Withdrawals from traditional 401(k)s and IRAs are taxed as ordinary income. Roth withdrawals are tax-free if qualified. Part of your
          Social Security may be taxed, and some states tax retirement income. Because the calculator ignores tax, either enter your spending
          including the tax you expect to pay, or keep a mix of Roth and traditional money so you can control your taxable income each year.
        </p>
      </GuideSection>

      <GuideSection id="health" n={18} kicker="Costs" title="Health care before and after 65">
        <p>
          Medicare starts at 65, two years before full retirement age for most people today. If you retire earlier, budget for private coverage
          until then, which can be expensive. After 65, plan for Part B premiums, a supplement or Medicare Advantage plan, drug costs and dental and
          vision care, which original Medicare mostly doesn&rsquo;t cover.
        </p>
      </GuideSection>

      <GuideSection id="behind" n={19} kicker="Next steps" title="If you're behind">
        <ol>
          <li>Make sure you get your full employer match.</li>
          <li>Raise your saving by 1% of pay each year, timed with raises.</li>
          <li>Use catch-up contributions from 50.</li>
          <li>Consider working two or three years longer, perhaps part time.</li>
          <li>Delay Social Security toward 70 if you can.</li>
          <li>Trim planned spending, or plan to downsize your home.</li>
        </ol>
        <p>Re-run the calculator once a year: small changes made early are much easier than big ones made late.</p>
      </GuideSection>

      <GuideSection id="sequence" n={20} kicker="Risk" title="Sequence-of-returns risk">
        <p>
          Two retirees can earn the same average return and end up in very different places. If markets fall sharply in the first few years of
          retirement, you sell investments at low prices to pay your bills, and that money never recovers. The same fall late in retirement does
          much less harm. The calculator assumes a steady return every year, so it can&rsquo;t show this. A cash buffer of one or two years&rsquo;
          spending, and a willingness to spend a little less after a bad year, both reduce the risk.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={21} kicker="Other income" title="Pensions and annuities">
        <p>
          A workplace pension or an annuity pays a set income for life, much like Social Security. Add it to the Social Security figure in the
          calculator, in today&rsquo;s dollars. If it doesn&rsquo;t rise with inflation, as many private pensions don&rsquo;t, enter a little less than
          today&rsquo;s amount to allow for its value falling over time.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["Social Security COLA", "2.8%"],
            ["Average retired worker benefit", "About $2,071 a month"],
            ["Maximum benefit at full retirement age", "$4,152 a month"],
            ["Full retirement age (born 1960+)", "67"],
            ["Reduction for claiming at 62", "Up to 30%"],
            ["Social Security wage base", "$184,500"],
            ["401(k) limit / catch-up at 50+", "$24,500 / $8,000"],
            ["IRA limit / catch-up at 50+", "$7,500 / $1,100"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
