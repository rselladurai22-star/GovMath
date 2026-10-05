import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GovMath handles data, cookies and advertising. We don't store the figures you enter — calculations run in your browser.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      intro="What we collect, what we don't, and the choices you have."
      updated="31 May 2026"
    >
      <p>
        This Privacy Policy explains how GovMath (&quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;) collects, uses and protects information
        when you use this website. By using GovMath, you agree to the practices
        described here.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>
          <strong>We do not require accounts.</strong> You can use every
          calculator without signing up or giving us your name or email.
        </li>
        <li>
          <strong>We do not store your calculator inputs.</strong> The numbers
          you type (salary, property price, benefit amounts, etc.) are processed
          in your browser and are never sent to or saved on our servers.
        </li>
        <li>
          <strong>We use cookies for analytics and advertising</strong> to keep
          the site free, as described below. You can control these.
        </li>
      </ul>

      <h2>Information we collect</h2>
      <h3>Information you provide</h3>
      <p>
        If you email us via our <Link href="/contact">contact page</Link>, we
        receive the information you choose to send (such as your email address
        and message) so we can reply. We use it only for that purpose.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        Like most websites, we and our service providers automatically collect
        limited technical data when you visit, such as your approximate location
        (country/region), device and browser type, referring page, and the pages
        you view. This is used to understand traffic and improve the site.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        Cookies are small text files stored on your device. We use them to
        measure traffic and to serve advertising. You can block or delete
        cookies in your browser settings, though some features may not work as
        well.
      </p>

      <h2>Advertising and Google AdSense</h2>
      <p>
        We display advertising to keep GovMath free. We intend to use
        third-party advertising partners, including{" "}
        <strong>Google AdSense</strong>. These partners may use cookies and
        similar technologies to serve ads based on your prior visits to this and
        other websites.
      </p>
      <ul>
        <li>
          Google, as a third-party vendor, uses cookies to serve ads on this
          site.
        </li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners
          to serve ads to you based on your visit to GovMath and/or other sites
          on the internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . You can also opt out of third-party vendor cookies at{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info/choices
          </a>
          .
        </li>
      </ul>
      <p>
        For more on how Google uses data from sites that use its services, see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s partner-sites policy
        </a>
        .
      </p>

      <h2>Analytics</h2>
      <p>
        We use privacy-conscious analytics (including Vercel Analytics and Speed
        Insights) to understand aggregate usage and performance. These tools
        report trends, not individuals, and do not require us to identify you.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To operate, maintain and improve GovMath.</li>
        <li>To understand which calculators and articles are useful.</li>
        <li>To display and measure advertising.</li>
        <li>To respond to messages you send us.</li>
        <li>To detect, prevent and address technical issues or abuse.</li>
      </ul>

      <h2>Your rights (UK GDPR)</h2>
      <p>
        If you are in the UK or EU, you have rights over your personal data,
        including the right to access, correct, or delete it, and to object to or
        restrict certain processing. Because we do not hold accounts or store
        your calculator inputs, the personal data we hold is minimal. To make a
        request, contact us using the details on our{" "}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>Children</h2>
      <p>
        GovMath is intended for a general adult audience and is not directed at
        children under 13. We do not knowingly collect personal data from
        children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the &quot;last updated&quot; date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Please reach out via our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </ContentPage>
  );
}
