import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SornCalculator from "./SornCalculator";

export const metadata: Metadata = {
  title: "SORN Declaration — VED Refund Calculator",
  description: "See how much VED refund you’ll get when you take your vehicle off the road with a SORN.",
};

export default function SornPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="DVLA rules"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles" },
        { href: "/vehicles/sorn-declaration", label: "SORN Declaration" },
      ]}
      title="SORN Declaration"
      intro="A SORN takes your vehicle legally off the road — you stop paying VED and the unused months are refunded. The vehicle must be kept on private property and can’t be driven."
      calculator={<SornCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>We divide your annual VED by 12 to get a monthly rate, then multiply by full months remaining. DVLA rounds part-months down — only complete unused months refund.</p>
          }
          officialRules={
            <ul>
              <li>Declare a SORN at gov.uk/make-a-sorn — free and instant.</li>
              <li>Refund cheque arrives in 6 weeks, sent to the registered keeper.</li>
              <li>Direct debits cancel automatically.</li>
              <li>Vehicle must be on private land (driveway, garage) — never the public road.</li>
              <li>Re-tax it before driving — even to an MOT (with proof of pre-booked test you can drive directly there).</li>
            </ul>
          }
          pitfalls={[
            { title: "Insurance still required?", body: "Continuous Insurance Enforcement doesn’t apply to SORNed vehicles — so you can drop insurance. But check for fire/theft coverage if it’s in a garage." },
            { title: "Driving while SORN", body: "£2,500 fine and possible prosecution. The car is seen by ANPR every time it leaves the drive." },
            { title: "Selling a SORNed car", body: "The SORN doesn’t transfer. The new owner must tax it before driving away." },
          ]}
          faqs={[
            { question: "Can I refund a part-month?", answer: "No — DVLA only refunds full unused months from when the SORN takes effect." },
            { question: "Do I need an MOT while SORN?", answer: "No, but you’ll need a current MOT to re-tax it when you want to drive again." },
            { question: "Can the council ticket a SORNed car on the road?", answer: "Yes — and DVLA will reverse the SORN and fine you." },
          ]}
          disclaimer="Indicative refund only. Actual refund depends on the exact date DVLA processes your SORN."
        />
      }
    />
  );
}
