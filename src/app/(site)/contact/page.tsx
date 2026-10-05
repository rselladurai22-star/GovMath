import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Contact GovMath",
  description:
    "Get in touch with GovMath — report an error, suggest a calculator, or ask a question. We prioritise corrections.",
  alternates: { canonical: "/contact" },
};

const EMAIL = "hello@govmath.co.uk";

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact us"
      intro="Found an error, want a new calculator, or have a question? We'd love to hear from you."
    >
      <p>
        GovMath is built by a small team, and feedback from people who actually
        use the calculators is the best way we improve. Whether you&apos;ve
        spotted a figure that looks wrong, want a tool we haven&apos;t built
        yet, or just have a question, please get in touch.
      </p>

      <h2>Email us</h2>
      <p>
        The quickest way to reach us is by email:
      </p>
      <p>
        <a href={`mailto:${EMAIL}`} className="text-lg font-semibold">
          {EMAIL}
        </a>
      </p>
      <p>
        We read every message. <strong>Corrections are prioritised</strong> — if
        you tell us a rate or rule looks off, please include the calculator name
        and, if you can, a link to the official source. That helps us verify and
        fix it fast.
      </p>

      <h2>What to include</h2>
      <ul>
        <li>
          <strong>For a correction:</strong> the calculator or article, what
          looks wrong, and the correct figure or source if you have it.
        </li>
        <li>
          <strong>For a request:</strong> the calculation you wish existed and,
          ideally, why it&apos;s useful.
        </li>
        <li>
          <strong>For a general question:</strong> as much detail as you&apos;re
          comfortable sharing.
        </li>
      </ul>

      <h2>A quick note</h2>
      <p>
        We can answer questions about how our calculators work, but we
        can&apos;t give personalised financial, tax or legal advice — please see
        our <Link href="/disclaimer">Disclaimer</Link>. For your own situation,
        always check with an official source or a qualified professional.
      </p>
      <p>
        By contacting us, you agree that we may use the information you send to
        respond to you, as described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </ContentPage>
  );
}
