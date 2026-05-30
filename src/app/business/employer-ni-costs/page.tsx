import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EmployerNICalculator from "./EmployerNICalculator";

export const metadata: Metadata = {
  title: "Employer NI Calculator (UK 2025/26 — 15% / £5k)",
  description: "True cost of hiring including Class 1 Secondary NI and Employment Allowance.",
};

export default function EmployerNIPage() {
  return (
    <CalculatorShell
      category="Business"
      updatedLabel="Apr 2025"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/employer-ni-costs", label: "Employer NI" }]}
      title="Employer NI Calculator"
      intro="From 6 April 2025, Employer NI jumped to 15% (was 13.8%) and the threshold dropped to £5,000 (was £9,100). This is the change that hit small businesses hardest in 2025."
      calculator={<EmployerNICalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Class 1 Secondary NI = 15% × (salary − £5,000). Employment Allowance offsets the bill by up to £10,500/year — covering ~2 full-time minimum-wage roles entirely, but not available to one-employee director-only companies.</p>}
          officialRules={
            <ul>
              <li>Secondary threshold: £5,000/yr (was £9,100 pre-Apr 2025).</li>
              <li>Rate: 15% (was 13.8%).</li>
              <li>Employment Allowance: £10,500 (was £5,000) — claim via your payroll.</li>
              <li>Not available to one-director-only companies, public bodies, or those with prior-year employer NI &gt;£100k.</li>
            </ul>
          }
          pitfalls={[
            { title: "Director-only Ltd Co misses out", body: "Single-director companies can’t claim Employment Allowance. The standard tax-efficient salary is therefore £5,000 (no NI either side)." },
            { title: "Apprentices under 25", body: "Zero employer NI on earnings up to £50,270. Same for under-21s." },
            { title: "Pension salary sacrifice", body: "Reduces NIable pay — saves both employer (15%) and employee (8%) NI. Huge total comp lever." },
          ]}
          faqs={[
            { question: "How do I claim Employment Allowance?", answer: "Tick the box on your first EPS submission of the tax year via your payroll software." },
            { question: "What about Apprenticeship Levy?", answer: "0.5% on annual paybill over £3m — separate from Employer NI." },
          ]}
          disclaimer="Educational. Always confirm with your payroll provider or accountant."
        />
      }
    />
  );
}
