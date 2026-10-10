import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Net worth (US) — the guide. Figures from src/lib/us/wealth.ts (netWorth, SCF_2022). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What net worth is" },
  { id: "example", title: "A worked example" },
  { id: "assets", title: "Valuing your assets" },
  { id: "debts", title: "Counting your debts" },
  { id: "by-age", title: "Net worth by age" },
  { id: "median-mean", title: "Median or mean?" },
  { id: "survey", title: "About the Fed's survey" },
  { id: "young", title: "Negative net worth when you're young" },
  { id: "ratio", title: "The debt-to-asset ratio" },
  { id: "home", title: "Your home and net worth" },
  { id: "liquid", title: "Liquid net worth" },
  { id: "retirement", title: "Retirement accounts and tax" },
  { id: "benchmarks", title: "Rules of thumb" },
  { id: "grow", title: "How net worth grows" },
  { id: "track", title: "Tracking it over time" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "couples", title: "Couples, families and net worth" },
  { id: "planning", title: "Using net worth in planning" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Federal Reserve — Changes in U.S. Family Finances from 2019 to 2022 (Survey of Consumer Finances), Table 2", href: "https://www.federalreserve.gov/publications/files/scf23.pdf" },
  { label: "Federal Reserve — Survey of Consumer Finances", href: "https://www.federalreserve.gov/econres/scfindex.htm" },
  { label: "CFPB — What is a debt-to-income ratio?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" },
  { label: "Investor.gov (SEC) — Save and invest", href: "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest" },
  { label: "IRS — Topic no. 701, Sale of your home", href: "https://www.irs.gov/taxtopics/tc701" },
];

export default function NetWorthGuide() {
  return (
    <Guide
      kicker="The net worth guide"
      title="How to work out your net worth, and how you compare"
      intro={
        <>
          Net worth is the single number that sums up your finances: everything you own minus everything you owe. This guide explains how to value
          each item, how your figure compares with American families of your age in the Federal Reserve&rsquo;s Survey of Consumer Finances, and which
          ratios tell you more than the headline number.
        </>
      }
      meta={["Worked examples", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Net worth = total assets − total debts.</li>
          <li>The median American family had a net worth of $192,900 in 2022, according to the Federal Reserve. The mean was $1,063,700.</li>
          <li>The median rises with age, from $39,000 for families headed by someone under 35 to $409,900 at 65 to 74.</li>
          <li>Your trend over time matters more than how you compare with anyone else.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$192,900", label: "Median family net worth, 2022" },
            { value: "$39,000", label: "Median, under 35" },
            { value: "$409,900", label: "Median, 65 to 74" },
            { value: "+37%", label: "Rise in the median, 2019 to 2022, after inflation" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What net worth is">
        <p>
          Your net worth is what would be left if you sold everything you own and paid off every debt. It is a snapshot of your balance sheet on one
          day. Income tells you how much flows in each year; net worth tells you how much you have kept. A high earner who spends everything can have a
          lower net worth than a modest earner who has saved steadily for decades.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Age 40, homeowner with a mortgage, a car loan, student loans and a card balance"
          steps={[
            { label: "Cash $15,000 + retirement $90,000 + investments $20,000 + home $400,000 + car $20,000", value: "$545,000" },
            { label: "Mortgage $300,000 + auto $15,000 + student $25,000 + cards $5,000", value: "−$345,000" },
            { label: "Debt-to-asset ratio ($345,000 ÷ $545,000)", value: "63%" },
            { label: "Median for families aged 35 to 44 (2022)", value: "$135,600" },
          ]}
          total={{ label: "Net worth (1.47 times the median)", value: "$200,000" }}
        />
        <p>
          Half of this person&rsquo;s net worth is home equity ($100,000). Without the home and mortgage, net worth is also $100,000, and their
          liquid net worth (cash and investments less non-mortgage debts) is −$10,000, because the car, student and card debts are larger than their
          cash and investments.
        </p>
      </GuideSection>

      <GuideSection id="assets" n={4} kicker="Assets" title="Valuing your assets">
        <ul>
          <li><strong>Cash:</strong>{" "}checking, savings, money market accounts and CDs at today&rsquo;s balance.</li>
          <li><strong>Retirement accounts:</strong>{" "}401(k), 403(b), IRAs and HSAs at today&rsquo;s balance. Unvested employer contributions don&rsquo;t count yet.</li>
          <li><strong>Investments:</strong>{" "}brokerage accounts at market value, plus 529 plans if you count them as yours.</li>
          <li><strong>Home and other property:</strong>{" "}what it would sell for now. Recent sales of similar homes nearby are a better guide than online estimates.</li>
          <li><strong>Vehicles:</strong>{" "}the private-party value, which falls every year. A new car can lose a fifth or more of its value in the first year.</li>
          <li><strong>Other assets:</strong>{" "}a business stake, cash-value life insurance or money owed to you. Leave out furniture, clothes and electronics, which sell for little.</li>
        </ul>
        <Callout title="Be conservative">
          When in doubt, use a lower value. A net worth built on optimistic home and car prices can look healthy right up until you need to sell.
        </Callout>
      </GuideSection>

      <GuideSection id="debts" n={5} kicker="Debts" title="Counting your debts">
        <p>
          Include every balance you owe today, not the monthly payment: the mortgage and any home equity loan or HELOC, auto loans, federal and
          private student loans, credit cards (even if you pay in full each month), personal loans, medical bills, buy now pay later plans, 401(k)
          loans and taxes due. Our <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}can then show the fastest way to clear the
          non-mortgage debts.
        </p>
      </GuideSection>

      <GuideSection id="by-age" n={6} kicker="Comparison" title="Net worth by age">
        <Figure label="Median family net worth by age of the family head, 2022" caption="Federal Reserve, Survey of Consumer Finances 2022, in 2022 dollars.">
          <Bars
            format={(n) => "$" + n.toLocaleString("en-US")}
            items={[
              { label: "Under 35", value: 39_000 },
              { label: "35 to 44", value: 135_600 },
              { label: "45 to 54", value: 247_200 },
              { label: "55 to 64", value: 364_500 },
              { label: "65 to 74", value: 409_900 },
              { label: "75 or older", value: 335_600 },
            ]}
          />
        </Figure>
        <DataTable
          caption="Family net worth by age of the family head, 2022 (2022 dollars)"
          head={["Age", "Median", "Mean"]}
          numeric={[1, 2]}
          rows={[
            ["Under 35", "$39,000", "$183,500"],
            ["35 to 44", "$135,600", "$549,600"],
            ["45 to 54", "$247,200", "$975,800"],
            ["55 to 64", "$364,500", "$1,566,900"],
            ["65 to 74", "$409,900", "$1,794,600"],
            ["75 or older", "$335,600", "$1,624,100"],
            ["All families", "$192,900", "$1,063,700"],
          ]}
        />
        <p>
          Net worth typically climbs through working life as mortgages are paid down and retirement savings grow, peaks around 65 to 74, then dips as
          retirees draw on their savings.
        </p>
      </GuideSection>

      <GuideSection id="median-mean" n={7} kicker="Statistics" title="Median or mean?">
        <p>
          The median is the family in the middle: half have more, half less. The mean is the total divided by the number of families. For wealth the
          two are far apart, because a small number of very rich families pull the mean up. In 2022 the mean for all families, $1,063,700, was more
          than five times the median of $192,900. The median is the better guide to what a typical family has, which is why the calculator compares
          you with it.
        </p>
      </GuideSection>

      <GuideSection id="survey" n={8} kicker="The data" title="About the Fed's survey">
        <p>
          The Survey of Consumer Finances is run by the Federal Reserve Board every three years. It interviews several thousand families in detail
          about their assets, debts and income, and oversamples wealthy families so the top of the distribution is measured well. The 2022 results,
          published in October 2023, are the latest; results from the 2025 survey are expected in late 2026.
        </p>
        <p>
          Three things to keep in mind when comparing: the figures are for families (a couple counts once, with their combined wealth), they are
          grouped by the age of the family head, and they are in 2022 dollars. Prices have risen since, and so have stock and home prices, so
          today&rsquo;s medians are likely somewhat higher. Between 2019 and 2022 the median rose 37% after inflation, and for families under 35 it
          more than doubled, from $16,100 to $39,000 in 2022 dollars.
        </p>
      </GuideSection>

      <GuideSection id="young" n={9} kicker="Early career" title="Negative net worth when you're young">
        <p>
          Many people start working life with a negative net worth, mostly because of student loans. Consider a 28-year-old with $8,000 of cash, a
          $25,000 401(k) and a $15,000 car, against a $12,000 car loan, $30,000 of student loans and $3,000 on a card. Assets are $48,000, debts
          $45,000, and net worth is $3,000, or 0.08 times the median for under-35s.
        </p>
        <p>
          That isn&rsquo;t a sign of failure. A degree that raises your earnings is an investment the balance sheet can&rsquo;t see. What matters is
          the direction: paying down debt and saving in a <a href="/us/savings/401k-calculator">401(k)</a>{" "}moves the number up every month. Our{" "}
          <a href="/us/loans/student-loan-calculator">student loan calculator</a>{" "}shows how quickly extra payments clear a loan.
        </p>
      </GuideSection>

      <GuideSection id="ratio" n={10} kicker="Ratios" title="The debt-to-asset ratio">
        <p>
          The debt-to-asset ratio divides total debts by total assets. It shows how much of what you own is really financed by lenders. In the worked
          example it is 63%.
        </p>
        <DataTable
          caption="A rough guide to the debt-to-asset ratio"
          head={["Ratio", "What it usually means"]}
          rows={[
            ["Under 30%", "Low debt: typical of later life or after paying off a mortgage"],
            ["30% to 50%", "Moderate: common mid-career with a mortgage"],
            ["50% to 80%", "High: common with a new mortgage or large student loans"],
            ["Over 80%", "Very high: little cushion if asset values fall"],
            ["Over 100%", "Negative net worth: debts exceed assets"],
          ]}
        />
        <p>
          It is different from the debt-to-income ratio lenders use for a mortgage, which compares monthly debt payments with monthly income. Our{" "}
          <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}works that one out.
        </p>
      </GuideSection>

      <GuideSection id="home" n={11} kicker="Housing" title="Your home and net worth">
        <p>
          For most American families the home is the largest asset, and home equity is a big share of net worth. The calculator shows your net worth
          with and without it, because you can&rsquo;t spend your home without selling it, borrowing against it or downsizing, and selling costs (often
          6% to 10% of the price with agent fees, closing costs and moving) would take a slice. A homeowner&rsquo;s net worth also rises and falls with
          local prices they don&rsquo;t control.
        </p>
      </GuideSection>

      <GuideSection id="liquid" n={12} kicker="Access" title="Liquid net worth">
        <p>
          Liquid net worth counts only cash and taxable investments, less non-mortgage debts. It is the money you could reach in weeks rather than
          months or years, and the part that protects you in a crisis. A large net worth made almost entirely of home equity and retirement accounts
          can still leave you short of cash. An emergency fund is the first piece of liquid net worth to build.
        </p>
      </GuideSection>

      <GuideSection id="retirement" n={13} kicker="Tax" title="Retirement accounts and tax">
        <p>
          A traditional 401(k) or IRA balance isn&rsquo;t all yours: income tax is due when you withdraw it. $100,000 in a traditional 401(k) might be
          worth $78,000 to $88,000 after tax, depending on your bracket in retirement, while $100,000 in a Roth IRA is worth the full amount if the
          rules are met. Most net worth figures, including the Fed&rsquo;s, use the full pre-tax balance, and so does the calculator, but it is worth
          remembering when you compare a Roth saver with a traditional saver.
        </p>
      </GuideSection>

      <GuideSection id="benchmarks" n={14} kicker="Benchmarks" title="Rules of thumb">
        <CompareCards
          columns={[
            {
              name: "Age × income ÷ 10",
              rows: [
                { label: "From", value: "The Millionaire Next Door (1996)" },
                { label: "Age 40, $100,000 income", value: "$400,000" },
                { label: "Best for", value: "Mid-career earners" },
              ],
            },
            {
              name: "Retirement savings by age",
              rows: [
                { label: "Common guide", value: "1× salary by 30, 3× by 40, 6× by 50" },
                { label: "Counts", value: "Retirement savings only" },
                { label: "Best for", value: "Checking retirement progress" },
              ],
            },
          ]}
        />
        <p>
          Both are rough. The first is hard on young people with high incomes and no time to save yet; the second ignores pensions and Social
          Security. Use them as prompts, not grades. Our <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}gives a fuller
          answer for retirement.
        </p>
      </GuideSection>

      <GuideSection id="grow" n={15} kicker="Progress" title="How net worth grows">
        <p>Net worth rises in three ways:</p>
        <ul>
          <li><strong>Saving:</strong>{" "}every dollar you put aside from income adds a dollar.</li>
          <li><strong>Paying down debt:</strong>{" "}the principal part of every loan payment adds to net worth, and high-interest debt cleared stops costing you.</li>
          <li><strong>Growth:</strong>{" "}investments and home values rising. Over time this does the most, which is why early saving matters.</li>
        </ul>
        <p>
          Buying a car or spending on things that lose value lowers net worth, even when it is paid in cash. Our{" "}
          <a href="/us/savings/fire-calculator">FIRE calculator</a>{" "}shows how a high savings rate turns net worth into financial independence.
        </p>
      </GuideSection>

      <GuideSection id="track" n={16} kicker="Habits" title="Tracking it over time">
        <p>
          Work out your net worth once or twice a year, on the same date, with the same method. Save the link from the calculator: it keeps your
          figures in the address, so you can open it next year and update the numbers. A steadily rising line matters more than any one year,
          because markets will push the number up and down.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={17} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Using the price you paid for your home or car instead of what it would sell for today.</li>
          <li>Leaving out debts that don&rsquo;t send a monthly bill, such as a 401(k) loan or money owed to family.</li>
          <li>Counting household items at what they cost.</li>
          <li>Comparing yourself with the mean instead of the median.</li>
          <li>Comparing an individual figure with the survey&rsquo;s family figures without adjusting for a partner&rsquo;s wealth.</li>
        </ul>
      </GuideSection>

      <GuideSection id="couples" n={18} kicker="Households" title="Couples, families and net worth">
        <p>
          Married couples usually work out one household net worth, because most of their assets and debts are shared and the Federal Reserve&rsquo;s
          survey counts families the same way. Unmarried partners may prefer to work out two figures and a combined one, especially if they own
          things separately. Either way, be consistent from year to year.
        </p>
        <p>
          Money you hold for children, such as a 529 plan, is usually counted as yours if you own the account. Money you expect to inherit isn&rsquo;t
          an asset until you receive it, and money you have promised to pay, such as a co-signed loan you may have to cover, is worth noting even if it
          doesn&rsquo;t appear as your debt.
        </p>
      </GuideSection>

      <GuideSection id="planning" n={19} kicker="Uses" title="Using net worth in planning">
        <p>
          Net worth is the starting point for most bigger questions. Lenders look at assets when you apply for a mortgage. Retirement plans start from
          the savings you already have, and a <a href="/us/savings/fire-calculator">FIRE</a>{" "}plan tracks invested assets against a target. Estate
          planning starts from what you own and owe. Breaking the figure down, as the calculator does, shows where to focus: building cash if liquid net
          worth is negative, paying down high-interest debt if the debt-to-asset ratio is high, or investing more if most of your wealth is in your home.
        </p>
      </GuideSection>
      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Median family net worth, 2022", "$192,900"],
            ["Mean family net worth, 2022", "$1,063,700"],
            ["Median, family head under 35", "$39,000"],
            ["Median, 35 to 44", "$135,600"],
            ["Median, 45 to 54", "$247,200"],
            ["Median, 55 to 64", "$364,500"],
            ["Median, 65 to 74", "$409,900"],
            ["Median, 75 or older", "$335,600"],
            ["Change in the median, 2019 to 2022, after inflation", "+37%"],
            ["Next survey (2025) results", "Expected late 2026"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
