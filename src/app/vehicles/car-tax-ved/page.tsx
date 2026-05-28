import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import VEDCalculator from "./VEDCalculator";

export const metadata: Metadata = {
  title: "Car Tax (VED) Calculator UK 2025/26",
  description:
    "UK Vehicle Excise Duty by CO2 band and fuel type, plus the expensive-car supplement and EV changes from April 2025.",
};

export default function VEDPage() {
  return (
    <CalculatorShell
      category="Vehicles & Transport"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles & Transport" },
        { href: "/vehicles/car-tax-ved", label: "Car Tax (VED) Calculator" },
      ]}
      title="Car Tax (VED) Calculator"
      intro="Vehicle Excise Duty in the UK has two phases — a CO₂-banded &lsquo;showroom rate&rsquo; in year one, then a flat £195/year (with a £425 surcharge for cars over £40k for 5 years)."
      calculator={<VEDCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>VED for cars first registered on or after 1 April 2017:</p>
              <ul>
                <li>
                  <strong>Year 1</strong>: based on CO₂ emissions from the
                  type approval certificate (on your V5C). Bands range from
                  £10 (≤0g) up to £5,490 (255g+).
                </li>
                <li>
                  <strong>Years 2 onwards</strong>: flat standard rate of
                  £195/year for petrol/diesel; £185 for alternative fuel; £195
                  for EVs (from April 2025).
                </li>
                <li>
                  <strong>Expensive car supplement</strong>: extra £425/year
                  for years 2–6 if the list price (with options) was over
                  £40,000.
                </li>
              </ul>
            </>
          }
          officialRules={
            <>
              <p>Key changes effective from April 2025:</p>
              <ul>
                <li>
                  EVs <strong>no longer pay £0 VED</strong>. New EVs pay £10
                  first year then £195 standard. Existing EVs (registered
                  pre-April 2025) move to £195 standard.
                </li>
                <li>
                  The <strong>expensive-car supplement now applies to EVs</strong>{" "}
                  too — a £45,000 EV will cost £620/year (£195 + £425) for
                  years 2–6.
                </li>
                <li>
                  Cars registered between 2001 and March 2017 use the
                  older CO₂-band system with annual rates from £20 to £760
                  (out of scope here).
                </li>
                <li>
                  Cars registered before March 2001 use engine size: £220 if
                  &gt;1549cc, £140 if not.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The £40k threshold catches even mid-range trims",
              body: "A Tesla Model 3 Long Range, BMW iX1, or VW ID.4 in mid-trim with options easily lands over £40k — adding £2,125 over 5 years on top of standard VED. Even &ldquo;practical&rdquo; family cars regularly cross the line.",
            },
            {
              title: "The list price is what you'd have paid new, not what you paid",
              body: "Buying second-hand doesn&rsquo;t escape the expensive-car supplement. If the car was over £40k when new, you pay it for years 2–6 from first registration — even if you got a bargain.",
            },
            {
              title: "EV VED change caught a lot of buyers off-guard",
              body: "Before April 2025, EVs paid £0. From April 2025, they pay normal VED — and the expensive-car supplement. A £50k EV costs ~£3,510 in VED over years 1–6, vs £0 for the same model registered a year earlier.",
            },
            {
              title: "Not paying = automatic fine + clamp",
              body: "VED is enforced by ANPR cameras and DVLA databases. No tax discs anymore. Late payment triggers a £80 penalty (halved if paid within 28 days); ignoring it leads to clamping or a £1,000+ court fine.",
            },
          ]}
          faqs={[
            {
              question: "What about SORN?",
              answer:
                "If you take the car off the road, file a Statutory Off Road Notification (SORN) to legally stop paying VED. Reinstate when you put it back on the road. We have a separate SORN calculator coming.",
            },
            {
              question: "Can I pay monthly?",
              answer:
                "Yes — but Direct Debit pays a 5% surcharge for monthly/6-monthly. Annual single payment is cheapest.",
            },
            {
              question: "What if I sell mid-year?",
              answer:
                "You get a refund of unused full months. The new owner must tax the car immediately — VED is no longer transferred between owners.",
            },
          ]}
          disclaimer="Covers cars registered from April 2017. Older cars use legacy bands not modelled here."
        />
      }
    />
  );
}
