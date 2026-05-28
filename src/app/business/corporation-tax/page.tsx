import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CorpTaxCalculator from "./CorpTaxCalculator";

export const metadata: Metadata = {
  title: "Corporation Tax Calculator UK 2025/26 (with Marginal Relief)",
  description: "Work out UK Corporation Tax — 19% small profits rate, marginal relief band £50k–£250k, 25% main rate.",
};

export default function CorpTaxPage() {
  return (
    <CalculatorShell
      category="Business & Self-Employed"
      updatedLabel="2025/26 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business & Self-Employed" }, { href: "/business/corporation-tax", label: "Corporation Tax" }]}
      title="Corporation Tax Calculator"
      intro="From April 2023, UK Corporation Tax has two main rates — 19% for profits up to £50,000 and 25% above £250,000 — with a marginal-relief band in between that effectively taxes those middle pounds at 26.5%."
      calculator={<CorpTaxCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>The marginal-relief band works by giving small-profits relief that tapers away between £50k and £250k. The net effect: every £1 of profit between those limits is taxed at 26.5% — the &ldquo;marginal effective rate&rdquo;.</p>
              <p>So a £100k-profit company doesn&rsquo;t pay 25% × £100k. It pays 19% × £50k + 26.5% × £50k = £22,750.</p>
            </>
          }
          officialRules={
            <ul>
              <li><strong>Small profits rate</strong>: 19% on profits ≤ £50,000.</li>
              <li><strong>Main rate</strong>: 25% on profits ≥ £250,000 (applied to the whole profit, not just the excess).</li>
              <li><strong>Marginal relief</strong>: between £50k and £250k, effective rate 26.5% on the excess above £50k.</li>
              <li>Limits divided by number of <strong>associated companies</strong>: two companies share £50k/£250k thresholds.</li>
              <li>Payable 9 months and 1 day after year-end; large companies (£1.5m+) pay quarterly instalments.</li>
            </ul>
          }
          pitfalls={[
            { title: "Associated companies divide your bands", body: "Two trading companies under common control? Each gets only £25k small-profits / £125k upper. Easy way to land in marginal relief unexpectedly." },
            { title: "Salary, pension and dividends interact", body: "Director&rsquo;s salary is deductible against CT — pension contributions even more so. Strategic extraction can drop you below £50k." },
            { title: "Don't confuse with Income Tax bands", body: "CT is on company profit, not your personal pay. Dividends are then taxed personally on top." },
          ]}
          faqs={[
            { question: "Can I time profits to stay in the small-profits band?", answer: "Yes — pension contributions, capital allowances, or accruing genuine expenses can keep you below £50k. Don&rsquo;t backdate." },
            { question: "What about ring-fence (oil & gas) rates?", answer: "30% / 19% with a separate supplementary charge. Out of scope here." },
          ]}
          disclaimer="Excludes associated companies, ring-fence profits and patent box. Talk to an accountant for real numbers."
        />
      }
    />
  );
}
