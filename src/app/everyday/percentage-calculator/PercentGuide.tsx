import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Percentages — the guide. Figures from src/lib/life/everyday.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "of", title: "Finding a percentage of a number" },
  { id: "what", title: "What percentage one number is of another" },
  { id: "change", title: "Percentage increase and decrease" },
  { id: "add", title: "Adding and taking off a percentage" },
  { id: "reverse", title: "Reverse percentages" },
  { id: "points", title: "Percentage points" },
  { id: "successive", title: "Several changes in a row" },
  { id: "money", title: "Percentages in everyday money" },
  { id: "mental", title: "Mental maths shortcuts" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "fractions", title: "Percentages, fractions and decimals" },
  { id: "marks", title: "Exam marks and grades" },
  { id: "tips", title: "Tips and service charges" },
  { id: "rates", title: "APR, AER and interest rates" },
  { id: "news", title: "Reading percentages in the news" },
  { id: "spreadsheets", title: "Percentages in a spreadsheet" },
  { id: "key-numbers", title: "Key formulas" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — VAT rates (UK)", href: "https://www.gov.uk/vat-rates" },
  { label: "Tax Foundation — State and local sales tax rates (US)", href: "https://taxfoundation.org/data/all/state/2026-sales-tax-rates/" },
  { label: "Office for National Statistics — Inflation and price indices", href: "https://www.ons.gov.uk/economy/inflationandpriceindices" },
  { label: "Consumer Financial Protection Bureau — What is APR?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loans-interest-rate-and-its-apr-en-733/" },
];

export default function PercentGuide() {
  return (
    <Guide
      kicker="The percentage guide"
      title="How to work out percentages"
      intro={
        <>
          Percentages turn up everywhere: pay rises, discounts, VAT, interest rates and exam marks. This guide explains each type of percentage
          calculation with worked examples, shows how to reverse a percentage, and covers the traps that catch people out.
        </>
      }
      meta={["Worked examples", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>&ldquo;Per cent&rdquo; means &ldquo;out of 100&rdquo;, so 20% is 20 ÷ 100, or 0.2.</li>
          <li>X% of Y = X ÷ 100 × Y.</li>
          <li>Percentage change = (new − old) ÷ old × 100.</li>
          <li>To undo a percentage increase, divide, do not subtract.</li>
        </ul>
        <KeyStats
          items={[
            { value: "30", label: "20% of 150" },
            { value: "25%", label: "Rise from 80 to 100" },
            { value: "−20%", label: "Fall from 100 to 80" },
            { value: "−25%", label: "A 50% rise then a 50% fall" },
          ]}
        />
      </GuideSection>

      <GuideSection id="of" n={2} kicker="Type 1" title="Finding a percentage of a number">
        <WorkedExample
          title="What is 20% of 150?"
          steps={[
            { label: "20 ÷ 100", value: "0.2" },
            { label: "0.2 × 150", value: "30" },
          ]}
          total={{ label: "Answer", value: "30" }}
        />
        <p>The same method finds a 17.5% share of 2,400, which is 420.</p>
      </GuideSection>

      <GuideSection id="what" n={3} kicker="Type 2" title="What percentage one number is of another">
        <WorkedExample
          title="45 out of 60 as a percentage"
          steps={[
            { label: "45 ÷ 60", value: "0.75" },
            { label: "× 100", value: "75%" },
          ]}
          total={{ label: "Answer", value: "75%" }}
        />
        <p>This is how exam marks, survey results and budget shares are worked out.</p>
      </GuideSection>

      <GuideSection id="change" n={4} kicker="Type 3" title="Percentage increase and decrease">
        <p>Always divide by the starting number.</p>
        <DataTable
          caption="Percentage change examples"
          head={["From", "To", "Change"]}
          numeric={[0, 1, 2]}
          rows={[
            ["80", "100", "+25%"],
            ["100", "80", "−20%"],
            ["1,250", "1,400", "+12%"],
          ]}
        />
        <p>
          Notice that going from 80 to 100 is a 25% rise, but going back from 100 to 80 is only a 20% fall, because the starting point is different.
        </p>
      </GuideSection>

      <GuideSection id="add" n={5} kicker="Type 4" title="Adding and taking off a percentage">
        <CompareCards
          columns={[
            {
              name: "Add 15% to 250",
              rows: [
                { label: "Multiply by", value: "1.15" },
                { label: "Answer", value: "287.5" },
              ],
            },
            {
              name: "Take 25% off 80",
              rows: [
                { label: "Multiply by", value: "0.75" },
                { label: "Answer", value: "60" },
              ],
            },
          ]}
        />
        <p>Multiplying by one number is quicker and avoids mistakes. A 20% discount means paying 80%, so multiply by 0.8.</p>
      </GuideSection>

      <GuideSection id="reverse" n={6} kicker="Type 5" title="Reverse percentages">
        <p>
          To find the original amount before a percentage was added, divide by (1 + the percentage ÷ 100). Taking the percentage off the final amount
          gives the wrong answer.
        </p>
        <WorkedExample
          title="A price of 54 including 20% VAT (or any 20% tax)"
          steps={[
            { label: "Divide by 1.2", value: "45" },
            { label: "VAT included", value: "9" },
          ]}
          total={{ label: "Price before VAT", value: "45" }}
        />
        <Callout tone="warn" title="The common error">
          Taking 20% off 54 gives 43.20, which is wrong. The VAT was 20% of 45, not of 54.
        </Callout>
        <p>
          The same applies to pay rises. If your salary is 36,000 after a 4.5% rise, your old salary was 34,449.76, not 34,380.
        </p>
      </GuideSection>

      <GuideSection id="points" n={7} kicker="Rates" title="Percentage points">
        <p>
          When a rate changes, the difference is measured in percentage points. If an interest rate rises from 4% to 5%, it has gone up by 1
          percentage point, but by 25% in relative terms. News reports often mix the two, which can make changes sound bigger or smaller than they
          are.
        </p>
      </GuideSection>

      <GuideSection id="successive" n={8} kicker="Compounding" title="Several changes in a row">
        <p>Percentage changes multiply rather than add.</p>
        <DataTable
          caption="Two or more changes in a row"
          head={["Changes", "Overall change"]}
          rows={[
            ["+50% then −50%", "−25%"],
            ["+10% then −10%", "−1%"],
            ["−20% then +25%", "0%"],
            ["+3% for three years", "+9.27%"],
          ]}
        />
        <p>
          This is why inflation of 3% a year adds up to more than 9% over three years, and why a share that falls 20% needs to rise 25% to get back
          to where it started.
        </p>
      </GuideSection>

      <GuideSection id="money" n={9} kicker="Real life" title="Percentages in everyday money">
        <ul>
          <li>
            <strong>Sales tax and VAT:</strong>{" "}to add a tax of 20%, multiply by 1.2; to remove it, divide by 1.2. For a 7.25% sales tax, multiply or
            divide by 1.0725.
          </li>
          <li>
            <strong>Pay rises:</strong>{" "}a 5% rise on 30,000 is 1,500 before tax.
          </li>
          <li>
            <strong>Discounts:</strong> 30% off then a further 10% off is 37% off, not 40%.
          </li>
          <li>
            <strong>Interest:</strong>{" "}rates are usually yearly, so 4% on 1,000 is about 40 a year.
          </li>
          <li>
            <strong>Splitting bills:</strong>{" "}dividing 100 three ways gives 33.34, 33.33 and 33.33, so the shares add up.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="mental" n={10} kicker="Shortcuts" title="Mental maths shortcuts">
        <ul>
          <li>10%: move the decimal point one place left. 10% of 85 is 8.50.</li>
          <li>5%: half of 10%. 1%: move the decimal point two places.</li>
          <li>Percentages are reversible: 8% of 50 is the same as 50% of 8, which is 4.</li>
          <li>25% is a quarter, 50% a half, 75% three quarters, 20% a fifth.</li>
        </ul>
      </GuideSection>

      <GuideSection id="mistakes" n={11} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Dividing by the new number instead of the old one when working out a change.</li>
          <li>Subtracting a percentage to undo an increase instead of dividing.</li>
          <li>Adding successive percentages instead of multiplying.</li>
          <li>Confusing percentage points with percentages.</li>
        </ul>
      </GuideSection>

      <GuideSection id="fractions" n={12} kicker="Conversions" title="Percentages, fractions and decimals">
        <DataTable
          caption="Common equivalents"
          head={["Percentage", "Decimal", "Fraction"]}
          rows={[
            ["1%", "0.01", "1/100"],
            ["5%", "0.05", "1/20"],
            ["10%", "0.1", "1/10"],
            ["12.5%", "0.125", "1/8"],
            ["20%", "0.2", "1/5"],
            ["25%", "0.25", "1/4"],
            ["33.3%", "0.333", "1/3"],
            ["50%", "0.5", "1/2"],
            ["75%", "0.75", "3/4"],
          ]}
        />
        <p>To turn a fraction into a percentage, divide the top by the bottom and multiply by 100. To turn a percentage into a decimal, divide by 100.</p>
      </GuideSection>

      <GuideSection id="marks" n={13} kicker="Education" title="Exam marks and grades">
        <p>
          A mark of 54 out of 72 is 75%. Grade boundaries for GCSEs and A levels are set each year as raw marks, not fixed percentages, so the same
          percentage can lead to different grades in different years or subjects. University degree classes, by contrast, often use percentage
          bands, such as 70% and above for a first.
        </p>
      </GuideSection>

      <GuideSection id="tips" n={14} kicker="Eating out" title="Tips and service charges">
        <p>
          A tip or service charge is a percentage of the bill. A 12.5% service charge on a bill of 64 is 8, taking the total to 72; an 18% tip on
          the same bill is 11.52. Customs differ: in the US a tip of 15% to 20% is expected, while in the UK a service charge of 10% to 12.5% is often
          added to the bill and is optional. Our <a href="/us/taxes/tip-calculator">tip calculator</a>{" "}splits a bill between people.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={15} kicker="Borrowing and saving" title="APR, AER and interest rates">
        <CompareCards
          columns={[
            {
              name: "AER (savings)",
              rows: [
                { label: "Means", value: "Annual equivalent rate" },
                { label: "Shows", value: "Interest over a year, including compounding" },
              ],
            },
            {
              name: "APR (borrowing)",
              rows: [
                { label: "Means", value: "Annual percentage rate" },
                { label: "Shows", value: "The yearly cost including interest and most fees" },
              ],
            },
          ]}
        />
        <p>
          Compare savings accounts by AER and loans or credit cards by APR, because both convert different payment patterns into a single yearly
          percentage. The <a href="/uk/investing/compound-interest">compound interest calculator</a>{" "}shows how rates grow over time.
        </p>
      </GuideSection>

      <GuideSection id="news" n={16} kicker="Statistics" title="Reading percentages in the news">
        <ul>
          <li>Ask &ldquo;a percentage of what?&rdquo;. A 50% rise in a rare risk may still be a tiny risk.</li>
          <li>Check whether a change is in percentages or percentage points.</li>
          <li>Inflation figures show how much prices have risen over 12 months, not how high prices are.</li>
          <li>Small samples can give large percentage swings, so look at the actual numbers too.</li>
        </ul>
      </GuideSection>

      <GuideSection id="spreadsheets" n={17} kicker="Tools" title="Percentages in a spreadsheet">
        <p>
          In Excel or Google Sheets, type =A1*20% for 20% of a cell, =A1/B1 and format as a percentage for a share, and =(B1-A1)/A1 for a percentage
          change. To remove 20% VAT, use =A1/1.2. Format cells as percentages rather than multiplying by 100, to avoid errors when the numbers are
          used again.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key formulas">
        <KeyStats
          items={[
            { value: "X ÷ 100 × Y", label: "X% of Y" },
            { value: "X ÷ Y × 100", label: "X as a % of Y" },
            { value: "(new − old) ÷ old", label: "Change, × 100" },
            { value: "Y × (1 + X/100)", label: "Add X%" },
            { value: "Y × (1 − X/100)", label: "Take off X%" },
            { value: "Y ÷ (1 + X/100)", label: "Reverse an increase" },
            { value: "÷ 1.2", label: "Remove 20% VAT" },
            { value: "new − old", label: "Percentage points" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
