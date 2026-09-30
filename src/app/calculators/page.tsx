import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import TopicBar from "@/components/TopicBar";
import PageHero from "@/components/PageHero";
import HomeSearch, { type SearchItem } from "@/components/HomeSearch";
import { CAT, catVars, iconForTitle, LineIcon, shortTitle } from "@/components/category-style";
import { CALCULATORS, CATEGORIES } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "All Calculators",
  description:
    "Every GovMath calculator in one place — tax, benefits, property and pensions. Free, plain English, no sign-up.",
};

export default function AllCalculatorsPage() {
  const searchItems: SearchItem[] = CALCULATORS.map((c) => ({
    title: c.title,
    href: c.href,
    category: CAT[c.category].label,
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/calculators", label: "All calculators" },
        ]}
        title="All calculators"
        lead={`${CALCULATORS.length} free UK calculators across ${CATEGORIES.length} topics, updated for 2025/26.`}
      >
        <div id="search" className="max-w-[640px] scroll-mt-24">
          <HomeSearch items={searchItems} />
        </div>
      </PageHero>

      {/* Topic jump links */}
      <nav aria-label="Jump to topic" className="gm-wrap pt-6">
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <a
                href={`#${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-primary hover:text-primary"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: CAT[c.slug].color }} aria-hidden="true" />
                {CAT[c.slug].label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {CATEGORIES.map((cat, idx) => {
        const items = CALCULATORS.filter((c) => c.category === cat.slug);
        if (items.length === 0) return null;
        return (
          <section key={cat.slug} id={cat.slug} aria-labelledby={`${cat.slug}-heading`} className="gm-wrap scroll-mt-24 pt-12" style={catVars(cat.slug)}>
            <TopicBar
              id={`${cat.slug}-heading`}
              title={cat.title}
              subtitle={cat.tagline}
              icon={CAT[cat.slug].icon}
              href={cat.href}
              linkLabel="Topic page"
            />
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-ice"
                  >
                    <span className="mt-0.5" style={{ color: "var(--c)" }}>
                      <LineIcon path={iconForTitle(c.title, c.category)} size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold leading-snug text-navy group-hover:text-primary">
                        {shortTitle(c.title)}
                      </span>
                      <span className="block text-sm leading-snug text-muted">{c.blurb}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {idx === 3 && (
              <div className="mt-10">
                <AdSlot size="leaderboard" />
              </div>
            )}
          </section>
        );
      })}

      <div className="gm-wrap py-12">
        <AdSlot size="billboard" />
      </div>
    </>
  );
}
