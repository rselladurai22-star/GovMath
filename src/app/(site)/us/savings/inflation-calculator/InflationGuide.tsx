import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Inflation (US) — the guide. Figures from src/lib/us/investing.ts (CPI_ANNUAL, cpiAdjust, inflationIn, futureInflation, doublingYears). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const cents = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What inflation is" },
  { id: "cpi", title: "How the CPI is measured" },
  { id: "how", title: "How the calculator works" },
  { id: "example", title: "A worked example" },
  { id: "dollar", title: "What $100 was worth" },
  { id: "history", title: "A century of US inflation" },
  { id: "decades", title: "Inflation by decade" },
  { id: "recent", title: "Inflation since 2020" },
  { id: "deflation", title: "When prices fell" },
  { id: "future", title: "Planning for future inflation" },
  { id: "doubling", title: "How fast prices double" },
  { id: "pay", title: "Has your pay kept up?" },
  { id: "savings", title: "Inflation and your savings" },
  { id: "protect", title: "Ways to protect against inflation" },
  { id: "indexed", title: "What rises with inflation automatically" },
  { id: "personal", title: "Your own inflation rate" },
  { id: "limits", title: "Limits of the comparison" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "U.S. Bureau of Labor Statistics — Consumer Price Index", href: "https://www.bls.gov/cpi/" },
  { label: "U.S. Bureau of Labor Statistics — CPI inflation calculator", href: "https://www.bls.gov/data/inflation_calculator.htm" },
  { label: "U.S. Bureau of Labor Statistics — CPI questions and answers", href: "https://www.bls.gov/cpi/questions-and-answers.htm" },
  { label: "Federal Reserve — Why does the Federal Reserve aim for inflation of 2 percent?", href: "https://www.federalreserve.gov/faqs/economy_14400.htm" },
  { label: "Social Security Administration — Cost-of-living adjustment", href: "https://www.ssa.gov/cola/" },
  { label: "IRS — Tax inflation adjustments for tax year 2026", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
  { label: "TreasuryDirect — I bonds", href: "https://www.treasurydirect.gov/savings-bonds/i-bonds/" },
  { label: "TreasuryDirect — Treasury Inflation-Protected Securities (TIPS)", href: "https://www.treasurydirect.gov/marketable-securities/tips/" },
];

export default function InflationGuide() {
  return (
    <Guide
      kicker="The inflation guide"
      title="What a dollar is worth across the years"
      intro={
        <>
          Inflation is why a dollar buys less every year. This guide explains how the Consumer Price Index measures it, what money from past
          decades is worth now, how inflation has swung over more than a century, and how to plan for prices in the years ahead.
        </>
      }
      meta={["Official CPI-U data", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>$100 in 2000 buys about what {cents(194.53)} buys in August 2026.</li>
          <li>$100 in 1970 is worth about {cents(863.35)} today; $100 in 1913, about {cents(3_383.64)}.</li>
          <li>From 1913 to 2025, US prices rose an average of 3.16% a year.</li>
          <li>In the 12 months to August 2026, prices rose 3.4%.</li>
        </ul>
        <KeyStats
          items={[
            { value: cents(194.53), label: "$100 from 2000, in 2026 dollars" },
            { value: "3.16%", label: "Average inflation a year, 1913 to 2025" },
            { value: "2.6%", label: "Inflation in 2025 (annual average)" },
            { value: "3.4%", label: "Latest 12 months, to August 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What inflation is">
        <p>
          Inflation is a general rise in prices over time. When inflation is 3%, a basket of goods and services that cost $100 a year ago costs
          about $103 now. The flip side is that each dollar buys a little less: its purchasing power falls.
        </p>
        <p>
          Some inflation is normal in a growing economy. The Federal Reserve aims for 2% a year over time, measured by a related index, the
          personal consumption expenditures (PCE) price index. Very high inflation erodes savings and makes planning hard; falling prices
          (deflation) usually come with recessions.
        </p>
      </GuideSection>

      <GuideSection id="cpi" n={3} kicker="The data" title="How the CPI is measured">
        <p>
          Each month the Bureau of Labor Statistics (BLS) collects tens of thousands of prices across the country, from rent and groceries to
          car insurance and medical care, and combines them using how much households spend on each. The result is the Consumer Price Index for
          All Urban Consumers (CPI-U), which represents over 90% of the US population. Its base is set so the average for 1982 to 1984 equals 100.
        </p>
        <p>
          The calculator uses the CPI-U for all items, not seasonally adjusted, which is the series BLS uses for its own inflation calculator.
          Each year uses that year&rsquo;s annual average index. Because the 2026 average isn&rsquo;t known yet, 2026 uses the latest monthly
          index, August 2026 (334.980). BLS did not publish an index for October 2025 because of the federal government shutdown.
        </p>
      </GuideSection>

      <GuideSection id="how" n={4} kicker="Method" title="How the calculator works">
        <p>
          It divides the CPI for the year you want by the CPI for the year you start from, and multiplies your amount by the result. The average
          yearly rate is the compound rate that turns one index into the other over the number of years between them.
        </p>
        <p>
          You can go backward too. Put a recent year first and an earlier year second to see what today&rsquo;s price would have been in the past.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="What was $100 in 2000 worth in August 2026?"
          steps={[
            { label: "CPI-U, 2000 annual average", value: "172.2" },
            { label: "CPI-U, August 2026", value: "334.980" },
            { label: "Ratio: 334.980 ÷ 172.2", value: "1.9453" },
            { label: "Total price rise", value: "94.5%" },
            { label: "Average a year over 26 years", value: "2.59%" },
          ]}
          total={{ label: "$100 × 1.9453", value: cents(194.53) }}
        />
        <p>
          Put the other way, a dollar from 2000 buys only about 51 cents&rsquo; worth of goods today.
        </p>
      </GuideSection>

      <GuideSection id="dollar" n={6} kicker="Then and now" title="What $100 was worth">
        <DataTable
          caption="$100 in each year, in August 2026 dollars"
          head={["Year", "Worth in 2026", "Average inflation a year since"]}
          numeric={[1, 2]}
          rows={[
            ["1913", cents(3_383.64), "3.17%"],
            ["1920", cents(1_674.9), "2.69%"],
            ["1950", cents(1_389.96), "3.52%"],
            ["1960", cents(1_131.69), "3.74%"],
            ["1970", cents(863.35), "3.92%"],
            ["1980", cents(406.53), "3.10%"],
            ["1990", cents(256.3), "2.65%"],
            ["2000", cents(194.53), "2.59%"],
            ["2010", cents(153.62), "2.72%"],
            ["2020", cents(129.43), "4.39%"],
            ["2025", cents(104.05), "—"],
          ]}
        />
        <p>
          Notice that $100 from 1920 is worth less in today&rsquo;s money than $100 from 1933. Prices fell sharply in between, so a dollar in 1933
          bought much more than a dollar in 1920.
        </p>
      </GuideSection>

      <GuideSection id="history" n={7} kicker="History" title="A century of US inflation">
        <Timeline
          items={[
            { when: "1917–1920", what: "World War I inflation", detail: "Prices rose 17.4% in 1917, 18.0% in 1918 and 15.6% in 1920." },
            { when: "1921, 1930–1933", what: "Deflation", detail: "Prices fell 10.5% in 1921 and 9.9% in 1932, during the Great Depression." },
            { when: "1946–1947", what: "Post-war price surge", detail: "Wartime price controls ended; prices rose 8.3% and then 14.4%." },
            { when: "1973–1981", what: "The Great Inflation", detail: "Oil shocks and loose policy: 11.0% in 1974, 11.3% in 1979, 13.5% in 1980." },
            { when: "1983–2019", what: "Low and stable", detail: "Mostly 1% to 4% a year; 1.9% in 1986, 0.1% in 2015." },
            { when: "2021–2023", what: "Pandemic inflation", detail: "4.7% in 2021, 8.0% in 2022 and 4.1% in 2023." },
            { when: "2024–2025", what: "Cooling", detail: "2.9% in 2024 and 2.6% in 2025." },
          ]}
        />
      </GuideSection>

      <GuideSection id="decades" n={8} kicker="Long view" title="Inflation by decade">
        <Figure label="Average inflation a year, by decade" caption="CPI-U annual averages, from the first year of each decade to the first year of the next.">
          <Bars
            format={(n) => `${n.toFixed(2)}%`}
            items={[
              { label: "1940s", value: 5.58 },
              { label: "1950s", value: 2.08 },
              { label: "1960s", value: 2.74 },
              { label: "1970s", value: 7.82 },
              { label: "1980s", value: 4.72 },
              { label: "1990s", value: 2.8 },
              { label: "2000s", value: 2.39 },
              { label: "2010s", value: 1.73 },
              { label: "2020–2025", value: 4.46 },
            ]}
          />
        </Figure>
        <p>
          The 1920s and 1930s are left off the chart because prices fell on average, by 1.79% and 1.75% a year. The 1970s stand out: prices more
          than doubled in ten years.
        </p>
      </GuideSection>

      <GuideSection id="recent" n={9} kicker="Recent years" title="Inflation since 2020">
        <DataTable
          caption="CPI-U annual average and yearly change"
          head={["Year", "CPI-U", "Inflation"]}
          numeric={[1, 2]}
          rows={[
            ["2019", "255.657", "1.8%"],
            ["2020", "258.811", "1.2%"],
            ["2021", "270.970", "4.7%"],
            ["2022", "292.655", "8.0%"],
            ["2023", "304.702", "4.1%"],
            ["2024", "313.689", "2.9%"],
            ["2025", "321.943", "2.6%"],
            ["2026 (August)", "334.980", "3.4% (12 months)"],
          ]}
        />
        <p>
          A salary of {usd(50_000)} in 2020 would need to be about {usd(64_715)} in 2026 to buy the same things. That jump is why many people
          felt poorer after 2021 even when their pay rose.
        </p>
      </GuideSection>

      <GuideSection id="deflation" n={10} kicker="The other way" title="When prices fell">
        <p>
          Deflation sounds good for shoppers but usually signals trouble: falling demand, lost jobs and debts that become harder to repay as wages
          fall. The US saw it in 1921 and through the early 1930s. The only full year of falling prices since 1955 was 2009, after the financial
          crisis, when the annual average fell 0.4%.
        </p>
      </GuideSection>

      <GuideSection id="future" n={11} kicker="Ahead" title="Planning for future inflation">
        <DataTable
          caption="At 3% inflation a year"
          head={["Years ahead", "Cost of $100 of things", "What $100 will buy, in today's dollars"]}
          numeric={[1, 2]}
          rows={[
            ["10", cents(134.39), cents(74.41)],
            ["20", cents(180.61), cents(55.37)],
            ["30", cents(242.73), cents(41.2)],
          ]}
        />
        <p>
          For long-term plans, assume some inflation even if recent years have been calm. At 2.5% a year, {usd(50_000)} of yearly spending today
          becomes about {usd(64_004)} in 10 years, {usd(81_931)} in 20 and {usd(104_878)} in 30. Our{" "}
          <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}builds this into its estimate of what you need.
        </p>
      </GuideSection>

      <GuideSection id="doubling" n={12} kicker="Shortcut" title="How fast prices double">
        <CompareCards
          columns={[
            { name: "2% inflation", rows: [{ label: "Prices double in", value: "35.0 years" }] },
            { name: "3% inflation", rows: [{ label: "Prices double in", value: "23.4 years" }] },
            { name: "4% inflation", rows: [{ label: "Prices double in", value: "17.7 years" }] },
          ]}
        />
        <p>
          The rule of 72 gives a quick estimate: divide 72 by the inflation rate. At 3%, that is 24 years, close to the exact 23.4. Over a
          30-year retirement at 3%, prices more than double.
        </p>
      </GuideSection>

      <GuideSection id="pay" n={13} kicker="Your pay" title="Has your pay kept up?">
        <p>
          To check, put your old salary and its year into the calculator and compare the result with your pay now. A {usd(60_000)} salary in 2019
          equals about {usd(78_616)} in August 2026 prices. If you earn less than that, your pay has lost buying power, even if it has risen in
          dollars. The <a href="/us/taxes/raise-calculator">raise calculator</a>{" "}shows what a raise means after tax.
        </p>
      </GuideSection>

      <GuideSection id="savings" n={14} kicker="Real returns" title="Inflation and your savings">
        <p>
          What matters is your return after inflation, the real return. A savings account paying 1% when inflation is 3% loses about 2% of its
          buying power a year. Cash is right for emergencies and short-term goals, but money for goals decades away usually needs to be invested
          to stay ahead. The <a href="/us/savings/investment-calculator">investment calculator</a>{" "}shows any balance in today&rsquo;s dollars.
        </p>
        <Callout tone="warn" title="Tax makes it harder">
          Interest is taxed even when it only keeps up with inflation. At 4% interest, 3% inflation and a 22% tax rate, the after-tax return is
          3.12%, barely above inflation.
        </Callout>
      </GuideSection>

      <GuideSection id="protect" n={15} kicker="Options" title="Ways to protect against inflation">
        <ul>
          <li><strong>Series I savings bonds:</strong>{" "}their rate includes an inflation part reset every six months from the CPI-U. You can buy up to $10,000 a year electronically at TreasuryDirect.</li>
          <li><strong>TIPS:</strong>{" "}Treasury Inflation-Protected Securities, whose principal rises with the CPI-U.</li>
          <li><strong>Stocks:</strong>{" "}over long periods, company earnings and share prices have tended to grow faster than inflation, though not in every decade.</li>
          <li><strong>Fixed-rate debt:</strong>{" "}a fixed-rate mortgage gets easier to afford as prices and wages rise.</li>
        </ul>
      </GuideSection>

      <GuideSection id="indexed" n={16} kicker="Automatic" title="What rises with inflation automatically">
        <p>
          Social Security benefits rise each January with a cost-of-living adjustment based on the CPI-W, a closely related index. Federal tax
          brackets, the standard deduction and retirement plan limits are adjusted each year for inflation by the IRS, using a chained version of
          the CPI. Many pensions, though, are fixed in dollars, and most wages rise only when employers decide.
        </p>
      </GuideSection>

      <GuideSection id="personal" n={17} kicker="Your basket" title="Your own inflation rate">
        <p>
          The CPI is an average. Renters in fast-growing cities, people with large health costs and families paying for child care may see
          higher inflation than the index; homeowners with a fixed-rate mortgage may see less. Track a few big categories of your own spending
          year to year to see how your costs compare.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={18} kicker="Caveats" title="Limits of the comparison">
        <p>
          Comparing across many decades is rough. Products change: a 1970 car and a 2026 car are different things, and BLS adjusts for quality
          as best it can. Early CPI figures, especially before 1940, were gathered from fewer cities and items. The results are good for a sense of
          scale, not for exact prices of specific goods.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["CPI-U, August 2026", "334.980"],
            ["CPI-U, 2025 annual average", "321.943"],
            ["Inflation in 2025", "2.6%"],
            ["12 months to August 2026", "3.4%"],
            ["Average a year, 1913 to 2025", "3.16%"],
            ["Highest year since 1913", "18.0% (1918)"],
            ["Federal Reserve target", "2%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
