import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "About SumAtlas: Independent UK Calculators",
  description:
    "SumAtlas is an independent site of free UK calculators for benefits, family support, renting, council tax and student finance. Who we are and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About SumAtlas"
      intro="We turn confusing benefit, family, renting and student finance rules into clear, free answers anyone can understand."
    >
      <p>
        SumAtlas is an independent UK reference site for benefits, family,
        renting and student money. Our mission is simple: take the rules that
        decide what you can claim and what you pay — Universal Credit, housing
        support, Child Benefit and childcare, maternity pay, Pension Credit,
        council tax, rent and deposits, and student finance in England,
        Scotland and Wales — and translate them into calculators and
        explanations that make sense the first time you read them.
      </p>
      <p>
        Government guidance is often technically correct but practically
        useless. It is written for civil servants and accountants, not for the
        person trying to work out whether extra hours are worth it, whether a
        rent rise is allowed, or what they can actually claim. We exist to close
        that gap.
      </p>
      <p>
        Until October 2026 we were called GovMath, a UK site at govmath.co.uk.
        Our calculators now live at <Link href="/uk">sumatlas.com/uk</Link>,
        and old govmath.co.uk links to them take you straight to the same page
        here. In November 2026 we narrowed the site to the topics our readers
        use most: benefits and family support, renting and council tax, and
        student finance.
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
          <strong>The official rules in simple English</strong> — what the law
          or the official guidance actually says, from the DWP, HMRC, your
          council or your student finance body.
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
          <strong>Privacy-first.</strong> Calculations run in your browser, and
          the figures you type are not sent to us or saved. They only leave your
          browser if you copy a link to your results. See our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </li>
        <li>
          <strong>Plain English.</strong> If a sentence needs a glossary, we
          rewrite the sentence.
        </li>
        <li>
          <strong>Kept current.</strong> Our figures track the latest published
          rates — currently the <strong>2026/27</strong> benefit, tax and
          student finance year.
        </li>
      </ul>

      <h2>How we keep figures accurate</h2>
      <p>
        Our rates and thresholds come from primary sources: GOV.UK, the
        Department for Work and Pensions (DWP), HM Revenue &amp; Customs
        (HMRC), Student Finance England, the Student Awards Agency for Scotland,
        Student Finance Wales, councils, and the devolved administrations in
        Scotland, Wales and Northern Ireland. Where a figure is not published in
        one official place, such as each council&apos;s council tax, we use an
        established source and name it. When a rate changes, we update the
        calculator and note the year it applies to.
      </p>
      <p>
        That said, SumAtlas provides estimates for general information. We are
        not a substitute for professional advice — read our{" "}
        <Link href="/disclaimer">Disclaimer</Link> for the full picture.
      </p>

      <h2>Our editorial standards</h2>
      <ul>
        <li>
          <strong>Official sources first.</strong>{" "}We take rates, thresholds and
          rules from the bodies that set them wherever we can, such as GOV.UK,
          the DWP, HMRC, Student Finance England, SAAS, Student Finance Wales or
          the Valuation Office Agency, and name any other
          source we use. Each calculator&apos;s guide and each article lists its
          sources at the end.
        </li>
        <li>
          <strong>One set of sums.</strong> The figures in our guides and worked
          examples are worked out with the same tested calculation code as the
          calculators, and worked out again whenever the rates change.
        </li>
        <li>
          <strong>Tested.</strong> The calculation code is checked by hundreds
          of automated tests against official examples and published tables
          before any change goes live.
        </li>
        <li>
          <strong>Checked and dated.</strong>{" "}Each calculator shows when its
          page last changed. We recheck benefit and tax figures each April when
          the new year&apos;s rates start, student finance figures when each
          academic year&apos;s amounts are published, and all of them whenever
          the rules change.
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
        SumAtlas is an independent website, written and maintained by the
        SumAtlas team. Every calculator and guide is checked by the team against
        the official sources it lists before it is published.
      </p>
      <p>
        We are not affiliated with HMRC, the DWP, any council or any part of HM
        Government or the devolved governments, and no bank, lender
        or financial firm pays to appear on the site. SumAtlas is free to use
        and funded by advertising, which never affects our figures.
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
