import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import HolidayCalculator from "./HolidayCalculator";

export const metadata: Metadata = {
  title: "Holiday Entitlement Calculator (UK Statutory 5.6 Weeks)",
  description: "Statutory annual leave for any working pattern — 5.6 weeks × days worked, capped at 28.",
};

export default function HolidayPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="Statutory rules"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax & Salary" }, { href: "/tax-and-salary/holiday-entitlement", label: "Holiday Entitlement" }]}
      title="UK Holiday Entitlement Calculator"
      intro="Every worker in the UK gets at least 5.6 weeks&rsquo; paid holiday per year (capped at 28 days). That includes part-time, agency, zero-hours and irregular workers — pro-rated."
      calculator={<HolidayCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Days worked per week × 5.6 = annual entitlement, capped at 28 days. For irregular-hours/term-time workers, use the 12.07% accrual method on hours worked.</p>}
          officialRules={
            <ul>
              <li>5.6 weeks per year (Working Time Regulations 1998).</li>
              <li>Cap at 28 days even if you work 6+ days/week.</li>
              <li>Bank holidays can be included or extra — depends on contract.</li>
              <li>Irregular hours: 12.07% of hours worked (post-Harpur Trust v Brazel still applies for some; rolled-up holiday pay legalised April 2024 for irregular workers).</li>
            </ul>
          }
          pitfalls={[
            { title: "Bank holidays aren't extra by law", body: "If your contract says &lsquo;28 days including bank holidays&rsquo;, that&rsquo;s the statutory minimum — no extra." },
            { title: "Carry-over usually only 1.6 weeks", body: "Only the 1.6 weeks of UK-specific leave (above the 4-week EU minimum) can be carried into next year — and only with employer agreement." },
            { title: "Term-time-only workers got Brazel'd", body: "Pre-2024, term-time workers got the full 5.6 weeks even though they only worked 39 weeks. New rules from April 2024 align this with the 12.07% method." },
          ]}
          faqs={[
            { question: "What about my first year?", answer: "You accrue 1/12 of your annual entitlement each month for the first year — so 0.47 weeks per month if you do 5 days." },
            { question: "Can my employer make me take leave?", answer: "Yes — with twice the notice of the leave period. Common at Christmas shutdowns." },
          ]}
          disclaimer="Statutory minimum. Many employers offer more — check your contract."
        />
      }
    />
  );
}
