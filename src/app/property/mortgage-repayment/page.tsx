import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MortgageCalculator from "./MortgageCalculator";

export const metadata: Metadata = {
  title: "UK Mortgage Repayment Calculator (2025)",
  description:
    "Work out your monthly mortgage payment, total interest and remaining balance year by year. Includes a quick UK affordability estimate.",
};

type SearchParams = Promise<{
  price?: string;
  deposit?: string;
  rate?: string;
  term?: string;
}>;

function parseNumber(raw: string | undefined, fallback: number, max: number) {
  if (!raw) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(n, max);
}

export default async function MortgagePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { price, deposit, rate, term } = await searchParams;

  return (
    <CalculatorShell
      category="Mortgages & Property"
      updatedLabel="2025 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/property", label: "Mortgages & Property" },
        {
          href: "/property/mortgage-repayment",
          label: "Mortgage Repayment Calculator",
        },
      ]}
      title="UK Mortgage Repayment Calculator"
      intro="See your monthly payment, the total interest you’ll pay, and how the balance shrinks year by year. Plus a quick affordability check based on UK lenders’ income multiples."
      calculator={
        <MortgageCalculator
          initialPrice={parseNumber(price, 300_000, 50_000_000)}
          initialDeposit={parseNumber(deposit, 30_000, 50_000_000)}
          initialRate={parseNumber(rate, 4.5, 25)}
          initialTerm={parseNumber(term, 25, 40)}
        />
      }
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                A repayment mortgage is calculated with the standard{" "}
                <strong>amortisation formula</strong>:
              </p>
              <p>
                <code>M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1)</code>
              </p>
              <p>
                Where <strong>P</strong> is your loan, <strong>r</strong> is
                the monthly interest rate (annual ÷ 12), and <strong>n</strong>{" "}
                is the number of months (term × 12).
              </p>
              <p>
                The monthly payment is constant, but each payment is split
                between interest (on the remaining balance) and capital. Early
                on, most of the payment is interest; later, most of it is
                capital. That’s why overpaying in year 1 saves you so much
                more than overpaying in year 20.
              </p>
              <p>
                The affordability estimate uses the standard UK lender rule
                of thumb: <strong>4.5× combined gross salary</strong> is the
                typical maximum, with 4× being cautious and 5× being generous
                (and reserved for higher earners with clean credit files).
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                The UK mortgage market has a few hard rules and a lot of
                lender-specific ones. The ones that matter most:
              </p>
              <ul>
                <li>
                  <strong>Loan-to-value (LTV)</strong> = loan ÷ property price.
                  Most lenders cap at 95% LTV for residential mortgages.
                  Better rates appear at 90%, 85%, 75% and 60% LTV bands.
                </li>
                <li>
                  <strong>Income multiples</strong>: lenders typically lend up
                  to 4.5× combined salary, sometimes 5–5.5× for high earners
                  or specific schemes. The FCA’s Mortgage Market Review caps
                  the proportion of loans any lender can issue above 4.5×.
                </li>
                <li>
                  <strong>Affordability stress tests</strong>: lenders model
                  whether you could still afford the payment if rates rose by
                  ~1–3%. This often constrains how much you can borrow more
                  than the income multiple does.
                </li>
                <li>
                  <strong>Term</strong>: standard maximum is 35 years (some
                  lenders go to 40). Longer term = smaller monthly payment but
                  much more total interest.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The headline rate is rarely what you pay long-term",
              body: "Most UK mortgages are fixed for 2, 5 or 10 years, then revert to the lender’s Standard Variable Rate — usually 3–5% higher. Plan to remortgage at the end of your fix, or budget for a much higher payment.",
            },
            {
              title: "A longer term saves monthly but costs a fortune total",
              body: "Pushing a £200k loan at 5% from a 25-year term to a 35-year term cuts the monthly payment by about £160 — but adds nearly £45,000 to the total interest. Use the shortest term you can comfortably afford.",
            },
            {
              title: "Don’t forget the upfront costs",
              body: "On top of your deposit, budget for: Stamp Duty (use our SDLT calculator), legal fees (£1,000–£2,000), survey (£300–£1,500), mortgage product/arrangement fee (£0–£2,000), and removals. Easily £3,000–£8,000 on a typical purchase.",
            },
            {
              title: "Affordability ≠ maximum loan",
              body: "Just because a lender will offer you 4.5× salary doesn’t mean you should take it. Stress-test yourself against the actual monthly payment — including a 2% rate rise — and don’t forget childcare, pension contributions, and the cost of running the house itself.",
            },
          ]}
          faqs={[
            {
              question: "Should I overpay or invest?",
              answer:
                "Rule of thumb: if your mortgage rate is higher than the return you’d realistically get from an ISA after tax, overpay. At 5%+ mortgage rates, overpaying usually beats investing. Check your lender’s overpayment limit first — typically 10% of the balance per year without an early repayment charge.",
            },
            {
              question: "Is interest-only cheaper?",
              answer:
                "Each month, yes — you only pay the interest. But you still owe the full loan at the end of the term and need a repayment vehicle (ISA, investments, sale of property) to clear it. UK lenders rarely offer interest-only for residential anymore; it’s mostly a buy-to-let product now.",
            },
            {
              question: "What is a tracker mortgage?",
              answer:
                "A tracker mortgage moves with the Bank of England base rate, usually base + a fixed margin (e.g. base + 0.5%). You benefit when rates fall and pay more when they rise. Fixes give certainty; trackers give optionality.",
            },
          ]}
          disclaimer="Figures are an estimate. The exact monthly payment your lender quotes will depend on the product fee, any cashback, and how interest is calculated (daily vs monthly). Always check the lender’s Key Facts Illustration."
        />
      }
    />
  );
}
