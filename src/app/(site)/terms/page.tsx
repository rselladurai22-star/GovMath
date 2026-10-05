import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of GovMath's free UK calculators and content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of Use"
      intro="The simple rules for using GovMath."
      updated="31 May 2026"
    >
      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use of
        GovMath (the &quot;Site&quot;). By using the Site, you agree to these
        Terms. If you do not agree, please do not use the Site.
      </p>

      <h2>Use of the Site</h2>
      <p>
        GovMath provides free calculators and educational content about UK
        government rules. You may use the Site for your own personal,
        non-commercial information. You agree not to:
      </p>
      <ul>
        <li>misuse the Site or interfere with its normal operation;</li>
        <li>
          attempt to gain unauthorised access to our systems or other
          users&apos; data;
        </li>
        <li>
          scrape, copy or republish substantial portions of our content without
          permission;
        </li>
        <li>use the Site for any unlawful purpose.</li>
      </ul>

      <h2>No professional advice</h2>
      <p>
        The calculators and content on GovMath are for general information only
        and are <strong>not</strong> financial, tax, legal or accounting advice.
        Results are estimates and may not reflect your personal circumstances.
        Always confirm figures with the relevant authority (such as HMRC or the
        DWP) or a qualified professional before making decisions. See our full{" "}
        <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work hard to keep rates and rules current, but we cannot guarantee
        that every figure is complete, accurate or up to date at all times.
        Government rules change, and errors can occur. You use the Site at your
        own risk.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, and code of GovMath are owned by us or our
        licensors and are protected by law. The GovMath name and branding may
        not be used without our written permission. You may link to our pages
        freely.
      </p>

      <h2>Third-party links and advertising</h2>
      <p>
        The Site contains links to third-party websites and displays
        third-party advertising. We are not responsible for the content,
        products or practices of third parties. Your dealings with them are
        solely between you and them.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, GovMath and its team will not be
        liable for any loss or damage arising from your use of, or reliance on,
        the Site or its content, including any decisions you make based on a
        calculator result.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site
        after changes means you accept the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Reach us via our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </ContentPage>
  );
}
