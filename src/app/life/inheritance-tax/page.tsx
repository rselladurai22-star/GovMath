import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import IHTCalculator from "./IHTCalculator";

export const metadata: Metadata = {
  title: "Inheritance Tax Calculator UK 2025/26",
  description:
    "Estimate UK Inheritance Tax — Nil-Rate Band, Residence NRB, spousal transfer and the £2m taper.",
};

export default function IHTPage() {
  return (
    <CalculatorShell
      category="Life Events"
      updatedLabel="2025/26 thresholds"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Life Events" },
        { href: "/life/inheritance-tax", label: "Inheritance Tax" },
      ]}
      title="Inheritance Tax Calculator"
      intro="UK Inheritance Tax is 40% on estate value above the £325,000 Nil-Rate Band — plus up to £175,000 more if you leave the family home to descendants, plus up to a full double of both if inheriting from a spouse."
      calculator={<IHTCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>The formula in plain English:</p>
              <ol>
                <li>
                  Everyone gets a <strong>Nil-Rate Band</strong> of £325,000
                  — the first £325k of your estate pays £0 IHT.
                </li>
                <li>
                  If you leave the family home to children (or
                  grandchildren), you get an extra <strong>£175,000
                  Residence NRB</strong> on top.
                </li>
                <li>
                  If you’re a widow(er) and your spouse used none of
                  their allowances, you inherit theirs too — up to £1m
                  combined.
                </li>
                <li>40% is paid on everything above the total allowances.</li>
              </ol>
              <p>
                NB: the RNRB tapers when the estate exceeds £2m — losing £1
                of RNRB per £2 of excess. It’s fully gone at £2.35m
                (single) or £2.7m (combined).
              </p>
            </>
          }
          officialRules={
            <>
              <p>Key statutory points (Inheritance Tax Act 1984 as amended):</p>
              <ul>
                <li>
                  Nil-Rate Band frozen at £325,000 until at least April 2030.
                </li>
                <li>
                  Residence NRB frozen at £175,000 to April 2030, taper
                  threshold £2,000,000.
                </li>
                <li>
                  Standard rate 40%, reduced to <strong>36%</strong> if 10%+
                  of net estate is left to qualifying charities.
                </li>
                <li>
                  Spousal exemption: unlimited transfers between UK-domiciled
                  spouses/civil partners.
                </li>
                <li>
                  <strong>7-year gift rule</strong>: lifetime gifts become
                  exempt after 7 years; if you die within 7 years they fall
                  back into the estate, with taper relief on tax (not the
                  gift itself) after year 3.
                </li>
                <li>
                  Reliefs not modelled: Business Property Relief,
                  Agricultural Property Relief, gifts out of normal
                  expenditure.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The £2m taper is a cliff for property-rich estates",
              body: "A £2.5m estate (very common in London/SE) loses the entire £175k RNRB — that’s £70,000 of extra IHT just from crossing the threshold. Lifetime gifts to bring the estate under £2m at death can recover the RNRB.",
            },
            {
              title: "RNRB only applies to direct descendants",
              body: "Children, stepchildren, adopted, fostered and grandchildren count. Nieces, nephews, siblings, friends do not. Leaving the home to anyone else loses the RNRB completely.",
            },
            {
              title: "Joint accounts and pensions complicate things",
              body: "Jointly-held assets typically pass outside the estate by survivorship. Most pensions sit outside IHT — though from April 2027 most defined-contribution pots will be brought inside the IHT net. Big change coming.",
            },
            {
              title: "Gifts within 7 years still count",
              body: "Gave £200k to your kids 5 years before dying? It comes back into the estate, eats your NRB first, and taper relief only reduces the IHT rate on tax — not the gift value.",
            },
          ]}
          faqs={[
            {
              question: "Who pays the IHT bill?",
              answer:
                "Normally the executor pays IHT from estate funds before distributing the inheritance. For gifts within 7 years, the recipient may be liable if the estate can’t cover it.",
            },
            {
              question: "When is IHT due?",
              answer:
                "Six months from the end of the month of death. Probate is usually blocked until IHT400 is filed and (often) paid. Property IHT can be paid in 10 annual instalments.",
            },
            {
              question: "Does my pension count?",
              answer:
                "Currently, most defined-contribution pensions sit outside the estate for IHT. From 6 April 2027 the government plans to bring them inside. Defined-benefit lump sums vary by scheme.",
            },
          ]}
          disclaimer="Estimate only. Excludes BPR/APR reliefs, 7-year gift rules, trusts, charitable rate reduction, and non-domicile rules. Take professional advice for any real estate plan."
        />
      }
    />
  );
}
