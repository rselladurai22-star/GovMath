import {
  CompareCards,
  DataTable,
  Callout,
  Figure,
  Bars,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** BMI — the guide. Figures from src/lib/life/health.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How BMI is calculated" },
  { id: "ranges", title: "The NHS BMI ranges" },
  { id: "ethnicity", title: "Lower thresholds for some ethnic groups" },
  { id: "table", title: "Healthy weight by height" },
  { id: "imperial", title: "Using feet, inches, stones and pounds" },
  { id: "waist", title: "Waist size and waist-to-height ratio" },
  { id: "limits", title: "What BMI cannot tell you" },
  { id: "children", title: "Children and young people" },
  { id: "older", title: "Older adults" },
  { id: "pregnancy", title: "Pregnancy" },
  { id: "risks", title: "Why weight matters for health" },
  { id: "losing", title: "Losing weight safely" },
  { id: "underweight", title: "If you are underweight" },
  { id: "nhs-help", title: "Help from the NHS" },
  { id: "medicines", title: "Weight-loss medicines" },
  { id: "history", title: "Where BMI came from" },
  { id: "body-fat", title: "BMI compared with body fat measures" },
  { id: "muscle", title: "Athletes and muscular people" },
  { id: "height", title: "Very tall and very short people" },
  { id: "calories", title: "Calories and energy balance" },
  { id: "activity", title: "Activity and fitness at any size" },
  { id: "conditions", title: "Weight-related conditions to check" },
  { id: "checks", title: "NHS Health Check" },
  { id: "myths", title: "Common myths about weight" },
  { id: "tracking", title: "Tracking progress sensibly" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NHS — BMI healthy weight calculator", href: "https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-adults" },
  { label: "NHS — Obesity", href: "https://www.nhs.uk/conditions/obesity/" },
  { label: "NICE — Overweight and obesity management (NG246)", href: "https://www.nice.org.uk/guidance/ng246" },
  { label: "NHS — Managing your weight", href: "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/" },
  { label: "NHS — Underweight adults", href: "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/advice-for-underweight-adults/" },
];

export default function BmiGuide() {
  return (
    <Guide
      kicker="The BMI guide"
      title="BMI and healthy weight, the NHS way"
      intro={
        <>
          Body mass index, or BMI, is the NHS&rsquo;s first check of whether your weight is healthy for your height. It is quick and free, but it has
          limits. This guide explains the ranges the NHS uses, the lower thresholds for some ethnic groups, why your waist matters too, and what
          help is available.
        </>
      }
      meta={["NHS and NICE thresholds", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>BMI is your weight in kilograms divided by your height in metres squared.</li>
          <li>
            A BMI of <strong>18.5 to 24.9</strong> is a healthy weight for most adults.
          </li>
          <li>
            For people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean background, overweight starts at{" "}
            <strong>23</strong> and obesity at <strong>27.5</strong>.
          </li>
          <li>Keeping your waist to less than half your height is a useful second check.</li>
        </ul>
        <KeyStats
          items={[
            { value: "18.5", label: "Healthy weight starts" },
            { value: "25", label: "Overweight starts" },
            { value: "30", label: "Obesity starts" },
            { value: "0.5", label: "Waist-to-height ratio to stay under" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The formula" title="How BMI is calculated">
        <p>BMI = weight (kg) ÷ height (m) ÷ height (m).</p>
        <WorkedExample
          title="A person 175 cm tall weighing 90 kg"
          steps={[
            { label: "Height in metres, squared", note: "1.75 × 1.75", value: "3.0625" },
            { label: "Weight ÷ height squared", note: "90 ÷ 3.0625", value: "29.4" },
            { label: "Range", value: "Overweight" },
            { label: "Top of the healthy range at this height", value: "76.3 kg" },
          ]}
          total={{ label: "Weight change to reach a healthy BMI", value: "Lose 13.7 kg" }}
        />
        <p>
          The same formula is used for men and women. It was designed for adults, so children and teenagers are measured differently.
        </p>
      </GuideSection>

      <GuideSection id="ranges" n={3} kicker="Categories" title="The NHS BMI ranges">
        <DataTable
          caption="Adult BMI ranges"
          head={["BMI", "Most adults", "Lower thresholds"]}
          rows={[
            ["Under 18.5", "Underweight", "Underweight"],
            ["18.5 to 22.9", "Healthy weight", "Healthy weight"],
            ["23 to 24.9", "Healthy weight", "Overweight"],
            ["25 to 27.4", "Overweight", "Overweight"],
            ["27.5 to 29.9", "Overweight", "Obesity"],
            ["30 to 39.9", "Obesity", "Obesity"],
            ["40 or more", "Severe obesity", "Severe obesity"],
          ]}
        />
        <p>
          Doctors sometimes split obesity into classes: 30 to 34.9, 35 to 39.9 and 40 or more. These classes help decide which treatments may be
          offered.
        </p>
      </GuideSection>

      <GuideSection id="ethnicity" n={4} kicker="Different risks" title="Lower thresholds for some ethnic groups">
        <p>
          People of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean family background have a higher risk of
          type 2 diabetes and heart disease at a lower BMI. NICE therefore recommends lower thresholds: overweight from 23 and obesity from 27.5.
        </p>
        <Callout title="Turn this on in the calculator">
          Use the option under More options to apply the lower thresholds. The calculation of BMI itself does not change, only the ranges.
        </Callout>
      </GuideSection>

      <GuideSection id="table" n={5} kicker="Quick reference" title="Healthy weight by height">
        <DataTable
          caption="Healthy weight range by height (BMI 18.5 to 24.9)"
          head={["Height", "Healthy from", "Healthy to", "Lower thresholds: up to"]}
          numeric={[1, 2, 3]}
          rows={[
            ["155 cm", "44.4 kg", "59.8 kg", "55.0 kg"],
            ["160 cm", "47.4 kg", "63.7 kg", "58.6 kg"],
            ["165 cm", "50.4 kg", "67.8 kg", "62.3 kg"],
            ["170 cm", "53.5 kg", "72.0 kg", "66.2 kg"],
            ["175 cm", "56.7 kg", "76.3 kg", "70.1 kg"],
            ["180 cm", "59.9 kg", "80.7 kg", "74.2 kg"],
            ["185 cm", "63.3 kg", "85.2 kg", "78.4 kg"],
            ["190 cm", "66.8 kg", "89.9 kg", "82.7 kg"],
          ]}
        />
        <Figure label="Weight at which obesity starts" caption="At a BMI of 30, the standard threshold.">
          <Bars
            items={[
              { label: "160 cm", value: 76.8 },
              { label: "170 cm", value: 86.7 },
              { label: "180 cm", value: 97.2 },
              { label: "190 cm", value: 108.3 },
            ]}
            format={(n) => `${n.toFixed(1)} kg`}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="imperial" n={6} kicker="Old units" title="Using feet, inches, stones and pounds">
        <p>
          The calculator converts imperial units for you. One inch is 2.54 cm, one pound is about 0.454 kg, and there are 14 pounds in a stone.
        </p>
        <WorkedExample
          title="5 ft 7 in and 11 st 5 lb"
          steps={[
            { label: "Height", value: "170.2 cm" },
            { label: "Weight", value: "72.1 kg" },
            { label: "BMI", value: "24.9" },
          ]}
          total={{ label: "Healthy range at this height", value: "8 st 6 lb to 11 st 5 lb" }}
        />
      </GuideSection>

      <GuideSection id="waist" n={7} kicker="A second check" title="Waist size and waist-to-height ratio">
        <p>
          Fat around the middle is linked to type 2 diabetes, heart disease and stroke, even in people with a healthy BMI. NICE advises everyone to
          keep their waist to less than half their height.
        </p>
        <DataTable
          caption="Waist-to-height ratio"
          head={["Ratio", "What it means"]}
          rows={[
            ["Under 0.4", "May be underweight; check with your GP if concerned"],
            ["0.4 to 0.49", "No increased risk"],
            ["0.5 to 0.59", "Increased health risk"],
            ["0.6 or more", "High health risk"],
          ]}
        />
        <p>
          A person 175 cm tall with an 88 cm waist has a ratio of 0.50, at the point where risk starts to rise. Measure your waist halfway between
          your lowest rib and the top of your hips, breathing out normally.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={8} kicker="Caveats" title="What BMI cannot tell you">
        <CompareCards
          columns={[
            {
              name: "BMI can overstate risk",
              rows: [
                { label: "Athletes", value: "Muscle weighs more than fat" },
                { label: "Tall people", value: "The formula slightly favours shorter people" },
              ],
            },
            {
              name: "BMI can understate risk",
              rows: [
                { label: "Older adults", value: "Muscle loss hides extra fat" },
                { label: "Central fat", value: "A healthy BMI with a large waist" },
              ],
            },
          ]}
        />
        <p>
          BMI is a screening tool, not a diagnosis. Your GP will also consider your waist, blood pressure, blood sugar, cholesterol, family history
          and lifestyle.
        </p>
      </GuideSection>

      <GuideSection id="children" n={9} kicker="Under 18" title="Children and young people">
        <p>
          Children&rsquo;s bodies change as they grow, so their BMI is compared with other children of the same age and sex using centile charts. A
          child above the 91st centile is classed as overweight, and above the 98th as living with obesity. Use the NHS healthy weight
          calculator for children rather than an adult BMI calculator.
        </p>
        <p>The National Child Measurement Programme measures children in Reception and Year 6 and tells parents the results.</p>
      </GuideSection>

      <GuideSection id="older" n={10} kicker="Later life" title="Older adults">
        <p>
          As people age, they tend to lose muscle and gain fat, so BMI can look healthy when body composition is not. Being slightly above the
          healthy range may not carry the same risks in later life, while unplanned weight loss can be a warning sign. Strength exercises twice a
          week help keep muscle.
        </p>
      </GuideSection>

      <GuideSection id="pregnancy" n={11} kicker="Pregnancy" title="Pregnancy">
        <p>
          BMI is not useful during pregnancy because weight rises naturally. Your midwife will usually record your BMI at your first appointment
          to plan your care. Dieting during pregnancy is not recommended; talk to your midwife about healthy eating instead.
        </p>
      </GuideSection>

      <GuideSection id="risks" n={12} kicker="Why it matters" title="Why weight matters for health">
        <p>Living with overweight or obesity raises the risk of:</p>
        <ul>
          <li>type 2 diabetes and high blood pressure;</li>
          <li>heart disease and stroke;</li>
          <li>some cancers, including breast and bowel cancer;</li>
          <li>joint pain, sleep apnoea and fertility problems;</li>
          <li>depression and low self-esteem.</li>
        </ul>
        <p>Losing even 5% of body weight can improve blood pressure and blood sugar for many people.</p>
      </GuideSection>

      <GuideSection id="losing" n={13} kicker="Steady change" title="Losing weight safely">
        <ul>
          <li>Aim for 0.5 kg to 1 kg a week, through small changes you can keep up.</li>
          <li>Eat more fruit, vegetables and fibre, and fewer sugary drinks and snacks.</li>
          <li>Check food labels and watch portion sizes.</li>
          <li>Aim for 150 minutes of moderate activity a week.</li>
          <li>Get enough sleep: tiredness makes healthy choices harder.</li>
        </ul>
      </GuideSection>

      <GuideSection id="underweight" n={14} kicker="Below 18.5" title="If you are underweight">
        <p>
          A BMI under 18.5 can be linked to weak bones, a weaker immune system, tiredness and fertility problems. It can also be a sign of an
          eating disorder or another health condition. See your GP, especially if you have lost weight without trying.
        </p>
      </GuideSection>

      <GuideSection id="nhs-help" n={15} kicker="Support" title="Help from the NHS">
        <p>
          Your GP or practice nurse can refer you to a free local weight management service. Adults with a BMI of 30 or more, or 27.5 for the
          lower thresholds, who have diabetes or high blood pressure can be referred to the NHS Digital Weight Management Programme. The free NHS
          Weight Loss Plan app offers a 12-week programme for anyone.
        </p>
      </GuideSection>

      <GuideSection id="medicines" n={16} kicker="Treatment" title="Weight-loss medicines">
        <p>
          Some weight-loss medicines are available on the NHS for people who meet NICE criteria, usually alongside a diet and exercise programme.
          Eligibility depends on BMI and weight-related health conditions. Buying them online without a proper consultation can be dangerous;
          only use registered pharmacies.
        </p>
      </GuideSection>

      <GuideSection id="history" n={17} kicker="Background" title="Where BMI came from">
        <p>
          BMI was devised in the 1830s by the Belgian statistician Adolphe Quetelet, who was studying the &ldquo;average man&rdquo; rather than
          individual health. It was adopted widely in the 1970s because it is simple, cheap and works well across large groups of people. That
          history explains both its strength and its weakness: it is good for spotting trends and risks in a population, but less precise for any one
          person.
        </p>
        <p>
          The NHS and NICE still use it as the first step because nothing else is as quick, needs no equipment beyond scales and a tape measure,
          and is so closely linked to the risk of type 2 diabetes and heart disease across the population.
        </p>
      </GuideSection>

      <GuideSection id="body-fat" n={18} kicker="Other measures" title="BMI compared with body fat measures">
        <DataTable
          caption="Ways to estimate body fat"
          head={["Method", "What it measures", "Practical notes"]}
          rows={[
            ["BMI", "Weight relative to height", "Free and quick; does not separate fat from muscle"],
            ["Waist-to-height ratio", "Fat around the middle", "Free; a strong guide to heart and diabetes risk"],
            ["Bioimpedance scales", "Estimated body fat percentage", "Affected by hydration; useful for trends at home"],
            ["DEXA scan", "Fat, muscle and bone separately", "Accurate but rarely used outside research or clinics"],
          ]}
        />
        <p>
          For most people, BMI plus waist-to-height ratio gives a good enough picture. Home body-fat scales can track change over time, but the
          number on any one day can vary by several percentage points.
        </p>
      </GuideSection>

      <GuideSection id="muscle" n={19} kicker="Exceptions" title="Athletes and muscular people">
        <p>
          Muscle is denser than fat, so rugby players, rowers and people who do regular strength training can have a BMI in the overweight or even
          obese range while carrying little body fat. If that describes you, waist-to-height ratio is a better guide. A waist under half your height
          with a BMI of 27 is a very different picture from a large waist with the same BMI.
        </p>
      </GuideSection>

      <GuideSection id="height" n={20} kicker="Body size" title="Very tall and very short people">
        <p>
          The BMI formula squares height, but weight does not rise exactly with the square of height in real bodies. As a result, very tall people
          tend to have a slightly higher BMI than their body fat suggests, and very short people a slightly lower one. The effect is small for most
          adults, but worth knowing if you are well outside average height.
        </p>
      </GuideSection>

      <GuideSection id="calories" n={21} kicker="Energy" title="Calories and energy balance">
        <p>
          Weight changes when the energy you take in from food and drink differs from the energy you use. The NHS uses a rough guide of around
          2,000 calories a day for women and 2,500 for men to maintain weight, though needs vary with age, size and activity. Reducing intake by
          about 600 calories a day is often suggested for steady weight loss of around 0.5 kg a week.
        </p>
        <p>
          Calories from sugary drinks and snacks add up quickly without making you feel full. Swapping them for water, fruit, vegetables and foods
          high in fibre and protein is one of the most effective changes for many people.
        </p>
      </GuideSection>

      <GuideSection id="activity" n={22} kicker="Moving more" title="Activity and fitness at any size">
        <p>
          Being active improves health at every BMI. The UK Chief Medical Officers recommend that adults do at least 150 minutes of moderate activity,
          such as brisk walking or cycling, or 75 minutes of vigorous activity each week, plus strength exercises on two days. Fitness lowers the risk
          of heart disease and diabetes even if your weight does not change much.
        </p>
        <p>Breaking up long periods of sitting also helps. Short walks, standing while on the phone and using stairs all count.</p>
      </GuideSection>

      <GuideSection id="conditions" n={23} kicker="Health checks" title="Weight-related conditions to check">
        <ul>
          <li><strong>Blood pressure:</strong> free checks at many pharmacies for adults over 40.</li>
          <li><strong>Type 2 diabetes:</strong> a blood test (HbA1c) shows your average blood sugar; the NHS Diabetes Prevention Programme helps people at risk.</li>
          <li><strong>Cholesterol:</strong> checked as part of the NHS Health Check.</li>
          <li><strong>Sleep apnoea:</strong> loud snoring and daytime sleepiness are signs worth raising with your GP.</li>
          <li><strong>Fatty liver disease:</strong> often has no symptoms and is linked to weight around the middle.</li>
        </ul>
      </GuideSection>

      <GuideSection id="checks" n={24} kicker="Free check" title="NHS Health Check">
        <p>
          Adults in England aged 40 to 74 without certain existing conditions are invited for a free NHS Health Check every 5 years. It includes
          your BMI, blood pressure and cholesterol, and a conversation about your risk of heart disease, stroke, diabetes and kidney disease. If you
          have not been invited, ask your GP practice.
        </p>
      </GuideSection>

      <GuideSection id="myths" n={25} kicker="Clearing up" title="Common myths about weight">
        <CompareCards
          columns={[
            {
              name: "Myth",
              rows: [
                { label: "1", value: "A healthy BMI means you are healthy" },
                { label: "2", value: "You need to reach a healthy BMI to benefit" },
                { label: "3", value: "Skipping meals speeds up weight loss" },
              ],
            },
            {
              name: "Reality",
              rows: [
                { label: "1", value: "Waist size, fitness and diet matter too" },
                { label: "2", value: "Losing 5% of weight can improve health" },
                { label: "3", value: "It often leads to overeating later" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="tracking" n={26} kicker="Monitoring" title="Tracking progress sensibly">
        <p>
          Weigh yourself at the same time of day, in similar clothing, no more than once a week. Daily changes of a kilogram or more are usually
          water. Measure your waist every month or so. Celebrate changes in how you feel, sleep and move, not just the number on the scales.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={27} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "18.5", label: "Underweight below" },
            { value: "25", label: "Overweight from" },
            { value: "30", label: "Obesity from" },
            { value: "40", label: "Severe obesity from" },
            { value: "23", label: "Overweight, lower thresholds" },
            { value: "27.5", label: "Obesity, lower thresholds" },
            { value: "0.5", label: "Waist-to-height ratio" },
            { value: "150 min", label: "Weekly activity target" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}
