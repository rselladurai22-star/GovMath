import { Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Fractions — the guide. Figures from src/lib/life/maths.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "words", title: "The words for the parts" },
  { id: "simplify", title: "Simplifying a fraction" },
  { id: "add", title: "Adding fractions" },
  { id: "subtract", title: "Subtracting fractions" },
  { id: "multiply", title: "Multiplying fractions" },
  { id: "divide", title: "Dividing fractions" },
  { id: "mixed", title: "Mixed numbers" },
  { id: "to-decimal", title: "Fractions to decimals" },
  { id: "to-fraction", title: "Decimals to fractions" },
  { id: "table", title: "Common fractions table" },
  { id: "percent", title: "Fractions and percentages" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "everyday", title: "Fractions in everyday life" },
  { id: "compare", title: "Comparing fractions" },
  { id: "of-amounts", title: "Fractions of amounts" },
  { id: "key-numbers", title: "Key rules" },
];

const SOURCES: Source[] = [
  { label: "Department for Education — National curriculum in England: mathematics programmes of study", href: "https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study" },
];

export default function FractionGuide() {
  return (
    <Guide
      kicker="The fractions guide"
      title="How to work with fractions"
      intro={
        <>
          Fractions follow a handful of rules. Once you know them you can add, subtract, multiply and divide any fractions, and switch between
          fractions, decimals and percentages. Every example here was worked out by the calculator above.
        </>
      }
      meta={["Worked examples", "6 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>To add or subtract, put both fractions over a common denominator first.</li>
          <li>To multiply, multiply the tops and the bottoms.</li>
          <li>To divide, flip the second fraction and multiply.</li>
          <li>Simplify by dividing top and bottom by their greatest common divisor.</li>
        </ul>
        <KeyStats
          items={[
            { value: "5/12", label: "1/4 + 1/6" },
            { value: "7/12", label: "3/4 − 1/6" },
            { value: "1/2", label: "2/3 × 3/4" },
            { value: "1 1/2", label: "3/4 ÷ 1/2" },
          ]}
        />
      </GuideSection>

      <GuideSection id="words" n={2} kicker="Basics" title="The words for the parts">
        <p>
          In 3/4, the 3 on top is the <strong>numerator</strong>{" "}and the 4 underneath is the <strong>denominator</strong>. The denominator says how
          many equal parts the whole is split into; the numerator says how many of those parts you have. A <strong>proper fraction</strong>{" "}is less
          than 1 (3/4). An <strong>improper fraction</strong>{" "}is 1 or more (7/4). A <strong>mixed number</strong>{" "}is a whole number and a proper
          fraction (1 3/4).
        </p>
      </GuideSection>

      <GuideSection id="simplify" n={3} kicker="Rule 1" title="Simplifying a fraction">
        <p>
          A fraction is in its lowest terms when the top and bottom share no factor except 1. Divide both by their greatest common divisor (GCD), found
          with Euclid&rsquo;s method: keep dividing and taking the remainder until it is 0.
        </p>
        <WorkedExample
          title="Simplify 84/126"
          steps={[
            { label: "126 ÷ 84 = 1 remainder 42", value: "" },
            { label: "84 ÷ 42 = 2 remainder 0", value: "GCD 42" },
            { label: "84 ÷ 42 and 126 ÷ 42", value: "2/3" },
          ]}
          total={{ label: "Simplest form", value: "2/3" }}
        />
      </GuideSection>

      <GuideSection id="add" n={4} kicker="Rule 2" title="Adding fractions">
        <WorkedExample
          title="1/4 + 1/6"
          steps={[
            { label: "Lowest common denominator of 4 and 6", value: "12" },
            { label: "1/4 = 3/12 and 1/6 = 2/12", value: "" },
            { label: "3 + 2", value: "5/12" },
          ]}
          total={{ label: "Answer", value: "5/12" }}
        />
        <p>
          The lowest common denominator is the lowest common multiple of the two denominators. Multiplying the denominators together (24 here) also
          works, but leaves more to simplify at the end.
        </p>
      </GuideSection>

      <GuideSection id="subtract" n={5} kicker="Rule 3" title="Subtracting fractions">
        <WorkedExample
          title="3/4 − 1/6"
          steps={[
            { label: "3/4 = 9/12 and 1/6 = 2/12", value: "" },
            { label: "9 − 2", value: "7/12" },
          ]}
          total={{ label: "Answer", value: "7/12" }}
        />
      </GuideSection>

      <GuideSection id="multiply" n={6} kicker="Rule 4" title="Multiplying fractions">
        <WorkedExample
          title="2/3 × 3/4"
          steps={[
            { label: "(2 × 3) / (3 × 4)", value: "6/12" },
            { label: "GCD of 6 and 12 is 6", value: "1/2" },
          ]}
          total={{ label: "Answer", value: "1/2" }}
        />
        <p>No common denominator is needed. &ldquo;Of&rdquo; means multiply: half of three quarters is 1/2 × 3/4 = 3/8.</p>
      </GuideSection>

      <GuideSection id="divide" n={7} kicker="Rule 5" title="Dividing fractions">
        <WorkedExample
          title="3/4 ÷ 1/2"
          steps={[
            { label: "Flip 1/2 to 2/1 and multiply", value: "3/4 × 2/1" },
            { label: "(3 × 2) / (4 × 1)", value: "6/4" },
            { label: "Divide by 2", value: "3/2" },
          ]}
          total={{ label: "Answer", value: "1 1/2" }}
        />
        <p>It makes sense: there are one and a half halves in three quarters.</p>
      </GuideSection>

      <GuideSection id="mixed" n={8} kicker="Rule 6" title="Mixed numbers">
        <p>Turn mixed numbers into improper fractions first: multiply the whole number by the denominator and add the numerator.</p>
        <WorkedExample
          title="1 1/2 + 2 2/3"
          steps={[
            { label: "1 1/2 = 3/2 and 2 2/3 = 8/3", value: "" },
            { label: "Over 6: 9/6 + 16/6", value: "25/6" },
            { label: "25 ÷ 6 = 4 remainder 1", value: "4 1/6" },
          ]}
          total={{ label: "Answer", value: "4 1/6" }}
        />
        <p>Multiplying works the same way: 2 1/4 × 1 1/3 = 9/4 × 4/3 = 36/12 = 3.</p>
      </GuideSection>

      <GuideSection id="to-decimal" n={9} kicker="Converting" title="Fractions to decimals">
        <p>
          Divide the numerator by the denominator. If the simplified denominator has no prime factors other than 2 and 5, the decimal ends (3/8 =
          0.375). Otherwise it repeats for ever: 1/3 = 0.333…, written 0.(3), and 5/12 = 0.41666…, written 0.41(6).
        </p>
      </GuideSection>

      <GuideSection id="to-fraction" n={10} kicker="Converting" title="Decimals to fractions">
        <p>
          Write the decimal over 10, 100 or 1,000 (one zero per decimal place) and simplify. 0.375 = 375/1000 = 3/8, and 0.6 = 6/10 = 3/5. For a
          rounded decimal such as 0.3333, set a largest denominator under More options and the calculator finds the closest simple fraction: 1/3. The
          same method finds 355/113 for 3.14159, a famous approximation of pi.
        </p>
      </GuideSection>

      <GuideSection id="table" n={11} kicker="Table" title="Common fractions table">
        <DataTable
          caption="Fractions as decimals and percentages"
          head={["Fraction", "Decimal", "Percentage"]}
          numeric={[1, 2]}
          rows={[
            ["1/2", "0.5", "50%"],
            ["1/3", "0.(3)", "33.33%"],
            ["2/3", "0.(6)", "66.67%"],
            ["1/4", "0.25", "25%"],
            ["3/4", "0.75", "75%"],
            ["1/5", "0.2", "20%"],
            ["1/6", "0.1(6)", "16.67%"],
            ["1/7", "0.(142857)", "14.29%"],
            ["1/8", "0.125", "12.5%"],
            ["1/9", "0.(1)", "11.11%"],
            ["1/10", "0.1", "10%"],
            ["1/12", "0.08(3)", "8.33%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="percent" n={12} kicker="Converting" title="Fractions and percentages">
        <p>
          A percentage is a fraction out of 100. Multiply the decimal by 100: 3/8 = 0.375 = 37.5%. To go back, put the percentage over 100 and
          simplify: 35% = 35/100 = 7/20. The <a href="/everyday/percentage-calculator">percentage calculator</a>{" "}handles increases, decreases and
          reverse percentages, and the <a href="/everyday/discount-calculator">discount calculator</a>{" "}turns offers like &ldquo;a third off&rdquo; into
          prices.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={13} kicker="Watch out" title="Common mistakes">
        <Callout tone="warn" title="Adding the denominators">
          1/4 + 1/6 is not 2/10. Only the numerators are added, once the denominators match.
        </Callout>
        <ul>
          <li>Flipping the first fraction instead of the second when dividing.</li>
          <li>Forgetting to turn mixed numbers into improper fractions before multiplying.</li>
          <li>Leaving the answer unsimplified, such as 6/12 instead of 1/2.</li>
          <li>Rounding a repeating decimal too early, which builds up error.</li>
        </ul>
      </GuideSection>

      <GuideSection id="everyday" n={14} kicker="Uses" title="Fractions in everyday life">
        <p>
          Recipes (scale 3/4 cup by 1 1/2 for a bigger batch: 1 1/8 cups), measurements in inches, sharing a bill, and splitting time all use
          fractions. A quarter of an hour is 15 minutes; the <a href="/everyday/time-calculator">hours and time calculator</a>{" "}adds up times for you.
          For marks and grades, an average of fractions is easier as decimals: see the <a href="/everyday/average-calculator">average calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={15} kicker="Comparing" title="Comparing fractions">
        <p>
          To see which of two fractions is bigger, cross-multiply: multiply each numerator by the other fraction&rsquo;s denominator. For 3/5 and
          5/8, 3 × 8 = 24 and 5 × 5 = 25, so 5/8 is bigger. The calculator confirms it: 3/5 − 5/8 = −1/40, a small negative number. Turning both into
          decimals (0.6 and 0.625) works too.
        </p>
      </GuideSection>

      <GuideSection id="of-amounts" n={16} kicker="Uses" title="Fractions of amounts">
        <p>
          To find a fraction of an amount, divide by the denominator and multiply by the numerator. 3/8 of 240 is 240 ÷ 8 = 30, then 30 × 3 = 90. In
          the calculator, type 3/8, choose ×, and type 240 as the second number. Dividing first keeps the numbers small, which helps with mental maths.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Summary" title="Key rules">
        <KeyStats
          items={[
            { value: "a/b + c/d", label: "(ad + bc) / bd, then simplify" },
            { value: "a/b × c/d", label: "ac / bd" },
            { value: "a/b ÷ c/d", label: "ad / bc" },
            { value: "÷ GCD", label: "Simplify top and bottom" },
            { value: "w n/d", label: "(w × d + n) / d" },
            { value: "× 100", label: "Decimal to percentage" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
