import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "How We Check Our Figures",
  description:
    "Where SumAtlas's rates come from, how every calculation is tested against official examples, when figures are rechecked and how to report an error.",
  alternates: { canonical: "/how-we-check" },
};

export default function HowWeCheckPage() {
  return (
    <ContentPage
      title="How we check our figures"
      intro="Every calculator on SumAtlas gives you a figure you might act on, so here is exactly where our numbers come from and how we keep them right."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
      ]}
    >
      <h2>1. Official sources first</h2>
      <p>
        Every rate, threshold, allowance and rule comes from the organisation that sets it: GOV.UK, the Department
        for Work and Pensions, HM Revenue &amp; Customs, Student Finance England, the Student Awards Agency for
        Scotland, Student Finance Wales, the Valuation Office Agency, NS&amp;I, the Office for National Statistics,
        legislation.gov.uk, councils, and the Scottish, Welsh and Northern Ireland governments.
      </p>
      <p>
        Some figures are not gathered in one official place, such as each council&rsquo;s council tax for the year.
        For those we use an established source and name it.
      </p>
      <p>
        Each calculator lists the pages it relies on in a <strong>Sources</strong>{" "}box at the end of its guide. The
        &ldquo;Sources&rdquo; link under every calculator&rsquo;s title takes you straight there. Our articles end
        with a Sources list too.
      </p>

      <h2>2. One set of sums, tested before it goes live</h2>
      <p>
        The rules for each topic are written once, as calculation code, and that code drives the calculator and its
        charts. The figures quoted in the guide and its worked examples are worked out with the same code rather than
        by hand, and worked out again whenever the rates change.
      </p>
      <p>
        The code is checked by hundreds of automated tests before any change is published. Where the government
        publishes worked examples or tables, such as tax bands, benefit rates or student loan amounts, the tests check
        our results against them.
      </p>

      <h2>3. When we recheck</h2>
      <ul>
        <li>
          <strong>Every April</strong>, when the new tax year starts: benefit rates, Child Benefit and childcare
          support, council tax, Income Tax and National Insurance (used for take-home pay) and student loan thresholds.
        </li>
        <li>
          <strong>Every September</strong>: student loan interest rates.
        </li>
        <li>
          <strong>Each academic year</strong>: maintenance loans and grants in England, Scotland and Wales.
        </li>
        <li>
          <strong>When NS&amp;I changes it</strong>: the Premium Bonds prize rate.
        </li>
        <li>
          <strong>Whenever the rules change</strong>: after a Budget, a new law or a change in official guidance.
        </li>
      </ul>
      <p>
        The <strong>Updated</strong>{" "}date under each calculator&rsquo;s title shows when that page last changed.
      </p>

      <h2>4. Clear about what we assume</h2>
      <p>
        No calculator can know everything about your situation. Each one shows what it assumed in a &ldquo;What we
        assumed&rdquo; box, and the less common details sit under &ldquo;More options&rdquo;, so you can see whether
        the answer fits you and change it if not.
      </p>

      <h2>5. How our guides are written</h2>
      <p>
        The SumAtlas team writes and maintains every page. We use software tools, including AI writing assistants, to
        help draft and structure the explanations. Every figure is still worked out with the tested calculation code,
        and the rules are checked against the sources listed on each page before publication.
      </p>

      <h2>6. Independent</h2>
      <p>
        SumAtlas is not part of, or endorsed by, HM Government, HMRC, the DWP, any council or any other
        public body. No bank, lender
        or financial firm pays to appear in our calculators or guides. The site is free to use and is funded by
        advertising, which never affects our figures.
      </p>

      <h2>7. Spotted a mistake?</h2>
      <p>
        Please tell us through the <Link href="/contact">contact page</Link>. Tell us which page, what you entered and
        what you expected. We check every report against the official source, fix confirmed errors as a priority, and
        the page&rsquo;s Updated date changes when the fix goes live.
      </p>
      <p>
        Our calculators give estimates for general information, not financial, tax, legal or benefits advice. See our{" "}
        <Link href="/disclaimer">disclaimer</Link>.
      </p>
    </ContentPage>
  );
}
