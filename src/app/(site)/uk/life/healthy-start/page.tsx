import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import HealthyStartStudio from "./HealthyStartStudio";
import { ogFor } from "@/gm/og";
import { HEALTHY_START, healthyStartOver } from "@/lib/life/health";
import { gbp } from "@/components/flagship/format";

export const metadata: Metadata = {
  title: "Healthy Start Calculator 2026",
  description:
    "Free Healthy Start checker. See if you qualify for the NHS Healthy Start card and how much you get each week for fruit, vegetables, milk and formula.",
  alternates: { canonical: "/uk/life/healthy-start" },
  openGraph: ogFor("/uk/life/healthy-start"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/life/healthy-start", label: "Healthy Start" },
];

// Every figure in the text below comes from the engine, so it moves with the rates.
const p = (n: number) => gbp(n, true);
const HS = HEALTHY_START;
const RATES = [
  { who: "Pregnancy, from the 10th week", weekly: HS.pregnancy },
  { who: "Each child from birth to 1", weekly: HS.under1 },
  { who: "Each child aged 1 to 4", weekly: HS.age1to4 },
];
// A family with a 2-year-old and a pregnancy at 20 weeks: the next 12 months.
const FAMILY = healthyStartOver(52, [24], 20);
const NEWBORN = healthyStartOver(52, [0], 0);

const FAQS: { q: string; a: string }[] = [
  {
    q: "Can a dad, grandparent or other carer apply?",
    a: "Yes, if they have parental responsibility for the child and get the qualifying benefit. Only one person in a household should claim, and one claim covers all your children under 4 and any pregnancy. A pregnancy claim has to be in the pregnant person's name.",
  },
  {
    q: "I am not a British citizen but my child is. Can we get it?",
    a: "Possibly. If you have no recourse to public funds, or no immigration status, you can apply for a British child under 4 when your family's take-home pay is £408 a month or less. You apply by email to NHSBSA's dedicated address, not online. This extension does not cover pregnancy.",
  },
  {
    q: "Can I use the card online, abroad or for cash?",
    a: "No. It works in UK shops that take Mastercard, contactless up to £45 or with chip and PIN up to £75 a time, but not online, in a phone wallet, outside the UK (including the Republic of Ireland), at a cash machine or for cashback. You can split a shop between the card and cash or your own card.",
  },
  {
    q: "What happens to money left on the card if I stop qualifying?",
    a: "NHSBSA checks with the benefits agencies every 4 weeks. If you no longer qualify, payments stop and you have 16 weeks to spend what is left before the card closes; anything unspent after that is reclaimed. A card not used for 16 weeks can also be closed, so use it at least that often.",
  },
  {
    q: "What do I do if my card is lost or stolen?",
    a: "Call the card line on 0118 338 5810 as soon as you can. Spending before you report it is charged to your card, and disputed payments must be reported within 90 days. The same number tells you your balance.",
  },
];

const SOURCES = [
  { label: "NHS Healthy Start: what it is", href: "https://www.healthystart.nhs.uk/" },
  { label: "NHS Healthy Start: how to apply (who qualifies)", href: "https://www.healthystart.nhs.uk/how-to-apply/" },
  { label: "NHS Healthy Start: your payments and how to shop", href: "https://www.healthystart.nhs.uk/what-youll-get-and-how-to-shop/" },
  { label: "NHS Healthy Start: scheme rules", href: "https://www.healthystart.nhs.uk/scheme-rules/" },
  { label: "NHS Healthy Start: getting vitamins", href: "https://www.healthystart.nhs.uk/getting-vitamins/" },
  { label: "mygov.scot: Best Start Grant and Best Start Foods", href: "https://www.mygov.scot/best-start-grant-best-start-foods" },
];

function Notes() {
  return (
    <>
      <h2>Who can get it</h2>
      <p>
        Healthy Start is for people more than 10 weeks pregnant or with a child under 4, in England, Wales and Northern Ireland, who get one of these:
      </p>
      <ul>
        <li>
          <strong>Universal Credit</strong>, with family take-home pay from work of {gbp(HS.ucEarningsLimit)} a month or less. That is earnings after tax and National Insurance for you
          and your partner together, as your Universal Credit statement shows them; the benefit itself does not count.
        </li>
        <li>
          <strong>Pension Credit that includes the child addition</strong>. You apply by email or phone rather than online. Income Support and income-based JSA still qualify for the
          few families who get them.
        </li>
        <li>
          <strong>Income-related ESA, while pregnant</strong>. The claim ends when the baby is born, so move to Universal Credit and reapply then.
        </li>
        <li>
          <strong>No benefit, if you are pregnant and under 18</strong>. You qualify until the baby is born, then only through a qualifying benefit.
        </li>
      </ul>
      <p>
        If you are not sure whether you could get Universal Credit, the <Link href="/uk/benefits/universal-credit">Universal Credit calculator</Link>{" "}or the{" "}
        <Link href="/uk/benefits/benefits-checker">benefits checker</Link>{" "}will tell you. Low earnings with a baby often qualify, and a drop in pay during{" "}
        <Link href="/uk/benefits/maternity-pay">maternity leave</Link>{" "}can bring a family under the limit for a while.
      </p>

      <h2>What goes on the card</h2>
      <p>Money is added every 4 weeks, worked out per week:</p>
      <div className="sa-tablewrap">
        <table>
          <thead>
            <tr>
              <th scope="col">For</th>
              <th scope="col">A week</th>
              <th scope="col">Every 4 weeks</th>
            </tr>
          </thead>
          <tbody>
            {RATES.map((r) => (
              <tr key={r.who}>
                <th scope="row">{r.who}</th>
                <td>{p(r.weekly)}</td>
                <td>{p(r.weekly * 4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A baby&rsquo;s first year is worth {gbp(NEWBORN.total)}. A family with a 2-year-old and a pregnancy at 20 weeks would get about {gbp(FAMILY.total)} over the next 12 months, as
        the pregnancy payments turn into the higher rate for a baby. Payments for a new baby only start once the child is named and verified on your Universal Credit claim, which can
        take up to 8 weeks, so tell NHSBSA and Universal Credit as soon as the baby is born, and within 12 weeks of the due date.
      </p>

      <h2>What you can buy</h2>
      <ul>
        <li>Fruit and vegetables: fresh, frozen or tinned, whole or chopped, in juice or water, but not with added salt, sugar, fat or flavourings, and not juiced, in syrup or as smoothies.</li>
        <li>Pulses such as lentils, beans and chickpeas: fresh, dried or tinned, with nothing added.</li>
        <li>Plain cow&rsquo;s milk: pasteurised, sterilised, long-life or UHT, but not flavoured, condensed, evaporated or plant-based.</li>
        <li>First infant formula based on cow&rsquo;s milk and labelled &ldquo;suitable from birth&rdquo;. Follow-on milk and formula labelled from 6 months are not allowed.</li>
      </ul>
      <p>
        Use it in supermarkets, corner shops, markets, pharmacies and petrol stations that show the Mastercard sign. Activate the card with its PIN the first time; after that,
        contactless works. Keep receipts, because NHSBSA can ask what the money was spent on.
      </p>

      <h2>Free vitamins</h2>
      <p>
        The card also gets you free Healthy Start vitamins. Vitamin tablets, with folic acid and vitamins C and D, are for pregnancy and while breastfeeding a baby under 1. Vitamin
        drops, with vitamins A, C and D, are for children from birth to 4, though a baby having 500ml or more of formula a day does not need them. In England and Wales ask your
        midwife or health visitor where to collect them and show your card; in Northern Ireland NHSBSA sends a letter explaining how to order them by post.
      </p>
    </>
  );
}

export default async function HealthyStartPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/universal-credit", "/uk/benefits/benefits-checker", "/uk/benefits/child-benefit", "/uk/benefits/maternity-pay", "/uk/benefits/free-childcare-hours"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Healthy Start Calculator"
      lead="Whether you can get a Healthy Start card for food, milk and formula, and how much goes on it every four weeks."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <HealthyStartStudio query={query} />
    </CalcPage>
  );
}
