import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PaymentOnAccountCalculator from "./PaymentOnAccountCalculator";

export const metadata: Metadata = {
  title: "Payment on Account Calculator (Self Assessment, UK)",
  description: "Predict your January and July advance payments to HMRC under Self Assessment.",
};

export default function PaymentOnAccountPage() {
  return (
    <CalculatorShell
      category="Business"
      updatedLabel="Self Assessment"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/business", label: "Business" }, { href: "/business/payment-on-account", label: "Payment on Account" }]}
      title="Payment on Account Calculator"
      intro="HMRC charges Self Assessment in three goes: the balancing payment for last year, plus two equal advance ‘payments on account’ for this year. The January bill is famously double-sized."
      calculator={<PaymentOnAccountCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>POA = last year’s tax bill ÷ 2, due 31 January and 31 July. The 31 January cash demand = balancing payment + first POA — often 1.5–2× what self-employed people expect.</p>}
          officialRules={
            <ul>
              <li>Exempt if last bill &lt; £1,000.</li>
              <li>Exempt if 80%+ of your tax came from PAYE or deductions at source.</li>
              <li>Reduce POAs if you expect lower income this year (form SA303 or online).</li>
              <li>Interest charged at base rate + 2.5pp on underpaid POAs.</li>
            </ul>
          }
          pitfalls={[
            { title: "First-year shock", body: "Year 1 self-employed: 31 Jan you pay last year’s tax + first POA for current year. Save 60% of profits aside, not 30%." },
            { title: "Reducing too aggressively", body: "If you underestimate and reduce POAs, HMRC charges interest on the shortfall once final return is filed." },
            { title: "Class 2 NI excluded", body: "POAs cover Income Tax + Class 4 NI only. Class 2 is one annual sum." },
          ]}
          faqs={[
            { question: "When should I reduce POAs?", answer: "If you have hard evidence of lower profits — maternity leave, redundancy, business closure. Otherwise leave alone." },
            { question: "Can I pay early?", answer: "Yes — HMRC credits the account. Saves interest if you’ll be late on another deadline." },
          ]}
          disclaimer="Educational. Verify exact dates and amounts in your HMRC online account."
        />
      }
    />
  );
}
