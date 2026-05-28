import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import VATCalculator from "./VATCalculator";
import type { VatRateKey } from "@/lib/tax/vat";

export const metadata: Metadata = {
  title: "UK VAT Calculator (Add or Remove VAT, 2025/26)",
  description:
    "Add or remove UK VAT at 20%, 5% or 0% — instantly. Includes a Flat Rate Scheme comparison for freelancers and small businesses.",
};

type SearchParams = Promise<{
  amount?: string;
  direction?: string;
  rate?: string;
}>;

function parseAmount(raw: string | undefined): number {
  if (!raw) return 100;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 100;
  return Math.min(n, 100_000_000);
}

function parseDirection(raw: string | undefined): "add" | "remove" {
  return raw === "remove" ? "remove" : "add";
}

function parseRate(raw: string | undefined): VatRateKey {
  if (raw === "reduced" || raw === "zero") return raw;
  return "standard";
}

export default async function VATPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { amount, direction, rate } = await searchParams;

  return (
    <CalculatorShell
      category="Freelance & Business"
      updatedLabel="Standard rate: 20%"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/business", label: "Freelance & Business" },
        { href: "/business/vat-calculator", label: "VAT Calculator" },
      ]}
      title="UK VAT Calculator"
      intro="Add VAT to a net price, or strip it back out of a gross one — at 20%, 5% or 0%. Includes a Flat Rate Scheme comparison."
      calculator={
        <VATCalculator
          initialAmount={parseAmount(amount)}
          initialDirection={parseDirection(direction)}
          initialRateKey={parseRate(rate)}
        />
      }
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                VAT is calculated as a flat percentage of the{" "}
                <strong>net</strong> (pre-VAT) price. Two operations:
              </p>
              <ul>
                <li>
                  <strong>Adding VAT:</strong> gross = net × (1 + rate). At 20%,
                  £100 net becomes £120 gross.
                </li>
                <li>
                  <strong>Removing VAT:</strong> net = gross ÷ (1 + rate). At
                  20%, £120 gross is £100 net + £20 VAT — <em>not</em>{" "}
                  £120 − 20%, which would wrongly give £96.
                </li>
              </ul>
              <p>
                That second one trips a lot of people up: VAT is added{" "}
                <em>on top of</em> the net, so to reverse it you divide, not
                subtract.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                The UK has three VAT rates, set by HMRC and applied
                consistently across England, Scotland, Wales and Northern
                Ireland:
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Rate</th>
                    <th>%</th>
                    <th>Typical examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard</td>
                    <td>20%</td>
                    <td>
                      Most goods and services — electronics, professional
                      services, alcohol, eating out.
                    </td>
                  </tr>
                  <tr>
                    <td>Reduced</td>
                    <td>5%</td>
                    <td>
                      Domestic gas/electricity, children’s car seats, mobility
                      aids, some property renovations.
                    </td>
                  </tr>
                  <tr>
                    <td>Zero</td>
                    <td>0%</td>
                    <td>
                      Most food, books and newspapers, children’s clothes,
                      public transport, prescriptions.
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                You must register for VAT once your taxable turnover passes{" "}
                <strong>£90,000</strong> in any rolling 12-month period (this
                is the threshold from April 2024 onwards). You can register
                voluntarily below that if you want to reclaim input VAT.
              </p>
              <p>
                The <strong>Flat Rate Scheme (FRS)</strong> is an alternative
                for small businesses with turnover under £150,000. You charge
                customers 20% as normal, but pay HMRC a single industry-specific
                percentage of your gross sales — and generally can’t reclaim
                input VAT.
              </p>
            </>
          }
          pitfalls={[
            {
              title: "Don’t just subtract 20% to remove VAT",
              body: "A £120 inc-VAT price contains £20 of VAT, not £24. The correct formula is divide by 1.20. Subtracting 20% gives you £96, which is £4 off — a small percentage error that compounds across an invoice.",
            },
            {
              title: "Zero-rated is not the same as VAT-exempt",
              body: "Zero-rated supplies still count as taxable — you can reclaim input VAT on related purchases. Exempt supplies (e.g. insurance, education, most financial services) can’t reclaim input VAT and don’t count toward the £90k registration threshold.",
            },
            {
              title: "FRS isn’t always cheaper",
              body: "The Flat Rate Scheme looks simple, but if you have significant business expenses with reclaimable VAT (laptops, software, travel), standard accounting usually beats it. The ‘limited cost trader’ rate of 16.5% wipes out most of the headline saving.",
            },
            {
              title: "The £90k threshold is rolling, not annual",
              body: "HMRC looks at the last 12 months on a rolling basis — not your tax year. Cross £90,000 in any 12-month window and you must register within 30 days, even if your accounting year shows less.",
            },
          ]}
          faqs={[
            {
              question:
                "I’m a sole trader earning £45k. Do I have to register?",
              answer:
                "No — you’re well under the £90k threshold. You can voluntarily register if your customers are VAT-registered businesses (so they can reclaim it) and you have purchases with reclaimable input VAT. Otherwise, staying unregistered keeps your prices 20% cheaper to consumers.",
            },
            {
              question: "What VAT rate applies to food?",
              answer:
                "Most basic food is zero-rated (0%). But ‘luxury’ food and anything consumed on the premises is standard-rated. Hot takeaway food, alcohol, confectionery, crisps, and restaurant meals all attract 20% VAT.",
            },
            {
              question: "Can I reclaim VAT on a laptop I use for work?",
              answer:
                "Yes, if you’re VAT-registered on standard accounting. You can reclaim 100% of the VAT if it’s used entirely for business, or apportion it if there’s personal use. Keep the VAT invoice — HMRC needs it as evidence.",
            },
          ]}
          disclaimer="VAT rules are simple in theory but full of edge cases (partial exemption, place-of-supply rules, reverse charge for EU services). For anything non-trivial, talk to a VAT-qualified accountant."
        />
      }
    />
  );
}
