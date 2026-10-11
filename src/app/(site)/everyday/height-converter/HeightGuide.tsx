import { Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";
import { heightTable } from "@/lib/life/body";

/** Height conversion — the guide. Figures from src/lib/life/body.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "units", title: "Feet, inches, centimetres and metres" },
  { id: "ft-to-cm", title: "Feet and inches to centimetres" },
  { id: "cm-to-ft", title: "Centimetres to feet and inches" },
  { id: "table", title: "Height table, 4′10″ to 6′8″" },
  { id: "cm-table", title: "Common heights in centimetres" },
  { id: "inches-only", title: "Height in inches only" },
  { id: "decimal", title: "Decimal feet and rounding" },
  { id: "measuring", title: "Measuring your height accurately" },
  { id: "uses", title: "Where you need your height" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Weights and Measures Act 1985, Schedule 1 (legislation.gov.uk)", href: "https://www.legislation.gov.uk/ukpga/1985/72/schedule/1" },
  { label: "NIST — Unit conversion (US definitions)", href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
  { label: "NHS — BMI healthy weight calculator", href: "https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults" },
];

const ROWS = heightTable(58, 80);

export default function HeightGuide() {
  return (
    <Guide
      kicker="The height conversion guide"
      title="Converting feet and inches to centimetres"
      intro={
        <>
          Most people in the UK and US know their height in feet and inches, while doctors, forms and most of the world use centimetres or metres.
          This short guide explains how the units fit together, how to convert by hand and how to measure yourself accurately.
        </>
      }
      meta={["Exact legal definitions", "5 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            One inch is exactly <strong>2.54 cm</strong>.
          </li>
          <li>
            One foot is 12 inches, or exactly <strong>30.48 cm</strong>.
          </li>
          <li>To convert feet and inches to cm: total inches × 2.54.</li>
          <li>To convert cm to inches: divide by 2.54, then split into feet (12 inches each) and inches.</li>
        </ul>
        <KeyStats
          items={[
            { value: "2.54 cm", label: "One inch" },
            { value: "30.48 cm", label: "One foot" },
            { value: "182.88 cm", label: "Six feet" },
            { value: "100 cm", label: "One metre" },
          ]}
        />
      </GuideSection>

      <GuideSection id="units" n={2} kicker="Background" title="Feet, inches, centimetres and metres">
        <p>
          The inch and foot are imperial units. Since 1959, the UK, US and other English-speaking countries have defined the inch as exactly 2.54 cm,
          and UK law sets this out in the Weights and Measures Act 1985. There are 12 inches in a foot and 100 centimetres in a metre.
        </p>
        <p>
          Heights are often written with primes: 5′7″ means 5 feet 7 inches. On a keyboard people type 5&apos;7&quot; instead, which means the same.
        </p>
      </GuideSection>

      <GuideSection id="ft-to-cm" n={3} kicker="By hand" title="Feet and inches to centimetres">
        <WorkedExample
          title="5 feet 7 inches"
          steps={[
            { label: "Feet to inches", note: "5 × 12", value: "60 in" },
            { label: "Add the extra inches", note: "60 + 7", value: "67 in" },
            { label: "Inches to centimetres", note: "67 × 2.54", value: "170.18 cm" },
          ]}
          total={{ label: "5 ft 7 in", value: "170.18 cm (1.70 m)" }}
        />
      </GuideSection>

      <GuideSection id="cm-to-ft" n={4} kicker="The other way" title="Centimetres to feet and inches">
        <WorkedExample
          title="180 centimetres"
          steps={[
            { label: "Centimetres to inches", note: "180 ÷ 2.54", value: "70.9 in" },
            { label: "Whole feet", note: "70.9 ÷ 12 = 5.9", value: "5 ft" },
            { label: "Inches left over", note: "70.9 − 60", value: "10.9 in" },
          ]}
          total={{ label: "180 cm", value: "5 ft 10.9 in" }}
        />
        <p>
          A quick mental check: 30 cm is about a foot, so 150 cm is about 5 feet. More exactly, 5 ft is 152.4 cm, and 6 ft is 182.88 cm.
        </p>
      </GuideSection>

      <GuideSection id="table" n={5} kicker="Look it up" title="Height table, 4′10″ to 6′8″">
        <DataTable
          caption="Feet and inches in centimetres and metres"
          head={["Feet and inches", "Inches", "Centimetres", "Metres"]}
          rows={ROWS.map((r) => [r.label, String(r.inches), r.cm.toFixed(1), r.m.toFixed(2)])}
          numeric={[1, 2, 3]}
        />
      </GuideSection>

      <GuideSection id="cm-table" n={6} kicker="The other way" title="Common heights in centimetres">
        <DataTable
          caption="Centimetres in feet and inches (to one decimal place)"
          head={["Centimetres", "Feet and inches", "Inches"]}
          rows={[
            ["150 cm", "4 ft 11.1 in", "59.1"],
            ["160 cm", "5 ft 3 in", "63.0"],
            ["165 cm", "5 ft 5 in", "65.0"],
            ["170 cm", "5 ft 6.9 in", "66.9"],
            ["175 cm", "5 ft 8.9 in", "68.9"],
            ["180 cm", "5 ft 10.9 in", "70.9"],
            ["185 cm", "6 ft 0.8 in", "72.8"],
            ["190 cm", "6 ft 2.8 in", "74.8"],
            ["200 cm", "6 ft 6.7 in", "78.7"],
          ]}
          numeric={[2]}
        />
      </GuideSection>

      <GuideSection id="inches-only" n={7} kicker="One number" title="Height in inches only">
        <p>
          Some US forms, clothing size charts and medical formulas ask for height in inches alone. Multiply the feet by 12 and add the inches: 5 ft 7
          in is 67 inches and 6 ft is 72 inches. Choose Inches only in the calculator to convert a total in inches to centimetres and feet.
        </p>
      </GuideSection>

      <GuideSection id="decimal" n={8} kicker="Watch out" title="Decimal feet and rounding">
        <p>
          Inches are twelfths of a foot, not tenths. 5.5 feet is 5 ft 6 in, not 5 ft 5 in. When the calculator rounds and the inches reach 12, it
          carries them into the next foot, so you see 6 ft 0 in rather than 5 ft 12 in.
        </p>
        <Callout title="Choose your precision">
          Under More options, pick 0, 1 or 2 decimal places. One decimal place is plenty for a person&rsquo;s height, as a measurement is rarely
          more accurate than half a centimetre.
        </Callout>
      </GuideSection>

      <GuideSection id="measuring" n={9} kicker="Get it right" title="Measuring your height accurately">
        <ul>
          <li>Take off your shoes and stand with your back and heels against a wall.</li>
          <li>Look straight ahead with your head level.</li>
          <li>Rest a flat object, such as a hardback book, on the top of your head and mark the wall under it.</li>
          <li>Measure from the floor to the mark with a steel tape.</li>
        </ul>
        <p>You are slightly taller in the morning than in the evening, as the discs in your spine are squeezed a little during the day. Measure at the same time of day if you want to compare.</p>
      </GuideSection>

      <GuideSection id="uses" n={10} kicker="Next steps" title="Where you need your height">
        <p>
          Height is used to work out body mass index, so our <a href="/everyday/bmi-calculator">BMI calculator</a>{" "}accepts both units. It also
          goes into the <a href="/everyday/calorie-calculator">calorie calculator</a>{" "}and the{" "}
          <a href="/everyday/body-fat-calculator">body fat calculator</a>. For weight, use the{" "}
          <a href="/everyday/weight-converter">stone to kg converter</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={11} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "2.54 cm", label: "One inch, exactly" },
            { value: "30.48 cm", label: "One foot, exactly" },
            { value: "12 in", label: "One foot" },
            { value: "0.3937 in", label: "One centimetre" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
