import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PoaStudio from "./PoaStudio";
import PoaGuide from "./PoaGuide";

export const metadata: Metadata = {
  title: "Payment on Account Calculator: Self Assessment Dates",
  description:
    "See every Self Assessment payment due on 31 January and 31 July, including payments on account, balancing payments, your first year and the effect of reducing them.",
  alternates: { canonical: "/business/payment-on-account" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/payment-on-account", label: "Payment on Account" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is a payment on account?", a: "An advance payment towards your next Self Assessment bill. Each one is half of the previous year's Income Tax and Class 4 NI, due on 31 January and 31 July." },
  { q: "Who has to make payments on account?", a: "Anyone whose Self Assessment bill is £1,000 or more, unless more than 80% of their tax was already deducted at source, such as through PAYE." },
  { q: "Why is my first January bill so big?", a: "In your first year you pay the whole year's bill and the first payment on account for the next year on the same day, about one and a half times a year's tax." },
  { q: "Can I reduce my payments on account?", a: "Yes, online or with form SA303, if you expect a lower bill. If the final bill is higher, you pay interest on the shortfall." },
  { q: "Do payments on account include student loan?", a: "No. Student loan, Class 2 NI and Capital Gains Tax are paid with the balancing payment, never in advance." },
  { q: "Are payments on account extra tax?", a: "No. They are advance payments of the same tax. Any overpayment is refunded or set against your next bill." },
  { q: "Why do I have to pay tax for a year that has not finished?", a: "The rules collect tax roughly as the year goes on, as PAYE does for employees, rather than waiting until up to 22 months after the income was earned." },
  { q: "Do I get a refund if I overpay?", a: "Yes. If your payments on account were more than the final bill, the excess is set against your next payment or refunded if you ask." },
  { q: "What if I stop being self-employed?", a: "If you expect no Self Assessment bill for the year, ask HMRC to reduce your payments on account to zero. You still need to file the final year's return." },
  { q: "Where can I see my payments on account?", a: "In your HMRC online account, under Self Assessment, along with every amount due and paid." },
  { q: "Do payments on account apply to Capital Gains Tax?", a: "No. Capital Gains Tax is paid with the balancing payment, or within 60 days for UK residential property, and never through payments on account." },
  { q: "What happens if I file my return late?", a: "Your payments on account are still due on 31 January and 31 July, and interest runs on anything paid late. You also get late filing penalties, and HMRC may estimate the tax you owe until your return arrives." },
  { q: "Can I pay more than my payment on account?", a: "Yes. Any extra is held as a credit and used against your next payment, which can help if you know your bill is going up." },
];

export default async function PoaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/sole-trader-tax", "/business/allowable-expenses", "/business/cis-deduction", "/business/dividend-vs-salary", "/business/business-mileage", "/property/rent-a-room"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Self Assessment 2026/27"
      title="Payment on Account Calculator"
      lead="See what you owe HMRC on 31 January and 31 July, why it changes from year to year, and whether to ask for a reduction."
      points={["January and July bills", "First-year check", "Reduction planner", "Free and private"]}
      guide={<PoaGuide />}
      faqs={FAQS}
      related={related}
      note="Self Assessment for 2025/26 and 2026/27. Not tax advice."
    >
      <PoaStudio query={query} />
    </FlagshipPage>
  );
}
