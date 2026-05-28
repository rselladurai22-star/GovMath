import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import IR35Calculator from "./IR35Calculator";

export const metadata: Metadata = {
  title: "Inside vs Outside IR35 Take-Home (UK 2025/26)",
  description: "Net pay comparison between inside-IR35 (deemed employee) and outside-IR35 (Ltd Co) for UK contractors.",
};

export default function IR35Page() {
  return (
    <CalculatorShell
      category="Tax &amp; Salary"
      updatedLabel="2025/26"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/tax-and-salary", label: "Tax &amp; Salary" }, { href: "/tax-and-salary/ir35-take-home", label: "IR35 Take-Home" }]}
      title="Inside vs Outside IR35 Take-Home"
      intro="If you&rsquo;re a UK contractor through a limited company, IR35 status determines whether you pay tax like an employee (inside) or via salary + dividends (outside)."
      calculator={<IR35Calculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Inside-IR35: fee-payer deducts employer NI 15% first, then PAYE + employee NI on the deemed employment payment. Outside-IR35: £12,570 salary + dividends after 19/25% corporation tax. Dividend tax: 8.75% / 33.75% / 39.35%.</p>}
          officialRules={
            <ul>
              <li>From April 2021, end-clients (medium/large) determine IR35 status.</li>
              <li>Small companies: contractor still determines their own status.</li>
              <li>Use HMRC&rsquo;s CEST tool — though it&rsquo;s widely criticised.</li>
              <li>Mutuality, substitution and control are the key tests.</li>
            </ul>
          }
          pitfalls={[
            { title: "Inside vs &lsquo;deemed employee&rsquo;", body: "Inside IR35 doesn&rsquo;t make you an employee — no holiday, sick or pension auto-enrolment from the client." },
            { title: "Don&rsquo;t forget Apprenticeship Levy and accountancy", body: "Real Ltd Co overhead: ~£1,200/yr accountant, IR35 insurance, dormant year compliance." },
            { title: "Pension contributions through Ltd Co", body: "Employer pension contributions sidestep both corp tax and dividend tax — biggest legal Ltd Co advantage." },
          ]}
          faqs={[
            { question: "Umbrella vs inside-IR35 PSC?", answer: "Net pay is similar; umbrella is admin-simpler but has its own fee + employer NI deducted." },
            { question: "Is outside-IR35 ever worth it on £500/day?", answer: "Yes — typically £8–12k/year better net than inside, before pension benefits." },
          ]}
          disclaimer="Educational. Heavily simplified — get an accountant before changing structure."
        />
      }
    />
  );
}
