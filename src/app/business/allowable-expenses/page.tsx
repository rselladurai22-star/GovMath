import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import AllowableExpensesCalculator from "./AllowableExpensesCalculator";

export const metadata: Metadata = {
  title: "Self-Employed Allowable Expenses Calculator (UK 2025/26)",
  description: "Total your allowable expenses using HMRC’s simplified flat rates for working from home and mileage, plus itemised categories.",
};

export default function AllowableExpensesPage() {
  return (
    <CalculatorShell
      category="Business"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/business", label: "Business" },
        { href: "/business/allowable-expenses", label: "Allowable Expenses" },
      ]}
      title="Allowable Expenses Calculator"
      intro="Every pound of allowable expense knocks ~28p off your tax bill (basic rate + Class 4 NI). We add HMRC’s simplified flat rates for home working and mileage to your itemised categories."
      calculator={<AllowableExpensesCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We total the categories you enter, then add the simplified WFH rate (£10/£18/£26 per month depending on hours) and the mileage rate (45p/mi for the first 10,000 business miles, 25p thereafter).
            </p>
          }
          officialRules={
            <ul>
              <li>Expense must be ”wholly and exclusively” for the business — no dual-purpose grey areas.</li>
              <li>Simplified expenses are optional; you can itemise actual costs instead if higher.</li>
              <li>Keep receipts for 5 years after the 31 January Self Assessment deadline.</li>
              <li>VAT-registered businesses claim net of recoverable VAT.</li>
            </ul>
          }
          pitfalls={[
            { title: "Clothing", body: "Only protective gear or branded uniforms are allowable — a smart suit for client meetings is not." },
            { title: "Entertainment", body: "Client entertainment is NOT allowable. Staff entertainment is — up to £150/head/year." },
            { title: "Home office capital gains", body: "Claiming a fixed room as exclusively business can trigger CGT on that proportion when you sell. Use the simplified rate or keep dual-purpose use." },
          ]}
          faqs={[
            { question: "Which is better — flat rate or actual costs?", answer: "Actual costs win for high-cost home offices (heating, broadband, electricity) but require careful apportionment. Flat rate is risk-free and quick." },
            { question: "Can I claim my mortgage interest?", answer: "Only the business-use portion — and only on a buy-to-let / commercial property. On a residential home, use the WFH flat rate or actual utilities only." },
            { question: "What about Class 4 NI savings?", answer: "Class 4 NI is 6% on profits £12,570–£50,270 and 2% above. Each £1 expense saves 20% income tax + 6–8% NI = ~26–28%." },
          ]}
          disclaimer="Estimates only — HMRC sets the final allowable amount. Get a chartered accountant’s view if your trade has unusual costs."
        />
      }
    />
  );
}
