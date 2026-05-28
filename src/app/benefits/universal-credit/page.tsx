import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import UCCalculator from "./UCCalculator";

export const metadata: Metadata = {
  title: "Universal Credit Estimator (2025/26)",
  description:
    "Estimate your monthly Universal Credit award. Includes the standard allowance, child element, housing, the 55% earnings taper and the capital tariff.",
};

export default function UCPage() {
  return (
    <CalculatorShell
      category="Family & Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Family & Benefits" },
        { href: "/benefits/universal-credit", label: "Universal Credit Estimator" },
      ]}
      title="Universal Credit Estimator"
      intro="Estimate your monthly Universal Credit award using April 2025 rates. We add up your standard allowance, child and housing elements, then apply the 55p earnings taper and the £6k–£16k capital tariff."
      calculator={<UCCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Universal Credit is paid <strong>monthly in arrears</strong>{" "}
                and calculated as:
              </p>
              <p>
                <code>
                  Award = (Standard allowance + Child + Housing) − (Earnings
                  above the work allowance × 55%) − Capital tariff
                </code>
              </p>
              <p>
                The <strong>standard allowance</strong> depends only on your
                age and whether you claim as a single person or a couple.
                Adding a partner does <em>not</em> double it — it&apos;s a
                joint household figure.
              </p>
              <p>
                The <strong>child element</strong> is currently subject to the
                two-child limit: only the first two children attract a
                payment, with narrow exceptions (multiple births,
                non-consensual conception, adoption, kinship care). Children
                born before 6 April 2017 get the older, higher first-child rate
                of £339.00/month.
              </p>
              <p>
                The <strong>housing element</strong> covers your rent up to
                your <strong>Local Housing Allowance</strong> (LHA) rate —
                the LHA is published per region and per bedroom-entitlement,
                so a single person in a four-bed house only gets the one-bed
                LHA. Mortgage interest isn&apos;t covered through UC; the
                separate SMI loan covers that.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                The numbers in this estimator are the gov.uk 2025/26 rates,
                effective from April 2025:
              </p>
              <ul>
                <li>
                  <strong>Standard allowance (monthly):</strong> single under
                  25 £316.98; single 25+ £400.14; couple both under 25
                  £497.55; couple either 25+ £628.10.
                </li>
                <li>
                  <strong>Child element (monthly):</strong> £339.00 for the
                  eldest child born before 6 April 2017; £292.81 otherwise and
                  for any additional eligible child.
                </li>
                <li>
                  <strong>Work allowance (monthly):</strong> £411 if you
                  receive a housing element; £684 if you don&apos;t. You only
                  get a work allowance if you&apos;re responsible for a child{" "}
                  <em>or</em> you have limited capability for work.
                </li>
                <li>
                  <strong>Taper:</strong> 55p of UC is withdrawn for every £1
                  of net earnings above your work allowance.
                </li>
                <li>
                  <strong>Capital:</strong> first £6,000 ignored; £4.35/month
                  tariff per £250 (or part of £250) above that; £16,000+ ends
                  entitlement entirely.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The two-child limit catches a lot of larger families",
              body: "If you have three or more children and the third was born on or after 6 April 2017, you get no child element for them — unless you qualify for a specific exception. That can be £290+/month you might assume you&rsquo;ll get and won&rsquo;t.",
            },
            {
              title: "Savings of £16,000+ end your claim immediately",
              body: "Capital includes ISAs, premium bonds, second properties, and most investments — but excludes pension pots if you're under State Pension age. One inheritance can stop a long-running claim overnight.",
            },
            {
              title: "Earnings count when paid, not when earned",
              body: "UC is calculated on a one-month rolling 'assessment period.' If you happen to be paid two months&rsquo; wages inside one assessment period (common with weekly pay or shifted paydays), your award can drop to zero that month and reset the next.",
            },
            {
              title: "The work allowance only applies to some claimants",
              body: "You get a work allowance only if you have dependent children or are assessed as having limited capability for work. Working-age adults without either taper from £0 — meaning the first £1 you earn already reduces your UC by 55p.",
            },
          ]}
          faqs={[
            {
              question: "Will overtime or a bonus stop my Universal Credit?",
              answer:
                "One-off spikes get caught by the assessment period and can wipe out that month&rsquo;s award entirely. UC re-starts automatically the next month once your earnings drop back, so you don&rsquo;t need to re-apply, but DWP will pay nothing in the spike month.",
            },
            {
              question: "Does pension contribution reduce my UC earnings?",
              answer:
                "Yes — UC uses your earnings net of tax, NI and pension contributions. Salary-sacrificing into a workplace pension can both increase your UC award and reduce your income tax at the same time.",
            },
            {
              question: "What's the difference between UC and Pension Credit?",
              answer:
                "Universal Credit is for working-age claimants. Once you reach State Pension age (and your partner too, if you have one), you move onto Pension Credit instead — different rates, no work-allowance concept, and different capital rules.",
            },
          ]}
          disclaimer="This is an estimate based on the gov.uk 2025/26 published rates. DWP&rsquo;s actual calculation may differ — particularly for LCWRA, carer&rsquo;s element, sanctions, transitional protection from legacy benefits, and the various two-child-limit exceptions. Always claim on gov.uk for a binding figure."
        />
      }
    />
  );
}
