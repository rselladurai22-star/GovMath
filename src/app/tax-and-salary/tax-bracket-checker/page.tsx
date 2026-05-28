import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import TaxBracketCalculator from "./TaxBracketCalculator";

export const metadata: Metadata = {
  title: "Tax Bracket Checker (UK Income Tax, 2025/26)",
  description:
    "See your UK Income Tax band by band — and find out exactly what a £1,000 pay rise actually delivers after tax. 2025/26 rates.",
};

type SearchParams = Promise<{ income?: string }>;

function parseIncome(raw: string | undefined): number {
  if (!raw) return 35000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 35000;
  return Math.min(n, 10_000_000);
}

export default async function TaxBracketCheckerPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { income } = await searchParams;

  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        {
          href: "/tax-and-salary/tax-bracket-checker",
          label: "Tax Bracket Checker",
        },
      ]}
      title="UK Tax Bracket Checker"
      intro="See your Income Tax bill broken down by band — and exactly what a pay rise is worth after the government takes its share."
      calculator={<TaxBracketCalculator initialIncome={parseIncome(income)} />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                The UK uses a <strong>band system</strong>: you don&apos;t pay
                one flat rate on everything. Each slice of your income gets
                taxed at the rate for that band.
              </p>
              <p>
                We take your income, subtract your <strong>Personal Allowance</strong>{" "}
                (tax-free amount) and apply each rate to its slice:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>First £12,570 — taxed at 0%.</li>
                <li>Next slice up to £50,270 — taxed at 20%.</li>
                <li>Next slice up to £125,140 — taxed at 40%.</li>
                <li>Anything above £125,140 — taxed at 45%.</li>
              </ol>
              <p>
                The &ldquo;pay rise&rdquo; figure shows what you&apos;d
                actually keep from an extra £1,000 — your marginal rate, not
                your average rate.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                <strong>HMRC</strong> (His Majesty&apos;s Revenue and Customs)
                publishes the bands once a year. For{" "}
                <strong>2025/26</strong> in England, Wales and Northern
                Ireland:
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-bg text-text/70">
                    <tr>
                      <th className="text-left p-3 font-semibold">Band</th>
                      <th className="text-left p-3 font-semibold">Income</th>
                      <th className="text-right p-3 font-semibold">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-3">Personal Allowance</td>
                      <td className="p-3">£0 – £12,570</td>
                      <td className="p-3 text-right font-mono">0%</td>
                    </tr>
                    <tr>
                      <td className="p-3">Basic rate</td>
                      <td className="p-3">£12,571 – £50,270</td>
                      <td className="p-3 text-right font-mono">20%</td>
                    </tr>
                    <tr>
                      <td className="p-3">Higher rate</td>
                      <td className="p-3">£50,271 – £125,140</td>
                      <td className="p-3 text-right font-mono">40%</td>
                    </tr>
                    <tr>
                      <td className="p-3">Additional rate</td>
                      <td className="p-3">Over £125,140</td>
                      <td className="p-3 text-right font-mono">45%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          }
          pitfalls={[
            {
              title: "The £100,000 trap — a hidden 60% marginal rate",
              body: (
                <p>
                  Above £100,000, your Personal Allowance shrinks by £1 for
                  every £2 you earn. Between £100,000 and £125,140 every
                  extra £1 you earn loses you 50p of allowance — which then
                  gets taxed at 40%. Combined with the 40% on the extra £1
                  itself, the marginal rate is{" "}
                  <strong>60%</strong>. Salary sacrifice into a pension is
                  the usual fix.
                </p>
              ),
            },
            {
              title: "Pay rises straight into the higher rate",
              body: (
                <p>
                  A bonus or rise that lifts you over £50,270 has 40% taken
                  off the top. Use the pay-rise box to see exactly how much
                  you&apos;d keep before you negotiate.
                </p>
              ),
            },
            {
              title: "Dividends and savings interest aren't included",
              body: (
                <p>
                  Dividend income has its own rates (8.75%, 33.75%, 39.35%)
                  and savings interest has its own allowance. This page only
                  covers earned income.
                </p>
              ),
            },
          ]}
          faqs={[
            {
              question: "Does this include National Insurance?",
              answer: (
                <p>
                  No — NI is a separate tax. Use the Salary Calculator to see
                  Income Tax and NI combined.
                </p>
              ),
            },
            {
              question: "What about Scotland?",
              answer: (
                <p>
                  Scottish taxpayers use six bands. A Scotland-specific
                  calculator is on the way.
                </p>
              ),
            },
          ]}
          disclaimer="Figures are estimates for the 2025/26 tax year (England, Wales & Northern Ireland). GovMath is not affiliated with HMRC."
        />
      }
    />
  );
}
