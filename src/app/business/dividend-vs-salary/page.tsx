import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import DivVsSalCalculator from "./DivVsSalCalculator";

export const metadata: Metadata = {
  title: "Dividend vs Salary Calculator UK 2025/26 (Director Optimiser)",
  description:
    "Find the optimal director&rsquo;s salary vs dividend mix for a UK limited company — accounting for Corporation Tax, employer NI, Income Tax, employee NI and dividend tax.",
};

export default function DivVsSalPage() {
  return (
    <CalculatorShell
      category="Business & Self-Employed"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/business", label: "Business & Self-Employed" },
        { href: "/business/dividend-vs-salary", label: "Dividend vs Salary" },
      ]}
      title="Dividend vs Salary Calculator"
      intro="For one-person limited companies, the cheapest way to extract profit changed in April 2025 — employer NI now hits 15% above £5k, and dividend allowances shrank to £500. The old &lsquo;£12,570 + dividends&rsquo; rule still wins for most, but the maths is closer than ever."
      calculator={<DivVsSalCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>For each scenario we run a complete cashflow:</p>
              <ol>
                <li>
                  Director&rsquo;s salary is deducted from profit before
                  Corporation Tax, along with the employer&rsquo;s NI on it.
                </li>
                <li>
                  Corporation Tax is applied at 19% (≤£50k), marginal
                  effective 26.5% (£50k–£250k), or 25% (£250k+).
                </li>
                <li>Remaining profit is paid as dividends.</li>
                <li>
                  Director pays Income Tax + employee NI on the salary,
                  and dividend tax (8.75% / 33.75% / 39.35%) on the
                  dividends above the £500 allowance.
                </li>
              </ol>
              <p>
                Take-home = salary − Income Tax − employee NI + dividends − dividend tax.
              </p>
            </>
          }
          officialRules={
            <>
              <ul>
                <li>
                  <strong>Dividend allowance</strong> 2025/26: £500. Anything
                  above is taxed at 8.75% (basic), 33.75% (higher), 39.35%
                  (additional).
                </li>
                <li>
                  <strong>Employer NI</strong>: 15% on salary above £5,000
                  Secondary Threshold (was 13.8% above £9,100 before April 2025).
                </li>
                <li>
                  <strong>Employment Allowance</strong>: £10,500 against
                  employer NI — but <em>not available</em> for single-director
                  companies with no other employees. Two-employee setups can
                  claim it.
                </li>
                <li>
                  <strong>NI credit for State Pension</strong>: salary
                  between Lower Earnings Limit (£6,500) and Primary
                  Threshold (£12,570) gives a qualifying year at zero NI cost.
                </li>
                <li>
                  Dividends must come from <strong>distributable reserves</strong>
                  — post-CT retained profits, not just current-year profit.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "£12,570 salary now costs employer NI",
              body: "Under old rules, a £12,570 salary paid no NI at all. From April 2025, the employer pays 15% on the £7,570 above £5k = £1,135.50 employer NI. Still usually worth it for the Corporation Tax deduction and pension credit, but the margin narrowed.",
            },
            {
              title: "Single-director companies can't claim Employment Allowance",
              body: "If you&rsquo;re the sole employee + sole director, you cannot claim the £10,500 NI relief. Add a spouse/partner on a real (audited) salary to qualify — but only if their role is genuine.",
            },
            {
              title: "Drawing too much can push you into 60% effective rate",
              body: "Total income (salary + dividends) above £100k starts losing your Personal Allowance — every extra £1 effectively costs £0.60. Dividend strategies that look optimal at low income become punishing here.",
            },
            {
              title: "Ignoring State Pension is a long-term mistake",
              body: "A £0 salary year is a £0 NI year — costing 1/35th of the State Pension permanently (~£230/year). 10 missing years = ~£2,300/year less in retirement. Class 3 voluntary NICs cost £907.40/year to fix later.",
            },
          ]}
          faqs={[
            {
              question: "Can I pay myself a salary lower than £12,570?",
              answer:
                "Yes — common alternatives are £6,500 (Lower Earnings Limit, NI credit at zero cost) and £5,000 (Employer NI Secondary Threshold). Both reduce CT deduction but eliminate employer NI.",
            },
            {
              question: "What about pension contributions?",
              answer:
                "Employer pension contributions are CT-deductible and not capped by salary — but limited by &ldquo;wholly and exclusively&rdquo; commercial reasonableness. Often the most tax-efficient extraction over £100k.",
            },
            {
              question: "When should I take dividends?",
              answer:
                "Time them across tax years to stay in basic-rate band. Each tax year resets the £500 allowance and the £37,700 basic-rate dividend band.",
            },
          ]}
          disclaimer="Simplified single-director model. Excludes Employment Allowance, multiple income sources, pension contributions, BIK and student loans. Not tax advice — speak to an accountant."
        />
      }
    />
  );
}
