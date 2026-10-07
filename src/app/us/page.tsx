import type { Metadata } from "next";
import Link from "next/link";
import TopicHub, { TOPIC_ICON, ToolGrid } from "@/components/TopicHub";
import { ogFor } from "@/gm/og";
import { US_CATEGORIES, getCalculatorsByCategory, getCalculatorsByCountry } from "@/lib/calculators";
import { US_ICON } from "./UsTopic";

export const metadata: Metadata = {
  title: { absolute: "US Paycheck, Tax, Mortgage and 401(k) Calculators 2026 | SumAtlas" },
  description:
    "Free US calculators for 2026: paycheck and take-home pay, federal income tax, mortgages, auto loans, credit cards, 401(k), Roth IRA and savings.",
  alternates: { canonical: "/us" },
  openGraph: ogFor("/us"),
};

/** The US hub: every US topic with its calculators, then the shared Everyday calculators. */
export default function UsHub() {
  const total = getCalculatorsByCountry("us").length;
  return (
    <TopicHub
      country="us"
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/us", label: "US calculators" },
      ]}
      title="US calculators"
      intro={`${total} free calculators for 2026: your paycheck, federal taxes, mortgage, loans, and saving for retirement, each with a plain-English guide and the official 2026 figures.`}
      jump={US_CATEGORIES.map((c) => ({ href: c.href, label: c.title }))}
    >
      {US_CATEGORIES.map((c) => (
        <section key={c.slug} className="section" aria-labelledby={`${c.slug}-title`}>
          <div className="sectionheading">
            <div>
              <p className="eyebrow">{getCalculatorsByCategory(c.slug).length} TOOLS</p>
              <h2 id={`${c.slug}-title`}>{c.title}</h2>
            </div>
            <Link className="textbutton" href={c.href}>
              View topic
            </Link>
          </div>
          <p>{c.description}</p>
          <ToolGrid tools={getCalculatorsByCategory(c.slug)} icon={US_ICON[c.slug]} />
        </section>
      ))}
      <section className="section" aria-labelledby="everyday-title">
        <div className="sectionheading">
          <div>
            <p className="eyebrow">FOR EVERYONE</p>
            <h2 id="everyday-title">Everyday calculators</h2>
          </div>
          <Link className="textbutton" href="/everyday">
            View topic
          </Link>
        </div>
        <ToolGrid tools={getCalculatorsByCategory("everyday")} icon={TOPIC_ICON.everyday} />
      </section>
    </TopicHub>
  );
}
