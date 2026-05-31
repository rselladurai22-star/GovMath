import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "About GovMath",
  description:
    "GovMath turns confusing UK government rules — tax, benefits, property, pensions — into free, plain-English calculators. Learn who we are and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About GovMath"
      intro="We turn the UK's most confusing government rules into clear, free answers anyone can understand."
    >
      <p>
        GovMath is an independent UK reference site. Our mission is simple: take
        the rules that govern your money — Income Tax, National Insurance, Stamp
        Duty, Universal Credit, student loans, pensions and dozens more — and
        translate them into calculators and explanations that make sense the
        first time you read them.
      </p>
      <p>
        Government guidance is often technically correct but practically
        useless. It is written for civil servants and accountants, not for the
        person trying to work out whether a pay rise is worth it, how much Stamp
        Duty they owe, or what they can actually claim. We exist to close that
        gap.
      </p>

      <h2>What we do</h2>
      <p>
        Every GovMath tool follows the same promise. You get a fast, accurate
        calculator at the top of the page, and underneath it a plain-English
        explainer that covers three things:
      </p>
      <ul>
        <li>
          <strong>How we calculated your result</strong> — the maths, step by
          step, with no hidden assumptions.
        </li>
        <li>
          <strong>The official UK rules in simple English</strong> — what the
          law or HMRC/DWP guidance actually says.
        </li>
        <li>
          <strong>Common pitfalls</strong> — the traps and edge cases that catch
          people out, so you can avoid them.
        </li>
      </ul>

      <h2>Our principles</h2>
      <ul>
        <li>
          <strong>Free, forever.</strong> No paywalls, no sign-ups, no email
          harvesting. We keep the lights on with unobtrusive advertising.
        </li>
        <li>
          <strong>Privacy-first.</strong> Calculations run in your browser. We
          do not store the figures you type in. See our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </li>
        <li>
          <strong>Plain English.</strong> If a sentence needs a glossary, we
          rewrite the sentence.
        </li>
        <li>
          <strong>Kept current.</strong> Our figures track the latest published
          rates — currently the <strong>2025/26 tax year</strong>.
        </li>
      </ul>

      <h2>How we keep figures accurate</h2>
      <p>
        Our rates and thresholds come from primary sources: GOV.UK, HM Revenue
        &amp; Customs (HMRC), the Department for Work and Pensions (DWP), the
        Driver and Vehicle Licensing Agency (DVLA) and the devolved
        administrations in Scotland and Wales. When the government updates a
        rate, we update the calculator and note the tax year it applies to.
      </p>
      <p>
        That said, GovMath provides estimates for general information. We are not
        a substitute for professional advice — read our{" "}
        <Link href="/disclaimer">Disclaimer</Link> for the full picture.
      </p>

      <h2>Who we are</h2>
      <p>
        GovMath is built and maintained by a small UK-based team of developers
        and writers who were tired of re-reading the same dense guidance pages
        every tax year. We are not affiliated with HMRC, the DWP, or any part of
        HM Government.
      </p>

      <h2>Get in touch</h2>
      <p>
        Spotted an error, or want a calculator we haven&apos;t built yet? We
        genuinely want to hear it — head to our{" "}
        <Link href="/contact">contact page</Link>. Corrections are prioritised.
      </p>
    </ContentPage>
  );
}
