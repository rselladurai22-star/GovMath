import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "About SumAtlas: Independent UK Calculators",
  description:
    "SumAtlas is an independent site of free UK calculators for tax, benefits, property and pensions. Who we are, how we work and how we are funded.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About SumAtlas"
      intro="We turn the UK's most confusing government rules into clear, free answers anyone can understand."
    >
      <p>
        SumAtlas is an independent UK reference site. Our mission is simple: take
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
      <p>
        Until October 2026 we were called GovMath, at govmath.co.uk. We changed
        our name as we grow beyond the UK: the UK calculators now live at{" "}
        <Link href="/uk">sumatlas.com/uk</Link>, and old govmath.co.uk links
        take you straight to the same page here.
      </p>

      <h2>What we do</h2>
      <p>
        Every SumAtlas tool follows the same promise. You get a fast, accurate
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
          rates — currently the <strong>2026/27 tax year</strong>.
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
        That said, SumAtlas provides estimates for general information. We are not
        a substitute for professional advice — read our{" "}
        <Link href="/disclaimer">Disclaimer</Link> for the full picture.
      </p>

      <h2>Our editorial standards</h2>
      <ul>
        <li>
          <strong>Official sources first.</strong> Every rate, threshold and
          rule comes from a primary source, such as GOV.UK, HMRC, the DWP,
          Student Finance England, the Valuation Office Agency or the Scottish,
          Welsh and Northern Ireland governments. Each guide lists its sources
          at the end.
        </li>
        <li>
          <strong>One set of sums.</strong> The figures in our guides and worked
          examples are produced by the same calculation code as the calculators,
          not typed in by hand, so the guide and the calculator always agree.
        </li>
        <li>
          <strong>Tested.</strong> The calculation code is checked by hundreds
          of automated tests against official examples and published tables
          before any change goes live.
        </li>
        <li>
          <strong>Checked and dated.</strong> Each calculator shows when its
          page last changed. We recheck figures each April when the new tax year
          starts, and whenever the government announces a change.
        </li>
        <li>
          <strong>Clear about limits.</strong>{" "}Each calculator says what it
          assumes under &quot;What we assumed&quot;, so you can see whether the
          answer fits your situation.
        </li>
      </ul>

      <p>
        Read the full details in{" "}
        <Link href="/how-we-check">how we check our figures</Link>.
      </p>

      <h2>Who runs SumAtlas</h2>
      <p>
        SumAtlas is an independent UK website, written and maintained by the
        SumAtlas team. Every calculator and guide is checked by the team against
        the official sources it lists before it is published.
      </p>
      <p>
        We are not affiliated with HMRC, the DWP, or any part of HM Government,
        and no bank, lender or financial firm pays to appear on the site. SumAtlas
        is free to use and funded by advertising, which never affects our
        figures.
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
