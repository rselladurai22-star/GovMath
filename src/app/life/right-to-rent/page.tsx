import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import RightToRentChecker from "./RightToRentChecker";

export const metadata: Metadata = {
  title: "Right to Rent Checker (England)",
  description: "What documents to check, when to recheck, and how to avoid the £20,000 civil penalty.",
};

export default function RightToRentPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025 rules"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/right-to-rent", label: "Right to Rent" },
      ]}
      title="Right to Rent Checker"
      intro="Since 2016 landlords in England must check every adult tenant&rsquo;s immigration status before granting a tenancy. This tells you which check to run."
      calculator={<RightToRentChecker />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>UK/Irish citizens still use physical documents (List A). Everyone else uses the online share-code service at gov.uk/view-right-to-rent. Time-limited visas need a recheck on expiry.</p>
          }
          officialRules={
            <ul>
              <li>Check every adult who&rsquo;ll live in the property as their main home — even sub-tenants.</li>
              <li>Online check generates a PDF you must store for 12 months after the tenancy ends.</li>
              <li>Civil penalty up to £20,000 per breach; criminal prosecution if &quot;knew or had reasonable cause to believe&quot;.</li>
              <li>Doesn&rsquo;t apply to social housing, refuges, hospitals, care homes.</li>
            </ul>
          }
          pitfalls={[
            { title: "Don&rsquo;t discriminate", body: "You must check EVERY tenant, not just &quot;foreign-sounding&quot; ones. Selective checks = unlawful discrimination." },
            { title: "Share code expiry", body: "Share codes expire after 90 days. If the prospective tenant&rsquo;s code has expired, ask them to generate a fresh one." },
            { title: "Refugees & asylum seekers", body: "May have a positive right to rent through Home Office documents. Don&rsquo;t refuse — use the Landlord Checking Service." },
          ]}
          faqs={[
            { question: "Wales, Scotland and NI?", answer: "Right to Rent applies to England only. No equivalent checks in Wales, Scotland or NI." },
            { question: "What if a tenant won&rsquo;t provide docs?", answer: "You can&rsquo;t lawfully grant the tenancy. Don&rsquo;t take a deposit or sign." },
            { question: "Joint tenancies?", answer: "Check each named adult separately. One missing check exposes you to penalties even if others are fine." },
          ]}
          disclaimer="Guidance only — not legal advice. Always follow the Code of Practice on illegal immigrants and private rented accommodation at gov.uk."
        />
      }
    />
  );
}
