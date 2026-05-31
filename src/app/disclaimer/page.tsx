import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "GovMath provides estimates for general information only — not financial, tax or legal advice. Read the full disclaimer.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <ContentPage
      title="Disclaimer"
      intro="Please read this before relying on any figure from GovMath."
      updated="31 May 2026"
    >
      <h2>General information only</h2>
      <p>
        All calculators, explanations and articles on GovMath are provided for
        general informational and educational purposes only. They do{" "}
        <strong>not</strong> constitute financial, tax, legal, accounting or
        professional advice of any kind, and should not be treated as such.
      </p>

      <h2>Estimates, not official figures</h2>
      <p>
        Our calculators produce <strong>estimates</strong> based on published UK
        rates and a set of reasonable assumptions. Your actual liability,
        entitlement or outcome may differ because of factors a general
        calculator cannot capture — including your tax code, residency status,
        other income, deductions, reliefs, and individual circumstances.
      </p>

      <h2>Not affiliated with the government</h2>
      <p>
        GovMath is an independent website. We are <strong>not</strong> affiliated
        with, endorsed by, or connected to HM Revenue &amp; Customs (HMRC), the
        Department for Work and Pensions (DWP), the DVLA, or any other part of HM
        Government. Official figures and decisions always come from the relevant
        authority.
      </p>

      <h2>Always verify before you act</h2>
      <p>
        Before making any financial or legal decision, confirm the figures with
        an official source such as{" "}
        <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer">
          GOV.UK
        </a>{" "}
        or a suitably qualified professional (for example an accountant,
        independent financial adviser or solicitor). Rules and rates change, and
        the right answer depends on your specific situation.
      </p>

      <h2>No liability</h2>
      <p>
        We accept no liability for any loss or damage arising from the use of,
        or reliance on, any calculator, figure or content on this Site. You use
        GovMath at your own risk. This does not affect any statutory rights you
        may have.
      </p>

      <h2>External links</h2>
      <p>
        Where we link to third-party websites, we do so for convenience. We are
        not responsible for their content or accuracy.
      </p>

      <p>
        This disclaimer should be read alongside our{" "}
        <Link href="/terms">Terms of Use</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </ContentPage>
  );
}
