import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Averages — the guide. Figures from src/lib/life/maths.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "mean", title: "The mean" },
  { id: "median", title: "The median" },
  { id: "mode", title: "The mode" },
  { id: "range", title: "The range" },
  { id: "which", title: "Which average to use" },
  { id: "outliers", title: "Outliers and skewed data" },
  { id: "weighted", title: "The weighted mean" },
  { id: "geometric", title: "The geometric mean" },
  { id: "sd", title: "Standard deviation" },
  { id: "sample", title: "Sample or population?" },
  { id: "entering", title: "Entering your numbers" },
  { id: "spreadsheet", title: "Averages in a spreadsheet" },
  { id: "averages-of-averages", title: "Averaging averages" },
  { id: "missing", title: "Zeros, blanks and missing values" },
  { id: "key-numbers", title: "Key formulas" },
];

const SOURCES: Source[] = [
  { label: "NIST/SEMATECH e-Handbook of Statistical Methods — Measures of location", href: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm" },
  { label: "NIST/SEMATECH e-Handbook of Statistical Methods — Measures of scale", href: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm" },
  { label: "Office for National Statistics — Average household income", href: "https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth" },
];

export default function AverageGuide() {
  return (
    <Guide
      kicker="The averages guide"
      title="How to work out an average"
      intro={
        <>
          &ldquo;Average&rdquo; can mean the mean, the median or the mode, and they can give very different answers for the same numbers. This guide
          explains each one, when to use it, and how to measure how spread out your numbers are.
        </>
      }
      meta={["Worked examples", "7 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>For the ten numbers 3, 7, 7, 2, 9, 12, 5, 7, 4 and 10:</p>
        <KeyStats
          items={[
            { value: "6.6", label: "Mean" },
            { value: "7", label: "Median" },
            { value: "7", label: "Mode (appears 3 times)" },
            { value: "10", label: "Range (2 to 12)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="mean" n={2} kicker="Average 1" title="The mean">
        <WorkedExample
          title="Mean of the ten numbers"
          steps={[
            { label: "3 + 7 + 7 + 2 + 9 + 12 + 5 + 7 + 4 + 10", value: "66" },
            { label: "66 ÷ 10", value: "6.6" },
          ]}
          total={{ label: "Mean", value: "6.6" }}
        />
        <p>The mean is what most people mean by &ldquo;the average&rdquo;. It uses every number, which is its strength and its weakness.</p>
      </GuideSection>

      <GuideSection id="median" n={3} kicker="Average 2" title="The median">
        <p>
          Sort the numbers: 2, 3, 4, 5, 7, 7, 7, 9, 10, 12. With ten numbers, the middle falls between the 5th and 6th, which are both 7, so the median
          is 7. With an odd count, the median is simply the middle number.
        </p>
      </GuideSection>

      <GuideSection id="mode" n={4} kicker="Average 3" title="The mode">
        <p>
          The mode is the most common value. Here 7 appears three times. A list where two values tie has two modes; a list where nothing repeats has no
          mode. The mode is the only average that works for categories, such as the most popular colour.
        </p>
      </GuideSection>

      <GuideSection id="range" n={5} kicker="Spread" title="The range">
        <p>
          The range is the highest number minus the lowest: 12 − 2 = 10. It is quick but depends on just two numbers, so one unusual value changes it
          completely.
        </p>
      </GuideSection>

      <GuideSection id="which" n={6} kicker="Choosing" title="Which average to use">
        <CompareCards
          columns={[
            { name: "Mean", rows: [{ label: "Best for", value: "Even data, totals, scores" }, { label: "Weakness", value: "Pulled by extremes" }] },
            { name: "Median", rows: [{ label: "Best for", value: "Pay, house prices, skewed data" }, { label: "Weakness", value: "Ignores how far out values are" }] },
            { name: "Mode", rows: [{ label: "Best for", value: "Categories, sizes" }, { label: "Weakness", value: "May not exist or be unique" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="outliers" n={7} kicker="Watch out" title="Outliers and skewed data">
        <p>Six salaries: 24,000, 26,000, 27,000, 29,000, 31,000 and 250,000.</p>
        <DataTable
          caption="One high salary moves the mean, not the median"
          head={["Measure", "Value"]}
          numeric={[1]}
          rows={[
            ["Mean", "64,500"],
            ["Median", "28,000"],
            ["Geometric mean", "about 39,480"],
          ]}
        />
        <p>
          Five of the six people earn far less than the mean. This is why the Office for National Statistics reports median household income alongside
          the mean.
        </p>
      </GuideSection>

      <GuideSection id="weighted" n={8} kicker="Average 4" title="The weighted mean">
        <WorkedExample
          title="Exam marks 65, 72 and 58, counting 30%, 50% and 20%"
          steps={[
            { label: "65 × 30 + 72 × 50 + 58 × 20", value: "6,710" },
            { label: "÷ (30 + 50 + 20)", value: "÷ 100" },
          ]}
          total={{ label: "Weighted mean", value: "67.1" }}
        />
        <p>
          Grade point averages are weighted means too, with course credits as the weights: see the <a href="/everyday/gpa-calculator">GPA and grade calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="geometric" n={9} kicker="Average 5" title="The geometric mean">
        <p>
          For growth rates, multiply rather than add. An investment that grows 10%, falls 5% and grows 8% has growth factors 1.10, 0.95 and 1.08. Their
          geometric mean is about 1.0412, so the steady yearly rate that gives the same result is about 4.1%, not the simple average of about 4.33%. The{" "}
          <a href="/uk/investing/compound-interest">compound interest calculator</a>{" "}uses the same idea. The geometric mean needs every number to be
          above zero.
        </p>
      </GuideSection>

      <GuideSection id="sd" n={10} kicker="Spread" title="Standard deviation">
        <p>Standard deviation measures how far numbers typically sit from the mean. Two lists with the same mean of 50:</p>
        <DataTable
          caption="Same mean, different spread"
          head={["Numbers", "Mean", "Population SD", "Sample SD"]}
          numeric={[1, 2, 3]}
          rows={[
            ["48, 49, 50, 51, 52", "50", "1.41", "1.58"],
            ["30, 40, 50, 60, 70", "50", "14.14", "15.81"],
          ]}
        />
        <p>
          To work it out: take each number&rsquo;s distance from the mean, square it, add the squares, divide by n (or n − 1), and take the square root.
          For the ten numbers at the top, the sample standard deviation is about 3.17.
        </p>
      </GuideSection>

      <GuideSection id="sample" n={11} kicker="Choosing" title="Sample or population?">
        <p>
          If your numbers are the whole group you care about, such as every score in one class, use the population figure (divide by n). If they are a
          sample used to estimate a bigger group, such as a survey, use the sample figure (divide by n − 1). The sample figure is a little larger,
          which corrects for a sample usually looking less spread out than the whole group.
        </p>
      </GuideSection>

      <GuideSection id="entering" n={12} kicker="Using the calculator" title="Entering your numbers">
        <Callout title="Commas separate numbers">
          The calculator reads commas, spaces, semicolons, tabs and new lines as separators. Type 1200, not 1,200, or it will read 1 and 200. Text and
          symbols are skipped and listed in a warning.
        </Callout>
      </GuideSection>

      <GuideSection id="spreadsheet" n={13} kicker="Tools" title="Averages in a spreadsheet">
        <p>
          In Excel or Google Sheets: =AVERAGE(A1:A10) for the mean, =MEDIAN(), =MODE.MULT() for every mode, =STDEV.S() for the sample standard
          deviation, =STDEV.P() for the population one, =GEOMEAN() and =SUMPRODUCT(A1:A3,B1:B3)/SUM(B1:B3) for a weighted mean. For percentages of a
          total, the <a href="/everyday/percentage-calculator">percentage calculator</a>{" "}shows the working.
        </p>
      </GuideSection>

      <GuideSection id="averages-of-averages" n={14} kicker="Watch out" title="Averaging averages">
        <p>
          You cannot simply average two averages if the groups are different sizes. A class of 20 with a mean mark of 70 and a class of 30 with a mean
          of 60 do not average 65 together. Weight each mean by its class size: (70 × 20 + 60 × 30) ÷ 50 = 64. Enter 70 and 60 as the numbers and 20
          and 30 as the weights to check it. Marks given as <a href="/everyday/fraction-calculator">fractions</a>{" "}can be turned into decimals first.
        </p>
      </GuideSection>

      <GuideSection id="missing" n={15} kicker="Data" title="Zeros, blanks and missing values">
        <p>
          A blank is not the same as a zero. If a pupil missed a test, leaving the mark out gives the average of the tests taken; entering 0 pulls the
          mean down as if they scored nothing. Decide which you mean before you paste your data. The calculator skips blanks and words such as
          &ldquo;absent&rdquo;, and tells you what it left out.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key formulas">
        <KeyStats
          items={[
            { value: "Σx ÷ n", label: "Mean" },
            { value: "Middle value", label: "Median (sorted)" },
            { value: "Most common", label: "Mode" },
            { value: "max − min", label: "Range" },
            { value: "Σwx ÷ Σw", label: "Weighted mean" },
            { value: "ⁿ√(x₁ × … × xₙ)", label: "Geometric mean" },
            { value: "√(Σ(x − mean)² ÷ (n − 1))", label: "Sample SD" },
            { value: "√(Σ(x − mean)² ÷ n)", label: "Population SD" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
