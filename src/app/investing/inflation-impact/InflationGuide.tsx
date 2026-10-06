import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Inflation impact — the guide. Figures from src/lib/investing/growth.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What inflation is" },
  { id: "measures", title: "CPI, CPIH and RPI" },
  { id: "recent", title: "Inflation in recent years" },
  { id: "savings", title: "What inflation does to savings" },
  { id: "prices", title: "What things will cost" },
  { id: "real", title: "Real returns" },
  { id: "tax", title: "Tax makes it harder" },
  { id: "halving", title: "How fast money loses value" },
  { id: "pay", title: "Pay, pensions and benefits" },
  { id: "drag", title: "Frozen tax thresholds" },
  { id: "protect", title: "Ways to protect your money" },
  { id: "planning", title: "Planning for the long term" },
  { id: "using", title: "Using the calculator" },
  { id: "goals", title: "Inflation and your savings goals" },
  { id: "debts", title: "Inflation and debts" },
  { id: "investing", title: "Investing and inflation" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "ONS — Consumer price inflation", href: "https://www.ons.gov.uk/economy/inflationandpriceindices" },
  { label: "Bank of England — Inflation and the 2% target", href: "https://www.bankofengland.co.uk/monetary-policy/inflation" },
  { label: "MoneyHelper — Inflation and your savings", href: "https://www.moneyhelper.org.uk/en/savings" },
  { label: "GOV.UK — Individual Savings Accounts", href: "https://www.gov.uk/individual-savings-accounts" },
];

export default function InflationGuide() {
  return (
    <Guide
      kicker="The inflation guide"
      title="What inflation does to your money"
      intro={
        <>
          Inflation is the steady rise in prices over time. It means a pound buys less each year, so money left in cash slowly loses value even
          though the balance stays the same. This guide explains how inflation is measured, what it does to savings and future costs, and how to
          protect yourself.
        </>
      }
      meta={["Worked examples", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Consumer prices (CPI) rose by 3.1% in the year to August 2026. The Bank of England&rsquo;s target is 2%.</li>
          <li>At 3.1% a year, £10,000 kept as cash is worth £7,369 in today&rsquo;s money after 10 years.</li>
          <li>Something costing £100 today would cost £135.70 in 10 years and £184.15 in 20 years.</li>
          <li>To keep your money&rsquo;s value, your savings need to earn more than inflation after tax.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3.1%", label: "CPI, year to August 2026" },
            { value: "2%", label: "Bank of England target" },
            { value: "£7,369", label: "£10,000 cash after 10 years at 3.1%" },
            { value: "22.7 years", label: "For money to halve at 3.1%" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What inflation is">
        <p>
          Inflation measures how much the prices of a typical basket of goods and services change over a year. If inflation is 3%, the same
          shopping that cost £100 last year costs £103 now. Prices do not all rise at the same rate: energy, food and rents can move very
          differently from the average, so your own inflation rate depends on what you buy.
        </p>
        <p>
          A little inflation is normal in a growing economy. The Bank of England sets interest rates with the aim of keeping CPI inflation at
          2%. When inflation is above target, it usually keeps rates higher; when it is below, it can cut them.
        </p>
      </GuideSection>

      <GuideSection id="measures" n={3} kicker="Measures" title="CPI, CPIH and RPI">
        <DataTable
          head={["Measure", "What it covers", "Used for"]}
          rows={[
            ["CPI", "Consumer prices, excluding most housing costs", "The Bank of England target, and most benefit and State Pension uprating"],
            ["CPIH", "CPI plus owner-occupiers' housing costs and council tax", "The ONS's lead measure"],
            ["RPI", "An older index, usually higher than CPI", "Some rail fares, older index-linked gilts and some older pensions"],
          ]}
        />
        <p>
          RPI is no longer a national statistic because of known flaws in how it is calculated, and it is due to be brought into line with CPIH
          from 2030. For planning, CPI is the most useful figure.
        </p>
      </GuideSection>

      <GuideSection id="recent" n={4} kicker="History" title="Inflation in recent years">
        <Timeline
          items={[
            { when: "2010s", what: "Mostly low", detail: "CPI was mostly between 0% and 3%, and briefly negative in 2015." },
            { when: "October 2022", what: "Peak of 11.1%", detail: "Energy and food prices drove the highest CPI rate in over 40 years." },
            { when: "2024", what: "Back near target", detail: "Inflation fell sharply as energy prices eased." },
            { when: "August 2026", what: "3.1%", detail: "Above target again, so cash savings need a good rate to keep up." },
          ]}
        />
        <p>
          In a year of 11.1% inflation, £1,000 in cash loses about £100 of buying power: it buys what £900 bought a year earlier. Sudden spikes
          are hard to predict, which is why the calculator lets you test several rates.
        </p>
      </GuideSection>

      <GuideSection id="savings" n={5} kicker="Savings" title="What inflation does to savings">
        <Figure label="£10,000 kept as cash for 10 years" caption="Worth in today's money at different inflation rates.">
          <Bars
            items={[
              { label: "2%", value: 8203 },
              { label: "3.1%", value: 7369 },
              { label: "5%", value: 6139 },
            ]}
          />
        </Figure>
        <p>
          The balance still reads £10,000, but it buys less each year. At 5% inflation, a decade wipes out almost two-fifths of its value. Even at
          the 2% target, cash loses about a fifth of its buying power in ten years.
        </p>
      </GuideSection>

      <GuideSection id="prices" n={6} kicker="Costs" title="What things will cost">
        <DataTable
          caption="Prices rising at 3.1% a year"
          head={["Today", "In 10 years", "In 20 years"]}
          numeric={[0, 1, 2]}
          rows={[["£100", "£135.70", "£184.15"]]}
        />
        <p>
          A £120 weekly food shop would cost about £162.84 in 10 years at 3.1% inflation. If you plan to live on £30,000 a year in today&rsquo;s
          money in 25 years&rsquo; time, you would need about £55,618 a year in pounds then at 2.5% inflation, or £62,813 at 3%.
        </p>
      </GuideSection>

      <GuideSection id="real" n={7} kicker="The maths" title="Real returns">
        <p>
          The <strong>real return</strong> is what you earn after inflation. The exact formula is (1 + return) ÷ (1 + inflation) − 1. Simply
          subtracting is close for small numbers but less accurate for large ones.
        </p>
        <DataTable
          head={["Return", "Inflation", "Real return"]}
          numeric={[0, 1, 2]}
          rows={[
            ["4%", "3.1%", "0.87%"],
            ["5%", "2%", "2.94%"],
            ["10%", "6%", "3.77%"],
            ["3%", "3.1%", "−0.10%"],
          ]}
        />
        <p>
          £10,000 invested at 5% a year for 20 years grows to £26,533 in pounds, but with 2.5% inflation that is worth £16,192 in today&rsquo;s
          money. The real gain is still worthwhile, but much smaller than the headline figure suggests.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={8} kicker="Tax" title="Tax makes it harder">
        <WorkedExample
          title="£10,000 for 10 years at 4%, with 3.1% inflation"
          steps={[
            { label: "Balance in pounds, tax-free", value: "£14,802" },
            { label: "In today's money, tax-free (ISA)", value: "£10,908" },
            { label: "In today's money, interest taxed at 20%", value: "£10,097" },
            { label: "In today's money, interest taxed at 40%", value: "£9,341" },
          ]}
          total={{ label: "Higher-rate taxpayer outside an ISA", value: "Real loss" }}
        />
        <p>
          Tax is charged on the whole interest, including the part that only makes up for inflation. A higher-rate taxpayer earning 4% outside an
          ISA keeps 2.4%, which is below 3.1% inflation, so their savings shrink in real terms. This example assumes all the interest is taxed;
          the Personal Savings Allowance (£1,000 for basic-rate and £500 for higher-rate taxpayers) shelters some of it.
        </p>
      </GuideSection>

      <GuideSection id="halving" n={9} kicker="Shortcut" title="How fast money loses value">
        <DataTable
          caption="Years for prices to double, and cash to lose half its value"
          head={["Inflation", "Years"]}
          numeric={[1]}
          rows={[
            ["2%", "35.0"],
            ["3.1%", "22.7"],
            ["5%", "14.2"],
            ["10%", "7.3"],
          ]}
        />
        <p>The rule of 72 gives a quick estimate: divide 72 by the inflation rate. At 3%, prices double in about 24 years.</p>
      </GuideSection>

      <GuideSection id="pay" n={10} kicker="Income" title="Pay, pensions and benefits">
        <p>
          A pay rise only makes you better off if it beats inflation. A 3% rise on a £35,000 salary with 3.1% inflation is worth £34,966 in
          today&rsquo;s money: a small real pay cut.
        </p>
        <ul>
          <li>
            <strong>State Pension:</strong> the triple lock raises it each April by the highest of earnings growth, CPI inflation or 2.5%.
          </li>
          <li>
            <strong>Benefits:</strong> most working-age benefits rise each April in line with CPI from the previous September.
          </li>
          <li>
            <strong>Private pensions:</strong> defined benefit pensions usually rise with inflation up to a cap. Annuities can be level or
            inflation-linked; a level annuity starts higher but loses value over time.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="drag" n={11} kicker="Tax" title="Frozen tax thresholds">
        <p>
          The income tax Personal Allowance (£12,570) and higher-rate threshold (£50,270) are frozen until April 2031. As pay rises with
          inflation, more of it falls into tax, and more people move into the higher rate. This is often called fiscal drag. It means your
          take-home pay can rise more slowly than your salary. The <a href="/tax-and-salary/salary-calculator">salary calculator</a> shows your
          current take-home pay.
        </p>
      </GuideSection>

      <GuideSection id="protect" n={12} kicker="Protection" title="Ways to protect your money">
        <CompareCards
          columns={[
            {
              name: "Short term (under 5 years)",
              rows: [
                { label: "Where", value: "Best-buy savings accounts and cash ISAs" },
                { label: "Aim", value: "A rate at or above inflation" },
                { label: "Risk", value: "Low, protected by the FSCS up to £120,000" },
              ],
            },
            {
              name: "Long term (5 years or more)",
              rows: [
                { label: "Where", value: "Diversified investments in an ISA or pension" },
                { label: "Aim", value: "Growth above inflation over time" },
                { label: "Risk", value: "Values rise and fall" },
              ],
            },
          ]}
        />
        <ul>
          <li><strong>Shop around:</strong> easy-access rates vary widely. Moving can add a percentage point or more.</li>
          <li><strong>Use your ISA allowance:</strong> £20,000 a year, so interest and growth are tax-free.</li>
          <li><strong>Index-linked gilts:</strong> UK government bonds whose payments rise with inflation.</li>
          <li><strong>Pay off expensive debt:</strong> a guaranteed saving often far above inflation.</li>
        </ul>
      </GuideSection>

      <GuideSection id="planning" n={13} kicker="Long term" title="Planning for the long term">
        <p>
          A gap of one percentage point between your return and inflation adds up. Cash earning 2% while inflation runs at 3.1% would leave
          £10,000 worth only £7,248 in today&rsquo;s money after 30 years. When planning for retirement or another distant goal, work in
          today&rsquo;s money and use a real return. That way the target you aim for means something you can picture now.
        </p>
        <Callout title="Inflation and the FIRE calculator">
          Our <a href="/investing/fire-calculator">FIRE calculator</a> works entirely in today&rsquo;s money, using a real return after
          inflation, for exactly this reason.
        </Callout>
      </GuideSection>

      <GuideSection id="using" n={14} kicker="How to" title="Using the calculator">
        <ol>
          <li>Choose whether to see what your money will be worth or what something will cost.</li>
          <li>Enter the amount, the number of years, and an inflation rate. The default is the latest CPI rate.</li>
          <li>For savings, open &ldquo;More options&rdquo; to add an interest rate and any tax on the interest.</li>
          <li>Compare the result at 2%, the latest CPI and 5% to see a range.</li>
        </ol>
      </GuideSection>

      <GuideSection id="goals" n={15} kicker="Goals" title="Inflation and your savings goals">
        <p>
          Any goal with a price tag will usually cost more by the time you reach it. Aim for the future cost, not today&rsquo;s.
        </p>
        <DataTable
          head={["Goal", "Cost today", "Inflation", "Cost when you need it"]}
          numeric={[1, 2, 3]}
          rows={[
            ["House deposit in 5 years", "£30,000", "3%", "£34,778"],
            ["Car in 8 years", "£25,000", "3%", "£31,669"],
            ["A year's tuition fees in 10 years", "£9,535", "2.5%", "£12,206"],
          ]}
        />
        <p>
          House prices and tuition fees do not follow CPI exactly, so treat these as rough guides. House prices in particular can rise much
          faster or slower than general inflation.
        </p>
        <p>
          Emergency funds also need topping up. A £6,000 emergency fund left untouched for 5 years at 3.1% inflation covers only what £5,151
          covers today. Review it each year and add enough to keep up with your living costs.
        </p>
      </GuideSection>

      <GuideSection id="debts" n={16} kicker="Borrowing" title="Inflation and debts">
        <p>
          Inflation erodes the real value of debts as well as savings. A £200,000 mortgage balance in 25 years&rsquo; time would be worth
          £107,878 in today&rsquo;s money at 2.5% inflation. Since your pay usually rises with prices over time, a fixed sum of debt
          becomes easier to carry.
        </p>
        <p>
          This only helps if the interest rate is fixed or low. When inflation is high, interest rates usually rise too, so variable-rate
          mortgages, loans and credit cards become more expensive. Check what a rate rise would mean for your repayments before taking on
          new borrowing.
        </p>
      </GuideSection>

      <GuideSection id="investing" n={17} kicker="Investing" title="Investing and inflation">
        <p>
          Over long periods, shares have usually grown faster than inflation, because company profits and dividends tend to rise with prices.
          But they can fall sharply, sometimes for years, so they suit money you will not need for at least five years.
        </p>
        <ul>
          <li><strong>Shares:</strong> the best long-run record against inflation, with the biggest swings.</li>
          <li><strong>Conventional bonds:</strong> pay a fixed amount, so unexpected inflation reduces their real value.</li>
          <li><strong>Index-linked gilts:</strong> payments and capital rise with inflation, but prices still move with interest rates if sold before maturity.</li>
          <li><strong>Property:</strong> rents and prices have often risen with inflation, but property is costly to buy and sell.</li>
          <li><strong>Cash:</strong> safe in pounds, but only keeps up if the rate after tax beats inflation.</li>
        </ul>
        <p>
          Over a lifetime the effect is large. At 3% inflation, £1,000 in 50 years buys what £228 buys today, which is why long-term savings
          need to grow, not just sit still.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Looking only at the balance.</strong> A rising balance can still be losing value if the rate is below inflation.</li>
          <li><strong>Planning in today&rsquo;s prices but future pounds.</strong> Mixing the two can make a goal look easier than it is.</li>
          <li><strong>Forgetting tax.</strong> Compare the rate after tax with inflation, not the headline rate.</li>
          <li><strong>Assuming today&rsquo;s inflation lasts.</strong> Inflation changes. Test a range rather than one figure.</li>
          <li><strong>Leaving an inheritance in cash for years.</strong> £100,000 held as cash for 20 years at 2.5% inflation is worth about £61,027 in today&rsquo;s money.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "3.1%", label: "CPI, year to August 2026" },
            { value: "2%", label: "Bank of England target" },
            { value: "11.1%", label: "Peak, October 2022" },
            { value: "£135.70", label: "£100 of shopping in 10 years at 3.1%" },
            { value: "£7,369", label: "£10,000 cash after 10 years at 3.1%" },
            { value: "22.7 years", label: "Prices double at 3.1%" },
            { value: "£20,000", label: "ISA allowance" },
            { value: "£120,000", label: "FSCS savings protection" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
