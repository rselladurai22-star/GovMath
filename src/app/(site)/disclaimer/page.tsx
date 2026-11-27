import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "SumAtlas's calculators give estimates for general information only, not financial, tax, legal or benefits advice. Read what our figures can and cannot tell you.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <ContentPage
      title="Disclaimer"
      intro="Please read this before relying on any figure from SumAtlas."
      updated="26 November 2026"
    >
      <h2>General information only</h2>
      <p>
        All calculators, explanations and articles on SumAtlas are provided for
        general informational and educational purposes only. They do{" "}
        <strong>not</strong> constitute financial, tax, legal, accounting,
        benefits or other professional advice of any kind, and should not be
        treated as such.
      </p>

      <h2>Estimates, not official figures</h2>
      <p>
        Our calculators produce <strong>estimates</strong>{" "}based on the published
        UK rates and a set of reasonable assumptions. Your actual entitlement,
        bill or outcome may differ because of factors a general calculator
        cannot capture — including your tax code, your council&apos;s own
        scheme, residency and immigration status, other income, savings,
        deductions, and individual circumstances. The DWP, HMRC, your council or
        your student finance body makes the real decision.
      </p>

      <h2>Not affiliated with the government</h2>
      <p>
        SumAtlas is an independent website. We are <strong>not</strong>{" "}affiliated
        with, endorsed by, or connected to HM Revenue &amp; Customs (HMRC), the
        Department for Work and Pensions (DWP), any council, student finance
        body or any other part of HM Government or the devolved governments.
        Official figures and decisions always come from the relevant authority.
      </p>

      <h2>Always verify before you act</h2>
      <p>
        Before making any financial or legal decision, confirm the figures with
        an official source such as{" "}
        <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer">
          GOV.UK
        </a>
        , or with a suitably qualified adviser (for example a welfare rights or
        Citizens Advice adviser, an accountant, an independent financial adviser
        or a solicitor). Rules and
        rates change, and the right answer depends on your specific situation.
      </p>

      <h2>No liability</h2>
      <p>
        We accept no liability for any loss or damage arising from the use of,
        or reliance on, any calculator, figure or content on this Site. You use
        SumAtlas at your own risk. This does not affect any statutory rights you
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
