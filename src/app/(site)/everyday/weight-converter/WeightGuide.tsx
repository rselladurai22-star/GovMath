import { Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Weight conversion — the guide. Figures from src/lib/life/body.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "units", title: "Stones, pounds and kilograms" },
  { id: "st-to-kg", title: "Stones to kilograms" },
  { id: "kg-to-st", title: "Kilograms to stones" },
  { id: "table", title: "Stone to kg table" },
  { id: "decimal", title: "Decimal stones versus stones and pounds" },
  { id: "babies", title: "Baby weights in pounds and ounces" },
  { id: "luggage", title: "Luggage allowances" },
  { id: "health", title: "Weight and health" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Weights and Measures Act 1985, Schedule 1 (legislation.gov.uk)", href: "https://www.legislation.gov.uk/ukpga/1985/72/schedule/1" },
  { label: "NIST — Units outside the SI (US definitions)", href: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
  { label: "NHS — Your baby's weight and height", href: "https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-height-and-weight/" },
];

export default function WeightGuide() {
  return (
    <Guide
      kicker="The weight conversion guide"
      title="Converting stones, pounds and kilograms"
      intro={
        <>
          The UK weighs people in stones and pounds, most of the world in kilograms, and the US in pounds. This short guide shows how the units fit
          together, how to convert by hand, and where each one turns up.
        </>
      }
      meta={["Exact legal definitions", "5 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            One pound is exactly <strong>0.45359237 kg</strong>.
          </li>
          <li>
            One stone is <strong>14 pounds</strong>, or 6.35 kg.
          </li>
          <li>One kilogram is about 2.2 pounds.</li>
          <li>One pound is 16 ounces.</li>
        </ul>
        <KeyStats
          items={[
            { value: "6.35 kg", label: "One stone" },
            { value: "2.2046 lb", label: "One kilogram" },
            { value: "14 lb", label: "One stone" },
            { value: "16 oz", label: "One pound" },
          ]}
        />
      </GuideSection>

      <GuideSection id="units" n={2} kicker="Background" title="Stones, pounds and kilograms">
        <p>
          The kilogram is the metric unit used by science, medicine and nearly every country. The pound is an imperial unit still used for body
          weight in the UK and US. Since 1959, the UK, US and other English-speaking countries have defined the pound as exactly 0.45359237 kg, and
          UK law sets this out in the Weights and Measures Act 1985.
        </p>
        <p>
          The stone, 14 pounds, is used almost only in the UK and Ireland, and almost only for body weight. Americans give their weight in pounds
          alone: a person who is 11 stone in the UK is 154 lb in the US.
        </p>
      </GuideSection>

      <GuideSection id="st-to-kg" n={3} kicker="By hand" title="Stones to kilograms">
        <WorkedExample
          title="11 stone 4 pounds"
          steps={[
            { label: "Stones to pounds", note: "11 × 14", value: "154 lb" },
            { label: "Add the extra pounds", note: "154 + 4", value: "158 lb" },
            { label: "Pounds to kilograms", note: "158 × 0.45359237", value: "71.67 kg" },
          ]}
          total={{ label: "11 st 4 lb", value: "71.67 kg" }}
        />
      </GuideSection>

      <GuideSection id="kg-to-st" n={4} kicker="The other way" title="Kilograms to stones">
        <WorkedExample
          title="70 kilograms"
          steps={[
            { label: "Kilograms to pounds", note: "70 ÷ 0.45359237", value: "154.3 lb" },
            { label: "Whole stones", note: "154.3 ÷ 14 = 11.02", value: "11 st" },
            { label: "Pounds left over", note: "154.3 − 11 × 14", value: "0.3 lb" },
          ]}
          total={{ label: "70 kg", value: "11 st 0.3 lb" }}
        />
        <p>
          A quick mental check: a stone is a little over 6 kg, so divide kilograms by about 6.35. 100 kg is 15 st 10.5 lb, just under 16 stone.
        </p>
      </GuideSection>

      <GuideSection id="table" n={5} kicker="Look it up" title="Stone to kg table">
        <DataTable
          caption="Whole stones in kilograms and pounds (the calculator has half stones too)"
          head={["Stones", "Kilograms", "Pounds"]}
          rows={[
            ["7 st", "44.5", "98"],
            ["8 st", "50.8", "112"],
            ["9 st", "57.2", "126"],
            ["10 st", "63.5", "140"],
            ["11 st", "69.9", "154"],
            ["12 st", "76.2", "168"],
            ["13 st", "82.6", "182"],
            ["14 st", "88.9", "196"],
            ["15 st", "95.3", "210"],
            ["16 st", "101.6", "224"],
            ["17 st", "108.0", "238"],
            ["18 st", "114.3", "252"],
            ["19 st", "120.7", "266"],
            ["20 st", "127.0", "280"],
            ["21 st", "133.4", "294"],
            ["22 st", "139.7", "308"],
            ["23 st", "146.1", "322"],
            ["24 st", "152.4", "336"],
            ["25 st", "158.8", "350"],
          ]}
          numeric={[1, 2]}
        />
        <DataTable
          caption="Common kilogram weights in stones and pounds"
          head={["Kilograms", "Stones and pounds", "Pounds"]}
          rows={[
            ["50 kg", "7 st 12.2 lb", "110.2"],
            ["60 kg", "9 st 6.3 lb", "132.3"],
            ["70 kg", "11 st 0.3 lb", "154.3"],
            ["80 kg", "12 st 8.4 lb", "176.4"],
            ["90 kg", "14 st 2.4 lb", "198.4"],
            ["100 kg", "15 st 10.5 lb", "220.5"],
          ]}
          numeric={[2]}
        />
      </GuideSection>

      <GuideSection id="decimal" n={6} kicker="Watch out" title="Decimal stones versus stones and pounds">
        <p>
          Stones are not decimal. 11.5 stone means eleven and a half stone, which is 11 st 7 lb, not 11 st 5 lb. Some scales and apps show decimal
          stones, so the same weight of 70 kg can appear as 11.02 st or as 11 st 0.3 lb. The calculator shows stones and pounds by default; switch to
          decimal stones under More options.
        </p>
        <Callout title="Rounding">
          Choose 0, 1 or 2 decimal places. When the pounds round up to 14, the calculator carries them into the next stone, so you never see
          &quot;10 st 14 lb&quot;.
        </Callout>
      </GuideSection>

      <GuideSection id="babies" n={7} kicker="Newborns" title="Baby weights in pounds and ounces">
        <p>
          UK hospitals weigh babies in kilograms and record them in the red book (personal child health record), but many families still share
          birth weights in pounds and ounces. To convert, turn kilograms into pounds, then multiply the <a href="/everyday/fraction-calculator">fraction of a pound</a>{" "}by 16.
        </p>
        <DataTable
          caption="Baby weights"
          head={["Kilograms", "Pounds and ounces"]}
          rows={[
            ["2.5 kg", "5 lb 8 oz"],
            ["3.4 kg", "7 lb 8 oz"],
            ["4.0 kg", "8 lb 13 oz"],
          ]}
        />
      </GuideSection>

      <GuideSection id="luggage" n={8} kicker="Travel" title="Luggage allowances">
        <p>
          Airlines set baggage limits in kilograms, and sometimes also in pounds. Allowances vary by airline and fare, so always check yours. Common
          figures convert as follows:
        </p>
        <DataTable
          caption="Common baggage weights"
          head={["Kilograms", "Pounds", "Stones and pounds"]}
          rows={[
            ["7 kg", "15.4", "1 st 1.4 lb"],
            ["10 kg", "22.0", "1 st 8 lb"],
            ["20 kg", "44.1", "3 st 2.1 lb"],
            ["23 kg", "50.7", "3 st 8.7 lb"],
            ["32 kg", "70.5", "5 st 0.5 lb"],
          ]}
          numeric={[1]}
        />
      </GuideSection>

      <GuideSection id="health" n={9} kicker="Next steps" title="Weight and health">
        <p>
          Weight on its own says little about health without your height. Use our <a href="/everyday/bmi-calculator">BMI calculator</a>{" "}to check
          your weight against the healthy range, the <a href="/everyday/calorie-calculator">calorie calculator</a>{" "}to plan a steady change, and
          the <a href="/everyday/height-converter">feet to cm converter</a>{" "}if your height is in different units. For a closer look at what your weight is made of, try the <a href="/everyday/body-fat-calculator">body fat calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={10} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "0.45359237 kg", label: "One pound, exactly" },
            { value: "6.35029318 kg", label: "One stone, exactly" },
            { value: "2.2046 lb", label: "One kilogram" },
            { value: "7 lb", label: "Half a stone" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
