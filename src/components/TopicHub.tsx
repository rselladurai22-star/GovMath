import type { ReactNode } from "react";
import Link from "next/link";
import { Crumbs } from "@/components/ContentPage";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { shortTitle, type Calculator, type CategorySlug } from "@/lib/calculators";

type Cat = { slug: CategorySlug; toolIcon: string };
const CATS = cats as Cat[];

/** The design's tool icons, shared with the matching UK topic. */
export const TOPIC_ICON = {
  tax: CATS.find((c) => c.slug === "tax-and-salary")!.toolIcon,
  home: CATS.find((c) => c.slug === "property")!.toolIcon,
  loan: CATS.find((c) => c.slug === "business")!.toolIcon,
  savings: CATS.find((c) => c.slug === "investing")!.toolIcon,
  everyday: CATS.find((c) => c.slug === "life")!.toolIcon,
};

/** A grid of calculator cards in the design's topic-page markup. */
export function ToolGrid({ tools, icon }: { tools: Calculator[]; icon: string }) {
  return (
    <div className="fullcategory">
      {tools.map((t) => (
        <Link key={t.href} className="categorytool" href={t.href}>
          <span className="toolicon" dangerouslySetInnerHTML={{ __html: icon }} />
          <div>
            <h2>{shortTitle(t.title)}</h2>
            <p>{t.blurb}</p>
            <span className="openlabel">Open calculator</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/**
 * A topic or country hub page (US topics, /us, /everyday) in the same markup
 * as the UK topic pages built by catalog.ts: breadcrumb, claret hero, topic
 * links and calculator cards.
 */
export default function TopicHub({
  country,
  crumbs,
  title,
  intro,
  jump,
  children,
}: {
  country: "uk" | "us";
  crumbs: { href: string; label: string }[];
  title: string;
  intro: string;
  jump?: { href: string; label: string; chosen?: boolean }[];
  children: ReactNode;
}) {
  return (
    <GmShell country={country}>
      <div className="wrap">
        <Crumbs items={crumbs} />
        <section className="categoryhero">
          <h1>{title}</h1>
          <p>{intro}</p>
        </section>
        {jump && jump.length > 0 && (
          <nav className="categoryjump" aria-label="Calculator topics">
            {jump.map((j) => (
              <Link key={j.href} className={j.chosen ? "chosen" : ""} href={j.href}>
                {j.label}
              </Link>
            ))}
          </nav>
        )}
        {children}
      </div>
    </GmShell>
  );
}
