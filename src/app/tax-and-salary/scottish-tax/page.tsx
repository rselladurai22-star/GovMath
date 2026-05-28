import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import ScottishCalculator from "./ScottishCalculator";

export const metadata: Metadata = {
  title: "Scottish Income Tax Calculator (2025/26)",
  description:
    "Calculate your Scottish Income Tax across all six bands — starter, basic, intermediate, higher, advanced and top — plus the difference vs the rest of the UK.",
};

export default function ScottishPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="Scotland 2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        { href: "/tax-and-salary/scottish-tax", label: "Scottish Income Tax Calculator" },
      ]}
      title="Scottish Income Tax Calculator"
      intro="Scotland has its own Income Tax rates set by Holyrood — six bands ranging from 19% to 48%. We work out what you owe and how it compares to the rest of the UK."
      calculator={<ScottishCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Scottish Income Tax is set by the Scottish Government and
                applies to non-savings, non-dividend income (i.e. salary,
                self-employment, pensions, rent). Other income types still
                use UK-wide rates.
              </p>
              <p>
                The Personal Allowance (£12,570) is reserved to Westminster
                and remains the same. We taper it £1-per-£2 above £100k just
                like rUK.
              </p>
              <p>Bands measured above the Personal Allowance:</p>
              <ul>
                <li>Starter rate: 19% on the next £2,827</li>
                <li>Basic rate: 20% on the next £11,485</li>
                <li>Intermediate rate: 21% on the next £18,232</li>
                <li>Higher rate: 42% on the next £43,632 (up to £125,140)</li>
                <li>Advanced rate: 45% on the next £49,338</li>
                <li>Top rate: 48% above £125,140</li>
              </ul>
            </>
          }
          officialRules={
            <>
              <p>
                You pay Scottish Income Tax if HMRC has flagged your tax
                code with an &quot;S&quot; prefix (e.g.{" "}
                <code>S1257L</code>) based on your address being in
                Scotland.
              </p>
              <p>
                Key features that diverge from rUK:
              </p>
              <ul>
                <li>
                  <strong>Higher rate starts earlier</strong> (£43,662 vs
                  £50,270 in rUK) and is 42% instead of 40%.
                </li>
                <li>
                  <strong>NI is UK-wide</strong> — Scotland doesn&apos;t
                  control it. The crunch zone where 42% IT + 8% NI both
                  apply is between £43,662 and £50,270, giving a 50% marginal
                  rate over £6,608 of earnings.
                </li>
                <li>
                  <strong>Lower-earner relief</strong>: the 19% starter rate
                  means low earners pay slightly less than in rUK.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The 50%+ marginal rate at £43,662–£50,270",
              body: "In this band, Scottish IT is 42% and UK-wide NI is still 8% — a 50% marginal rate. Pension contributions are unusually valuable in this band.",
            },
            {
              title: "Tax code 'S' prefix matters",
              body: "If you've moved to or from Scotland mid-year, check that HMRC has updated your tax code. The wrong prefix can leave you under- or over-taxed for months.",
            },
            {
              title: "Dividends and savings still use UK rates",
              body: "Scottish rates only apply to earned income. £20k in dividend income is taxed at UK dividend rates regardless of where you live. This matters for company directors choosing salary vs dividend.",
            },
            {
              title: "Higher rate kicks in earlier than south of the border",
              body: "A £50,000 earner in Scotland pays roughly £1,500 more Income Tax per year than in the rest of the UK — entirely because the 42% band starts at £43,662 vs £50,270.",
            },
          ]}
          faqs={[
            {
              question: "Do I pay Scottish or rUK tax if I work in England but live in Scotland?",
              answer:
                "Where you live decides — not where you work. HMRC determines your tax residency from your main home address. Cross-border commuters and remote workers from Scotland use Scottish rates.",
            },
            {
              question: "What about pension contributions?",
              answer:
                "Tax relief is given at your marginal rate, including the higher Scottish rates. A £100 contribution from net salary costs a 42%-band Scottish taxpayer only £58 net — better than the £60 in rUK.",
            },
            {
              question: "Can I avoid Scottish tax by saying I live elsewhere?",
              answer:
                "No. HMRC requires you to declare your main residence honestly and can investigate. Even if you have a property in England, if Scotland is your principal home, you pay Scottish rates.",
            },
          ]}
          disclaimer="This calculator covers Scottish Income Tax only. National Insurance, dividend tax and savings tax use UK-wide rates."
        />
      }
    />
  );
}
