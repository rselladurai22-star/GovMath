import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Compound interest (US) — the guide. Figures from src/lib/us/savings.ts (grow, apy) and savings-extra.ts (doubling). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What compound interest is" },
  { id: "formula", title: "The formula" },
  { id: "example", title: "A worked example" },
  { id: "year-by-year", title: "How the snowball builds" },
  { id: "frequency", title: "How often interest compounds" },
  { id: "apy", title: "APR vs APY" },
  { id: "rule72", title: "The rule of 72" },
  { id: "time", title: "Why starting early matters" },
  { id: "rate", title: "Small rate differences, big results" },
  { id: "deposits", title: "Raising your deposits" },
  { id: "inflation", title: "Real returns after inflation" },
  { id: "savings-rates", title: "Savings account rates in 2026" },
  { id: "tax", title: "Tax on interest and growth" },
  { id: "fees", title: "Fees compound too" },
  { id: "debt", title: "Compounding on debt" },
  { id: "which-rate", title: "Which rate to use" },
  { id: "using", title: "Using the calculator well" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "lump-sum", title: "A lump sum or monthly deposits" },
  { id: "child", title: "Saving for a child" },
  { id: "withdrawals", title: "Withdrawals reset the snowball" },
  { id: "accounts", title: "Letting compounding work tax-free" },
  { id: "cash-vs-invest", title: "Savings accounts or investing" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Investor.gov (SEC) — Compound interest calculator", href: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  { label: "Investor.gov (SEC) — Rule of 72", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/rule-72" },
  { label: "FDIC — National rates and rate caps", href: "https://www.fdic.gov/national-rates-and-rate-caps" },
  { label: "FDIC — Deposit insurance", href: "https://www.fdic.gov/resources/deposit-insurance" },
  { label: "IRS — Topic no. 403, Interest received", href: "https://www.irs.gov/taxtopics/tc403" },
  { label: "Federal Reserve — Why does the Federal Reserve aim for inflation of 2 percent?", href: "https://www.federalreserve.gov/faqs/economy_14400.htm" },
];

export default function CompoundGuide() {
  return (
    <Guide
      kicker="The compound interest guide"
      title="How compound interest grows your money"
      intro={
        <>
          Compound interest means earning interest on your interest. Given enough time, it turns steady saving into a much larger sum. This guide
          explains how it works, how often interest is added, APR and APY, the rule of 72, and how inflation, taxes and fees change the picture.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Each period&rsquo;s interest is added to your balance, so the next period&rsquo;s interest is paid on a bigger sum.</li>
          <li>$10,000 plus $200 a month at 7% grows to {usd(144_573)} in 20 years, of which {usd(86_573)} is interest.</li>
          <li>The rule of 72: money doubles in about 72 ÷ the rate years, so about 10 years at 7%.</li>
          <li>Inflation, taxes and fees all reduce what your money is really worth at the end.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(144_573), label: "$10k + $200 a month, 7%, 20 years" },
            { value: usd(86_573), label: "Of which interest" },
            { value: "12 years", label: "To double at 6%" },
            { value: "5.116%", label: "APY of 5% compounded monthly" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What compound interest is">
        <CompareCards
          columns={[
            {
              name: "Simple interest",
              rows: [
                { label: "Interest paid on", value: "The original amount only" },
                { label: "$10,000 at 5% for 10 years", value: "$15,000" },
              ],
            },
            {
              name: "Compound interest",
              rows: [
                { label: "Interest paid on", value: "The original amount plus past interest" },
                { label: "$10,000 at 5% for 10 years", value: "$16,289 (compounded yearly)" },
              ],
            },
          ]}
        />
        <p>
          The gap starts small: in the first year both pay $500. But with compounding, each year&rsquo;s interest is a little bigger than the last.
          Over 30 or 40 years, interest on interest usually becomes the largest part of a long-term savings or retirement account.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={3} kicker="The maths" title="The formula">
        <p>
          For a single deposit: <strong>A = P × (1 + r ÷ n)<sup>n × t</sup></strong>, where P is the starting amount, r the yearly rate as a
          decimal, n the number of times interest is added each year and t the number of years.
        </p>
        <p>
          Check it by hand: $10,000 at 5% compounded once a year for 10 years is $10,000 × 1.05<sup>10</sup> = $16,289. With regular deposits
          each payment grows for a different length of time, so the calculator works month by month, adding each deposit at the end of the month.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$10,000 now, $200 a month, 7% a year compounded monthly, 20 years"
          steps={[
            { label: "Deposits: $10,000 + $200 × 240 months", value: "$58,000" },
            { label: "Interest earned", value: usd(86_573) },
            { label: "Final balance", value: usd(144_573) },
            { label: "In today's dollars, with 2.5% inflation", value: usd(88_229) },
          ]}
          total={{ label: "Share of the final balance from interest", value: "60%" }}
        />
        <p>
          If you raise the monthly deposit by 3% a year, in line with typical raises, the balance reaches {usd(171_236)} for {usd(74_489)} of
          deposits.
        </p>
      </GuideSection>

      <GuideSection id="year-by-year" n={5} kicker="Over time" title="How the snowball builds">
        <DataTable
          caption="$10,000 plus $200 a month at 7%, compounded monthly"
          head={["Year", "Deposits", "Interest", "Balance"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1", "$12,400", "$801", "$13,201"],
            ["5", "$22,000", "$6,495", "$28,495"],
            ["10", "$34,000", "$20,714", "$54,714"],
            ["15", "$46,000", "$45,882", "$91,882"],
            ["20", "$58,000", "$86,573", "$144,573"],
          ]}
        />
        <p>
          In year 1, interest is under 7% of the balance. By year 15, interest has almost caught up with everything deposited, and by year 20 it is
          well ahead. That turning point, when interest overtakes deposits, is when compounding starts to feel real.
        </p>
      </GuideSection>

      <GuideSection id="frequency" n={6} kicker="Compounding" title="How often interest compounds">
        <DataTable
          caption="$10,000 at 5% for 10 years, no deposits"
          head={["Compounding", "APY", "Final balance"]}
          numeric={[1, 2]}
          rows={[
            ["Once a year", "5.000%", "$16,289"],
            ["Quarterly", "5.095%", "$16,436"],
            ["Monthly", "5.116%", "$16,470"],
            ["Daily", "5.127%", "$16,487"],
          ]}
        />
        <p>
          More frequent compounding helps, but only a little: daily beats monthly by $17 here. Most online savings accounts compound daily and pay
          monthly. The rate and the time you leave the money matter far more.
        </p>
      </GuideSection>

      <GuideSection id="apy" n={7} kicker="Comparing accounts" title="APR vs APY">
        <p>
          The <strong>APY</strong> (annual percentage yield) is what you actually earn in a year once compounding is included. Under the federal
          Truth in Savings Act, banks and credit unions quote APY on deposit accounts, so you can compare them fairly. The rate before compounding
          is sometimes called the interest rate or APR. A 5% rate compounded monthly has an APY of 5.116%.
        </p>
        <Callout title="Entering an APY">
          If an account quotes only its APY, enter that figure with compounding set to &quot;Once a year&quot;. The calculator then grows your
          money at exactly that yearly yield.
        </Callout>
      </GuideSection>

      <GuideSection id="rule72" n={8} kicker="Shortcut" title="The rule of 72">
        <p>Divide 72 by the yearly rate to estimate how many years money takes to double. It is close for everyday rates.</p>
        <DataTable
          caption="Years to double: rule of 72 vs exact (yearly compounding)"
          head={["Rate", "Rule of 72", "Exact"]}
          numeric={[1, 2]}
          rows={[
            ["2%", "36.0", "35.0"],
            ["4%", "18.0", "17.7"],
            ["6%", "12.0", "11.9"],
            ["8%", "9.0", "9.0"],
            ["10%", "7.2", "7.3"],
            ["12%", "6.0", "6.1"],
          ]}
        />
        <p>
          The same rule works for inflation and debt: at 3% inflation, prices double in about 24 years; on a credit card at 24%, an unpaid
          balance doubles in about three years.
        </p>
      </GuideSection>

      <GuideSection id="time" n={9} kicker="Time" title="Why starting early matters">
        <Figure label="Balance at 65, saving at 6% a year" caption="Starting at 25 with $200 a month, or at 35 with $200 or $400 a month.">
          <Bars
            format={usd}
            items={[
              { label: "From 25, $200/month", value: 398_298 },
              { label: "From 35, $200/month", value: 200_903 },
              { label: "From 35, $400/month", value: 401_806 },
            ]}
          />
        </Figure>
        <p>
          Starting ten years later means saving twice as much each month to end up in the same place. The early saver deposits $96,000; the late
          saver needs $144,000. That is the clearest argument for starting a <a href="/us/savings/401k-calculator">401(k)</a> or{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA</a> as early as you can, even with small amounts.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={10} kicker="Sensitivity" title="Small rate differences, big results">
        <Figure label="$300 a month for 30 years" caption="Compounded monthly, no starting amount.">
          <Bars
            format={usd}
            items={[
              { label: "4% a year", value: 208_215 },
              { label: "6% a year", value: 301_355 },
              { label: "8% a year", value: 447_108 },
              { label: "10% a year", value: 678_146 },
            ]}
          />
        </Figure>
        <p>
          Deposits are the same $108,000 in every case. Going from 6% to 8% adds about {usd(447_108 - 301_355)}. Over long periods, every
          percentage point counts, which is why fees and taxes matter so much.
        </p>
      </GuideSection>

      <GuideSection id="deposits" n={11} kicker="Saving more" title="Raising your deposits">
        <p>
          Under More options you can raise your monthly deposit each year. Tying increases to raises is painless: you never see the money in your
          paycheck. In the main example, a 3% yearly increase lifts the final balance from {usd(144_573)} to {usd(171_236)}.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={12} kicker="Real value" title="Real returns after inflation">
        <p>
          Inflation reduces what your money buys. The Federal Reserve aims for inflation of 2% a year over time; the calculator uses 2.5% as a
          default. In the main example, {usd(144_573)} in 20 years is worth about {usd(88_229)} at today&rsquo;s prices. Your real return is
          roughly your rate minus inflation: 7% with 2.5% inflation is a real return of about 4.4%.
        </p>
        <Callout tone="warn" title="Cash can lose ground">
          A savings account paying less than inflation loses buying power every year, even though the balance rises. Cash is for safety and
          short-term goals, not for long-term growth.
        </Callout>
      </GuideSection>

      <GuideSection id="savings-rates" n={13} kicker="2026 context" title="Savings account rates in 2026">
        <p>
          The FDIC&rsquo;s national average rate on savings accounts was about 0.38% through mid-2026, while the best-paying online high-yield savings
          accounts paid around 4% in September 2026. On $10,000 for a year, that is about $38 of interest against about $407.
        </p>
        <CompareCards
          columns={[
            {
              name: "At 0.38% (national average)",
              rows: [
                { label: "$10,000 + $200 a month, 10 years", value: usd(34_845) },
                { label: "Interest", value: usd(34_845 - 34_000) },
              ],
            },
            {
              name: "At 4% (high-yield account)",
              rows: [
                { label: "$10,000 + $200 a month, 10 years", value: usd(44_358) },
                { label: "Interest", value: usd(44_358 - 34_000) },
              ],
            },
          ]}
        />
        <p>
          Savings rates are variable and change with the Federal Reserve&rsquo;s rate decisions. Deposits at FDIC-insured banks are protected up to
          $250,000 per depositor, per bank, per ownership category. Our <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}
          works out how much to put aside each month for a target, and the <a href="/us/savings/cd-calculator">CD calculator</a> covers fixed-term
          deposits.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={14} kicker="Tax" title="Tax on interest and growth">
        <p>
          Interest from savings accounts, CDs and money market accounts is taxed as ordinary income each year, even if you never withdraw it. Your
          bank sends Form 1099-INT if you earn $10 or more. Taxes slow compounding, because the money paid in tax no longer earns interest.
        </p>
        <p>
          Inside a 401(k), IRA or health savings account, growth isn&rsquo;t taxed each year, so the calculator&rsquo;s figures, which take no tax
          off, apply directly. In a taxable brokerage account, dividends are taxed yearly and gains when you sell.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={15} kicker="Costs" title="Fees compound too">
        <p>
          A fund charging 1% a year takes 1% of your whole balance every year, not 1% of your gains. Over decades that can cost a large share of
          the final balance. To see the effect, take the fee off the return: a fund returning 7% with a 1% fee grows like a 6% fund. Compare the 6%
          and 7% results above to see what that costs over time.
        </p>
      </GuideSection>

      <GuideSection id="debt" n={16} kicker="The other side" title="Compounding on debt">
        <p>
          Compounding works against you when you borrow. A $5,000 credit card balance at 22% APR, compounded monthly with nothing paid, would grow
          to about {usd(14_872)} in five years. Paying down high-rate debt is a guaranteed return equal to its interest rate, better than most
          investments. Our <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a> shows how long a balance takes to clear.
        </p>
      </GuideSection>

      <GuideSection id="which-rate" n={17} kicker="Assumptions" title="Which rate to use">
        <ul>
          <li><strong>Savings account or CD:</strong> the APY the bank quotes. It can change on a savings account; a CD&rsquo;s is fixed for the term.</li>
          <li><strong>Bonds or bond funds:</strong> roughly the fund&rsquo;s current yield, which its provider publishes.</li>
          <li><strong>Stock index funds:</strong> many planners use 6% to 7% a year over long periods, before inflation. Single years range from large gains to falls of a third or more.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="Tips" title="Using the calculator well">
        <ul>
          <li>Use the today&rsquo;s-dollars figure for anything more than a few years away.</li>
          <li>Try a cautious rate as well as a hopeful one.</li>
          <li>Open the yearly table to see when interest overtakes your deposits.</li>
          <li>Copy the link to save your figures, and come back each year to compare.</li>
        </ul>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Comparing accounts by rate instead of APY.</li>
          <li>Ignoring inflation when judging a long-term balance.</li>
          <li>Leaving savings in an account paying close to nothing.</li>
          <li>Assuming investment returns arrive smoothly every year.</li>
          <li>Withdrawing early and restarting the snowball from a smaller base.</li>
        </ul>
      </GuideSection>

      <GuideSection id="lump-sum" n={20} kicker="Timing" title="A lump sum or monthly deposits">
        <p>
          Money invested sooner has longer to compound. $24,000 invested today at 7% grows to about $48,232 in 10 years. The same $24,000 paid in
          as $200 a month over those 10 years grows to about $34,617, because most of the deposits are invested for only a few years.
        </p>
        <p>
          That doesn&rsquo;t mean you should wait until you have a lump sum. Most people save from each paycheck, and regular deposits are how
          balances get built. It does mean that money you already have, such as a bonus or an inheritance, starts working the day it goes in.
        </p>
      </GuideSection>

      <GuideSection id="child" n={21} kicker="Example" title="Saving for a child">
        <p>
          Small amounts add up over a childhood. $100 a month from birth to 18 at 6% a year grows to about $38,735, of which $21,600 is your
          deposits and the rest is growth. For college costs, a 529 plan lets that growth come out tax-free when it is spent on qualified education.
        </p>
      </GuideSection>

      <GuideSection id="withdrawals" n={22} kicker="Interruptions" title="Withdrawals reset the snowball">
        <p>
          Taking money out doesn&rsquo;t just reduce today&rsquo;s balance; it removes all the growth that money would have earned. $50,000 left
          for 30 years at 7% grows to about $405,825. Take $10,000 out at the start and the remaining $40,000 grows to about $324,660, so the
          $10,000 withdrawal costs about $81,000 of future money.
        </p>
        <Callout title="Keep an emergency fund">
          Having cash set aside for surprises means you won&rsquo;t need to raid long-term savings, and pay early withdrawal penalties on a 401(k)
          or IRA, when something goes wrong.
        </Callout>
      </GuideSection>

      <GuideSection id="accounts" n={23} kicker="Where to grow it" title="Letting compounding work tax-free">
        <p>
          Retirement accounts let compounding run without a yearly tax bill. In a 401(k) or traditional IRA, tax is deferred until you withdraw;
          in a Roth IRA or Roth 401(k), qualified withdrawals are tax-free. A health savings account can be tax-free on the way in, while invested
          and on the way out for medical costs. For money you may need within a few years, a high-yield savings account or CD is the safer home,
          even though its interest is taxed each year.
        </p>
      </GuideSection>

      <GuideSection id="cash-vs-invest" n={24} kicker="Choosing" title="Savings accounts or investing">
        <p>
          Both compound, but they do different jobs. A savings account or CD pays a known rate, can&rsquo;t fall in value and, at an insured bank,
          is protected up to the FDIC limit. That makes it right for an emergency fund and for goals within a few years. Its weakness is that,
          after tax and inflation, its real return is often close to zero.
        </p>
        <p>
          Investments such as stock index funds have historically compounded much faster over long periods, but they can lose a third or more of
          their value in a bad year and take years to recover. That makes them better suited to goals ten or more years away, such as retirement,
          where there is time to ride out the falls. Many people hold both: cash for the near term and investments for the long term. Use the
          calculator twice, once with a savings rate and once with a cautious investment return, to see the difference for your own goal.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["APY of 5% compounded monthly", "5.116%"],
            ["APY of 5% compounded daily", "5.127%"],
            ["Years to double at 6% (rule of 72)", "12"],
            ["$10,000 at 7% for 10 years (monthly)", usd(20_097)],
            ["FDIC national average savings rate, mid-2026", "About 0.38%"],
            ["FDIC insurance limit", "$250,000 per depositor, per bank, per category"],
            ["Federal Reserve inflation goal", "2%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
