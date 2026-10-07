import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "How We Check Our Figures",
  description:
    "Where GovMath's rates come from, how every calculation is tested against official examples, when figures are rechecked and how to report an error.",
  alternates: { canonical: "/how-we-check" },
};

export default function HowWeCheckPage() {
  return (
    <ContentPage
      title="How we check our figures"
      intro="Every calculator on GovMath gives you a figure you might act on, so here is exactly where our numbers come from and how we keep them right."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
      ]}
    >
      <h2>1. Official sources first</h2>
      <p>
        Every rate, threshold, allowance and rule comes from the organisation that sets it: GOV.UK, HM Revenue &amp;
        Customs, the Department for Work and Pensions, the DVLA, Student Finance England, the Valuation Office Agency,
        the Bank of England, the Office for National Statistics, legislation.gov.uk, and the Scottish, Welsh and
        Northern Ireland governments.
      </p>
      <p>
        A few figures are not published by any official body, such as average pump prices. For those we use an
        established independent source, such as the RAC, and name it.
      </p>
      <p>
        Each calculator lists the pages it relies on in a <strong>Sources</strong>{" "}box at the end of its guide. The
        &ldquo;Sources&rdquo; link under every calculator&rsquo;s title takes you straight there.
      </p>

      <h2>2. One set of sums, tested before it goes live</h2>
      <p>
        The rules for each topic are written once, as calculation code, and that code drives everything on the page:
        the calculator, the charts, and every figure quoted in the guide and its worked examples. Figures in the guides
        are produced by the code, not typed in by hand, so the guide and the calculator cannot disagree.
      </p>
      <p>
        The code is checked by hundreds of automated tests before any change is published. Where the government
        publishes worked examples or tables, such as tax bands, benefit rates or student loan amounts, the tests check
        our results against them.
      </p>

      <h2>3. When we recheck</h2>
      <ul>
        <li>
          <strong>Every April</strong>, when the new tax year starts: Income Tax, National Insurance, benefit rates,
          student loan thresholds, car tax and company car rates.
        </li>
        <li>
          <strong>Every September</strong>: student loan interest rates.
        </li>
        <li>
          <strong>Every quarter</strong>: the energy price cap and HMRC&rsquo;s advisory fuel rates; fuel prices more
          often.
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
        The GovMath team writes and maintains every page. We use software tools, including AI writing assistants, to
        help draft and structure the explanations. Every figure still comes from the tested calculation code, and the
        rules are checked against the official sources listed on each page before publication.
      </p>

      <h2>6. Independent</h2>
      <p>
        GovMath is not part of, or endorsed by, HM Government, HMRC, the DWP or any other public body. No bank, lender
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
        Our calculators give estimates for general information, not financial, tax or legal advice. See our{" "}
        <Link href="/disclaimer">disclaimer</Link>.
      </p>
    </ContentPage>
  );
}
