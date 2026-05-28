import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import TimesheetCalculator from "./TimesheetCalculator";

export const metadata: Metadata = {
  title: "Timesheet Decimal Converter (hh:mm to Decimal Hours)",
  description: "Convert hours and minutes into decimal hours for payroll, invoicing or timesheets.",
};

export default function TimesheetPage() {
  return (
    <CalculatorShell
      category="Everyday & Life"
      updatedLabel="Utility"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/life", label: "Everyday" }, { href: "/life/timesheet-decimal", label: "Timesheet Decimal" }]}
      title="Timesheet Decimal Converter"
      intro="Payroll systems and freelance invoices usually need decimal hours, not hh:mm. 7 hours 30 minutes = 7.5 hrs. This converts any time worked into the right format."
      calculator={<TimesheetCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Decimal hours = hours + (minutes ÷ 60). 15 minutes = 0.25 hrs, 30 min = 0.50, 45 min = 0.75.</p>}
          officialRules={
            <ul>
              <li>UK payroll & HMRC reporting uses decimal hours.</li>
              <li>Common rounding: nearest 0.25 (15-min increments) for hourly staff.</li>
              <li>For overtime, use exact decimal — round only at total stage.</li>
            </ul>
          }
          pitfalls={[
            { title: "Don&rsquo;t treat 7:30 as 7.30", body: "Common bug — 7.30 = 7.3 hrs (7h 18m), not 7.5 hrs. Always divide minutes by 60." },
            { title: "Beware compounding rounding", body: "Rounding each shift to 0.25 then totalling can drift several minutes per week. Total exact, then round once." },
          ]}
          faqs={[
            { question: "What about hh:mm:ss?", answer: "seconds ÷ 3600. So 7:30:45 = 7 + 30/60 + 45/3600 ≈ 7.5125 hrs." },
            { question: "Why 60?", answer: "Sexagesimal time inherited from Babylonia. We&rsquo;re stuck with it." },
          ]}
          disclaimer="Pure math utility."
        />
      }
    />
  );
}
