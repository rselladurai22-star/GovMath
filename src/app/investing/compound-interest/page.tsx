import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CompoundCalculator from "./CompoundCalculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator (UK)",
  description:
    "Project your investments forward — see how monthly contributions and compound growth combine over 5, 10, 20 or 30 years.",
};

export default function CompoundPage() {
  return (
    <CalculatorShell
      category="Pensions & Investing"
      updatedLabel="Monthly compounding"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/investing", label: "Pensions & Investing" },
        { href: "/investing/compound-interest", label: "Compound Interest Calculator" },
      ]}
      title="Compound Interest Calculator"
      intro="See what regular saving plus compounding gets you over the long run. Run the numbers on different rates of return and time horizons — and see why starting early matters."
      calculator={<CompoundCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>The classic compound-interest formula with regular deposits is:</p>
              <p>
                <code>
                  FV = P(1+r/n)^(nt) + C · [((1+r/n)^(nt) − 1) / (r/n)]
                </code>
              </p>
              <p>
                Where <strong>P</strong> is the starting principal,{" "}
                <strong>C</strong> is the contribution each period,{" "}
                <strong>r</strong> is the annual rate, <strong>n</strong> is
                the number of compounds per year, and <strong>t</strong> is
                years. We use monthly compounding (n = 12) and assume
                contributions go in at the end of each month.
              </p>
              <p>
                The magic happens in the second term: each contribution
                compounds for the remaining months, so the £200 you put in
                today is worth far more at year 30 than the £200 you put in
                in year 29.
              </p>
            </>
          }
          officialRules={
            <>
              <p>There aren&apos;t any &ldquo;official&rdquo; UK rules for compound interest — the maths is the maths. What changes in real life is how the wrapper around it is taxed:</p>
              <ul>
                <li>
                  <strong>Stocks & Shares ISA:</strong> £20,000/year allowance.
                  All growth, dividends and withdrawals are tax-free. Most
                  long-term retail investing in the UK happens here.
                </li>
                <li>
                  <strong>Pension (SIPP/workplace):</strong> contributions get
                  income-tax relief at your marginal rate. Growth is tax-free
                  inside the pension. On withdrawal (age 55, rising to 57 in
                  2028), 25% is tax-free and the rest taxed as income.
                </li>
                <li>
                  <strong>General Investment Account (GIA):</strong> no
                  shelter — dividends above the £500 allowance are taxed,
                  and capital gains above the £3,000 allowance face CGT.
                </li>
              </ul>
              <p>
                Our calculator shows nominal returns. Subtract inflation
                (typically 2–3% long-run) to see the real-terms purchasing
                power of your future balance.
              </p>
            </>
          }
          pitfalls={[
            {
              title: "Past returns are not a forecast",
              body: "UK equities have averaged ~5% real long-term, but with decades of underperformance and outperformance in between. Don&rsquo;t plug in 10% and treat the output as a guarantee — model 4–6% and consider what happens at 0%.",
            },
            {
              title: "Inflation eats nominal growth",
              body: "A £500,000 pot in 30 years sounds enormous, but if inflation runs at 3% a year, that&rsquo;s worth roughly £206,000 in today&rsquo;s money. Always sense-check long projections against inflation.",
            },
            {
              title: "Fees compound too — in the wrong direction",
              body: "A 1% annual platform/fund fee sounds small, but over 30 years it can shave 25%+ off your final pot. Stick to low-cost index funds wherever possible, and check the OCF before you invest.",
            },
            {
              title: "Sequence of returns matters near withdrawal",
              body: "Two portfolios with the same average return can end up very differently if one suffers a crash early in withdrawal vs late. Compound interest is a useful planning tool — not a withdrawal strategy. Look up &ldquo;sequence risk&rdquo; before you retire.",
            },
          ]}
          faqs={[
            {
              question: "Should I use a SIPP, ISA, or both?",
              answer:
                "Both, generally. Workplace pensions are unbeatable up to the employer match (free money). Beyond that, ISAs offer flexibility (withdraw any time, tax-free), while SIPPs offer up-front tax relief but lock the money up until 57. A common pattern: match the employer in the pension, fill the ISA, then top up the pension further.",
            },
            {
              question: "What return should I plug in?",
              answer:
                "For a diversified global equity portfolio, 4–6% real (after inflation) is a reasonable mid-case. Use 7–8% nominal if you want to model in inflation separately. Anything above 10% is optimistic for a long horizon.",
            },
            {
              question: "Is monthly compounding realistic for investments?",
              answer:
                "Most index funds reinvest dividends quarterly or semi-annually, not monthly — and prices move continuously. Monthly compounding is a small simplification that has negligible impact at long horizons, and matches how most savings accounts and pension projections work.",
            },
          ]}
          disclaimer="Projections only. Investment values can fall as well as rise; you may get back less than you paid in. This is not personal financial advice."
        />
      }
    />
  );
}
