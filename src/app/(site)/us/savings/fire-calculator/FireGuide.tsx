import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** FIRE (US) — the guide. Figures from src/lib/us/wealth.ts (fire, savingsRateTable, realReturn). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What FIRE means" },
  { id: "number", title: "Your FIRE number" },
  { id: "example", title: "A worked example" },
  { id: "savings-rate", title: "Why the savings rate matters most" },
  { id: "rate-table", title: "Years to FI by savings rate" },
  { id: "spending", title: "Spending cuts work twice" },
  { id: "withdrawal", title: "The 4% rule and early retirement" },
  { id: "returns", title: "Returns and inflation" },
  { id: "variants", title: "Lean, Fat, Coast and Barista FIRE" },
  { id: "coast", title: "Coast FIRE in detail" },
  { id: "barista", title: "Barista FIRE in detail" },
  { id: "accounts", title: "Where FIRE savers invest" },
  { id: "early-access", title: "Getting money out before 59½" },
  { id: "health", title: "Health insurance before Medicare" },
  { id: "taxes", title: "Taxes in early retirement" },
  { id: "social-security", title: "Social Security and FIRE" },
  { id: "sequence", title: "Bad markets early on" },
  { id: "flexibility", title: "Staying flexible" },
  { id: "first-steps", title: "First steps" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — Retirement topics: exceptions to tax on early distributions", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-tax-on-early-distributions" },
  { label: "IRS — Substantially equal periodic payments (section 72(t))", href: "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments" },
  { label: "IRS — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500", href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
  { label: "IRS — Roth IRAs", href: "https://www.irs.gov/retirement-plans/roth-iras" },
  { label: "HealthCare.gov — Coverage options if you're unemployed or retire early", href: "https://www.healthcare.gov/unemployed/coverage/" },
  { label: "Social Security Administration — Retirement age and benefit reduction", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "Investor.gov (SEC) — Save and invest", href: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest" },
];

export default function FireGuide() {
  return (
    <Guide
      kicker="The FIRE guide"
      title="How to work out when you can retire early"
      intro={
        <>
          FIRE stands for Financial Independence, Retire Early. The idea is simple: save a large share of your pay, invest it, and stop needing a
          paycheck once your investments can pay your bills. This guide explains the FIRE number, why your savings rate matters more than anything
          else, the 4% rule, the Lean, Fat, Coast and Barista versions, and the practical problems of retiring before 59½ and 65.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Your FIRE number is your yearly spending divided by your withdrawal rate. At 4%, that is 25 times what you spend.</li>
          <li>Someone spending $50,000 a year needs $1,250,000 invested, in today&rsquo;s dollars.</li>
          <li>The time it takes depends mainly on your savings rate. Saving 50% of take-home pay from scratch gets you there in about 17 years at a 7% return and 2.5% inflation.</li>
          <li>Early retirees face problems later retirees don&rsquo;t: the 10% early withdrawal tax, health insurance before 65 and a retirement that may last 50 years.</li>
        </ul>
        <KeyStats
          items={[
            { value: "25×", label: "Spending at a 4% withdrawal rate" },
            { value: "$1.25m", label: "FIRE number for $50,000 a year" },
            { value: "17.1 years", label: "To FI saving 50%, from zero" },
            { value: "55.2 years", label: "To FI saving 10%, from zero" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What FIRE means">
        <p>
          Financial independence means your investments can pay your living costs for the rest of your life, so work becomes a choice. Retiring early
          is what many people do with that freedom, but plenty keep working, switch to work they enjoy or go part-time. The movement grew online in
          the 2010s, but the maths behind it is the same maths that sits behind any <a href="/us/savings/retirement-calculator">retirement plan</a>: how
          much you spend, how much you save and how fast your money grows.
        </p>
        <p>
          What makes FIRE different is the timescale. A traditional plan saves 10% to 15% of pay for 40 years and leans on Social Security from the
          mid-60s. A FIRE plan saves 40%, 50% or more for 10 to 20 years, and has to bridge the decades before Social Security and Medicare begin.
        </p>
      </GuideSection>

      <GuideSection id="number" n={3} kicker="The target" title="Your FIRE number">
        <p>
          The FIRE number is the size of portfolio that can pay your spending indefinitely, or at least for a very long retirement. It comes from a
          withdrawal rate: the share of the portfolio you take in the first year, then raise each year with inflation.
        </p>
        <p>
          <strong>FIRE number = yearly spending ÷ withdrawal rate.</strong>{" "}At 4%, divide by 0.04, which is the same as multiplying by 25. At 3.5%,
          multiply by about 28.6. At 3%, multiply by about 33.3.
        </p>
        <DataTable
          caption="FIRE number for $50,000 of spending a year, and years to reach it (age 30, $100,000 saved, saving $30,000 a year, 7% return, 2.5% inflation)"
          head={["Withdrawal rate", "FIRE number", "Years to FI"]}
          numeric={[1, 2]}
          rows={[
            ["3%", "$1,666,667", "25.3"],
            ["3.25%", "$1,538,462", "24.1"],
            ["3.5%", "$1,428,571", "22.8"],
            ["4%", "$1,250,000", "20.8"],
            ["4.5%", "$1,111,111", "19.1"],
            ["5%", "$1,000,000", "17.7"],
          ]}
        />
        <p>
          The calculator works in today&rsquo;s dollars, so the number stays the same however far away it is. It also shows the number in the dollars
          of the year you reach it, which is much bigger because prices rise in the meantime.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Age 30, $80,000 take-home pay, $50,000 spending, $100,000 invested, 7% return, 2.5% inflation, 4% withdrawal rate"
          steps={[
            { label: "Saving a year ($80,000 − $50,000)", value: "$30,000" },
            { label: "Savings rate ($30,000 ÷ $80,000)", value: "37.5%" },
            { label: "FIRE number ($50,000 × 25)", value: "$1,250,000" },
            { label: "Real return (1.07 ÷ 1.025 − 1)", value: "4.39%" },
            { label: "Time to reach the number", value: "20.8 years" },
          ]}
          total={{ label: "Financially independent at about", value: "Age 50" }}
        />
        <p>
          In the dollars of 2047 the target is about $2.09 million, because 2.5% inflation over nearly 21 years raises prices by about two-thirds. That
          is why the calculator thinks in today&rsquo;s dollars: $1.25 million is the figure you can compare with your balance today.
        </p>
      </GuideSection>

      <GuideSection id="savings-rate" n={5} kicker="The big lever" title="Why the savings rate matters most">
        <p>
          Your savings rate is the share of take-home pay you don&rsquo;t spend. It drives FIRE in two ways at once. A higher rate means more money
          going in each year, and it also means lower spending, which means a smaller FIRE number. Pay rises only help if your spending doesn&rsquo;t
          rise with them.
        </p>
        <p>
          Because of this double effect, your income matters less than you might expect. Two people saving 50% of their pay reach FI in about the
          same time whether they take home $50,000 or $150,000, because each is building a portfolio sized to their own spending. The higher earner
          ends up with a bigger portfolio, but it takes them no longer to get there.
        </p>
      </GuideSection>

      <GuideSection id="rate-table" n={6} kicker="The table" title="Years to FI by savings rate">
        <Figure label="Years to FI starting from zero" caption="$80,000 take-home pay, 7% return, 2.5% inflation, 4% withdrawal rate, retirement spending equal to today's.">
          <Bars
            format={(n) => `${n} years`}
            items={[
              { label: "10% saved", value: 55.2 },
              { label: "20% saved", value: 38.9 },
              { label: "30% saved", value: 29.3 },
              { label: "40% saved", value: 22.4 },
              { label: "50% saved", value: 17.1 },
              { label: "60% saved", value: 12.7 },
              { label: "70% saved", value: 8.8 },
            ]}
          />
        </Figure>
        <DataTable
          caption="The same table in full"
          head={["Savings rate", "Spending a year", "FIRE number", "Years to FI"]}
          numeric={[1, 2, 3]}
          rows={[
            ["10%", "$72,000", "$1,800,000", "55.2"],
            ["15%", "$68,000", "$1,700,000", "45.7"],
            ["20%", "$64,000", "$1,600,000", "38.9"],
            ["25%", "$60,000", "$1,500,000", "33.6"],
            ["30%", "$56,000", "$1,400,000", "29.3"],
            ["40%", "$48,000", "$1,200,000", "22.4"],
            ["50%", "$40,000", "$1,000,000", "17.1"],
            ["60%", "$32,000", "$800,000", "12.7"],
            ["70%", "$24,000", "$600,000", "8.8"],
          ]}
        />
        <p>
          The calculator draws this table for your own pay and your current savings. With $100,000 already invested, every row is shorter: 50% takes
          14.7 years instead of 17.1, and 25% takes 29.1 instead of 33.6.
        </p>
      </GuideSection>

      <GuideSection id="spending" n={7} kicker="Spending" title="Spending cuts work twice">
        <p>
          In the main example, each $5,000 of yearly spending moves the finish line by about three to four and a half years, because it changes both what you
          save and what you need.
        </p>
        <DataTable
          caption="$80,000 take-home pay, $100,000 invested, 7% return, 2.5% inflation, 4% withdrawal rate"
          head={["Spending a year", "Savings rate", "FIRE number", "Years to FI"]}
          numeric={[1, 2, 3]}
          rows={[
            ["$45,000", "43.8%", "$1,125,000", "17.6"],
            ["$50,000", "37.5%", "$1,250,000", "20.8"],
            ["$55,000", "31.3%", "$1,375,000", "24.6"],
            ["$60,000", "25.0%", "$1,500,000", "29.1"],
          ]}
        />
        <p>
          The biggest wins usually come from the largest fixed costs: housing, cars and insurance. Use our{" "}
          <a href="/us/housing/rent-affordability">rent affordability calculator</a>{" "}or the{" "}
          <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}to test what a cheaper home or car would free up. A one-off cut to a
          recurring bill is worth more than a string of small daily sacrifices you won&rsquo;t keep up.
        </p>
      </GuideSection>

      <GuideSection id="withdrawal" n={8} kicker="Rule of thumb" title="The 4% rule and early retirement">
        <p>
          The 4% rule comes from studies of US stock and bond returns published in the 1990s. Taking 4% of a balanced portfolio in the first year and
          raising the dollar amount with inflation each year after survived every 30-year period in the historical record. It is a rule of thumb
          drawn from the past, not a promise.
        </p>
        <p>
          Early retirees need their money to last longer than 30 years. Someone stopping work at 45 might need 45 or 50 years of withdrawals. Over
          longer periods, the historical safe rate falls, which is why many early retirees plan on 3.25% to 3.5%. In the worked example, moving from
          4% to 3.5% raises the FIRE number from $1,250,000 to $1,428,571 and adds two years of work.
        </p>
        <Callout title="Flexibility beats precision">
          The withdrawal rate assumes you never cut spending. In practice, being willing to spend a little less after a bad year makes a portfolio
          last far longer. A plan with some flexible spending can often use a higher starting rate than a rigid one.
        </Callout>
      </GuideSection>

      <GuideSection id="returns" n={9} kicker="Assumptions" title="Returns and inflation">
        <p>
          The calculator turns your return and inflation into a real return: 7% with 2.5% inflation is a real return of 4.39%. Everything then grows
          at the real rate, so all the dollar figures are in today&rsquo;s money.
        </p>
        <DataTable
          caption="Years to FI in the main example at different returns (2.5% inflation)"
          head={["Return a year", "Real return", "Years to FI"]}
          numeric={[1, 2]}
          rows={[
            ["5%", "2.44%", "25.7"],
            ["6%", "3.41%", "23.0"],
            ["7%", "4.39%", "20.8"],
            ["8%", "5.37%", "19.1"],
            ["9%", "6.34%", "17.7"],
          ]}
        />
        <p>
          The return matters, but less than the savings rate, and you control it far less. Fund fees come straight off it: a 1% fee turns a 7% return
          into 6% and, here, adds more than two years. Low-cost index funds keep more of the return for you. Try a cautious figure as well as a hopeful
          one before you plan around a date.
        </p>
      </GuideSection>

      <GuideSection id="variants" n={10} kicker="Flavors" title="Lean, Fat, Coast and Barista FIRE">
        <p>
          FIRE has picked up several variants. None has an official definition, so the calculator uses common shorthand: Lean FIRE is 70% of your
          planned spending and Fat FIRE is 150%.
        </p>
        <DataTable
          caption="The main example (age 30, $50,000 spending, $100,000 invested, saving $30,000 a year)"
          head={["Version", "What it means", "Target", "Years"]}
          numeric={[2, 3]}
          rows={[
            ["Lean FIRE", "A frugal retirement on $35,000 a year", "$875,000", "15.8"],
            ["FIRE", "Your planned spending, $50,000 a year", "$1,250,000", "20.8"],
            ["Fat FIRE", "A comfortable cushion, $75,000 a year", "$1,875,000", "27.3"],
            ["Barista FIRE", "$20,000 of part-time pay covers part of it", "$750,000", "13.9"],
            ["Coast FIRE", "Enough now to grow to the full number by 65", "$277,852", "6.9"],
          ]}
        />
      </GuideSection>

      <GuideSection id="coast" n={11} kicker="Coast FIRE" title="Coast FIRE in detail">
        <p>
          Coast FIRE is the point where you could stop saving altogether and your investments would still grow to your full FIRE number by a
          traditional retirement age. After that, your pay only has to cover your spending, which opens up lower-paid work, shorter hours or a career
          break.
        </p>
        <p>
          The coast amount is the FIRE number discounted back at the real return. For $1,250,000 by 65 at a 4.39% real return, a 25-year-old needs
          about $224,137 invested, a 30-year-old about $277,852 and a 40-year-old about $426,985. In the worked example, saving $30,000 a year gets
          to the coast point in 6.9 years, at about 36.
        </p>
        <Callout tone="warn" title="Coasting relies on the return">
          Coast FIRE leans entirely on decades of growth. If returns disappoint you will reach 65 short, with no new savings to make up the gap. Many
          people keep saving something, even after they reach the coast point.
        </Callout>
      </GuideSection>

      <GuideSection id="barista" n={12} kicker="Barista FIRE" title="Barista FIRE in detail">
        <p>
          Barista FIRE means leaving full-time work once your portfolio covers most of your spending, and earning the rest from part-time or
          freelance work. The name comes from the idea of a coffee-shop job with health benefits, though any part-time income counts.
        </p>
        <p>
          Every dollar of part-time income cuts the FIRE number by 25 dollars at a 4% rate. In the example, $20,000 a year of part-time pay brings the
          target from $1,250,000 down to $750,000 and the time from 20.8 to 13.9 years. Part-time work in early retirement also keeps skills fresh and
          gives you an easy way to adjust if markets fall.
        </p>
      </GuideSection>

      <GuideSection id="accounts" n={13} kicker="Where to save" title="Where FIRE savers invest">
        <p>
          Most FIRE plans fill tax-advantaged accounts first, then use a taxable brokerage account for the rest. In 2026 you can put $24,500 into a{" "}
          <a href="/us/savings/401k-calculator">401(k)</a>, $7,500 into an IRA and $4,400 ($8,750 for family cover) into a health savings account.
        </p>
        <CompareCards
          columns={[
            {
              name: "Tax-advantaged accounts",
              rows: [
                { label: "Examples", value: "401(k), traditional and Roth IRA, HSA" },
                { label: "Benefit", value: "Tax break on the way in or the way out" },
                { label: "Catch", value: "Rules on withdrawals before 59½" },
              ],
            },
            {
              name: "Taxable brokerage account",
              rows: [
                { label: "Examples", value: "Index funds in an ordinary account" },
                { label: "Benefit", value: "Money available at any age" },
                { label: "Catch", value: "Dividends and gains are taxed" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="early-access" n={14} kicker="Access" title="Getting money out before 59½">
        <p>
          Withdrawals from a 401(k) or IRA before 59½ usually carry a 10% additional tax on top of income tax. FIRE plans use several routes around it:
        </p>
        <ul>
          <li>
            <strong>Roth IRA contributions:</strong>{" "}what you put into a <a href="/us/savings/roth-ira-calculator">Roth IRA</a>{" "}can come out at any
            time, tax- and penalty-free. Only the earnings are locked up.
          </li>
          <li>
            <strong>Roth conversion ladder:</strong>{" "}money converted from a traditional IRA to a Roth can be withdrawn penalty-free five years after
            each conversion. Converting a year&rsquo;s spending each year builds a ladder.
          </li>
          <li>
            <strong>The rule of 55:</strong>{" "}if you leave your job in or after the year you turn 55, withdrawals from that employer&rsquo;s 401(k)
            avoid the 10% tax.
          </li>
          <li>
            <strong>Section 72(t) payments:</strong>{" "}a series of substantially equal periodic payments, worked out by an IRS method, avoids the 10%
            tax at any age, but you must keep them up for five years or until 59½, whichever is later.
          </li>
          <li>
            <strong>A taxable account:</strong>{" "}money in an ordinary brokerage account is available at any time, which is why many early retirees
            plan to live on it first.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="health" n={15} kicker="Health" title="Health insurance before Medicare">
        <p>
          Medicare starts at 65. Leave work at 45 and you need 20 years of private cover. Options include a Marketplace plan at HealthCare.gov, a
          spouse&rsquo;s employer plan, or COBRA for up to 18 months after leaving a job. Marketplace premium tax credits depend on income, so an early
          retiree with low taxable income may pay much less than the full premium.
        </p>
        <Callout tone="warn" title="Budget for it">
          Health insurance and out-of-pocket costs are the expense early retirees most often underestimate. Put a realistic premium into your
          retirement spending, using the &quot;Retirement spending vs today&quot; option if it is higher than now.
        </Callout>
      </GuideSection>

      <GuideSection id="taxes" n={16} kicker="Tax" title="Taxes in early retirement">
        <p>
          The calculator doesn&rsquo;t take tax off withdrawals, so treat your spending figure as including any tax you expect to pay. In practice,
          early retirees often pay little federal tax. Living on Roth contributions and on long-term gains from a taxable account, which are taxed at
          0% up to $49,450 of taxable income for a single filer in 2026 ($98,900 for married couples filing jointly), can keep the bill very low. Our{" "}
          <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}shows how much you can realize at 0%.
        </p>
      </GuideSection>

      <GuideSection id="social-security" n={17} kicker="Later life" title="Social Security and FIRE">
        <p>
          Social Security is based on your 35 highest-earning years. Retiring early means fewer earning years and more zeros in the average, so your
          benefit will be smaller than if you had kept working, but it rarely disappears. Many FIRE plans treat it as a bonus that arrives in the
          60s and lowers the withdrawals needed from then on. You can claim from 62 with a reduced benefit, or wait until 70 for a larger one.
        </p>
      </GuideSection>

      <GuideSection id="sequence" n={18} kicker="Risk" title="Bad markets early on">
        <p>
          The order of returns matters once you start withdrawing. A fall in the first few years of retirement, while you are selling shares to live
          on, does far more damage than the same fall twenty years later. This is called sequence-of-returns risk, and it is the main reason the 4%
          rule sometimes fails.
        </p>
        <p>
          Common defenses include a cash buffer of one to two years of spending, a lower starting withdrawal rate, part-time income in the early
          years, and spending less after a bad year. Reaching your number in a strong market is also a good moment to build in some extra margin.
        </p>
      </GuideSection>

      <GuideSection id="flexibility" n={19} kicker="Planning" title="Staying flexible">
        <p>
          A FIRE date is a projection, not a contract. Returns will differ from your assumption, spending will change with family life, and tax and
          health rules will shift over the decades. Revisit the numbers once a year with your real balance. If you are ahead, you can bank the margin
          or retire sooner; if you are behind, small changes to spending or saving made early are much easier than big ones made late.
        </p>
      </GuideSection>

      <GuideSection id="first-steps" n={20} kicker="Getting started" title="First steps">
        <ol>
          <li>Track a year of spending, so your FIRE number rests on real figures.</li>
          <li>Build an emergency fund, so a surprise bill doesn&rsquo;t mean selling investments.</li>
          <li>Pay off high-interest debt such as credit cards; our <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}compares methods.</li>
          <li>Take any 401(k) employer match in full, then fill a Roth or traditional IRA and an HSA if you have one.</li>
          <li>Invest the rest in low-cost, broad index funds and raise your savings with each pay rise.</li>
        </ol>
      </GuideSection>

      <GuideSection id="mistakes" n={21} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Counting home equity in the FIRE number. You can&rsquo;t spend your house unless you sell it or downsize.</li>
          <li>Using a nominal return with today&rsquo;s spending, which makes the date look years earlier than it is.</li>
          <li>Using 4% for a 50-year retirement without any flexibility.</li>
          <li>Forgetting health insurance, home repairs, car replacements and taxes in retirement spending.</li>
          <li>Leaving no easy way to reach money before 59½.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["FIRE number at a 4% withdrawal rate", "25 × yearly spending"],
            ["FIRE number at 3.5%", "About 28.6 × yearly spending"],
            ["Real return at 7% with 2.5% inflation", "4.39%"],
            ["401(k) employee limit, 2026", "$24,500"],
            ["IRA limit, 2026", "$7,500"],
            ["HSA limit, 2026 (self / family)", "$4,400 / $8,750"],
            ["Age for penalty-free 401(k) and IRA withdrawals", "59½"],
            ["Medicare starts", "65"],
            ["0% long-term gains rate, 2026 (single / joint)", "Up to $49,450 / $98,900 of taxable income"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
