import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import LTTCalculator from "./LTTCalculator";

export const metadata: Metadata = {
  title: "LTT Calculator (Wales 2025/26)",
  description: "Welsh Land Transaction Tax — main residential bands and the higher-rate surcharge for additional dwellings.",
};

export default function LTTPage() {
  return (
    <CalculatorShell
      category="Mortgages & Property"
      updatedLabel="April 2025 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Mortgages & Property" }, { href: "/property/ltt-wales", label: "LTT (Wales)" }]}
      title="LTT (Wales) Calculator"
      intro="Land Transaction Tax replaced UK Stamp Duty in Wales in 2018. It has the highest nil-rate threshold in the UK — £225,000 — but no first-time buyer relief."
      calculator={<LTTCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>LTT works band-by-band like LBTT or SDLT. Wales is unique in not offering a first-time buyer rate — but the £225k nil band already covers most starter homes outside Cardiff.</p>}
          officialRules={
            <ul>
              <li>Nil: up to £225,000. 6% to £400k; 7.5% to £750k; 10% to £1.5m; 12% above.</li>
              <li>Higher residential rates apply to second homes/buy-to-let: +5% added to every main band, starting from £1 of price (no nil rate).</li>
              <li>Filed via the WRA within 30 days of completion.</li>
              <li>No first-time buyer relief in Wales.</li>
            </ul>
          }
          pitfalls={[
            { title: "Higher rates start from £1", body: "Unlike LBTT or SDLT, Welsh higher rates don&rsquo;t have a £40k threshold below which surcharge is skipped. Even a £30k second flat triggers LTT." },
            { title: "No first-time buyer break", body: "Welsh policy chose a higher universal nil band instead. If you&rsquo;re a FTB buying above £225k, no extra relief." },
            { title: "Mixed-use bargain has shrunk", body: "Some buyers used to declare residential property &lsquo;mixed-use&rsquo; for lower commercial rates — WRA challenges this aggressively now." },
          ]}
          faqs={[
            { question: "Can I claim a refund if I sell my old home later?", answer: "Yes — if you replace your main residence within 3 years, you can reclaim the higher-rate element." },
            { question: "Does LTT apply to commercial purchases?", answer: "Yes, but different bands. This calculator is residential only." },
          ]}
          disclaimer="Residential freehold purchases only."
        />
      }
    />
  );
}
