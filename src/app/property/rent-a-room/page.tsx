import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import RentARoomCalculator from "./RentARoomCalculator";

export const metadata: Metadata = {
  title: "Rent-a-Room Scheme Calculator (UK £7,500 Allowance)",
  description: "Earn up to £7,500/year tax-free from a lodger under HMRC&rsquo;s Rent-a-Room Scheme — see what&rsquo;s taxable.",
};

export default function RentARoomPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="HMRC scheme"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/rent-a-room", label: "Rent-a-Room" }]}
      title="Rent-a-Room Scheme Calculator"
      intro="Take in a lodger and earn up to £7,500 per year tax-free under the HMRC Rent-a-Room Scheme. Above £7,500 you pay tax on the excess at your marginal rate."
      calculator={<RentARoomCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Compare gross rent received to the £7,500 allowance. If under, no tax to declare. If over, the excess is taxable income. Allowance halves to £3,750 if you split with someone else (couple, joint owners).</p>}
          officialRules={
            <ul>
              <li>£7,500/year tax-free (£3,750 if shared).</li>
              <li>Lodger must live in your main residence — not a separate flat or BTL.</li>
              <li>Furnished room only — bare rooms don&rsquo;t count.</li>
              <li>Lodger has &lsquo;excluded occupier&rsquo; status — easy to remove with reasonable notice.</li>
            </ul>
          }
          pitfalls={[
            { title: "Bills included counts as rent", body: "If lodger pays £500/mo &lsquo;all in&rsquo;, the whole £6,000 counts — not just the rent slice." },
            { title: "Capital gains hit if you rent the whole house", body: "Rent-a-Room only works while the property is your main home. Move out and let it, and you lose the allowance plus risk CGT on sale." },
            { title: "Alternative scheme: actual expenses", body: "If rent is below £7,500, just elect into Rent-a-Room. Above, compare: actual rent − actual expenses might beat (rent − £7,500). Calculate both ways." },
          ]}
          faqs={[
            { question: "Do I need to tell anyone?", answer: "Tell your mortgage lender, home insurer and (if leasehold) your freeholder. HMRC only if you go over the allowance." },
            { question: "Does Airbnb count?", answer: "Yes — if the property is your only/main home. Short-term lets count towards the £7,500 too." },
          ]}
          disclaimer="HMRC rules apply. Speak to an accountant for complex cases (joint ownership, partial year)."
        />
      }
    />
  );
}
