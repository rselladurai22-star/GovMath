import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import StampDutyCalculator from "./StampDutyCalculator";
import type { BuyerType } from "@/lib/tax/sdlt-2025";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator (England & NI, 2025/26)",
  description:
    "Work out the Stamp Duty (SDLT) on your next home in England or Northern Ireland. Standard, first-time buyer and additional-property rates — explained in plain English.",
};

type SearchParams = Promise<{ price?: string; buyer?: string }>;

function parsePrice(raw: string | undefined): number {
  if (!raw) return 295_000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 295_000;
  return Math.min(n, 50_000_000);
}

function parseBuyer(raw: string | undefined): BuyerType {
  if (raw === "first-time" || raw === "additional") return raw;
  return "standard";
}

export default async function StampDutyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { price, buyer } = await searchParams;

  return (
    <CalculatorShell
      category="Mortgages & Property"
      updatedLabel="From 1 April 2025"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/property", label: "Mortgages & Property" },
        {
          href: "/property/stamp-duty-england",
          label: "Stamp Duty (England & NI)",
        },
      ]}
      title="UK Stamp Duty Calculator"
      intro="Enter your purchase price to see exactly how much Stamp Duty Land Tax (SDLT) you’ll pay on a property in England or Northern Ireland."
      calculator={
        <StampDutyCalculator
          initialPrice={parsePrice(price)}
          initialBuyerType={parseBuyer(buyer)}
        />
      }
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Stamp Duty in England and Northern Ireland is a{" "}
                <strong>slab tax</strong> — different slices of the price are
                taxed at different rates. We:
              </p>
              <ol>
                <li>Split your purchase price into the official HMRC bands.</li>
                <li>
                  Apply each band&rsquo;s rate only to the slice of the price
                  that falls inside it.
                </li>
                <li>
                  Add a 5% surcharge to every band if you ticked &ldquo;additional
                  property&rdquo; (second home or buy-to-let).
                </li>
                <li>
                  Use the first-time buyer rates instead if you&rsquo;re buying
                  for £500,000 or less and have never owned a home before.
                </li>
              </ol>
              <p>
                The total at the top is the sum of all the band charges, paid
                to HMRC within 14 days of completion.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                These rates apply to <strong>residential, freehold</strong>{" "}
                purchases completing on or after <strong>1 April 2025</strong>:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Price slice</th>
                    <th>Standard</th>
                    <th>First-time buyer</th>
                    <th>Additional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Up to £125,000</td>
                    <td>0%</td>
                    <td>0% (up to £300k)</td>
                    <td>5%</td>
                  </tr>
                  <tr>
                    <td>£125,001 – £250,000</td>
                    <td>2%</td>
                    <td>0% (up to £300k)</td>
                    <td>7%</td>
                  </tr>
                  <tr>
                    <td>£250,001 – £925,000</td>
                    <td>5%</td>
                    <td>5% (£300k–£500k only)</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>£925,001 – £1.5m</td>
                    <td>10%</td>
                    <td>—</td>
                    <td>15%</td>
                  </tr>
                  <tr>
                    <td>Above £1.5m</td>
                    <td>12%</td>
                    <td>—</td>
                    <td>17%</td>
                  </tr>
                </tbody>
              </table>
              <p>
                First-time buyer relief only applies if{" "}
                <strong>every</strong> buyer is a first-time buyer{" "}
                <strong>and</strong> the price is £500,000 or less. Buy at
                £500,001 and you pay standard rates on the whole purchase.
              </p>
            </>
          }
          pitfalls={[
            {
              title: "First-time buyer relief is all-or-nothing at £500,001",
              body: "Pay £500,000 → you owe £10,000. Pay £500,001 → you owe £15,000.05. A single pound can cost you £5,000. Negotiate accordingly.",
            },
            {
              title: "The 5% surcharge applies even to the nil-rate band",
              body: "Buying an additional property means there is no 0% slice — you pay 5% from the very first pound. A £200,000 second home costs £11,500 in SDLT.",
            },
            {
              title: "\u201CAdditional property\u201D can be a surprise",
              body: "If you keep your old home for any reason — even briefly — the new purchase counts as additional. You can usually reclaim the surcharge if you sell the old home within 36 months.",
            },
            {
              title: "Different country, different tax",
              body: "Scotland charges Land & Buildings Transaction Tax (LBTT) and Wales charges Land Transaction Tax (LTT). Neither uses these bands. This calculator covers England and Northern Ireland only.",
            },
          ]}
          faqs={[
            {
              question: "When do I actually pay Stamp Duty?",
              answer:
                "Your conveyancer files the SDLT return and pays HMRC on your behalf within 14 days of completion. The money is usually transferred from your purchase funds at completion.",
            },
            {
              question:
                "I\u2019ve owned property abroad. Am I a first-time buyer?",
              answer:
                "No. HMRC\u2019s definition is worldwide \u2014 any prior freehold or leasehold ownership, anywhere, disqualifies you from first-time buyer relief.",
            },
            {
              question:
                "Can I claim the surcharge back if I sell my old home later?",
              answer:
                "Yes — if you sell your previous main residence within 36 months of buying the new one, you can reclaim the 5% surcharge from HMRC.",
            },
          ]}
          disclaimer="Figures are estimates based on residential freehold purchases completing on or after 1 April 2025. Always confirm the exact figure with your conveyancer before completion."
        />
      }
    />
  );
}
