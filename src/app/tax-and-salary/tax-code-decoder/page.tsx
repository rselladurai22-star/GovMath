import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import TaxCodeDecoderCalculator from "./TaxCodeDecoderCalculator";

export const metadata: Metadata = {
  title: "UK Tax Code Decoder (2025/26)",
  description: "Type your PAYE tax code and see your personal allowance, what each letter means, and whether you’re on an emergency code.",
};

export default function TaxCodeDecoderPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        { href: "/tax-and-salary/tax-code-decoder", label: "Tax Code Decoder" },
      ]}
      title="UK Tax Code Decoder"
      intro="Your PAYE tax code controls how much tax comes out of every payslip. We decode the digits, the letter, and any emergency suffix in one line."
      calculator={<TaxCodeDecoderCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Most tax codes are <code>NNNNL</code>: multiply the number by 10 to get your annual tax-free personal allowance.
              The letter sets the variant (M/N for Marriage Allowance, T for tapered, K for negative allowance). A W1, M1 or X suffix means it’s non-cumulative — applied to one pay period at a time.
            </p>
          }
          officialRules={
            <ul>
              <li>2025/26 standard personal allowance is £12,570 → standard code <code>1257L</code>.</li>
              <li>Allowance tapers by £1 for every £2 of income over £100,000 — gone entirely at £125,140.</li>
              <li>BR, D0, D1 codes mean no allowance — usually a second income source.</li>
              <li>S prefix = Scottish rates; C prefix = Welsh rates (currently mirror rUK).</li>
            </ul>
          }
          pitfalls={[
            { title: "Emergency codes over-tax", body: "W1/M1/X codes treat each payday as week 1 — you get 1/52 of your allowance, not the cumulative figure. Usually corrects on the next P45." },
            { title: "Two jobs, one allowance", body: "Your allowance attaches to ONE job. The other usually gets BR or D0 — fine if you stay in basic rate, costly if you tip into higher." },
            { title: "K-code shock", body: "K codes can take 50% of your pay maximum. If you suddenly switch to one, check with HMRC — often a state pension or company car under-coded last year." },
          ]}
          faqs={[
            { question: "What if my code looks wrong?", answer: "Sign in to your Personal Tax Account on gov.uk. You can update estimated income, company benefits and state pension figures and HMRC will reissue a code within a few weeks." },
            { question: "Does this work for Scotland?", answer: "Yes — prefix S codes are recognised. Scottish income tax rates differ but the allowance maths is the same." },
            { question: "Why is mine 1257L but I’m still paying tax?", answer: "1257L gives £12,570 tax-free per year — about £1,048/month. Anything over that is taxed at your marginal rate." },
          ]}
          disclaimer="Decoder reflects HMRC tax code rules for 2025/26. Always confirm with HMRC or your PAYE coding notice."
        />
      }
    />
  );
}
