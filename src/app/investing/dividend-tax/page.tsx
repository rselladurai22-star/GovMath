import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import DividendCalculator from "./DividendCalculator";

export const metadata: Metadata = {
  title: "Dividend Tax Calculator (UK 2025/26)",
  description:
    "Tax on dividends in the UK: £500 allowance, then 8.75%, 33.75% or 39.35% depending on your total income.",
};

export default function DividendPage() {
  return (
    <CalculatorShell
      category="Pensions & Investing"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/investing", label: "Pensions & Investing" },
        { href: "/investing/dividend-tax", label: "Dividend Tax Calculator" },
      ]}
      title="Dividend Tax Calculator"
      intro="Type your other income and your dividends to see what tax you owe. Dividends are taxed at different rates depending on which Income Tax band they fall in."
      calculator={<DividendCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>UK dividend tax works in three layers:</p>
              <ol>
                <li>
                  <strong>Personal Allowance absorption</strong>: if your
                  other income doesn&apos;t use all £12,570, the remainder
                  covers dividends tax-free.
                </li>
                <li>
                  <strong>£500 dividend allowance</strong>: regardless of band,
                  the first £500 of taxed dividends is at 0%.
                </li>
                <li>
                  <strong>Banded rates</strong>: the rest is taxed at
                  8.75% / 33.75% / 39.35% depending on which Income Tax band
                  the dividends fall into when stacked on top of other income.
                </li>
              </ol>
              <p>
                Note: dividend tax is settled through Self Assessment if you
                receive more than £10,000 in dividends. Below that, HMRC can
                collect it through your tax code.
              </p>
            </>
          }
          officialRules={
            <>
              <p>2025/26 rates and thresholds:</p>
              <ul>
                <li>
                  <strong>Dividend allowance</strong>: £500/year tax-free.
                  Was £2,000 in 2022/23 — slashed since.
                </li>
                <li>
                  <strong>Basic rate</strong> 8.75%: dividends falling in the
                  £12,570–£50,270 band.
                </li>
                <li>
                  <strong>Higher rate</strong> 33.75%: dividends in the
                  £50,270–£125,140 band.
                </li>
                <li>
                  <strong>Additional rate</strong> 39.35%: dividends above
                  £125,140.
                </li>
                <li>
                  <strong>ISA shelter</strong>: dividends inside a Stocks &
                  Shares ISA are completely tax-free with no allowance limit.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The £500 allowance hasn't kept up with inflation",
              body: "From £2,000 in 2022/23 to £500 today. A typical retail investor with £20k in a yielding portfolio now pays dividend tax — where they wouldn&rsquo;t have three years ago. ISA wrappers matter more than ever.",
            },
            {
              title: "Dividend tax is always settled annually",
              body: "Companies pay dividends gross — no tax is withheld at source. You owe tax via Self Assessment in January. Set aside the cash when the dividend lands, not when the bill arrives.",
            },
            {
              title: "Dividends count toward bands but pay their own rates",
              body: "Imagine you have £49k salary and £5k dividends. The dividends push your total above the £50,270 basic-rate top. The portion in the higher band is taxed at 33.75%, not 8.75% — but the salary itself isn&rsquo;t reclassified.",
            },
            {
              title: "Salary-then-dividend optimisers can be over-egged",
              body: "Director extraction strategies often quote &ldquo;optimal&rdquo; figures from 2017 that no longer hold. With the allowance now £500 and CT now 25%/26.5%/19%, run a fresh check via the Salary vs Dividend optimiser before banking on stale advice.",
            },
          ]}
          faqs={[
            {
              question: "Do I pay tax on reinvested dividends in a fund?",
              answer:
                "Yes — even if the dividends are automatically reinvested (an &lsquo;accumulation&rsquo; fund), you&rsquo;re treated as having received and re-spent them. Inside an ISA or pension, that doesn&rsquo;t matter.",
            },
            {
              question: "What about foreign dividends?",
              answer:
                "UK taxable just like UK dividends, generally. You may also pay withholding tax in the source country (e.g. 15% on US dividends with a W-8BEN form filed); you can claim a Foreign Tax Credit to avoid double tax.",
            },
            {
              question: "Should I take a director's salary or dividends?",
              answer:
                "Both, usually. A £12,570 salary uses your PA tax-free, gives a State Pension credit, and is deductible against Corporation Tax. Then top up with dividends from post-CT profits. Run the Salary vs Dividend optimiser for the breakeven on your numbers.",
            },
          ]}
          disclaimer="Doesn't include Scottish rates (Scottish IT applies to earned income only — dividend rates are UK-wide). Doesn't model overseas withholding or DTAs."
        />
      }
    />
  );
}
