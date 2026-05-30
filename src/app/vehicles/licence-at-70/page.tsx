import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import LicenceAt70Calculator from "./LicenceAt70Calculator";

export const metadata: Metadata = {
  title: "Driving Licence at 70 (UK)",
  description: "Work out when you must renew your UK driving licence — at 70 and every 3 years after.",
};

export default function LicenceAt70Page() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="DVLA rules"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles" },
        { href: "/vehicles/licence-at-70", label: "Driving Licence at 70" },
      ]}
      title="Driving Licence at 70"
      intro="At 70, your UK driving licence expires and must be renewed — then every 3 years thereafter. Renewal is free, but you must self-declare any medical conditions."
      calculator={<LicenceAt70Calculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>Enter your date of birth. We work out your age and the next renewal milestone: 70 first, then every 3 years (73, 76, 79…) on the anniversary of your birth.</p>
          }
          officialRules={
            <ul>
              <li>First renewal at age 70 — DVLA writes to you 90 days before.</li>
              <li>Renew online at gov.uk/renew-driving-licence-at-70 — usually arrives in a week.</li>
              <li>Subsequent renewals every 3 years.</li>
              <li>You must declare conditions: diabetes on insulin, heart conditions, epilepsy, glaucoma, dementia, sleep apnoea, etc.</li>
            </ul>
          }
          pitfalls={[
            { title: "Driving on an expired licence", body: "Up to £1,000 fine and your insurance is void. Don&rsquo;t put off the post." },
            { title: "Not declaring medical conditions", body: "Fines up to £1,000 and prosecution if you have an accident. Always declare — most conditions are still compatible with driving." },
            { title: "Photo card vs paper counterpart", body: "The paper counterpart was abolished in 2015 — you don&rsquo;t need it. The photocard is the licence." },
          ]}
          faqs={[
            { question: "Does it cost anything?", answer: "Renewal at 70+ is free. The standard 10-year renewal under 70 costs £14 online." },
            { question: "Can I renew online?", answer: "Yes — fastest route is gov.uk/renew-driving-licence-at-70 with your passport for ID." },
            { question: "Do I need a medical?", answer: "No automatic medical, but you must self-declare any condition affecting your driving." },
          ]}
          disclaimer="DVLA rules summary only. Apply at gov.uk and always disclose medical conditions honestly."
        />
      }
    />
  );
}
