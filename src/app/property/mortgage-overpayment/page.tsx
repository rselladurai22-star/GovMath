import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import OverpaymentCalculator from "./OverpaymentCalculator";

export const metadata: Metadata = {
  title: "Mortgage Overpayment Calculator (UK)",
  description: "How much time and interest you save by overpaying your mortgage.",
};

export default function OverpaymentPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="Amortisation"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/mortgage-overpayment", label: "Overpayment" }]}
      title="Mortgage Overpayment Calculator"
      intro="Overpaying chips capital off your balance directly — every £1 paid early saves you years of interest. This is one of the highest risk-free returns most UK households can get."
      calculator={<OverpaymentCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>We simulate the original amortisation, then re-simulate with the extra payments applied each month and the lump sum deducted immediately. Interest saved = original total interest − new total interest.</p>}
          officialRules={
            <ul>
              <li>Most fixed-rate UK mortgages allow up to 10% of the outstanding balance per year as a penalty-free overpayment.</li>
              <li>Variable-rate / tracker mortgages usually have no overpayment cap.</li>
              <li>Early Repayment Charges (ERCs) typically range 1–5% on a fixed deal.</li>
            </ul>
          }
          pitfalls={[
            { title: "Tell your lender to reduce the term, not the payment", body: "By default many lenders keep the term and just lower future payments. You save less interest. Always specify ‘reduce term’." },
            { title: "Watch the 10% allowance", body: "Going £1 over can trigger an ERC on the entire overpayment. Track the calendar year." },
            { title: "Compare with savings rates", body: "If your mortgage is 4% and your easy-access savings pay 5% (after tax), saving wins. Overpay only when mortgage rate &gt; net savings rate." },
          ]}
          faqs={[
            { question: "Lump sum or monthly?", answer: "Lump sum saves more interest (capital reduced immediately). Monthly is more disciplined." },
            { question: "Does this affect my LTV?", answer: "Yes — overpaying drops your balance, lowering LTV, which can unlock better rates at remortgage." },
          ]}
          disclaimer="Illustrative. Check your mortgage deal for ERCs before overpaying significantly."
        />
      }
    />
  );
}
